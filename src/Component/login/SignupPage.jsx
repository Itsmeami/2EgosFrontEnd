// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const SignupPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
//       <div className="bg-white text-gray-500 max-w-96 w-full mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">

//         <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
//           Create your account
//         </h2>

//         {/* onSubmit prevents reload and navigates to home */}
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             navigate("/");
//           }}
//         >
//           <input
//             className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
//             type="text"
//             placeholder="Full Name"
//             required
//           />

//           <input
//             className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
//             type="email"
//             placeholder="Enter your email"
//             required
//           />

//           <input
//             className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
//             type="password"
//             placeholder="Create a password"
//             required
//           />

//           <button
//             type="submit"
//             className="w-full mb-3 bg-indigo-500 py-2.5 rounded-full text-white mt-4 cursor-pointer"
//           >
//             Sign up
//           </button>
//         </form>

//         <p className="text-center mt-4">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-500 underline">
//             Login
//           </Link>
//         </p>

//         <button
//           type="button"
//           className="w-full flex items-center gap-2 justify-center mt-5 bg-black py-2.5 rounded-full text-white"
//         >
//           <img
//             className="h-4 w-4"
//             src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png"
//             alt="appleLogo"
//           />
//           Sign up with Apple
//         </button>

//         <button
//           type="button"
//           className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800"
//         >
//           <img
//             className="h-4 w-4"
//             src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
//             alt="googleFavicon"
//           />
//           Sign up with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;




// src/Component/login/SignupPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: await res.text() };
      }
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-white text-gray-500 max-w-96 w-full mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Create your account</h2>

        {error && <div className="mb-3 p-2 rounded bg-red-100 text-red-800">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input name="first_name" value={form.first_name} onChange={handleChange} className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4" type="text" placeholder="First name" required />

          <input name="middle_name" value={form.middle_name} onChange={handleChange} className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4" type="text" placeholder="Middle name (optional)" />

          <input name="last_name" value={form.last_name} onChange={handleChange} className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4" type="text" placeholder="Last name" required />

          <input name="email" value={form.email} onChange={handleChange} className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4" type="email" placeholder="Enter your email" required />

          <div className="relative">
            <input name="password" value={form.password} onChange={handleChange} className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4 pr-10" type={showPassword ? "text" : "password"} placeholder="Create a password" required />
            <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 " aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <input name="phone" value={form.phone} onChange={handleChange} className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4" type="text" placeholder="Phone number" required />

          <button type="submit" disabled={loading} className="w-full mb-3 bg-indigo-500 py-2.5 rounded-full text-white cursor-pointer">{loading ? "Signing up..." : "Sign up"}</button>
        </form>

        <p className="text-center mt-4">Already have an account? <Link to="/login" className="text-blue-500 underline">Login</Link></p>

        <button type="button" onClick={() => handleOAuthSignup("Apple")} className="w-full flex items-center gap-2 justify-center mt-5 bg-black py-2.5 rounded-full text-white cursor-pointer">
          <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png" alt="appleLogo" /> Sign up with Apple
        </button>

        <button type="button" onClick={() => handleOAuthSignup("Google")} className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800 cursor-pointer">
          <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="googleFavicon" /> Sign up with Google
        </button>
      </div>
    </div>
  );
}
