// Block Planning Optimization Engine (Greedy + Simulated Annealing Simulation)
// Operates on unified maintenance items, COA timetable, and hard constraints.

import { INITIAL_WEEKLY_PLAN, MAINTENANCE_ITEMS } from '../data/mockData';

export function runOptimizationSimulation(baselinePlan = INITIAL_WEEKLY_PLAN, scenario = null) {
  // 1. Initial Feasible Plan (Greedy Assignment)
  const initialBlocks = [...baselinePlan];
  
  // 2. Simulated Annealing Step (Deterministic Mock Iterations)
  // T_start = 100, T_min = 0.01, cooling_rate = 0.95
  let optimizedPlan = JSON.parse(JSON.stringify(initialBlocks));
  
  let initialMetrics = {
    plannedBlocks: initialBlocks.length,
    conflictsAvoided: 11,
    mergeOpportunities: 9,
    weightedDelayScore: 142.5,
    utilizationPct: 82
  };

  let optimizedMetrics = {
    plannedBlocks: initialBlocks.length,
    conflictsAvoided: 14,
    mergeOpportunities: 12,
    weightedDelayScore: 110.8,
    utilizationPct: 79
  };

  // If a scenario is applied, modify the plan deterministically
  if (scenario) {
    if (scenario.type === 'REDUCED_CAPACITY') {
      // Move lower priority item (SMMS-202) to Thursday or defer, adjust slots
      optimizedPlan = optimizedPlan.map(block => {
        if (block.primaryItem === 'SMMS-202') {
          return {
            ...block,
            day: 'Thursday',
            timeSlot: '15:30 – 17:15',
            startTime: '15:30',
            endTime: '17:15',
            changeTag: 'MOVED',
            changeReason: 'Capacity reduced on Tuesday; slot reassigned to Thursday afternoon.'
          };
        }
        if (block.primaryItem === 'TMS-304') {
          return {
            ...block,
            day: 'Sunday',
            timeSlot: '10:00 – 12:00',
            startTime: '10:00',
            endTime: '12:00',
            changeTag: 'MOVED',
            changeReason: 'Corridor capacity bottleneck shift to weekend.'
          };
        }
        return block;
      });
      optimizedMetrics.utilizationPct = 65;
      optimizedMetrics.weightedDelayScore = 128.4;
    } else if (scenario.type === 'WINDOW_UNAVAILABLE') {
      // Block section CYZ-GZB unavailable on Monday
      optimizedPlan = optimizedPlan.map(block => {
        if (block.blockSection === 'CYZ-GZB' && block.day === 'Monday') {
          return {
            ...block,
            day: 'Wednesday',
            timeSlot: '14:00 – 15:30',
            startTime: '14:00',
            endTime: '15:30',
            changeTag: 'MOVED',
            changeReason: 'Monday CYZ-GZB corridor window blocked for emergency track works.'
          };
        }
        return block;
      });
    } else if (scenario.type === 'NEW_CRITICAL_ITEM') {
      // Add new critical item TMS-CRIT-99 on Tuesday morning
      const newBlock = {
        id: 'BLK-CRIT-999',
        day: 'Tuesday',
        date: '2026-09-08',
        timeSlot: '08:00 – 10:30',
        startTime: '08:00',
        endTime: '10:30',
        blockSection: 'CYZ-GZB',
        line: 'Line 1',
        direction: 'UP',
        kmRange: '114.2 - 114.8',
        workType: 'Emergency Rail Fracture Weld & Replacement',
        department: 'TMS',
        duration: '2h 30m',
        isCombined: false,
        combinedItems: [],
        primaryItem: 'TMS-CRIT-99',
        priorityScore: 98.5,
        status: 'PLANNED',
        safetyBufferMins: 15,
        hardConstraintCheck: true,
        changeTag: 'ADDED',
        changeReason: 'Inserted new critical rail fracture emergency repair item.'
      };
      optimizedPlan.unshift(newBlock);
      optimizedMetrics.plannedBlocks += 1;
    }
  }

  return {
    initialPlan: initialBlocks,
    optimizedPlan,
    initialMetrics,
    optimizedMetrics,
    iterationsRun: 2500,
    temperatureEnd: 0.01,
    energyImprovementPct: 22.3
  };
}

export function generatePlanChanges(baselinePlan, updatedPlan) {
  const changes = [];
  const baselineMap = new Map(baselinePlan.map(b => [b.id, b]));
  const updatedMap = new Map(updatedPlan.map(b => [b.id, b]));

  // Check for updated or moved items
  updatedPlan.forEach(updated => {
    const baseline = baselineMap.get(updated.id);
    if (!baseline) {
      changes.push({
        id: `CHG-${updated.id}`,
        blockId: updated.id,
        type: 'ADDED',
        item: updated.workType,
        department: updated.department,
        baselineSlot: 'N/A',
        updatedSlot: `${updated.day} ${updated.timeSlot} (${updated.blockSection})`,
        reason: updated.changeReason || 'Newly inserted priority block request.'
      });
    } else if (baseline.day !== updated.day || baseline.timeSlot !== updated.timeSlot || baseline.blockSection !== updated.blockSection) {
      changes.push({
        id: `CHG-${updated.id}`,
        blockId: updated.id,
        type: 'MOVED',
        item: updated.workType,
        department: updated.department,
        baselineSlot: `${baseline.day} ${baseline.timeSlot} (${baseline.blockSection})`,
        updatedSlot: `${updated.day} ${updated.timeSlot} (${updated.blockSection})`,
        reason: updated.changeReason || 'Optimized to avoid corridor congestion and maximize merge efficiency.'
      });
    } else {
      changes.push({
        id: `CHG-${updated.id}`,
        blockId: updated.id,
        type: 'UNCHANGED',
        item: updated.workType,
        department: updated.department,
        baselineSlot: `${baseline.day} ${baseline.timeSlot} (${baseline.blockSection})`,
        updatedSlot: `${updated.day} ${updated.timeSlot} (${updated.blockSection})`,
        reason: 'Retained optimal timing window.'
      });
    }
  });

  // Check for removed items
  baselinePlan.forEach(baseline => {
    if (!updatedMap.has(baseline.id)) {
      changes.push({
        id: `CHG-REM-${baseline.id}`,
        blockId: baseline.id,
        type: 'REMOVED',
        item: baseline.workType,
        department: baseline.department,
        baselineSlot: `${baseline.day} ${baseline.timeSlot} (${baseline.blockSection})`,
        updatedSlot: 'Deferred to Next Horizon',
        reason: 'Deferred to resolve higher priority corridor conflict.'
      });
    }
  });

  return changes;
}
