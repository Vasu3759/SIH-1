import React from 'react';
import { ShieldCheck, CheckCircle2, Cpu, SlidersHorizontal, UserCheck, FileCheck } from 'lucide-react';

export default function AuditGuardrails() {
  const safetyChecklist = [
    { title: 'Read-Only Architecture', description: 'Zero write access into live TMS, SMMS, TDMS, or COA operational databases.' },
    { title: 'Human Approval Required', description: 'All generated block windows are advisory recommendations requiring explicit sign-off by controlling personnel.' },
    { title: 'No Automatic Block Grant', description: 'No automated signals, route setting, or live train dispatch capability.' },
    { title: 'No Live Safety Decisions', description: 'Real-time track safety, train separation, and signal interlocks remain with human controllers.' },
    { title: 'No Live Curtailment Decisions', description: 'Active blocks in progress are locked against automated curtailment.' },
    { title: 'Auditable Priority Scoring', description: 'Formula weights (40% Severity, 40% Risk, 20% Overdue) set by domain experts, not opaque black box.' },
    { title: 'ML Leakage Exclusions', description: 'Post-failure repair fields strictly excluded from model feature vector.' },
    { title: 'No Invented Capacity Forecasts', description: 'Weeks 2–4 capacity planning reuses current week actuals baseline.' },
    { title: 'Hard Constraints Filter', description: 'All proposed slots validated against timetable, buffer, and disconnect coverage rules before assignment.' }
  ];

  return (
    <div className="space-y-4 pb-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded border border-slate-300 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight uppercase">System Audit & Governance Guardrails</h2>
            <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded">
              SIH COMPLIANCE
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Explicit boundaries, architectural principles, and safety guardrails governing RailBlock AI.
          </p>
        </div>
      </div>

      {/* 4 Architecture Principles */}
      <div className="rail-card p-4 space-y-3">
        <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center space-x-1.5">
          <FileCheck className="w-4 h-4 text-blue-700" />
          <span>Core System Architecture Principles</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="bg-slate-50 p-3 rounded border border-purple-200 space-y-1">
            <div className="flex items-center space-x-1.5 text-purple-800 font-extrabold text-xs font-mono">
              <Cpu className="w-3.5 h-3.5" />
              <span>1. AI FOR PREDICTION</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-snug">
              Used for <strong>Failure Risk Prediction</strong> (XGBoost ML) where historical failure telemetry exists.
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded border border-blue-200 space-y-1">
            <div className="flex items-center space-x-1.5 text-blue-800 font-extrabold text-xs font-mono">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>2. RULES FOR SEVERITY</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-snug">
              Used for <strong>Departmental Severity Bands</strong> (Good/Warning/Critical) using certified engineering standards.
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded border border-emerald-200 space-y-1">
            <div className="flex items-center space-x-1.5 text-emerald-800 font-extrabold text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>3. SCHEDULING SOLVER</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-snug">
              Used for <strong>Block Scheduling</strong> (Greedy + Annealing) to solve constraint satisfaction.
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded border border-amber-200 space-y-1">
            <div className="flex items-center space-x-1.5 text-amber-800 font-extrabold text-xs font-mono">
              <UserCheck className="w-3.5 h-3.5" />
              <span>4. HUMAN CONTROL</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-snug">
              Used for <strong>Final Block Approval</strong> where operational safety and live train control decisions reside.
            </p>
          </div>
        </div>
      </div>

      {/* Safety & Governance Checklist */}
      <div className="rail-card p-4 space-y-3">
        <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center space-x-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Safety & Governance Compliance Checklist</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {safetyChecklist.map((item, idx) => (
            <div key={idx} className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1">
              <div className="flex items-center space-x-1.5 text-emerald-800 font-bold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                <span>{item.title}</span>
              </div>
              <p className="text-[10px] text-slate-600 leading-snug pl-5">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
