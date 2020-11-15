import { Router } from "express";
const router = Router();

import * as productsController from "../controllers/products.controller";
import { authHandler } from "../utils/middlewares";

router.post(
  "/",
  [authHandler.verifyToken, authHandler.isModerator, authHandler.isAdmin],
  productsController.createProduct
);
router.get("/", productsController.getProducts);
router.get("/:productId", productsController.getProductById);
router.put(
  "/:productId",
  [authHandler.verifyToken, authHandler.isModerator, authHandler.isAdmin],
  productsController.updateProductById
);
router.delete(
  "/:productId",
  [authHandler.verifyToken, authHandler.isModerator, authHandler.isAdmin],
  productsController.deleteProductById
);

export default router;
