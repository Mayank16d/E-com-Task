import { Router } from "express";
import validate from "../middlewares/validate.js";

import { registerSeller, loginSeller } from "../controllers/sellerAuthController.js";
import { sellerRegisterSchema, sellerLoginSchema } from "../validators/sellerValidator.js";

const router = Router();

router.post("/register-seller", validate(sellerRegisterSchema), registerSeller);
router.post("/login-seller", validate(sellerLoginSchema), loginSeller);

export default router;
