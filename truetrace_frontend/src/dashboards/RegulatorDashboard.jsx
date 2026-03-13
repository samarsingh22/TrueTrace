import React from "react";
import DashboardPage from "../features/dashboard/DashboardPage";
import { ROLES } from "../config/sentinelChain";

export default function RegulatorDashboard() {
  return <DashboardPage initialRole={ROLES.REGULATOR} lockRole />;
}
