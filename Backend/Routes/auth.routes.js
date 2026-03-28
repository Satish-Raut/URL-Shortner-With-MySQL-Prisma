import { Router } from "express";
import * as authoController from "../Controllers/auth.controller.js";

const router = Router();

// router.get("/regester", authoController.getRegisterPage);
// router.get("/login", authoController.getLoginPage);
// router.post("/login", authoController.getLoginPost);

router
  .route("/register")
  // .get(authoController.getRegisterPage)
  .post(authoController.postRegister);

router
  .route("/login")
  // .get(authoController.getLoginPage)
  .post(authoController.postLogin);

import { requireAuth } from "../Middleware/auth.middleware.js";

// Route to check the user is logged in or not (Used for logout feature handling at Frontend)
router.get("/auth/me", requireAuth, authoController.getCurrentUser );

// Logout the user
router.post("/logout", authoController.logoutUser);
export const authRoutes = router;
