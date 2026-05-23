import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, BookOpen, FileText, Compass, ExternalLink, ArrowRight,
} from "lucide-react";
import { Monument } from "@/data/monuments";
import { LEARNING, RecItem } from "@/data/recommendations";

interface ContinueExploringProps {
  monument: Monument;
}

type Tab = "videos" | "books" | "articles";

interface TabConfig {
  id: Tab;
  label: string;
  Icon: React.FC<{ className?: string }>;
  buttonLabel: string;
  buttonColor: string;
}

const TABS: TabConfig[] = [
  {
    id: "videos",
    label: "Videos",
    Icon: Play,
    buttonLabel: "Watch Video",
    buttonColor: "bg-red-600 hover:bg-red-500",
  },
  {
    id: "books",
    label: "Books",
    Icon: BookOpen,
    buttonLabel: "Read Book",
    buttonColor: "bg-amber-600 hover:bg-amber-500",
  },
  {
    id: "articles",
    label: "Articles",
    Icon: FileText,
    buttonLabel: "Read Article",
    buttonColor: "bg-blue-600 hover:bg-blue-500",
  },
];

function SourceBadge({ source }: { source: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground/70 bg-white/5 border border-white/8 rounded-full px-2 py-0.5">
      {source}
    </span>
  );
}

function RecCard({ item, tab }: { item: RecItem; tab: TabConfig }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl border border-white/8 bg-card/40 overflow-hidden
                 transition-all duration-300
                 hover:-translate-y-1.5
                 hover:border-primary/35
                 hover:shadow-xl hover:shadow-primary/12
                 hover:bg-card/60"
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-primary/15 to-background/90 shrink-0">
        <img
          src={item.imageUrl}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover
                     transition-transform duration-500 group-hover:scale-107"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
        {/* Gold shimmer on hover */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/6 transition-colors duration-300" />

        {/* Play button for videos */}
        {tab.id === "videos" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center
                         bg-black/50 border border-white/30
                         group-hover:bg-white group-hover:border-transparent
                         transition-all duration-300 shadow-xl"
            >
              <Play className="w-5 h-5 text-white/90 group-hover:text-black fill-current ml-0.5 transition-colors duration-300" />
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex flex-col gap-1.5 flex-1">
          <h4 className="font-serif text-[15px] font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary/90 transition-colors duration-200">
            {item.title}
          </h4>
          <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-3">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <SourceBadge source={item.source} />

          {/* CTA button */}
          <span
            className={`inline-flex items-center gap-1.5 text-[12px] font-semibold text-white rounded-full px-3.5 py-1.5 transition-all duration-200 shrink-0 ${tab.buttonColor}`}
          >
            <tab.Icon className="w-3 h-3" />
            {tab.buttonLabel}
            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
          </span>
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
    videos:   data.videos,
    books:    data.books,
    articles: data.articles,
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
            Deepen your understanding of {monument.name} through videos, books, and articles
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

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {activeItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.26 }}
            >
              <RecCard item={item} tab={activeTabConfig} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <p className="text-[11px] text-muted-foreground/40 text-center flex items-center justify-center gap-1.5">
        <ExternalLink className="w-3 h-3" />
        All links open in a new tab
      </p>
    </motion.section>
  );
}
