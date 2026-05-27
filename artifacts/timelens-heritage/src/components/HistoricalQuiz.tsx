import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy, RotateCcw, ChevronRight, GraduationCap, Star,
  CheckCircle, XCircle, Compass, BookOpen, Crown, Share2,
  Lightbulb, Zap, Shield, Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Monument } from "@/data/monuments";
import { LEARNING, BadgeLevel, QuizQuestion } from "@/data/recommendations";

// ─── Types ───────────────────────────────────────────────────────────────────
type Difficulty = "easy" | "medium" | "expert";
type Phase = "start" | "question" | "complete";

interface HistoricalQuizProps { monument: Monument; }

// ─── Constants ────────────────────────────────────────────────────────────────
const RANKS = ["Explorer", "Scholar", "Historian", "Master of Heritage"] as const;
type RankName = typeof RANKS[number];

const RANK_ICONS = [Compass, BookOpen, GraduationCap, Crown];

const DIFFICULTY_CONFIG = {
  easy:   { label: "Easy",   count: 3, color: "text-green-400",  border: "border-green-500/40",  bg: "bg-green-500/10"  },
  medium: { label: "Medium", count: 4, color: "text-yellow-400", border: "border-yellow-500/40", bg: "bg-yellow-500/10" },
  expert: { label: "Expert", count: 5, color: "text-red-400",    border: "border-red-500/40",    bg: "bg-red-500/10"    },
};

const SCORE_RANKS: { min: number; title: string; subtitle: string; color: string }[] = [
  { min: 90, title: "Heritage Master",       subtitle: "An exceptional command of history worthy of a professional guide.", color: "text-yellow-400"  },
  { min: 70, title: "Historical Scholar",    subtitle: "Strong knowledge with impressive attention to historical detail.",  color: "text-primary"     },
  { min: 50, title: "Curious Explorer",      subtitle: "A solid foundation — every visit to history teaches something new.", color: "text-blue-400"  },
  { min: 0,  title: "Apprentice Researcher", subtitle: "Keep exploring — history rewards the persistent learner.",          color: "text-muted-foreground" },
];

const TIER_STYLES: Record<BadgeLevel["tier"], { bg: string; border: string; text: string; glow: string }> = {
  gold:   { bg: "bg-yellow-900/30", border: "border-yellow-500/50", text: "text-yellow-400", glow: "shadow-yellow-500/20" },
  silver: { bg: "bg-slate-700/30",  border: "border-slate-400/50",  text: "text-slate-300",  glow: "shadow-slate-400/20" },
  bronze: { bg: "bg-orange-900/30", border: "border-orange-500/50", text: "text-orange-400", glow: "shadow-orange-500/20" },
  basic:  { bg: "bg-white/5",       border: "border-white/20",      text: "text-muted-foreground", glow: "shadow-none" },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getRankIndex(currentQ: number, total: number): number {
  const pct = currentQ / total;
  if (pct >= 0.75) return 3;
  if (pct >= 0.50) return 2;
  if (pct >= 0.25) return 1;
  return 0;
}

function getScoreRank(pct: number) {
  return SCORE_RANKS.find((r) => pct >= r.min) ?? SCORE_RANKS[3];
}

function getBadge(score: number, total: number, badges: [BadgeLevel, BadgeLevel, BadgeLevel, BadgeLevel]): BadgeLevel {
  const pct = (score / total) * 100;
  if (pct === 100) return badges[3];
  if (pct >= 75)   return badges[2];
  if (pct >= 40)   return badges[1];
  return badges[0];
}

function playSound(type: "correct" | "wrong" | "badge" | "complete") {
  try {
    const ctx = new AudioContext();
    const t = ctx.currentTime;
    const scheduleNote = (freq: number, start: number, dur: number, vol: number, wave: OscillatorType = "sine") => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = wave;
      gain.gain.setValueAtTime(vol, t + start);
      gain.gain.exponentialRampToValueAtTime(0.001, t + start + dur);
      osc.start(t + start);
      osc.stop(t + start + dur + 0.02);
    };
    if (type === "correct") {
      [523, 659, 784].forEach((f, i) => scheduleNote(f, i * 0.09, 0.3, 0.10));
    } else if (type === "wrong") {
      [330, 247].forEach((f, i) => scheduleNote(f, i * 0.14, 0.22, 0.07, "sawtooth"));
    } else if (type === "badge") {
      [523, 659, 784, 1047].forEach((f, i) => scheduleNote(f, i * 0.08, 0.4, 0.09));
    } else if (type === "complete") {
      [523, 659, 784, 659, 1047].forEach((f, i) => scheduleNote(f, i * 0.11, 0.4, 0.09));
    }
  } catch { /* audio unavailable */ }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CorrectParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full"
          style={{ background: i % 2 === 0 ? "#c9a227" : "#86efac" }}
          initial={{ x: -3, y: -3, opacity: 1, scale: 0 }}
          animate={{
            x: Math.cos((i / 10) * Math.PI * 2) * (35 + i * 3),
            y: Math.sin((i / 10) * Math.PI * 2) * (20 + i * 2),
            opacity: 0,
            scale: [0, 1.4, 0],
          }}
          transition={{ duration: 0.55, delay: 0.05, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function RankProgressBar({ currentQ, total }: { currentQ: number; total: number }) {
  const activeRank = getRankIndex(currentQ, total);
  return (
    <div className="flex items-center gap-1 justify-center py-3">
      {RANKS.map((rank, i) => {
        const Icon = RANK_ICONS[i];
        const active = i === activeRank;
        const done = i < activeRank;
        return (
          <div key={rank} className="flex items-center gap-1">
            <motion.div
              animate={active ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 0.4 }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border transition-all duration-400 ${
                active
                  ? "bg-primary/20 border-primary/50 text-primary shadow-[0_0_10px_rgba(201,162,39,0.2)]"
                  : done
                  ? "bg-white/8 border-white/15 text-white/60"
                  : "bg-transparent border-white/8 text-white/25"
              }`}
            >
              <Icon className="w-3 h-3" />
              <span className="hidden sm:inline">{rank}</span>
            </motion.div>
            {i < RANKS.length - 1 && (
              <div className={`w-4 h-px transition-colors duration-400 ${i < activeRank ? "bg-white/30" : "bg-white/10"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ScoreCircle({ score, total }: { score: number; total: number }) {
  const pct = score / total;
  const r = 48; const circ = 2 * Math.PI * r;
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 112 112">
        <circle cx="56" cy="56" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <motion.circle
          cx="56" cy="56" r={r} fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="8" strokeLinecap="round"
          strokeDasharray={`${circ}`}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - pct * circ }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
        />
      </svg>
      <div className="flex flex-col items-center">
        <motion.span
          className="text-3xl font-bold font-serif text-primary"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
        >
          {Math.round(pct * 100)}%
        </motion.span>
        <span className="text-[10px] text-muted-foreground">{score}/{total} correct</span>
      </div>
    </div>
  );
}

function CertificateCard({
  monumentName, rank, badgeTitle, score, total, difficulty,
}: {
  monumentName: string; rank: string; badgeTitle: string; score: number; total: number; difficulty: Difficulty;
}) {
  const date = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.5 }}
      className="w-full rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/8 via-background to-primary/5 p-6 text-center relative overflow-hidden"
    >
      {/* Corner ornaments */}
      <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-primary/30 rounded-tl" />
      <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-primary/30 rounded-tr" />
      <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-primary/30 rounded-bl" />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-primary/30 rounded-br" />

      <div className="flex items-center justify-center gap-2 mb-1">
        <div className="h-px w-8 bg-primary/30" />
        <span className="text-[9px] text-primary/50 uppercase tracking-[0.3em] font-semibold">PokAI Heritage</span>
        <div className="h-px w-8 bg-primary/30" />
      </div>
      <p className="text-[11px] text-muted-foreground/50 uppercase tracking-widest mb-3">Certificate of Achievement</p>

      <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-3">
        <Trophy className="w-5 h-5 text-primary" />
      </div>

      <p className="text-xs text-muted-foreground/60 mb-0.5">for outstanding knowledge of</p>
      <h3 className="font-serif text-lg font-bold text-foreground mb-3">{monumentName}</h3>

      <div className="flex items-center justify-center gap-4 text-xs flex-wrap">
        <div className="text-center">
          <p className="text-muted-foreground/50 mb-0.5">Rank Earned</p>
          <p className="font-semibold text-primary">{rank}</p>
        </div>
        <div className="w-px h-6 bg-white/10" />
        <div className="text-center">
          <p className="text-muted-foreground/50 mb-0.5">Score</p>
          <p className="font-semibold text-foreground">{score}/{total} · {Math.round((score/total)*100)}%</p>
        </div>
        <div className="w-px h-6 bg-white/10" />
        <div className="text-center">
          <p className="text-muted-foreground/50 mb-0.5">Difficulty</p>
          <p className={`font-semibold capitalize ${DIFFICULTY_CONFIG[difficulty].color}`}>{difficulty}</p>
        </div>
      </div>

      <div className="h-px bg-primary/15 my-3" />
      <p className="text-[10px] text-muted-foreground/40">{badgeTitle} · {date}</p>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function HistoricalQuiz({ monument }: HistoricalQuizProps) {
  const data = LEARNING[monument.id];
  if (!data) return null;

  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [phase, setPhase]           = useState<Phase>("start");
  const [questions, setQuestions]   = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ]     = useState(0);
  const [selected, setSelected]     = useState<number | null>(null);
  const [answers, setAnswers]       = useState<(number | null)[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [shareMsg, setShareMsg]     = useState("");

  const q         = questions[currentQ];
  const score     = answers.filter((a, i) => a === questions[i]?.correctIndex).length;
  const scorePct  = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const scoreRank = getScoreRank(scorePct);
  const badge     = questions.length > 0 ? getBadge(score, questions.length, data.badges) : data.badges[0];
  const tierStyle = TIER_STYLES[badge.tier];
  const starCount = badge.tier === "gold" ? 4 : badge.tier === "silver" ? 3 : badge.tier === "bronze" ? 2 : 1;

  const handleStart = useCallback(() => {
    const count = DIFFICULTY_CONFIG[difficulty].count;
    const shuffled = shuffle(data.quiz).slice(0, count);
    setQuestions(shuffled);
    setAnswers(Array(count).fill(null));
    setCurrentQ(0);
    setSelected(null);
    setShowFeedback(false);
    setPhase("question");
  }, [difficulty, data.quiz]);

  const handleSelect = useCallback((idx: number) => {
    if (selected !== null) return;
    const isCorrect = idx === q.correctIndex;
    setSelected(idx);
    setAnswers((prev) => { const n = [...prev]; n[currentQ] = idx; return n; });
    setShowFeedback(true);
    playSound(isCorrect ? "correct" : "wrong");
  }, [selected, q, currentQ]);

  const handleNext = useCallback(() => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((n) => n + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      playSound("badge");
      setTimeout(() => playSound("complete"), 800);
      setPhase("complete");
    }
  }, [currentQ, questions.length]);

  const handleShare = useCallback(() => {
    const text = `I just completed the PokAI Heritage Quiz on ${monument.name}!\n\nRank earned: ${scoreRank.title}\nScore: ${scorePct}% (${score}/${questions.length} correct)\nAchievement: ${badge.title}\n\nDiscover Bulgarian heritage at PokAI Heritage.`;
    if (navigator.share) {
      navigator.share({ title: "PokAI Heritage Quiz", text }).catch(() => null);
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setShareMsg("Copied to clipboard!");
        setTimeout(() => setShareMsg(""), 2500);
      });
    }
  }, [monument.name, scoreRank.title, scorePct, score, questions.length, badge.title]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Section header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
          <GraduationCap className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h2 className="font-serif text-xl font-bold text-foreground">Historical Quiz</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Test your knowledge · Earn your rank · Unlock your badge</p>
        </div>
      </div>

      <AnimatePresence mode="wait">

        {/* ══ START ══════════════════════════════════════════════════════════ */}
        {phase === "start" && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="rounded-2xl border border-white/10 bg-card/50 p-8 space-y-7"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1.5">
                  How well do you know {monument.name}?
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Answer questions, advance through ranks, and earn an achievement badge based on your score.
                </p>
              </div>

              {/* Rank preview */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground/60 flex-wrap justify-center">
                {RANKS.map((r, i) => {
                  const Icon = RANK_ICONS[i];
                  return (
                    <span key={r} className="flex items-center gap-1">
                      <Icon className="w-3 h-3" />{r}
                      {i < RANKS.length - 1 && <ChevronRight className="w-3 h-3 opacity-40" />}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Difficulty selector */}
            <div>
              <p className="text-xs text-muted-foreground/60 text-center uppercase tracking-widest mb-3">Choose Difficulty</p>
              <div className="grid grid-cols-3 gap-3">
                {(["easy", "medium", "expert"] as Difficulty[]).map((d) => {
                  const cfg = DIFFICULTY_CONFIG[d];
                  const active = difficulty === d;
                  return (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      className={`rounded-xl border p-4 text-center transition-all duration-200 ${
                        active ? `${cfg.bg} ${cfg.border} ${cfg.color}` : "border-white/8 bg-white/3 text-muted-foreground hover:border-white/20"
                      }`}
                    >
                      <div className={`text-sm font-bold mb-1 ${active ? cfg.color : ""}`}>{cfg.label}</div>
                      <div className="text-[11px] opacity-70">{cfg.count} questions</div>
                      {active && (
                        <motion.div
                          layoutId="diff-check"
                          className="w-4 h-4 rounded-full bg-current/20 border border-current/40 flex items-center justify-center mx-auto mt-2"
                        >
                          <CheckCircle className="w-2.5 h-2.5" />
                        </motion.div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-primary" /> Randomized questions</span>
              <span className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-primary" /> Instant explanations</span>
              <span className="flex items-center gap-1.5"><Award className="w-3 h-3 text-primary" /> Achievement badge</span>
            </div>

            <div className="flex justify-center">
              <Button onClick={handleStart} className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 rounded-full font-medium text-base">
                Begin Quiz
              </Button>
            </div>
          </motion.div>
        )}

        {/* ══ QUESTION ═══════════════════════════════════════════════════════ */}
        {phase === "question" && q && (
          <motion.div
            key={`q-${currentQ}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.28 }}
            className="rounded-2xl border border-white/10 bg-card/50 overflow-hidden"
          >
            {/* Gold progress bar */}
            <div className="h-1 bg-white/5">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: `${(currentQ / questions.length) * 100}%` }}
                animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Rank progress */}
            <RankProgressBar currentQ={currentQ} total={questions.length} />

            <div className="px-6 pb-8 space-y-5">
              {/* Counter + dots */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-primary/60 font-medium uppercase tracking-widest">
                  Question {currentQ + 1} of {questions.length}
                  <span className={`ml-2 text-[9px] font-bold uppercase ${DIFFICULTY_CONFIG[difficulty].color}`}>
                    · {difficulty}
                  </span>
                </span>
                <div className="flex gap-1 ml-auto">
                  {questions.map((_, i) => (
                    <div key={i} className={`transition-all rounded-full ${
                      i < currentQ
                        ? answers[i] === questions[i].correctIndex
                          ? "w-4 h-2 bg-green-400"
                          : "w-4 h-2 bg-red-400"
                        : i === currentQ
                        ? "w-5 h-2 bg-primary"
                        : "w-2 h-2 bg-white/10"
                    }`} />
                  ))}
                </div>
              </div>

              {/* Question */}
              <h3 className="font-serif text-lg md:text-xl text-foreground leading-snug">
                {q.question}
              </h3>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt, i) => {
                  const isSelected = selected === i;
                  const isCorrect  = i === q.correctIndex;
                  const revealed   = selected !== null;

                  let cls = "border-white/10 bg-white/4 text-foreground/80 hover:border-primary/35 hover:bg-primary/6 hover:text-foreground";
                  if (revealed && isCorrect)               cls = "border-green-500/60 bg-green-500/12 text-green-300 shadow-[0_0_16px_rgba(74,222,128,0.18)]";
                  if (revealed && isSelected && !isCorrect) cls = "border-red-500/50 bg-red-500/10 text-red-300";

                  return (
                    <motion.button
                      key={i}
                      whileTap={selected === null ? { scale: 0.97 } : {}}
                      animate={
                        revealed && isSelected && !isCorrect
                          ? { x: [0, -7, 7, -5, 5, -3, 3, 0] }
                          : revealed && isCorrect
                          ? { scale: [1, 1.02, 1] }
                          : {}
                      }
                      transition={{ duration: 0.35 }}
                      onClick={() => handleSelect(i)}
                      disabled={selected !== null}
                      className={`relative flex items-center gap-3 text-left px-4 py-3.5 rounded-xl border transition-all duration-250 text-sm ${cls} disabled:cursor-default`}
                    >
                      {/* Correct answer particles */}
                      {revealed && isCorrect && <CorrectParticles />}

                      <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                        revealed && isCorrect            ? "border-green-500 bg-green-500/20 text-green-300"  :
                        revealed && isSelected && !isCorrect ? "border-red-500 bg-red-500/20 text-red-300"   :
                        "border-white/20 text-muted-foreground"
                      }`}>
                        {revealed && isCorrect           ? <CheckCircle className="w-3.5 h-3.5" /> :
                         revealed && isSelected && !isCorrect ? <XCircle className="w-3.5 h-3.5" /> :
                         String.fromCharCode(65 + i)}
                      </span>

                      <span className="leading-snug flex-1">{opt}</span>

                      {revealed && isCorrect && (
                        <motion.span initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", damping: 10, delay: 0.1 }} className="ml-auto shrink-0">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </motion.span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Did you know? */}
              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {/* Result header */}
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className={`flex items-center gap-2 mb-2 ${
                        selected === q.correctIndex ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {selected === q.correctIndex
                        ? <><CheckCircle className="w-4 h-4" /><span className="text-sm font-semibold">Correct!</span></>
                        : <><XCircle className="w-4 h-4" /><span className="text-sm font-semibold">Not quite — the correct answer was: <span className="text-foreground">{q.options[q.correctIndex]}</span></span></>
                      }
                    </motion.div>

                    {/* Did you know */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="rounded-xl border border-primary/20 bg-primary/6 p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Did you know?</span>
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">{q.explanation}</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next button */}
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="flex justify-end"
                >
                  <Button
                    onClick={handleNext}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 gap-2"
                  >
                    {currentQ < questions.length - 1 ? "Next Question" : "See Results"}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ══ COMPLETE ═══════════════════════════════════════════════════════ */}
        {phase === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-white/10 bg-card/50 p-6 md:p-8 space-y-6"
          >
            {/* Score + rank earned */}
            <div className="flex flex-col items-center gap-4 text-center">
              <ScoreCircle score={score} total={questions.length} />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <p className={`font-serif text-xl font-bold ${scoreRank.color}`}>{scoreRank.title}</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">{scoreRank.subtitle}</p>
              </motion.div>
            </div>

            {/* Achievement badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5, type: "spring", damping: 12 }}
              className={`rounded-2xl border ${tierStyle.border} ${tierStyle.bg} p-5 flex flex-col items-center gap-3 shadow-xl ${tierStyle.glow} text-center`}
            >
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50">Achievement Unlocked</p>
              <div className={`w-12 h-12 rounded-full ${tierStyle.bg} border ${tierStyle.border} flex items-center justify-center`}>
                <Trophy className={`w-6 h-6 ${tierStyle.text}`} />
              </div>
              <div>
                <h3 className={`font-serif text-lg font-bold ${tierStyle.text}`}>{badge.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{badge.subtitle}</p>
              </div>
              <div className="flex gap-1.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.9 + i * 0.1, type: "spring", damping: 10 }}
                  >
                    <Star className={`w-5 h-5 ${i < starCount ? `${tierStyle.text} fill-current` : "text-white/10"}`} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Question breakdown */}
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${questions.length}, 1fr)` }}>
              {answers.map((a, i) => {
                const correct = a === questions[i]?.correctIndex;
                return (
                  <div key={i} className={`rounded-lg border py-2 flex flex-col items-center gap-1 text-xs ${
                    correct ? "border-green-500/30 bg-green-500/10 text-green-400" : "border-red-500/30 bg-red-500/10 text-red-400"
                  }`}>
                    <span className="text-[9px] text-muted-foreground/50 uppercase">Q{i + 1}</span>
                    {correct ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  </div>
                );
              })}
            </div>

            {/* Certificate */}
            <CertificateCard
              monumentName={monument.name}
              rank={scoreRank.title}
              badgeTitle={badge.title}
              score={score}
              total={questions.length}
              difficulty={difficulty}
            />

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <Button
                onClick={handleShare}
                variant="outline"
                className="border-primary/30 hover:bg-primary/8 text-primary rounded-full gap-2 w-full sm:w-auto"
              >
                <Share2 className="w-3.5 h-3.5" />
                {shareMsg || "Share Result"}
              </Button>
              <Button
                onClick={handleStart}
                variant="outline"
                className="border-white/20 hover:bg-white/5 rounded-full gap-2 w-full sm:w-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Try Again
              </Button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </motion.section>
  );
}
