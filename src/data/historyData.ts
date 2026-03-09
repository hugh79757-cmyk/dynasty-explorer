export interface Dynasty {
  id: string;
  name: string;
  nameEn: string;
  startYear: number;
  endYear: number;
  period: string;
  description: string;
  capital: string;
  keyFigures: { name: string; role: string }[];
  achievements: string[];
  neighbors: {
    kingdom: string;
    relation: string;
    culturalExchange?: string;
  }[];
  color: string;
  bgGradient: string;
}

export const dynasties: Dynasty[] = [
  {
    id: "xia",
    name: "夏",
    nameEn: "Xia",
    startYear: -2070,
    endYear: -1600,
    period: "约前2070年—约前1600年",
    description: "中国历史上第一个朝代，由大禹建立。夏朝开创了世袭制度，以农业为主，青铜器开始出现。传说大禹治水，三过家门而不入，深受百姓爱戴。",
    capital: "阳城（今河南登封）",
    keyFigures: [
      { name: "大禹", role: "建国之君，治水英雄" },
      { name: "启", role: "第二代君王，确立世袭制" },
      { name: "桀", role: "末代昏君" },
    ],
    achievements: ["建立世袭王制", "治理洪水", "青铜冶炼萌芽", "历法初步形成"],
    neighbors: [
      { kingdom: "高句丽", relation: "尚未建立" },
      { kingdom: "新罗", relation: "尚未建立" },
      { kingdom: "日本", relation: "绳文时代，无直接交流" },
    ],
    color: "from-amber-800 to-amber-600",
    bgGradient: "linear-gradient(135deg, #78350f, #b45309)",
  },
  {
    id: "shang",
    name: "商",
    nameEn: "Shang",
    startYear: -1600,
    endYear: -1046,
    period: "约前1600年—约前1046年",
    description: "商朝是中国第一个有直接文字记录的朝代。甲骨文在此时期产生，青铜器制造高度发达，商业贸易繁盛。殷墟遗址是重要的考古发现。",
    capital: "殷（今河南安阳）",
    keyFigures: [
      { name: "商汤", role: "建国之君，推翻夏桀" },
      { name: "武丁", role: "中兴之君，扩大版图" },
      { name: "妇好", role: "女将军，武丁之妻" },
      { name: "纣王", role: "末代暴君" },
    ],
    achievements: ["甲骨文的发明", "青铜器鼎盛时代", "商业贸易繁荣", "天文历法发展"],
    neighbors: [
      { kingdom: "高句丽", relation: "尚未建立（朝鲜半岛为古朝鲜时代）" },
      { kingdom: "日本", relation: "绳文晚期，部分农业技术可能传入" },
    ],
    color: "from-red-900 to-red-700",
    bgGradient: "linear-gradient(135deg, #7f1d1d, #b91c1c)",
  },
  {
    id: "zhou_west",
    name: "西周",
    nameEn: "Western Zhou",
    startYear: -1046,
    endYear: -771,
    period: "前1046年—前771年",
    description: "西周推行封建制度，礼乐文化达到顶峰。周公制礼作乐，为儒家思想奠定了基础。分封诸侯，形成【天下共主】的政治格局。",
    capital: "镐京（今陕西西安）",
    keyFigures: [
      { name: "周武王", role: "建国之君，灭商" },
      { name: "周公旦", role: "礼乐制度的奠基人" },
      { name: "周成王", role: "成康之治的开创者" },
    ],
    achievements: ["封建分封制度", "礼乐文化体系", "《诗经》的雏形", "井田制农业"],
    neighbors: [
      { kingdom: "高句丽", relation: "朝鲜半岛为古朝鲜（箕子朝鲜传说）", culturalExchange: "传说箕子率民东迁，带去礼仪文化" },
      { kingdom: "日本", relation: "弥生时代初期，水稻文化开始传入" },
    ],
    color: "from-orange-900 to-orange-700",
    bgGradient: "linear-gradient(135deg, #7c2d12, #c2410c)",
  },
  {
    id: "zhou_east",
    name: "东周",
    nameEn: "Eastern Zhou",
    startYear: -771,
    endYear: -256,
    period: "前771年—前256年",
    description: "东周分春秋与战国两个阶段。这是中国思想文化大爆发的时代——百家争鸣，孔子、老子、孟子、庄子等伟大思想家纷纷出现。铁器普及，战争频繁。",
    capital: "洛邑（今河南洛阳）",
    keyFigures: [
      { name: "孔子", role: "儒家创始人，'万世师表'" },
      { name: "老子", role: "道家创始人，著《道德经》" },
      { name: "孙子", role: "兵法大家，著《孙子兵法》" },
      { name: "屈原", role: "爱国诗人，著《离骚》" },
    ],
    achievements: ["百家争鸣", "铁器农具普及", "《论语》《道德经》", "货币经济发展"],
    neighbors: [
      { kingdom: "高句丽", relation: "古朝鲜进入青铜文明", culturalExchange: "儒家思想开始向朝鲜半岛传播" },
      { kingdom: "日本", relation: "弥生文化确立，稻作农业从中国传入" },
    ],
    color: "from-yellow-800 to-yellow-600",
    bgGradient: "linear-gradient(135deg, #713f12, #a16207)",
  },
  {
    id: "qin",
    name: "秦",
    nameEn: "Qin",
    startYear: -221,
    endYear: -206,
    period: "前221年—前206年",
    description: "秦始皇统一六国，建立中国历史上第一个中央集权的封建王朝。统一文字、度量衡、货币，修建长城与驰道。虽然短暂，却奠定了中国大一统的格局。",
    capital: "咸阳（今陕西咸阳）",
    keyFigures: [
      { name: "秦始皇嬴政", role: "第一位皇帝，统一六国" },
      { name: "李斯", role: "丞相，推行郡县制" },
      { name: "蒙恬", role: "将军，修建长城" },
    ],
    achievements: ["统一文字（小篆）", "统一度量衡与货币", "修建万里长城", "郡县制代替分封制"],
    neighbors: [
      { kingdom: "古朝鲜", relation: "燕国人卫满逃亡朝鲜，汉字文化随之传入", culturalExchange: "汉字与中原文化开始进入朝鲜半岛" },
      { kingdom: "日本", relation: "传说徐福东渡日本，带去先进文化与技术" },
    ],
    color: "from-stone-800 to-stone-600",
    bgGradient: "linear-gradient(135deg, #292524, #57534e)",
  },
  {
    id: "han_west",
    name: "西汉",
    nameEn: "Western Han",
    startYear: -206,
    endYear: 9,
    period: "前206年—公元9年",
    description: "西汉是中国历史的第一个盛世。汉武帝开辟丝绸之路，儒家思想成为国家正统思想，造纸术改进，与匈奴的战争奠定了中国的版图基础。",
    capital: "长安（今陕西西安）",
    keyFigures: [
      { name: "汉高祖刘邦", role: "建国之君" },
      { name: "汉武帝刘彻", role: "最强盛的皇帝，开辟丝绸之路" },
      { name: "张骞", role: "外交家，出使西域" },
      { name: "司马迁", role: "史学家，著《史记》" },
    ],
    achievements: ["丝绸之路开辟", "儒家独尊地位", "《史记》编著", "造纸术改进"],
    neighbors: [
      { kingdom: "高句丽", relation: "前37年，高句丽建国", culturalExchange: "汉字、儒家思想、佛教等大规模传入" },
      { kingdom: "日本", relation: "《汉书》记载倭国，有朝贡往来" },
    ],
    color: "from-red-800 to-red-600",
    bgGradient: "linear-gradient(135deg, #991b1b, #dc2626)",
  },
  {
    id: "han_east",
    name: "东汉",
    nameEn: "Eastern Han",
    startYear: 25,
    endYear: 220,
    period: "公元25年—220年",
    description: "东汉时期，佛教从印度经丝绸之路传入中国，造纸术由蔡伦改进并推广，科技与文化都有重要发展。张衡发明地动仪，华佗发明麻沸散。",
    capital: "洛阳（今河南洛阳）",
    keyFigures: [
      { name: "汉光武帝刘秀", role: "中兴之君" },
      { name: "蔡伦", role: "改进造纸术" },
      { name: "张衡", role: "科学家，发明地动仪" },
      { name: "华佗", role: "神医，发明麻沸散" },
    ],
    achievements: ["佛教传入中国", "造纸术推广", "地动仪发明", "《说文解字》编著"],
    neighbors: [
      { kingdom: "高句丽", relation: "高句丽逐渐强大，与汉朝时有冲突", culturalExchange: "佛教、汉字文化深入朝鲜半岛" },
      { kingdom: "倭国（日本）", relation: "汉光武帝赐倭奴国王金印", culturalExchange: "中国文化通过朝鲜半岛传入日本" },
    ],
    color: "from-rose-800 to-rose-600",
    bgGradient: "linear-gradient(135deg, #9f1239, #e11d48)",
  },
  {
    id: "three_kingdoms",
    name: "三国",
    nameEn: "Three Kingdoms",
    startYear: 220,
    endYear: 280,
    period: "公元220年—280年",
    description: "魏蜀吴三足鼎立的乱世，也是英雄辈出的时代。曹操、刘备、孙权，诸葛亮、关羽、周瑜……《三国演义》的故事就源于这段历史。",
    capital: "魏：洛阳；蜀：成都；吴：建业",
    keyFigures: [
      { name: "曹操", role: "魏国奠基人，政治家文学家" },
      { name: "诸葛亮", role: "蜀汉丞相，智慧的象征" },
      { name: "孙权", role: "吴国皇帝" },
      { name: "关羽", role: "蜀汉名将，忠义的象征" },
    ],
    achievements: ["《三国志》等史书", "屯田制发展农业", "造船技术进步", "数学天文发展"],
    neighbors: [
      { kingdom: "高句丽", relation: "魏国派兵攻打高句丽，高句丽被迫迁都", culturalExchange: "汉文化持续影响高句丽" },
      { kingdom: "日本", relation: "邪马台国女王卑弥呼遣使魏国", culturalExchange: "魏国赐予金印及铜镜，中国文化传入" },
    ],
    color: "from-slate-800 to-slate-600",
    bgGradient: "linear-gradient(135deg, #1e293b, #334155)",
  },
  {
    id: "jin",
    name: "晋",
    nameEn: "Jin",
    startYear: 265,
    endYear: 420,
    period: "公元265年—420年",
    description: "西晋统一三国，但随即陷入'八王之乱'，五胡乱华导致大量人口南迁。东晋偏安江南，文化艺术依然繁荣，书法大家王羲之在此时期大放异彩。",
    capital: "洛阳（西晋）；建康（东晋）",
    keyFigures: [
      { name: "司马炎", role: "西晋开国皇帝" },
      { name: "王羲之", role: "书圣，著《兰亭序》" },
      { name: "陶渊明", role: "田园诗人，著《桃花源记》" },
    ],
    achievements: ["书法艺术鼎盛", "玄学思想兴起", "《世说新语》", "佛教艺术发展"],
    neighbors: [
      { kingdom: "高句丽", relation: "高句丽趁乱扩张领土", culturalExchange: "佛教在高句丽广泛传播" },
      { kingdom: "百济", relation: "百济建国（前18年），与东晋建立外交", culturalExchange: "汉字文化、儒学传入百济" },
    ],
    color: "from-emerald-900 to-emerald-700",
    bgGradient: "linear-gradient(135deg, #064e3b, #065f46)",
  },
  {
    id: "sui",
    name: "隋",
    nameEn: "Sui",
    startYear: 581,
    endYear: 618,
    period: "公元581年—618年",
    description: "隋朝结束了近三百年的分裂局面，重新统一中国。隋炀帝开凿大运河，创立科举制度，对后世影响深远。但因暴政，隋朝也如秦一样短暂而亡。",
    capital: "大兴（今陕西西安）",
    keyFigures: [
      { name: "隋文帝杨坚", role: "建国皇帝，统一南北" },
      { name: "隋炀帝杨广", role: "开凿大运河，三征高句丽" },
    ],
    achievements: ["大运河开凿", "科举制度创立", "统一度量衡", "三征高句丽"],
    neighbors: [
      { kingdom: "高句丽", relation: "隋炀帝三次大规模征伐高句丽，均以失败告终，是隋朝灭亡的重要原因", culturalExchange: "文化交流因战争受阻" },
      { kingdom: "百济", relation: "与百济有外交往来" },
      { kingdom: "新罗", relation: "新罗遣使朝贡", culturalExchange: "中国文化、佛教继续传入新罗" },
      { kingdom: "日本", relation: "推古天皇时期，圣德太子派遣遣隋使", culturalExchange: "日本大规模学习中国制度与文化" },
    ],
    color: "from-violet-900 to-violet-700",
    bgGradient: "linear-gradient(135deg, #4c1d95, #6d28d9)",
  },
  {
    id: "tang",
    name: "唐",
    nameEn: "Tang",
    startYear: 618,
    endYear: 907,
    period: "公元618年—907年",
    description: "唐朝是中国历史上最辉煌的朝代之一。贞观之治、开元盛世，长安成为世界最大的国际都市。诗歌艺术达到顶峰，李白、杜甫、白居易留下千古名篇。丝绸之路再度繁荣，唐文化辐射整个东亚。",
    capital: "长安（今陕西西安）",
    keyFigures: [
      { name: "唐太宗李世民", role: "贞观之治，一代明君" },
      { name: "武则天", role: "中国历史唯一女皇帝" },
      { name: "唐玄宗李隆基", role: "开元盛世的缔造者" },
      { name: "李白", role: "诗仙" },
      { name: "杜甫", role: "诗圣" },
      { name: "玄奘", role: "高僧，赴印度取经" },
    ],
    achievements: ["贞观之治与开元盛世", "唐诗黄金时代", "丝绸之路繁荣", "佛教文化鼎盛", "科举制完善"],
    neighbors: [
      { kingdom: "高句丽", relation: "唐太宗与高宗联合新罗灭高句丽（668年）", culturalExchange: "大量高句丽人融入唐朝" },
      { kingdom: "新罗", relation: "新罗统一朝鲜半岛，唐新同盟，大规模学习唐文化", culturalExchange: "汉字、佛教、唐制度、诗歌全面传入新罗" },
      { kingdom: "百济", relation: "660年，唐与新罗联合灭百济", culturalExchange: "百济文化融合入统一新罗" },
      { kingdom: "渤海", relation: "698年，渤海国建立，尊唐为宗主国", culturalExchange: "渤海被称为'海东盛国'，全面学习唐朝制度" },
      { kingdom: "日本", relation: "日本大化改新，全面学习唐朝制度", culturalExchange: "遣唐使带回汉字、佛教、建筑、音乐、茶道等，深刻影响日本文明" },
    ],
    color: "from-amber-700 to-yellow-600",
    bgGradient: "linear-gradient(135deg, #b45309, #d97706)",
  },
];

export interface CultureItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  chinaOrigin: string;
  koreaSpread: string;
  japanSpread: string;
  period: string;
  significance: string;
}

export const cultureItems: CultureItem[] = [
  {
    id: "buddhism",
    name: "佛教",
    icon: "☸️",
    description: "佛教起源于古印度，经丝绸之路传入中国，再由中国传至朝鲜半岛，最终传入日本，成为东亚文化的重要基石。",
    chinaOrigin: "东汉明帝时（约67年）佛教传入中国，经过魏晋南北朝时期的融合发展，形成了具有中国特色的佛教文化。",
    koreaSpread: "4世纪，佛教从中国传入高句丽（372年）、百济（384年）和新罗（527年），成为三国时期的国教，建造了大量寺庙。",
    japanSpread: "552年，百济圣王向日本传入佛教，圣德太子大力推广，建造法隆寺等。佛教深刻影响了日本的文化、建筑和艺术。",
    period: "前1世纪—7世纪",
    significance: "佛教促进了东亚各国的文化交流，带去了文字、艺术、建筑技术和哲学思想。",
  },
  {
    id: "characters",
    name: "汉字",
    icon: "字",
    description: "汉字是世界上最古老的文字之一，从中国发源，成为整个东亚文明共同的书写系统，影响了朝鲜、日本、越南等国的文字发展。",
    chinaOrigin: "汉字起源于商朝甲骨文（前1300年），历经金文、篆书、隶书、楷书的演变，成为中华文明的核心载体。",
    koreaSpread: "约前2世纪，汉字随汉朝文化传入朝鲜半岛，成为官方书写文字。朝鲜人基于汉字创造了吏读文字，直到15世纪才有训民正音（韩文）。",
    japanSpread: "4-5世纪，通过朝鲜半岛，汉字传入日本。日本人以汉字为基础创造了假名（平假名、片假名），形成了独特的日本文字系统。",
    period: "前1300年—5世纪",
    significance: "汉字不仅是文字，更是文化的载体，使东亚各国能共享儒家经典、佛教经文等文化财富。",
  },
  {
    id: "pottery",
    name: "陶瓷",
    icon: "🏺",
    description: "中国是瓷器的故乡，中文'China'即源于瓷器。精美的中国陶瓷技术随文化交流传播至朝鲜和日本，形成各具特色的陶瓷艺术传统。",
    chinaOrigin: "中国陶器历史超过一万年，商周时期出现原始青瓷，东汉发明成熟青瓷，唐代'唐三彩'享誉世界，宋代青瓷、白瓷达到艺术顶峰。",
    koreaSpread: "中国制陶技术传入朝鲜半岛后，高丽时期（918-1392年）发展出独特的高丽青瓷，以翡翠色釉色著称，被誉为'东方第一'。",
    japanSpread: "陶瓷技术经朝鲜传入日本，日本人不断创新，发展出有田烧、伊万里烧等独特风格，后来还出口到欧洲，影响世界。",
    period: "新石器时代—唐代",
    significance: "陶瓷不仅是艺术品，也是丝绸之路上的重要贸易商品，促进了东西方文化交流。",
  },
  {
    id: "architecture",
    name: "建筑",
    icon: "🏯",
    description: "中国传统建筑以木结构、斗拱、飞檐翘角为特色，这种建筑风格随着文化交流传播到朝鲜和日本，形成了独特的东亚建筑文化圈。",
    chinaOrigin: "中国传统建筑以木构架为基础，配合斗拱、榫卯技术，形成庑殿、歇山等屋顶形式。唐代建筑是中国古建筑的巅峰，大明宫威震天下。",
    koreaSpread: "中国建筑风格随佛教寺庙建筑传入朝鲜，高句丽、百济、新罗的宫殿与寺庙都受到中国建筑的深刻影响，但融入了朝鲜特色。",
    japanSpread: "遣唐使将唐代建筑技术带回日本，法隆寺、东大寺等都体现了中国建筑风格。日本后来发展出'和风建筑'，成为独特的艺术体系。",
    period: "汉代—唐代",
    significance: "东亚建筑文化圈的形成，体现了中国文化的强大辐射力，同时各国也在学习中创造了各自的建筑艺术特色。",
  },
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "中国历史上第一个朝代是什么？",
    options: ["商朝", "夏朝", "周朝", "秦朝"],
    correctIndex: 1,
    explanation: "夏朝（约前2070年—约前1600年）是中国历史上第一个朝代，由大禹建立。",
  },
  {
    id: 2,
    question: "甲骨文是哪个朝代出现的文字？",
    options: ["夏朝", "西周", "商朝", "春秋时期"],
    correctIndex: 2,
    explanation: "甲骨文出现于商朝（约前1300年），是刻在龟甲和兽骨上的文字，是中国最早的成熟文字系统。",
  },
  {
    id: 3,
    question: "秦始皇统一六国是在哪一年？",
    options: ["前230年", "前221年", "前206年", "前210年"],
    correctIndex: 1,
    explanation: "秦始皇于前221年完成统一六国，建立了中国历史上第一个中央集权的封建王朝。",
  },
  {
    id: 4,
    question: "丝绸之路是哪位皇帝开辟的？",
    options: ["秦始皇", "汉高祖", "汉武帝", "唐太宗"],
    correctIndex: 2,
    explanation: "汉武帝派遣张骞出使西域，开辟了著名的丝绸之路，加强了中国与西域各国的联系。",
  },
  {
    id: 5,
    question: "佛教最初是通过哪条路线传入中国的？",
    options: ["海上丝绸之路", "陆上丝绸之路", "茶马古道", "大运河"],
    correctIndex: 1,
    explanation: "佛教约在东汉时期（67年）经由陆上丝绸之路从古印度传入中国。",
  },
  {
    id: 6,
    question: "高句丽最早是在哪个时期建国的？",
    options: ["秦朝", "西汉末年", "东汉初期", "三国时期"],
    correctIndex: 1,
    explanation: "高句丽建国于前37年（西汉末年），由朱蒙（东明圣王）建立，位于今中国东北及朝鲜半岛北部。",
  },
  {
    id: 7,
    question: "三国时期，哪个国的女王卑弥呼曾向中国遣使？",
    options: ["高句丽", "百济", "新罗", "邪马台国（日本）"],
    correctIndex: 3,
    explanation: "三国时期，日本邪马台国女王卑弥呼向曹魏遣使，魏明帝赐其'亲魏倭王'金印。",
  },
  {
    id: 8,
    question: "隋炀帝为什么多次远征高句丽？",
    options: ["争夺丝绸之路", "争夺朝鲜半岛资源", "因高句丽拒绝朝贡并扩张势力", "争夺黄海控制权"],
    correctIndex: 2,
    explanation: "高句丽不服从隋朝的宗主权并不断扩张，隋炀帝因此三次大规模征伐，但均以失败告终，加速了隋朝的灭亡。",
  },
  {
    id: 9,
    question: "汉字传入日本后，日本人创造了什么文字？",
    options: ["谚文", "假名（平假名与片假名）", "楔形文字", "梵文"],
    correctIndex: 1,
    explanation: "日本人以汉字为基础创造了假名系统，包括平假名和片假名，形成了独特的日本文字。",
  },
  {
    id: 10,
    question: "唐朝时，日本派往中国学习文化的使团叫什么？",
    options: ["遣隋使", "遣唐使", "朝贡使", "外交使"],
    correctIndex: 1,
    explanation: "日本在唐朝时期多次派遣'遣唐使'，系统学习唐朝的政治制度、文化艺术、建筑技术等，对日本文明产生了深远影响。",
  },
  {
    id: 11,
    question: "中国历史上唯一的女皇帝是谁？",
    options: ["武则天", "慈禧太后", "吕后", "孝庄太后"],
    correctIndex: 0,
    explanation: "武则天（624-705年）是中国历史上唯一正式称帝的女性，她在位期间国力强盛，史称'政启开元，治宏贞观'。",
  },
  {
    id: 12,
    question: "被称为'诗仙'的唐代大诗人是谁？",
    options: ["杜甫", "白居易", "李白", "王维"],
    correctIndex: 2,
    explanation: "李白被称为'诗仙'，是唐代最伟大的浪漫主义诗人，留下了《静夜思》《望庐山瀑布》等千古名篇。",
  },
  {
    id: 13,
    question: "东亚哪个国家以'海东盛国'著称，曾大量学习唐朝文化？",
    options: ["新罗", "百济", "渤海国", "日本"],
    correctIndex: 2,
    explanation: "渤海国（698-926年）建立于今中国东北，尊唐为宗主国，全面学习唐朝制度，被称为'海东盛国'。",
  },
  {
    id: 14,
    question: "中国哪个朝代开凿了大运河，连接了南北方？",
    options: ["秦朝", "汉朝", "隋朝", "唐朝"],
    correctIndex: 2,
    explanation: "隋炀帝下令开凿大运河，连接了北京到杭州，全长约2700公里，是古代世界最伟大的工程之一。",
  },
  {
    id: 15,
    question: "佛教传入百济是在哪一年？",
    options: ["372年", "384年", "527年", "552年"],
    correctIndex: 1,
    explanation: "佛教于384年传入百济，由东晋高僧摩罗难陀带去，百济枕流王接受了佛教。",
  },
  {
    id: 16,
    question: "《孙子兵法》的作者是谁？",
    options: ["孔子", "老子", "孙子（孙武）", "孟子"],
    correctIndex: 2,
    explanation: "《孙子兵法》由春秋时期的军事家孙武（孙子）所著，是世界上最早的军事著作，至今仍有重要价值。",
  },
  {
    id: 17,
    question: "高丽青瓷因什么颜色著称于世？",
    options: ["白色", "黑色", "翡翠绿色", "红色"],
    correctIndex: 2,
    explanation: "高丽青瓷以独特的翡翠绿色釉色著称，这种颜色称为'翡色'，被誉为'东方第一'，在中国陶瓷技术基础上发展出的朝鲜特色。",
  },
  {
    id: 18,
    question: "唐朝为什么能够吸引日本、朝鲜等国大量学习？",
    options: ["因为唐朝军事最强", "因为唐朝是当时世界最繁荣的文明之一", "因为唐朝强制推广文化", "因为地理距离近"],
    correctIndex: 1,
    explanation: "唐朝国力强盛，长安是当时世界最大的国际都市，拥有先进的政治制度、灿烂的文化艺术和繁荣的经济，自然成为周边国家学习的榜样。",
  },
  {
    id: 19,
    question: "中国书圣王羲之生活在哪个朝代？",
    options: ["东汉", "三国", "晋朝", "南北朝"],
    correctIndex: 2,
    explanation: "王羲之（303-361年）生活在东晋时期，他的《兰亭序》被誉为'天下第一行书'，是中国书法艺术的最高典范。",
  },
  {
    id: 20,
    question: "儒家思想的创始人是谁？",
    options: ["老子", "孔子", "孟子", "荀子"],
    correctIndex: 1,
    explanation: "孔子（前551-前479年）是儒家思想的创始人，他的思想由弟子整理成《论语》，两千年来影响了中国乃至整个东亚的文化与社会。",
  },
];
