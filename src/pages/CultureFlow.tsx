import { useState } from "react";
import { cultureItems, CultureItem } from "@/data/historyData";
import { X, ArrowRight } from "lucide-react";

const countryColors = {
  china: { bg: "bg-primary", border: "border-primary", text: "text-primary-foreground", label: "bg-primary/10 text-primary border-primary/30" },
  korea: { bg: "bg-jade", border: "border-jade", text: "text-white", label: "bg-jade/10 text-jade border-jade/30" },
  japan: { bg: "bg-accent", border: "border-accent", text: "text-accent-foreground", label: "bg-accent/20 text-accent-foreground border-accent/30" },
};

const COUNTRY_FLAGS = { china: "🇨🇳", korea: "🇰🇷", japan: "🇯🇵" };

function CultureDetail({ item, onClose }: { item: CultureItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-gold/30 bg-card shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-5 bg-primary rounded-t-2xl">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{item.icon}</span>
            <div>
              <h2 className="text-2xl font-serif-sc font-black text-primary-foreground">{item.name}</h2>
              <p className="text-xs text-primary-foreground/70">{item.period}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-primary-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Overview */}
          <p className="text-sm text-foreground leading-relaxed font-sans-sc bg-secondary/50 rounded-xl p-4 border border-border">
            {item.description}
          </p>

          {/* Flow: China → Korea → Japan */}
          <div className="space-y-3">
            {[
              { flag: COUNTRY_FLAGS.china, country: "中国（起源）", content: item.chinaOrigin, colorClass: countryColors.china },
              { flag: COUNTRY_FLAGS.korea, country: "朝鲜半岛（传播）", content: item.koreaSpread, colorClass: countryColors.korea },
              { flag: COUNTRY_FLAGS.japan, country: "日本（传入）", content: item.japanSpread, colorClass: countryColors.japan },
            ].map((step, i) => (
              <div key={step.country}>
                <div className={`rounded-xl border-2 ${step.colorClass.border} bg-background p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{step.flag}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${step.colorClass.label}`}>{step.country}</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{step.content}</p>
                </div>
                {i < 2 && (
                  <div className="flex justify-center my-1">
                    <ArrowRight className="w-5 h-5 text-gold rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Significance */}
          <div className="bg-accent/15 border border-accent/30 rounded-xl p-4">
            <div className="text-xs font-bold text-accent-foreground mb-1">💡 历史意义</div>
            <p className="text-sm text-foreground leading-relaxed">{item.significance}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CultureCard({ item, onClick }: { item: CultureItem; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-border bg-card hover:border-gold hover:shadow-lg hover:scale-105 transition-all duration-300 text-center w-full"
    >
      <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-3xl group-hover:bg-primary/20 transition-colors">
        {item.icon}
      </div>
      <div className="font-serif-sc font-bold text-lg text-foreground">{item.name}</div>
      <div className="text-xs text-muted-foreground">{item.period}</div>
      <div className="flex items-center gap-1 text-xs text-gold font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        点击了解详情 <ArrowRight className="w-3 h-3" />
      </div>
    </button>
  );
}

// Visual flow map component
function FlowDiagram({ onSelect }: { onSelect: (id: string) => void }) {
  const icons = cultureItems.map(i => ({ id: i.id, icon: i.icon, name: i.name }));

  return (
    <div className="relative w-full max-w-2xl mx-auto px-4">
      {/* Country boxes */}
      <div className="flex flex-col gap-0 items-stretch">
        {/* China */}
        <div className="relative bg-primary/10 border-2 border-primary rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🇨🇳</span>
            <span className="font-serif-sc font-black text-xl text-primary">中国</span>
            <span className="text-xs text-muted-foreground ml-auto">文化源头</span>
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {icons.map(item => (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className="flex flex-col items-center gap-1 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-xl px-3 py-2 transition-all hover:scale-110"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-bold text-primary">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Arrow down */}
        <div className="flex flex-col items-center py-2 gap-1">
          <div className="w-px h-4 bg-gold/60" />
          <div className="text-xs text-gold font-bold px-3 py-1 bg-accent/20 border border-gold/30 rounded-full">
            文化传播 ➜
          </div>
          <div className="w-px h-4 bg-gold/60" />
        </div>

        {/* Korea */}
        <div className="bg-jade/10 border-2 border-jade rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🇰🇷</span>
            <span className="font-serif-sc font-black text-xl text-jade">朝鲜半岛</span>
            <span className="text-xs text-muted-foreground ml-auto">文化中继</span>
          </div>
          <p className="text-sm text-foreground/80">
            高句丽、百济、新罗三国吸收中国文化，<br />
            并将其进一步传播至日本列岛
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {["高句丽", "百济", "新罗", "渤海", "伽倻"].map(k => (
              <span key={k} className="text-xs bg-jade/10 text-jade border border-jade/30 px-2 py-0.5 rounded-full">{k}</span>
            ))}
          </div>
        </div>

        {/* Arrow down */}
        <div className="flex flex-col items-center py-2 gap-1">
          <div className="w-px h-4 bg-gold/60" />
          <div className="text-xs text-gold font-bold px-3 py-1 bg-accent/20 border border-gold/30 rounded-full">
            跨海传播 ➜
          </div>
          <div className="w-px h-4 bg-gold/60" />
        </div>

        {/* Japan */}
        <div className="bg-accent/10 border-2 border-accent rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🇯🇵</span>
            <span className="font-serif-sc font-black text-xl text-accent-foreground">日本</span>
            <span className="text-xs text-muted-foreground ml-auto">文化融合</span>
          </div>
          <p className="text-sm text-foreground/80">
            大化改新后，遣唐使大规模引入中国文化，<br />
            与本土文化融合，形成独特的日本文明
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CultureFlow() {
  const [selected, setSelected] = useState<CultureItem | null>(null);

  const handleSelect = (id: string) => {
    const item = cultureItems.find(c => c.id === id);
    if (item) setSelected(item);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="text-center py-10 px-4 pattern-chinese border-b border-border">
        <h1 className="text-4xl sm:text-5xl font-serif-sc font-black text-primary">
          文化传播
        </h1>
        <p className="mt-2 text-muted-foreground font-sans-sc text-sm sm:text-base">
          中华文化如何传播到朝鲜半岛与日本
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">
        {/* Flow diagram */}
        <FlowDiagram onSelect={handleSelect} />

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm text-muted-foreground font-serif-sc">点击了解每项文化的传播历程</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Culture item cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {cultureItems.map(item => (
            <CultureCard key={item.id} item={item} onClick={() => handleSelect(item.id)} />
          ))}
        </div>
      </div>

      {/* Detail modal */}
      {selected && <CultureDetail item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
