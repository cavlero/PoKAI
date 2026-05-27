import { useState, useRef, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, BookOpen, FileText, Languages, Send,
  RotateCcw, AlertCircle, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { UploadZone, type DocumentMetadata } from "@/components/UploadZone";
import { ScanningOverlay } from "@/components/ScanningOverlay";
import { AnalysisPanel } from "@/components/AnalysisPanel";
import { TimeMachine } from "@/components/TimeMachine";
import { TalkToHistory } from "@/components/TalkToHistory";
import { MonumentMap } from "@/components/MonumentMap";
import { ContinueExploring } from "@/components/ContinueExploring";
import { HistoricalQuiz } from "@/components/HistoricalQuiz";
import { useLang } from "@/lib/i18n";

import { MONUMENTS, Monument } from "@/data/monuments";
import { saveToGallery } from "@/pages/Gallery";

interface UploadResult {
  book_id: number;
  stem: string;
  image_url: string;
  original_text: string;
  translated_text: string;
  metadata: Record<string, string>;
  imagePreview: string;
}

interface QueryMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function Explore() {
  const { t } = useLang();
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Query section state
  const [queryInput,   setQueryInput]   = useState("");
  const [queryLoading, setQueryLoading] = useState(false);
  const [queryMsgs,    setQueryMsgs]    = useState<QueryMessage[]>([]);
  const queryScrollRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = useCallback(async (imageUrl: string, file: File, meta: DocumentMetadata) => {
    setUploadedImage(imageUrl);
    setUploadError(null);
    setAnalyzing(true);

    const form = new FormData();
    form.append("file", file);
    form.append("title", meta.title);
    if (meta.author)      form.append("author",      meta.author);
    if (meta.year)        form.append("year",        meta.year);
    if (meta.distributor) form.append("distributor", meta.distributor);
    if (meta.notes)       form.append("notes",       meta.notes);

    try {
      const res = await fetch("/upload", { method: "POST", body: form });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: "Upload failed" }));
        throw new Error(err.detail ?? "Upload failed");
      }
      const data: Omit<UploadResult, "imagePreview"> = await res.json();
      const uploadResult: UploadResult = { ...data, imagePreview: imageUrl };
      setResult(uploadResult);

      saveToGallery({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        monumentId: data.stem,
        monumentName: data.metadata.title ?? meta.title,
        city: "",
        country: "",
        period: data.metadata.year ?? "",
        imageDataUrl: data.image_url,
        analyzedAt: new Date().toISOString(),
      });
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setAnalyzing(false);
    }
  }, []);

  const handleReset = () => {
    setResult(null);
    setUploadedImage(null);
    setUploadError(null);
    setQueryMsgs([]);
    setQueryInput("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sendQuery = useCallback(async (override?: string) => {
    const text = (override ?? queryInput).trim();
    if (!text || queryLoading) return;

    setQueryMsgs((prev) => [
      ...prev,
      { id: `${Date.now()}-u`, role: "user", content: text },
    ]);
    setQueryInput("");
    setQueryLoading(true);

    setTimeout(() => {
      queryScrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 50);

    try {
      const res = await fetch("/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text, top_k: 5 }),
      });
      if (!res.ok) throw new Error("Query failed");
      const data = await res.json();
      setQueryMsgs((prev) => [
        ...prev,
        { id: `${Date.now()}-a`, role: "assistant", content: data.answer },
      ]);
    } catch {
      setQueryMsgs((prev) => [
        ...prev,
        {
          id: `${Date.now()}-a`,
          role: "assistant",
          content: "Sorry, the query failed. Please check the API server and try again.",
        },
      ]);
    } finally {
      setQueryLoading(false);
      setTimeout(() => {
        queryScrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 100);
    }
  }, [queryInput, queryLoading]);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <AnimatePresence>
        {analyzing && <ScanningOverlay previewUrl={uploadedImage} />}
      </AnimatePresence>

      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <ChevronLeft className="w-4 h-4 mr-1" />
            {t("nav_home")}
          </Button>
        </Link>
        <h1 className="font-serif text-xl text-primary font-bold tracking-wider">PokAI</h1>
        <Link href="/gallery">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <BookOpen className="w-4 h-4 mr-1" />
            {t("nav_gallery")}
          </Button>
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-12">
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

              {uploadError && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  {uploadError}
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-8 py-8"
            >
              {/* Header row */}
              <div className="flex flex-wrap gap-3 justify-between items-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {t("explore_reconstruction_complete")}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                  New Document
                </Button>
              </div>

              {/* Document card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border border-white/10 bg-card/40 backdrop-blur-sm overflow-hidden"
              >
                {/* Full-width image */}
                <div className="w-full">
                  <img
                    src={result.imagePreview}
                    alt="Uploaded document"
                    className="w-full max-h-[70vh] object-contain bg-black/40"
                  />
                </div>

                {/* Meta */}
                <div className="px-6 py-5 flex flex-col gap-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary/60 mb-1">
                    Document
                  </p>
                  <h2 className="text-xl font-serif text-foreground">
                    {result.metadata.title}
                  </h2>
                  {result.metadata.author && (
                    <p className="text-sm text-muted-foreground">
                      <span className="text-muted-foreground/50">Author: </span>{result.metadata.author}
                    </p>
                  )}
                  {result.metadata.year && (
                    <p className="text-sm text-muted-foreground">
                      <span className="text-muted-foreground/50">Year: </span>{result.metadata.year}
                    </p>
                  )}
                  {result.metadata.distributor && (
                    <p className="text-sm text-muted-foreground">
                      <span className="text-muted-foreground/50">Publisher: </span>{result.metadata.distributor}
                    </p>
                  )}
                  {result.metadata.notes && (
                    <p className="text-sm text-muted-foreground">
                      <span className="text-muted-foreground/50">Notes: </span>{result.metadata.notes}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground/40 mt-2">
                    ID: <code className="font-mono">{result.stem}</code>
                  </p>
                </div>

                {/* OCR original */}
                <div className="border-t border-white/8 px-6 py-5">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-primary/70" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary/60">
                      Original Cyrillic Text
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto rounded-lg border border-white/8 bg-white/[0.02] p-3 pr-4">
                    <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap font-mono">
                      {result.original_text || "—"}
                    </p>
                  </div>
                </div>

                {/* Translation */}
                <div className="border-t border-white/8 px-6 py-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Languages className="w-4 h-4 text-primary/70" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary/60">
                      English Translation
                    </span>
                  </div>
                  <div className="max-h-80 overflow-y-auto rounded-lg border border-white/8 bg-white/[0.02] p-3 pr-4">
                    <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                      {result.translated_text || "—"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Query section */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="rounded-2xl border border-white/10 bg-card/40 backdrop-blur-sm"
              >
                <div className="px-6 pt-6 pb-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary/60 mb-1">
                    Query the Archive
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ask questions about this document or any other indexed content.
                  </p>
                </div>

                {/* Messages */}
                {queryMsgs.length > 0 && (
                  <div className="max-h-72 overflow-y-auto px-6 py-3">
                    <div className="flex flex-col gap-3">
                      {queryMsgs.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                              msg.role === "user"
                                ? "bg-primary/20 text-foreground rounded-tr-sm border border-primary/20"
                                : "bg-white/5 text-foreground/90 rounded-tl-sm border border-white/5 font-serif"
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                      ))}
                      {queryLoading && (
                        <div className="flex justify-start">
                          <div className="bg-white/5 rounded-2xl rounded-tl-sm border border-white/5 px-4 py-3 flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      )}
                      <div ref={queryScrollRef} />
                    </div>
                  </div>
                )}

                {/* Input */}
                <form
                  onSubmit={(e) => { e.preventDefault(); sendQuery(); }}
                  className="flex items-center gap-2 p-3 border-t border-white/8"
                >
                  <input
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    placeholder="Ask about the document content…"
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none px-2"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!queryInput.trim() || queryLoading}
                    className="h-10 w-10 shrink-0 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {t("explore_new_analysis")}
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
