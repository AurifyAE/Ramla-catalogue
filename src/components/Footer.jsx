import React from "react";
import { useLocation } from "react-router-dom";
import ContactForm from "./ContactForm";
import logo from "../assets/logoWhite.png";
import textName from "../assets/textWhite.png";

const Footer = () => {
  const location = useLocation();
  const hideContactSection =
    location.pathname === "/get-in-touch";

  return (
    <footer className="bg-black text-white">
      <div className="flex flex-col lg:flex-row">
        {/* Left Section - Contact Form */}
        {!hideContactSection && (
          <div className="w-full lg:w-1/2 p-6 md:p-12 lg:px-24 lg:py-16">
            <h1 className="text-xl font-semibold mb-6 font-poppins">
              Contact Us
            </h1>
            <ContactForm />
          </div>
        )}

        {/* Right Section - Company Info */}
        <div
          className={`p-6 md:p-12 lg:px-24 lg:py-16 flex flex-col justify-center items-center ${
            hideContactSection
              ? "w-full min-h-[400px]"
              : "w-full lg:w-1/2 border-t lg:border-t-0 lg:border-l border-gray-800"
          }`}
        >
          <div className="max-w-md text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center">
                <img src={logo} alt="Logo" className="w-10" />
                <span className="ml-2 text-2xl font-montaga">
                  Ramla Style Italia
                </span>
              </div>
            </div>

            <p className="mb-8 text-sm text-center font-poppins">
              Ramla Suits specializes in custom-made suits, tuxedos, shirts, and
              traditional attire, crafted with premium fabrics and expert
              craftsmanship. We cater to professionals, tourists, and style-
              conscious individuals, offering luxury tailoring and accessories
              for a perfect fit and timeless elegance within 24 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom row with address, phone, and social media */}
      <div className="flex flex-col md:flex-row border-t border-b border-gray-800">
        {/* Left section - Address and Phone */}
        <div className="w-full md:w-1/2 py-4 px-6 md:px-16 lg:px-24 flex flex-col justify-between md:flex-row md:items-center">
          {/* Address */}
          <div className="flex items-center mb-4 md:mb-0 md:mr-8 text-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div className="flex flex-col font-poppins text-sm">
              <span>Near Fish Round About</span>
              <span>Al Muteena Street, Deira, Dubai</span>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center text-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>+971 4 265 2388</span>
          </div>
        </div>

        {/* Right section - Social Media Icons */}
        <div className="w-full md:w-1/2 py-6 px-6 md:px-16 flex justify-center border-t md:border-t-0 md:border-l border-gray-800">
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a
              href="https://t.me/yourusername"
              className="text-white hover:text-gray-300"
              aria-label="Telegram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22l-4-9L2 9l20-7z" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-2 text-center text-sm w-full mb-6 mt-4">
        © 2025 Ramla Style Italia | Design by 3RCreative
      </div>
    </footer>
  );
};

export default Footer;
