import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

import { UploadZone } from "@/components/UploadZone";
import { ScanningOverlay } from "@/components/ScanningOverlay";
import { AnalysisPanel } from "@/components/AnalysisPanel";
import { TimeMachine } from "@/components/TimeMachine";
import { TalkToHistory } from "@/components/TalkToHistory";
import { MonumentMap } from "@/components/MonumentMap";
import { ContinueExploring } from "@/components/ContinueExploring";
import { HistoricalQuiz } from "@/components/HistoricalQuiz";

import { MONUMENTS, Monument } from "@/data/monuments";
import { saveToGallery } from "@/pages/Gallery";

const ANALYSIS_DURATION = 5 * 900 + 1500;

type RecognitionResult = {
  monument: Monument;
  confidence: number;
  isPossibleMatch: boolean;
};

const FILENAME_RULES: { keywords: string[]; id: string; confidence: number }[] = [
  { keywords: ["novae", "roman", "svishtov"],        id: "novae",     confidence: 94 },
  { keywords: ["tsarevets", "tsarevec"],             id: "tsarevets", confidence: 94 },
  { keywords: ["rila"],                              id: "rila",      confidence: 96 },
  { keywords: ["nessebar", "nesebar", "messembria"], id: "nessebar",  confidence: 91 },
  { keywords: ["madara"],                            id: "madara",    confidence: 98 },
  { keywords: ["buzludzha", "buzludja"],             id: "buzludzha", confidence: 93 },
];

const NOVAE = MONUMENTS.find((m) => m.id === "novae")!;

function recognize(fileName: string): RecognitionResult {
  const lower = fileName.toLowerCase();
  for (const rule of FILENAME_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      const monument = MONUMENTS.find((m) => m.id === rule.id)!;
      const confidence = monument.id === "novae" ? 93 : rule.confidence;
      return { monument, confidence, isPossibleMatch: false };
    }
  }
  // Default fallback: always suggest Novae as a possible match (prototype demo)
  return { monument: NOVAE, confidence: 87, isPossibleMatch: true };
}

export default function Explore() {
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [result, setResult] = useState<RecognitionResult | null>(null);

  const timeMachineRef = useRef<HTMLDivElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to Time Machine after result appears
  useEffect(() => {
    if (!result) return;
    const t = setTimeout(() => {
      timeMachineRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
    return () => clearTimeout(t);
  }, [result]);

  const handleAnalyze = (imageUrl: string, fileName: string) => {
    setUploadedImage(imageUrl);
    setAnalyzing(true);
    setTimeout(() => {
      const recognition = recognize(fileName);
      setResult(recognition);
      setAnalyzing(false);
      saveToGallery({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        monumentId: recognition.monument.id,
        monumentName: recognition.monument.name,
        city: recognition.monument.city,
        country: recognition.monument.country,
        period: recognition.monument.period,
        imageDataUrl: imageUrl,
        analyzedAt: new Date().toISOString(),
      });
    }, ANALYSIS_DURATION);
  };

  const handleReset = () => {
    setResult(null);
    setUploadedImage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToGuide = () => {
    guideRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <AnimatePresence>
        {analyzing && <ScanningOverlay previewUrl={uploadedImage} />}
      </AnimatePresence>

      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Home
          </Button>
        </Link>
        <h1 className="font-serif text-xl text-primary font-bold tracking-wider">PokAI</h1>
        <Link href="/gallery">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <BookOpen className="w-4 h-4 mr-1" />
            Gallery
          </Button>
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-12">
        <AnimatePresence mode="wait">
          {!result ? (
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
              transition={{ duration: 0.8 }}
              className="space-y-6 py-8"
            >
              <div className="flex flex-wrap gap-3 justify-between items-center">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Reconstruction Complete
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="border-white/20 hover:bg-white/5 rounded-full text-sm"
                  >
                    New Analysis
                  </Button>
                </motion.div>
              </div>

              <AnalysisPanel
                monument={result.monument}
                confidence={result.confidence}
              />

              <div ref={timeMachineRef} className="scroll-mt-20">
                <TimeMachine
                  monument={result.monument}
                  currentImage={uploadedImage}
                  onTalkToGuide={scrollToGuide}
                />
              </div>

              <MonumentMap monument={result.monument} />

              <div ref={guideRef} className="pt-8 border-t border-white/5 scroll-mt-20">
                <TalkToHistory monument={result.monument} />
              </div>

              <div className="pt-8 border-t border-white/5">
                <ContinueExploring monument={result.monument} />
              </div>

              <div className="pt-8 border-t border-white/5 pb-8">
                <HistoricalQuiz monument={result.monument} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
