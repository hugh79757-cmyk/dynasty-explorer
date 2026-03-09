import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ChevronDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

// ─── Culture Flow Data ───────────────────────────────────────────────────────

interface CultureFlow {
  id: string;
  name: string;
  emoji: string;
  color: string;
  route: string[];
  description: string;
  significance: string;
  dynasties: string[];
  timeline: { place: string; year?: string; desc: string }[];
}

const FLOWS: CultureFlow[] = [
  {
    id: "buddhism", name: "佛教", emoji: "🟡", color: "#D4AF37",
    route: ["china", "goguryeo", "baekje", "silla", "japan"],
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
    id: "characters", name: "汉字", emoji: "🔴", color: "#C41E3A",
    route: ["china", "goguryeo", "baekje", "japan"],
    description: "汉字是东亚文化圈共同的文字基础。百济学者王仁将《论语》和《千字文》带入日本，成为汉字进入日本的关键人物。",
    significance: "汉字使东亚各国能够阅读同样的经典著作，形成了独特的'汉字文化圈'。",
    dynasties: ["商周", "秦汉", "高句丽", "百济", "新罗", "古坟时代"],
    timeline: [
      { place: "中国", year: "商朝", desc: "从甲骨文到楷书的漫长演变" },
      { place: "朝鲜半岛", year: "前2世纪", desc: "汉字大量传入朝鲜半岛各国" },
      { place: "日本", year: "4世纪", desc: "百济学者王仁携《论语》《千字文》东渡日本" },
    ],
  },
  {
    id: "pottery", name: "陶瓷", emoji: "🔵", color: "#4169E1",
    route: ["china", "gaya", "japan"],
    description: "中国是瓷器的故乡。陶瓷技术传到朝鲜半岛后发展出高丽青瓷，伽倻的陶器技术又东传日本形成须惠器。",
    significance: "陶瓷是古代东亚贸易的重要商品，每个国家都发展出了独特的陶瓷风格。",
    dynasties: ["汉朝", "唐朝", "伽倻", "高丽", "飞鸟时代"],
    timeline: [
      { place: "中国", year: "汉-唐", desc: "青瓷、白瓷、唐三彩相继问世" },
      { place: "伽倻", year: "三国时期", desc: "伽倻独立发展出高温陶质土器" },
      { place: "日本", year: "5世纪", desc: "须惠器技术从朝鲜半岛传入" },
    ],
  },
  {
    id: "architecture", name: "建筑", emoji: "🟢", color: "#228B22",
    route: ["china", "baekje", "japan"],
    description: "唐长安城是当时世界上最大的城市，棋盘式格局影响了整个东亚。百济工匠受邀赴日，参与建造了法隆寺。",
    significance: "日本奈良和京都均受长安城规划影响，而法隆寺则融合了中国和百济的建筑技术。",
    dynasties: ["隋唐", "高句丽", "百济", "飞鸟时代", "奈良时代"],
    timeline: [
      { place: "中国长安", year: "隋唐", desc: "棋盘格都城规划，中轴线对称布局" },
      { place: "百济", year: "5-7世纪", desc: "引入宫殿与寺庙建筑体系并加以发展" },
      { place: "日本", year: "7-8世纪", desc: "百济工匠赴日建造法隆寺；奈良仿长安建设" },
    ],
  },
  {
    id: "confucianism", name: "儒学", emoji: "🟣", color: "#9932CC",
    route: ["china", "goguryeo", "baekje", "japan"],
    description: "儒学由孔子创立，强调仁义礼智信。儒学传入朝鲜半岛后与各国本土文化结合，再经百济学者传入日本。",
    significance: "儒学塑造了整个东亚的社会价值观、政治制度和教育体系。",
    dynasties: ["春秋战国", "汉朝", "高句丽", "百济", "新罗", "古坟时代"],
    timeline: [
      { place: "中国", year: "前6世纪", desc: "孔子创立儒家学说" },
      { place: "朝鲜半岛", year: "汉朝", desc: "儒学随汉字和行政制度传入" },
      { place: "日本", year: "5世纪", desc: "百济学者王仁携《论语》传入日本" },
    ],
  },
  {
    id: "paper", name: "造纸", emoji: "🟠", color: "#FF8C00",
    route: ["china", "goguryeo", "japan"],
    description: "造纸术是中国四大发明之一。高句丽僧人昙征610年将造纸和制墨技术传入日本。",
    significance: "造纸和印刷让知识传播变得容易，推动了东亚各国的文化繁荣和教育发展。",
    dynasties: ["东汉", "隋唐", "高句丽", "百济", "飞鸟时代"],
    timeline: [
      { place: "中国", year: "东汉", desc: "蔡伦改进造纸术；雕版印刷术发明" },
      { place: "朝鲜半岛", year: "4-7世纪", desc: "造纸术传入三国，各国大量抄写佛经" },
      { place: "日本", year: "610年", desc: "高句丽僧人昙征携造纸制墨技术入日" },
    ],
  },
];

// ─── Kingdom Data ────────────────────────────────────────────────────────────

interface KingdomData {
  id: string;
  name: string;
  badge: string;
  period: string;
  color: string;
  emblem: string;
  highlights: { name: string; desc: string }[];
  uniqueAchievement: string;
  received: { from: string; items: string[] }[];
  passed: { to: string; items: string[] }[];
}

const KINGDOMS: KingdomData[] = [
  {
    id: "china", name: "中国", badge: "万流之源", period: "夏朝—唐朝（约前2070年—907年）",
    color: "#8B1A1A", emblem: "🐉",
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
    id: "goguryeo", name: "高句丽", badge: "北方的勇士之国", period: "前37年—668年（705年历史）",
    color: "#2D5016", emblem: "☀️",
    highlights: [
      { name: "壁画艺术", desc: "高句丽古墓壁画展现了丰富的生活场景——狩猎、舞蹈、武士、四神(青龙、白虎、朱雀、玄武)，艺术风格独树一帜" },
      { name: "山城建筑", desc: "依山而建的军事要塞体系，巧妙利用自然地形，是古代东亚军事工程的杰作" },
      { name: "铠马武士", desc: "人马皆披重甲的骑兵，是东亚重装骑兵的先驱之一，战斗力令人敬畏" },
      { name: "高句丽乐舞", desc: "高句丽音乐在隋唐宫廷中备受欢迎，被列入唐代宫廷'十部乐'之一" },
    ],
    uniqueAchievement: "将北方游牧文化与中原农耕文化完美融合，创造了独特的东北亚文明",
    received: [{ from: "中国", items: ["佛教（372年）", "汉字", "儒学"] }],
    passed: [
      { to: "日本", items: ["壁画艺术", "造纸术（僧人昙征）"] },
      { to: "隋唐宫廷", items: ["高句丽乐舞（十部乐之一）"] },
    ],
  },
  {
    id: "baekje", name: "百济", badge: "海上的文化使者", period: "前18年—660年（678年历史）",
    color: "#1A6B8A", emblem: "🌊",
    highlights: [
      { name: "百济微笑", desc: "百济佛像上温柔宁静的微笑，体现了独特的审美风格，影响了日本早期佛教艺术" },
      { name: "百济金铜大香炉", desc: "融合了佛教、道教和本土信仰的艺术杰作，工艺精湛，是东亚青铜器艺术的巅峰之一" },
      { name: "海洋贸易", desc: "百济拥有先进的航海技术，建立了连接中国、朝鲜半岛、日本的海上贸易网络" },
      { name: "建筑与工艺", desc: "百济工匠技艺精湛，受邀参与了日本早期寺庙建设，法隆寺至今屹立不倒" },
    ],
    uniqueAchievement: "作为东亚海上文化交流的关键枢纽，促进了中日之间的文化传播",
    received: [{ from: "中国", items: ["佛教（384年）", "汉字", "儒学"] }],
    passed: [{ to: "日本", items: ["佛教", "汉字（王仁传《论语》）", "建筑技术", "工艺美术"] }],
  },
  {
    id: "silla", name: "新罗", badge: "黄金与星辰的国度", period: "前57年—935年（992年历史）",
    color: "#6B2FA0", emblem: "👑",
    highlights: [
      { name: "新罗金冠", desc: "造型独特的金冠，以树枝和鹿角为装饰，是东亚独一无二的艺术珍品" },
      { name: "瞻星台", desc: "建于公元633年前后的天文观测台，是东亚现存最古老的天文建筑之一" },
      { name: "花郎道", desc: "培养年轻人文武兼修的教育制度——既练武艺，也学诗歌和佛学" },
      { name: "佛国寺与石窟庵", desc: "精美的佛教建筑与石雕艺术，是新罗人对佛教文化独特诠释的结晶" },
    ],
    uniqueAchievement: "发展出将武士精神与学术修养相结合的独特教育传统",
    received: [
      { from: "中国（唐）", items: ["律令制度", "汉字", "儒学"] },
      { from: "高句丽", items: ["佛教"] },
    ],
    passed: [{ to: "高丽/朝鲜", items: ["三国文化融合成果", "佛教传统"] }],
  },
  {
    id: "gaya", name: "伽倻", badge: "铁与琴弦的国度", period: "42年—562年（520年历史）",
    color: "#B8860B", emblem: "⚔️",
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
    id: "balhae", name: "渤海", badge: "海东盛国", period: "698年—926年（228年历史）",
    color: "#1E6E6E", emblem: "🏔️",
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
    id: "japan", name: "日本", badge: "东方的学习者与创新者", period: "弥生时代—奈良时代（约前3世纪—794年）",
    color: "#C2185B", emblem: "🌸",
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

// ─── Node positions for the diagram ─────────────────────────────────────────

const NODE_POSITIONS: Record<string, { row: number; col: number }> = {
  balhae:   { row: 0, col: 3 },
  china:    { row: 1, col: 1 },
  goguryeo: { row: 1, col: 3 },
  japan:    { row: 1, col: 6 },
  baekje:   { row: 2, col: 2 },
  gaya:     { row: 2, col: 4 },
  silla:    { row: 2, col: 5 },
};

// Connections between nodes (gray lines by default)
const CONNECTIONS: [string, string][] = [
  ["china", "goguryeo"],
  ["china", "baekje"],
  ["china", "balhae"],
  ["goguryeo", "baekje"],
  ["goguryeo", "balhae"],
  ["goguryeo", "japan"],
  ["baekje", "silla"],
  ["baekje", "gaya"],
  ["baekje", "japan"],
  ["gaya", "silla"],
  ["gaya", "japan"],
  ["silla", "japan"],
  ["balhae", "japan"],
  ["china", "silla"],
];

// ─── "你知道吗" Fun Facts ────────────────────────────────────────────────────

const FUN_FACTS = [
  { emoji: "🎵", text: "高句丽的音乐曾在长安城的皇宫里演奏，唐朝皇帝非常喜欢！高句丽乐是唐代'十部乐'之一——音乐是不分国界的！", color: "#2D5016" },
  { emoji: "📚", text: "百济的学者王仁带着《论语》和《千字文》东渡日本，帮助日本人学习汉字。中国的文化通过朝鲜半岛传到了日本！", color: "#1A6B8A" },
  { emoji: "🔭", text: "新罗的瞻星台建于公元633年，比欧洲最早的天文台早了将近一千年！东亚人仰望星空的历史比你想象的更久远。", color: "#6B2FA0" },
  { emoji: "⚒️", text: "伽倻出产的铁器质量极高，是当时东亚的'钢铁中心'，连中国的乐浪郡都进口伽倻的铁！小国也能有大本领。", color: "#B8860B" },
  { emoji: "🏯", text: "日本奈良的法隆寺是世界上现存最古老的木造建筑之一，它的建造融合了来自中国和百济的建筑技术——东亚合作的杰作！", color: "#C2185B" },
  { emoji: "🌍", text: "唐朝长安城是当时世界上最国际化的城市，街上能看到来自高句丽、新罗、百济、日本、波斯、阿拉伯等各国的人！", color: "#8B1A1A" },
  { emoji: "🥢", text: "东亚各国的筷子各不相同——中国用长圆筷，韩国用金属扁筷，日本用短尖筷——同一种餐具，三种不同的创新！", color: "#D4AF37" },
];

// ─── Node Diagram Component ─────────────────────────────────────────────────

function NodeDiagram({
  onNodeClick,
  activeRoutes,
  discoveredFlows,
}: {
  onNodeClick: (id: string) => void;
  activeRoutes: { flowId: string; nodes: string[] }[];
  discoveredFlows: Set<string>;
}) {
  const isMobile = useIsMobile();

  // Mobile: vertical layout; Desktop: horizontal layout
  const MOBILE_POSITIONS: Record<string, { x: number; y: number }> = {
    china:    { x: 150, y: 40 },
    goguryeo: { x: 80, y: 140 },
    baekje:   { x: 220, y: 140 },
    gaya:     { x: 80, y: 240 },
    silla:    { x: 220, y: 240 },
    balhae:   { x: 150, y: 340 },
    japan:    { x: 150, y: 440 },
  };

  const getNodePos = (id: string) => {
    if (isMobile) return MOBILE_POSITIONS[id];
    const pos = NODE_POSITIONS[id];
    const x = 80 + pos.col * 110;
    const y = 60 + pos.row * 130;
    return { x, y };
  };

  const nodeSize = isMobile ? 56 : 72;
  const emojiSize = isMobile ? "text-2xl" : "text-3xl";
  const canvasW = isMobile ? 300 : 860;
  const canvasH = isMobile ? 500 : 380;

  const getConnectionColor = (a: string, b: string): { color: string; active: boolean } => {
    for (const route of activeRoutes) {
      const nodes = route.nodes;
      for (let i = 0; i < nodes.length - 1; i++) {
        if ((nodes[i] === a && nodes[i + 1] === b) || (nodes[i] === b && nodes[i + 1] === a)) {
          const flow = FLOWS.find(f => f.id === route.flowId);
          return { color: flow?.color || "#666", active: true };
        }
      }
    }
    return { color: "#374151", active: false };
  };

  return (
    <div className="relative w-full overflow-x-auto flex justify-center">
      <div className="relative mx-auto" style={{ width: canvasW, height: canvasH }}>
        {/* SVG lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ width: canvasW, height: canvasH }}>
          {CONNECTIONS.map(([a, b]) => {
            const pa = getNodePos(a);
            const pb = getNodePos(b);
            const conn = getConnectionColor(a, b);
            return (
              <motion.line
                key={`${a}-${b}`}
                x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                stroke={conn.color}
                strokeWidth={conn.active ? 3 : 1.5}
                strokeDasharray={conn.active ? "none" : "6 4"}
                opacity={conn.active ? 0.9 : 0.25}
                initial={false}
                animate={{
                  stroke: conn.color,
                  strokeWidth: conn.active ? 3 : 1.5,
                  opacity: conn.active ? 0.9 : 0.25,
                }}
                transition={{ duration: 0.5 }}
              />
            );
          })}
          {/* Animated route arrows */}
          {activeRoutes.map((route) => {
            const flow = FLOWS.find(f => f.id === route.flowId);
            if (!flow) return null;
            const points = route.nodes.map(n => getNodePos(n));
            return points.slice(0, -1).map((p, i) => {
              const next = points[i + 1];
              const dx = next.x - p.x;
              const dy = next.y - p.y;
              const len = Math.sqrt(dx * dx + dy * dy);
              const ux = dx / len;
              const uy = dy / len;
              const offset = nodeSize / 2 + 6;
              const sx = p.x + ux * offset;
              const sy = p.y + uy * offset;
              const ex = next.x - ux * offset;
              const ey = next.y - uy * offset;
              return (
                <motion.line
                  key={`route-${route.flowId}-${i}`}
                  x1={sx} y1={sy} x2={ex} y2={ey}
                  stroke={flow.color}
                  strokeWidth={isMobile ? 3 : 4}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.4 }}
                />
              );
            });
          })}
        </svg>

        {/* Nodes */}
        {KINGDOMS.map((k) => {
          const pos = getNodePos(k.id);
          const isOnRoute = activeRoutes.some(r => r.nodes.includes(k.id));
          return (
            <motion.button
              key={k.id}
              className="absolute flex flex-col items-center gap-0.5 group"
              style={{ left: pos.x - nodeSize / 2, top: pos.y - nodeSize / 2 }}
              onClick={() => onNodeClick(k.id)}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="rounded-full flex items-center justify-center border-[3px] relative"
                style={{
                  width: nodeSize,
                  height: nodeSize,
                  borderColor: k.color,
                  background: isOnRoute ? `${k.color}25` : "hsl(220 15% 13%)",
                }}
                animate={{
                  boxShadow: isOnRoute
                    ? `0 0 20px ${k.color}66, 0 0 40px ${k.color}33`
                    : `0 0 8px ${k.color}22`,
                }}
                transition={{ duration: 0.5 }}
              >
                <span className={emojiSize}>{k.emblem}</span>
                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: k.color }}
                  animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
              <span className={`${isMobile ? "text-[10px]" : "text-xs"} font-bold text-white/90 group-hover:text-white transition-colors whitespace-nowrap`}>
                {k.name}
              </span>
            </motion.button>
          );
        })}

        {/* Year labels on active routes */}
        {activeRoutes.map((route) => {
          const flow = FLOWS.find(f => f.id === route.flowId);
          if (!flow) return null;
          return route.nodes.slice(0, -1).map((nodeId, i) => {
            const p = getNodePos(nodeId);
            const next = getNodePos(route.nodes[i + 1]);
            const mx = (p.x + next.x) / 2;
            const my = (p.y + next.y) / 2;
            const tl = flow.timeline.find(t => {
              const k = KINGDOMS.find(k2 => k2.id === route.nodes[i + 1]);
              return k && t.place.includes(k.name.charAt(0));
            });
            if (!tl?.year) return null;
            return (
              <motion.div
                key={`label-${route.flowId}-${i}`}
                className={`absolute px-1.5 py-0.5 rounded-full font-bold text-white whitespace-nowrap pointer-events-none ${isMobile ? "text-[8px]" : "text-[10px]"}`}
                style={{ left: mx - 20, top: my - 10, backgroundColor: flow.color }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.4 + 0.3 }}
              >
                {tl.year}
              </motion.div>
            );
          });
        })}
      </div>
    </div>
  );
}

// ─── Route Selection Modal ───────────────────────────────────────────────────

function RouteModal({
  kingdomName,
  onSelect,
  onClose,
  discoveredFlows,
}: {
  kingdomName: string;
  onSelect: (flowId: string) => void;
  onClose: () => void;
  discoveredFlows: Set<string>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative z-10 w-full max-w-sm rounded-2xl p-6"
        style={{ background: "#1e1e2e", border: "1px solid #333" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">选择一种文化，追踪传播路线：</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-white/60">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {FLOWS.map((f) => {
            const isDiscovered = discoveredFlows.has(f.id);
            return (
              <button
                key={f.id}
                onClick={() => onSelect(f.id)}
                className="flex items-center gap-2 px-3 py-3 rounded-xl text-left transition-all hover:scale-[1.02]"
                style={{
                  background: isDiscovered ? `${f.color}20` : "#2a2a3e",
                  border: `2px solid ${isDiscovered ? f.color : "#444"}`,
                }}
              >
                <span className="text-lg">{f.emoji}</span>
                <div>
                  <span className="text-sm font-bold text-white">{f.name}</span>
                  {isDiscovered && <span className="text-[10px] text-green-400 block">✓ 已发现</span>}
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Civilization Card ───────────────────────────────────────────────────────

function CivCard({ kingdom }: { kingdom: KingdomData }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div
      className="flex-shrink-0 w-[280px] sm:w-[300px] rounded-2xl overflow-hidden shadow-lg"
      style={{ background: "#fff", border: "1px solid #e5e7eb" }}
    >
      {/* Top band */}
      <div className="p-4" style={{ background: `linear-gradient(135deg, ${kingdom.color}, ${kingdom.color}cc)` }}>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{kingdom.emblem}</span>
          <div>
            <h3 className="text-lg font-bold text-white">{kingdom.name}</h3>
            <p className="text-xs text-white/80 font-medium">{kingdom.badge}</p>
          </div>
        </div>
      </div>
      {/* Period tag */}
      <div className="px-4 pt-3">
        <span className="text-[10px] px-2 py-1 rounded-full font-medium" style={{ background: `${kingdom.color}15`, color: kingdom.color, border: `1px solid ${kingdom.color}33` }}>
          📅 {kingdom.period}
        </span>
      </div>
      {/* Highlights */}
      <div className="p-4 space-y-1.5">
        {kingdom.highlights.map((h, i) => (
          <div key={i}>
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full flex items-center justify-between text-left py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium text-gray-800 flex-1">{h.name}</span>
              <ChevronDown
                className="w-4 h-4 text-gray-400 transition-transform shrink-0"
                style={{ transform: expanded === i ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>
            <AnimatePresence>
              {expanded === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-xs text-gray-500 leading-relaxed px-3 pb-2">{h.desc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      {/* Unique achievement */}
      <div className="mx-4 mb-4 p-3 rounded-xl" style={{ background: `${kingdom.color}08`, borderLeft: `3px solid ${kingdom.color}` }}>
        <p className="text-[11px] text-gray-500 leading-relaxed">🌟 {kingdom.uniqueAchievement}</p>
      </div>
    </div>
  );
}

// ─── Flow Detail Popup ───────────────────────────────────────────────────────

function FlowPopup({ flow, onClose }: { flow: CultureFlow; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        className="relative z-10 w-full max-w-md max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl"
        style={{ background: "#fff", border: `2px solid ${flow.color}` }}
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 rounded-t-2xl" style={{ background: `linear-gradient(135deg, ${flow.color}, ${flow.color}cc)` }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{flow.emoji}</span>
            <h3 className="text-xl font-bold text-white">{flow.name}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-4 space-y-4">
          <p className="text-sm text-gray-700 leading-relaxed">{flow.description}</p>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">📅 传播时间线</h4>
            <div className="relative pl-4">
              <div className="absolute left-1.5 top-2 bottom-2 w-0.5 rounded-full" style={{ background: `${flow.color}44` }} />
              {flow.timeline.map((r, i) => (
                <div key={i} className="flex items-start gap-3 mb-3 relative">
                  <div className="w-3 h-3 rounded-full mt-1 shrink-0 absolute -left-[18px]" style={{ backgroundColor: flow.color }} />
                  <div className="flex-1 pl-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-gray-800">{r.place}</span>
                      {r.year && <span className="text-xs px-2 py-0.5 rounded-full text-white font-medium" style={{ background: flow.color }}>{r.year}</span>}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl p-3" style={{ background: `${flow.color}10`, border: `1px solid ${flow.color}33` }}>
            <h4 className="text-xs font-bold mb-1" style={{ color: flow.color }}>💡 历史意义</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{flow.significance}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 mb-2">🏛 相关朝代/时期</h4>
            <div className="flex flex-wrap gap-1.5">
              {flow.dynasties.map((d) => (
                <span key={d} className="text-xs px-2 py-1 rounded-full" style={{ border: `1px solid ${flow.color}66`, color: flow.color }}>{d}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
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

  const go = (dir: "next" | "prev") => {
    clearInterval(timerRef.current);
    dir === "next" ? next() : prev();
    timerRef.current = setInterval(next, 5000);
  };

  const fact = FUN_FACTS[idx];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-gray-200" />
        <h2 className="text-sm font-bold text-gray-700 whitespace-nowrap px-2">💡 你知道吗？</h2>
        <div className="h-px flex-1 bg-gray-200" />
      </div>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="p-5 rounded-2xl min-h-[100px] flex items-center gap-4"
            style={{ border: `2px solid ${fact.color}33`, background: `${fact.color}08` }}
          >
            <span className="text-4xl shrink-0">{fact.emoji}</span>
            <p className="text-sm text-gray-700 leading-relaxed flex-1">{fact.text}</p>
          </motion.div>
        </AnimatePresence>
        <button onClick={() => go("prev")} className="absolute left-1 top-1/2 -translate-y-1/2 p-2.5 sm:p-1.5 rounded-full bg-white border border-gray-200 shadow hover:bg-gray-50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 sm:w-4 sm:h-4 text-gray-600" />
        </button>
        <button onClick={() => go("next")} className="absolute right-1 top-1/2 -translate-y-1/2 p-2.5 sm:p-1.5 rounded-full bg-white border border-gray-200 shadow hover:bg-gray-50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
          <ChevronRight className="w-5 h-5 sm:w-4 sm:h-4 text-gray-600" />
        </button>
      </div>
      <div className="flex justify-center gap-1.5">
        {FUN_FACTS.map((_, i) => (
          <button
            key={i}
            onClick={() => { clearInterval(timerRef.current); setIdx(i); timerRef.current = setInterval(next, 5000); }}
            className={`w-2 h-2 rounded-full transition-all ${i === idx ? "scale-125" : ""}`}
            style={{ background: i === idx ? fact.color : "#d1d5db" }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CultureSpreadMap() {
  const [modalKingdom, setModalKingdom] = useState<string | null>(null);
  const [activeRoutes, setActiveRoutes] = useState<{ flowId: string; nodes: string[] }[]>([]);
  const [discoveredFlows, setDiscoveredFlows] = useState<Set<string>>(new Set());
  const [selectedFlowDetail, setSelectedFlowDetail] = useState<CultureFlow | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);

  const handleNodeClick = useCallback((id: string) => {
    setModalKingdom(id);
  }, []);

  const handleSelectFlow = useCallback((flowId: string) => {
    const flow = FLOWS.find(f => f.id === flowId);
    if (!flow) return;
    setModalKingdom(null);
    // Set route
    setActiveRoutes([{ flowId, nodes: flow.route }]);
    setDiscoveredFlows(prev => new Set([...prev, flowId]));
    // Show detail after short delay
    setTimeout(() => setSelectedFlowDetail(flow), 800);
  }, []);

  const handlePlayAll = useCallback(async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setActiveRoutes([]);
    for (const flow of FLOWS) {
      setActiveRoutes(prev => [...prev, { flowId: flow.id, nodes: flow.route }]);
      setDiscoveredFlows(prev => new Set([...prev, flow.id]));
      await new Promise(r => setTimeout(r, 1800));
    }
    setIsPlaying(false);
  }, [isPlaying]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setModalKingdom(null); setSelectedFlowDetail(null); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#ffffff" }}>
      {/* Section 1: Header */}
      <div
        className="relative overflow-hidden py-10 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}
      >
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          🔥 东亚文明之光
        </h1>
        <p className="mt-3 text-sm sm:text-base font-medium" style={{ color: "#D4AF37" }}>
          每个文明都有独特的光芒，它们彼此照亮
        </p>
        <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
          🎯 挑战：找出6条文化传播路线！已发现 <span style={{ color: "#D4AF37" }}>{discoveredFlows.size}/6</span>
        </div>
      </div>

      {/* Section 2: Node Diagram */}
      <div className="py-8 px-4" style={{ background: "#111827" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4 px-2">
            <p className="text-xs text-gray-400">点击任意节点，选择文化路线进行追踪</p>
            <Button
              size="sm"
              onClick={handlePlayAll}
              disabled={isPlaying}
              className="h-8 px-4 text-xs font-bold"
              style={{ background: "#D4AF37", color: "#111" }}
            >
              <Play className="w-3 h-3 mr-1" />
              {isPlaying ? "播放中..." : "播放全部"}
            </Button>
          </div>
          <NodeDiagram
            onNodeClick={handleNodeClick}
            activeRoutes={activeRoutes}
            discoveredFlows={discoveredFlows}
          />
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {FLOWS.map(f => (
              <button
                key={f.id}
                onClick={() => handleSelectFlow(f.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105"
                style={{
                  background: discoveredFlows.has(f.id) ? `${f.color}25` : "rgba(255,255,255,0.05)",
                  border: `1.5px solid ${discoveredFlows.has(f.id) ? f.color : "#444"}`,
                  color: discoveredFlows.has(f.id) ? f.color : "#999",
                }}
              >
                <span>{f.emoji}</span>
                {f.name}
                {discoveredFlows.has(f.id) && <span className="text-green-400">✓</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: Civilization Cards */}
      <div className="py-10 px-4" style={{ background: "#f9fafb" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">🌏 七大文明亮点</h2>
          <div
            ref={cardsRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none" }}
          >
            {KINGDOMS.map((k) => (
              <div key={k.id} className="snap-start">
                <CivCard kingdom={k} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 4: Fun Facts */}
      <div className="py-10 px-4" style={{ background: "#ffffff" }}>
        <div className="max-w-2xl mx-auto">
          <FunFactsCarousel />
        </div>
      </div>

      {/* Footer message */}
      <div className="py-8 px-4 text-center" style={{ background: "#f9fafb" }}>
        <p className="text-base font-bold text-gray-700">
          🌏 这些伟大的文明互相学习、互相影响，共同创造了灿烂的东亚文化
        </p>
        <p className="text-sm text-gray-400 mt-2">东亚文明之光 — 东亚人民共同的历史遗产</p>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {modalKingdom && (
          <RouteModal
            kingdomName={KINGDOMS.find(k => k.id === modalKingdom)?.name || ""}
            onSelect={handleSelectFlow}
            onClose={() => setModalKingdom(null)}
            discoveredFlows={discoveredFlows}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedFlowDetail && (
          <FlowPopup flow={selectedFlowDetail} onClose={() => setSelectedFlowDetail(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
