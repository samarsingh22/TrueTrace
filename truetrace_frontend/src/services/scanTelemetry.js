const STORAGE_KEY = "True Trace.scan.history.v1";

export function getScanZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown";
}

export function readScanHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function appendScanEvent(event) {
  const history = readScanHistory();
  const next = [
    ...history.slice(-199),
    {
      batchId: event.batchId,
      timestamp: event.timestamp,
      zone: event.zone,
    },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
