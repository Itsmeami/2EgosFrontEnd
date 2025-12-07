




// src/Component/login/SignupPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HERO_IMAGE_URL = "/public/img/logsig.png";
const EYE_ICON = "/public/img/eye.png";

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "", middle_name: "", last_name: "",
    email: "", password: "", confirm_password: "", phone: "", role: "user"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const OUTER_MAX = 1000;
  const INPUT_W = 300;
  const IMG_W = 420;
  const IMG_H = 500;

  const labelStyle = {
    display: "block",
    fontSize: 12,
    color: "#333",
    marginBottom: 6
  };

  const inputStyle = {
    height: 40,
    background: "#EAF6FE",
    borderRadius: 6,
    border: "1px solid #E4E4E4",
    padding: "8px 10px",
    fontSize: 14,
    boxSizing: "border-box",
    width: "100%"
  };

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        first_name: form.first_name,
        middle_name: form.middle_name,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        role: form.role,
      };

      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data;
      try { data = await res.json(); } catch { data = { message: await res.text() }; }
      setLoading(false);

      if (!res.ok) {
        setError(data?.message || data?.error || `Server returned ${res.status}`);
        console.error("Signup failed:", res.status, data);
        return;
      }

      if (data?.token) localStorage.setItem("egos_token", data.token);
      else if (data?.accessToken) localStorage.setItem("egos_token", data.accessToken);

      if (data?.user) localStorage.setItem("egos_user", JSON.stringify(data.user));
      else if (data?.userData) localStorage.setItem("egos_user", JSON.stringify(data.userData));

      navigate("/");
    } catch (err) {
      console.error("Signup error (network):", err);
      setLoading(false);
      setError("Network error — check backend (see console).");
    }
  };

  const handleOAuthSignup = (provider) => {
    const oauthEmail = window.prompt(`Enter the ${provider} email to simulate OAuth sign-up:`);
    if (!oauthEmail) return alert(`${provider} signup cancelled.`);
    const namePart = oauthEmail.split("@")[0] || oauthEmail;
    const fakeUser = { first_name: namePart, email: oauthEmail, role: "user" };
    localStorage.setItem("egos_token", `oauth-${provider}-${Date.now()}`);
    localStorage.setItem("egos_user", JSON.stringify(fakeUser));
    navigate("/");
  };

  return (
    <div style={{
      background: "#ffffff",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      boxSizing: "border-box"
    }}>
      <div style={{ width: "100%", maxWidth: OUTER_MAX, display: "flex", justifyContent: "center", boxSizing: "border-box" }}>
        <div style={{ width: "100%", background: "#F7F7FA", borderRadius: 36, display: "flex", padding: 28, boxSizing: "border-box", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
          {/* LEFT */}
          <div style={{ flex: "0 1 46%", display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 280 }}>
            <div style={{ fontWeight: 700, fontSize: 30 }}>SIGNUP</div>
            <div style={{ marginTop: 6, fontSize: 12, color: "#6B6B6B" }}>Create your <span style={{ fontWeight: 800, color: "#000" }}>2EGOS</span> account!</div>

            {error && <div style={{ marginTop: 12, padding: 8, borderRadius: 6, background: "#FFEFEF", color: "#AA2222", fontSize: 13 }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
              {/* FIRST + MIDDLE NAME (labels above inputs) */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 120 }}>
                  <label style={labelStyle}>First name</label>
                  <input name="first_name" value={form.first_name} onChange={handleChange} required style={inputStyle} />
                </div>

                <div style={{ flex: 1, minWidth: 120 }}>
                  <label style={labelStyle}>Middle name <span style={{ color: "#9AA4B2" }}>(optional)</span></label>
                  <input name="middle_name" value={form.middle_name} onChange={handleChange} style={inputStyle} />
                </div>
              </div>

              {/* LAST NAME — label above, same style as first */}
              <div style={{ marginTop: 10 }}>
                <label style={labelStyle}>Last name</label>
                <div style={{ width: INPUT_W, maxWidth: "100%" }}>
                  <input name="last_name" value={form.last_name} onChange={handleChange} required style={inputStyle} />
                </div>
              </div>

              {/* EMAIL — label above, same style */}
              <div style={{ marginTop: 10 }}>
                <label style={labelStyle}>E-Mail</label>
                <div style={{ width: INPUT_W, maxWidth: "100%" }}>
                  <input name="email" value={form.email} onChange={handleChange} required style={inputStyle} />
                </div>
              </div>

              {/* CREATE PASSWORD (label above, eye) */}
              <div style={{ marginTop: 10 }}>
                <label style={labelStyle}>Create Password</label>
                <div style={{ position: "relative", width: INPUT_W, maxWidth: "100%" }}>
                  <input name="password" value={form.password} onChange={handleChange} required
                    type={showPassword ? "text" : "password"}
                    style={inputStyle} />
                  <button type="button" onClick={() => setShowPassword(s => !s)} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", border: "none", background: "transparent", cursor: "pointer" }}>
                    <img src={EYE_ICON} alt="eye" style={{ width: 18, height: 18 }} />
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD (label above, eye) */}
              <div style={{ marginTop: 10 }}>
                <label style={labelStyle}>Confirm Password</label>
                <div style={{ position: "relative", width: INPUT_W, maxWidth: "100%" }}>
                  <input name="confirm_password" value={form.confirm_password} onChange={handleChange} required
                    type={showConfirm ? "text" : "password"}
                    style={inputStyle} />
                  <button type="button" onClick={() => setShowConfirm(s => !s)} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", border: "none", background: "transparent", cursor: "pointer" }}>
                    <img src={EYE_ICON} alt="eye" style={{ width: 18, height: 18 }} />
                  </button>
                </div>
              </div>

              {/* PHONE NUMBER — label above, same style */}
              <div style={{ marginTop: 10 }}>
                <label style={labelStyle}>Phone number</label>
                <div style={{ width: INPUT_W, maxWidth: "100%" }}>
                  <input name="phone" value={form.phone} onChange={handleChange} required style={inputStyle} />
                </div>
              </div>

              <div style={{ marginTop: 14 }}>
                <button type="submit" disabled={loading}
                  style={{ width: 110, height: 36, background: "#111", color: "#fff", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 14 }}>
                  {loading ? "Signing up..." : "Signup"}
                </button>
              </div>
            </form>

            <p style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
              Already have an account? <Link to="/login" style={{ fontWeight: 700, color: "#2563EB", textDecoration: "underline" }}>Sign In</Link>
            </p>

            <div style={{ marginTop: 12, width: INPUT_W, maxWidth: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ flex: 1, height: 1, background: "#E0E0E0" }} />
                <div style={{ fontSize: 11, color: "#9AA4B2" }}>or signup with</div>
                <div style={{ flex: 1, height: 1, background: "#E0E0E0" }} />
              </div>

              <button onClick={() => handleOAuthSignup("Apple")} style={{ width: "100%", height: 42, background: "#000", color: "#fff", borderRadius: 8, border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer" }}>
                <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png" alt="apple" style={{ width: 16, height: 16 }} />
                Signup with Apple
              </button>

              <button onClick={() => handleOAuthSignup("Google")} style={{ width: "100%", height: 42, marginTop: 10, background: "#fff", color: "#111", borderRadius: 8, border: "1px solid #E4E4E4", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer" }}>
                <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="google" style={{ width: 16, height: 16 }} />
                Signup with Google
              </button>
            </div>
          </div>

          {/* RIGHT image */}
          <div style={{ flex: "0 1 46%", display: "flex", alignItems: "flex-start", justifyContent: "center", minWidth: 220 }}>
            <div style={{ width: IMG_W, height: IMG_H, borderRadius: 36, overflow: "hidden", background: "#E8ECF8", border: "4px solid #2F80FF", boxSizing: "border-box", maxWidth: "100%" }}>
              <img src={HERO_IMAGE_URL} alt="hero" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
