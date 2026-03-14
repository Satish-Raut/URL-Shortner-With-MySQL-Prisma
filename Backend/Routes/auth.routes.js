import { Router } from "express";
import * as authoController from "../Controllers/auth.controller.js";

const router = Router();

// router.get("/regester", authoController.getRegisterPage);
// router.get("/login", authoController.getLoginPage);
// router.post("/login", authoController.getLoginPost);

router
  .route("/register")
  .get(authoController.getRegisterPage)
  .post(authoController.postRegister);

router
  .route("/login")
  .get(authoController.getLoginPage)
  .post(authoController.postLogin);

export const authRoutes = router;
