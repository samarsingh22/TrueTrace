import React from "react";
import DashboardPage from "../features/dashboard/DashboardPage";
import { ROLES } from "../config/sentinelChain";

export default function RetailerDashboard() {
  return <DashboardPage initialRole={ROLES.RETAILER} lockRole />;
}
