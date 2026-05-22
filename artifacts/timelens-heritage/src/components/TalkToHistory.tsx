import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, ChevronLeft, Star,
  Mic, MicOff, Volume2, VolumeX,
  Play, Pause, Square, Phone, PhoneOff,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Monument } from "@/data/monuments";
import { HISTORICAL_FIGURES, HistoricalFigure, getRecommendedFigure } from "@/data/historicalFigures";
import { useSpeechVoice } from "@/hooks/useSpeechVoice";

interface Message {
  id: string;
  role: "user" | "figure";
  content: string;
}

function FigureAvatar({
  figure,
  size = "md",
  glow = false,
}: {
  figure: HistoricalFigure;
  size?: "sm" | "md" | "lg";
  glow?: boolean;
}) {
  const sizes       = { sm: "w-9 h-9",   md: "w-12 h-12", lg: "w-20 h-20"    };
  const padding     = { sm: "p-[2px]",   md: "p-[2.5px]", lg: "p-[3px]"      };
  return (
    <div
      className={`${sizes[size]} ${padding[size]} rounded-full shrink-0 transition-all duration-300 ${
        glow
          ? "shadow-[0_0_24px_rgba(201,162,39,0.8)] ring-2 ring-primary/70"
          : "shadow-[0_0_8px_rgba(201,162,39,0.3)] ring-1 ring-primary/30"
      }`}
      style={{ background: "linear-gradient(135deg,#c9a227 0%,#f0d060 35%,#8b6914 65%,#c9a227 100%)" }}
    >
      <div className="w-full h-full rounded-full overflow-hidden">
        <img src={figure.portraitUrl} alt={figure.name} className="w-full h-full object-cover object-top" loading="lazy" />
      </div>
    </div>
  );
}

function SoundWave({ active, bars = 7 }: { active: boolean; bars?: number }) {
  const heights = [0.35, 0.65, 1.0, 0.75, 0.55, 0.85, 0.45, 0.9, 0.6, 0.7, 0.4];
  return (
    <div className="flex items-center gap-[3px]" style={{ height: 28 }}>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-full"
          style={{ backgroundColor: "hsl(var(--primary))", height: 28, originY: 0.5 }}
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

function PulseRings({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-2 border-primary/40"
          animate={
            active
              ? { scale: [1, 1.35 + i * 0.22], opacity: [0.6, 0] }
              : { scale: 1, opacity: 0 }
          }
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

type LiveState = "idle" | "listening" | "processing" | "speaking";

function LiveCallMode({
  figure,
  getResponse,
  onClose,
}: {
  figure: HistoricalFigure;
  getResponse: (q: string) => string;
  onClose: () => void;
}) {
  const [liveState, setLiveState] = useState<LiveState>("idle");
  const [liveTranscript, setLiveTranscript] = useState("");
  const [figureText, setFigureText]         = useState("");
  const liveActiveRef = useRef(true);

  const { isListening, isSpeaking, interimTranscript, isSupported, speak, stopSpeaking, startListening, stopListening } =
    useSpeechVoice(figure.id);

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
          speak(response, () => {
            if (liveActiveRef.current) setTimeout(beginListening, 900);
          });
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

  const statusLabel: Record<LiveState, string> = {
    idle:       "Connecting...",
    listening:  "Listening...",
    processing: "Thinking...",
    speaking:   `${figure.name.split(" ")[0]} is speaking...`,
  };

  const waveActive = liveState === "listening" || liveState === "speaking";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/97 backdrop-blur-2xl"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ opacity: [0.07, 0.16, 0.07] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[65vw] rounded-full bg-primary blur-[220px]"
        />
      </div>

      <div className="relative flex flex-col items-center gap-7 px-6 max-w-xs w-full">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs uppercase tracking-widest"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Live Call Active
        </motion.div>

        {/* Portrait with pulse rings */}
        <div className="relative w-44 h-44">
          <PulseRings active={waveActive} />
          <div
            className="relative z-10 w-full h-full p-1.5 rounded-full shadow-[0_0_50px_rgba(201,162,39,0.35)]"
            style={{ background: "linear-gradient(135deg,#c9a227 0%,#f0d060 35%,#8b6914 65%,#c9a227 100%)" }}
          >
            <div className="w-full h-full rounded-full overflow-hidden">
              <img src={figure.portraitUrl} alt={figure.name} className="w-full h-full object-cover object-top" />
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="text-center">
          <h2 className="text-2xl font-serif text-primary mb-0.5">{figure.name}</h2>
          <p className="text-xs text-muted-foreground/50">{figure.title}</p>
        </div>

        {/* Sound wave */}
        <SoundWave active={waveActive} bars={11} />

        {/* Live text */}
        <div className="min-h-[5.5rem] w-full text-center flex items-center justify-center">
          <AnimatePresence mode="wait">
            {liveState === "listening" && (liveTranscript || interimTranscript) ? (
              <motion.div
                key="user-speech"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-primary/80 bg-primary/8 border border-primary/20 rounded-xl px-4 py-3 italic"
              >
                "{liveTranscript || interimTranscript}"
              </motion.div>
            ) : liveState === "speaking" && figureText ? (
              <motion.div
                key="figure-speech"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-foreground/80 bg-white/5 border border-white/8 rounded-xl px-4 py-3 font-serif leading-relaxed"
              >
                {figureText.slice(0, 220)}{figureText.length > 220 ? "..." : ""}
              </motion.div>
            ) : (
              <motion.p
                key="status"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-muted-foreground/40 text-sm tracking-wide"
              >
                {statusLabel[liveState]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Hang Up */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={hangUp}
          className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-[0_0_24px_rgba(239,68,68,0.5)] transition-colors"
          data-testid="button-hang-up"
        >
          <PhoneOff className="w-7 h-7 text-white" />
        </motion.button>

        {!isSupported.recognition && (
          <p className="text-xs text-muted-foreground/30 text-center max-w-xs">
            Voice input requires Chrome or Edge. Text input is still available in chat mode.
          </p>
        )}
      </div>
    </motion.div>
  );
}

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

function FigureChat({
  figure,
  onBack,
}: {
  figure: HistoricalFigure;
  onBack: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "intro", role: "figure", content: figure.intro },
  ]);
  const [inputValue, setInputValue]         = useState("");
  const [isTyping, setIsTyping]             = useState(false);
  const [voiceEnabled, setVoiceEnabled]     = useState(false);
  const [liveModeActive, setLiveModeActive] = useState(false);
  const [speakingMsgId, setSpeakingMsgId]   = useState<string | null>(null);
  const scrollRef       = useRef<HTMLDivElement>(null);
  const lastSpokenIdRef = useRef<string>("intro");

  const {
    isListening, isSpeaking, isPaused, interimTranscript, isSupported,
    speak, stopSpeaking, pauseSpeaking, resumeSpeaking, startListening, stopListening,
  } = useSpeechVoice(figure.id);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  // Auto-speak new figure messages when voiceEnabled
  useEffect(() => {
    if (!voiceEnabled || isTyping) return;
    const last = messages[messages.length - 1];
    if (!last || last.role !== "figure") return;
    if (last.id === lastSpokenIdRef.current) return;
    lastSpokenIdRef.current = last.id;
    setSpeakingMsgId(last.id);
    speak(last.content, () => setSpeakingMsgId(null));
  }, [messages, isTyping, voiceEnabled, speak]);

  // Stop speech when voice toggled off
  useEffect(() => {
    if (!voiceEnabled) { stopSpeaking(); setSpeakingMsgId(null); }
  }, [voiceEnabled, stopSpeaking]);

  const getResponse = useCallback((query: string): string => {
    const lower = query.toLowerCase();
    const keys = Object.keys(figure.responses).filter((k) => k !== "default");
    for (const key of keys) {
      const clean = key.replace(/[^\w\s]/g, "").toLowerCase();
      const words = clean.split(" ").filter((w) => w.length > 3);
      if (words.some((w) => lower.includes(w)) || lower.includes(clean)) return figure.responses[key];
    }
    return figure.responses["default"];
  }, [figure]);

  const handleSend = (e?: React.FormEvent, override?: string) => {
    if (e) e.preventDefault();
    const query = (override ?? inputValue).trim();
    if (!query || isTyping) return;
    stopSpeaking();
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: "user", content: query }]);
    setInputValue("");
    setIsTyping(true);
    setTimeout(() => {
      const response = getResponse(query);
      const newId = (Date.now() + 1).toString();
      setMessages((prev) => [...prev, { id: newId, role: "figure", content: response }]);
      setIsTyping(false);
    }, 1600);
  };

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
    speak(msg.content, () => setSpeakingMsgId(null));
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

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 bg-card/80">
            <button
              onClick={onBack}
              className="text-muted-foreground hover:text-primary transition-colors shrink-0"
              data-testid="button-back-to-figures"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Avatar with speaking indicator */}
            <div className="relative shrink-0">
              <FigureAvatar figure={figure} size="md" glow={isSpeaking} />
              {isSpeaking && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full flex items-center justify-center"
                >
                  <Volume2 className="w-2.5 h-2.5 text-primary-foreground" />
                </motion.div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-sm text-foreground leading-tight">{figure.name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5 h-4">
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

            {/* Voice toggle */}
            <button
              onClick={() => setVoiceEnabled((v) => !v)}
              title={voiceEnabled ? "Voice ON — click to mute" : "Voice OFF — click to enable"}
              className={`p-2 rounded-full border transition-all shrink-0 ${
                voiceEnabled
                  ? "bg-primary/15 border-primary/40 text-primary shadow-[0_0_10px_rgba(201,162,39,0.2)]"
                  : "bg-white/5 border-white/10 text-muted-foreground/40 hover:text-muted-foreground"
              }`}
              data-testid="button-voice-toggle"
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Talk Live */}
            <button
              onClick={() => setLiveModeActive(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium transition-all shrink-0"
              data-testid="button-talk-live"
            >
              <Phone className="w-3.5 h-3.5" />
              Talk Live
            </button>
          </div>

          {/* Messages */}
          <ScrollArea className="h-96 px-4 py-4" ref={scrollRef}>
            <div className="flex flex-col gap-4">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
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
                      <FigureAvatar figure={figure} size="sm" glow={speakingMsgId === msg.id} />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs text-primary font-bold shrink-0">
                        You
                      </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                      <div
                        className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-primary/20 text-foreground rounded-tr-sm border border-primary/20"
                            : "bg-white/5 text-foreground/90 rounded-tl-sm border border-white/5 font-serif"
                        }`}
                      >
                        {msg.content}
                      </div>

                      {/* Audio controls on figure messages */}
                      {msg.role === "figure" && voiceEnabled && (
                        <div className="flex items-center gap-1 ml-1">
                          {speakingMsgId === msg.id && isSpeaking ? (
                            <>
                              <SoundWave active bars={4} />
                              <button
                                onClick={pauseSpeaking}
                                className="p-1 rounded text-primary/60 hover:text-primary transition-colors"
                                title="Pause"
                              >
                                <Pause className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => { stopSpeaking(); setSpeakingMsgId(null); }}
                                className="p-1 rounded text-primary/60 hover:text-primary transition-colors"
                                title="Stop"
                              >
                                <Square className="w-3 h-3" />
                              </button>
                            </>
                          ) : speakingMsgId === msg.id && isPaused ? (
                            <>
                              <button
                                onClick={resumeSpeaking}
                                className="p-1 rounded text-primary/60 hover:text-primary transition-colors"
                                title="Resume"
                              >
                                <Play className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => { stopSpeaking(); setSpeakingMsgId(null); }}
                                className="p-1 rounded text-primary/60 hover:text-primary transition-colors"
                                title="Stop"
                              >
                                <Square className="w-3 h-3" />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handlePlayMessage(msg)}
                              className="p-1 rounded text-muted-foreground/30 hover:text-primary transition-colors"
                              title="Play"
                            >
                              <Play className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3 self-start"
                  >
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

          {/* Suggested questions */}
          <div className="px-4 pt-2 pb-1 flex gap-2 overflow-x-auto no-scrollbar">
            {figure.suggestedQuestions.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleSend(undefined, q)}
                disabled={isTyping}
                className="text-xs bg-white/5 hover:bg-primary/10 border border-white/8 hover:border-primary/30 px-3 py-1.5 rounded-full whitespace-nowrap text-muted-foreground hover:text-primary transition-colors disabled:opacity-40 shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input bar */}
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
                    : `Ask ${figure.name.split(" ")[0]} anything...`
                }
                className={`bg-background/60 border-white/10 focus-visible:ring-primary h-11 text-sm transition-all ${
                  isListening ? "border-red-500/30 text-primary/70 italic" : ""
                }`}
                disabled={isTyping}
                data-testid="input-figure-chat"
              />

              <Button
                type="submit"
                size="icon"
                className="h-11 w-11 bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
                disabled={(!inputValue.trim() && !interimTranscript) || isTyping}
                data-testid="button-figure-send"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>

            {/* Voice hint */}
            {!voiceEnabled && (
              <p className="text-[10px] text-muted-foreground/30 mt-2 text-center">
                Enable voice above to hear responses aloud · Press mic to speak your question
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export function TalkToHistory({ monument }: { monument: Monument }) {
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure | null>(null);

  return (
    <AnimatePresence mode="wait">
      {!selectedFigure ? (
        <motion.div
          key="selector"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <FigureSelector monument={monument} onSelect={setSelectedFigure} />
        </motion.div>
      ) : (
        <motion.div
          key="chat"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <FigureChat figure={selectedFigure} onBack={() => setSelectedFigure(null)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
