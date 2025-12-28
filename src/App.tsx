import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import LogDay from "./pages/LogDay";
import DaysPage from "./pages/DaysPage";
import PhotoImportPage from "./pages/PhotoImportPage";
import TextImportPage from "./pages/TextImportPage";
import AccountPage from "./pages/AccountPage";
import ExportPage from "./pages/ExportPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import GoogleCallbackPage from "./pages/GoogleCallbackPage";
import SharedDayPage from "./pages/SharedDayPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppLayout = () => (
  <SidebarProvider>
    <div className="min-h-screen w-full relative">
      <AppSidebar />
      <main className="w-full min-h-screen flex flex-col">
        <header className="sticky top-0 z-10 h-14 border-b bg-background flex items-center px-4">
          <SidebarTrigger />
        </header>
        <div className="flex-1">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/log" element={<LogDay />} />
            <Route path="/days" element={<DaysPage />} />
            <Route path="/import" element={<PhotoImportPage />} />
            <Route path="/import/text" element={<TextImportPage />} />
            <Route path="/export" element={<ExportPage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </div>
      </main>
    </div>
  </SidebarProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes without sidebar */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/auth/google/callback" element={<GoogleCallbackPage />} />
          <Route path="/s/:dayId" element={<SharedDayPage />} />
          
          {/* App routes with sidebar */}
          <Route path="/dashboard" element={<AppLayout />} />
          <Route path="/log" element={<AppLayout />} />
          <Route path="/days" element={<AppLayout />} />
          <Route path="/import" element={<AppLayout />} />
          <Route path="/import/text" element={<AppLayout />} />
          <Route path="/export" element={<AppLayout />} />
          <Route path="/integrations" element={<AppLayout />} />
          <Route path="/account" element={<AppLayout />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
