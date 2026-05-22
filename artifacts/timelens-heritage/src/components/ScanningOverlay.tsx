import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { label: "Scanning visual features...", progress: 28 },
  { label: "Comparing with heritage database...", progress: 64 },
  { label: "Generating historical interpretation...", progress: 91 },
];

interface ScanningOverlayProps {
  previewUrl?: string | null;
}

export function ScanningOverlay({ previewUrl }: ScanningOverlayProps) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (stepIndex >= STEPS.length - 1) return;
    const t = setTimeout(() => setStepIndex((s) => s + 1), 1000);
    return () => clearTimeout(t);
  }, [stepIndex]);

  const step = STEPS[stepIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/97 backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-primary/6 blur-[160px]" />
      </div>

      <div className="relative w-full max-w-lg flex flex-col items-center gap-8">
        {/* Image preview with scanning effect */}
        <div className="relative w-72 h-52 md:w-96 md:h-64 rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_40px_rgba(201,162,39,0.2)]">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Analyzing"
              className="w-full h-full object-cover brightness-75"
            />
          ) : (
            <div className="w-full h-full bg-card/60" />
          )}

          {/* Scan beam */}
          <motion.div
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-0.5 bg-primary/90 shadow-[0_0_16px_4px_rgba(201,162,39,0.5)] z-20"
          />

          {/* Corner markers */}
          {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-5 h-5 border-primary/80 ${
                i === 0 ? "border-t-2 border-l-2 rounded-tl" :
                i === 1 ? "border-t-2 border-r-2 rounded-tr" :
                i === 2 ? "border-b-2 border-l-2 rounded-bl" :
                           "border-b-2 border-r-2 rounded-br"
              }`}
            />
          ))}

          {/* Overlay grid lines */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "linear-gradient(rgba(201,162,39,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.5) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Step label */}
        <div className="text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-lg md:text-xl font-serif text-primary mb-1"
            >
              {step.label}
            </motion.p>
          </AnimatePresence>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            AI Visual Recognition Engine
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="flex justify-between text-xs text-muted-foreground/60 mb-2">
            <span>Analysis progress</span>
            <motion.span
              key={step.progress}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {step.progress}%
            </motion.span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full shadow-[0_0_8px_rgba(201,162,39,0.6)]"
              animate={{ width: `${step.progress}%` }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-6">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <motion.div
                animate={{
                  backgroundColor: i <= stepIndex ? "hsl(var(--primary))" : "rgba(255,255,255,0.08)",
                  borderColor: i <= stepIndex ? "hsl(var(--primary))" : "rgba(255,255,255,0.15)",
                }}
                className="w-2.5 h-2.5 rounded-full border"
              />
              {i < STEPS.length - 1 && (
                <motion.div
                  animate={{ backgroundColor: i < stepIndex ? "hsl(var(--primary)/0.4)" : "rgba(255,255,255,0.08)" }}
                  className="w-8 h-0.5 rounded-full"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
