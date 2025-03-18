
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

// Enhanced user role types
export type UserRole = 'patient' | 'doctor' | 'nurse' | 'admin' | 'receptionist' | 'pharmacist' | 'lab_technician' | 'finance';

// Enhanced user interface with more details
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  lastLogin?: string;
  department?: string;
  specialization?: string;
  patientId?: string;
  staffId?: string;
  contactNumber?: string;
  address?: string;
  emergencyContact?: string;
  dateJoined?: string;
  permissions?: string[];
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

// Enhanced mock user data with more roles and details
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'patient@hospital.com',
    role: 'patient',
    avatar: '',
    lastLogin: new Date().toISOString(),
    department: 'General Medicine',
    patientId: 'PAT-001',
    contactNumber: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, AN 12345',
    emergencyContact: '+1 (555) 987-6543',
    dateJoined: '2023-01-15'
  },
  {
    id: '2',
    name: 'Dr. Jane Smith',
    email: 'doctor@hospital.com',
    role: 'doctor',
    avatar: '',
    lastLogin: new Date().toISOString(),
    department: 'Cardiology',
    specialization: 'Cardiac Surgery',
    staffId: 'DOC-001',
    contactNumber: '+1 (555) 234-5678',
    address: '456 Oak Ave, Anytown, AN 12345',
    dateJoined: '2022-03-10',
    permissions: ['view_patients', 'edit_patients', 'prescribe_medications']
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@hospital.com',
    role: 'admin',
    avatar: '',
    lastLogin: new Date().toISOString(),
    department: 'Administration',
    staffId: 'ADM-001',
    contactNumber: '+1 (555) 345-6789',
    dateJoined: '2021-05-20',
    permissions: ['all']
  },
  {
    id: '4',
    name: 'Nancy White',
    email: 'nurse@hospital.com',
    role: 'nurse',
    avatar: '',
    lastLogin: new Date().toISOString(),
    department: 'Emergency',
    staffId: 'NUR-001',
    contactNumber: '+1 (555) 456-7890',
    dateJoined: '2022-07-15',
    permissions: ['view_patients', 'update_vitals', 'administer_medications']
  },
  {
    id: '5',
    name: 'Rebecca Johnson',
    email: 'receptionist@hospital.com',
    role: 'receptionist',
    avatar: '',
    lastLogin: new Date().toISOString(),
    department: 'Front Desk',
    staffId: 'REC-001',
    contactNumber: '+1 (555) 567-8901',
    dateJoined: '2023-02-01',
    permissions: ['schedule_appointments', 'register_patients']
  },
  {
    id: '6',
    name: 'Peter Chen',
    email: 'pharmacist@hospital.com',
    role: 'pharmacist',
    avatar: '',
    lastLogin: new Date().toISOString(),
    department: 'Pharmacy',
    staffId: 'PHA-001',
    contactNumber: '+1 (555) 678-9012',
    dateJoined: '2022-09-05',
    permissions: ['dispense_medications', 'manage_inventory']
  },
  {
    id: '7',
    name: 'Melissa Garcia',
    email: 'lab@hospital.com',
    role: 'lab_technician',
    avatar: '',
    lastLogin: new Date().toISOString(),
    department: 'Laboratory',
    staffId: 'LAB-001',
    contactNumber: '+1 (555) 789-0123',
    dateJoined: '2022-11-10',
    permissions: ['run_tests', 'enter_results']
  },
  {
    id: '8',
    name: 'Frank Turner',
    email: 'finance@hospital.com',
    role: 'finance',
    avatar: '',
    lastLogin: new Date().toISOString(),
    department: 'Finance',
    staffId: 'FIN-001',
    contactNumber: '+1 (555) 890-1234',
    dateJoined: '2021-10-15',
    permissions: ['manage_billing', 'process_payments', 'generate_reports']
  }
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
        const validRoles = ['patient', 'doctor', 'nurse', 'admin', 'receptionist', 'pharmacist', 'lab_technician', 'finance'];
        if (!validRoles.includes(parsedUser.role)) {
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
