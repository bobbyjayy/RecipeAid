const cuisineOptions = [
  "American",
  "Japanese",
  "Italian",
  "Mexican",
  "Chinese",
];

const mealOptions = ["Breakfast", "Lunch", "Dinner"];

export default function MealForm({
  cuisine,
  setCuisine,
  servings,
  setServings,
  mealTime,
  setMealTime,
}: {
  cuisine: string;
  setCuisine: (v: string) => void;
  servings: number;
  setServings: (v: number) => void;
  mealTime: string;
  setMealTime: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4 flex">
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
  );
}
