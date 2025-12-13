// src/Component/login/ForgotReset.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * ForgotReset.jsx
 * - Expects location.state.email (string). If missing, redirects to /forgot.
 * - Accepts newPassword and confirmPassword, validates, calls POST /api/auth/reset-password
 * - On success -> toast + navigate to /login
 */

export default function ForgotReset() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location?.state?.email || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [fieldError, setFieldError] = useState("");
  const [serverMsg, setServerMsg] = useState("");

  useEffect(() => {
    if (!email) {
      // no email -> go back to enter email
      navigate("/forgot");
    }
  }, [email, navigate]);

  const validate = () => {
    setFieldError("");
    if (!newPassword || newPassword.length < 6) {
      setFieldError("Password must be at least 6 characters.");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setFieldError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleReset = async (e) => {
    e && e.preventDefault();
    setServerMsg("");
    if (!validate()) {
      toast.error(fieldError || "Validation failed");
      return;
    }

    setVerifying(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), newPassword }),
      });

      const data = await res.json().catch(() => ({}));
      setVerifying(false);

      if (!res.ok) {
        const msg = data?.error || data?.message || `Reset failed (${res.status})`;
        setServerMsg(msg);
        toast.error(msg);
        return;
      }

      toast.success("Password reset successful. Please log in.");
      // redirect to login
      navigate("/login");
    } catch (err) {
      console.error("reset error:", err);
      setVerifying(false);
      setServerMsg("Network error while resetting password.");
      toast.error("Network error — try again.");
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <div style={leftCol}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Create a new password</h2>
          <p style={{ marginTop: 6, color: "#6B6B6B" }}>
            Resetting password for <strong>{email}</strong>
          </p>

          {serverMsg && <div style={msgBox}>{serverMsg}</div>}
          {fieldError && <div style={{ ...msgBox, background: "#FFF4F4", color: "#b22222" }}>{fieldError}</div>}

          <form onSubmit={handleReset} style={{ marginTop: 14 }}>
            <label style={label}>New password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={input}
              placeholder="At least 6 characters"
              required
            />

            <label style={{ ...label, marginTop: 12 }}>Confirm new password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={input}
              placeholder="Re-enter new password"
              required
            />

            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button type="submit" disabled={verifying} style={primaryBtn}>
                {verifying ? "Updating…" : "Set new password"}
              </button>

              <button type="button" onClick={() => navigate("/login")} style={ghostBtn}>
                Cancel
              </button>
            </div>
          </form>

          <div style={{ marginTop: 16 }}>
            <small style={{ color: "#666" }}>
              After resetting, use your new password to login. <Link to="/login">Back to login</Link>
            </small>
          </div>
        </div>

        <div style={rightCol}>
          <div style={heroWrap}>
            <img src="/public/img/logsig.png" alt="hero" style={heroImg} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* styles (consistent with other auth pages) */
const page = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#fff",
  padding: 20,
};

const card = {
  width: "100%",
  maxWidth: 900,
  display: "flex",
  gap: 28,
  background: "#F7F7FA",
  borderRadius: 20,
  padding: 20,
  boxSizing: "border-box",
  alignItems: "center",
};

const leftCol = { flex: "0 0 46%", minWidth: 300 };
const rightCol = { flex: "0 0 46%", display: "flex", justifyContent: "center" };

const input = {
  width: "100%",
  height: 42,
  background: "#EAF6FE",
  borderRadius: 8,
  border: "1px solid #E4E4E4",
  padding: "8px 12px",
  marginTop: 6,
  fontSize: 14,
};

const label = { fontSize: 12, color: "#333" };
const msgBox = { marginTop: 12, background: "#FFFAF0", color: "#333", padding: 8, borderRadius: 6 };

const primaryBtn = {
  background: "#111",
  color: "#fff",
  border: "none",
  padding: "9px 14px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: 700,
  height: 40,
};

const ghostBtn = {
  background: "#fff",
  border: "1px solid #E4E4E4",
  padding: "9px 12px",
  borderRadius: 8,
  cursor: "pointer",
};

const heroWrap = {
  width: 320,
  height: 420,
  borderRadius: 16,
  overflow: "hidden",
  background: "#E8ECF8",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const heroImg = { width: "100%", height: "100%", objectFit: "cover" };
