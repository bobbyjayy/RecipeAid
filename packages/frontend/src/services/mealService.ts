export async function suggestMeal({
  ingredients,
  cuisine,
  servings,
  mealTime,
}: {
  ingredients: string[];
  cuisine: string;
  servings: number;
  mealTime: string;
}) {
  const res = await fetch("/api/recipes/suggest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients, cuisine, servings, mealTime }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const aiMeal = await res.json();
  return aiMeal;
}
