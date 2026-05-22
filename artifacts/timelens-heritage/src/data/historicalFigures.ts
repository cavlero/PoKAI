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
  responses: Record<string, string>;
};

export const HISTORICAL_FIGURES: HistoricalFigure[] = [
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
      "I am Tsar Ivan Asen II, sovereign of the Second Bulgarian Empire at its greatest height. From my seat at Tsarevets, I commanded armies that stretched from the Black Sea to the Adriatic. My reign brought peace, prosperity, and a Bulgarian empire that rivalled Byzantium itself.",
    suggestedQuestions: [
      "Tell me about your greatest victory.",
      "What was life like inside the fortress?",
      "How powerful was your empire?",
    ],
    responses: {
      "Tell me about your greatest victory.":
        "Ah, the Battle of Klokotnitsa in 1230! My forces met the army of the Despotate of Epirus — once the greatest power in the Balkans. With God's favour and the courage of my Bulgarian warriors, we crushed them utterly. Their ruler Theodore Komnenos was captured. In a single day, I became the most powerful ruler between the Adriatic and the Black Sea. Do you understand what that means, young one? An empire reborn.",
      "What was life like inside the fortress?":
        "Tsarevets was a city within a city. The royal palace rose at the summit — its halls filled with Byzantine merchants, envoys from Hungary, Venetian traders, and monks from the Holy Land. Below the palace hill, thousands lived within the walls — craftsmen, soldiers, priests, and scholars. The bells of our great churches rang across the valley of the Yantra day and night. It was not merely a fortress. It was the beating heart of a civilization.",
      "How powerful was your empire?":
        "At its peak, Bulgaria controlled lands from Belgrade to the Black Sea, from the Danube to the Aegean. I struck coins of pure silver. I built churches in every city. I signed treaties as an equal with Byzantium, Hungary, and the Latin Empire. My daughter Elena sat on the throne of Constantinople as Empress. Do not let anyone tell you Bulgaria was ever a small nation — in my time, we were among the greatest powers in all of Europe.",
      "default":
        "A worthy question for a sovereign to consider! I have ruled over vast lands and witnessed both glory and sorrow within these walls. Ask me what you truly wish to know — about my campaigns, my court, my faith, or the rise and fall of the empire I loved above all else. I am listening.",
    },
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
      "I am Khan Asparuh, son of Kubrat, leader of the Bulgars. I crossed the great Danube River and forged an alliance with the seven Slavic tribes. Together we created a new nation — Bulgaria — recognized by Byzantium under the Treaty of 681. The Madara Rider is carved in stone as testament to the eternal triumph of our people.",
    suggestedQuestions: [
      "Why did you cross the Danube?",
      "What does the Madara Rider mean to you?",
      "How did you found Bulgaria?",
    ],
    responses: {
      "Why did you cross the Danube?":
        "After my father Kubrat died, the Khazar threat from the east became unbearable. My brothers scattered across the steppes. I led my people westward — through the wild lands beyond the Carpathians, across the mighty Danube — searching for land where we could build something permanent, something that would not be swept away by the next wave of conquerors. I found such land between the Danube and the Balkan Mountains. I found our home.",
      "What does the Madara Rider mean to you?":
        "The Madara Rider is not merely a carving in stone — it is a declaration to the world. The horseman rides in eternal triumph, his spear thrust through the lion at his feet. The eagle soars above him. That horseman represents our victory over every enemy who sought to destroy us. When my successors carved those images into the living cliff face, they were saying to all of history: we are here, we are strong, and we will endure. Thirteen centuries later, that image is still on the coins of Bulgaria. Were we not right?",
      "How did you found Bulgaria?":
        "I did not found Bulgaria alone — no great nation is built by one man. I brought together the Bulgar horsemen — warriors of the steppe, fierce and disciplined — with the Slavic farming tribes who already lived south of the Danube. We were different peoples but we shared a common enemy and a common dream. When the Byzantine Emperor Constantine IV attacked us in 680, we defeated him so decisively that he had no choice but to sign a treaty and pay us annual tribute. That treaty was signed in 681. That year was the birth of Bulgaria.",
      "default":
        "You ask questions across thirteen centuries — and I answer from beyond the veil of time. I have ridden across countless plains, fought beneath the open sky, and built a nation from nothing but courage and determination. Whatever you wish to know about the birth of Bulgaria, the life of the Bulgars, or what it means to forge a nation from the wilderness — ask freely. A warrior has no patience for silence.",
    },
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
    responses: {
      "Why did you become a hermit?":
        "The world is full of noise, young friend — ambitions, possessions, the endless scrambling of men over one another. I looked at all of it and felt a great emptiness. What did any of it mean when weighed against eternity? So I walked away. Into the forests. Up into the mountains. I was perhaps twenty years old. I did not seek fame or followers — I sought only God. But God, it seems, had other plans for this sinner. People followed anyway, and I could not turn away those who genuinely sought the truth.",
      "What is the meaning of the monastery?":
        "This monastery is many things to many people — a place of prayer, of learning, of art, of refuge. But in its deepest meaning, it is a lighthouse in the darkness. For five hundred years when Bulgaria had no king, no patriarch, no freedom — the monastery stood. Here the Bulgarian language was preserved, the Bulgarian stories were written down and recopied, the Bulgarian spirit was kept alive like an ember that refuses to go out. I did not plan to build a fortress of culture. I only wanted to pray. But God turned my humble cave into something far greater than I could have imagined.",
      "How do you find peace in solitude?":
        "Sit quietly for a moment — truly quietly — and listen. You will hear the wind in the pine trees, the distant sound of water, perhaps a bird. Now go deeper. Beneath the sounds, there is silence. And in that silence, if your heart is open, you will find what you are looking for. Solitude is not loneliness. Loneliness is a hunger for distraction. Solitude is a hunger for truth. In a thousand years, the mountains have not changed. They still offer the same peace to anyone willing to climb.",
      "default":
        "Come, rest a moment. In these sacred mountains, there is no rush. Whatever question weighs upon your heart — about faith, about meaning, about why any of this history matters to a young person living in a world so very different from mine — speak it honestly and I will answer as best I can. This old hermit has had many years to think.",
    },
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
      "I am Paisii Hilendarski — a Bulgarian monk who walked the length of the Balkans, searching the archives of the great monasteries for records of our forgotten history. My 'Slavo-Bulgarian History', written in 1762, was the spark that lit the flame of the Bulgarian National Revival. I wrote it for you — for young Bulgarians who had forgotten who they were.",
    suggestedQuestions: [
      "Why did you write your history?",
      "What does it mean to be Bulgarian?",
      "Are you proud of modern Bulgaria?",
    ],
    responses: {
      "Why did you write your history?":
        "Because I was furious! I travelled through Bulgarian lands and saw my people ashamed of themselves — ashamed to speak their own language, ashamed to call themselves Bulgarian. The Greeks mocked us. Some of our own people had begun calling themselves Greek or Serbian. I went to the Hilendar Monastery on Mount Athos, I searched the old chronicles, and I found the truth: Bulgaria had been a mighty empire. Our tsars had ruled over vast lands. Our saints had created an alphabet used across the Slavic world. How dare we be ashamed of this? So I wrote it down. I wrote it in the Bulgarian language — not Greek, not Church Slavonic — so that every Bulgarian could read it. I am not a great writer. But the truth does not need beautiful words.",
      "What does it mean to be Bulgarian?":
        "O reader — why are you ashamed to call yourself Bulgarian? This is the question I asked then, and I ask it still. To be Bulgarian is to carry within yourself 1,300 years of history — the blood of warriors, saints, scholars, and farmers who survived everything history threw at them. Invasions, conquests, empires rising and falling. And yet we speak our language still. We sing our songs still. To be Bulgarian is to refuse to be forgotten. That has always been what we are.",
      "Are you proud of modern Bulgaria?":
        "You ask a monk who died in 1798 about the year you live in — this is a strange conversation indeed! But I will tell you: I am proud that Bulgaria exists. I am proud of the musicians and writers and scientists who carry our name. But I am troubled, as I was troubled in my own time, when I see young Bulgarians who do not know their own history, who do not know the sacrifices made for their freedom. Read. Learn. Carry your history like armour, not like a burden. That is all I ever asked.",
      "default":
        "Every question about Bulgaria's history matters to me — because that history was nearly lost, and I spent my life trying to recover it. Whether you ask about the National Revival, the Ottoman period, the great Bulgarian saints, or simply what it means to be part of a culture that nearly vanished — I will speak honestly. I have never been afraid to say what I believe, and I am not going to start now.",
    },
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
      "What was the city like at its peak?",
      "Why are there so many churches?",
    ],
    responses: {
      "How old is this city really?":
        "Older than you can easily imagine. The Thracian tribe called the Mendi settled this rocky peninsula more than 3,200 years ago — before Rome existed, before Alexander the Great, before the Parthenon was built. Greek colonists from Megara arrived around 510 BC and named it Messembria — meaning 'city of Menas' in the old Thracian tongue. Every civilization that has passed through the eastern Mediterranean has touched this city: Thracian, Greek, Macedonian, Roman, Byzantine, Bulgarian, Ottoman. The stones beneath your feet have heard prayers in six languages spanning thirty centuries.",
      "What was the city like at its peak?":
        "In the 5th and 6th centuries, during the great Byzantine age, Messembria was a thriving port city of perhaps ten thousand souls. The harbour was full of trading ships from Constantinople, Alexandria, and Antioch. Our markets sold silk from China, spices from Persia, amber from the Baltic — all of this on a peninsula barely half a kilometre across! The skyline was crowded with church domes. The streets were paved. It was, in miniature, a city that rivalled many capitals of its time.",
      "Why are there so many churches?":
        "Forty churches! On a peninsula barely large enough for a few thousand people. Even I, who have documented them all, find this extraordinary. The answer is complex: Messembria was wealthy, and wealthy cities build churches to display their prosperity and piety. Also, many were built by Byzantine noble families as private chapels — each family wanted their own place of worship. And for centuries, whenever a new ruler took the city, they built a new church to mark their arrival. Bulgarian Tsars, Byzantine Emperors, all left their devotion carved in stone. The result is the most remarkable concentration of Christian architecture in the entire Balkans.",
      "default":
        "You walk in a city that has witnessed more history than most nations. Ask me anything about Messembria's Thracian origins, its Greek golden age, the Byzantine centuries, the Bulgarian conquests, or the architectural wonders that somehow survived all of it. A chronicler's life work is to answer exactly these questions. I have been waiting for someone curious enough to ask.",
    },
  },
];

export function getRecommendedFigure(monumentId: string): HistoricalFigure {
  const match = HISTORICAL_FIGURES.find((f) => f.recommendedFor.includes(monumentId));
  return match ?? HISTORICAL_FIGURES[0];
}
