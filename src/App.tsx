import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
