import { useState } from "react";
import IngredientsTag from "./components/IngredientsTag";
import { AnimatePresence } from "motion/react";
import type { Meal } from "./types/Meal";

const cuisineOptions = [
  "American",
  "Japanese",
  "Italian",
  "Mexican",
  "Chinese",
];
const mealOptions = ["Breakfast", "Lunch", "Dinner"];

function App() {
  const [suggestion, setSuggestion] = useState<Meal>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const [cuisine, setCuisine] = useState<string>(cuisineOptions[0]);
  const [servings, setServings] = useState<number>(2);
  const [mealTime, setMealTime] = useState<string>(mealOptions[0]);

  const addIngredient = () => {
    const trimmed = input.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients((prev) => [...prev, trimmed]);
      setInput("");
    }
  };

  const removeIngredient = (toRemove: string) => {
    setIngredients((prev) => prev.filter((ing) => ing !== toRemove));
  };

  const updateIngredient = (oldIng: string, newIng: string) => {
    setIngredients((prev) =>
      prev.map((ing) => (ing === oldIng ? newIng : ing))
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addIngredient();
    }
  };

  const suggestMeal = async () => {
    const res = await fetch("/api/recipes/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients, cuisine, servings, mealTime }),
    });

    if (!res.ok) {
      console.log("Suggest error:", await res.text());
      return;
    }

    const text = await res.text();
    let aiMeal: Meal;
    try {
      aiMeal = JSON.parse(text);
    } catch {
      console.error("Failed to JSON.parse AI response");
      return;
    }
    setSuggestion(Array.isArray(aiMeal) ? aiMeal : [aiMeal]);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Build Your Recipe</h1>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">Cuisine</label>
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="border rounded px-3 py-2 w-full focus:outline-none"
          >
            {cuisineOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Servings</label>
          <input
            type="number"
            min={1}
            value={servings}
            onChange={(e) => setServings(Number(e.target.value))}
            className="border rounded px-3 py-2 w-full focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <label className="block mb-1 font-medium">Meal Time</label>
          <select
            value={mealTime}
            onChange={(e) => setMealTime(e.target.value)}
            className="border rounded px-3 py-2 w-full focus:outline-none"
          >
            {mealOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add an ingredient"
          className="border rounded-1 px-3 py-2 flex-grow focus:outline-none"
        />
        <button
          onClick={addIngredient}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap mb-4 mt-4">
        <AnimatePresence>
          {ingredients.map((ing) => (
            <IngredientsTag
              key={ing}
              ingredient={ing}
              onRemove={removeIngredient}
              onUpdate={updateIngredient}
            />
          ))}
        </AnimatePresence>
      </div>

      <button
        onClick={suggestMeal}
        className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
      >
        Suggest a Meal
      </button>
      {suggestion.length > 0 && (
        <div className="mt-6 space-y-6">
          {suggestion.map((course, idx) => (
            <div key={idx} className="border p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">{course.title}</h2>
              <h3 className="font-semibold">Ingredients:</h3>
              {course.ingredients && course.ingredients.length > 0 ? (
                <ul className="list-disc list-inside mb-2">
                  {course.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              ) : (
                <p className="italic text-gray-500">No ingredients provided.</p>
              )}
              <h3 className="font-semibold">Steps:</h3>
              {course.steps && course.steps.length > 0 ? (
                <ol className="list-decimal list-inside">
                  {course.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              ) : (
                <p className="italic text-gray-500">No steps provided.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
