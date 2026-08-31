import React from 'react';
import { MERGE_OPPORTUNITIES } from '../data/mockData';
import { GitMerge, CheckCircle2, Zap, Layers } from 'lucide-react';

export default function Compatibility() {
  return (
    <div className="space-y-4 pb-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded border border-slate-300 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight uppercase">Compatible Work & Merge Opportunities</h2>
            <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-800 border border-purple-300 px-2 py-0.5 rounded">
              SIH CORE FEATURE
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Automated detection of cross-departmental maintenance requests on the same block section and corridor window.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono bg-slate-50 border border-slate-300 px-3.5 py-1.5 rounded text-emerald-800 font-bold">
          <Zap className="w-4 h-4 text-emerald-700" />
          <span>Total Corridor Savings Potential: <strong>~18.5 Hours / Week</strong></span>
        </div>
      </div>

      {/* Concept Banner */}
      <div className="bg-purple-50 border border-purple-200 p-3 rounded flex items-start space-x-2.5 text-xs text-purple-900">
        <Layers className="w-4 h-4 shrink-0 text-purple-700 mt-0.5" />
        <div className="space-y-0.5 font-sans">
          <strong className="text-slate-900 block font-bold text-xs uppercase">Why Compatible Work Detection Matters:</strong>
          <p className="text-[11px] leading-relaxed text-slate-700">
            "Currently, TMS, SMMS, and TDMS file separate block requests on the same corridor, causing duplicate train traffic disconnections. RailBlock AI scans operational geography, line, direction, and work requirements to propose a single combined block window."
          </p>
        </div>
      </div>

      {/* Merge Opportunities Grid */}
      <div className="space-y-4">
        {MERGE_OPPORTUNITIES.map((opp, idx) => (
          <div key={opp.id} className="rail-card p-4 border-slate-300 bg-white space-y-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-3 gap-2">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-purple-100 text-purple-800 border border-purple-300 rounded font-mono font-bold text-xs">
                  #{idx + 1}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-slate-900 text-sm">Merge Opportunity #{opp.id}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold rail-badge-green">
                      {opp.recommendationScore}% Match Score
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-mono mt-0.5">
                    Block Section: <strong className="text-slate-900">{opp.blockSection}</strong> • {opp.line} ({opp.direction}) • KM {opp.kmRange}
                  </p>
                </div>
              </div>

              {/* Savings */}
              <div className="bg-slate-50 border border-emerald-300 px-3 py-1.5 rounded text-right shrink-0 font-mono">
                <span className="text-[9px] text-slate-500 uppercase font-bold block font-sans">Corridor Time Saved</span>
                <strong className="text-emerald-700 font-extrabold text-base">{opp.savedCorridorTime}</strong>
              </div>
            </div>

            {/* Requests Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono">
              <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-sans font-bold text-blue-700 uppercase">Request A ({opp.requestA.dept})</span>
                  <span className="text-slate-500">Duration: {opp.requestA.duration}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs font-sans">{opp.requestA.work}</h4>
                <p className="text-[10px] text-slate-500">Ref ID: {opp.requestA.id}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-sans font-bold text-emerald-700 uppercase">Request B ({opp.requestB.dept})</span>
                  <span className="text-slate-500">Duration: {opp.requestB.duration}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs font-sans">{opp.requestB.work}</h4>
                <p className="text-[10px] text-slate-500">Ref ID: {opp.requestB.id}</p>
              </div>
            </div>

            {/* Validation & Math */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50 p-3 rounded border border-slate-200 text-xs font-mono">
              <div className="space-y-1 md:col-span-2">
                <span className="font-bold text-slate-800 text-[10px] uppercase font-sans tracking-wider block mb-1">
                  Operational Compatibility Checks:
                </span>
                <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                  <span className="flex items-center space-x-1 text-emerald-800 font-sans">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Same section ({opp.blockSection})</span>
                  </span>
                  <span className="flex items-center space-x-1 text-emerald-800 font-sans">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Same line ({opp.line})</span>
                  </span>
                  <span className="flex items-center space-x-1 text-emerald-800 font-sans">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Same direction ({opp.direction})</span>
                  </span>
                  <span className="flex items-center space-x-1 text-emerald-800 font-sans">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Overlapping timing window</span>
                  </span>
                </div>
              </div>

              <div className="border-t md:border-t-0 md:border-l border-slate-300 pt-2 md:pt-0 md:pl-3 space-y-0.5 text-right">
                <div className="text-slate-600 text-[10px]">Separate Total: <strong className="text-slate-900">{opp.separateDuration}</strong></div>
                <div className="text-slate-600 text-[10px]">Combined Block: <strong className="text-purple-800 font-bold">{opp.combinedDuration}</strong></div>
                <div className="text-emerald-700 font-extrabold text-xs pt-1 border-t border-slate-300">
                  Net Saved: {opp.savedCorridorTime}
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="flex justify-end pt-1">
              <button 
                onClick={() => alert(`Merge Proposal #${opp.id} approved and staged into recommended weekly plan!`)}
                className="px-4 py-2 bg-purple-800 hover:bg-purple-900 text-white text-xs font-bold uppercase rounded shadow transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <GitMerge className="w-3.5 h-3.5" />
                <span>Apply Combined Proposal</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
