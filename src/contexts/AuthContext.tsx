
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

type UserRole = 'patient' | 'doctor' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  lastLogin?: string;
  department?: string;
  specialization?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  updateUserProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Enhanced mock user data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'patient@hospital.com',
    role: 'patient',
    avatar: '',
    lastLogin: new Date().toISOString(),
    department: 'General Medicine'
  },
  {
    id: '2',
    name: 'Dr. Jane Smith',
    email: 'doctor@hospital.com',
    role: 'doctor',
    avatar: '',
    lastLogin: new Date().toISOString(),
    department: 'Cardiology',
    specialization: 'Cardiac Surgery'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@hospital.com',
    role: 'admin',
    avatar: '',
    lastLogin: new Date().toISOString(),
    department: 'Administration'
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('hospital_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Ensure the role is valid
        if (!['patient', 'doctor', 'admin'].includes(parsedUser.role)) {
          console.error('Invalid user role detected:', parsedUser.role);
          localStorage.removeItem('hospital_user');
        } else {
          // Update last login time
          parsedUser.lastLogin = new Date().toISOString();
          setUser(parsedUser);
          localStorage.setItem('hospital_user', JSON.stringify(parsedUser));
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('hospital_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find matching user
    const matchedUser = mockUsers.find(
      (u) => u.email === email && u.role === role
    );
    
    if (matchedUser) {
      // In a real app, you would verify the password here
      if (password === 'password') {
        // Update last login time
        const updatedUser = {
          ...matchedUser,
          lastLogin: new Date().toISOString()
        };
        
        console.log(`Logged in as ${role}: ${matchedUser.name}`);
        setUser(updatedUser);
        localStorage.setItem('hospital_user', JSON.stringify(updatedUser));
        
        // Show success toast
        toast({
          title: "Login successful",
          description: `Welcome back, ${matchedUser.name}!`,
        });
        
        setIsLoading(false);
        return true;
      }
    }
    
    // Show error toast
    toast({
      title: "Login failed",
      description: "Invalid email or password",
      variant: "destructive",
    });
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hospital_user');
    
    // Show toast notification
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };
  
  const updateUserProfile = (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('hospital_user', JSON.stringify(updatedUser));
    
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isLoading,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
