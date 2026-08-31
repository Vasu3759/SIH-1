import React from 'react';

export default function KPICard({ title, value, unit, trend, trendLabel, icon: Icon, statusColor = 'blue', onClick }) {
  const colorMap = {
    blue: 'border-blue-300 text-blue-800 bg-blue-50',
    red: 'border-red-300 text-red-800 bg-red-50',
    amber: 'border-amber-300 text-amber-900 bg-amber-50',
    green: 'border-emerald-300 text-emerald-800 bg-emerald-50',
    purple: 'border-purple-300 text-purple-800 bg-purple-50'
  };

  return (
    <div 
      onClick={onClick}
      className={`rail-card p-4 rail-card-hover ${onClick ? 'cursor-pointer' : ''} relative select-none`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider">{title}</span>
        <div className={`p-1.5 rounded border ${colorMap[statusColor] || colorMap.blue}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-2.5 flex items-baseline space-x-1.5">
        <span className="text-2xl lg:text-3xl font-mono font-extrabold text-slate-900 tracking-tight">{value}</span>
        {unit && <span className="text-xs text-slate-500 font-sans font-medium">{unit}</span>}
      </div>

      {trend && (
        <div className="mt-2 flex items-center space-x-1 font-mono text-xs">
          <span className={`font-bold ${trend.startsWith('+') ? 'text-emerald-700' : 'text-amber-800'}`}>
            {trend}
          </span>
          <span className="text-slate-500 font-sans">{trendLabel}</span>
        </div>
      )}
    </div>
  );
}
