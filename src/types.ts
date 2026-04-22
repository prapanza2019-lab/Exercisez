export interface Serving {
  amount: number;
  unit: string;
  grams: number;
}

export interface Nutrition {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
  sugar_g: number;
  sodium_mg: number;
}

export interface FoodItem {
  id: string;
  name: string;
  name_th: string;
  category: string;
  cuisine: string;
  serving: Serving;
  nutrition: Nutrition;
  meal_tags: string[];
  diet_tags: string[];
  search_keywords: string[];
  source_note: string;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface FoodLogEntry {
  id: string;
  food: FoodItem;
  multiplier: number;
  meal: MealType;
  timestamp: number;
}

export interface WorkoutEntry {
  id: string;
  name: string;
  durationMinutes: number;
  caloriesBurned: number;
  notes: string;
  timestamp: number;
}

export interface DailyGoals {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}

export interface DailyTotals {
  caloriesConsumed: number;
  caloriesBurned: number;
  netCalories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}
