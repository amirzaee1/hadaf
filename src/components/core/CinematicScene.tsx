import React, { useMemo } from 'react';
import { motion } from 'motion/react';

export type SceneEnvironment =
  | 'storm_to_calm'
  | 'dark_to_light'
  | 'empty_to_illuminated'
  | 'stone_to_crystal'
  | 'seed_to_tree'
  | 'dream_to_blueprint'
  | 'default_cosmic';

interface CinematicSceneProps {
  environment?: SceneEnvironment;
  progressValue?: number; // 0 to 100 for transition state
  cameraZoom?: number; // 1 to 1.2
  children?: React.ReactNode;
  className?: string;
  lightingIntensity?: 'soft' | 'dramatic' | 'golden' | 'emerald';
}

export const CinematicScene: React.FC<CinematicSceneProps> = ({
  environment = 'default_cosmic',
  progressValue = 50,
  cameraZoom = 1,
  children,
  className = '',
  lightingIntensity = 'golden',
}) => {
  // Generate stable particle positions
  const particles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: (i * 17) % 100,
      y: (i * 23) % 100,
      size: (i % 3) + 1.5,
      delay: (i * 0.4) % 4,
      duration: 4 + (i % 3) * 2,
    }));
  }, []);

  const getLightingGradients = () => {
    switch (lightingIntensity) {
      case 'dramatic':
        return 'radial-gradient(circle at 50% 10%, rgba(245, 158, 11, 0.25) 0%, rgba(3, 6, 15, 0.95) 75%)';
      case 'emerald':
        return 'radial-gradient(circle at 50% 15%, rgba(16, 185, 129, 0.2) 0%, rgba(3, 7, 18, 0.95) 80%)';
      case 'soft':
        return 'radial-gradient(circle at 50% 20%, rgba(56, 189, 248, 0.15) 0%, rgba(5, 8, 22, 0.95) 80%)';
      case 'golden':
      default:
        return 'radial-gradient(ellipse at 50% 0%, rgba(245, 158, 11, 0.18) 0%, rgba(10, 15, 30, 0.8) 60%, rgba(4, 6, 14, 0.98) 100%)';
    }
  };

  return (
    <div
      className={`relative w-full overflow-hidden rounded-3xl border border-slate-800/80 ${className}`}
      style={{
        background: getLightingGradients(),
        minHeight: '260px',
      }}
    >
      {/* Dynamic Camera Zoom Container */}
      <motion.div
        animate={{ scale: cameraZoom }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative w-full h-full"
      >
        {/* Environment-specific SVG Backdrop */}
        {environment === 'storm_to_calm' && (
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-700">
            <svg viewBox="0 0 400 240" className="w-full h-full opacity-60">
              <defs>
                <linearGradient id="calmGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#1e3a8a" />
                </linearGradient>
              </defs>
              {/* Dynamic Wave Lines (Calming as progressValue grows) */}
              <path
                d={`M 0 160 Q 100 ${160 - (100 - progressValue) * 0.4} 200 160 T 400 160 L 400 240 L 0 240 Z`}
                fill="#0e1726"
                opacity="0.8"
              />
              <path
                d={`M 0 180 Q 120 ${180 + (100 - progressValue) * 0.3} 240 180 T 400 180 L 400 240 L 0 240 Z`}
                fill="#172554"
                opacity="0.6"
              />
              {/* Sun/Lighthouse beam emerging */}
              <circle
                cx="200"
                cy="70"
                r={24 + (progressValue / 100) * 16}
                fill="#f59e0b"
                opacity={0.15 + (progressValue / 100) * 0.4}
                filter="blur(8px)"
              />
            </svg>
          </div>
        )}

        {environment === 'dark_to_light' && (
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="w-full h-full transition-opacity duration-1000"
              style={{
                background: `radial-gradient(circle at 50% 50%, rgba(254, 240, 138, ${
                  (progressValue / 100) * 0.35
                }) 0%, transparent 70%)`,
              }}
            />
          </div>
        )}

        {environment === 'stone_to_crystal' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <svg viewBox="0 0 200 200" className="w-48 h-48">
              <polygon
                points="100,20 170,70 150,160 50,160 30,70"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              <polygon
                points="100,50 140,80 130,135 70,135 60,80"
                fill="#f59e0b"
                fillOpacity="0.1"
                stroke="#fbbf24"
                strokeWidth="1"
              />
            </svg>
          </div>
        )}

        {/* Ambient Floating Stardust Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full bg-amber-300"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                boxShadow: '0 0 8px rgba(245, 158, 11, 0.8)',
              }}
              animate={{
                y: [0, -18, 0],
                opacity: [0.2, 0.85, 0.2],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 p-5 sm:p-6">{children}</div>
      </motion.div>
    </div>
  );
};
