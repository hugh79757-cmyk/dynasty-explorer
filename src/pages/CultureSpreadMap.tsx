import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Eye, EyeOff, ChevronRight, Sword, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Data ────────────────────────────────────────────────────────────────────

interface CultureFlow {
  id: string;
  name: string;
  icon: string;
  color: string;
  borderColor: string;
  bgClass: string;
  routes: { from: string; to: string; year?: string }[];
  description: string;
  significance: string;
  dynasties: string[];
  timeline: { place: string; year?: string; desc: string }[];
}

const FLOWS: CultureFlow[] = [
  {
    id: "buddhism",
    name: "佛教",
    icon: "☸",
    color: "#D4AF37",
    borderColor: "hsl(42,80%,50%)",
    bgClass: "bg-yellow-500",
    routes: [
      { from: "china", to: "goguryeo", year: "372年" },
      { from: "goguryeo", to: "baekje", year: "384年" },
      { from: "baekje", to: "silla", year: "528年" },
      { from: "baekje", to: "japan", year: "552年" },
    ],
    description: "佛教发源于古印度，经丝绸之路传入中国，再经朝鲜半岛各国传入日本。",
    significance: "佛教带来了建筑技术、雕塑艺术、绘画风格，深刻影响了东亚的精神世界与艺术创作。",
    dynasties: ["东汉", "隋唐", "高句丽", "百济", "新罗", "飞鸟时代"],
    timeline: [
      { place: "中国", year: "东汉", desc: "佛教经丝绸之路传入中国，经历本土化发展" },
      { place: "高句丽", year: "372年", desc: "前秦僧人顺道将佛教传入高句丽" },
      { place: "百济", year: "384年", desc: "东晋僧人摩罗难陀传入百济" },
      { place: "新罗", year: "528年", desc: "异次顿殉教后，新罗正式承认佛教" },
      { place: "日本", year: "552年", desc: "百济圣王献佛像与经典，佛教传入日本" },
    ],
  },
  {
    id: "characters",
    name: "汉字",
    icon: "字",
    color: "#C41E3A",
    borderColor: "hsl(5,75%,38%)",
    bgClass: "bg-red-600",
    routes: [
      { from: "china", to: "goguryeo", year: "前2世纪" },
      { from: "china", to: "baekje" },
      { from: "baekje", to: "japan", year: "4-5世纪" },
    ],
    description: "汉字是世界上最古老的文字之一。百济学者王仁将《论语》和《千字文》带入日本，是汉字进入日本的关键节点。",
    significance: "汉字使东亚各国可以阅读同样的经典，形成共同的文化圈。朝鲜后来发明谚文，日本创造假名，但汉字基础不可或缺。",
    dynasties: ["商周", "秦汉", "高句丽", "百济", "新罗", "古坟时代"],
    timeline: [
      { place: "中国", year: "商朝", desc: "甲骨文到楷书的漫长演变" },
      { place: "朝鲜半岛", year: "前2世纪", desc: "汉四郡时期汉字大量传入" },
      { place: "日本", year: "4世纪", desc: "百济学者王仁携《论语》《千字文》东渡" },
    ],
  },
  {
    id: "pottery",
    name: "陶瓷",
    icon: "🏺",
    color: "#4169E1",
    borderColor: "hsl(225,73%,57%)",
    bgClass: "bg-blue-600",
    routes: [
      { from: "china", to: "baekje" },
      { from: "china", to: "goguryeo" },
      { from: "gaya", to: "japan", year: "5世纪" },
    ],
    description: "中国是瓷器故乡，'China'本意即瓷器。伽倻的陶质土器技术东传日本，形成须惠器。朝鲜后来发展出举世闻名的高丽青瓷。",
    significance: "陶瓷既是日用品，也是奢侈品与贸易货币，推动了东亚的海上贸易网络。",
    dynasties: ["汉朝", "唐朝", "伽倻", "高丽", "飞鸟时代"],
    timeline: [
      { place: "中国", year: "汉-唐", desc: "青瓷、白瓷、唐三彩相继出现" },
      { place: "伽倻", year: "三国时期", desc: "伽倻独立发展出高温陶质土器" },
      { place: "日本", year: "5世纪", desc: "须惠器技术随伽倻移民传入" },
    ],
  },
  {
    id: "architecture",
    name: "建筑/都城",
    icon: "🏯",
    color: "#228B22",
    borderColor: "hsl(120,61%,34%)",
    bgClass: "bg-green-600",
    routes: [
      { from: "china", to: "goguryeo", year: "4-7世纪" },
      { from: "china", to: "baekje" },
      { from: "baekje", to: "japan", year: "7世纪" },
    ],
    description: "唐长安城的棋盘式格局是世界古代都市规划的巅峰。百济工匠赴日建造法隆寺，日本奈良与京都均按长安城格局规划。",
    significance: "法隆寺是世界现存最古老的木构建筑，由百济工匠主导建造，是UNESCO世界遗产。",
    dynasties: ["隋唐", "高句丽", "百济", "飞鸟时代", "奈良时代"],
    timeline: [
      { place: "中国长安", year: "隋唐", desc: "棋盘格都城规划，东西对称，中轴线布局" },
      { place: "百济", year: "5-7世纪", desc: "引入中国宫殿与寺庙建筑体系" },
      { place: "日本飞鸟/奈良", year: "7-8世纪", desc: "百济工匠赴日，建造法隆寺等寺院；奈良城仿长安建设" },
    ],
  },
  {
    id: "confucianism",
    name: "儒学",
    icon: "📜",
    color: "#9932CC",
    borderColor: "hsl(277,64%,50%)",
    bgClass: "bg-purple-600",
    routes: [
      { from: "china", to: "goguryeo", year: "汉朝" },
      { from: "china", to: "baekje" },
      { from: "baekje", to: "japan", year: "5世纪" },
    ],
    description: "儒学由孔子创立，强调仁、义、礼、智、信。新罗花郎道将儒学与武士精神和佛教结合，创造了独特的韩国版本。",
    significance: "儒学塑造了东亚的政治制度、教育体系与家庭伦理，至今深深影响着东亚社会。",
    dynasties: ["春秋战国", "汉朝", "高句丽", "百济", "新罗", "古坟时代"],
    timeline: [
      { place: "中国", year: "前6世纪", desc: "孔子创立儒家学说，后成为汉朝国学" },
      { place: "朝鲜半岛", year: "汉朝起", desc: "儒学随汉字和行政制度一起传入" },
      { place: "日本", year: "5世纪", desc: "百济学者王仁携《论语》传入，此后深刻影响日本政治" },
    ],
  },
  {
    id: "paper",
    name: "造纸/印刷",
    icon: "📄",
    color: "#FF8C00",
    borderColor: "hsl(33,100%,50%)",
    bgClass: "bg-orange-500",
    routes: [
      { from: "china", to: "goguryeo", year: "4世纪" },
      { from: "china", to: "baekje" },
      { from: "goguryeo", to: "japan", year: "610年" },
    ],
    description: "造纸术是中国四大发明之一。高句丽僧人昙征于610年将造纸、墨、磨石等技术传入日本，日本文献称他为'纸墨之祖'。",
    significance: "韩国后来发明了世界上最早的金属活字印刷（比古登堡早200年），这是朝鲜半岛对世界文明的独创贡献。",
    dynasties: ["东汉", "隋唐", "高句丽", "百济", "飞鸟时代"],
    timeline: [
      { place: "中国", year: "东汉", desc: "蔡伦改进造纸术；雕版印刷术相继发明" },
      { place: "朝鲜半岛", year: "4-7世纪", desc: "造纸术传入三国，各国大量抄写佛经" },
      { place: "日本", year: "610年", desc: "高句丽僧人昙征携造纸、磨墨技术入日" },
    ],
  },
];

// ─── Kingdom Data ─────────────────────────────────────────────────────────────

interface KingdomData {
  id: string;
  name: string;
  title: string;
  period: string;
  color: string;
  glowColor: string;
  emblem: string;
  mapX: number; // SVG viewBox 0-800
  mapY: number;
  mapW: number;
  mapH: number;
  identity: string[];
  innovations: { name: string; desc: string }[];
  received: { from: string; items: string[] }[];
  passed: { to: string; items: string[] }[];
  fact: string;
  controversy?: string;
  famousFigures?: { name: string; desc: string }[];
}

const KINGDOMS: KingdomData[] = [
  {
    id: "china",
    name: "中国（唐）",
    title: "东方文明的摇篮",
    period: "夏朝—唐朝（约前2070年—907年）",
    color: "#8B1A1A",
    glowColor: "rgba(139,26,26,0.4)",
    emblem: "🐉",
    mapX: 60,
    mapY: 100,
    mapW: 280,
    mapH: 300,
    identity: [
      "东亚最大的文明中心，汉字文化圈的核心",
      "唐长安是当时世界上最大的城市，人口逾百万",
      "丝绸之路的起点，连接东西方文明",
    ],
    innovations: [
      { name: "造纸术", desc: "蔡伦改进，东汉时期" },
      { name: "印刷术", desc: "雕版印刷推动文化传播" },
      { name: "火药", desc: "唐代炼丹家发明" },
      { name: "长安城", desc: "棋盘式都城规划的典范" },
    ],
    received: [{ from: "古印度", items: ["佛教"] }],
    passed: [
      { to: "高句丽", items: ["佛教", "汉字", "儒学", "建筑", "造纸"] },
      { to: "百济", items: ["佛教", "汉字", "儒学", "陶瓷", "律令"] },
      { to: "新罗", items: ["汉字", "儒学", "律令制度"] },
    ],
    fact: "唐太宗李世民亲率世界最强大军 — 却在高句丽的山城防御体系下铩羽而归，这成为他一生的遗憾。高句丽让唐帝国见识到了对手的真正实力。",
    famousFigures: [
      { name: "唐太宗", desc: "历史上少有的圣明之君，却在高句丽战役中失利" },
      { name: "玄奘", desc: "西行取经，带回佛法，推动东亚佛教发展" },
    ],
  },
  {
    id: "goguryeo",
    name: "高句丽",
    title: "东北亚的霸主",
    period: "前37年—668年（705年历史）",
    color: "#2D5016",
    glowColor: "rgba(45,80,22,0.5)",
    emblem: "🦅",
    mapX: 330,
    mapY: 60,
    mapW: 130,
    mapH: 160,
    identity: [
      "领土横跨满洲、辽东、朝鲜北部，是东北亚最强大的军事强国",
      "四次击退隋朝征伐，隋炀帝三征高句丽，葬送了整个隋朝",
      "唐太宗亲征亦无法攻破高句丽山城防御体系",
    ],
    innovations: [
      { name: "高句丽古墓壁画", desc: "UNESCO世界遗产，独特的艺术传统" },
      { name: "山城体系", desc: "天下无敌的要塞防御工程" },
      { name: "铠马武士", desc: "东亚最强重型骑兵，令敌人闻风丧胆" },
      { name: "온돌/暖炕", desc: "地暖系统，高句丽独立发明" },
    ],
    received: [{ from: "中国", items: ["佛教（372年）", "汉字", "儒学"] }],
    passed: [
      { to: "日本", items: ["壁画艺术", "造纸术（僧人昙征）"] },
      { to: "唐帝国", items: ["高句丽乐（列入唐宫廷十部乐）"] },
    ],
    fact: "萨水大捷（612年）：高句丽大将乙支文德以诱敌深入之策，在萨水河畔全歼隋军30万，这是古代东亚战争史上最大的歼灭战之一。此战直接加速了隋朝灭亡。",
    controversy: "高句丽的历史归属是一个学术争议话题。韩国学者认为高句丽是韩国古代三国之一，其文化和血脉延续到了高丽和现代韩国。中国学者则认为高句丽是中国东北地方政权。这个争议说明历史是复杂的——事实上，高句丽遗民后来建立了渤海国，而其他高句丽遗民融入了新罗，成为统一朝鲜民族的重要组成部分。同学们可以通过更多史料来形成自己的判断。",
    famousFigures: [
      { name: "广开土大王", desc: "在位18年，将高句丽领土扩大数倍，是高句丽最伟大的君主" },
      { name: "乙支文德", desc: "萨水大捷的指挥官，以3万人歼灭隋军30万" },
      { name: "渊盖苏文", desc: "高句丽末期的摄政，多次击退唐太宗亲征" },
      { name: "昙征", desc: "高句丽僧人，将造纸墨技术传入日本" },
    ],
  },
  {
    id: "baekje",
    name: "百济",
    title: "海上的文化大国",
    period: "前18年—660年（678年历史）",
    color: "#1A3A6E",
    glowColor: "rgba(26,58,110,0.5)",
    emblem: "⚓",
    mapX: 360,
    mapY: 280,
    mapW: 95,
    mapH: 110,
    identity: [
      "百济是大陆文化传入日本的核心桥梁，日本古代文明深刻受惠于百济",
      "拥有东亚最发达的海上贸易网络，连接中国、朝鲜、日本及东南亚",
      "百济工匠建造了日本最古老的木构建筑法隆寺（UNESCO世界遗产）",
    ],
    innovations: [
      { name: "百济金铜大香炉", desc: "将佛教、道教与韩国萨满传统完美融合，无与伦比的工艺品" },
      { name: "百济微笑", desc: "佛像雕塑独特的宁静笑容，影响了整个日本佛教雕塑风格" },
      { name: "海上外交网络", desc: "百济同时维持与中国南朝和日本的双边关系" },
      { name: "建筑技术", desc: "木构建筑工法东传日本，法隆寺至今屹立" },
    ],
    received: [
      { from: "中国", items: ["佛教（384年）", "汉字", "儒学", "律令"] },
      { from: "高句丽", items: ["佛教传播路径"] },
    ],
    passed: [
      { to: "日本", items: ["佛教", "汉字（王仁传《论语》）", "儒学", "建筑技术", "五经博士", "医学"] },
    ],
    fact: "王仁（왕인）——这个百济学者的名字，日本历史永远不会忘记。公元4世纪，他携带《论语》十卷、《千字文》一卷东渡日本，这被认为是汉字和儒学正式传入日本的起点。没有王仁，就没有日本文字。",
    famousFigures: [
      { name: "王仁", desc: "将汉字和《论语》带入日本，被誉为'文道之祖'" },
      { name: "圣王", desc: "552年向日本献佛像佛经，正式开启日本佛教时代" },
      { name: "百济工匠团", desc: "赴日建造法隆寺，将建筑技术带入日本" },
    ],
  },
  {
    id: "silla",
    name: "新罗",
    title: "统一三国的黄金王国",
    period: "前57年—935年（992年历史）",
    color: "#6B2FA0",
    glowColor: "rgba(107,47,160,0.5)",
    emblem: "👑",
    mapX: 430,
    mapY: 340,
    mapW: 80,
    mapH: 90,
    identity: [
      "新罗金冠（新罗金冠）是全世界独一无二的设计，树形与鹿角图案源自韩国萨满传统，中国没有任何类似之物",
      "花郎道（花郎/화랑）：融合武士、诗人、僧侣为一体的精英战士集团，是新罗统一朝鲜半岛的核心力量",
      "罗唐战争（670-676年）：新罗借唐之力灭百济、高句丽后，转而击败唐军，将中国势力驱出朝鲜半岛，捍卫了朝鲜的独立",
    ],
    innovations: [
      { name: "新罗金冠", desc: "萨满树形设计，全球独一无二，5顶传世至今" },
      { name: "瞻星台", desc: "约633年建造，东亚现存最古老的天文台" },
      { name: "花郎道", desc: "兼修武艺、诗歌、佛法的武士学者制度" },
      { name: "骨品制", desc: "独特的新罗贵族等级制度" },
    ],
    received: [
      { from: "中国（唐）", items: ["律令制度", "汉字", "儒学", "佛教"] },
      { from: "高句丽", items: ["佛教（528年）"] },
    ],
    passed: [
      { to: "高丽/朝鲜", items: ["三国文化融合成果", "佛教传统"] },
    ],
    fact: "新罗在与唐合力灭掉百济和高句丽之后，立刻转变立场，向唐朝宣战。罗唐战争（670-676年）中，新罗以弱胜强，将唐军彻底赶出朝鲜半岛，独立完成了朝鲜半岛的统一。这是朝鲜历史上最了不起的战略胜利之一。",
    famousFigures: [
      { name: "善德女王", desc: "新罗第一位女王，建造了瞻星台" },
      { name: "金庾信", desc: "花郎出身的新罗最伟大将领，统一三国的核心军事人物" },
      { name: "元晓", desc: "新罗最伟大的佛教僧侣，著作影响整个东亚佛学" },
    ],
  },
  {
    id: "gaya",
    name: "伽倻",
    title: "铁与琴弦的国度",
    period: "42年—562年（520年历史）",
    color: "#8B4513",
    glowColor: "rgba(139,69,19,0.5)",
    emblem: "⚔",
    mapX: 430,
    mapY: 290,
    mapW: 55,
    mapH: 55,
    identity: [
      "东亚最重要的铁产地，伽倻铁器出口到中国乐浪郡和整个日本列岛",
      "伽倻琴（伽倻琴/가야금）：12弦竖琴，由伽倻王嘉实发明，是今日韩国最具代表性的传统乐器",
      "伽倻工匠和贵族移民日本，有历史学家认为他们影响了日本早期国家的形成",
    ],
    innovations: [
      { name: "伽倻琴", desc: "嘉实王发明，12弦，今日仍是韩国国乐象征" },
      { name: "铁器出口", desc: "伽倻铁甲和铁器是东亚最高品质" },
      { name: "须惠器前身", desc: "陶质土器技术随移民传入日本，成为须惠器" },
    ],
    received: [
      { from: "中国/乐浪", items: ["金属铸造技术"] },
    ],
    passed: [
      { to: "日本", items: ["铁器技术", "须惠器陶瓷技法", "音乐（伽倻琴）"] },
    ],
    fact: "伽倻是最小的朝鲜半岛古国，却是最重要的铁器生产中心。日本考古发现的大量铁器和陶器都能追溯到伽倻工匠。部分学者还认为，伽倻王族移民日本后，影响了日本天皇家族的早期形成——这是东亚史学界最具争议性的话题之一。",
    famousFigures: [
      { name: "嘉实王", desc: "发明伽倻琴，并派乐师于勒推广，使伽倻音乐流传千年" },
    ],
  },
  {
    id: "balhae",
    name: "渤海",
    title: "高句丽的继承者",
    period: "698年—926年（228年历史）",
    color: "#1E6E6E",
    glowColor: "rgba(30,110,110,0.5)",
    emblem: "🌊",
    mapX: 330,
    mapY: 30,
    mapW: 130,
    mapH: 70,
    identity: [
      "由高句丽将军大祚荣（대조영）在高句丽灭亡后建立，明确自我定义为高句丽的继承者",
      "被称为'海东盛国'，拥有高度发达的文化与强大的军事力量",
      "同时与唐朝和日本维持独立外交，绝非唐朝藩属",
    ],
    innovations: [
      { name: "五京制度", desc: "仿唐朝但具渤海特色的都城行政系统" },
      { name: "渤海-日本海路", desc: "独立维持的日本外交与贸易航线" },
    ],
    received: [
      { from: "唐朝", items: ["政治制度", "汉字文化"] },
      { from: "高句丽遗产", items: ["军事传统", "壁画艺术", "建筑技术"] },
    ],
    passed: [
      { to: "高丽", items: ["高句丽文化传承"] },
    ],
    fact: "渤海与日本建立了独立的外交关系，派遣使节往来长达两百年，史称'渤日外交'。渤海人明确不服从唐朝的宗主地位，是真正独立的东北亚强国，不是中国的地方政权。",
    famousFigures: [
      { name: "大祚荣", desc: "高句丽将领，698年在天门岭大败唐军，建立渤海国" },
    ],
  },
  {
    id: "japan",
    name: "日本",
    title: "文化融合的岛国",
    period: "弥生时代—奈良时代（约前3世纪—794年）",
    color: "#8B2252",
    glowColor: "rgba(139,34,82,0.4)",
    emblem: "⛩",
    mapX: 580,
    mapY: 150,
    mapW: 120,
    mapH: 220,
    identity: [
      "通过大量遣唐使学习唐朝文明，但创造性地将其本土化，形成独特的日本文化",
      "法隆寺（617年）：世界现存最古老的木构建筑，由百济工匠建造，UNESCO世界遗产",
      "奈良城（710年）完全仿照唐长安城棋盘格局建设",
    ],
    innovations: [
      { name: "假名文字", desc: "基于汉字发展出的日本本土书写系统" },
      { name: "大化改新", desc: "645年，全面引入唐制度进行政治革新" },
      { name: "法隆寺", desc: "世界最古老木构建筑，百济技术的结晶" },
    ],
    received: [
      { from: "百济", items: ["佛教", "汉字（王仁）", "建筑技术", "儒学"] },
      { from: "高句丽", items: ["造纸（昙征）", "壁画艺术"] },
      { from: "伽倻", items: ["铁器", "须惠器技术"] },
      { from: "唐朝", items: ["律令制度", "都城规划", "茶", "诗歌"] },
    ],
    passed: [],
    fact: "日本飞鸟时代（593-710年）的文化，几乎是由朝鲜半岛传来的移民建立的。当时来自百济、高句丽、伽倻的匠人、僧侣和贵族，在日本建造寺庙、传授技术、推广汉字，成为日本古代文明的奠基者之一。",
    famousFigures: [
      { name: "圣德太子", desc: "推动大化改新前身，积极引入大陆文化" },
      { name: "遣唐使", desc: "多次派遣留学生赴唐，带回先进文明" },
    ],
  },
];

// ─── SVG Map Coordinates for kingdoms ────────────────────────────────────────

// Flow path definitions between kingdoms (SVG paths)
// viewBox: 0 0 780 580
const FLOW_PATHS: Record<string, { d: string; delay: number; label?: string }[]> = {
  buddhism: [
    { d: "M 340 140 C 360 130, 370 110, 395 100", delay: 0, label: "372年" },
    { d: "M 395 200 C 400 230, 390 255, 408 280", delay: 0.8, label: "384年" },
    { d: "M 408 330 C 430 350, 440 350, 470 355", delay: 1.6, label: "528年" },
    { d: "M 430 315 C 510 300, 560 250, 600 230", delay: 2.4, label: "552年" },
  ],
  characters: [
    { d: "M 340 200 C 360 180, 380 170, 395 160", delay: 0, label: "前2世纪" },
    { d: "M 340 220 C 360 270, 380 290, 408 310", delay: 0.3 },
    { d: "M 440 320 C 510 310, 565 280, 600 260", delay: 1, label: "4-5世纪" },
  ],
  pottery: [
    { d: "M 340 240 C 360 260, 380 280, 408 290", delay: 0 },
    { d: "M 460 300 C 510 295, 555 280, 590 265", delay: 0.8, label: "5世纪" },
  ],
  architecture: [
    { d: "M 340 180 C 350 160, 368 150, 395 140", delay: 0 },
    { d: "M 340 230 C 360 275, 385 290, 408 295", delay: 0.3 },
    { d: "M 440 335 C 510 320, 560 290, 595 270", delay: 1, label: "7世纪" },
  ],
  confucianism: [
    { d: "M 340 250 C 360 230, 380 210, 395 190", delay: 0 },
    { d: "M 340 255 C 360 280, 385 295, 408 305", delay: 0.3 },
    { d: "M 445 320 C 510 305, 560 285, 595 275", delay: 1, label: "5世纪" },
  ],
  paper: [
    { d: "M 340 200 C 355 175, 372 158, 395 148", delay: 0 },
    { d: "M 395 170 C 490 180, 550 215, 598 232", delay: 0.9, label: "610年" },
  ],
};

// ─── Two-Way Exchange Data ─────────────────────────────────────────────────

const BIDIRECTIONAL = [
  {
    icon: "🎵",
    title: "高句丽乐 → 唐宫廷",
    desc: "高句丽音乐（高句丽乐）被列入唐朝官方'十部乐'，在唐宫廷定期演出，是韩国文化影响中国的有力证据。",
    color: "#2D5016",
  },
  {
    icon: "📚",
    title: "王仁 → 日本汉字",
    desc: "百济学者王仁携《论语》东渡日本，被视为汉字和儒学正式进入日本的起点——是韩国人把汉字带入日本，不是中国直接传入。",
    color: "#1A3A6E",
  },
  {
    icon: "🏛",
    title: "法隆寺 = 百济技术",
    desc: "日本现存最古老的建筑——法隆寺，由百济工匠主导建造。日本'最古老的建筑'其实是朝鲜工匠的杰作。",
    color: "#1A3A6E",
  },
  {
    icon: "🔥",
    title: "온돌/暖炕 = 韩国发明",
    desc: "地暖（온돌）系统在高句丽时代就已存在，是完全独立于中国的韩国发明，至今是韩国住宅的特色。",
    color: "#2D5016",
  },
  {
    icon: "🌿",
    title: "金属活字印刷 = 朝鲜发明",
    desc: "高丽朝鲜比德国古登堡早200年，发明了世界上最早的金属活字印刷术，是对世界文明的独创贡献。",
    color: "#6B2FA0",
  },
  {
    icon: "⭐",
    title: "新罗金冠 = 无可复制",
    desc: "新罗金冠的树形和鹿角设计来自朝鲜半岛萨满传统，在全世界找不到任何类似物品，是纯粹的韩国独创艺术。",
    color: "#6B2FA0",
  },
];

// ─── SVG Map ─────────────────────────────────────────────────────────────────

function GameMap({
  activeKingdom,
  onKingdomClick,
  visibleFlows,
}: {
  activeKingdom: string | null;
  onKingdomClick: (id: string) => void;
  visibleFlows: Set<string>;
}) {
  return (
    <svg
      viewBox="0 0 780 580"
      className="w-full h-full"
      style={{ fontFamily: "'Noto Serif SC', serif" }}
    >
      <defs>
        {/* Parchment background */}
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="hsl(38,55%,90%)" />
          <stop offset="60%" stopColor="hsl(35,50%,84%)" />
          <stop offset="100%" stopColor="hsl(28,45%,74%)" />
        </radialGradient>

        {/* Ocean */}
        <linearGradient id="seaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(210,60%,70%)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(200,55%,60%)" stopOpacity="0.4" />
        </linearGradient>

        {/* Territory fills */}
        {KINGDOMS.map((k) => (
          <radialGradient key={`grad-${k.id}`} id={`grad-${k.id}`} cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor={k.color} stopOpacity="0.55" />
            <stop offset="100%" stopColor={k.color} stopOpacity="0.25" />
          </radialGradient>
        ))}

        {/* Glow filter */}
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Strong glow for active */}
        <filter id="glowStrong" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Arrow marker */}
        {FLOWS.map((f) => (
          <marker
            key={`arrow-${f.id}`}
            id={`arrow-${f.id}`}
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill={f.color} opacity="0.9" />
          </marker>
        ))}

        {/* Wave pattern for sea */}
        <pattern id="waves" x="0" y="0" width="30" height="15" patternUnits="userSpaceOnUse">
          <path
            d="M0,8 Q7.5,2 15,8 Q22.5,14 30,8"
            fill="none"
            stroke="hsl(210,60%,60%)"
            strokeWidth="0.8"
            opacity="0.5"
          />
        </pattern>

        {/* Grid/map texture */}
        <pattern id="gridTex" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="0.8" fill="hsl(30,30%,60%)" opacity="0.25" />
        </pattern>
      </defs>

      {/* ── Background ── */}
      <rect width="780" height="580" fill="url(#bgGrad)" />
      <rect width="780" height="580" fill="url(#gridTex)" />

      {/* ── Sea ── */}
      {/* Yellow Sea / East China Sea */}
      <path
        d="M480 100 Q530 80 600 120 L700 200 Q740 300 720 440 L680 520 Q620 560 570 540 Q520 520 500 460 Q480 400 490 340 Q500 280 480 220 Q460 160 480 100Z"
        fill="url(#seaGrad)"
      />
      <path
        d="M480 100 Q530 80 600 120 L700 200 Q740 300 720 440 L680 520 Q620 560 570 540 Q520 520 500 460 Q480 400 490 340 Q500 280 480 220 Q460 160 480 100Z"
        fill="url(#waves)"
        opacity="0.6"
      />

      {/* Sea of Japan */}
      <path
        d="M530 80 L580 60 L700 100 L750 180 L730 350 L700 420 L660 440 Q640 380 650 300 Q660 220 640 160 Q620 100 530 80Z"
        fill="url(#seaGrad)"
        opacity="0.6"
      />

      {/* ── Mountains decorative ── */}
      {[
        [100, 120], [130, 90], [160, 110],
        [80, 200], [120, 180],
        [200, 150], [220, 130],
        [260, 100], [280, 80],
      ].map(([x, y], i) => (
        <g key={`mtn-${i}`} opacity="0.45">
          <polygon
            points={`${x},${y} ${x - 12},${y + 22} ${x + 12},${y + 22}`}
            fill="hsl(28,40%,42%)"
          />
          <polygon
            points={`${x},${y} ${x - 6},${y + 10} ${x + 6},${y + 10}`}
            fill="white"
            opacity="0.5"
          />
        </g>
      ))}

      {/* Korean peninsula mountains */}
      {[
        [390, 90], [410, 70], [430, 85],
        [380, 170], [400, 155],
      ].map(([x, y], i) => (
        <g key={`kmtn-${i}`} opacity="0.4">
          <polygon
            points={`${x},${y} ${x - 9},${y + 17} ${x + 9},${y + 17}`}
            fill="hsl(100,30%,35%)"
          />
        </g>
      ))}

      {/* ── Rivers ── */}
      {/* 黄河 */}
      <path
        d="M 80 200 Q 120 180 170 200 Q 220 220 260 210 Q 310 195 340 210"
        fill="none"
        stroke="hsl(210,70%,65%)"
        strokeWidth="2.5"
        opacity="0.7"
        strokeLinecap="round"
      />
      <text x="160" y="195" fontSize="9" fill="hsl(210,60%,45%)" opacity="0.8" textAnchor="middle">
        黄河
      </text>

      {/* 长江 */}
      <path
        d="M 80 310 Q 130 300 190 310 Q 250 320 300 310 Q 330 305 345 315"
        fill="none"
        stroke="hsl(210,70%,65%)"
        strokeWidth="2.5"
        opacity="0.7"
        strokeLinecap="round"
      />
      <text x="200" y="330" fontSize="9" fill="hsl(210,60%,45%)" opacity="0.8" textAnchor="middle">
        长江
      </text>

      {/* 鸭绿江 */}
      <path
        d="M 340 140 Q 365 155 390 148 Q 410 142 440 155"
        fill="none"
        stroke="hsl(210,70%,65%)"
        strokeWidth="1.8"
        opacity="0.6"
        strokeLinecap="round"
      />
      <text x="390" y="145" fontSize="8" fill="hsl(210,60%,45%)" opacity="0.75" textAnchor="middle">
        鸭绿江
      </text>

      {/* ── Kingdom Territories ── */}
      {KINGDOMS.map((k) => {
        const isActive = activeKingdom === k.id;
        return (
          <g key={k.id} onClick={() => onKingdomClick(k.id)} style={{ cursor: "pointer" }}>
            {/* Territory shape */}
            <motion.rect
              x={k.mapX}
              y={k.mapY}
              width={k.mapW}
              height={k.mapH}
              rx={k.id === "japan" ? 40 : k.id === "china" ? 20 : 15}
              ry={k.id === "japan" ? 50 : k.id === "china" ? 20 : 15}
              fill={`url(#grad-${k.id})`}
              stroke={k.color}
              strokeWidth={isActive ? 3.5 : 1.8}
              filter={isActive ? "url(#glowStrong)" : undefined}
              animate={{
                strokeWidth: isActive ? 3.5 : 1.8,
                opacity: isActive ? 1 : 0.85,
              }}
              transition={{ duration: 0.25 }}
            />

            {/* Emblem */}
            <text
              x={k.mapX + k.mapW / 2}
              y={k.mapY + k.mapH / 2 - (k.mapH > 100 ? 18 : 10)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={k.mapH > 100 ? 28 : k.mapH > 60 ? 20 : 16}
              style={{ userSelect: "none", pointerEvents: "none" }}
            >
              {k.emblem}
            </text>

            {/* Kingdom Name */}
            <text
              x={k.mapX + k.mapW / 2}
              y={k.mapY + k.mapH / 2 + (k.mapH > 100 ? 12 : 8)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={k.id === "china" || k.id === "japan" ? 16 : k.mapH > 80 ? 13 : 11}
              fontWeight="bold"
              fill={isActive ? "#FFFFFF" : "hsl(20,30%,10%)"}
              filter={isActive ? "url(#glow)" : undefined}
              style={{ userSelect: "none", pointerEvents: "none" }}
            >
              {k.name}
            </text>

            {/* Sub-label for large territories */}
            {k.mapH > 100 && (
              <text
                x={k.mapX + k.mapW / 2}
                y={k.mapY + k.mapH / 2 + 28}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={9}
                fill="hsl(20,20%,30%)"
                opacity="0.75"
                style={{ userSelect: "none", pointerEvents: "none" }}
              >
                {k.title}
              </text>
            )}
          </g>
        );
      })}

      {/* ── Capital City Markers ── */}
      {[
        { x: 200, y: 250, name: "长安", color: "#8B1A1A" },
        { x: 390, y: 100, name: "平壤", color: "#2D5016" },
        { x: 408, y: 310, name: "熊津", color: "#1A3A6E" },
        { x: 455, y: 368, name: "金城", color: "#6B2FA0" },
        { x: 445, y: 308, name: "金官城", color: "#8B4513" },
      ].map((city) => (
        <g key={city.name}>
          <circle cx={city.x} cy={city.y} r={5} fill={city.color} opacity={0.9} />
          <circle cx={city.x} cy={city.y} r={8} fill="none" stroke={city.color} strokeWidth={1.2} opacity={0.5} />
          <text
            x={city.x + 10}
            y={city.y + 4}
            fontSize={9}
            fill={city.color}
            fontWeight="bold"
            style={{ userSelect: "none" }}
          >
            ★{city.name}
          </text>
        </g>
      ))}

      {/* ── Culture Flow Arrows ── */}
      {FLOWS.map((flow) => {
        if (!visibleFlows.has(flow.id)) return null;
        const paths = FLOW_PATHS[flow.id] || [];
        return (
          <g key={flow.id}>
            {paths.map((p, i) => (
              <motion.path
                key={`${flow.id}-p${i}`}
                d={p.d}
                fill="none"
                stroke={flow.color}
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeDasharray="8 4"
                markerEnd={`url(#arrow-${flow.id})`}
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{
                  pathLength: { duration: 1.2, delay: p.delay, ease: "easeInOut" },
                  opacity: { duration: 0.3, delay: p.delay },
                }}
              />
            ))}
          </g>
        );
      })}

      {/* ── Compass ── */}
      <g transform="translate(740, 520)">
        <circle r="22" fill="hsl(38,55%,88%)" stroke="hsl(35,30%,60%)" strokeWidth="1.2" />
        <text textAnchor="middle" y="-8" fontSize="9" fill="hsl(20,30%,20%)" fontWeight="bold">北</text>
        <text textAnchor="middle" y="14" fontSize="9" fill="hsl(20,30%,20%)">南</text>
        <text textAnchor="start" x="8" y="4" fontSize="9" fill="hsl(20,30%,20%)">东</text>
        <text textAnchor="end" x="-8" y="4" fontSize="9" fill="hsl(20,30%,20%)">西</text>
        <line x1="0" y1="-18" x2="0" y2="18" stroke="hsl(20,30%,40%)" strokeWidth="1" />
        <line x1="-18" y1="0" x2="18" y2="0" stroke="hsl(20,30%,40%)" strokeWidth="1" />
      </g>

      {/* ── Title Banner ── */}
      <g>
        <rect x="10" y="12" width="310" height="38" rx="6" fill="hsl(5,75%,38%)" opacity="0.92" />
        <text x="20" y="25" fontSize="11" fill="hsl(38,55%,92%)" opacity="0.85">
          东亚文化传播地图 · 三国时代
        </text>
        <text x="20" y="42" fontSize="14" fontWeight="bold" fill="hsl(38,55%,95%)">
          点击王国查看详情 · 点击图例显示传播路线
        </text>
      </g>
    </svg>
  );
}

// ─── Kingdom Detail Panel ─────────────────────────────────────────────────────

function KingdomPanel({
  kingdom,
  onClose,
}: {
  kingdom: KingdomData;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"identity" | "exchange" | "figures">("identity");
  const [showControversy, setShowControversy] = useState(false);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 220 }}
      className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[420px] bg-card border-l-2 shadow-2xl overflow-y-auto flex flex-col"
      style={{ borderColor: kingdom.color }}
    >
      {/* ── Header ── */}
      <div
        className="sticky top-0 z-10 p-5 flex flex-col gap-1"
        style={{
          background: `linear-gradient(135deg, ${kingdom.color}ee, ${kingdom.color}99)`,
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">{kingdom.emblem}</span>
              <div>
                <p className="text-xs font-bold text-white/70 uppercase tracking-widest">{kingdom.title}</p>
                <h2 className="text-2xl font-serif-sc font-black text-white leading-tight">
                  {kingdom.name}
                </h2>
              </div>
            </div>
            <p className="text-xs text-white/80 mt-1 ml-10">📅 {kingdom.period}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-3">
          {(["identity", "exchange", "figures"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                tab === t ? "bg-white/30 text-white" : "bg-white/10 text-white/60 hover:bg-white/20"
              }`}
            >
              {t === "identity" ? "🛡 身份认同" : t === "exchange" ? "🔄 文化交流" : "⚔ 名人志"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="p-4 space-y-4 flex-1">
        <AnimatePresence mode="wait">
          {tab === "identity" && (
            <motion.div
              key="identity"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              {/* Identity points */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  🏆 强国身份
                </h3>
                {kingdom.identity.map((point, i) => (
                  <div
                    key={i}
                    className="flex gap-2 p-3 rounded-xl border"
                    style={{ borderColor: `${kingdom.color}55`, background: `${kingdom.color}15` }}
                  >
                    <Sword className="w-4 h-4 mt-0.5 shrink-0" style={{ color: kingdom.color }} />
                    <p className="text-sm text-foreground leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>

              {/* Innovations */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  💡 独特创新
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {kingdom.innovations.map((inn, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl border text-center"
                      style={{ borderColor: `${kingdom.color}55`, background: `${kingdom.color}12` }}
                    >
                      <p className="text-xs font-bold text-foreground">{inn.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{inn.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fact */}
              <div
                className="p-4 rounded-xl border-l-4"
                style={{ borderColor: kingdom.color, background: `${kingdom.color}18` }}
              >
                <p className="text-xs font-bold text-muted-foreground mb-1">⚡ 震撼史实</p>
                <p className="text-sm text-foreground leading-relaxed">{kingdom.fact}</p>
              </div>

              {/* Controversy box */}
              {kingdom.controversy && (
                <div className="rounded-xl border-2 border-dashed border-muted-foreground/40 overflow-hidden">
                  <button
                    onClick={() => setShowControversy(!showControversy)}
                    className="w-full flex items-center justify-between p-3 bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <span className="text-xs font-bold text-foreground">🤔 你知道吗？历史的争议</span>
                    <ChevronRight
                      className={`w-4 h-4 text-muted-foreground transition-transform ${showControversy ? "rotate-90" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {showControversy && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-foreground leading-relaxed p-3">
                          {kingdom.controversy}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}

          {tab === "exchange" && (
            <motion.div
              key="exchange"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              {kingdom.received.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    📥 吸收的文化
                  </h3>
                  {kingdom.received.map((r, i) => (
                    <div key={i} className="bg-secondary/60 rounded-lg p-3 border border-border">
                      <p className="text-xs text-muted-foreground mb-1.5">来自 <strong>{r.from}</strong>：</p>
                      <div className="flex flex-wrap gap-1">
                        {r.items.map((item) => (
                          <span
                            key={item}
                            className="text-xs px-2 py-0.5 rounded-full border"
                            style={{
                              borderColor: `${kingdom.color}88`,
                              color: kingdom.color,
                              background: `${kingdom.color}15`,
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {kingdom.passed.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    📤 传播出去的文化
                  </h3>
                  {kingdom.passed.map((p, i) => (
                    <div
                      key={i}
                      className="rounded-lg p-3 border"
                      style={{ borderColor: `${kingdom.color}55`, background: `${kingdom.color}12` }}
                    >
                      <p className="text-xs text-muted-foreground mb-1.5">传给 <strong>{p.to}</strong>：</p>
                      <div className="flex flex-wrap gap-1">
                        {p.items.map((item) => (
                          <span
                            key={item}
                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{ background: kingdom.color, color: "#fff" }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {kingdom.passed.length === 0 && kingdom.received.length > 0 && (
                <div className="text-center p-6 text-muted-foreground text-sm">
                  <p>日本将接收到的文化进行了深度本土化改造，</p>
                  <p>发展出了独特的日本文化传统。</p>
                </div>
              )}
            </motion.div>
          )}

          {tab === "figures" && (
            <motion.div
              key="figures"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                ⚔ 历史名人
              </h3>
              {(kingdom.famousFigures || []).map((fig, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-3 p-3 rounded-xl border"
                  style={{ borderColor: `${kingdom.color}44`, background: `${kingdom.color}10` }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 font-bold text-white"
                    style={{ background: kingdom.color }}
                  >
                    {fig.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">{fig.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{fig.desc}</p>
                  </div>
                </motion.div>
              ))}
              {(!kingdom.famousFigures || kingdom.famousFigures.length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-8">暂无记录</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Culture Flow Popup ───────────────────────────────────────────────────────

function FlowPopup({ flow, onClose }: { flow: CultureFlow; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 20 }}
      className="fixed inset-x-4 bottom-24 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-auto sm:w-[480px] max-h-[72vh] overflow-y-auto bg-card border-2 rounded-2xl shadow-2xl"
      style={{ borderColor: flow.color }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between p-4 rounded-t-2xl"
        style={{ background: `linear-gradient(135deg, ${flow.color}ee, ${flow.color}99)` }}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">{flow.icon}</span>
          <h3 className="text-xl font-serif-sc font-black text-white">{flow.name}</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        <p className="text-sm text-foreground leading-relaxed">{flow.description}</p>

        {/* Timeline */}
        <div>
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
            📅 传播时间线
          </h4>
          <div className="relative pl-4">
            <div
              className="absolute left-1.5 top-2 bottom-2 w-0.5 rounded-full"
              style={{ background: `${flow.color}55` }}
            />
            {flow.timeline.map((r, i) => (
              <div key={i} className="flex items-start gap-3 mb-3 relative">
                <div
                  className="w-3 h-3 rounded-full mt-1 shrink-0 absolute -left-[18px]"
                  style={{ backgroundColor: flow.color }}
                />
                <div className="flex-1 pl-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-foreground">{r.place}</span>
                    {r.year && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
                        style={{ background: flow.color }}
                      >
                        {r.year}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Significance */}
        <div
          className="rounded-xl p-3 border"
          style={{ borderColor: `${flow.color}55`, background: `${flow.color}12` }}
        >
          <h4 className="text-xs font-bold mb-1" style={{ color: flow.color }}>
            💡 历史意义
          </h4>
          <p className="text-sm text-foreground leading-relaxed">{flow.significance}</p>
        </div>

        {/* Dynasties */}
        <div>
          <h4 className="text-xs font-bold text-muted-foreground mb-2">🏛 相关朝代/时期</h4>
          <div className="flex flex-wrap gap-1.5">
            {flow.dynasties.map((d) => (
              <span
                key={d}
                className="text-xs px-2 py-1 rounded-full border"
                style={{ borderColor: `${flow.color}88`, color: flow.color }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Legend & Controls ────────────────────────────────────────────────────────

function Controls({
  visibleFlows,
  onToggle,
  onPlayAll,
  isPlaying,
  onFlowClick,
}: {
  visibleFlows: Set<string>;
  onToggle: (id: string) => void;
  onPlayAll: () => void;
  isPlaying: boolean;
  onFlowClick: (f: CultureFlow) => void;
}) {
  return (
    <div className="bg-card/95 backdrop-blur-sm border border-border rounded-2xl p-4 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-serif-sc font-bold text-foreground">📡 文化传播图例</h3>
        <Button
          size="sm"
          onClick={onPlayAll}
          disabled={isPlaying}
          className="h-8 px-3 text-xs font-sans-sc"
        >
          <Play className="w-3 h-3 mr-1" />
          {isPlaying ? "播放中..." : "播放全部"}
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {FLOWS.map((flow) => {
          const isVisible = visibleFlows.has(flow.id);
          return (
            <div key={flow.id} className="flex items-center gap-1">
              <button
                onClick={() => onToggle(flow.id)}
                className={`p-1 rounded transition-all ${isVisible ? "opacity-100" : "opacity-40"}`}
                title={isVisible ? "隐藏" : "显示"}
              >
                {isVisible ? (
                  <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />
                )}
              </button>
              <button
                onClick={() => onFlowClick(flow)}
                className={`flex-1 flex items-center gap-1.5 px-2 py-1.5 rounded-lg border transition-all text-left hover:scale-[1.02] ${
                  isVisible ? "bg-card" : "opacity-50 bg-secondary/30"
                }`}
                style={{ borderColor: isVisible ? flow.color : "transparent" }}
              >
                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: flow.color }} />
                <span className="text-xs font-sans-sc font-medium text-foreground truncate">
                  {flow.name}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Bidirectional Exchange Section ──────────────────────────────────────────

function ExchangeSection() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-border" />
        <h2 className="text-sm font-serif-sc font-black text-foreground whitespace-nowrap px-2">
          🔄 文化双向交流 — 朝鲜半岛的主动贡献
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>
      <p className="text-xs text-muted-foreground text-center">
        朝鲜半岛的王国不是文化的被动接收者，他们是创造者、革新者、传播者
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {BIDIRECTIONAL.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="flex gap-3 p-3 rounded-xl border"
            style={{ borderColor: `${item.color}55`, background: `${item.color}10` }}
          >
            <span className="text-2xl shrink-0">{item.icon}</span>
            <div>
              <p className="text-xs font-bold text-foreground mb-0.5">{item.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CultureSpreadMap() {
  const [activeKingdom, setActiveKingdom] = useState<string | null>(null);
  const [selectedFlow, setSelectedFlow] = useState<CultureFlow | null>(null);
  const [visibleFlows, setVisibleFlows] = useState<Set<string>>(new Set(["buddhism"]));
  const [isPlaying, setIsPlaying] = useState(false);

  const handleKingdomClick = useCallback((id: string) => {
    setActiveKingdom(id);
    setSelectedFlow(null);
  }, []);

  const handleToggleFlow = useCallback((id: string) => {
    setVisibleFlows((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handlePlayAll = useCallback(async () => {
    setIsPlaying(true);
    setVisibleFlows(new Set());
    setSelectedFlow(null);
    setActiveKingdom(null);

    const order = ["buddhism", "characters", "confucianism", "architecture", "pottery", "paper"];
    for (const id of order) {
      setVisibleFlows((prev) => new Set([...prev, id]));
      await new Promise((r) => setTimeout(r, 2500));
    }
    setIsPlaying(false);
  }, []);

  // Close panels on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveKingdom(null);
        setSelectedFlow(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const selectedKingdom = KINGDOMS.find((k) => k.id === activeKingdom);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* ── Page Header ── */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 pattern-chinese opacity-30" />
        <div className="relative text-center py-6 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-3">
            <Star className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-bold text-primary">策略地图模式</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-sc font-black text-primary leading-tight">
            文化传播地图
          </h1>
          <p className="mt-1.5 text-muted-foreground font-sans-sc text-sm max-w-xl mx-auto">
            东亚三国时代 · 探索中华文明如何经朝鲜半岛传入日本，发现被遗忘的强国传奇
          </p>
        </div>
      </div>

      {/* ── Main Map ── */}
      <div className="max-w-5xl mx-auto px-2 sm:px-4 pt-4">
        <div
          className="rounded-2xl overflow-hidden shadow-2xl border-2"
          style={{
            borderColor: "hsl(42,80%,50%)",
            background: "hsl(38,55%,92%)",
          }}
        >
          <div style={{ aspectRatio: "780/580" }}>
            <GameMap
              activeKingdom={activeKingdom}
              onKingdomClick={handleKingdomClick}
              visibleFlows={visibleFlows}
            />
          </div>
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="max-w-5xl mx-auto px-2 sm:px-4 pt-4">
        <Controls
          visibleFlows={visibleFlows}
          onToggle={handleToggleFlow}
          onPlayAll={handlePlayAll}
          isPlaying={isPlaying}
          onFlowClick={(f) => { setSelectedFlow(f); setActiveKingdom(null); }}
        />
      </div>

      {/* ── Bidirectional Exchange ── */}
      <div className="max-w-5xl mx-auto px-2 sm:px-4 pt-6">
        <ExchangeSection />
      </div>

      {/* ── Modals ── */}
      <AnimatePresence>
        {selectedFlow && (
          <>
            <motion.div
              key="flow-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm"
              onClick={() => setSelectedFlow(null)}
            />
            <FlowPopup flow={selectedFlow} onClose={() => setSelectedFlow(null)} />
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedKingdom && (
          <>
            <motion.div
              key="kingdom-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm"
              onClick={() => setActiveKingdom(null)}
            />
            <KingdomPanel kingdom={selectedKingdom} onClose={() => setActiveKingdom(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
