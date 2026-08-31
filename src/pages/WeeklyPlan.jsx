import React, { useState } from 'react';
import SimulatedAnnealingWidget from '../components/SimulatedAnnealingWidget';
import BlockDetailsDrawer from '../components/BlockDetailsDrawer';
import { INITIAL_WEEKLY_PLAN, CONFIRMED_TRAIN_PATHS } from '../data/mockData';
import { runOptimizationSimulation } from '../services/planningEngine';
import { Clock, MapPin, CheckCircle2, Train } from 'lucide-react';

export default function WeeklyPlan() {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [activePlan, setActivePlan] = useState(INITIAL_WEEKLY_PLAN);
  
  const simResult = runOptimizationSimulation(INITIAL_WEEKLY_PLAN);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="space-y-4 pb-10 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded border border-slate-300 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight uppercase">Weekly Firm Maintenance Schedule</h2>
            <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded">
              FIRM HORIZON
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Exact time-window proposals with train path safety buffer verification • Northern Railway (Delhi Division)
          </p>
        </div>
        <div className="flex items-center space-x-2 shrink-0 font-mono text-xs">
          <span className="text-slate-800 bg-slate-100 px-3 py-1 rounded border border-slate-300">
            Week 1: <strong>01 Sep – 07 Sep 2026</strong>
          </span>
        </div>
      </div>

      {/* Simulated Annealing Algorithm Widget */}
      <SimulatedAnnealingWidget 
        initialMetrics={simResult.initialMetrics}
        optimizedMetrics={simResult.optimizedMetrics}
      />

      {/* Train-Path Context Visualizer */}
      <div className="rail-card p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center space-x-1.5 font-sans">
            <Train className="w-4 h-4 text-blue-700" />
            <span>COA Confirmed Passenger & Freight Train Path Context</span>
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">15-min safety buffer enforced before & after paths</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs font-mono">
          {CONFIRMED_TRAIN_PATHS.slice(0, 3).map((train, idx) => (
            <div key={idx} className="bg-slate-50 p-2 rounded border border-slate-200 flex items-center justify-between text-[11px]">
              <div>
                <strong className="text-slate-900 font-bold font-sans">Train #{train.trainNo}</strong>
                <span className="block text-[10px] text-slate-500 font-sans">{train.name} ({train.type})</span>
              </div>
              <div className="text-right">
                <span className="text-amber-800 font-bold">{train.depTime} – {train.arrTime}</span>
                <span className="block text-[10px] text-slate-500">{train.blockSection} {train.line}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Gantt Board */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">7-Day Operational Planning Board</h3>

        <div className="grid grid-cols-1 gap-3">
          {daysOfWeek.map((day) => {
            const dayBlocks = activePlan.filter(b => b.day === day);
            return (
              <div key={day} className="rail-card p-3.5 space-y-2.5">
                {/* Day Header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">{day}</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      ({dayBlocks.length} planned block{dayBlocks.length !== 1 ? 's' : ''})
                    </span>
                  </div>
                  {dayBlocks.length === 0 && (
                    <span className="text-[10px] text-slate-400 italic">No scheduled blocks — corridor open for traffic</span>
                  )}
                </div>

                {/* Day Blocks Timeline */}
                {dayBlocks.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {dayBlocks.map((block) => (
                      <div
                        key={block.id}
                        onClick={() => setSelectedBlock(block)}
                        className={`p-3 rounded border transition-all cursor-pointer rail-card-hover ${
                          block.isCombined 
                            ? 'bg-purple-50 border-purple-300 hover:border-purple-400' 
                            : 'bg-slate-50 border-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {/* Time & Department */}
                        <div className="flex items-center justify-between font-mono">
                          <span className="text-xs font-bold text-amber-800 flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{block.timeSlot}</span>
                          </span>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            block.isCombined ? 'rail-badge-purple' : 'rail-badge-blue'
                          }`}>
                            {block.department}
                          </span>
                        </div>

                        {/* Work Type */}
                        <div className="mt-1.5 space-y-0.5">
                          <h4 className="font-bold text-slate-900 text-xs leading-snug font-sans">{block.workType}</h4>
                          <div className="flex items-center space-x-1.5 text-[10px] text-slate-600 font-mono">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{block.blockSection} • {block.line} ({block.direction})</span>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-2.5 pt-1.5 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono">
                          <span className="text-slate-600 font-sans">
                            Priority: <strong className="text-red-700 font-bold font-mono">{block.priorityScore}</strong>
                          </span>
                          <span className="text-emerald-700 font-bold flex items-center space-x-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{block.status}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Drawer */}
      {selectedBlock && (
        <BlockDetailsDrawer 
          block={selectedBlock} 
          onClose={() => setSelectedBlock(null)} 
        />
      )}
    </div>
  );
}
