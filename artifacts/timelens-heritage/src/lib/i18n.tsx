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
    "Discover Svishtov's Hidden Cultural Heritage.",
  stat_sites: "Svishtov's Hidden History",
  stat_recon: "AI reconstructions",
  stat_talk: "Talk to history",
  scroll: "Scroll to discover",
  archive_eyebrow: "Historical Archive",
  archive_title: "The Past, Restored.",
  archive_subtitle:
    "Upload images from historical books and let AI reveal what time obscured.",
  features_eyebrow: "Capabilities",
  features_title: "A Portal into the Past",
  features_subtitle:
    "Every photo tells a story waiting to be uncovered. Here is what happens after you share one.",
  f1_title: "AI Heritage Recognition",
  f1_desc:
    "Upload any photo of a written heritage object from Svishtov. The AI identifies it and pulls rich historical context instantly.",
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
  chat_placeholder: "Ask anything about Svishtov...",
  chat_drop: "Drop your heritage photo",
  chat_prompt1: "How was the funding for the high school distributed?",
  chat_prompt2: "When was the journey of Wolfgang?",
  chat_prompt3: "Who were the teachers in 1888?",
  chat_reply_image:
    "I can see your photo! To analyse a heritage image, head to the Explore page — upload it there and I'll OCR, translate, and index it so you can query it here.",
  chat_reply_text:
    "Thanks for your message! I'm PokAI, your heritage guide. My AI brain is being connected — very soon I'll answer in depth and bring history to life. For now, try dropping a photo of a monument or ruin.",
  chat_error:
    "Sorry, I couldn't reach the knowledge base right now. Please check that the API server is running and try again.",
};

const bg: Dict = {
  nav_gallery: "Галерия",
  nav_try: "Опитай",
  hero_badge: "AI водач за наследството",
  hero_beta: "Бета",
  hero_tagline: "Виж миналото. Говори с историята.",
  hero_subtitle:
    "Открийте скритото културно наследство на Свищов.",
  stat_sites: "Скритата история на Свищов",
  stat_recon: "AI реконструкции",
  stat_talk: "Говори с историята",
  scroll: "Превърти, за да откриеш",
  archive_eyebrow: "Исторически архив",
  archive_title: "Миналото, възстановено.",
  archive_subtitle:
    "Качи снимки от исторически книги и нека AI разкрие онова, което времето е скрило.",
  features_eyebrow: "Възможности",
  features_title: "Портал към миналото",
  features_subtitle:
    "Всяка снимка крие история, чакаща да бъде разкрита. Ето какво се случва, след като споделиш една.",
  f1_title: "AI разпознаване на наследство",
  f1_desc:
    "Качи снимка на написан обект от наследството на Свищов. AI го разпознава и веднага извлича богат исторически контекст.",
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
  chat_placeholder: "Питай за Свищов...",
  chat_drop: "Пусни снимка на наследството",
  chat_prompt1: "Как беше разпределено финансирането за гимназията?",
  chat_prompt2: "Кога беше пътуването на Волфганг?",
  chat_prompt3: "Кои бяха учителите през 1888 г.?",
  chat_reply_image:
    "Виждам снимката ти! За да анализирам изображение, отиди на страницата Разгледай — качи го там и ще го OCR, преведа и индексирам, за да можеш да го потърсиш тук.",
  chat_reply_text:
    "Благодаря за съобщението! Аз съм PokAI, твоят водач за наследството на Свищов. Скоро ще отговарям задълбочено и ще съживявам историята. Засега опитай да зададеш въпрос за Свищов.",
  chat_error:
    "Съжалявам, не успях да се свържа с базата знания. Провери дали API сървърът работи и опитай отново.",
};

const pl: Dict = {
  nav_gallery: "Galeria",
  nav_try: "Wypróbuj",
  hero_badge: "Przewodnik po dziedzictwie z AI",
  hero_beta: "Beta",
  hero_tagline: "Zobacz przeszłość. Porozmawiaj z historią.",
  hero_subtitle:
    "Odkryj ukryte dziedzictwo kulturowe Svishtova.",
  stat_sites: "Ukryta historia Svishtova",
  stat_recon: "Rekonstrukcje AI",
  stat_talk: "Rozmowa z historią",
  scroll: "Przewiń, aby odkryć",
  archive_eyebrow: "Archiwum historyczne",
  archive_title: "Przeszłość przywrócona.",
  archive_subtitle:
    "Prześlij zdjęcia z historycznych ksiąg i pozwól AI odkryć to, co czas zakrył.",
  features_eyebrow: "Możliwości",
  features_title: "Portal do przeszłości",
  features_subtitle:
    "Każde zdjęcie kryje historię czekającą na odkrycie. Oto, co dzieje się, gdy je udostępnisz.",
  f1_title: "Rozpoznawanie dziedzictwa AI",
  f1_desc:
    "Prześlij zdjęcie pisanego obiektu dziedzictwa ze Svishtova. AI rozpozna go i natychmiast przywoła bogaty kontekst historyczny.",
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
  chat_placeholder: "Zapytaj o cokolwiek związanego ze Svishtovem...",
  chat_drop: "Wrzuć zdjęcie dziedzictwa",
  chat_prompt1: "Jak rozdzielono fundusze na szkołę średnią?",
  chat_prompt2: "Kiedy odbyła się podróż Wolfganga?",
  chat_prompt3: "Kim byli nauczyciele w 1888 roku?",
  chat_reply_image:
    "Widzę Twoje zdjęcie! Aby przeanalizować obraz dziedzictwa, przejdź do strony Odkryj — prześlij go tam, a ja go OCR, przetłumaczę i zindeksuję, żebyś mógł zapytać o niego tutaj.",
  chat_reply_text:
    "Dziękuję za wiadomość! Jestem PokAI, Twój przewodnik po dziedzictwie Svishtova. Wkrótce będę odpowiadał szczegółowo i ożywiał historię. Na razie spróbuj zadać pytanie o Svishtov.",
  chat_error:
    "Przepraszam, nie mogłem teraz dotrzeć do bazy wiedzy. Sprawdź, czy serwer API działa, i spróbuj ponownie.",
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
