
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  Menu, 
  Search,
  UserCircle,
  Moon,
  Sun,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    toast({
      title: `${isDarkMode ? "Light" : "Dark"} mode activated`,
      description: `Switched to ${isDarkMode ? "light" : "dark"} mode`,
      duration: 1500
    });
  };
  
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm transition-all duration-300 md:px-6 glass">
      <div className="flex items-center gap-2 md:gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="md:hidden transition-transform duration-200 hover:scale-105"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-md bg-primary transition-all duration-300 group-hover:scale-105">
            <span className="font-bold text-white">H</span>
          </div>
          <span className="font-semibold hidden md:inline-block transition-colors duration-300">HealthWave HMS</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search patients, doctors, records..."
            className="h-9 w-72 rounded-md border border-input bg-background/70 pl-8 pr-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all duration-300 focus:w-80"
          />
        </div>

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleDarkMode}
          className="transition-transform duration-200 hover:scale-105"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="transition-transform duration-200 hover:scale-105"
          onClick={() => {
            toast({
              title: "Messages",
              description: "You have no new messages",
              duration: 3000
            });
          }}
        >
          <MessageSquare className="h-5 w-5" />
          <span className="sr-only">Messages</span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative transition-transform duration-200 hover:scale-105">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="dropdown-content w-80 p-0">
            <div className="flex items-center justify-between border-b p-3">
              <h3 className="font-semibold">Notifications</h3>
              <Button variant="ghost" size="sm" className="text-xs">Mark all as read</Button>
            </div>
            <div className="overflow-y-auto max-h-[400px]">
              <div className="flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bell className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">New appointment request</p>
                  <p className="text-xs text-muted-foreground">Dr. Michael Chen requested an appointment with you.</p>
                  <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors">
                <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Lab results available</p>
                  <p className="text-xs text-muted-foreground">Your lab results for blood work are now available.</p>
                  <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors">
                <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Bell className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Appointment reminder</p>
                  <p className="text-xs text-muted-foreground">You have an appointment with Dr. Sarah Johnson tomorrow at 10:00 AM.</p>
                  <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                </div>
              </div>
            </div>
            <div className="border-t p-2">
              <Button variant="ghost" size="sm" className="w-full justify-center">View all notifications</Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full transition-transform duration-200 hover:scale-105">
              <UserCircle className="h-6 w-6" />
              <span className="sr-only">Profile</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="dropdown-content w-56">
            <div className="flex items-center gap-2 p-2">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                <span className="font-medium">OW</span>
              </div>
              <div>
                <p className="font-medium text-sm">Olivia Wilson</p>
                <p className="text-xs text-muted-foreground">Patient</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">My Profile</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Account Settings</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Medical Records</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">Help Center</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-destructive">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
