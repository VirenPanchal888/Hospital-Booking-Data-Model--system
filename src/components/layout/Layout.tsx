
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarSeparator
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Users, 
  UserCog, 
  Calendar, 
  PlusCircle, 
  Receipt, 
  FileText, 
  PillIcon, 
  BarChart3, 
  Ambulance,
  Brain, 
  LogOut,
  Settings
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

const Layout: React.FC = () => {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        title: "Authentication required",
        description: "Please log in to access this page",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [user, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <motion.div 
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </motion.div>
      </div>
    );
  }

  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Determine which links to show based on user role
  const showLink = (allowedRoles: string[]) => {
    const userRole = user?.role || 'user';
    return allowedRoles.includes(userRole) || userRole === 'admin';
  };
  
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full flex-col bg-background transition-colors duration-300">
        <Header />
        
        <div className="flex flex-1 pt-16">
          <Sidebar>
            <SidebarHeader>
              <div className="flex flex-col items-center justify-center p-4">
                <Avatar className="h-16 w-16 mb-4">
                  <AvatarImage src="/placeholder.svg" alt={user?.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-center">
                  <h3 className="font-medium">{user?.name || 'User'}</h3>
                  <p className="text-xs text-muted-foreground mt-1 capitalize">{user?.role || 'User'}</p>
                </div>
              </div>
              <SidebarSeparator />
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => navigate('/')}
                        isActive={isActive('/')}
                        tooltip="Dashboard"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Dashboard</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    {showLink(['admin', 'doctor', 'nurse']) && (
                      <SidebarMenuItem>
                        <SidebarMenuButton 
                          onClick={() => navigate('/patients')}
                          isActive={isActive('/patients')}
                          tooltip="Patients"
                        >
                          <Users className="h-4 w-4" />
                          <span>Patients</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )}
                    
                    {showLink(['admin', 'patient']) && (
                      <SidebarMenuItem>
                        <SidebarMenuButton 
                          onClick={() => navigate('/doctors')}
                          isActive={isActive('/doctors')}
                          tooltip="Doctors"
                        >
                          <UserCog className="h-4 w-4" />
                          <span>Doctors</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )}
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => navigate('/appointments')}
                        isActive={isActive('/appointments')}
                        tooltip="Appointments"
                      >
                        <Calendar className="h-4 w-4" />
                        <span>Appointments</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => navigate('/new-appointment')}
                        isActive={isActive('/new-appointment')}
                        tooltip="New Appointment"
                      >
                        <PlusCircle className="h-4 w-4" />
                        <span>New Appointment</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              
              <SidebarGroup>
                <SidebarGroupLabel>Medical Services</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {showLink(['admin', 'finance', 'patient']) && (
                      <SidebarMenuItem>
                        <SidebarMenuButton 
                          onClick={() => navigate('/billing')}
                          isActive={isActive('/billing')}
                          tooltip="Billing"
                        >
                          <Receipt className="h-4 w-4" />
                          <span>Billing</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )}
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => navigate('/medical-records')}
                        isActive={isActive('/medical-records')}
                        tooltip="Medical Records"
                      >
                        <FileText className="h-4 w-4" />
                        <span>Medical Records</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => navigate('/pharmacy')}
                        isActive={isActive('/pharmacy')}
                        tooltip="Pharmacy"
                      >
                        <PillIcon className="h-4 w-4" />
                        <span>Pharmacy</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              
              <SidebarGroup>
                <SidebarGroupLabel>Advanced Features</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {showLink(['admin', 'doctor', 'executive']) && (
                      <SidebarMenuItem>
                        <SidebarMenuButton 
                          onClick={() => navigate('/analytics')}
                          isActive={isActive('/analytics')}
                          tooltip="Analytics"
                        >
                          <BarChart3 className="h-4 w-4" />
                          <span>Analytics</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )}
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => navigate('/ambulance-request')}
                        isActive={isActive('/ambulance-request')}
                        tooltip="Ambulance"
                      >
                        <Ambulance className="h-4 w-4" />
                        <span>Ambulance</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => navigate('/get-prediction')}
                        isActive={isActive('/get-prediction')}
                        tooltip="AI Prediction"
                      >
                        <Brain className="h-4 w-4" />
                        <span>Get Prediction</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            
            <SidebarFooter>
              <div className="flex items-center justify-between p-4">
                <Button
                  variant="outline"
                  size="sm" 
                  className="w-full justify-start text-destructive"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" /> 
                  Log out
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 ml-2"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>
          
          <motion.main 
            className="flex-1 transition-all duration-300 ease-in-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="container mx-auto p-6">
              <Outlet />
            </div>
          </motion.main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
