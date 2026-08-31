import React from 'react';
import { X, ShieldAlert, Cpu, AlertTriangle, Clock, FileText, Info } from 'lucide-react';
import { calculatePriorityScore } from '../services/priorityEngine';
import { predictFailureRiskMock } from '../services/aiRiskEngine';

export default function PriorityDetailsModal({ item, onClose }) {
  if (!item) return null;

  const { priorityScore, breakdown } = calculatePriorityScore(item);
  const aiRisk = predictFailureRiskMock(item);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 select-none font-sans">
      <div className="bg-white border border-slate-300 w-full max-w-2xl rounded shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#850e0e] text-white px-5 py-3 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-white/10 rounded">
              <ShieldAlert className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2 font-mono">
                <span className="text-xs font-bold text-amber-300">{item.id}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-white">
                  {item.department}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-amber-200">
                  {item.periodicity}
                </span>
              </div>
              <h2 className="text-sm font-bold text-white mt-0.5 font-sans">{item.asset}</h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-amber-200 hover:text-white rounded hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 overflow-y-auto text-xs">
          {/* Main Score Box */}
          <div className="bg-slate-50 border border-slate-300 rounded p-3 flex items-center justify-between">
            <div>
              <span className="text-slate-900 font-bold text-xs uppercase tracking-wider block">Cross-Department Priority Score</span>
              <p className="text-[11px] font-mono text-slate-600 mt-0.5">
                Formula: <code className="text-red-700 font-bold">w1×Severity + w2×FailureRisk + w3×Overdue</code>
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-mono font-extrabold text-[#850e0e] tracking-tight">{priorityScore}</div>
              <span className="text-[9px] font-mono text-emerald-700 uppercase font-bold">Auditable Rule + AI</span>
            </div>
          </div>

          {/* 3 Component Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono">
            <div className="bg-slate-50 p-3 rounded border border-slate-300">
              <div className="flex items-center justify-between text-slate-600 text-[10px] mb-1 font-sans">
                <span>1. Severity Band</span>
                <span>W: {breakdown.w1 * 100}%</span>
              </div>
              <div className="text-lg font-bold text-slate-900">{breakdown.severityBandScore} <span className="text-xs text-slate-500 font-sans">/ 100</span></div>
              <p className="text-[10px] text-slate-600 font-sans mt-0.5">Band: <strong className="text-slate-900">{item.severityBand}</strong></p>
            </div>

            <div className="bg-slate-50 p-3 rounded border border-slate-300">
              <div className="flex items-center justify-between text-slate-600 text-[10px] mb-1 font-sans">
                <span>2. Failure Risk</span>
                <span>W: {breakdown.w2 * 100}%</span>
              </div>
              <div className="text-lg font-bold text-blue-700">{breakdown.normalizedFailureRisk} <span className="text-xs text-slate-500 font-sans">/ 100</span></div>
              <p className="text-[10px] text-slate-600 font-sans mt-0.5">Risk: <strong className="text-blue-700">{(item.failureRisk * 100).toFixed(0)}%</strong></p>
            </div>

            <div className="bg-slate-50 p-3 rounded border border-slate-300">
              <div className="flex items-center justify-between text-slate-600 text-[10px] mb-1 font-sans">
                <span>3. Overdue Urgency</span>
                <span>W: {breakdown.w3 * 100}%</span>
              </div>
              <div className="text-lg font-bold text-red-700">{breakdown.overdueUrgency} <span className="text-xs text-slate-500 font-sans">/ 100</span></div>
              <p className="text-[10px] text-slate-600 font-sans mt-0.5">Overdue: <strong className="text-red-700">{item.overdueDays}d</strong></p>
            </div>
          </div>

          {/* Context Details */}
          <div className="bg-slate-50 p-3.5 rounded border border-slate-300 space-y-2">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center space-x-1.5 font-sans">
              <FileText className="w-3.5 h-3.5 text-blue-700" />
              <span>Asset & Operational Geography Context</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] font-mono">
              <div>
                <span className="text-slate-500 block text-[9px] font-sans">Block Section:</span>
                <strong className="text-slate-900">{item.blockSection} ({item.line})</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px] font-sans">Direction / KM:</span>
                <strong className="text-slate-900">{item.direction} ({item.startKm}–{item.endKm})</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px] font-sans">Station / Depot:</span>
                <strong className="text-slate-900">{item.station}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px] font-sans">Work Duration:</span>
                <strong className="text-slate-900">{item.workDuration}</strong>
              </div>
            </div>
            <p className="text-slate-700 text-[11px] pt-2 border-t border-slate-200 leading-relaxed font-sans">
              <strong className="text-slate-900">Inspection Note:</strong> {item.description}
            </p>
          </div>

          {/* AI Feature Attributions */}
          <div className="bg-slate-50 p-3.5 rounded border border-slate-300 space-y-2">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center space-x-1.5 font-sans">
              <Cpu className="w-3.5 h-3.5 text-purple-700" />
              <span>XGBoost Contributing Feature Attributions</span>
            </h3>
            <div className="space-y-1 font-mono text-[11px]">
              {aiRisk.contributingFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white px-2.5 py-1 rounded border border-slate-200">
                  <span className="text-slate-700 font-sans">{feat.name}</span>
                  <span className="font-bold text-red-700">{feat.impact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Disclaimer */}
          <div className="bg-blue-50 border border-blue-200 p-2.5 rounded text-[11px] text-blue-900 flex items-start space-x-2 font-sans">
            <Info className="w-4 h-4 shrink-0 text-blue-700 mt-0.5" />
            <p>
              <strong>Auditable Decision Explanation:</strong> This priority score combines certified departmental rules, XGBoost failure probability, and overdue urgency. Formula weights are calibrated by domain experts.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-5 py-2.5 border-t border-slate-300 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#850e0e] hover:bg-[#6b0b0b] text-white text-xs font-bold rounded transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
