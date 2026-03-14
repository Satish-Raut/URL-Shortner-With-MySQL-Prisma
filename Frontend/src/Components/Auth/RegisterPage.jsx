import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AnimatedBackground from "./AnimatedBackground";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: ""
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Signing in...");

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await axios.post(`${API_URL}/register`, formData, {
        withCredentials: true,
      });   // Get the backend responce here

      if (response.data.success) {
        toast.success(response.data.message, { id: loadingToast });
        // Follow the backend's redirection command
        navigate(response.data.redirectTo || "/login");
      } else {
        toast.error(response.data.message || "Registration failed", {
          id: loadingToast,
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(
        error.response?.data?.message || "An error occurred during register",
        { id: loadingToast },
      );
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-32 pb-12 overflow-x-hidden relative">
      <AnimatedBackground />
      <div className="glass-card w-full max-w-5xl flex flex-col md:flex-row-reverse rounded-2xl shadow-2xl auth-card-entrance overflow-hidden">
        
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2 relative bg-primary/10">
          <img 
            src="/images/register-bg.png" 
            alt="Register Illustration" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent flex flex-col justify-end p-8 staggered-reveal [animation-delay:0.8s]">
             <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Join Us Today!</h2>
             <p className="text-white/80 drop-shadow-sm">Create an account to start managing your shortened URLs, tracking analytics, and more.</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center mb-10 staggered-reveal [animation-delay:0.1s]">
            <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
              Create <span className="text-gradient">Account</span>
            </h1>
            <p className="text-muted text-sm">
              It only takes a minute to get started.
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => handleSubmit(e)}>
            <div className="space-y-2 staggered-reveal [animation-delay:0.3s]">
              <label className="text-sm font-medium ml-1" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none placeholder:text-muted/50"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2 staggered-reveal [animation-delay:0.4s]">
              <label className="text-sm font-medium ml-1" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none placeholder:text-muted/50"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-2 staggered-reveal [animation-delay:0.5s]">
              <label className="text-sm font-medium ml-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none placeholder:text-muted/50"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div className="space-y-2 staggered-reveal [animation-delay:0.6s]">
              <label
                className="text-sm font-medium ml-1"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none placeholder:text-muted/50"
                required
                value={formData.confirm_password}
                onChange={(e) => setFormData({...formData, confirm_password: e.target.value})}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 mt-4 cursor-pointer staggered-reveal [animation-delay:0.7s]"
            >
              Create Account
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-muted staggered-reveal [animation-delay:0.8s]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
