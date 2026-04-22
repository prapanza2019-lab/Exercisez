import { useState } from 'react';
import { Activity } from 'lucide-react';
import { WorkoutEntry } from '../types';

interface WorkoutFormProps {
  onAddWorkout: (entry: Omit<WorkoutEntry, 'id' | 'timestamp'>) => void;
}

export default function WorkoutForm({ onAddWorkout }: WorkoutFormProps) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !duration || !calories) return;

    onAddWorkout({
      name,
      durationMinutes: Number(duration),
      caloriesBurned: Number(calories),
      notes
    });

    setName('');
    setDuration('');
    setCalories('');
    setNotes('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 shrink-0 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-slate-50 flex items-center justify-between shrink-0">
        <h3 className="font-bold text-slate-800">Add Workout</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Workout Name</label>
          <input 
            type="text" 
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g., Morning Run"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Duration (min)</label>
            <input 
              type="number" 
              required
              min="1"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Calories Burned</label>
            <input 
              type="number" 
              required
              min="1"
              value={calories}
              onChange={e => setCalories(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Notes (Optional)</label>
          <input 
            type="text" 
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg py-2 transition-colors"
        >
          Add Workout
        </button>
      </form>
    </div>
  );
}
