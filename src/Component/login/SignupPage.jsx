import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-white text-gray-500 max-w-96 w-full mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">

        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Create your account
        </h2>

        {/* onSubmit prevents reload and navigates to home */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <input
            className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="text"
            placeholder="Full Name"
            required
          />

          <input
            className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="email"
            placeholder="Enter your email"
            required
          />

          <input
            className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="password"
            placeholder="Create a password"
            required
          />

          <button
            type="submit"
            className="w-full mb-3 bg-indigo-500 py-2.5 rounded-full text-white mt-4 cursor-pointer"
          >
            Sign up
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>

        <button
          type="button"
          className="w-full flex items-center gap-2 justify-center mt-5 bg-black py-2.5 rounded-full text-white"
        >
          <img
            className="h-4 w-4"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png"
            alt="appleLogo"
          />
          Sign up with Apple
        </button>

        <button
          type="button"
          className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800"
        >
          <img
            className="h-4 w-4"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
            alt="googleFavicon"
          />
          Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
