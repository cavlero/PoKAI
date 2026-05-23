import { MapPin, ExternalLink, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Monument } from "@/data/monuments";

interface MonumentMapProps {
  monument: Monument;
}

export function MonumentMap({ monument }: MonumentMapProps) {
  const { name, city, country, coordinates } = monument;

  const openMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const mapEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lng - 0.05},${coordinates.lat - 0.04},${coordinates.lng + 0.05},${coordinates.lat + 0.04}&layer=mapnik&marker=${coordinates.lat},${coordinates.lng}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl mx-auto my-16"
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs uppercase tracking-widest mb-4">
          Location
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-primary mb-3">Find It on the Map</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Discover where this remarkable piece of history stands today.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur overflow-hidden shadow-2xl">
        {/* Map info bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-primary/15 flex items-center justify-center border border-primary/30 shrink-0">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-foreground">{name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                <Globe className="w-3.5 h-3.5" />
                <span>{city}</span>
                <span className="text-white/20">·</span>
                <span>{country}</span>
              </div>
            </div>
          </div>

          <button
            onClick={openMaps}
            data-testid="button-open-location"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-all hover:shadow-[0_0_20px_rgba(201,162,39,0.3)] shrink-0"
          >
            <ExternalLink className="w-4 h-4" />
            Open in Google Maps
          </button>
        </div>

        {/* Map embed */}
        <div className="relative w-full h-64 md:h-96 bg-background/40">
          <iframe
            src={mapEmbedUrl}
            className="w-full h-full border-0 opacity-90"
            title={`Map of ${name}`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
          <div className="absolute inset-0 pointer-events-none bg-primary/5 mix-blend-color" />
        </div>

        {/* Coordinates footer */}
        <div className="px-6 py-3 flex items-center gap-2 border-t border-white/5">
          <span className="text-xs text-muted-foreground font-mono">
            {coordinates.lat.toFixed(4)}° N, {coordinates.lng.toFixed(4)}° E
          </span>
        </div>
      </div>
    </motion.div>
  );
}
