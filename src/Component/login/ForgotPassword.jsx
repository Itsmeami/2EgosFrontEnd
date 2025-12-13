// src/Component/login/ForgotPassword.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * ForgotPassword component (step 1)
 * - Enter registered email
 * - Calls POST /api/otp/send to send OTP to email
 * - On success it moves to OTP verification (keeps user on same page and shows OTP UI)
 *
 * This matches your existing Login/Signup styling (uses inline style objects similar to LoginPage.jsx).
 */

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    let t;
    if (resendCountdown > 0) {
      t = setTimeout(() => setResendCountdown((v) => v - 1), 1000);
    }
    return () => clearTimeout(t);
  }, [resendCountdown]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSend = async (e) => {
    e && e.preventDefault();
    setServerMsg("");
    if (!emailRegex.test(email)) {
      setServerMsg("Enter a valid email address.");
      toast.error("Enter a valid email address.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("http://localhost:5000/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      setSending(false);

      if (!res.ok) {
        const msg = data?.error || data?.message || `Failed to send OTP (${res.status})`;
        setServerMsg(msg);
        toast.error(msg);
        return;
      }

      setOtpSent(true);
      setResendCountdown(60);
      setServerMsg("OTP sent to your email. Check inbox (and spam).");
      toast.success("OTP sent to your email.");
    } catch (err) {
      console.error("send OTP error:", err);
      setSending(false);
      setServerMsg("Network error while sending OTP.");
      toast.error("Network error — try again.");
    }
  };

  const handleResend = async () => {
    if (resendCountdown > 0) return;
    setServerMsg("");
    setSending(true);
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
          <div style={title}>Forgot your password?</div>
          <div style={subtitle}>Enter the email you used to register. We'll send an OTP to reset your password.</div>

          {serverMsg && <div style={msgBox}>{serverMsg}</div>}

          {!otpSent && (
            <form onSubmit={handleSend} style={{ marginTop: 18 }}>
              <label style={label}>Registered E-Mail</label>
              <input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={input}
                placeholder="you@domain.com"
                required
              />

              <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                <button type="submit" disabled={sending} style={primaryBtn}>
                  {sending ? "Sending…" : "Continue"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  style={ghostBtn}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {otpSent && (
            <div style={{ marginTop: 16 }}>
              <p style={{ margin: 0 }}>OTP has been sent to <strong>{email}</strong></p>
              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <button onClick={() => navigate("/forgot/verify", { state: { email } })} style={primaryBtn}>
                  Enter OTP
                </button>

                <button onClick={handleResend} disabled={resendCountdown > 0} style={ghostBtn}>
                  {resendCountdown > 0 ? `Resend (${resendCountdown}s)` : "Resend OTP"}
                </button>

                <button onClick={() => navigate("/login")} style={ghostBtn}>
                  Back to Login
                </button>
              </div>
            </div>
          )}

          <div style={{ marginTop: 18, fontSize: 13 }}>
            Remembered password? <a onClick={() => navigate("/login")} style={{ color: "#2F80FF", cursor: "pointer", fontWeight: 700 }}>Login</a>
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

/* --- styles (keep same visual language as LoginPage.jsx) --- */
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

const title = { fontSize: 28, fontWeight: 800, marginBottom: 6 };
const subtitle = { color: "#6B6B6B", fontSize: 13, marginBottom: 8 };

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
