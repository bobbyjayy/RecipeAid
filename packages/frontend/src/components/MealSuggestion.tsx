import type { Meal } from "../types/Meal";

export default function MealSugesstion({ suggestion }: { suggestion: Meal }) {
  if (!suggestion.length) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {suggestion.map((course, idx) => (
        <div key={idx} className="border p-4 rounded shadow bg-yellow-50">
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
  );
}
