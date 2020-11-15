import { Router } from "express";
import users from "./user";
import products from "./products";
import auth from "./auth";

const router = Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/products", products);

export default router;
