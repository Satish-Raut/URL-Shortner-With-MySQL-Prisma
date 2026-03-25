import express from "express";
import cors from "cors";
import "dotenv/config";
import { shortnerRouter } from "./Routes/urlRoutes.routes.js";
import { authRoutes } from "./Routes/auth.routes.js";
import cookieParser from "cookie-parser";

//{ NOTE: Create the Express-Server}
const app = express();

// { NOTE: Important for cookies to work on Render/Vercel behind a proxy }
app.set("trust proxy", 1);

//{ NOTE: Write the usefull middlewares}
app.use(express.json()); // Enable JSON parsing
app.use(express.urlencoded({ extended: true }));

//{ NOTE: Correcting common CORS mistake: remove trailing slash from FRONTEND_URL if present}
const allowedOrigin = (
  process.env.FRONTEND_URL || "http://localhost:5173"
).replace(/\/$/, "");

app.use(
  cors({
    // origin: process.env.FRONTEND_URL || "http://localhost:5173
    origin: allowedOrigin,
    credentials: true,
  }),
);

// {Cookie Parser middleware}
app.use(cookieParser());

// {NOTE: The purpose of this Middleware is to define the routes}
app.use(authRoutes);
app.use(shortnerRouter);

//{ NOTE: Finally listen the app at a particular port}
// console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log(`Server Running at PORT: ${process.env.PORT}`);
});
