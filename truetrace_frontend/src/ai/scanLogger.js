const SCAN_LOG_STORAGE_KEY = "sentinelchain.ai.scan.events.v1";

function readRawEvents() {
  try {
    const raw = localStorage.getItem(SCAN_LOG_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRawEvents(events) {
  localStorage.setItem(SCAN_LOG_STORAGE_KEY, JSON.stringify(events));
}

export function getCurrentLocation() {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown/Unknown";
  const city = timeZone.includes("/") ? timeZone.split("/").pop() : timeZone;
  return city.replace(/_/g, " ");
}

export function readScanEvents() {
  return readRawEvents();
}

export function logScanEvent({ batchID, timestamp = Date.now(), location }) {
  const event = {
    batchID: String(batchID || "").trim(),
    timestamp: Number(timestamp),
    location: String(location || getCurrentLocation()).trim(),
  };

  if (!event.batchID) {
    throw new Error("batchID is required to log a scan event.");
  }

  const events = readRawEvents();
  const nextEvents = [...events.slice(-499), event];
  writeRawEvents(nextEvents);
  return event;
}

export function getBatchScanEvents(batchID) {
  const key = String(batchID || "").trim().toLowerCase();
  if (!key) return [];

  return readRawEvents().filter((event) => String(event.batchID || "").toLowerCase() === key);
}

export function clearScanEvents() {
  localStorage.removeItem(SCAN_LOG_STORAGE_KEY);
}
