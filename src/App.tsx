import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import Index, { NavBar } from "./pages/Index";
import DynastyTimeline from "./pages/DynastyTimeline";
import CultureFlow from "./pages/CultureFlow";
import CultureSpreadMap from "./pages/CultureSpreadMap";
import HistoryQuiz from "./pages/HistoryQuiz";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const { pathname } = useLocation();
  const showNavBar = pathname !== "/";

  return (
    <>
      <ThemeToggle />
      <span
        className="fixed top-2 right-3 z-[9999] text-[11px] text-muted-foreground/40 hover:text-muted-foreground/90 transition-all duration-300 pointer-events-auto select-none"
      >
        성찬이를 위해, 아빠가 ❤️
      </span>
      <div className={showNavBar ? "pb-16" : ""}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dynasty-timeline" element={<DynastyTimeline />} />
          <Route path="/culture-flow" element={<CultureFlow />} />
          <Route path="/culture-map" element={<CultureSpreadMap />} />
          <Route path="/history-quiz" element={<HistoryQuiz />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {showNavBar && <NavBar />}
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/dynasty-explorer">
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
