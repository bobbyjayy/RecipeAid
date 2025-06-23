import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController";
import { validateBody } from "../middleware/validate";
import { authSchema } from "../schemas/authSchemas";

const router = Router();

router.post("/register", validateBody(authSchema), registerController);
router.post("/login", validateBody(authSchema), loginController);

export default router;
