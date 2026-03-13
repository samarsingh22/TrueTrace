import React from "react";
import DashboardPage from "../features/dashboard/DashboardPage";
import { ROLES } from "../config/sentinelChain";

export default function ManufacturerDashboard() {
  return <DashboardPage initialRole={ROLES.MANUFACTURER} lockRole />;
}
