import { useState, useRef, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, BookOpen, Upload, ScanText, Languages,
  Headphones, CheckCircle2, Loader2, Copy, Volume2,
  VolumeX, Save, RotateCcw, Info, FileImage, Sparkles,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────
type Phase = "upload" | "scanning" | "results";

type TranslationResult = {
  detectedLanguage: string;
  originalText: string;
  translatedText: string;
  sourceType: string;
  subject: string;
  confidence: number;
};

// ─── Demo Data ────────────────────────────────────────────────────────────────
const DEMO_SAMPLES: TranslationResult[] = [
  {
    detectedLanguage: "Bulgarian (bg)",
    sourceType: "Museum information board",
    subject: "Tsarevets Fortress, Veliko Tarnovo",
    confidence: 96,
    originalText: `ЦАРЕВЕЦ — СРЕДНОВЕКОВНА КРЕПОСТ
Велико Търново, България

Крепостта Царевец е издигната на скалист хълм с площ от 4.2 хектара, заобиколен от три страни от река Янтра. По времето на Второто Българско царство (1185–1393) тя е служела за резиденция на царя и патриарха.

Укреплението е имало 4 входни порти, от които 2 са запазени до днес. На върха на хълма се издига Патриаршеската катедрала, разрушена от турците и реставрирана в периода 1930–1981 г.

Осветителното шоу „Звук и Светлина" се провежда всяко лято.`,
    translatedText: `TSAREVETS — MEDIEVAL FORTRESS
Veliko Tarnovo, Bulgaria

The Tsarevets Fortress is built on a rocky hill covering 4.2 hectares, surrounded on three sides by the Yantra River. During the Second Bulgarian Empire (1185–1393), it served as the residence of the tsar and the patriarch.

The fortification had 4 entrance gates, of which 2 survive to this day. At the top of the hill stands the Patriarchal Cathedral, destroyed by the Ottomans and restored between 1930 and 1981.

The "Sound and Light" illumination show takes place every summer.`,
  },
  {
    detectedLanguage: "Bulgarian (bg)",
    sourceType: "Heritage site marker",
    subject: "Madara Rider, UNESCO Heritage",
    confidence: 94,
    originalText: `МАДАРСКИ КОННИК
Национален историко-археологически резерват

Мадарският конник е уникален скален барелеф, изсечен в отвесна скала на около 23 метра над земята. Барелефът изобразява победоносен конник, пронизващ лъв с копие, с орел, летящ отпред.

Паметникът се датира от края на VII — началото на IX в. и е включен в Списъка на световното наследство на ЮНЕСКО от 1979 г.

Гравираните надписи в близост са на старогръцки и документират ранната история на Първото Българско царство.`,
    translatedText: `THE MADARA RIDER
National Historical-Archaeological Reserve

The Madara Rider is a unique rock relief carved into a sheer cliff face approximately 23 meters above ground. The relief depicts a victorious horseman piercing a lion with a spear, with an eagle flying ahead of him.

The monument dates from the late 7th to early 9th century and has been included on the UNESCO World Heritage List since 1979.

The engraved inscriptions nearby are in Ancient Greek and document the early history of the First Bulgarian Empire.`,
  },
  {
    detectedLanguage: "Bulgarian (bg)",
    sourceType: "Monastery information board",
    subject: "Rila Monastery, UNESCO Heritage",
    confidence: 97,
    originalText: `РИЛСКИ МАНАСТИР
Основан от свети Иван Рилски (876–946 г.)

Рилският манастир е най-голямото православно монашеско средище в България и едно от най-значимите на Балканския полуостров. Основан е от свети Иван Рилски в X в.

Сегашният архитектурен ансамбъл датира от периода 1834–1837 г. и е дело на майстори от различни краища на страната. Централната черква носи името „Рождество Христово".

От 1983 г. Рилският манастир е вписан в Списъка на световното наследство на ЮНЕСКО.`,
    translatedText: `RILA MONASTERY
Founded by Saint Ivan of Rila (876–946 AD)

The Rila Monastery is the largest Orthodox monastic centre in Bulgaria and one of the most significant on the Balkan Peninsula. It was founded by Saint Ivan of Rila in the 10th century.

The current architectural ensemble dates from 1834–1837 and was created by master craftsmen from across the country. The central church bears the name "Nativity of Christ."

Since 1983, the Rila Monastery has been inscribed on the UNESCO World Heritage List.`,
  },
  {
    detectedLanguage: "Bulgarian (bg)",
    sourceType: "Historical manuscript / book page",
    subject: "Medieval Bulgarian Chronicle",
    confidence: 89,
    originalText: `ЗА ОСНОВАВАНЕТО НА ВЕЛИКО ТЪРНОВО
(Из „История на Търново", XIV в.)

И в лето 1185, в деня Свети Димитър Солунски, братята Асен и Петър въстанаха против ромейското иго. Стъпиха на земята на предците си и провъзгласиха: „Тази земя е наша по право и по кръв."

Събраха войска и настъпиха към Преслав. Царят ромейски, Исак Ангел, изпрати армии, но те бяха отбити три пъти.

Търново стана столица на новото царство и славата на България се възроди.`,
    translatedText: `ON THE FOUNDING OF VELIKO TARNOVO
(From "History of Tarnovo," 14th century)

And in the year 1185, on the feast of Saint Demetrius of Thessaloniki, the brothers Asen and Peter rose up against Byzantine rule. They stood on the land of their ancestors and proclaimed: "This land is ours by right and by blood."

They gathered an army and advanced toward Preslav. The Byzantine emperor, Isaac Angelos, sent armies, but they were repelled three times.

Tarnovo became the capital of the new kingdom and the glory of Bulgaria was reborn.`,
  },
];

const SCAN_STEPS: { label: string; Icon: typeof ScanText }[] = [
  { label: "Detecting text in image...",     Icon: ScanText    },
  { label: "Reading historical content...",  Icon: BookOpen    },
  { label: "Translating into English...",    Icon: Languages   },
  { label: "Preparing audio guide...",       Icon: Headphones  },
];

const STEP_DURATIONS = [900, 750, 850, 600];

// ─── Future-ready OCR + Translation pipeline ──────────────────────────────────
//
// Currently: simulated demo using filename-based detection.
//
// To connect to a real API, replace this function with one of:
//   - Google Cloud Vision API (text detection) + Google Translate API
//   - OpenAI GPT-4o Vision: send imageDataUrl as a base64 message and ask to
//     detect + translate text
//   - Azure Computer Vision + Azure Translator
//
// The function signature and TranslationResult type are already API-ready.
//
async function performOCRAndTranslation(
  _imageDataUrl: string,
  fileName: string
): Promise<TranslationResult> {
  const lower = fileName.toLowerCase();
  if (lower.includes("tsarevets") || lower.includes("tarnov") || lower.includes("царевец"))
    return DEMO_SAMPLES[0];
  if (lower.includes("madara") || lower.includes("мадара") || lower.includes("rider"))
    return DEMO_SAMPLES[1];
  if (lower.includes("rila") || lower.includes("рила") || lower.includes("monastery"))
    return DEMO_SAMPLES[2];
  if (lower.includes("chronicle") || lower.includes("aseni") || lower.includes("asen"))
    return DEMO_SAMPLES[3];
  return DEMO_SAMPLES[Math.floor(Math.random() * DEMO_SAMPLES.length)];
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function ScanProgress({ step }: { step: number }) {
  return (
    <div className="w-full max-w-sm mx-auto space-y-2.5">
      {SCAN_STEPS.map(({ label, Icon }, i) => {
        const isDone   = i < step;
        const isActive = i === step;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 * i }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-400 ${
              isActive ? "border-primary/40 bg-primary/8 shadow-[0_0_14px_rgba(201,162,39,0.12)]"
              : isDone  ? "border-green-500/25 bg-green-500/6"
              : "border-white/6 bg-white/2"
            }`}
          >
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
            }`}>
              {label}
            </span>
            {isActive && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-4 h-4 text-primary/60" />
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function TextColumn({
  label, langBadge, text, dimmed,
}: {
  label: string; langBadge: string; text: string; dimmed?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-3 rounded-2xl border p-5 ${
      dimmed ? "border-white/8 bg-card/30" : "border-primary/20 bg-primary/4"
    }`}>
      <div className="flex items-center justify-between gap-2">
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
      <div className="overflow-y-auto max-h-72 pr-1 scrollbar-thin">
        <p className="font-serif text-[13.5px] leading-[1.85] whitespace-pre-wrap text-foreground/85">
          {text}
        </p>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ScanTranslate() {
  const [phase, setPhase]               = useState<Phase>("upload");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fileName, setFileName]         = useState("");
  const [scanStep, setScanStep]         = useState(0);
  const [result, setResult]             = useState<TranslationResult | null>(null);
  const [isSpeaking, setIsSpeaking]     = useState(false);
  const [copied, setCopied]             = useState(false);
  const [saved, setSaved]               = useState(false);
  const [isDragging, setIsDragging]     = useState(false);
  const fileRef                         = useRef<HTMLInputElement>(null);

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

    for (let i = 0; i < SCAN_STEPS.length; i++) {
      setScanStep(i);
      await new Promise((r) => setTimeout(r, STEP_DURATIONS[i]));
    }

    const ocr = await performOCRAndTranslation(uploadedImage, fileName);
    setScanStep(SCAN_STEPS.length);
    setResult(ocr);
    await new Promise((r) => setTimeout(r, 300));
    setPhase("results");
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

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.translatedText).then(() => {
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

  const handleReset = () => {
    speechSynthesis.cancel();
    setPhase("upload");
    setUploadedImage(null);
    setFileName("");
    setScanStep(0);
    setResult(null);
    setIsSpeaking(false);
    setCopied(false);
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
                Upload a photo of a museum sign, historical information board, book page, or ancient inscription — and read it in English instantly.
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
                      Drop a photo here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground/50 mt-1">
                      Museum signs · Information boards · Book pages · Inscriptions
                    </p>
                    <p className="text-[10px] text-muted-foreground/35 mt-2">JPG · PNG · HEIC · WEBP</p>
                  </div>
                </div>
              )}
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
                    Start Translation
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Info chips */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground/50">
              {["Bulgarian · Greek · Latin · Cyrillic", "Museum signs & plaques", "Book pages & manuscripts", "Instant English translation"].map((t) => (
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
              <div className="relative w-48 h-32 rounded-xl overflow-hidden border border-primary/20 shrink-0">
                <img src={uploadedImage} alt="Scanning" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30" />
                <motion.div
                  className="absolute left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_rgba(201,162,39,0.9)]"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 border border-primary/20 rounded-xl" />
              </div>
            )}

            <div className="text-center space-y-2">
              <p className="font-serif text-lg text-foreground">Scanning your image</p>
              <p className="text-xs text-muted-foreground/50">Please wait while we process the text</p>
            </div>

            <ScanProgress step={scanStep} />

            {/* Progress bar */}
            <div className="w-full max-w-sm">
              <div className="h-1 bg-white/6 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  animate={{ width: `${Math.min(((scanStep) / SCAN_STEPS.length) * 100, 96)}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* ══ RESULTS ═════════════════════════════════════════════════════════ */}
        {phase === "results" && result && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto px-5 py-10 space-y-8"
          >
            {/* Result header */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              {uploadedImage && (
                <div className="w-20 h-14 rounded-lg overflow-hidden border border-white/10 shrink-0">
                  <img src={uploadedImage} alt="Source" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-semibold text-green-400">Translation Complete</span>
                  <span className="text-[10px] border border-primary/25 text-primary/70 bg-primary/8 rounded-full px-2 py-0.5">
                    {result.confidence}% confidence
                  </span>
                </div>
                <h2 className="font-serif text-xl text-foreground font-bold">{result.subject}</h2>
                <p className="text-xs text-muted-foreground mt-1">{result.sourceType}</p>
              </div>
            </div>

            {/* Two-column text */}
            <div className="grid md:grid-cols-2 gap-5">
              <TextColumn
                label="Detected Text"
                langBadge={result.detectedLanguage}
                text={result.originalText}
                dimmed
              />
              <TextColumn
                label="English Translation"
                langBadge="English (en)"
                text={result.translatedText}
              />
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleReadAloud}
                className={`rounded-full gap-2 ${
                  isSpeaking
                    ? "bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                {isSpeaking ? "Stop Reading" : "Read Aloud"}
              </Button>

              <Button
                variant="outline"
                onClick={handleCopy}
                className={`rounded-full gap-2 transition-all ${
                  copied ? "border-green-500/40 text-green-400 bg-green-500/8" : "border-white/15 hover:bg-white/5"
                }`}
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Translation"}
              </Button>

              <Button
                variant="outline"
                onClick={handleSave}
                className={`rounded-full gap-2 transition-all ${
                  saved ? "border-green-500/40 text-green-400 bg-green-500/8" : "border-white/15 hover:bg-white/5"
                }`}
              >
                {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {saved ? "Saved!" : "Save to Gallery"}
              </Button>
            </div>

            {/* Future-ready notice */}
            <div className="rounded-xl border border-white/8 bg-white/3 p-4 flex items-start gap-3">
              <Info className="w-4 h-4 text-primary/50 shrink-0 mt-0.5" />
              <div className="text-xs text-muted-foreground/60 leading-relaxed">
                <span className="font-semibold text-muted-foreground/80 block mb-0.5">Demo mode</span>
                This prototype uses simulated OCR. To enable live translation of any image, connect a
                vision API such as <span className="text-primary/60">Google Cloud Vision + Translate</span> or{" "}
                <span className="text-primary/60">OpenAI GPT-4o Vision</span> to the{" "}
                <code className="text-primary/60">performOCRAndTranslation</code> function in{" "}
                <code className="text-primary/60">ScanTranslate.tsx</code>.
              </div>
            </div>

            {/* Translate another */}
            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                onClick={handleReset}
                className="border-white/15 hover:bg-white/5 rounded-full gap-2 text-muted-foreground"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Translate Another Image
              </Button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
