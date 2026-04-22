import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { foodSeed } from '../data/foodSeed';
import { FoodItem, FoodLogEntry, MealType } from '../types';

interface FoodSearchProps {
  onAddLog: (entry: Omit<FoodLogEntry, 'id' | 'timestamp'>) => void;
}

export default function FoodSearch({ onAddLog }: FoodSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedMeal, setSelectedMeal] = useState<MealType>('breakfast');
  const [multiplier, setMultiplier] = useState(1);
  const [results, setResults] = useState<FoodItem[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    
    if (val.trim().length > 0) {
      const filtered = foodSeed.filter(f => 
        f.name.toLowerCase().includes(val.toLowerCase()) || 
        f.name_th.includes(val) ||
        f.search_keywords.some(k => k.toLowerCase().includes(val.toLowerCase()))
      );
      setResults(filtered.slice(0, 8));
    } else {
      setResults([]);
    }
  };

  const handleAdd = (food: FoodItem) => {
    onAddLog({ food, multiplier, meal: selectedMeal });
    setQuery('');
    setResults([]);
    setMultiplier(1);
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-100 shrink-0 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-slate-50 flex items-center justify-between shrink-0">
        <h3 className="font-bold text-slate-800">Add Food</h3>
      </div>
      
      <div className="p-4 flex flex-col gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search food database..."
            value={query}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700"
          />
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
        </div>
        
        <div className="flex gap-2">
          <select 
            value={selectedMeal}
            onChange={(e) => setSelectedMeal(e.target.value as MealType)}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
          
          <select
            value={multiplier}
            onChange={(e) => setMultiplier(Number(e.target.value))}
            className="w-20 bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>
      </div>

      {results.length > 0 && (
        <ul className="border-t border-slate-100 divide-y divide-slate-100 max-h-48 overflow-y-auto px-2 pb-2">
          {results.map(food => (
            <li key={food.id} className="p-2 hover:bg-slate-50 flex items-center justify-between rounded-lg mt-1 transition-colors group">
              <div>
                <p className="text-sm font-semibold text-slate-700">{food.name} <span className="text-[10px] font-normal text-slate-500">({food.name_th})</span></p>
                <div className="text-[10px] text-slate-400 mt-0.5 flex gap-2">
                  <span>{food.serving.amount} {food.serving.unit} ({food.serving.grams}g)</span>
                  <span>•</span>
                  <span className="text-slate-600 font-mono">{food.nutrition.calories} kcal</span>
                </div>
              </div>
              <button 
                onClick={() => handleAdd(food)}
                className="p-1.5 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors font-bold"
                title="Add to daily log"
              >
                <Plus size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
