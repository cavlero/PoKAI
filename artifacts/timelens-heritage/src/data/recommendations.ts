export type RecItem = {
  title: string;
  description: string;
  source: string;
  imageUrl: string;
  link: string;
};

export type AudioGuideItem = {
  title: string;
  intro: string;
  script: string;
  duration: string;
};

export type VirtualTourItem = {
  title: string;
  description: string;
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
  articles: RecItem[];
  audioGuide: AudioGuideItem[];
  virtualTour: VirtualTourItem[];
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
};

export const LEARNING: Record<string, MonumentLearning> = {
  novae: {
    articles: [
      {
        title: "Novae — Roman Legionary Fortress",
        description: "Wikipedia's comprehensive article covering the site's archaeological history, the legions that served here, and what excavations have revealed about life on the Danubian frontier.",
        source: "Wikipedia",
        imageUrl: IMG.colosseum,
        link: "https://en.wikipedia.org/wiki/Novae_(city)",
      },
      {
        title: "Legio I Italica — The First Italian Legion",
        description: "The full history and movements of the legion permanently stationed at Novae — its founding by Nero, its long Danubian tenure, and its role defending Rome's most important land border.",
        source: "Wikipedia",
        imageUrl: IMG.arch,
        link: "https://en.wikipedia.org/wiki/Legio_I_Italica",
      },
      {
        title: "Moesia — Roman Province on the Danube",
        description: "Britannica's detailed overview of the Roman province of Moesia, its strategic importance for the empire, and the military campaigns fought to defend it across three centuries.",
        source: "Britannica",
        imageUrl: IMG.ruins,
        link: "https://www.britannica.com/place/Moesia",
      },
    ],
    audioGuide: [
      {
        title: "Welcome to Novae Fortress",
        intro: "An introduction to the Roman legionary fortress on the Danube.",
        duration: "~1 min",
        script: "Welcome to Novae, a Roman legionary fortress on the southern bank of the Danube River. You are standing where six thousand soldiers of the First Italian Legion once lived and served. Founded in the first century after Christ, this site contained stone walls, headquarters buildings, bathhouses, and temples. Beyond the military camp, a civilian town grew outside — home to merchants, craftsmen, and the families of soldiers who had come from Syria, Thrace, and even Britain. As you explore, imagine the morning trumpet calling troops to formation, the ring of the smithy, and the steady rhythm of the Danube flowing north beyond the fortress walls.",
      },
      {
        title: "The Roman Danube Frontier",
        intro: "How Rome defended its greatest border along the Danube River.",
        duration: "~1 min",
        script: "The Danube was Rome's most important land frontier — four thousand kilometres of river patrolled by legions, watchtowers, and river fleets. Novae was one of the key fortresses holding this line. Soldiers here maintained patrol boats on the river, manned signal towers, and kept cavalry ready to respond within hours to any crossing. During peaceful decades, life was routine. But when Gothic raiding parties crossed in the third century, Novae found itself at the heart of one of Rome's greatest crises. In two-fifty-one, Emperor Decius was killed fighting the Goths near this region — the first Roman emperor to fall in battle against a foreign enemy.",
      },
      {
        title: "Life in the Legion",
        intro: "The daily routines, rituals, and rewards of a Roman soldier at Novae.",
        duration: "~1 min",
        script: "A Roman legionary's day began at dawn. Sword drills, formation exercises, and equipment maintenance filled the morning. Engineering work — repairing walls, building roads — occupied the afternoon. The bathhouse was the social centre of the fortress, open each evening to soldiers from a dozen different nations. Religion was everywhere: shrines to Jupiter, to the Persian god Mithras, and to the local Thracian horseman deity. Many soldiers served twenty-five years before retirement, building lives so deeply rooted here that their children and grandchildren stayed beside the Danube long after the legions had gone.",
      },
      {
        title: "The Legacy of Novae",
        intro: "What happened after Rome and what today's excavations are uncovering.",
        duration: "~1 min",
        script: "Novae did not vanish when the Roman legions withdrew. Civilian life continued for generations. Byzantine soldiers later reoccupied parts of the fortress. Slavic settlers built homes among the ruins. And today, Bulgarian and Polish archaeologists have been carefully excavating the site since nineteen-sixty, revealing extraordinary finds — inscriptions naming soldiers from across the empire, surgical instruments from the fortress hospital, and luxury goods imported from the farthest reaches of the Roman world. Every excavation season adds new pages to the story of this place where Roman power met the edge of the known world.",
      },
    ],
    virtualTour: [
      {
        title: "Novae Fortress — Satellite View",
        description: "Explore the archaeological footprint of Novae from above — the outline of the legionary fortress, the civilian settlement, and the Danube River that defined its existence.",
        imageUrl: IMG.colosseum,
        link: "https://www.google.com/maps/@43.6167,25.3833,17z/data=!3m1!1e3",
      },
      {
        title: "Novae on Wikipedia",
        description: "Explore plans, photographs, and reconstruction drawings of the Roman fortress alongside the detailed Wikipedia article on its history and ongoing excavations.",
        imageUrl: IMG.arch,
        link: "https://en.wikipedia.org/wiki/Novae_(city)",
      },
    ],
    quiz: [
      {
        question: "Which Roman legion was permanently stationed at Novae as its primary garrison?",
        options: ["Legio VII Claudia", "Legio V Macedonica", "Legio I Italica", "Legio XI Claudia"],
        correctIndex: 2,
        explanation: "Legio I Italica — the First Italian Legion — was raised by Nero and became the permanent garrison of Novae. Its soldiers came from across the empire: Syrians, Thracians, and even men from Britain.",
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
        explanation: "The Goths mounted devastating raids across the Danube throughout the 3rd century. In 251 AD, Emperor Decius was killed fighting them near this region — the first Roman emperor to fall in battle against a foreign enemy.",
      },
      {
        question: "What was the approximate size of a fully-staffed Roman legion like those stationed at Novae?",
        options: ["1,000–2,000 soldiers", "5,000–6,000 soldiers", "12,000–15,000 soldiers", "500 elite soldiers"],
        correctIndex: 1,
        explanation: "A standard imperial Roman legion consisted of approximately 5,000 to 6,000 men, organized into 10 cohorts. The first cohort was double-strength — the most prestigious unit.",
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
    articles: [
      {
        title: "Tsarevets Fortress",
        description: "Wikipedia's detailed article on Tsarevets Fortress — its role as the medieval capital citadel of the Second Bulgarian Empire, its architecture, the 1393 Ottoman siege, and the famous Sound and Light show.",
        source: "Wikipedia",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Tsarevets_bg.jpg/640px-Tsarevets_bg.jpg",
        link: "https://en.wikipedia.org/wiki/Tsarevets_(fortress)",
      },
      {
        title: "Ivan Asen II of Bulgaria",
        description: "Article about Tsar Ivan Asen II — one of the most powerful rulers of medieval Bulgaria, whose victory at the Battle of Klokotnitsa in 1230 made Bulgaria the dominant force across the Balkan Peninsula.",
        source: "Wikipedia",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Ivan_Asen_II_of_Bulgaria_%28from_the_Manasses_Chronicle%29.jpg/320px-Ivan_Asen_II_of_Bulgaria_%28from_the_Manasses_Chronicle%29.jpg",
        link: "https://en.wikipedia.org/wiki/Ivan_Asen_II_of_Bulgaria",
      },
      {
        title: "Second Bulgarian Empire",
        description: "Overview of the medieval Bulgarian state (1185–1396) — its founding by the Asen dynasty, its rulers, cultural achievements, military power, and the Ottoman conquest that ended five centuries of Bulgarian statehood.",
        source: "Wikipedia",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Second_Bulgarian_Empire_%28late_12th_to_14th_century%29.png/640px-Second_Bulgarian_Empire_%28late_12th_to_14th_century%29.png",
        link: "https://en.wikipedia.org/wiki/Second_Bulgarian_Empire",
      },
    ],
    audioGuide: [
      {
        title: "Welcome to Tsarevets Fortress",
        intro: "An introduction to the medieval Bulgarian capital and its hill above the Yantra River.",
        duration: "~1 min",
        script: "Welcome to Tsarevets Fortress — for two centuries the seat of the Bulgarian Tsars and the political heart of a Balkan empire. You are standing on a hill surrounded on three sides by the Yantra River, a natural fortress that made this site nearly impregnable. Inside these walls lived thousands of people — the Tsar and his court, the Patriarch and his clergy, soldiers, servants, and merchants. The citadel fell only once in its history: to the Ottoman armies of Sultan Bayezid the First, after a three-month siege in thirteen ninety-three — one of the most dramatic moments in Bulgarian history.",
      },
      {
        title: "The Second Bulgarian Empire",
        intro: "How brothers Asen and Peter founded an empire that dominated the Balkans.",
        duration: "~1 min",
        script: "The Second Bulgarian Empire began in eleven eighty-five, when brothers Asen and Peter led a successful uprising against Byzantine rule and proclaimed independence at the Church of Saint Demetrius in Tarnovo. From this fortress, Bulgarian Tsars would rule for two centuries, at times commanding territory from the Black Sea to the Adriatic. The empire reached its greatest height under Tsar Ivan Asen the Second in the thirteenth century. After his stunning victory at the Battle of Klokotnitsa in twelve-thirty, Bulgaria became the dominant power across the entire Balkan Peninsula — a moment of national greatness remembered to this day.",
      },
      {
        title: "The Royal Palace",
        intro: "The ceremonial heart of Bulgarian medieval power at the top of Tsarevets Hill.",
        duration: "~1 min",
        script: "At the highest point of Tsarevets stood the Royal Palace — a complex of ceremonial halls, private chambers, treasury rooms, and gardens befitting a great medieval empire. Bulgarian Tsars received foreign ambassadors here, issued decrees, and dispensed justice. The palace was connected to the Patriarchal Cathedral by a processional path, emphasizing the unity of royal and religious power. Today, the foundations of the palace are clearly visible, and ongoing archaeological work continues to reveal fine Byzantine-influenced mosaics, imported pottery, and the wax seals of royal documents that once governed the affairs of the Balkan Peninsula.",
      },
      {
        title: "The Patriarchal Church",
        intro: "Bulgaria's highest spiritual authority on the summit of the fortress hill.",
        duration: "~1 min",
        script: "Dominating the summit of Tsarevets stands the Patriarchal Church of the Holy Ascension — rebuilt in the nineteen-eighties with frescoes by artist Teofan Sokerov, painted in a bold style that blends medieval Bulgarian and modern artistic traditions. In the medieval period, the Patriarch of Tarnovo administered the Bulgarian Orthodox Church from this hilltop, making Tsarevets not only Bulgaria's political capital but its spiritual one. Every summer evening, the fortress is illuminated by a dramatic sound and light show set to Beethoven's Ninth Symphony — one of Eastern Europe's most spectacular heritage performances.",
      },
    ],
    virtualTour: [
      {
        title: "Tsarevets Virtual Tour",
        description: "Explore Tsarevets Fortress through the official interactive online tour — walk the walls, enter the towers, and discover the Royal Palace and Patriarchal Church from anywhere in the world.",
        imageUrl: IMG.castle,
        link: "https://www.tsarevets.eu/en/page3.html",
      },
      {
        title: "Tsarevets on Google Maps",
        description: "Explore the fortress hill from the air — the full outline of the citadel walls, the Yantra River bends, and the city of Veliko Tarnovo spread across the surrounding hills.",
        imageUrl: IMG.castle2,
        link: "https://www.google.com/maps/@43.0849,25.6539,17z/data=!3m1!1e3",
      },
    ],
    quiz: [
      {
        question: "What was the name of Ivan Asen II's most decisive military victory, fought in 1230 AD?",
        options: ["Battle of Anchialos", "Battle of Adrianople", "Battle of Klokotnitsa", "Battle of the Maritsa"],
        correctIndex: 2,
        explanation: "At the Battle of Klokotnitsa (March 1230), Ivan Asen II utterly defeated Theodore Komnenos of Epirus. Theodore was captured and blinded. In one afternoon, Bulgaria became the dominant Balkan power.",
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
    articles: [
      {
        title: "Rila Monastery — UNESCO World Heritage",
        description: "The official UNESCO World Heritage listing explaining why this mountain complex was recognised as a site of outstanding universal value to humanity.",
        source: "UNESCO",
        imageUrl: IMG.mountain,
        link: "https://whc.unesco.org/en/list/216",
      },
      {
        title: "Saint Ivan of Rila",
        description: "Wikipedia's detailed article on the life, miracles, and legacy of Bulgaria's patron saint — the hermit whose cave in the Rila Mountains became a pilgrimage destination for over a thousand years.",
        source: "Wikipedia",
        imageUrl: IMG.peaks,
        link: "https://en.wikipedia.org/wiki/Saint_Ivan_of_Rila",
      },
      {
        title: "Rila Monastery",
        description: "Britannica's article covering the monastery's founding, its architectural history, its destruction and rebuilding after 1833, and its enduring role as the spiritual centre of Bulgarian culture.",
        source: "Britannica",
        imageUrl: IMG.mountain,
        link: "https://www.britannica.com/topic/Rila-Monastery",
      },
    ],
    audioGuide: [
      {
        title: "Welcome to Rila Monastery",
        intro: "An introduction to Bulgaria's most sacred place in its mountain valley.",
        duration: "~1 min",
        script: "Welcome to Rila Monastery, nestled in a valley of the Rila Mountains at over a thousand metres altitude. This is Bulgaria's most sacred place — a monastery founded more than a thousand years ago that has served as the spiritual heart of the Bulgarian nation ever since. The buildings you see today were built primarily in the nineteenth century after a devastating fire. But the monastery's soul is much older, stretching back to the tenth century when a hermit named Ivan came to these mountains seeking silence, and found instead a calling that would shape Bulgarian history forever.",
      },
      {
        title: "Saint Ivan of Rila",
        intro: "The hermit monk who founded the monastery and became Bulgaria's patron saint.",
        duration: "~1 min",
        script: "Saint Ivan of Rila was born around the year eight hundred seventy-six. Drawn to solitary prayer, he gave away his possessions and walked into these mountains, eventually settling in a cave high above this valley. Word of his holiness spread, and disciples came to live nearby, building the first monastic community around him. Even Tsar Peter the First, ruler of Bulgaria, sought his counsel. Ivan's relics are preserved in the monastery to this day, and millions of pilgrims have come to pray at his tomb over eleven centuries. His is one of the longest and most continuous threads of Bulgarian spiritual life.",
      },
      {
        title: "The Great Frescoes",
        intro: "Over twelve hundred painted scenes covering every surface of the arcade.",
        duration: "~1 min",
        script: "The monastery's famous frescoes cover every surface of the outer arcade — more than twelve hundred individual scenes painted between eighteen-forty and eighteen-forty-eight by master artists of the Bulgarian National Revival. These are not merely decorations. They are a complete visual theology — the life of Christ, the lives of the saints, visions of heaven and the torments of hell — designed to teach and inspire every visitor who passed through the gates. Dozens of painters worked simultaneously on surfaces above their heads, matching colours across sections, maintaining theological consistency across the entire arcade. The result is considered one of the greatest achievements of Bulgarian visual art.",
      },
      {
        title: "Rila as a Cultural Fortress",
        intro: "How the monastery preserved Bulgarian identity through five centuries of Ottoman rule.",
        duration: "~1 min",
        script: "During nearly five centuries of Ottoman rule, Rila Monastery was a rare place of safety for Bulgarian culture. While the Bulgarian language was suppressed in public life, monks here copied manuscripts in the Cyrillic alphabet. While Bulgarian history was erased from official records, scribes in these cells preserved the memory of the Bulgarian Tsars. The monastery ran one of Bulgaria's first Bulgarian-language schools. When Paisii Hilendarski wrote his Slavo-Bulgarian History in seventeen-sixty-two — the text that ignited the Bulgarian national awakening — it was in this monastic world that his work found its earliest readers and copyists.",
      },
    ],
    virtualTour: [
      {
        title: "Rila Monastery — Google Arts & Culture",
        description: "High-resolution photography, detailed cultural history, and an immersive visual experience of one of the world's great Orthodox monasteries — from the frescoes to the mountain landscape.",
        imageUrl: IMG.mountain,
        link: "https://artsandculture.google.com/partner/rila-monastery",
      },
      {
        title: "Rila Monastery — UNESCO Listing",
        description: "The official UNESCO World Heritage entry with photographs, maps, and the full statement of outstanding universal value for Rila Monastery.",
        imageUrl: IMG.peaks,
        link: "https://whc.unesco.org/en/list/216",
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
    articles: [
      {
        title: "Old Nessebar — UNESCO World Heritage Site",
        description: "The official UNESCO World Heritage listing explaining how a tiny Black Sea peninsula earned recognition for its extraordinary concentration of monuments from multiple civilizations across 3,000 years.",
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
        description: "Britannica's article on the ancient city, covering its founding, its role in Black Sea trade, and its long transition through Roman, Byzantine, and Bulgarian rule.",
        source: "Britannica",
        imageUrl: IMG.colosseum,
        link: "https://www.britannica.com/place/Nessebar",
      },
    ],
    audioGuide: [
      {
        title: "Welcome to Ancient Nessebar",
        intro: "An introduction to three thousand years of history on a tiny Black Sea peninsula.",
        duration: "~1 min",
        script: "Welcome to Ancient Nessebar — a tiny rocky peninsula where human beings have lived, traded, prayed, and built for more than three thousand years. You could walk from one end to the other in fifteen minutes. Yet in that small space you will encounter Thracian foundations, Greek city walls, Roman columns, Byzantine churches, Bulgarian fortifications, and Ottoman wooden houses. This is one of the most densely layered archaeological sites in all of Europe. UNESCO recognized it in nineteen eighty-three not for any single monument, but for the extraordinary concentration of human history packed into its few hundred metres of wind-swept rock.",
      },
      {
        title: "Three Thousand Years of History",
        intro: "From Thracian settlers to Greek colonists, Byzantines, Bulgarians, and Ottomans.",
        duration: "~1 min",
        script: "The story of Nessebar begins with the Thracian tribe called the Mendi, who settled this natural harbour over three thousand years ago. Greek colonists from Megara arrived around five hundred and ten before Christ and founded the city of Messembria. Romans conquered it in seventy-two before Christ. Byzantine emperors fortified it and built churches. Bulgarian Khan Krum captured it in eight-twelve after defeating a Byzantine Emperor in battle. The Ottoman Turks arrived in the fifteenth century. Through each transition, the city's remarkable stone churches somehow survived — protected by their sheer number and the city's enduring value as a trading port.",
      },
      {
        title: "The Byzantine Churches",
        intro: "Why this tiny peninsula holds more medieval churches than almost anywhere in the world.",
        duration: "~1 min",
        script: "At its medieval height, Nessebar contained more than forty churches for a population of perhaps a few thousand people. Today more than twenty remain standing in various states of preservation. Some are still active Orthodox churches. Others are romantic ruins, their walls open to the sky. The Church of the New Metropolitan is the finest — a masterpiece of Byzantine brickwork and ceramic decoration. The Church of Saint John the Baptist may be the oldest, dating to the fifth century. Walking among them is to move through twelve centuries of Christian artistic tradition in the span of a single afternoon.",
      },
      {
        title: "Life on the Peninsula",
        intro: "Daily life in a city defined by the sea, trade, and centuries of changing rulers.",
        duration: "~1 min",
        script: "What was daily life like in medieval Nessebar? The city was above all a place of trade. Fishermen, merchants, craftsmen, and sailors from across the Black Sea world passed through its harbour. The smell of salt and pitch mixed with incense from the many churches. Greek, Bulgarian, and later Turkish could all be heard in the narrow streets. Through all the changes of ruler and religion, the rhythm of life on this small peninsula remained tied to the sea — to its storms, its trade winds, and its abundance. Nessebar was never merely a place of history. It was always, first and last, a living city.",
      },
    ],
    virtualTour: [
      {
        title: "Nessebar — Google Arts & Culture",
        description: "Explore the UNESCO World Heritage city of Nessebar through high-resolution photography and curated cultural history — the churches, the ancient walls, and the Black Sea coastline.",
        imageUrl: IMG.arch,
        link: "https://artsandculture.google.com/search?q=nessebar",
      },
      {
        title: "Nessebar from Above — Satellite View",
        description: "See the remarkable peninsula from above — the narrow isthmus connecting old Nessebar to the mainland, the cluster of church ruins, and the Black Sea surrounding it on three sides.",
        imageUrl: IMG.ruins,
        link: "https://www.google.com/maps/@42.6589,27.7372,17z/data=!3m1!1e3",
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
    articles: [
      {
        title: "Madara Horseman — UNESCO World Heritage",
        description: "The official UNESCO World Heritage listing for the Madara Horseman, detailing its historical significance as the only large-scale early medieval rock relief in Europe.",
        source: "UNESCO",
        imageUrl: IMG.steppe,
        link: "https://whc.unesco.org/en/list/43",
      },
      {
        title: "Madara Horseman",
        description: "Wikipedia's detailed article on the rock relief — its dating, its iconography, the Greek inscriptions carved by Bulgarian rulers, and modern conservation efforts.",
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
    audioGuide: [
      {
        title: "Welcome to the Madara Horseman",
        intro: "An introduction to Europe's only early medieval rock relief.",
        duration: "~1 min",
        script: "Welcome to the Madara Horseman — Europe's only large-scale early medieval rock relief, and one of Bulgaria's most powerful national symbols. You are looking at an image carved into a sheer cliff face twenty-three metres above the ground, created sometime between seven-oh-five and eight-oh-one. The relief shows a triumphant horseman thrusting a spear through a prostrated lion, with an eagle flying overhead and a dog running at his side. Surrounding the image are Greek inscriptions — royal proclamations carved by Bulgarian Khans over nearly a century — making this cliff face a kind of stone chronicle of Bulgaria's founding era.",
      },
      {
        title: "Khan Asparuh and the Founding of Bulgaria",
        intro: "How a steppe migration led to the birth of the Bulgarian state in 681 AD.",
        duration: "~1 min",
        script: "The story of the Madara Horseman begins with a migration. Around six-eighty-one, Khan Asparuh led his Bulgar people across the Danube River into territory already settled by Slavic tribes. By defeating Byzantine Emperor Constantine the Fourth in battle and signing a peace treaty, Asparuh created the Bulgarian state — the first new nation to emerge from the ruins of Roman civilization in the Balkans. The treaty obliged the Byzantine Emperor to pay annual tribute to Bulgaria — an extraordinary humiliation for the heirs of Rome, and a clear signal that a powerful new force had arrived in the Balkans.",
      },
      {
        title: "Reading the Inscriptions",
        intro: "The Greek proclamations of Bulgarian Khans carved into the rock over a century.",
        duration: "~1 min",
        script: "The Greek inscriptions carved around the Madara Horseman are among the most valuable historical documents of early Bulgaria. Written in Greek — the diplomatic language of the Byzantine world — they record treaties, victories, and royal decrees of Khans Tervel, Kormesiy, and Omurtag. Khan Tervel's inscription mentions his military alliance with Byzantine Emperor Justinian the Second in seven-oh-five, when Bulgarian cavalry helped Justinian reclaim his throne. The inscriptions span nearly a century of Bulgarian history, from the period when the new Bulgarian state was still consolidating its power and identity on the edge of the Byzantine world.",
      },
      {
        title: "Legacy of the Madara Horseman",
        intro: "How a 1,300-year-old carving became one of Bulgaria's most important national symbols.",
        duration: "~1 min",
        script: "The image on the Madara cliff has outlasted the empire that created it. Bulgaria adopted the Madara Horseman as one of its most important national symbols — so significant that it appears on Bulgarian euro coins. The mountain plateau above the carving contains evidence of earlier Thracian sacred sites, suggesting this place held spiritual importance for thousands of years before the Bulgarian Khans chose it for their proclamations. Standing here, you feel the weight of those centuries — the Thracian rituals, the Bulgarian triumphs, the slow weathering of stone. Conservation work today uses careful laser cleaning and monitoring to preserve the image for future generations.",
      },
    ],
    virtualTour: [
      {
        title: "Madara Horseman — UNESCO Listing",
        description: "The official UNESCO World Heritage page with photographs, maps, and the full statement of outstanding universal value for the Madara Horseman rock relief.",
        imageUrl: IMG.steppe,
        link: "https://whc.unesco.org/en/list/43",
      },
      {
        title: "Madara — Satellite View",
        description: "Explore the Madara Plateau from above — the cliff face, the archaeological plateau, and the surrounding landscape that has been sacred to successive civilizations for thousands of years.",
        imageUrl: IMG.ruins2,
        link: "https://www.google.com/maps/@43.2836,27.1158,17z/data=!3m1!1e3",
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
    articles: [
      {
        title: "Buzludzha Monument",
        description: "Wikipedia's detailed article on the Soviet-era monument — its construction, its extraordinary interior mosaics, its abandonment after 1989, and the international campaign to save it.",
        source: "Wikipedia",
        imageUrl: IMG.ruins2,
        link: "https://en.wikipedia.org/wiki/Buzludzha_(monument)",
      },
      {
        title: "Paisiy Hilendarski",
        description: "The Wikipedia entry on the monk who wrote the Slavo-Bulgarian History — his research at Mount Athos, the extraordinary impact of his 1762 text, and his place in Bulgarian national memory.",
        source: "Wikipedia",
        imageUrl: IMG.oldcity,
        link: "https://en.wikipedia.org/wiki/Paisiy_Hilendarski",
      },
      {
        title: "Bulgarian National Revival",
        description: "Britannica's overview of the 19th-century Bulgarian cultural and political awakening — the schools, writers, revolutionaries, and liberation that Paisii's work helped make possible.",
        source: "Britannica",
        imageUrl: IMG.oldcity,
        link: "https://www.britannica.com/place/Bulgaria/The-national-revival",
      },
    ],
    audioGuide: [
      {
        title: "Welcome to Buzludzha",
        intro: "An introduction to the most dramatic abandoned monument in Eastern Europe.",
        duration: "~1 min",
        script: "Welcome to Buzludzha — one of the most extraordinary abandoned monuments in Europe. You are at fourteen hundred and forty-one metres altitude in the heart of the Balkan Mountains, looking at a massive concrete structure that resembles, from the outside, a flying saucer that has landed on a mountain peak. Built between nineteen-seventy-four and nineteen-eighty-one to serve as the ceremonial headquarters of the Bulgarian Communist Party, it required six thousand workers over seven years to construct. Just eight years after its opening, the Communist regime collapsed. Buzludzha has stood empty ever since — a spectacular monument to ambition, ideology, and the relentless passage of time.",
      },
      {
        title: "Paisii Hilendarski's Legacy",
        intro: "The monk whose handwritten book ignited Bulgaria's national awakening.",
        duration: "~1 min",
        script: "The Buzludzha peak was chosen for this monument because of what happened here in eighteen-ninety-one, when socialist activists secretly founded the Bulgarian Social Democratic Party on this remote summit. But the spiritual history of this mountain runs deeper. The national awakening that eventually led to Bulgarian liberation began in seventeen-sixty-two, when the monk Paisii Hilendarski completed his Slavo-Bulgarian History at Hilendar Monastery on Mount Athos — a handwritten book that documented Bulgarian royal history, challenged the prevailing Greek cultural dominance, and asked Bulgarians to remember who they were. His question echoed across the generations that followed.",
      },
      {
        title: "Building the Monument",
        intro: "The extraordinary construction effort that raised a palace on a mountain peak.",
        duration: "~1 min",
        script: "The construction of Buzludzha was a remarkable feat. Workers and volunteers dragged building materials up a mountain road specially built for the project. The circular main hall, sixty metres in diameter, was decorated with more than seven thousand square metres of mosaic artwork depicting Bulgarian history and communist visions of the future. The mosaics required years of work by dozens of artists. Inside the tower, an enormous red star was lit — visible from the valleys far below. When it was inaugurated on August twenty-third, nineteen-eighty-one, it stood as the most ambitious monument the Bulgarian Communist regime had ever created.",
      },
      {
        title: "After the Fall",
        intro: "The monument's abandonment, decay, and the fight to save it.",
        duration: "~1 min",
        script: "When communism collapsed in Bulgaria in nineteen-eighty-nine, Buzludzha was stripped of its valuables, abandoned, and left to the mountain winters. Roof sections collapsed. The interior mosaics, which had survived construction and decades of ceremonies, were vandalized and stripped. Today the building is officially off-limits, though it draws thousands of visitors annually — photographers, urban explorers, architects, and the curious — who come to experience one of Europe's most haunting ruins. A preservation campaign called the Buzludzha Project has been working to stabilize the structure. Whatever you think of its political origins, the building itself is a masterpiece of brutalist architecture that deserves to survive.",
      },
    ],
    virtualTour: [
      {
        title: "The Buzludzha Project",
        description: "The official preservation campaign website — with drone photography, documentation of the monument's condition, and the ongoing international effort to save Buzludzha for future generations.",
        imageUrl: IMG.ruins2,
        link: "https://buzludzha.com/",
      },
      {
        title: "Buzludzha — Satellite View",
        description: "The full Buzludzha peak from above — the circular monument, the entrance tower, the mountain road, and the extraordinary Balkan mountain landscape surrounding it.",
        imageUrl: IMG.oldcity,
        link: "https://www.google.com/maps/@42.7356,25.3948,17z/data=!3m1!1e3",
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
        question: "Bulgaria was liberated from Ottoman rule following the Russo-Turkish War. In which year?",
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
        question: "Vasil Levski, organizer of Bulgarian revolutionary cells, was known by which title?",
        options: ["The Father of Bulgaria", "The Apostle of Freedom", "The Lion of Bulgaria", "The Spirit of the Balkans"],
        correctIndex: 1,
        explanation: "Vasil Levski earned the epithet 'Apostol na svobodata' (Apostle of Freedom) for his tireless organization of revolutionary committees. He was executed in Sofia on February 19, 1873.",
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
