import { useRef, useState, useEffect, useCallback } from "react";

export type VoiceProfile = {
  pitch:  number;
  rate:   number;
  volume: number;
  label:  string;
};

export const VOICE_PROFILES: Record<string, VoiceProfile> = {
  ivan_asen: {
    pitch:  0.70,
    rate:   0.78,
    volume: 1.0,
    label:  "Royal & Commanding",
  },
  khan_asparuh: {
    pitch:  0.60,
    rate:   0.93,
    volume: 1.0,
    label:  "Strong & Energetic",
  },
  saint_ivan: {
    pitch:  1.15,
    rate:   0.65,
    volume: 0.85,
    label:  "Calm & Soft",
  },
  paisii: {
    pitch:  0.85,
    rate:   0.80,
    volume: 1.0,
    label:  "Wise Storyteller",
  },
  byzantine_chronicler: {
    pitch:  1.00,
    rate:   0.76,
    volume: 0.90,
    label:  "Scholarly & Measured",
  },
};

export interface SpeakOptions {
  pitchMultiplier?: number;
  rateMultiplier?:  number;
  volume?:          number;
  onEnd?:           () => void;
}

export function useSpeechVoice(figureId: string) {
  const [isListening,      setIsListening]      = useState(false);
  const [isSpeaking,       setIsSpeaking]       = useState(false);
  const [isPaused,         setIsPaused]         = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");

  const recognitionRef = useRef<any>(null);
  const voicesRef      = useRef<SpeechSynthesisVoice[]>([]);

  const isRecSupported =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
  const isSynSupported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    if (!isSynSupported) return;
    const load = () => { voicesRef.current = window.speechSynthesis.getVoices(); };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, [isSynSupported]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      if (isSynSupported) window.speechSynthesis.cancel();
    };
  }, [isSynSupported]);

  const selectVoice = useCallback((): SpeechSynthesisVoice | null => {
    const voices = voicesRef.current;
    if (!voices.length) return null;
    const enGB = voices.filter((v) => v.lang === "en-GB");
    const enAny = voices.filter((v) => v.lang.startsWith("en"));
    const pool  = enGB.length ? enGB : enAny.length ? enAny : voices;

    const profile = VOICE_PROFILES[figureId];
    if (profile && profile.pitch < 0.85) {
      const deepNames = ["Daniel", "George", "Alex", "Tom", "David", "Arthur", "Oliver", "Fred", "Brian", "Rishi"];
      for (const n of deepNames) {
        const match = pool.find((v) => v.name.includes(n));
        if (match) return match;
      }
    }
    if (profile && profile.pitch >= 1.1) {
      const softNames = ["Samantha", "Karen", "Victoria", "Moira", "Fiona", "Tessa", "Serena"];
      for (const n of softNames) {
        const match = pool.find((v) => v.name.includes(n));
        if (match) return match;
      }
    }
    return pool[0] ?? null;
  }, [figureId]);

  const speak = useCallback(
    (text: string, options?: SpeakOptions) => {
      const { pitchMultiplier = 1, rateMultiplier = 1, volume, onEnd } = options ?? {};
      if (!isSynSupported) { onEnd?.(); return; }
      window.speechSynthesis.cancel();

      const profile = VOICE_PROFILES[figureId] ?? { pitch: 1, rate: 0.85, volume: 1 };
      const utterance    = new SpeechSynthesisUtterance(text);
      utterance.pitch    = Math.max(0.1, Math.min(2,  profile.pitch  * pitchMultiplier));
      utterance.rate     = Math.max(0.1, Math.min(10, profile.rate   * rateMultiplier));
      utterance.volume   = volume ?? profile.volume;

      const voice = selectVoice();
      if (voice) utterance.voice = voice;

      utterance.onstart = () => { setIsSpeaking(true);  setIsPaused(false); };
      utterance.onend   = () => { setIsSpeaking(false); setIsPaused(false); onEnd?.(); };
      utterance.onerror = () => { setIsSpeaking(false); setIsPaused(false); onEnd?.(); };
      window.speechSynthesis.speak(utterance);
    },
    [figureId, isSynSupported, selectVoice]
  );

  const stopSpeaking = useCallback(() => {
    if (!isSynSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }, [isSynSupported]);

  const pauseSpeaking = useCallback(() => {
    if (!isSynSupported || !isSpeaking) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
  }, [isSynSupported, isSpeaking]);

  const resumeSpeaking = useCallback(() => {
    if (!isSynSupported || !isPaused) return;
    window.speechSynthesis.resume();
    setIsPaused(false);
  }, [isSynSupported, isPaused]);

  const startListening = useCallback(
    (onResult: (text: string, isFinal: boolean) => void, continuous = false) => {
      if (!isRecSupported) return;
      recognitionRef.current?.stop();
      const SpeechRec =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const rec          = new SpeechRec();
      rec.continuous     = continuous;
      rec.interimResults = true;
      rec.lang           = "en-US";
      rec.onstart  = () => setIsListening(true);
      rec.onend    = () => { setIsListening(false); setInterimTranscript(""); };
      rec.onerror  = () => { setIsListening(false); setInterimTranscript(""); };
      rec.onresult = (e: any) => {
        let interim = "";
        let final   = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const t = e.results[i][0].transcript;
          if (e.results[i].isFinal) final += t;
          else interim += t;
        }
        setInterimTranscript(interim);
        if (final) { setInterimTranscript(""); onResult(final.trim(), true); }
        else if (interim) onResult(interim.trim(), false);
      };
      recognitionRef.current = rec;
      try { rec.start(); } catch {}
    },
    [isRecSupported]
  );

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsListening(false);
    setInterimTranscript("");
  }, []);

  return {
    isListening,
    isSpeaking,
    isPaused,
    interimTranscript,
    isSupported: { recognition: isRecSupported, synthesis: isSynSupported },
    speak,
    stopSpeaking,
    pauseSpeaking,
    resumeSpeaking,
    startListening,
    stopListening,
  };
}
