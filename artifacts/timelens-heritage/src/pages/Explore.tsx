import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import { UploadZone } from "@/components/UploadZone";
import { ScanningOverlay } from "@/components/ScanningOverlay";
import { AnalysisPanel } from "@/components/AnalysisPanel";
import { TimeMachine } from "@/components/TimeMachine";
import { AIGuide } from "@/components/AIGuide";

import { MONUMENTS, Monument } from "@/data/monuments";

export default function Explore() {
  const [analyzing, setAnalyzing] = useState(false);
  const [activeMonument, setActiveMonument] = useState<Monument | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleAnalyze = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setAnalyzing(true);
    
    // Simulate analyzing time
    setTimeout(() => {
      // Pick random monument
      const randomMonument = MONUMENTS[Math.floor(Math.random() * MONUMENTS.length)];
      setActiveMonument(randomMonument);
      setAnalyzing(false);
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
      </AnimatePresence>

      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <h1 className="font-serif text-xl text-primary font-bold tracking-wider">TimeLens</h1>
        <div className="w-24"></div> {/* spacer for centering */}
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
              className="space-y-16 py-8"
            >
              <div className="flex justify-between items-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
                  Temporal Analysis Complete
                </div>
                <Button variant="outline" onClick={handleReset} className="border-white/20 hover:bg-white/5">
                  Analyze New Image
                </Button>
              </div>

              <AnalysisPanel monument={activeMonument} />
              
              {uploadedImage && (
                <TimeMachine monument={activeMonument} currentImage={uploadedImage} />
              )}
              
              <div className="pt-10 border-t border-white/5">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-serif text-primary mb-3">Consult the Guide</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Our AI has synchronized with the historical record of this location. Ask questions to uncover its secrets.
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
