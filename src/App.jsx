


import React from "react";
import Navbar from "./Component/Layout/Navbar";
import Home from "./Component/Home/Home";
import LoginPage from "./Component/login/loginpage";
import SignupPage from "./Component/login/SignupPage";
import Products from "./Component/Cart/ProductList";
import Footer from "./Component/Layout/Footer";
import { Routes, Route, useLocation } from "react-router-dom";

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
      </Routes>

      <Footer />
    </div>
  );
}

export default App;



