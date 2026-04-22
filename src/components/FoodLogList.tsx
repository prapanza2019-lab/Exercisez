import { Trash2 } from 'lucide-react';
import { FoodLogEntry, MealType } from '../types';

interface FoodLogListProps {
  logs: FoodLogEntry[];
  onDeleteLog: (id: string) => void;
}

export default function FoodLogList({ logs, onDeleteLog }: FoodLogListProps) {
  const mealGroups: Record<MealType, FoodLogEntry[]> = {
    breakfast: logs.filter(l => l.meal === 'breakfast'),
    lunch: logs.filter(l => l.meal === 'lunch'),
    dinner: logs.filter(l => l.meal === 'dinner'),
    snack: logs.filter(l => l.meal === 'snack'),
  };

  return (
    <section className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden min-h-0">
      <div className="p-4 border-b border-slate-50 flex items-center justify-between shrink-0">
        <h3 className="font-bold text-slate-800">Food Diary</h3>
      </div>
      
      {logs.length === 0 ? (
        <div className="p-8 text-center text-slate-400 text-sm">
          No food logged yet. Search above to add items.
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-6 pt-4">
          {(Object.entries(mealGroups) as [MealType, FoodLogEntry[]][]).map(([meal, entries]) => {
            if (entries.length === 0) return null;
            
            const mealCals = entries.reduce((sum, e) => sum + (e.food.nutrition.calories * e.multiplier), 0);
            
            return (
              <div key={meal}>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">{meal}</span>
                  <span className="text-xs font-medium text-slate-500">{Math.round(mealCals)} kcal</span>
                </div>
                
                <div className="space-y-2">
                  {entries.map(entry => (
                    <div key={entry.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 group border border-transparent hover:border-slate-100 transition-colors">
                      <div>
                        <p className="text-sm font-semibold text-slate-700">{entry.food.name}</p>
                        <p className="text-[10px] text-slate-400">
                          {entry.multiplier}x {entry.food.serving.unit} • {Math.round(entry.food.nutrition.protein_g * entry.multiplier)}g P / {Math.round(entry.food.nutrition.carbs_g * entry.multiplier)}g C / {Math.round(entry.food.nutrition.fat_g * entry.multiplier)}g F
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono text-slate-600">
                          {Math.round(entry.food.nutrition.calories * entry.multiplier)} kcal
                        </span>
                        <button 
                          onClick={() => onDeleteLog(entry.id)}
                          className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
