



// src/Component/login/SignupPage.jsx

//updated
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const HERO_IMAGE_URL = "/public/img/logsig.png";
// const EYE_ICON = "/public/img/eye.png";

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

//   const [fieldError, setFieldError] = useState({});
//   const [serverMsg, setServerMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   // OTP modal & flow state
//   const [otpSent, setOtpSent] = useState(false);
//   const [sendingOtp, setSendingOtp] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [otpError, setOtpError] = useState("");
//   const [verifyingOtp, setVerifyingOtp] = useState(false);
//   const [resendCountdown, setResendCountdown] = useState(0);

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

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
//     if (!form.password || form.password.length < 6) fe.password = "Password must be at least 6 characters";
//     if (form.password !== form.confirm_password) fe.password = "Passwords do not match";
//     if (!phoneRegex.test(form.phone)) fe.phone = "Phone must be 10 digits and start with 6-9.";
//     setFieldError(fe);
//     return Object.keys(fe).length === 0;
//   };

//   // Step 1: Send OTP to email (Continue button)
//   const handleSendOtp = async (e) => {
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
//       setResendCountdown(60);
//       setServerMsg("OTP sent to your email. Check inbox (and spam).");
//     } catch (err) {
//       console.error("sendOtp error:", err);
//       setSendingOtp(false);
//       setServerMsg("Network error while sending OTP. Try again.");
//     }
//   };

//   // Step 2: Verify OTP, then complete signup
//   const handleVerifyOtp = async () => {
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
//         body: JSON.stringify({ email: form.email, otp: otp.trim() }),
//       });
//       const vdata = await vres.json().catch(() => ({}));
//       setVerifyingOtp(false);

//       if (!vres.ok) {
//         setOtpError(vdata?.error || vdata?.message || `OTP verify failed (${vres.status})`);
//         return;
//       }

//       // OTP verified -> create user
//       await completeSignup();
//     } catch (err) {
//       console.error("verifyOtp error:", err);
//       setVerifyingOtp(false);
//       setOtpError("Server error — could not verify OTP.");
//     }
//   };

//   const completeSignup = async () => {
//     setLoading(true);
//     setServerMsg("");
//     try {
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

//       if (sdata?.token) localStorage.setItem("egos_token", sdata.token);
//       if (sdata?.accessToken) localStorage.setItem("egos_token", sdata.accessToken);
//       if (sdata?.user) localStorage.setItem("egos_user", JSON.stringify(sdata.user));
//       else if (sdata?.userData) localStorage.setItem("egos_user", JSON.stringify(sdata.userData));

//       navigate("/");
//     } catch (err) {
//       console.error("completeSignup error:", err);
//       setLoading(false);
//       setServerMsg("Network error during signup.");
//     }
//   };

//   const handleResend = async () => {
//     if (resendCountdown > 0) return;
//     setServerMsg("");
//     setOtpError("");
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
//         setServerMsg(data?.error || data?.message || `Resend failed (${res.status})`);
//         return;
//       }

//       setResendCountdown(60);
//       setServerMsg("OTP resent to your email.");
//     } catch (err) {
//       console.error("resend error:", err);
//       setSendingOtp(false);
//       setServerMsg("Network error while resending OTP.");
//     }
//   };

//   // OAuth placeholders (keeps previous behavior)
//   const handleOAuth = async (provider) => {
//     setServerMsg("");
//     const oauthUrl = `http://localhost:5000/api/auth/oauth/${provider.toLowerCase()}`;
//     try {
//       const w = window.open(oauthUrl, "_blank", "noopener,noreferrer");
//       if (!w || w.closed || typeof w.closed === "undefined") {
//         throw new Error("popup-blocked");
//       }
//       setServerMsg(`If a new window opened, complete ${provider} sign-in there.`);
//     } catch (err) {
//       const email = window.prompt(`Enter ${provider} email to simulate ${provider} sign-in:`);
//       if (!email) {
//         setServerMsg(`${provider} sign-in cancelled.`);
//         return;
//       }
//       const fakeUser = { first_name: email.split("@")[0], email, role: "user" };
//       localStorage.setItem("egos_token", `oauth-${provider}-${Date.now()}`);
//       localStorage.setItem("egos_user", JSON.stringify(fakeUser));
//       navigate("/");
//     }
//   };

//   return (
//     <div style={rootStyle}>
//       <div style={cardStyle}>
//         <div style={formStyle}>
//           <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900, color: "#0b1221" }}>Create your account</h1>
//           <p style={{ marginTop: 6, marginBottom: 12, color: "#6B6B6B" }}>Create your <strong style={{ color: "#000" }}>2EGOS</strong> account</p>

//           {serverMsg && <div style={{ padding: 8, borderRadius: 8, background: serverMsg.toLowerCase().includes("otp") ? "#ecfdf5" : "#fff1f2", color: serverMsg.toLowerCase().includes("otp") ? "#064e3b" : "#b22222", marginBottom: 10 }}>{serverMsg}</div>}

//           <form onSubmit={handleSendOtp} style={{ marginTop: 14 }}>
//             <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//               <div style={{ flex: 1, minWidth: 120 }}>
//                 <label style={{ fontSize: 12 }}>First name</label>
//                 <input name="first_name" value={form.first_name} onChange={handleChange} required style={inputStyle} />
//                 {fieldError.first_name && <div style={fieldErrStyle}>{fieldError.first_name}</div>}
//               </div>

//               <div style={{ flex: 1, minWidth: 120 }}>
//                 <label style={{ fontSize: 12 }}>Middle name <span style={{ color: "#9AA4B2" }}>(optional)</span></label>
//                 <input name="middle_name" value={form.middle_name} onChange={handleChange} style={inputStyle} />
//               </div>
//             </div>

//             <div style={{ marginTop: 10 }}>
//               <label style={{ fontSize: 12 }}>Last name</label>
//               <input name="last_name" value={form.last_name} onChange={handleChange} required style={inputStyle} />
//               {fieldError.last_name && <div style={fieldErrStyle}>{fieldError.last_name}</div>}
//             </div>

//             <div style={{ marginTop: 10 }}>
//               <label style={{ fontSize: 12 }}>E-Mail</label>
//               <input name="email" value={form.email} onChange={handleChange} required style={inputStyle} />
//               {fieldError.email && <div style={fieldErrStyle}>{fieldError.email}</div>}
//             </div>

//             <div style={{ marginTop: 10, position: "relative" }}>
//               <label style={{ fontSize: 12 }}>Create password</label>
//               <input name="password" value={form.password} onChange={handleChange} required type={showPassword ? "text" : "password"} style={{ ...inputStyle, paddingRight: 44 }} />
//               <button type="button" onClick={() => setShowPassword(s => !s)} style={eyeIconStyle} aria-label="toggle password">
//                 <img src={EYE_ICON} alt="eye" style={{ width: 18, height: 18 }} />
//               </button>
//             </div>

//             <div style={{ marginTop: 10, position: "relative" }}>
//               <label style={{ fontSize: 12 }}>Confirm password</label>
//               <input name="confirm_password" value={form.confirm_password} onChange={handleChange} required type={showConfirm ? "text" : "password"} style={{ ...inputStyle, paddingRight: 44 }} />
//               <button type="button" onClick={() => setShowConfirm(s => !s)} style={eyeIconStyle} aria-label="toggle confirm">
//                 <img src={EYE_ICON} alt="eye" style={{ width: 18, height: 18 }} />
//               </button>
//               {fieldError.password && <div style={fieldErrStyle}>{fieldError.password}</div>}
//             </div>

//             <div style={{ marginTop: 10 }}>
//               <label style={{ fontSize: 12 }}>Phone number</label>
//               <input name="phone" value={form.phone} onChange={handleChange} inputMode="numeric" placeholder="9876543210" required style={inputStyle} />
//               {fieldError.phone && <div style={fieldErrStyle}>{fieldError.phone}</div>}
//             </div>

//             <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
//               <button type="submit" disabled={sendingOtp || loading} style={primaryBtn}>
//                 {sendingOtp ? "Sending…" : "Continue"}
//               </button>

//               <div style={{ marginLeft: "auto" }} />
//             </div>
//           </form>

//           <p style={{ marginTop: 12 }}>Already have an account? <Link to="/login" style={{ color: "#2563EB", fontWeight: 700 }}>Sign in</Link></p>

//           <div style={{ marginTop: 12 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
//               <div style={{ flex: 1, height: 1, background: "#E6E9EE" }} />
//               <div style={{ fontSize: 11, color: "#9AA4B2" }}>or sign up with</div>
//               <div style={{ flex: 1, height: 1, background: "#E6E9EE" }} />
//             </div>

//             <button style={{ ...oauthBtn, background: "#000", color: "#fff" }} onClick={() => handleOAuth("Apple")}>
//               <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png" alt="apple" style={{ width: 16, height: 16 }} /> Signup with Apple
//             </button>

//             <button style={{ ...oauthBtn, background: "#fff", border: "1px solid #E4E7EB", color: "#111", marginTop: 10 }} onClick={() => handleOAuth("Google")}>
//               <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="google" style={{ width: 16, height: 16 }} /> Signup with Google
//             </button>
//           </div>
//         </div>

//         <div style={heroColumn}>
//           <div style={heroBox}>
//             <img src={HERO_IMAGE_URL} alt="hero" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//           </div>
//         </div>
//       </div>

//       {/* OTP modal overlay */}
//       {otpSent && (
//         <div style={otpOverlay}>
//           <div style={otpBox}>
//             <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Enter OTP</h3>
//             <p style={{ marginTop: 8, color: "#6B6B6B" }}>We sent an OTP to <strong>{form.email}</strong></p>

//             <input
//               value={otp}
//               onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
//               placeholder="123456"
//               style={{ width: "100%", padding: 12, fontSize: 18, borderRadius: 8, border: "1px solid #E4E7EB" }}
//             />
//             {otpError && <div style={{ color: "#b22222", marginTop: 8 }}>{otpError}</div>}

//             <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
//               <button onClick={handleVerifyOtp} disabled={verifyingOtp || loading} style={primaryBtn}>
//                 {verifyingOtp || loading ? "Verifying…" : "Verify & Signup"}
//               </button>

//               <button onClick={() => { setOtpSent(false); setOtp(""); setOtpError(""); }} style={ghostBtn}>Cancel</button>

//               <div style={{ marginLeft: "auto" }}>
//                 <button onClick={handleResend} disabled={resendCountdown > 0} style={ghostBtn}>
//                   {resendCountdown > 0 ? `Resend (${resendCountdown}s)` : "Resend OTP"}
//                 </button>
//               </div>
//             </div>

//             <div style={{ marginTop: 10, color: "#666" }}><small>Check spam if you don't see it.</small></div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ===== styles ===== */
// const rootStyle = {
//   minHeight: "100vh",
//   background: "#fff",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   padding: 18,
//   boxSizing: "border-box",
//   fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
// };

// const cardStyle = {
//   width: "100%",
//   maxWidth: 980,
//   background: "#F7F7FA",
//   borderRadius: 12,
//   padding: 16,
//   boxSizing: "border-box",
//   display: "flex",
//   gap: 70,
//   alignItems: "flex-start",
//   justifyContent: "center",
//   flexWrap: "wrap",
// };

// const formStyle = {
//   flex: `0 1 420px`,
//   maxWidth: 420,
//   minWidth: 280,
// };

// const heroColumn = {
//   flex: `0 1 340px`,
//   minWidth: 220,
//   display: "flex",
//   alignItems: "flex-start",
//   justifyContent: "center",
// };

// const heroBox = {
//   width: 500,
//   height: 620,
//   borderRadius: 18,
//   overflow: "hidden",
//   background: "#E8ECF8",
//   boxSizing: "border-box",
// };

// const inputStyle = {
//   width: "100%",
//   height: 40,
//   background: "#EAF6FE",
//   borderRadius: 8,
//   border: "1px solid #E4E4E4",
//   padding: "8px 12px",
//   boxSizing: "border-box",
//   marginTop: 6,
// };

// const fieldErrStyle = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const primaryBtn = { background: "#111", color: "#fff", border: "none", padding: "9px 14px", borderRadius: 8, cursor: "pointer", fontWeight: 800, height: 40 };
// const ghostBtn = { background: "#fff", border: "1px solid #E4E7EB", padding: "8px 12px", borderRadius: 8, cursor: "pointer" };
// const oauthBtn = { width: "100%", height: 42, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer", fontWeight: 700 };

// const eyeIconStyle = {
//   position: "absolute",
//   right: 12,
//   top: "75%",
//   transform: "translateY(-50%)",
//   border: "none",
//   background: "transparent",
//   padding: 4,
//   cursor: "pointer",
// };

// const otpOverlay = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 };
// const otpBox = { width: "min(520px,94%)", background: "#fff", padding: 16, borderRadius: 10, boxShadow: "0 12px 30px rgba(0,0,0,0.18)" };

// const fieldErrStyleSmall = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const fieldErrStyle2 = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const fieldErrStyle3 = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const fieldErrStyle4 = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const fieldErrStyle5 = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const fieldErrStyle6 = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const fieldErrStyle7 = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const fieldErrStyle8 = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const fieldErrStyle9 = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const fieldErrStyle10 = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const fieldErrStyle11 = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const fieldErrStyle12 = { color: "#b22222", fontSize: 12, marginTop: 6 };



// //toast updated
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const HERO_IMAGE_URL = "/public/img/logsig.png";
// const EYE_ICON = "/public/img/eye.png";

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

//   const [fieldError, setFieldError] = useState({});
//   const [serverMsg, setServerMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   // OTP modal & flow state
//   const [otpSent, setOtpSent] = useState(false);
//   const [sendingOtp, setSendingOtp] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [otpError, setOtpError] = useState("");
//   const [verifyingOtp, setVerifyingOtp] = useState(false);
//   const [resendCountdown, setResendCountdown] = useState(0);

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

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
//     if (!form.password || form.password.length < 6) fe.password = "Password must be at least 6 characters";
//     if (form.password !== form.confirm_password) fe.password = "Passwords do not match";
//     if (!phoneRegex.test(form.phone)) fe.phone = "Phone must be 10 digits and start with 6-9.";
//     setFieldError(fe);
//     return Object.keys(fe).length === 0;
//   };

//   // Step 1: Send OTP to email (Continue button)
//   const handleSendOtp = async (e) => {
//     e && e.preventDefault();
//     setServerMsg("");
//     setOtpError("");
//     if (!validateForm()) {
//       toast.error("Please fix the highlighted fields before continuing.");
//       return;
//     }

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
//         const msg = data?.error || data?.message || `Failed to send OTP (${res.status})`;
//         setServerMsg(msg);
//         toast.error(msg);
//         return;
//       }

//       setOtpSent(true);
//       setResendCountdown(60);
//       setServerMsg("OTP sent to your email. Check inbox (and spam).");
//       toast.info("OTP sent — check your email (and spam).");
//     } catch (err) {
//       console.error("sendOtp error:", err);
//       setSendingOtp(false);
//       setServerMsg("Network error while sending OTP. Try again.");
//       toast.error("Network error while sending OTP. Try again.");
//     }
//   };

//   // Step 2: Verify OTP, then complete signup
//   const handleVerifyOtp = async () => {
//     setOtpError("");
//     setServerMsg("");
//     if (!otp || otp.length < 4) {
//       setOtpError("Enter the OTP you received.");
//       toast.error("Enter the OTP you received.");
//       return;
//     }

//     setVerifyingOtp(true);
//     try {
//       const vres = await fetch("http://localhost:5000/api/otp/verify", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: form.email, otp: otp.trim() }),
//       });
//       const vdata = await vres.json().catch(() => ({}));
//       setVerifyingOtp(false);

//       if (!vres.ok) {
//         const msg = vdata?.error || vdata?.message || `OTP verify failed (${vres.status})`;
//         setOtpError(msg);
//         toast.error(msg);
//         return;
//       }

//       // OTP verified -> notify and create user
//       toast.success("OTP verified — creating your account...");
//       await completeSignup();
//     } catch (err) {
//       console.error("verifyOtp error:", err);
//       setVerifyingOtp(false);
//       setOtpError("Server error — could not verify OTP.");
//       toast.error("Server error — could not verify OTP.");
//     }
//   };

//   const completeSignup = async () => {
//     setLoading(true);
//     setServerMsg("");
//     try {
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
//         const msg = sdata?.error || sdata?.message || `Signup failed (${sres.status})`;
//         setServerMsg(msg);
//         toast.error(msg);
//         return;
//       }

//       toast.success("Signup successful — welcome!");
//       if (sdata?.token) localStorage.setItem("egos_token", sdata.token);
//       if (sdata?.accessToken) localStorage.setItem("egos_token", sdata.accessToken);
//       if (sdata?.user) localStorage.setItem("egos_user", JSON.stringify(sdata.user));
//       else if (sdata?.userData) localStorage.setItem("egos_user", JSON.stringify(sdata.userData));

//       navigate("/");
//     } catch (err) {
//       console.error("completeSignup error:", err);
//       setLoading(false);
//       setServerMsg("Network error during signup.");
//       toast.error("Network error during signup. Try again.");
//     }
//   };

//   const handleResend = async () => {
//     if (resendCountdown > 0) return;
//     setServerMsg("");
//     setOtpError("");
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
//         const msg = data?.error || data?.message || `Resend failed (${res.status})`;
//         setServerMsg(msg);
//         toast.error(msg);
//         return;
//       }

//       setResendCountdown(60);
//       setServerMsg("OTP resent to your email.");
//       toast.info("OTP resent — check your email.");
//     } catch (err) {
//       console.error("resend error:", err);
//       setSendingOtp(false);
//       setServerMsg("Network error while resending OTP.");
//       toast.error("Network error while resending OTP.");
//     }
//   };

//   // OAuth placeholders (keeps previous behavior)
//   const handleOAuth = async (provider) => {
//     setServerMsg("");
//     const oauthUrl = `http://localhost:5000/api/auth/oauth/${provider.toLowerCase()}`;
//     try {
//       const w = window.open(oauthUrl, "_blank", "noopener,noreferrer");
//       if (!w || w.closed || typeof w.closed === "undefined") {
//         throw new Error("popup-blocked");
//       }
//       setServerMsg(`If a new window opened, complete ${provider} sign-in there.`);
//       toast.info(`Complete ${provider} sign-in in the popup.`);
//     } catch (err) {
//       const email = window.prompt(`Enter ${provider} email to simulate ${provider} sign-in:`);
//       if (!email) {
//         setServerMsg(`${provider} sign-in cancelled.`);
//         toast.info(`${provider} sign-in cancelled.`);
//         return;
//       }
//       const fakeUser = { first_name: email.split("@")[0], email, role: "user" };
//       localStorage.setItem("egos_token", `oauth-${provider}-${Date.now()}`);
//       localStorage.setItem("egos_user", JSON.stringify(fakeUser));
//       toast.success(`${provider} sign-in simulated — logged in`);
//       navigate("/");
//     }
//   };

//   return (
//     <div style={rootStyle}>
//       <div style={cardStyle}>
//         <div style={formStyle}>
//           <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900, color: "#0b1221" }}>Create your account</h1>
//           <p style={{ marginTop: 6, marginBottom: 12, color: "#6B6B6B" }}>Create your <strong style={{ color: "#000" }}>2EGOS</strong> account</p>

//           {serverMsg && <div style={{ padding: 8, borderRadius: 8, background: serverMsg.toLowerCase().includes("otp") ? "#ecfdf5" : "#fff1f2", color: serverMsg.toLowerCase().includes("otp") ? "#064e3b" : "#b22222", marginBottom: 10 }}>{serverMsg}</div>}

//           <form onSubmit={handleSendOtp} style={{ marginTop: 14 }}>
//             <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//               <div style={{ flex: 1, minWidth: 120 }}>
//                 <label style={{ fontSize: 12 }}>First name</label>
//                 <input name="first_name" value={form.first_name} onChange={handleChange} required style={inputStyle} />
//                 {fieldError.first_name && <div style={fieldErrStyle}>{fieldError.first_name}</div>}
//               </div>

//               <div style={{ flex: 1, minWidth: 120 }}>
//                 <label style={{ fontSize: 12 }}>Middle name <span style={{ color: "#9AA4B2" }}>(optional)</span></label>
//                 <input name="middle_name" value={form.middle_name} onChange={handleChange} style={inputStyle} />
//               </div>
//             </div>

//             <div style={{ marginTop: 10 }}>
//               <label style={{ fontSize: 12 }}>Last name</label>
//               <input name="last_name" value={form.last_name} onChange={handleChange} required style={inputStyle} />
//               {fieldError.last_name && <div style={fieldErrStyle}>{fieldError.last_name}</div>}
//             </div>

//             <div style={{ marginTop: 10 }}>
//               <label style={{ fontSize: 12 }}>E-Mail</label>
//               <input name="email" value={form.email} onChange={handleChange} required style={inputStyle} />
//               {fieldError.email && <div style={fieldErrStyle}>{fieldError.email}</div>}
//             </div>

//             <div style={{ marginTop: 10, position: "relative" }}>
//               <label style={{ fontSize: 12 }}>Create password</label>
//               <input name="password" value={form.password} onChange={handleChange} required type={showPassword ? "text" : "password"} style={{ ...inputStyle, paddingRight: 44 }} />
//               <button type="button" onClick={() => setShowPassword(s => !s)} style={eyeIconStyle} aria-label="toggle password">
//                 <img src={EYE_ICON} alt="eye" style={{ width: 18, height: 18 }} />
//               </button>
//             </div>

//             <div style={{ marginTop: 10, position: "relative" }}>
//               <label style={{ fontSize: 12 }}>Confirm password</label>
//               <input name="confirm_password" value={form.confirm_password} onChange={handleChange} required type={showConfirm ? "text" : "password"} style={{ ...inputStyle, paddingRight: 44 }} />
//               <button type="button" onClick={() => setShowConfirm(s => !s)} style={eyeIconStyle} aria-label="toggle confirm">
//                 <img src={EYE_ICON} alt="eye" style={{ width: 18, height: 18 }} />
//               </button>
//               {fieldError.password && <div style={fieldErrStyle}>{fieldError.password}</div>}
//             </div>

//             <div style={{ marginTop: 10 }}>
//               <label style={{ fontSize: 12 }}>Phone number</label>
//               <input name="phone" value={form.phone} onChange={handleChange} inputMode="numeric" placeholder="9876543210" required style={inputStyle} />
//               {fieldError.phone && <div style={fieldErrStyle}>{fieldError.phone}</div>}
//             </div>

//             <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
//               <button type="submit" disabled={sendingOtp || loading} style={primaryBtn}>
//                 {sendingOtp ? "Sending…" : "Continue"}
//               </button>

//               <div style={{ marginLeft: "auto" }} />
//             </div>
//           </form>

//           <p style={{ marginTop: 12 }}>Already have an account? <Link to="/login" style={{ color: "#2563EB", fontWeight: 700 }}>Sign in</Link></p>

//           <div style={{ marginTop: 12 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
//               <div style={{ flex: 1, height: 1, background: "#E6E9EE" }} />
//               <div style={{ fontSize: 11, color: "#9AA4B2" }}>or sign up with</div>
//               <div style={{ flex: 1, height: 1, background: "#E6E9EE" }} />
//             </div>

//             <button style={{ ...oauthBtn, background: "#000", color: "#fff" }} onClick={() => handleOAuth("Apple")}>
//               <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png" alt="apple" style={{ width: 16, height: 16 }} /> Signup with Apple
//             </button>

//             <button style={{ ...oauthBtn, background: "#fff", border: "1px solid #E4E7EB", color: "#111", marginTop: 10 }} onClick={() => handleOAuth("Google")}>
//               <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="google" style={{ width: 16, height: 16 }} /> Signup with Google
//             </button>
//           </div>
//         </div>

//         <div style={heroColumn}>
//           <div style={heroBox}>
//             <img src={HERO_IMAGE_URL} alt="hero" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//           </div>
//         </div>
//       </div>

//       {/* OTP modal overlay */}
//       {otpSent && (
//         <div style={otpOverlay}>
//           <div style={otpBox}>
//             <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Enter OTP</h3>
//             <p style={{ marginTop: 8, color: "#6B6B6B" }}>We sent an OTP to <strong>{form.email}</strong></p>

//             <input
//               value={otp}
//               onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
//               placeholder="123456"
//               style={{ width: "100%", padding: 12, fontSize: 18, borderRadius: 8, border: "1px solid #E4E7EB" }}
//             />
//             {otpError && <div style={{ color: "#b22222", marginTop: 8 }}>{otpError}</div>}

//             <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
//               <button onClick={handleVerifyOtp} disabled={verifyingOtp || loading} style={primaryBtn}>
//                 {verifyingOtp || loading ? "Verifying…" : "Verify & Signup"}
//               </button>

//               <button onClick={() => { setOtpSent(false); setOtp(""); setOtpError(""); }} style={ghostBtn}>Cancel</button>

//               <div style={{ marginLeft: "auto" }}>
//                 <button onClick={handleResend} disabled={resendCountdown > 0} style={ghostBtn}>
//                   {resendCountdown > 0 ? `Resend (${resendCountdown}s)` : "Resend OTP"}
//                 </button>
//               </div>
//             </div>

//             <div style={{ marginTop: 10, color: "#666" }}><small>Check spam if you don't see it.</small></div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ===== styles ===== */
// const rootStyle = {
//   minHeight: "100vh",
//   background: "#fff",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   padding: 18,
//   boxSizing: "border-box",
//   fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
// };

// const cardStyle = {
//   width: "100%",
//   maxWidth: 980,
//   background: "#F7F7FA",
//   borderRadius: 12,
//   padding: 16,
//   boxSizing: "border-box",
//   display: "flex",
//   gap: 70,
//   alignItems: "flex-start",
//   justifyContent: "center",
//   flexWrap: "wrap",
// };

// const formStyle = {
//   flex: `0 1 420px`,
//   maxWidth: 420,
//   minWidth: 280,
// };

// const heroColumn = {
//   flex: `0 1 340px`,
//   minWidth: 220,
//   display: "flex",
//   alignItems: "flex-start",
//   justifyContent: "center",
// };

// const heroBox = {
//   width: 500,
//   height: 620,
//   borderRadius: 18,
//   overflow: "hidden",
//   background: "#E8ECF8",
//   boxSizing: "border-box",
// };

// const inputStyle = {
//   width: "100%",
//   height: 40,
//   background: "#EAF6FE",
//   borderRadius: 8,
//   border: "1px solid #E4E4E4",
//   padding: "8px 12px",
//   boxSizing: "border-box",
//   marginTop: 6,
// };

// const fieldErrStyle = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const primaryBtn = { background: "#111", color: "#fff", border: "none", padding: "9px 14px", borderRadius: 8, cursor: "pointer", fontWeight: 800, height: 40 };
// const ghostBtn = { background: "#fff", border: "1px solid #E4E7EB", padding: "8px 12px", borderRadius: 8, cursor: "pointer" };
// const oauthBtn = { width: "100%", height: 42, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer", fontWeight: 700 };

// const eyeIconStyle = {
//   position: "absolute",
//   right: 12,
//   top: "75%",
//   transform: "translateY(-50%)",
//   border: "none",
//   background: "transparent",
//   padding: 4,
//   cursor: "pointer",
// };

// const otpOverlay = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 };
// const otpBox = { width: "min(520px,94%)", background: "#fff", padding: 16, borderRadius: 10, boxShadow: "0 12px 30px rgba(0,0,0,0.18)" };

// const fieldErrStyleSmall = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const fieldErrStyle2 = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const fieldErrStyle3 = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const fieldErrStyle4 = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const fieldErrStyle5 = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const fieldErrStyle6 = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const fieldErrStyle7 = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const fieldErrStyle8 = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const fieldErrStyle9 = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const fieldErrStyle10 = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const fieldErrStyle11 = { color: "#b22222", fontSize: 12, marginTop: 6 };

// const fieldErrStyle12 = { color: "#b22222", fontSize: 12, marginTop: 6 };




//google updated
// src/Component/login/SignupPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { openOAuthPopup } from "../../utils/oauthPopup";

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
    if (!validateForm()) {
      toast.error("Please fix the highlighted fields before continuing.");
      return;
    }

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
        const msg = data?.error || data?.message || `Failed to send OTP (${res.status})`;
        setServerMsg(msg);
        toast.error(msg);
        return;
      }

      setOtpSent(true);
      setResendCountdown(60);
      setServerMsg("OTP sent to your email. Check inbox (and spam).");
      toast.info("OTP sent — check your email (and spam).");
    } catch (err) {
      console.error("sendOtp error:", err);
      setSendingOtp(false);
      setServerMsg("Network error while sending OTP. Try again.");
      toast.error("Network error while sending OTP. Try again.");
    }
  };

  // Step 2: Verify OTP, then complete signup
  const handleVerifyOtp = async () => {
    setOtpError("");
    setServerMsg("");
    if (!otp || otp.length < 4) {
      setOtpError("Enter the OTP you received.");
      toast.error("Enter the OTP you received.");
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
        const msg = vdata?.error || vdata?.message || `OTP verify failed (${vres.status})`;
        setOtpError(msg);
        toast.error(msg);
        return;
      }

      // OTP verified -> notify and create user
      toast.success("OTP verified — creating your account...");
      await completeSignup();
    } catch (err) {
      console.error("verifyOtp error:", err);
      setVerifyingOtp(false);
      setOtpError("Server error — could not verify OTP.");
      toast.error("Server error — could not verify OTP.");
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
        const msg = sdata?.error || sdata?.message || `Signup failed (${sres.status})`;
        setServerMsg(msg);
        toast.error(msg);
        return;
      }

      toast.success("Signup successful — welcome!");
      if (sdata?.token) localStorage.setItem("egos_token", sdata.token);
      if (sdata?.accessToken) localStorage.setItem("egos_token", sdata.accessToken);
      if (sdata?.user) localStorage.setItem("egos_user", JSON.stringify(sdata.user));
      else if (sdata?.userData) localStorage.setItem("egos_user", JSON.stringify(sdata.userData));

      navigate("/");
    } catch (err) {
      console.error("completeSignup error:", err);
      setLoading(false);
      setServerMsg("Network error during signup.");
      toast.error("Network error during signup. Try again.");
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
        const msg = data?.error || data?.message || `Resend failed (${res.status})`;
        setServerMsg(msg);
        toast.error(msg);
        return;
      }

      setResendCountdown(60);
      setServerMsg("OTP resent to your email.");
      toast.info("OTP resent — check your email.");
    } catch (err) {
      console.error("resend error:", err);
      setSendingOtp(false);
      setServerMsg("Network error while resending OTP.");
      toast.error("Network error while resending OTP.");
    }
  };

  // OAuth handler using openOAuthPopup helper
  const handleOAuth = async (provider) => {
    const providerLower = provider.toLowerCase();
    const oauthUrl = `http://localhost:5000/api/auth/${providerLower}?returnTo=/`;
    toast.info(`Opening ${provider} sign-in...`);

    try {
      const payload = await openOAuthPopup(oauthUrl);

      if (!payload) {
        toast.error(`${provider} sign-in failed (no payload).`);
        return;
      }

      const token = payload.token || (payload.payload && payload.payload.token);
      const user = payload.user || (payload.payload && payload.payload.user);

      if (token) {
        localStorage.setItem("egos_token", token);
        if (user) localStorage.setItem("egos_user", JSON.stringify(user));
        toast.success(`${provider} sign-in successful`);
        const returnTo = (payload.returnTo) || "/";
        navigate(returnTo);
      } else {
        toast.error(`${provider} sign-in failed (no token)`);
      }
    } catch (err) {
      console.error(`${provider} OAuth error:`, err);
      if (err?.message === "popup-blocked") toast.error("Popup blocked. Allow popups for this site.");
      else if (err?.message === "timeout") toast.error("OAuth timed out. Try again.");
      else if (err?.message === "popup-closed") toast.info("OAuth popup closed.");
      else toast.error(`${provider} sign-in error — check console.`);
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
