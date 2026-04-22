import { Target } from 'lucide-react';
import { DailyGoals } from '../types';

interface GoalsPanelProps {
  goals: DailyGoals;
  onUpdateGoals: (goals: DailyGoals) => void;
}

export default function GoalsPanel({ goals, onUpdateGoals }: GoalsPanelProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdateGoals({
      ...goals,
      [name]: Number(value)
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 shrink-0">
      <h3 className="font-bold text-slate-800 text-sm mb-4">Macro Goals</h3>
      
      <div className="space-y-4">
        <div>
          <label className="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-1">
            <span>Calories</span>
            <span className="text-slate-800">{goals.calories} kcal</span>
          </label>
          <input 
            type="range" 
            name="calories"
            min="1200" max="4000" step="50"
            value={goals.calories}
            onChange={handleChange}
            className="w-full accent-emerald-500"
          />
        </div>
        
        <div>
          <label className="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-1">
            <span>Protein</span>
            <span className="text-slate-800">{goals.protein_g} g</span>
          </label>
          <input 
            type="range" 
            name="protein_g"
            min="40" max="250" step="5"
            value={goals.protein_g}
            onChange={handleChange}
            className="w-full accent-blue-500"
          />
        </div>

        <div>
          <label className="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-1">
            <span>Carbohydrates</span>
            <span className="text-slate-800">{goals.carbs_g} g</span>
          </label>
          <input 
            type="range" 
            name="carbs_g"
            min="50" max="400" step="5"
            value={goals.carbs_g}
            onChange={handleChange}
            className="w-full accent-amber-500"
          />
        </div>

        <div>
          <label className="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-1">
            <span>Fat</span>
            <span className="text-slate-800">{goals.fat_g} g</span>
          </label>
          <input 
            type="range" 
            name="fat_g"
            min="20" max="150" step="5"
            value={goals.fat_g}
            onChange={handleChange}
            className="w-full accent-orange-500"
          />
        </div>
      </div>
    </div>
  );
}
