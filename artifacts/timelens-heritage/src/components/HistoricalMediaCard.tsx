import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, X, Info, Maximize2, ArrowLeftRight, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MONUMENTS } from "@/data/monuments";

type ArchiveItem = {
  id: string;
  name: string;
  city: string;
  country: string;
  period: string;
  description: string;
  pastImageUrl: string;
  modernImageUrl: string;
  single?: boolean; // single archival image — no past↔today morph
};

// The 6 heritage sites with a reconstruction (past) + present-day image pair
const MONUMENT_ITEMS: ArchiveItem[] = MONUMENTS
  .filter((m) => m.pastImageUrl && m.modernImageUrl)
  .map((m) => ({
    id: m.id,
    name: m.name,
    city: m.city,
    country: m.country,
    period: m.period,
    description: m.description,
    pastImageUrl: m.pastImageUrl!,
    modernImageUrl: m.modernImageUrl!,
  }));

// Two more real archive entries from the remaining assets
const EXTRA_ITEMS: ArchiveItem[] = [
  {
    id: "freedom-1934",
    name: "Freedom Monument Opening, Svishtov",
    city: "Svishtov",
    country: "Bulgaria",
    period: "1934",
    description:
      "A rare photograph from the opening ceremony of the Freedom Monument (Паметника на свободата) in Svishtov, Bulgaria. " +
      "Veterans of the Botev detachment, the mayor and local dignitaries gathered to honour the fight for liberty — a pivotal moment of Bulgarian civic pride between the two World Wars.",
    pastImageUrl: "/media/historical_photo_1934.jpg",
    modernImageUrl: "/media/historical_photo_1934.jpg",
    single: true,
  },
  {
    id: "tsarevets-show",
    name: "Tsarevets · Sound & Light Show",
    city: "Veliko Tarnovo",
    country: "Bulgaria",
    period: "12th C. – Present",
    description:
      "Every night the medieval walls of Tsarevets blaze to life in a legendary sound-and-light spectacle — colored beams sweep the towers while Beethoven's Ninth Symphony echoes across the Yantra valley, retelling the rise and fall of the Second Bulgarian Empire.",
    pastImageUrl: "/images/tsarevets_past.png",
    modernImageUrl: "/images/tsarevets_today_alt.png",
  },
  {
    id: "khan-asparuh",
    name: "Khan Asparuh — Founder of Bulgaria",
    city: "First Bulgarian Empire",
    country: "Bulgaria",
    period: "7th Century · 681 AD",
    description:
      "Son of Kubrat and leader of the Bulgars, Khan Asparuh crossed the Danube and allied with the seven Slavic tribes to found Bulgaria — a new state recognized by Byzantium under the Treaty of 681 AD, the birth certificate of the Bulgarian nation.",
    pastImageUrl: "/portraits/khan_asparuh.png",
    modernImageUrl: "/portraits/khan_asparuh.png",
    single: true,
  },
  {
    id: "ivan-asen",
    name: "Tsar Ivan Asen II",
    city: "Tsarevets, Veliko Tarnovo",
    country: "Bulgaria",
    period: "1218–1241",
    description:
      "Sovereign of the Second Bulgarian Empire at its zenith. From his seat at Tsarevets he ruled lands stretching from the Black Sea to the Adriatic, won the decisive Battle of Klokotnitsa in 1230, and secured an independent Bulgarian Patriarchate.",
    pastImageUrl: "/portraits/ivan_asen.png",
    modernImageUrl: "/portraits/ivan_asen.png",
    single: true,
  },
];

const ITEMS: ArchiveItem[] = [...MONUMENT_ITEMS, ...EXTRA_ITEMS];

export function HistoricalMediaCard() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hovered, setHovered]     = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showToday, setShowToday] = useState(false);

  const active = ITEMS[activeIdx];
  const morphs = !active.single;

  const go = useCallback((dir: number) => {
    setActiveIdx((i) => (i + dir + ITEMS.length) % ITEMS.length);
  }, []);

  const openModal = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setShowToday(false);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setModalOpen(false), []);

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeModal]);

  return (
    <>
      {/* ── Gallery card ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-primary/25 bg-card/40 backdrop-blur-sm shadow-[0_0_40px_rgba(201,162,39,0.12)]"
      >
        {/* Film-strip top bar */}
        <div className="h-7 flex items-center gap-2 px-3 bg-black/60 backdrop-blur-sm border-b border-white/5">
          <Film className="w-3 h-3 text-primary/70" />
          <span className="text-[9px] font-mono text-primary/50 tracking-widest uppercase truncate">
            Historical Archive · {active.period}
          </span>
          <span className="ml-auto text-[9px] font-mono text-primary/40 tabular-nums shrink-0">
            {String(activeIdx + 1).padStart(2, "0")} / {String(ITEMS.length).padStart(2, "0")}
          </span>
        </div>

        {/* Main viewer — hover to morph reconstruction → today */}
        <div
          className="group relative cursor-pointer select-none overflow-hidden"
          style={{ aspectRatio: "16/9" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => openModal()}
        >
          <div key={active.id} className="absolute inset-0">
            <motion.img
              src={active.pastImageUrl}
              alt={`${active.name} — reconstruction`}
              draggable={false}
              initial={{ opacity: 0 }}
              animate={{ opacity: morphs && hovered ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {morphs && (
              <motion.img
                src={active.modernImageUrl}
                alt={`${active.name} — today`}
                draggable={false}
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>

          {/* gold glow on hover */}
          <div
            className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}
            style={{ boxShadow: "inset 0 0 60px rgba(201,162,39,0.18)" }}
          />

          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#040d1f]/90 via-[#040d1f]/15 to-transparent z-20" />

          {/* prev / next arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/50 hover:bg-primary/90 border border-white/15 text-white hover:text-primary-foreground backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/50 hover:bg-primary/90 border border-white/15 text-white hover:text-primary-foreground backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* past / today pill */}
          <div
            className="absolute top-2.5 right-2.5 z-30 flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold backdrop-blur-sm border transition-colors duration-300"
            style={{
              background: morphs && hovered ? "rgba(201,162,39,0.9)" : "rgba(0,0,0,0.5)",
              color: morphs && hovered ? "hsl(var(--primary-foreground))" : "rgba(255,255,255,0.6)",
              borderColor: morphs && hovered ? "transparent" : "rgba(255,255,255,0.15)",
            }}
          >
            {morphs ? (
              <>
                <ArrowLeftRight className="w-2.5 h-2.5" />
                {hovered ? "Today" : "Hover: see it now"}
              </>
            ) : (
              <>
                <Film className="w-2.5 h-2.5" />
                Archive · {active.period}
              </>
            )}
          </div>

          {/* bottom content */}
          <div className="absolute bottom-0 left-0 right-0 z-30 p-4">
            <div className="flex items-end justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="flex items-center gap-1 text-[10px] font-medium text-primary/70 uppercase tracking-widest mb-1">
                  <MapPin className="w-2.5 h-2.5" />
                  {active.city}
                </p>
                <h3 className="font-serif text-base sm:text-lg font-bold text-foreground leading-snug truncate">
                  {active.name}
                </h3>
              </div>
              <Button
                size="sm"
                onClick={openModal}
                className="shrink-0 bg-primary/90 hover:bg-primary text-primary-foreground rounded-full px-3.5 gap-1.5 text-xs shadow-[0_0_20px_rgba(201,162,39,0.4)] hover:shadow-[0_0_30px_rgba(201,162,39,0.6)] transition-all hover:scale-105"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open Archive</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Position dots */}
        <div className="flex items-center justify-center gap-1.5 py-3 bg-black/30">
          {ITEMS.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActiveIdx(i)}
              aria-label={item.name}
              title={item.name}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIdx ? "w-5 bg-primary" : "w-1.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
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
            onClick={closeModal}
          >
            <motion.div
              key="modal-content"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, type: "spring", damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-card border border-primary/30 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(201,162,39,0.2)] max-h-[90vh] flex flex-col"
            >
              {/* header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/8 bg-black/40 shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Film className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-serif text-sm font-semibold text-foreground truncate">
                    {active.name}
                  </span>
                </div>
                <button
                  onClick={closeModal}
                  className="w-7 h-7 rounded-full border border-white/15 bg-white/5 hover:bg-white/12 flex items-center justify-center transition-colors shrink-0"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>

              <div className="overflow-y-auto">
                {/* image with optional past/today toggle */}
                <div className="relative bg-black" style={{ aspectRatio: "16/9" }}>
                  <img
                    src={morphs && showToday ? active.modernImageUrl : active.pastImageUrl}
                    alt={active.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {morphs && (
                    <button
                      onClick={() => setShowToday((s) => !s)}
                      className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-primary/90 hover:bg-primary text-primary-foreground rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-lg transition-all hover:scale-105"
                    >
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                      {showToday ? "Show reconstruction" : "Show today"}
                    </button>
                  )}
                  <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest text-white/70 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
                    {morphs ? (showToday ? "Today" : `Reconstruction · ${active.period}`) : `Archive · ${active.period}`}
                  </span>
                </div>

                {/* info */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="shrink-0 w-1 self-stretch min-h-[3rem] bg-primary/40 rounded-full" />
                    <div>
                      <p className="flex items-center gap-1 text-[11px] text-primary/70 uppercase tracking-widest mb-1">
                        <MapPin className="w-3 h-3" />
                        {active.city}, {active.country} · {active.period}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{active.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1 text-[10px] text-muted-foreground/40">
                    <Info className="w-3 h-3" />
                    <span>Digitized for PokAI Heritage · {ITEMS.length} sites in archive</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
