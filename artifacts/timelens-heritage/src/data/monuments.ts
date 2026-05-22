export type Monument = {
  id: string;
  name: string;
  city: string;
  country: string;
  coordinates: { lat: number; lng: number };
  period: string;
  description: string;
  importance: string;
  funFact: string;
  pastImageDescription: string;
  pastImageUrl?: string;
  modernImageUrl?: string;
  quickFacts: string[];
  chatResponses: Record<string, string>;
};

export const MONUMENTS: Monument[] = [
  {
    id: "tsarevets",
    name: "Tsarevets Fortress",
    city: "Veliko Tarnovo",
    country: "Bulgaria",
    coordinates: { lat: 43.0849, lng: 25.6539 },
    period: "12th – 14th Century",
    description:
      "Tsarevets Fortress was the main stronghold of the Second Bulgarian Empire (1185–1393). Situated on a hill surrounded by the Yantra River, it served as the political, military, and spiritual center of medieval Bulgaria. The fortress housed the royal palace, the Patriarchal Cathedral, and over 400 residential buildings within its walls.",
    importance:
      "Tsarevets represents the height of Bulgarian medieval power. From here, Bulgarian Tsars ruled over a vast empire that stretched from the Black Sea to the Adriatic. Today it stands as Bulgaria's most iconic medieval monument and hosts dramatic sound-and-light shows that draw visitors from across the world.",
    funFact:
      "Every year, Tsarevets hosts a spectacular sound and light show where the fortress walls are illuminated with colored lights while Beethoven's Ninth Symphony plays — drawing thousands of spectators to the surrounding hills.",
    pastImageDescription:
      "12th-century Tsarevets at its peak — a mighty walled citadel gleaming above the Yantra River, banners flying from towers, the royal palace alive with courtly life",
    pastImageUrl: "/images/tsarevets_past.png",
    modernImageUrl: "/images/tsarevets_today.jpg",
    quickFacts: [
      "Built in the 12th century as the capital of the Second Bulgarian Empire",
      "Housed the royal palace and Patriarchal Cathedral at its peak",
      "Fell to the Ottoman Empire in 1393 after a 3-month siege",
      "Today hosts world-famous sound and light shows",
      "Surrounded on three sides by the Yantra River",
    ],
    chatResponses: {
      "Who built this fortress?":
        "Tsarevets was built and expanded by the Bulgarian Tsars of the Second Bulgarian Empire, starting around 1185 when brothers Asen and Peter led a successful uprising against Byzantine rule. Under Tsar Ivan Asen II in the 13th century, the fortress reached its greatest glory, becoming one of the most powerful citadels in the Balkans.",
      "When was it built?":
        "The fortress was first settled in ancient times, but its great medieval construction began in the 12th century — specifically after 1185 when Bulgaria reclaimed its independence. It was developed over the next 200 years, reaching its peak power in the 13th century under Tsar Ivan Asen II.",
      "Why is it important?":
        "Tsarevets was the beating heart of medieval Bulgaria — the seat of the Tsar, the Patriarch, and the empire's greatest power. For over two centuries, decisions made within these walls shaped the fate of the entire Balkan Peninsula. Today it is a symbol of Bulgarian national pride and identity.",
      "What historical events happened here?":
        "Many pivotal events unfolded at Tsarevets! In 1393, the Ottoman Sultan Bayezid I besieged the fortress for three months before it finally fell, ending the Second Bulgarian Empire and beginning nearly 500 years of Ottoman rule. There was also the murder of Tsar Asen I within these walls, and the famous revolt of Ivaylo the Swineherd who rose to become Tsar.",
      "default":
        "What a wonderful question about this magnificent Bulgarian fortress! Tsarevets has witnessed the rise and fall of empires, royal intrigues, heroic sieges, and centuries of history. As your guide, I have walked every stone of this citadel — what aspect of its remarkable story would you like to explore?",
    },
  },
  {
    id: "rila",
    name: "Rila Monastery",
    city: "Rila Mountains",
    country: "Bulgaria",
    coordinates: { lat: 42.1337, lng: 23.3406 },
    period: "10th Century – Present",
    description:
      "Rila Monastery is the largest and most famous Eastern Orthodox monastery in Bulgaria, nestled deep in the Rila Mountains at 1,147 metres altitude. It was founded in the 10th century by the hermit Saint Ivan of Rila and became a major spiritual and cultural center throughout the centuries of Ottoman rule, preserving Bulgarian language, culture, and identity.",
    importance:
      "Rila Monastery is a UNESCO World Heritage Site and one of Bulgaria's most treasured cultural monuments. During the dark centuries of Ottoman domination, it was a refuge of Bulgarian literacy, art, and Orthodox Christian faith. The National Revival architecture of its main church, the frescoes, and the Hrelyo Tower are masterpieces of Balkan art.",
    funFact:
      "The monastery's famous frescoes cover over 1,200 square metres of walls and ceilings, painted between 1840 and 1848. They depict over 1,200 biblical scenes — all painted by hand without any scaffolding in the modern sense, using ropes and wooden platforms!",
    pastImageDescription:
      "10th-century Rila Monastery in its earliest form — a humble stone hermitage in dense mountain forest, founded by Saint Ivan of Rila who lived as a hermit in a nearby cave",
    pastImageUrl: "/images/rila_past.png",
    modernImageUrl: "/images/rila_today.png",
    quickFacts: [
      "Founded in the 10th century by Saint Ivan of Rila",
      "UNESCO World Heritage Site since 1983",
      "Houses over 1,200 square metres of remarkable frescoes",
      "Preserved Bulgarian culture during 500 years of Ottoman rule",
      "The Hrelyo Tower (1335) is the oldest surviving building on the site",
    ],
    chatResponses: {
      "Who built this monastery?":
        "Rila Monastery was founded by Saint Ivan of Rila, one of Bulgaria's most beloved saints, in the 10th century. Born around 876 AD, Ivan left his home to live as a hermit in the wild Rila Mountains, attracting disciples who built the first monastic community around him. He is buried within the monastery to this day, and pilgrims have visited his relics for over a thousand years.",
      "When was it built?":
        "The monastery was founded in the 10th century, around 927-946 AD, making it over 1,000 years old! The current magnificent buildings, however, date mostly from the 19th century after a devastating fire destroyed much of the complex in 1833. The rebuilding effort was a national movement — Bulgarians from across the country donated money and labor to restore it.",
      "Why is it important?":
        "During nearly 500 years of Ottoman rule over Bulgaria, Rila Monastery was one of the few places where Bulgarian language, literature, and Orthodox Christian identity were kept alive. Monks here copied manuscripts, maintained schools, and preserved the national spirit. It was not just a religious site — it was a fortress of Bulgarian culture itself.",
      "What historical events happened here?":
        "The monastery survived many turbulent centuries. During Ottoman rule, it was granted special protections by Sultan Suleiman the Magnificent. In 1833, a catastrophic fire destroyed most of the buildings, leading to a remarkable National Revival-era reconstruction. The relics of Saint Ivan were moved here and have been venerated ever since. During the Bulgarian National Revival, the monastery became a symbol of resistance and cultural awakening.",
      "default":
        "I am deeply honored to guide you through these sacred halls! Rila Monastery has been the spiritual soul of Bulgaria for over a thousand years. Whether you wish to know about its breathtaking frescoes, the story of Saint Ivan, or its role as a cultural fortress during Ottoman rule — every corner here holds a story worth telling.",
    },
  },
  {
    id: "nessebar",
    name: "Ancient Nessebar",
    city: "Nessebar",
    country: "Bulgaria",
    coordinates: { lat: 42.6589, lng: 27.7372 },
    period: "3,200+ Years of History",
    description:
      "Nessebar is one of the oldest cities in Europe, with a history spanning more than 3,200 years. Originally a Thracian settlement, it was colonized by Greeks in the 6th century BC and later became a Byzantine stronghold. The old town sits on a small rocky peninsula jutting into the Black Sea and contains an extraordinary concentration of ancient churches, medieval fortifications, and archaeological treasures.",
    importance:
      "Ancient Nessebar is a UNESCO World Heritage Site recognized for its exceptional density of historical monuments — over 40 churches packed into a tiny peninsula. It represents a living crossroads of Thracian, Greek, Roman, Byzantine, and Bulgarian civilizations, making it one of the most remarkable historical cities in all of Europe.",
    funFact:
      "At its medieval peak, Nessebar had over 40 churches for a population of just a few thousand people — roughly one church for every 100 residents! Today, more than 20 of those ancient churches still stand, many dating back to the 5th century.",
    pastImageDescription:
      "Ancient Messembria at its Byzantine peak — a fortified city on a rocky peninsula, its skyline crowded with domed churches gleaming above the Black Sea",
    pastImageUrl: "/images/nessebar_past.png",
    modernImageUrl: "/images/nessebar_today.png",
    quickFacts: [
      "Over 3,200 years of continuous history",
      "UNESCO World Heritage Site since 1983",
      "Contains more than 40 ancient and medieval churches",
      "Originally called Messembria by ancient Greek colonists",
      "Sits on a rocky peninsula connected to the mainland by a narrow isthmus",
    ],
    chatResponses: {
      "Who built this city?":
        "Nessebar's history begins with the Thracian tribe called the Mendi who first settled the rocky peninsula over 3,000 years ago. Greek colonists from Megara arrived around 510 BC and founded the city of Messembria, building temples and a prosperous trading port. Later it passed to Roman, Byzantine, and Bulgarian rulers — each civilization leaving its mark on this extraordinary place.",
      "When was it built?":
        "The site has been continuously inhabited for over 3,200 years, making it one of the oldest cities in Europe. The Greek colony was established around 510 BC. The massive collection of Byzantine churches was built primarily between the 5th and 14th centuries. When you walk Nessebar's cobblestone streets, you literally walk over layers of Thracian, Greek, Roman, Byzantine, and Bulgarian history.",
      "Why is it important?":
        "Nessebar is a living museum — not just an archaeological site, but a town where people still live surrounded by 2,500 years of history. Its extraordinary concentration of Byzantine churches — over 40 in an area of just 0.26 square kilometres — is unparalleled anywhere in the world. Each church is a masterpiece of medieval architecture and mosaic art.",
      "What historical events happened here?":
        "Nessebar changed hands many times! Alexander the Great's forces passed through. The Romans conquered it in 72 BC. Byzantine Emperor Justinian II used it as a naval base. In 812, Bulgarian Khan Krum captured it after defeating Emperor Nicephorus I in battle. The Ottomans took it in the 15th century. Through all these conquests, the city's remarkable churches somehow survived, protected by their sheer number and the city's value as a trading port.",
      "default":
        "Walking through Nessebar is like stepping through a portal into multiple eras of civilization simultaneously! As your guide, I have witnessed Thracian fishermen, Greek philosophers, Byzantine monks, and Bulgarian warriors all call this tiny peninsula home. What era of this remarkable city's story shall we explore together?",
    },
  },
  {
    id: "madara",
    name: "Madara Rider",
    city: "Madara",
    country: "Bulgaria",
    coordinates: { lat: 43.2836, lng: 27.1158 },
    period: "8th Century (705–801 AD)",
    description:
      "The Madara Rider is a unique and mysterious medieval rock relief carved into a 23-metre-high vertical cliff near the village of Madara. Created between 705 and 801 AD, it depicts a majestic horseman triumphantly spearing a lion, with an eagle flying overhead and a dog running at the horse's heels. It is the only early medieval rock relief of its kind in Europe.",
    importance:
      "The Madara Rider is a UNESCO World Heritage Site and one of Bulgaria's most powerful national symbols — so important it appears on Bulgarian euro coins. As the only large-scale rock relief from the early medieval period in Europe, it is of unique global significance. The Greek inscriptions carved around it provide invaluable historical records of early Bulgarian rulers.",
    funFact:
      "The Madara Rider is carved into a cliff face at a height of 23 metres — yet archaeologists still debate who carved it and exactly how, as the medieval tools available would have made such precise high-altitude carving extraordinarily difficult. The image measures approximately 2.6 by 3.1 metres.",
    pastImageDescription:
      "8th-century Bulgaria — a master stonemason suspended on ropes against a towering cliff face, chiseling the triumphant image of a horseman into living rock by torchlight",
    pastImageUrl: "/images/madara_past.png",
    modernImageUrl: "/images/madara_today.png",
    quickFacts: [
      "Carved between 705–801 AD during the First Bulgarian Empire",
      "UNESCO World Heritage Site since 1979",
      "The only early medieval rock relief in Europe",
      "Depicted on Bulgarian euro coins",
      "Greek inscriptions around it record decrees of Bulgarian Khans",
    ],
    chatResponses: {
      "Who built this monument?":
        "The Madara Rider was carved during the First Bulgarian Empire, most likely commissioned by Khan Tervel or one of his successors in the early 8th century. The identity of the master craftsman who actually carved it is lost to history. The Greek inscriptions around the relief reference Bulgarian Khans Tervel, Kormesiy, and Omurtag — suggesting the monument was updated over nearly a century.",
      "When was it built?":
        "The relief was created between approximately 705 and 801 AD, during the reign of several Bulgarian Khans of the First Bulgarian Empire. This makes it roughly 1,300 years old. The Greek inscriptions were added at different times over about 100 years, making the Madara Rider a kind of living monument updated by successive rulers.",
      "Why is it important?":
        "The Madara Rider holds extraordinary importance for several reasons: it is the only large-scale early medieval rock relief in all of Europe, making it globally unique. The Greek inscriptions carved around it are among the most important written historical sources for early Bulgarian history. And symbolically, it represents the power and confidence of a young Bulgarian state asserting itself among great empires — worthy enough to appear on Bulgaria's euro coins.",
      "What historical events happened here?":
        "The cliff at Madara was sacred long before the Rider was carved — Thracian religious ceremonies were held here for thousands of years. When Bulgarian Khan Tervel helped Byzantine Emperor Justinian II reclaim his throne in 705 AD, the triumphant horseman image may have celebrated this diplomatic and military victory. The site continued to be used for royal proclamations for over a century, with each inscription adding a new chapter to Bulgaria's founding story.",
      "default":
        "The Madara Rider speaks across 1,300 years of silence — a stone horseman frozen in eternal triumph! This remarkable monument guards the history of Bulgaria's founding era. I have studied every inscription, every chisel mark on this cliff face. What mystery of the Madara Rider would you like me to unravel for you?",
    },
  },
  {
    id: "buzludzha",
    name: "Buzludzha Monument",
    city: "Stara Planina Mountains",
    country: "Bulgaria",
    coordinates: { lat: 42.7356, lng: 25.3948 },
    period: "Built 1974–1981",
    description:
      "Buzludzha Monument is an iconic circular structure built during the socialist era, perched dramatically on a mountain peak in the Balkan Range at 1,441 metres altitude. Designed by architect Georgi Stoilov and unveiled in 1981, it served as the ceremonial headquarters of the Bulgarian Communist Party. Today it stands abandoned — one of the most recognizable and surreal brutalist monuments in Eastern Europe.",
    importance:
      "Buzludzha is a monument of unique architectural ambition — a flying saucer-like structure on top of a mountain, decorated inside with massive socialist mosaic murals depicting Bulgarian history. Though ideologically controversial, it is widely recognized as a masterpiece of brutalist architecture and is the subject of intense preservation debate. It draws urban explorers and photographers from around the world.",
    funFact:
      "The interior of Buzludzha was decorated with over 7,000 square metres of mosaic artwork depicting scenes from Bulgarian and socialist history. The building required 6,000 workers and volunteers over 7 years to construct — and was then abandoned just a decade after opening, following the fall of communism in 1989.",
    pastImageDescription:
      "1981 — Buzludzha at its ceremonial opening, blazing with light against a mountain sunset, its iconic sickle and hammer insignia gleaming above the clouds",
    pastImageUrl: "/images/buzludzha_past.png",
    modernImageUrl: "/images/buzludzha_today.png",
    quickFacts: [
      "Built between 1974 and 1981 on a 1,441m mountain peak",
      "Contains over 7,000 square metres of socialist mosaic murals inside",
      "Required 6,000 workers over 7 years to construct",
      "Abandoned after the fall of communism in 1989",
      "Considered one of Europe's finest examples of brutalist architecture",
    ],
    chatResponses: {
      "Who built this monument?":
        "Buzludzha was designed by Bulgarian architect Georgi Stoilov and commissioned by the Bulgarian Communist Party leader Todor Zhivkov. Construction required an extraordinary effort — approximately 6,000 workers, soldiers, and volunteers toiled for seven years to build a massive concrete structure on top of a remote mountain peak, accessible only by a winding mountain road they had to build first.",
      "When was it built?":
        "Construction began in 1974 and the monument was officially inaugurated on August 23, 1981 — chosen to mark the anniversary of the Soviet liberation of Bulgaria. It served as an active Communist Party ceremonial hall for only about 8 years before the fall of communism in 1989 led to its abandonment. It has stood empty ever since — for over 35 years.",
      "Why is it important?":
        "Buzludzha is architecturally extraordinary — a massive circular structure resembling a flying saucer, perched impossibly on a mountain summit above the clouds. Despite its political origins, it is now recognized internationally as a masterpiece of brutalist and socialist modernist architecture. Its spectacular decay, combined with its haunting mountain setting, has made it one of the most photographed abandoned buildings in the world.",
      "What historical events happened here?":
        "The Buzludzha peak itself has deep historical significance — in 1891, socialist leader Dimitar Blagoev held a secret founding congress of the Bulgarian Social Democratic Party on this very mountain, which is why the monument was built here. After 1989, the building was stripped of its furnishings, its mosaics were vandalized, and it fell into spectacular decay. Today a preservation campaign called 'Buzludzha Project' fights to restore and protect it.",
      "default":
        "Buzludzha is perhaps the most haunting monument I have ever guided visitors through — a concrete colossus rising from mountain clouds, frozen in time between glory and decay! Its story spans idealism, political power, abandonment, and the strange beauty of ruins. What aspect of this extraordinary place would you like to explore?",
    },
  },
];
