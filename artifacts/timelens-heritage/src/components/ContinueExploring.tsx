import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Headphones, Compass, ExternalLink,
  Play, Square, ArrowRight, Shield, Crown, Globe, BookOpen,
} from "lucide-react";
import { Monument } from "@/data/monuments";
import { LEARNING, RecItem, AudioGuideItem } from "@/data/recommendations";

interface ContinueExploringProps {
  monument: Monument;
}

type Tab = "articles" | "audioGuide";

// ─── Article Card ────────────────────────────────────────────────────────────
function ArticleCard({ item }: { item: RecItem }) {
  const [imgError, setImgError] = useState(false);

  const getFallbackIcon = () => {
    const t = item.title.toLowerCase();
    if (t.includes("ivan") || t.includes("asen") || t.includes("tsar") || t.includes("king") || t.includes("ruler"))
      return <Crown className="w-9 h-9 text-primary/60" />;
    if (t.includes("fortress") || t.includes("tsarevets") || t.includes("novae") || t.includes("castle"))
      return <Shield className="w-9 h-9 text-primary/60" />;
    if (t.includes("empire") || t.includes("map") || t.includes("province") || t.includes("frontier"))
      return <Globe className="w-9 h-9 text-primary/60" />;
    if (t.includes("monastery") || t.includes("rila") || t.includes("church") || t.includes("saint"))
      return <BookOpen className="w-9 h-9 text-primary/60" />;
    return <FileText className="w-9 h-9 text-primary/60" />;
  };

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl border border-white/8 bg-card/40 overflow-hidden
                 transition-all duration-300
                 hover:-translate-y-1.5 hover:border-primary/35
                 hover:shadow-xl hover:shadow-primary/12 hover:bg-card/60"
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden shrink-0 rounded-t-2xl bg-gradient-to-br from-[#0d1a3a] to-[#060e21]">
        {!imgError && (
          <img
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Fallback — shown when image errors or while loading with error */}
        {imgError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5">
            <div className="w-14 h-14 rounded-full bg-primary/12 border border-primary/25 flex items-center justify-center">
              {getFallbackIcon()}
            </div>
            <p className="font-serif text-[13px] text-primary/80 text-center leading-snug">
              {item.title}
            </p>
          </div>
        )}

        {/* Gradient overlay — only over real image */}
        {!imgError && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/6 transition-colors duration-300" />
          </>
        )}

        {/* Source badge */}
        <span className="absolute bottom-2.5 right-2.5 text-[10px] font-semibold text-white bg-blue-600/90 rounded-md px-2 py-0.5 flex items-center gap-1 backdrop-blur-sm">
          <FileText className="w-2.5 h-2.5" /> Article
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        <h4 className="font-serif text-[14px] font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary/90 transition-colors duration-200">
          {item.title}
        </h4>
        <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {item.description}
        </p>
        <div className="flex items-center justify-between gap-3 pt-1">
          <span className="text-[10px] font-medium text-muted-foreground/60 bg-white/5 border border-white/8 rounded-full px-2 py-0.5">
            {item.source}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-full px-3 py-1 transition-colors shrink-0">
            <FileText className="w-2.5 h-2.5" />
            Read Article
            <ArrowRight className="w-2.5 h-2.5 opacity-0 -translate-x-0.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
          </span>
        </div>
      </div>
    </a>
  );
}

// ─── Audio Waveform ───────────────────────────────────────────────────────────
function AudioWaveform() {
  const bars = Array.from({ length: 24 });
  return (
    <div className="flex items-end gap-0.5 h-7 mt-3 px-1">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="flex-1 bg-primary/70 rounded-full"
          animate={{ height: ["3px", `${8 + Math.random() * 16}px`, "3px"] }}
          transition={{
            duration: 0.5 + Math.random() * 0.4,
            repeat: Infinity,
            delay: i * 0.04,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Audio Guide Card ─────────────────────────────────────────────────────────
function AudioGuideCard({
  item,
  isPlaying,
  onToggle,
  index,
}: {
  item: AudioGuideItem;
  isPlaying: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.26 }}
      className={`rounded-2xl border p-5 transition-all duration-300 ${
        isPlaying
          ? "border-primary/50 bg-primary/10 shadow-lg shadow-primary/15"
          : "border-white/8 bg-card/40 hover:border-primary/25 hover:bg-card/60"
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Play / Stop button */}
        <button
          onClick={onToggle}
          aria-label={isPlaying ? "Stop audio" : "Play audio"}
          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
            isPlaying
              ? "bg-primary text-black shadow-[0_0_16px_rgba(201,162,39,0.5)] hover:scale-95"
              : "bg-primary/20 border border-primary/40 text-primary hover:bg-primary hover:text-black hover:scale-105"
          }`}
        >
          {isPlaying ? (
            <Square className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] text-primary/50 font-mono uppercase tracking-widest">
              {item.duration}
            </span>
            {isPlaying && (
              <span className="text-[10px] text-primary font-medium animate-pulse">
                ● Now playing
              </span>
            )}
          </div>
          <h4 className="font-serif text-[14px] font-semibold text-foreground leading-snug">
            {item.title}
          </h4>
          <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">
            {item.intro}
          </p>
        </div>
      </div>

      {isPlaying && <AudioWaveform />}
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function ContinueExploring({ monument }: ContinueExploringProps) {
  const [activeTab, setActiveTab] = useState<Tab>("articles");
  const [playing, setPlaying] = useState<string | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Cleanup TTS on unmount
  useEffect(() => {
    return () => { window.speechSynthesis.cancel(); };
  }, []);

  // Stop TTS when leaving audio tab
  useEffect(() => {
    if (activeTab !== "audioGuide") {
      window.speechSynthesis.cancel();
      setPlaying(null);
    }
  }, [activeTab]);

  function togglePlay(title: string, script: string) {
    if (playing === title) {
      window.speechSynthesis.cancel();
      setPlaying(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(script);
    utt.rate = 0.88;
    utt.pitch = 1.05;
    utt.onend = () => setPlaying(null);
    utt.onerror = () => setPlaying(null);
    utteranceRef.current = utt;
    setPlaying(title);
    window.speechSynthesis.speak(utt);
  }

  const data = LEARNING[monument.id];
  if (!data) return null;

  const TABS: { id: Tab; label: string; Icon: React.FC<{ className?: string }> }[] = [
    { id: "articles",   label: "Articles",    Icon: FileText   },
    { id: "audioGuide", label: "Audio Guide", Icon: Headphones },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
          <Compass className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h2 className="font-serif text-xl font-bold text-foreground">Continue Exploring</h2>
          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
            <span className="text-primary/60">Read</span>
            <span className="text-white/20">·</span>
            <span className="text-primary/60">Listen</span>
            <span className="text-white/20">·</span>
            <span className="text-primary/60">Explore</span>
          </p>
        </div>
      </div>

      {/* Tab pills */}
      <div className="flex gap-2">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap border ${
              activeTab === id
                ? "bg-primary/20 border-primary/40 text-primary"
                : "bg-white/5 border-white/8 text-muted-foreground hover:bg-white/8 hover:text-foreground hover:border-white/15"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* Articles */}
          {activeTab === "articles" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.articles.map((item) => (
                <ArticleCard key={item.title} item={item} />
              ))}
            </div>
          )}

          {/* Audio Guide */}
          {activeTab === "audioGuide" && (
            <div className="space-y-3">
              <p className="text-[12px] text-muted-foreground/60 flex items-center gap-1.5 pb-1">
                <Headphones className="w-3.5 h-3.5" />
                Museum-style narration using your device's built-in voice. Press play on any track.
              </p>
              {data.audioGuide.map((item, i) => (
                <AudioGuideCard
                  key={item.title}
                  item={item}
                  isPlaying={playing === item.title}
                  onToggle={() => togglePlay(item.title, item.script)}
                  index={i}
                />
              ))}
            </div>
          )}

        </motion.div>
      </AnimatePresence>

      <p className="text-[11px] text-muted-foreground/35 text-center flex items-center justify-center gap-1.5">
        <ExternalLink className="w-3 h-3" />
        All links open in a new tab
      </p>
    </motion.section>
  );
}
