
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Activity,
  Ambulance,
  Calendar,
  ClipboardList,
  Home,
  LogOut,
  Pill,
  Plus,
  Settings,
  User,
  UserRound,
  Users,
  Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface SidebarProps {
  isOpen: boolean;
  userRole?: 'patient' | 'doctor' | 'admin';
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  roles: Array<'patient' | 'doctor' | 'admin'>;
  highlight?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, userRole = 'patient' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { toast } = useToast();
  
  const mainNavItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/",
      icon: <Home className="h-5 w-5" />,
      roles: ['patient', 'doctor', 'admin'],
    },
    {
      title: "Patients",
      href: "/patients",
      icon: <Users className="h-5 w-5" />,
      roles: ['doctor', 'admin'],
    },
    {
      title: "Doctors",
      href: "/doctors",
      icon: <UserRound className="h-5 w-5" />,
      roles: ['patient', 'admin'],
    },
    {
      title: "Appointments",
      href: "/appointments",
      icon: <Calendar className="h-5 w-5" />,
      roles: ['patient', 'doctor', 'admin'],
    },
    {
      title: "New Appointment",
      href: "/new-appointment",
      icon: <Plus className="h-5 w-5" />,
      roles: ['patient'],
    },
    {
      title: "Billing",
      href: "/billing",
      icon: <Wallet className="h-5 w-5" />,
      roles: ['patient', 'admin'],
    },
  ];
  
  const secondaryNavItems: NavItem[] = [
    {
      title: "Medical Records",
      href: "/medical-records",
      icon: <ClipboardList className="h-5 w-5" />,
      roles: ['patient', 'doctor', 'admin'],
    },
    {
      title: "Pharmacy",
      href: "/pharmacy",
      icon: <Pill className="h-5 w-5" />,
      roles: ['patient', 'doctor', 'admin'],
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: <Activity className="h-5 w-5" />,
      roles: ['doctor', 'admin'],
    },
    {
      title: "Emergency Ambulance",
      href: "/ambulance-request",
      icon: <Ambulance className="h-5 w-5" />,
      roles: ['patient'],
      highlight: true,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
      roles: ['patient', 'doctor', 'admin'],
    },
  ];

  // Enhanced filtering based on the current user role
  const filteredMainNavItems = mainNavItems.filter(item => 
    item.roles.includes(userRole)
  );
  
  const filteredSecondaryNavItems = secondaryNavItems.filter(item => 
    item.roles.includes(userRole)
  );

  const navItemClasses = "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary";
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };
  
  // Role-specific sidebar titles
  const getSidebarTitle = () => {
    switch(userRole) {
      case 'doctor':
        return 'HealthWave - Doctor';
      case 'admin':
        return 'HealthWave - Admin';
      default:
        return 'HealthWave HMS';
    }
  };
  
  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r bg-background transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className={cn(
          "relative flex h-8 w-8 items-center justify-center rounded-md",
          userRole === 'doctor' ? "bg-blue-600" : 
          userRole === 'admin' ? "bg-purple-600" : "bg-primary"
        )}>
          <span className="font-bold text-white">
            {userRole === 'doctor' ? 'D' : userRole === 'admin' ? 'A' : 'H'}
          </span>
        </div>
        <span className="font-semibold">{getSidebarTitle()}</span>
      </div>
      
      <div className="flex flex-1 flex-col gap-4 overflow-auto p-4">
        <nav className="flex flex-col gap-1">
          {filteredMainNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                navItemClasses,
                location.pathname === item.href 
                  ? "bg-secondary font-medium text-foreground" 
                  : "text-muted-foreground"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
        
        <div className="my-2 h-px bg-border" />
        
        <nav className="flex flex-col gap-1">
          {filteredSecondaryNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                navItemClasses,
                location.pathname === item.href 
                  ? "bg-secondary font-medium text-foreground" 
                  : "text-muted-foreground",
                item.highlight && "text-red-600 font-medium"
              )}
            >
              {item.icon}
              {item.title}
              {item.highlight && (
                <span className="ml-auto flex h-2 w-2 rounded-full bg-red-500"></span>
              )}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="border-t p-4">
        <div className={cn(
          "flex items-center gap-3 rounded-lg p-3",
          userRole === 'doctor' ? "bg-blue-50" : 
          userRole === 'admin' ? "bg-purple-50" : "bg-secondary"
        )}>
          <div className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full text-primary-foreground",
            userRole === 'doctor' ? "bg-blue-600" : 
            userRole === 'admin' ? "bg-purple-600" : "bg-primary"
          )}>
            <span className="text-sm font-medium text-white">
              {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user?.name || 'User'}</span>
            <span className="text-xs text-muted-foreground">
              {userRole === 'doctor' ? 'Medical Staff' : 
               userRole === 'admin' ? 'Administrator' : 'Patient'}
            </span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="mt-4 w-full justify-start text-muted-foreground"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
