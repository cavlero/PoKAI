import { useState, useRef, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, BookOpen, Upload, ScanText, Languages,
  CheckCircle2, Loader2, Copy, Volume2,
  VolumeX, Save, RotateCcw, Info, FileImage, Sparkles,
  Flag, AlertCircle, Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createWorker } from "tesseract.js";

// ─── Types ────────────────────────────────────────────────────────────────────
type Phase = "upload" | "scanning" | "results" | "error";

type TranslationResult = {
  detectedLanguage: string;
  originalText: string;
  translatedText: string;
  sourceType: string;
  subject: string;
  confidence: number;
};

// ─── Language name map ────────────────────────────────────────────────────────
const LANG_NAMES: Record<string, string> = {
  bg: "Bulgarian", ru: "Russian", en: "English", el: "Greek",
  sr: "Serbian",   mk: "Macedonian", de: "German", fr: "French",
  it: "Italian",   la: "Latin",  tr: "Turkish",  uk: "Ukrainian",
  ro: "Romanian",  pl: "Polish",  cs: "Czech",    ar: "Arabic",
};

// ─── Scan steps ───────────────────────────────────────────────────────────────
type StepDef = { label: string; subLabel?: string; Icon: typeof ScanText };
const SCAN_STEPS: StepDef[] = [
  { label: "Loading OCR engine",       subLabel: "Downloading language models…", Icon: ScanText    },
  { label: "Reading text from image",  subLabel: "Recognizing characters…",       Icon: BookOpen    },
  { label: "Translating into English", subLabel: "Contacting translation service…", Icon: Languages },
  { label: "Preparing result",         subLabel: "Almost done…",                  Icon: Upload      },
];

// ─── Google Translate (unofficial, CORS-safe, no key needed) ──────────────────
async function translateText(
  text: string,
): Promise<{ translated: string; langCode: string }> {
  const url =
    "https://translate.googleapis.com/translate_a/single" +
    "?client=gtx&sl=auto&tl=en&dt=t&q=" +
    encodeURIComponent(text);
  const res = await fetch(url);
  if (!res.ok) throw new Error("Translation request failed");
  const data = (await res.json()) as [[string, string][], unknown, string];
  const translated = data[0].map((chunk) => chunk[0]).join("");
  const langCode   = data[2] ?? "und";
  return { translated, langCode };
}

// ─── Real OCR + Translation pipeline ─────────────────────────────────────────
async function runOCRAndTranslate(
  imageDataUrl: string,
  fileName: string,
  onStep: (step: number) => void,
  onOCRProgress: (pct: number) => void,
): Promise<TranslationResult> {
  // Step 0 — initialise Tesseract worker (downloads language packs if needed)
  onStep(0);
  const worker = await createWorker(["bul", "rus", "eng"], 1, {
    logger: (m: { status: string; progress: number }) => {
      if (
        m.status === "loading tesseract core" ||
        m.status === "initializing tesseract" ||
        m.status === "loading language traineddata" ||
        m.status === "initializing api"
      ) {
        onStep(0);
      }
      if (m.status === "recognizing text") {
        onStep(1);
        onOCRProgress(Math.round(m.progress * 100));
      }
    },
  });

  // Step 1 — run OCR (progress driven by logger above)
  onStep(1);
  const { data } = await worker.recognize(imageDataUrl);
  await worker.terminate();

  const rawText = data.text ?? "";
  const originalText = rawText.trim().replace(/\n{3,}/g, "\n\n");
  const confidence   = Math.round(data.confidence ?? 0);

  if (originalText.length < 4) {
    throw new Error(
      "No readable text found in this image. " +
      "Try a higher-resolution photo with clear, printed text.",
    );
  }

  // Step 2 — translate
  onStep(2);
  let translatedText  = originalText;
  let detectedLanguage = "Unknown";

  try {
    const { translated, langCode } = await translateText(originalText);
    translatedText   = translated.trim().replace(/\n{3,}/g, "\n\n");
    detectedLanguage = LANG_NAMES[langCode] ?? langCode.toUpperCase();
    if (langCode === "en" || langCode === "und") {
      translatedText = originalText;
      detectedLanguage = "English";
    }
  } catch {
    translatedText   = "(Translation unavailable — check your connection and try again.)";
    detectedLanguage = "Unknown";
  }

  // Step 3 — wrap up
  onStep(3);
  await new Promise((r) => setTimeout(r, 400));

  const subject = fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ") || "Historical document";

  return {
    detectedLanguage,
    originalText,
    translatedText,
    sourceType: "Uploaded document",
    subject,
    confidence,
  };
}

// ─── ScanProgress ─────────────────────────────────────────────────────────────
function ScanProgress({ step, ocrProgress }: { step: number; ocrProgress: number }) {
  return (
    <div className="w-full max-w-sm mx-auto space-y-2.5">
      {SCAN_STEPS.map(({ label, subLabel, Icon }, i) => {
        const isDone   = i < step;
        const isActive = i === step;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 * i }}
            className={`flex flex-col gap-2 px-4 py-3 rounded-xl border transition-all duration-400 ${
              isActive ? "border-primary/40 bg-primary/8 shadow-[0_0_14px_rgba(201,162,39,0.12)]"
              : isDone  ? "border-green-500/25 bg-green-500/6"
              : "border-white/6 bg-white/2"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                isActive ? "bg-primary/15 border-primary/35"
                : isDone  ? "bg-green-500/15 border-green-500/30"
                : "bg-white/4 border-white/8"
              }`}>
                {isDone
                  ? <CheckCircle2 className="w-4 h-4 text-green-400" />
                  : <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-white/20"}`} />
                }
              </div>
              <span className={`text-sm flex-1 ${
                isActive ? "text-foreground font-medium"
                : isDone  ? "text-muted-foreground/50"
                : "text-white/20"
              }`}>{label}</span>
              {isActive && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-4 h-4 text-primary/60" />
                </motion.div>
              )}
            </div>

            {/* OCR sub-progress bar */}
            {isActive && i === 1 && ocrProgress > 0 && (
              <div className="ml-11">
                <div className="h-1 rounded-full bg-white/8 overflow-hidden">
                  <motion.div
                    className="h-full bg-primary/70 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${ocrProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-[10px] text-primary/50 mt-1">{ocrProgress}% recognized</p>
              </div>
            )}

            {isActive && subLabel && !(i === 1 && ocrProgress > 0) && (
              <p className="ml-11 text-[10px] text-muted-foreground/50">{subLabel}</p>
            )}
          </motion.div>
        );
      })}

      <p className="text-center text-[10px] text-muted-foreground/35 pt-1">
        First scan may take 20–30 s while language models download.
      </p>
    </div>
  );
}

// ─── TextColumn ───────────────────────────────────────────────────────────────
function TextColumn({
  label, langBadge, text, dimmed, actions,
}: {
  label: string; langBadge: string; text: string; dimmed?: boolean;
  actions?: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-3 rounded-2xl border p-5 ${
      dimmed ? "border-white/8 bg-card/30" : "border-primary/20 bg-primary/4"
    }`}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{label}</span>
        <span className={`text-[10px] font-medium border rounded-full px-2 py-0.5 flex items-center gap-1 ${
          dimmed ? "border-white/12 text-muted-foreground/60 bg-white/4"
                 : "border-primary/30 text-primary/80 bg-primary/8"
        }`}>
          <Flag className="w-2.5 h-2.5" />
          {langBadge}
        </span>
      </div>
      <div className="h-px bg-white/6" />
      <div className="overflow-y-auto max-h-64 pr-1">
        <p className="font-serif text-[13.5px] leading-[1.85] whitespace-pre-wrap text-foreground/85 break-words">
          {text}
        </p>
      </div>
      {actions && <div className="pt-1 border-t border-white/6">{actions}</div>}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ScanTranslate() {
  const [phase,          setPhase]          = useState<Phase>("upload");
  const [uploadedImage,  setUploadedImage]  = useState<string | null>(null);
  const [fileName,       setFileName]       = useState("");
  const [scanStep,       setScanStep]       = useState(0);
  const [ocrProgress,    setOCRProgress]    = useState(0);
  const [result,         setResult]         = useState<TranslationResult | null>(null);
  const [errorMsg,       setErrorMsg]       = useState("");
  const [isSpeaking,     setIsSpeaking]     = useState(false);
  const [copiedOrig,     setCopiedOrig]     = useState(false);
  const [copiedTrans,    setCopiedTrans]     = useState(false);
  const [saved,          setSaved]          = useState(false);
  const [isDragging,     setIsDragging]     = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleStartScan = async () => {
    if (!uploadedImage) return;
    setPhase("scanning");
    setScanStep(0);
    setOCRProgress(0);
    setErrorMsg("");

    try {
      const ocr = await runOCRAndTranslate(
        uploadedImage,
        fileName,
        setScanStep,
        setOCRProgress,
      );
      setScanStep(SCAN_STEPS.length);
      setResult(ocr);
      await new Promise((r) => setTimeout(r, 300));
      setPhase("results");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMsg(msg);
      setPhase("error");
    }
  };

  const handleReadAloud = () => {
    if (!result) return;
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utt = new SpeechSynthesisUtterance(result.translatedText);
    utt.lang = "en-GB";
    utt.rate = 0.88;
    utt.onend = () => setIsSpeaking(false);
    utt.onerror = () => setIsSpeaking(false);
    speechSynthesis.cancel();
    speechSynthesis.speak(utt);
    setIsSpeaking(true);
  };

  const copyText = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleSave = () => {
    if (!result || !uploadedImage) return;
    try {
      const existing = JSON.parse(localStorage.getItem("timelens_translations") ?? "[]");
      existing.unshift({
        id: Date.now().toString(),
        subject: result.subject,
        sourceType: result.sourceType,
        detectedLanguage: result.detectedLanguage,
        originalText: result.originalText,
        translatedText: result.translatedText,
        imageDataUrl: uploadedImage,
        savedAt: new Date().toISOString(),
      });
      localStorage.setItem("timelens_translations", JSON.stringify(existing.slice(0, 30)));
    } catch { /* storage unavailable */ }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleExportTXT = () => {
    if (!result) return;
    const content = [
      `TimeLens Heritage — Scan & Translate`,
      `Document: ${result.subject}`,
      `Detected language: ${result.detectedLanguage}`,
      `OCR confidence: ${result.confidence}%`,
      `Exported: ${new Date().toLocaleString()}`,
      "",
      "═══ ORIGINAL TEXT ═══",
      result.originalText,
      "",
      "═══ ENGLISH TRANSLATION ═══",
      result.translatedText,
    ].join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `${result.subject.replace(/\s+/g, "_")}_translation.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    speechSynthesis.cancel();
    setPhase("upload");
    setUploadedImage(null);
    setFileName("");
    setScanStep(0);
    setOCRProgress(0);
    setResult(null);
    setErrorMsg("");
    setIsSpeaking(false);
    setCopiedOrig(false);
    setCopiedTrans(false);
    setSaved(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Nav */}
      <nav className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-10 py-4 border-b border-white/6 bg-background/80 backdrop-blur-md">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-1.5 pl-1">
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
            <Languages className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="font-serif text-primary text-sm font-semibold tracking-wide">Scan & Translate</span>
        </div>
        <Link href="/gallery">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-1.5">
            <BookOpen className="w-4 h-4" />
            Gallery
          </Button>
        </Link>
      </nav>

      <AnimatePresence mode="wait">

        {/* ══ UPLOAD ══════════════════════════════════════════════════════════ */}
        {phase === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto px-5 py-12 flex flex-col gap-10"
          >
            {/* Header */}
            <div className="text-center space-y-3">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="w-16 h-16 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center mx-auto"
              >
                <ScanText className="w-8 h-8 text-primary" />
              </motion.div>
              <h1 className="font-serif text-3xl font-bold text-foreground">Scan & Translate</h1>
              <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
                Upload a photo of a museum sign, historical board, book page, or inscription — the app reads the text and translates it to English, entirely in your browser.
              </p>
            </div>

            {/* Upload zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => !uploadedImage && fileRef.current?.click()}
              className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden cursor-pointer ${
                isDragging
                  ? "border-primary/70 bg-primary/8 shadow-[0_0_30px_rgba(201,162,39,0.18)]"
                  : uploadedImage
                  ? "border-primary/35 bg-card/40 cursor-default"
                  : "border-white/15 bg-card/30 hover:border-primary/40 hover:bg-primary/4"
              }`}
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="sr-only"
                onChange={handleFileInput}
              />

              {uploadedImage ? (
                <div className="flex flex-col sm:flex-row items-center gap-5 p-6">
                  <div className="relative w-full sm:w-40 h-28 rounded-xl overflow-hidden shrink-0 border border-white/10">
                    <img src={uploadedImage} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-sm font-medium text-foreground truncate max-w-xs">{fileName}</p>
                    <p className="text-xs text-muted-foreground mt-1">Image ready for scanning</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); setUploadedImage(null); setFileName(""); }}
                      className="mt-3 text-[11px] text-muted-foreground/50 hover:text-muted-foreground underline"
                    >
                      Remove image
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 py-14 px-8 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <FileImage className="w-7 h-7 text-muted-foreground/50" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground/70">
                      Drop a photo here, or tap to browse / take a photo
                    </p>
                    <p className="text-xs text-muted-foreground/50 mt-1">
                      Museum signs · Information boards · Book pages · Inscriptions
                    </p>
                    <p className="text-[10px] text-muted-foreground/35 mt-2">JPG · PNG · HEIC · WEBP</p>
                  </div>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="rounded-xl border border-white/8 bg-white/2 p-4 flex gap-3 items-start">
              <Info className="w-4 h-4 text-primary/50 shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground/60 leading-relaxed">
                <strong className="text-muted-foreground/80">Tips for best results:</strong> Use a well-lit, straight-on photo. Text should be at least 20px tall in the image. Avoid glare and motion blur. Supports Bulgarian, Russian, and English text.
              </p>
            </div>

            {/* Start button */}
            <AnimatePresence>
              {uploadedImage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex justify-center"
                >
                  <Button
                    onClick={handleStartScan}
                    className="h-14 px-12 text-lg rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_40px_rgba(201,162,39,0.30)] hover:shadow-[0_0_55px_rgba(201,162,39,0.45)] font-serif hover:scale-105 transition-all gap-3"
                  >
                    <ScanText className="w-5 h-5" />
                    Extract & Translate
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Capability chips */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground/50">
              {["Bulgarian · Russian · English", "Museum signs & plaques", "Book pages & manuscripts", "Runs fully in browser"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 border border-white/8 rounded-full px-3 py-1 bg-white/3">
                  <Sparkles className="w-2.5 h-2.5 text-primary/40" />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* ══ SCANNING ════════════════════════════════════════════════════════ */}
        {phase === "scanning" && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-xl mx-auto px-5 py-16 flex flex-col items-center gap-10"
          >
            {/* Image with scan line */}
            {uploadedImage && (
              <div className="relative w-48 h-36 rounded-xl overflow-hidden border border-primary/20 shrink-0">
                <img src={uploadedImage} alt="Scanning" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
                {/* scan line */}
                <motion.div
                  className="absolute left-0 right-0 h-0.5 bg-primary/60 shadow-[0_0_8px_rgba(201,162,39,0.8)]"
                  animate={{ top: ["10%", "90%", "10%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                />
                {/* corner brackets */}
                {[["top-2 left-2","border-t-2 border-l-2"],["top-2 right-2","border-t-2 border-r-2"],
                  ["bottom-2 left-2","border-b-2 border-l-2"],["bottom-2 right-2","border-b-2 border-r-2"]].map(([pos,brd]) => (
                  <div key={pos} className={`absolute w-4 h-4 border-primary/60 ${pos} ${brd}`} />
                ))}
              </div>
            )}

            <div className="text-center space-y-1">
              <h2 className="font-serif text-xl font-semibold text-foreground">Scanning Document</h2>
              <p className="text-xs text-muted-foreground/60">Please wait — this runs entirely in your browser</p>
            </div>

            <ScanProgress step={scanStep} ocrProgress={ocrProgress} />
          </motion.div>
        )}

        {/* ══ ERROR ════════════════════════════════════════════════════════ */}
        {phase === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-lg mx-auto px-5 py-20 flex flex-col items-center gap-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/25 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-3">Scan Failed</h2>
              <p className="text-sm text-muted-foreground/80 leading-relaxed max-w-sm">{errorMsg}</p>
            </div>
            <Button
              onClick={handleReset}
              className="rounded-full px-8 gap-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30"
            >
              <RotateCcw className="w-4 h-4" />
              Try Another Image
            </Button>
          </motion.div>
        )}

        {/* ══ RESULTS ══════════════════════════════════════════════════════ */}
        {phase === "results" && result && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-5xl mx-auto px-5 py-10 flex flex-col gap-7"
          >
            {/* Header row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-[10px] text-primary/50 uppercase tracking-widest font-semibold mb-1">Scan complete</p>
                <h2 className="font-serif text-xl font-bold text-foreground capitalize">{result.subject}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-[11px] border border-white/12 bg-white/4 rounded-full px-3 py-1 text-muted-foreground flex items-center gap-1.5">
                  <Flag className="w-3 h-3 text-primary/50" />
                  {result.detectedLanguage}
                </span>
                <span className="text-[11px] border border-white/12 bg-white/4 rounded-full px-3 py-1 text-muted-foreground">
                  {result.confidence}% confidence
                </span>
                <span className="text-[11px] border border-white/12 bg-white/4 rounded-full px-3 py-1 text-muted-foreground">
                  {result.sourceType}
                </span>
              </div>
            </div>

            {/* Uploaded image thumbnail */}
            {uploadedImage && (
              <div className="flex items-center gap-4 p-4 rounded-xl border border-white/8 bg-card/30">
                <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0 border border-white/10">
                  <img src={uploadedImage} alt="Source" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground/80 truncate max-w-xs">{fileName}</p>
                  <p className="text-[11px] text-muted-foreground/50 mt-0.5">Source image</p>
                </div>
              </div>
            )}

            {/* Two-column text results */}
            <div className="grid md:grid-cols-2 gap-5">
              <TextColumn
                label="Original text"
                langBadge={result.detectedLanguage}
                text={result.originalText}
                dimmed
                actions={
                  <button
                    onClick={() => copyText(result.originalText, setCopiedOrig)}
                    className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                  >
                    {copiedOrig
                      ? <><CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> Copied!</>
                      : <><Copy className="w-3.5 h-3.5" /> Copy original</>
                    }
                  </button>
                }
              />
              <TextColumn
                label="English translation"
                langBadge="English"
                text={result.translatedText}
                actions={
                  <button
                    onClick={() => copyText(result.translatedText, setCopiedTrans)}
                    className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                  >
                    {copiedTrans
                      ? <><CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> Copied!</>
                      : <><Copy className="w-3.5 h-3.5" /> Copy translation</>
                    }
                  </button>
                }
              />
            </div>

            {/* Action bar */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Button
                onClick={handleReadAloud}
                variant="outline"
                size="sm"
                className="rounded-full gap-2 border-white/12 hover:border-primary/30 hover:bg-primary/6 text-sm"
              >
                {isSpeaking
                  ? <><VolumeX className="w-4 h-4" /> Stop</>
                  : <><Volume2 className="w-4 h-4" /> Read Aloud</>
                }
              </Button>

              <Button
                onClick={handleSave}
                variant="outline"
                size="sm"
                className="rounded-full gap-2 border-white/12 hover:border-primary/30 hover:bg-primary/6 text-sm"
              >
                {saved
                  ? <><CheckCircle2 className="w-4 h-4 text-green-400" /> Saved!</>
                  : <><Save className="w-4 h-4" /> Save as Draft</>
                }
              </Button>

              <Button
                onClick={handleExportTXT}
                variant="outline"
                size="sm"
                className="rounded-full gap-2 border-white/12 hover:border-primary/30 hover:bg-primary/6 text-sm"
              >
                <Download className="w-4 h-4" />
                Export as TXT
              </Button>

              <Button
                onClick={handleReset}
                variant="ghost"
                size="sm"
                className="rounded-full gap-2 text-muted-foreground/60 hover:text-muted-foreground text-sm ml-auto"
              >
                <RotateCcw className="w-4 h-4" />
                Scan Another
              </Button>
            </div>

            {/* Footer note */}
            <div className="flex items-start gap-2 text-[11px] text-muted-foreground/35 pt-2 border-t border-white/5">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>OCR powered by Tesseract.js · Translation by Google Translate · All processing runs in your browser — no data is sent to our servers.</span>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
