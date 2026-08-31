import React, { useState } from 'react';
import { DISRUPTIONS_DATA } from '../data/mockData';
import { AlertTriangle, RefreshCw, Lock } from 'lucide-react';

export default function Disruptions({ onNavigate }) {
  const [disruptions, setDisruptions] = useState(DISRUPTIONS_DATA);
  const [isReplanning, setIsReplanning] = useState(false);

  const handleTriggerReplan = (disruptionId) => {
    setIsReplanning(true);
    setTimeout(() => {
      setIsReplanning(false);
      alert("Scoped re-planning complete! Diverted items updated in Plan Changes view.");
      onNavigate('plan-changes');
    }, 600);
  };

  return (
    <div className="space-y-4 pb-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded border border-slate-300 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight uppercase">Real-Time Operational Disruption Management</h2>
            <span className="text-[10px] font-mono font-bold bg-red-100 text-red-800 border border-red-300 px-2 py-0.5 rounded">
              LEVEL 7 PROTOCOL
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Dynamic re-planning triggered by train delays, freight congestion, or early return of maintenance vehicles.
          </p>
        </div>
      </div>

      {/* Disruption Protocol Guardrail */}
      <div className="bg-amber-50 border border-amber-300 p-3 rounded flex items-start space-x-2.5 text-xs text-amber-900">
        <Lock className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
        <div className="space-y-0.5 font-sans">
          <strong className="text-slate-900 block font-bold text-xs uppercase">Disruption Protocol Guardrail:</strong>
          <p className="text-[11px] leading-relaxed text-amber-800">
            "Maintenance blocks marked IN_PROGRESS cannot be reassigned or curtailed automatically. Delays within safety buffer are logged only; localized delays trigger scoped re-plans; major bottlenecks trigger full weekly re-plans."
          </p>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Active Corridor Disruptions</h3>

        <div className="grid grid-cols-1 gap-3">
          {disruptions.map((dis) => {
            const isHigh = dis.severity === 'HIGH';
            const isOpportunity = dis.delayMins < 0;

            return (
              <div key={dis.id} className="rail-card p-4 space-y-3 bg-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-2.5 gap-2">
                  <div className="flex items-center space-x-2.5">
                    <div className={`p-2 rounded border ${
                      isHigh ? 'bg-red-50 text-red-700 border-red-300' :
                      isOpportunity ? 'bg-emerald-50 text-emerald-700 border-emerald-300' :
                      'bg-amber-50 text-amber-800 border-amber-300'
                    }`}>
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 font-mono">
                        <span className="text-xs font-bold text-slate-500">{dis.id}</span>
                        <h4 className="font-bold text-slate-900 text-sm font-sans">{dis.title}</h4>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                          isHigh ? 'rail-badge-red' : isOpportunity ? 'rail-badge-green' : 'rail-badge-amber'
                        }`}>
                          {dis.severity} SEVERITY
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-mono mt-0.5">
                        Corridor: <strong className="text-slate-900">{dis.corridor}</strong> ({dis.affectedBlockSection}) • Date: {dis.affectedDate}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 font-mono">
                    <span className="text-[9px] text-slate-500 uppercase font-sans font-bold block">Disruption Variance</span>
                    <strong className={`text-sm ${isOpportunity ? 'text-emerald-700' : 'text-red-700'}`}>
                      {dis.delayMins > 0 ? `+${dis.delayMins}m delay` : `${dis.delayMins}m early`}
                    </strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded border border-slate-200 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block text-[9px] font-sans">Impact Scope:</span>
                    <strong className="text-slate-900">{dis.affectedBlocksCount} block requests affected</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px] font-sans">Recommended Action:</span>
                    <strong className="text-amber-800 font-sans">{dis.recommendedAction}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px] font-sans font-semibold">IN_PROGRESS Protection:</span>
                    <strong className="text-emerald-700 font-semibold flex items-center space-x-1 mt-0.5">
                      <Lock className="w-3 h-3 text-emerald-700" />
                      <span>Active block locked</span>
                    </strong>
                  </div>
                </div>

                <div className="flex justify-end pt-0.5">
                  <button
                    onClick={() => handleTriggerReplan(dis.id)}
                    disabled={isReplanning}
                    className="px-3.5 py-1.5 bg-[#850e0e] hover:bg-[#6b0b0b] text-white font-bold text-xs uppercase rounded transition-colors flex items-center space-x-1.5 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isReplanning ? 'animate-spin' : ''}`} />
                    <span>Execute Scoped Re-Plan</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
