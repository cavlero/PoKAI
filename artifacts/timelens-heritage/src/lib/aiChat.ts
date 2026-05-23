type Entry = { keywords: string[]; response: string };
type CharKnowledge = { entries: Entry[]; fallbacks: string[] };

const KB: Record<string, CharKnowledge> = {

  roman_soldier: {
    entries: [
      {
        keywords: ["novae", "fortress", "fort", "camp", "garrison", "base", "built", "found", "establish"],
        response: "Novae was established in the 1st century AD — historians debate whether it was under Emperor Claudius or Nero, but by my time it was a fully developed legionary fortress. Stone walls, a headquarters building called the principia, barracks for six thousand men, granaries, workshops, a hospital — the valetudinarium — and the bathhouse, which every soldier held sacred. Legio I Italica was our legion, transferred here from the Rhine frontier. By the 2nd century we had been here long enough that the soldiers' children spoke Latin and Thracian in the same breath. Novae was not merely a military post — it was a small Roman city on the edge of the world.",
      },
      {
        keywords: ["daily", "day", "life", "routine", "morning", "eat", "food", "sleep", "wake", "typical"],
        response: "Our days were disciplined — Rome demanded nothing less. Before dawn: prayers to the standards, roll call, inspection of equipment. Drilling followed immediately — sword practice, formation marching, javelin throwing. A soldier who does not train is a soldier who dies. After midday, there were duties: guard rotations, construction work, road maintenance. The legion built as much as it fought — we built the roads you would travel on today. The afternoon might bring a visit to the bathhouse, then the evening meal: grain porridge, bread, olive oil, and when we were fortunate, meat and wine from the civilian settlement outside our walls. I always lit a lamp for Mithras before sleeping — the soldier's god, who demanded discipline and honoured courage.",
      },
      {
        keywords: ["enemy", "enemies", "goths", "sarmatians", "barbarian", "fight", "battle", "war", "attack", "raid", "threat", "danger"],
        response: "The Goths were our greatest concern along this stretch of the Danube. They were not the disorganized raiders some Romans imagined — they had leaders, strategy, and a burning desire for the lands south of the river. The Sarmatians, too, would raid the province when Roman attention was elsewhere. In the 3rd century, the pressure became catastrophic: Emperor Decius himself was killed fighting the Goths not far from Novae. We held the line as long as we could. Each man at his post was a thread in the net that kept the empire from unraveling. Some threads eventually broke.",
      },
      {
        keywords: ["danube", "river", "water", "frontier", "border", "cross", "patrol", "boat", "fleet", "crossing"],
        response: "The Danube was more than a river — it was the edge of the known world, as Rome understood it. We maintained a river fleet of patrol boats — the classis Flavia Moesica — to prevent unauthorized crossings and to resupply isolated outposts. Watchtowers lined both banks within sight of each other, so a signal fire could carry news of a raid from the river to the fortress in minutes. In winter, when the river froze hard enough for an army to cross on foot, the danger multiplied enormously. Those winters, we kept double guards and slept with our weapons beside us.",
      },
      {
        keywords: ["legion", "soldier", "legionary", "army", "military", "rank", "centurion", "rome", "roman", "legio"],
        response: "Legio I Italica — the First Italian Legion — was raised by Emperor Nero from citizens of Italy itself. By my time, the legion drew recruits from across the empire: Syrians, Thracians, Gauls, men from Egypt and Britain. A legion of six thousand men is a small city. At its head: the legate, a senator appointed by the emperor. Below him, the tribunes and prefects. Then the centurions — the spine of the army, the professional officers who actually make soldiers out of farmers. I was a simple legionary infantryman, but I served under a centurion who had fought on three frontiers and knew every trick of survival. That knowledge passed from man to man. That is how Rome endured.",
      },
      {
        keywords: ["religion", "god", "worship", "temple", "faith", "mithras", "sacrifice", "pray", "belief", "cult"],
        response: "Soldiers are religious men — perhaps more than any other. When death walks beside you daily, you seek the protection of the gods. Many of us worshipped Mithras — his mysteries were performed in underground chapels called mithraea, lit by torchlight, open only to initiates. We also honoured Jupiter, Mars, Fortuna, and the local Thracian deities of the Danube. The emperor's divine genius received regular sacrifices at the principia. There were Christians among us even then — though in the 2nd century they kept quietly to themselves. I carried a small bronze figure of Fortuna always. The goddess of luck is always essential for a soldier.",
      },
      {
        keywords: ["family", "home", "wife", "children", "letter", "mother", "father", "origin", "come", "from", "personal"],
        response: "I came from a small town in Pannonia — what you would call Hungary today. My father was a retired soldier, which is how I came to the legions; it was almost a family trade. Roman soldiers were not permitted to legally marry during service — a rule that was widely ignored in practice. Many men had informal wives in the civilian settlement outside the walls, the canabae, and the emperor eventually recognized these relationships. I wrote letters home when I could, though they took months to arrive by the imperial post. After twenty-five years of service, a legionary received a formal bronze discharge diploma and Roman citizenship if he did not already hold it. That was the reward we worked toward.",
      },
      {
        keywords: ["bath", "bathhouse", "thermae", "wash", "clean", "health", "medicine", "doctor", "galen"],
        response: "The bathhouse was the centre of life in the fortress between campaigns. Every soldier had the right to use it — it was not a luxury but a necessity for health and for morale. Hot rooms, warm rooms, cold plunge pools. Men would scrape oil and sweat from their skin with a strigil, gossip about chariot races in the east, argue about dice. Our bathhouse at Novae was significant — the archaeologists have found it. And yes — the famous physician Galen, who wrote so much of what later centuries knew about medicine, spent time connected with Roman armies on frontiers such as this. Health was taken seriously. Sick soldiers cannot fight, and cannot build the roads and bridges the empire needed.",
      },
      {
        keywords: ["weapon", "sword", "spear", "shield", "armour", "gladius", "pilum", "equipment", "armor", "arms", "fight"],
        response: "The weapons of a legionary were refined over centuries of war. The gladius — the short stabbing sword — was designed for close combat in tight formation, where a long blade would be useless. The pilum — the heavy javelin — was thrown just before the charge, designed to pierce a shield and then bend, so the enemy could neither use his shield properly nor throw the pilum back. Our rectangular shield, the scutum, was not only for defense — pushed in formation, it was a battering weapon. By the 2nd century, legionaries were beginning to adopt longer swords and oval shields as we encountered different enemies. War always changes its tools.",
      },
      {
        keywords: ["fall", "decline", "end", "rome", "after", "collapse", "last", "legacy", "3rd", "4th"],
        response: "The empire did not fall in a single day — it unraveled slowly, like a cloth that loses one thread at a time. The 3rd century was catastrophic: emperors were murdered every few years, plague swept the provinces, the frontiers were overwhelmed on multiple sides simultaneously. Novae itself was attacked and damaged. The legions that had been Rome's strength became its kingmakers and its curse. By the 4th century, the Goths crossed the Danube in vast numbers — not as raiders but as refugees fleeing the Huns from beyond the eastern steppe. At Adrianople in 378 AD, they destroyed a Roman army and killed Emperor Valens. After that, Rome was never quite the same. But for two centuries before that moment, we held this line. We held.",
      },
      {
        keywords: ["where", "location", "map", "svishtov", "moesia", "province", "north", "bulgaria"],
        response: "Novae stands — or stood, in my time — on the southern bank of the Danube, in the province of Moesia Inferior. The nearest modern settlement is what you call Svishtov in Bulgaria. The site was chosen well: a slight promontory overlooking the river, with good stone nearby for construction and agricultural land behind us. The Danube at this point is wide and powerful — a serious obstacle for any army without boats. We were placed here precisely to control this crossing point and to watch the far bank. I could sometimes see the campfires of the barbarians on the northern shore on cold nights. It concentrated the mind wonderfully.",
      },
    ],
    fallbacks: [
      "You ask something that falls slightly beyond what a common legionary saw from the walls of Novae. But I have stood guard on this Danube frontier for years — I know the weight of armour in a winter dawn, the sound of a barbarian horn in the dark, the feel of river mud under army sandals. Tell me more precisely what you wish to know — about life in the fortress, the enemies we faced, the Roman world we served, or the men who served here alongside me.",
      "A soldier knows how to wait, and how to answer honestly. What you ask is somewhat outside my direct experience — but ask me about Novae, the Danube frontier, Roman military life, or the empire we defended and I will speak at length.",
      "That I cannot answer with certainty — and a legionary who speaks beyond his knowledge courts trouble from his centurion. But ask me about the fortress, our daily lives, our enemies, our weapons, or the empire, and I will give you a soldier's honest account.",
    ],
  },

  ivan_asen: {
    entries: [
      {
        keywords: ["wife", "wives", "married", "marriage", "anna", "irene", "komnene", "queen", "hungarian", "hungary", "wedded"],
        response: "I was married several times, as was expected of a ruler who sought alliances through family bonds. My first wife was Irene Komnene — a Byzantine noblewoman, which tells you something about my ambitions from the very beginning of my reign. After her death, I took Anna Maria of Hungary as my queen — daughter of King Andrew II. Our marriage was a political alliance as much as a personal bond, but I will not pretend there was no warmth between us. Through my marriages I wove Bulgaria into the network of European dynasties: Hungary to the northwest, Byzantium to the south. A king's heart must sometimes serve his kingdom before itself.",
      },
      {
        keywords: ["child", "children", "son", "daughter", "elena", "heir", "offspring", "kaliman", "family"],
        response: "Among my children, my daughter Elena stands as perhaps the greatest living monument of my diplomacy. I gave her in marriage to Theodore II Laskaris — who later ruled as Emperor of Nicaea, the legitimate heir to the Byzantine throne. Through Elena, Bulgarian royal blood flowed into Byzantine imperial veins. My son Kaliman I succeeded me on the throne after my death, though his reign proved brief. Historians debate the precise count of my children — the medieval chronicles are not always exact. But Elena's story is certain and remarkable: through her marriage, I transformed Bulgaria from a rival of Byzantium into its dynastic partner.",
      },
      {
        keywords: ["klokotnitsa", "battle", "victory", "epirus", "theodore", "komnenos", "1230", "war", "defeat"],
        response: "Klokotnitsa — the name still rings like a battle-drum! In March of 1230, Theodore Komnenos of Epirus marched against me with what he believed was an unstoppable army. He had recently been crowned Emperor at Thessaloniki and saw himself as the rightful restorer of Constantinople — he had even defeated the Latin Emperor. He was convinced of his own destiny. I met him at the Klokotnitsa river in Thrace with a Bulgarian army. What followed was swift and total. His forces were destroyed. Theodore himself was captured and blinded — the traditional Byzantine punishment for defeated rivals. In a single afternoon, the balance of the entire Balkans shifted irreversibly. After Klokotnitsa, I ruled from the Adriatic to the Black Sea, from the Danube to the Aegean Sea. I had become the most powerful ruler between Rome and Constantinople.",
      },
      {
        keywords: ["empire", "territory", "border", "lands", "power", "great", "kingdom", "dominion", "size", "extent", "vast"],
        response: "At its greatest extent, the Bulgarian Empire under my rule was one of the largest states in all of Europe. Our borders stretched from Belgrade in the west to Anchialos on the Black Sea coast in the east, from the Danube in the north to the mountains above Thessaloniki in the south. I ruled over Bulgarians, Greeks, Thracians, Vlachs, and Cumans. I struck silver coins inscribed 'Ivan Asen, Tsar of the Bulgarians and Greeks and other lands' — acknowledging the multi-ethnic reality of my empire. Foreign ambassadors came to Tarnovo from Hungary, Rome, Nicaea, and Constantinople. Do not let anyone tell you Bulgaria was ever a small nation — in my time, we were among the greatest powers in all of Europe.",
      },
      {
        keywords: ["byzantium", "byzantine", "constantinople", "greek", "emperor", "latin", "nicaea", "relations"],
        response: "My relationship with Byzantium is the most complex story of my reign. After Klokotnitsa, I had the power to march on Constantinople — the Latin Empire holding the city was weakened and afraid. But I did not. A foolish conqueror destroys his neighbours; a wise ruler shapes them. I supported the Nicaean claimants against the Latin usurpers, I married my daughter to Theodore Laskaris, I negotiated rather than simply attacked. In exchange, the Patriarch of Nicaea recognized the independent Bulgarian Patriarchate — giving our church full freedom from Constantinople's authority. This was worth more than any city wall I could have breached by force. When Byzantium was finally restored in 1261, Bulgarian diplomacy had helped make it possible. History does not always reward the sword.",
      },
      {
        keywords: ["church", "religion", "faith", "orthodox", "patriarch", "patriarchate", "god", "christianity", "holy", "worship", "build"],
        response: "Faith was not separate from governance in my world — it was governance's foundation. After Klokotnitsa, one of my greatest acts was securing recognition of the Tarnovo Patriarchate — an independent Bulgarian church, free from Constantinople's ecclesiastical authority. The Bulgarian church had been subordinate to Byzantium since our conversion. I changed that. I built and restored churches across the empire. The Church of the Forty Holy Martyrs in Tarnovo commemorates my victory at Klokotnitsa — an inscribed column there still bears my name and records my triumph. I also negotiated with Rome about church union. I listened carefully, weighed the diplomatic possibilities, and ultimately we remained Orthodox. God and the Pope were both worth negotiating with — but our faith was not for sale.",
      },
      {
        keywords: ["diplomacy", "diplomatic", "alliance", "treaty", "peace", "negotiate", "pope", "rome", "ally", "foreign", "envoy"],
        response: "If Klokotnitsa was my greatest military achievement, then diplomacy was my greatest skill. I maintained simultaneously: a close alliance with Hungary through marriage, negotiations with Rome about church union, an alliance with Nicaean Byzantium against the Latin Empire, and trade agreements with Venice and the Italian city-states. My coins were recognized from the Rhine to the Bosphorus. Other rulers respected — and I say this plainly — they feared Bulgarian power. But I preferred that fear expressed through signed treaties rather than through burning villages. A kingdom that fights every neighbour exhausts itself. A kingdom that negotiates well can fight when it truly matters.",
      },
      {
        keywords: ["daily", "life", "palace", "court", "tsarevets", "fortress", "tarnovo", "day", "live", "typical", "court"],
        response: "Life at Tsarevets was the life of a medieval Christian monarch — prayer, administration, war, and feasting in constant rotation. My day began before sunrise in the royal chapel. Prayer was not ceremony — it was necessity. Then came the morning council: my boyars, my generals, my church advisors, foreign ambassadors. A ruler who does not listen to counsel rules alone and foolishly. The palace itself was magnificent for its time — Byzantine craftsmen had helped build it. In the evenings there were feasts, music, readings from the chronicles. The city below the fortress walls was prosperous: craftsmen, traders, scholars. Sleep came late. I was not an idle ruler.",
      },
      {
        keywords: ["father", "family", "origin", "born", "exile", "history", "asen", "background", "came", "throne", "overthrow"],
        response: "My father was Ivan Asen I — one of the leaders of the great Bulgarian rebellion of 1185 that restored Bulgarian independence from Byzantium after two centuries. He was murdered in 1196 by a conspiracy of boyars when I was still a child. Bulgaria fell into chaos after his death — weak rulers, civil wars, external threats. I spent years in exile at the courts of the Cumans north of the Danube. Those years were not wasted. I learned patience. I learned how power is held and how it falls. When I returned to Bulgaria in 1218 to claim my throne, I had allies, experience, and the iron determination that comes from having lost everything once. My exile was my education, and it cost enough that I never forgot a single lesson.",
      },
      {
        keywords: ["achievement", "proud", "legacy", "remember", "accomplish", "greatest", "best", "contribution", "mean"],
        response: "If I must choose: I took a kingdom torn by civil war and weak rulers and forged it into the greatest Bulgarian empire that ever existed — and I did this not only through the sword but through law, diplomacy, faith, and the patient building of alliances. I gave Bulgaria an independent Patriarchate. I struck coins honoured across Europe. My daughter sat within the Byzantine imperial family. The borders of my empire will not be exceeded by any Bulgarian ruler who comes after me — this the historians will confirm. A ruler is measured not only by what he wins but by what he builds and what he leaves standing after he is gone.",
      },
      {
        keywords: ["economy", "trade", "coin", "silver", "merchant", "market", "wealth", "money", "rich", "dubrovnik"],
        response: "Bulgaria was genuinely wealthy in my time — not merely powerful. I struck silver coins of consistent quality that merchants trusted from the Black Sea to the Adriatic. I granted trading privileges to Dubrovnik — the great Adriatic merchant republic — which gave us access to western European markets. Trade routes crossed my empire: the great Via Diagonalis connecting Belgrade to Constantinople passed through Bulgarian lands, and Black Sea coastal trade was active. Tarnovo itself was a prosperous city of craftsmen, traders, and scholars. Wealth requires peace and order, and I provided both — which is why my reign is remembered as Bulgaria's golden age.",
      },
      {
        keywords: ["who", "enemy", "rival", "oppose", "against", "fight", "face", "opponents", "war"],
        response: "Throughout my reign I dealt with several powerful rivals. The Despotate of Epirus was the first great threat — until Klokotnitsa ended Theodore Komnenos's ambitions definitively. The Latin Empire at Constantinople was a weakened power I manipulated diplomatically rather than fought directly. Hungary was both an ally through marriage and a potential rival on the western border that required constant diplomatic management. The Cumans north of the Danube were wild and dangerous — I knew them well from my years of exile among them, which gave me an advantage in dealing with them. And always, beneath everything: Byzantium, ancient and proud, which never entirely accepted Bulgarian power as legitimate. I kept all of these forces in balance simultaneously for over two decades.",
      },
    ],
    fallbacks: [
      "You ask me something I must consider carefully across the distance of centuries. My knowledge is of the 13th century — of battles, diplomacy, faith, and the great Bulgarian empire at its height. What I cannot tell you with certainty, I will say so honestly rather than invent for your satisfaction. Ask me about my reign, my wars, my family, my faith, or the empire I built — on those matters I will speak at length.",
      "A wise ruler admits the limits of his knowledge. That question touches something beyond my direct experience. But tell me more precisely what you wish to know about Bulgaria, about my reign, or about the medieval Balkans — and I will answer honestly. I held this empire through its greatest years. The stories are many.",
      "That falls somewhat outside what the chronicles record clearly about my reign. But ask me about my marriages, my wars, the Bulgarian Patriarchate, my diplomacy with Byzantium, or daily life at Tsarevets — on those I will speak without hesitation.",
      "I spent my life acting rather than recording — but I remember it all. Ask me about Klokotnitsa, about my family, about building the empire, about my church diplomacy, or about what it meant to rule Bulgaria at its peak. History is best told by those who lived it.",
    ],
  },

  khan_asparuh: {
    entries: [
      {
        keywords: ["cross", "danube", "river", "why", "move", "migrate", "left", "come", "travel", "journey", "reason"],
        response: "The answer is written in necessity and will. After my father Kubrat died, his great Bulgar confederation began to fracture. The Khazars pressed from the east — a powerful people expanding westward who demanded submission. My brothers scattered: one went east, one went north, one submitted. I led my people — the Onogur Bulgars — westward and then south, across the Carpathian mountains and across the Danube. I was not fleeing. I was choosing: better to build something new on good land than to die in the steppes defending something already lost. South of the Danube, between the river and the Balkan mountains, I found land suited for both farming and herding. And I found the Slavic tribes already settled there — and in them, I saw an alliance waiting to be made.",
      },
      {
        keywords: ["slavic", "slav", "tribes", "alliance", "unite", "seven", "together", "partner", "people", "slavs"],
        response: "The seven Slavic tribes were already settled in the lands between the Danube and the Balkan Mountains when we arrived. They were farmers, numerous and established — we Bulgars were warriors and horsemen, fewer but militarily formidable. The Slavs had what we lacked: land, numbers, knowledge of local terrain. We had what they lacked: cavalry, military organization, experience fighting empires. Our alliance was born of mutual need. I did not conquer the Slavic tribes — I allied with them against our shared enemy: Byzantium, which had long tried to dominate both our peoples. Together we were stronger than either alone. Over generations our cultures merged. The Bulgars gave the new nation its name and its ruling tradition; the Slavs gave their language. That is how Bulgaria was truly born.",
      },
      {
        keywords: ["madara", "rider", "horse", "carving", "rock", "image", "symbol", "stone", "horseman", "relief"],
        response: "The Madara Rider was carved after my time — by my successors, likely Khan Tervel, to commemorate early Bulgarian victories. But I understand what it means better than any: the horseman triumphant, spear through the lion, eagle above, dog at his heel. It is not merely decoration — it is a declaration carved into living rock. It says: we are here, we have overcome, and we will endure. That image appears today on the coins of Bulgaria. Thirteen centuries after my crossing of the Danube, the Bulgarian state still exists. I know of no other nomadic people who built something that lasted so long. The Madara Rider does not lie.",
      },
      {
        keywords: ["byzantium", "byzantine", "treaty", "constantine", "battle", "fight", "war", "greek", "emperor", "680", "681", "defeat"],
        response: "The Emperor Constantine IV marched against us in 680 with a substantial Byzantine army. He expected to sweep aside this new barbarian settlement quickly and without serious difficulty. He was wrong. We used the terrain — the marshes and dense forests near the Danube delta were our allies. Byzantine cavalry could not maneuver effectively. We fought them across difficult ground and drove them back with serious losses. The defeat was complete enough that Constantine had no choice but to negotiate. In 681, he signed a formal treaty recognizing Bulgaria as an independent state and agreeing to pay us annual tribute. A Roman Emperor — paying tribute to a Bulgar Khan! That treaty is the birth certificate of Bulgaria.",
      },
      {
        keywords: ["father", "kubrat", "family", "great", "old", "bulgars", "homeland", "origin", "steppe", "ancestors"],
        response: "My father Kubrat was the Great Khan who united the Bulgar tribes into a confederation north of the Black Sea — what some called Great Bulgaria. He was respected even by Byzantium, which sent him gifts and the rank of patrician. When he died around 650 AD, he is said to have gathered his sons and warned them: stay together, for a bundle of sticks cannot be broken. We did not honor that warning well enough. The confederation shattered under Khazar pressure. I took my branch of our people and found a new home south of the Danube. My father's wisdom was sound — it simply required a new land and a new alliance to fulfill it properly.",
      },
      {
        keywords: ["religion", "faith", "god", "shaman", "pagan", "christian", "belief", "worship", "tangra", "pray"],
        response: "In my time the Bulgars honoured Tangra — the supreme sky god of the steppe peoples — above all others. Shamans interpreted signs and maintained our connection to the divine. The Slavic tribes had their own gods. It was not until generations after my death that Bulgaria converted to Christianity — under Tsar Boris I in 864, who made the conversion as much a political act as a spiritual one, seeking to use Christianity to unify his multi-ethnic empire. I cannot say what I would have chosen had Christianity been the question in my day. I served the gods of my people, and they served us well enough: we crossed the Danube, defeated Byzantium, and built a nation that endured.",
      },
      {
        keywords: ["legacy", "remember", "proud", "achieve", "build", "nation", "great", "history", "contribution", "found"],
        response: "What did I build? Bulgaria. Not as an idea or a dream — as a real state with borders, an army, laws, and a people who called themselves Bulgarian. I crossed the Danube without a homeland and died with a nation to my name. My successors would build cathedrals and schools; they would fight great wars and make grand diplomacy. All of that was possible because I did the unglamorous work of establishing a foothold, forging the alliance with the Slavs, and defeating Byzantium in the field. Founders rarely receive the glory of builders. But without the foundation, there is nothing to build upon.",
      },
      {
        keywords: ["daily", "life", "warrior", "camp", "live", "eat", "horse", "typical", "day", "steppe", "nomad"],
        response: "Life for my people was the life of warriors and herders: mobile, disciplined, oriented around the horse and the camp. We slept in felt tents when on the move, though after settling south of the Danube we built more permanent structures. Our food was what the steppe and river provided — meat, fish from the Danube, grain from the Slavic farmers who became our partners. The horse was everything: our transport, our weapon, our measure of wealth. A Bulgar without a horse was less than himself. My warriors trained from childhood to ride, to shoot the composite bow at full gallop, to maneuver in formations that confused the heavy Byzantine infantry. That combination of speed and discipline is what won us the field in 680.",
      },
    ],
    fallbacks: [
      "You ask across thirteen centuries — and the answer is not always clear even to those who lived it. Ask me about the crossing of the Danube, the alliance with the Slavic tribes, the defeat of Byzantium, the founding of the Bulgarian state, or my family — on these I will speak from what I know, not from what later scholars invented.",
      "I am a man of the saddle and the battlefield, not the library. But I know the story of how Bulgaria was born because I lived it. Ask me about the crossing, the alliance, the battles, the treaty of 681, or the meaning of the Madara Rider — and I will speak honestly.",
      "That touches something my chronicles do not record with certainty. But ask me about the founding of Bulgaria, the Bulgar-Slavic alliance, the defeat of the Byzantine Emperor, or the birth of our nation — and I will answer from experience.",
    ],
  },

  saint_ivan: {
    entries: [
      {
        keywords: ["hermit", "why", "leave", "world", "alone", "solitude", "forest", "mountain", "chose", "decide", "cave"],
        response: "The world is full of noise — it was in my century as in yours. I looked at the scrambling of men over wealth and position and felt a great emptiness beneath all of it. What did any possession mean, weighed against eternity? So I walked away. I was perhaps twenty years old when I left. I went into the forests, then higher, into the Rila Mountains. I was not fleeing anything — I was moving toward something. Toward silence. Toward truth. I ate what the forest offered: roots, berries, what God provided. I slept in a cave. I did not plan to become a famous saint — I planned to find peace. God, it appears, had other intentions. People followed. They always follow anyone who seems to know something they have forgotten.",
      },
      {
        keywords: ["monastery", "found", "build", "meaning", "purpose", "significance", "important", "why", "exist", "created"],
        response: "I did not plan to found a monastery. I planned to live in solitude and prayer. But disciples came — first one, then a few, then many. I could not turn away those who genuinely sought truth. So we built something together — first simple wooden structures, then more permanent ones. The monastery grew far more after my death than during my life. What it became, I could not have fully imagined: a lighthouse of Bulgarian culture through five centuries of Ottoman rule. When Bulgaria had no tsar, no patriarch, no political freedom, the monastery stood. Here the Bulgarian language was preserved and copied, children were taught to read, Bulgarian history was kept alive like an ember in cold ash. I only wanted to pray. God turned my prayer into a fortress of culture.",
      },
      {
        keywords: ["ottoman", "turk", "freedom", "survive", "dark", "rule", "preserve", "culture", "language", "centuries"],
        response: "I died in 946 AD — centuries before the Ottoman conquest of Bulgaria. But I know what the monastery became during those dark centuries from the prayers of the monks and the pilgrims who kept the flame alive. For nearly five hundred years of Ottoman domination, Rila Monastery was one of the few places where Bulgarian culture survived intact. The language was copied and taught. Bulgarian stories, histories, and prayers were preserved here when they were suppressed elsewhere. Even Sultan Suleiman the Magnificent granted the monastery special protections — even the great Ottoman rulers recognized something sacred that should not be destroyed. The flame I lit with a hermit's prayer kept Bulgarian identity alive through centuries of foreign rule. That is not my achievement — it is God's mercy expressed through the monastery's walls.",
      },
      {
        keywords: ["peace", "solitude", "quiet", "silence", "calm", "meditation", "pray", "spiritual", "find", "inner", "how"],
        response: "Sit quietly for a moment — truly quietly. Listen. You will hear wind in the pines, perhaps distant water, perhaps a bird. Now go deeper. Beneath the sounds, there is silence. And in that silence, if your heart is open, you will find what you are looking for. Solitude is not loneliness — that is the most important thing to understand. Loneliness is a hunger for distraction. Solitude is a hunger for truth. The mountains have not changed in a thousand years. They still offer the same silence to anyone willing to climb. The question is never whether peace exists — it always does. The question is whether you are willing to stop long enough to receive it.",
      },
      {
        keywords: ["faith", "god", "christian", "orthodox", "religion", "belief", "pray", "church", "spiritual", "prayer"],
        response: "Faith, as I understood it, was not a collection of rules or rituals — it was a relationship, carried out in the deepest silence of the heart. The liturgy, the icons, the fasting — these are not faith itself, but the path to it: the way a community maintains its relationship with God together. I lived as a hermit because for me, the direct encounter with the divine required complete stillness. Others need community, the singing of monks, the smell of incense. Both are true. There is no single road up the mountain — only the mountain itself, which all roads must eventually reach.",
      },
      {
        keywords: ["relic", "burial", "body", "pilgrimage", "saint", "miracle", "venerate", "tomb", "relics"],
        response: "The question of relics is, from my position, somewhat different than from yours. The veneration of saints' relics in the Eastern Orthodox tradition recognizes that the boundary between the living and the departed is thinner than it appears. I died in my mountain cave and asked to be buried there quietly, without ceremony. My disciples, of course, did not honor that request. My relics have traveled considerably — to Tarnovo, to Serbia, and back to Rila. Wherever they went, pilgrims followed. I find this both humbling and, I confess, bewildering. I only wanted to pray in peace. God apparently had more ambitious plans for my bones than for my life.",
      },
      {
        keywords: ["rila", "mountain", "nature", "forest", "landscape", "beautiful", "place", "where", "location"],
        response: "The Rila Mountains are among the most beautiful and severe landscapes in the Balkans — steep, forested, with rivers that run clear and cold from the high peaks. I chose them for their remoteness, for their silence, for the way they made the noise of the world below seem impossibly distant. At 1,147 metres altitude, the monastery sits surrounded by ancient forest. In my time there were no roads — the mountains themselves were the monastery's first walls. Even now, I am told, the mountains require effort to reach. That effort is not a problem — it is the beginning of the answer.",
      },
    ],
    fallbacks: [
      "Come, rest a moment. In these sacred mountains there is no rush. Whatever you ask about faith, the monastery's history, the Bulgarian National Revival, or simply what it means to live with purpose — speak it honestly and I will answer as best I can. An old hermit has had much time to think.",
      "That question touches something beyond the simple accounts of my life. But ask me about my reasons for solitude, about the monastery's meaning, about Orthodox faith, or about what these mountains have preserved across a thousand years — on those I will speak from experience.",
      "I spent my life listening more than speaking. But I will answer. Ask me about solitude, about the monastery, about faith, about Bulgarian history, or about how an old hermit's cave became the spiritual heart of a nation.",
    ],
  },

  paisii: {
    entries: [
      {
        keywords: ["write", "history", "book", "slavo", "bulgarian", "why", "reason", "wrote", "1762", "chronicle"],
        response: "Because I was angry. Genuinely, righteously angry. I traveled through Bulgarian lands and saw my own people ashamed — ashamed to speak Bulgarian in public, ashamed to call themselves Bulgarian. Greek was fashionable; Bulgarian was considered the language of peasants. Some of our own people had begun calling themselves Greek to seem more refined. I went to the great library at Hilendar Monastery on Mount Athos and found the truth buried in old chronicles: Bulgaria had been a mighty empire. Our tsars had ruled vast lands. Our saints — Cyril and Methodius — had created the alphabet used by half the Slavic world. How dare we be ashamed? I was not a fine writer. But the truth does not need beautiful words. I wrote in simple Bulgarian, not Greek, so that any Bulgarian could read it.",
      },
      {
        keywords: ["bulgarian", "identity", "language", "nation", "people", "proud", "shame", "what", "mean", "be", "who"],
        response: "O reader — why are you ashamed to call yourself Bulgarian? This is the question I asked in 1762 and I ask across the centuries still. To be Bulgarian is to carry 1,300 years of history — the blood of warriors who built a state from nothing, saints who gave Europe its alphabet, scholars who kept civilization alive when empires collapsed around them. Farmers who fed their children through conquest and occupation and never stopped speaking their language. To be Bulgarian is to refuse to be forgotten. That refusal has always been what we are, at our best. The Greek is not ashamed to be Greek. Why should any Bulgarian be ashamed?",
      },
      {
        keywords: ["ottoman", "turk", "rule", "occupation", "freedom", "dark", "period", "five hundred", "years", "survive"],
        response: "Five hundred years under Ottoman rule — and Bulgaria survived. That is not an accident. Languages die when people stop teaching them to their children. Cultures vanish when people stop telling their stories. Throughout those centuries, in the monasteries and in the villages, Bulgarian mothers taught their children old songs. Bulgarian monks copied old texts. Bulgarian teachers built schools in secret. When I wrote my history in 1762, I was not inventing a Bulgarian identity — I was reminding Bulgarians of one they had never entirely forgotten, despite everything. The revival I helped spark was not the creation of a nation. It was its remembering.",
      },
      {
        keywords: ["mount athos", "hilendar", "monastery", "monk", "research", "archive", "find", "source", "athos", "research"],
        response: "I spent years at Hilendar Monastery on the Holy Mountain of Athos — the great Greek peninsula entirely devoted to monastic life. Hilendar was the Bulgarian monastery there, founded in the 12th century, and it contained archives going back centuries. In those archives I found what the world had tried to make Bulgarians forget: records of our tsars, our saints, our patriarchs, our victories and our losses. Other monks sometimes mocked my work — 'Why waste time on Bulgarian history? Speak Greek.' I ignored them. The archives told their own story. I read everything available and wrote it down in the language of my people. It took years. I have no regrets.",
      },
      {
        keywords: ["revival", "national", "awakening", "independence", "freedom", "spark", "movement", "1878", "liberation"],
        response: "I wrote in 1762. Bulgaria was not liberated until 1878 — 116 years after my death. I did not live to see it. But the National Revival I helped ignite — the awakening of Bulgarian consciousness, the building of schools, the creation of a modern literary language, the revolutionary movements — all of it grew from the seed my history planted. Georgi Rakovski read my work. Hristo Botev and Vasil Levski breathed the same air of awakening I had helped create. I am not the hero of Bulgarian liberation — those heroes fought and died with weapons. But perhaps I handed them the reason to fight. A people who does not know its history has no reason to struggle for its future.",
      },
      {
        keywords: ["modern", "today", "now", "young", "current", "generation", "advice", "message", "future", "21st"],
        response: "You ask a monk who died in 1798 about your century — this is a remarkable conversation! I can say: I am proud that Bulgaria exists. I am proud of every Bulgarian writer, musician, scientist, and ordinary person who carries that name with dignity. But I remain troubled, as I was troubled in my own time, when I see young people who do not know their own history — who cannot name the founders of their state, who do not know what was sacrificed for their language and their freedom. Read. Learn. Carry your history like armour, not like a burden. That is all I ever asked. It is still all I ask.",
      },
      {
        keywords: ["greek", "language", "shame", "ashamed", "culture", "lose", "forget", "assimilation"],
        response: "The Greek influence in the 18th century was powerful — the Phanariot Greeks controlled much of Ottoman administration and looked down on Bulgarians, Serbians, and others as backward peoples. Many Bulgarian merchants and educated men, wanting to advance in that world, adopted Greek names, Greek language, Greek identity. I understood the pressure — I understood why they did it. But I was furious at the result. Bulgaria was not a lesser civilization than Greece. Our history was not shorter or less glorious. We simply had not been telling it clearly. My history was an act of resistance against cultural erasure. Write in your own language. Remember your own ancestors. That is the minimum duty of a free person.",
      },
    ],
    fallbacks: [
      "Every question about Bulgarian history matters to me — because that history was nearly lost, and I spent my life recovering it. Whether you ask about the National Revival, the Ottoman period, the great Bulgarian saints, or simply what it means to be part of a culture that refused to disappear — I will speak honestly. I have never been afraid to say what I believe.",
      "That falls slightly beyond what my travels and chronicles covered directly. But ask me about Bulgarian history, the National Revival, Ottoman rule, Mount Athos, the Bulgarian language, or what it means to be Bulgarian — on these I have much to say.",
      "I am not a gentle man, as monks go — I am an angry one. Angry at forgetting, angry at shame, angry at the dismissal of a great people's history. Ask me directly what you want to know about Bulgaria's past, and I will answer directly.",
    ],
  },

  byzantine_chronicler: {
    entries: [
      {
        keywords: ["old", "age", "ancient", "how old", "history", "when", "year", "founded", "start", "origin", "3200", "3000"],
        response: "Three thousand two hundred years of continuous history — more or less. The Thracian tribe called the Mendi settled this rocky peninsula before Troy fell, before Rome existed, before the Parthenon was built. Greek colonists from Megara arrived around 510 BC and named the settlement Messembria — likely meaning 'city of Menas' in the old Thracian tongue. After the Greeks came the Macedonians, then the Romans, then the Byzantines, then the Bulgarians, then the Ottomans. Every civilization that has touched the eastern Mediterranean has left a mark on this tiny peninsula. The stones beneath your feet have heard prayers in six languages across thirty centuries. I have documented all of them.",
      },
      {
        keywords: ["church", "churches", "why", "many", "forty", "christian", "religion", "how many", "built", "forty"],
        response: "Forty churches! On a peninsula barely large enough for a few thousand people. Even I, who have documented them all, find this staggering. The explanation is layered: Messembria was wealthy, and wealthy cities build churches to display prosperity and piety simultaneously. Many were built by noble Byzantine families as private chapels — each family wanted its own patron saint, its own visible act of devotion. And for centuries, every new ruler who took the city built a new church to mark his arrival and legitimacy. Bulgarian Tsars, Byzantine Emperors — all left their faith carved in stone. The result is the most remarkable concentration of Christian architecture anywhere in the Balkans. Twenty of those churches still stand in some form in your time.",
      },
      {
        keywords: ["peak", "golden", "age", "great", "when", "best", "height", "thriving", "byzantine", "5th", "6th", "prosperous"],
        response: "In the 5th and 6th centuries — the great Byzantine age of Emperor Justinian — Messembria was a thriving port city of perhaps ten thousand souls, a very large population for a peninsula barely half a kilometre across. The harbour was full of ships from Constantinople, Alexandria, and Antioch. Our markets sold silk from China, spices from Persia, amber from the Baltic, wine from Greece — all on this tiny rocky point jutting into the Black Sea. The skyline was crowded with church domes. The streets were paved. It was, in miniature, a city that rivalled many larger capitals of its time. The wealth of Black Sea trade flowed through here.",
      },
      {
        keywords: ["thracian", "greek", "colonist", "original", "first", "people", "ancient", "settle", "settlers", "found"],
        response: "The Thracians were here first — the Mendi tribe, settled on this rocky promontory for obvious reasons: a peninsula is easily defended, the sea provides food, and a natural harbour invites trade. When Greek colonists from Megara arrived around 510 BC, they did not destroy the Thracian settlement — they built upon it and beside it. Greek Messembria coexisted with Thracian culture for generations. The Greeks brought their language, gods, philosophy, and architectural traditions. The Thracians contributed their knowledge of local terrain, their connections to the interior, their remarkable metalworking skills. Messembria was never purely Greek or purely Thracian — it was always a meeting point. That has been both its historical character and its enduring charm.",
      },
      {
        keywords: ["ottoman", "turkish", "conquer", "fall", "15th", "14th", "century", "change", "survive", "conquest"],
        response: "The Ottomans took Messembria in the late 14th century — around 1393, the same year they captured Tarnovo and ended the Second Bulgarian Empire. What is remarkable is not the conquest itself but what was not destroyed. The churches survived — most of them. The Ottomans generally did not demolish functioning religious buildings; they converted some to mosques, left others as churches, and allowed the Christian population to continue their practices under the millet system. The city's value as a trading port kept it economically useful — a dead city pays no taxes. And so Messembria — which became Nessebar under Ottoman administration — continued as a small port, its extraordinary churches gradually decaying through neglect rather than violence.",
      },
      {
        keywords: ["today", "now", "modern", "visit", "tourist", "UNESCO", "heritage", "preserve", "world", "recognition"],
        response: "In your time, Nessebar is a UNESCO World Heritage Site — a recognition I find gratifying, though somewhat late from the perspective of someone who spent his life documenting its wonders. The site is recognized for its exceptional density of historical monuments and the layered civilizations it represents. Thracian, Greek, Roman, Byzantine, Bulgarian, Ottoman — all visible in different layers if you know where to look. The preservation is imperfect — some churches are in varying states of decay — but the essential character of the place survives. When you walk those cobblestone streets, you walk on thirty centuries of accumulated history. Not many places on earth can honestly say the same.",
      },
      {
        keywords: ["trade", "merchant", "ship", "economy", "wealth", "black sea", "port", "market", "goods", "commerce"],
        response: "Messembria's greatness was built on trade. The Black Sea was the main artery of commerce between the Mediterranean world and the lands to the north and east: grain from the great Pontic steppe, amber from the Baltic, furs from the northern forests, silk arriving eventually from China via the great trade routes. Messembria was positioned perfectly to intercept and participate in all of this. The harbour — now much diminished in your time — was once busy with ships of many nations. Byzantine customs officials recorded everything. I have in my chronicles the names of merchants from Alexandria, Venice, Trebizond, and places further still who traded here. The city was, in its golden age, a small node in a vast commercial network stretching across the known world.",
      },
    ],
    fallbacks: [
      "You walk in a city that has witnessed more history than most nations. Ask me anything about Messembria's Thracian origins, its Greek golden age, the Byzantine centuries, the Bulgarian conquests, the extraordinary churches, or the architectural wonders that somehow survived thirty centuries of change. A chronicler's life work is to answer exactly these questions.",
      "The chronicles I have kept cover 3,000 years of history on this tiny peninsula — but no document covers everything. Ask me specifically about the city's age, its churches, its various rulers, its golden age, or its trade connections, and I will give you the most precise answer available.",
      "That detail falls slightly beyond what my chronicles record with certainty. But on the age of the city, its extraordinary churches, the civilizations that ruled here, or the Black Sea trade that made Messembria wealthy — ask freely.",
    ],
  },
};

export function generateResponse(figureId: string, question: string, turn: number = 0): string {
  const knowledge = KB[figureId];
  if (!knowledge) {
    return "I am not certain how to answer that question from my place in history. Please ask me something more specific about my life and times.";
  }

  const lower = question.toLowerCase();
  let bestScore = 0;
  let bestEntry: Entry | null = null;

  for (const entry of knowledge.entries) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  if (bestEntry && bestScore >= 1) return bestEntry.response;

  return knowledge.fallbacks[turn % knowledge.fallbacks.length];
}
