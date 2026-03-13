import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-x-hidden">
      {/* Global Background Glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 -z-10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 -z-10 blur-[120px] rounded-full pointer-events-none" />

      <Navbar />
      <div className="relative z-10">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Home;
