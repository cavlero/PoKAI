import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Paperclip, X, Sparkles, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLang } from "@/lib/i18n";

interface Attachment {
  id: string;
  url: string;
  name: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  images?: Attachment[];
}

const PROMPT_KEYS = ["chat_prompt1", "chat_prompt2", "chat_prompt3"];

function AssistantAvatar() {
  return (
    <div
      className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center shadow-[0_0_12px_rgba(201,162,39,0.4)]"
      style={{ background: "linear-gradient(135deg,#c9a227 0%,#f0d060 40%,#8b6914 100%)" }}
    >
      <Sparkles className="w-4 h-4 text-background" />
    </div>
  );
}

export function PokaiChat() {
  const { t } = useLang();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [pending, setPending] = useState<Attachment[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const hasConversation = messages.length > 0;

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const addFiles = useCallback((files: FileList | File[]) => {
    const images = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!images.length) return;
    setPending((prev) => [
      ...prev,
      ...images.map((f) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        url: URL.createObjectURL(f),
        name: f.name,
      })),
    ]);
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  const removePending = (id: string) =>
    setPending((prev) => prev.filter((a) => a.id !== id));

  const send = useCallback(
    (override?: string) => {
      const text = (override ?? inputValue).trim();
      if (!text && pending.length === 0) return;
      if (isTyping) return;

      const images = pending;
      const hasImage = images.length > 0;

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-u`,
          role: "user",
          content: text,
          images: hasImage ? images : undefined,
        },
      ]);
      setInputValue("");
      setPending([]);
      setIsTyping(true);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-a`,
            role: "assistant",
            content: hasImage ? t("chat_reply_image") : t("chat_reply_text"),
          },
        ]);
        setIsTyping(false);
      }, 1400);
    },
    [inputValue, pending, isTyping, t]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div
      className="w-full max-w-2xl mx-auto"
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div
        className={`relative rounded-3xl border bg-card/50 backdrop-blur-md transition-all duration-300 ${
          dragActive
            ? "border-primary shadow-[0_0_50px_rgba(201,162,39,0.35)]"
            : "border-white/10 shadow-[0_0_40px_rgba(201,162,39,0.12)]"
        }`}
      >
        {/* Drag overlay */}
        <AnimatePresence>
          {dragActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-3xl bg-background/85 backdrop-blur-sm pointer-events-none"
            >
              <ImagePlus className="w-10 h-10 text-primary mb-2" />
              <p className="text-primary font-serif text-lg">{t("chat_drop")}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conversation */}
        <AnimatePresence initial={false}>
          {hasConversation && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <ScrollArea className="max-h-[42vh] px-4 sm:px-5 pt-5" ref={scrollRef}>
                <div className="flex flex-col gap-4 pb-2">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex gap-3 ${
                        msg.role === "user"
                          ? "self-end flex-row-reverse max-w-[85%]"
                          : "self-start max-w-[90%]"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <AssistantAvatar />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs text-primary font-bold shrink-0">
                          You
                        </div>
                      )}

                      <div
                        className={`flex flex-col gap-2 ${
                          msg.role === "user" ? "items-end" : "items-start"
                        }`}
                      >
                        {msg.images && msg.images.length > 0 && (
                          <div className="flex flex-wrap gap-2 justify-end">
                            {msg.images.map((img) => (
                              <img
                                key={img.id}
                                src={img.url}
                                alt={img.name}
                                className="w-32 h-32 object-cover rounded-xl border border-white/10"
                              />
                            ))}
                          </div>
                        )}
                        {msg.content && (
                          <div
                            className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                              msg.role === "user"
                                ? "bg-primary/20 text-foreground rounded-tr-sm border border-primary/20"
                                : "bg-white/5 text-foreground/90 rounded-tl-sm border border-white/5 font-serif"
                            }`}
                          >
                            {msg.content}
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
                      <AssistantAvatar />
                      <div className="px-4 py-3 rounded-2xl bg-white/5 rounded-tl-sm border border-white/5 flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pending attachments */}
        {pending.length > 0 && (
          <div className="flex flex-wrap gap-2 px-4 pt-4">
            {pending.map((a) => (
              <div key={a.id} className="relative group">
                <img
                  src={a.url}
                  alt={a.name}
                  className="w-16 h-16 object-cover rounded-xl border border-white/15"
                />
                <button
                  type="button"
                  onClick={() => removePending(a.id)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-background border border-white/20 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Remove image"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex items-center gap-2 p-3"
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) addFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            title="Attach a photo"
            className="h-11 w-11 shrink-0 rounded-2xl flex items-center justify-center text-muted-foreground/60 hover:text-primary hover:bg-white/5 transition-colors"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("chat_placeholder")}
            className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none px-1"
          />

          <Button
            type="submit"
            size="icon"
            disabled={(!inputValue.trim() && pending.length === 0) || isTyping}
            className="h-11 w-11 shrink-0 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(201,162,39,0.3)]"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>

      {/* Example prompts (only before the conversation starts) */}
      {!hasConversation && (
        <div className="flex flex-wrap gap-2 justify-center mt-5">
          {PROMPT_KEYS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => send(t(k))}
              className="text-sm bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary/30 px-4 py-2 rounded-full text-muted-foreground hover:text-primary transition-colors"
            >
              {t(k)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
