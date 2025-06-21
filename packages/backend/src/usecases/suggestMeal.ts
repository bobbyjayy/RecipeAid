import { getMealSuggestion } from "../gateways/openaiGateway";
import { Meal } from "../entities/Recipe";

export async function suggestMeal(
  ingredients: string[],
  cuisine: string,
  servings: number,
  mealTime: string
): Promise<Meal> {
  const list = ingredients.map((i) => `- ${i}`).join("\n");
  const prompt = `
You are a chef AI.
Given these ingredients (feel free to assume common pantry items like oil, salt, pepper):
${list}

Cuisine: ${cuisine}
Servings: ${servings}
Meal time: ${mealTime}

Suggest a complete three-course meal (appetizer, main, side dish). 
**For each ingredient**, include a realistic quantity (e.g. "2 tbsp soy sauce", "150g chicken breast").
Output a **JSON array** of objects with keys:
  - course (string: "Appetizer"/"Main"/"Side Dish")
  - title (string)
  - ingredients (string[] with quantities)
  - steps (string[])

  Respond ONLY with the JSON array. Do NOT include any Markdown formatting or code blocks.
  `;

  const text = await getMealSuggestion(prompt);
  //   console.log("typeof text:", typeof text);
  //   console.log("text content:", JSON.stringify(text));

  // Remove Markdown code block if present
  const cleaned = text.replace(/```json|```/g, "").trim();

  let meal: Meal;
  try {
    meal = JSON.parse(cleaned);
  } catch {
    throw new Error("Invalid AI response format.");
  }
  return meal;
}
