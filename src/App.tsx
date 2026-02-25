import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppProvider } from "@/contexts/AppContext";
import Auth from "@/pages/Auth";
import MainLayout from "@/components/MainLayout";

const AppContent = () => {
  const { user } = useAuth();
  return user ? (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  ) : (
    <Auth />
  );
};

const App = () => (
  <AuthProvider>
    <TooltipProvider>
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </AuthProvider>
);

export default App;
