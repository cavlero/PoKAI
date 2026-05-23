import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Film, Clapperboard, BookOpen, Mic, ExternalLink, Compass } from "lucide-react";
import { Monument } from "@/data/monuments";
import { LEARNING, RecItem } from "@/data/recommendations";

interface ContinueExploringProps {
  monument: Monument;
}

type Tab = "videos" | "documentaries" | "movies" | "books" | "podcasts";

const TABS: { id: Tab; label: string; Icon: React.FC<{ className?: string }> }[] = [
  { id: "videos",        label: "Videos",         Icon: Play },
  { id: "documentaries", label: "Documentaries",   Icon: Film },
  { id: "movies",        label: "Movies",          Icon: Clapperboard },
  { id: "books",         label: "Books",           Icon: BookOpen },
  { id: "podcasts",      label: "Podcasts",        Icon: Mic },
];

function RecCard({ item, icon: Icon }: { item: RecItem; icon: React.FC<{ className?: string }> }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="group rounded-xl border border-white/8 bg-card/50 overflow-hidden hover:border-primary/30 hover:bg-card/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5 flex flex-col"
    >
      {/* Thumbnail */}
      <div className={`bg-gradient-to-br ${item.color} relative h-28 flex items-center justify-center shrink-0`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
            <Icon className="w-5 h-5 text-white/90" />
          </div>
        </div>
        {item.note && (
          <span className="absolute bottom-2 right-2 z-10 text-[10px] text-white/70 bg-black/40 rounded px-1.5 py-0.5 font-mono">
            {item.note}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h4 className="font-serif text-sm font-semibold text-foreground leading-snug line-clamp-2">
          {item.title}
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {item.description}
        </p>
        <div className="flex items-center justify-between gap-2 pt-1 mt-auto">
          <span className="text-[11px] text-primary/60 truncate">{item.creator}</span>
          <span className="text-[11px] text-muted-foreground/50 shrink-0">{item.year}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function ContinueExploring({ monument }: ContinueExploringProps) {
  const [activeTab, setActiveTab] = useState<Tab>("videos");
  const data = LEARNING[monument.id];
  if (!data) return null;

  const tabData: Record<Tab, RecItem[]> = {
    videos:        data.videos,
    documentaries: data.documentaries,
    movies:        data.movies,
    books:         data.books,
    podcasts:      data.podcasts,
  };

  const activeItems = tabData[activeTab];
  const activeTabMeta = TABS.find((t) => t.id === activeTab)!;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
          <Compass className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h2 className="font-serif text-xl font-bold text-foreground">Continue Exploring</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Deepen your understanding of {monument.name} and its historical world
          </p>
        </div>
      </div>

      {/* Tab Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap shrink-0 border ${
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

      {/* Cards Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {activeItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
            >
              <RecCard item={item} icon={activeTabMeta.Icon} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Footer note */}
      <p className="text-[11px] text-muted-foreground/40 text-center flex items-center justify-center gap-1.5">
        <ExternalLink className="w-3 h-3" />
        Search titles on your preferred platform to find them
      </p>
    </motion.section>
  );
}
