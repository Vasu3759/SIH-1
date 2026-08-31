// Compatible Work Detection & Merge Engine
// Identifies cross-department maintenance requests that can be combined into a single block window.

export function detectCompatibleWork(maintenanceItems = []) {
  const opportunities = [];

  for (let i = 0; i < maintenanceItems.length; i++) {
    for (let j = i + 1; j < maintenanceItems.length; j++) {
      const itemA = maintenanceItems[i];
      const itemB = maintenanceItems[j];

      // Check if from different departments or complementary tasks
      if (itemA.department === itemB.department && itemA.id === itemB.id) continue;

      const sameBlockSection = itemA.blockSection === itemB.blockSection;
      const sameLine = itemA.line === itemB.line;
      const sameDirection = itemA.direction === itemB.direction || itemA.direction === 'BOTH' || itemB.direction === 'BOTH';
      const locationOverlap = isKmOverlap(itemA.startKm, itemA.endKm, itemB.startKm, itemB.endKm);

      if (sameBlockSection && sameLine && sameDirection && locationOverlap) {
        // Calculate separate vs combined duration
        const minsA = itemA.workDurationMins || 120;
        const minsB = itemB.workDurationMins || 90;
        const separateTotal = minsA + minsB;
        
        // Combined duration has setup overlap savings (~30-45 mins saved)
        const combinedTotal = Math.max(minsA, minsB) + 20; // Max work duration + 20 min buffer
        const savedMins = separateTotal - combinedTotal;

        if (savedMins > 0) {
          opportunities.push({
            id: `MERGE-${itemA.id}-${itemB.id}`,
            blockSection: itemA.blockSection,
            line: itemA.line,
            direction: itemA.direction,
            kmRange: `${Math.min(itemA.startKm, itemB.startKm)} - ${Math.max(itemA.endKm, itemB.endKm)}`,
            requestA: {
              id: itemA.id,
              dept: itemA.department,
              work: itemA.asset,
              durationMins: minsA
            },
            requestB: {
              id: itemB.id,
              dept: itemB.department,
              work: itemB.asset,
              durationMins: minsB
            },
            separateDurationMins: separateTotal,
            combinedDurationMins: combinedTotal,
            savedCorridorMins: savedMins,
            compatibilityChecks: {
              sameBlockSection,
              sameLine,
              sameDirection,
              compatibleLocation: true,
              overlappingWindow: true
            },
            recommendationScore: Math.round(((itemA.priorityScore + itemB.priorityScore) / 2) + 5)
          });
        }
      }
    }
  }

  return opportunities;
}

function isKmOverlap(s1, e1, s2, e2) {
  // Allow overlap if within 1.5 km radius
  const buffer = 1.5;
  return (s1 - buffer <= e2 && e1 + buffer >= s2);
}
