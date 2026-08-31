import React, { useState } from 'react';
import { MAINTENANCE_ITEMS } from '../data/mockData';
import PriorityDetailsModal from '../components/PriorityDetailsModal';
import { Search, ChevronRight } from 'lucide-react';

export default function BlockRequests() {
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = MAINTENANCE_ITEMS.filter(item => {
    const matchesDept = deptFilter === 'ALL' || item.department === deptFilter;
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    const matchesSearch = searchQuery === '' || 
      item.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.station.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.blockSection.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-4 pb-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded border border-slate-300 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight uppercase">Maintenance Block Requests Backlog</h2>
            <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 border border-blue-300 px-2 py-0.5 rounded">
              UNIFIED DEMAND
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Integrated demand backlog from TMS, SMMS, and TDMS before COA block assignment.
          </p>
        </div>
        <div className="text-xs font-mono text-slate-800 bg-slate-100 px-3 py-1.5 rounded border border-slate-300">
          Total Pending Requests: <strong className="text-[#850e0e] font-bold">184 Items</strong>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="rail-card p-3 flex flex-col md:flex-row gap-2 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search asset, station, block section..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-mono"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2 text-xs font-mono w-full md:w-auto overflow-x-auto">
          <div className="flex items-center space-x-1 bg-slate-50 px-2.5 py-1 rounded border border-slate-300">
            <span className="text-slate-500 text-[11px] font-sans">Dept:</span>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer text-xs"
            >
              <option value="ALL" className="bg-white text-slate-900">All (TMS/SMMS/TDMS)</option>
              <option value="TMS" className="bg-white text-slate-900">TMS (Track)</option>
              <option value="SMMS" className="bg-white text-slate-900">SMMS (Signal)</option>
              <option value="TDMS" className="bg-white text-slate-900">TDMS (Traction)</option>
            </select>
          </div>

          <div className="flex items-center space-x-1 bg-slate-50 px-2.5 py-1 rounded border border-slate-300">
            <span className="text-slate-500 text-[11px] font-sans">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer text-xs"
            >
              <option value="ALL" className="bg-white text-slate-900">All Statuses</option>
              <option value="PENDING" className="bg-white text-slate-900">PENDING</option>
              <option value="PLANNED" className="bg-white text-slate-900">PLANNED</option>
              <option value="DEFERRED" className="bg-white text-slate-900">DEFERRED</option>
              <option value="AT_RISK" className="bg-white text-slate-900">AT_RISK</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="rail-card p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-300 text-slate-600 uppercase text-[10px] font-mono tracking-wider bg-slate-100">
                <th className="py-2.5 px-2.5">Req ID</th>
                <th className="py-2.5 px-2.5">Dept</th>
                <th className="py-2.5 px-2.5">Asset Description</th>
                <th className="py-2.5 px-2.5">Station & Location</th>
                <th className="py-2.5 px-2.5">Block Section</th>
                <th className="py-2.5 px-2.5">Duration</th>
                <th className="py-2.5 px-2.5">Priority</th>
                <th className="py-2.5 px-2.5">Due Date</th>
                <th className="py-2.5 px-2.5">Overdue</th>
                <th className="py-2.5 px-2.5">Status</th>
                <th className="py-2.5 px-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono">
              {filteredItems.map((item) => (
                <tr 
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <td className="py-2 px-2.5 font-bold text-slate-900">{item.id}</td>
                  <td className="py-2 px-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      item.department === 'TMS' ? 'rail-badge-blue' :
                      item.department === 'SMMS' ? 'rail-badge-green' :
                      'rail-badge-purple'
                    }`}>
                      {item.department}
                    </span>
                  </td>
                  <td className="py-2 px-2.5 font-semibold text-slate-900 max-w-xs truncate font-sans">
                    {item.asset}
                  </td>
                  <td className="py-2 px-2.5 text-slate-700 font-mono">
                    {item.station} ({item.location})
                  </td>
                  <td className="py-2 px-2.5 text-slate-700 font-mono">
                    {item.blockSection} {item.line}
                  </td>
                  <td className="py-2 px-2.5 text-slate-600 font-mono">{item.workDuration}</td>
                  <td className="py-2 px-2.5 font-mono font-extrabold text-[#850e0e] text-sm">
                    {item.priorityScore}
                  </td>
                  <td className="py-2 px-2.5 text-slate-500 font-mono">{item.dueDate}</td>
                  <td className="py-2 px-2.5 font-mono font-semibold text-red-700">
                    {item.overdueDays > 0 ? `${item.overdueDays}d` : '0d'}
                  </td>
                  <td className="py-2 px-2.5 font-mono">
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
                    <button className="px-2 py-1 bg-[#850e0e] hover:bg-[#6b0b0b] text-white text-[10px] font-semibold font-sans rounded transition-colors">
                      Inspect
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
