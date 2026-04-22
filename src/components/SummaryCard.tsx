import { ReactNode } from 'react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  colorClass: string;
}

export default function SummaryCard({ title, value, subtitle, icon }: SummaryCardProps) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        <div className="text-slate-400 opacity-80">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-2xl font-bold text-slate-800 tracking-tight">{value}</span>
      </div>
      {subtitle && <div className="text-[10px] text-slate-500 mt-2 font-medium">{subtitle}</div>}
    </div>
  );
}
