// import React from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// const LoginPage = () => {
//     const navigate=useNavigate();
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
//       <div className="bg-white text-gray-500 max-w-96 w-full mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">

//         <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
//           Welcome back
//         </h2>

//         <form onSubmit={(e)=>{
//             e.preventDefault();
//             navigate("/");
//         }}>
//           <input
//             id="email"
//             className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
//             type="email"
//             placeholder="Enter your email"
//             required
//           />

//           <input
//             id="password"
//             className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
//             type="password"
//             placeholder="Enter your password"
//             required
//           />

//           <div className="text-right py-4">
//             <a className="text-blue-600 underline" href="#">
//               Forgot Password
//             </a>
//           </div>

//           <button
//             type="submit"
//             className="w-full mb-3 bg-indigo-500 py-2.5 rounded-full text-white cursor-pointer"
//           >
//             Log in
//           </button>
//         </form>

//         <p className="text-center mt-4">
//           Don’t have an account?{" "}
//           {/* <a href="#" className="text-blue-500 underline">
//             Signup
//           </a> */}
//           <Link to="/signup" className="text-blue-500 underline">Signup</Link>
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
//           Log in with Apple
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
//           Log in with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



// src/Component/login/LoginPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // attempt to parse JSON, but handle non-json responses
      let data;
      try {
        data = await res.json();
      } catch (parseErr) {
        const text = await res.text();
        data = { message: text || "No response body" };
      }

      setLoading(false);

      if (!res.ok) {
        // show backend message or generic
        const msg = data?.message || data?.error || `Server returned ${res.status}`;
        setError(msg);
        console.error("Login failed:", res.status, data);
        return;
      }

      // success - save token/user if present
      if (data.token) localStorage.setItem("egos_token", data.token);
      else if (data.accessToken) localStorage.setItem("egos_token", data.accessToken);

      if (data.user) localStorage.setItem("egos_user", JSON.stringify(data.user));
      else if (data.userData) localStorage.setItem("egos_user", JSON.stringify(data.userData));

      // navigate home
      navigate("/");
    } catch (err) {
      console.error("Login error (network):", err);
      setLoading(false);
      setError("Network error — check backend is running (see console).");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-white text-gray-500 max-w-96 w-full mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Welcome back</h2>

        {error && <div className="mb-3 p-2 rounded bg-red-100 text-red-800">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="email"
            placeholder="Enter your email"
            required
          />

          <div className="relative">
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4 pr-10"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
            />
            {/* eye button */}
            <button
              type="button"
              onClick={() => setShowPassword(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <div className="text-right py-4">
            <a className="text-blue-600 underline" href="#">Forgot Password</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mb-3 bg-indigo-500 py-2.5 rounded-full text-white cursor-pointer"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-center mt-4">
          Don’t have an account? <Link to="/signup" className="text-blue-500 underline">Signup</Link>
        </p>

        <button
          type="button"
          onClick={() => {
            const email = prompt("Enter Apple email to simulate OAuth:");
            if (!email) return;
            localStorage.setItem("egos_token", `oauth-apple-${Date.now()}`);
            localStorage.setItem("egos_user", JSON.stringify({ first_name: email.split("@")[0], email }));
            navigate("/");
          }}
          className="w-full flex items-center gap-2 justify-center mt-5 bg-black py-2.5 rounded-full text-white cursor-pointer"
        >
          <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png" alt="appleLogo" />
          Log in with Apple
        </button>

        <button
          type="button"
          onClick={() => {
            const email = prompt("Enter Google email to simulate OAuth:");
            if (!email) return;
            localStorage.setItem("egos_token", `oauth-google-${Date.now()}`);
            localStorage.setItem("egos_user", JSON.stringify({ first_name: email.split("@")[0], email }));
            navigate("/");
          }}
          className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800 cursor-pointer"
        >
          <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="googleFavicon" />
          Log in with Google
        </button>
      </div>
    </div>
  );
}
