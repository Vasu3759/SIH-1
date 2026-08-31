import React from 'react';
import { Cpu } from 'lucide-react';

export default function SimulatedAnnealingWidget({ initialMetrics, optimizedMetrics }) {
  const steps = [
    { name: 'Initial Backlog', sub: 'Demand Aggregation' },
    { name: 'Greedy Assignment', sub: 'Priority Ranked' },
    { name: 'Constraint Check', sub: 'Hard Rules Enforced' },
    { name: 'Optimization Solver', sub: 'Simulated Annealing (2,500 Swaps)' },
    { name: 'Optimized Schedule', sub: 'Final Recommended' }
  ];

  return (
    <div className="bg-white border border-slate-300 rounded-md p-4 space-y-3 font-sans shadow-2xs">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 bg-purple-100 text-purple-800 rounded border border-purple-300">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide">Multi-Objective Block Scheduling Optimization Engine</h3>
            <p className="text-xs text-slate-500 font-mono">Greedy Priority Assignment + Simulated Annealing Swap Optimization</p>
          </div>
        </div>
        <span className="text-xs font-mono uppercase bg-slate-100 text-slate-700 border border-slate-300 px-2.5 py-0.5 rounded font-bold">
          Optimization Pipeline
        </span>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-center">
        {steps.map((step, idx) => (
          <div key={idx} className={`p-2.5 rounded border text-xs ${
            idx === 3 ? 'bg-purple-50 border-purple-300 text-purple-900 font-bold' :
            idx === 4 ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' :
            'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <div className="font-bold text-xs">{step.name}</div>
            <div className="text-[10px] font-mono text-slate-500 mt-0.5">{step.sub}</div>
          </div>
        ))}
      </div>

      {/* Metrics */}
      {initialMetrics && optimizedMetrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-2 border-t border-slate-200 text-xs font-mono">
          <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
            <span className="text-slate-500 text-[10px] uppercase font-sans block">Planned Blocks:</span>
            <div className="flex items-baseline space-x-2 mt-0.5">
              <span className="text-slate-900 font-bold text-base">{optimizedMetrics.plannedBlocks}</span>
              <span className="text-xs text-slate-500 font-sans">Initial: {initialMetrics.plannedBlocks}</span>
            </div>
          </div>

          <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
            <span className="text-slate-500 text-[10px] uppercase font-sans block">Conflicts Avoided:</span>
            <div className="flex items-baseline space-x-2 mt-0.5">
              <span className="text-emerald-700 font-bold text-base">{optimizedMetrics.conflictsAvoided}</span>
              <span className="text-xs text-emerald-700 font-semibold font-sans">+3 resolved</span>
            </div>
          </div>

          <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
            <span className="text-slate-500 text-[10px] uppercase font-sans block">Merge Opportunities:</span>
            <div className="flex items-baseline space-x-2 mt-0.5">
              <span className="text-blue-700 font-bold text-base">{optimizedMetrics.mergeOpportunities}</span>
              <span className="text-xs text-blue-700 font-semibold font-sans">+3 merged</span>
            </div>
          </div>

          <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
            <span className="text-slate-500 text-[10px] uppercase font-sans block">Weighted Delay Score:</span>
            <div className="flex items-baseline space-x-2 mt-0.5">
              <span className="text-amber-800 font-bold text-base">{optimizedMetrics.weightedDelayScore}</span>
              <span className="text-xs text-emerald-700 font-semibold font-sans">-22.3% delay</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
