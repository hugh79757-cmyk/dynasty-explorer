import { useState } from "react";
import { dynasties, Dynasty } from "@/data/historyData";
import { X, Star, MapPin, Users, Award, Globe } from "lucide-react";

const DynastyCard = ({
  dynasty,
  index,
  onClick,
}: {
  dynasty: Dynasty;
  index: number;
  onClick: () => void;
}) => {
  const isEven = index % 2 === 0;
  return (
    <div className={`flex flex-col items-center ${isEven ? "mt-0" : "mt-16"} group`}>
      {/* Connector line */}
      <div className="w-0.5 h-8 bg-gold/60" />
      {/* Card */}
      <button
        onClick={onClick}
        className="relative w-44 sm:w-52 rounded-xl border-2 border-gold/40 bg-card shadow-lg hover:shadow-xl hover:border-gold hover:scale-105 transition-all duration-300 overflow-hidden text-left"
        style={{ background: dynasty.bgGradient }}
      >
        <div className="p-4">
          <div className="text-4xl font-serif-sc font-black text-primary-foreground drop-shadow-lg">
            {dynasty.name}
          </div>
          <div className="mt-1 text-xs text-primary-foreground/80 font-sans-sc">
            {dynasty.period}
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            {dynasty.keyFigures.slice(0, 2).map((f) => (
              <span
                key={f.name}
                className="text-xs bg-black/20 text-primary-foreground/90 px-1.5 py-0.5 rounded-full"
              >
                {f.name}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Star className="w-4 h-4 text-gold fill-gold" />
        </div>
      </button>
      {/* Bottom connector */}
      <div className="w-0.5 h-8 bg-gold/60" />
    </div>
  );
};

const DynastyDetail = ({
  dynasty,
  onClose,
}: {
  dynasty: Dynasty;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-gold/30 bg-card shadow-2xl animate-fade-in">
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-start justify-between p-5 rounded-t-2xl"
          style={{ background: dynasty.bgGradient }}
        >
          <div>
            <div className="text-5xl font-serif-sc font-black text-primary-foreground">
              {dynasty.name}朝
            </div>
            <div className="text-primary-foreground/80 text-sm mt-1 font-sans-sc">
              {dynasty.nameEn} Dynasty · {dynasty.period}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-primary-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Description */}
          <div className="bg-secondary/60 rounded-xl p-4 border border-border">
            <p className="text-foreground leading-relaxed font-sans-sc text-sm">
              {dynasty.description}
            </p>
          </div>

          {/* Capital */}
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="w-4 h-4 text-vermilion mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-muted-foreground">都城：</span>
              <span className="text-foreground">{dynasty.capital}</span>
            </div>
          </div>

          {/* Key Figures */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-gold" />
              <h3 className="font-serif-sc font-bold text-foreground">重要人物</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {dynasty.keyFigures.map((figure) => (
                <div
                  key={figure.name}
                  className="flex items-start gap-2 bg-secondary/40 rounded-lg p-3 border border-border"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                    {figure.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground">{figure.name}</div>
                    <div className="text-xs text-muted-foreground">{figure.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-gold" />
              <h3 className="font-serif-sc font-bold text-foreground">重要成就</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {dynasty.achievements.map((a) => (
                <span
                  key={a}
                  className="text-xs bg-accent/20 text-accent-foreground border border-accent/30 px-3 py-1.5 rounded-full font-sans-sc"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Neighbors */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-jade" />
              <h3 className="font-serif-sc font-bold text-foreground">与邻国的关系</h3>
            </div>
            <div className="space-y-2">
              {dynasty.neighbors.map((n) => (
                <div
                  key={n.kingdom}
                  className="bg-secondary/30 rounded-lg p-3 border border-border"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-primary">{n.kingdom}</span>
                  </div>
                  <p className="text-xs text-foreground leading-relaxed">{n.relation}</p>
                  {n.culturalExchange && (
                    <p className="text-xs text-jade mt-1 italic">
                      💡 {n.culturalExchange}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DynastyTimeline() {
  const [selected, setSelected] = useState<Dynasty | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="text-center py-10 px-4 pattern-chinese border-b border-border">
        <h1 className="text-4xl sm:text-5xl font-serif-sc font-black text-primary">
          朝代时间线
        </h1>
        <p className="mt-2 text-muted-foreground font-sans-sc text-sm sm:text-base">
          从夏朝到唐朝 · 点击朝代卡片了解详情
        </p>
        <div className="mt-3 flex justify-center gap-2">
          <span className="text-xs bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full">
            约前2070年
          </span>
          <span className="text-xs text-muted-foreground self-center">━━━━━</span>
          <span className="text-xs bg-accent/20 text-accent-foreground border border-accent/30 px-3 py-1 rounded-full">
            公元907年
          </span>
        </div>
      </div>

      {/* Timeline Scroll Container */}
      <div className="relative overflow-x-auto scrollbar-hide pb-16">
        {/* Central horizontal line */}
        <div className="absolute left-8 right-8 top-1/2 h-0.5 bg-gradient-to-r from-earth via-gold to-earth opacity-50 pointer-events-none" />

        {/* Dynasty cards */}
        <div className="flex items-start gap-2 px-8 py-4 w-max mx-auto min-h-[360px] relative">
          {dynasties.map((dynasty, index) => (
            <DynastyCard
              key={dynasty.id}
              dynasty={dynasty}
              index={index}
              onClick={() => setSelected(dynasty)}
            />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="fixed bottom-24 left-0 right-0 flex justify-center pointer-events-none">
        <div className="bg-card/90 backdrop-blur-sm border border-border text-muted-foreground text-xs px-4 py-2 rounded-full shadow-md animate-bounce">
          ← 左右滑动查看所有朝代 →
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <DynastyDetail dynasty={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
