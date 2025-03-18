
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
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
import SplashScreen from "./components/SplashScreen";
import { AuthProvider } from "./contexts/AuthContext";

// Create Query Client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Main application with splash screen
const AppWithSplash = () => {
  const [showSplash, setShowSplash] = useState(true);
  
  const handleSplashComplete = () => {
    setShowSplash(false);
  };
  
  return (
    <>
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <AnimatedRoutes />
      )}
    </>
  );
};

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 }
};

// Animated routes component
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes */}
          <Route path="/" element={<Layout />}>
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
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <BrowserRouter>
          <AppWithSplash />
        </BrowserRouter>
        <Toaster />
        <Sonner position="top-right" closeButton />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
