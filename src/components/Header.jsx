import React, { useState, useEffect } from "react";
import { Search, Heart, Phone, Mail, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import textName from "../assets/text.png";

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Close search bar
      setIsSearchOpen(false);
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
              <img
                src={textName}
                alt="Ramla Style Italia"
                className="w-40 md:w-56 ml-2 md:ml-6"
              />
            </div>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          {isSearchOpen ? (
            <button onClick={toggleSearch} className="p-2">
              <X size={24} />
            </button>
          ) : (
            <>
              <button onClick={toggleSearch} className="p-2 mr-2">
                <Search size={20} />
              </button>
              <button onClick={toggleMenu} className="p-2">
                <Menu size={24} />
              </button>
            </>
          )}
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

        {/* Icons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={toggleSearch} className="focus:outline-none">
            <Search size={20} />
          </button>
          <Heart size={20} />
        </div>

        {/* Search Bar - Appears when search icon is clicked */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white p-4 shadow-md z-10 border-t font-poppins">
            <form onSubmit={handleSearch} className="flex items-center justify-end">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full md:w-72 p-2 border border-gray-300 rounded-l focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="bg-black text-white p-2 rounded-r"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b">
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
            <div className="mt-4 flex items-center">
              <Heart size={20} />
              <span className="ml-2">Favorites</span>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}