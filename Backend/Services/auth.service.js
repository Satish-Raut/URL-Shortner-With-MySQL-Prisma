import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { db } from "../Config/drizzleDB.js";
import { sessionTable } from "../drizzle/schema.js";
import {
  ACCESS_TOKEN_EXPIRY,
  MILLISECONDS_PER_SECOND,
  REFRESH_TOKEN_EXPIRY,
} from "../Config/constants.js";
import { email } from "zod";
import { getSessionById } from "../Models/urlModelDrizzle.model.js";
import { getUserById } from "../Models/usersModel.model.js";

// * Hash the Password *
export const hashPassword = async (password) => {
  return await argon2.hash(password);
};

// * Compare the users give password with hashed password stored in database*
// Syntax: argon2.verify(hashedPassword, password)
export const comparePassword = async (password, hashedPassword) => {
  return await argon2.verify(hashedPassword, password);
};

// *Generate the JWT token using jwt.sign() method* - For JWT Authentication approach
export const generateTocken = ({ id, name, email }) => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY is not set in environment variables");
  }

  return jwt.sign({ id, name, email }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });
};

// *Create a session * - For Hybrid Authentication approach
export const createSession = async (userId, { ip, userAgent }) => {
  const [session] = await db
    .insert(sessionTable)
    .values({ userId, ip, userAgent });

  console.log("Session at Auth Service: ", session);
  return session.insertId;
};

// *Create a acccess token * - For Hybrid Authentication approach
export const createAccessTocken = async ({ id, name, email, sessionId }) => {
  return jwt.sign({ id, name, email, sessionId }, process.env.JWT_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRY / MILLISECONDS_PER_SECOND,
  });
};

// *Create a refresh token * - For Hybrid Authentication approach
export const createRefreshToken = async (sessionId) => {
  return jwt.sign({ sessionId }, process.env.JWT_KEY, {
    expiresIn: REFRESH_TOKEN_EXPIRY / MILLISECONDS_PER_SECOND,
  });
};

// *If the access token get expired then generate the new access token*
export const refreshAccessToken = async (refreshToken) => {
  try {
    // {i. Decode the refresh token and get the data}
    const decoded = jwt.verify(refreshToken, process.env.JWT_KEY);

    // {ii. Using the session id present in refreshToken get the userID}
    const sessionResult = await getSessionById(decoded.sessionId);
    const currentSession = sessionResult[0]; // extract from array
    console.log("This data is at auth services: ", currentSession);

    if (!currentSession || !currentSession.valid) {
      throw new Error("Invalid Session");
    }

    const userResult = await getUserById({ id: currentSession.userId });
    const user = userResult[0];
    console.log("User data at auth Service: ", user);

    if (!user) {
      throw new Error("Invalid User");
    }

    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      sessionId: currentSession.id,
    };

    // {ii. Create an Access token.}
    const newAccessToken = await createAccessTocken(userInfo);

    // {iii. Create a Refresh token.}
    const newRefreshToken = await createRefreshToken(currentSession.id);

    return { newAccessToken, newRefreshToken, user: userInfo };
  } catch (error) {
    console.error("AuthService Refresh Error:", error.message);
    throw error; // MUST rethrow so the middleware catches it and clears cookies
  }
};
