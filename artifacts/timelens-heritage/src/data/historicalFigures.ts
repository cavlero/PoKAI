export type HistoricalFigure = {
  id: string;
  name: string;
  title: string;
  period: string;
  recommendedFor: string[];
  intro: string;
  avatarInitials: string;
  avatarGradient: string;
  portraitUrl: string;
  suggestedQuestions: string[];
};

export const HISTORICAL_FIGURES: HistoricalFigure[] = [
  {
    id: "roman_soldier",
    name: "Marcus, Roman Legionary",
    title: "Soldier of Legio I Italica · Novae, 2nd Century AD",
    period: "Roman Empire · 2nd Century AD",
    recommendedFor: ["novae"],
    avatarInitials: "MR",
    avatarGradient: "from-[#5c2e0a] to-[#b5651d]",
    portraitUrl: "/portraits/roman_soldier.png",
    intro:
      "Salve, traveler. I am Marcus, a legionary soldier stationed at Novae on the Danube frontier. I have guarded this river for the glory of Rome and the safety of the province of Moesia. Many centuries have passed since my time — yet these stones still remember the footsteps of our legion. Ask me anything about life on the frontier, the Roman army, or the fortress that stood here.",
    suggestedQuestions: [
      "What was your daily life like?",
      "Who were your enemies?",
      "Tell me about the fortress",
    ],
  },
  {
    id: "ivan_asen",
    name: "Tsar Ivan Asen II",
    title: "Tsar of Bulgaria · 1218–1241",
    period: "13th Century",
    recommendedFor: ["tsarevets"],
    avatarInitials: "IA",
    avatarGradient: "from-[#7a3c0a] to-[#c9a227]",
    portraitUrl: "/portraits/ivan_asen.png",
    intro:
      "I am Tsar Ivan Asen II, sovereign of the Second Bulgarian Empire at its greatest height. From my seat at Tsarevets, I commanded armies that stretched from the Black Sea to the Adriatic. My reign brought peace, prosperity, and a Bulgarian empire that rivalled Byzantium itself. Ask me about my victories, my family, my faith, or the empire I built.",
    suggestedQuestions: [
      "What was your greatest victory?",
      "Tell me about your wives and family",
      "How powerful was your empire?",
    ],
  },
  {
    id: "khan_asparuh",
    name: "Khan Asparuh",
    title: "Founder of Bulgaria · 681 AD",
    period: "7th Century",
    recommendedFor: ["madara"],
    avatarInitials: "KA",
    avatarGradient: "from-[#1a3a5c] to-[#4a7fb5]",
    portraitUrl: "/portraits/khan_asparuh.png",
    intro:
      "I am Khan Asparuh, son of Kubrat, leader of the Bulgars. I crossed the great Danube River and forged an alliance with the seven Slavic tribes. Together we created a new nation — Bulgaria — recognized by Byzantium under the Treaty of 681. Ask me about the founding of Bulgaria, the Slavic alliance, or the battles that forged a nation.",
    suggestedQuestions: [
      "Why did you cross the Danube?",
      "How did you found Bulgaria?",
      "What does the Madara Rider mean?",
    ],
  },
  {
    id: "saint_ivan",
    name: "Saint Ivan of Rila",
    title: "Hermit Saint · Founder of Rila Monastery",
    period: "10th Century",
    recommendedFor: ["rila"],
    avatarInitials: "SI",
    avatarGradient: "from-[#1a3a1a] to-[#2d6a2d]",
    portraitUrl: "/portraits/saint_ivan.png",
    intro:
      "I am Ivan of Rila — a humble servant of God who left the world behind to seek truth in the silence of the mountains. I lived as a hermit in the Rila wilderness for many years, sleeping in a cave, eating only roots and herbs. Disciples found me and would not leave. From that small community, the monastery grew — and it has sheltered the soul of Bulgaria ever since.",
    suggestedQuestions: [
      "Why did you become a hermit?",
      "What is the meaning of the monastery?",
      "How do you find peace in solitude?",
    ],
  },
  {
    id: "paisii",
    name: "Paisii Hilendarski",
    title: "Monk & National Awakener · 1762",
    period: "18th Century",
    recommendedFor: ["buzludzha"],
    avatarInitials: "PH",
    avatarGradient: "from-[#3a1a5c] to-[#7a3fb5]",
    portraitUrl: "/portraits/paisii.png",
    intro:
      "I am Paisii Hilendarski — a Bulgarian monk who walked the length of the Balkans, searching the archives of the great monasteries for records of our forgotten history. My Slavo-Bulgarian History, written in 1762, was the spark that lit the flame of the Bulgarian National Revival. I wrote it for young Bulgarians who had forgotten who they were.",
    suggestedQuestions: [
      "Why did you write your history?",
      "What does it mean to be Bulgarian?",
      "Tell me about the Ottoman period",
    ],
  },
  {
    id: "byzantine_chronicler",
    name: "Eudokimos the Chronicler",
    title: "Byzantine Historian of Messembria",
    period: "12th Century",
    recommendedFor: ["nessebar"],
    avatarInitials: "EC",
    avatarGradient: "from-[#5c3a1a] to-[#b57f3f]",
    portraitUrl: "/portraits/byzantine_chronicler.png",
    intro:
      "I am Eudokimos, a chronicler of the great city of Messembria — which you call Nessebar. I have spent my life recording the history of this extraordinary peninsula, where Greek colonists, Roman legions, Byzantine emperors, and Bulgarian tsars have all left their mark. Three thousand years of history are compressed into this tiny rocky point reaching into the Black Sea.",
    suggestedQuestions: [
      "How old is this city really?",
      "Why are there so many churches?",
      "What was the city like at its peak?",
    ],
  },
];

export function getRecommendedFigure(monumentId: string): HistoricalFigure {
  const match = HISTORICAL_FIGURES.find((f) => f.recommendedFor.includes(monumentId));
  return match ?? HISTORICAL_FIGURES[0];
}
