




// // // src/Component/login/SignupPage.jsx
// // import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";

// // const HERO_IMAGE_URL = "/img/logsig.png";
// // const EYE_ICON = "/img/eye.png";

// // export default function SignupPage() {
// //   const navigate = useNavigate();
// //   const [form, setForm] = useState({
// //     first_name: "", middle_name: "", last_name: "",
// //     email: "", password: "", confirm_password: "", phone: "", role: "user"
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirm, setShowConfirm] = useState(false);

// //   const OUTER_MAX = 1000;
// //   const INPUT_W = 300;
// //   const IMG_W = 420;
// //   const IMG_H = 500;

// //   const labelStyle = {
// //     display: "block",
// //     fontSize: 12,
// //     color: "#333",
// //     marginBottom: 6
// //   };

// //   const inputStyle = {
// //     height: 40,
// //     background: "#EAF6FE",
// //     borderRadius: 6,
// //     border: "1px solid #E4E4E4",
// //     padding: "8px 10px",
// //     fontSize: 14,
// //     boxSizing: "border-box",
// //     width: "100%"
// //   };

// //   const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);

// //     try {
// //       const payload = {
// //         first_name: form.first_name,
// //         middle_name: form.middle_name,
// //         last_name: form.last_name,
// //         email: form.email,
// //         password: form.password,
// //         phone: form.phone,
// //         role: form.role,
// //       };

// //       const res = await fetch("http://localhost:5000/api/auth/signup", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });

// //       let data;
// //       try { data = await res.json(); } catch { data = { message: await res.text() }; }
// //       setLoading(false);

// //       if (!res.ok) {
// //         setError(data?.message || data?.error || `Server returned ${res.status}`);
// //         console.error("Signup failed:", res.status, data);
// //         return;
// //       }

// //       if (data?.token) localStorage.setItem("egos_token", data.token);
// //       else if (data?.accessToken) localStorage.setItem("egos_token", data.accessToken);

// //       if (data?.user) localStorage.setItem("egos_user", JSON.stringify(data.user));
// //       else if (data?.userData) localStorage.setItem("egos_user", JSON.stringify(data.userData));

// //       navigate("/");
// //     } catch (err) {
// //       console.error("Signup error (network):", err);
// //       setLoading(false);
// //       setError("Network error — check backend (see console).");
// //     }
// //   };

// //   const handleOAuthSignup = (provider) => {
// //     const oauthEmail = window.prompt(`Enter the ${provider} email to simulate OAuth sign-up:`);
// //     if (!oauthEmail) return alert(`${provider} signup cancelled.`);
// //     const namePart = oauthEmail.split("@")[0] || oauthEmail;
// //     const fakeUser = { first_name: namePart, email: oauthEmail, role: "user" };
// //     localStorage.setItem("egos_token", `oauth-${provider}-${Date.now()}`);
// //     localStorage.setItem("egos_user", JSON.stringify(fakeUser));
// //     navigate("/");
// //   };

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
// //         <div style={{ width: "100%", background: "#F7F7FA", borderRadius: 36, display: "flex", padding: 28, boxSizing: "border-box", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
// //           {/* LEFT */}
// //           <div style={{ flex: "0 1 46%", display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 280 }}>
// //             <div style={{ fontWeight: 700, fontSize: 30 }}>SIGNUP</div>
// //             <div style={{ marginTop: 6, fontSize: 12, color: "#6B6B6B" }}>Create your <span style={{ fontWeight: 800, color: "#000" }}>2EGOS</span> account!</div>

// //             {error && <div style={{ marginTop: 12, padding: 8, borderRadius: 6, background: "#FFEFEF", color: "#AA2222", fontSize: 13 }}>{error}</div>}

// //             <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
// //               {/* FIRST + MIDDLE NAME (labels above inputs) */}
// //               <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
// //                 <div style={{ flex: 1, minWidth: 120 }}>
// //                   <label style={labelStyle}>First name</label>
// //                   <input name="first_name" value={form.first_name} onChange={handleChange} required style={inputStyle} />
// //                 </div>

// //                 <div style={{ flex: 1, minWidth: 120 }}>
// //                   <label style={labelStyle}>Middle name <span style={{ color: "#9AA4B2" }}>(optional)</span></label>
// //                   <input name="middle_name" value={form.middle_name} onChange={handleChange} style={inputStyle} />
// //                 </div>
// //               </div>

// //               {/* LAST NAME — label above, same style as first */}
// //               <div style={{ marginTop: 10 }}>
// //                 <label style={labelStyle}>Last name</label>
// //                 <div style={{ width: INPUT_W, maxWidth: "100%" }}>
// //                   <input name="last_name" value={form.last_name} onChange={handleChange} required style={inputStyle} />
// //                 </div>
// //               </div>

// //               {/* EMAIL — label above, same style */}
// //               <div style={{ marginTop: 10 }}>
// //                 <label style={labelStyle}>E-Mail</label>
// //                 <div style={{ width: INPUT_W, maxWidth: "100%" }}>
// //                   <input name="email" value={form.email} onChange={handleChange} required style={inputStyle} />
// //                 </div>
// //               </div>

// //               {/* CREATE PASSWORD (label above, eye) */}
// //               <div style={{ marginTop: 10 }}>
// //                 <label style={labelStyle}>Create Password</label>
// //                 <div style={{ position: "relative", width: INPUT_W, maxWidth: "100%" }}>
// //                   <input name="password" value={form.password} onChange={handleChange} required
// //                     type={showPassword ? "text" : "password"}
// //                     style={inputStyle} />
// //                   <button type="button" onClick={() => setShowPassword(s => !s)} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", border: "none", background: "transparent", cursor: "pointer" }}>
// //                     <img src={EYE_ICON} alt="eye" style={{ width: 18, height: 18 }} />
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* CONFIRM PASSWORD (label above, eye) */}
// //               <div style={{ marginTop: 10 }}>
// //                 <label style={labelStyle}>Confirm Password</label>
// //                 <div style={{ position: "relative", width: INPUT_W, maxWidth: "100%" }}>
// //                   <input name="confirm_password" value={form.confirm_password} onChange={handleChange} required
// //                     type={showConfirm ? "text" : "password"}
// //                     style={inputStyle} />
// //                   <button type="button" onClick={() => setShowConfirm(s => !s)} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", border: "none", background: "transparent", cursor: "pointer" }}>
// //                     <img src={EYE_ICON} alt="eye" style={{ width: 18, height: 18 }} />
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* PHONE NUMBER — label above, same style */}
// //               <div style={{ marginTop: 10 }}>
// //                 <label style={labelStyle}>Phone number</label>
// //                 <div style={{ width: INPUT_W, maxWidth: "100%" }}>
// //                   <input name="phone" value={form.phone} onChange={handleChange} required style={inputStyle} />
// //                 </div>
// //               </div>

// //               <div style={{ marginTop: 14 }}>
// //                 <button type="submit" disabled={loading}
// //                   style={{ width: 110, height: 36, background: "#111", color: "#fff", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 14 }}>
// //                   {loading ? "Signing up..." : "Signup"}
// //                 </button>
// //               </div>
// //             </form>

// //             <p style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
// //               Already have an account? <Link to="/login" style={{ fontWeight: 700, color: "#2563EB", textDecoration: "underline" }}>Sign In</Link>
// //             </p>

// //             <div style={{ marginTop: 12, width: INPUT_W, maxWidth: "100%" }}>
// //               <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
// //                 <div style={{ flex: 1, height: 1, background: "#E0E0E0" }} />
// //                 <div style={{ fontSize: 11, color: "#9AA4B2" }}>or signup with</div>
// //                 <div style={{ flex: 1, height: 1, background: "#E0E0E0" }} />
// //               </div>

// //               <button onClick={() => handleOAuthSignup("Apple")} style={{ width: "100%", height: 42, background: "#000", color: "#fff", borderRadius: 8, border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer" }}>
// //                 <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png" alt="apple" style={{ width: 16, height: 16 }} />
// //                 Signup with Apple
// //               </button>

// //               <button onClick={() => handleOAuthSignup("Google")} style={{ width: "100%", height: 42, marginTop: 10, background: "#fff", color: "#111", borderRadius: 8, border: "1px solid #E4E4E4", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer" }}>
// //                 <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="google" style={{ width: 16, height: 16 }} />
// //                 Signup with Google
// //               </button>
// //             </div>
// //           </div>

// //           {/* RIGHT image */}
// //           <div style={{ flex: "0 1 46%", display: "flex", alignItems: "flex-start", justifyContent: "center", minWidth: 220 }}>
// //             <div style={{ width: IMG_W, height: IMG_H, borderRadius: 36, overflow: "hidden", background: "#E8ECF8", border: "4px solid #2F80FF", boxSizing: "border-box", maxWidth: "100%" }}>
// //               <img src={HERO_IMAGE_URL} alt="hero" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
// //             </div>
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }




// // src/Component/login/SignupPage.jsx
// // import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";

// // export default function SignupPage() {
// //   const navigate = useNavigate();
// //   const [form, setForm] = useState({
// //     first_name: "",
// //     middle_name: "",
// //     last_name: "",
// //     email: "",
// //     password: "",
// //     confirm_password: "",
// //     phone: "",
// //     role: "user",
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(""); // server or generic error
// //   const [fieldError, setFieldError] = useState({}); // { phone: "", email: "", password: "" }

// //   const phoneRegex = /^[6-9]\d{9}$/;
// //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;

// //     if (name === "phone") {
// //       // keep only digits and max 10
// //       const digits = value.replace(/\D/g, "").slice(0, 10);
// //       setForm((p) => ({ ...p, phone: digits }));
// //       // live validation
// //       if (digits.length === 10 && phoneRegex.test(digits)) {
// //         setFieldError((p) => ({ ...p, phone: "" }));
// //       } else {
// //         setFieldError((p) => ({ ...p, phone: "Phone must be 10 digits and start with 6-9." }));
// //       }
// //       return;
// //     }

// //     if (name === "email") {
// //       setForm((p) => ({ ...p, email: value }));
// //       if (emailRegex.test(value)) setFieldError((p) => ({ ...p, email: "" }));
// //       else setFieldError((p) => ({ ...p, email: "Enter a valid email address." }));
// //       return;
// //     }

// //     if (name === "password" || name === "confirm_password") {
// //       setForm((p) => ({ ...p, [name]: value }));
// //       // simple password match validation when confirm typed
// //       if (name === "confirm_password") {
// //         if (form.password !== value) setFieldError((p) => ({ ...p, password: "Passwords do not match." }));
// //         else setFieldError((p) => ({ ...p, password: "" }));
// //       }
// //       return;
// //     }

// //     setForm((p) => ({ ...p, [name]: value }));
// //   };

// //   const validateBeforeSubmit = () => {
// //     const fe = {};
// //     if (!form.first_name.trim()) fe.first_name = "First name is required.";
// //     if (!form.last_name.trim()) fe.last_name = "Last name is required.";
// //     if (!emailRegex.test(form.email)) fe.email = "Enter a valid email address.";
// //     if (!form.password || form.password.length < 6) fe.password = "Password must be at least 6 characters.";
// //     if (form.password !== form.confirm_password) fe.password = "Passwords do not match.";
// //     if (!phoneRegex.test(form.phone)) fe.phone = "Phone must be 10 digits and start with 6-9.";
// //     setFieldError(fe);
// //     return Object.keys(fe).length === 0;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     if (!validateBeforeSubmit()) return;
// //     setLoading(true);

// //     try {
// //       const payload = {
// //         first_name: form.first_name,
// //         middle_name: form.middle_name || null,
// //         last_name: form.last_name,
// //         email: form.email,
// //         password: form.password,
// //         phone: form.phone,
// //         role: form.role,
// //       };

// //       const res = await fetch("http://localhost:5000/api/auth/signup", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });

// //       let data;
// //       try { data = await res.json(); } catch { data = { message: await res.text() }; }
// //       setLoading(false);

// //       if (!res.ok) {
// //         setError(data?.error || data?.message || `Server returned ${res.status}`);
// //         return;
// //       }

// //       if (data?.token) localStorage.setItem("egos_token", data.token);
// //       if (data?.user) localStorage.setItem("egos_user", JSON.stringify(data.user));
// //       navigate("/");
// //     } catch (err) {
// //       console.error("Signup error:", err);
// //       setLoading(false);
// //       setError("Network error — check backend (see console).");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#fff" }}>
// //       <div style={{ width: "100%", maxWidth: 980 }}>
// //         <div style={{ display: "flex", gap: 20, flexWrap: "wrap", background: "#F7F7FA", borderRadius: 18, padding: 20 }}>
// //           {/* LEFT - form */}
// //           <div style={{ flex: "1 1 420px", minWidth: 300 }}>
// //             <h2 style={{ fontSize: 28, fontWeight: 700 }}>Create your account</h2>
// //             <p style={{ color: "#6B6B6B", marginTop: 6 }}>Create your <strong style={{ color: "#000" }}>2EGOS</strong> account</p>

// //             {error && <div style={{ marginTop: 12, padding: 8, borderRadius: 6, background: "#FFEFEF", color: "#AA2222" }}>{error}</div>}

// //             <form onSubmit={handleSubmit} style={{ marginTop: 14 }}>
// //               <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
// //                 <div style={{ flex: 1, minWidth: 120 }}>
// //                   <label style={{ fontSize: 12 }}>First name</label>
// //                   <input name="first_name" value={form.first_name} onChange={handleChange} required style={inputStyle} />
// //                   {fieldError.first_name && <div style={fieldErrStyle}>{fieldError.first_name}</div>}
// //                 </div>

// //                 <div style={{ flex: 1, minWidth: 120 }}>
// //                   <label style={{ fontSize: 12 }}>Middle name <span style={{ color: "#9AA4B2" }}>(optional)</span></label>
// //                   <input name="middle_name" value={form.middle_name} onChange={handleChange} style={inputStyle} />
// //                 </div>
// //               </div>

// //               <div style={{ marginTop: 10 }}>
// //                 <label style={{ fontSize: 12 }}>Last name</label>
// //                 <input name="last_name" value={form.last_name} onChange={handleChange} required style={inputStyle} />
// //                 {fieldError.last_name && <div style={fieldErrStyle}>{fieldError.last_name}</div>}
// //               </div>

// //               <div style={{ marginTop: 10 }}>
// //                 <label style={{ fontSize: 12 }}>E-Mail</label>
// //                 <input name="email" value={form.email} onChange={handleChange} required style={inputStyle} />
// //                 {fieldError.email && <div style={fieldErrStyle}>{fieldError.email}</div>}
// //               </div>

// //               <div style={{ marginTop: 10 }}>
// //                 <label style={{ fontSize: 12 }}>Create password</label>
// //                 <input name="password" value={form.password} onChange={handleChange} type="password" required style={inputStyle} />
// //               </div>

// //               <div style={{ marginTop: 10 }}>
// //                 <label style={{ fontSize: 12 }}>Confirm password</label>
// //                 <input name="confirm_password" value={form.confirm_password} onChange={handleChange} type="password" required style={inputStyle} />
// //                 {fieldError.password && <div style={fieldErrStyle}>{fieldError.password}</div>}
// //               </div>

// //               <div style={{ marginTop: 10 }}>
// //                 <label style={{ fontSize: 12 }}>Phone number</label>
// //                 <input
// //                   name="phone"
// //                   value={form.phone}
// //                   onChange={handleChange}
// //                   onBlur={() => {
// //                     if (!phoneRegex.test(form.phone)) setFieldError((p) => ({ ...p, phone: "Phone must be 10 digits and start with 6-9." }));
// //                     else setFieldError((p) => ({ ...p, phone: "" }));
// //                   }}
// //                   inputMode="numeric"
// //                   placeholder="9876543210"
// //                   required
// //                   style={inputStyle}
// //                 />
// //                 {fieldError.phone && <div style={fieldErrStyle}>{fieldError.phone}</div>}
// //               </div>

// //               <div style={{ marginTop: 14 }}>
// //                 <button type="submit" disabled={loading} style={submitBtnStyle}>
// //                   {loading ? "Signing up..." : "Sign up"}
// //                 </button>
// //               </div>
// //             </form>

// //             <p style={{ marginTop: 12 }}>Already have an account? <Link to="/login" style={{ color: "#2563EB", fontWeight: 700 }}>Sign in</Link></p>
// //           </div>

// //           {/* RIGHT - image or illustration */}
// //           <div style={{ flex: "0 1 360px", minWidth: 240, display: "flex", alignItems: "center", justifyContent: "center" }}>
// //             <div style={{ width: 340, height: 440, borderRadius: 18, overflow: "hidden", background: "#E8ECF8", border: "3px solid #2F80FF" }}>
// //               <img src="/public/img/logsig.png" alt="hero" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // styles
// // const inputStyle = {
// //   width: "100%",
// //   height: 40,
// //   background: "#EAF6FE",
// //   borderRadius: 6,
// //   border: "1px solid #E4E4E4",
// //   padding: "8px 10px",
// //   boxSizing: "border-box",
// //   marginTop: 6,
// // };

// // const fieldErrStyle = { color: "#b22222", fontSize: 12, marginTop: 6 };

// // const submitBtnStyle = {
// //   width: 120,
// //   height: 40,
// //   background: "#111",
// //   color: "#fff",
// //   borderRadius: 6,
// //   border: "none",
// //   cursor: "pointer",
// //   fontWeight: 600,
// // };








// // src/Component/login/SignupPage.jsx
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// /**
//  * Signup with email OTP flow:
//  * 1. User fills form -> click Continue
//  * 2. POST /api/otp/send { email }
//  * 3. show OTP modal -> user enters OTP -> POST /api/otp/verify { email, otp }
//  * 4. on success -> POST /api/auth/signup with full payload
//  */

// export default function SignupPage() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     first_name: "",
//     middle_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//     confirm_password: "",
//     phone: "",
//     role: "user",
//   });

//   const [loading, setLoading] = useState(false);         // for final signup
//   const [sendingOtp, setSendingOtp] = useState(false);   // send OTP
//   const [verifyingOtp, setVerifyingOtp] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [serverMsg, setServerMsg] = useState("");        // server-level error/success
//   const [fieldError, setFieldError] = useState({});
//   const [otpError, setOtpError] = useState("");
//   const [resendCountdown, setResendCountdown] = useState(0);

//   const phoneRegex = /^[6-9]\d{9}$/;
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   useEffect(() => {
//     let t;
//     if (resendCountdown > 0) {
//       t = setTimeout(() => setResendCountdown((v) => v - 1), 1000);
//     }
//     return () => clearTimeout(t);
//   }, [resendCountdown]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "phone") {
//       const digits = value.replace(/\D/g, "").slice(0, 10);
//       setForm((p) => ({ ...p, phone: digits }));
//       if (digits.length === 10 && phoneRegex.test(digits)) {
//         setFieldError((p) => ({ ...p, phone: "" }));
//       } else {
//         setFieldError((p) => ({ ...p, phone: "Phone must be 10 digits and start with 6-9." }));
//       }
//       return;
//     }

//     if (name === "email") {
//       setForm((p) => ({ ...p, email: value }));
//       if (emailRegex.test(value)) setFieldError((p) => ({ ...p, email: "" }));
//       else setFieldError((p) => ({ ...p, email: "Enter a valid email address." }));
//       return;
//     }

//     if (name === "confirm_password") {
//       setForm((p) => ({ ...p, confirm_password: value }));
//       if (form.password !== value) setFieldError((p) => ({ ...p, password: "Passwords do not match." }));
//       else setFieldError((p) => ({ ...p, password: "" }));
//       return;
//     }

//     setForm((p) => ({ ...p, [name]: value }));
//   };

//   const validateForm = () => {
//     const fe = {};
//     if (!form.first_name.trim()) fe.first_name = "First name required";
//     if (!form.last_name.trim()) fe.last_name = "Last name required";
//     if (!emailRegex.test(form.email)) fe.email = "Enter a valid email";
//     if (!form.password || form.password.length < 6) fe.password = "Password must be ≥ 6 chars";
//     if (form.password !== form.confirm_password) fe.password = "Passwords do not match";
//     if (!phoneRegex.test(form.phone)) fe.phone = "Phone must be 10 digits and start with 6-9.";
//     setFieldError(fe);
//     return Object.keys(fe).length === 0;
//   };

//   // Step A: request OTP (called when user clicks Continue)
//   const requestOtp = async (e) => {
//     e && e.preventDefault();
//     setServerMsg("");
//     setOtpError("");
//     if (!validateForm()) return;

//     setSendingOtp(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/otp/send", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: form.email }),
//       });

//       const data = await res.json().catch(() => ({}));
//       setSendingOtp(false);

//       if (!res.ok) {
//         setServerMsg(data?.error || data?.message || `Failed to send OTP (${res.status})`);
//         return;
//       }

//       setOtpSent(true);
//       setResendCountdown(60); // 60s before resend
//       setServerMsg("OTP sent to your email. Check inbox (and spam).");
//     } catch (err) {
//       console.error("requestOtp error", err);
//       setSendingOtp(false);
//       setServerMsg("Network error while sending OTP. Try again.");
//     }
//   };

//   // Step B: verify OTP then create account
//   const verifyAndSignup = async () => {
//     setOtpError("");
//     setServerMsg("");
//     if (!otp || otp.length < 4) {
//       setOtpError("Enter the OTP you received.");
//       return;
//     }

//     setVerifyingOtp(true);
//     try {
//       const vres = await fetch("http://localhost:5000/api/otp/verify", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: form.email, otp: otp }),
//       });
//       const vdata = await vres.json().catch(() => ({}));
//       setVerifyingOtp(false);

//       if (!vres.ok) {
//         setOtpError(vdata?.error || vdata?.message || `Failed to verify OTP (${vres.status})`);
//         return;
//       }

//       // OTP verified -> now create the user (signup)
//       setLoading(true);
//       const payload = {
//         first_name: form.first_name,
//         middle_name: form.middle_name || null,
//         last_name: form.last_name,
//         email: form.email,
//         password: form.password,
//         phone: form.phone,
//         role: form.role,
//       };

//       const sres = await fetch("http://localhost:5000/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const sdata = await sres.json().catch(() => ({}));
//       setLoading(false);

//       if (!sres.ok) {
//         setServerMsg(sdata?.error || sdata?.message || `Signup failed (${sres.status})`);
//         return;
//       }

//       // store token / user (if returned)
//       if (sdata?.token) localStorage.setItem("egos_token", sdata.token);
//       if (sdata?.accessToken) localStorage.setItem("egos_token", sdata.accessToken);
//       if (sdata?.user) localStorage.setItem("egos_user", JSON.stringify(sdata.user));
//       else if (sdata?.userData) localStorage.setItem("egos_user", JSON.stringify(sdata.userData));

//       // final success
//       navigate("/");
//     } catch (err) {
//       console.error("verifyAndSignup error", err);
//       setVerifyingOtp(false);
//       setLoading(false);
//       setServerMsg("Network error. Try again.");
//     }
//   };

//   const resendOtp = async () => {
//     if (resendCountdown > 0) return;
//     setOtpError("");
//     setServerMsg("");

//     try {
//       setSendingOtp(true);
//       const res = await fetch("http://localhost:5000/api/otp/send", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: form.email }),
//       });
//       const data = await res.json().catch(() => ({}));
//       setSendingOtp(false);

//       if (!res.ok) {
//         setServerMsg(data?.error || data?.message || `Failed to resend OTP (${res.status})`);
//         return;
//       }
//       setResendCountdown(60);
//       setServerMsg("OTP resent. Check your email.");
//     } catch (err) {
//       console.error("resendOtp error", err);
//       setSendingOtp(false);
//       setServerMsg("Network error when resending OTP.");
//     }
//   };

//   return (
//     <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "#fff" }}>
//       <div style={{ width: "100%", maxWidth: 980 }}>
//         <div style={{ display: "flex", gap: 20, flexWrap: "wrap", background: "#F7F7FA", borderRadius: 18, padding: 20 }}>
//           {/* Form */}
//           <div style={{ flex: "1 1 420px", minWidth: 300 }}>
//             <h2 style={{ fontSize: 28, fontWeight: 700 }}>SIGNUP</h2>
//             <p style={{ color: "#6B6B6B" }}>Create your <strong style={{ color: "#000" }}>2EGOS</strong> account!</p>

//             {serverMsg && <div style={{ margin: "10px 0", color: serverMsg.startsWith("OTP sent") || serverMsg.startsWith("OTP resent") ? "green" : "#b22222" }}>{serverMsg}</div>}

//             <form onSubmit={(e) => { e.preventDefault(); requestOtp(e); }}>
//               <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//                 <div style={{ flex: 1, minWidth: 120 }}>
//                   <label style={{ fontSize: 12 }}>First name</label>
//                   <input name="first_name" value={form.first_name} onChange={handleChange} style={inputStyle} required />
//                   {fieldError.first_name && <div style={fieldErrStyle}>{fieldError.first_name}</div>}
//                 </div>
//                 <div style={{ flex: 1, minWidth: 120 }}>
//                   <label style={{ fontSize: 12 }}>Middle name <span style={{ color: "#9AA4B2" }}>(optional)</span></label>
//                   <input name="middle_name" value={form.middle_name} onChange={handleChange} style={inputStyle} />
//                 </div>
//               </div>

//               <div style={{ marginTop: 10 }}>
//                 <label style={{ fontSize: 12 }}>Last name</label>
//                 <input name="last_name" value={form.last_name} onChange={handleChange} style={inputStyle} required />
//                 {fieldError.last_name && <div style={fieldErrStyle}>{fieldError.last_name}</div>}
//               </div>

//               <div style={{ marginTop: 10 }}>
//                 <label style={{ fontSize: 12 }}>E-Mail</label>
//                 <input name="email" value={form.email} onChange={handleChange} style={inputStyle} required />
//                 {fieldError.email && <div style={fieldErrStyle}>{fieldError.email}</div>}
//               </div>

//               <div style={{ marginTop: 10 }}>
//                 <label style={{ fontSize: 12 }}>Create password</label>
//                 <input name="password" type="password" value={form.password} onChange={handleChange} style={inputStyle} required />
//               </div>

//               <div style={{ marginTop: 10 }}>
//                 <label style={{ fontSize: 12 }}>Confirm password</label>
//                 <input name="confirm_password" type="password" value={form.confirm_password} onChange={handleChange} style={inputStyle} required />
//                 {fieldError.password && <div style={fieldErrStyle}>{fieldError.password}</div>}
//               </div>

//               <div style={{ marginTop: 10 }}>
//                 <label style={{ fontSize: 12 }}>Phone number</label>
//                 <input name="phone" value={form.phone} onChange={handleChange} placeholder="9876543210" inputMode="numeric" style={inputStyle} required />
//                 {fieldError.phone && <div style={fieldErrStyle}>{fieldError.phone}</div>}
//               </div>

//               <div style={{ marginTop: 14 }}>
//                 <button type="submit" disabled={sendingOtp || loading} style={submitBtnStyle}>
//                   {sendingOtp ? "Sending OTP..." : "Continue"}
//                 </button>
//               </div>
//             </form>

//             <p style={{ marginTop: 12 }}>Already have an account? <Link to="/login" style={{ color: "#2563EB", fontWeight: 700 }}>Sign In</Link></p>
//           </div>

//           {/* Right image */}
//           <div style={{ flex: "0 1 360px", minWidth: 240, display: "flex", alignItems: "center", justifyContent: "center" }}>
//             <div style={{ width: 340, height: 440, borderRadius: 18, overflow: "hidden", background: "#E8ECF8", border: "3px solid #2F80FF" }}>
//               <img src="/public/img/logsig.png" alt="hero" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* OTP modal */}
//       {otpSent && (
//         <div style={modalOverlay}>
//           <div style={modalBox}>
//             <h3>Enter OTP sent to {form.email}</h3>

//             <div style={{ marginTop: 8 }}>
//               <input value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="123456" style={otpInput} />
//               {otpError && <div style={{ color: "#b22222", marginTop: 8 }}>{otpError}</div>}
//             </div>

//             <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
//               <button onClick={verifyAndSignup} disabled={verifyingOtp || loading} style={submitBtnStyle}>
//                 {verifyingOtp || loading ? "Verifying..." : "Verify OTP & Signup"}
//               </button>

//               <button onClick={() => { setOtpSent(false); setOtp(""); setOtpError(""); }} style={btnGrey}>
//                 Cancel
//               </button>

//               <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
//                 <button onClick={resendOtp} disabled={sendingOtp || resendCountdown > 0} style={btnSmall}>
//                   {sendingOtp ? "Sending..." : resendCountdown > 0 ? `Resend (${resendCountdown}s)` : "Resend OTP"}
//                 </button>
//               </div>
//             </div>

//             {serverMsg && <div style={{ marginTop: 10, color: serverMsg.startsWith("OTP sent") ? "green" : "#b22222" }}>{serverMsg}</div>}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ---------- styles ----------
// const inputStyle = {
//   width: "100%",
//   height: 40,
//   background: "#EAF6FE",
//   borderRadius: 6,
//   border: "1px solid #E4E4E4",
//   padding: "8px 10px",
//   boxSizing: "border-box",
//   marginTop: 6,
// };

// const fieldErrStyle = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const submitBtnStyle = {
//   width: 160,
//   height: 40,
//   background: "#111",
//   color: "#fff",
//   borderRadius: 8,
//   border: "none",
//   cursor: "pointer",
//   fontWeight: 600,
// };

// const btnGrey = {
//   padding: "8px 14px",
//   background: "#ddd",
//   color: "#000",
//   borderRadius: 6,
//   border: "none",
//   cursor: "pointer",
// };

// const btnSmall = {
//   padding: "6px 10px",
//   background: "#fff",
//   border: "1px solid #ddd",
//   borderRadius: 6,
//   cursor: "pointer",
// };

// const modalOverlay = {
//   position: "fixed",
//   inset: 0,
//   background: "rgba(0,0,0,0.45)",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   zIndex: 9999,
// };

// const modalBox = {
//   width: "min(520px, 94%)",
//   background: "#fff",
//   padding: 20,
//   borderRadius: 10,
//   boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
// };

// const otpInput = {
//   width: "100%",
//   padding: "12px 16px",
//   fontSize: 18,
//   textAlign: "center",
//   borderRadius: 8,
//   border: "1px solid #ddd",
// };





// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const HERO_IMAGE_URL = "/public/img/logsig.png"; // change if needed
// const EYE_ICON = "/public/img/eye.png";

// export default function SignupPage() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     first_name: "", middle_name: "", last_name: "",
//     email: "", password: "", confirm_password: "", phone: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const [showPass, setShowPass] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = e => {
//     const { name, value } = e.target;
//     // phone only digits, max 10
//     if (name === "phone") {
//       const digits = value.replace(/\D/g, "").slice(0, 10);
//       setForm(p => ({ ...p, phone: digits }));
//       return;
//     }
//     setForm(p => ({ ...p, [name]: value }));
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     // lightweight client validation
//     if (!form.first_name.trim() || !form.last_name.trim()) {
//       setError("Please enter first and last name.");
//       return;
//     }
//     if (!/\S+@\S+\.\S+/.test(form.email)) {
//       setError("Enter a valid email address.");
//       return;
//     }
//     if (form.password.length < 6) {
//       setError("Password must be 6+ characters.");
//       return;
//     }
//     if (form.password !== form.confirm_password) {
//       setError("Passwords do not match.");
//       return;
//     }
//     if (!/^[6-9]\d{9}$/.test(form.phone)) {
//       setError("Enter a valid 10-digit phone number.");
//       return;
//     }

//     setLoading(true);
//     try {
//       // keep your existing signup workflow / API
//       const payload = {
//         first_name: form.first_name,
//         middle_name: form.middle_name || null,
//         last_name: form.last_name,
//         email: form.email,
//         password: form.password,
//         phone: form.phone,
//         role: "user"
//       };
//       const res = await fetch("http://localhost:5000/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//       });
//       const data = await res.json().catch(() => ({}));
//       setLoading(false);
//       if (!res.ok) {
//         setError(data?.error || data?.message || `Server ${res.status}`);
//         return;
//       }
//       if (data?.token) localStorage.setItem("egos_token", data.token);
//       if (data?.user) localStorage.setItem("egos_user", JSON.stringify(data.user));
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       setLoading(false);
//       setError("Network error — check console");
//     }
//   };

//   return (
//     <div style={page}>
//       <div style={card}>
//         <div style={leftCol}>
//           <div style={{ fontSize: 34, fontWeight: 800 }}>SIGNUP</div>
//           <div style={{ marginTop: 6, color: "#6B6B6B" }}>Create your <strong style={{color:"#000"}}>2EGOS</strong> account!</div>

//           {error && <div style={errBox}>{error}</div>}

//           <form onSubmit={onSubmit} style={{ marginTop: 14 }}>
//             <div style={{ display: "flex", gap: 10 }}>
//               <div style={{ flex: 1 }}>
//                 <label style={label}>First name</label>
//                 <input name="first_name" value={form.first_name} onChange={handleChange} style={input} required />
//               </div>
//               <div style={{ flex: 1 }}>
//                 <label style={label}>Middle name <span style={{ color: "#9AA4B2" }}>(optional)</span></label>
//                 <input name="middle_name" value={form.middle_name} onChange={handleChange} style={input} />
//               </div>
//             </div>

//             <div style={{ marginTop: 10 }}>
//               <label style={label}>Last name</label>
//               <input name="last_name" value={form.last_name} onChange={handleChange} style={input} required />
//             </div>

//             <div style={{ marginTop: 10 }}>
//               <label style={label}>E-Mail</label>
//               <input name="email" value={form.email} onChange={handleChange} style={input} required />
//             </div>

//             <div style={{ marginTop: 10, position: "relative" }}>
//               <label style={label}>Create password</label>
//               <input name="password" value={form.password} onChange={handleChange} type={showPass ? "text":"password"} style={input} required />
//               <button type="button" onClick={() => setShowPass(s=>!s)} style={eyeBtn}><img src={EYE_ICON} alt="eye" style={{width:18}}/></button>
//             </div>

//             <div style={{ marginTop: 10, position: "relative" }}>
//               <label style={label}>Confirm password</label>
//               <input name="confirm_password" value={form.confirm_password} onChange={handleChange} type={showConfirm ? "text":"password"} style={input} required />
//               <button type="button" onClick={() => setShowConfirm(s=>!s)} style={eyeBtn}><img src={EYE_ICON} alt="eye" style={{width:18}}/></button>
//             </div>

//             <div style={{ marginTop: 10 }}>
//               <label style={label}>Phone number</label>
//               <input name="phone" value={form.phone} onChange={handleChange} inputMode="numeric" placeholder="9876543210" style={input} required />
//             </div>

//             <div style={{ marginTop: 14 }}>
//               <button type="submit" disabled={loading} style={signupBtn}>{loading ? "Signing up..." : "Signup"}</button>
//             </div>
//           </form>

//           <p style={{ marginTop: 12 }}>Already have an account? <Link to="/login" style={{ color: "#2F80FF", fontWeight: 700 }}>Sign In</Link></p>

//           <div style={{ marginTop: 12 }}>
//             <div style={dividerRow}>
//               <div style={line} />
//               <div style={{ fontSize: 11, color: "#9AA4B2" }}>or signup with</div>
//               <div style={line} />
//             </div>
//             <button style={appleBtn} onClick={() => alert("Apple signup flow")}>
//               <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png" alt="apple" style={{ width: 16, marginRight: 8 }} /> Signup with Apple
//             </button>
//             <button style={googleBtn} onClick={() => alert("Google signup flow")}>
//               <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="google" style={{ width: 16, marginRight: 8 }} /> Signup with Google
//             </button>
//           </div>
//         </div>

//         <div style={rightCol}>
//           <div style={heroWrap}>
//             <img src={HERO_IMAGE_URL} alt="hero" style={heroImg}/>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* styles reused from login with small tweaks */
// const page = {
//   minHeight: "100vh",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   background: "#fff",
//   padding: 20,
//   boxSizing: "border-box"
// };

// const card = {
//   width: "100%",
//   maxWidth: 1100,
//   display: "flex",
//   gap: 28,
//   background: "#F7F7FA",
//   borderRadius: 28,
//   padding: 28,
//   boxSizing: "border-box",
//   alignItems: "flex-start"
// };

// const leftCol = { flex: "0 0 46%", minWidth: 320 };
// const rightCol = { flex: "0 0 46%", display: "flex", justifyContent: "center" };

// const input = {
//   width: "100%",
//   height: 44,
//   background: "#EAF6FE",
//   borderRadius: 8,
//   border: "1px solid #E4E4E4",
//   padding: "8px 12px",
//   boxSizing: "border-box",
//   marginTop: 6,
//   fontSize: 14
// };

// const label = { fontSize: 12, color: "#333" };
// const eyeBtn = {
//   position: "absolute",
//   right: 10,
//   top: "70%",
//   transform: "translateY(-50%)",
//   width: 30,
//   height: 30,
//   cursor: "pointer",
//   opacity: 1.0,
  
// };

// const signupBtn = {
//   width: 120,
//   height: 40,
//   background: "#111",
//   color: "#fff",
//   borderRadius: 8,
//   border: "none",
//   cursor: "pointer",
//   fontWeight: 700
// };

// const dividerRow = { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 };
// const line = { flex: 1, height: 1, background: "#E0E0E0" };
// const appleBtn = {
//   width: "100%",
//   height: 44,
//   background: "#000",
//   color: "#fff",
//   borderRadius: 8,
//   border: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   gap: 8,
//   cursor: "pointer",
//   marginBottom: 8
// };
// const googleBtn = {
//   width: "100%",
//   height: 44,
//   background: "#fff",
//   color: "#111",
//   borderRadius: 8,
//   border: "1px solid #E4E4E4",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   gap: 8,
//   cursor: "pointer"
// };

// const heroWrap = {
//   width: 420,
//   height: 520,
//   borderRadius: 24,
//   overflow: "hidden",
//   background: "#E8ECF8",
//   border: "none",
//   outline:"none",
//   boxshadow:"none",
//   boxSizing: "border-box",
//   display: "flex",
//   alignItems: "flex-start",
//   justifyContent: "center"
// };
// const heroImg = { width: "100%", height: "100%", objectFit: "cover", display: "block" };

// const errBox = { marginTop: 12, background: "#FFEFEF", color: "#AA2222", padding: 8, borderRadius: 6 };



// src/Component/login/SignupPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HERO_IMAGE_URL = "/public/img/logsig.png";
const EYE_ICON = "/public/img/eye.png";

export default function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    role: "user",
  });

  const [fieldError, setFieldError] = useState({});
  const [serverMsg, setServerMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // OTP modal & flow state
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const phoneRegex = /^[6-9]\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    let t;
    if (resendCountdown > 0) {
      t = setTimeout(() => setResendCountdown((v) => v - 1), 1000);
    }
    return () => clearTimeout(t);
  }, [resendCountdown]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      setForm((p) => ({ ...p, phone: digits }));
      if (digits.length === 10 && phoneRegex.test(digits)) {
        setFieldError((p) => ({ ...p, phone: "" }));
      } else {
        setFieldError((p) => ({ ...p, phone: "Phone must be 10 digits and start with 6-9." }));
      }
      return;
    }

    if (name === "email") {
      setForm((p) => ({ ...p, email: value }));
      if (emailRegex.test(value)) setFieldError((p) => ({ ...p, email: "" }));
      else setFieldError((p) => ({ ...p, email: "Enter a valid email address." }));
      return;
    }

    if (name === "confirm_password") {
      setForm((p) => ({ ...p, confirm_password: value }));
      if (form.password !== value) setFieldError((p) => ({ ...p, password: "Passwords do not match." }));
      else setFieldError((p) => ({ ...p, password: "" }));
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
  };

  const validateForm = () => {
    const fe = {};
    if (!form.first_name.trim()) fe.first_name = "First name required";
    if (!form.last_name.trim()) fe.last_name = "Last name required";
    if (!emailRegex.test(form.email)) fe.email = "Enter a valid email";
    if (!form.password || form.password.length < 6) fe.password = "Password must be at least 6 characters";
    if (form.password !== form.confirm_password) fe.password = "Passwords do not match";
    if (!phoneRegex.test(form.phone)) fe.phone = "Phone must be 10 digits and start with 6-9.";
    setFieldError(fe);
    return Object.keys(fe).length === 0;
  };

  // Step 1: Send OTP to email (Continue button)
  const handleSendOtp = async (e) => {
    e && e.preventDefault();
    setServerMsg("");
    setOtpError("");
    if (!validateForm()) return;

    setSendingOtp(true);
    try {
      const res = await fetch("http://localhost:5000/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await res.json().catch(() => ({}));
      setSendingOtp(false);

      if (!res.ok) {
        setServerMsg(data?.error || data?.message || `Failed to send OTP (${res.status})`);
        return;
      }

      setOtpSent(true);
      setResendCountdown(60);
      setServerMsg("OTP sent to your email. Check inbox (and spam).");
    } catch (err) {
      console.error("sendOtp error:", err);
      setSendingOtp(false);
      setServerMsg("Network error while sending OTP. Try again.");
    }
  };

  // Step 2: Verify OTP, then complete signup
  const handleVerifyOtp = async () => {
    setOtpError("");
    setServerMsg("");
    if (!otp || otp.length < 4) {
      setOtpError("Enter the OTP you received.");
      return;
    }

    setVerifyingOtp(true);
    try {
      const vres = await fetch("http://localhost:5000/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, otp: otp.trim() }),
      });
      const vdata = await vres.json().catch(() => ({}));
      setVerifyingOtp(false);

      if (!vres.ok) {
        setOtpError(vdata?.error || vdata?.message || `OTP verify failed (${vres.status})`);
        return;
      }

      // OTP verified -> create user
      await completeSignup();
    } catch (err) {
      console.error("verifyOtp error:", err);
      setVerifyingOtp(false);
      setOtpError("Server error — could not verify OTP.");
    }
  };

  const completeSignup = async () => {
    setLoading(true);
    setServerMsg("");
    try {
      const payload = {
        first_name: form.first_name,
        middle_name: form.middle_name || null,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        role: form.role,
      };

      const sres = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const sdata = await sres.json().catch(() => ({}));
      setLoading(false);

      if (!sres.ok) {
        setServerMsg(sdata?.error || sdata?.message || `Signup failed (${sres.status})`);
        return;
      }

      if (sdata?.token) localStorage.setItem("egos_token", sdata.token);
      if (sdata?.accessToken) localStorage.setItem("egos_token", sdata.accessToken);
      if (sdata?.user) localStorage.setItem("egos_user", JSON.stringify(sdata.user));
      else if (sdata?.userData) localStorage.setItem("egos_user", JSON.stringify(sdata.userData));

      navigate("/");
    } catch (err) {
      console.error("completeSignup error:", err);
      setLoading(false);
      setServerMsg("Network error during signup.");
    }
  };

  const handleResend = async () => {
    if (resendCountdown > 0) return;
    setServerMsg("");
    setOtpError("");
    setSendingOtp(true);
    try {
      const res = await fetch("http://localhost:5000/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await res.json().catch(() => ({}));
      setSendingOtp(false);

      if (!res.ok) {
        setServerMsg(data?.error || data?.message || `Resend failed (${res.status})`);
        return;
      }

      setResendCountdown(60);
      setServerMsg("OTP resent to your email.");
    } catch (err) {
      console.error("resend error:", err);
      setSendingOtp(false);
      setServerMsg("Network error while resending OTP.");
    }
  };

  // OAuth placeholders (keeps previous behavior)
  const handleOAuth = async (provider) => {
    setServerMsg("");
    const oauthUrl = `http://localhost:5000/api/auth/oauth/${provider.toLowerCase()}`;
    try {
      const w = window.open(oauthUrl, "_blank", "noopener,noreferrer");
      if (!w || w.closed || typeof w.closed === "undefined") {
        throw new Error("popup-blocked");
      }
      setServerMsg(`If a new window opened, complete ${provider} sign-in there.`);
    } catch (err) {
      const email = window.prompt(`Enter ${provider} email to simulate ${provider} sign-in:`);
      if (!email) {
        setServerMsg(`${provider} sign-in cancelled.`);
        return;
      }
      const fakeUser = { first_name: email.split("@")[0], email, role: "user" };
      localStorage.setItem("egos_token", `oauth-${provider}-${Date.now()}`);
      localStorage.setItem("egos_user", JSON.stringify(fakeUser));
      navigate("/");
    }
  };

  return (
    <div style={rootStyle}>
      <div style={cardStyle}>
        <div style={formStyle}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900, color: "#0b1221" }}>Create your account</h1>
          <p style={{ marginTop: 6, marginBottom: 12, color: "#6B6B6B" }}>Create your <strong style={{ color: "#000" }}>2EGOS</strong> account</p>

          {serverMsg && <div style={{ padding: 8, borderRadius: 8, background: serverMsg.toLowerCase().includes("otp") ? "#ecfdf5" : "#fff1f2", color: serverMsg.toLowerCase().includes("otp") ? "#064e3b" : "#b22222", marginBottom: 10 }}>{serverMsg}</div>}

          <form onSubmit={handleSendOtp} style={{ marginTop: 14 }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 120 }}>
                <label style={{ fontSize: 12 }}>First name</label>
                <input name="first_name" value={form.first_name} onChange={handleChange} required style={inputStyle} />
                {fieldError.first_name && <div style={fieldErrStyle}>{fieldError.first_name}</div>}
              </div>

              <div style={{ flex: 1, minWidth: 120 }}>
                <label style={{ fontSize: 12 }}>Middle name <span style={{ color: "#9AA4B2" }}>(optional)</span></label>
                <input name="middle_name" value={form.middle_name} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <div style={{ marginTop: 10 }}>
              <label style={{ fontSize: 12 }}>Last name</label>
              <input name="last_name" value={form.last_name} onChange={handleChange} required style={inputStyle} />
              {fieldError.last_name && <div style={fieldErrStyle}>{fieldError.last_name}</div>}
            </div>

            <div style={{ marginTop: 10 }}>
              <label style={{ fontSize: 12 }}>E-Mail</label>
              <input name="email" value={form.email} onChange={handleChange} required style={inputStyle} />
              {fieldError.email && <div style={fieldErrStyle}>{fieldError.email}</div>}
            </div>

            <div style={{ marginTop: 10, position: "relative" }}>
              <label style={{ fontSize: 12 }}>Create password</label>
              <input name="password" value={form.password} onChange={handleChange} required type={showPassword ? "text" : "password"} style={{ ...inputStyle, paddingRight: 44 }} />
              <button type="button" onClick={() => setShowPassword(s => !s)} style={eyeIconStyle} aria-label="toggle password">
                <img src={EYE_ICON} alt="eye" style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <div style={{ marginTop: 10, position: "relative" }}>
              <label style={{ fontSize: 12 }}>Confirm password</label>
              <input name="confirm_password" value={form.confirm_password} onChange={handleChange} required type={showConfirm ? "text" : "password"} style={{ ...inputStyle, paddingRight: 44 }} />
              <button type="button" onClick={() => setShowConfirm(s => !s)} style={eyeIconStyle} aria-label="toggle confirm">
                <img src={EYE_ICON} alt="eye" style={{ width: 18, height: 18 }} />
              </button>
              {fieldError.password && <div style={fieldErrStyle}>{fieldError.password}</div>}
            </div>

            <div style={{ marginTop: 10 }}>
              <label style={{ fontSize: 12 }}>Phone number</label>
              <input name="phone" value={form.phone} onChange={handleChange} inputMode="numeric" placeholder="9876543210" required style={inputStyle} />
              {fieldError.phone && <div style={fieldErrStyle}>{fieldError.phone}</div>}
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
              <button type="submit" disabled={sendingOtp || loading} style={primaryBtn}>
                {sendingOtp ? "Sending…" : "Continue"}
              </button>

              <div style={{ marginLeft: "auto" }} />
            </div>
          </form>

          <p style={{ marginTop: 12 }}>Already have an account? <Link to="/login" style={{ color: "#2563EB", fontWeight: 700 }}>Sign in</Link></p>

          <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ flex: 1, height: 1, background: "#E6E9EE" }} />
              <div style={{ fontSize: 11, color: "#9AA4B2" }}>or sign up with</div>
              <div style={{ flex: 1, height: 1, background: "#E6E9EE" }} />
            </div>

            <button style={{ ...oauthBtn, background: "#000", color: "#fff" }} onClick={() => handleOAuth("Apple")}>
              <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png" alt="apple" style={{ width: 16, height: 16 }} /> Signup with Apple
            </button>

            <button style={{ ...oauthBtn, background: "#fff", border: "1px solid #E4E7EB", color: "#111", marginTop: 10 }} onClick={() => handleOAuth("Google")}>
              <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="google" style={{ width: 16, height: 16 }} /> Signup with Google
            </button>
          </div>
        </div>

        <div style={heroColumn}>
          <div style={heroBox}>
            <img src={HERO_IMAGE_URL} alt="hero" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </div>

      {/* OTP modal overlay */}
      {otpSent && (
        <div style={otpOverlay}>
          <div style={otpBox}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Enter OTP</h3>
            <p style={{ marginTop: 8, color: "#6B6B6B" }}>We sent an OTP to <strong>{form.email}</strong></p>

            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="123456"
              style={{ width: "100%", padding: 12, fontSize: 18, borderRadius: 8, border: "1px solid #E4E7EB" }}
            />
            {otpError && <div style={{ color: "#b22222", marginTop: 8 }}>{otpError}</div>}

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button onClick={handleVerifyOtp} disabled={verifyingOtp || loading} style={primaryBtn}>
                {verifyingOtp || loading ? "Verifying…" : "Verify & Signup"}
              </button>

              <button onClick={() => { setOtpSent(false); setOtp(""); setOtpError(""); }} style={ghostBtn}>Cancel</button>

              <div style={{ marginLeft: "auto" }}>
                <button onClick={handleResend} disabled={resendCountdown > 0} style={ghostBtn}>
                  {resendCountdown > 0 ? `Resend (${resendCountdown}s)` : "Resend OTP"}
                </button>
              </div>
            </div>

            <div style={{ marginTop: 10, color: "#666" }}><small>Check spam if you don't see it.</small></div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== styles ===== */
const rootStyle = {
  minHeight: "100vh",
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 18,
  boxSizing: "border-box",
  fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
};

const cardStyle = {
  width: "100%",
  maxWidth: 980,
  background: "#F7F7FA",
  borderRadius: 12,
  padding: 16,
  boxSizing: "border-box",
  display: "flex",
  gap: 70,
  alignItems: "flex-start",
  justifyContent: "center",
  flexWrap: "wrap",
};

const formStyle = {
  flex: `0 1 420px`,
  maxWidth: 420,
  minWidth: 280,
};

const heroColumn = {
  flex: `0 1 340px`,
  minWidth: 220,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
};

const heroBox = {
  width: 500,
  height: 620,
  borderRadius: 18,
  overflow: "hidden",
  background: "#E8ECF8",
  boxSizing: "border-box",
};

const inputStyle = {
  width: "100%",
  height: 40,
  background: "#EAF6FE",
  borderRadius: 8,
  border: "1px solid #E4E4E4",
  padding: "8px 12px",
  boxSizing: "border-box",
  marginTop: 6,
};

const fieldErrStyle = { color: "#b22222", fontSize: 12, marginTop: 6 };

const primaryBtn = { background: "#111", color: "#fff", border: "none", padding: "9px 14px", borderRadius: 8, cursor: "pointer", fontWeight: 800, height: 40 };
const ghostBtn = { background: "#fff", border: "1px solid #E4E7EB", padding: "8px 12px", borderRadius: 8, cursor: "pointer" };
const oauthBtn = { width: "100%", height: 42, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer", fontWeight: 700 };

const eyeIconStyle = {
  position: "absolute",
  right: 12,
  top: "75%",
  transform: "translateY(-50%)",
  border: "none",
  background: "transparent",
  padding: 4,
  cursor: "pointer",
};

const otpOverlay = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 };
const otpBox = { width: "min(520px,94%)", background: "#fff", padding: 16, borderRadius: 10, boxShadow: "0 12px 30px rgba(0,0,0,0.18)" };

const fieldErrStyleSmall = { color: "#b22222", fontSize: 12, marginTop: 6 };

const fieldErrStyle2 = { color: "#b22222", fontSize: 12, marginTop: 6 };

const fieldErrStyle3 = { color: "#b22222", fontSize: 12, marginTop: 6 };

const fieldErrStyle4 = { color: "#b22222", fontSize: 12, marginTop: 6 };

const fieldErrStyle5 = { color: "#b22222", fontSize: 12, marginTop: 6 };

const fieldErrStyle6 = { color: "#b22222", fontSize: 12, marginTop: 6 };

const fieldErrStyle7 = { color: "#b22222", fontSize: 12, marginTop: 6 };

const fieldErrStyle8 = { color: "#b22222", fontSize: 12, marginTop: 6 };

const fieldErrStyle9 = { color: "#b22222", fontSize: 12, marginTop: 6 };

const fieldErrStyle10 = { color: "#b22222", fontSize: 12, marginTop: 6 };

const fieldErrStyle11 = { color: "#b22222", fontSize: 12, marginTop: 6 };

const fieldErrStyle12 = { color: "#b22222", fontSize: 12, marginTop: 6 };

