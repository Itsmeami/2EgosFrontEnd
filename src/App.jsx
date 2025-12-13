import React from "react";
import Navbar from "./Component/Layout/Navbar";
import Home from "./Component/Home/Home";
import LoginPage from "./Component/login/LoginPage";
import SignupPage from "./Component/login/SignupPage";
import Products from "./Component/Cart/ProductList";
import Footer from "./Component/Layout/Footer";
import { Routes, Route, useLocation } from "react-router-dom";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
};

function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {isAuthPage ? (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
      ) : (
        <MainLayout>
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
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </MainLayout>
      )}
    </>
  );
}

export default App;
