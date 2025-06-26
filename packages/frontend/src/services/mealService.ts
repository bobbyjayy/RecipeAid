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

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch("/api/recipes/suggest", {
    method: "POST",
    headers,
    body: JSON.stringify({ ingredients, cuisine, servings, mealTime }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const aiMeal = await res.json();
  return aiMeal;
}
