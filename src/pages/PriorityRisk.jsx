import React, { useState } from 'react';
import { MAINTENANCE_ITEMS } from '../data/mockData';
import PriorityDetailsModal from '../components/PriorityDetailsModal';
import { Info } from 'lucide-react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell } from 'recharts';

export default function PriorityRisk() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState('ALL');

  const scatterData = MAINTENANCE_ITEMS.map(item => ({
    id: item.id,
    name: item.asset,
    dept: item.department,
    failureRiskPct: Math.round(item.failureRisk * 100),
    severityScore: item.severityScore,
    overdueDays: item.overdueDays,
    priorityScore: item.priorityScore,
    item
  })).filter(d => departmentFilter === 'ALL' || d.dept === departmentFilter);

  return (
    <div className="space-y-4 pb-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded border border-slate-300 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight uppercase">Cross-Department Priority & Risk Intelligence</h2>
            <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded">
              PRIORITY ENGINE
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Comparative analysis mapping departmental severity against XGBoost ML failure risk and overdue urgency.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono bg-slate-50 border border-slate-300 px-3 py-1.5 rounded text-slate-700">
          <Info className="w-4 h-4 text-blue-700 shrink-0" />
          <span>Formula: <strong>40% Severity + 40% Risk + 20% Overdue</strong></span>
        </div>
      </div>

      {/* Scatter Matrix Chart */}
      <div className="rail-card p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Risk-Severity Matrix Scatter Plot</h3>
            <p className="text-[10px] font-mono text-slate-500">X-Axis: XGBoost Failure Risk (%) • Y-Axis: Department Severity Score • Bubble Size: Overdue Days</p>
          </div>
          <div className="flex items-center space-x-1.5 text-xs font-mono">
            <span className="text-slate-500 text-[11px] font-sans">Dept:</span>
            {['ALL', 'TMS', 'SMMS', 'TDMS'].map(dept => (
              <button
                key={dept}
                onClick={() => setDepartmentFilter(dept)}
                className={`px-2.5 py-0.5 rounded text-xs font-bold transition-colors ${
                  departmentFilter === dept 
                    ? 'bg-[#850e0e] text-white' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -15 }}>
              <XAxis type="number" dataKey="failureRiskPct" name="Failure Risk" unit="%" stroke="#64748b" fontSize={10} domain={[0, 100]} />
              <YAxis type="number" dataKey="severityScore" name="Severity Score" stroke="#64748b" fontSize={10} domain={[0, 100]} />
              <ZAxis type="number" dataKey="overdueDays" range={[60, 400]} name="Overdue Days" />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                content={({ payload }) => {
                  if (payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white border border-slate-300 p-2.5 rounded text-xs font-mono space-y-1 shadow-md">
                        <strong className="text-slate-900 block font-bold font-sans">{data.id} - {data.name}</strong>
                        <div className="text-slate-700">Department: <span className="text-blue-700 font-semibold">{data.dept}</span></div>
                        <div className="text-[#850e0e] font-bold">Priority Score: {data.priorityScore}</div>
                        <div className="text-blue-700">Failure Risk: {data.failureRiskPct}%</div>
                        <div className="text-amber-800">Severity: {data.severityScore}/100</div>
                        <div className="text-red-700">Overdue: {data.overdueDays} days</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter data={scatterData} onClick={(entry) => setSelectedItem(entry.item)}>
                {scatterData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.priorityScore > 85 ? '#dc2626' : entry.priorityScore > 70 ? '#d97706' : '#2563eb'} 
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ranked List Grid */}
      <div className="rail-card p-4 space-y-3">
        <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Ranked Priority Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {MAINTENANCE_ITEMS.map((item, idx) => (
            <div 
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-slate-50 p-3 rounded border border-slate-300 hover:border-slate-400 transition-all cursor-pointer space-y-2 rail-card-hover font-mono"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-500">#{idx + 1}</span>
                  <span className="text-xs font-bold text-slate-900">{item.id}</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-300">
                    {item.department}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block text-[9px] font-sans">Priority Score</span>
                  <strong className="text-[#850e0e] font-extrabold text-sm">{item.priorityScore}</strong>
                </div>
              </div>

              <h4 className="font-bold text-slate-900 text-xs leading-snug font-sans">{item.asset}</h4>

              <div className="grid grid-cols-3 gap-1 text-[9px] pt-1.5 border-t border-slate-200">
                <div>
                  <span className="text-slate-500 block font-sans">Severity Score:</span>
                  <strong className="text-slate-900">{item.severityBand} ({item.severityScore})</strong>
                </div>
                <div>
                  <span className="text-slate-500 block font-sans">Failure Risk:</span>
                  <strong className="text-blue-700">{(item.failureRisk * 100).toFixed(0)}%</strong>
                </div>
                <div>
                  <span className="text-slate-500 block font-sans">Overdue Days:</span>
                  <strong className="text-red-700">{item.overdueDays}d</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <PriorityDetailsModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
  );
}
