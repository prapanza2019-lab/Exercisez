import { Trash2, Flame } from 'lucide-react';
import { WorkoutEntry } from '../types';

interface WorkoutListProps {
  workouts: WorkoutEntry[];
  onDeleteWorkout: (id: string) => void;
}

export default function WorkoutList({ workouts, onDeleteWorkout }: WorkoutListProps) {
  return (
    <section className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden min-h-0">
      <div className="p-4 border-b border-slate-50 flex items-center justify-between shrink-0">
        <h3 className="font-bold text-slate-800">Workouts</h3>
        <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded-md">
          {workouts.reduce((acc, w) => acc + w.caloriesBurned, 0)} kcal burned
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {workouts.length === 0 ? (
          <div className="text-center text-slate-400 text-sm mt-4">
            No workouts logged today.
          </div>
        ) : (
          workouts.map(workout => (
            <div key={workout.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 relative group">
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-700">{workout.name}</p>
                <p className="text-[10px] text-slate-400 tracking-wide">
                  {workout.durationMinutes} mins
                  {workout.notes && ` • ${workout.notes}`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono font-bold text-orange-500">-{workout.caloriesBurned}</p>
                <p className="text-[8px] text-slate-400 uppercase">kcal</p>
              </div>
              <button 
                onClick={() => onDeleteWorkout(workout.id)}
                className="absolute -right-2 -top-2 bg-slate-800 text-white p-1.5 rounded-full shadow-md hover:bg-red-500 opacity-0 group-hover:opacity-100 transition-all scale-75"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
