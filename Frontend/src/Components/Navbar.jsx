import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 glass-card mx-2 sm:mx-4 my-2 sm:my-4 rounded-2xl border border-white/10">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-lg sm:text-xl">U</span>
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-white hidden sm:block">
              URL<span className="text-primary">Shortner</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <Link
            to="/login"
            className="text-sm font-semibold text-muted hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 text-sm font-semibold text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all duration-300"
          >
            Sign Up
          </Link>
          <div className="w-[1px] h-6 bg-white/10 mx-2"></div>
          <Link
            to="/urlshortner"
            className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary/25 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Short URL
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <Link
            to="/urlshortner"
            className="px-3 py-1.5 bg-primary text-white rounded-lg font-bold text-xs transition-all shadow-lg shadow-primary/25 active:scale-95"
          >
            Short URL
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-4 pb-6 md:hidden flex flex-col items-center gap-6 animate-fade-in">
          <Link
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-xl font-bold text-white hover:text-primary transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full max-w-xs text-center px-6 py-3 text-lg font-bold text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-primary/50 transition-all"
          >
            Sign Up
          </Link>
          <Link
            to="/urlshortner"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full max-w-xs text-center px-6 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/25"
          >
            Create Short URL
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
