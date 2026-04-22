import { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import SummaryCard from './components/SummaryCard';
import FoodSearch from './components/FoodSearch';
import FoodLogList from './components/FoodLogList';
import WorkoutForm from './components/WorkoutForm';
import WorkoutList from './components/WorkoutList';
import GoalsPanel from './components/GoalsPanel';
import InsightsPanel from './components/InsightsPanel';
import { calculateDailyTotals } from './utils/nutrition';
import { DailyGoals, FoodLogEntry, WorkoutEntry } from './types';
import { Apple, Beef, Croissant, Droplets, Target } from 'lucide-react';

export default function App() {
  const [foodLogs, setFoodLogs] = useState<FoodLogEntry[]>([]);
  const [workouts, setWorkouts] = useState<WorkoutEntry[]>([]);
  const [goals, setGoals] = useState<DailyGoals>({
    calories: 2000,
    protein_g: 150,
    carbs_g: 200,
    fat_g: 65
  });

  const totals = useMemo(() => calculateDailyTotals(foodLogs, workouts), [foodLogs, workouts]);

  const handleAddFoodLog = (entry: Omit<FoodLogEntry, 'id' | 'timestamp'>) => {
    const newEntry: FoodLogEntry = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    setFoodLogs(prev => [newEntry, ...prev]);
  };

  const handleDeleteFoodLog = (id: string) => {
    setFoodLogs(prev => prev.filter(l => l.id !== id));
  };

  const handleAddWorkout = (entry: Omit<WorkoutEntry, 'id' | 'timestamp'>) => {
    const newEntry: WorkoutEntry = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    setWorkouts(prev => [newEntry, ...prev]);
  };

  const handleDeleteWorkout = (id: string) => {
    setWorkouts(prev => prev.filter(w => w.id !== id));
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      
      <main className="flex-1 p-6 grid grid-rows-[auto_1fr] gap-6 overflow-hidden max-w-[1400px] w-full mx-auto">
        
        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard 
            title="Net Calories" 
            value={`${totals.netCalories} / ${goals.calories}`}
            subtitle={`${totals.caloriesConsumed} in - ${totals.caloriesBurned} out`}
            icon={<Target size={20} className="text-emerald-500" />}
            colorClass="bg-emerald-100"
          />
          <SummaryCard 
            title="Protein" 
            value={`${totals.protein_g}g`}
            subtitle={`Goal: ${goals.protein_g}g`}
            icon={<Beef size={20} className="text-blue-500" />}
            colorClass="bg-rose-100"
          />
          <SummaryCard 
            title="Carbs" 
            value={`${totals.carbs_g}g`}
            subtitle={`Goal: ${goals.carbs_g}g`}
            icon={<Croissant size={20} className="text-amber-500" />}
            colorClass="bg-amber-100"
          />
          <SummaryCard 
            title="Fat" 
            value={`${totals.fat_g}g`}
            subtitle={`Goal: ${goals.fat_g}g`}
            icon={<Droplets size={20} className="text-orange-500" />}
            colorClass="bg-indigo-100"
          />
        </div>

        {/* Detail Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 pb-6 lg:pb-0 overflow-y-auto lg:overflow-hidden">
          
          {/* Food Diary Column */}
          <div className="lg:col-span-5 flex flex-col gap-6 min-h-0 h-full">
            <FoodSearch onAddLog={handleAddFoodLog} />
            <FoodLogList logs={foodLogs} onDeleteLog={handleDeleteFoodLog} />
          </div>

          {/* Workout & Goals Column */}
          <div className="lg:col-span-4 flex flex-col gap-6 min-h-0 h-full">
            <WorkoutList workouts={workouts} onDeleteWorkout={handleDeleteWorkout} />
            <WorkoutForm onAddWorkout={handleAddWorkout} />
          </div>
          
          {/* Insights Column */}
          <div className="lg:col-span-3 flex flex-col gap-6 min-h-0 h-full">
            <InsightsPanel totals={totals} goals={goals} />
            <GoalsPanel goals={goals} onUpdateGoals={setGoals} />
          </div>

        </div>
      </main>
    </div>
  );
}
