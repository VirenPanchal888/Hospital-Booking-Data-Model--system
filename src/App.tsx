
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import NewAppointment from "./pages/NewAppointment";
import Billing from "./pages/Billing";
import MedicalRecords from "./pages/MedicalRecords";
import Pharmacy from "./pages/Pharmacy";
import Analytics from "./pages/Analytics";
import AmbulanceRequest from "./pages/AmbulanceRequest";
import GetPrediction from "./pages/GetPrediction";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import WelcomeAnimation from "./components/animations/WelcomeAnimation";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading, showWelcomeAnimation, setShowWelcomeAnimation } = useAuth();
  
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">
      <div className="animate-pulse-soft">Loading...</div>
    </div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (showWelcomeAnimation) {
    return <WelcomeAnimation onComplete={() => setShowWelcomeAnimation(false)} />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="new-appointment" element={<NewAppointment />} />
          <Route path="billing" element={<Billing />} />
          <Route path="medical-records" element={<MedicalRecords />} />
          <Route path="pharmacy" element={<Pharmacy />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="ambulance-request" element={<AmbulanceRequest />} />
          <Route path="get-prediction" element={<GetPrediction />} />
        </Route>
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppRoutes />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
