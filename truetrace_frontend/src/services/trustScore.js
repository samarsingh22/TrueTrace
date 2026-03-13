export function computeTrustScore({ recalled, suspiciousEvents, anomalyFlags }) {
  if (recalled) return 0;

  const suspiciousPenalty = Math.min(40, suspiciousEvents * 5);
  const anomalyPenalty = Math.min(40, anomalyFlags.length * 15);

  return Math.max(0, 100 - suspiciousPenalty - anomalyPenalty);
}
