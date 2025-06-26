import { Router } from "express";
// import { requireAuth } from "../middleware/auth";
import rateLimit from "express-rate-limit";
import { suggestMealController } from "../controllers/recipeController";

const router = Router();

const guestLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: {
    error: "Please log in to continue using the meal suggestion feature.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => !!req.headers.authorization,
});

// for the openai route to make recipes
// make sure auth middleware is implemented for access
// router.post("/suggest", requireAuth, suggestMealController);
router.post("/suggest", guestLimiter, suggestMealController);

export default router;
