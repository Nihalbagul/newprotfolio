import { useRef } from "react";
import Button from "../components/Button";
import ResumeDownload from "../components/ResumeDownload";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedBackground from "../components/AnimatedBackground";
import HeroGlow from "../components/HeroGlow";
import HeroExperience from "../components/HeroModels/Heroexperience";
import { useIsMobile } from "../hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const isMobile = useIsMobile();

  // Entrance + subtle model motion
  useGSAP(() => {
    const mobile = window.innerWidth < 768;

    gsap.fromTo(".hero-headline-line",
      { y: mobile ? 22 : 44, opacity: 0, filter: mobile ? "none" : "blur(6px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.1,
        duration: mobile ? 0.55 : 0.75,
        ease: "power3.out",
      });

    gsap.fromTo(".hero-meta-block",
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, delay: 0.2, ease: "power2.out" });

    gsap.fromTo(".hero-kpi-card",
      { y: 14, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.08, delay: 0.35, ease: "power2.out" });

    gsap.fromTo(".hero-cta-group",
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, delay: 0.5, ease: "power2.out" });

    // Subtle float on 3D shell (desktop only)
    if (!mobile) {
      gsap.to(".hero-model-shell", {
        y: "+=10",
        duration: 3,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    // Scroll parallax (desktop only)
    if (heroRef.current && !mobile) {
      gsap.to(".hero-model-shell", {
        y: -45,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center"
      style={{ paddingTop: isMobile ? "78px" : "88px", overflow: "visible" }}
    >
      {!isMobile && <AnimatedBackground />}
      <HeroGlow />

      <div className="absolute inset-0 bg-linear-to-br from-purple-900/25 via-transparent to-blue-900/25 pointer-events-none z-0" />
      <div className="absolute inset-0 pointer-events-none z-0 [background:radial-gradient(85%_55%_at_18%_35%,rgba(147,51,234,0.16),transparent_68%),radial-gradient(70%_45%_at_82%_65%,rgba(59,130,246,0.14),transparent_66%)]" />

      <div className="relative z-20 w-full">
        <div className="w-full px-4 sm:px-6 md:px-8 xl:px-20">
          <div
            className="grid xl:grid-cols-[minmax(0,1fr)_560px] grid-cols-1 items-center gap-8 xl:gap-12 w-full max-w-7xl mx-auto min-h-[72vh]"
          >
            <div className="flex flex-col gap-5 sm:gap-6 relative z-30 w-full max-w-2xl xl:pr-2">
              <div className="w-fit hero-meta-block">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border border-purple-300/35 text-purple-100 bg-purple-500/12">
                  <span className="h-2 w-2 rounded-full bg-purple-300 shadow-[0_0_12px_rgba(216,180,254,0.8)]" />
                  2+ years experience | Freelance SDE
                </span>
              </div>

              <h1 className="font-bold leading-[1.02] tracking-[-0.03em] text-white text-[2.2rem] sm:text-[2.95rem] xl:text-[4.2rem] max-w-[14ch]">
                <span className="block hero-headline-line">Building</span>
                <span className="block hero-headline-line bg-linear-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Product-Ready
                </span>
                <span className="block hero-headline-line">Web Apps &</span>
                <span className="block hero-headline-line">3D Experiences</span>
              </h1>

              <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-[60ch] hero-meta-block">
                I design and ship premium digital products end-to-end - from fast, scalable web systems to
                immersive Three.js experiences that increase engagement and conversions.
              </p>

              <div className="grid grid-cols-3 gap-3 max-w-[560px] hero-meta-block">
                <div className="hero-kpi-card rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 backdrop-blur-md">
                  <p className="text-lg font-bold text-white">2+</p>
                  <p className="text-[11px] text-white/70">Years Experience</p>
                </div>
                <div className="hero-kpi-card rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 backdrop-blur-md">
                  <p className="text-lg font-bold text-white">11+</p>
                  <p className="text-[11px] text-white/70">Projects Delivered</p>
                </div>
                <div className="hero-kpi-card rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 backdrop-blur-md">
                  <p className="text-lg font-bold text-white">100+</p>
                  <p className="text-[11px] text-white/70">Tech & Tools</p>
                </div>
              </div>

              <div className="hero-cta-group relative z-10 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full sm:w-auto mt-1">
                <Button
                  text="Explore My Work"
                  className="w-full sm:w-auto sm:min-w-[230px] md:w-[300px] h-12 relative group text-sm sm:text-base"
                  id="case-studies"
                />
                <ResumeDownload className="w-full sm:w-auto sm:min-w-[190px] h-12" />
              </div>

              <div className="hero-meta-block flex items-center gap-2 flex-wrap text-xs sm:text-sm text-white/60">
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  Open to SDE roles
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                  Available for freelance projects
                </span>
              </div>
            </div>

            <div
              className="hero-model-shell relative z-20 w-full flex items-center justify-center xl:justify-end"
              style={{
                width: "100%",
                maxWidth: isMobile ? "380px" : "560px",
                height: isMobile ? "clamp(300px, 46vh, 380px)" : "clamp(460px, 64vh, 660px)",
                borderRadius: "22px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "linear-gradient(160deg, rgba(124,58,237,0.12), rgba(30,41,59,0.15))",
                boxShadow: isMobile
                  ? "0 10px 35px rgba(13,16,35,0.35), inset 0 1px 0 rgba(255,255,255,0.08)"
                  : "0 20px 60px rgba(13,16,35,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
                backdropFilter: "blur(6px)",
                marginInline: "auto",
              }}
            >
              <div className="pointer-events-none absolute -inset-px rounded-[22px] bg-linear-to-br from-purple-300/20 via-transparent to-blue-300/20 opacity-70" />
              <div className="w-full h-full relative rounded-[22px] overflow-hidden p-2">
                <HeroExperience />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
