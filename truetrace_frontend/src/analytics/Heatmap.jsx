import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

function getHeatColor(value, maxValue) {
  const ratio = maxValue > 0 ? value / maxValue : 0;
  if (ratio >= 0.75) return "#dc2626";
  if (ratio >= 0.5) return "#f97316";
  if (ratio >= 0.25) return "#f59e0b";
  return "#84cc16";
}

export default function Heatmap({
  points = [],
  center = [22.9734, 78.6569],
  zoom = 5,
  height = 360,
}) {
  const maxSuspiciousScans = Math.max(...points.map((point) => point.suspiciousScans || 0), 1);

  return (
    <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border)" }}>
      <MapContainer center={center} zoom={zoom} style={{ height: `${height}px`, width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {points.map((point) => {
          const suspiciousScans = point.suspiciousScans || 0;
          return (
            <CircleMarker
              key={point.id}
              center={point.coords}
              radius={8 + suspiciousScans * 0.4}
              pathOptions={{
                color: getHeatColor(suspiciousScans, maxSuspiciousScans),
                fillColor: getHeatColor(suspiciousScans, maxSuspiciousScans),
                fillOpacity: 0.5,
                weight: 2,
              }}
            >
              <Popup>
                <div>
                  <strong>{point.city}</strong>
                  <div>Suspicious scans: {suspiciousScans}</div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
