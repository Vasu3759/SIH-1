import React from 'react';
import { ShieldCheck, Database, GitMerge, ChevronRight, Cpu, Train } from 'lucide-react';

export default function LandingPage({ onEnter }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none font-sans">
      {/* Background Subtle Railway Pattern */}
      <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

      {/* Main Console Entry Container */}
      <div className="max-w-2xl w-full bg-white border border-slate-300 rounded-md shadow-xl relative z-10 overflow-hidden">
        {/* Top Official Indian Railways Bar */}
        <div className="bg-[#850e0e] text-white px-6 py-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-1 bg-white/10 rounded">
              <Train className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold tracking-wider text-amber-300 uppercase block">
                INDIAN RAILWAYS • COA INTEGRATED PLANNING CONSOLE
              </span>
              <p className="text-[10px] text-white/80 font-mono">Ministry of Railways • Government of India</p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded shadow-sm">
            OFFICIAL CONSOLE
          </span>
        </div>

        <div className="p-8 space-y-6 text-center">
          {/* Main Title */}
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-red-50 text-red-800 border border-red-200 px-3 py-1 rounded text-xs font-mono font-semibold">
              <Cpu className="w-3.5 h-3.5 text-red-700" />
              <span>NORTHERN RAILWAY (NR) • DELHI DIVISION (DLI)</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-sans uppercase pt-2">
              RailBlock AI Console
            </h1>
            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed font-sans">
              Automatic Maintenance Block Planning System for TMS, SMMS, TDMS, and COA Timetable Integration.
            </p>
          </div>

          {/* Operational Context Summary Bar */}
          <div className="bg-slate-50 border border-slate-300 rounded p-3 grid grid-cols-3 divide-x divide-slate-300 text-xs font-mono">
            <div className="px-2 text-center">
              <span className="text-[10px] text-slate-500 block uppercase font-sans">Zone</span>
              <strong className="text-slate-900 text-xs">Northern Railway</strong>
            </div>
            <div className="px-2 text-center">
              <span className="text-[10px] text-slate-500 block uppercase font-sans">Division</span>
              <strong className="text-slate-900 text-xs">Delhi (DLI)</strong>
            </div>
            <div className="px-2 text-center">
              <span className="text-[10px] text-slate-500 block uppercase font-sans">Corridors</span>
              <strong className="text-emerald-700 text-xs">4 Active Corridors</strong>
            </div>
          </div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-left">
            <div className="bg-slate-50 p-3 rounded border border-slate-300 space-y-1">
              <div className="flex items-center space-x-1.5 text-blue-700 text-xs font-bold font-sans">
                <Database className="w-4 h-4 shrink-0" />
                <span>Data Normalization</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">Unified asset backlog from TMS, SMMS, and TDMS.</p>
            </div>

            <div className="bg-slate-50 p-3 rounded border border-slate-300 space-y-1">
              <div className="flex items-center space-x-1.5 text-purple-700 text-xs font-bold font-sans">
                <GitMerge className="w-4 h-4 shrink-0" />
                <span>Compatible Merging</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">Cross-department overlapping request detection.</p>
            </div>

            <div className="bg-slate-50 p-3 rounded border border-slate-300 space-y-1">
              <div className="flex items-center space-x-1.5 text-emerald-700 text-xs font-bold font-sans">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Human Approval</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">Read-only decision support with planner control.</p>
            </div>
          </div>

          {/* Enter Button */}
          <div className="pt-2">
            <button
              onClick={onEnter}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#850e0e] hover:bg-[#6b0b0b] text-white font-bold text-xs uppercase tracking-wider rounded shadow-md transition-all flex items-center justify-center space-x-2 mx-auto cursor-pointer"
            >
              <span>Enter Planning Console</span>
              <ChevronRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>

          {/* Footer */}
          <p className="text-[10px] font-mono text-slate-500 pt-3 border-t border-slate-200">
            Read-Only Decision Support Console • Operates on Simulated Source System Exports • SIH 2026
          </p>
        </div>
      </div>
    </div>
  );
}
