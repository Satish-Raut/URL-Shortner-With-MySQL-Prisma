import React from "react";

const HomeAnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* --- CLOUDS --- */}
      {/* Anime Style Cloud 1 */}
      <div className="absolute top-[10%] left-[-15%] opacity-30 animate-drift-slow">
        <svg width="350" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.8 11.2C18.4 8.3 15.9 6 13 6C10.7 6 8.7 7.3 7.7 9.2C4.6 9.5 2 12.1 2 15C2 18.3 4.7 21 8 21H18C20.8 21 23 18.8 23 16C23 13.5 21.2 11.5 18.8 11.2Z" fill="url(#homeCloud1)" filter="url(#glowHome1)"/>
          <defs>
            <linearGradient id="homeCloud1" x1="12" y1="6" x2="12" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366f1"/>
              <stop offset="1" stopColor="#a855f7"/>
            </linearGradient>
            <filter id="glowHome1" x="-2" y="-2" width="28" height="28" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
            </filter>
          </defs>
        </svg>
      </div>

      {/* Anime Style Cloud 2 */}
      <div className="absolute top-[50%] right-[-20%] opacity-20 animate-drift-slower">
        <svg width="400" height="250" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1]">
          <path d="M18.8 11.2C18.4 8.3 15.9 6 13 6C10.7 6 8.7 7.3 7.7 9.2C4.6 9.5 2 12.1 2 15C2 18.3 4.7 21 8 21H18C20.8 21 23 18.8 23 16C23 13.5 21.2 11.5 18.8 11.2Z" fill="url(#homeCloud2)" filter="url(#glowHome2)"/>
          <defs>
            <linearGradient id="homeCloud2" x1="12" y1="6" x2="12" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ec4899"/>
              <stop offset="1" stopColor="#8b5cf6"/>
            </linearGradient>
            <filter id="glowHome2" x="-2" y="-2" width="28" height="28" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur"/>
            </filter>
          </defs>
        </svg>
      </div>

      {/* Anime Style Cloud 3 - Lower */}
      <div className="absolute bottom-[5%] left-[20%] opacity-15 animate-drift-slow" style={{ animationDelay: '-15s' }}>
        <svg width="250" height="150" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.8 11.2C18.4 8.3 15.9 6 13 6C10.7 6 8.7 7.3 7.7 9.2C4.6 9.5 2 12.1 2 15C2 18.3 4.7 21 8 21H18C20.8 21 23 18.8 23 16C23 13.5 21.2 11.5 18.8 11.2Z" fill="url(#homeCloud3)"/>
          <defs>
            <linearGradient id="homeCloud3" x1="12" y1="6" x2="12" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3b82f6"/>
              <stop offset="1" stopColor="#6366f1"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* --- FLIGHTS --- */}
      {/* Fast Rocket */}
      <div className="absolute top-[80%] left-[-10%] opacity-50 animate-fly-diagonal" style={{ animationDuration: '12s' }}>
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-45 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">
          <path d="M12 2C12 2 16 6 16 12C16 14 17 16 19 17L12 22L5 17C7 16 8 14 8 12C8 6 12 2 12 2Z" fill="url(#homeRocket1)"/>
          <path d="M12 22L14 26H10L12 22Z" fill="#fde047">
             <animate attributeName="opacity" values="1;0.4;1" dur="0.1s" repeatCount="indefinite" />
          </path>
          <defs>
            <linearGradient id="homeRocket1" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ec4899"/>
              <stop offset="1" stopColor="#fb923c"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Airplane Silhouette */}
      <div className="absolute top-[25%] left-[-15%] opacity-30 animate-fly-across" style={{ animationDuration: '30s', animationDelay: '5s' }}>
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-90 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">
          <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="#a5b4fc"/>
        </svg>
      </div>

      {/* Small Rocket */}
      <div className="absolute top-[40%] right-[-10%] opacity-40 animate-fly-diagonal-reverse" style={{ animationDuration: '18s', animationDelay: '8s' }}>
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -rotate-45 drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]">
          <path d="M12 2C12 2 16 6 16 12C16 14 17 16 19 17L12 22L5 17C7 16 8 14 8 12C8 6 12 2 12 2Z" fill="url(#homeRocket2)"/>
          <path d="M12 22L14 26H10L12 22Z" fill="#38bdf8">
             <animate attributeName="opacity" values="1;0.3;1" dur="0.15s" repeatCount="indefinite" />
          </path>
          <defs>
            <linearGradient id="homeRocket2" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8b5cf6"/>
              <stop offset="1" stopColor="#3b82f6"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* --- DIGITAL URL DESIGNS --- */}
      {/* Network Nodes */}
      <div className="absolute top-[18%] right-[15%] w-full max-w-sm opacity-20">
        <svg viewBox="0 0 200 200" className="w-full h-full animate-pulse-slow">
          <circle cx="50" cy="50" r="4" fill="#38bdf8" />
          <circle cx="150" cy="80" r="6" fill="#ec4899" />
          <circle cx="90" cy="160" r="5" fill="#a855f7" />
          <line x1="50" y1="50" x2="150" y2="80" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 2" />
          <line x1="150" y1="80" x2="90" y2="160" stroke="#ec4899" strokeWidth="1" strokeDasharray="4 2" />
          <line x1="90" y1="160" x2="50" y2="50" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4 2" />
          {/* Moving packets along the line */}
          <circle cx="50" cy="50" r="2" fill="#fff">
            <animate attributeName="cx" values="50;150;50" dur="4s" repeatCount="indefinite" />
            <animate attributeName="cy" values="50;80;50" dur="4s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      
      {/* Digital Text Elements */}
      <div className="absolute top-[70%] left-[10%] text-primary/20 font-mono text-xl font-bold tracking-widest transform -rotate-12 animate-float">
        {'<url>'} <span className="text-secondary/20">{'short'}</span> {'</url>'}
      </div>
      
      <div className="absolute top-[30%] right-[30%] text-accent/20 font-mono text-2xl font-black transform rotate-6 animate-float-delayed">
        https://...
      </div>
      
      <div className="absolute bottom-[20%] right-[15%] text-white/5 font-mono text-6xl font-black rotate-90 animate-pulse-slow">
        {'<'} / {'>'}
      </div>

      {/* Floating particles */}
      <div className="absolute top-[20%] left-[20%] w-2 h-2 rounded-full bg-primary/40 shadow-[0_0_10px_var(--primary)] animate-float"></div>
      <div className="absolute top-[80%] right-[25%] w-3 h-3 rounded-full bg-secondary/30 shadow-[0_0_15px_var(--secondary)] animate-float-delayed"></div>
      <div className="absolute bottom-[10%] left-[40%] w-1.5 h-1.5 rounded-full bg-accent/50 shadow-[0_0_12px_var(--accent)] animate-float"></div>
      <div className="absolute top-[40%] left-[50%] w-1 h-1 rounded-full bg-white/30 shadow-[0_0_8px_white] animate-float-delayed"></div>
    </div>
  );
};

export default HomeAnimatedBackground;
