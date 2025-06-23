import { Request, Response } from "express";
import { suggestMeal } from "../usecases/suggestMeal";
import { openaiGateway } from "../gateways/openaiGateway";

export async function suggestMealController(req: Request, res: Response) {
  try {
    const { ingredients, cuisine, servings, mealTime } = req.body;
    if (!ingredients?.length) {
      res.status(400).json({ error: "No ingredients provided." });
      return;
    }
    const meal = await suggestMeal(
      ingredients,
      cuisine,
      servings,
      mealTime,
      openaiGateway
    );
    res.status(200).json(meal);
  } catch (e: any) {
    res.status(502).json({ error: e.message });
  }
}
