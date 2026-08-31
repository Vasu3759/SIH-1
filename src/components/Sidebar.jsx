import React from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  CalendarRange, 
  ClipboardList, 
  GitMerge, 
  ShieldAlert, 
  Activity, 
  AlertTriangle, 
  SlidersHorizontal, 
  GitCompare, 
  Database, 
  Server, 
  ShieldCheck,
  Lock
} from 'lucide-react';

export default function Sidebar({ currentPage, setCurrentPage }) {
  const menuStructure = [
    {
      category: 'OVERVIEW',
      items: [
        { id: 'command-center', label: 'Command Center', icon: LayoutDashboard }
      ]
    },
    {
      category: 'BLOCK PLANNING',
      items: [
        { id: 'monthly-plan', label: 'Monthly Plan', icon: CalendarRange },
        { id: 'weekly-plan', label: 'Weekly Schedule', icon: CalendarDays },
        { id: 'block-requests', label: 'Block Requests', icon: ClipboardList },
        { id: 'compatibility', label: 'Work Merging', icon: GitMerge }
      ]
    },
    {
      category: 'RISK ANALYSIS',
      items: [
        { id: 'priority-risk', label: 'Priority Scoring', icon: ShieldAlert },
        { id: 'ai-risk-analysis', label: 'Failure Prediction', icon: Activity }
      ]
    },
    {
      category: 'DISRUPTIONS & WHAT-IF',
      items: [
        { id: 'disruptions', label: 'Disruptions', icon: AlertTriangle },
        { id: 'what-if', label: 'What-If Scenarios', icon: SlidersHorizontal },
        { id: 'plan-changes', label: 'Plan Diff Log', icon: GitCompare }
      ]
    },
    {
      category: 'SYSTEM & DATA',
      items: [
        { id: 'unified-data', label: 'Unified Geography', icon: Database },
        { id: 'source-systems', label: 'Source Adapters', icon: Server },
        { id: 'audit-guardrails', label: 'Audit Guardrails', icon: ShieldCheck }
      ]
    }
  ];

  return (
    <aside className="w-60 bg-[#f1f5f9] border-r border-slate-300 flex flex-col justify-between shrink-0 select-none font-sans">
      <div className="p-3 space-y-4 overflow-y-auto">
        {menuStructure.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <h3 className="px-2.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              {group.category}
            </h3>
            <div className="mt-1 space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#850e0e] text-white shadow-xs font-bold'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-600'}`} />
                    <span className="text-xs">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Read-Only Safety Banner */}
      <div className="p-3 m-2 bg-white border border-slate-300 rounded text-center shadow-2xs">
        <div className="flex items-center justify-center space-x-1.5 text-[#850e0e] font-mono font-bold text-xs">
          <Lock className="w-3.5 h-3.5 text-[#850e0e]" />
          <span>READ-ONLY ADVISORY</span>
        </div>
        <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
          Human approval required before block grant in COA.
        </p>
      </div>
    </aside>
  );
}
