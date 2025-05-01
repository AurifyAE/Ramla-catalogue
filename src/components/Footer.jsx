import React from "react";
import { useLocation } from "react-router-dom"; // ⬅️ import this
import ContactForm from "./ContactForm";
import logo from "../assets/logoWhite.png";
import textName from "../assets/textWhite.png";

const Footer = () => {
  const location = useLocation(); // ⬅️ get current path
  const hideContactSection =
    location.pathname === "/view-product" ||
    location.pathname === "/get-in-touch";

  return (
    <footer className="bg-black text-white">
      <div className="flex flex-col lg:flex-row px-6 md:px-12 lg:px-16">
        {/* Left Section - Contact Form */}

        <div className="w-full lg:w-2/3 p-6 md:p-12 lg:p-16 flex flex-col justify-center">
          {!hideContactSection && ( // ⬅️ hide based on route
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 md:mb-10 font-poppins">
                Contact Us
              </h1>
              <ContactForm />
            </div>
          )}

          <div className="mt-12 md:mt-16 flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div className="flex items-center mb-6 lg:mb-0 font-poppins text-sm md:text-base">
              <div className="mr-3">
                {/* Location Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8 md:w-10 md:h-10"
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
              </div>
              <div>
                <p>Wisconsin Ave, Suite 700</p>
                <p>Chevy Chase, Maryland 20815</p>
              </div>
            </div>

            <div className="flex items-center font-poppins text-sm md:text-base">
              <div className="mr-3">
                {/* Phone Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 md:w-8 md:h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <p>+1 800 854-36-80</p>
            </div>
          </div>
        </div>

        {/* Right Section - Company Info */}
        <div
          className={`w-full ${
            !hideContactSection ? "lg:w-1/3" : "lg:w-full"
          } p-6 md:p-12 lg:p-16 flex flex-col justify-center items-center ${
            !hideContactSection
              ? "border-t lg:border-t-0 lg:border-l border-gray-800"
              : ""
          }`}
        >
          <div className="max-w-md text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center">
                <img src={logo} alt="Logo" className="w-8 md:w-10" />
                <img
                  src={textName}
                  alt="Ramla Style Italia"
                  className="w-32 md:w-44 ml-2 md:ml-4"
                />
              </div>
            </div>

            <p className="mb-8 md:mb-10 text-sm md:text-base font-poppins">
              Ramla Suits specializes in custom-made suits, tuxedos, shirts, and
              traditional attire, crafted with premium fabrics and expert
              craftsmanship. We cater to professionals, tourists, and
              style-conscious individuals, offering luxury tailoring and
              accessories for a perfect fit and timeless elegance within 24
              hours.
            </p>

            <div className="flex justify-center space-x-6">
              <div className="flex justify-center space-x-6">
                <a href="#" className="text-white hover:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>

                <a href="#" className="text-white hover:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M22 4 12 14.01l-3-3"></path>
                    <path d="M22 4 15 20l-3-3"></path>
                    <path d="M2 20l10-10"></path>
                  </svg>
                </a>

                <a href="#" className="text-white hover:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
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
                    strokeWidth="2"
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
        </div>
      </div>

      {/* Copyright */}
      <div className="py-4 px-6 text-center text-xs md:text-sm w-full border-t border-gray-800 font-robotto">
        © 2025 All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
