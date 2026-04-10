import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionTransition = () => {
  const transitionRef = useRef(null);
  const canvasRef = useRef(null);
  const liquidRef = useRef(null);

  // Advanced liquid glass morph with refraction
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    // Build bg gradient once (pure black fade — never changes)
    let bgGradient;
    const buildBgGradient = () => {
      bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      bgGradient.addColorStop(0.15, 'rgba(0, 0, 0, 0.4)');
      bgGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.85)');
      bgGradient.addColorStop(0.85, 'rgba(0, 0, 0, 0.98)');
      bgGradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
    };

    const resizeCanvas = () => {
      if (transitionRef.current) {
        const rect = transitionRef.current.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        buildBgGradient(); // Rebuild after resize (dimensions changed)
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawLiquidGlass = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.008;

      // Reuse cached gradient — no allocation per frame
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Liquid glass wave effect
      ctx.save();
      ctx.globalAlpha = 0.25;
      
      for (let wave = 0; wave < 2; wave++) {
        const waveOffset = wave * Math.PI;
        const waveHeight = canvas.height * 0.15;
        const waveSpeed = 0.5 + wave * 0.3;
        
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        for (let x = 0; x <= canvas.width; x += 2) {
          const normalizedX = x / canvas.width;
          const y = canvas.height * 0.5 + 
                   Math.sin(normalizedX * Math.PI * 3 + time * waveSpeed + waveOffset) * waveHeight * (1 - normalizedX * 0.5) +
                   Math.cos(normalizedX * Math.PI * 2 + time * waveSpeed * 0.7 + waveOffset) * waveHeight * 0.3;
          
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        
        const waveGradient = ctx.createLinearGradient(0, canvas.height * 0.3, 0, canvas.height);
        waveGradient.addColorStop(0, `rgba(139, 92, 246, ${0.4 - wave * 0.15})`);
        waveGradient.addColorStop(0.5, `rgba(99, 102, 241, ${0.3 - wave * 0.1})`);
        waveGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = waveGradient;
        ctx.fill();
      }
      
      ctx.restore();

      // Refraction highlights
      for (let i = 0; i < 5; i++) {
        const x = (canvas.width / 6) * (i + 1) + Math.sin(time * 0.5 + i) * 30;
        const y = canvas.height * 0.6 + Math.cos(time * 0.3 + i) * 20;
        
        ctx.save();
        ctx.globalAlpha = 0.15;
        
        const highlightGradient = ctx.createRadialGradient(x, y, 0, x, y, 80);
        highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        highlightGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.2)');
        highlightGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = highlightGradient;
        ctx.beginPath();
        ctx.arc(x, y, 80, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(drawLiquidGlass);
    };

    drawLiquidGlass();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Ultra-smooth scroll animations
  useGSAP(() => {
    if (!transitionRef.current) return;

    // Liquid flow animation
    gsap.fromTo(
      liquidRef.current,
      {
        scaleY: 0,
        opacity: 0,
        filter: 'blur(20px)',
      },
      {
        scaleY: 1,
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: transitionRef.current,
          start: 'top bottom',
          end: 'center center',
          scrub: 1.2,
        },
      }
    );

    // Parallax canvas
    gsap.to(canvasRef.current, {
      y: -8,
      scrollTrigger: {
        trigger: transitionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    });
  }, []);

  return (
    <div
      ref={transitionRef}
      className="section-transition relative w-full h-[10vh] md:h-[14vh] overflow-hidden"
    >
      {/* Liquid glass canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Liquid flow overlay */}
      <div
        ref={liquidRef}
        className="absolute inset-0 z-15 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(139, 92, 246, 0.12) 0%, rgba(99, 102, 241, 0.08) 25%, rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 1) 100%)',
          transformOrigin: 'center bottom',
        }}
      />
    </div>
  );
};

export default SectionTransition;
