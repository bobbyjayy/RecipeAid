import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { suggestMealController } from "../controllers/recipeController";

const router = Router();

// for the openai route to make recipes
// make sure auth middleware is implemented for access
router.post("/suggest", requireAuth, suggestMealController);

export default router;
