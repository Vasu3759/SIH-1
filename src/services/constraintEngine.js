// Hard Constraint Validation Engine for Railway Maintenance Blocks
// Must return strict pass/fail boolean with exact reason if violated.

export function validateHardConstraints(proposedSlot, existingSlots = [], confirmedTrainPaths = []) {
  const violations = [];

  // Constraint 1: Disconnection + Work + Reconnection Duration Coverage
  const requiredDurationMins = (proposedSlot.workDurationMins || 120) + 
    (proposedSlot.disconnectRequired ? (proposedSlot.disconnectDuration || 15) + (proposedSlot.reconnectDuration || 15) : 0);
  
  if (proposedSlot.allocatedDurationMins && proposedSlot.allocatedDurationMins < requiredDurationMins) {
    violations.push({
      rule: 'DURATION_COVERAGE',
      message: `Allocated window (${proposedSlot.allocatedDurationMins}m) does not cover disconnect (${proposedSlot.disconnectDuration || 15}m) + work (${proposedSlot.workDurationMins}m) + reconnect (${proposedSlot.reconnectDuration || 15}m) = total ${requiredDurationMins}m required.`
    });
  }

  // Constraint 2: Due Date Check
  if (proposedSlot.dueDate && proposedSlot.slotDate) {
    if (new Date(proposedSlot.slotDate) > new Date(proposedSlot.dueDate)) {
      violations.push({
        rule: 'DUE_DATE_EXCEEDED',
        message: `Proposed slot date (${proposedSlot.slotDate}) is after asset maintenance due date (${proposedSlot.dueDate}).`
      });
    }
  }

  // Constraint 3: Confirmed Timetable Conflict & Safety Buffer (COA Check)
  const bufferMins = proposedSlot.safetyBufferMins || 15;
  const conflictingTrain = confirmedTrainPaths.find(train => {
    if (train.blockSection === proposedSlot.blockSection && 
        train.line === proposedSlot.line && 
        (train.direction === proposedSlot.direction || train.direction === 'BOTH')) {
      // Check time overlap with buffer
      return isTimeOverlapWithBuffer(proposedSlot.startTime, proposedSlot.endTime, train.depTime, train.arrTime, bufferMins);
    }
    return false;
  });

  if (conflictingTrain) {
    violations.push({
      rule: 'TRAIN_PATH_CONFLICT',
      message: `Conflicts with confirmed timetable for Train #${conflictingTrain.trainNo} (${conflictingTrain.name}) on ${proposedSlot.blockSection} ${proposedSlot.line} (requires ${bufferMins}m safety buffer).`
    });
  }

  // Constraint 4: Incompatible Overlapping Work Check
  const overlappingWork = existingSlots.find(existing => {
    if (existing.id === proposedSlot.id) return false;
    if (existing.blockSection === proposedSlot.blockSection &&
        existing.line === proposedSlot.line &&
        existing.day === proposedSlot.day &&
        (existing.direction === proposedSlot.direction || existing.direction === 'BOTH')) {
      return isTimeOverlap(proposedSlot.startTime, proposedSlot.endTime, existing.startTime, existing.endTime);
    }
    return false;
  });

  if (overlappingWork) {
    violations.push({
      rule: 'OVERLAPPING_WORK_CONFLICT',
      message: `Overlaps with already planned block #${overlappingWork.id} (${overlappingWork.workType}) on ${proposedSlot.blockSection}.`
    });
  }

  return {
    isValid: violations.length === 0,
    violations,
    checks: [
      { id: 'c1', label: 'No incompatible overlapping work', pass: !violations.some(v => v.rule === 'OVERLAPPING_WORK_CONFLICT') },
      { id: 'c2', label: 'Safety buffer before train path (min 15m)', pass: !violations.some(v => v.rule === 'TRAIN_PATH_CONFLICT') },
      { id: 'c3', label: 'Safety buffer after train path (min 15m)', pass: !violations.some(v => v.rule === 'TRAIN_PATH_CONFLICT') },
      { id: 'c4', label: 'Disconnect + work + reconnect duration covered', pass: !violations.some(v => v.rule === 'DURATION_COVERAGE') },
      { id: 'c5', label: 'Scheduled before asset due date', pass: !violations.some(v => v.rule === 'DUE_DATE_EXCEEDED') },
      { id: 'c6', label: 'No confirmed timetable conflict (COA check)', pass: !violations.some(v => v.rule === 'TRAIN_PATH_CONFLICT') }
    ]
  };
}

// Helper time functions
function isTimeOverlap(start1, end1, start2, end2) {
  return (start1 < end2 && end1 > start2);
}

function isTimeOverlapWithBuffer(start1, end1, start2, end2, bufferMins) {
  // Convert HH:MM to minutes from midnight
  const toMins = timeStr => {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const s1 = toMins(start1);
  const e1 = toMins(end1);
  const s2 = toMins(start2) - bufferMins;
  const e2 = toMins(end2) + bufferMins;

  return (s1 < e2 && e1 > s2);
}
