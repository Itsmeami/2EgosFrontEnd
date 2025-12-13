


import React from "react";
import Navbar from "./Component/Layout/Navbar";
import Home from "./Component/Home/Home";
import LoginPage from "./Component/login/loginpage";
import SignupPage from "./Component/login/SignupPage";
import Products from "./Component/Cart/ProductList";
import Footer from "./Component/Layout/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import ForgotReset from "./Component/login/ForgotReset.jsx";
import ForgotVerify from "./Component/login/ForgotVerify.jsx";
import ForgotPassword from "./Component/login/ForgotPassword.jsx";

import AuthSuccess from "./pages/AuthSuccess.jsx";


function App() {
  const location = useLocation();
  const isLoginOrSignup = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="min-h-screen bg-gray-100">
      {!isLoginOrSignup && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Products />
            </>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/forgot/verify" element={<ForgotVerify/>} />
        <Route path="/forgot/reset" element={<ForgotReset />} />
         <Route path="/auth/success" element={<AuthSuccess/>} />
         

      </Routes>

      <Footer />
    </div>
  );
}

export default App;



