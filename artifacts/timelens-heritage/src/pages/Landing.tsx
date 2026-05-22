import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, History, Sparkles, ScanEye } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        {/* Abstract animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] mix-blend-screen" />
          <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-secondary/10 blur-[100px] mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-sm mb-6 uppercase tracking-widest font-semibold">
              <Sparkles className="w-4 h-4" /> 
              Simulated Historical AI
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ffdf73] to-primary mb-6 drop-shadow-sm leading-tight">
              TimeLens Heritage
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              See the Past. Talk to History. Step into an interactive digital museum where ancient monuments come back to life.
            </p>
            
            <Link href="/explore">
              <Button size="lg" className="h-16 px-10 text-lg rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_40px_rgba(201,162,39,0.3)] transition-all hover:shadow-[0_0_60px_rgba(201,162,39,0.5)] font-serif hover:scale-105">
                Start Exploring
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative bg-card/30 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">A Portal into the Past</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-background/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                <ScanEye className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-serif text-foreground mb-3">Instant Recognition</h3>
              <p className="text-muted-foreground leading-relaxed">
                Upload a photo of a historical landmark and our AI instantly identifies it, pulling rich historical context from our vast archives.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-background/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                <History className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-serif text-foreground mb-3">Temporal Reconstruction</h3>
              <p className="text-muted-foreground leading-relaxed">
                Use the Time Machine slider to compare the monument's current ruinous state with a vivid reconstruction of its historical glory.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-background/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-serif text-foreground mb-3">AI Historical Guide</h3>
              <p className="text-muted-foreground leading-relaxed">
                Chat directly with our temporal guide to ask questions about the monument's construction, purpose, and untold secrets.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center text-muted-foreground bg-background">
        <p className="font-serif">TimeLens Heritage &copy; {new Date().getFullYear()} — Built for the Future, Inspired by the Past.</p>
      </footer>
    </div>
  );
}
