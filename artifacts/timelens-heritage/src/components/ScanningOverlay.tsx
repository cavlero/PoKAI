import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

const STEPS = [
  { label: "Scanning visual features...",                  progress: 12 },
  { label: "Detecting architectural elements...",          progress: 28 },
  { label: "Comparing with Bulgarian heritage database...", progress: 48 },
  { label: "Searching historical archives...",             progress: 66 },
  { label: "Matching with local Svishtov heritage...",     progress: 83 },
  { label: "Generating historical interpretation...",      progress: 95 },
];

const STEP_DURATION = 800;

interface ScanningOverlayProps {
  previewUrl?: string | null;
}

export function ScanningOverlay({ previewUrl }: ScanningOverlayProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [complete,  setComplete]  = useState(false);

  useEffect(() => {
    if (complete || stepIndex >= STEPS.length - 1) return;
    const t = setTimeout(() => setStepIndex((s) => s + 1), STEP_DURATION);
    return () => clearTimeout(t);
  }, [stepIndex, complete]);

  useEffect(() => {
    const total = STEPS.length * STEP_DURATION + 600;
    const t = setTimeout(() => setComplete(true), total);
    return () => clearTimeout(t);
  }, []);

  const step            = STEPS[stepIndex];
  const displayProgress = complete ? 100 : step.progress;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ opacity: complete ? 0.18 : 0.08 }}
          transition={{ duration: 1.2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-primary blur-[180px]"
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,162,39,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative w-full max-w-lg flex flex-col items-center gap-8">

        {/* Image with scan overlay */}
        <div className="relative w-72 h-52 md:w-96 md:h-64 rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_60px_rgba(201,162,39,0.25)]">
          {previewUrl ? (
            <motion.img
              src={previewUrl}
              alt="Analyzing"
              animate={{ filter: complete ? "brightness(0.5) sepia(0.6)" : "brightness(0.65)" }}
              transition={{ duration: 1.5 }}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-card/60" />
          )}

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(201,162,39,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.6) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Scan beam */}
          {!complete && (
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-0.5 bg-primary shadow-[0_0_18px_5px_rgba(201,162,39,0.55)] z-20"
            />
          )}

          {/* Corner brackets */}
          {(["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"] as const).map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-5 h-5 border-primary/80 ${
                i === 0 ? "border-t-2 border-l-2" :
                i === 1 ? "border-t-2 border-r-2" :
                i === 2 ? "border-b-2 border-l-2" :
                           "border-b-2 border-r-2"
              }`}
            />
          ))}

          {/* Completion flash */}
          <AnimatePresence>
            {complete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black/40"
              >
                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  <CheckCircle className="w-16 h-16 text-primary drop-shadow-[0_0_20px_rgba(201,162,39,0.9)]" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Step list — all steps visible, active one highlighted */}
        <div className="w-full space-y-2">
          {STEPS.map((s, i) => {
            const isDone    = complete || i < stepIndex;
            const isActive  = !complete && i === stepIndex;
            const isPending = !complete && i > stepIndex;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: isPending ? 0.25 : 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`flex items-center gap-3 text-sm transition-all ${
                  isActive ? "text-primary font-medium" : isDone ? "text-primary/60" : "text-muted-foreground/30"
                }`}
              >
                <motion.div
                  animate={{
                    scale:           isActive ? [1, 1.35, 1] : 1,
                    backgroundColor: isDone   ? "hsl(var(--primary))" : isActive ? "hsl(var(--primary))" : "rgba(255,255,255,0.12)",
                  }}
                  transition={isActive ? { duration: 0.7, repeat: Infinity } : {}}
                  className="w-2 h-2 rounded-full shrink-0"
                />
                <span>{s.label}</span>
                {isDone && !isActive && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-auto text-primary/50 text-xs"
                  >
                    done
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Status / completion message */}
        <div className="text-center min-h-[2.5rem] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {complete ? (
              <motion.div
                key="complete"
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex flex-col items-center gap-1"
              >
                <p className="text-xl md:text-2xl font-serif text-primary">
                  Heritage object identified.
                </p>
                <p className="text-xs text-primary/60 uppercase tracking-widest">
                  Opening historical record...
                </p>
              </motion.div>
            ) : (
              <motion.p
                key="engine"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-muted-foreground/40 uppercase tracking-widest"
              >
                TimeLens Heritage AI · Visual Recognition Engine
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-full space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground/50">
            <span>Analysis progress</span>
            <motion.span key={displayProgress} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}>
              {displayProgress}%
            </motion.span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${displayProgress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-primary/70 to-primary shadow-[0_0_10px_rgba(201,162,39,0.7)]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
