import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass-card mx-4 my-4 rounded-2xl border border-white/10">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <span className="text-white font-bold text-xl">U</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
            URL<span className="text-primary">Shortner</span>
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <Link
          to="/login"
          className="text-sm font-medium text-muted hover:text-white transition-colors hidden sm:block"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="text-sm font-medium text-muted hover:text-white transition-colors hidden sm:block"
        >
          Sign Up
        </Link>
        <Link
          to="/urlshortner"
          className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-primary/25 active:scale-95 cursor-pointer whitespace-nowrap"
        >
          Short URL
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
