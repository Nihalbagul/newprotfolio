import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Premium CTA button with elegant animations:
 * - Smooth magnetic hover effect
 * - Animated gradient background
 * - Particle trail on hover
 * - Smooth text reveal
 * - Elegant arrow animation
 */
const Button = ({ text, className, id }) => {
  const buttonRef = useRef(null);
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  // Ref instead of state — avoids restarting the entire canvas RAF loop on every mouse move
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Subtle 3D tilt
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  // Particle trail effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isHovered) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    const particles = [];

    const resizeCanvas = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.life = 1;
        this.decay = 0.015;
        this.hue = 220 + Math.random() * 40; // Blue to purple
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.speedX *= 0.98;
        this.speedY *= 0.98;
      }

      draw() {
        if (this.life <= 0) return;

        ctx.save();
        ctx.globalAlpha = this.life * 0.8;
        
        // Glow
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 4
        );
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 65%, ${this.life})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, 65%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, ${this.life})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const animate = () => {
      if (!isHovered) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new particles at mouse position
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const localX = mousePosRef.current.x - rect.left;
        const localY = mousePosRef.current.y - rect.top;
        
        if (localX > 0 && localX < rect.width && localY > 0 && localY < rect.height) {
          if (Math.random() > 0.7 && particles.length < 20) {
            particles.push(new Particle(localX, localY));
          }
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isHovered]);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) / (rect.width / 2);
    const distanceY = (e.clientY - centerY) / (rect.height / 2);

    x.set(distanceX * 12);
    y.set(distanceY * 12);
    mousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleClick = (e) => {
    e.preventDefault();

    // Only scroll if id prop is provided
    if (!id) return;

    // Function to scroll to element
    const scrollToElement = (elementId) => {
      const target = document.getElementById(elementId);
      
      if (target) {
        const offset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        const scrollPosition = elementPosition + scrollY - offset;

        window.scrollTo({
          top: Math.max(0, scrollPosition),
          behavior: "smooth"
        });
        return true;
      }
      return false;
    };

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      // Try to scroll to the target
      if (!scrollToElement(id)) {
        // If target not found, try querySelector
        const fallbackTarget = document.querySelector(`#${id}`);
        if (fallbackTarget) {
          const offset = 100;
          const elementPosition = fallbackTarget.getBoundingClientRect().top;
          const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
          const scrollPosition = elementPosition + scrollY - offset;
          
          window.scrollTo({
            top: Math.max(0, scrollPosition),
            behavior: "smooth"
          });
        }
      }
    }, 10);
  };

  return (
    <motion.a
      ref={buttonRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`${className ?? ""} cta-wrapper`}
      style={{
        x: xSpring,
        y: ySpring,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <div className="cta-button group relative">
        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          className="particle-canvas"
          style={{ pointerEvents: "none" }}
        />

        {/* Animated gradient background */}
        <motion.div
          className="gradient-bg"
          animate={{
            background: isHovered
              ? [
                  "radial-gradient(circle at 0% 0%, rgba(139, 92, 246, 0.3), transparent 60%)",
                  "radial-gradient(circle at 100% 100%, rgba(99, 102, 241, 0.3), transparent 60%)",
                  "radial-gradient(circle at 0% 0%, rgba(139, 92, 246, 0.3), transparent 60%)",
                ]
              : "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1), transparent 70%)",
          }}
          transition={{ duration: 4, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
        />

        {/* Shimmer effect */}
        <motion.div
          className="shimmer-effect"
          animate={{
            x: isHovered ? ["-100%", "200%"] : "-100%",
          }}
          transition={{
            x: { duration: 2, repeat: isHovered ? Infinity : 0, ease: "linear", repeatDelay: 0.5 },
          }}
        />

        {/* Glow border */}
        <motion.div
          className="glow-border"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.95,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Button text */}
        <motion.p
          className="text"
          animate={{
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {text}
        </motion.p>

        {/* Arrow */}
        <motion.div
          className="arrow-wrapper"
          animate={{
            x: isHovered ? 4 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.img
            src="/images/arrow-down.svg"
            alt="arrow"
            animate={{
              y: isHovered ? [0, 6, 0] : [0, 3, 0],
              rotate: isHovered ? 180 : 0,
            }}
            transition={{
              y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 0.4, ease: "easeInOut" },
            }}
          />
        </motion.div>
      </div>
    </motion.a>
  );
};

export default Button;
