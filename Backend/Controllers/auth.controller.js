import jwt from "jsonwebtoken";
import {
  getUserByEmail,
  getUserById,
  saveUserdata,
} from "../Models/usersModel.model.js";
import {
  comparePassword,
  createAccessTocken,
  createRefreshToken,
  createSession,
  // generateTocken,
  hashPassword,
} from "../Services/auth.service.js";
import {
  loginUserSchema,
  registerUserSchema,
} from "../Validators/auth-validator.js";
import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} from "../Config/constants.js";
import { success } from "zod";

// "Both the get page are handled by the Frontend"

// export const getRegisterPage = (req, res) => {
//   res.render("auth/register");
// };

// export const getLoginPage = (req, res) => {
//   res.render("auth/login");
// };

export const postLogin = async (req, res) => {
  // {1. Verify the data given by the user i.e already registerd or not}
  // const { email, password } = req.body;

  // {Validation using Zod}
  const parsed = loginUserSchema.safeParse(req.body);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(errors)[0]?.[0];

    return res.status(400).json({
      success: false,
      message: firstError || "Validation failed",
      redirectTo: "/login",
      errors,
    });
  }

  // {Now get the data}
  const { email, password } = parsed.data;

  try {
    // {Get the user details using user email}
    const [validUser] = await getUserByEmail({ email });

    console.log("Logged In Valid User:", validUser);

    // {2. If the user already registered then redirect to Home page}
    if (validUser) {
      // {3. Verify the password matches here before logging them in!}
      let isPasswordValid = false;
      try {
        isPasswordValid = await comparePassword(password, validUser.password);
      } catch (error) {
        console.error("Password comparison error:", error);
        return res.status(500).json({
          success: false,
          message: "Internal server error during authentication",
        });
      }

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Incorrect email & password. Please try again.",
        });
      }

      // "----💡 Session Authentication Approach-------"
      //{4. Set the cookie only upon successful login}
      // res.cookie("isLoggedIn", true); // Login Status
      // res.cookie("userId", validUser.id); // To know which user logged In
      // console.log("cookie is saved in the browser");

      // "---- 🚀 JWT Authentication Approach-------"
      // { i. Define the token }
      // const token = generateTocken({
      //   id: validUser.id,
      //   name: validUser.name,
      //   email: validUser.email,
      // });

      // { ii. Set the cookie here with a token }
      // const isProduction = process.env.NODE_ENV === "production";
      // res.cookie("access_token", token, {
      //   httpOnly: true,
      //   secure: isProduction,
      //   sameSite: isProduction ? "none" : "lax",
      //   maxAge: 30 * 24 * 60 * 60 * 1000,
      // });

      // return res.status(200).json({
      //   success: true,
      //   message: "Logged in successfully",
      //   redirectTo: "/", // redirect to home page
      //   user: { email: email },
      //   token: token, // { NOTE: Return token for Bearer authentication }
      // });

      // "---- 🚀 Hybrid Authentication Approach-------"

      // {i. We need to create a Session.}
      const session = await createSession(validUser.id, {
        ip: req.clientIp,
        userAgent: req.headers["user-agent"],
      });

      // {ii. Create an Access token.}
      const accessToken = await createAccessTocken({
        id: validUser.id,
        name: validUser.name,
        email: validUser.email,
        sessionId: session,
      });

      // {iii. Create a Refresh token.}
      const refreshToken = await createRefreshToken(session);

      const isProduction = process.env.NODE_ENV === "production";
      
      // {iv. Send the access token to frontend}
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: ACCESS_TOKEN_EXPIRY,
      });

      // {v. Send the refresh token to frontend}
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: REFRESH_TOKEN_EXPIRY,
      });

      // {vi. After completion of login send the sucess message and the the page path to redirect.}
      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        redirectTo: "/", // redirect to home page
        user: { email: email },
      });
    } else {
      //{4. Otherwise redirect them to registration page}
      // A 404 Not Found error tells the frontend the resource (user) doesn't exist
      return res.status(404).json({
        success: false,
        message: "Account not found. Please create an account.",
        redirectTo: "/register",
      });
    }
  } catch (error) {
    console.error("Login DB error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to connect to the database. Please try again later.",
    });
  }
};

export const postRegister = async (req, res) => {
  // {1. Get the data from the user}
  // const { name, email, password } = req.body;

  // {1. Validate the incoming user data}
  const parsed = registerUserSchema.safeParse(req.body);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(errors)[0]?.[0];

    return res.status(400).json({
      success: false,
      message: firstError || "Validation failed",
      redirectTo: "/register",
      errors,
    });
  }

  // {Now get the data}
  const { name, email, password } = parsed.data;
  console.log("validated data:", parsed.data);

  try {
    // {2. Verify whether the user already exists}
    const userExists = await getUserByEmail({ email });
    console.log("userExists", userExists);

    if (userExists.length !== 0) {
      return res.status(409).json({
        success: false,
        message: "You have already registered.",
        redirectTo: "/login",
      });
    }

    // {3. Hash password and save new user}
    const hashedPassword = await hashPassword(password);
    await saveUserdata({ name, email, password: hashedPassword });

    return res.status(200).json({
      success: true,
      message: "Registered successfully",
      redirectTo: "/login",
      user: { email },
    });
  } catch (error) {
    console.error("Register DB error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to connect to the database. Please try again later.",
    });
  }
};

// "----💡 Session Authentication Approach-------"
// export const getCurrentUser = async (req, res) => {
//   try {
//     const isLoggedIn = req.cookies.isLoggedIn;
//     const userId = req.cookies.userId;

//     if (isLoggedIn !== "true" || !userId) {
//       return res.json({ loggedIn: false });
//     }

//     const [user] = await getUserById({ id: Number(userId) });

//     if (!user) {
//       return res.json({ loggedIn: false });
//     }

//     return res.json({
//       loggedIn: true,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     res.status(500).json({ error: "Server Error" });
//   }
// };

// "---- 🚀 JWT Authentication Approach-------"
export const getCurrentUser = async (req, res) => {
  try {
    // If requireAuth succeeds, req.user is guaranteed to be set correctly
    const [user] = await getUserById({ id: Number(req.user.id) });

    if (!user) {
      return res.json({ loggedIn: false });
    }

    return res.json({
      loggedIn: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Error in getCurrentUser:", err.message);
    return res.json({ loggedIn: false });
  }
};

export const logoutUser = async (req, res) => {
  try {
    // "----💡 Session Authentication Approach-------"
    // res.clearCookie("isLoggedIn");
    // res.clearCookie("userId");

    // "---- 🚀 JWT Authentication Approach-------"
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    return res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
