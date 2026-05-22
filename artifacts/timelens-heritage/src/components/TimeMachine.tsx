import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, ChevronsLeftRight, Landmark } from "lucide-react";
import { Monument } from "@/data/monuments";

interface TimeMachineProps {
  monument: Monument;
  currentImage: string | null;
  onTalkToGuide?: () => void;
}

export function TimeMachine({ monument, currentImage, onTalkToGuide }: TimeMachineProps) {
  const [sliderPosition, setSliderPosition] = useState(25);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let start: number | null = null;
    const from = 20;
    const to = 50;
    const duration = 1800;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      setSliderPosition(from + (to - from) * e);
      if (p < 1) requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setSliderPosition((Math.max(0, Math.min(clientX - rect.left, rect.width)) / rect.width) * 100);
    setHasInteracted(true);
  };

  const stopDrag = () => setIsDragging(false);

  useEffect(() => {
    if (!isDragging) return;
    const mm = (e: MouseEvent) => handleMove(e.clientX);
    const tm = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    window.addEventListener("mousemove", mm);
    window.addEventListener("touchmove", tm);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchend", stopDrag);
    return () => {
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("touchmove", tm);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchend", stopDrag);
    };
  }, [isDragging]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="w-full max-w-5xl mx-auto my-10"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs uppercase tracking-widest mb-4">
          Time Machine · Reconstruction Ready
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-primary mb-3">See the Past</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Move the slider to compare the monument today and its historical appearance.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        ref={containerRef}
        className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-[0_0_60px_rgba(0,0,0,0.6)] border border-white/10"
        onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
        onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
      >
        {/* RIGHT — Present day */}
        <div className="absolute inset-0">
          {currentImage ? (
            <img
              src={currentImage}
              alt="Present day"
              className="w-full h-full object-cover brightness-100 contrast-110 saturate-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0a0f2e] via-[#0f1542] to-[#0a0f2e] flex flex-col items-center justify-center gap-4">
              <Landmark className="w-16 h-16 text-primary/30" />
              <div className="text-center">
                <p className="font-serif text-xl text-foreground/40">{monument.name}</p>
                <p className="text-xs text-muted-foreground/30 mt-1 uppercase tracking-widest">Present Day Reference</p>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/10 pointer-events-none" />
          <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-foreground/80 font-medium tracking-wide border border-white/10 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Present Day
          </div>
        </div>

        {/* LEFT — Historical reconstruction */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <div className="absolute inset-0">
            {currentImage ? (
              <img
                src={currentImage}
                alt="Historical reconstruction"
                className="w-full h-full object-cover"
                style={{ filter: "sepia(0.85) contrast(1.2) brightness(0.72) hue-rotate(-5deg) saturate(0.8)" }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#3d2b1f] via-[#5a3e1a] to-[#2a1e0a]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-[#4a2e0a]/55 via-[#8b6914]/30 to-[#c9a227]/15 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.65)_100%)]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/25">
            <p className="text-white/85 text-center px-8 font-serif text-sm md:text-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-relaxed max-w-md">
              {monument.pastImageDescription}
            </p>
          </div>
          <div className="absolute bottom-4 left-4 bg-primary/85 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-primary-foreground font-medium tracking-wide border border-primary/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/70" />
            {monument.period}
          </div>
          <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-black/50 text-[10px] text-primary/70 uppercase tracking-widest border border-primary/20">
            AI Reconstruction
          </div>
        </div>

        {/* Divider */}
        <div
          className="absolute top-0 bottom-0 w-px bg-primary shadow-[0_0_12px_3px_rgba(201,162,39,0.7)] z-10 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        />

        {/* Handle */}
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

        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/40 hover:border-primary/70 text-primary transition-all shadow-[0_0_30px_rgba(201,162,39,0.1)] hover:shadow-[0_0_40px_rgba(201,162,39,0.25)] font-serif text-lg"
          >
            <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Talk to Historical Figure
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
