
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, Users, UserCog, Calendar, PlusCircle, 
  Receipt, FileText, PillIcon, BarChart3, Ambulance,
  LogOut, Brain, Settings, Moon, Sun, ThermometerIcon,
  Database, TestTube, ClipboardList, Stethoscope, UserPlus,
  HeartPulse, List, Activity, ScrollText, Building2,
  BookOpen, Route
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';

// Sidebar link type
interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isPro?: boolean;
  isActive: boolean;
  onClick?: () => void;
}

// Sidebar link component with animations
const SidebarLink: React.FC<SidebarLinkProps> = ({ 
  href, 
  icon, 
  label, 
  isPro = false,
  isActive,
  onClick 
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "sidebar-link group relative flex items-center w-full rounded-md p-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors",
        isActive ? "bg-accent text-accent-foreground font-medium" : "text-sidebar-foreground"
      )}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      {label}
      
      {isPro && (
        <span className="ml-auto flex h-5 items-center justify-center rounded-full bg-primary px-2 text-[10px] font-medium text-primary-foreground">
          PRO
        </span>
      )}
      
      {isActive && (
        <motion.span
          layoutId="sidebar-active-indicator"
          className="absolute inset-y-0 left-0 w-0.5 bg-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </Link>
  );
};

// Sidebar props
interface SidebarProps {
  isOpen: boolean;
  userRole?: string;
}

// Main sidebar component
const Sidebar: React.FC<SidebarProps> = ({ isOpen, userRole = 'admin' }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  // Determine if link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // Determine which links to show based on user role
  const showLink = (allowedRoles: string[]) => {
    return allowedRoles.includes(userRole) || userRole === 'admin';
  };
  
  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  if (!isOpen) return null;
  
  return (
    <motion.div 
      className="fixed top-16 left-0 bottom-0 w-64 flex flex-col border-r bg-sidebar text-sidebar-foreground z-20 overflow-hidden"
      initial={{ x: -240 }}
      animate={{ x: 0 }}
      exit={{ x: -240 }}
      transition={{ duration: 0.2 }}
    >
      {/* User profile section */}
      <div className="flex flex-col items-center justify-center p-4">
        <Avatar className="h-12 w-12 mb-2">
          <AvatarImage src="/placeholder.svg" alt={user?.name} />
          <AvatarFallback className="bg-primary text-primary-foreground text-xl">
            {user?.name?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
        
        <div className="text-center">
          <h3 className="font-medium text-sm">{user?.name || 'User'}</h3>
          <p className="text-xs text-sidebar-foreground/70 mt-1 capitalize">{user?.role || 'User'}</p>
        </div>
      </div>
      
      <Separator className="bg-sidebar-border" />
      
      {/* Navigation links */}
      <ScrollArea className="flex-1 py-2 px-2">
        <div className="space-y-1 mb-2">
          <p className="text-xs font-semibold text-sidebar-foreground/60 px-2 mb-1">MAIN</p>
          
          <SidebarLink 
            href="/"
            icon={<LayoutDashboard className="h-4 w-4" />}
            label="Dashboard"
            isActive={isActive('/')}
          />
          
          <Button 
            variant="ghost" 
            className="w-full flex justify-between items-center text-sm p-2"
            onClick={() => toggleSection('patients')}
          >
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-3" />
              <span>Patients</span>
            </div>
            <span>{expandedSection === 'patients' ? '-' : '+'}</span>
          </Button>
          
          {expandedSection === 'patients' && (
            <div className="pl-6 space-y-1">
              <SidebarLink 
                href="/patients"
                icon={<Users className="h-4 w-4" />}
                label="All Patients"
                isActive={isActive('/patients')}
              />
              
              <SidebarLink 
                href="/patient-monitoring"
                icon={<Activity className="h-4 w-4" />}
                label="Monitoring"
                isActive={isActive('/patient-monitoring')}
              />
              
              <SidebarLink 
                href="/patient-referrals"
                icon={<UserPlus className="h-4 w-4" />}
                label="Referrals"
                isActive={isActive('/patient-referrals')}
              />
            </div>
          )}
          
          <Button 
            variant="ghost" 
            className="w-full flex justify-between items-center text-sm p-2"
            onClick={() => toggleSection('medical')}
          >
            <div className="flex items-center">
              <Stethoscope className="h-4 w-4 mr-3" />
              <span>Medical</span>
            </div>
            <span>{expandedSection === 'medical' ? '-' : '+'}</span>
          </Button>
          
          {expandedSection === 'medical' && (
            <div className="pl-6 space-y-1">
              <SidebarLink 
                href="/treatment-plans"
                icon={<ClipboardList className="h-4 w-4" />}
                label="Treatment Plans"
                isActive={isActive('/treatment-plans')}
              />
              
              <SidebarLink 
                href="/medical-tests"
                icon={<TestTube className="h-4 w-4" />}
                label="Medical Tests"
                isActive={isActive('/medical-tests')}
              />
              
              <SidebarLink 
                href="/prescriptions"
                icon={<ScrollText className="h-4 w-4" />}
                label="Prescriptions"
                isActive={isActive('/prescriptions')}
              />
              
              <SidebarLink 
                href="/medical-records"
                icon={<FileText className="h-4 w-4" />}
                label="Medical Records"
                isActive={isActive('/medical-records')}
              />
              
              <SidebarLink 
                href="/lab-results"
                icon={<TestTube className="h-4 w-4" />}
                label="Lab Results"
                isActive={isActive('/lab-results')}
              />
              
              <SidebarLink 
                href="/clinical-pathways"
                icon={<Route className="h-4 w-4" />}
                label="Clinical Pathways"
                isActive={isActive('/clinical-pathways')}
              />
            </div>
          )}
          
          <Button 
            variant="ghost" 
            className="w-full flex justify-between items-center text-sm p-2"
            onClick={() => toggleSection('appointments')}
          >
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-3" />
              <span>Appointments</span>
            </div>
            <span>{expandedSection === 'appointments' ? '-' : '+'}</span>
          </Button>
          
          {expandedSection === 'appointments' && (
            <div className="pl-6 space-y-1">
              <SidebarLink 
                href="/appointments"
                icon={<Calendar className="h-4 w-4" />}
                label="All Appointments"
                isActive={isActive('/appointments')}
              />
              
              <SidebarLink 
                href="/new-appointment"
                icon={<PlusCircle className="h-4 w-4" />}
                label="New Appointment"
                isActive={isActive('/new-appointment')}
              />
              
              <SidebarLink 
                href="/telemedicine"
                icon={<Activity className="h-4 w-4" />}
                label="Telemedicine"
                isActive={isActive('/telemedicine')}
              />
            </div>
          )}
          
          <Button 
            variant="ghost" 
            className="w-full flex justify-between items-center text-sm p-2"
            onClick={() => toggleSection('staff')}
          >
            <div className="flex items-center">
              <UserCog className="h-4 w-4 mr-3" />
              <span>Staff</span>
            </div>
            <span>{expandedSection === 'staff' ? '-' : '+'}</span>
          </Button>
          
          {expandedSection === 'staff' && (
            <div className="pl-6 space-y-1">
              <SidebarLink 
                href="/doctors"
                icon={<UserCog className="h-4 w-4" />}
                label="Doctors"
                isActive={isActive('/doctors')}
              />
              
              <SidebarLink 
                href="/staff-directory"
                icon={<Building2 className="h-4 w-4" />}
                label="Staff Directory"
                isActive={isActive('/staff-directory')}
              />
              
              <SidebarLink 
                href="/staff-scheduling"
                icon={<Calendar className="h-4 w-4" />}
                label="Staff Scheduling"
                isActive={isActive('/staff-scheduling')}
              />
              
              <SidebarLink 
                href="/nursing-tasks"
                icon={<List className="h-4 w-4" />}
                label="Nursing Tasks"
                isActive={isActive('/nursing-tasks')}
              />
            </div>
          )}
          
          <Button 
            variant="ghost" 
            className="w-full flex justify-between items-center text-sm p-2"
            onClick={() => toggleSection('billing')}
          >
            <div className="flex items-center">
              <Receipt className="h-4 w-4 mr-3" />
              <span>Finance</span>
            </div>
            <span>{expandedSection === 'billing' ? '-' : '+'}</span>
          </Button>
          
          {expandedSection === 'billing' && (
            <div className="pl-6 space-y-1">
              <SidebarLink 
                href="/billing"
                icon={<Receipt className="h-4 w-4" />}
                label="Billing"
                isActive={isActive('/billing')}
              />
              
              <SidebarLink 
                href="/invoices"
                icon={<Receipt className="h-4 w-4" />}
                label="Invoices"
                isActive={isActive('/invoices')}
              />
              
              <SidebarLink 
                href="/payment-processing"
                icon={<Receipt className="h-4 w-4" />}
                label="Payment Processing"
                isActive={isActive('/payment-processing')}
              />
              
              <SidebarLink 
                href="/insurance-claims"
                icon={<FileText className="h-4 w-4" />}
                label="Insurance Claims"
                isActive={isActive('/insurance-claims')}
              />
            </div>
          )}
          
          <Button 
            variant="ghost" 
            className="w-full flex justify-between items-center text-sm p-2"
            onClick={() => toggleSection('pharmacy')}
          >
            <div className="flex items-center">
              <PillIcon className="h-4 w-4 mr-3" />
              <span>Pharmacy</span>
            </div>
            <span>{expandedSection === 'pharmacy' ? '-' : '+'}</span>
          </Button>
          
          {expandedSection === 'pharmacy' && (
            <div className="pl-6 space-y-1">
              <SidebarLink 
                href="/pharmacy"
                icon={<PillIcon className="h-4 w-4" />}
                label="Pharmacy"
                isActive={isActive('/pharmacy')}
              />
              
              <SidebarLink 
                href="/inventory"
                icon={<PillIcon className="h-4 w-4" />}
                label="Inventory"
                isActive={isActive('/inventory')}
              />
              
              <SidebarLink 
                href="/medication-request"
                icon={<PillIcon className="h-4 w-4" />}
                label="Medication Request"
                isActive={isActive('/medication-request')}
              />
            </div>
          )}
          
          <SidebarLink 
            href="/medical-library"
            icon={<BookOpen className="h-4 w-4" />}
            label="Medical Library"
            isActive={isActive('/medical-library')}
          />
          
          <Button 
            variant="ghost" 
            className="w-full flex justify-between items-center text-sm p-2"
            onClick={() => toggleSection('analytics')}
          >
            <div className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-3" />
              <span>Analytics</span>
            </div>
            <span>{expandedSection === 'analytics' ? '-' : '+'}</span>
          </Button>
          
          {expandedSection === 'analytics' && (
            <div className="pl-6 space-y-1">
              <SidebarLink 
                href="/analytics"
                icon={<BarChart3 className="h-4 w-4" />}
                label="Analytics Dashboard"
                isActive={isActive('/analytics')}
              />
              
              <SidebarLink 
                href="/report-builder"
                icon={<BarChart3 className="h-4 w-4" />}
                label="Report Builder"
                isActive={isActive('/report-builder')}
              />
              
              <SidebarLink 
                href="/performance-metrics"
                icon={<BarChart3 className="h-4 w-4" />}
                label="Performance Metrics"
                isActive={isActive('/performance-metrics')}
              />
            </div>
          )}
          
          <Button 
            variant="ghost" 
            className="w-full flex justify-between items-center text-sm p-2"
            onClick={() => toggleSection('emergency')}
          >
            <div className="flex items-center">
              <Ambulance className="h-4 w-4 mr-3" />
              <span>Emergency</span>
            </div>
            <span>{expandedSection === 'emergency' ? '-' : '+'}</span>
          </Button>
          
          {expandedSection === 'emergency' && (
            <div className="pl-6 space-y-1">
              <SidebarLink 
                href="/ambulance-request"
                icon={<Ambulance className="h-4 w-4" />}
                label="Ambulance Request"
                isActive={isActive('/ambulance-request')}
              />
              
              <SidebarLink 
                href="/ambulance-tracking"
                icon={<Ambulance className="h-4 w-4" />}
                label="Ambulance Tracking"
                isActive={isActive('/ambulance-tracking')}
              />
              
              <SidebarLink 
                href="/emergency-services"
                icon={<Ambulance className="h-4 w-4" />}
                label="Emergency Services"
                isActive={isActive('/emergency-services')}
              />
            </div>
          )}
          
          <SidebarLink 
            href="/get-prediction"
            icon={<Brain className="h-4 w-4" />}
            label="AI Predictions"
            isPro={true}
            isActive={isActive('/get-prediction')}
          />
          
          <SidebarLink 
            href="/database-management"
            icon={<Database className="h-4 w-4" />}
            label="Database Management"
            isActive={isActive('/database-management')}
          />
        </div>
      </ScrollArea>
      
      {/* Bottom actions */}
      <div className="mt-auto p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm" 
            className="w-full justify-start bg-red-500/10 hover:bg-red-500/20 border-none text-red-500"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" /> 
            Log out
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 h-9 w-9"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
