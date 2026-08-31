import React from 'react';
import { SOURCE_SYSTEMS } from '../data/mockData';
import { Server, Lock, CheckCircle2 } from 'lucide-react';

export default function SourceSystems() {
  return (
    <div className="space-y-4 pb-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded border border-slate-300 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight uppercase">Source Systems Integration Architecture</h2>
            <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded">
              READ-ONLY ADAPTOR INTEGRATION
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Technical specs for TMS, SMMS, TDMS, and COA report adapters.
          </p>
        </div>
      </div>

      {/* Read-Only Security Guarantee Banner */}
      <div className="bg-amber-50 border border-amber-300 p-4 rounded flex items-start space-x-3 text-amber-900">
        <Lock className="w-6 h-6 shrink-0 text-amber-700 mt-0.5" />
        <div className="space-y-0.5 font-sans">
          <h3 className="font-mono font-extrabold text-slate-900 text-xs tracking-wide uppercase flex items-center space-x-1.5">
            <span>🔒 READ-ONLY INTEGRATION SECURITY GUARANTEE</span>
          </h3>
          <p className="text-xs text-amber-900 leading-relaxed">
            "No write operation is ever performed against TMS, SMMS, TDMS or COA. RailBlock AI acts purely as an external read-only decision-support dashboard, preserving live operational independence and safety compliance."
          </p>
        </div>
      </div>

      {/* 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SOURCE_SYSTEMS.map((sys) => (
          <div key={sys.id} className="rail-card p-4 space-y-3 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded border" style={{ backgroundColor: `${sys.color}10`, borderColor: `${sys.color}30`, color: sys.color }}>
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{sys.name}</h3>
                  <span className="text-[10px] text-slate-500 font-mono">System ID: {sys.id}</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{sys.status}</span>
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              {sys.description}
            </p>

            <div className="space-y-1.5 text-xs font-mono bg-slate-50 p-3 rounded border border-slate-200">
              <div>
                <span className="text-slate-500 block text-[9px] font-sans">Data Available:</span>
                <strong className="text-slate-900 font-sans">{sys.dataAvailable}</strong>
              </div>
              <div className="pt-1.5 border-t border-slate-200">
                <span className="text-slate-500 block text-[9px] font-sans">Integration Method:</span>
                <strong className="text-blue-700">{sys.integrationMethod}</strong>
              </div>
              <div className="pt-1.5 border-t border-slate-200 flex justify-between">
                <div>
                  <span className="text-slate-500 block text-[9px] font-sans">Last Sync:</span>
                  <strong className="text-slate-900">{sys.lastSync}</strong>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block text-[9px] font-sans">Record Count:</span>
                  <strong className="text-amber-800 font-bold">{sys.recordCount} records</strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
