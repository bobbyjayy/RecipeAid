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
  const token = localStorage.getItem("token");

  const res = await fetch("/api/recipes/suggest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ingredients, cuisine, servings, mealTime }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const aiMeal = await res.json();
  return aiMeal;
}
