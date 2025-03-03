
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '@/contexts/AuthContext';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  return (
    <div className="flex min-h-screen flex-col bg-background transition-colors duration-300">
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} userRole={user?.role} />
        
        <main className="flex-1 md:ml-64 transition-all duration-300 ease-in-out">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
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
