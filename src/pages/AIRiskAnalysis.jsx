import React, { useState } from 'react';
import { MAINTENANCE_ITEMS } from '../data/mockData';
import { predictFailureRiskMock, MODEL_GUARDRAILS } from '../services/aiRiskEngine';
import { ShieldCheck, CheckCircle2, Cpu, BarChart2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function AIRiskAnalysis() {
  const [selectedAssetId, setSelectedAssetId] = useState('TMS-101');
  const targetItem = MAINTENANCE_ITEMS.find(i => i.id === selectedAssetId) || MAINTENANCE_ITEMS[0];
  const riskAnalysis = predictFailureRiskMock(targetItem);

  const chartFeatureData = riskAnalysis.contributingFeatures.map(f => ({
    name: f.name,
    weight: f.weight
  }));

  return (
    <div className="space-y-4 pb-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded border border-slate-300 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight uppercase">Predictive Asset Failure Risk Analysis</h2>
            <span className="text-xs font-mono font-bold bg-purple-100 text-purple-800 border border-purple-300 px-2.5 py-0.5 rounded">
              XGBOOST CLASSIFIER
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Predicts probability of asset failure within 1 periodicity cycle based strictly on pre-outcome telemetry.
          </p>
        </div>
        {/* Asset Selector */}
        <div className="flex items-center space-x-2 text-xs font-mono bg-slate-50 border border-slate-300 px-3 py-1.5 rounded">
          <span className="text-slate-600 font-sans font-medium text-xs">Select Asset:</span>
          <select
            value={selectedAssetId}
            onChange={(e) => setSelectedAssetId(e.target.value)}
            className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer text-xs"
          >
            {MAINTENANCE_ITEMS.map(item => (
              <option key={item.id} value={item.id} className="bg-white text-slate-900">
                {item.id} - {item.asset}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Spotlight Card */}
      <div className="rail-card p-5 border-slate-300 bg-white space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-mono font-bold text-purple-800 uppercase tracking-wider">{targetItem.department} • {targetItem.id}</span>
            <h3 className="text-lg font-extrabold text-slate-900">{targetItem.asset}</h3>
            <p className="text-xs text-slate-600 font-mono mt-0.5">
              Location: {targetItem.location} ({targetItem.station}) • Block Section: {targetItem.blockSection} ({targetItem.line})
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-300 p-3 rounded text-center shrink-0 min-w-44 font-mono">
            <span className="text-xs text-slate-600 font-sans uppercase font-semibold block">Predicted 30-Day Failure Risk</span>
            <div className="text-3xl font-extrabold text-red-700 mt-0.5 tracking-tight">
              {riskAnalysis.failureRiskPct}%
            </div>
            <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded text-xs font-bold rail-badge-red uppercase">
              {riskAnalysis.riskBand} RISK BAND
            </span>
          </div>
        </div>

        {/* Contributing Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center space-x-1.5 font-sans">
              <Cpu className="w-4 h-4 text-purple-700" />
              <span>XGBoost Feature Attributions (SHAP)</span>
            </h4>
            <div className="space-y-1.5 font-mono text-xs">
              {riskAnalysis.contributingFeatures.map((feat, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded border border-slate-200 flex items-center justify-between">
                  <div>
                    <strong className="text-slate-900 block font-semibold font-sans text-xs">{feat.name}</strong>
                    <span className="text-xs text-slate-500">Pre-outcome telemetry signal</span>
                  </div>
                  <span className="font-bold text-red-700 text-xs">{feat.impact}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center space-x-1.5 font-sans">
              <BarChart2 className="w-4 h-4 text-blue-700" />
              <span>Relative Feature Importance</span>
            </h4>
            <div className="bg-slate-50 p-3 rounded border border-slate-200 h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartFeatureData} layout="vertical" margin={{ top: 10, right: 20, left: 30, bottom: 0 }}>
                  <XAxis type="number" stroke="#64748b" fontSize={10} />
                  <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={10} width={130} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#0f172a', fontSize: '12px' }} />
                  <Bar dataKey="weight" fill="#7e22ce" radius={[0, 2, 2, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Model Guardrails */}
      <div className="rail-card p-4 space-y-3">
        <div>
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Statistical Model Governance & Leakage Guardrails</span>
          </h3>
          <p className="text-xs text-slate-500 font-mono">Ensures strict audit compliance and prevents data leakage in production model training.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {MODEL_GUARDRAILS.map((g) => (
            <div key={g.id} className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1">
              <div className="flex items-center space-x-1.5 text-emerald-800 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{g.title}</span>
              </div>
              <p className="text-xs text-slate-600 leading-snug pl-5">{g.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
