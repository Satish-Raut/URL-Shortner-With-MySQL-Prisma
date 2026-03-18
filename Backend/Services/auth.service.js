import argon2 from "argon2";
import jwt from "jsonwebtoken";

// * Hash the Password *
export const hashPassword = async (password) => {
  return await argon2.hash(password);
};

// * Compare the users give password with hashed password stored in database*
// Syntax: argon2.verify(hashedPassword, password)
export const comparePassword = async (password, hashedPassword) => {
  return await argon2.verify(hashedPassword, password);
};

// *Generate the JWT token using jwt.sign() method*
export const generateTocken = ({ id, name, email }) => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY is not set in environment variables");
  }

  return jwt.sign({ id, name, email }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });
};
