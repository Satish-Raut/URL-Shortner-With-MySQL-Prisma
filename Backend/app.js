import express from "express";
import cors from "cors";
import "dotenv/config";
import { shortnerRouter } from "./Routes/urlRoutes.routes.js";

//{ NOTE: Create the Express-Server}
const app = express();

//{ NOTE: Write the usefull middlewares}
app.use(express.json()); // Enable JSON parsing
app.use(express.urlencoded({ extended: true }));

//{ NOTE: The purpose of this middleware is to Configures the security bridge to ONLY allow requests from your specific frontend URL.}
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);

// {NOTE: The purpose of this Middleware is to define the routes}
app.use(shortnerRouter);

//{ NOTE: Finally listen the app at a particular port}
// console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log(`Server Running at PORT: ${process.env.PORT}`);
});
