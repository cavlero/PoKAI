import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Presentation, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

import { UploadZone } from "@/components/UploadZone";
import { ScanningOverlay } from "@/components/ScanningOverlay";
import { AnalysisPanel } from "@/components/AnalysisPanel";
import { TimeMachine } from "@/components/TimeMachine";
import { AIGuide } from "@/components/AIGuide";
import { MonumentMap } from "@/components/MonumentMap";
import { PresentationMode } from "@/components/PresentationMode";

import { MONUMENTS, Monument } from "@/data/monuments";
import { saveToGallery } from "@/pages/Gallery";

export default function Explore() {
  const [analyzing, setAnalyzing] = useState(false);
  const [activeMonument, setActiveMonument] = useState<Monument | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [presentationOpen, setPresentationOpen] = useState(false);

  const handleAnalyze = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setAnalyzing(true);

    setTimeout(() => {
      const randomMonument = MONUMENTS[Math.floor(Math.random() * MONUMENTS.length)];
      setActiveMonument(randomMonument);
      setAnalyzing(false);

      saveToGallery({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        monumentId: randomMonument.id,
        monumentName: randomMonument.name,
        city: randomMonument.city,
        country: randomMonument.country,
        period: randomMonument.period,
        imageDataUrl: imageUrl,
        analyzedAt: new Date().toISOString(),
      });
    }, 2500);
  };

  const handleReset = () => {
    setActiveMonument(null);
    setUploadedImage(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <AnimatePresence>
        {analyzing && <ScanningOverlay />}
        {presentationOpen && activeMonument && (
          <PresentationMode
            monument={activeMonument}
            onClose={() => setPresentationOpen(false)}
          />
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Home
          </Button>
        </Link>
        <h1 className="font-serif text-xl text-primary font-bold tracking-wider">TimeLens</h1>
        <Link href="/gallery">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <BookOpen className="w-4 h-4 mr-1" />
            Gallery
          </Button>
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-12">
        <AnimatePresence mode="wait">
          {!activeMonument ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-12"
            >
              <UploadZone onAnalyze={handleAnalyze} />
            </motion.div>
          ) : (
            <motion.div
              key="analysis"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 py-8"
            >
              {/* Top bar */}
              <div className="flex flex-wrap gap-3 justify-between items-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
                  Temporal Analysis Complete
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setPresentationOpen(true)}
                    className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-full text-sm gap-2"
                    data-testid="button-presentation-mode"
                  >
                    <Presentation className="w-4 h-4" />
                    Presentation Mode
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="border-white/20 hover:bg-white/5 rounded-full text-sm"
                  >
                    Analyze New Image
                  </Button>
                </div>
              </div>

              {/* Analysis info */}
              <AnalysisPanel monument={activeMonument} />

              {/* Time Machine */}
              {uploadedImage && (
                <TimeMachine monument={activeMonument} currentImage={uploadedImage} />
              )}

              {/* Interactive Map */}
              <MonumentMap monument={activeMonument} />

              {/* AI Historical Guide */}
              <div className="pt-8 border-t border-white/5">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs uppercase tracking-widest mb-4">
                    AI Guide
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-primary mb-3">
                    AI Historical Guide
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Our AI has synchronized with the historical record of this site. Ask questions to uncover its secrets.
                  </p>
                </div>
                <AIGuide monument={activeMonument} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
