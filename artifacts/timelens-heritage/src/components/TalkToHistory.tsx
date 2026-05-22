import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ChevronLeft, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Monument } from "@/data/monuments";
import { HISTORICAL_FIGURES, HistoricalFigure, getRecommendedFigure } from "@/data/historicalFigures";

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
  const sizes = {
    sm: "w-9 h-9",
    md: "w-12 h-12",
    lg: "w-20 h-20",
  };
  const ringThickness = {
    sm: "p-[2px]",
    md: "p-[2.5px]",
    lg: "p-[3px]",
  };

  return (
    <div
      className={`${sizes[size]} ${ringThickness[size]} rounded-full shrink-0 transition-all duration-300 ${
        glow
          ? "shadow-[0_0_20px_rgba(201,162,39,0.7)] ring-2 ring-primary/60"
          : "shadow-[0_0_8px_rgba(201,162,39,0.3)] ring-1 ring-primary/30"
      }`}
      style={{
        background: "linear-gradient(135deg, #c9a227 0%, #f0d060 35%, #8b6914 65%, #c9a227 100%)",
      }}
    >
      <div className="w-full h-full rounded-full overflow-hidden">
        <img
          src={figure.portraitUrl}
          alt={figure.name}
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
      </div>
    </div>
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
        <h2 className="text-3xl md:text-4xl font-serif text-primary mb-3">
          Choose Your Historical Guide
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Select a historical figure to begin your conversation. You are not reading history — you are talking to it.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {HISTORICAL_FIGURES.map((figure, i) => {
          const isRecommended = figure.id === recommended.id;
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
                isRecommended
                  ? "border-primary/50 bg-primary/5 shadow-[0_0_30px_rgba(201,162,39,0.12)]"
                  : "border-white/8 bg-card/40 hover:border-primary/30 hover:bg-card/60"
              }`}
            >
              {isRecommended && (
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
                  <span
                    key={q}
                    className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-muted-foreground/60"
                  >
                    {q.length > 28 ? q.slice(0, 28) + "…" : q}
                  </span>
                ))}
              </div>

              <button
                className={`w-full py-2.5 rounded-xl text-sm font-serif transition-all ${
                  isRecommended
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_16px_rgba(201,162,39,0.3)]"
                    : "bg-white/5 text-muted-foreground group-hover:bg-primary/15 group-hover:text-primary border border-white/10 group-hover:border-primary/30"
                }`}
              >
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
    {
      id: "intro",
      role: "figure",
      content: figure.intro,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getResponse = (query: string): string => {
    const lower = query.toLowerCase();
    const keys = Object.keys(figure.responses).filter((k) => k !== "default");
    for (const key of keys) {
      const cleanKey = key.replace(/[^\w\s]/g, "").toLowerCase();
      const words = cleanKey.split(" ").filter((w) => w.length > 3);
      if (words.some((w) => lower.includes(w)) || lower.includes(cleanKey)) {
        return figure.responses[key];
      }
    }
    return figure.responses["default"];
  };

  const handleSend = (e?: React.FormEvent, override?: string) => {
    if (e) e.preventDefault();
    const query = (override ?? inputValue).trim();
    if (!query || isTyping) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: query },
    ]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "figure",
          content: getResponse(query),
        },
      ]);
      setIsTyping(false);
    }, 1600);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 px-5 py-4 border-b border-white/5 bg-card/80">
          <button
            onClick={onBack}
            className="text-muted-foreground hover:text-primary transition-colors mr-1"
            data-testid="button-back-to-figures"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <FigureAvatar figure={figure} size="md" />
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-base text-foreground">{figure.name}</h3>
            <p className="text-xs text-primary/70 flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
              {figure.title}
            </p>
          </div>
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
                      : "self-start max-w-[88%]"
                  }`}
                >
                  {msg.role === "figure" ? (
                    <FigureAvatar figure={figure} size="sm" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs text-primary font-bold shrink-0">
                      You
                    </div>
                  )}
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary/20 text-foreground rounded-tr-sm border border-primary/20"
                        : "bg-white/5 text-foreground/90 rounded-tl-sm border border-white/5 font-serif"
                    }`}
                  >
                    {msg.content}
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
        <div className="px-4 pt-2 pb-1 flex gap-2 overflow-x-auto">
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

        {/* Input */}
        <div className="p-4 border-t border-white/5">
          <form onSubmit={handleSend} className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Ask ${figure.name.split(" ")[0]} anything...`}
              className="bg-background/60 border-white/10 focus-visible:ring-primary h-11 text-sm"
              disabled={isTyping}
              data-testid="input-figure-chat"
            />
            <Button
              type="submit"
              size="icon"
              className="h-11 w-11 bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
              disabled={!inputValue.trim() || isTyping}
              data-testid="button-figure-send"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
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
