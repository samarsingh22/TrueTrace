import React from "react";
import { Navigate } from "react-router-dom";
import { getConnectedWallet, getSession, normalizeRole, roleToDashboardPath } from "../utils/authStorage";

export default function ProtectedRoute({ children, role }) {
  const session = getSession();
  const connectedWallet = getConnectedWallet();

  if (!connectedWallet) {
    return <Navigate to="/app" replace />;
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  if (role && normalizeRole(role) !== normalizeRole(session.role)) {
    return <Navigate to={roleToDashboardPath(session.role)} replace />;
  }

  return children;
}
