import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Eye, EyeOff, ChevronLeft, ChevronRight, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Culture Flow Data ───────────────────────────────────────────────────────

interface CultureFlow {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  significance: string;
  dynasties: string[];
  timeline: { place: string; year?: string; desc: string }[];
}

const FLOWS: CultureFlow[] = [
  {
    id: "buddhism", name: "佛教", icon: "☸", color: "#D4AF37",
    description: "佛教发源于古印度，经丝绸之路传入中国，再经朝鲜半岛各国传入日本，成为东亚共同的精神纽带。",
    significance: "佛教带来了建筑技术、雕塑艺术、绘画风格，深刻影响了东亚各国的精神世界与艺术创作。",
    dynasties: ["东汉", "隋唐", "高句丽", "百济", "新罗", "飞鸟时代"],
    timeline: [
      { place: "中国", year: "东汉", desc: "佛教经丝绸之路传入中国，开始本土化发展" },
      { place: "高句丽", year: "372年", desc: "前秦僧人顺道将佛教传入高句丽" },
      { place: "百济", year: "384年", desc: "东晋僧人摩罗难陀传入百济" },
      { place: "新罗", year: "528年", desc: "异次顿殉教后新罗正式承认佛教" },
      { place: "日本", year: "552年", desc: "百济圣王献佛像与经典，佛教传入日本" },
    ],
  },
  {
    id: "characters", name: "汉字", icon: "字", color: "#C41E3A",
    description: "汉字是东亚文化圈共同的文字基础。百济学者王仁将《论语》和《千字文》带入日本，成为汉字进入日本的关键人物。",
    significance: "汉字使东亚各国能够阅读同样的经典著作，形成了独特的'汉字文化圈'。后来各国又创造出自己的文字。",
    dynasties: ["商周", "秦汉", "高句丽", "百济", "新罗", "古坟时代"],
    timeline: [
      { place: "中国", year: "商朝", desc: "从甲骨文到楷书的漫长演变" },
      { place: "朝鲜半岛", year: "前2世纪", desc: "汉字大量传入朝鲜半岛各国" },
      { place: "日本", year: "4世纪", desc: "百济学者王仁携《论语》《千字文》东渡日本" },
    ],
  },
  {
    id: "pottery", name: "陶瓷", icon: "🏺", color: "#4169E1",
    description: "中国是瓷器的故乡。陶瓷技术传到朝鲜半岛后发展出高丽青瓷，伽倻的陶器技术又东传日本形成须惠器。",
    significance: "陶瓷是古代东亚贸易的重要商品，推动了海上贸易网络的发展，每个国家都发展出了独特的陶瓷风格。",
    dynasties: ["汉朝", "唐朝", "伽倻", "高丽", "飞鸟时代"],
    timeline: [
      { place: "中国", year: "汉-唐", desc: "青瓷、白瓷、唐三彩相继问世" },
      { place: "伽倻", year: "三国时期", desc: "伽倻独立发展出高温陶质土器" },
      { place: "日本", year: "5世纪", desc: "须惠器技术从朝鲜半岛传入" },
    ],
  },
  {
    id: "architecture", name: "建筑/都城", icon: "🏯", color: "#228B22",
    description: "唐长安城是当时世界上最大的城市，棋盘式格局影响了整个东亚。百济工匠受邀赴日，参与建造了法隆寺。",
    significance: "日本奈良和京都均受长安城规划影响，而法隆寺则融合了中国和百济的建筑技术，至今屹立不倒。",
    dynasties: ["隋唐", "高句丽", "百济", "飞鸟时代", "奈良时代"],
    timeline: [
      { place: "中国长安", year: "隋唐", desc: "棋盘格都城规划，中轴线对称布局" },
      { place: "百济", year: "5-7世纪", desc: "引入宫殿与寺庙建筑体系并加以发展" },
      { place: "日本", year: "7-8世纪", desc: "百济工匠赴日建造法隆寺；奈良仿长安建设" },
    ],
  },
  {
    id: "confucianism", name: "儒学", icon: "📜", color: "#9932CC",
    description: "儒学由孔子创立，强调仁义礼智信。儒学传入朝鲜半岛后与各国本土文化结合，再经百济学者传入日本。",
    significance: "儒学塑造了整个东亚的社会价值观、政治制度和教育体系，是东亚文明圈的精神支柱之一。",
    dynasties: ["春秋战国", "汉朝", "高句丽", "百济", "新罗", "古坟时代"],
    timeline: [
      { place: "中国", year: "前6世纪", desc: "孔子创立儒家学说" },
      { place: "朝鲜半岛", year: "汉朝", desc: "儒学随汉字和行政制度传入" },
      { place: "日本", year: "5世纪", desc: "百济学者王仁携《论语》传入日本" },
    ],
  },
  {
    id: "paper", name: "造纸/印刷", icon: "📄", color: "#FF8C00",
    description: "造纸术是中国四大发明之一。高句丽僧人昙征610年将造纸和制墨技术传入日本。朝鲜后来又发明了世界最早的金属活字印刷术。",
    significance: "造纸和印刷让知识传播变得容易，推动了东亚各国的文化繁荣和教育发展。",
    dynasties: ["东汉", "隋唐", "高句丽", "百济", "飞鸟时代"],
    timeline: [
      { place: "中国", year: "东汉", desc: "蔡伦改进造纸术；雕版印刷术发明" },
      { place: "朝鲜半岛", year: "4-7世纪", desc: "造纸术传入三国，各国大量抄写佛经" },
      { place: "日本", year: "610年", desc: "高句丽僧人昙征携造纸制墨技术入日" },
    ],
  },
];

// ─── Kingdom Data — Equal "文明亮点" Structure ──────────────────────────────

interface KingdomData {
  id: string;
  name: string;
  badge: string;
  period: string;
  color: string;
  glowColor: string;
  emblem: string;
  emojiIcon: string;
  mapX: number;
  mapY: number;
  mapW: number;
  mapH: number;
  highlights: { name: string; desc: string }[];
  uniqueAchievement: string;
  received: { from: string; items: string[] }[];
  passed: { to: string; items: string[] }[];
}

const KINGDOMS: KingdomData[] = [
  {
    id: "china",
    name: "中国",
    badge: "万流之源",
    period: "夏朝—唐朝（约前2070年—907年）",
    color: "#8B1A1A",
    glowColor: "rgba(139,26,26,0.4)",
    emblem: "🐉",
    emojiIcon: "龙",
    mapX: 60, mapY: 100, mapW: 280, mapH: 300,
    highlights: [
      { name: "四大发明", desc: "造纸术、印刷术、火药、指南针——深刻改变了世界文明的进程" },
      { name: "儒学与佛教", desc: "儒家思想塑造了东亚的社会秩序，汉传佛教则影响了整个东亚的精神世界" },
      { name: "长安——世界之都", desc: "唐朝长安城是当时世界上最大、最国际化的城市，人口超过百万" },
      { name: "汉字文化圈", desc: "创造了深刻影响整个东亚的文字系统，至今仍是连接东亚各国的文化纽带" },
    ],
    uniqueAchievement: "创造了深刻影响整个东亚的文字系统和哲学体系，为东亚文明共同体奠定了基础",
    received: [{ from: "古印度", items: ["佛教"] }],
    passed: [
      { to: "高句丽", items: ["佛教", "汉字", "儒学", "建筑", "造纸"] },
      { to: "百济", items: ["佛教", "汉字", "儒学", "陶瓷"] },
      { to: "新罗", items: ["汉字", "儒学", "律令制度"] },
    ],
  },
  {
    id: "goguryeo",
    name: "高句丽",
    badge: "北方的勇士之国",
    period: "前37年—668年（705年历史）",
    color: "#2D5016",
    glowColor: "rgba(45,80,22,0.5)",
    emblem: "☀",
    emojiIcon: "三足金乌",
    mapX: 330, mapY: 60, mapW: 130, mapH: 160,
    highlights: [
      { name: "壁画艺术", desc: "高句丽古墓壁画展现了丰富的生活场景——狩猎、舞蹈、武士、四神(青龙、白虎、朱雀、玄武)，艺术风格独树一帜" },
      { name: "山城建筑", desc: "依山而建的军事要塞体系，巧妙利用自然地形，是古代东亚军事工程的杰作" },
      { name: "铠马武士", desc: "人马皆披重甲的骑兵，是东亚重装骑兵的先驱之一，战斗力令人敬畏" },
      { name: "高句丽乐舞", desc: "高句丽音乐在隋唐宫廷中备受欢迎，被列入唐代宫廷'十部乐'之一，是文化交融的美好见证" },
    ],
    uniqueAchievement: "将北方游牧文化与中原农耕文化完美融合，创造了独特的东北亚文明",
    received: [{ from: "中国", items: ["佛教（372年）", "汉字", "儒学"] }],
    passed: [
      { to: "日本", items: ["壁画艺术", "造纸术（僧人昙征）"] },
      { to: "隋唐宫廷", items: ["高句丽乐舞（十部乐之一）"] },
    ],
  },
  {
    id: "baekje",
    name: "百济",
    badge: "海上的文化使者",
    period: "前18年—660年（678年历史）",
    color: "#1A3A6E",
    glowColor: "rgba(26,58,110,0.5)",
    emblem: "🏺",
    emojiIcon: "金铜香炉",
    mapX: 360, mapY: 280, mapW: 95, mapH: 110,
    highlights: [
      { name: "百济微笑", desc: "百济佛像上温柔宁静的微笑，体现了独特的审美风格，影响了日本早期佛教艺术" },
      { name: "百济金铜大香炉", desc: "融合了佛教、道教和本土信仰的艺术杰作，工艺精湛，是东亚青铜器艺术的巅峰之一" },
      { name: "海洋贸易", desc: "百济拥有先进的航海技术，建立了连接中国、朝鲜半岛、日本的海上贸易网络" },
      { name: "建筑与工艺", desc: "百济工匠技艺精湛，受邀参与了日本早期寺庙建设，法隆寺至今屹立不倒" },
    ],
    uniqueAchievement: "作为东亚海上文化交流的关键枢纽，促进了中日之间的文化传播",
    received: [
      { from: "中国", items: ["佛教（384年）", "汉字", "儒学"] },
    ],
    passed: [
      { to: "日本", items: ["佛教", "汉字（王仁传《论语》）", "建筑技术", "工艺美术"] },
    ],
  },
  {
    id: "silla",
    name: "新罗",
    badge: "黄金与星辰的国度",
    period: "前57年—935年（992年历史）",
    color: "#6B2FA0",
    glowColor: "rgba(107,47,160,0.5)",
    emblem: "👑",
    emojiIcon: "金冠",
    mapX: 430, mapY: 340, mapW: 80, mapH: 90,
    highlights: [
      { name: "新罗金冠", desc: "造型独特的金冠，以树枝和鹿角为装饰，是东亚独一无二的艺术珍品，体现了草原文化与本土信仰的融合" },
      { name: "瞻星台", desc: "建于公元633年前后的天文观测台，是东亚现存最古老的天文建筑之一" },
      { name: "花郎道", desc: "培养年轻人文武兼修的教育制度——既练武艺，也学诗歌和佛学，体现了'文武合一'的理想" },
      { name: "佛国寺与石窟庵", desc: "精美的佛教建筑与石雕艺术，是新罗人对佛教文化独特诠释的结晶" },
    ],
    uniqueAchievement: "发展出将武士精神与学术修养相结合的独特教育传统",
    received: [
      { from: "中国（唐）", items: ["律令制度", "汉字", "儒学"] },
      { from: "高句丽", items: ["佛教"] },
    ],
    passed: [
      { to: "高丽/朝鲜", items: ["三国文化融合成果", "佛教传统"] },
    ],
  },
  {
    id: "gaya",
    name: "伽倻",
    badge: "铁与琴弦的国度",
    period: "42年—562年（520年历史）",
    color: "#8B4513",
    glowColor: "rgba(139,69,19,0.5)",
    emblem: "⚔",
    emojiIcon: "剑与琴",
    mapX: 430, mapY: 290, mapW: 55, mapH: 55,
    highlights: [
      { name: "铁器生产", desc: "伽倻是当时东亚重要的铁器生产中心，优质铁器远销各地，连中国乐浪郡都进口伽倻铁" },
      { name: "伽倻琴", desc: "十二弦的伽倻琴，音色优美，是延续至今的传统乐器瑰宝" },
      { name: "贸易网络", desc: "虽然国土不大，但通过铁器贸易与东亚各国建立了广泛联系" },
    ],
    uniqueAchievement: "证明了一个文明的伟大不在于疆域大小，而在于创造力",
    received: [{ from: "中国/乐浪", items: ["金属铸造技术"] }],
    passed: [{ to: "日本", items: ["铁器", "须惠器陶瓷技术", "伽倻琴音乐"] }],
  },
  {
    id: "balhae",
    name: "渤海",
    badge: "海东盛国",
    period: "698年—926年（228年历史）",
    color: "#1E6E6E",
    glowColor: "rgba(30,110,110,0.5)",
    emblem: "🌊",
    emojiIcon: "海浪",
    mapX: 330, mapY: 30, mapW: 130, mapH: 70,
    highlights: [
      { name: "融合文明", desc: "融合了多元文化传统，创造了繁荣的多民族国家，被誉为'海东盛国'" },
      { name: "五京制度", desc: "仿效唐朝建立五京制度，体现了对先进制度的学习与本土化" },
      { name: "国际外交", desc: "同时与唐朝和日本保持活跃的外交和贸易往来" },
    ],
    uniqueAchievement: "展现了不同文化传统如何融合共生，创造新的文明形态",
    received: [
      { from: "唐朝", items: ["政治制度", "汉字文化"] },
      { from: "高句丽遗产", items: ["建筑传统", "艺术风格"] },
    ],
    passed: [{ to: "日本", items: ["外交使节", "文化交流"] }],
  },
  {
    id: "japan",
    name: "日本",
    badge: "东方的学习者与创新者",
    period: "弥生时代—奈良时代（约前3世纪—794年）",
    color: "#8B2252",
    glowColor: "rgba(139,34,82,0.4)",
    emblem: "🌸",
    emojiIcon: "樱花",
    mapX: 580, mapY: 150, mapW: 120, mapH: 220,
    highlights: [
      { name: "文化吸收与创新", desc: "从大陆和半岛吸收了文字、佛教、建筑技术等，并发展出独特的日本文化" },
      { name: "假名文字", desc: "在汉字基础上创造了平假名和片假名，发展出独立的书写系统" },
      { name: "奈良与京都", desc: "受长安城规划影响而建，但逐渐发展出独特的日本建筑风格" },
      { name: "武士道萌芽", desc: "在学习大陆军事文化的基础上，逐渐形成独特的武士文化" },
    ],
    uniqueAchievement: "展现了如何在学习他人的基础上创造出全新的文明形态",
    received: [
      { from: "百济", items: ["佛教", "汉字（王仁）", "建筑技术"] },
      { from: "高句丽", items: ["造纸术（昙征）"] },
      { from: "伽倻", items: ["铁器", "须惠器技术"] },
      { from: "唐朝", items: ["律令制度", "都城规划"] },
    ],
    passed: [],
  },
];

// ─── "你知道吗" Fun Facts ────────────────────────────────────────────────────

const FUN_FACTS = [
  {
    emoji: "🎵",
    text: "高句丽的音乐曾在长安城的皇宫里演奏，唐朝皇帝非常喜欢！高句丽乐是唐代'十部乐'之一——音乐是不分国界的！",
    color: "#2D5016",
  },
  {
    emoji: "📚",
    text: "百济的学者王仁带着《论语》和《千字文》东渡日本，帮助日本人学习汉字。中国的文化通过朝鲜半岛传到了日本——这是三国合作的结晶！",
    color: "#1A3A6E",
  },
  {
    emoji: "🔭",
    text: "新罗的瞻星台建于公元633年，比欧洲最早的天文台早了将近一千年！东亚人仰望星空的历史比你想象的更久远。",
    color: "#6B2FA0",
  },
  {
    emoji: "⚒",
    text: "伽倻出产的铁器质量极高，是当时东亚的'钢铁中心'，连中国的乐浪郡都进口伽倻的铁！小国也能有大本领。",
    color: "#8B4513",
  },
  {
    emoji: "🏯",
    text: "日本奈良的法隆寺是世界上现存最古老的木造建筑之一，它的建造融合了来自中国和百济的建筑技术——东亚合作的杰作！",
    color: "#8B2252",
  },
  {
    emoji: "🌍",
    text: "唐朝长安城是当时世界上最国际化的城市，街上能看到来自高句丽、新罗、百济、日本、波斯、阿拉伯等各国的人！",
    color: "#8B1A1A",
  },
  {
    emoji: "🥢",
    text: "东亚各国的筷子各不相同——中国用长圆筷，韩国用金属扁筷，日本用短尖筷——同一种餐具，三种不同的创新！",
    color: "#D4AF37",
  },
];

// ─── SVG Flow Paths ──────────────────────────────────────────────────────────

const FLOW_PATHS: Record<string, { d: string; delay: number }[]> = {
  buddhism: [
    { d: "M 340 140 C 360 130, 370 110, 395 100", delay: 0 },
    { d: "M 395 200 C 400 230, 390 255, 408 280", delay: 0.8 },
    { d: "M 408 330 C 430 350, 440 350, 470 355", delay: 1.6 },
    { d: "M 430 315 C 510 300, 560 250, 600 230", delay: 2.4 },
  ],
  characters: [
    { d: "M 340 200 C 360 180, 380 170, 395 160", delay: 0 },
    { d: "M 340 220 C 360 270, 380 290, 408 310", delay: 0.3 },
    { d: "M 440 320 C 510 310, 565 280, 600 260", delay: 1 },
  ],
  pottery: [
    { d: "M 340 240 C 360 260, 380 280, 408 290", delay: 0 },
    { d: "M 460 300 C 510 295, 555 280, 590 265", delay: 0.8 },
  ],
  architecture: [
    { d: "M 340 180 C 350 160, 368 150, 395 140", delay: 0 },
    { d: "M 340 230 C 360 275, 385 290, 408 295", delay: 0.3 },
    { d: "M 440 335 C 510 320, 560 290, 595 270", delay: 1 },
  ],
  confucianism: [
    { d: "M 340 250 C 360 230, 380 210, 395 190", delay: 0 },
    { d: "M 340 255 C 360 280, 385 295, 408 305", delay: 0.3 },
    { d: "M 445 320 C 510 305, 560 285, 595 275", delay: 1 },
  ],
  paper: [
    { d: "M 340 200 C 355 175, 372 158, 395 148", delay: 0 },
    { d: "M 395 170 C 490 180, 550 215, 598 232", delay: 0.9 },
  ],
};

// ─── SVG Game Map ────────────────────────────────────────────────────────────

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
    <svg viewBox="0 0 780 580" className="w-full h-full" style={{ fontFamily: "'Noto Serif SC', serif" }}>
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="hsl(38,55%,90%)" />
          <stop offset="60%" stopColor="hsl(35,50%,84%)" />
          <stop offset="100%" stopColor="hsl(28,45%,74%)" />
        </radialGradient>
        <linearGradient id="seaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(210,60%,70%)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(200,55%,60%)" stopOpacity="0.4" />
        </linearGradient>
        {KINGDOMS.map((k) => (
          <radialGradient key={`grad-${k.id}`} id={`grad-${k.id}`} cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor={k.color} stopOpacity="0.55" />
            <stop offset="100%" stopColor={k.color} stopOpacity="0.25" />
          </radialGradient>
        ))}
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glowStrong" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {FLOWS.map((f) => (
          <marker key={`arrow-${f.id}`} id={`arrow-${f.id}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={f.color} opacity="0.9" />
          </marker>
        ))}
        <pattern id="waves" x="0" y="0" width="30" height="15" patternUnits="userSpaceOnUse">
          <path d="M0,8 Q7.5,2 15,8 Q22.5,14 30,8" fill="none" stroke="hsl(210,60%,60%)" strokeWidth="0.8" opacity="0.5" />
        </pattern>
        <pattern id="gridTex" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="0.8" fill="hsl(30,30%,60%)" opacity="0.25" />
        </pattern>
      </defs>

      {/* Background */}
      <rect width="780" height="580" fill="url(#bgGrad)" />
      <rect width="780" height="580" fill="url(#gridTex)" />

      {/* Sea */}
      <path d="M480 100 Q530 80 600 120 L700 200 Q740 300 720 440 L680 520 Q620 560 570 540 Q520 520 500 460 Q480 400 490 340 Q500 280 480 220 Q460 160 480 100Z" fill="url(#seaGrad)" />
      <path d="M480 100 Q530 80 600 120 L700 200 Q740 300 720 440 L680 520 Q620 560 570 540 Q520 520 500 460 Q480 400 490 340 Q500 280 480 220 Q460 160 480 100Z" fill="url(#waves)" opacity="0.6" />
      <path d="M530 80 L580 60 L700 100 L750 180 L730 350 L700 420 L660 440 Q640 380 650 300 Q660 220 640 160 Q620 100 530 80Z" fill="url(#seaGrad)" opacity="0.6" />

      {/* Mountains — China */}
      {[[100,120],[130,90],[160,110],[80,200],[120,180],[200,150],[220,130],[260,100],[280,80]].map(([x,y],i) => (
        <g key={`mtn-${i}`} opacity="0.45">
          <polygon points={`${x},${y} ${x-12},${y+22} ${x+12},${y+22}`} fill="hsl(28,40%,42%)" />
          <polygon points={`${x},${y} ${x-6},${y+10} ${x+6},${y+10}`} fill="white" opacity="0.5" />
        </g>
      ))}
      {/* Mountains — Korea */}
      {[[390,90],[410,70],[430,85],[380,170],[400,155]].map(([x,y],i) => (
        <g key={`kmtn-${i}`} opacity="0.4">
          <polygon points={`${x},${y} ${x-9},${y+17} ${x+9},${y+17}`} fill="hsl(100,30%,35%)" />
        </g>
      ))}

      {/* Rivers */}
      <path d="M 80 200 Q 120 180 170 200 Q 220 220 260 210 Q 310 195 340 210" fill="none" stroke="hsl(210,70%,65%)" strokeWidth="2.5" opacity="0.7" strokeLinecap="round" />
      <text x="160" y="195" fontSize="9" fill="hsl(210,60%,45%)" opacity="0.8" textAnchor="middle">黄河</text>
      <path d="M 80 310 Q 130 300 190 310 Q 250 320 300 310 Q 330 305 345 315" fill="none" stroke="hsl(210,70%,65%)" strokeWidth="2.5" opacity="0.7" strokeLinecap="round" />
      <text x="200" y="330" fontSize="9" fill="hsl(210,60%,45%)" opacity="0.8" textAnchor="middle">长江</text>
      <path d="M 340 140 Q 365 155 390 148 Q 410 142 440 155" fill="none" stroke="hsl(210,70%,65%)" strokeWidth="1.8" opacity="0.6" strokeLinecap="round" />
      <text x="390" y="145" fontSize="8" fill="hsl(210,60%,45%)" opacity="0.75" textAnchor="middle">鸭绿江</text>

      {/* Kingdom Territories */}
      {KINGDOMS.map((k) => {
        const isActive = activeKingdom === k.id;
        return (
          <g key={k.id} onClick={() => onKingdomClick(k.id)} style={{ cursor: "pointer" }}>
            <motion.rect
              x={k.mapX} y={k.mapY} width={k.mapW} height={k.mapH}
              rx={k.id === "japan" ? 40 : k.id === "china" ? 20 : 15}
              ry={k.id === "japan" ? 50 : k.id === "china" ? 20 : 15}
              fill={`url(#grad-${k.id})`}
              stroke={k.color}
              strokeWidth={isActive ? 3.5 : 1.8}
              filter={isActive ? "url(#glowStrong)" : undefined}
              animate={{ strokeWidth: isActive ? 3.5 : 1.8, opacity: isActive ? 1 : 0.85 }}
              transition={{ duration: 0.25 }}
            />
            <text
              x={k.mapX + k.mapW / 2} y={k.mapY + k.mapH / 2 - (k.mapH > 100 ? 18 : 10)}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={k.mapH > 100 ? 28 : k.mapH > 60 ? 20 : 16}
              style={{ userSelect: "none", pointerEvents: "none" }}
            >{k.emblem}</text>
            <text
              x={k.mapX + k.mapW / 2}
              y={k.mapY + k.mapH / 2 + (k.mapH > 100 ? 12 : 8)}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={k.id === "china" || k.id === "japan" ? 16 : k.mapH > 80 ? 13 : 11}
              fontWeight="bold"
              fill={isActive ? "#FFFFFF" : "hsl(20,30%,10%)"}
              filter={isActive ? "url(#glow)" : undefined}
              style={{ userSelect: "none", pointerEvents: "none" }}
            >{k.name}</text>
            {k.mapH > 100 && (
              <text
                x={k.mapX + k.mapW / 2} y={k.mapY + k.mapH / 2 + 28}
                textAnchor="middle" dominantBaseline="middle" fontSize={9}
                fill="hsl(20,20%,30%)" opacity="0.75"
                style={{ userSelect: "none", pointerEvents: "none" }}
              >{k.badge}</text>
            )}
          </g>
        );
      })}

      {/* Capital Cities */}
      {[
        { x: 200, y: 250, name: "长安", c: "#8B1A1A" },
        { x: 390, y: 100, name: "平壤", c: "#2D5016" },
        { x: 408, y: 310, name: "熊津", c: "#1A3A6E" },
        { x: 455, y: 368, name: "金城", c: "#6B2FA0" },
        { x: 445, y: 308, name: "金官城", c: "#8B4513" },
      ].map((city) => (
        <g key={city.name}>
          <circle cx={city.x} cy={city.y} r={5} fill={city.c} opacity={0.9} />
          <circle cx={city.x} cy={city.y} r={8} fill="none" stroke={city.c} strokeWidth={1.2} opacity={0.5} />
          <text x={city.x + 10} y={city.y + 4} fontSize={9} fill={city.c} fontWeight="bold" style={{ userSelect: "none" }}>★{city.name}</text>
        </g>
      ))}

      {/* Culture Flow Arrows */}
      {FLOWS.map((flow) => {
        if (!visibleFlows.has(flow.id)) return null;
        return (
          <g key={flow.id}>
            {(FLOW_PATHS[flow.id] || []).map((p, i) => (
              <motion.path
                key={`${flow.id}-p${i}`} d={p.d} fill="none" stroke={flow.color}
                strokeWidth={3.5} strokeLinecap="round" strokeDasharray="8 4"
                markerEnd={`url(#arrow-${flow.id})`} filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{ pathLength: { duration: 1.2, delay: p.delay, ease: "easeInOut" }, opacity: { duration: 0.3, delay: p.delay } }}
              />
            ))}
          </g>
        );
      })}

      {/* Compass */}
      <g transform="translate(740, 520)">
        <circle r="22" fill="hsl(38,55%,88%)" stroke="hsl(35,30%,60%)" strokeWidth="1.2" />
        <text textAnchor="middle" y="-8" fontSize="9" fill="hsl(20,30%,20%)" fontWeight="bold">北</text>
        <text textAnchor="middle" y="14" fontSize="9" fill="hsl(20,30%,20%)">南</text>
        <text textAnchor="start" x="8" y="4" fontSize="9" fill="hsl(20,30%,20%)">东</text>
        <text textAnchor="end" x="-8" y="4" fontSize="9" fill="hsl(20,30%,20%)">西</text>
        <line x1="0" y1="-18" x2="0" y2="18" stroke="hsl(20,30%,40%)" strokeWidth="1" />
        <line x1="-18" y1="0" x2="18" y2="0" stroke="hsl(20,30%,40%)" strokeWidth="1" />
      </g>

      {/* Title */}
      <g>
        <rect x="10" y="12" width="340" height="38" rx="6" fill="hsl(5,75%,38%)" opacity="0.92" />
        <text x="20" y="26" fontSize="11" fill="hsl(38,55%,92%)" opacity="0.85">
          东亚文明之光 · 每个文明都有独特的光芒
        </text>
        <text x="20" y="42" fontSize="13" fontWeight="bold" fill="hsl(38,55%,95%)">
          点击王国查看文明亮点 · 图例切换传播路线
        </text>
      </g>
    </svg>
  );
}

// ─── Kingdom "文明亮点" Panel ─────────────────────────────────────────────────

function CivilizationPanel({ kingdom, onClose }: { kingdom: KingdomData; onClose: () => void }) {
  const [tab, setTab] = useState<"highlights" | "exchange">("highlights");

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 220 }}
      className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[420px] bg-card border-l-2 shadow-2xl overflow-y-auto flex flex-col"
      style={{ borderColor: kingdom.color }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 p-5"
        style={{ background: `linear-gradient(135deg, ${kingdom.color}ee, ${kingdom.color}88)` }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{kingdom.emblem}</span>
              <div>
                <p className="text-xs font-bold text-white/80 tracking-widest">{kingdom.badge}</p>
                <h2 className="text-2xl font-serif-sc font-black text-white leading-tight">{kingdom.name}</h2>
              </div>
            </div>
            <p className="text-xs text-white/75 mt-1.5 ml-[52px]">📅 {kingdom.period}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-3">
          {(["highlights", "exchange"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                tab === t ? "bg-white/30 text-white" : "bg-white/10 text-white/60 hover:bg-white/20"
              }`}
            >
              {t === "highlights" ? "✨ 文明亮点" : "🔄 文化交流"}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4 flex-1">
        <AnimatePresence mode="wait">
          {tab === "highlights" && (
            <motion.div key="hl" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
              {/* Highlights */}
              <div className="space-y-2.5">
                {kingdom.highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="p-3 rounded-xl border"
                    style={{ borderColor: `${kingdom.color}44`, background: `${kingdom.color}12` }}
                  >
                    <p className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" style={{ color: kingdom.color }} />
                      {h.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed pl-5">{h.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Unique achievement */}
              <div className="p-4 rounded-xl border-l-4" style={{ borderColor: kingdom.color, background: `${kingdom.color}15` }}>
                <p className="text-xs font-bold text-muted-foreground mb-1">🌟 独特贡献</p>
                <p className="text-sm text-foreground leading-relaxed">{kingdom.uniqueAchievement}</p>
              </div>
            </motion.div>
          )}

          {tab === "exchange" && (
            <motion.div key="ex" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
              {kingdom.received.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">📥 学习与吸收</h3>
                  {kingdom.received.map((r, i) => (
                    <div key={i} className="bg-secondary/60 rounded-lg p-3 border border-border">
                      <p className="text-xs text-muted-foreground mb-1.5">来自 <strong>{r.from}</strong>：</p>
                      <div className="flex flex-wrap gap-1">
                        {r.items.map((item) => (
                          <span key={item} className="text-xs px-2 py-0.5 rounded-full border"
                            style={{ borderColor: `${kingdom.color}88`, color: kingdom.color, background: `${kingdom.color}15` }}
                          >{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {kingdom.passed.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">📤 传播与贡献</h3>
                  {kingdom.passed.map((p, i) => (
                    <div key={i} className="rounded-lg p-3 border" style={{ borderColor: `${kingdom.color}55`, background: `${kingdom.color}12` }}>
                      <p className="text-xs text-muted-foreground mb-1.5">传给 <strong>{p.to}</strong>：</p>
                      <div className="flex flex-wrap gap-1">
                        {p.items.map((item) => (
                          <span key={item} className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: kingdom.color, color: "#fff" }}>{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {kingdom.passed.length === 0 && (
                <div className="text-center p-6 text-muted-foreground text-sm">
                  <p>日本将接收到的文化进行了深度本土化改造，</p>
                  <p>发展出了独特的日本文化传统——这也是一种伟大的创造力！</p>
                </div>
              )}

              {/* Shared message */}
              <div className="bg-accent/15 border border-accent/30 rounded-xl p-3 text-center">
                <p className="text-xs text-foreground leading-relaxed">
                  ✨ 东亚各文明互相学习、互相影响，共同创造了灿烂的东亚文化
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Flow Detail Popup ───────────────────────────────────────────────────────

function FlowPopup({ flow, onClose }: { flow: CultureFlow; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 20 }}
      className="fixed inset-x-4 bottom-24 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-auto sm:w-[480px] max-h-[72vh] overflow-y-auto bg-card border-2 rounded-2xl shadow-2xl"
      style={{ borderColor: flow.color }}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 rounded-t-2xl"
        style={{ background: `linear-gradient(135deg, ${flow.color}ee, ${flow.color}99)` }}>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{flow.icon}</span>
          <h3 className="text-xl font-serif-sc font-black text-white">{flow.name}</h3>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white"><X className="w-5 h-5" /></button>
      </div>
      <div className="p-4 space-y-4">
        <p className="text-sm text-foreground leading-relaxed">{flow.description}</p>
        <div>
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">📅 传播时间线</h4>
          <div className="relative pl-4">
            <div className="absolute left-1.5 top-2 bottom-2 w-0.5 rounded-full" style={{ background: `${flow.color}55` }} />
            {flow.timeline.map((r, i) => (
              <div key={i} className="flex items-start gap-3 mb-3 relative">
                <div className="w-3 h-3 rounded-full mt-1 shrink-0 absolute -left-[18px]" style={{ backgroundColor: flow.color }} />
                <div className="flex-1 pl-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-foreground">{r.place}</span>
                    {r.year && <span className="text-xs px-2 py-0.5 rounded-full text-white font-medium" style={{ background: flow.color }}>{r.year}</span>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl p-3 border" style={{ borderColor: `${flow.color}55`, background: `${flow.color}12` }}>
          <h4 className="text-xs font-bold mb-1" style={{ color: flow.color }}>💡 历史意义</h4>
          <p className="text-sm text-foreground leading-relaxed">{flow.significance}</p>
        </div>
        <div>
          <h4 className="text-xs font-bold text-muted-foreground mb-2">🏛 相关朝代/时期</h4>
          <div className="flex flex-wrap gap-1.5">
            {flow.dynasties.map((d) => (
              <span key={d} className="text-xs px-2 py-1 rounded-full border" style={{ borderColor: `${flow.color}88`, color: flow.color }}>{d}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Legend & Controls ────────────────────────────────────────────────────────

function Controls({ visibleFlows, onToggle, onPlayAll, isPlaying, onFlowClick }: {
  visibleFlows: Set<string>; onToggle: (id: string) => void; onPlayAll: () => void; isPlaying: boolean; onFlowClick: (f: CultureFlow) => void;
}) {
  return (
    <div className="bg-card/95 backdrop-blur-sm border border-border rounded-2xl p-4 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-serif-sc font-bold text-foreground">📡 文化传播图例</h3>
        <Button size="sm" onClick={onPlayAll} disabled={isPlaying} className="h-8 px-3 text-xs font-sans-sc">
          <Play className="w-3 h-3 mr-1" />
          {isPlaying ? "播放中..." : "播放全部"}
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {FLOWS.map((flow) => {
          const vis = visibleFlows.has(flow.id);
          return (
            <div key={flow.id} className="flex items-center gap-1">
              <button onClick={() => onToggle(flow.id)} className={`p-1 rounded transition-all ${vis ? "opacity-100" : "opacity-40"}`}>
                {vis ? <Eye className="w-3.5 h-3.5 text-muted-foreground" /> : <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />}
              </button>
              <button
                onClick={() => onFlowClick(flow)}
                className={`flex-1 flex items-center gap-1.5 px-2 py-1.5 rounded-lg border transition-all text-left hover:scale-[1.02] ${vis ? "bg-card" : "opacity-50 bg-secondary/30"}`}
                style={{ borderColor: vis ? flow.color : "transparent" }}
              >
                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: flow.color }} />
                <span className="text-xs font-sans-sc font-medium text-foreground truncate">{flow.name}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Fun Facts Carousel ──────────────────────────────────────────────────────

function FunFactsCarousel() {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const next = useCallback(() => setIdx((i) => (i + 1) % FUN_FACTS.length), []);
  const prev = useCallback(() => setIdx((i) => (i - 1 + FUN_FACTS.length) % FUN_FACTS.length), []);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  // Reset timer on manual nav
  const go = (dir: "next" | "prev") => {
    clearInterval(timerRef.current);
    dir === "next" ? next() : prev();
    timerRef.current = setInterval(next, 5000);
  };

  const fact = FUN_FACTS[idx];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-border" />
        <h2 className="text-sm font-serif-sc font-black text-foreground whitespace-nowrap px-2">
          💡 你知道吗？
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="p-5 rounded-2xl border-2 min-h-[120px] flex items-center gap-4"
            style={{ borderColor: `${fact.color}66`, background: `${fact.color}12` }}
          >
            <span className="text-4xl shrink-0">{fact.emoji}</span>
            <p className="text-sm text-foreground leading-relaxed flex-1">{fact.text}</p>
          </motion.div>
        </AnimatePresence>

        {/* Nav buttons */}
        <button
          onClick={() => go("prev")}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-card/80 border border-border shadow hover:bg-card transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-foreground" />
        </button>
        <button
          onClick={() => go("next")}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-card/80 border border-border shadow hover:bg-card transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5">
        {FUN_FACTS.map((_, i) => (
          <button
            key={i}
            onClick={() => { clearInterval(timerRef.current); setIdx(i); timerRef.current = setInterval(next, 5000); }}
            className={`w-2 h-2 rounded-full transition-all ${i === idx ? "bg-primary scale-125" : "bg-border"}`}
          />
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

  const handleKingdomClick = useCallback((id: string) => { setActiveKingdom(id); setSelectedFlow(null); }, []);

  const handleToggleFlow = useCallback((id: string) => {
    setVisibleFlows((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }, []);

  const handlePlayAll = useCallback(async () => {
    setIsPlaying(true); setVisibleFlows(new Set()); setSelectedFlow(null); setActiveKingdom(null);
    for (const id of ["buddhism", "characters", "confucianism", "architecture", "pottery", "paper"]) {
      setVisibleFlows((prev) => new Set([...prev, id]));
      await new Promise((r) => setTimeout(r, 2500));
    }
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setActiveKingdom(null); setSelectedFlow(null); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const selectedKingdom = KINGDOMS.find((k) => k.id === activeKingdom);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 pattern-chinese opacity-30" />
        <div className="relative text-center py-6 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-2">
            <Star className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-bold text-primary">东亚文明共同体</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-sc font-black text-primary leading-tight">
            东亚文明之光
          </h1>
          <p className="mt-1.5 text-muted-foreground font-sans-sc text-sm max-w-xl mx-auto">
            每个文明都有独特的光芒，它们彼此照亮 ✨
          </p>
        </div>
      </div>

      {/* Map */}
      <div className="max-w-5xl mx-auto px-2 sm:px-4 pt-4">
        <div className="rounded-2xl overflow-hidden shadow-2xl border-2" style={{ borderColor: "hsl(42,80%,50%)", background: "hsl(38,55%,92%)" }}>
          <div style={{ aspectRatio: "780/580" }}>
            <GameMap activeKingdom={activeKingdom} onKingdomClick={handleKingdomClick} visibleFlows={visibleFlows} />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-5xl mx-auto px-2 sm:px-4 pt-4">
        <Controls visibleFlows={visibleFlows} onToggle={handleToggleFlow} onPlayAll={handlePlayAll} isPlaying={isPlaying} onFlowClick={(f) => { setSelectedFlow(f); setActiveKingdom(null); }} />
      </div>

      {/* Fun Facts Carousel */}
      <div className="max-w-5xl mx-auto px-2 sm:px-4 pt-6">
        <FunFactsCarousel />
      </div>

      {/* Shared heritage message */}
      <div className="max-w-5xl mx-auto px-2 sm:px-4 pt-6 pb-8">
        <div className="text-center bg-card border border-border rounded-2xl p-6">
          <p className="text-lg font-serif-sc font-bold text-foreground">
            🌏 这些伟大的文明互相学习、互相影响，<br />共同创造了灿烂的东亚文化
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            东亚文明之光 — 东亚人民共同的历史遗产
          </p>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedFlow && (
          <>
            <motion.div key="fo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm" onClick={() => setSelectedFlow(null)} />
            <FlowPopup flow={selectedFlow} onClose={() => setSelectedFlow(null)} />
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedKingdom && (
          <>
            <motion.div key="ko" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm" onClick={() => setActiveKingdom(null)} />
            <CivilizationPanel kingdom={selectedKingdom} onClose={() => setActiveKingdom(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
