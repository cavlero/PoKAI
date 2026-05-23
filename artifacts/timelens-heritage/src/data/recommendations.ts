export type RecItem = {
  title: string;
  description: string;
  source: string;
  imageUrl: string;
  link: string;
};

export type QuizQuestion = {
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
};

export type BadgeLevel = {
  title: string;
  subtitle: string;
  tier: "gold" | "silver" | "bronze" | "basic";
};

export type MonumentLearning = {
  videos: RecItem[];
  books: RecItem[];
  articles: RecItem[];
  quiz: QuizQuestion[];
  badges: [BadgeLevel, BadgeLevel, BadgeLevel, BadgeLevel];
};

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=600&h=338&fit=crop&q=80&auto=format`;

const IMG = {
  colosseum: u("1552832230-c0197dd311b5"),
  arch:      u("1569949381669-ecf31ae8e613"),
  ruins:     u("1508193638397-1c4234db14d8"),
  castle:    u("1548247416-ec66f4900b2e"),
  castle2:   u("1565799557186-1e5c9c92bead"),
  mountain:  u("1515859005217-8a1f08870f59"),
  peaks:     u("1506905925346-21bda4d32df4"),
  steppe:    u("1505118380757-91f5f5632de0"),
  oldcity:   u("1553614731-4d5fd4a08bff"),
  ruins2:    u("1555993539-1732b0258235"),
  books:     u("1521587760476-6c12a4b040da"),
  library:   u("1481627834876-b7833e8f5570"),
  stacked:   u("1544947950-fa07a98d237f"),
};

export const LEARNING: Record<string, MonumentLearning> = {
  novae: {
    videos: [
      {
        title: "Inside a Roman Legionary Fortress",
        description: "A full reconstruction of daily life inside a 2nd-century Roman legionary fortress — drills, feasts, religion, and the constant watch over the Danube.",
        source: "YouTube · Invicta",
        imageUrl: IMG.colosseum,
        link: "https://www.youtube.com/results?search_query=roman+legionary+fortress+daily+life+invicta",
      },
      {
        title: "Rome's Danube Frontier — The Limes",
        description: "How the Roman Empire built and manned its longest land border: watchtowers, patrol boats, and the legions that held the line for three centuries.",
        source: "YouTube · Kings and Generals",
        imageUrl: IMG.arch,
        link: "https://www.youtube.com/results?search_query=roman+danube+frontier+limes+kings+and+generals",
      },
      {
        title: "Legio I Italica: Novae's Permanent Legion",
        description: "The history of the First Italian Legion, raised by Nero and permanently stationed at Novae — one of the best-documented legions of the imperial frontier.",
        source: "YouTube · HistoryMarche",
        imageUrl: IMG.ruins,
        link: "https://www.youtube.com/results?search_query=legio+i+italica+roman+legion+danube",
      },
    ],
    books: [
      {
        title: "SPQR: A History of Ancient Rome",
        description: "Mary Beard's landmark popular history of Rome — who Romans really were, how they lived, and what their empire actually meant for the people inside it.",
        source: "Goodreads · Mary Beard, 2015",
        imageUrl: IMG.books,
        link: "https://www.goodreads.com/book/show/23330137-spqr",
      },
      {
        title: "The Complete Roman Army",
        description: "Adrian Goldsworthy's comprehensive illustrated guide to the structure, equipment, tactics, and daily life of the Roman military from Republic to Late Empire.",
        source: "Google Books · Adrian Goldsworthy",
        imageUrl: IMG.library,
        link: "https://books.google.com/books?q=complete+roman+army+goldsworthy+thames+hudson",
      },
      {
        title: "The Fall of the Roman Empire",
        description: "Peter Heather traces Rome's final century — the barbarian migrations across the very Danubian frontier that Novae was built to defend.",
        source: "Goodreads · Peter Heather, 2006",
        imageUrl: IMG.stacked,
        link: "https://www.goodreads.com/book/show/60684.The_Fall_of_the_Roman_Empire",
      },
    ],
    articles: [
      {
        title: "Novae — Roman Legionary Fortress",
        description: "Wikipedia's comprehensive article on the archaeological site, its excavation history, and the remains that make Novae one of the best-studied Roman fortresses in Bulgaria.",
        source: "Wikipedia",
        imageUrl: IMG.colosseum,
        link: "https://en.wikipedia.org/wiki/Novae_(city)",
      },
      {
        title: "Legio I Italica",
        description: "The full history and movements of the First Italian Legion — its founding by Nero, its long tenure at Novae, and its role defending the Danube frontier for over two centuries.",
        source: "Wikipedia",
        imageUrl: IMG.ruins,
        link: "https://en.wikipedia.org/wiki/Legio_I_Italica",
      },
      {
        title: "Moesia — Roman Province on the Danube",
        description: "Britannica's detailed overview of the Roman province of Moesia, its strategic importance, its governors, and the military campaigns fought along its borders.",
        source: "Britannica",
        imageUrl: IMG.arch,
        link: "https://www.britannica.com/place/Moesia",
      },
    ],
    quiz: [
      {
        question: "Which Roman legion was permanently stationed at Novae as its primary garrison?",
        options: ["Legio VII Claudia", "Legio V Macedonica", "Legio I Italica", "Legio XI Claudia"],
        correctIndex: 2,
        explanation: "Legio I Italica (the First Italian Legion) was raised by Emperor Nero from Italian citizens and became the permanent garrison of Novae. Its soldiers were later joined by recruits from across the empire — Syrians, Thracians, and men from Britain.",
      },
      {
        question: "Novae was located in which Roman province?",
        options: ["Pannonia Superior", "Dacia", "Britannia", "Moesia Inferior"],
        correctIndex: 3,
        explanation: "Novae sat in Moesia Inferior — the lower portion of the Moesian province along the Danube's southern bank, corresponding roughly to northern Bulgaria today.",
      },
      {
        question: "Which Germanic people posed the greatest military threat to Novae during the 3rd century?",
        options: ["The Franks", "The Vandals", "The Goths", "The Saxons"],
        correctIndex: 2,
        explanation: "The Goths mounted devastating incursions across the Danube throughout the 3rd century. In 251 AD, Emperor Decius was killed fighting them near this region — the first Roman emperor to fall in battle against a foreign enemy.",
      },
      {
        question: "What was the approximate size of a fully-staffed Roman legion like those stationed at Novae?",
        options: ["1,000–2,000 soldiers", "5,000–6,000 soldiers", "12,000–15,000 soldiers", "500 elite soldiers"],
        correctIndex: 1,
        explanation: "A standard imperial Roman legion consisted of approximately 5,000 to 6,000 men, organized into 10 cohorts. The first cohort was double-strength — making it the most prestigious unit.",
      },
      {
        question: "Which famous physician influenced the military hospitals found at fortresses like Novae?",
        options: ["Hippocrates of Cos", "Galen of Pergamon", "Avicenna", "Dioscorides"],
        correctIndex: 1,
        explanation: "Galen of Pergamon served as physician to Roman gladiators and later to Emperor Marcus Aurelius, significantly advancing military medicine. The valetudinarium (military hospital) at Novae reflects the medical knowledge Galen helped systematize.",
      },
    ],
    badges: [
      { title: "Roman Recruit",  subtitle: "You've taken your first steps into the Roman world. Keep exploring!", tier: "basic"  },
      { title: "Roman Scholar",  subtitle: "A solid understanding of the Danube frontier and its legions.",         tier: "bronze" },
      { title: "Roman Explorer", subtitle: "You know Novae and the Roman world impressively well.",                 tier: "silver" },
      { title: "Roman Legate",   subtitle: "An outstanding command of Roman frontier history. The legion would promote you.", tier: "gold" },
    ],
  },

  tsarevets: {
    videos: [
      {
        title: "Tsarevets Fortress — Medieval Bulgarian Capital",
        description: "A full tour of Bulgaria's most dramatic medieval fortress — the royal palace, the Patriarchal Cathedral, and the story of how a hill above the Yantra River became the centre of an empire.",
        source: "YouTube · Visit Bulgaria",
        imageUrl: IMG.castle,
        link: "https://www.youtube.com/results?search_query=tsarevets+fortress+tour+veliko+tarnovo",
      },
      {
        title: "The Second Bulgarian Empire: Rise and Fall",
        description: "From the 1185 rebellion of Brothers Asen and Peter to the Ottoman siege of 1393 — the full arc of medieval Bulgaria's greatest age, told through its fortresses and tsars.",
        source: "YouTube · Kings and Generals",
        imageUrl: IMG.castle2,
        link: "https://www.youtube.com/results?search_query=second+bulgarian+empire+rise+fall+history",
      },
      {
        title: "Ivan Asen II: Bulgaria's Most Powerful Tsar",
        description: "The life and campaigns of the tsar who made Bulgaria the dominant Balkan power — his victory at Klokotnitsa, his religious diplomacy, and his legacy.",
        source: "YouTube · HistoryMarche",
        imageUrl: IMG.castle,
        link: "https://www.youtube.com/results?search_query=ivan+asen+ii+medieval+bulgaria+history",
      },
    ],
    books: [
      {
        title: "The Medieval Balkans",
        description: "The definitive English-language history of the Balkans from 500 to 1500 — Bulgaria, Serbia, Byzantium, and the Ottoman advance, by the leading Western scholar of the region.",
        source: "Goodreads · John V.A. Fine Jr., 1987",
        imageUrl: IMG.books,
        link: "https://www.goodreads.com/book/show/776126.The_Medieval_Balkans",
      },
      {
        title: "A History of the First Bulgarian Empire",
        description: "Steven Runciman's classic account from Asparuh's founding to the Byzantine conquest — the definitive English work on early and medieval Bulgarian history.",
        source: "Internet Archive · Steven Runciman",
        imageUrl: IMG.library,
        link: "https://archive.org/search?query=runciman+history+first+bulgarian+empire",
      },
      {
        title: "Byzantium: The Surprising Life of a Medieval Empire",
        description: "Judith Herrin's brilliant overview of Byzantium — the empire that Bulgaria both rivalled and was shaped by throughout its medieval golden age.",
        source: "Goodreads · Judith Herrin, 2007",
        imageUrl: IMG.stacked,
        link: "https://www.goodreads.com/book/show/2294553.Byzantium",
      },
    ],
    articles: [
      {
        title: "Tsarevets Fortress",
        description: "Wikipedia's detailed article covering the fortress's architecture, its role as the medieval Bulgarian capital, the 1393 Ottoman siege, and the modern Sound and Light show.",
        source: "Wikipedia",
        imageUrl: IMG.castle,
        link: "https://en.wikipedia.org/wiki/Tsarevets_fortress",
      },
      {
        title: "Second Bulgarian Empire",
        description: "Britannica's overview of the medieval Bulgarian state from 1185 to 1396 — its dynasty, its culture, its church, and the Ottoman conquest that ended five centuries of Bulgarian statehood.",
        source: "Britannica",
        imageUrl: IMG.castle2,
        link: "https://www.britannica.com/place/Bulgaria/The-second-Bulgarian-empire",
      },
      {
        title: "Ivan Asen II of Bulgaria",
        description: "The Wikipedia entry on Bulgaria's greatest medieval tsar — his military victories, his expansion of Bulgarian territory across the Balkans, and his ecclesiastical achievements.",
        source: "Wikipedia",
        imageUrl: IMG.ruins,
        link: "https://en.wikipedia.org/wiki/Ivan_Asen_II",
      },
    ],
    quiz: [
      {
        question: "What was the name of Ivan Asen II's most decisive military victory, fought in 1230 AD?",
        options: ["Battle of Anchialos", "Battle of Adrianople", "Battle of Klokotnitsa", "Battle of the Maritsa"],
        correctIndex: 2,
        explanation: "At the Battle of Klokotnitsa (March 1230), Ivan Asen II utterly defeated Theodore Komnenos of Epirus, who had claimed the title of Emperor. Theodore was captured and blinded. In one afternoon, Bulgaria became the dominant Balkan power.",
      },
      {
        question: "The Second Bulgarian Empire was founded in 1185 following a rebellion against which empire?",
        options: ["The Ottoman Empire", "The Holy Roman Empire", "The Byzantine Empire", "The Latin Empire"],
        correctIndex: 2,
        explanation: "Brothers Asen and Peter led the Bulgarian uprising of 1185-86 against Byzantine domination, establishing the Second Bulgarian Empire with Tarnovo as its capital.",
      },
      {
        question: "What major achievement for the Bulgarian Church did Ivan Asen II secure after Klokotnitsa?",
        options: ["Construction of Sofia Cathedral", "Recognition of an independent Bulgarian Patriarchate", "Conversion of Bulgaria to Catholicism", "Alliance with the Pope"],
        correctIndex: 1,
        explanation: "Leveraging his military supremacy, Ivan Asen II secured recognition of the Tarnovo Patriarchate, giving the Bulgarian Orthodox Church full independence from Constantinople.",
      },
      {
        question: "The Tsarevets hill is surrounded on three sides by which river?",
        options: ["The Danube", "The Maritsa", "The Iskar", "The Yantra"],
        correctIndex: 3,
        explanation: "The Yantra River forms a natural defensive moat around three sides of Tsarevets Hill, making it one of medieval Bulgaria's most naturally fortified positions.",
      },
      {
        question: "In which year did the Second Bulgarian Empire fall to Ottoman forces after a three-month siege?",
        options: ["1242", "1330", "1393", "1453"],
        correctIndex: 2,
        explanation: "After a three-month siege in 1393, Ottoman forces under Sultan Bayezid I captured Tarnovo and ended the Second Bulgarian Empire, beginning nearly 500 years of Ottoman rule.",
      },
    ],
    badges: [
      { title: "Village Visitor",    subtitle: "A first glimpse into medieval Bulgaria. Much more to discover.",    tier: "basic"  },
      { title: "Court Scribe",       subtitle: "Growing knowledge of Bulgaria's golden medieval age.",               tier: "bronze" },
      { title: "Medieval Historian", subtitle: "You know the Second Bulgarian Empire and its rulers well.",          tier: "silver" },
      { title: "Bulgarian Tsar",     subtitle: "Mastery of medieval Bulgarian history worthy of Tsarevets itself.", tier: "gold"   },
    ],
  },

  rila: {
    videos: [
      {
        title: "Rila Monastery — Bulgaria's Spiritual Heart",
        description: "A beautiful visual tour of the monastery complex — its frescoed cloisters, the Tower of Hrelyu, the icon museum, and the mountain wilderness that surrounds it.",
        source: "YouTube · National Geographic",
        imageUrl: IMG.mountain,
        link: "https://www.youtube.com/results?search_query=rila+monastery+tour+national+geographic",
      },
      {
        title: "Saint Ivan of Rila: The Hermit Who Started It All",
        description: "The life of the 10th-century monk who withdrew to the Rila Mountains, lived in a cave, and whose solitary example inspired the monastery that has stood for over 1,000 years.",
        source: "YouTube · Orthodox History",
        imageUrl: IMG.peaks,
        link: "https://www.youtube.com/results?search_query=saint+ivan+rila+hermit+monastery+history",
      },
      {
        title: "The Frescoes of Rila Monastery",
        description: "An art history deep dive into the monastery's extraordinary 19th-century frescoes — over 1,200 scenes covering every surface of the arcade, painted by National Revival masters.",
        source: "YouTube · Khan Academy",
        imageUrl: IMG.mountain,
        link: "https://www.youtube.com/results?search_query=rila+monastery+frescoes+art+history",
      },
    ],
    books: [
      {
        title: "The Desert Fathers: Sayings of the Early Christian Monks",
        description: "The foundational texts of Christian monasticism — the wisdom of Egypt's hermit saints whose tradition directly inspired Ivan of Rila's way of life in the Bulgarian mountains.",
        source: "Project Gutenberg · Trans. Benedicta Ward",
        imageUrl: IMG.books,
        link: "https://www.gutenberg.org/ebooks/search/?query=desert+fathers+monks",
      },
      {
        title: "A History of the Orthodox Church",
        description: "Timothy Ware's classic introduction to Eastern Orthodox Christianity — its theology, its history, and its monastic tradition that produced saints like Ivan of Rila.",
        source: "Goodreads · Timothy Ware",
        imageUrl: IMG.library,
        link: "https://www.goodreads.com/book/show/481604.The_Orthodox_Church",
      },
      {
        title: "Bulgaria: Portrait of a Country",
        description: "A rich cultural and historical portrait of Bulgaria — its landscapes, its Orthodox heritage, its monasteries, and the centuries of history that shaped the nation.",
        source: "Google Books",
        imageUrl: IMG.stacked,
        link: "https://books.google.com/books?q=bulgaria+history+orthodox+heritage",
      },
    ],
    articles: [
      {
        title: "Rila Monastery — UNESCO World Heritage",
        description: "The official UNESCO World Heritage listing for Rila Monastery — explaining why this mountain complex was recognised as a site of outstanding universal value.",
        source: "UNESCO",
        imageUrl: IMG.mountain,
        link: "https://whc.unesco.org/en/list/216",
      },
      {
        title: "Saint Ivan of Rila",
        description: "Wikipedia's detailed article on the life, miracles, and legacy of Bulgaria's patron saint — the hermit whose cave in the Rila Mountains became a pilgrimage destination.",
        source: "Wikipedia",
        imageUrl: IMG.peaks,
        link: "https://en.wikipedia.org/wiki/Saint_Ivan_of_Rila",
      },
      {
        title: "Rila Monastery",
        description: "Britannica's article covering the monastery's founding, its architectural history, its destruction and rebuilding, and its role as the spiritual centre of Bulgarian culture.",
        source: "Britannica",
        imageUrl: IMG.mountain,
        link: "https://www.britannica.com/topic/Rila-Monastery",
      },
    ],
    quiz: [
      {
        question: "In which century did Saint Ivan of Rila establish his hermitage in the Rila Mountains?",
        options: ["7th Century (600s)", "10th Century (900s)", "12th Century (1100s)", "14th Century (1300s)"],
        correctIndex: 1,
        explanation: "Saint Ivan of Rila (876–946 AD) established his hermitage during the 10th century. He lived as a solitary monk in a cave before disciples gathered around him to form the earliest monastic community.",
      },
      {
        question: "What crucial cultural role did Rila Monastery play during five centuries of Ottoman rule?",
        options: ["Minting Bulgarian coins", "Training military commanders", "Preserving Bulgarian language, literacy, and cultural identity", "Serving as a trade depot"],
        correctIndex: 2,
        explanation: "During Ottoman rule, Rila Monastery served as a crucial refuge for Bulgarian culture. Monks copied manuscripts, maintained literacy, and preserved Bulgarian historical memory when it was suppressed in wider society.",
      },
      {
        question: "In which year was Rila Monastery inscribed on the UNESCO World Heritage List?",
        options: ["1971", "1983", "1995", "2003"],
        correctIndex: 1,
        explanation: "Rila Monastery was inscribed on the UNESCO World Heritage List in 1983, recognized for its National Revival architecture masterpieces and its millennium-long role as Bulgaria's spiritual and cultural heart.",
      },
      {
        question: "Which Bulgarian Tsar reportedly sought a meeting with Saint Ivan during the saint's lifetime?",
        options: ["Tsar Boris I", "Tsar Simeon the Great", "Tsar Peter I", "Tsar Ivan Asen II"],
        correctIndex: 2,
        explanation: "Tsar Peter I of Bulgaria (927–969 AD) reportedly attempted to meet Saint Ivan of Rila. Ivan declined the meeting but sent a letter of spiritual counsel to the Tsar — a testament to his spiritual authority.",
      },
      {
        question: "Most of Rila Monastery's current buildings date from which period, following the 1833 fire?",
        options: ["Medieval period, 14th century", "Ottoman reconstruction, 16th century", "Bulgarian National Revival, 19th century", "Modern restoration, 20th century"],
        correctIndex: 2,
        explanation: "Most current buildings date from the Bulgarian National Revival of the 19th century, rebuilt after the 1833 fire by master builders Alexi Rilets and Pavel Ivanovich — considered a masterpiece of National Revival architecture.",
      },
    ],
    badges: [
      { title: "Mountain Wanderer",  subtitle: "A first step into Bulgaria's sacred mountain. Continue climbing.",      tier: "basic"  },
      { title: "Chapel Keeper",      subtitle: "Growing understanding of Rila's spiritual and cultural significance.",   tier: "bronze" },
      { title: "Monastery Scholar",  subtitle: "You understand deeply what Rila means to Bulgarian history.",            tier: "silver" },
      { title: "Saint's Disciple",   subtitle: "Exceptional mastery of Rila Monastery's thousand-year history.",        tier: "gold"   },
    ],
  },

  nessebar: {
    videos: [
      {
        title: "Ancient Nessebar — 3,000 Years of History",
        description: "A panoramic history of the UNESCO World Heritage city — from Thracian founders and Greek colonists through Byzantine churches, Bulgarian tsars, and Ottoman merchants.",
        source: "YouTube · National Geographic",
        imageUrl: IMG.arch,
        link: "https://www.youtube.com/results?search_query=nessebar+ancient+city+history+3000+years",
      },
      {
        title: "The Byzantine Churches of Nessebar",
        description: "A walking tour of the city's extraordinary concentration of medieval churches — their architectural styles, their frescoes, and why this tiny peninsula holds so many.",
        source: "YouTube · Byzantine Heritage",
        imageUrl: IMG.ruins,
        link: "https://www.youtube.com/results?search_query=nessebar+byzantine+churches+tour+black+sea",
      },
      {
        title: "Messembria: Ancient Greek Colony on the Black Sea",
        description: "The story of the Megarian colonists who founded Messembria around 510 BC — how they built a prosperous city and left coins, pottery, and architecture that survive to this day.",
        source: "YouTube · HistoryMarche",
        imageUrl: IMG.colosseum,
        link: "https://www.youtube.com/results?search_query=messembria+ancient+greek+colony+black+sea",
      },
    ],
    books: [
      {
        title: "Byzantium: The Surprising Life of a Medieval Empire",
        description: "Judith Herrin's essential introduction to Byzantine civilization — the empire that built most of Nessebar's churches and shaped the Black Sea coast for a thousand years.",
        source: "Goodreads · Judith Herrin, 2007",
        imageUrl: IMG.books,
        link: "https://www.goodreads.com/book/show/2294553.Byzantium",
      },
      {
        title: "The Black Sea: A History",
        description: "Neal Ascherson's brilliant history of the Black Sea world — the civilizations, trade routes, and cultural encounters along the shore where Messembria has watched for 3,000 years.",
        source: "Goodreads · Neal Ascherson, 1995",
        imageUrl: IMG.library,
        link: "https://www.goodreads.com/book/show/185613.Black_Sea",
      },
      {
        title: "The Thracians",
        description: "R.F. Hoddinott's definitive account of Thracian civilization — the people who founded Messembria and left a cultural imprint on the city long before Greek colonists arrived.",
        source: "Goodreads · R.F. Hoddinott",
        imageUrl: IMG.stacked,
        link: "https://www.goodreads.com/book/show/3228456.The_Thracians",
      },
    ],
    articles: [
      {
        title: "Old Nessebar — UNESCO World Heritage Site",
        description: "The official UNESCO listing for Nessebar — explaining how this tiny Black Sea peninsula earned World Heritage status for its extraordinary concentration of monuments from multiple civilizations.",
        source: "UNESCO",
        imageUrl: IMG.arch,
        link: "https://whc.unesco.org/en/list/217",
      },
      {
        title: "Nessebar",
        description: "Wikipedia's comprehensive article on the city's 3,000-year history — Thracian origins, Greek colonization, Roman conquest, Byzantine prosperity, Bulgarian rule, and Ottoman heritage.",
        source: "Wikipedia",
        imageUrl: IMG.ruins,
        link: "https://en.wikipedia.org/wiki/Nessebar",
      },
      {
        title: "Mesembria — Ancient Greek City on the Black Sea",
        description: "Britannica's article on the ancient city, covering its founding, its role in Black Sea trade, and its transition through Roman, Byzantine, and Bulgarian rule over three millennia.",
        source: "Britannica",
        imageUrl: IMG.colosseum,
        link: "https://www.britannica.com/place/Nessebar",
      },
    ],
    quiz: [
      {
        question: "What was the ancient Thracian and Greek name for the city now known as Nessebar?",
        options: ["Anchialos", "Apollonia Pontica", "Messembria", "Odessos"],
        correctIndex: 2,
        explanation: "The city was known as Messembria to both its Thracian founders and the Greek colonists who arrived around 510 BC. It became Nessebar under Ottoman administration.",
      },
      {
        question: "Greek colonists from which city founded Messembria around 510 BC?",
        options: ["Athens", "Corinth", "Miletus", "Megara"],
        correctIndex: 3,
        explanation: "Colonists from Megara — situated between Athens and Corinth — founded Messembria around 510 BC. Megara was a prolific founder of Black Sea colonies.",
      },
      {
        question: "Approximately how many medieval churches does Nessebar contain?",
        options: ["About 10", "About 20", "About 40", "About 80"],
        correctIndex: 2,
        explanation: "Nessebar contains approximately 40 medieval churches on a peninsula barely 850 metres long. About 20 remain standing, earning it the nickname 'City of Churches.'",
      },
      {
        question: "During which century did Messembria reach its greatest height of Byzantine prosperity?",
        options: ["2nd century BC", "3rd century AD", "5th–6th century AD", "11th–12th century AD"],
        correctIndex: 2,
        explanation: "Messembria flourished most dramatically in the 5th and 6th centuries under Emperor Justinian I, when it was a prosperous trading city of perhaps 10,000 people.",
      },
      {
        question: "Why was Nessebar inscribed on the UNESCO World Heritage List in 1983?",
        options: ["Its Greek-era temples", "Its layering of 3,000+ years of civilizations on a single small site", "Its Byzantine imperial palace", "Its Ottoman-era harbour"],
        correctIndex: 1,
        explanation: "UNESCO recognized Nessebar for its unique concentration of monuments representing Thracian, Greek, Roman, Byzantine, Bulgarian, and Ottoman heritage — all on a tiny peninsula over 3,000 years.",
      },
    ],
    badges: [
      { title: "Curious Port Visitor", subtitle: "You've stepped onto one of Europe's oldest peninsulas. Keep exploring.", tier: "basic"  },
      { title: "Black Sea Merchant",   subtitle: "Growing knowledge of Nessebar's layered 3,000-year history.",          tier: "bronze" },
      { title: "Heritage Explorer",    subtitle: "You understand Nessebar's civilizations and churches exceptionally well.", tier: "silver" },
      { title: "Heritage Expert",      subtitle: "Outstanding mastery. You could lead a scholarly tour of Nessebar.",    tier: "gold"   },
    ],
  },

  madara: {
    videos: [
      {
        title: "The Madara Horseman — UNESCO Rock Relief",
        description: "The remarkable 23-metre cliff carving explained — its iconography, its Greek inscriptions, and why a stone relief carved in 710 AD became one of Bulgaria's most iconic symbols.",
        source: "YouTube · UNESCO Heritage",
        imageUrl: IMG.steppe,
        link: "https://www.youtube.com/results?search_query=madara+horseman+UNESCO+rock+relief+bulgaria",
      },
      {
        title: "Khan Asparuh and the Founding of Bulgaria",
        description: "The crossing of the Danube, the alliance with Slavic tribes, and the defeat of Byzantium — how a steppe warrior founded the Bulgarian state that has endured for 1,344 years.",
        source: "YouTube · Kings and Generals",
        imageUrl: IMG.ruins2,
        link: "https://www.youtube.com/results?search_query=khan+asparuh+founding+bulgaria+681+AD",
      },
      {
        title: "The Migration Period: Bulgars Across the Danube",
        description: "The great steppe migration that brought the Bulgars to the Balkans — the Hunnic pressure, the dissolution of Old Great Bulgaria, and Asparuh's search for a new homeland.",
        source: "YouTube · HistoryMarche",
        imageUrl: IMG.steppe,
        link: "https://www.youtube.com/results?search_query=bulgars+migration+period+danube+history",
      },
    ],
    books: [
      {
        title: "A History of the First Bulgarian Empire",
        description: "Steven Runciman's classic and meticulously researched history from Asparuh's founding to the Byzantine conquest of 1018 — the standard English-language work on early Bulgaria.",
        source: "Internet Archive · Steven Runciman",
        imageUrl: IMG.books,
        link: "https://archive.org/search?query=runciman+history+first+bulgarian+empire",
      },
      {
        title: "The Avars: A Steppe Empire in Central Europe",
        description: "Walter Pohl's authoritative account of the Avar Empire — whose collapse created the conditions that allowed Khan Asparuh to lead his people across the Danube.",
        source: "Goodreads · Walter Pohl, 2019",
        imageUrl: IMG.library,
        link: "https://www.goodreads.com/book/show/44595540-the-avars",
      },
      {
        title: "Europe's Barbarians 400–600 AD",
        description: "Edward James' accessible study of the peoples who reshaped Europe in the Migration Period — the archaeological evidence for how Bulgars and Slavs transformed the Balkans.",
        source: "Goodreads · Edward James, 2009",
        imageUrl: IMG.stacked,
        link: "https://www.goodreads.com/book/show/6512516-europe-s-barbarians-400-600-ad",
      },
    ],
    articles: [
      {
        title: "Madara Horseman — UNESCO World Heritage",
        description: "The official UNESCO listing for the Madara Horseman, detailing the monument's historical significance and its status as one of the earliest examples of monumental Bulgarian art.",
        source: "UNESCO",
        imageUrl: IMG.steppe,
        link: "https://whc.unesco.org/en/list/43",
      },
      {
        title: "Madara Horseman",
        description: "Wikipedia's detailed article on the rock relief — its dating, its iconography, the Greek inscriptions carved around it by successive Bulgarian rulers, and its modern conservation.",
        source: "Wikipedia",
        imageUrl: IMG.ruins2,
        link: "https://en.wikipedia.org/wiki/Madara_Horseman",
      },
      {
        title: "Asparuh of Bulgaria",
        description: "The Wikipedia entry on the founder of Bulgaria — his origins in Old Great Bulgaria, his crossing of the Danube, and the Treaty of 681 AD that formally established the Bulgarian state.",
        source: "Wikipedia",
        imageUrl: IMG.steppe,
        link: "https://en.wikipedia.org/wiki/Asparuh_of_Bulgaria",
      },
    ],
    quiz: [
      {
        question: "At approximately what height above the ground is the Madara Horseman carved?",
        options: ["5 metres", "23 metres", "75 metres", "150 metres"],
        correctIndex: 1,
        explanation: "The Madara Horseman is carved approximately 23 metres above ground level — a remarkable feat of craftsmanship that has survived 1,300 years of weathering.",
      },
      {
        question: "The Treaty of 681 AD included what extraordinary concession from Byzantine Emperor Constantine IV?",
        options: ["He gave up all of Thrace", "He agreed to pay annual tribute to Bulgaria", "He converted to the Bulgarian religion", "He married his daughter to Asparuh"],
        correctIndex: 1,
        explanation: "Beyond recognizing Bulgarian independence, Constantine IV agreed to pay annual tribute to Bulgaria — an extraordinary humiliation for the Roman imperial tradition.",
      },
      {
        question: "The Bulgars forged their founding alliance with which settled people south of the Danube?",
        options: ["The Byzantine Greeks", "The Avars", "The Pechenegs", "The Slavic tribes"],
        correctIndex: 3,
        explanation: "Asparuh allied with seven Slavic tribes already settled between the Danube and the Balkan Mountains. The Bulgars brought military expertise; the Slavs provided farming knowledge and familiarity with the land.",
      },
      {
        question: "In the Madara Horseman carving, what animal is depicted being slain?",
        options: ["A bear", "A wolf", "A lion", "A boar"],
        correctIndex: 2,
        explanation: "The horseman thrusts a spear through a lion prostrated beneath the horse's hooves — a symbol of royal authority drawn from both Thracian and steppe artistic traditions.",
      },
      {
        question: "What was the name of Khan Asparuh's father, who first united the Bulgar tribes?",
        options: ["Khan Tervel", "Khan Kubrat", "Khan Krum", "Khan Omurtag"],
        correctIndex: 1,
        explanation: "Khan Kubrat united the Bulgar tribes into the confederation called Old Great Bulgaria around 630 AD. Khazar expansion after his death fragmented his empire, leading Asparuh to seek a new homeland south of the Danube.",
      },
    ],
    badges: [
      { title: "Plains Wanderer",    subtitle: "A first glimpse of the steppe world. The Danube awaits.",                      tier: "basic"  },
      { title: "Danube Crosser",     subtitle: "Good knowledge of Bulgaria's earliest beginnings.",                            tier: "bronze" },
      { title: "Bulgarian Explorer", subtitle: "Strong understanding of the founding of the Bulgarian state.",                tier: "silver" },
      { title: "Khan's Advisor",     subtitle: "Mastery of early Bulgarian history. Khan Asparuh would trust your counsel.", tier: "gold"   },
    ],
  },

  buzludzha: {
    videos: [
      {
        title: "Buzludzha — Europe's Most Dramatic Ruin",
        description: "The extraordinary flying-saucer monument atop a Bulgarian peak — its Communist-era construction, its abandoned grandeur, and the global debate about whether to restore it.",
        source: "YouTube · Abandoned Spaces",
        imageUrl: IMG.ruins2,
        link: "https://www.youtube.com/results?search_query=buzludzha+abandoned+monument+bulgaria",
      },
      {
        title: "Paisii Hilendarski and the Bulgarian Awakening",
        description: "The monk who in 1762 wrote the history that woke a nation — how one handwritten book, copied and passed in secret under Ottoman rule, ignited Bulgaria's national revival.",
        source: "YouTube · Khan Academy",
        imageUrl: IMG.oldcity,
        link: "https://www.youtube.com/results?search_query=paisii+hilendarski+bulgarian+national+revival+history",
      },
      {
        title: "The April Uprising and Bulgarian Liberation",
        description: "The 1876 April Uprising, the role of Vasil Levski and Hristo Botev, the Russo-Turkish War of 1877–78, and how Bulgaria emerged from 500 years of Ottoman rule.",
        source: "YouTube · Kings and Generals",
        imageUrl: IMG.oldcity,
        link: "https://www.youtube.com/results?search_query=bulgarian+april+uprising+1876+liberation",
      },
    ],
    books: [
      {
        title: "Slavo-Bulgarian History",
        description: "Paisii Hilendarski's 1762 text — the founding document of Bulgarian national consciousness, available in modern translation. The book that started a revolution without weapons.",
        source: "Goodreads · Paisii Hilendarski",
        imageUrl: IMG.books,
        link: "https://www.goodreads.com/book/show/2388476.Slavo-Bulgarian_History",
      },
      {
        title: "The Balkans: Nationalism, War and the Great Powers",
        description: "Misha Glenny's essential history of the Balkans from 1804 to the present — the rise of national movements, Bulgarian liberation, the Balkan Wars, and everything that followed.",
        source: "Goodreads · Misha Glenny, 1999",
        imageUrl: IMG.library,
        link: "https://www.goodreads.com/book/show/139350.The_Balkans",
      },
      {
        title: "The Ottoman Centuries",
        description: "Lord Kinross's sweeping narrative of the Ottoman Empire from its founding to its dissolution — the 500-year framework within which Paisii lived, researched, and wrote.",
        source: "Goodreads · Lord Kinross",
        imageUrl: IMG.stacked,
        link: "https://www.goodreads.com/book/show/136543.The_Ottoman_Centuries",
      },
    ],
    articles: [
      {
        title: "Buzludzha Monument",
        description: "Wikipedia's detailed article on the Soviet-era monument — its construction, its extravagant interior mosaics, its abandonment after 1989, and the international campaign to save it.",
        source: "Wikipedia",
        imageUrl: IMG.ruins2,
        link: "https://en.wikipedia.org/wiki/Buzludzha_(monument)",
      },
      {
        title: "Paisiy Hilendarski",
        description: "The Wikipedia entry on the monk who wrote the Slavo-Bulgarian History — his life at Hilendar Monastery, his historical research, and his extraordinary impact on Bulgarian identity.",
        source: "Wikipedia",
        imageUrl: IMG.oldcity,
        link: "https://en.wikipedia.org/wiki/Paisiy_Hilendarski",
      },
      {
        title: "Bulgarian National Revival",
        description: "Britannica's overview of the 19th-century Bulgarian cultural and political awakening — the schools, the writers, the revolutionaries, and the liberation that Paisii's work helped make possible.",
        source: "Britannica",
        imageUrl: IMG.oldcity,
        link: "https://www.britannica.com/place/Bulgaria/The-national-revival",
      },
    ],
    quiz: [
      {
        question: "In which year did Paisii Hilendarski complete his Slavo-Bulgarian History?",
        options: ["1682", "1762", "1810", "1856"],
        correctIndex: 1,
        explanation: "Paisii completed his Istoriya Slavyanobolgarskaya in 1762 at Hilendar Monastery on Mount Athos. Though not printed until 1844, handwritten copies spread across Bulgaria and sparked the National Revival.",
      },
      {
        question: "At which monastery on Mount Athos did Paisii conduct his historical research?",
        options: ["Zograf Monastery", "Vatopedi Monastery", "Hilendar Monastery", "Great Lavra Monastery"],
        correctIndex: 2,
        explanation: "Hilendar (Chilandar) is the Serbian-Bulgarian monastery on Mount Athos, founded in 1198. Its archives contained the historical documents about Bulgarian tsars and saints that Paisii used as primary sources.",
      },
      {
        question: "Bulgaria was liberated from Ottoman rule following the Russo-Turkish War. In which year was Bulgarian independence established?",
        options: ["1844", "1878", "1908", "1944"],
        correctIndex: 1,
        explanation: "Bulgaria was liberated in 1878 following the Russo-Turkish War of 1877-78. The Treaty of San Stefano established a Bulgarian state — 116 years after Paisii wrote his history.",
      },
      {
        question: "The Buzludzha Monument was built in 1981 to commemorate which historical event?",
        options: ["The liberation of Bulgaria from Byzantine rule", "The Ottoman conquest of Bulgaria", "The founding of the Bulgarian Social Democratic Party in 1891", "The birth of Vasil Levski"],
        correctIndex: 2,
        explanation: "The Buzludzha Peak was where Dimitar Blagoev founded the Bulgarian Social Democratic Party in 1891. The monument, designed by Georgi Stoilov, commemorated this founding.",
      },
      {
        question: "Vasil Levski, organizer of Bulgarian revolutionary cells in the 1860s–70s, was known by which title?",
        options: ["The Father of Bulgaria", "The Apostle of Freedom", "The Lion of Bulgaria", "The Spirit of the Balkans"],
        correctIndex: 1,
        explanation: "Vasil Levski earned the epithet 'Apostol na svobodata' (Apostle of Freedom) for his tireless organization of revolutionary committees throughout Bulgaria. He was executed in Sofia on February 19, 1873.",
      },
    ],
    badges: [
      { title: "Curious Student",   subtitle: "A first step into Bulgaria's complex modern history. Keep reading.",        tier: "basic"  },
      { title: "History Reader",    subtitle: "Solid grasp of the National Revival and Paisii's significance.",            tier: "bronze" },
      { title: "Revival Patriot",   subtitle: "Strong understanding of how Bulgaria's national consciousness was born.",  tier: "silver" },
      { title: "Apostle of Memory", subtitle: "Exceptional mastery. Paisii himself would approve of your knowledge.",    tier: "gold"   },
    ],
  },
};
