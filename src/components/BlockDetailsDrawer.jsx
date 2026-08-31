import React from 'react';
import { X, CheckCircle, Clock, ShieldCheck, AlertCircle, MapPin, Zap, UserCheck } from 'lucide-react';
import { validateHardConstraints } from '../services/constraintEngine';
import { CONFIRMED_TRAIN_PATHS } from '../data/mockData';

export default function BlockDetailsDrawer({ block, onClose }) {
  if (!block) return null;

  const constraintResult = validateHardConstraints({
    id: block.id,
    workDurationMins: 90,
    allocatedDurationMins: 90,
    disconnectRequired: block.disconnectRequired || true,
    disconnectDuration: 15,
    reconnectDuration: 15,
    dueDate: '2026-09-15',
    slotDate: '2026-09-08',
    blockSection: block.blockSection || 'CYZ-GZB',
    line: block.line || 'Line 1',
    direction: block.direction || 'UP',
    startTime: block.startTime || '08:30',
    endTime: block.endTime || '10:00'
  }, [], CONFIRMED_TRAIN_PATHS);

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-slate-300 shadow-2xl flex flex-col justify-between select-none font-sans">
      {/* Header */}
      <div className="bg-[#850e0e] text-white px-5 py-3.5 border-b border-red-950 flex items-center justify-between shadow-xs">
        <div>
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-300">COA Block Recommendation</span>
          <h2 className="text-sm font-bold text-white leading-tight font-sans">{block.workType || block.asset || 'Maintenance Block'}</h2>
        </div>
        <button 
          onClick={onClose}
          className="p-1 text-amber-200 hover:text-white rounded hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4 overflow-y-auto text-xs flex-1">
        {/* Human Approval Required Badge */}
        <div className="bg-amber-50 border border-amber-300 rounded p-3 flex items-start space-x-3 text-amber-900">
          <UserCheck className="w-5 h-5 shrink-0 text-amber-700 mt-0.5" />
          <div>
            <h4 className="font-mono font-extrabold uppercase tracking-wide text-[10px] text-amber-900">
              RECOMMENDATION — HUMAN APPROVAL REQUIRED
            </h4>
            <p className="text-[10px] text-amber-800 mt-0.5 leading-snug font-sans">
              AI-optimized block proposal. Controlling personnel must review constraints and grant the block manually in COA.
            </p>
          </div>
        </div>

        {/* Properties */}
        <div className="bg-slate-50 p-3.5 rounded border border-slate-300 space-y-2">
          <h3 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider flex items-center space-x-1.5 font-sans">
            <MapPin className="w-3.5 h-3.5 text-blue-700" />
            <span>Block Specification</span>
          </h3>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div>
              <span className="text-slate-500 block text-[9px] font-sans">Department:</span>
              <strong className="text-slate-900">{block.department || 'TMS'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[9px] font-sans">Block Section:</span>
              <strong className="text-slate-900">{block.blockSection || 'CYZ-GZB'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[9px] font-sans">Line & Direction:</span>
              <strong className="text-slate-900">{block.line || 'Line 1'} ({block.direction || 'UP'})</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[9px] font-sans">KM Range:</span>
              <strong className="text-slate-900">{block.kmRange || '113.0 - 113.6 KM'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[9px] font-sans">Work Duration:</span>
              <strong className="text-slate-900">{block.duration || '1h 30m'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[9px] font-sans">Disconnection:</span>
              <strong className="text-emerald-700">Yes (15m Disc + 15m Rec)</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[9px] font-sans">Priority Score:</span>
              <strong className="text-amber-700 font-bold text-sm">{block.priorityScore || 91.2}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[9px] font-sans">Recommended Slot:</span>
              <strong className="text-blue-700">{block.day || 'Monday'} {block.timeSlot || '08:30–10:00'}</strong>
            </div>
          </div>
        </div>

        {/* Why This Slot */}
        <div className="bg-slate-50 p-3.5 rounded border border-slate-300 space-y-2">
          <h3 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider flex items-center space-x-1.5 font-sans">
            <Zap className="w-3.5 h-3.5 text-amber-700" />
            <span>Why This Recommended Slot?</span>
          </h3>
          <ul className="space-y-1.5 text-[11px] text-slate-700 font-sans">
            <li className="flex items-start space-x-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Compatible work merge:</strong> Combines TMS rail grinding with SMMS signal calibration.</span>
            </li>
            <li className="flex items-start space-x-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>No timetable conflict:</strong> Verified zero overlap with Shatabdi #12004 and Rajdhani #12424.</span>
            </li>
            <li className="flex items-start space-x-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Safety buffer available:</strong> 15-minute buffer pre-slot and post-slot preserved.</span>
            </li>
            <li className="flex items-start space-x-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Before due date:</strong> Scheduled 6 days prior to periodicity deadline.</span>
            </li>
          </ul>
        </div>

        {/* Constraints Checklist */}
        <div className="bg-slate-50 p-3.5 rounded border border-slate-300 space-y-2">
          <h3 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider flex items-center space-x-1.5 font-sans">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Hard Constraint Verification</span>
          </h3>
          <div className="space-y-1 font-mono text-[10px]">
            {constraintResult.checks.map(check => (
              <div key={check.id} className="flex items-center justify-between bg-white p-1.5 rounded border border-slate-200">
                <span className="text-slate-700 font-sans">{check.label}</span>
                {check.pass ? (
                  <span className="text-emerald-700 font-bold flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>PASS</span>
                  </span>
                ) : (
                  <span className="text-red-700 font-bold flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>FAIL</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-100 p-3 border-t border-slate-300 flex items-center space-x-2">
        <button
          onClick={onClose}
          className="flex-1 py-2 bg-slate-300 hover:bg-slate-400 text-slate-800 font-semibold rounded text-xs transition-colors"
        >
          Close Drawer
        </button>
        <button
          onClick={() => {
            alert("Recommendation approved and forwarded to COA controller queue!");
            onClose();
          }}
          className="flex-1 py-2 bg-[#850e0e] hover:bg-[#6b0b0b] text-white font-bold rounded text-xs transition-colors flex items-center justify-center space-x-1 cursor-pointer"
        >
          <UserCheck className="w-3.5 h-3.5 text-amber-300" />
          <span>Approve Proposal</span>
        </button>
      </div>
    </div>
  );
}
