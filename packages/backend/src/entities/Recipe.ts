export interface Recipe {
  course: string;
  title: string;
  ingredients: string[];
  steps: string[];
}

export type Meal = Recipe[];
