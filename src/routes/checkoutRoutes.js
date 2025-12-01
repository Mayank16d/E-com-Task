import { Router } from "express";
import auth from "../middlewares/auth.js";
import { placeOrder } from "../controllers/checkoutController.js";

const router = Router();

router.post("/place", auth, placeOrder);

export default router;
