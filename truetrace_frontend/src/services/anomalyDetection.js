export function detectAnomalies(scanHistory, batchId, currentZone) {
  const now = Date.now();
  const sameBatch = scanHistory.filter((event) => event.batchId === batchId);

  const oneHourAgo = now - 60 * 60 * 1000;
  const recentCount = sameBatch.filter((event) => event.timestamp >= oneHourAgo).length;

  const distinctZonesInLastHour = new Set(
    sameBatch
      .filter((event) => event.timestamp >= oneHourAgo)
      .map((event) => event.zone)
      .filter(Boolean),
  );

  const flags = [];

  if (recentCount >= 4) {
    flags.push("High-frequency scan velocity");
  }

  if (distinctZonesInLastHour.size >= 3) {
    flags.push("Multi-zone scan mismatch");
  }

  if (currentZone && !distinctZonesInLastHour.has(currentZone) && distinctZonesInLastHour.size >= 2) {
    flags.push("Unexpected new scan zone");
  }

  return {
    flags,
    suspiciousEvents: recentCount,
  };
}
