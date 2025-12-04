import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t">
      {/* 🔴 Top red strip */}
      <div className="w-full bg-red-600 text-white text-xs py-2 flex flex-wrap justify-center gap-10">
        <span>FREE SHIPPING WORLDWIDE</span>
        <span>FREE SHIPPING WORLDWIDE</span>
        <span>FREE SHIPPING WORLDWIDE</span>
        <span>FREE SHIPPING WORLDWIDE</span>
        <span>FREE SHIPPING WORLDWIDE</span>
      </div>

      {/* Main Footer Content */}
      <div className="w-full px-10 py-12 flex flex-col items-center lg:flex-row lg:justify-between">
        {/* Logo + Copyright */}
        <div className="text-center lg:text-left mb-8 lg:mb-0">
          <img
            src="../../../public/img/logo.png" // change to your actual logo path
            alt="Brand Logo"
            className="h-16 mx-auto lg:mx-0"
          />
          <p className="text-xs text-gray-600 mt-4">
            © 2025 26GOS RETAIL PRIVATE LIMITED. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex gap-24">
          {/* Column 1 */}
          <ul className="text-sm space-y-2">
            <li>
              <a href="#" className="hover:underline">
                HELP
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                MEMBERS LOGIN
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                PLACE AN EXCHANGE/RETURN REQUEST
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                EXCHANGE/RETURNS POLICY
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                TERMS
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                SHIPPING
              </a>
            </li>
          </ul>

          {/* Column 2 */}
          <ul className="text-sm space-y-2">
            <li>
              <a href="#" className="hover:underline">
                COMPANY
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                STORY
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                CAREERS
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                CONTACT US
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                COLLABORATIONS
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Black Bottom Bar */}
      <div className="w-full bg-black text-white px-10 py-3 flex justify-between items-center">
        <span className="text-xs tracking-wide">CONTACT</span>

        <div className="flex gap-4 text-lg">
          <a href="#" className="hover:text-gray-400">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-gray-400">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
