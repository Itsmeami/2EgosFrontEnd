// src/pages/AuthSuccess.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * AuthSuccess page
 * - Handles two ways the OAuth backend can deliver the login result:
 *   1) popup flow: backend sends `window.opener.postMessage({ type: 'oauth-google', payload }, frontendOrigin)`
 *   2) redirect fallback: backend redirects to /auth/success?token=...&returnTo=...
 *
 * Behavior:
 *  - Listen for postMessage from popup (only accept from backend origin in prod)
 *  - If token (or user) found: save to localStorage and navigate to returnTo (or '/')
 */
export default function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Helper to store payload and redirect
    function handlePayload(payload, returnTo) {
      try {
        if (!payload) return;
        const token = payload.token || payload.accessToken || null;
        const user = payload.user || payload.userData || null;

        if (token) {
          localStorage.setItem("egos_token", token);
          toast.success("Signed in successfully");
        }
        if (user) {
          localStorage.setItem("egos_user", JSON.stringify(user));
        }

        // small delay so toast renders
        setTimeout(() => {
          navigate(returnTo || "/");
        }, 600);
      } catch (e) {
        console.error("AuthSuccess handlePayload error:", e);
        navigate("/");
      }
    }

    // 1) Listen for postMessage (popup flow)
    function onMessage(e) {
      try {
        // In production, restrict by checking e.origin === "https://your-backend.example.com"
        // For local development accept messages from localhost:5000 only
        // (If your backend runs on a different origin, add it here)
        const allowedOrigins = ["http://localhost:5000"];
        if (!allowedOrigins.includes(e.origin)) {
          // ignore other origins (keeps dev secure-ish)
          console.warn("Ignored message from origin:", e.origin);
          return;
        }

        const data = e.data;
        // expected shape: { type: "oauth-google", payload: { token, user } }
        if (data && (data.type === "oauth-google" || data.payload)) {
          const payload = data.payload || data;
          const returnTo = (payload && payload.returnTo) || "/";
          handlePayload(payload, returnTo);
        }
      } catch (err) {
        console.error("AuthSuccess onMessage error:", err);
      }
    }

    window.addEventListener("message", onMessage);

    // 2) Fallback: if query params contain token (redirect flow)
    const qs = new URLSearchParams(window.location.search);
    const token = qs.get("token");
    if (token) {
      // There might also be returnTo param and optionally user as base64 JSON
      const returnTo = qs.get("returnTo") || "/";
      // store token
      localStorage.setItem("egos_token", token);

      // optional: parse user param if backend added it (avoid long query strings in prod)
      const userParam = qs.get("user");
      if (userParam) {
        try {
          const user = JSON.parse(decodeURIComponent(userParam));
          localStorage.setItem("egos_user", JSON.stringify(user));
        } catch (e) {
          // ignore
        }
      }

      toast.success("Signed in successfully (redirect)");
      // cleanup listener then navigate
      setTimeout(() => navigate(returnTo), 600);
    }

    // cleanup
    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, [navigate]);

  return (
    <div style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      boxSizing: "border-box"
    }}>
      <div style={{
        background: "#fff",
        padding: 24,
        borderRadius: 12,
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        textAlign: "center",
        maxWidth: 520,
        width: "100%"
      }}>
        <h2 style={{ margin: 0, fontSize: 20 }}>Signing you in…</h2>
        <p style={{ marginTop: 8, color: "#6b7280" }}>
          Finishing authentication. If nothing happens, close this window and try again.
        </p>
      </div>
    </div>
  );
}
