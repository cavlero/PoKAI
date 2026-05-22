import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, History, Sparkles, ScanEye, BookOpen, Map, Presentation } from "lucide-react";
import { motion } from "framer-motion";

const BULGARIAN_SITES = [
  { name: "Tsarevets Fortress", city: "Veliko Tarnovo" },
  { name: "Rila Monastery", city: "Rila Mountains" },
  { name: "Ancient Nessebar", city: "Black Sea Coast" },
  { name: "Madara Rider", city: "Madara" },
  { name: "Buzludzha Monument", city: "Stara Planina" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center">
        {/* Abstract animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] mix-blend-screen" />
          <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-primary/8 blur-[100px] mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
        </div>

        {/* Nav */}
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
                Start Exploring
              </Button>
            </Link>
          </div>
        </nav>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-xs mb-6 uppercase tracking-widest font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Bulgarian Cultural Heritage · AI-Powered
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ffdf73] to-primary mb-6 drop-shadow-sm leading-tight">
              TimeLens Heritage
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              See the Past. Talk to History. Step into an interactive digital museum where Bulgaria's greatest monuments come back to life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="/explore">
                <Button
                  size="lg"
                  className="h-14 px-10 text-lg rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_40px_rgba(201,162,39,0.3)] transition-all hover:shadow-[0_0_60px_rgba(201,162,39,0.5)] font-serif hover:scale-105"
                  data-testid="button-start-exploring"
                >
                  Start Exploring
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/gallery">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-lg rounded-full border-white/20 hover:bg-white/5 font-serif"
                >
                  <BookOpen className="mr-2 w-5 h-5" />
                  View Gallery
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
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

      {/* Featured Sites */}
      <section className="py-20 relative border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="text-xs uppercase tracking-widest text-primary/70 mb-3">Featured Monuments</div>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-3">Bulgaria's Living History</h2>
            <div className="w-16 h-0.5 bg-primary mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {BULGARIAN_SITES.map((site, i) => (
              <motion.div
                key={site.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="bg-card/40 border border-white/5 rounded-xl p-5 backdrop-blur hover:border-primary/20 hover:bg-card/60 transition-all cursor-default"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <span className="text-primary font-serif font-bold text-sm">{i + 1}</span>
                </div>
                <h3 className="font-serif text-sm text-foreground mb-1 leading-snug">{site.name}</h3>
                <p className="text-xs text-muted-foreground">{site.city}, Bulgaria</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative bg-card/20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">A Portal into the Past</h2>
            <div className="w-16 h-0.5 bg-primary mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <ScanEye className="w-7 h-7 text-primary" />,
                title: "Instant Recognition",
                desc: "Upload a photo of any Bulgarian landmark and our AI instantly identifies it, pulling rich historical context from our archives.",
              },
              {
                icon: <History className="w-7 h-7 text-primary" />,
                title: "Time Machine Slider",
                desc: "Drag the slider to compare the monument's present state with a vivid historical reconstruction of its ancient glory.",
              },
              {
                icon: <Sparkles className="w-7 h-7 text-primary" />,
                title: "AI Historical Guide",
                desc: "Chat with our temporal guide to ask questions about construction, purpose, and the untold secrets of each monument.",
              },
              {
                icon: <Map className="w-7 h-7 text-primary" />,
                title: "Interactive Map",
                desc: "Discover the exact location of every monument on an interactive map and navigate directly to it.",
              },
              {
                icon: <BookOpen className="w-7 h-7 text-primary" />,
                title: "Gallery of Discoveries",
                desc: "Every analyzed monument is saved to your personal gallery. Revisit your historical journey at any time.",
              },
              {
                icon: <Presentation className="w-7 h-7 text-primary" />,
                title: "Presentation Mode",
                desc: "Activate a full-screen cinematic presentation of historical facts — perfect for sharing and demonstrating.",
              },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -8 }}
                className="bg-background/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm hover:border-primary/20 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5 border border-primary/20">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-serif text-foreground mb-3">{feat.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative border-t border-white/5">
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
          <p className="text-muted-foreground mb-8 text-lg">
            Upload a photo of a Bulgarian monument and let TimeLens Heritage bring the past to life before your eyes.
          </p>
          <Link href="/explore">
            <Button
              size="lg"
              className="h-14 px-12 text-lg rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_40px_rgba(201,162,39,0.25)] font-serif hover:scale-105 transition-all"
            >
              Begin Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
