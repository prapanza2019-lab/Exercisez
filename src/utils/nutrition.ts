import { DailyTotals, FoodLogEntry, WorkoutEntry } from '../types';

export function calculateDailyTotals(logs: FoodLogEntry[], workouts: WorkoutEntry[]): DailyTotals {
  let caloriesConsumed = 0;
  let protein_g = 0;
  let carbs_g = 0;
  let fat_g = 0;

  for (const log of logs) {
    const multi = log.multiplier;
    caloriesConsumed += log.food.nutrition.calories * multi;
    protein_g += log.food.nutrition.protein_g * multi;
    carbs_g += log.food.nutrition.carbs_g * multi;
    fat_g += log.food.nutrition.fat_g * multi;
  }

  const caloriesBurned = workouts.reduce((total, w) => total + w.caloriesBurned, 0);

  return {
    caloriesConsumed: Math.round(caloriesConsumed),
    caloriesBurned: Math.round(caloriesBurned),
    netCalories: Math.round(caloriesConsumed - caloriesBurned),
    protein_g: Math.round(protein_g),
    carbs_g: Math.round(carbs_g),
    fat_g: Math.round(fat_g),
  };
}
