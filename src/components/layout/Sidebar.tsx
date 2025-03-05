
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Activity,
  Ambulance,
  Calendar,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Home,
  LogOut,
  Pill,
  Plus,
  Settings,
  User,
  UserRound,
  Users,
  Wallet,
  Brain,
  HeartPulse,
  Phone,
  HelpCircle,
  Clock,
  Stethoscope
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  children?: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, userRole = 'patient' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { toast } = useToast();
  const [openGroups, setOpenGroups] = useState<string[]>(['dashboard', 'appointments']);
  
  const isGroupOpen = (key: string) => openGroups.includes(key);
  
  const toggleGroup = (key: string) => {
    setOpenGroups(prev => 
      prev.includes(key) 
        ? prev.filter(g => g !== key) 
        : [...prev, key]
    );
  };
  
  const mainNavItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/",
      icon: <Home className="h-5 w-5" />,
      roles: ['patient', 'doctor', 'admin'],
    },
    {
      title: "Appointments",
      href: "/appointments",
      icon: <Calendar className="h-5 w-5" />,
      roles: ['patient', 'doctor', 'admin'],
      children: [
        {
          title: "All Appointments",
          href: "/appointments",
          icon: <Clock className="h-4 w-4" />,
          roles: ['patient', 'doctor', 'admin'],
        },
        {
          title: "New Appointment",
          href: "/new-appointment",
          icon: <Plus className="h-4 w-4" />,
          roles: ['patient', 'doctor', 'admin'],
        },
      ]
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
      children: [
        {
          title: "All Doctors",
          href: "/doctors",
          icon: <Stethoscope className="h-4 w-4" />,
          roles: ['patient', 'admin'],
        },
        {
          title: "Specialties",
          href: "/specialties",
          icon: <HeartPulse className="h-4 w-4" />,
          roles: ['patient', 'admin'],
        },
      ]
    },
    {
      title: "Medical Records",
      href: "/medical-records",
      icon: <ClipboardList className="h-5 w-5" />,
      roles: ['patient', 'doctor', 'admin'],
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
      title: "Health Prediction",
      href: "/get-prediction",
      icon: <Brain className="h-5 w-5" />,
      roles: ['patient'],
    },
    {
      title: "Emergency Ambulance",
      href: "/ambulance-request",
      icon: <Ambulance className="h-5 w-5" />,
      roles: ['patient'],
      highlight: true,
    },
    {
      title: "Support",
      href: "/support",
      icon: <HelpCircle className="h-5 w-5" />,
      roles: ['patient', 'doctor', 'admin'],
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
      roles: ['patient', 'doctor', 'admin'],
    },
  ];

  const filteredMainNavItems = mainNavItems.filter(item => 
    item.roles.includes(userRole)
  );
  
  const filteredSecondaryNavItems = secondaryNavItems.filter(item => 
    item.roles.includes(userRole)
  );

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };
  
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
  
  // Helper function to render navigation items
  const renderNavItem = (item: NavItem, isChild = false) => {
    const isActive = location.pathname === item.href;
    const hasChildren = item.children && item.children.length > 0;
    
    if (hasChildren && !isChild) {
      return (
        <Collapsible 
          key={item.href} 
          open={isGroupOpen(item.title.toLowerCase())}
          onOpenChange={() => toggleGroup(item.title.toLowerCase())}
          className="w-full"
        >
          <CollapsibleTrigger asChild>
            <button
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all duration-300 hover:bg-secondary",
                isGroupOpen(item.title.toLowerCase()) ? "bg-secondary/70" : "text-muted-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.title}</span>
              </div>
              {isGroupOpen(item.title.toLowerCase()) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-8 pt-1">
            {item.children!.map(child => renderNavItem(child, true))}
          </CollapsibleContent>
        </Collapsible>
      );
    }
    
    return (
      <Link
        key={item.href}
        to={item.href}
        className={cn(
          "nav-item",
          isActive 
            ? "bg-secondary font-medium text-foreground" 
            : "text-muted-foreground hover:text-foreground",
          item.highlight && "text-red-600 font-medium",
          isChild && "pl-3 py-1.5 text-xs"
        )}
      >
        {item.icon}
        <span>{item.title}</span>
        {item.highlight && (
          <span className="ml-auto flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
        )}
      </Link>
    );
  };
  
  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r bg-background/95 transition-transform duration-300 ease-in-out backdrop-blur-sm shadow-md",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className={cn(
          "relative flex h-9 w-9 items-center justify-center rounded-md",
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
          {filteredMainNavItems.map((item) => renderNavItem(item))}
        </nav>
        
        <div className="my-2 h-px bg-border" />
        
        <nav className="flex flex-col gap-1">
          {filteredSecondaryNavItems.map((item) => renderNavItem(item))}
        </nav>
      </div>
      
      <div className="border-t p-4">
        <div className={cn(
          "flex items-center gap-3 rounded-lg p-3 transition-all duration-300",
          userRole === 'doctor' ? "bg-blue-50 dark:bg-blue-950/20" : 
          userRole === 'admin' ? "bg-purple-50 dark:bg-purple-950/20" : "bg-secondary"
        )}>
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full text-primary-foreground",
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
          className="mt-4 w-full justify-start text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
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
