import { Monument } from "@/data/monuments";
import { Card, CardContent } from "@/components/ui/card";
import { Info, MapPin, Sparkles, Clock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface AnalysisPanelProps {
  monument: Monument;
  confidence: number;
  isPossibleMatch?: boolean;
}

export function AnalysisPanel({ monument, confidence, isPossibleMatch }: AnalysisPanelProps) {
  const confidenceColor =
    confidence >= 90 ? "text-green-400" : confidence >= 80 ? "text-yellow-400" : "text-orange-400";
  const confidenceBg =
    confidence >= 90 ? "bg-green-400/10 border-green-400/30" : confidence >= 80 ? "bg-yellow-400/10 border-yellow-400/30" : "bg-orange-400/10 border-orange-400/30";

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Monument header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card/50 backdrop-blur rounded-2xl border border-white/10 p-6 md:p-8"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            {isPossibleMatch && (
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                Possible heritage match
              </div>
            )}
            <div className="flex items-center gap-3 mb-1">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                {monument.name}
              </h2>
            </div>
            <div className="flex items-center gap-2 ml-8 text-sm text-muted-foreground">
              <span>{monument.city}, {monument.country}</span>
              <span className="text-white/20">·</span>
              <span>{monument.period}</span>
            </div>
          </div>

          {/* Confidence badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, type: "spring" }}
            className={`flex items-center gap-3 px-5 py-3 rounded-xl border ${confidenceBg} shrink-0`}
            data-testid="badge-confidence"
          >
            <ShieldCheck className={`w-5 h-5 ${confidenceColor}`} />
            <div>
              <p className="text-xs text-muted-foreground/70 uppercase tracking-wider leading-none mb-0.5">
                AI Confidence
              </p>
              <p className={`text-2xl font-bold font-mono ${confidenceColor} leading-none`}>
                {confidence}%
              </p>
            </div>
          </motion.div>
        </div>

        <div className="h-px bg-white/5 my-5" />

        {/* Confidence bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground/50">
            <span>Recognition confidence</span>
            <span>{confidence}%</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${confidence}%` }}
              transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full ${
                confidence >= 90 ? "bg-green-400" : confidence >= 80 ? "bg-yellow-400" : "bg-orange-400"
              }`}
            />
          </div>
        </div>
      </motion.div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full bg-card/50 backdrop-blur-md border-white/10 hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-serif text-primary">Historical Context</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{monument.description}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full bg-card/50 backdrop-blur-md border-white/10 hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-serif text-primary">Historical Importance</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{monument.importance}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 flex flex-col md:flex-row gap-5 items-start md:items-center">
            <div className="bg-primary/20 p-4 rounded-full shrink-0">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-serif text-primary mb-2">Fascinating Fact</h3>
              <p className="text-foreground/90 leading-relaxed italic">"{monument.funFact}"</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
