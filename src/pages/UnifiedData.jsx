import React from 'react';
import { ADMINISTRATIVE_HIERARCHY, OPERATIONAL_HIERARCHY, STATION_TO_BLOCK_MAPPING } from '../data/geographicData';
import { Server, GitBranch, MapPin, ArrowRight } from 'lucide-react';

export default function UnifiedData() {
  return (
    <div className="space-y-4 pb-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded border border-slate-300 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight uppercase">Unified Planning Data & Geography Mapping</h2>
            <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 border border-blue-300 px-2 py-0.5 rounded">
              PIPELINE LAYER 1
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Normalized data store joining departmental asset maintenance records with COA operational block geography.
          </p>
        </div>
      </div>

      {/* Pipeline Diagram */}
      <div className="rail-card p-4 space-y-3">
        <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Source-to-Unified Data Pipeline Architecture</h3>

        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-center text-xs font-mono">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 w-full md:w-auto">
            <div className="bg-slate-50 p-2 rounded border border-blue-300 text-blue-800 font-bold">TMS</div>
            <div className="bg-slate-50 p-2 rounded border border-emerald-300 text-emerald-800 font-bold">SMMS</div>
            <div className="bg-slate-50 p-2 rounded border border-purple-300 text-purple-800 font-bold">TDMS</div>
            <div className="bg-slate-50 p-2 rounded border border-amber-300 text-amber-800 font-bold">COA</div>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 hidden md:block" />

          <div className="bg-slate-50 p-2.5 rounded border border-slate-300 w-full md:w-44 text-slate-800">
            <strong className="text-slate-900 block font-bold text-xs font-sans">Data Integration</strong>
            <span className="text-[9px] text-slate-500">Read-Only Adapters</span>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 hidden md:block" />

          <div className="bg-slate-50 p-2.5 rounded border border-slate-300 w-full md:w-48 text-purple-800">
            <strong className="text-slate-900 block font-bold text-xs font-sans">Station-to-Block Mapping</strong>
            <span className="text-[9px] text-purple-700 font-semibold">Geography Join Layer</span>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 hidden md:block" />

          <div className="bg-emerald-50 p-2.5 rounded border border-emerald-300 w-full md:w-44 text-emerald-900 font-bold">
            <strong className="text-slate-900 block font-bold text-xs font-sans">Unified Planning Data</strong>
            <span className="text-[9px] text-emerald-700 font-normal">Normalized Record Store</span>
          </div>
        </div>
      </div>

      {/* Geography Visualizer Section */}
      <div className="rail-card p-4 space-y-4">
        <div>
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-amber-700" />
            <span>Dual Railway Geography Model Visualization</span>
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Preserves two distinct hierarchies: Administrative asset ownership vs COA operational track units.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {/* Administrative */}
          <div className="bg-slate-50 p-4 rounded border border-slate-300 space-y-3">
            <h4 className="font-extrabold text-blue-800 text-xs uppercase tracking-wider flex items-center space-x-1 font-sans">
              <Server className="w-3.5 h-3.5" />
              <span>1. Administrative / Asset-Ownership Hierarchy</span>
            </h4>
            <div className="space-y-1.5">
              <div className="bg-white p-2 rounded border border-slate-200">
                <span className="text-slate-500 block text-[9px] font-sans">Zone:</span>
                <strong className="text-slate-900">{ADMINISTRATIVE_HIERARCHY.zone}</strong>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200 pl-4">
                <span className="text-slate-500 block text-[9px] font-sans">Division:</span>
                <strong className="text-slate-900">{ADMINISTRATIVE_HIERARCHY.division}</strong>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200 pl-8">
                <span className="text-slate-500 block text-[9px] font-sans">Section / Depot:</span>
                <strong className="text-slate-900">Sr.DEN / Line / DLI</strong>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200 pl-12 text-[#850e0e] font-bold">
                Location / Station: Chander Nagar (CYZ Station)
              </div>
            </div>
          </div>

          {/* Operational */}
          <div className="bg-slate-50 p-4 rounded border border-slate-300 space-y-3">
            <h4 className="font-extrabold text-emerald-800 text-xs uppercase tracking-wider flex items-center space-x-1 font-sans">
              <GitBranch className="w-3.5 h-3.5" />
              <span>2. Operational / Traffic Hierarchy (COA)</span>
            </h4>
            <div className="space-y-1.5">
              <div className="bg-white p-2 rounded border border-slate-200">
                <span className="text-slate-500 block text-[9px] font-sans">Corridor:</span>
                <strong className="text-slate-900">{OPERATIONAL_HIERARCHY.corridor}</strong>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200 pl-4">
                <span className="text-slate-500 block text-[9px] font-sans">Block Section:</span>
                <strong className="text-slate-900">CYZ-GZB (Chander Nagar – Ghaziabad)</strong>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200 pl-8">
                <span className="text-slate-500 block text-[9px] font-sans">Line & Direction:</span>
                <strong className="text-slate-900">Line 1 (UP Line)</strong>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200 pl-12 text-emerald-700 font-bold">
                KM Range: KM 112.4 – 124.8
              </div>
            </div>
          </div>
        </div>

        {/* Station-to-Block Mapping Table */}
        <div className="space-y-2 pt-1">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Station-to-Block Mapping Lookup Table</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-300 text-slate-600 uppercase text-[10px] font-mono tracking-wider bg-slate-100">
                  <th className="py-2 px-2.5">Station Code</th>
                  <th className="py-2 px-2.5">Station Name</th>
                  <th className="py-2 px-2.5">Mapped Operational Block Section</th>
                  <th className="py-2 px-2.5">Corridor Name</th>
                  <th className="py-2 px-2.5">KM Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {STATION_TO_BLOCK_MAPPING.map((mapItem, idx) => (
                  <tr key={idx} className="hover:bg-slate-100">
                    <td className="py-2 px-2.5 font-bold text-[#850e0e]">{mapItem.stationCode}</td>
                    <td className="py-2 px-2.5 font-semibold text-slate-900 font-sans">{mapItem.stationName}</td>
                    <td className="py-2 px-2.5 text-emerald-800 font-bold">{mapItem.blockSection}</td>
                    <td className="py-2 px-2.5 text-slate-700 font-sans">{mapItem.corridor}</td>
                    <td className="py-2 px-2.5 text-slate-600">{mapItem.kmRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
