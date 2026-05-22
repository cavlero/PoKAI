import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, ChevronsLeftRight } from "lucide-react";
import { Monument } from "@/data/monuments";

interface TimeMachineProps {
  monument: Monument;
  currentImage: string;
  onTalkToGuide?: () => void;
}

export function TimeMachine({ monument, currentImage, onTalkToGuide }: TimeMachineProps) {
  const [sliderPosition, setSliderPosition] = useState(25);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cinematic entrance: animate slider from 20 → 50 on mount
  useEffect(() => {
    let start: number | null = null;
    const from = 20;
    const to = 50;
    const duration = 1800;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-in-out cubic
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      setSliderPosition(from + (to - from) * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };

    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
    setHasInteracted(true);
  };

  const handleMouseMove = (e: MouseEvent) => { if (isDragging) handleMove(e.clientX); };
  const handleTouchMove = (e: TouchEvent) => { if (isDragging) handleMove(e.touches[0].clientX); };
  const stopDragging = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("mouseup", stopDragging);
      window.addEventListener("touchend", stopDragging);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchend", stopDragging);
    };
  }, [isDragging]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto my-10"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs uppercase tracking-widest mb-4"
        >
          Time Machine · Reconstruction Ready
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-serif text-primary mb-3"
        >
          See the Past
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground max-w-xl mx-auto"
        >
          Move the slider to compare the monument today and its historical appearance.
        </motion.p>
      </div>

      {/* Slider container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        ref={containerRef}
        className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-[0_0_60px_rgba(0,0,0,0.6)] border border-white/10"
        onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
        onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
      >
        {/* RIGHT side — Present day (base layer) */}
        <div className="absolute inset-0">
          <img
            src={currentImage}
            alt="Present day"
            className="w-full h-full object-cover brightness-100 contrast-110 saturate-110"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/10" />
          <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-foreground/80 font-medium tracking-wide border border-white/10 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Present Day
          </div>
        </div>

        {/* LEFT side — Historical reconstruction (clipped overlay) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <div className="absolute inset-0">
            {/* Base: sepia-toned version of the uploaded image */}
            <img
              src={currentImage}
              alt="Historical reconstruction"
              className="w-full h-full object-cover"
              style={{
                filter: "sepia(0.85) contrast(1.2) brightness(0.72) hue-rotate(-5deg) saturate(0.8)",
              }}
            />
            {/* Warm oil-painting colour wash */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#4a2e0a]/55 via-[#8b6914]/30 to-[#c9a227]/15 mix-blend-multiply" />
            {/* Aged vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.65)_100%)]" />
            {/* Light film grain */}
            <div
              className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                backgroundSize: "128px 128px",
              }}
            />
          </div>

          {/* Description text */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/25">
            <p className="text-white/85 text-center px-8 font-serif text-sm md:text-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-relaxed max-w-xs md:max-w-md">
              {monument.pastImageDescription}
            </p>
          </div>

          {/* Period badge */}
          <div className="absolute bottom-4 left-4 bg-primary/85 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-primary-foreground font-medium tracking-wide border border-primary/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/70" />
            {monument.period}
          </div>

          {/* "AI Reconstruction" watermark */}
          <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-black/50 text-[10px] text-primary/70 uppercase tracking-widest border border-primary/20">
            AI Reconstruction
          </div>
        </div>

        {/* Divider glow line */}
        <div
          className="absolute top-0 bottom-0 w-px bg-primary shadow-[0_0_12px_3px_rgba(201,162,39,0.7)] z-10 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        />

        {/* Drag handle */}
        <div
          className="absolute top-0 bottom-0 flex items-center z-20"
          style={{ left: `calc(${sliderPosition}% - 22px)` }}
        >
          <motion.div
            whileHover={{ scale: 1.12 }}
            className="w-11 h-11 bg-primary rounded-full flex items-center justify-center shadow-[0_0_24px_rgba(201,162,39,0.7)] border-2 border-primary-foreground/20 cursor-ew-resize"
          >
            <ChevronsLeftRight className="w-5 h-5 text-primary-foreground/80" />
          </motion.div>
        </div>

        {/* Hint — disappears after first interaction */}
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.8 }}
            className="absolute bottom-14 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-xs text-white/60 border border-white/10 pointer-events-none whitespace-nowrap"
          >
            Drag to compare
          </motion.div>
        )}
      </motion.div>

      <p className="text-center text-xs text-muted-foreground/40 mt-3 tracking-wider uppercase">
        Drag slider to travel through time · AI-generated historical reconstruction
      </p>

      {/* Talk to Historical Figure button */}
      {onTalkToGuide && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center mt-8"
        >
          <button
            onClick={onTalkToGuide}
            data-testid="button-talk-to-guide"
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/40 hover:border-primary/70 text-primary hover:text-primary transition-all shadow-[0_0_30px_rgba(201,162,39,0.1)] hover:shadow-[0_0_40px_rgba(201,162,39,0.25)] font-serif text-lg"
          >
            <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Talk to Historical Figure
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
