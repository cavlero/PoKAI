import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, History, ScanEye, BookOpen,
  Map, MessageSquare, UploadCloud,
} from "lucide-react";
import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: <ScanEye className="w-7 h-7 text-primary" />,
    title: "AI Heritage Recognition",
    desc: "Upload any photo of a monument, ruin, or heritage object. The AI identifies it and pulls rich historical context instantly.",
  },
  {
    icon: <History className="w-7 h-7 text-primary" />,
    title: "Time Machine Slider",
    desc: "Drag the slider to reveal a historical reconstruction of the site at its peak — side by side with what it looks like today.",
  },
  {
    icon: <MessageSquare className="w-7 h-7 text-primary" />,
    title: "Talk to History",
    desc: "Choose a historical figure and hold a real conversation. Hear their voice, ask questions, and experience history firsthand.",
  },
  {
    icon: <Map className="w-7 h-7 text-primary" />,
    title: "Interactive Map",
    desc: "Pinpoint the exact location of every identified monument. Open it directly in your map application with one tap.",
  },
  {
    icon: <BookOpen className="w-7 h-7 text-primary" />,
    title: "Gallery of Discoveries",
    desc: "Every heritage object you analyze is saved automatically to your personal historical gallery — your own digital museum.",
  },
];

function FeatureCard({ feat, i }: { feat: (typeof FEATURES)[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={hovered ? { y: -10, scale: 1.02 } : { y: 0, scale: 1 }}
      className={`relative bg-background/50 border rounded-2xl p-8 backdrop-blur-sm transition-shadow cursor-default ${
        hovered ? "border-primary/40 shadow-[0_0_40px_rgba(201,162,39,0.15)]" : "border-white/5"
      }`}
    >
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5 border border-primary/20">
        {feat.icon}
      </div>
      <h3 className="text-xl font-serif text-foreground mb-3">{feat.title}</h3>
      <p className="text-muted-foreground leading-relaxed text-sm">{feat.desc}</p>
    </motion.div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] mix-blend-screen" />
          <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-primary/8 blur-[100px] mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
        </div>

        <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 sm:px-12 py-5 z-10">
          <span className="font-serif text-primary text-lg font-bold tracking-widest">TimeLens</span>
          <div className="flex items-center gap-2">
            <Link href="/gallery">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary text-sm">
                <BookOpen className="w-4 h-4 mr-1.5" />
                Gallery
              </Button>
            </Link>
            <Link href="/explore">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 font-serif text-sm">
                Upload Photo
              </Button>
            </Link>
          </div>
        </nav>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ffdf73] to-primary mb-6 leading-tight">
              TimeLens Heritage
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground mb-4 font-serif">
              See the Past. Talk to History.
            </p>
            <p className="text-base text-muted-foreground/60 max-w-lg mx-auto mb-12 leading-relaxed">
              Upload a photo of any monument, ruin, or heritage object — and step into its history.
            </p>
            <Link href="/explore">
              <Button
                size="lg"
                className="h-16 px-12 text-xl rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_50px_rgba(201,162,39,0.35)] hover:shadow-[0_0_70px_rgba(201,162,39,0.55)] font-serif hover:scale-105 transition-all"
                data-testid="button-start-exploring"
              >
                <UploadCloud className="mr-3 w-6 h-6" />
                Upload a Heritage Photo
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground/40 uppercase tracking-widest">Scroll to discover</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-primary/40 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-24 relative bg-card/20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">A Portal into the Past</h2>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              Every photo tells a story waiting to be uncovered. Here is what happens after you upload one.
            </p>
            <div className="w-16 h-0.5 bg-primary mx-auto rounded-full mt-6" />
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat, i) => (
              <FeatureCard key={feat.title} feat={feat} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 relative border-t border-white/5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[200%] rounded-full bg-primary/5 blur-[150px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto px-6 text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Ready to Step into History?
          </h2>
          <p className="text-muted-foreground mb-10 text-lg">
            Upload a photo of a monument or heritage site and let the AI reconstruct its story.
          </p>
          <Link href="/explore">
            <Button
              size="lg"
              className="h-14 px-12 text-lg rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_40px_rgba(201,162,39,0.25)] font-serif hover:scale-105 transition-all"
            >
              <UploadCloud className="mr-2 w-5 h-5" />
              Upload a Heritage Photo
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
