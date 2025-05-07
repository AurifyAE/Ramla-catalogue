import React, { useState, useEffect } from "react";
import { Search, Phone, Mail, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import textName from "../assets/text.png";

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search page with query parameter
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      // Reset search query
      setSearchQuery("");
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top bar */}
      <div className="bg-black text-white px-4 md:px-16 py-3 flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-center md:text-left mb-2 md:mb-0">
          Get it stitched within{" "}
          <span className="font-semibold text-[#FFF3C4]">24 Hours</span>
        </div>
        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="flex items-center space-x-1">
            <Phone size={16} />
            <span className="text-sm">+971 56 178 2089</span>
          </div>
          <div className="flex items-center space-x-1">
            <Mail size={16} />
            <span className="text-sm">info@ramlasuits.com</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-white px-4 md:px-16 py-3 flex justify-between items-center border-b relative">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex flex-row">
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="w-10 md:w-14" />
            </div>
            <div className="flex items-center">
              <h2 className="ml-3 text-lg md:text-2xl lg:text-3xl font-montaga">
                Ramla Style Italia
              </h2>
            </div>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button onClick={toggleMenu} className="p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center">
          <ul className="flex space-x-4 lg:space-x-8">
            <li>
              <a href="/" className="px-1 py-2 text-sm lg:text-md font-medium">
                Home
              </a>
            </li>
            <li>
              <a
                href="/beposke"
                className="px-1 py-2 text-sm lg:text-md font-medium"
              >
                Bespoke Process
              </a>
            </li>
            <li>
              <a
                href="/catalogue"
                className="px-1 py-2 text-sm lg:text-md font-medium"
              >
                Catalogue
              </a>
            </li>
            <li>
              <a
                href="/get-in-touch"
                className="px-1 py-2 text-sm lg:text-md font-medium"
              >
                Get in Touch
              </a>
            </li>
          </ul>
        </nav>

        {/* Search Bar - Desktop (Always visible, replacing Heart icon) */}
        <div className="hidden md:flex items-center">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-48 py-1 px-4 border border-gray-300 rounded-l focus:outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-black text-white p-2 rounded-r">
              <Search size={14} />
            </button>
          </form>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 z-10 md:hidden bg-white border-b">
            <nav className="px-4 py-3">
              <ul className="flex flex-col space-y-3">
                <li>
                  <a href="/" className="block px-1 py-2 text-md font-medium">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/beposke"
                    className="block px-1 py-2 text-md font-medium"
                  >
                    Bespoke Process
                  </a>
                </li>
                <li>
                  <a
                    href="/catalogue"
                    className="block px-1 py-2 text-md font-medium"
                  >
                    Catalogue
                  </a>
                </li>
                <li>
                  <a
                    href="/get-in-touch"
                    className="block px-1 py-2 text-md font-medium"
                  >
                    Get in Touch
                  </a>
                </li>
              </ul>

              {/* Search in mobile menu */}
              <div className="mt-4">
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-60 p-2 border border-gray-300 rounded-l focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-black text-white p-2 rounded-r"
                  >
                    <Search size={25} />
                  </button>
                </form>
              </div>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
