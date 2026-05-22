import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Trash2, BookOpen, MapPin, CalendarDays, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export type GalleryEntry = {
  id: string;
  monumentId: string;
  monumentName: string;
  city: string;
  country: string;
  period: string;
  imageDataUrl: string;
  analyzedAt: string;
};

const STORAGE_KEY = "timelens_gallery";

export function loadGallery(): GalleryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as GalleryEntry[]) : [];
  } catch {
    return [];
  }
}

export function saveToGallery(entry: GalleryEntry): void {
  const existing = loadGallery();
  const updated = [entry, ...existing].slice(0, 50);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export default function Gallery() {
  const [entries, setEntries] = useState<GalleryEntry[]>([]);
  const [selected, setSelected] = useState<GalleryEntry | null>(null);

  useEffect(() => {
    setEntries(loadGallery());
  }, []);

  const handleDelete = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (selected?.id === id) setSelected(null);
  };

  const handleClearAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setEntries([]);
    setSelected(null);
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Home
          </Button>
        </Link>
        <h1 className="font-serif text-xl text-primary font-bold tracking-wider">Gallery of Discoveries</h1>
        {entries.length > 0 ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="text-muted-foreground hover:text-destructive"
            data-testid="button-clear-gallery"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        ) : (
          <div className="w-24" />
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-12">
        {entries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <BookOpen className="w-9 h-9 text-muted-foreground/40" />
            </div>
            <h2 className="text-2xl font-serif text-foreground/60 mb-3">No Discoveries Yet</h2>
            <p className="text-muted-foreground max-w-sm mb-8">
              Upload and analyze a monument on the Explore page to begin building your personal gallery of historical discoveries.
            </p>
            <Link href="/explore">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 font-serif">
                Start Exploring
              </Button>
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-serif text-foreground">
                  Your Discoveries
                </h2>
                <p className="text-muted-foreground mt-1">
                  {entries.length} monument{entries.length !== 1 ? "s" : ""} explored
                </p>
              </div>
              <Link href="/explore">
                <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/5 rounded-full">
                  Explore More
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {entries.map((entry, i) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -4 }}
                    data-testid={`card-gallery-${entry.id}`}
                    className="group relative rounded-2xl border border-white/10 bg-card/50 backdrop-blur overflow-hidden cursor-pointer shadow-lg hover:border-primary/30 hover:shadow-[0_0_30px_rgba(201,162,39,0.1)] transition-all"
                    onClick={() => setSelected(entry)}
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] bg-background/60 overflow-hidden">
                      {entry.imageDataUrl ? (
                        <img
                          src={entry.imageDataUrl}
                          alt={entry.monumentName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageOff className="w-10 h-10 text-muted-foreground/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      {/* Delete button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(entry.id);
                        }}
                        data-testid={`button-delete-${entry.id}`}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/70 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20 hover:border-destructive/30 hover:text-destructive text-muted-foreground"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      {/* Period badge */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary/80 text-primary-foreground text-xs font-medium">
                        {entry.period}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-serif text-base text-foreground mb-2 leading-snug">
                        {entry.monumentName}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span>{entry.city}, {entry.country}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                        <CalendarDays className="w-3 h-3 shrink-0" />
                        <span>{formatDate(entry.analyzedAt)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-card border border-white/10 rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/9] bg-background">
                {selected.imageDataUrl ? (
                  <img
                    src={selected.imageDataUrl}
                    alt={selected.monumentName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageOff className="w-12 h-12 text-muted-foreground/30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/70 border border-white/20 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs mb-3">
                  {selected.period}
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-3">{selected.monumentName}</h3>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{selected.city}, {selected.country}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground/60 text-sm mb-6">
                  <CalendarDays className="w-4 h-4" />
                  <span>Analyzed on {formatDate(selected.analyzedAt)}</span>
                </div>
                <Link href="/explore">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-serif">
                    Explore Again
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
