



// // // src/Component/login/LoginPage.jsx
// // import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";

// // const HERO_IMAGE_URL = "/public/img/logsig.png"; // update if needed
// // const EYE_ICON = "/public/img/eye.png";

// // export default function LoginPage() {
// //   const navigate = useNavigate();
// //   const [form, setForm] = useState({ email: "", password: "" });
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);

// //   const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);

// //     try {
// //       const res = await fetch("http://localhost:5000/api/auth/login", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(form),
// //       });

// //       let data;
// //       try { data = await res.json(); } catch { data = { message: await res.text() }; }
// //       setLoading(false);

// //       if (!res.ok) {
// //         const msg = data?.message || data?.error || `Server returned ${res.status}`;
// //         setError(msg);
// //         console.error("Login failed:", res.status, data);
// //         return;
// //       }

// //       if (data.token) localStorage.setItem("egos_token", data.token);
// //       else if (data.accessToken) localStorage.setItem("egos_token", data.accessToken);

// //       if (data.user) localStorage.setItem("egos_user", JSON.stringify(data.user));
// //       else if (data.userData) localStorage.setItem("egos_user", JSON.stringify(data.userData));

// //       navigate("/");
// //     } catch (err) {
// //       console.error("Login error (network):", err);
// //       setLoading(false);
// //       setError("Network error — check backend (see console).");
// //     }
// //   };

// //   const handleOAuthLogin = (provider) => {
// //     const email = window.prompt(`Enter ${provider} email to simulate OAuth:`);
// //     if (!email) return;
// //     localStorage.setItem("egos_token", `oauth-${provider}-${Date.now()}`);
// //     localStorage.setItem("egos_user", JSON.stringify({ first_name: email.split("@")[0], email }));
// //     navigate("/");
// //   };

// //   // adjusted sizes
// //   const OUTER_MAX = 1000;   // smaller outer width
// //   const INPUT_W = 300;      // reduced input width
// //   const IMG_W = 420;
// //   const IMG_H = 500;

// //   return (
// //     <div style={{
// //       background: "#ffffff",
// //       minHeight: "100vh",
// //       display: "flex",
// //       alignItems: "center",
// //       justifyContent: "center",
// //       padding: 20,
// //       boxSizing: "border-box"
// //     }}>
// //       <div style={{ width: "100%", maxWidth: OUTER_MAX, display: "flex", justifyContent: "center", boxSizing: "border-box" }}>
// //         <div style={{
// //           width: "100%",
// //           background: "#F7F7FA",
// //           borderRadius: 36,
// //           display: "flex",
// //           padding: 28,
// //           boxSizing: "border-box",
// //           gap: 20,
// //           alignItems: "stretch",
// //           flexWrap: "wrap",
// //           justifyContent: "center"
// //         }}>
// //           {/* LEFT: form */}
// //           <div style={{ flex: "0 1 46%", display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 280 }}>
// //             <div style={{ fontWeight: 700, fontSize: 40, lineHeight: 1 }}>
// //               Welcome<br />Back
// //             </div>
// //             <div style={{ marginTop: 6, fontSize: 12, color: "#6B6B6B" }}>
// //               Login to your <span style={{ fontWeight: 800, color: "#000" }}>2EGOS</span> account!
// //             </div>

// //             {error && <div style={{ marginTop: 12, padding: 8, borderRadius: 6, background: "#FFEFEF", color: "#AA2222", fontSize: 13 }}>{error}</div>}

// //             <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
// //               <label style={{ display: "block", fontSize: 12, color: "#333", marginBottom: 8 }}>E-Mail</label>
// //               <input
// //                 name="email"
// //                 value={form.email}
// //                 onChange={handleChange}
// //                 type="email"
// //                 required
// //                 style={{
// //                   width: INPUT_W,
// //                   maxWidth: "100%",
// //                   height: 46,
// //                   background: "#EAF6FE",
// //                   borderRadius: 6,
// //                   border: "1px solid #E4E4E4",
// //                   padding: "10px 12px",
// //                   fontSize: 14,
// //                   boxSizing: "border-box",
// //                 }}
// //               />

// //               <div style={{ marginTop: 12 }}>
// //                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
// //                   <label style={{ fontSize: 12, color: "#333" }}>Password</label>
// //                   <button type="button"
// //                     onClick={() => alert("Forgot password flow")}
// //                     style={{ fontSize: 12, color: "#2563EB", background: "transparent", border: "none", cursor: "pointer", textDecoration: "underline" }}>
// //                     Forgot your password?
// //                   </button>
// //                 </div>

// //                 <div style={{ position: "relative", width: INPUT_W, maxWidth: "100%" }}>
// //                   <input
// //                     name="password"
// //                     value={form.password}
// //                     onChange={handleChange}
// //                     type={showPassword ? "text" : "password"}
// //                     required
// //                     style={{
// //                       width: "100%",
// //                       height: 46,
// //                       background: "#EAF6FE",
// //                       borderRadius: 6,
// //                       border: "1px solid #E4E4E4",
// //                       padding: "10px 40px 10px 12px",
// //                       fontSize: 14,
// //                       boxSizing: "border-box",
// //                     }}
// //                   />
// //                   <button type="button" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? "Hide password" : "Show password"}
// //                     style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", border: "none", background: "transparent", padding: 4, cursor: "pointer" }}>
// //                     <img src={EYE_ICON} alt="eye" style={{ width: 20, height: 20, display: "block" }} />
// //                   </button>
// //                 </div>
// //               </div>

// //               <div style={{ marginTop: 16 }}>
// //                 <button type="submit" disabled={loading}
// //                   style={{ width: 110, height: 36, background: "#111111", color: "#fff", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 14 }}>
// //                   {loading ? "Logging in..." : "Login"}
// //                 </button>
// //               </div>
// //             </form>

// //             <div style={{ marginTop: 12, fontSize: 12, color: "#666" }}>
// //               Don’t have an account? <Link to="/signup" style={{ fontWeight: 700, color: "#2563EB", textDecoration: "underline" }}>Signup</Link>
// //             </div>

// //             {/* Social login (match input width) */}
// //             <div style={{ marginTop: 16, width: INPUT_W, maxWidth: "100%" }}>
// //               <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
// //                 <div style={{ flex: 1, height: 1, background: "#E0E0E0" }} />
// //                 <div style={{ fontSize: 11, color: "#9AA4B2" }}>or login with</div>
// //                 <div style={{ flex: 1, height: 1, background: "#E0E0E0" }} />
// //               </div>

// //               <button onClick={() => handleOAuthLogin("Apple")}
// //                 style={{ width: "100%", height: 42, background: "#000", color: "#fff", borderRadius: 8, border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer" }}>
// //                 <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png" alt="apple" style={{ width: 16, height: 16 }} />
// //                 Login with Apple
// //               </button>

// //               <button onClick={() => handleOAuthLogin("Google")}
// //                 style={{ width: "100%", height: 42, marginTop: 10, background: "#fff", color: "#111", borderRadius: 8, border: "1px solid #E4E4E4", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer" }}>
// //                 <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="google" style={{ width: 16, height: 16 }} />
// //                 Login with Google
// //               </button>
// //             </div>
// //           </div>

// //           {/* RIGHT: image (reduced) */}
// //           <div style={{ flex: "0 1 46%", display: "flex", alignItems: "center", justifyContent: "center", minWidth: 220 }}>
// //             <div style={{
// //               width: IMG_W,
// //               height: IMG_H,
// //               borderRadius: 36,
// //               overflow: "hidden",
// //               background: "#E8ECF8",
// //               border: "4px solid #2F80FF",
// //               boxSizing: "border-box",
// //               maxWidth: "100%"
// //             }}>
// //               <img src={HERO_IMAGE_URL} alt="hero" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
// //             </div>
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HERO_IMAGE_URL = "/public/img/logsig.png"; // change if needed
const EYE_ICON = "/public/img/eye.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // keep your existing login workflow here
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setError(data?.error || data?.message || `Server: ${res.status}`);
        return;
      }
      if (data?.token) localStorage.setItem("egos_token", data.token);
      if (data?.user) localStorage.setItem("egos_user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Network error — check console");
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        {/* Left column - content */}
        <div style={leftCol}>
          <div style={title}>Welcome<br /><span style={titleAccent}>Back</span></div>
          <div style={subtitle}>Login to your <strong style={{fontWeight:800,color:"#000"}}>2EGOS</strong> account!</div>

          {error && <div style={errBox}>{error}</div>}

          <form onSubmit={onSubmit} style={{ marginTop: 18 }}>
            <label style={label}>E-Mail</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              style={input}
              placeholder="you@domain.com"
              required
            />

            <div style={{ marginTop: 12, position: "relative" }}>
              <label style={label}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  style={input}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  aria-label="toggle password"
                  style={eyeBtn}
                >
                  <img src={EYE_ICON} alt="eye" style={{ width: 18, height: 18 }} />
                </button>
                <div style={forgot}><Link to="/forgot" style={{ color: "#2F80FF", textDecoration: "none" }}>Forgot your password?</Link></div>
              </div>
            </div>

            <button type="submit" disabled={loading} style={loginBtn}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div style={{ marginTop: 12, fontSize: 13, color: "#666" }}>
            Don't have an account? <Link to="/signup" style={{ color: "#2F80FF", fontWeight: 700 }}>Signup</Link>
          </div>

          <div style={{ marginTop: 18 }}>
            <div style={dividerRow}>
              <div style={line} />
              <div style={{ fontSize: 12, color: "#9AA4B2" }}>or login with</div>
              <div style={line} />
            </div>

            <button style={appleBtn} onClick={() => alert("Apple login flow — plug your logic")}>
              <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png" alt="apple" style={{ width: 16, marginRight: 8 }} /> Continue with Apple
            </button>

            <button style={googleBtn} onClick={() => alert("Google login flow — plug your logic")}>
              <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="google" style={{ width: 16, marginRight: 8 }} /> Continue with Google
            </button>
          </div>
        </div>

        {/* Right column - image */}
        <div style={rightCol}>
          <div style={heroWrap}>
            <img src={HERO_IMAGE_URL} alt="hero" style={heroImg}/>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Styles (JS objects) ---------- */
const page = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#fff",
  padding: 20,
  boxSizing: "border-box"
};

const card = {
  width: "100%",
  maxWidth: 1100,
  display: "flex",
  gap: 28,
  background: "#F7F7FA",
  borderRadius: 28,
  padding: 28,
  boxSizing: "border-box",
  alignItems: "center"
};

const leftCol = { flex: "0 0 46%", minWidth: 320 };
const rightCol = { flex: "0 0 46%", display: "flex", justifyContent: "center" };

const title = { fontSize: 44, fontWeight: 800, lineHeight: 1, marginBottom: 6 };
const titleAccent = { display:"block" };
const subtitle = { color: "#6B6B6B", fontSize: 13 };

const input = {
  width: "100%",
  height: 44,
  background: "#EAF6FE",
  borderRadius: 8,
  border: "1px solid #E4E4E4",
  padding: "8px 12px",
  boxSizing: "border-box",
  marginTop: 6,
  fontSize: 14
};

const label = { fontSize: 12, color: "#333" };



const forgot = { position: "absolute", right: 0, top: -20, fontSize: 12, color: "#9AA4B2" };
const eyeBtn = {
  position: "absolute",
  right: 10,
  top: "60%",
  transform: "translateY(-50%)",
  width: 20,
  height: 20,
  cursor: "pointer",
  opacity: 1.0,
  
};

const loginBtn = {
  marginTop: 18,
  width: 120,
  height: 40,
  background: "#111",
  color: "#fff",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  fontWeight: 700
};

const dividerRow = { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 };
const line = { flex: 1, height: 1, background: "#E0E0E0" };

const appleBtn = {
  width: "100%",
  height: 44,
  background: "#000",
  color: "#fff",
  borderRadius: 8,
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  cursor: "pointer",
  marginBottom: 8
};

const googleBtn = {
  width: "100%",
  height: 44,
  background: "#fff",
  color: "#111",
  borderRadius: 8,
  border: "1px solid #E4E4E4",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  cursor: "pointer"
};

const heroWrap = {
  width: 420,
  height: 520,
  borderRadius: 24,
  overflow: "hidden",
  background: "#E8ECF8",
  border: "none",
  outline:"none",
  boxshadow:"none",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const heroImg = { width: "100%", height: "100%", objectFit: "cover", display: "block" };

const errBox = { marginTop: 12, background: "#FFEFEF", color: "#AA2222", padding: 8, borderRadius: 6 };
