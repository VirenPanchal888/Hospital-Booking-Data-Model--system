
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
        "sidebar-link group relative",
        isActive && "active"
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

// Sidebar theme toggle component
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className="mt-2 h-9 w-9"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
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
  const [collapsed, setCollapsed] = useState(false);
  
  // Determine if link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // Determine which links to show based on user role
  const showLink = (allowedRoles: string[]) => {
    return allowedRoles.includes(userRole) || userRole === 'admin';
  };
  
  if (!isOpen) return null;
  
  return (
    <motion.div 
      className="flex h-full flex-col border-r bg-sidebar text-sidebar-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* User profile section */}
      <div className="flex flex-col items-center justify-center p-6">
        <Avatar className="h-16 w-16 mb-4">
          <AvatarImage src="/placeholder.svg" alt={user?.name} />
          <AvatarFallback className="bg-primary text-primary-foreground text-xl">
            {user?.name?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
        
        <div className="text-center">
          <h3 className="font-medium">{user?.name || 'User'}</h3>
          <p className="text-xs text-sidebar-foreground/70 mt-1 capitalize">{user?.role || 'User'}</p>
        </div>
      </div>
      
      <Separator className="bg-sidebar-border" />
      
      {/* Navigation links */}
      <div className="flex-1 overflow-auto py-4 px-3">
        <nav className="space-y-1">
          <SidebarLink 
            href="/"
            icon={<LayoutDashboard className="h-4 w-4" />}
            label="Dashboard"
            isActive={isActive('/')}
          />
          
          {showLink(['admin', 'doctor', 'nurse']) && (
            <SidebarLink 
              href="/patients"
              icon={<Users className="h-4 w-4" />}
              label="Patients"
              isActive={isActive('/patients')}
            />
          )}
          
          {showLink(['admin', 'doctor', 'nurse']) && (
            <SidebarLink 
              href="/patient-referrals"
              icon={<UserPlus className="h-4 w-4" />}
              label="Referrals"
              isActive={isActive('/patient-referrals')}
            />
          )}
          
          {showLink(['admin', 'doctor', 'nurse']) && (
            <SidebarLink 
              href="/treatment-plans"
              icon={<ClipboardList className="h-4 w-4" />}
              label="Treatment Plans"
              isActive={isActive('/treatment-plans')}
            />
          )}
          
          {showLink(['admin', 'doctor', 'nurse']) && (
            <SidebarLink 
              href="/clinical-pathways"
              icon={<Route className="h-4 w-4" />}
              label="Clinical Pathways"
              isActive={isActive('/clinical-pathways')}
            />
          )}
          
          {showLink(['admin', 'patient']) && (
            <SidebarLink 
              href="/doctors"
              icon={<UserCog className="h-4 w-4" />}
              label="Doctors"
              isActive={isActive('/doctors')}
            />
          )}
          
          {showLink(['admin', 'doctor', 'nurse', 'executive']) && (
            <SidebarLink 
              href="/staff-directory"
              icon={<Building2 className="h-4 w-4" />}
              label="Staff Directory"
              isActive={isActive('/staff-directory')}
            />
          )}
          
          <SidebarLink 
            href="/appointments"
            icon={<Calendar className="h-4 w-4" />}
            label="Appointments"
            isActive={isActive('/appointments')}
          />
          
          <SidebarLink 
            href="/new-appointment"
            icon={<PlusCircle className="h-4 w-4" />}
            label="New Appointment"
            isActive={isActive('/new-appointment')}
          />
          
          {showLink(['admin', 'nurse']) && (
            <SidebarLink 
              href="/nursing-tasks"
              icon={<List className="h-4 w-4" />}
              label="Nursing Tasks"
              isActive={isActive('/nursing-tasks')}
            />
          )}
          
          {showLink(['admin', 'doctor', 'nurse']) && (
            <SidebarLink 
              href="/medical-tests"
              icon={<TestTube className="h-4 w-4" />}
              label="Medical Tests"
              isActive={isActive('/medical-tests')}
            />
          )}
          
          {showLink(['admin', 'doctor', 'nurse']) && (
            <SidebarLink 
              href="/patient-monitoring"
              icon={<Activity className="h-4 w-4" />}
              label="Patient Monitoring"
              isActive={isActive('/patient-monitoring')}
            />
          )}
          
          {showLink(['admin', 'finance', 'patient']) && (
            <SidebarLink 
              href="/billing"
              icon={<Receipt className="h-4 w-4" />}
              label="Billing"
              isActive={isActive('/billing')}
            />
          )}
          
          <SidebarLink 
            href="/medical-records"
            icon={<FileText className="h-4 w-4" />}
            label="Medical Records"
            isActive={isActive('/medical-records')}
          />
          
          <SidebarLink 
            href="/pharmacy"
            icon={<PillIcon className="h-4 w-4" />}
            label="Pharmacy"
            isActive={isActive('/pharmacy')}
          />
          
          <SidebarLink 
            href="/medical-library"
            icon={<BookOpen className="h-4 w-4" />}
            label="Medical Library"
            isActive={isActive('/medical-library')}
          />
          
          {showLink(['admin', 'doctor', 'executive']) && (
            <SidebarLink 
              href="/analytics"
              icon={<BarChart3 className="h-4 w-4" />}
              label="Analytics"
              isPro={true}
              isActive={isActive('/analytics')}
            />
          )}
          
          <SidebarLink 
            href="/ambulance-request"
            icon={<Ambulance className="h-4 w-4" />}
            label="Ambulance"
            isActive={isActive('/ambulance-request')}
          />
          
          {showLink(['admin', 'doctor', 'executive']) && (
            <SidebarLink 
              href="/database-management"
              icon={<Database className="h-4 w-4" />}
              label="Database"
              isActive={isActive('/database-management')}
            />
          )}
          
          <SidebarLink 
            href="/get-prediction"
            icon={<Brain className="h-4 w-4" />}
            label="Get Prediction"
            isPro={true}
            isActive={isActive('/get-prediction')}
          />
        </nav>
      </div>
      
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
          
          <ThemeToggle />
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
