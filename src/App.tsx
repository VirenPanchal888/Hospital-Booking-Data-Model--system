
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
import { AuthProvider, UserRole } from "./contexts/AuthContext";
import RequireAuth from "./components/auth/RequireAuth";

import PatientVitals from "./pages/PatientVitals";
import DatabaseManagement from "./pages/DatabaseManagement";
import MedicalTests from "./pages/MedicalTests";
import TreatmentPlans from "./pages/TreatmentPlans";
import NursingTasks from "./pages/NursingTasks";
import StaffDirectory from "./pages/StaffDirectory";
import PatientReferrals from "./pages/PatientReferrals";
import MedicalLibrary from "./pages/MedicalLibrary";
import ClinicalPathways from "./pages/ClinicalPathways";

// Define role-based access for each route
const allRoles: UserRole[] = ['admin', 'doctor', 'nurse', 'patient', 'receptionist', 'pharmacist', 'lab_technician', 'finance'];
const medicalStaff: UserRole[] = ['admin', 'doctor', 'nurse'];
const clinicalStaff: UserRole[] = ['admin', 'doctor', 'nurse', 'lab_technician'];
const adminRoles: UserRole[] = ['admin', 'receptionist'];
const financeRoles: UserRole[] = ['admin', 'finance'];
const pharmacyRoles: UserRole[] = ['admin', 'pharmacist'];
const nurseRoles: UserRole[] = ['admin', 'nurse'];
const doctorRoles: UserRole[] = ['admin', 'doctor'];
const emergencyRoles: UserRole[] = ['admin', 'doctor', 'nurse', 'receptionist'];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

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

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 }
};

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route path="/" element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }>
            <Route index element={<Dashboard />} />
            
            {/* Patient Management */}
            <Route path="patients" element={
              <RequireAuth allowedRoles={[...medicalStaff, 'receptionist']}>
                <Patients />
              </RequireAuth>
            } />
            <Route path="patients/:id" element={
              <RequireAuth allowedRoles={[...medicalStaff, 'receptionist']}>
                <PatientDetails />
              </RequireAuth>
            } />
            <Route path="patient-history/:id" element={
              <RequireAuth allowedRoles={clinicalStaff}>
                <PatientHistory />
              </RequireAuth>
            } />
            <Route path="patient-monitoring" element={
              <RequireAuth allowedRoles={[...medicalStaff, 'patient']}>
                <PatientMonitoring />
              </RequireAuth>
            } />
            <Route path="patient-vitals/:id" element={
              <RequireAuth allowedRoles={clinicalStaff}>
                <PatientVitals />
              </RequireAuth>
            } />
            <Route path="patient-referrals" element={
              <RequireAuth allowedRoles={[...doctorRoles, 'receptionist']}>
                <PatientReferrals />
              </RequireAuth>
            } />
            
            {/* Staff Management */}
            <Route path="doctors" element={
              <RequireAuth allowedRoles={[...adminRoles, ...medicalStaff]}>
                <Doctors />
              </RequireAuth>
            } />
            <Route path="doctors/:id" element={
              <RequireAuth allowedRoles={[...adminRoles, ...medicalStaff]}>
                <DoctorDetails />
              </RequireAuth>
            } />
            <Route path="staff-scheduling" element={
              <RequireAuth allowedRoles={adminRoles}>
                <StaffScheduling />
              </RequireAuth>
            } />
            <Route path="staff-directory" element={
              <RequireAuth allowedRoles={allRoles}>
                <StaffDirectory />
              </RequireAuth>
            } />
            
            {/* Appointments */}
            <Route path="appointments" element={
              <RequireAuth allowedRoles={allRoles}>
                <Appointments />
              </RequireAuth>
            } />
            <Route path="new-appointment" element={
              <RequireAuth allowedRoles={[...adminRoles, ...medicalStaff, 'patient']}>
                <NewAppointment />
              </RequireAuth>
            } />
            <Route path="telemedicine" element={
              <RequireAuth allowedRoles={[...medicalStaff, 'patient']}>
                <Telemedicine />
              </RequireAuth>
            } />
            
            {/* Billing & Finance */}
            <Route path="billing" element={
              <RequireAuth allowedRoles={financeRoles}>
                <Billing />
              </RequireAuth>
            } />
            <Route path="invoices" element={
              <RequireAuth allowedRoles={financeRoles}>
                <Invoices />
              </RequireAuth>
            } />
            <Route path="invoices/:id" element={
              <RequireAuth allowedRoles={financeRoles}>
                <InvoiceDetails />
              </RequireAuth>
            } />
            <Route path="payment-processing" element={
              <RequireAuth allowedRoles={financeRoles}>
                <PaymentProcessing />
              </RequireAuth>
            } />
            <Route path="insurance-claims" element={
              <RequireAuth allowedRoles={financeRoles}>
                <InsuranceClaims />
              </RequireAuth>
            } />
            
            {/* Medical Records */}
            <Route path="medical-records" element={
              <RequireAuth allowedRoles={clinicalStaff}>
                <MedicalRecords />
              </RequireAuth>
            } />
            <Route path="lab-results" element={
              <RequireAuth allowedRoles={[...clinicalStaff, 'patient']}>
                <LabResults />
              </RequireAuth>
            } />
            <Route path="prescriptions" element={
              <RequireAuth allowedRoles={[...clinicalStaff, 'patient', 'pharmacist']}>
                <Prescriptions />
              </RequireAuth>
            } />
            <Route path="medical-tests" element={
              <RequireAuth allowedRoles={[...clinicalStaff, 'lab_technician']}>
                <MedicalTests />
              </RequireAuth>
            } />
            <Route path="treatment-plans" element={
              <RequireAuth allowedRoles={[...doctorRoles, 'patient']}>
                <TreatmentPlans />
              </RequireAuth>
            } />
            
            {/* Pharmacy */}
            <Route path="pharmacy" element={
              <RequireAuth allowedRoles={pharmacyRoles}>
                <Pharmacy />
              </RequireAuth>
            } />
            <Route path="inventory" element={
              <RequireAuth allowedRoles={pharmacyRoles}>
                <Inventory />
              </RequireAuth>
            } />
            <Route path="medication-request" element={
              <RequireAuth allowedRoles={[...pharmacyRoles, ...medicalStaff]}>
                <MedicationRequest />
              </RequireAuth>
            } />
            
            {/* Analytics & Reporting */}
            <Route path="analytics" element={
              <RequireAuth allowedRoles={['admin', 'finance', 'doctor']}>
                <Analytics />
              </RequireAuth>
            } />
            <Route path="report-builder" element={
              <RequireAuth allowedRoles={['admin', 'finance']}>
                <ReportBuilder />
              </RequireAuth>
            } />
            <Route path="performance-metrics" element={
              <RequireAuth allowedRoles={['admin']}>
                <PerformanceMetrics />
              </RequireAuth>
            } />
            <Route path="database-management" element={
              <RequireAuth allowedRoles={['admin']}>
                <DatabaseManagement />
              </RequireAuth>
            } />
            
            {/* Emergency Services */}
            <Route path="ambulance-request" element={
              <RequireAuth allowedRoles={emergencyRoles}>
                <AmbulanceRequest />
              </RequireAuth>
            } />
            <Route path="ambulance-tracking" element={
              <RequireAuth allowedRoles={emergencyRoles}>
                <AmbulanceTracking />
              </RequireAuth>
            } />
            <Route path="emergency-services" element={
              <RequireAuth allowedRoles={emergencyRoles}>
                <EmergencyServices />
              </RequireAuth>
            } />
            
            {/* Nursing */}
            <Route path="nursing-tasks" element={
              <RequireAuth allowedRoles={nurseRoles}>
                <NursingTasks />
              </RequireAuth>
            } />
            
            {/* AI Features */}
            <Route path="get-prediction" element={
              <RequireAuth allowedRoles={doctorRoles}>
                <GetPrediction />
              </RequireAuth>
            } />
            
            {/* Medical Resources */}
            <Route path="medical-library" element={
              <RequireAuth allowedRoles={allRoles}>
                <MedicalLibrary />
              </RequireAuth>
            } />
            <Route path="clinical-pathways" element={
              <RequireAuth allowedRoles={clinicalStaff}>
                <ClinicalPathways />
              </RequireAuth>
            } />
            
            {/* User Settings */}
            <Route path="profile" element={
              <RequireAuth allowedRoles={allRoles}>
                <UserProfile />
              </RequireAuth>
            } />
            <Route path="settings" element={
              <RequireAuth allowedRoles={allRoles}>
                <Settings />
              </RequireAuth>
            } />
            <Route path="notifications" element={
              <RequireAuth allowedRoles={allRoles}>
                <Notifications />
              </RequireAuth>
            } />
          </Route>
          
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
