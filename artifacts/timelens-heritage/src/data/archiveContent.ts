import type { Lang } from "@/lib/i18n";

export type ArchiveText = {
  name: string;
  city: string;
  country: string;
  period: string;
  description: string;
};

type Partial5 = Partial<ArchiveText>;
type LangMap = Record<string, Partial5>;

/* ── Bulgarian ──────────────────────────────────────────────── */
const bg: LangMap = {
  novae: {
    name: "Римска крепост Нове",
    city: "Близо до Свищов",
    country: "България",
    period: "1–4 век сл.Хр.",
    description:
      "Нове е бил важен римски военен лагер и селище близо до днешния Свищов, на южния бряг на река Дунав. Основан през 1 век сл.Хр. като легионна крепост, той е служел като един от ключовите опорни пунктове, защитаващи северната граница — Limes Moesiae — на Римската империя. Разположеният тук легион патрулирал Дунав, водел походи отвъд реката и защитавал провинция Долна Мизия.",
  },
  tsarevets: {
    name: "Крепост Царевец",
    city: "Велико Търново",
    country: "България",
    period: "12–14 век",
    description:
      "Крепостта Царевец е била главната твърдина на Второто българско царство (1185–1393). Разположена на хълм, обграден от река Янтра, тя е служела като политически, военен и духовен център на средновековна България. В стените ѝ са се намирали царският дворец, Патриаршеската катедрала и над 400 жилищни сгради.",
  },
  rila: {
    name: "Рилски манастир",
    city: "Рила планина",
    country: "България",
    period: "10 век – днес",
    description:
      "Рилският манастир е най-големият и най-известен православен манастир в България, сгушен дълбоко в Рила планина на 1147 метра надморска височина. Основан през 10 век от отшелника свети Иван Рилски, той се превръща в значим духовен и културен център през вековете на османско владичество, съхранявайки българския език, култура и идентичност.",
  },
  nessebar: {
    name: "Древният Несебър",
    city: "Несебър",
    country: "България",
    period: "Над 3200 години история",
    description:
      "Несебър е един от най-старите градове в Европа, с история, обхващаща над 3200 години. Първоначално тракийско селище, той е колонизиран от гърците през 6 век пр.Хр. и по-късно става византийска крепост. Старият град е разположен на малък скалист полуостров, врязан в Черно море, и съдържа изключителна концентрация от древни църкви, средновековни укрепления и археологически съкровища.",
  },
  madara: {
    name: "Мадарският конник",
    city: "Мадара",
    country: "България",
    period: "8 век (705–801 сл.Хр.)",
    description:
      "Мадарският конник е уникален и загадъчен средновековен скален релеф, издялан в 23-метрова отвесна скала близо до село Мадара. Създаден между 705 и 801 г. сл.Хр., той изобразява величествен конник, който триумфално пронизва лъв с копие, с орел, летящ отгоре, и куче, тичащо в краката на коня. Това е единственият раннесредновековен скален релеф от този вид в Европа.",
  },
  buzludzha: {
    name: "Паметник Бузлуджа",
    city: "Стара планина",
    country: "България",
    period: "Построен 1974–1981",
    description:
      "Паметникът Бузлуджа е емблематична кръгла структура, изградена през социалистическата епоха, кацнала драматично на планински връх в Стара планина на 1441 метра височина. Проектиран от архитект Георги Стоилов и открит през 1981 г., той е служел като церемониална централа на Българската комунистическа партия. Днес стои изоставен — един от най-разпознаваемите и сюрреалистични бруталистки паметници в Източна Европа.",
  },
  "freedom-1934": {
    name: "Откриване на Паметника на свободата, Свищов",
    city: "Свищов",
    country: "България",
    period: "1934",
    description:
      "Рядка снимка от тържественото откриване на Паметника на свободата в Свищов, България. Ветерани от Ботевата чета, кметът и местни първенци се събират, за да почетат борбата за свобода — ключов момент на българската гражданска гордост между двете световни войни.",
  },
  "tsarevets-show": {
    name: "Царевец · Звук и светлина",
    city: "Велико Търново",
    country: "България",
    period: "12 век – днес",
    description:
      "Всяка вечер средновековните стени на Царевец оживяват в легендарен спектакъл от звук и светлина — цветни лъчи обхождат кулите, докато Деветата симфония на Бетовен ехти над долината на Янтра, разказвайки възхода и падението на Второто българско царство.",
  },
  "khan-asparuh": {
    name: "Хан Аспарух — основател на България",
    city: "Първо българско царство",
    country: "България",
    period: "7 век · 681 сл.Хр.",
    description:
      "Син на Кубрат и водач на българите, хан Аспарух преминава Дунав и се съюзява със седемте славянски племена, за да основе България — нова държава, призната от Византия с договора от 681 г., акта за раждане на българската нация.",
  },
  "ivan-asen": {
    name: "Цар Иван Асен II",
    city: "Царевец, Велико Търново",
    country: "България",
    period: "1218–1241",
    description:
      "Владетел на Второто българско царство в неговия връх. От престола си в Царевец той управлява земи от Черно море до Адриатика, печели решителната битка при Клокотница през 1230 г. и осигурява независима Българска патриаршия.",
  },
};

/* ── Polish ─────────────────────────────────────────────────── */
const pl: LangMap = {
  novae: {
    name: "Rzymska twierdza Novae",
    city: "Niedaleko Swisztowa",
    country: "Bułgaria",
    period: "I–IV wiek n.e.",
    description:
      "Novae było ważnym rzymskim obozem wojskowym i osadą w pobliżu dzisiejszego Swisztowa, na południowym brzegu Dunaju. Założone w I wieku n.e. jako twierdza legionowa, było jednym z kluczowych bastionów broniących północnej granicy — Limes Moesiae — Cesarstwa Rzymskiego. Stacjonujący tu legion patrolował Dunaj, prowadził kampanie za rzeką i chronił prowincję Mezję Dolną.",
  },
  tsarevets: {
    name: "Twierdza Carewec",
    city: "Wielkie Tyrnowo",
    country: "Bułgaria",
    period: "XII–XIV wiek",
    description:
      "Twierdza Carewec była główną warownią Drugiego Cesarstwa Bułgarskiego (1185–1393). Położona na wzgórzu otoczonym rzeką Jantrą, służyła jako polityczne, wojskowe i duchowe centrum średniowiecznej Bułgarii. W jej murach mieściły się pałac królewski, katedra patriarsza i ponad 400 budynków mieszkalnych.",
  },
  rila: {
    name: "Monaster Rilski",
    city: "Góry Riła",
    country: "Bułgaria",
    period: "X wiek – obecnie",
    description:
      "Monaster Rilski to największy i najsłynniejszy prawosławny klasztor w Bułgarii, ukryty głęboko w górach Riła na wysokości 1147 metrów. Założony w X wieku przez pustelnika świętego Iwana Rilskiego, stał się ważnym ośrodkiem duchowym i kulturalnym przez wieki panowania osmańskiego, zachowując bułgarski język, kulturę i tożsamość.",
  },
  nessebar: {
    name: "Starożytny Nesebyr",
    city: "Nesebyr",
    country: "Bułgaria",
    period: "Ponad 3200 lat historii",
    description:
      "Nesebyr to jedno z najstarszych miast Europy, którego historia liczy ponad 3200 lat. Pierwotnie osada tracka, została skolonizowana przez Greków w VI wieku p.n.e., a później stała się bizantyjską twierdzą. Stare miasto leży na małym skalistym półwyspie wcinającym się w Morze Czarne i mieści niezwykłe nagromadzenie starożytnych kościołów, średniowiecznych umocnień i skarbów archeologicznych.",
  },
  madara: {
    name: "Jeździec z Madary",
    city: "Madara",
    country: "Bułgaria",
    period: "VIII wiek (705–801 n.e.)",
    description:
      "Jeździec z Madary to wyjątkowy i tajemniczy średniowieczny relief skalny wykuty w pionowej, 23-metrowej skale w pobliżu wsi Madara. Powstały między 705 a 801 rokiem n.e. przedstawia majestatycznego jeźdźca triumfalnie przebijającego włócznią lwa, z orłem lecącym nad nim i psem biegnącym u nóg konia. To jedyny tego rodzaju wczesnośredniowieczny relief skalny w Europie.",
  },
  buzludzha: {
    name: "Pomnik Buzłudża",
    city: "Góry Stara Płanina",
    country: "Bułgaria",
    period: "Zbudowany 1974–1981",
    description:
      "Pomnik Buzłudża to kultowa okrągła budowla wzniesiona w epoce socjalizmu, dramatycznie usadowiona na szczycie górskim w paśmie Bałkanów na wysokości 1441 metrów. Zaprojektowany przez architekta Georgi Stoiłowa i odsłonięty w 1981 roku, służył jako ceremonialna siedziba Bułgarskiej Partii Komunistycznej. Dziś stoi opuszczony — jeden z najbardziej rozpoznawalnych i surrealistycznych brutalistycznych pomników Europy Wschodniej.",
  },
  "freedom-1934": {
    name: "Otwarcie Pomnika Wolności, Swisztow",
    city: "Swisztow",
    country: "Bułgaria",
    period: "1934",
    description:
      "Rzadka fotografia z uroczystości otwarcia Pomnika Wolności (Паметника на свободата) w Swisztowie w Bułgarii. Weterani oddziału Botewa, burmistrz i miejscowi dostojnicy zebrali się, by uczcić walkę o wolność — przełomowy moment bułgarskiej dumy obywatelskiej w okresie międzywojennym.",
  },
  "tsarevets-show": {
    name: "Carewec · Pokaz dźwięku i światła",
    city: "Wielkie Tyrnowo",
    country: "Bułgaria",
    period: "XII wiek – obecnie",
    description:
      "Każdej nocy średniowieczne mury Carewca ożywają w legendarnym pokazie dźwięku i światła — kolorowe promienie omiatają wieże, a IX Symfonia Beethovena rozbrzmiewa nad doliną Jantry, opowiadając wzlot i upadek Drugiego Cesarstwa Bułgarskiego.",
  },
  "khan-asparuh": {
    name: "Chan Asparuch — założyciel Bułgarii",
    city: "Pierwsze Cesarstwo Bułgarskie",
    country: "Bułgaria",
    period: "VII wiek · 681 n.e.",
    description:
      "Syn Kubrata i wódz Bułgarów, chan Asparuch przekroczył Dunaj i sprzymierzył się z siedmioma plemionami słowiańskimi, zakładając Bułgarię — nowe państwo uznane przez Bizancjum na mocy traktatu z 681 roku, akt narodzin narodu bułgarskiego.",
  },
  "ivan-asen": {
    name: "Car Iwan Asen II",
    city: "Carewec, Wielkie Tyrnowo",
    country: "Bułgaria",
    period: "1218–1241",
    description:
      "Władca Drugiego Cesarstwa Bułgarskiego u szczytu jego potęgi. Ze swojej siedziby w Carewcu rządził ziemiami od Morza Czarnego po Adriatyk, wygrał decydującą bitwę pod Kłokotnicą w 1230 roku i zapewnił niezależny Patriarchat Bułgarski.",
  },
};

/* ── Slovak ─────────────────────────────────────────────────── */
const sk: LangMap = {
  novae: {
    name: "Rímska pevnosť Novae",
    city: "Pri Svištove",
    country: "Bulharsko",
    period: "1.–4. storočie n.l.",
    description:
      "Novae bol dôležitý rímsky vojenský tábor a osada neďaleko dnešného Svištova, na južnom brehu Dunaja. Založený v 1. storočí n.l. ako legionárska pevnosť slúžil ako jeden z kľúčových oporných bodov brániacich severnú hranicu — Limes Moesiae — Rímskej ríše. Tu umiestnená légia hliadkovala Dunaj, viedla výpravy cez rieku a chránila provinciu Dolná Mézia.",
  },
  tsarevets: {
    name: "Pevnosť Carevec",
    city: "Veliko Tarnovo",
    country: "Bulharsko",
    period: "12.–14. storočie",
    description:
      "Pevnosť Carevec bola hlavnou baštou Druhej bulharskej ríše (1185–1393). Týčila sa na kopci obklopenom riekou Jantra a slúžila ako politické, vojenské a duchovné centrum stredovekého Bulharska. V jej múroch sa nachádzal kráľovský palác, patriarchálna katedrála a vyše 400 obytných budov.",
  },
  rila: {
    name: "Rilský kláštor",
    city: "Pohorie Rila",
    country: "Bulharsko",
    period: "10. storočie – súčasnosť",
    description:
      "Rilský kláštor je najväčší a najznámejší pravoslávny kláštor v Bulharsku, ukrytý hlboko v pohorí Rila vo výške 1147 metrov. Založil ho v 10. storočí pustovník svätý Ivan Rilský a počas storočí osmanskej nadvlády sa stal významným duchovným a kultúrnym centrom, ktoré uchovávalo bulharský jazyk, kultúru a identitu.",
  },
  nessebar: {
    name: "Staroveký Nesebar",
    city: "Nesebar",
    country: "Bulharsko",
    period: "Vyše 3200 rokov histórie",
    description:
      "Nesebar je jedno z najstarších miest Európy s históriou siahajúcou viac než 3200 rokov. Pôvodne trácka osada bola v 6. storočí pred n.l. kolonizovaná Grékmi a neskôr sa stala byzantskou pevnosťou. Staré mesto leží na malom skalnatom polostrove vybiehajúcom do Čierneho mora a ukrýva mimoriadnu koncentráciu antických kostolov, stredovekých opevnení a archeologických pokladov.",
  },
  madara: {
    name: "Madarský jazdec",
    city: "Madara",
    country: "Bulharsko",
    period: "8. storočie (705–801 n.l.)",
    description:
      "Madarský jazdec je jedinečný a záhadný stredoveký skalný reliéf vytesaný do 23 metrov vysokej zvislej skaly pri obci Madara. Vznikol medzi rokmi 705 a 801 n.l. a zobrazuje majestátneho jazdca, ktorý triumfálne prebodáva leva kopijou, s orlom letiacim nad ním a psom bežiacim pri nohách koňa. Je to jediný ranostredoveký skalný reliéf svojho druhu v Európe.",
  },
  buzludzha: {
    name: "Pamätník Buzludža",
    city: "Pohorie Stara planina",
    country: "Bulharsko",
    period: "Postavený 1974–1981",
    description:
      "Pamätník Buzludža je ikonická kruhová stavba postavená v socialistickej ére, dramaticky umiestnená na vrchole hory v pohorí Balkán vo výške 1441 metrov. Navrhol ho architekt Georgi Stoilov a odhalili ho v roku 1981; slúžil ako obradné sídlo Bulharskej komunistickej strany. Dnes stojí opustený — jeden z najznámejších a najsurreálnejších brutalistických pamätníkov východnej Európy.",
  },
  "freedom-1934": {
    name: "Otvorenie Pamätníka slobody, Svištov",
    city: "Svištov",
    country: "Bulharsko",
    period: "1934",
    description:
      "Vzácna fotografia zo slávnostného otvorenia Pamätníka slobody (Паметника на свободата) vo Svištove v Bulharsku. Veteráni Botevovho oddielu, starosta a miestni hodnostári sa zišli, aby si uctili boj za slobodu — kľúčový moment bulharskej občianskej hrdosti medzi dvoma svetovými vojnami.",
  },
  "tsarevets-show": {
    name: "Carevec · Show zvuku a svetla",
    city: "Veliko Tarnovo",
    country: "Bulharsko",
    period: "12. storočie – súčasnosť",
    description:
      "Každú noc stredoveké hradby Carevca ožívajú v legendárnej šou zvuku a svetla — farebné lúče prechádzajú vežami, zatiaľ čo Beethovenova Deviata symfónia znie nad údolím Jantry a rozpráva vzostup a pád Druhej bulharskej ríše.",
  },
  "khan-asparuh": {
    name: "Chán Asparuch — zakladateľ Bulharska",
    city: "Prvá bulharská ríša",
    country: "Bulharsko",
    period: "7. storočie · 681 n.l.",
    description:
      "Syn Kubrata a vodca Bulharov, chán Asparuch prekročil Dunaj a spojil sa so siedmimi slovanskými kmeňmi, aby založil Bulharsko — nový štát uznaný Byzanciou zmluvou z roku 681, rodný list bulharského národa.",
  },
  "ivan-asen": {
    name: "Cár Ivan Asen II",
    city: "Carevec, Veliko Tarnovo",
    country: "Bulharsko",
    period: "1218–1241",
    description:
      "Vládca Druhej bulharskej ríše na jej vrchole. Zo svojho sídla v Carevci vládol krajinám od Čierneho mora po Jadran, vyhral rozhodujúcu bitku pri Klokotnici v roku 1230 a zabezpečil nezávislý Bulharský patriarchát.",
  },
};

/* ── Ukrainian ──────────────────────────────────────────────── */
const uk: LangMap = {
  novae: {
    name: "Римська фортеця Нове",
    city: "Поблизу Свіштова",
    country: "Болгарія",
    period: "I–IV ст. н.е.",
    description:
      "Нове було важливим римським військовим табором і поселенням поблизу сучасного Свіштова, на південному березі Дунаю. Засноване в I столітті н.е. як легіонна фортеця, воно слугувало одним із ключових опорних пунктів, що захищали північний кордон — Limes Moesiae — Римської імперії. Розміщений тут легіон патрулював Дунай, проводив походи за річку й захищав провінцію Нижня Мезія.",
  },
  tsarevets: {
    name: "Фортеця Царевець",
    city: "Велике Тирново",
    country: "Болгарія",
    period: "XII–XIV ст.",
    description:
      "Фортеця Царевець була головною твердинею Другого Болгарського царства (1185–1393). Розташована на пагорбі, оточеному річкою Янтра, вона слугувала політичним, військовим і духовним центром середньовічної Болгарії. У межах її стін містилися царський палац, Патріарший собор і понад 400 житлових будівель.",
  },
  rila: {
    name: "Рильський монастир",
    city: "Гори Рила",
    country: "Болгарія",
    period: "X століття – сьогодення",
    description:
      "Рильський монастир — найбільший і найвідоміший православний монастир у Болгарії, що сховався високо в горах Рила на висоті 1147 метрів. Заснований у X столітті відлюдником святим Іваном Рильським, він став значним духовним і культурним центром упродовж століть османського панування, зберігаючи болгарську мову, культуру та ідентичність.",
  },
  nessebar: {
    name: "Стародавній Несебир",
    city: "Несебир",
    country: "Болгарія",
    period: "Понад 3200 років історії",
    description:
      "Несебир — одне з найдавніших міст Європи, історія якого налічує понад 3200 років. Спершу фракійське поселення, воно було колонізоване греками у VI столітті до н.е., а згодом стало візантійською твердинею. Старе місто розташоване на невеликому скелястому півострові, що виступає в Чорне море, і містить надзвичайну концентрацію давніх церков, середньовічних укріплень та археологічних скарбів.",
  },
  madara: {
    name: "Мадарський вершник",
    city: "Мадара",
    country: "Болгарія",
    period: "VIII століття (705–801 рр.)",
    description:
      "Мадарський вершник — унікальний і загадковий середньовічний скельний рельєф, вирізьблений у 23-метровій вертикальній скелі поблизу села Мадара. Створений між 705 і 801 роками н.е., він зображує величного вершника, що тріумфально пронизує списом лева, з орлом, який летить угорі, та собакою, що біжить біля копит коня. Це єдиний ранньосередньовічний скельний рельєф такого роду в Європі.",
  },
  buzludzha: {
    name: "Пам'ятник Бузлуджа",
    city: "Гори Стара Планина",
    country: "Болгарія",
    period: "Збудовано 1974–1981",
    description:
      "Пам'ятник Бузлуджа — культова кругла споруда, зведена за соціалістичної доби, що ефектно височіє на гірській вершині Балканського хребта на висоті 1441 метр. Спроєктований архітектором Георгі Стоіловим і відкритий 1981 року, він слугував церемоніальною штаб-квартирою Болгарської комуністичної партії. Сьогодні він стоїть покинутий — один із найвпізнаваніших і найсюрреалістичніших брутальних монументів Східної Європи.",
  },
  "freedom-1934": {
    name: "Відкриття Пам'ятника Свободи, Свіштов",
    city: "Свіштов",
    country: "Болгарія",
    period: "1934",
    description:
      "Рідкісна світлина з церемонії відкриття Пам'ятника Свободи (Паметника на свободата) у Свіштові, Болгарія. Ветерани Ботевого загону, мер і місцеві достойники зібралися, щоб ушанувати боротьбу за свободу — знаковий момент болгарської громадянської гордості між двома світовими війнами.",
  },
  "tsarevets-show": {
    name: "Царевець · Шоу звуку та світла",
    city: "Велике Тирново",
    country: "Болгарія",
    period: "XII ст. – сьогодення",
    description:
      "Щовечора середньовічні стіни Царевця оживають у легендарному шоу звуку та світла — кольорові промені ковзають баштами, а Дев'ята симфонія Бетховена лунає над долиною Янтри, переповідаючи злет і падіння Другого Болгарського царства.",
  },
  "khan-asparuh": {
    name: "Хан Аспарух — засновник Болгарії",
    city: "Перше Болгарське царство",
    country: "Болгарія",
    period: "VII століття · 681 р. н.е.",
    description:
      "Син Кубрата і вождь болгар, хан Аспарух перейшов Дунай і уклав союз із сімома слов'янськими племенами, заснувавши Болгарію — нову державу, визнану Візантією за договором 681 року, що став свідоцтвом про народження болгарської нації.",
  },
  "ivan-asen": {
    name: "Цар Іван Асен II",
    city: "Царевець, Велике Тирново",
    country: "Болгарія",
    period: "1218–1241",
    description:
      "Володар Другого Болгарського царства в зеніті його могутності. Зі свого престолу в Царевці він правив землями від Чорного моря до Адріатики, здобув вирішальну перемогу в битві при Клокотниці 1230 року й домігся незалежного Болгарського патріархату.",
  },
};

const MAP: Partial<Record<Lang, LangMap>> = { bg, pl, sk, uk };

export function archiveText(lang: Lang, id: string, fallback: ArchiveText): ArchiveText {
  const o = MAP[lang]?.[id];
  return o ? { ...fallback, ...o } : fallback;
}
