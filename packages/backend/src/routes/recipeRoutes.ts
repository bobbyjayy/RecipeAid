import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { suggestMealController } from "../controllers/recipeController";

const router = Router();
router.post("/suggest", requireAuth, suggestMealController);
// router.post("/suggest", suggestMealController);

export default router;
