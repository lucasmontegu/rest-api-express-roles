import { Router } from "express";
import * as userController from "../controllers/users.controller";
import { authHandler, validationHandler } from "../utils/middlewares";

const router = Router();

router.post(
  "/",
  [
    authHandler.verifyToken,
    authHandler.isAdmin,
    validationHandler.checkRolesExisted,
  ],
  userController.createUser
);

router.get(
  "/",
  [authHandler.verifyToken, authHandler.isAdmin],
  userController.getUsers
);

router.get(
  "/:userId",
  [authHandler.verifyToken, authHandler.isAdmin],
  userController.getUserById
);

router.put(
  "/:userId",
  [authHandler.verifyToken, authHandler.isAdmin],
  userController.updateUserById
);

router.delete(
  "/:userId",
  [authHandler.verifyToken, authHandler.isAdmin],
  userController.deleteUserById
);

export default router;
