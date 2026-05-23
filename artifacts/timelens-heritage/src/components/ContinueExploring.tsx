import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Film, Clapperboard, BookOpen, Mic, Compass, ExternalLink } from "lucide-react";
import { Monument } from "@/data/monuments";
import { LEARNING, RecItem } from "@/data/recommendations";

interface ContinueExploringProps {
  monument: Monument;
}

type Tab = "videos" | "documentaries" | "movies" | "books" | "podcasts";

interface TabConfig {
  id: Tab;
  label: string;
  Icon: React.FC<{ className?: string }>;
  action: string;
  showPlay: boolean;
  badge: string;
}

const TABS: TabConfig[] = [
  { id: "videos",        label: "Videos",        Icon: Play,        action: "Watch",  showPlay: true,  badge: "bg-red-600"    },
  { id: "documentaries", label: "Documentaries",  Icon: Film,        action: "Watch",  showPlay: true,  badge: "bg-blue-600"   },
  { id: "movies",        label: "Movies",         Icon: Clapperboard,action: "IMDb",   showPlay: false, badge: "bg-yellow-600" },
  { id: "books",         label: "Books",          Icon: BookOpen,    action: "Read",   showPlay: false, badge: "bg-amber-600"  },
  { id: "podcasts",      label: "Podcasts",       Icon: Mic,         action: "Listen", showPlay: false, badge: "bg-teal-600"   },
];

function RecCard({ item, tab }: { item: RecItem; tab: TabConfig }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-xl border border-white/8 bg-card/50 overflow-hidden flex flex-col
                 transition-all duration-300
                 hover:-translate-y-1.5
                 hover:border-primary/40
                 hover:shadow-xl hover:shadow-primary/15
                 cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-primary/20 to-background/80 shrink-0">
        <img
          src={item.imageUrl}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Gold overlay shimmer on hover */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/8 transition-colors duration-300" />

        {/* Play button overlay for videos/documentaries */}
        {tab.showPlay && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-11 h-11 rounded-full
                            bg-black/50 group-hover:bg-white/95
                            border border-white/40 group-hover:border-transparent
                            flex items-center justify-center
                            transition-all duration-300 shadow-lg">
              <Play className="w-4 h-4 text-white/90 group-hover:text-black fill-current ml-0.5 transition-colors duration-300" />
            </div>
          </div>
        )}

        {/* Bottom-left: duration/note */}
        {item.note && (
          <span className="absolute bottom-2.5 left-2.5 text-[11px] text-white/80 bg-black/60 rounded-md px-1.5 py-0.5 font-mono backdrop-blur-sm">
            {item.note}
          </span>
        )}

        {/* Bottom-right: action badge */}
        <span className={`absolute bottom-2.5 right-2.5 flex items-center gap-1 text-[11px] text-white font-medium ${tab.badge} rounded-md px-2 py-0.5`}>
          <tab.Icon className="w-2.5 h-2.5" />
          {tab.action}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h4 className="font-serif text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {item.title}
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {item.description}
        </p>
        <div className="flex items-center justify-between gap-2 pt-1 mt-auto">
          <span className="text-[11px] text-primary/60 truncate">{item.creator}</span>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground/50 shrink-0">
            <span>{item.year}</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-60 transition-opacity" />
          </div>
        </div>
      </div>
    </a>
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
  const activeTabConfig = TABS.find((t) => t.id === activeTab)!;

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

      {/* Tab pills */}
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

      {/* Cards grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.22 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {activeItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.28 }}
            >
              <RecCard item={item} tab={activeTabConfig} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <p className="text-[11px] text-muted-foreground/40 text-center flex items-center justify-center gap-1.5">
        <ExternalLink className="w-3 h-3" />
        Each card opens on your preferred platform in a new tab
      </p>
    </motion.section>
  );
}
