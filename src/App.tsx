
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Devices from "./pages/Devices";
import Automation from "./pages/Automation";
import NotFound from "./pages/NotFound";

import Signup from "./pages/Signup/Signup";
import Login from "./pages/login/Login";
import Settings from "./pages/Settings/Settings";
import Devicepanel from "./pages/Devicepanel.tsx/Devicepanel";
import DashboardPage from "./pages/Dashboard/Dashboard";

// import Controlpanel from "./pages/Controlpanel.tsx/Controlpanel";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* <Route path="/devices" element={<Devices />} /> */}
            <Route path="/automation" element={<Automation />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/devices" element={<Devicepanel />} />
            <Route path="/DashboardPage" element={<DashboardPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
