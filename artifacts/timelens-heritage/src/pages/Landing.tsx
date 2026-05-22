import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, History, Sparkles, ScanEye, BookOpen, Map, MessageSquare, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BULGARIAN_SITES = [
  {
    id: "tsarevets",
    name: "Tsarevets Fortress",
    city: "Veliko Tarnovo",
    period: "12th–14th Century",
    teaser: "Capital of the Second Bulgarian Empire",
    guide: "Tsar Ivan Asen II",
  },
  {
    id: "rila",
    name: "Rila Monastery",
    city: "Rila Mountains",
    period: "10th Century",
    teaser: "UNESCO World Heritage · Bulgaria's spiritual heart",
    guide: "Saint Ivan of Rila",
  },
  {
    id: "nessebar",
    name: "Ancient Nessebar",
    city: "Black Sea Coast",
    period: "3,200+ Years",
    teaser: "One of the oldest cities in Europe",
    guide: "Eudokimos the Chronicler",
  },
  {
    id: "madara",
    name: "Madara Rider",
    city: "Madara",
    period: "8th Century",
    teaser: "The only medieval rock relief in Europe",
    guide: "Khan Asparuh",
  },
  {
    id: "buzludzha",
    name: "Buzludzha Monument",
    city: "Stara Planina",
    period: "Built 1981",
    teaser: "Iconic brutalist monument above the clouds",
    guide: "Paisii Hilendarski",
  },
];

const FEATURES = [
  {
    icon: <ScanEye className="w-7 h-7 text-primary" />,
    title: "AI Monument Recognition",
    desc: "Upload any photo and our AI identifies the monument, pulling rich historical context instantly.",
    example: "e.g. 'Tsarevets Fortress — 94% confidence'",
  },
  {
    icon: <History className="w-7 h-7 text-primary" />,
    title: "Time Machine Slider",
    desc: "Drag the comparison slider to reveal a historical reconstruction of the monument at its peak.",
    example: "Drag to reveal ancient glory",
  },
  {
    icon: <MessageSquare className="w-7 h-7 text-primary" />,
    title: "Talk to History",
    desc: "Choose a historical figure and hold a real conversation — with a Tsar, a Saint, or a Khan.",
    example: "e.g. Talking with Tsar Ivan Asen II...",
  },
  {
    icon: <Map className="w-7 h-7 text-primary" />,
    title: "Interactive Map",
    desc: "Pinpoint the exact location of every monument and open it directly in your map application.",
    example: "Opens exact GPS coordinates",
  },
  {
    icon: <BookOpen className="w-7 h-7 text-primary" />,
    title: "Gallery of Discoveries",
    desc: "Every monument you analyze is saved automatically to your personal historical gallery.",
    example: "Your own digital museum archive",
  },
];

function FeatureCard({ feat, i }: { feat: typeof FEATURES[0]; i: number }) {
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
      className={`relative bg-background/50 border rounded-2xl p-8 backdrop-blur-sm transition-shadow cursor-default overflow-hidden ${
        hovered
          ? "border-primary/40 shadow-[0_0_40px_rgba(201,162,39,0.15)]"
          : "border-white/5"
      }`}
    >
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5 border border-primary/20">
        {feat.icon}
      </div>
      <h3 className="text-xl font-serif text-foreground mb-3">{feat.title}</h3>
      <p className="text-muted-foreground leading-relaxed text-sm mb-4">{feat.desc}</p>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 text-xs text-primary/70 bg-primary/8 border border-primary/20 rounded-lg px-3 py-2"
          >
            <Sparkles className="w-3 h-3 shrink-0" />
            <span>{feat.example}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SiteCard({ site, i }: { site: typeof BULGARIAN_SITES[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  const [, navigate] = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={hovered ? { y: -8, scale: 1.02 } : { y: 0, scale: 1 }}
      onClick={() => navigate(`/explore?demo=${site.id}`)}
      className={`relative flex flex-col p-5 rounded-xl border cursor-pointer transition-shadow group ${
        hovered
          ? "border-primary/40 bg-card/70 shadow-[0_0_30px_rgba(201,162,39,0.12)]"
          : "border-white/8 bg-card/40"
      }`}
      data-testid={`card-site-${site.id}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <span className="text-primary font-serif font-bold text-sm">{i + 1}</span>
        </div>
        <AnimatePresence>
          {hovered && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[10px] bg-primary/15 border border-primary/30 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider"
            >
              {site.period}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <h3 className="font-serif text-sm text-foreground mb-1 leading-snug">{site.name}</h3>
      <p className="text-xs text-muted-foreground mb-2">{site.city}, Bulgaria</p>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="text-xs text-muted-foreground/70 mb-3 leading-relaxed">{site.teaser}</p>
            <p className="text-[10px] text-primary/60 mb-3">
              Guide: {site.guide}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-auto">
        <AnimatePresence>
          {hovered ? (
            <motion.button
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors shadow-[0_0_12px_rgba(201,162,39,0.3)]"
              data-testid={`button-demo-${site.id}`}
            >
              <Play className="w-3 h-3 fill-current" />
              Try Demo
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full py-1.5 rounded-lg border border-white/5 text-center text-xs text-muted-foreground/40"
            >
              Click to explore
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center">
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
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ffdf73] to-primary mb-6 leading-tight">
              TimeLens Heritage
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              See the Past. Talk to History. Step into an interactive digital museum where Bulgaria's greatest monuments come back to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="/explore">
                <Button
                  size="lg"
                  className="h-14 px-10 text-lg rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_40px_rgba(201,162,39,0.3)] hover:shadow-[0_0_60px_rgba(201,162,39,0.5)] font-serif hover:scale-105 transition-all"
                  data-testid="button-start-exploring"
                >
                  Start Exploring
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/gallery">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white/20 hover:bg-white/5 font-serif">
                  <BookOpen className="mr-2 w-5 h-5" />
                  View Gallery
                </Button>
              </Link>
            </div>
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

      {/* Featured Bulgarian Sites */}
      <section className="py-20 relative border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="text-xs uppercase tracking-widest text-primary/70 mb-3">Clickable Demos</div>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-3">Bulgaria's Living History</h2>
            <p className="text-muted-foreground text-sm">Click any monument card to launch an instant demo</p>
            <div className="w-16 h-0.5 bg-primary mx-auto rounded-full mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {BULGARIAN_SITES.map((site, i) => (
              <SiteCard key={site.id} site={site} i={i} />
            ))}
          </div>
        </div>
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
            <p className="text-muted-foreground text-sm mb-4">Hover over each feature to see it in action</p>
            <div className="w-16 h-0.5 bg-primary mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat, i) => (
              <FeatureCard key={feat.title} feat={feat} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
            Upload a photo of a Bulgarian monument — or click any site above to launch an instant demo.
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
