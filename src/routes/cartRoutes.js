import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addToCart, getCart } from "../controllers/cartController.js";

const router = Router();

router.post("/add", auth, addToCart);
router.get("/", auth, getCart);

export default router;
