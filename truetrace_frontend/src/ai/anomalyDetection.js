const FIFTEEN_MINUTES = 15 * 60 * 1000;
const THIRTY_MINUTES = 30 * 60 * 1000;

export function detectAnomalies(scanEvents, batchID, currentLocation, options = {}) {
  const now = Date.now();
  const batchKey = String(batchID || "").trim().toLowerCase();

  const maxScansInWindow = options.maxScansInWindow ?? 5;
  const scansWindowMs = options.scansWindowMs ?? FIFTEEN_MINUTES;
  const multiCityWindowMs = options.multiCityWindowMs ?? THIRTY_MINUTES;

  const sameBatchEvents = scanEvents.filter((event) => String(event.batchID || "").toLowerCase() === batchKey);

  const recentScans = sameBatchEvents.filter((event) => now - Number(event.timestamp || 0) <= scansWindowMs);
  const cityWindowScans = sameBatchEvents.filter((event) => now - Number(event.timestamp || 0) <= multiCityWindowMs);

  const uniqueCities = new Set(
    cityWindowScans
      .map((event) => String(event.location || "").trim())
      .filter(Boolean),
  );

  if (currentLocation) {
    uniqueCities.add(String(currentLocation).trim());
  }

  const flags = [];

  if (recentScans.length >= maxScansInWindow) {
    flags.push("Too many scans in a short period");
  }

  if (uniqueCities.size >= 2) {
    flags.push("Same batch scanned in different cities within short time");
  }

  return {
    flags,
    suspiciousScans: flags.length > 0 ? recentScans.length : 0,
    recentScans: recentScans.length,
    citiesDetected: uniqueCities.size,
  };
}
