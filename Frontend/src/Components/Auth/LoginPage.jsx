import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Signing in...");

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await axios.post(`${API_URL}/login`, formData);

      if (response.data.success) {
        toast.success(response.data.message, { id: loadingToast });
        // Follow the backend's redirection command
        navigate(response.data.redirectTo || "/");
      } else {
        toast.error(response.data.message || "Login failed", {
          id: loadingToast,
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(
        error.response?.data?.message || "An error occurred during login",
        { id: loadingToast },
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-32 pb-12 overflow-x-hidden">
      <div className="glass-card w-full max-w-md p-8 rounded-2xl shadow-2xl auth-card-entrance">
        <div className="text-center mb-10 staggered-reveal [animation-delay:0.2s]">
          <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
            Welcome <span className="text-gradient">Back!</span>
          </h1>
          <p className="text-muted text-sm">
            Please enter your details to sign in.
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) =>handleSubmit(e)}>
          <div className="space-y-2 staggered-reveal [animation-delay:0.4s]">
            <label className="text-sm font-medium ml-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none placeholder:text-muted/50"
              required
            />
          </div>

          <div className="space-y-2 staggered-reveal [animation-delay:0.5s]">
            <div className="flex items-center justify-between ml-1">
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <a
                href="#"
                className="text-xs text-primary hover:underline transition-colors"
              >
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none placeholder:text-muted/50"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 mt-4 cursor-pointer staggered-reveal [animation-delay:0.6s]"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-muted staggered-reveal [animation-delay:0.7s]">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-semibold hover:underline"
          >
            Register for free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
