import { Activity, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
      <div className="max-w-[1400px] w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
            <Activity size={18} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-emerald-700">FitLog <span className="text-slate-400">AI</span></h1>
        </div>
        <button className="md:hidden text-slate-500 hover:text-slate-800 transition-colors">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
}
