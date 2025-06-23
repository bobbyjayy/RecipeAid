import { useState } from "react";
import type { Meal } from "../types/Meal";
import IngredientInput from "../components/IngredientInput";
import MealForm from "../components/MealForm";
import MealSuggestion from "../components/MealSuggestion";
import { suggestMeal } from "../services/mealService";

function MealBuilder() {
  const [suggestion, setSuggestion] = useState<Meal>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const [cuisine, setCuisine] = useState<string>("American");
  const [servings, setServings] = useState<number>(2);
  const [mealTime, setMealTime] = useState<string>("Breakfast");

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

  const handleSuggestMeal = async () => {
    const meal = await suggestMeal({
      ingredients,
      cuisine,
      servings,
      mealTime,
    });
    setSuggestion(meal);
  };

  return (
    <div className="p-4 md:p-8 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Build Your Recipe</h1>

      <MealForm
        cuisine={cuisine}
        setCuisine={setCuisine}
        servings={servings}
        setServings={setServings}
        mealTime={mealTime}
        setMealTime={setMealTime}
      />

      <IngredientInput
        ingredients={ingredients}
        input={input}
        setInput={setInput}
        addIngredient={addIngredient}
        removeIngredient={removeIngredient}
        updateIngredient={updateIngredient}
        handleKeyDown={handleKeyDown}
      />

      <button
        onClick={handleSuggestMeal}
        className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded"
      >
        Suggest a Meal
      </button>

      <MealSuggestion suggestion={suggestion} />
    </div>
  );
}

export default MealBuilder;
