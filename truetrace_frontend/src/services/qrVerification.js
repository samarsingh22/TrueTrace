export function buildQrPayload(batch) {
  return JSON.stringify(
    {
      BatchID: batch.batchId,
      Product: batch.productName,
      Mfg: batch.mfgDate,
      Exp: batch.expDate,
      Status: batch.recalled ? "Recalled" : "Verified",
    },
    null,
    2,
  );
}

export function resolveBatchIdFromInput(input) {
  if (!input) return "";
  const trimmed = input.trim();

  try {
    const parsed = JSON.parse(trimmed);
    if (parsed && typeof parsed === "object") {
      return String(parsed.BatchID || parsed.batchId || "").trim();
    }
  } catch {
    // Not JSON payload, treat as direct batch id.
  }

  return trimmed;
}
