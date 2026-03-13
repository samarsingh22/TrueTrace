import { calculateTrustScore } from "../ai/trustScore";

export default function BatchCard({ batch }) {
  if (!batch) return null;

  const trustScore =
    typeof batch.trustScore === "number"
      ? batch.trustScore
      : calculateTrustScore({
          recalled: Boolean(batch.recalled),
          suspiciousScans: batch.suspiciousScans || 0,
        });

  return (
    <div className="verify-result" style={{ marginTop: "12px" }}>
      <div className="result-status">
        <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>Verification Result</span>
        <span className={`badge ${batch.recalled ? "recalled" : "safe"}`}>{batch.recalled ? "Recalled" : "Verified"}</span>
      </div>

      <div className="result-grid" style={{ marginBottom: "16px" }}>
        <div className="result-item">
          <div className="label">Product Name</div>
          <div className="value">{batch.productName || "-"}</div>
        </div>
        <div className="result-item">
          <div className="label">Batch ID</div>
          <div className="value">{batch.batchId || "-"}</div>
        </div>
        <div className="result-item">
          <div className="label">Manufacture Date</div>
          <div className="value">{batch.mfgDate || "-"}</div>
        </div>
        <div className="result-item">
          <div className="label">Expiry Date</div>
          <div className="value">{batch.expDate || "-"}</div>
        </div>
        <div className="result-item" style={{ gridColumn: "span 2" }}>
          <div className="label">Owner</div>
          <div className="value">{batch.owner || "-"}</div>
        </div>
        <div className="result-item">
          <div className="label">Recall Status</div>
          <div className="value">{batch.recalled ? "Recalled" : "Active"}</div>
        </div>
        <div className="result-item">
          <div className="label">Trust Score</div>
          <div className="value">{trustScore}/100</div>
        </div>
      </div>
    </div>
  );
}
