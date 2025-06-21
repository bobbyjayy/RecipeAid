import { Router } from "express";
import { suggestMealController } from "../controllers/recipeController";

const router = Router();
router.post("/suggest", suggestMealController);

export default router;
