import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, History, ScanEye, BookOpen,
  Map, MessageSquare, Sparkles, Landmark, Languages, Check,
} from "lucide-react";
import { HistoricalMediaCard } from "@/components/HistoricalMediaCard";
import { PokaiChat } from "@/components/PokaiChat";
import { useLang, LANGUAGES } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { motion } from "framer-motion";

const FEATURES = [
  { icon: <ScanEye className="w-6 h-6 text-primary" />,       titleKey: "f1_title", descKey: "f1_desc", href: "/explore" },
  { icon: <BookOpen className="w-6 h-6 text-primary" />,      titleKey: "f5_title", descKey: "f5_desc", href: "/gallery" },
];

const STAT_KEYS = [
  { icon: <Landmark className="w-3.5 h-3.5 text-primary/70" />, key: "stat_sites" },
  { icon: <History className="w-3.5 h-3.5 text-primary/70" />,  key: "stat_recon" },
  { icon: <MessageSquare className="w-3.5 h-3.5 text-primary/70" />, key: "stat_talk" },
];

function FeatureCard({ feat, i }: { feat: (typeof FEATURES)[0]; i: number }) {
  const { t } = useLang();
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07 }}
      className={`group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.04] to-transparent p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_10px_50px_rgba(201,162,39,0.15)] ${
        feat.href ? "cursor-pointer" : "cursor-default"
      }`}
    >
      <div className="pointer-events-none absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute top-6 right-6 font-serif text-sm tabular-nums text-white/15 transition-colors group-hover:text-primary/40">
        {String(i + 1).padStart(2, "0")}
      </span>

      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/15 group-hover:shadow-[0_0_20px_rgba(201,162,39,0.25)]">
        {feat.icon}
      </div>
      <h3 className="mb-2 text-lg font-serif text-foreground">{t(feat.titleKey)}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground/80">{t(feat.descKey)}</p>
      {feat.href && (
        <div className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground/40 transition-colors group-hover:text-primary">
          <span>{t("feature_explore")}</span>
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </div>
      )}
    </motion.div>
  );
  return feat.href ? <Link href={feat.href}>{card}</Link> : card;
}

function LanguageCard({ i }: { i: number }) {
  const { lang, setLang, t } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07 }}
      className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.04] to-transparent p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_10px_50px_rgba(201,162,39,0.15)]"
    >
      <div className="pointer-events-none absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute top-6 right-6 font-serif text-sm tabular-nums text-white/15 transition-colors group-hover:text-primary/40">
        {String(i + 1).padStart(2, "0")}
      </span>

      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/15 group-hover:shadow-[0_0_20px_rgba(201,162,39,0.25)]">
        <Languages className="h-6 w-6 text-primary" />
      </div>
      <h3 className="mb-2 text-lg font-serif text-foreground">{t("lang_title")}</h3>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground/80">{t("lang_desc")}</p>

      <div className="flex flex-col gap-2">
        {LANGUAGES.map((l) => {
          const active = l.code === lang;
          return (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 text-sm transition-all ${
                active
                  ? "border-primary/50 bg-primary/15 text-primary shadow-[0_0_16px_rgba(201,162,39,0.18)]"
                  : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              <span className={`flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold ${active ? "bg-primary/25 text-primary" : "bg-white/10 text-muted-foreground"}`}>
                {l.code.toUpperCase()}
              </span>
              <span className="truncate">{l.name}</span>
              {active && <Check className="ml-auto h-4 w-4 shrink-0" />}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary/60">
      {children}
    </p>
  );
}

export default function Landing() {
  const { t } = useLang();
  const { theme, toggle } = useTheme();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* ── Floating glass navbar ─────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-4 inset-x-0 z-50 mx-auto flex w-[min(92%,64rem)] items-center justify-between rounded-full border border-white/10 bg-background/55 px-4 py-2.5 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-5"
      >
        <button onClick={scrollTop} className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
          <span className="font-serif text-lg font-bold tracking-widest text-primary">PokAI</span>
        </button>
        <div className="flex items-center gap-1.5">
          <Link href="/gallery">
            <Button variant="ghost" size="sm" className="rounded-full text-sm text-muted-foreground hover:text-primary">
              <BookOpen className="mr-1.5 h-4 w-4" />
              {t("nav_gallery")}
            </Button>
          </Link>
          {/* Theme switch */}
          <button
            onClick={toggle}
            role="switch"
            aria-checked={theme === "dark"}
            aria-label={theme === "dark" ? t("theme_light") : t("theme_dark")}
            title={theme === "dark" ? t("theme_light") : t("theme_dark")}
            className="relative flex h-8 w-14 shrink-0 items-center rounded-full border border-white/15 bg-white/5 transition-colors hover:border-primary/40"
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] shadow-[0_0_10px_rgba(201,162,39,0.5)] transition-transform duration-300 ${
                theme === "dark" ? "translate-x-[30px]" : "translate-x-[2px]"
              }`}
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </span>
          </button>
        </div>
      </motion.nav>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* fading tech grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse 65% 55% at 50% 38%, #000 50%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 50% 38%, #000 50%, transparent 100%)",
            }}
          />
          <div className="absolute -top-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-primary/10 blur-[120px] mix-blend-screen" />
          <div className="absolute top-[60%] -right-[10%] h-[60%] w-[40%] rounded-full bg-primary/8 blur-[100px] mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {/* status badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs text-primary backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {t("hero_badge")}
              <span className="h-1 w-1 rounded-full bg-primary/40" />
              <span className="text-primary/70">{t("hero_beta")}</span>
            </motion.div>

            {/* shimmering title */}
            <motion.h1
              className="mb-6 whitespace-nowrap bg-clip-text text-6xl font-serif font-bold leading-none text-transparent md:text-8xl lg:text-[9rem]"
              style={{
                backgroundImage:
                  "linear-gradient(110deg,#c9a227 0%,#c9a227 38%,#fff3c4 50%,#c9a227 62%,#c9a227 100%)",
                backgroundSize: "250% auto",
              }}
              animate={{ backgroundPosition: ["200% center", "0% center"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              PokAI
            </motion.h1>

            <p className="mb-4 text-2xl font-serif text-muted-foreground md:text-3xl">
              {t("hero_tagline")}
            </p>
            <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-muted-foreground/60">
              {t("hero_subtitle")}
            </p>

            <PokaiChat />

            {/* trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground/50"
            >
              {STAT_KEYS.map((s, i) => (
                <div key={s.key} className="flex items-center gap-4">
                  {i > 0 && <span className="hidden h-3 w-px bg-white/10 sm:block" />}
                  <span className="flex items-center gap-1.5">
                    {s.icon}
                    {t(s.key)}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-muted-foreground/40">{t("scroll")}</span>
          <div className="mx-auto h-8 w-0.5 bg-gradient-to-b from-primary/40 to-transparent" />
        </motion.div>
      </section>

      {/* ── Historical Archive — gallery ──────────────────────────────────── */}
      <section className="relative border-t border-white/5 py-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[120%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[140px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <Eyebrow>{t("archive_eyebrow")}</Eyebrow>
            <h2 className="mb-4 text-3xl font-serif text-foreground md:text-4xl">{t("archive_title")}</h2>
            <p className="mx-auto max-w-md text-sm text-muted-foreground">
              {t("archive_subtitle")}
            </p>
            <div className="mx-auto mt-6 h-0.5 w-16 rounded-full bg-primary" />
          </motion.div>
          <HistoricalMediaCard />
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────────── */}
      <section className="relative border-t border-white/5 bg-card/20 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <Eyebrow>{t("features_eyebrow")}</Eyebrow>
            <h2 className="mb-4 text-3xl font-serif text-foreground md:text-4xl">{t("features_title")}</h2>
            <p className="mx-auto max-w-lg text-sm text-muted-foreground">
              {t("features_subtitle")}
            </p>
            <div className="mx-auto mt-6 h-0.5 w-16 rounded-full bg-primary" />
          </motion.div>
          <div className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feat, i) => (
              <FeatureCard key={feat.titleKey} feat={feat} i={i} />
            ))}
            <LanguageCard i={FEATURES.length} />
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="relative border-t border-white/5 py-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[200%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[150px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 mx-auto max-w-2xl px-6 text-center"
        >
          <Eyebrow>{t("cta_eyebrow")}</Eyebrow>
          <h2 className="mb-4 text-3xl font-serif text-foreground md:text-4xl">{t("cta_title")}</h2>
          <p className="mb-10 text-lg text-muted-foreground">
            {t("cta_subtitle")}
          </p>
          <Button
            size="lg"
            onClick={scrollTop}
            className="h-14 rounded-full bg-primary px-12 text-lg font-serif text-primary-foreground shadow-[0_0_40px_rgba(201,162,39,0.25)] transition-all hover:scale-105 hover:bg-primary/90"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            {t("cta_button")}
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
