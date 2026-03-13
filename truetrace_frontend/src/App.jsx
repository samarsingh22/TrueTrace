import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import WalletConnectPage from "./pages/WalletConnectPage";
import AuthPage from "./pages/AuthPage";
import ConsumerDashboard from "./dashboards/ConsumerDashboard";
import ManufacturerDashboard from "./dashboards/ManufacturerDashboard";
import DistributorDashboard from "./dashboards/DistributorDashboard";
import RetailerDashboard from "./dashboards/RetailerDashboard";
import RegulatorDashboard from "./dashboards/RegulatorDashboard";
import AnalyticsDashboard from "./analytics/AnalyticsDashboard";
import Docs from "./Docs";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleDashboardRedirect from "./components/RoleDashboardRedirect";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<WalletConnectPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<RoleDashboardRedirect />} />

        <Route
          path="/dashboard/manufacturer"
          element={
            <ProtectedRoute role="Manufacturer">
              <ManufacturerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/distributor"
          element={
            <ProtectedRoute role="Distributor">
              <DistributorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/retailer"
          element={
            <ProtectedRoute role="Retailer">
              <RetailerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/consumer"
          element={
            <ProtectedRoute role="Consumer">
              <ConsumerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/regulator"
          element={
            <ProtectedRoute role="Regulator">
              <RegulatorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <AnalyticsDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/docs"
          element={
            <ProtectedRoute>
              <Docs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;