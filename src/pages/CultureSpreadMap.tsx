import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Eye, EyeOff, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

// Cultural flow data
interface CultureFlow {
  id: string;
  name: string;
  icon: string;
  color: string;
  tailwindColor: string;
  route: { place: string; year?: string; desc: string }[];
  description: string;
  significance: string;
  dynasties: string[];
}

const cultureFlows: CultureFlow[] = [
  {
    id: "buddhism",
    name: "佛教",
    icon: "☸️",
    color: "#D4AF37",
    tailwindColor: "bg-yellow-500",
    route: [
      { place: "中国", year: "东汉/隋唐", desc: "佛教经丝绸之路传入中国" },
      { place: "高句丽", year: "372年", desc: "前秦僧人顺道传入" },
      { place: "百济", year: "384年", desc: "东晋僧人摩罗难陀传入" },
      { place: "新罗", year: "528年", desc: "高句丽僧人墨胡子传入" },
      { place: "日本", year: "552年", desc: "百济圣王献佛像与经典" },
    ],
    description: "佛教从古印度传入中国后，经过本土化发展，形成了独特的汉传佛教。随后通过朝鲜半岛各国，最终传入日本，对东亚文化产生了深远影响。",
    significance: "佛教不仅带来了宗教信仰，还带来了建筑技术（寺庙）、雕塑艺术、绘画风格等，深刻影响了东亚的艺术和哲学。",
    dynasties: ["东汉", "魏晋南北朝", "隋唐", "高句丽", "百济", "新罗", "飞鸟时代"],
  },
  {
    id: "characters",
    name: "汉字",
    icon: "字",
    color: "#C41E3A",
    tailwindColor: "bg-red-600",
    route: [
      { place: "中国", year: "商朝起", desc: "甲骨文到隶书楷书的演变" },
      { place: "朝鲜半岛", year: "前2世纪", desc: "汉四郡时期汉字传入" },
      { place: "日本", year: "4-5世纪", desc: "经朝鲜半岛传入日本" },
    ],
    description: "汉字是世界上最古老的文字之一，从商朝甲骨文发展而来。它不仅是中国的书写系统，也成为整个东亚文化圈共同的文字载体。",
    significance: "汉字使东亚各国能够阅读同样的经典著作，促进了文化交流。朝鲜后来发明了谚文，日本创造了假名，但汉字仍被广泛使用。",
    dynasties: ["商朝", "周朝", "秦汉", "高句丽", "百济", "新罗", "古坟时代"],
  },
  {
    id: "pottery",
    name: "陶瓷",
    icon: "🏺",
    color: "#4169E1",
    tailwindColor: "bg-blue-600",
    route: [
      { place: "中国", year: "新石器-唐宋", desc: "青瓷、白瓷、唐三彩" },
      { place: "朝鲜半岛", year: "三国时期", desc: "陶瓷技术传入，发展高丽青瓷" },
      { place: "日本", year: "5世纪起", desc: "须惠器传入，后发展有田烧" },
    ],
    description: "中国是瓷器的故乡，'China'一词就是瓷器的意思。中国的陶瓷技术传到朝鲜后，发展出独特的高丽青瓷；传到日本后，形成了各种和式陶瓷风格。",
    significance: "陶瓷不仅是日常用品，更是艺术品和贸易商品。它通过丝绸之路和海上贸易传遍世界，是古代中国的重要出口商品。",
    dynasties: ["商周", "汉朝", "唐朝", "宋朝", "高丽", "室町时代"],
  },
  {
    id: "architecture",
    name: "建筑/都城制度",
    icon: "🏯",
    color: "#228B22",
    tailwindColor: "bg-green-600",
    route: [
      { place: "中国", year: "周-唐", desc: "长安城的棋盘式布局" },
      { place: "高句丽/百济", year: "4-7世纪", desc: "宫殿和寺庙建筑引入" },
      { place: "日本", year: "7-8世纪", desc: "奈良、京都仿长安建造" },
    ],
    description: "中国的都城规划采用棋盘式格局，以长安城为代表。这种城市规划理念传到朝鲜半岛后，又影响了日本的奈良和京都的建设。",
    significance: "日本的奈良（平城京）和京都（平安京）都是按照唐朝长安城的格局规划的，东西对称、南北中轴线，体现了儒家礼制思想。",
    dynasties: ["周朝", "隋唐", "高句丽", "百济", "飞鸟时代", "奈良时代"],
  },
  {
    id: "confucianism",
    name: "儒学",
    icon: "📜",
    color: "#9932CC",
    tailwindColor: "bg-purple-600",
    route: [
      { place: "中国", year: "春秋战国", desc: "孔子创立儒家学说" },
      { place: "朝鲜半岛", year: "汉朝起", desc: "儒学随汉字传入" },
      { place: "日本", year: "5世纪", desc: "百济学者王仁传入《论语》" },
    ],
    description: "儒学由孔子创立，强调仁、义、礼、智、信等道德观念，以及君臣、父子、夫妇等社会关系。它成为东亚各国的主流思想。",
    significance: "儒学塑造了东亚社会的价值观，影响了政治制度（科举）、教育体系、家庭伦理等各个方面，至今仍有深远影响。",
    dynasties: ["春秋战国", "汉朝", "高句丽", "百济", "新罗", "古坟时代"],
  },
  {
    id: "paper",
    name: "造纸/印刷术",
    icon: "📄",
    color: "#FF8C00",
    tailwindColor: "bg-orange-500",
    route: [
      { place: "中国", year: "东汉/隋唐", desc: "蔡伦改进造纸，雕版印刷术" },
      { place: "朝鲜半岛", year: "4-7世纪", desc: "造纸术传入三国" },
      { place: "日本", year: "7世纪", desc: "造纸术随佛教传入" },
    ],
    description: "造纸术是中国四大发明之一，由东汉蔡伦改进。印刷术使书籍得以大量复制。这两项技术传播到朝鲜和日本后，极大促进了文化传播。",
    significance: "造纸和印刷术使知识传播变得容易，推动了教育普及和文化繁荣。韩国还发明了世界上最早的金属活字印刷。",
    dynasties: ["东汉", "隋唐", "高句丽", "百济", "新罗", "飞鸟时代"],
  },
];

// Kingdom/Country data
interface Kingdom {
  id: string;
  name: string;
  period: string;
  position: { x: number; y: number };
  size: { w: number; h: number };
  received: { from: string; items: string[] }[];
  passed: { to: string; items: string[] }[];
  fact: string;
  color: string;
}

const kingdoms: Kingdom[] = [
  {
    id: "china",
    name: "中国",
    period: "从夏朝至今（约前2070年—）",
    position: { x: 50, y: 180 },
    size: { w: 180, h: 200 },
    received: [{ from: "古印度", items: ["佛教"] }],
    passed: [
      { to: "高句丽", items: ["佛教", "汉字", "儒学", "建筑", "造纸术"] },
      { to: "百济", items: ["佛教", "汉字", "儒学", "陶瓷"] },
      { to: "新罗", items: ["汉字", "儒学"] },
    ],
    fact: "中国是东亚文化的发源地，汉字、造纸术、印刷术、指南针、火药等都是中国的伟大发明！",
    color: "rgba(196, 30, 58, 0.3)",
  },
  {
    id: "goguryeo",
    name: "高句丽",
    period: "前37年—668年",
    position: { x: 280, y: 100 },
    size: { w: 100, h: 90 },
    received: [{ from: "中国", items: ["佛教", "汉字", "儒学", "建筑技术"] }],
    passed: [
      { to: "百济", items: ["佛教", "建筑技术"] },
      { to: "新罗", items: ["佛教"] },
      { to: "日本", items: ["壁画艺术", "铁器制作"] },
    ],
    fact: "高句丽以勇猛善战著称，曾多次击退隋唐大军的进攻，高句丽壁画艺术闻名于世！",
    color: "rgba(139, 69, 19, 0.4)",
  },
  {
    id: "baekje",
    name: "百济",
    period: "前18年—660年",
    position: { x: 280, y: 220 },
    size: { w: 80, h: 80 },
    received: [{ from: "中国", items: ["佛教", "汉字", "儒学", "陶瓷技术"] }],
    passed: [{ to: "日本", items: ["佛教", "汉字", "儒学", "建筑技术", "五经博士"] }],
    fact: "百济是向日本传播中国文化的最重要桥梁，日本飞鸟文化深受百济影响！",
    color: "rgba(65, 105, 225, 0.3)",
  },
  {
    id: "silla",
    name: "新罗",
    period: "前57年—935年",
    position: { x: 340, y: 280 },
    size: { w: 70, h: 70 },
    received: [
      { from: "高句丽", items: ["佛教"] },
      { from: "中国", items: ["汉字", "儒学", "唐制度"] },
    ],
    passed: [{ to: "统一新罗", items: ["融合三国文化"] }],
    fact: "新罗最终统一了朝鲜半岛，派遣大量留学生到唐朝学习，是'遣唐使'的重要参与者！",
    color: "rgba(255, 215, 0, 0.3)",
  },
  {
    id: "balhae",
    name: "渤海",
    period: "698年—926年",
    position: { x: 320, y: 50 },
    size: { w: 90, h: 60 },
    received: [{ from: "唐朝", items: ["政治制度", "文化", "佛教"] }],
    passed: [{ to: "辽/金", items: ["文化传承"] }],
    fact: "渤海被称为'海东盛国'，是高句丽遗民建立的国家，文化高度发达！",
    color: "rgba(0, 128, 128, 0.3)",
  },
  {
    id: "gaya",
    name: "伽倻",
    period: "42年—562年",
    position: { x: 360, y: 230 },
    size: { w: 50, h: 50 },
    received: [{ from: "中国/百济", items: ["铁器技术", "陶瓷"] }],
    passed: [{ to: "日本", items: ["铁器", "须惠器陶瓷技术"] }],
    fact: "伽倻以铁器制作闻名，日本古坟时代的铁器和须惠器很多来自伽倻！",
    color: "rgba(160, 82, 45, 0.3)",
  },
  {
    id: "japan",
    name: "日本",
    period: "绳文时代至今（约前14000年—）",
    position: { x: 450, y: 180 },
    size: { w: 120, h: 160 },
    received: [
      { from: "百济", items: ["佛教", "汉字", "儒学", "建筑技术"] },
      { from: "中国（唐朝）", items: ["律令制度", "都城规划", "茶道", "书法"] },
    ],
    passed: [],
    fact: "日本通过遣唐使大量吸收中国文化，然后进行本土化改造，形成了独特的日本文化！",
    color: "rgba(255, 105, 180, 0.3)",
  },
];

// SVG Map Component
function StylizedMap({
  activeKingdom,
  onKingdomClick,
  visibleFlows,
  animatingFlow,
}: {
  activeKingdom: string | null;
  onKingdomClick: (id: string) => void;
  visibleFlows: Set<string>;
  animatingFlow: string | null;
}) {
  // Flow path data (simplified curved paths)
  const flowPaths: Record<string, { d: string; delay: number }[]> = {
    buddhism: [
      { d: "M180,280 Q230,200 280,150", delay: 0 }, // China to Goguryeo
      { d: "M280,150 Q280,180 290,220", delay: 0.5 }, // Goguryeo to Baekje
      { d: "M320,260 Q340,280 350,290", delay: 1 }, // Baekje to Silla
      { d: "M330,240 Q400,220 460,220", delay: 1.5 }, // Baekje to Japan
    ],
    characters: [
      { d: "M200,280 Q280,250 300,180", delay: 0 }, // China to Korea
      { d: "M350,220 Q420,210 470,200", delay: 0.8 }, // Korea to Japan
    ],
    pottery: [
      { d: "M200,300 Q280,300 320,280", delay: 0 }, // China to Korea
      { d: "M360,280 Q430,260 480,250", delay: 0.8 }, // Korea to Japan
    ],
    architecture: [
      { d: "M220,260 Q270,180 300,140", delay: 0 }, // China to Goguryeo
      { d: "M300,180 Q320,210 310,250", delay: 0.5 }, // Goguryeo to Baekje
      { d: "M340,250 Q420,240 480,260", delay: 1 }, // Baekje to Japan
    ],
    confucianism: [
      { d: "M200,320 Q260,290 300,260", delay: 0 }, // China to Korea
      { d: "M340,260 Q400,250 460,250", delay: 0.8 }, // Korea to Japan
    ],
    paper: [
      { d: "M180,340 Q260,320 320,300", delay: 0 }, // China to Korea
      { d: "M360,300 Q420,290 470,280", delay: 0.8 }, // Korea to Japan
    ],
  };

  return (
    <svg viewBox="0 0 600 450" className="w-full h-full">
      {/* Background with pattern */}
      <defs>
        {/* Parchment gradient */}
        <linearGradient id="parchment" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(38, 55%, 92%)" />
          <stop offset="50%" stopColor="hsl(35, 50%, 88%)" />
          <stop offset="100%" stopColor="hsl(32, 45%, 85%)" />
        </linearGradient>
        
        {/* Cloud pattern */}
        <pattern id="cloudPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path 
            d="M15,30 Q20,25 25,30 Q30,25 35,30 Q40,25 45,30" 
            fill="none" 
            stroke="hsl(35, 30%, 78%)" 
            strokeWidth="0.5"
            opacity="0.5"
          />
        </pattern>

        {/* Wave pattern for sea */}
        <pattern id="wavePattern" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
          <path 
            d="M0,5 Q5,0 10,5 Q15,10 20,5" 
            fill="none" 
            stroke="hsl(200, 40%, 70%)" 
            strokeWidth="0.5"
          />
        </pattern>

        {/* Animated dash for arrows */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="600" height="450" fill="url(#parchment)" />
      <rect x="0" y="0" width="600" height="450" fill="url(#cloudPattern)" />

      {/* Sea areas */}
      <ellipse cx="400" cy="350" rx="100" ry="60" fill="hsl(200, 50%, 85%)" opacity="0.5" />
      <ellipse cx="520" cy="300" rx="60" ry="80" fill="hsl(200, 50%, 85%)" opacity="0.5" />
      <rect x="380" y="350" width="220" height="100" fill="url(#wavePattern)" opacity="0.3" />

      {/* Country/Kingdom shapes */}
      {kingdoms.map((k) => (
        <g key={k.id} onClick={() => onKingdomClick(k.id)} className="cursor-pointer">
          <motion.rect
            x={k.position.x}
            y={k.position.y}
            width={k.size.w}
            height={k.size.h}
            rx={10}
            fill={k.color}
            stroke={activeKingdom === k.id ? "hsl(var(--primary))" : "hsl(35, 30%, 60%)"}
            strokeWidth={activeKingdom === k.id ? 3 : 1.5}
            initial={false}
            animate={{ 
              scale: activeKingdom === k.id ? 1.02 : 1,
              filter: activeKingdom === k.id ? "brightness(1.1)" : "brightness(1)"
            }}
            transition={{ duration: 0.2 }}
            className="hover:brightness-110 transition-all"
          />
          <text
            x={k.position.x + k.size.w / 2}
            y={k.position.y + k.size.h / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-serif-sc font-bold text-foreground pointer-events-none select-none"
            fontSize={k.id === "china" || k.id === "japan" ? 18 : 14}
            fill="hsl(var(--foreground))"
          >
            {k.name}
          </text>
          <text
            x={k.position.x + k.size.w / 2}
            y={k.position.y + k.size.h / 2 + 18}
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-sans-sc text-muted-foreground pointer-events-none select-none"
            fontSize={9}
            fill="hsl(var(--muted-foreground))"
          >
            {k.period.split("—")[0]}
          </text>
        </g>
      ))}

      {/* Flow arrows */}
      {cultureFlows.map((flow) => {
        const paths = flowPaths[flow.id] || [];
        const isVisible = visibleFlows.has(flow.id);
        const isAnimating = animatingFlow === flow.id;

        if (!isVisible && !isAnimating) return null;

        return (
          <g key={flow.id}>
            {paths.map((path, i) => (
              <motion.path
                key={`${flow.id}-${i}`}
                d={path.d}
                fill="none"
                stroke={flow.color}
                strokeWidth={4}
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  isAnimating
                    ? { pathLength: 1, opacity: 1 }
                    : isVisible
                    ? { pathLength: 1, opacity: 0.8 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{
                  pathLength: { duration: 1.5, delay: isAnimating ? path.delay : 0, ease: "easeInOut" },
                  opacity: { duration: 0.3, delay: isAnimating ? path.delay : 0 },
                }}
              />
            ))}
            {/* Arrow heads */}
            {paths.map((path, i) => {
              // Simple arrow head at end
              const endX = parseInt(path.d.split(" ").pop()?.split(",")[0] || "0");
              const endY = parseInt(path.d.split(" ").pop()?.split(",")[1] || "0");
              return (
                <motion.circle
                  key={`${flow.id}-head-${i}`}
                  cx={endX}
                  cy={endY}
                  r={6}
                  fill={flow.color}
                  filter="url(#glow)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    isAnimating || isVisible
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0, opacity: 0 }
                  }
                  transition={{
                    delay: isAnimating ? path.delay + 1.2 : 0,
                    duration: 0.3,
                  }}
                />
              );
            })}
          </g>
        );
      })}

      {/* Title */}
      <text
        x="300"
        y="30"
        textAnchor="middle"
        className="font-serif-sc font-black"
        fontSize="24"
        fill="hsl(var(--primary))"
      >
        东亚文化传播图
      </text>

      {/* Compass rose (decorative) */}
      <g transform="translate(550, 50)">
        <circle r="20" fill="none" stroke="hsl(35, 30%, 60%)" strokeWidth="1" />
        <text textAnchor="middle" y="-8" fontSize="10" fill="hsl(var(--foreground))">北</text>
        <text textAnchor="middle" y="14" fontSize="10" fill="hsl(var(--foreground))">南</text>
        <text textAnchor="start" x="8" y="3" fontSize="10" fill="hsl(var(--foreground))">东</text>
        <text textAnchor="end" x="-8" y="3" fontSize="10" fill="hsl(var(--foreground))">西</text>
      </g>
    </svg>
  );
}

// Culture Detail Popup
function CulturePopup({
  flow,
  onClose,
}: {
  flow: CultureFlow;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed inset-x-4 bottom-20 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-auto sm:w-[500px] max-h-[70vh] overflow-y-auto bg-card border-2 border-gold rounded-2xl shadow-2xl"
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between p-4 rounded-t-2xl"
        style={{ backgroundColor: flow.color }}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">{flow.icon}</span>
          <h3 className="text-xl font-serif-sc font-black text-white">{flow.name}</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Description */}
        <p className="text-sm text-foreground leading-relaxed">{flow.description}</p>

        {/* Timeline */}
        <div>
          <h4 className="text-sm font-bold text-muted-foreground mb-2">📅 传播时间线</h4>
          <div className="space-y-2">
            {flow.route.map((r, i) => (
              <div key={i} className="flex items-start gap-2">
                <div
                  className="w-3 h-3 rounded-full mt-1 shrink-0"
                  style={{ backgroundColor: flow.color }}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-foreground">{r.place}</span>
                    {r.year && (
                      <span className="text-xs bg-secondary px-2 py-0.5 rounded-full text-muted-foreground">
                        {r.year}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Significance */}
        <div className="bg-accent/10 border border-accent/30 rounded-xl p-3">
          <h4 className="text-xs font-bold text-accent-foreground mb-1">💡 历史意义</h4>
          <p className="text-sm text-foreground leading-relaxed">{flow.significance}</p>
        </div>

        {/* Dynasties */}
        <div>
          <h4 className="text-xs font-bold text-muted-foreground mb-2">🏛️ 相关朝代/时期</h4>
          <div className="flex flex-wrap gap-1.5">
            {flow.dynasties.map((d) => (
              <span
                key={d}
                className="text-xs px-2 py-1 rounded-full border"
                style={{ borderColor: flow.color, color: flow.color }}
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

// Kingdom Side Panel
function KingdomPanel({
  kingdom,
  onClose,
}: {
  kingdom: Kingdom;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-96 bg-card border-l-2 border-gold shadow-2xl overflow-y-auto"
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 p-5"
        style={{ background: `linear-gradient(135deg, ${kingdom.color}, ${kingdom.color.replace("0.3", "0.5")})` }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-serif-sc font-black text-foreground">{kingdom.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">📅 {kingdom.period}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-background/50 hover:bg-background/80 text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Received culture */}
        <div>
          <h3 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
            <span className="text-lg">📥</span> 接收的文化
          </h3>
          {kingdom.received.length > 0 ? (
            <div className="space-y-2">
              {kingdom.received.map((r, i) => (
                <div key={i} className="bg-secondary/50 rounded-lg p-3 border border-border">
                  <div className="text-xs text-muted-foreground mb-1">来自 {r.from}：</div>
                  <div className="flex flex-wrap gap-1">
                    {r.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs bg-primary/10 text-primary border border-primary/30 px-2 py-0.5 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">作为文化源头</p>
          )}
        </div>

        {/* Passed culture */}
        <div>
          <h3 className="text-sm font-bold text-jade mb-3 flex items-center gap-2">
            <span className="text-lg">📤</span> 传播的文化
          </h3>
          {kingdom.passed.length > 0 ? (
            <div className="space-y-2">
              {kingdom.passed.map((p, i) => (
                <div key={i} className="bg-jade/10 rounded-lg p-3 border border-jade/30">
                  <div className="text-xs text-muted-foreground mb-1">传给 {p.to}：</div>
                  <div className="flex flex-wrap gap-1">
                    {p.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs bg-jade/10 text-jade border border-jade/30 px-2 py-0.5 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">文化接收终点</p>
          )}
        </div>

        {/* Fun fact */}
        <div className="bg-accent/15 border border-accent/30 rounded-xl p-4">
          <h3 className="text-sm font-bold text-accent-foreground mb-2 flex items-center gap-2">
            <span className="text-lg">🌟</span> 有趣小知识
          </h3>
          <p className="text-sm text-foreground leading-relaxed">{kingdom.fact}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Legend component
function Legend({
  visibleFlows,
  onToggle,
  onPlayAll,
  isPlaying,
}: {
  visibleFlows: Set<string>;
  onToggle: (id: string) => void;
  onPlayAll: () => void;
  isPlaying: boolean;
}) {
  return (
    <div className="bg-card/95 backdrop-blur-sm border border-border rounded-2xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-serif-sc font-bold text-foreground">文化传播图例</h3>
        <Button
          size="sm"
          onClick={onPlayAll}
          disabled={isPlaying}
          className="h-8 px-3 text-xs font-sans-sc bg-primary hover:bg-primary/90"
        >
          <Play className="w-3 h-3 mr-1" />
          {isPlaying ? "播放中..." : "播放全部"}
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {cultureFlows.map((flow) => {
          const isVisible = visibleFlows.has(flow.id);
          return (
            <button
              key={flow.id}
              onClick={() => onToggle(flow.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all text-left ${
                isVisible
                  ? "border-current bg-opacity-20"
                  : "border-border bg-secondary/30 opacity-60"
              }`}
              style={{ borderColor: isVisible ? flow.color : undefined }}
            >
              <div
                className="w-4 h-4 rounded-full shrink-0"
                style={{ backgroundColor: flow.color }}
              />
              <span className="text-xs font-sans-sc font-medium text-foreground truncate">
                {flow.name}
              </span>
              {isVisible ? (
                <Eye className="w-3 h-3 ml-auto text-muted-foreground shrink-0" />
              ) : (
                <EyeOff className="w-3 h-3 ml-auto text-muted-foreground shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Main Page Component
export default function CultureSpreadMap() {
  const [activeKingdom, setActiveKingdom] = useState<string | null>(null);
  const [selectedCulture, setSelectedCulture] = useState<CultureFlow | null>(null);
  const [visibleFlows, setVisibleFlows] = useState<Set<string>>(new Set(["buddhism"]));
  const [animatingFlow, setAnimatingFlow] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleKingdomClick = useCallback((id: string) => {
    setActiveKingdom(id);
    setSelectedCulture(null);
  }, []);

  const handleToggleFlow = useCallback((id: string) => {
    setVisibleFlows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handlePlayAll = useCallback(async () => {
    setIsPlaying(true);
    setVisibleFlows(new Set());
    setSelectedCulture(null);
    setActiveKingdom(null);

    const flowOrder = ["buddhism", "characters", "confucianism", "architecture", "pottery", "paper"];
    
    for (const flowId of flowOrder) {
      setAnimatingFlow(flowId);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setVisibleFlows((prev) => new Set([...prev, flowId]));
    }
    
    setAnimatingFlow(null);
    setIsPlaying(false);
  }, []);

  const selectedKingdom = kingdoms.find((k) => k.id === activeKingdom);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="text-center py-8 px-4 pattern-chinese border-b border-border">
        <h1 className="text-3xl sm:text-4xl font-serif-sc font-black text-primary">
          文化传播地图
        </h1>
        <p className="mt-2 text-muted-foreground font-sans-sc text-sm max-w-lg mx-auto">
          探索中华文化如何从中国传播至朝鲜半岛与日本
        </p>
      </div>

      {/* Instructions */}
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/50 rounded-lg px-3 py-2">
          <Info className="w-4 h-4 shrink-0" />
          <span>点击地图上的国家/王国查看详情，点击图例切换文化传播路线显示</span>
        </div>
      </div>

      {/* Map */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="bg-parchment border-2 border-gold/40 rounded-2xl p-2 sm:p-4 shadow-lg overflow-hidden">
          <StylizedMap
            activeKingdom={activeKingdom}
            onKingdomClick={handleKingdomClick}
            visibleFlows={visibleFlows}
            animatingFlow={animatingFlow}
          />
        </div>
      </div>

      {/* Culture item buttons */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <h3 className="text-sm font-serif-sc font-bold text-foreground mb-3 text-center">
          点击了解各项文化的传播故事
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {cultureFlows.map((flow) => (
            <button
              key={flow.id}
              onClick={() => {
                setSelectedCulture(flow);
                setActiveKingdom(null);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full border-2 bg-card hover:scale-105 transition-all"
              style={{ borderColor: flow.color }}
            >
              <span className="text-lg">{flow.icon}</span>
              <span className="text-sm font-sans-sc font-medium text-foreground">{flow.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Legend & Controls */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <Legend
          visibleFlows={visibleFlows}
          onToggle={handleToggleFlow}
          onPlayAll={handlePlayAll}
          isPlaying={isPlaying}
        />
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedCulture && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-sm"
              onClick={() => setSelectedCulture(null)}
            />
            <CulturePopup flow={selectedCulture} onClose={() => setSelectedCulture(null)} />
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedKingdom && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-sm"
              onClick={() => setActiveKingdom(null)}
            />
            <KingdomPanel kingdom={selectedKingdom} onClose={() => setActiveKingdom(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
