// src/Component/login/ForgotVerify.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * ForgotVerify (OTP entry) — route: /forgot/verify
 * Expects: location.state.email (string). If not present, user is redirected back to /forgot.
 * On success -> navigates to /forgot/reset with state: { email }
 */

export default function ForgotVerify() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location?.state?.email || "";
  const [otp, setOtp] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [serverMsg, setServerMsg] = useState("");

  useEffect(() => {
    if (!email) {
      // no email -> go back to enter email
      navigate("/forgot");
      return;
    }
  }, [email, navigate]);

  useEffect(() => {
    let t;
    if (resendCountdown > 0) {
      t = setTimeout(() => setResendCountdown((v) => v - 1), 1000);
    }
    return () => clearTimeout(t);
  }, [resendCountdown]);

  const handleVerify = async (e) => {
    e && e.preventDefault();
    setServerMsg("");
    if (!otp || otp.length < 4) {
      setServerMsg("Enter the OTP you received.");
      toast.error("Enter the OTP you received.");
      return;
    }

    setVerifying(true);
    try {
      const res = await fetch("http://localhost:5000/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), otp: otp.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      setVerifying(false);

      if (!res.ok) {
        const msg = data?.error || data?.message || `Failed to verify (${res.status})`;
        setServerMsg(msg);
        toast.error(msg);
        return;
      }

      toast.success("OTP verified — enter new password");
      // go to reset password screen, pass email
      navigate("/forgot/reset", { state: { email } });
    } catch (err) {
      console.error("verify error:", err);
      setVerifying(false);
      setServerMsg("Network error while verifying OTP.");
      toast.error("Network error — try again.");
    }
  };

  const handleResend = async () => {
    if (resendCountdown > 0) return;
    setSending(true);
    setServerMsg("");
    try {
      const res = await fetch("http://localhost:5000/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      setSending(false);

      if (!res.ok) {
        const msg = data?.error || data?.message || `Resend failed (${res.status})`;
        setServerMsg(msg);
        toast.error(msg);
        return;
      }

      setResendCountdown(60);
      setServerMsg("OTP resent to your email.");
      toast.success("OTP resent.");
    } catch (err) {
      console.error("resend error:", err);
      setSending(false);
      setServerMsg("Network error while resending OTP.");
      toast.error("Network error — try again.");
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <div style={leftCol}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Verify OTP</h2>
          <p style={{ marginTop: 6, color: "#6B6B6B" }}>
            Enter the OTP sent to <strong>{email}</strong>
          </p>

          {serverMsg && <div style={msgBox}>{serverMsg}</div>}

          <form onSubmit={handleVerify} style={{ marginTop: 14 }}>
            <label style={label}>OTP</label>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="Enter OTP"
              inputMode="numeric"
              style={input}
              required
            />

            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button type="submit" disabled={verifying} style={primaryBtn}>
                {verifying ? "Verifying…" : "Verify OTP"}
              </button>

              <button type="button" onClick={handleResend} disabled={resendCountdown > 0 || sending} style={ghostBtn}>
                {resendCountdown > 0 ? `Resend (${resendCountdown}s)` : (sending ? "Resending…" : "Resend OTP")}
              </button>

              <button type="button" onClick={() => navigate("/forgot")} style={ghostBtn}>
                Change Email
              </button>
            </div>
          </form>

          <div style={{ marginTop: 16 }}>
            <small style={{ color: "#666" }}>
              Didn't receive it? Check spam or click resend. <Link to="/login">Back to login</Link>
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

/* styles (matching your other pages) */
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
