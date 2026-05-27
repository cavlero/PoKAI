import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Play, X, Volume2, Maximize2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const PHOTO_SRC = "/media/historical_photo_1934.jpg";
const VIDEO_SRC = "/media/historical_animation_1934.mp4";
const TITLE     = "Freedom Monument Opening Ceremony, Svishtov, 1934";
const DESCRIPTION =
  "A rare moment from the opening ceremony of the Freedom Monument (Паметника на свободата) in Svishtov, Bulgaria. " +
  "Pictured left to right: Botevian veteran Nikola Slavkov (1st), volunteer Nikolai Petrov (3rd) — great-grandfather of Dr. Ivan Dinkov, " +
  "Mayor of Svishtov Bogdan Penev (6th) — son of Botevian veteran Sava Penev, " +
  "Gospodin Toshev (7th) — Director of DTG 'D. H. Vassilev', and others. " +
  "This ceremony marked a pivotal moment of Bulgarian civic pride between the two World Wars.";

export function HistoricalMediaCard() {
  const [hovered,     setHovered]     = useState(false);
  const [modalOpen,   setModalOpen]   = useState(false);
  const [videoReady,  setVideoReady]  = useState(false);

  const hoverVideoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    const v = hoverVideoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => null);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    const v = hoverVideoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  }, []);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    modalVideoRef.current?.pause();
  }, []);

  // Autoplay in modal when it opens
  useEffect(() => {
    if (modalOpen) {
      setTimeout(() => {
        modalVideoRef.current?.play().catch(() => null);
      }, 200);
    }
  }, [modalOpen]);

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleCloseModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleCloseModal]);

  return (
    <>
      {/* ── Card ─────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative w-full rounded-2xl overflow-hidden border border-primary/25 shadow-[0_0_40px_rgba(201,162,39,0.12)] cursor-pointer select-none"
        style={{ aspectRatio: "4/3" }}
      >
        {/* Gold glow on hover */}
        <div className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}
          style={{ boxShadow: "inset 0 0 60px rgba(201,162,39,0.18)" }} />

        {/* Static photo */}
        <motion.img
          src={PHOTO_SRC}
          alt={TITLE}
          draggable={false}
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Hover video — always mounted, opacity-controlled */}
        <motion.video
          ref={hoverVideoRef}
          src={VIDEO_SRC}
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setVideoReady(true)}
          animate={{ opacity: hovered && videoReady ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040d1f]/90 via-[#040d1f]/20 to-transparent z-20" />

        {/* Film-strip top bar */}
        <div className="absolute top-0 left-0 right-0 h-7 z-30 flex items-center gap-2 px-3 bg-black/60 backdrop-blur-sm">
          <Film className="w-3 h-3 text-primary/70" />
          <span className="text-[9px] font-mono text-primary/50 tracking-widest uppercase">
            {hovered ? "▶ Playing · 1934" : "Historical Archive · 1934"}
          </span>
          <div className="flex gap-1 ml-auto">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-1.5 h-4 bg-primary/15 rounded-[1px]" />
            ))}
          </div>
        </div>

        {/* "Now Playing" pill — hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.9 }}
              className="absolute top-10 right-3 z-30 flex items-center gap-1.5 bg-primary/90 text-primary-foreground rounded-full px-3 py-1 text-[10px] font-semibold shadow-lg"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-pulse" />
              Now Playing
            </motion.div>
          )}
        </AnimatePresence>

        {/* "Hover to Animate" hint — default */}
        <AnimatePresence>
          {!hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-10 right-3 z-30 flex items-center gap-1.5 border border-white/15 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-[10px] text-white/50"
            >
              <Play className="w-2.5 h-2.5" />
              Hover to animate
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 z-30 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-medium text-primary/60 uppercase tracking-widest mb-1.5">
                Historical Archive
              </p>
              <h3 className="font-serif text-base sm:text-lg font-bold text-foreground leading-snug">
                {TITLE}
              </h3>
            </div>

            <Button
              size="sm"
              onClick={handleOpenModal}
              className="shrink-0 bg-primary/90 hover:bg-primary text-primary-foreground rounded-full px-4 gap-2 text-xs shadow-[0_0_20px_rgba(201,162,39,0.4)] hover:shadow-[0_0_30px_rgba(201,162,39,0.6)] transition-all hover:scale-105"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Bring History to Life
            </Button>
          </div>
        </div>
      </motion.div>

      {/* ── Modal ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md"
            onClick={handleCloseModal}
          >
            <motion.div
              key="modal-content"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, type: "spring", damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-card border border-primary/30 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(201,162,39,0.2)]"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/8 bg-black/40">
                <div className="flex items-center gap-2.5">
                  <Film className="w-4 h-4 text-primary" />
                  <span className="font-serif text-sm font-semibold text-foreground">Historical Archive</span>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="w-7 h-7 rounded-full border border-white/15 bg-white/5 hover:bg-white/12 flex items-center justify-center transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>

              {/* Video */}
              <div className="relative bg-black" style={{ aspectRatio: "4/3" }}>
                <video
                  ref={modalVideoRef}
                  src={VIDEO_SRC}
                  controls
                  playsInline
                  loop
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Info */}
              <div className="p-5 space-y-3">
                <div className="flex items-start gap-2">
                  <div className="shrink-0 w-1 h-full min-h-[3rem] bg-primary/40 rounded-full mt-0.5" />
                  <div>
                    <h4 className="font-serif text-base font-bold text-foreground mb-1.5">{TITLE}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{DESCRIPTION}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1 text-[10px] text-muted-foreground/40">
                  <Info className="w-3 h-3" />
                  <span>Source: Municipal Archive, Svishtov · Digitized for TimeLens Heritage</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
