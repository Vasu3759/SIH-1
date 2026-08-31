import React from 'react';
import { ZONES, DIVISIONS } from '../data/geographicData';
import { RefreshCw, Bell, Train } from 'lucide-react';

export default function Topbar({ 
  selectedZone, 
  setSelectedZone, 
  selectedDivision, 
  setSelectedDivision, 
  selectedHorizon, 
  setSelectedHorizon 
}) {
  return (
    <header className="h-14 bg-[#850e0e] text-white border-b border-red-950 px-4 flex items-center justify-between sticky top-0 z-40 shadow-xs font-sans select-none">
      {/* Left Branding */}
      <div className="flex items-center space-x-3">
        <div className="bg-white/10 p-1.5 rounded flex items-center justify-center font-bold">
          <Train className="w-5 h-5 text-amber-300" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-extrabold text-sm text-white uppercase tracking-tight font-sans">Automatic Block Planning Console</h1>
            <span className="text-[10px] font-mono font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded shadow-2xs">
              CRIS COA V2.4
            </span>
          </div>
          <p className="text-xs text-amber-200/90 font-mono">Indian Railways • Control Office Application</p>
        </div>
      </div>

      {/* Center/Right Controls */}
      <div className="flex items-center space-x-3 text-xs">
        {/* Zone Selector */}
        <div className="flex items-center space-x-1.5 bg-[#6b0b0b] border border-red-800 px-2.5 py-1 rounded">
          <span className="text-amber-200 text-xs">Zone:</span>
          <select 
            value={selectedZone} 
            onChange={(e) => setSelectedZone(e.target.value)}
            className="bg-transparent text-white font-mono font-bold focus:outline-none cursor-pointer text-xs"
          >
            {ZONES.map(z => (
              <option key={z.id} value={z.code} className="bg-[#850e0e] text-white">{z.name}</option>
            ))}
          </select>
        </div>

        {/* Division Selector */}
        <div className="flex items-center space-x-1.5 bg-[#6b0b0b] border border-red-800 px-2.5 py-1 rounded">
          <span className="text-amber-200 text-xs">Division:</span>
          <select 
            value={selectedDivision} 
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="bg-transparent text-white font-mono font-bold focus:outline-none cursor-pointer text-xs"
          >
            {DIVISIONS.filter(d => d.zoneId === 'NR').map(d => (
              <option key={d.id} value={d.code} className="bg-[#850e0e] text-white">{d.name}</option>
            ))}
          </select>
        </div>

        {/* Horizon Selector */}
        <div className="flex items-center space-x-1.5 bg-[#6b0b0b] border border-red-800 px-2.5 py-1 rounded">
          <span className="text-amber-200 text-xs">Horizon:</span>
          <select 
            value={selectedHorizon} 
            onChange={(e) => setSelectedHorizon(e.target.value)}
            className="bg-transparent text-white font-mono font-bold focus:outline-none cursor-pointer text-xs"
          >
            <option value="Weekly" className="bg-[#850e0e] text-white">Weekly (Firm)</option>
            <option value="Monthly" className="bg-[#850e0e] text-white">Monthly (Capacity)</option>
          </select>
        </div>

        {/* Sync Badge */}
        <div className="hidden lg:flex items-center space-x-1.5 text-xs font-mono text-amber-200 bg-[#6b0b0b] px-2.5 py-1 rounded border border-red-800">
          <RefreshCw className="w-3.5 h-3.5 text-emerald-300" />
          <span>Sync: <strong className="text-white">31 Aug 18:40</strong></span>
        </div>

        {/* Bell */}
        <button className="relative p-1.5 text-white hover:bg-white/10 border border-red-800 rounded transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-slate-950 text-[10px] font-mono font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* Profile */}
        <div className="flex items-center space-x-2 bg-[#6b0b0b] border border-red-800 px-2.5 py-1 rounded">
          <div className="w-6 h-6 bg-amber-400 text-slate-950 rounded-full flex items-center justify-center text-xs font-bold font-mono">
            RS
          </div>
          <div className="hidden md:block text-left font-sans">
            <p className="text-xs font-semibold text-white leading-none">R. K. Sharma</p>
            <p className="text-[10px] text-amber-200 font-mono leading-none mt-0.5">Sr. DEN (Co) / DLI</p>
          </div>
        </div>
      </div>
    </header>
  );
}
