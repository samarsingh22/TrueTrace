const DEFAULT_JOURNEY = ["Manufacturer", "Distributor", "Retailer", "Consumer"];

export default function SupplyTimeline({
  journey = DEFAULT_JOURNEY,
  activeStage = -1,
}) {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "18px",
        background: "var(--card)",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: "12px" }}>Product Journey</div>

      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
        {journey.map((stage, index) => {
          const isActive = activeStage >= index;
          return (
            <div key={stage} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: "999px",
                  border: `1px solid ${isActive ? "#16a34a" : "var(--border)"}`,
                  background: isActive ? "#f0fdf4" : "transparent",
                  color: isActive ? "#166534" : "var(--text-secondary)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                {stage}
              </div>

              {index < journey.length - 1 && (
                <span style={{ color: "var(--text-secondary)", fontWeight: 700 }}>→</span>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "12px", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
        {journey.join(" → ")}
      </div>
    </div>
  );
}
