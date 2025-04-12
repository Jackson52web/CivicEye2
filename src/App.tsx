
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IssueProvider } from "@/contexts/IssueContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import IssueDetail from "./pages/IssueDetail";
import IssueReporting from "./pages/IssueReporting";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <IssueProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/issues" element={<Index />} />
            <Route path="/issues/:id" element={<IssueDetail />} />
            <Route path="/report" element={<IssueReporting />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </IssueProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
