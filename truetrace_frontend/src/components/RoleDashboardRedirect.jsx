import React from "react";
import { Navigate } from "react-router-dom";
import { getSession, roleToDashboardPath } from "../utils/authStorage";

export default function RoleDashboardRedirect() {
  const session = getSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={roleToDashboardPath(session.role)} replace />;
}
