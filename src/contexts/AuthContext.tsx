
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

type UserRole = 'patient' | 'doctor' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Generate a new user based on login info
const generateNewUser = (email: string, role: UserRole): User => {
  // Create display name from email
  const nameFromEmail = email.split('@')[0].split('.');
  const formattedName = nameFromEmail.map(part => 
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join(' ');
  
  return {
    id: `${role}-${Date.now().toString(36)}`,
    name: formattedName,
    email: email,
    role: role,
    avatar: '',
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('hms_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Ensure the role is valid
        if (!['patient', 'doctor', 'admin'].includes(parsedUser.role)) {
          console.error('Invalid user role detected:', parsedUser.role);
          localStorage.removeItem('hms_user');
          toast({
            title: "Invalid user role",
            description: "Your login session was invalid. Please login again.",
            variant: "destructive"
          });
        } else {
          setUser(parsedUser);
          toast({
            title: "Welcome back",
            description: `Logged in as ${parsedUser.name}`,
          });
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('hms_user');
        toast({
          title: "Session error",
          description: "There was an error with your session. Please login again.",
          variant: "destructive"
        });
      }
    }
    // Use a slight delay to ensure UI is ready
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay with a slightly longer delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simple validation - in a real app this would check against a database
    if (password === 'password') {
      const newUser = generateNewUser(email, role);
      console.log(`Generated new user: ${newUser.name} as ${role}`);
      setUser(newUser);
      localStorage.setItem('hms_user', JSON.stringify(newUser));
      
      // Generate initial data for this user in localStorage
      if (role === 'admin') {
        localStorage.setItem('hms_invoices', JSON.stringify([]));
        localStorage.setItem('hms_appointments', JSON.stringify([]));
        localStorage.setItem('hms_patients', JSON.stringify([]));
        localStorage.setItem('hms_doctors', JSON.stringify([]));
      }
      
      toast({
        title: "Login successful",
        description: `Welcome, ${newUser.name}!`,
      });
      
      // Give a brief moment to allow the UI to update
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return true;
    }
    
    toast({
      title: "Login failed",
      description: "Invalid email or password. Try using 'password' as the password.",
      variant: "destructive"
    });
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hms_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
