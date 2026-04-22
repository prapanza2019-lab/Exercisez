import { Sparkles, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';
import { DailyGoals, DailyTotals } from '../types';
import { generateInsights } from '../utils/insights';

interface InsightsPanelProps {
  totals: DailyTotals;
  goals: DailyGoals;
}

export default function InsightsPanel({ totals, goals }: InsightsPanelProps) {
  const insights = generateInsights(totals, goals);
  
  const getIconForInsight = (text: string) => {
    if (text.includes("ยอดเยี่ยม") || text.includes("เยี่ยมมาก") || text.includes("พอดี") || text.includes("ได้ดีมาก")) return <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />;
    if (text.includes("เกิน")) return <AlertCircle size={16} className="text-orange-500 mt-0.5 shrink-0" />;
    if (text.includes("ขาด")) return <TrendingUp size={16} className="text-blue-500 mt-0.5 shrink-0" />;
    return <Sparkles size={16} className="text-indigo-500 mt-0.5 shrink-0" />;
  };

  return (
    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-4 overflow-hidden flex flex-col min-h-0">
      <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4 shrink-0">
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-emerald-500"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        AI Insights
      </h3>
      
      <div className="flex-1 overflow-y-auto space-y-3">
        {insights.map((insight, idx) => (
          <div key={idx} className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex gap-3">
            {getIconForInsight(insight)}
            <p className="text-[11px] text-emerald-800 leading-relaxed font-medium">{insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
