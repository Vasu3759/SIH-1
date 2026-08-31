import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import CommandCenter from './pages/CommandCenter';
import MonthlyPlan from './pages/MonthlyPlan';
import WeeklyPlan from './pages/WeeklyPlan';
import BlockRequests from './pages/BlockRequests';
import Compatibility from './pages/Compatibility';
import PriorityRisk from './pages/PriorityRisk';
import AIRiskAnalysis from './pages/AIRiskAnalysis';
import Disruptions from './pages/Disruptions';
import WhatIfScenarios from './pages/WhatIfScenarios';
import PlanChanges from './pages/PlanChanges';
import UnifiedData from './pages/UnifiedData';
import SourceSystems from './pages/SourceSystems';
import AuditGuardrails from './pages/AuditGuardrails';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('command-center');
  
  // Topbar selectors state
  const [selectedZone, setSelectedZone] = useState('NR');
  const [selectedDivision, setSelectedDivision] = useState('DLI');
  const [selectedHorizon, setSelectedHorizon] = useState('Weekly');

  if (!isLoggedIn) {
    return <LandingPage onEnter={() => setIsLoggedIn(true)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'command-center':
        return <CommandCenter onNavigate={setCurrentPage} />;
      case 'monthly-plan':
        return <MonthlyPlan onNavigate={setCurrentPage} />;
      case 'weekly-plan':
        return <WeeklyPlan />;
      case 'block-requests':
        return <BlockRequests />;
      case 'compatibility':
        return <Compatibility />;
      case 'priority-risk':
        return <PriorityRisk />;
      case 'ai-risk-analysis':
        return <AIRiskAnalysis />;
      case 'disruptions':
        return <Disruptions onNavigate={setCurrentPage} />;
      case 'what-if':
        return <WhatIfScenarios onNavigate={setCurrentPage} />;
      case 'plan-changes':
        return <PlanChanges />;
      case 'unified-data':
        return <UnifiedData />;
      case 'source-systems':
        return <SourceSystems />;
      case 'audit-guardrails':
        return <AuditGuardrails />;
      default:
        return <CommandCenter onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      <Topbar
        selectedZone={selectedZone}
        setSelectedZone={setSelectedZone}
        selectedDivision={selectedDivision}
        setSelectedDivision={setSelectedDivision}
        selectedHorizon={selectedHorizon}
        setSelectedHorizon={setSelectedHorizon}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
        />
        
        <main className="flex-1 p-5 overflow-y-auto bg-[#f8fafc]">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
