import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";

export type Lang = "en" | "bg" | "pl";

export const LANGUAGES: { code: Lang; name: string }[] = [
  { code: "en", name: "English" },
  { code: "bg", name: "Български" },
  { code: "pl", name: "Polski" },
];

type Dict = Record<string, string>;

const en: Dict = {
  nav_gallery: "Gallery",
  nav_try: "Try it",
  hero_badge: "AI-powered heritage guide",
  hero_beta: "Beta",
  hero_tagline: "See the Past. Talk to History.",
  hero_subtitle:
    "Ask anything or drop a photo of a monument, ruin, or heritage object — and step into its history.",
  stat_sites: "10 heritage sites",
  stat_recon: "AI reconstructions",
  stat_talk: "Talk to history",
  scroll: "Scroll to discover",
  archive_eyebrow: "Historical Archive",
  archive_title: "Bring History to Life",
  archive_subtitle:
    "Ten heritage sites in one archive. Hover to watch each one rise from its ruins — then open it to see it today.",
  features_eyebrow: "Capabilities",
  features_title: "A Portal into the Past",
  features_subtitle:
    "Every photo tells a story waiting to be uncovered. Here is what happens after you share one.",
  f1_title: "AI Heritage Recognition",
  f1_desc:
    "Upload any photo of a monument, ruin, or heritage object. The AI identifies it and pulls rich historical context instantly.",
  f2_title: "Time Machine Slider",
  f2_desc:
    "Drag the slider to reveal a historical reconstruction of the site at its peak — side by side with what it looks like today.",
  f3_title: "Talk to History",
  f3_desc:
    "Choose a historical figure and hold a real conversation. Hear their voice, ask questions, and experience history firsthand.",
  f4_title: "Interactive Map",
  f4_desc:
    "Pinpoint the exact location of every identified monument. Open it directly in your map application with one tap.",
  f5_title: "Gallery of Discoveries",
  f5_desc:
    "Every heritage object you analyze is saved automatically to your personal historical gallery — your own digital museum.",
  feature_explore: "Explore",
  lang_title: "Your Language",
  lang_desc: "Explore heritage in the language you think in. Pick yours below.",
  cta_eyebrow: "Start exploring",
  cta_title: "Ready to Step into History?",
  cta_subtitle:
    "Start a conversation with PokAI — ask a question or drop a photo and let it reconstruct the story.",
  cta_button: "Start a Conversation",
  chat_placeholder: "Ask about any monument, or drop a photo...",
  chat_drop: "Drop your heritage photo",
  chat_prompt1: "What is this monument?",
  chat_prompt2: "Tell me its history",
  chat_prompt3: "When was it built?",
  chat_reply_image:
    "Beautiful — I can see your photo. Visual recognition is being connected right now. Once the AI is live, I'll identify the monument, reconstruct how it looked at its peak, and tell you its full story.",
  chat_reply_text:
    "Thanks for your message! I'm PokAI, your heritage guide. My AI brain is being connected — very soon I'll answer in depth and bring history to life. For now, try dropping a photo of a monument or ruin.",
};

const bg: Dict = {
  nav_gallery: "Галерия",
  nav_try: "Опитай",
  hero_badge: "AI водач за наследството",
  hero_beta: "Бета",
  hero_tagline: "Виж миналото. Говори с историята.",
  hero_subtitle:
    "Попитай каквото искаш или пусни снимка на паметник, руина или обект на наследството — и пристъпи в неговата история.",
  stat_sites: "10 обекта на наследството",
  stat_recon: "AI реконструкции",
  stat_talk: "Говори с историята",
  scroll: "Превърти, за да откриеш",
  archive_eyebrow: "Исторически архив",
  archive_title: "Съживи историята",
  archive_subtitle:
    "Десет обекта на наследството в един архив. Посочи с мишката, за да видиш как всеки се въздига от руините — после го отвори, за да го видиш днес.",
  features_eyebrow: "Възможности",
  features_title: "Портал към миналото",
  features_subtitle:
    "Всяка снимка крие история, чакаща да бъде разкрита. Ето какво се случва, след като споделиш една.",
  f1_title: "AI разпознаване на наследство",
  f1_desc:
    "Качи снимка на паметник, руина или обект на наследството. AI го разпознава и веднага извлича богат исторически контекст.",
  f2_title: "Плъзгач машина на времето",
  f2_desc:
    "Плъзни, за да разкриеш историческа реконструкция на обекта в разцвета му — едно до друго с това как изглежда днес.",
  f3_title: "Говори с историята",
  f3_desc:
    "Избери историческа личност и проведи истински разговор. Чуй гласа ѝ, задавай въпроси и преживей историята от първо лице.",
  f4_title: "Интерактивна карта",
  f4_desc:
    "Открий точното местоположение на всеки разпознат паметник. Отвори го директно в твоето картографско приложение с едно докосване.",
  f5_title: "Галерия с открития",
  f5_desc:
    "Всеки обект на наследството, който анализираш, се запазва автоматично в личната ти историческа галерия — твоят собствен дигитален музей.",
  feature_explore: "Разгледай",
  lang_title: "Твоят език",
  lang_desc: "Разгледай наследството на езика, на който мислиш. Избери своя по-долу.",
  cta_eyebrow: "Започни да изследваш",
  cta_title: "Готов ли си да пристъпиш в историята?",
  cta_subtitle:
    "Започни разговор с PokAI — задай въпрос или пусни снимка и остави го да възстанови историята.",
  cta_button: "Започни разговор",
  chat_placeholder: "Попитай за паметник или пусни снимка...",
  chat_drop: "Пусни снимка на наследството",
  chat_prompt1: "Какъв е този паметник?",
  chat_prompt2: "Разкажи историята му",
  chat_prompt3: "Кога е построен?",
  chat_reply_image:
    "Прекрасно — виждам снимката ти. Визуалното разпознаване се свързва точно сега. Щом AI заработи, ще разпозная паметника, ще възстановя как е изглеждал в разцвета си и ще ти разкажа цялата му история.",
  chat_reply_text:
    "Благодаря за съобщението! Аз съм PokAI, твоят водач за наследството. Свързвам AI мозъка си — съвсем скоро ще отговарям задълбочено и ще съживявам историята. Засега опитай да пуснеш снимка на паметник или руина.",
};

const pl: Dict = {
  nav_gallery: "Galeria",
  nav_try: "Wypróbuj",
  hero_badge: "Przewodnik po dziedzictwie z AI",
  hero_beta: "Beta",
  hero_tagline: "Zobacz przeszłość. Porozmawiaj z historią.",
  hero_subtitle:
    "Zapytaj o cokolwiek lub wrzuć zdjęcie zabytku, ruiny czy obiektu dziedzictwa — i wejdź w jego historię.",
  stat_sites: "10 obiektów dziedzictwa",
  stat_recon: "Rekonstrukcje AI",
  stat_talk: "Rozmowa z historią",
  scroll: "Przewiń, aby odkryć",
  archive_eyebrow: "Archiwum historyczne",
  archive_title: "Ożyw historię",
  archive_subtitle:
    "Dziesięć obiektów dziedzictwa w jednym archiwum. Najedź, aby zobaczyć, jak każdy powstaje z ruin — a potem otwórz, by zobaczyć go dziś.",
  features_eyebrow: "Możliwości",
  features_title: "Portal do przeszłości",
  features_subtitle:
    "Każde zdjęcie kryje historię czekającą na odkrycie. Oto, co dzieje się, gdy je udostępnisz.",
  f1_title: "Rozpoznawanie dziedzictwa AI",
  f1_desc:
    "Prześlij zdjęcie zabytku, ruiny lub obiektu dziedzictwa. AI rozpozna go i natychmiast przywoła bogaty kontekst historyczny.",
  f2_title: "Suwak wehikułu czasu",
  f2_desc:
    "Przesuń suwak, aby odsłonić historyczną rekonstrukcję obiektu u szczytu jego świetności — obok tego, jak wygląda dziś.",
  f3_title: "Rozmowa z historią",
  f3_desc:
    "Wybierz postać historyczną i poprowadź prawdziwą rozmowę. Usłysz jej głos, zadawaj pytania i poczuj historię z pierwszej ręki.",
  f4_title: "Interaktywna mapa",
  f4_desc:
    "Wskaż dokładną lokalizację każdego rozpoznanego zabytku. Otwórz ją bezpośrednio w aplikacji map jednym dotknięciem.",
  f5_title: "Galeria odkryć",
  f5_desc:
    "Każdy analizowany obiekt dziedzictwa jest automatycznie zapisywany w Twojej osobistej galerii historycznej — Twoim własnym cyfrowym muzeum.",
  feature_explore: "Odkryj",
  lang_title: "Twój język",
  lang_desc: "Odkrywaj dziedzictwo w języku, w którym myślisz. Wybierz swój poniżej.",
  cta_eyebrow: "Zacznij odkrywać",
  cta_title: "Gotów wejść w historię?",
  cta_subtitle:
    "Rozpocznij rozmowę z PokAI — zadaj pytanie lub wrzuć zdjęcie i pozwól mu odtworzyć tę historię.",
  cta_button: "Rozpocznij rozmowę",
  chat_placeholder: "Zapytaj o zabytek lub wrzuć zdjęcie...",
  chat_drop: "Wrzuć zdjęcie dziedzictwa",
  chat_prompt1: "Co to za zabytek?",
  chat_prompt2: "Opowiedz jego historię",
  chat_prompt3: "Kiedy go zbudowano?",
  chat_reply_image:
    "Pięknie — widzę Twoje zdjęcie. Rozpoznawanie obrazu jest właśnie podłączane. Gdy AI ruszy, rozpoznam zabytek, odtworzę, jak wyglądał u szczytu świetności, i opowiem całą jego historię.",
  chat_reply_text:
    "Dziękuję za wiadomość! Jestem PokAI, Twój przewodnik po dziedzictwie. Mój mózg AI jest właśnie podłączany — już wkrótce odpowiem szczegółowo i ożywię historię. Na razie spróbuj wrzucić zdjęcie zabytku lub ruiny.",
};

const TRANSLATIONS: Record<Lang, Dict> = { en, bg, pl };

const STORAGE_KEY = "pokai_lang";

function readLang(): Lang {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "en" || v === "bg" || v === "pl") return v;
  } catch {
    /* ignore */
  }
  return "en";
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string };

const LanguageContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readLang);

  useEffect(() => {
    try { document.documentElement.lang = lang; } catch { /* ignore */ }
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
  }, []);

  const t = useCallback(
    (key: string) => TRANSLATIONS[lang][key] ?? TRANSLATIONS.en[key] ?? key,
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
