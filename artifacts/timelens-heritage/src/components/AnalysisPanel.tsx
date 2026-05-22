import { Monument } from "@/data/monuments";
import { Card, CardContent } from "@/components/ui/card";
import { Info, MapPin, Sparkles, Clock } from "lucide-react";
import { motion } from "framer-motion";

export function AnalysisPanel({ monument }: { monument: Monument }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="md:col-span-2"
      >
        <div className="flex items-center gap-3 mb-2">
          <MapPin className="w-6 h-6 text-primary" />
          <h2 className="text-4xl font-serif font-bold text-foreground">{monument.name}</h2>
        </div>
        <div className="h-1 w-24 bg-primary rounded-full mt-4 mb-6"></div>
      </motion.div>

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
            <p className="text-muted-foreground leading-relaxed">
              {monument.description}
            </p>
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
              <h3 className="text-xl font-serif text-primary">Global Importance</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {monument.importance}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="md:col-span-2"
      >
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center">
            <div className="bg-primary/20 p-4 rounded-full shrink-0">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-serif text-primary mb-2">Fascinating Fact</h3>
              <p className="text-foreground/90 leading-relaxed italic">
                "{monument.funFact}"
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
