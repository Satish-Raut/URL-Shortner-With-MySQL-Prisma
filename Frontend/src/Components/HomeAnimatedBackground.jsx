import React, { useEffect, useState } from "react";

const HomeAnimatedBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-[#020617] text-white">
      {/* Dynamic Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
          transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`
        }}
      />

      {/* Radial Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617] opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] opacity-90" />

      {/* Animated Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] animate-pulse-slow mix-blend-screen" style={{ animationDelay: '2s' }} />

      {/* --- DIGITAL URL DESIGNS --- */}
      
      {/* Hexagon Pattern Data Stream */}
      <div className="absolute top-[10%] right-[10%] opacity-20">
        <svg width="250" height="250" viewBox="0 0 100 100" className="animate-spin-slow origin-center">
          <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="none" stroke="#6366f1" strokeWidth="0.5" strokeDasharray="5 5" />
          <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" fill="none" stroke="#8b5cf6" strokeWidth="0.5" strokeDasharray="3 3">
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="-360 50 50" dur="30s" repeatCount="indefinite" />
          </polygon>
          <circle cx="50" cy="50" r="10" fill="none" stroke="#ec4899" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>
      </div>

      {/* Network Nodes representing URLs being processed */}
      <div className="absolute top-[35%] left-[5%] w-[400px] h-[400px] opacity-40 transform -rotate-12 scale-110">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">
          {/* Base lines */}
          <line x1="20" y1="100" x2="180" y2="100" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="100" y1="20" x2="100" y2="180" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />
          
          {/* Animated data packet representing long URL */}
          <rect x="20" y="96" width="30" height="8" rx="4" fill="#6366f1">
            <animate attributeName="x" values="0;80" dur="2.5s" fill="freeze" keyTimes="0;1" keySplines="0.4 0 0.2 1" calcMode="spline" repeatCount="indefinite" />
            <animate attributeName="width" values="40;8" dur="2.5s" fill="freeze" keyTimes="0;1" keySplines="0.4 0 0.2 1" calcMode="spline" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" dur="2.5s" keyTimes="0;0.2;0.8;1" repeatCount="indefinite" />
          </rect>
          
          {/* Processing Node Center */}
          <circle cx="100" cy="100" r="14" fill="#020617" stroke="#ec4899" strokeWidth="2" className="animate-pulse" />
          <circle cx="100" cy="100" r="6" fill="#ec4899" className="animate-ping" style={{ animationDuration: '2s' }} />
          <circle cx="100" cy="100" r="4" fill="#fff" />
          
          {/* Animated data packet representing short URL */}
          <circle cx="120" cy="100" r="4" fill="#38bdf8">
            <animate attributeName="cx" values="100;190" dur="2.5s" fill="freeze" keyTimes="0;1" keySplines="0.4 0 0.2 1" calcMode="spline" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" dur="2.5s" keyTimes="0;0.2;0.8;1" repeatCount="indefinite" />
          </circle>

          {/* Connected branching to top right */}
          <path d="M100 100 L140 60 L180 60" fill="none" stroke="#1e293b" strokeWidth="1" />
          {/* Connected branching to bottom right */}
          <path d="M100 100 L140 140 L180 140" fill="none" stroke="#1e293b" strokeWidth="1" />
          
          <circle cx="180" cy="60" r="2" fill="#8b5cf6" className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="180" cy="140" r="2" fill="#6366f1" className="animate-ping" style={{ animationDelay: '1.5s', animationDuration: '2s' }} />
        </svg>
      </div>
      
      {/* --- FLOATING URL CARDS --- */}
      
      {/* Top Right Animated URL */}
      <div className="absolute top-[15%] right-[10%] w-64 h-16 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md flex items-center px-4 gap-3 shadow-[0_4_20px_rgba(99,102,241,0.15)] animate-float" style={{ animationDuration: '8s' }}>
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="h-2 w-3/4 bg-white/20 rounded mb-2"></div>
          <div className="h-2 w-1/2 bg-primary/40 rounded"></div>
        </div>
        <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80] animate-pulse"></div>
      </div>

      {/* Bottom Left Animated URL */}
      <div className="absolute bottom-[20%] left-[8%] w-56 h-14 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md flex items-center px-3 gap-3 shadow-[0_4_20px_rgba(236,72,153,0.15)] animate-float-delayed" style={{ animationDuration: '10s', animationDelay: '1s' }}>
        <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="h-1.5 w-full bg-white/20 rounded mb-1.5"></div>
          <div className="h-1.5 w-2/3 bg-secondary/40 rounded"></div>
        </div>
      </div>
      
      {/* Tech UI Corner Brackets */}
      <div className="absolute top-10 left-10 w-12 h-12 border-t-[1px] border-l-[1px] border-primary/20" />
      <div className="absolute top-10 right-10 w-12 h-12 border-t-[1px] border-r-[1px] border-primary/20" />
      <div className="absolute bottom-10 left-10 w-12 h-12 border-b-[1px] border-l-[1px] border-primary/20" />
      <div className="absolute bottom-10 right-10 w-12 h-12 border-b-[1px] border-r-[1px] border-primary/20" />

      {/* Floating Particles */}
      <div className="absolute top-[20%] right-[20%] w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_var(--primary)] animate-float" />
      <div className="absolute bottom-[30%] left-[25%] w-2 h-2 bg-secondary rounded-full shadow-[0_0_12px_var(--secondary)] animate-float-delayed" />
      <div className="absolute top-[70%] left-[80%] w-1 h-1 bg-accent rounded-full shadow-[0_0_8px_var(--accent)] animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-[40%] left-[50%] w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_5px_white] animate-pulse-slow" />
    </div>
  );
};

export default HomeAnimatedBackground;
