// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
    
//     <App />
//     </BrowserRouter>
//   </StrictMode>,
// )



//Toast notifications
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

// 🔥 react-toastify imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <App />

      {/* 🔥 Global toast container — required for showing toasts */}
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />

    </BrowserRouter>
  </StrictMode>,
);
