
import React, { createContext, useContext, useState, useEffect } from 'react';

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

// Mock user data for demonstration
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'patient@hospital.com',
    role: 'patient' as UserRole,
    avatar: '',
  },
  {
    id: '2',
    name: 'Dr. Jane Smith',
    email: 'doctor@hospital.com',
    role: 'doctor' as UserRole,
    avatar: '',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@hospital.com',
    role: 'admin' as UserRole,
    avatar: '',
  },
];

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
        } else {
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('hms_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find matching user
    const matchedUser = mockUsers.find(
      (u) => u.email === email && u.role === role
    );
    
    if (matchedUser) {
      // In a real app, you would verify the password here
      if (password === 'password') {
        console.log(`Logged in as ${role}: ${matchedUser.name}`);
        setUser(matchedUser);
        localStorage.setItem('hms_user', JSON.stringify(matchedUser));
        setIsLoading(false);
        return true;
      }
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hms_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
