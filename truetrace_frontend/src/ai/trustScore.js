export function calculateTrustScore({ suspiciousScans = 0, recalled = false } = {}) {
  if (recalled) return 0;

  const score = 100 - Number(suspiciousScans || 0) * 10;
  return Math.max(0, Math.min(100, score));
}
