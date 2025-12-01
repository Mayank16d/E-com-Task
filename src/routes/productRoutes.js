import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addProduct, listProducts } from "../controllers/productController.js";

const router = Router();

router.post("/", auth, addProduct);
router.get("/", listProducts);

export default router;
