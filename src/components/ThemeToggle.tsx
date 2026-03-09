import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-2 right-20 z-[9999] w-8 h-8 flex items-center justify-center rounded-full bg-card/60 backdrop-blur-sm border border-border hover:bg-card transition-all duration-300 text-base select-none"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
