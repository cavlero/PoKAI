import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Trophy, RotateCcw, ChevronRight, GraduationCap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Monument } from "@/data/monuments";
import { LEARNING, BadgeLevel } from "@/data/recommendations";

interface HistoricalQuizProps {
  monument: Monument;
}

type Phase = "idle" | "active" | "complete";

const TIER_STYLES: Record<BadgeLevel["tier"], { bg: string; border: string; text: string; glow: string }> = {
  gold:   { bg: "bg-yellow-900/30",  border: "border-yellow-500/50",  text: "text-yellow-400",  glow: "shadow-yellow-500/20"  },
  silver: { bg: "bg-slate-700/30",   border: "border-slate-400/50",   text: "text-slate-300",   glow: "shadow-slate-400/20"   },
  bronze: { bg: "bg-orange-900/30",  border: "border-orange-500/50",  text: "text-orange-400",  glow: "shadow-orange-500/20"  },
  basic:  { bg: "bg-white/5",        border: "border-white/20",       text: "text-muted-foreground", glow: "shadow-none" },
};

const TIER_STARS: Record<BadgeLevel["tier"], number> = { gold: 4, silver: 3, bronze: 2, basic: 1 };

function getBadge(score: number, badges: [BadgeLevel, BadgeLevel, BadgeLevel, BadgeLevel]): BadgeLevel {
  if (score === 5) return badges[3];
  if (score === 4) return badges[2];
  if (score >= 2)  return badges[1];
  return badges[0];
}

function ScoreCircle({ score, total }: { score: number; total: number }) {
  const pct = score / total;
  const r = 48;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 112 112">
        <circle cx="56" cy="56" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <motion.circle
          cx="56" cy="56" r={r} fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${circ}`}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="flex flex-col items-center">
        <motion.span
          className="text-4xl font-bold font-serif text-primary"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
        >
          {score}
        </motion.span>
        <span className="text-xs text-muted-foreground">of {total}</span>
      </div>
    </div>
  );
}

export function HistoricalQuiz({ monument }: HistoricalQuizProps) {
  const data = LEARNING[monument.id];
  if (!data) return null;

  const questions = data.quiz;
  const [phase, setPhase]               = useState<Phase>("idle");
  const [currentQ, setCurrentQ]         = useState(0);
  const [selected, setSelected]         = useState<number | null>(null);
  const [answers, setAnswers]           = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [showExplanation, setShowExp]   = useState(false);

  const q = questions[currentQ];
  const score = answers.filter((a, i) => a === questions[i].correctIndex).length;

  const handleStart = () => {
    setPhase("active");
    setCurrentQ(0);
    setSelected(null);
    setAnswers(Array(questions.length).fill(null));
    setShowExp(false);
  };

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setAnswers((prev) => { const next = [...prev]; next[currentQ] = idx; return next; });
    setShowExp(true);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((n) => n + 1);
      setSelected(null);
      setShowExp(false);
    } else {
      setPhase("complete");
    }
  };

  const badge = getBadge(score, data.badges);
  const tierStyle = TIER_STYLES[badge.tier];
  const stars = TIER_STARS[badge.tier];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
          <GraduationCap className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h2 className="font-serif text-xl font-bold text-foreground">Test Your Knowledge</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            5 questions about {monument.name} and its historical period
          </p>
        </div>
      </div>

      {/* ── IDLE ── */}
      <AnimatePresence mode="wait">
        {phase === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="rounded-2xl border border-white/10 bg-card/50 p-8 flex flex-col items-center text-center gap-5"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-1.5">
                How well do you know {monument.name}?
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Answer 5 multiple-choice questions and earn an achievement badge based on your score.
              </p>
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-400" /> 5 questions</span>
              <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-yellow-400" /> Earn a badge</span>
              <span className="flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-primary" /> Instant results</span>
            </div>
            <Button onClick={handleStart} className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 rounded-full font-medium">
              Start Quiz
            </Button>
          </motion.div>
        )}

        {/* ── ACTIVE ── */}
        {phase === "active" && (
          <motion.div
            key={`q-${currentQ}`}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-white/10 bg-card/50 overflow-hidden"
          >
            {/* Progress bar */}
            <div className="h-1 bg-white/5">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: `${(currentQ / questions.length) * 100}%` }}
                animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <div className="p-6 md:p-8 space-y-6">
              {/* Question counter + text */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-primary/60 font-medium uppercase tracking-widest">
                    Question {currentQ + 1} of {questions.length}
                  </span>
                  <div className="flex gap-1 ml-auto">
                    {questions.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i < currentQ
                            ? answers[i] === questions[i].correctIndex
                              ? "bg-green-400"
                              : "bg-red-400"
                            : i === currentQ
                            ? "bg-primary"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="font-serif text-lg md:text-xl text-foreground leading-snug">
                  {q.question}
                </h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt, i) => {
                  const isSelected = selected === i;
                  const isCorrect  = i === q.correctIndex;
                  const revealed   = selected !== null;

                  let style = "border-white/10 bg-white/5 text-foreground/80 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground";
                  if (revealed && isCorrect)  style = "border-green-500/60 bg-green-500/15 text-green-300";
                  if (revealed && isSelected && !isCorrect) style = "border-red-500/60 bg-red-500/15 text-red-300";

                  return (
                    <motion.button
                      key={i}
                      whileTap={selected === null ? { scale: 0.97 } : {}}
                      onClick={() => handleSelect(i)}
                      disabled={selected !== null}
                      className={`relative flex items-center gap-3 text-left px-4 py-3.5 rounded-xl border transition-all duration-200 text-sm ${style} disabled:cursor-default`}
                    >
                      <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                        revealed && isCorrect ? "border-green-500 bg-green-500/20 text-green-300" :
                        revealed && isSelected && !isCorrect ? "border-red-500 bg-red-500/20 text-red-300" :
                        "border-white/20 text-muted-foreground"
                      }`}>
                        {revealed && isCorrect ? "✓" : revealed && isSelected && !isCorrect ? "✗" : String.fromCharCode(65 + i)}
                      </span>
                      <span className="leading-snug">{opt}</span>

                      {/* Right icon */}
                      {revealed && isCorrect && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 10 }}
                          className="ml-auto shrink-0"
                        >
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </motion.span>
                      )}
                      {revealed && isSelected && !isCorrect && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto shrink-0"
                        >
                          <XCircle className="w-4 h-4 text-red-400" />
                        </motion.span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className={`rounded-xl border p-4 text-sm leading-relaxed ${
                      selected === q.correctIndex
                        ? "border-green-500/20 bg-green-500/8 text-green-200/90"
                        : "border-primary/20 bg-primary/5 text-foreground/80"
                    }`}>
                      <span className="font-semibold text-foreground block mb-1">
                        {selected === q.correctIndex ? "Correct!" : `The correct answer is: ${q.options[q.correctIndex]}`}
                      </span>
                      {q.explanation}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next button */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
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

        {/* ── COMPLETE ── */}
        {phase === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-white/10 bg-card/50 p-8 flex flex-col items-center text-center gap-6"
          >
            {/* Score circle */}
            <ScoreCircle score={score} total={questions.length} />

            {/* Score message */}
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {score === 5 ? "Perfect score!" :
                 score >= 4 ? "Excellent work!" :
                 score >= 3 ? "Well done!" :
                 score >= 2 ? "Good effort!" :
                 "Keep exploring — every visit teaches something new."}
              </p>
              <p className="text-xs text-muted-foreground/60">
                You answered {score} out of {questions.length} questions correctly.
              </p>
            </div>

            {/* Achievement badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5, type: "spring", damping: 12 }}
              className={`w-full max-w-sm rounded-2xl border ${tierStyle.border} ${tierStyle.bg} p-6 flex flex-col items-center gap-3 shadow-xl ${tierStyle.glow}`}
            >
              <div className={`w-14 h-14 rounded-full ${tierStyle.bg} border ${tierStyle.border} flex items-center justify-center`}>
                <Trophy className={`w-7 h-7 ${tierStyle.text}`} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1">Achievement Unlocked</p>
                <h3 className={`font-serif text-xl font-bold ${tierStyle.text}`}>{badge.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{badge.subtitle}</p>
              </div>
              {/* Stars */}
              <div className="flex gap-1.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.7 + i * 0.1, type: "spring", damping: 10 }}
                  >
                    <Star
                      className={`w-5 h-5 ${i < stars ? tierStyle.text : "text-white/10"} ${i < stars ? "fill-current" : ""}`}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Per-question breakdown */}
            <div className="w-full grid grid-cols-5 gap-2">
              {answers.map((a, i) => {
                const correct = a === questions[i].correctIndex;
                return (
                  <div
                    key={i}
                    className={`rounded-lg border py-2 flex flex-col items-center gap-1 text-xs ${
                      correct
                        ? "border-green-500/30 bg-green-500/10 text-green-400"
                        : "border-red-500/30 bg-red-500/10 text-red-400"
                    }`}
                  >
                    <span className="text-[10px] text-muted-foreground/50 uppercase">Q{i + 1}</span>
                    {correct ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  </div>
                );
              })}
            </div>

            {/* Retry */}
            <Button
              variant="outline"
              onClick={handleStart}
              className="border-white/20 hover:bg-white/5 rounded-full gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Try Again
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
