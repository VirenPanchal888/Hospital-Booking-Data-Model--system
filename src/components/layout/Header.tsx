
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  Menu, 
  Search,
  UserCircle
} from 'lucide-react';

interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm transition-all duration-200 md:px-6">
      <div className="flex items-center gap-2 md:gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        
        <Link to="/" className="flex items-center gap-2">
          <div className="relative flex h-7 w-7 items-center justify-center rounded-md bg-primary">
            <span className="font-bold text-white">H</span>
          </div>
          <span className="font-semibold hidden md:inline-block">HealthWave HMS</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="h-9 w-72 rounded-md border border-input bg-background pl-8 pr-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-primary" />
          <span className="sr-only">Notifications</span>
        </Button>
        
        <Button variant="ghost" size="icon" className="rounded-full">
          <UserCircle className="h-6 w-6" />
          <span className="sr-only">Profile</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
