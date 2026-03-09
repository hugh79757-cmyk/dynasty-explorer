import { useState, useCallback } from "react";
import { quizQuestions } from "@/data/historyData";
import { CheckCircle, XCircle, Trophy, RotateCcw, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Phase = "intro" | "quiz" | "result";

const TOTAL = quizQuestions.length;

function getScoreMessage(score: number): { emoji: string; title: string; msg: string } {
  const pct = score / TOTAL;
  if (pct === 1) return { emoji: "🏆", title: "满分！历史天才！", msg: "太厉害了！你对中国古代历史了如指掌，连周边国家的关系都掌握得非常清楚！继续保持这份热情！" };
  if (pct >= 0.85) return { emoji: "🌟", title: "非常优秀！", msg: "你对中国历史的掌握非常深入，对东亚文化交流也有很好的了解。稍加努力就能达到满分！" };
  if (pct >= 0.7) return { emoji: "👍", title: "很不错！", msg: "你已经掌握了大部分中国历史知识！多回顾一下细节，相信下次一定能取得更高分数！" };
  if (pct >= 0.5) return { emoji: "📚", title: "继续加油！", msg: "基础不错，但还有提升空间。不妨重新翻阅一下朝代时间线和文化传播图，相信你下次会进步很多！" };
  return { emoji: "💪", title: "再接再厉！", msg: "历史学习是一段旅程，不要灰心！多看看朝代时间线，积累知识，下次一定会有大进步！加油！" };
}

export default function HistoryQuiz() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(TOTAL).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);

  const current = quizQuestions[currentIndex];
  const score = answers.filter((a, i) => a === quizQuestions[i].correctIndex).length;

  const handleOption = useCallback((optIndex: number) => {
    if (selected !== null) return;
    setSelected(optIndex);
    setAnswers(prev => {
      const next = [...prev];
      next[currentIndex] = optIndex;
      return next;
    });
    setShowExplanation(true);
  }, [selected, currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < TOTAL - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setPhase("result");
    }
  }, [currentIndex]);

  const handleRestart = useCallback(() => {
    setPhase("intro");
    setCurrentIndex(0);
    setSelected(null);
    setAnswers(Array(TOTAL).fill(null));
    setShowExplanation(false);
  }, []);

  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="text-center py-10 px-4 pattern-chinese border-b border-border">
          <h1 className="text-4xl sm:text-5xl font-serif-sc font-black text-primary">历史问答</h1>
          <p className="mt-2 text-muted-foreground font-sans-sc text-sm">测试你的中国古代历史知识</p>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="text-7xl animate-float">🏛️</div>
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-lg">
              <h2 className="font-serif-sc font-bold text-2xl text-foreground">准备好了吗？</h2>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>📝 共 <strong className="text-foreground">20道题</strong>，涵盖中国古代历史</p>
                <p>🌏 包含中国与朝鲜、日本的文化交流</p>
                <p>💡 每题答完后会显示解析</p>
                <p>🏆 最终给出成绩与鼓励</p>
              </div>
              <Button
                className="w-full h-12 text-lg font-serif-sc font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                onClick={() => setPhase("quiz")}
              >
                开始答题！
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "result") {
    const { emoji, title, msg } = getScoreMessage(score);
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="text-center py-10 px-4 pattern-chinese border-b border-border">
          <h1 className="text-4xl sm:text-5xl font-serif-sc font-black text-primary">答题完成</h1>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="text-6xl animate-float">{emoji}</div>
            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg space-y-4">
              <h2 className="font-serif-sc font-bold text-2xl text-foreground">{title}</h2>
              {/* Score display */}
              <div className="relative w-36 h-36 mx-auto">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke="hsl(var(--primary))" strokeWidth="3"
                    strokeDasharray={`${(score / TOTAL) * 100} 100`}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dasharray 1s ease" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black font-serif-sc text-primary">{score}</span>
                  <span className="text-sm text-muted-foreground">/ {TOTAL}</span>
                </div>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{msg}</p>
              {/* Breakdown */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-2">
                  <div className="font-bold text-green-600 text-lg">{score}</div>
                  <div className="text-muted-foreground">答对</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2">
                  <div className="font-bold text-red-500 text-lg">{TOTAL - score}</div>
                  <div className="text-muted-foreground">答错</div>
                </div>
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-2">
                  <div className="font-bold text-primary text-lg">{Math.round((score / TOTAL) * 100)}%</div>
                  <div className="text-muted-foreground">正确率</div>
                </div>
              </div>
              <Button
                onClick={handleRestart}
                className="w-full h-11 font-serif-sc font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                再来一次
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz phase
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with progress */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span className="font-bold text-foreground">第 {currentIndex + 1} 题 / {TOTAL}</span>
            <span>已答对：{score} 题</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex) / TOTAL) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-6 space-y-5">
        {/* Question */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm animate-fade-in">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-black flex items-center justify-center shrink-0">
              {currentIndex + 1}
            </span>
            <p className="text-base font-serif-sc font-semibold text-foreground leading-relaxed pt-0.5">
              {current.question}
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {current.options.map((opt, i) => {
            const isSelected = selected === i;
            const isCorrect = i === current.correctIndex;
            const showResult = selected !== null;

            let optClass = "border-border bg-card hover:border-gold hover:bg-secondary/50";
            if (showResult && isCorrect) optClass = "border-green-500 bg-green-500/10";
            else if (showResult && isSelected && !isCorrect) optClass = "border-red-500 bg-red-500/10";
            else if (!showResult) optClass = "border-border bg-card hover:border-gold hover:bg-secondary/50 cursor-pointer";

            return (
              <button
                key={i}
                onClick={() => handleOption(i)}
                disabled={selected !== null}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-left ${optClass}`}
              >
                <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm font-sans-sc text-foreground">{opt}</span>
                {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-green-500 ml-auto shrink-0" />}
                {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500 ml-auto shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="bg-secondary/60 border border-border rounded-xl p-4 animate-fade-in">
            <div className="flex items-start gap-2">
              <span className="text-lg shrink-0">
                {selected === current.correctIndex ? "✅" : "📖"}
              </span>
              <div>
                <div className="text-xs font-bold text-muted-foreground mb-1">解析</div>
                <p className="text-sm text-foreground leading-relaxed">{current.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Next button */}
        {selected !== null && (
          <Button
            onClick={handleNext}
            className="w-full h-12 font-serif-sc font-bold text-base bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl flex items-center justify-center gap-2 animate-fade-in"
          >
            {currentIndex < TOTAL - 1 ? (
              <>下一题 <ChevronRight className="w-5 h-5" /></>
            ) : (
              <><Trophy className="w-5 h-5" /> 查看成绩</>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
