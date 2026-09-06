import React, { useEffect, useRef } from 'react';

interface CinematicCanvasProps {
  activeChapter: number;
  scrollProgress: number; // 0 to 1 overall progress
}

export const CinematicCanvas: React.FC<CinematicCanvasProps> = ({ activeChapter }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Dynamic background particles
    const particleCount = 75;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4 - 0.15,
      opacity: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.016;

      // Dark cinematic canvas clearing with motion blur trail
      ctx.fillStyle = 'rgba(5, 8, 17, 0.4)';
      ctx.fillRect(0, 0, width, height);

      // Subtle parallax offset
      const pOffsetX = (mouseX - width / 2) * 0.04;
      const pOffsetY = (mouseY - height / 2) * 0.04;

      // CHAPTER-SPECIFIC METAPHOR RENDERING
      ctx.save();
      ctx.translate(pOffsetX, pOffsetY);

      if (activeChapter === 1) {
        // The Dormant Seed in Void with Light Pulse
        const cx = width / 2;
        const cy = height * 0.45;
        const glow = Math.sin(time * 2) * 15 + 40;
        
        // Soft aura
        const radGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 220);
        radGrad.addColorStop(0, 'rgba(234, 179, 8, 0.28)');
        radGrad.addColorStop(0.5, 'rgba(59, 130, 246, 0.12)');
        radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, 220, 0, Math.PI * 2);
        ctx.fill();

        // Seed core
        ctx.fillStyle = '#fde047';
        ctx.shadowColor = '#eab308';
        ctx.shadowBlur = glow;
        ctx.beginPath();
        ctx.ellipse(cx, cy, 7, 12, Math.sin(time) * 0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Radiating golden tendrils
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.2)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2 + time * 0.2;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.quadraticCurveTo(
            cx + Math.cos(angle) * 60 + Math.sin(time * 2 + i) * 20,
            cy + Math.sin(angle) * 60,
            cx + Math.cos(angle) * 140,
            cy + Math.sin(angle) * 140
          );
          ctx.stroke();
        }
      } else if (activeChapter === 2) {
        // Sand Castle crumbling in storm vs bedrock
        const cx = width / 2;
        const cy = height * 0.5;
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
        ctx.lineWidth = 1.5;
        // Fractured crystalline triangles
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2 + time * 0.1;
          const dist = 70 + Math.sin(time * 3 + i) * 25;
          ctx.strokeRect(cx + Math.cos(angle) * dist - 15, cy + Math.sin(angle) * dist - 15, 30, 30);
        }
      } else if (activeChapter === 3) {
        // 3 Golden Pillars
        const cx = width / 2;
        const cy = height * 0.55;
        const pillarWidth = 26;
        const heights = [140, 190, 150];
        const offsets = [-90, 0, 90];

        offsets.forEach((off, idx) => {
          const h = heights[idx] + Math.sin(time * 1.5 + idx) * 10;
          const grad = ctx.createLinearGradient(cx + off, cy, cx + off, cy - h);
          grad.addColorStop(0, 'rgba(217, 119, 6, 0.1)');
          grad.addColorStop(0.7, 'rgba(245, 158, 11, 0.45)');
          grad.addColorStop(1, 'rgba(254, 240, 138, 0.85)');

          ctx.fillStyle = grad;
          ctx.fillRect(cx + off - pillarWidth / 2, cy - h, pillarWidth, h);

          // Pillar aura
          ctx.shadowColor = '#eab308';
          ctx.shadowBlur = 15;
          ctx.fillStyle = '#fef08a';
          ctx.fillRect(cx + off - pillarWidth / 2, cy - h, pillarWidth, 3);
          ctx.shadowBlur = 0;
        });
      } else if (activeChapter === 5) {
        // Lighthouse beam slicing through fog
        const lx = width * 0.75;
        const ly = height * 0.35;
        const sweepAngle = Math.sin(time * 0.8) * 0.7 - 2.8;
        const beamLength = width * 0.9;

        const beamGrad = ctx.createRadialGradient(lx, ly, 10, lx, ly, beamLength);
        beamGrad.addColorStop(0, 'rgba(254, 240, 138, 0.8)');
        beamGrad.addColorStop(0.3, 'rgba(245, 158, 11, 0.3)');
        beamGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.arc(lx, ly, beamLength, sweepAngle - 0.22, sweepAngle + 0.22);
        ctx.closePath();
        ctx.fill();

        // Lighthouse beacon point
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 35;
        ctx.beginPath();
        ctx.arc(lx, ly, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      } else if (activeChapter === 6) {
        // Connected Constellations
        const cx = width / 2;
        const cy = height * 0.45;
        const nodes = [
          { x: cx - 120, y: cy - 60 },
          { x: cx - 40, y: cy - 90 },
          { x: cx + 70, y: cy - 40 },
          { x: cx + 130, y: cy + 50 },
          { x: cx + 20, y: cy + 80 },
          { x: cx - 80, y: cy + 50 }
        ];

        ctx.strokeStyle = 'rgba(234, 179, 8, 0.45)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        nodes.forEach((n, idx) => {
          const nx = n.x + Math.sin(time + idx) * 8;
          const ny = n.y + Math.cos(time + idx) * 8;
          if (idx === 0) ctx.moveTo(nx, ny);
          else ctx.lineTo(nx, ny);
        });
        ctx.closePath();
        ctx.stroke();

        // Node stars
        nodes.forEach((n, idx) => {
          const nx = n.x + Math.sin(time + idx) * 8;
          const ny = n.y + Math.cos(time + idx) * 8;
          ctx.fillStyle = '#fef08a';
          ctx.shadowColor = '#eab308';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      } else if (activeChapter === 9) {
        // Glowing Crystal Shards
        const cx = width / 2;
        const cy = height * 0.45;
        for (let i = 0; i < 5; i++) {
          const rot = (i / 5) * Math.PI * 2 + time * 0.15;
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(rot);
          const cGrad = ctx.createLinearGradient(0, 0, 0, -90);
          cGrad.addColorStop(0, 'rgba(234, 179, 8, 0.1)');
          cGrad.addColorStop(1, 'rgba(254, 240, 138, 0.6)');
          ctx.fillStyle = cGrad;
          ctx.beginPath();
          ctx.moveTo(0, -90);
          ctx.lineTo(14, -20);
          ctx.lineTo(-14, -20);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      } else if (activeChapter === 12) {
        // Faceted Rotating Diamond
        const cx = width / 2;
        const cy = height * 0.45;
        const radius = 60 + Math.sin(time * 2) * 5;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(time * 0.3);

        ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2;
          const x = Math.cos(a) * radius;
          const y = Math.sin(a) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();

        // Inner facets
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(a) * radius, Math.sin(a) * radius);
          ctx.stroke();
        }
        ctx.restore();
      } else if (activeChapter === 13) {
        // Eternal Sacred Flame
        const cx = width / 2;
        const cy = height * 0.5;
        const fGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 140);
        fGrad.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
        fGrad.addColorStop(0.3, 'rgba(245, 158, 11, 0.5)');
        fGrad.addColorStop(0.7, 'rgba(225, 29, 72, 0.2)');
        fGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = fGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, 140, 0, Math.PI * 2);
        ctx.fill();

        // Rising embers
        for (let i = 0; i < 15; i++) {
          const emberX = cx + Math.sin(time * 3 + i) * 50;
          const emberY = cy - ((time * 60 + i * 25) % 180);
          ctx.fillStyle = '#fde047';
          ctx.beginPath();
          ctx.arc(emberX, emberY, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();

      // Ambient Floating Stardust
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.02;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentOpacity = p.opacity * (0.6 + Math.sin(p.pulse) * 0.4);
        ctx.fillStyle = `rgba(254, 240, 138, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeChapter]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 cinematic-vignette pointer-events-none" />
      {/* Subtle Scanline Texture for cinematic camera feel */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '100% 4px',
        }}
      />
    </div>
  );
};
