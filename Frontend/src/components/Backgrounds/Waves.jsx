import React from "react";

const Waves = ({ 
  colors = ["#6366f1", "#8b5cf6", "#a855f7", "#ec4899"],
  opacity = 0.15,
  blur = true 
}) => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${colors[0]}15 0%, transparent 50%, ${colors[3]}10 100%)`
        }}
      />
      
      {/* Animated waves */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        style={{ height: '70vh', minHeight: '400px' }}
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors[0]} stopOpacity={opacity} />
            <stop offset="50%" stopColor={colors[1]} stopOpacity={opacity * 0.8} />
            <stop offset="100%" stopColor={colors[2]} stopOpacity={opacity} />
          </linearGradient>
          <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors[1]} stopOpacity={opacity * 0.7} />
            <stop offset="50%" stopColor={colors[2]} stopOpacity={opacity * 0.5} />
            <stop offset="100%" stopColor={colors[3]} stopOpacity={opacity * 0.7} />
          </linearGradient>
          <linearGradient id="wave-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors[2]} stopOpacity={opacity * 0.5} />
            <stop offset="50%" stopColor={colors[3]} stopOpacity={opacity * 0.3} />
            <stop offset="100%" stopColor={colors[0]} stopOpacity={opacity * 0.5} />
          </linearGradient>
          <linearGradient id="wave-gradient-4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors[3]} stopOpacity={opacity * 0.3} />
            <stop offset="50%" stopColor={colors[0]} stopOpacity={opacity * 0.2} />
            <stop offset="100%" stopColor={colors[1]} stopOpacity={opacity * 0.3} />
          </linearGradient>
          {blur && <filter id="wave-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>}
        </defs>

        {/* Wave 1 - Back */}
        <path
          fill="url(#wave-gradient-1)"
          filter={blur ? "url(#wave-blur)" : ""}
          style={{ animation: 'wave-flow 25s ease-in-out infinite' }}
        >
          <animate
            attributeName="d"
            dur="20s"
            repeatCount="indefinite"
            values="
              M0,400 C320,300 420,450 720,350 C1020,250 1200,400 1440,350 L1440,600 L0,600 Z;
              M0,350 C280,450 520,300 720,400 C920,500 1120,300 1440,400 L1440,600 L0,600 Z;
              M0,400 C320,300 420,450 720,350 C1020,250 1200,400 1440,350 L1440,600 L0,600 Z
            "
          />
        </path>

        {/* Wave 2 */}
        <path
          fill="url(#wave-gradient-2)"
          filter={blur ? "url(#wave-blur)" : ""}
          style={{ animation: 'wave-flow 20s ease-in-out infinite reverse' }}
        >
          <animate
            attributeName="d"
            dur="15s"
            repeatCount="indefinite"
            values="
              M0,450 C360,350 540,500 900,400 C1260,300 1320,450 1440,420 L1440,600 L0,600 Z;
              M0,400 C300,500 600,350 900,450 C1200,550 1350,380 1440,450 L1440,600 L0,600 Z;
              M0,450 C360,350 540,500 900,400 C1260,300 1320,450 1440,420 L1440,600 L0,600 Z
            "
          />
        </path>

        {/* Wave 3 */}
        <path
          fill="url(#wave-gradient-3)"
          filter={blur ? "url(#wave-blur)" : ""}
        >
          <animate
            attributeName="d"
            dur="18s"
            repeatCount="indefinite"
            values="
              M0,500 C400,420 600,550 960,470 C1320,390 1380,520 1440,480 L1440,600 L0,600 Z;
              M0,470 C350,550 650,420 960,500 C1270,580 1400,450 1440,500 L1440,600 L0,600 Z;
              M0,500 C400,420 600,550 960,470 C1320,390 1380,520 1440,480 L1440,600 L0,600 Z
            "
          />
        </path>

        {/* Wave 4 - Front */}
        <path
          fill="url(#wave-gradient-4)"
        >
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="
              M0,550 C480,500 720,580 1080,530 C1300,490 1400,560 1440,540 L1440,600 L0,600 Z;
              M0,530 C400,580 800,500 1080,550 C1280,590 1380,520 1440,560 L1440,600 L0,600 Z;
              M0,550 C480,500 720,580 1080,530 C1300,490 1400,560 1440,540 L1440,600 L0,600 Z
            "
          />
        </path>
      </svg>

      {/* Top glow accent */}
      <div 
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle, ${colors[0]}40 0%, transparent 70%)`,
          filter: 'blur(60px)',
          transform: 'translateY(-50%)'
        }}
      />
      <div 
        className="absolute top-0 right-1/4 w-80 h-80 rounded-full opacity-15"
        style={{
          background: `radial-gradient(circle, ${colors[3]}40 0%, transparent 70%)`,
          filter: 'blur(50px)',
          transform: 'translateY(-30%)'
        }}
      />

      <style>{`
        @keyframes wave-flow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-2%); }
        }
      `}</style>
    </div>
  );
};

export default Waves;
