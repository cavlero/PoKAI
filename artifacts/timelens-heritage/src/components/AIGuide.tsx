import { useState, useRef, useEffect } from "react";
import { Monument } from "@/data/monuments";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/i18n";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
}

export function AIGuide({ monument }: { monument: Monument }) {
  const { t } = useLang();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      content: t("ai_guide_welcome"),
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
    const lowerQuery = query.toLowerCase();
    const keys = Object.keys(monument.chatResponses).filter((k) => k !== "default");
    for (const key of keys) {
      const cleanKey = key.replace(/[^\w\s]/g, "").toLowerCase();
      const keywords = cleanKey.split(" ").filter((w) => w.length > 3);
      if (keywords.some((kw) => lowerQuery.includes(kw)) || lowerQuery === cleanKey) {
        return monument.chatResponses[key];
      }
    }
    return monument.chatResponses["default"];
  };

  const handleSend = (e?: React.FormEvent, overrideQuery?: string) => {
    if (e) e.preventDefault();
    const query = (overrideQuery ?? inputValue).trim();
    if (!query || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "bot", content: getResponse(query) },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const quickQuestions = [t("ai_guide_q1"), t("ai_guide_q2"), t("ai_guide_q3"), t("ai_guide_q4")];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-card border-b border-white/5 px-5 py-4 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-primary/15 flex items-center justify-center border border-primary/30 shrink-0">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-serif text-lg text-foreground">{t("ai_guide_title")}</h3>
            <p className="text-xs text-primary/80 flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {t("ai_guide_status")}
            </p>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="h-[380px] px-4 py-4" ref={scrollRef}>
          <div className="flex flex-col gap-4">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-3 ${msg.role === "user" ? "self-end flex-row-reverse max-w-[80%]" : "self-start max-w-[85%]"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "user"
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "bg-white/5 text-muted-foreground border border-white/10"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary/20 text-foreground rounded-tr-sm border border-primary/20"
                        : "bg-white/5 text-foreground/90 rounded-tl-sm border border-white/5"
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
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <Bot className="w-4 h-4 text-muted-foreground" />
                  </div>
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

        {/* Quick Questions */}
        <div className="px-4 pt-3 pb-1 flex gap-2 overflow-x-auto">
          {quickQuestions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => handleSend(undefined, q)}
              disabled={isTyping}
              className="text-xs bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary/30 px-3 py-1.5 rounded-full whitespace-nowrap text-muted-foreground hover:text-primary transition-colors disabled:opacity-40 shrink-0"
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
              placeholder={t("ai_guide_placeholder")}
              className="bg-background/60 border-white/10 focus-visible:ring-primary h-11 text-sm"
              disabled={isTyping}
              data-testid="input-guide-question"
            />
            <Button
              type="submit"
              size="icon"
              className="h-11 w-11 bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
              disabled={!inputValue.trim() || isTyping}
              data-testid="button-guide-send"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
