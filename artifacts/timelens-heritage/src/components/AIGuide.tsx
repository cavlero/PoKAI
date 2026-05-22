import { useState, useRef, useEffect } from "react";
import { Monument } from "@/data/monuments";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
}

export function AIGuide({ monument }: { monument: Monument }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      content: `Welcome to ${monument.name}. I am your temporal guide. Ask me anything about its history, construction, or significance.`
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userQuery = inputValue.trim();
    const newUserMsg: Message = { id: Date.now().toString(), role: "user", content: userQuery };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let botResponse = monument.chatResponses["default"];
      
      // Simple keyword matching for demo
      const lowerQuery = userQuery.toLowerCase();
      const predefinedKeys = Object.keys(monument.chatResponses).filter(k => k !== "default");
      
      for (const key of predefinedKeys) {
        // Strip punctuation and check if key matches
        const cleanKey = key.replace(/[^\w\s]/g, '').toLowerCase();
        const keywords = cleanKey.split(' ').filter(w => w.length > 3); // match significant words
        
        if (keywords.some(kw => lowerQuery.includes(kw)) || lowerQuery === cleanKey) {
          botResponse = monument.chatResponses[key];
          break;
        }
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: botResponse
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-card/60 backdrop-blur border-white/10 shadow-xl overflow-hidden flex flex-col">
      <div className="bg-card border-b border-white/5 p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
          <Bot className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-serif text-lg text-foreground">AI Historical Guide</h3>
          <p className="text-xs text-primary/80 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Online - Temporal Link Active
          </p>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4 h-[400px]" ref={scrollRef}>
        <div className="flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "self-end flex-row-reverse" : "self-start"}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "user" ? "bg-secondary text-secondary-foreground" : "bg-primary/20 text-primary border border-primary/30"
                }`}>
                  {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-3 rounded-2xl ${
                  msg.role === "user" 
                    ? "bg-secondary text-secondary-foreground rounded-tr-none" 
                    : "bg-white/5 text-foreground/90 rounded-tl-none border border-white/5"
                }`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3 max-w-[85%] self-start"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="p-4 rounded-2xl bg-white/5 rounded-tl-none border border-white/5 flex items-center gap-1">
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>

      <div className="p-4 bg-card/80 border-t border-white/5">
        <form onSubmit={handleSend} className="flex gap-2">
          <Input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about the monument..."
            className="bg-background border-white/10 focus-visible:ring-primary h-12"
            disabled={isTyping}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="h-12 w-12 bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
            disabled={!inputValue.trim() || isTyping}
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
          {Object.keys(monument.chatResponses).filter(k => k !== "default").map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => setInputValue(q)}
              className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full whitespace-nowrap text-muted-foreground transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}
