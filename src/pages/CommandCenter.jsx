import React, { useState } from 'react';
import KPICard from '../components/KPICard';
import PriorityDetailsModal from '../components/PriorityDetailsModal';
import { MAINTENANCE_ITEMS } from '../data/mockData';
import { 
  ClipboardList, 
  AlertOctagon, 
  Activity, 
  AlertTriangle, 
  CalendarCheck, 
  GitMerge, 
  ChevronRight
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

export default function CommandCenter({ onNavigate }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [deptFilter, setDeptFilter] = useState('ALL');

  const filteredItems = MAINTENANCE_ITEMS.filter(item => 
    deptFilter === 'ALL' || item.department === deptFilter
  );

  const deptData = [
    { name: 'TMS (Track)', demand: 84, critical: 8 },
    { name: 'SMMS (Signal)', demand: 62, critical: 6 },
    { name: 'TDMS (Traction)', demand: 38, critical: 3 }
  ];

  const riskPieData = [
    { name: 'Critical Risk', value: 17, color: '#dc2626' },
    { name: 'High Risk', value: 34, color: '#d97706' },
    { name: 'Medium Risk', value: 72, color: '#2563eb' },
    { name: 'Low Risk', value: 61, color: '#059669' }
  ];

  return (
    <div className="space-y-4 pb-10 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded border border-slate-300 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight uppercase">Executive Operations Command Center</h2>
            <span className="text-[10px] font-mono font-bold bg-red-100 text-red-800 border border-red-200 px-2 py-0.5 rounded">
              LIVE CONSOLE
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Cross-department maintenance backlog, AI failure-risk scoring, and corridor capacity planning.
          </p>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <button 
            onClick={() => onNavigate('weekly-plan')}
            className="px-3.5 py-1.5 bg-[#850e0e] hover:bg-[#6b0b0b] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Open Weekly Gantt Board</span>
          </button>
        </div>
      </div>

      {/* 6 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <KPICard
          title="Maintenance Demand"
          value="184"
          unit="Items"
          trend="+12%"
          trendLabel="vs last week"
          icon={ClipboardList}
          statusColor="blue"
          onClick={() => onNavigate('block-requests')}
        />
        <KPICard
          title="Critical Items"
          value="17"
          unit="Action Required"
          trend="+3"
          trendLabel="new critical"
          icon={AlertOctagon}
          statusColor="red"
          onClick={() => onNavigate('priority-risk')}
        />
        <KPICard
          title="Corridor Capacity"
          value="82%"
          unit="Utilized"
          trend="Balanced"
          trendLabel="Week 1"
          icon={Activity}
          statusColor="green"
          onClick={() => onNavigate('monthly-plan')}
        />
        <KPICard
          title="Deferred Risk"
          value="23"
          unit="High Risk"
          trend="Overdue"
          trendLabel=">20 days"
          icon={AlertTriangle}
          statusColor="amber"
          onClick={() => onNavigate('ai-risk-analysis')}
        />
        <KPICard
          title="Planned Blocks"
          value="42"
          unit="This Week"
          trend="Firm"
          trendLabel="7 days"
          icon={CalendarCheck}
          statusColor="purple"
          onClick={() => onNavigate('weekly-plan')}
        />
        <KPICard
          title="Compatible Work"
          value="11"
          unit="Merge Opps"
          trend="Saved 18.5h"
          trendLabel="corridor time"
          icon={GitMerge}
          statusColor="green"
          onClick={() => onNavigate('compatibility')}
        />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar Chart */}
        <div className="lg:col-span-2 rail-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Department-wise Maintenance Demand</h3>
              <p className="text-[10px] text-slate-500 font-mono">Total backlog demand vs safety-critical subset</p>
            </div>
            <div className="flex items-center space-x-3 text-[10px] font-mono">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span className="text-slate-600 font-sans">Total Backlog</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span className="text-slate-600 font-sans">Critical</span>
              </span>
            </div>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '4px', color: '#0f172a', fontSize: '11px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="demand" fill="#2563eb" radius={[2, 2, 0, 0]} />
                <Bar dataKey="critical" fill="#dc2626" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Donut Chart */}
        <div className="rail-card p-4 space-y-3 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Priority & Risk Breakdown</h3>
            <p className="text-[10px] text-slate-500 font-mono">184 maintenance items categorized by risk</p>
          </div>
          <div className="h-36 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={riskPieData} innerRadius={35} outerRadius={55} paddingAngle={3} dataKey="value">
                  {riskPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '4px', color: '#0f172a', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
            {riskPieData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-slate-50 p-1 rounded border border-slate-200">
                <span className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-700 font-sans">{item.name}</span>
                </span>
                <strong className="text-slate-900">{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Priority Overview Table */}
      <div className="rail-card p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Unified Cross-Department Priority Overview</h3>
            <p className="text-[10px] text-slate-500 font-mono">Ranked priority list combining departmental severity, XGBoost failure risk, and overdue urgency.</p>
          </div>
          <div className="flex items-center space-x-1.5 text-xs font-mono">
            <span className="text-slate-500 text-[11px] font-sans">Filter:</span>
            {['ALL', 'TMS', 'SMMS', 'TDMS'].map(dept => (
              <button
                key={dept}
                onClick={() => setDeptFilter(dept)}
                className={`px-2.5 py-0.5 rounded text-xs font-bold transition-colors ${
                  deptFilter === dept 
                    ? 'bg-[#850e0e] text-white' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-300 text-slate-600 uppercase text-[10px] font-mono tracking-wider bg-slate-100">
                <th className="py-2.5 px-2.5">Rank</th>
                <th className="py-2.5 px-2.5">Asset Description</th>
                <th className="py-2.5 px-2.5">Dept</th>
                <th className="py-2.5 px-2.5">Block Section</th>
                <th className="py-2.5 px-2.5">Score</th>
                <th className="py-2.5 px-2.5">Severity</th>
                <th className="py-2.5 px-2.5">Failure Risk</th>
                <th className="py-2.5 px-2.5">Overdue</th>
                <th className="py-2.5 px-2.5">Due Date</th>
                <th className="py-2.5 px-2.5">Rec. Week</th>
                <th className="py-2.5 px-2.5">Status</th>
                <th className="py-2.5 px-2.5 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono">
              {filteredItems.map((item, idx) => (
                <tr 
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <td className="py-2 px-2.5 font-bold text-slate-500">#{idx + 1}</td>
                  <td className="py-2 px-2.5 font-semibold text-slate-900 font-sans">
                    {item.asset}
                    <span className="block text-[10px] font-mono font-normal text-slate-500">{item.location} ({item.station})</span>
                  </td>
                  <td className="py-2 px-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      item.department === 'TMS' ? 'rail-badge-blue' :
                      item.department === 'SMMS' ? 'rail-badge-green' :
                      'rail-badge-purple'
                    }`}>
                      {item.department}
                    </span>
                  </td>
                  <td className="py-2 px-2.5 text-slate-700">
                    {item.blockSection}
                    <span className="block text-[10px] text-slate-500 font-sans">{item.line} ({item.direction})</span>
                  </td>
                  <td className="py-2 px-2.5 font-extrabold text-[#850e0e] text-sm">
                    {item.priorityScore}
                  </td>
                  <td className="py-2 px-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.severityBand === 'Critical' ? 'rail-badge-red' :
                      item.severityBand === 'Warning' ? 'rail-badge-amber' :
                      'rail-badge-green'
                    }`}>
                      {item.severityBand} ({item.severityScore})
                    </span>
                  </td>
                  <td className="py-2 px-2.5 font-semibold text-blue-700">
                    {(item.failureRisk * 100).toFixed(0)}%
                  </td>
                  <td className="py-2 px-2.5 font-semibold text-red-700">
                    {item.overdueDays > 0 ? `${item.overdueDays}d` : 'On time'}
                  </td>
                  <td className="py-2 px-2.5 text-slate-500">{item.dueDate}</td>
                  <td className="py-2 px-2.5 font-semibold text-purple-800">{item.recommendedWeek}</td>
                  <td className="py-2 px-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      item.status === 'PLANNED' ? 'rail-badge-green' :
                      item.status === 'PENDING' ? 'rail-badge-blue' :
                      item.status === 'DEFERRED' ? 'rail-badge-red' :
                      'rail-badge-amber'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2 px-2.5 text-right">
                    <button className="p-1 text-slate-400 hover:text-slate-700 rounded">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
