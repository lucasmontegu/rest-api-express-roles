import { Router } from "express";
const router = Router();

import * as authController from "../controllers/auth.controller";
import { validationHandler } from "../utils/middlewares";

router.post(
  "/register",
  [
    validationHandler.checkIsExistUsernameOrEmail,
    validationHandler.checkRolesExisted,
  ],
  authController.register
);
router.post("/login", authController.login);

export default router;
