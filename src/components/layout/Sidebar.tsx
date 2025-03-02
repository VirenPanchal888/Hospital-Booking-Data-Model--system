
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Activity,
  Calendar,
  ClipboardList,
  Home,
  Pill,
  Settings,
  UserRound,
  Users,
  Wallet
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  
  const mainNavItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Patients",
      href: "/patients",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Doctors",
      href: "/doctors",
      icon: <UserRound className="h-5 w-5" />,
    },
    {
      title: "Appointments",
      href: "/appointments",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Billing",
      href: "/billing",
      icon: <Wallet className="h-5 w-5" />,
    },
  ];
  
  const secondaryNavItems: NavItem[] = [
    {
      title: "Medical Records",
      href: "/medical-records",
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      title: "Pharmacy",
      href: "/pharmacy",
      icon: <Pill className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: <Activity className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const navItemClasses = "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary";
  
  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r bg-background transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="relative flex h-8 w-8 items-center justify-center rounded-md bg-primary">
          <span className="font-bold text-white">H</span>
        </div>
        <span className="font-semibold">HealthWave HMS</span>
      </div>
      
      <div className="flex flex-1 flex-col gap-4 overflow-auto p-4">
        <nav className="flex flex-col gap-1">
          {mainNavItems.map((item) => (
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
          {secondaryNavItems.map((item) => (
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
      </div>
      
      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="text-sm font-medium">AD</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Admin User</span>
            <span className="text-xs text-muted-foreground">admin@hospital.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
