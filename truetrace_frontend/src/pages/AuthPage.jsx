import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { APP_NAME, ROLE_OPTIONS } from "../config/sentinelChain";
import {
  createAccount,
  getConnectedWallet,
  getSession,
  loginAccount,
  roleToDashboardPath,
} from "../utils/authStorage";

const EMPTY_FORM = {
  name: "",
  role: ROLE_OPTIONS[0],
  organization: "",
  manufacturerCategory: "",
  password: "",
};

const MANUFACTURER_CATEGORIES = [
  "Pharmaceuticals",
  "Electronics",
  "Luxury goods",
  "Automobile spare parts",
  "Cosmetics",
  "FMCG products",
  "Agricultural inputs",
  "Any supply chain vulnerable to counterfeit goods",
];

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(EMPTY_FORM);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const wallet = getConnectedWallet();

  useEffect(() => {
    const session = getSession();
    if (session) {
      navigate(roleToDashboardPath(session.role), { replace: true });
      return;
    }

    if (!wallet) {
      navigate("/app", { replace: true });
    }
  }, [navigate, wallet]);

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!form.name.trim() || !form.organization.trim() || !form.password.trim()) {
      setErrorMsg("Please fill all account fields.");
      setSuccessMsg("");
      return false;
    }

    if (form.role === "Manufacturer" && !form.manufacturerCategory.trim()) {
      setErrorMsg("Please select your manufacturer category.");
      setSuccessMsg("");
      return false;
    }

    return true;
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      if (mode === "register") {
        createAccount({
          ...form,
          walletAddress: wallet,
        });
        setSuccessMsg("Account created. You can now login.");
        setErrorMsg("");
        setMode("login");
        return;
      }

      const session = loginAccount({
        ...form,
        walletAddress: wallet,
      });

      setSuccessMsg("Login successful. Redirecting to dashboard.");
      setErrorMsg("");
      setTimeout(() => {
        navigate(roleToDashboardPath(session.role), { replace: true });
      }, 350);
    } catch (error) {
      setErrorMsg(error.message || "Authentication failed.");
      setSuccessMsg("");
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-logo" style={{ textDecoration: "none" }}>
          {APP_NAME}
        </Link>
      </nav>

      <div className="dashboard-page">
        {(errorMsg || successMsg) && (
          <div className="alert-container" style={{ marginBottom: "16px" }}>
            {errorMsg && (
              <div className="alert-box alert-error">
                <AlertTriangle size={18} />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="alert-box alert-success">
                <CheckCircle size={18} />
                <span>{successMsg}</span>
              </div>
            )}
          </div>
        )}

        <div className="dashboard-header">
          <h1>Login / Register</h1>
          <p>Connected wallet: {wallet ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}` : "Not connected"}</p>
        </div>

        <div className="action-grid">
          <form className="action-card" style={{ maxWidth: "560px" }} onSubmit={onSubmit}>
            <div className="card-top">
              <h3>{mode === "register" ? "Create Account" : "Login"}</h3>
            </div>

            <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
              <button type="button" className="btn-secondary" onClick={() => setMode("login")} style={{ opacity: mode === "login" ? 1 : 0.6 }}>
                Login
              </button>
              <button type="button" className="btn-secondary" onClick={() => setMode("register")} style={{ opacity: mode === "register" ? 1 : 0.6 }}>
                Create Account
              </button>
            </div>

            <div className="form-group">
              <input placeholder="Name" value={form.name} onChange={(e) => setField("name", e.target.value)} />
              <select value={form.role} onChange={(e) => setField("role", e.target.value)}>
                {ROLE_OPTIONS.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>

              {form.role === "Manufacturer" && (
                <select value={form.manufacturerCategory} onChange={(e) => setField("manufacturerCategory", e.target.value)}>
                  <option value="">Select Manufacturer Category</option>
                  {MANUFACTURER_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              )}

              <input placeholder="Organization" value={form.organization} onChange={(e) => setField("organization", e.target.value)} />
              <input type="password" placeholder="Password" value={form.password} onChange={(e) => setField("password", e.target.value)} />
            </div>

            <div className="card-footer">
              <button className="card-btn" type="submit">
                {mode === "register" ? "Create Account" : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
