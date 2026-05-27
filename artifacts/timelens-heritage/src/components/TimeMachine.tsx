import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, ChevronsLeftRight, Landmark } from "lucide-react";
import { Monument } from "@/data/monuments";
import { useLang } from "@/lib/i18n";

interface TimeMachineProps {
  monument: Monument;
  currentImage: string | null;
  onTalkToGuide?: () => void;
}

export function TimeMachine({ monument, currentImage, onTalkToGuide }: TimeMachineProps) {
  const { t } = useLang();
  const [sliderPosition, setSliderPosition] = useState(25);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cinematic entrance: animate slider 20 → 50 on mount
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

  // Resolve which images to show
  const pastImage = monument.pastImageUrl ?? null;
  const modernImage = monument.modernImageUrl ?? currentImage ?? null;
  const hasDedicatedImages = Boolean(monument.pastImageUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="w-full max-w-5xl mx-auto my-10"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs uppercase tracking-widest mb-4">
          {t("time_badge")}
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-primary mb-3">{t("time_title")}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          {t("time_subtitle")}
        </p>
      </div>

      {/* Comparison container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        ref={containerRef}
        className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-[0_0_60px_rgba(0,0,0,0.6)] border border-white/10"
        onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
        onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
      >
        {/* ───── RIGHT SIDE — Present day ───── */}
        <div className="absolute inset-0">
          {modernImage ? (
            <img
              src={modernImage}
              alt={`${monument.name} today`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0a0f2e] via-[#0f1542] to-[#0a0f2e] flex flex-col items-center justify-center gap-4">
              <Landmark className="w-16 h-16 text-primary/30" />
              <div className="text-center">
                <p className="font-serif text-xl text-foreground/40">{monument.name}</p>
                <p className="text-xs text-muted-foreground/30 mt-1 uppercase tracking-widest">{t("time_present")}</p>
              </div>
            </div>
          )}
          {/* Today label */}
          <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-foreground/90 font-medium tracking-wide border border-white/10 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            {t("time_today")}
          </div>
        </div>

        {/* ───── LEFT SIDE — Historical reconstruction ───── */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          {hasDedicatedImages && pastImage ? (
            /* Dedicated historical reconstruction image — no filters */
            <div className="absolute inset-0">
              <img
                src={pastImage}
                alt={`${monument.name} historical reconstruction`}
                className="w-full h-full object-cover"
              />
              {/* Very subtle warm vignette to blend edges */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.35)_100%)] pointer-events-none" />
            </div>
          ) : (
            /* Fallback: sepia-filtered version of current image */
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
              {/* Description text for fallback only */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                <p className="text-white/85 text-center px-8 font-serif text-sm md:text-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-relaxed max-w-md">
                  {monument.pastImageDescription}
                </p>
              </div>
            </div>
          )}

          {/* Period badge — always shown */}
          <div className="absolute bottom-4 left-4 bg-primary/85 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-primary-foreground font-medium tracking-wide border border-primary/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/70" />
            {monument.period}
          </div>

          {/* "AI Reconstruction" badge */}
          <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-black/50 backdrop-blur-sm text-[10px] text-primary/80 uppercase tracking-widest border border-primary/20">
            {t("time_reconstruction")}
          </div>
        </div>

        {/* Divider glow line */}
        <div
          className="absolute top-0 bottom-0 w-px bg-primary shadow-[0_0_14px_4px_rgba(201,162,39,0.8)] z-10 pointer-events-none"
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

        {/* Drag hint */}
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="absolute bottom-14 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-xs text-white/60 border border-white/10 pointer-events-none whitespace-nowrap z-10"
          >
            {t("time_drag_hint")}
          </motion.div>
        )}
      </motion.div>

      <p className="text-center text-xs text-muted-foreground/40 mt-3 tracking-wider uppercase">
        {t("time_footer")}
      </p>

      {/* Talk to Historical Figure */}
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
            {t("time_talk")}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
