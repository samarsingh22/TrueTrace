import { Link, useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { BarChart3, TrendingUp, Globe, ShieldCheck, AlertTriangle, Package, Users, Activity } from "lucide-react";
import { clearConnectedWallet, clearSession, getSession } from "../../utils/authStorage";
import Heatmap from "../../analytics/Heatmap";
import SupplyTimeline from "../../analytics/SupplyTimeline";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const session = getSession();

  const handleLogout = () => {
    clearSession();
    clearConnectedWallet();
    navigate("/app", { replace: true });
  };

  const kpis = [
    { icon: <Package size={22} />, label: "Batches Registered", value: "12,847", change: "+18%", up: true },
    { icon: <Users size={22} />, label: "Active Supply Chains", value: "342", change: "+7%", up: true },
    { icon: <ShieldCheck size={22} />, label: "Verified Scans", value: "89,120", change: "+24%", up: true },
    { icon: <AlertTriangle size={22} />, label: "Counterfeits Flagged", value: "1,203", change: "-12%", up: false },
  ];

  const industries = [
    { name: "Pharmaceuticals", batches: 4_521, risk: "High", color: "#ef4444" },
    { name: "Electronics", batches: 3_102, risk: "Medium", color: "#f59e0b" },
    { name: "Luxury Goods", batches: 2_340, risk: "High", color: "#ef4444" },
    { name: "Auto Parts", batches: 1_572, risk: "Medium", color: "#f59e0b" },
    { name: "Cosmetics", batches: 812, risk: "Low", color: "#22c55e" },
    { name: "FMCG", batches: 500, risk: "Low", color: "#22c55e" },
  ];

  const timeline = [
    { month: "Jan", scans: 4200, flags: 89 },
    { month: "Feb", scans: 5100, flags: 102 },
    { month: "Mar", scans: 6800, flags: 78 },
    { month: "Apr", scans: 7400, flags: 134 },
    { month: "May", scans: 9200, flags: 95 },
    { month: "Jun", scans: 11000, flags: 112 },
  ];
  const maxScans = Math.max(...timeline.map((t) => t.scans));

  const trustDistribution = [
    { range: "90-100", pct: 62, color: "#22c55e" },
    { range: "70-89", pct: 21, color: "#a3e635" },
    { range: "50-69", pct: 10, color: "#f59e0b" },
    { range: "30-49", pct: 5, color: "#f97316" },
    { range: "0-29", pct: 2, color: "#ef4444" },
  ];

  const suspiciousLocations = [
    { id: "mumbai", city: "Mumbai", coords: [19.076, 72.8777], suspiciousScans: 28 },
    { id: "delhi", city: "Delhi", coords: [28.6139, 77.209], suspiciousScans: 21 },
    { id: "bengaluru", city: "Bengaluru", coords: [12.9716, 77.5946], suspiciousScans: 15 },
    { id: "kolkata", city: "Kolkata", coords: [22.5726, 88.3639], suspiciousScans: 10 },
  ];

  const productJourney = ["Manufacturer", "Distributor", "Retailer", "Consumer"];

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-logo" style={{ textDecoration: "none" }}>
          True Trace
        </Link>
        <div className="nav-links">
          <Link to="/dashboard" style={{ textDecoration: "none", color: "var(--text-secondary)" }}>
            Dashboard
          </Link>
          <Link to="/analytics" style={{ textDecoration: "none", color: "var(--text)", fontWeight: 600 }}>
            Analytics
          </Link>
          <Link to="/docs" style={{ textDecoration: "none", color: "var(--text-secondary)" }}>
            Docs
          </Link>
        </div>
        <div className="nav-right">
          {session ? (
            <button className="btn-secondary" style={{ fontSize: "0.85rem" }} onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/dashboard" className="btn-primary" style={{ textDecoration: "none", fontSize: "0.85rem" }}>
              Open Dashboard
            </Link>
          )}
        </div>
      </nav>

      <div className="analytics-page">
        <div className="analytics-header">
          <Motion.h1 {...fadeUp}>Platform Analytics</Motion.h1>
          <Motion.p {...fadeUp} transition={{ delay: 0.1 }}>
            Real-time insights across the True Trace anti-counterfeit network. Data refreshes every block confirmation.
          </Motion.p>
        </div>

        <div className="kpi-grid">
          {kpis.map((kpi, i) => (
            <Motion.div className="kpi-card" key={i} {...fadeUp} transition={{ delay: i * 0.08 }}>
              <div className="kpi-icon">{kpi.icon}</div>
              <div className="kpi-label">{kpi.label}</div>
              <div className="kpi-value">{kpi.value}</div>
              <div className={`kpi-change ${kpi.up ? "up" : "down"}`}>
                <TrendingUp size={14} style={{ transform: kpi.up ? "" : "rotate(180deg)" }} /> {kpi.change} this month
              </div>
            </Motion.div>
          ))}
        </div>

        <Motion.div className="analytics-card" {...fadeUp}>
          <h3>
            <Activity size={18} /> Scan Activity - Last 6 Months
          </h3>
          <div className="bar-chart">
            {timeline.map((t, i) => (
              <div className="bar-col" key={i}>
                <div className="bar-wrapper">
                  <Motion.div className="bar" initial={{ height: 0 }} whileInView={{ height: `${(t.scans / maxScans) * 100}%` }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }} />
                  <Motion.div
                    className="bar flag"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(t.flags / maxScans) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.2, duration: 0.4 }}
                  />
                </div>
                <span className="bar-label">{t.month}</span>
              </div>
            ))}
          </div>
          <div className="chart-legend">
            <span>
              <span className="legend-dot scans" /> Verified Scans
            </span>
            <span>
              <span className="legend-dot flags" /> Flagged Anomalies
            </span>
          </div>
        </Motion.div>

        <div className="analytics-two-col">
          <Motion.div className="analytics-card" {...fadeUp}>
            <h3>
              <Globe size={18} /> Industry Breakdown
            </h3>
            <div className="industry-list">
              {industries.map((ind, i) => (
                <div className="industry-row" key={i}>
                  <span className="ind-name">{ind.name}</span>
                  <div className="ind-bar-track">
                    <Motion.div
                      className="ind-bar-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(ind.batches / industries[0].batches) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                    />
                  </div>
                  <span className="ind-count">{ind.batches.toLocaleString()}</span>
                  <span className="ind-risk" style={{ color: ind.color }}>
                    {ind.risk}
                  </span>
                </div>
              ))}
            </div>
          </Motion.div>

          <Motion.div className="analytics-card" {...fadeUp} transition={{ delay: 0.1 }}>
            <h3>
              <ShieldCheck size={18} /> Trust Score Distribution
            </h3>
            <div className="trust-dist">
              {trustDistribution.map((t, i) => (
                <div className="trust-row" key={i}>
                  <span className="trust-range">{t.range}</span>
                  <div className="trust-bar-track">
                    <Motion.div
                      className="trust-bar-fill"
                      style={{ background: t.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${t.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    />
                  </div>
                  <span className="trust-pct">{t.pct}%</span>
                </div>
              ))}
            </div>
            <p className="trust-note">Trust Score = 100 - (Suspicious Scans x 10). Higher scores indicate authenticated, clean supply chain movement.</p>
          </Motion.div>
        </div>

        <Motion.div className="analytics-card anomaly-info" {...fadeUp}>
          <h3>
            <AlertTriangle size={18} /> AI Anomaly Detection Engine
          </h3>
          <div className="anomaly-grid">
            <div className="anomaly-item">
              <strong>Geo-Mismatch Detection</strong>
              <p>Flags products scanned in geographically impossible locations within short time windows.</p>
            </div>
            <div className="anomaly-item">
              <strong>Velocity Analysis</strong>
              <p>Detects rapid sequential scans that exceed realistic human interaction patterns.</p>
            </div>
            <div className="anomaly-item">
              <strong>Duplicate Scan Alerts</strong>
              <p>Identifies when a single batch ID is scanned at multiple retail locations simultaneously.</p>
            </div>
            <div className="anomaly-item">
              <strong>Chain-of-Custody Gaps</strong>
              <p>Monitors for breaks in the expected Manufacturer - Distributor - Retailer flow.</p>
            </div>
          </div>
        </Motion.div>

        <div className="analytics-two-col">
          <Motion.div className="analytics-card" {...fadeUp}>
            <h3>
              <Globe size={18} /> Suspicious Scan Heatmap
            </h3>
            <Heatmap points={suspiciousLocations} />
          </Motion.div>

          <Motion.div className="analytics-card" {...fadeUp} transition={{ delay: 0.1 }}>
            <h3>
              <Activity size={18} /> Supply Journey Timeline
            </h3>
            <SupplyTimeline journey={productJourney} activeStage={2} />
          </Motion.div>
        </div>
      </div>
    </>
  );
}
