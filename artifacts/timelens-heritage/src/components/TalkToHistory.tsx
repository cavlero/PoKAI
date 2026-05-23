import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, ChevronLeft, Star,
  Mic, MicOff, Volume2, VolumeX,
  Play, Pause, Square, Phone, PhoneOff,
  RotateCcw, Settings2, ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Monument } from "@/data/monuments";
import { HISTORICAL_FIGURES, HistoricalFigure, getRecommendedFigure } from "@/data/historicalFigures";
import { useSpeechVoice, VOICE_PROFILES, SpeakOptions } from "@/hooks/useSpeechVoice";
import { generateResponse } from "@/lib/aiChat";

interface Message {
  id:      string;
  role:    "user" | "figure";
  content: string;
}

interface TypingState {
  msgId:     string;
  displayed: string;
  isFull:    boolean;
}

/* ──────────────────────────────────────────────
   Sound wave bars
────────────────────────────────────────────── */
function SoundWave({ active, bars = 7 }: { active: boolean; bars?: number }) {
  const heights = [0.35, 0.65, 1.0, 0.75, 0.55, 0.85, 0.45, 0.9, 0.6, 0.7, 0.4];
  return (
    <div className="flex items-center gap-[3px]" style={{ height: 24 }}>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-full"
          style={{ backgroundColor: "hsl(var(--primary))", height: 24, originY: 0.5 }}
          animate={
            active
              ? { scaleY: [heights[i % heights.length], 1.0, heights[(i + 4) % heights.length], heights[i % heights.length]] }
              : { scaleY: 0.12 }
          }
          transition={
            active
              ? { duration: 0.7 + (i % 3) * 0.15, repeat: Infinity, delay: i * 0.07, ease: "easeInOut" }
              : { duration: 0.25 }
          }
        />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Pulse rings (live call mode + speaking avatar)
────────────────────────────────────────────── */
function PulseRings({ active, count = 3 }: { active: boolean; count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-2 border-primary/40"
          animate={active ? { scale: [1, 1.35 + i * 0.22], opacity: [0.6, 0] } : { scale: 1, opacity: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Avatar — glows + pulse rings when speaking
────────────────────────────────────────────── */
function FigureAvatar({
  figure,
  size     = "md",
  glow     = false,
  speaking = false,
}: {
  figure:   HistoricalFigure;
  size?:    "sm" | "md" | "lg";
  glow?:    boolean;
  speaking?: boolean;
}) {
  const dim  = { sm: "w-9 h-9",   md: "w-12 h-12", lg: "w-20 h-20"  };
  const pad  = { sm: "p-[2px]",   md: "p-[2.5px]", lg: "p-[3px]"    };

  const glowStyle = speaking
    ? "shadow-[0_0_0_2px_rgba(201,162,39,1),0_0_20px_8px_rgba(201,162,39,0.55),0_0_50px_20px_rgba(201,162,39,0.2)]"
    : glow
    ? "shadow-[0_0_18px_rgba(201,162,39,0.7)] ring-2 ring-primary/60"
    : "shadow-[0_0_8px_rgba(201,162,39,0.3)] ring-1 ring-primary/30";

  return (
    <div className={`relative ${dim[size]} shrink-0`}>
      {speaking && <PulseRings active count={2} />}
      <motion.div
        animate={speaking ? { boxShadow: [
          "0 0 0 2px rgba(201,162,39,1), 0 0 20px 8px rgba(201,162,39,0.55)",
          "0 0 0 2px rgba(201,162,39,1), 0 0 32px 14px rgba(201,162,39,0.75)",
          "0 0 0 2px rgba(201,162,39,1), 0 0 20px 8px rgba(201,162,39,0.55)",
        ] } : {}}
        transition={speaking ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : {}}
        className={`relative z-10 w-full h-full ${pad[size]} rounded-full transition-all duration-300 ${glowStyle}`}
        style={{ background: "linear-gradient(135deg,#c9a227 0%,#f0d060 35%,#8b6914 65%,#c9a227 100%)" }}
      >
        <div className="w-full h-full rounded-full overflow-hidden">
          <img
            src={figure.portraitUrl}
            alt={figure.name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        </div>
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Voice Settings Panel
────────────────────────────────────────────── */
function VoiceSettingsPanel({
  figure,
  voiceEnabled,
  onVoiceToggle,
  pitchMult,
  onPitchChange,
  rateMult,
  onRateChange,
  onReplay,
  canReplay,
  isSpeaking,
}: {
  figure:        HistoricalFigure;
  voiceEnabled:  boolean;
  onVoiceToggle: () => void;
  pitchMult:     number;
  onPitchChange: (v: number) => void;
  rateMult:      number;
  onRateChange:  (v: number) => void;
  onReplay:      () => void;
  canReplay:     boolean;
  isSpeaking:    boolean;
}) {
  const [open, setOpen] = useState(false);
  const profile = VOICE_PROFILES[figure.id];

  return (
    <div className="border-b border-white/5 bg-background/15">
      {/* Settings toggle row */}
      <div className="flex items-center gap-2 px-4 py-2">
        {/* Voice ON/OFF */}
        <button
          onClick={onVoiceToggle}
          title={voiceEnabled ? "Voice ON — click to mute" : "Voice OFF — click to enable"}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs transition-all ${
            voiceEnabled
              ? "bg-primary/12 border-primary/40 text-primary"
              : "bg-white/5 border-white/10 text-muted-foreground/40"
          }`}
          data-testid="button-voice-toggle"
        >
          {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{voiceEnabled ? "Voice ON" : "Voice OFF"}</span>
        </button>

        {voiceEnabled && profile && (
          <span className="text-[10px] text-muted-foreground/35 italic flex-1 truncate">
            {figure.name.split(" ")[0]} — {profile.label}
          </span>
        )}

        {voiceEnabled && (
          <>
            {/* Replay */}
            <button
              onClick={onReplay}
              disabled={!canReplay || isSpeaking}
              title="Replay last answer"
              className="flex items-center gap-1 px-2 py-1 rounded border border-white/8 hover:border-primary/30 text-muted-foreground/50 hover:text-primary text-[10px] transition-colors disabled:opacity-25"
              data-testid="button-replay"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Replay</span>
            </button>

            {/* Expand/collapse sliders */}
            <button
              onClick={() => setOpen((o) => !o)}
              className={`flex items-center gap-1 px-2 py-1 rounded border text-[10px] transition-all ${
                open
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "border-white/8 text-muted-foreground/40 hover:text-muted-foreground"
              }`}
            >
              <Settings2 className="w-3 h-3" />
              <span className="hidden sm:inline">Adjust</span>
              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-3 h-3" />
              </motion.span>
            </button>
          </>
        )}
      </div>

      {/* Sliders */}
      <AnimatePresence initial={false}>
        {voiceEnabled && open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 flex flex-wrap gap-x-8 gap-y-2.5 items-center">
              {/* Speed */}
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider w-9">Speed</span>
                <input
                  type="range"
                  min={0.5} max={2.0} step={0.1}
                  value={rateMult}
                  onChange={(e) => onRateChange(Number(e.target.value))}
                  className="w-24 h-1 cursor-pointer accent-yellow-500"
                />
                <span className="text-[10px] text-primary/60 w-7 tabular-nums">{rateMult.toFixed(1)}x</span>
              </div>

              {/* Pitch */}
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider w-9">Pitch</span>
                <input
                  type="range"
                  min={0.5} max={2.0} step={0.1}
                  value={pitchMult}
                  onChange={(e) => onPitchChange(Number(e.target.value))}
                  className="w-24 h-1 cursor-pointer accent-yellow-500"
                />
                <span className="text-[10px] text-primary/60 w-7 tabular-nums">{pitchMult.toFixed(1)}x</span>
              </div>

              <button
                onClick={() => { onPitchChange(1); onRateChange(1); }}
                className="text-[10px] text-muted-foreground/30 hover:text-muted-foreground transition-colors"
              >
                Reset
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Live Call Mode
────────────────────────────────────────────── */
type LiveState = "idle" | "listening" | "processing" | "speaking";

function LiveCallMode({
  figure,
  getResponse,
  onClose,
}: {
  figure:      HistoricalFigure;
  getResponse: (q: string) => string;
  onClose:     () => void;
}) {
  const [liveState,      setLiveState]      = useState<LiveState>("idle");
  const [liveTranscript, setLiveTranscript] = useState("");
  const [figureText,     setFigureText]     = useState("");
  const liveActiveRef = useRef(true);

  const {
    interimTranscript, isSupported,
    speak, stopSpeaking, startListening, stopListening,
  } = useSpeechVoice(figure.id);

  const beginListening = useCallback(() => {
    if (!liveActiveRef.current) return;
    setLiveState("listening");
    setLiveTranscript("");
    setFigureText("");
    startListening((text, isFinal) => {
      setLiveTranscript(text);
      if (isFinal && liveActiveRef.current) {
        stopListening();
        setLiveState("processing");
        setLiveTranscript("");
        setTimeout(() => {
          if (!liveActiveRef.current) return;
          const response = getResponse(text);
          setFigureText(response);
          setLiveState("speaking");
          speak(response, { onEnd: () => {
            if (liveActiveRef.current) setTimeout(beginListening, 900);
          }});
        }, 1100);
      }
    }, false);
  }, [startListening, stopListening, speak, getResponse]);

  useEffect(() => {
    liveActiveRef.current = true;
    const t = setTimeout(beginListening, 800);
    return () => {
      clearTimeout(t);
      liveActiveRef.current = false;
      stopListening();
      stopSpeaking();
    };
  }, []);

  const hangUp = () => {
    liveActiveRef.current = false;
    stopListening();
    stopSpeaking();
    onClose();
  };

  const waveActive = liveState === "listening" || liveState === "speaking";
  const statusLabel: Record<LiveState, string> = {
    idle:       "Connecting...",
    listening:  "Listening...",
    processing: "Thinking...",
    speaking:   `${figure.name.split(" ")[0]} is speaking...`,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/97 backdrop-blur-2xl"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ opacity: [0.07, 0.18, 0.07] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[65vw] rounded-full bg-primary blur-[220px]"
        />
      </div>

      <div className="relative flex flex-col items-center gap-7 px-6 max-w-xs w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs uppercase tracking-widest"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Live Call Active
        </motion.div>

        <div className="relative w-44 h-44">
          <PulseRings active={waveActive} count={3} />
          <motion.div
            animate={waveActive ? { boxShadow: [
              "0 0 0 3px rgba(201,162,39,1), 0 0 30px 10px rgba(201,162,39,0.5)",
              "0 0 0 3px rgba(201,162,39,1), 0 0 50px 20px rgba(201,162,39,0.75)",
              "0 0 0 3px rgba(201,162,39,1), 0 0 30px 10px rgba(201,162,39,0.5)",
            ]} : {}}
            transition={waveActive ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : {}}
            className="relative z-10 w-full h-full p-1.5 rounded-full"
            style={{ background: "linear-gradient(135deg,#c9a227 0%,#f0d060 35%,#8b6914 65%,#c9a227 100%)" }}
          >
            <div className="w-full h-full rounded-full overflow-hidden">
              <img src={figure.portraitUrl} alt={figure.name} className="w-full h-full object-cover object-top" />
            </div>
          </motion.div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-serif text-primary mb-0.5">{figure.name}</h2>
          <p className="text-xs text-muted-foreground/50">{figure.title}</p>
        </div>

        <SoundWave active={waveActive} bars={11} />

        <div className="min-h-[5.5rem] w-full text-center flex items-center justify-center">
          <AnimatePresence mode="wait">
            {liveState === "listening" && (liveTranscript || interimTranscript) ? (
              <motion.div key="user" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-sm text-primary/80 bg-primary/8 border border-primary/20 rounded-xl px-4 py-3 italic">
                "{liveTranscript || interimTranscript}"
              </motion.div>
            ) : liveState === "speaking" && figureText ? (
              <motion.div key="fig" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-sm text-foreground/80 bg-white/5 border border-white/8 rounded-xl px-4 py-3 font-serif leading-relaxed">
                {figureText.slice(0, 220)}{figureText.length > 220 ? "..." : ""}
              </motion.div>
            ) : (
              <motion.p key="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-muted-foreground/40 text-sm tracking-wide">
                {statusLabel[liveState]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={hangUp}
          className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-[0_0_24px_rgba(239,68,68,0.5)] transition-colors"
          data-testid="button-hang-up">
          <PhoneOff className="w-7 h-7 text-white" />
        </motion.button>

        {!isSupported.recognition && (
          <p className="text-xs text-muted-foreground/30 text-center max-w-xs">
            Voice input requires Chrome or Edge. Text input is available in chat mode.
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Figure Selector
────────────────────────────────────────────── */
function FigureSelector({
  monument,
  onSelect,
}: {
  monument: Monument;
  onSelect: (f: HistoricalFigure) => void;
}) {
  const recommended = getRecommendedFigure(monument.id);
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs uppercase tracking-widest mb-4">
          Talk to History
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-primary mb-3">Choose Your Historical Guide</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Select a historical figure to begin your conversation. You are not reading history — you are talking to it.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {HISTORICAL_FIGURES.map((figure, i) => {
          const isRec = figure.id === recommended.id;
          return (
            <motion.div
              key={figure.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6, scale: 1.01 }}
              onClick={() => onSelect(figure)}
              data-testid={`card-figure-${figure.id}`}
              className={`relative flex flex-col p-5 rounded-2xl border cursor-pointer transition-all group ${
                isRec
                  ? "border-primary/50 bg-primary/5 shadow-[0_0_30px_rgba(201,162,39,0.12)]"
                  : "border-white/8 bg-card/40 hover:border-primary/30 hover:bg-card/60"
              }`}
            >
              {isRec && (
                <div className="absolute -top-2.5 left-4 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-medium uppercase tracking-wider shadow-sm">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  Recommended
                </div>
              )}
              <div className="flex items-center gap-4 mb-4">
                <FigureAvatar figure={figure} size="lg" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-base text-foreground leading-snug">{figure.name}</h3>
                  <p className="text-xs text-primary/80 mt-0.5">{figure.period}</p>
                  <p className="text-xs text-muted-foreground/60 mt-0.5 truncate">{figure.title}</p>
                  {VOICE_PROFILES[figure.id] && (
                    <p className="text-[10px] text-muted-foreground/40 mt-0.5 flex items-center gap-1">
                      <Volume2 className="w-2.5 h-2.5" />
                      {VOICE_PROFILES[figure.id].label}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">
                "{figure.intro.slice(0, 130)}..."
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {figure.suggestedQuestions.slice(0, 2).map((q) => (
                  <span key={q} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-muted-foreground/60">
                    {q.length > 28 ? q.slice(0, 28) + "…" : q}
                  </span>
                ))}
              </div>
              <button className={`w-full py-2.5 rounded-xl text-sm font-serif transition-all ${
                isRec
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_16px_rgba(201,162,39,0.3)]"
                  : "bg-white/5 text-muted-foreground group-hover:bg-primary/15 group-hover:text-primary border border-white/10 group-hover:border-primary/30"
              }`}>
                Begin Conversation
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Figure Chat
────────────────────────────────────────────── */
function FigureChat({
  figure,
  onBack,
}: {
  figure: HistoricalFigure;
  onBack: () => void;
}) {
  const [messages,       setMessages]       = useState<Message[]>([
    { id: "intro", role: "figure", content: figure.intro },
  ]);
  const [inputValue,     setInputValue]     = useState("");
  const [isTyping,       setIsTyping]       = useState(false);
  const [typingState,    setTypingState]    = useState<TypingState | null>(null);
  const [voiceEnabled,   setVoiceEnabled]   = useState(false);
  const [liveModeActive, setLiveModeActive] = useState(false);
  const [speakingMsgId,  setSpeakingMsgId]  = useState<string | null>(null);
  const [lastFigureMsgId, setLastFigureMsgId] = useState<string | null>("intro");
  const [userPitchMult,  setUserPitchMult]  = useState(1.0);
  const [userRateMult,   setUserRateMult]   = useState(1.0);

  const scrollRef      = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const {
    isListening, isSpeaking, isPaused, interimTranscript, isSupported,
    speak, stopSpeaking, pauseSpeaking, resumeSpeaking, startListening, stopListening,
  } = useSpeechVoice(figure.id);

  const speakOptions = useCallback(
    (onEnd?: () => void): SpeakOptions => ({
      pitchMultiplier: userPitchMult,
      rateMultiplier:  userRateMult,
      onEnd,
    }),
    [userPitchMult, userRateMult]
  );

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping, typingState]);

  // Animate typing for a message, then optionally speak it
  const startTypingEffect = useCallback(
    (msgId: string, text: string, onComplete?: () => void) => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      const charSpeed = Math.max(5, Math.min(28, Math.round(650 / text.length)));
      let i = 0;
      setTypingState({ msgId, displayed: "", isFull: false });
      typingTimerRef.current = setInterval(() => {
        i++;
        if (i >= text.length) {
          clearInterval(typingTimerRef.current!);
          typingTimerRef.current = null;
          setTypingState({ msgId, displayed: text, isFull: true });
          onComplete?.();
        } else {
          setTypingState((prev) => prev ? { ...prev, displayed: text.slice(0, i) } : null);
        }
      }, charSpeed);
    },
    []
  );

  // Run typing effect for intro message on mount
  useEffect(() => {
    startTypingEffect("intro", figure.intro);
    return () => { if (typingTimerRef.current) clearInterval(typingTimerRef.current); };
  }, []);

  // Stop speech when voice toggled off
  useEffect(() => {
    if (!voiceEnabled) { stopSpeaking(); setSpeakingMsgId(null); }
  }, [voiceEnabled, stopSpeaking]);

  const getResponse = useCallback((query: string): string => {
    return generateResponse(figure.id, query, messages.length);
  }, [figure.id, messages.length]);

  const isAnimatingTyping = Boolean(typingState && !typingState.isFull);
  const isBusy = isTyping || isAnimatingTyping;

  const handleSend = useCallback((e?: React.FormEvent, override?: string) => {
    if (e) e.preventDefault();
    const query = (override ?? inputValue).trim();
    if (!query || isBusy) return;
    stopSpeaking();
    setSpeakingMsgId(null);
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: "user", content: query }]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(query);
      const newId    = (Date.now() + 1).toString();
      setMessages((prev) => [...prev, { id: newId, role: "figure", content: response }]);
      setLastFigureMsgId(newId);
      setIsTyping(false);

      startTypingEffect(newId, response, () => {
        if (voiceEnabled) {
          setSpeakingMsgId(newId);
          speak(response, speakOptions(() => setSpeakingMsgId(null)));
        }
      });
    }, 1400);
  }, [inputValue, isBusy, getResponse, startTypingEffect, voiceEnabled, speak, speakOptions, stopSpeaking]);

  const handleMicPress = () => {
    if (isListening) { stopListening(); return; }
    stopSpeaking();
    startListening((text, isFinal) => {
      setInputValue(text);
      if (isFinal) setTimeout(() => handleSend(undefined, text), 200);
    }, false);
  };

  const handlePlayMessage = (msg: Message) => {
    stopSpeaking();
    setSpeakingMsgId(msg.id);
    speak(msg.content, speakOptions(() => setSpeakingMsgId(null)));
  };

  const handleReplay = () => {
    if (!lastFigureMsgId || isSpeaking) return;
    const msg = messages.find((m) => m.id === lastFigureMsgId);
    if (!msg) return;
    stopSpeaking();
    setSpeakingMsgId(msg.id);
    speak(msg.content, speakOptions(() => setSpeakingMsgId(null)));
  };

  return (
    <>
      <AnimatePresence>
        {liveModeActive && (
          <LiveCallMode
            figure={figure}
            getResponse={getResponse}
            onClose={() => setLiveModeActive(false)}
          />
        )}
      </AnimatePresence>

      <div className="w-full max-w-3xl mx-auto">
        <div className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur overflow-hidden flex flex-col shadow-2xl">

          {/* ── Header ── */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 bg-card/80">
            <button onClick={onBack} className="text-muted-foreground hover:text-primary transition-colors shrink-0"
              data-testid="button-back-to-figures">
              <ChevronLeft className="w-5 h-5" />
            </button>

            <FigureAvatar figure={figure} size="md" glow={isSpeaking} speaking={isSpeaking} />

            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-sm text-foreground leading-tight">{figure.name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5 h-5">
                {isSpeaking ? (
                  <SoundWave active bars={5} />
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                    <p className="text-[11px] text-primary/60 truncate">{figure.title}</p>
                  </>
                )}
              </div>
            </div>

            {/* Talk Live */}
            <button
              onClick={() => setLiveModeActive(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium transition-all shrink-0"
              data-testid="button-talk-live"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Talk Live</span>
            </button>
          </div>

          {/* ── Voice Settings ── */}
          <VoiceSettingsPanel
            figure={figure}
            voiceEnabled={voiceEnabled}
            onVoiceToggle={() => setVoiceEnabled((v) => !v)}
            pitchMult={userPitchMult}
            onPitchChange={setUserPitchMult}
            rateMult={userRateMult}
            onRateChange={setUserRateMult}
            onReplay={handleReplay}
            canReplay={Boolean(lastFigureMsgId)}
            isSpeaking={isSpeaking}
          />

          {/* ── Messages ── */}
          <ScrollArea className="h-96 px-4 py-4" ref={scrollRef}>
            <div className="flex flex-col gap-4">
              <AnimatePresence initial={false}>
                {messages.map((msg) => {
                  const isAnimating  = typingState?.msgId === msg.id && !typingState.isFull;
                  const displayText  = typingState?.msgId === msg.id ? typingState.displayed : msg.content;
                  const isThisSpeaking = speakingMsgId === msg.id && isSpeaking;
                  const isThisPaused   = speakingMsgId === msg.id && isPaused;

                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex gap-3 ${
                        msg.role === "user"
                          ? "self-end flex-row-reverse max-w-[80%]"
                          : "self-start max-w-[90%]"
                      }`}
                    >
                      {msg.role === "figure" ? (
                        <FigureAvatar
                          figure={figure}
                          size="sm"
                          glow={isThisSpeaking}
                          speaking={isThisSpeaking}
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs text-primary font-bold shrink-0">
                          You
                        </div>
                      )}

                      <div className="flex flex-col gap-1.5">
                        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-primary/20 text-foreground rounded-tr-sm border border-primary/20"
                            : "bg-white/5 text-foreground/90 rounded-tl-sm border border-white/5 font-serif"
                        }`}>
                          {displayText}
                          {/* Blinking cursor during typing */}
                          {isAnimating && (
                            <motion.span
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ duration: 0.7, repeat: Infinity }}
                              className="inline-block w-[2px] h-[14px] bg-primary ml-0.5 align-middle rounded-sm"
                            />
                          )}
                        </div>

                        {/* Audio controls on figure messages */}
                        {msg.role === "figure" && voiceEnabled && typingState?.msgId !== msg.id && (
                          <div className="flex items-center gap-1 ml-1">
                            {isThisSpeaking ? (
                              <>
                                <SoundWave active bars={4} />
                                <button onClick={pauseSpeaking} className="p-1 rounded text-primary/60 hover:text-primary transition-colors" title="Pause">
                                  <Pause className="w-3 h-3" />
                                </button>
                                <button onClick={() => { stopSpeaking(); setSpeakingMsgId(null); }} className="p-1 rounded text-primary/60 hover:text-primary transition-colors" title="Stop">
                                  <Square className="w-3 h-3" />
                                </button>
                              </>
                            ) : isThisPaused ? (
                              <>
                                <button onClick={resumeSpeaking} className="p-1 rounded text-primary/60 hover:text-primary transition-colors" title="Resume">
                                  <Play className="w-3 h-3" />
                                </button>
                                <button onClick={() => { stopSpeaking(); setSpeakingMsgId(null); }} className="p-1 rounded text-primary/60 hover:text-primary transition-colors" title="Stop">
                                  <Square className="w-3 h-3" />
                                </button>
                              </>
                            ) : (
                              <button onClick={() => handlePlayMessage(msg)} className="p-1 rounded text-muted-foreground/30 hover:text-primary transition-colors" title="Play this response">
                                <Play className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}

                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 self-start">
                    <FigureAvatar figure={figure} size="sm" />
                    <div className="px-4 py-3 rounded-2xl bg-white/5 rounded-tl-sm border border-white/5 flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>

          {/* ── Suggested questions ── */}
          <div className="px-4 pt-2 pb-1 flex gap-2 overflow-x-auto">
            {figure.suggestedQuestions.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleSend(undefined, q)}
                disabled={isBusy}
                className="text-xs bg-white/5 hover:bg-primary/10 border border-white/8 hover:border-primary/30 px-3 py-1.5 rounded-full whitespace-nowrap text-muted-foreground hover:text-primary transition-colors disabled:opacity-40 shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* ── Input bar ── */}
          <div className="p-4 border-t border-white/5">
            <form onSubmit={handleSend} className="flex gap-2">
              {isSupported.recognition && (
                <button
                  type="button"
                  onClick={handleMicPress}
                  title={isListening ? "Stop listening" : "Speak your question"}
                  className={`h-11 w-11 rounded-xl flex items-center justify-center transition-all shrink-0 border ${
                    isListening
                      ? "bg-red-500/20 border-red-500/40 text-red-400"
                      : "bg-white/5 border-white/10 text-muted-foreground/50 hover:text-primary hover:border-primary/30"
                  }`}
                  data-testid="button-mic"
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              )}

              <Input
                value={isListening && interimTranscript ? interimTranscript : inputValue}
                onChange={(e) => { if (!isListening) setInputValue(e.target.value); }}
                placeholder={
                  isListening
                    ? "Listening..."
                    : isAnimatingTyping
                    ? `${figure.name.split(" ")[0]} is speaking...`
                    : `Ask ${figure.name.split(" ")[0]} anything...`
                }
                className={`bg-background/60 border-white/10 focus-visible:ring-primary h-11 text-sm transition-all ${
                  isListening ? "border-red-500/30 text-primary/70 italic" : ""
                }`}
                disabled={isBusy}
                data-testid="input-figure-chat"
              />

              <Button
                type="submit"
                size="icon"
                className="h-11 w-11 bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
                disabled={(!inputValue.trim() && !interimTranscript) || isBusy}
                data-testid="button-figure-send"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

/* ──────────────────────────────────────────────
   Root export
────────────────────────────────────────────── */
export function TalkToHistory({ monument }: { monument: Monument }) {
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure | null>(null);

  return (
    <AnimatePresence mode="wait">
      {!selectedFigure ? (
        <motion.div key="selector" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
          <FigureSelector monument={monument} onSelect={setSelectedFigure} />
        </motion.div>
      ) : (
        <motion.div key="chat" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
          <FigureChat figure={selectedFigure} onBack={() => setSelectedFigure(null)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
