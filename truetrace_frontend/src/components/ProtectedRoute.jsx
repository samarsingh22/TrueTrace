import React from "react";
import { Navigate } from "react-router-dom";
import { getSession, normalizeRole, roleToDashboardPath } from "../utils/authStorage";

export default function ProtectedRoute({ children, role }) {
  const session = getSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (role && normalizeRole(role) !== normalizeRole(session.role)) {
    return <Navigate to={roleToDashboardPath(session.role)} replace />;
  }

  return children;
}
