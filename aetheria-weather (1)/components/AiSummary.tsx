
import React from 'react';
import { AiInsights } from '../types';

interface Props {
  insights: AiInsights | null;
  loading: boolean;
}

const AiSummary: React.FC<Props> = ({ insights, loading }) => {
  if (loading) {
    return (
      <div className="glass rounded-3xl p-8 mt-6 animate-pulse">
        <div className="h-4 bg-slate-700/50 rounded w-1/4 mb-6"></div>
        <div className="h-4 bg-slate-700/50 rounded w-full mb-3"></div>
        <div className="h-4 bg-slate-700/50 rounded w-5/6"></div>
      </div>
    );
  }

  if (!insights) return null;

  return (
    <div className="glass rounded-3xl p-8 mt-6 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg shadow-lg">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-slate-200 font-bold uppercase tracking-widest text-sm">Aetheria AI Insights</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-lg text-slate-100 leading-relaxed mb-4">{insights.summary}</p>
          <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-4 rounded-r-xl">
            <span className="block text-cyan-400 text-xs font-bold uppercase mb-1">What to wear</span>
            <p className="text-slate-200 font-medium">{insights.outfitAdvice}</p>
          </div>
          {insights.alert && (
            <div className="mt-4 bg-orange-500/10 border-l-4 border-orange-500 p-4 rounded-r-xl">
              <span className="block text-orange-400 text-xs font-bold uppercase mb-1">Alert</span>
              <p className="text-slate-200 font-medium">{insights.alert}</p>
            </div>
          )}
        </div>

        <div>
          <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Recommended for Today</h4>
          <div className="flex flex-col gap-3">
            {insights.activities.map((act, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all cursor-default">
                <span className="w-8 h-8 flex items-center justify-center bg-slate-800 rounded-full text-cyan-400 font-bold text-sm">{i + 1}</span>
                <p className="text-slate-200 font-medium">{act}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiSummary;
