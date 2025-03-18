
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
import PatientDetails from "./pages/PatientDetails";
import Doctors from "./pages/Doctors";
import DoctorDetails from "./pages/DoctorDetails";
import Appointments from "./pages/Appointments";
import NewAppointment from "./pages/NewAppointment";
import Billing from "./pages/Billing";
import Invoices from "./pages/Invoices";
import InvoiceDetails from "./pages/InvoiceDetails";
import PaymentProcessing from "./pages/PaymentProcessing";
import InsuranceClaims from "./pages/InsuranceClaims";
import MedicalRecords from "./pages/MedicalRecords";
import PatientHistory from "./pages/PatientHistory";
import LabResults from "./pages/LabResults";
import Prescriptions from "./pages/Prescriptions";
import Pharmacy from "./pages/Pharmacy";
import Inventory from "./pages/Inventory";
import MedicationRequest from "./pages/MedicationRequest";
import Analytics from "./pages/Analytics";
import ReportBuilder from "./pages/ReportBuilder";
import PerformanceMetrics from "./pages/PerformanceMetrics";
import StaffScheduling from "./pages/StaffScheduling";
import AmbulanceRequest from "./pages/AmbulanceRequest";
import AmbulanceTracking from "./pages/AmbulanceTracking";
import EmergencyServices from "./pages/EmergencyServices";
import GetPrediction from "./pages/GetPrediction";
import PatientMonitoring from "./pages/PatientMonitoring";
import Telemedicine from "./pages/Telemedicine";
import UserProfile from "./pages/UserProfile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import SplashScreen from "./components/SplashScreen";
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/auth/RequireAuth";

// New page imports
import PatientVitals from "./pages/PatientVitals";
import DatabaseManagement from "./pages/DatabaseManagement";
import MedicalTests from "./pages/MedicalTests";
import TreatmentPlans from "./pages/TreatmentPlans";
import NursingTasks from "./pages/NursingTasks";
import StaffDirectory from "./pages/StaffDirectory";
import PatientReferrals from "./pages/PatientReferrals";

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
        className="flex min-h-screen flex-col"
      >
        <Routes location={location}>
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected routes */}
          <Route path="/" element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }>
            <Route index element={<Dashboard />} />
            
            {/* Patient management */}
            <Route path="patients" element={<Patients />} />
            <Route path="patients/:id" element={<PatientDetails />} />
            <Route path="patient-history/:id" element={<PatientHistory />} />
            <Route path="patient-monitoring" element={<PatientMonitoring />} />
            <Route path="patient-vitals/:id" element={<PatientVitals />} />
            <Route path="patient-referrals" element={<PatientReferrals />} />
            
            {/* Doctor management */}
            <Route path="doctors" element={<Doctors />} />
            <Route path="doctors/:id" element={<DoctorDetails />} />
            <Route path="staff-scheduling" element={<StaffScheduling />} />
            <Route path="staff-directory" element={<StaffDirectory />} />
            
            {/* Appointment management */}
            <Route path="appointments" element={<Appointments />} />
            <Route path="new-appointment" element={<NewAppointment />} />
            <Route path="telemedicine" element={<Telemedicine />} />
            
            {/* Billing and finances */}
            <Route path="billing" element={<Billing />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="invoices/:id" element={<InvoiceDetails />} />
            <Route path="payment-processing" element={<PaymentProcessing />} />
            <Route path="insurance-claims" element={<InsuranceClaims />} />
            
            {/* Medical records */}
            <Route path="medical-records" element={<MedicalRecords />} />
            <Route path="lab-results" element={<LabResults />} />
            <Route path="prescriptions" element={<Prescriptions />} />
            <Route path="medical-tests" element={<MedicalTests />} />
            <Route path="treatment-plans" element={<TreatmentPlans />} />
            
            {/* Pharmacy and inventory */}
            <Route path="pharmacy" element={<Pharmacy />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="medication-request" element={<MedicationRequest />} />
            
            {/* Analytics and reporting */}
            <Route path="analytics" element={<Analytics />} />
            <Route path="report-builder" element={<ReportBuilder />} />
            <Route path="performance-metrics" element={<PerformanceMetrics />} />
            <Route path="database-management" element={<DatabaseManagement />} />
            
            {/* Emergency services */}
            <Route path="ambulance-request" element={<AmbulanceRequest />} />
            <Route path="ambulance-tracking" element={<AmbulanceTracking />} />
            <Route path="emergency-services" element={<EmergencyServices />} />
            
            {/* Nursing */}
            <Route path="nursing-tasks" element={<NursingTasks />} />
            
            {/* AI and predictions */}
            <Route path="get-prediction" element={<GetPrediction />} />
            
            {/* User profile and settings */}
            <Route path="profile" element={<UserProfile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="notifications" element={<Notifications />} />
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
