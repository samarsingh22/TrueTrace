import React from "react";
import DashboardPage from "../features/dashboard/DashboardPage";
import { ROLES } from "../config/sentinelChain";

export default function ConsumerDashboard() {
	return <DashboardPage initialRole={ROLES.CONSUMER} lockRole />;
}
