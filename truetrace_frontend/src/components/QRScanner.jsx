import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { verifyBatch } from "../blockchain/contract";
import { calculateTrustScore } from "../ai/trustScore";
import { detectAnomalies } from "../ai/anomalyDetection";
import { getBatchScanEvents, getCurrentLocation, logScanEvent, readScanEvents } from "../ai/scanLogger";

const QR_READER_REGION_ID = "truetrace-qr-reader";

function extractBatchId(rawValue) {
  const value = (rawValue || "").trim();
  if (!value) return "";

  try {
    const parsed = JSON.parse(value);
    if (parsed.batchId) return String(parsed.batchId).trim();
    if (parsed.batchID) return String(parsed.batchID).trim();
    if (parsed.id) return String(parsed.id).trim();
  } catch {
    return value;
  }

  return value;
}

export default function QRScanner({ onVerified, onError, onScanLogged }) {
  const [scanning, setScanning] = useState(false);
  const [lastBatchId, setLastBatchId] = useState("");
  const [message, setMessage] = useState("Scan a QR code to verify a batch.");
  const lastScanRef = useRef("");
  const scannerRef = useRef(null);
  const scanningRef = useRef(false);

  async function handleResult(rawText) {
    if (!rawText || scanningRef.current) return;

    const batchId = extractBatchId(rawText);
    if (!batchId || lastScanRef.current === batchId) return;

    lastScanRef.current = batchId;
    setLastBatchId(batchId);
    scanningRef.current = true;
    setScanning(true);
    setMessage(`Verifying ${batchId} on-chain...`);

    try {
      const chainData = await verifyBatch(batchId);
      const location = getCurrentLocation();
      logScanEvent({ batchID: chainData.batchId, timestamp: Date.now(), location });
      const anomaly = detectAnomalies(readScanEvents(), chainData.batchId, location);
      const trustScore = calculateTrustScore({
        recalled: chainData.recalled,
        suspiciousScans: anomaly.suspiciousScans,
      });

      const verifiedData = {
        ...chainData,
        location,
        trustScore,
        anomalyFlags: anomaly.flags,
        suspiciousScans: anomaly.suspiciousScans,
        scansObserved: getBatchScanEvents(chainData.batchId).length,
      };

      setMessage(`Verification completed for ${batchId}.`);
      if (onVerified) onVerified(verifiedData);
      if (onScanLogged) onScanLogged();
    } catch (error) {
      setMessage(error?.message || "Verification failed.");
      if (onError) onError(error);
    } finally {
      scanningRef.current = false;
      setScanning(false);
    }
  }

  useEffect(() => {
    const qrCodeScanner = new Html5Qrcode(QR_READER_REGION_ID);
    scannerRef.current = qrCodeScanner;

    async function startScanner() {
      try {
        await qrCodeScanner.start(
          { facingMode: { ideal: "environment" } },
          { fps: 10, qrbox: { width: 240, height: 240 } },
          (decodedText) => {
            handleResult(decodedText);
          },
          () => {},
        );
      } catch {
        setMessage("Unable to access camera. Check camera permissions and try again.");
      }
    }

    startScanner();

    return () => {
      if (!scannerRef.current) return;
      scannerRef.current
        .stop()
        .catch(() => {})
        .finally(() => {
          scannerRef.current?.clear().catch(() => {});
        });
    };
  }, []);

  return (
    <div>
      <div style={{ overflow: "hidden", borderRadius: "10px", border: "1px solid var(--border)", minHeight: "280px" }}>
        <div id={QR_READER_REGION_ID} />
      </div>

      <div style={{ marginTop: "10px", color: "var(--text-secondary)", fontSize: "0.82rem" }}>
        {message}
        {lastBatchId ? ` Last scan: ${lastBatchId}` : ""}
      </div>

      <div style={{ marginTop: "10px" }}>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            lastScanRef.current = "";
            setLastBatchId("");
            setMessage("Ready for next scan.");
          }}
        >
          Scan Another
        </button>
      </div>
    </div>
  );
}
