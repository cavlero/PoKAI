import { motion } from "framer-motion";
import { ScanFace } from "lucide-react";

export function ScanningOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        {/* Outer glowing rings */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border border-primary/30"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          className="absolute inset-[-20%] rounded-full border border-primary/20"
        />
        
        {/* Core scanner */}
        <div className="relative z-10 bg-card/80 p-8 rounded-full border border-primary shadow-[0_0_50px_rgba(201,162,39,0.3)]">
          <ScanFace className="w-20 h-20 text-primary" />
        </div>

        {/* Scanning beam */}
        <motion.div
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute w-full h-1 bg-primary/80 shadow-[0_0_20px_#c9a227] z-20"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 text-center"
      >
        <h3 className="text-2xl font-serif text-primary mb-2">Analyzing Temporal Signature</h3>
        <p className="text-muted-foreground animate-pulse">Matching architectural patterns...</p>
      </motion.div>
    </motion.div>
  );
}
