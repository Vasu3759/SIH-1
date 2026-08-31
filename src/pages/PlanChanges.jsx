import React from 'react';
import { INITIAL_WEEKLY_PLAN } from '../data/mockData';
import { runOptimizationSimulation, generatePlanChanges } from '../services/planningEngine';

export default function PlanChanges() {
  const { optimizedPlan } = runOptimizationSimulation(INITIAL_WEEKLY_PLAN, { type: 'REDUCED_CAPACITY' });
  const diffs = generatePlanChanges(INITIAL_WEEKLY_PLAN, optimizedPlan);

  return (
    <div className="space-y-4 pb-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded border border-slate-300 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight uppercase">Weekly Plan Changes Diff Inspector</h2>
            <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded">
              AUDIT TRAIL
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Side-by-side diff comparison showing exact block movements, additions, deferrals, and operational rationale.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono bg-slate-50 border border-slate-300 px-3.5 py-1.5 rounded text-amber-800 font-bold">
          <span>Staged Changes: <strong>2 Moved, 4 Unchanged</strong></span>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
        <div className="bg-slate-50 p-2.5 rounded border border-emerald-300 flex items-center justify-between">
          <span className="text-slate-600 font-sans text-[11px]">ADDED:</span>
          <strong className="text-emerald-700 font-bold">0 Blocks</strong>
        </div>
        <div className="bg-slate-50 p-2.5 rounded border border-amber-300 flex items-center justify-between">
          <span className="text-slate-600 font-sans text-[11px]">MOVED:</span>
          <strong className="text-amber-800 font-bold">2 Blocks</strong>
        </div>
        <div className="bg-slate-50 p-2.5 rounded border border-red-300 flex items-center justify-between">
          <span className="text-slate-600 font-sans text-[11px]">REMOVED:</span>
          <strong className="text-red-700 font-bold">0 Blocks</strong>
        </div>
        <div className="bg-slate-50 p-2.5 rounded border border-slate-300 flex items-center justify-between">
          <span className="text-slate-600 font-sans text-[11px]">UNCHANGED:</span>
          <strong className="text-slate-800 font-bold">4 Blocks</strong>
        </div>
      </div>

      {/* Main Diff Cards */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Detailed Block Movements Diff</h3>

        <div className="space-y-2.5">
          {diffs.map((diff) => {
            const isMoved = diff.type === 'MOVED';
            const isAdded = diff.type === 'ADDED';
            const isRemoved = diff.type === 'REMOVED';

            return (
              <div 
                key={diff.id} 
                className={`rail-card p-4 space-y-2.5 transition-all ${
                  isMoved ? 'border-amber-300 bg-amber-50/40' :
                  isAdded ? 'border-emerald-300 bg-emerald-50/40' :
                  isRemoved ? 'border-red-300 bg-red-50/40' :
                  'bg-white opacity-90'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5 border-b border-slate-200 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase ${
                      isMoved ? 'rail-badge-amber' :
                      isAdded ? 'rail-badge-green' :
                      isRemoved ? 'rail-badge-red' :
                      'bg-slate-100 text-slate-600 border border-slate-300'
                    }`}>
                      {diff.type}
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs font-sans">{diff.item}</h4>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Dept: {diff.department}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200 space-y-0.5">
                    <span className="text-[9px] text-slate-500 font-sans uppercase font-bold block">Baseline Schedule Slot</span>
                    <strong className="text-slate-800 block">{diff.baselineSlot}</strong>
                  </div>

                  <div className={`p-2.5 rounded border space-y-0.5 ${
                    isMoved ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}>
                    <span className="text-[9px] text-slate-600 font-sans uppercase font-bold block">Updated Recommended Slot</span>
                    <strong className="block">{diff.updatedSlot}</strong>
                  </div>
                </div>

                <div className="text-[10px] font-sans text-slate-700 bg-slate-50 p-2 rounded border border-slate-200 flex items-start space-x-1.5">
                  <span className="text-amber-800 font-bold shrink-0">Rationale:</span>
                  <span className="italic text-slate-700">{diff.reason}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
