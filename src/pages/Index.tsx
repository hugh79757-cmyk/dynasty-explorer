import { Link, useLocation } from "react-router-dom";
import { Clock, Map, HelpCircle, Globe } from "lucide-react";

const navItems = [
  { to: "/dynasty-timeline", label: "朝代时间线", icon: Clock, desc: "从夏到唐" },
  { to: "/culture-flow", label: "文化传播", icon: Map, desc: "中国→韩国→日本" },
  { to: "/culture-map", label: "文化地图", icon: Globe, desc: "互动传播地图" },
  { to: "/history-quiz", label: "历史问答", icon: HelpCircle, desc: "20道趣味题" },
];

export function NavBar() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-sm border-t border-border shadow-lg">
      <div className="max-w-xl mx-auto flex justify-around">
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-0.5 py-2.5 px-4 transition-colors ${
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? "stroke-[2.5]" : ""}`} />
              <span className="text-xs font-sans-sc font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center pattern-chinese">
        {/* Logo/Title */}
        <div className="relative mb-6">
          <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full scale-150" />
          <span className="relative text-8xl">🏯</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-serif-sc font-black text-foreground mb-2">
          华夏历史之旅
        </h1>
        <p className="text-muted-foreground font-sans-sc text-sm sm:text-base mb-8 max-w-md">
          探索中国古代历史，了解中华文化<br className="hidden sm:block" />
          如何传播至朝鲜半岛与日本列岛
        </p>

        {/* Feature cards */}
        <div className="grid gap-4 w-full max-w-md">
          {navItems.map(({ to, label, icon: Icon, desc }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-center gap-4 bg-card border-2 border-border hover:border-primary rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 text-left"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-serif-sc font-bold text-foreground group-hover:text-primary transition-colors">
                  {label}
                </h2>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Credits */}
        <p className="mt-10 text-xs text-muted-foreground">
          专为喜爱历史的你而设计 ❤️
        </p>
      </div>
    </div>
  );
}
