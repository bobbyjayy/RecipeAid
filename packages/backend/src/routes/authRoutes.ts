import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController";
import { validateBody } from "../middleware/validate";
import { authSchema } from "../schemas/authSchemas";

const router = Router();

// make sure to add zod middleware to check the email and password etc.
router.post("/register", validateBody(authSchema), registerController);
router.post("/login", validateBody(authSchema), loginController);

export default router;
