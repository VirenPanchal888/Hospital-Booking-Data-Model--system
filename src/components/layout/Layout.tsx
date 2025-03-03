
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '@/contexts/AuthContext';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);
  
  // Close sidebar on route change for mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Set initial state based on window size
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col bg-background transition-colors duration-300">
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} userRole={user?.role} />
        
        <main className="flex-1 md:ml-64 transition-all duration-500 ease-in-out">
          <div className="container mx-auto p-4 md:p-6 lg:p-8 animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-10 bg-background/80 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Layout;
