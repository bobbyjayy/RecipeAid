import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface IngredientTagProps {
  ingredient: string;
  onRemove: (ingredient: string) => void;
  onUpdate: (oldIngredient: string, newIngredient: string) => void;
}

export default function IngredientsTag({
  ingredient,
  onRemove,
  onUpdate,
}: IngredientTagProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(ingredient);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const commitEdit = () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== ingredient) {
      onUpdate(ingredient, trimmed);
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditValue(ingredient);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      commitEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  return (
    <motion.span
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="flex items-center bg-gray-200 text-gray-800 px-3 py-3 rounded-full mr-2 mb-2"
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitEdit}
          className="bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
        />
      ) : (
        <span onClick={() => setIsEditing(true)} className="cursor-pointer">
          {ingredient}
        </span>
      )}
      <button
        onClick={() => onRemove(ingredient)}
        className="ml-2 text-gray-500 hover:text-red-600 transition"
        aria-label={`Remove ${ingredient}`}
      >
        &times;
      </button>
    </motion.span>
  );
}
