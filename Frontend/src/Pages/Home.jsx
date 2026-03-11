import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Home;
