import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Anime Style Cloud 1 */}
      <div className="absolute top-[15%] left-[-20%] opacity-40 animate-drift-slow">
        <svg width="250" height="150" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.8 11.2C18.4 8.3 15.9 6 13 6C10.7 6 8.7 7.3 7.7 9.2C4.6 9.5 2 12.1 2 15C2 18.3 4.7 21 8 21H18C20.8 21 23 18.8 23 16C23 13.5 21.2 11.5 18.8 11.2Z" fill="url(#cloudGrad1)" filter="url(#glow)"/>
          <defs>
            <linearGradient id="cloudGrad1" x1="12" y1="6" x2="12" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="#818cf8"/>
              <stop offset="1" stopColor="#c084fc"/>
            </linearGradient>
            <filter id="glow" x="-2" y="-2" width="28" height="28" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur"/>
            </filter>
          </defs>
        </svg>
      </div>

      {/* Anime Style Cloud 2 */}
      <div className="absolute top-[65%] right-[-20%] opacity-30 animate-drift-slower">
        <svg width="300" height="180" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1]">
          <path d="M18.8 11.2C18.4 8.3 15.9 6 13 6C10.7 6 8.7 7.3 7.7 9.2C4.6 9.5 2 12.1 2 15C2 18.3 4.7 21 8 21H18C20.8 21 23 18.8 23 16C23 13.5 21.2 11.5 18.8 11.2Z" fill="url(#cloudGrad2)" filter="url(#glow2)"/>
          <defs>
            <linearGradient id="cloudGrad2" x1="12" y1="6" x2="12" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8"/>
              <stop offset="1" stopColor="#818cf8"/>
            </linearGradient>
            <filter id="glow2" x="-2" y="-2" width="28" height="28" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
            </filter>
          </defs>
        </svg>
      </div>

      {/* Cyber Rocket */}
      <div className="absolute top-[80%] left-[-10%] opacity-60 animate-fly-diagonal">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-45 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
          <path d="M12 2C12 2 16 6 16 12C16 14 17 16 19 17L12 22L5 17C7 16 8 14 8 12C8 6 12 2 12 2Z" fill="url(#rocketBody)"/>
          <path d="M12 22L14 26H10L12 22Z" fill="#ff7e67">
             <animate attributeName="opacity" values="1;0.4;1" dur="0.2s" repeatCount="indefinite" />
          </path>
          <circle cx="12" cy="11" r="2.5" fill="#0f172a" />
          <defs>
            <linearGradient id="rocketBody" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ec4899"/>
              <stop offset="1" stopColor="#6366f1"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Floating stars/particles */}
      <div className="absolute top-[20%] left-[20%] w-1.5 h-1.5 rounded-full bg-primary/60 shadow-[0_0_10px_var(--primary)] animate-float"></div>
      <div className="absolute top-[35%] right-[25%] w-2 h-2 rounded-full bg-secondary/50 shadow-[0_0_15px_var(--secondary)] animate-float-delayed"></div>
      <div className="absolute bottom-[25%] left-[30%] w-2 h-2 rounded-full bg-accent/60 shadow-[0_0_12px_var(--accent)] animate-float"></div>
      <div className="absolute top-[10%] right-[40%] w-1 h-1 rounded-full bg-white/40 shadow-[0_0_8px_white] animate-float-delayed"></div>
    </div>
  );
};

export default AnimatedBackground;
