import React from "react";
import DashboardPage from "../features/dashboard/DashboardPage";
import { ROLES } from "../config/sentinelChain";

export default function DistributorDashboard() {
  return <DashboardPage initialRole={ROLES.DISTRIBUTOR} lockRole />;
}
