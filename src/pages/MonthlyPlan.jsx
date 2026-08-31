import React from 'react';
import { MONTHLY_CAPACITY_DATA } from '../data/mockData';
import { AlertOctagon, CheckCircle2, Info, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function MonthlyPlan({ onNavigate }) {
  return (
    <div className="space-y-4 pb-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded border border-slate-300 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight uppercase">Monthly Capacity Planning</h2>
            <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-800 border border-purple-300 px-2 py-0.5 rounded">
              LEVEL 1 HORIZON
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Indicative 4-week corridor capacity vs maintenance demand rollup for Northern Railway.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono bg-slate-50 border border-slate-300 px-3 py-1.5 rounded text-slate-700">
          <Info className="w-4 h-4 text-blue-700 shrink-0" />
          <span>Baseline: <strong>Reuses Week 1 Actuals</strong></span>
        </div>
      </div>

      {/* Explanatory Note */}
      <div className="bg-blue-50 border border-blue-200 p-3 rounded flex items-start space-x-2.5 text-xs text-blue-900">
        <Info className="w-4 h-4 shrink-0 text-blue-700 mt-0.5" />
        <div className="space-y-0.5 font-sans">
          <strong className="text-slate-900 block font-bold text-xs uppercase">Capacity Planning Rule & Boundary:</strong>
          <p className="text-[11px] leading-relaxed text-slate-700">
            "Monthly planning is capacity-oriented and does not represent firm exact time slots. Weeks 2–4 reuse the current week's confirmed actual capacity figure as a baseline. No uncertified forecasting model is used."
          </p>
        </div>
      </div>

      {/* 4 Planning Weeks Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {MONTHLY_CAPACITY_DATA.map((weekData) => {
          const isAtRisk = weekData.status === 'AT_RISK_NEEDS_ESCALATION';
          return (
            <div 
              key={weekData.week} 
              className={`rail-card p-4 space-y-3 relative ${isAtRisk ? 'border-red-300 bg-red-50/50' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{weekData.week}</h3>
                  <span className="text-[10px] text-slate-500 font-mono block">{weekData.dateRange}</span>
                </div>
                {isAtRisk ? (
                  <span className="p-1 bg-red-100 text-red-700 border border-red-300 rounded">
                    <AlertOctagon className="w-4 h-4 animate-pulse" />
                  </span>
                ) : (
                  <span className="p-1 bg-emerald-100 text-emerald-700 border border-emerald-300 rounded">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                )}
              </div>

              <div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                  isAtRisk 
                    ? 'rail-badge-red animate-pulse' 
                    : 'rail-badge-green'
                }`}>
                  {weekData.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs font-mono pt-2 border-t border-slate-200">
                <div className="flex justify-between text-slate-700">
                  <span className="font-sans text-[11px]">Demand:</span>
                  <strong className="text-slate-900 font-bold">{weekData.demandBlocks} blocks ({weekData.demandHours}h)</strong>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="font-sans text-[11px]">Capacity:</span>
                  <strong className="text-slate-600 font-semibold">{weekData.capacityBlocks} blocks ({weekData.capacityHours}h)</strong>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="font-sans text-[11px]">Utilization:</span>
                  <strong className={isAtRisk ? 'text-red-700 font-extrabold' : 'text-emerald-700 font-bold'}>
                    {weekData.utilizationPct}%
                  </strong>
                </div>
              </div>

              <div className="w-full bg-slate-100 h-1.5 rounded overflow-hidden border border-slate-200">
                <div 
                  className={`h-full rounded transition-all ${
                    isAtRisk ? 'bg-red-600' : weekData.utilizationPct > 80 ? 'bg-amber-600' : 'bg-emerald-600'
                  }`}
                  style={{ width: `${Math.min(100, weekData.utilizationPct)}%` }}
                />
              </div>

              <p className="text-[9px] font-mono text-slate-500 italic pt-0.5">
                {weekData.note}
              </p>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="rail-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Monthly Demand vs Capacity Comparison</h3>
            <p className="text-[10px] text-slate-500 font-mono">Highlights Week 3 bottleneck requiring corridor block window escalation.</p>
          </div>
          <button 
            onClick={() => onNavigate('weekly-plan')}
            className="px-3 py-1 bg-[#850e0e] hover:bg-[#6b0b0b] text-white text-xs font-semibold rounded transition-colors flex items-center space-x-1"
          >
            <span>Inspect Firm Weekly Schedule</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-300" />
          </button>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MONTHLY_CAPACITY_DATA} margin={{ top: 20, right: 20, left: -15, bottom: 0 }}>
              <XAxis dataKey="week" stroke="#64748b" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '4px', color: '#0f172a', fontSize: '11px' }}
              />
              <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '5px' }} />
              <Bar dataKey="demandBlocks" name="Maintenance Demand (Blocks)" fill="#dc2626" radius={[2, 2, 0, 0]} />
              <Bar dataKey="capacityBlocks" name="Assumed Available Capacity" fill="#2563eb" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
