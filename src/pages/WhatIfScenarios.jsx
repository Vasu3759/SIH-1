import React, { useState } from 'react';
import { INITIAL_WEEKLY_PLAN } from '../data/mockData';
import { runOptimizationSimulation } from '../services/planningEngine';
import { SlidersHorizontal, Play, ArrowRight, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export default function WhatIfScenarios({ onNavigate }) {
  const [selectedScenario, setSelectedScenario] = useState('REDUCED_CAPACITY');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);

  const scenarioOptions = [
    {
      id: 'REDUCED_CAPACITY',
      title: '1. Reduced Available Corridor Capacity',
      description: 'Simulates heavy freight train congestion reducing weekly block capacity from 82% to 65%.',
      icon: SlidersHorizontal
    },
    {
      id: 'WINDOW_UNAVAILABLE',
      title: '2. Planning Window Unavailable',
      description: 'Simulates unexpected track blockage on CYZ-GZB Line 1 UP during Monday morning slot.',
      icon: AlertTriangle
    },
    {
      id: 'NEW_CRITICAL_ITEM',
      title: '3. New Critical Maintenance Emergency Item',
      description: 'Inserts new Priority 98.5 rail fracture emergency repair item into active weekly schedule.',
      icon: Layers
    }
  ];

  const handleRunScenario = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const res = runOptimizationSimulation(INITIAL_WEEKLY_PLAN, { type: selectedScenario });
      setSimulationResult(res);
      setIsSimulating(false);
    }, 500);
  };

  return (
    <div className="space-y-4 pb-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded border border-slate-300 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight uppercase">Interactive What-If Scenario Sandbox</h2>
            <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 border border-blue-300 px-2 py-0.5 rounded">
              NON-DESTRUCTIVE SIMULATION
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Test hypothetical corridor disruptions or priority surges without modifying the confirmed baseline plan.
          </p>
        </div>
      </div>

      {/* Selector */}
      <div className="space-y-2">
        <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Select What-If Scenario Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {scenarioOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedScenario === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => setSelectedScenario(opt.id)}
                className={`rail-card p-4 cursor-pointer space-y-2 transition-all ${
                  isSelected ? 'border-blue-500 bg-blue-50/60 ring-1 ring-blue-500' : 'hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-1.5 rounded border ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 border-slate-300'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <input
                    type="radio"
                    name="scenario"
                    checked={isSelected}
                    onChange={() => setSelectedScenario(opt.id)}
                    className="accent-blue-600 cursor-pointer"
                  />
                </div>
                <h4 className="font-bold text-slate-900 text-xs">{opt.title}</h4>
                <p className="text-[11px] text-slate-600 leading-snug">{opt.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action */}
      <div className="rail-card p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Run What-If Re-Optimization Engine</h4>
          <p className="text-[11px] text-slate-500 font-mono">Baseline plan preserved; output staged for diff comparison.</p>
        </div>
        <button
          onClick={handleRunScenario}
          disabled={isSimulating}
          className="px-5 py-2.5 bg-[#850e0e] hover:bg-[#6b0b0b] text-white font-bold text-xs uppercase tracking-wider rounded shadow transition-all flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
        >
          <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
          <span>{isSimulating ? 'Running Optimization Engine...' : 'Run Scenario'}</span>
        </button>
      </div>

      {/* Step Flow */}
      <div className="rail-card p-4 space-y-2">
        <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">What-If Execution Pipeline Flow</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-1.5 text-center text-xs font-mono">
          <div className="bg-slate-50 p-2.5 rounded border border-slate-300">
            <strong className="text-slate-900 block font-bold text-[11px]">1. Baseline Plan</strong>
            <span className="text-[9px] text-slate-500 font-sans">Confirmed Schedule</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded border border-slate-300">
            <strong className="text-blue-700 block font-bold text-[11px]">2. Scenario Change</strong>
            <span className="text-[9px] text-slate-500 font-sans">Parameter Input</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded border border-slate-300">
            <strong className="text-amber-700 block font-bold text-[11px]">3. Impact Detection</strong>
            <span className="text-[9px] text-slate-500 font-sans">Conflict Identification</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded border border-slate-300">
            <strong className="text-purple-700 block font-bold text-[11px]">4. Re-Planning</strong>
            <span className="text-[9px] text-slate-500 font-sans">Greedy + Annealing</span>
          </div>
          <div className="bg-emerald-50 p-2.5 rounded border border-emerald-300 text-emerald-900">
            <strong className="text-emerald-800 block font-bold text-[11px]">5. Updated Plan</strong>
            <span className="text-[9px] text-emerald-700 font-sans">Diff Staged</span>
          </div>
        </div>
      </div>

      {/* Result Preview */}
      {simulationResult && (
        <div className="rail-card p-4 border-emerald-300 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Scenario Execution Complete</span>
            </div>
            <button
              onClick={() => onNavigate('plan-changes')}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <span>View Full Plan Changes Diff</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs font-mono pt-1">
            <div className="bg-slate-50 p-3 rounded border border-slate-200">
              <span className="text-slate-500 block text-[9px] font-sans">Utilization Shift:</span>
              <strong className="text-amber-800 font-extrabold text-sm">
                82% → {simulationResult.optimizedMetrics.utilizationPct}%
              </strong>
            </div>
            <div className="bg-slate-50 p-3 rounded border border-slate-200">
              <span className="text-slate-500 block text-[9px] font-sans">Staged Plan Changes:</span>
              <strong className="text-blue-700 font-extrabold text-sm">2 Blocks Shifted</strong>
            </div>
            <div className="bg-slate-50 p-3 rounded border border-slate-200">
              <span className="text-slate-500 block text-[9px] font-sans">Re-Planning Rationale:</span>
              <span className="text-slate-700 text-[10px] font-sans">"Critical maintenance retained earlier slot while lower-priority work moved."</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
