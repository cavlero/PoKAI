import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Maximize2, Info, Lightbulb, Star, Clock } from "lucide-react";
import { Monument } from "@/data/monuments";

interface PresentationModeProps {
  monument: Monument;
  onClose: () => void;
}

type Slide = {
  icon: React.ReactNode;
  label: string;
  title: string;
  content: string;
  accent?: boolean;
};

export function PresentationMode({ monument, onClose }: PresentationModeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const slides: Slide[] = [
    {
      icon: <Maximize2 className="w-8 h-8" />,
      label: "Monument",
      title: monument.name,
      content: `${monument.city}, ${monument.country}  ·  ${monument.period}`,
      accent: true,
    },
    {
      icon: <Info className="w-8 h-8" />,
      label: "Historical Overview",
      title: "What is this monument?",
      content: monument.description,
    },
    {
      icon: <Star className="w-8 h-8" />,
      label: "Significance",
      title: "Why does it matter?",
      content: monument.importance,
    },
    {
      icon: <Clock className="w-8 h-8" />,
      label: "Quick Facts",
      title: "Fast Facts",
      content: monument.quickFacts.join("\n"),
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      label: "Fun Fact",
      title: "Did You Know?",
      content: monument.funFact,
      accent: true,
    },
  ];

  const goNext = useCallback(() => {
    setCurrentSlide((s) => (s + 1) % slides.length);
  }, [slides.length]);

  const goPrev = () => {
    setCurrentSlide((s) => (s - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [autoPlay, goNext]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") { setAutoPlay(false); goNext(); }
      if (e.key === "ArrowLeft") { setAutoPlay(false); goPrev(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goNext]);

  const slide = slides[currentSlide];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-2/3 h-2/3 rounded-full bg-primary/8 blur-[150px]" />
        <div className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 rounded-full bg-primary/5 blur-[180px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
      </div>

      {/* Close + controls */}
      <div className="absolute top-6 right-6 flex items-center gap-3 z-10">
        <button
          onClick={() => setAutoPlay((a) => !a)}
          className={`text-xs px-4 py-1.5 rounded-full border transition-colors ${
            autoPlay
              ? "border-primary/40 bg-primary/10 text-primary"
              : "border-white/10 text-muted-foreground hover:text-primary"
          }`}
        >
          {autoPlay ? "Auto-playing" : "Auto-play"}
        </button>
        <button
          onClick={onClose}
          data-testid="button-close-presentation"
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Slide counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setAutoPlay(false); setCurrentSlide(i); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentSlide ? "bg-primary w-8" : "bg-white/20 w-2.5 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Main slide */}
      <div className="relative w-full max-w-4xl px-8 flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className={`w-20 h-20 rounded-full flex items-center justify-center border ${
                slide.accent
                  ? "bg-primary/20 border-primary/40 text-primary shadow-[0_0_40px_rgba(201,162,39,0.3)]"
                  : "bg-white/5 border-white/10 text-muted-foreground"
              }`}
            >
              {slide.icon}
            </motion.div>

            {/* Label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-xs uppercase tracking-[0.3em] text-primary/70 font-medium"
            >
              {slide.label}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`font-serif leading-tight ${
                currentSlide === 0
                  ? "text-4xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ffdf73] to-primary"
                  : "text-3xl md:text-4xl text-foreground"
              }`}
            >
              {slide.title}
            </motion.h2>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl"
            >
              {currentSlide === 3 ? (
                <ul className="text-left space-y-3 mt-2">
                  {monument.quickFacts.map((fact, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.08 }}
                      className="flex items-start gap-3 text-foreground/80 text-lg"
                    >
                      <span className="text-primary mt-1 shrink-0">—</span>
                      <span>{fact}</span>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p
                  className={`leading-relaxed ${
                    currentSlide === 0
                      ? "text-xl md:text-2xl text-muted-foreground font-light tracking-wide"
                      : "text-lg md:text-xl text-foreground/80"
                  }`}
                >
                  {slide.content}
                </p>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6">
        <button
          onClick={() => { setAutoPlay(false); goPrev(); }}
          className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm text-muted-foreground/60 font-mono">
          {currentSlide + 1} / {slides.length}
        </span>
        <button
          onClick={() => { setAutoPlay(false); goNext(); }}
          className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Keyboard hint */}
      <div className="absolute bottom-5 right-6 text-xs text-muted-foreground/40 hidden md:block">
        ← → to navigate · Esc to exit
      </div>
    </motion.div>
  );
}
