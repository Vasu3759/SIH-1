// Priority Scoring Engine - Hybrid Rule + AI Priority Score
// Formula: priority_score = w1 × severity_band_score + w2 × normalized_failure_risk + w3 × overdue_urgency

export const DEFAULT_WEIGHTS = {
  w1_severity: 0.40, // 40% Departmental Severity Rules
  w2_failure_risk: 0.40, // 40% XGBoost Failure Risk
  w3_overdue: 0.20 // 20% Overdue Urgency
};

export function calculatePriorityScore(item, customWeights = DEFAULT_WEIGHTS) {
  const w1 = customWeights.w1_severity;
  const w2 = customWeights.w2_failure_risk;
  const w3 = customWeights.w3_overdue;

  // 1. Rule-based Severity Band Score (0 - 100)
  let severityScore = item.severityScore || 50;
  if (!item.severityScore) {
    if (item.severityBand === 'Critical') severityScore = 90;
    else if (item.severityBand === 'Warning') severityScore = 65;
    else severityScore = 35;
  }

  // 2. ML-derived Failure Risk (0 - 100)
  const failureRiskRaw = item.failureRisk || 0.3;
  const normalizedFailureRisk = Math.min(100, Math.max(0, failureRiskRaw * 100));

  // 3. Overdue Urgency Score (0 - 100)
  const overdueDays = item.overdueDays || 0;
  // Overdue score ramps up rapidly past due date: 0 days = 0, 10 days = 35, 30 days = 100
  const overdueUrgency = Math.min(100, Math.max(0, overdueDays * 3.33));

  // 4. Combined Auditable Priority Score
  const priorityScore = parseFloat((
    w1 * severityScore +
    w2 * normalizedFailureRisk +
    w3 * overdueUrgency
  ).toFixed(1));

  return {
    priorityScore,
    breakdown: {
      w1,
      w2,
      w3,
      severityBandScore: severityScore,
      normalizedFailureRisk: parseFloat(normalizedFailureRisk.toFixed(1)),
      overdueUrgency: parseFloat(overdueUrgency.toFixed(1)),
      explanation: 'Auditable hybrid score combining rule-based departmental severity, ML-derived failure risk, and overdue urgency.'
    }
  };
}
