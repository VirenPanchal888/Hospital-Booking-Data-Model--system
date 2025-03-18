
import React, { createContext, useContext, useState, useEffect } from 'react';

// Database types
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  email: string;
  address: string;
  bloodType?: string;
  emergencyContact?: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  allergies?: string[];
  chronicConditions?: string[];
  primaryPhysician?: string;
  lastVisit?: string;
  nextAppointment?: string;
  registrationDate: string;
  status: 'active' | 'inactive';
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  department: string;
  contactNumber: string;
  email: string;
  availableDays: string[];
  availableHours: string;
  education: string[];
  experience: string;
  photo?: string;
  bio?: string;
  rating?: number;
  status: 'active' | 'inactive';
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  followUp?: boolean;
  department?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Medication {
  id: string;
  patientId: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  prescribedById: string;
  status: 'active' | 'completed' | 'cancelled';
  notes?: string;
  refills?: number;
  sideEffects?: string[];
  interactions?: string[];
}

export interface LabTest {
  id: string;
  patientId: string;
  patientName: string;
  testName: string;
  testType: string;
  date: string;
  result?: string;
  resultDate?: string;
  orderedBy: string;
  orderedById: string;
  status: 'ordered' | 'completed' | 'cancelled';
  notes?: string;
  attachments?: string[];
}

export interface Invoice {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  dueDate: string;
  totalAmount: number;
  paidAmount: number;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  items: InvoiceItem[];
  insuranceClaim?: boolean;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  paymentMethod?: string;
  paymentDate?: string;
  notes?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: string;
  serviceDate: string;
}

export interface Inventory {
  id: string;
  name: string;
  category: 'medication' | 'equipment' | 'supplies';
  quantity: number;
  unit: string;
  unitPrice: number;
  supplier: string;
  reorderLevel: number;
  location: string;
  expiryDate?: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  lastUpdated: string;
}

export interface Staff {
  id: string;
  name: string;
  role: 'doctor' | 'nurse' | 'receptionist' | 'pharmacist' | 'lab_technician' | 'admin';
  department: string;
  contactNumber: string;
  email: string;
  employmentDate: string;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  status: 'active' | 'on-leave' | 'inactive';
}

interface DatabaseContextType {
  patients: Patient[];
  doctors: Doctor[];
  appointments: Appointment[];
  medications: Medication[];
  labTests: LabTest[];
  invoices: Invoice[];
  inventory: Inventory[];
  staff: Staff[];
  
  // CRUD operations
  addPatient: (patient: Omit<Patient, 'id'>) => Patient;
  updatePatient: (id: string, patient: Partial<Patient>) => Patient | null;
  deletePatient: (id: string) => boolean;
  getPatient: (id: string) => Patient | null;
  
  addDoctor: (doctor: Omit<Doctor, 'id'>) => Doctor;
  updateDoctor: (id: string, doctor: Partial<Doctor>) => Doctor | null;
  deleteDoctor: (id: string) => boolean;
  getDoctor: (id: string) => Doctor | null;
  
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => Appointment;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => Appointment | null;
  deleteAppointment: (id: string) => boolean;
  getAppointment: (id: string) => Appointment | null;
  
  addMedication: (medication: Omit<Medication, 'id'>) => Medication;
  updateMedication: (id: string, medication: Partial<Medication>) => Medication | null;
  deleteMedication: (id: string) => boolean;
  getMedication: (id: string) => Medication | null;
  
  addLabTest: (labTest: Omit<LabTest, 'id'>) => LabTest;
  updateLabTest: (id: string, labTest: Partial<LabTest>) => LabTest | null;
  deleteLabTest: (id: string) => boolean;
  getLabTest: (id: string) => LabTest | null;
  
  addInvoice: (invoice: Omit<Invoice, 'id'>) => Invoice;
  updateInvoice: (id: string, invoice: Partial<Invoice>) => Invoice | null;
  deleteInvoice: (id: string) => boolean;
  getInvoice: (id: string) => Invoice | null;
  
  addInventoryItem: (item: Omit<Inventory, 'id'>) => Inventory;
  updateInventoryItem: (id: string, item: Partial<Inventory>) => Inventory | null;
  deleteInventoryItem: (id: string) => boolean;
  getInventoryItem: (id: string) => Inventory | null;
  
  addStaffMember: (staff: Omit<Staff, 'id'>) => Staff;
  updateStaffMember: (id: string, staff: Partial<Staff>) => Staff | null;
  deleteStaffMember: (id: string) => boolean;
  getStaffMember: (id: string) => Staff | null;
  
  // Query operations
  getPatientAppointments: (patientId: string) => Appointment[];
  getDoctorAppointments: (doctorId: string) => Appointment[];
  getPatientMedications: (patientId: string) => Medication[];
  getPatientLabTests: (patientId: string) => LabTest[];
  getPatientInvoices: (patientId: string) => Invoice[];
  
  // Stats operations
  getAppointmentStats: () => {
    scheduled: number;
    completed: number;
    cancelled: number;
    noShow: number;
    total: number;
  };
  getInventoryStats: () => {
    inStock: number;
    lowStock: number;
    outOfStock: number;
    total: number;
    value: number;
  };
}

// Create context
const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

// Create hook for accessing the context
export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};

// Generate a UUID
const generateId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Mock data generator functions
const generateMockPatients = (): Patient[] => {
  return [
    {
      id: 'p1',
      name: 'Emma Wilson',
      dateOfBirth: '1988-06-15',
      gender: 'Female',
      contactNumber: '+1 (555) 123-4567',
      email: 'emma.wilson@example.com',
      address: '123 Main St, Anytown, AN 12345',
      bloodType: 'A+',
      emergencyContact: 'John Wilson (Husband): +1 (555) 987-6543',
      insuranceProvider: 'HealthPlus Insurance',
      insurancePolicyNumber: 'HP-987654321',
      allergies: ['Penicillin', 'Peanuts'],
      chronicConditions: ['Hypertension', 'Asthma'],
      primaryPhysician: 'Dr. Jane Smith',
      lastVisit: '2023-04-10',
      nextAppointment: '2023-06-20',
      registrationDate: '2020-01-15',
      status: 'active'
    },
    {
      id: 'p2',
      name: 'James Rodriguez',
      dateOfBirth: '1995-11-22',
      gender: 'Male',
      contactNumber: '+1 (555) 234-5678',
      email: 'james.rodriguez@example.com',
      address: '456 Elm St, Anytown, AN 12345',
      bloodType: 'O-',
      emergencyContact: 'Maria Rodriguez (Sister): +1 (555) 876-5432',
      insuranceProvider: 'BlueHealth Insurance',
      insurancePolicyNumber: 'BH-123456789',
      allergies: ['Sulfa drugs'],
      chronicConditions: ['Diabetes Type 2'],
      primaryPhysician: 'Dr. Michael Chen',
      lastVisit: '2023-05-05',
      nextAppointment: '2023-08-10',
      registrationDate: '2019-03-20',
      status: 'active'
    },
    {
      id: 'p3',
      name: 'Olivia Smith',
      dateOfBirth: '1978-03-10',
      gender: 'Female',
      contactNumber: '+1 (555) 345-6789',
      email: 'olivia.smith@example.com',
      address: '789 Oak St, Anytown, AN 12345',
      bloodType: 'B+',
      emergencyContact: 'David Smith (Husband): +1 (555) 765-4321',
      insuranceProvider: 'MediCare Plus',
      insurancePolicyNumber: 'MP-456789123',
      allergies: ['Latex', 'Shellfish'],
      chronicConditions: ['Arthritis', 'Hypertension'],
      primaryPhysician: 'Dr. Jane Smith',
      lastVisit: '2023-04-22',
      nextAppointment: '2023-07-15',
      registrationDate: '2018-06-10',
      status: 'active'
    }
  ];
};

const generateMockDoctors = (): Doctor[] => {
  return [
    {
      id: 'd1',
      name: 'Dr. Jane Smith',
      specialization: 'Cardiology',
      department: 'Cardiology',
      contactNumber: '+1 (555) 111-2222',
      email: 'jane.smith@hospital.com',
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      availableHours: '09:00 AM - 05:00 PM',
      education: ['MD, Harvard Medical School', 'Residency, Mayo Clinic', 'Fellowship, Johns Hopkins Hospital'],
      experience: '15 years',
      bio: 'Dr. Jane Smith is a cardiologist with over 15 years of experience in treating heart conditions.',
      rating: 4.8,
      status: 'active'
    },
    {
      id: 'd2',
      name: 'Dr. Michael Chen',
      specialization: 'Endocrinology',
      department: 'Internal Medicine',
      contactNumber: '+1 (555) 222-3333',
      email: 'michael.chen@hospital.com',
      availableDays: ['Monday', 'Wednesday', 'Friday'],
      availableHours: '08:00 AM - 04:00 PM',
      education: ['MD, Stanford University', 'Residency, UCLA Medical Center', 'Fellowship, UCSF Medical Center'],
      experience: '10 years',
      bio: 'Dr. Michael Chen specializes in diabetes management and thyroid disorders.',
      rating: 4.7,
      status: 'active'
    },
    {
      id: 'd3',
      name: 'Dr. Sarah Johnson',
      specialization: 'Pediatrics',
      department: 'Pediatrics',
      contactNumber: '+1 (555) 333-4444',
      email: 'sarah.johnson@hospital.com',
      availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
      availableHours: '09:00 AM - 05:00 PM',
      education: ['MD, Yale School of Medicine', 'Residency, Children\'s Hospital of Philadelphia'],
      experience: '8 years',
      bio: 'Dr. Sarah Johnson is a pediatrician dedicated to providing comprehensive care for children of all ages.',
      rating: 4.9,
      status: 'active'
    }
  ];
};

const generateMockAppointments = (): Appointment[] => {
  return [
    {
      id: 'a1',
      patientId: 'p1',
      patientName: 'Emma Wilson',
      doctorId: 'd1',
      doctorName: 'Dr. Jane Smith',
      date: '2023-06-20',
      time: '10:00 AM',
      duration: 30,
      type: 'Regular Checkup',
      reason: 'Blood pressure review',
      status: 'scheduled',
      department: 'Cardiology',
      createdAt: '2023-05-15T10:30:00Z',
      updatedAt: '2023-05-15T10:30:00Z'
    },
    {
      id: 'a2',
      patientId: 'p2',
      patientName: 'James Rodriguez',
      doctorId: 'd2',
      doctorName: 'Dr. Michael Chen',
      date: '2023-08-10',
      time: '02:30 PM',
      duration: 45,
      type: 'Follow-up',
      reason: 'Diabetes management',
      status: 'scheduled',
      department: 'Internal Medicine',
      createdAt: '2023-05-20T14:15:00Z',
      updatedAt: '2023-05-20T14:15:00Z'
    },
    {
      id: 'a3',
      patientId: 'p3',
      patientName: 'Olivia Smith',
      doctorId: 'd1',
      doctorName: 'Dr. Jane Smith',
      date: '2023-07-15',
      time: '11:15 AM',
      duration: 30,
      type: 'Follow-up',
      reason: 'Hypertension check',
      status: 'scheduled',
      department: 'Cardiology',
      createdAt: '2023-05-18T09:45:00Z',
      updatedAt: '2023-05-18T09:45:00Z'
    },
    {
      id: 'a4',
      patientId: 'p1',
      patientName: 'Emma Wilson',
      doctorId: 'd1',
      doctorName: 'Dr. Jane Smith',
      date: '2023-04-10',
      time: '09:30 AM',
      duration: 30,
      type: 'Regular Checkup',
      reason: 'Annual physical',
      status: 'completed',
      notes: 'Blood pressure elevated, medication adjusted',
      department: 'Cardiology',
      createdAt: '2023-03-20T11:00:00Z',
      updatedAt: '2023-04-10T10:15:00Z'
    }
  ];
};

const generateMockMedications = (): Medication[] => {
  return [
    {
      id: 'm1',
      patientId: 'p1',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      startDate: '2023-01-15',
      endDate: '2023-07-15',
      prescribedBy: 'Dr. Jane Smith',
      prescribedById: 'd1',
      status: 'active',
      notes: 'Take in the morning with water',
      refills: 2
    },
    {
      id: 'm2',
      patientId: 'p1',
      name: 'Ventolin HFA',
      dosage: '90mcg',
      frequency: 'As needed for asthma symptoms',
      startDate: '2022-11-10',
      prescribedBy: 'Dr. Michael Chen',
      prescribedById: 'd2',
      status: 'active',
      notes: '1-2 puffs every 4-6 hours as needed',
      refills: 3
    },
    {
      id: 'm3',
      patientId: 'p2',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily with meals',
      startDate: '2023-02-05',
      endDate: '2023-08-05',
      prescribedBy: 'Dr. Michael Chen',
      prescribedById: 'd2',
      status: 'active',
      notes: 'Take with breakfast and dinner',
      refills: 5
    }
  ];
};

const generateMockLabTests = (): LabTest[] => {
  return [
    {
      id: 'l1',
      patientId: 'p1',
      patientName: 'Emma Wilson',
      testName: 'Complete Blood Count (CBC)',
      testType: 'Blood',
      date: '2023-04-10',
      result: 'Normal',
      resultDate: '2023-04-12',
      orderedBy: 'Dr. Jane Smith',
      orderedById: 'd1',
      status: 'completed'
    },
    {
      id: 'l2',
      patientId: 'p1',
      patientName: 'Emma Wilson',
      testName: 'Lipid Panel',
      testType: 'Blood',
      date: '2023-04-10',
      result: 'Abnormal - High cholesterol',
      resultDate: '2023-04-12',
      orderedBy: 'Dr. Jane Smith',
      orderedById: 'd1',
      status: 'completed',
      notes: 'LDL: 160 mg/dL (High), HDL: 45 mg/dL, Triglycerides: 180 mg/dL'
    },
    {
      id: 'l3',
      patientId: 'p2',
      patientName: 'James Rodriguez',
      testName: 'Hemoglobin A1C',
      testType: 'Blood',
      date: '2023-05-05',
      result: 'Abnormal - 7.2%',
      resultDate: '2023-05-07',
      orderedBy: 'Dr. Michael Chen',
      orderedById: 'd2',
      status: 'completed',
      notes: 'Target is below 7.0%'
    }
  ];
};

const generateMockInvoices = (): Invoice[] => {
  return [
    {
      id: 'i1',
      patientId: 'p1',
      patientName: 'Emma Wilson',
      date: '2023-04-10',
      dueDate: '2023-05-10',
      totalAmount: 250.00,
      paidAmount: 250.00,
      status: 'paid',
      items: [
        {
          id: 'ii1',
          description: 'Office Visit',
          quantity: 1,
          unitPrice: 150.00,
          totalPrice: 150.00,
          category: 'Consultation',
          serviceDate: '2023-04-10'
        },
        {
          id: 'ii2',
          description: 'Blood Tests',
          quantity: 2,
          unitPrice: 50.00,
          totalPrice: 100.00,
          category: 'Laboratory',
          serviceDate: '2023-04-10'
        }
      ],
      insuranceClaim: true,
      insuranceProvider: 'HealthPlus Insurance',
      insurancePolicyNumber: 'HP-987654321',
      paymentMethod: 'Credit Card',
      paymentDate: '2023-04-15'
    },
    {
      id: 'i2',
      patientId: 'p2',
      patientName: 'James Rodriguez',
      date: '2023-05-05',
      dueDate: '2023-06-05',
      totalAmount: 350.00,
      paidAmount: 0.00,
      status: 'pending',
      items: [
        {
          id: 'ii3',
          description: 'Office Visit',
          quantity: 1,
          unitPrice: 150.00,
          totalPrice: 150.00,
          category: 'Consultation',
          serviceDate: '2023-05-05'
        },
        {
          id: 'ii4',
          description: 'Hemoglobin A1C Test',
          quantity: 1,
          unitPrice: 80.00,
          totalPrice: 80.00,
          category: 'Laboratory',
          serviceDate: '2023-05-05'
        },
        {
          id: 'ii5',
          description: 'Glucose Meter Kit',
          quantity: 1,
          unitPrice: 120.00,
          totalPrice: 120.00,
          category: 'Medical Equipment',
          serviceDate: '2023-05-05'
        }
      ],
      insuranceClaim: true,
      insuranceProvider: 'BlueHealth Insurance',
      insurancePolicyNumber: 'BH-123456789'
    }
  ];
};

const generateMockInventory = (): Inventory[] => {
  return [
    {
      id: 'inv1',
      name: 'Lisinopril 10mg',
      category: 'medication',
      quantity: 500,
      unit: 'tablets',
      unitPrice: 0.25,
      supplier: 'PharmaCorp',
      reorderLevel: 100,
      location: 'Pharmacy Shelf A1',
      expiryDate: '2024-06-30',
      status: 'in-stock',
      lastUpdated: '2023-04-01'
    },
    {
      id: 'inv2',
      name: 'Ventolin HFA 90mcg',
      category: 'medication',
      quantity: 50,
      unit: 'inhalers',
      unitPrice: 15.00,
      supplier: 'MediSupply',
      reorderLevel: 10,
      location: 'Pharmacy Shelf B2',
      expiryDate: '2024-03-15',
      status: 'in-stock',
      lastUpdated: '2023-04-15'
    },
    {
      id: 'inv3',
      name: 'Blood Pressure Monitor',
      category: 'equipment',
      quantity: 8,
      unit: 'units',
      unitPrice: 45.00,
      supplier: 'MedEquip',
      reorderLevel: 5,
      location: 'Equipment Room C3',
      status: 'in-stock',
      lastUpdated: '2023-05-01'
    },
    {
      id: 'inv4',
      name: 'Latex Gloves (Medium)',
      category: 'supplies',
      quantity: 2000,
      unit: 'pieces',
      unitPrice: 0.10,
      supplier: 'MediSupply',
      reorderLevel: 500,
      location: 'Supply Room D1',
      status: 'in-stock',
      lastUpdated: '2023-05-10'
    }
  ];
};

const generateMockStaff = (): Staff[] => {
  return [
    {
      id: 's1',
      name: 'Dr. Jane Smith',
      role: 'doctor',
      department: 'Cardiology',
      contactNumber: '+1 (555) 111-2222',
      email: 'jane.smith@hospital.com',
      employmentDate: '2008-03-15',
      schedule: [
        { day: 'Monday', startTime: '09:00', endTime: '17:00' },
        { day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
        { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
        { day: 'Thursday', startTime: '09:00', endTime: '17:00' }
      ],
      status: 'active'
    },
    {
      id: 's2',
      name: 'Dr. Michael Chen',
      role: 'doctor',
      department: 'Internal Medicine',
      contactNumber: '+1 (555) 222-3333',
      email: 'michael.chen@hospital.com',
      employmentDate: '2013-06-10',
      schedule: [
        { day: 'Monday', startTime: '08:00', endTime: '16:00' },
        { day: 'Wednesday', startTime: '08:00', endTime: '16:00' },
        { day: 'Friday', startTime: '08:00', endTime: '16:00' }
      ],
      status: 'active'
    },
    {
      id: 's3',
      name: 'Nancy White',
      role: 'nurse',
      department: 'Cardiology',
      contactNumber: '+1 (555) 333-4444',
      email: 'nancy.white@hospital.com',
      employmentDate: '2015-02-20',
      schedule: [
        { day: 'Monday', startTime: '08:00', endTime: '16:00' },
        { day: 'Tuesday', startTime: '08:00', endTime: '16:00' },
        { day: 'Wednesday', startTime: '08:00', endTime: '16:00' },
        { day: 'Thursday', startTime: '08:00', endTime: '16:00' },
        { day: 'Friday', startTime: '08:00', endTime: '16:00' }
      ],
      status: 'active'
    },
    {
      id: 's4',
      name: 'Rebecca Johnson',
      role: 'receptionist',
      department: 'Front Desk',
      contactNumber: '+1 (555) 444-5555',
      email: 'rebecca.johnson@hospital.com',
      employmentDate: '2019-01-15',
      schedule: [
        { day: 'Monday', startTime: '08:00', endTime: '16:00' },
        { day: 'Tuesday', startTime: '08:00', endTime: '16:00' },
        { day: 'Wednesday', startTime: '08:00', endTime: '16:00' },
        { day: 'Thursday', startTime: '08:00', endTime: '16:00' },
        { day: 'Friday', startTime: '08:00', endTime: '16:00' }
      ],
      status: 'active'
    }
  ];
};

// Database Provider component
export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  
  // Initialize with mock data
  useEffect(() => {
    const initializeData = async () => {
      // Try to load data from localStorage first
      const savedPatients = localStorage.getItem('hospital_patients');
      const savedDoctors = localStorage.getItem('hospital_doctors');
      const savedAppointments = localStorage.getItem('hospital_appointments');
      const savedMedications = localStorage.getItem('hospital_medications');
      const savedLabTests = localStorage.getItem('hospital_lab_tests');
      const savedInvoices = localStorage.getItem('hospital_invoices');
      const savedInventory = localStorage.getItem('hospital_inventory');
      const savedStaff = localStorage.getItem('hospital_staff');
      
      // If no saved data, use mock data
      if (!savedPatients) {
        const mockPatients = generateMockPatients();
        setPatients(mockPatients);
        localStorage.setItem('hospital_patients', JSON.stringify(mockPatients));
      } else {
        setPatients(JSON.parse(savedPatients));
      }
      
      if (!savedDoctors) {
        const mockDoctors = generateMockDoctors();
        setDoctors(mockDoctors);
        localStorage.setItem('hospital_doctors', JSON.stringify(mockDoctors));
      } else {
        setDoctors(JSON.parse(savedDoctors));
      }
      
      if (!savedAppointments) {
        const mockAppointments = generateMockAppointments();
        setAppointments(mockAppointments);
        localStorage.setItem('hospital_appointments', JSON.stringify(mockAppointments));
      } else {
        setAppointments(JSON.parse(savedAppointments));
      }
      
      if (!savedMedications) {
        const mockMedications = generateMockMedications();
        setMedications(mockMedications);
        localStorage.setItem('hospital_medications', JSON.stringify(mockMedications));
      } else {
        setMedications(JSON.parse(savedMedications));
      }
      
      if (!savedLabTests) {
        const mockLabTests = generateMockLabTests();
        setLabTests(mockLabTests);
        localStorage.setItem('hospital_lab_tests', JSON.stringify(mockLabTests));
      } else {
        setLabTests(JSON.parse(savedLabTests));
      }
      
      if (!savedInvoices) {
        const mockInvoices = generateMockInvoices();
        setInvoices(mockInvoices);
        localStorage.setItem('hospital_invoices', JSON.stringify(mockInvoices));
      } else {
        setInvoices(JSON.parse(savedInvoices));
      }
      
      if (!savedInventory) {
        const mockInventory = generateMockInventory();
        setInventory(mockInventory);
        localStorage.setItem('hospital_inventory', JSON.stringify(mockInventory));
      } else {
        setInventory(JSON.parse(savedInventory));
      }
      
      if (!savedStaff) {
        const mockStaff = generateMockStaff();
        setStaff(mockStaff);
        localStorage.setItem('hospital_staff', JSON.stringify(mockStaff));
      } else {
        setStaff(JSON.parse(savedStaff));
      }
    };
    
    initializeData();
  }, []);
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (patients.length > 0) {
      localStorage.setItem('hospital_patients', JSON.stringify(patients));
    }
  }, [patients]);
  
  useEffect(() => {
    if (doctors.length > 0) {
      localStorage.setItem('hospital_doctors', JSON.stringify(doctors));
    }
  }, [doctors]);
  
  useEffect(() => {
    if (appointments.length > 0) {
      localStorage.setItem('hospital_appointments', JSON.stringify(appointments));
    }
  }, [appointments]);
  
  useEffect(() => {
    if (medications.length > 0) {
      localStorage.setItem('hospital_medications', JSON.stringify(medications));
    }
  }, [medications]);
  
  useEffect(() => {
    if (labTests.length > 0) {
      localStorage.setItem('hospital_lab_tests', JSON.stringify(labTests));
    }
  }, [labTests]);
  
  useEffect(() => {
    if (invoices.length > 0) {
      localStorage.setItem('hospital_invoices', JSON.stringify(invoices));
    }
  }, [invoices]);
  
  useEffect(() => {
    if (inventory.length > 0) {
      localStorage.setItem('hospital_inventory', JSON.stringify(inventory));
    }
  }, [inventory]);
  
  useEffect(() => {
    if (staff.length > 0) {
      localStorage.setItem('hospital_staff', JSON.stringify(staff));
    }
  }, [staff]);
  
  // CRUD operations for Patients
  const addPatient = (patient: Omit<Patient, 'id'>): Patient => {
    const newPatient = { ...patient, id: `p${generateId()}` };
    setPatients((prev) => [...prev, newPatient]);
    return newPatient;
  };
  
  const updatePatient = (id: string, patientData: Partial<Patient>): Patient | null => {
    let updatedPatient: Patient | null = null;
    
    setPatients((prev) => {
      const updated = prev.map((patient) => {
        if (patient.id === id) {
          updatedPatient = { ...patient, ...patientData };
          return updatedPatient;
        }
        return patient;
      });
      return updated;
    });
    
    return updatedPatient;
  };
  
  const deletePatient = (id: string): boolean => {
    let deleted = false;
    
    setPatients((prev) => {
      const filtered = prev.filter((patient) => {
        if (patient.id === id) {
          deleted = true;
          return false;
        }
        return true;
      });
      return filtered;
    });
    
    return deleted;
  };
  
  const getPatient = (id: string): Patient | null => {
    return patients.find((patient) => patient.id === id) || null;
  };
  
  // CRUD operations for Doctors
  const addDoctor = (doctor: Omit<Doctor, 'id'>): Doctor => {
    const newDoctor = { ...doctor, id: `d${generateId()}` };
    setDoctors((prev) => [...prev, newDoctor]);
    return newDoctor;
  };
  
  const updateDoctor = (id: string, doctorData: Partial<Doctor>): Doctor | null => {
    let updatedDoctor: Doctor | null = null;
    
    setDoctors((prev) => {
      const updated = prev.map((doctor) => {
        if (doctor.id === id) {
          updatedDoctor = { ...doctor, ...doctorData };
          return updatedDoctor;
        }
        return doctor;
      });
      return updated;
    });
    
    return updatedDoctor;
  };
  
  const deleteDoctor = (id: string): boolean => {
    let deleted = false;
    
    setDoctors((prev) => {
      const filtered = prev.filter((doctor) => {
        if (doctor.id === id) {
          deleted = true;
          return false;
        }
        return true;
      });
      return filtered;
    });
    
    return deleted;
  };
  
  const getDoctor = (id: string): Doctor | null => {
    return doctors.find((doctor) => doctor.id === id) || null;
  };
  
  // CRUD operations for Appointments
  const addAppointment = (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Appointment => {
    const now = new Date().toISOString();
    const newAppointment = { 
      ...appointment, 
      id: `a${generateId()}`,
      createdAt: now,
      updatedAt: now
    };
    
    setAppointments((prev) => [...prev, newAppointment]);
    return newAppointment;
  };
  
  const updateAppointment = (id: string, appointmentData: Partial<Appointment>): Appointment | null => {
    let updatedAppointment: Appointment | null = null;
    
    setAppointments((prev) => {
      const updated = prev.map((appointment) => {
        if (appointment.id === id) {
          updatedAppointment = { 
            ...appointment, 
            ...appointmentData,
            updatedAt: new Date().toISOString()
          };
          return updatedAppointment;
        }
        return appointment;
      });
      return updated;
    });
    
    return updatedAppointment;
  };
  
  const deleteAppointment = (id: string): boolean => {
    let deleted = false;
    
    setAppointments((prev) => {
      const filtered = prev.filter((appointment) => {
        if (appointment.id === id) {
          deleted = true;
          return false;
        }
        return true;
      });
      return filtered;
    });
    
    return deleted;
  };
  
  const getAppointment = (id: string): Appointment | null => {
    return appointments.find((appointment) => appointment.id === id) || null;
  };
  
  // CRUD operations for Medications
  const addMedication = (medication: Omit<Medication, 'id'>): Medication => {
    const newMedication = { ...medication, id: `m${generateId()}` };
    setMedications((prev) => [...prev, newMedication]);
    return newMedication;
  };
  
  const updateMedication = (id: string, medicationData: Partial<Medication>): Medication | null => {
    let updatedMedication: Medication | null = null;
    
    setMedications((prev) => {
      const updated = prev.map((medication) => {
        if (medication.id === id) {
          updatedMedication = { ...medication, ...medicationData };
          return updatedMedication;
        }
        return medication;
      });
      return updated;
    });
    
    return updatedMedication;
  };
  
  const deleteMedication = (id: string): boolean => {
    let deleted = false;
    
    setMedications((prev) => {
      const filtered = prev.filter((medication) => {
        if (medication.id === id) {
          deleted = true;
          return false;
        }
        return true;
      });
      return filtered;
    });
    
    return deleted;
  };
  
  const getMedication = (id: string): Medication | null => {
    return medications.find((medication) => medication.id === id) || null;
  };
  
  // CRUD operations for Lab Tests
  const addLabTest = (labTest: Omit<LabTest, 'id'>): LabTest => {
    const newLabTest = { ...labTest, id: `l${generateId()}` };
    setLabTests((prev) => [...prev, newLabTest]);
    return newLabTest;
  };
  
  const updateLabTest = (id: string, labTestData: Partial<LabTest>): LabTest | null => {
    let updatedLabTest: LabTest | null = null;
    
    setLabTests((prev) => {
      const updated = prev.map((labTest) => {
        if (labTest.id === id) {
          updatedLabTest = { ...labTest, ...labTestData };
          return updatedLabTest;
        }
        return labTest;
      });
      return updated;
    });
    
    return updatedLabTest;
  };
  
  const deleteLabTest = (id: string): boolean => {
    let deleted = false;
    
    setLabTests((prev) => {
      const filtered = prev.filter((labTest) => {
        if (labTest.id === id) {
          deleted = true;
          return false;
        }
        return true;
      });
      return filtered;
    });
    
    return deleted;
  };
  
  const getLabTest = (id: string): LabTest | null => {
    return labTests.find((labTest) => labTest.id === id) || null;
  };
  
  // CRUD operations for Invoices
  const addInvoice = (invoice: Omit<Invoice, 'id'>): Invoice => {
    const newInvoice = { ...invoice, id: `i${generateId()}` };
    setInvoices((prev) => [...prev, newInvoice]);
    return newInvoice;
  };
  
  const updateInvoice = (id: string, invoiceData: Partial<Invoice>): Invoice | null => {
    let updatedInvoice: Invoice | null = null;
    
    setInvoices((prev) => {
      const updated = prev.map((invoice) => {
        if (invoice.id === id) {
          updatedInvoice = { ...invoice, ...invoiceData };
          return updatedInvoice;
        }
        return invoice;
      });
      return updated;
    });
    
    return updatedInvoice;
  };
  
  const deleteInvoice = (id: string): boolean => {
    let deleted = false;
    
    setInvoices((prev) => {
      const filtered = prev.filter((invoice) => {
        if (invoice.id === id) {
          deleted = true;
          return false;
        }
        return true;
      });
      return filtered;
    });
    
    return deleted;
  };
  
  const getInvoice = (id: string): Invoice | null => {
    return invoices.find((invoice) => invoice.id === id) || null;
  };
  
  // CRUD operations for Inventory
  const addInventoryItem = (item: Omit<Inventory, 'id'>): Inventory => {
    const newItem = { ...item, id: `inv${generateId()}` };
    setInventory((prev) => [...prev, newItem]);
    return newItem;
  };
  
  const updateInventoryItem = (id: string, itemData: Partial<Inventory>): Inventory | null => {
    let updatedItem: Inventory | null = null;
    
    setInventory((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          updatedItem = { ...item, ...itemData, lastUpdated: new Date().toISOString().split('T')[0] };
          return updatedItem;
        }
        return item;
      });
      return updated;
    });
    
    return updatedItem;
  };
  
  const deleteInventoryItem = (id: string): boolean => {
    let deleted = false;
    
    setInventory((prev) => {
      const filtered = prev.filter((item) => {
        if (item.id === id) {
          deleted = true;
          return false;
        }
        return true;
      });
      return filtered;
    });
    
    return deleted;
  };
  
  const getInventoryItem = (id: string): Inventory | null => {
    return inventory.find((item) => item.id === id) || null;
  };
  
  // CRUD operations for Staff
  const addStaffMember = (staffMember: Omit<Staff, 'id'>): Staff => {
    const newStaffMember = { ...staffMember, id: `s${generateId()}` };
    setStaff((prev) => [...prev, newStaffMember]);
    return newStaffMember;
  };
  
  const updateStaffMember = (id: string, staffData: Partial<Staff>): Staff | null => {
    let updatedStaffMember: Staff | null = null;
    
    setStaff((prev) => {
      const updated = prev.map((staffMember) => {
        if (staffMember.id === id) {
          updatedStaffMember = { ...staffMember, ...staffData };
          return updatedStaffMember;
        }
        return staffMember;
      });
      return updated;
    });
    
    return updatedStaffMember;
  };
  
  const deleteStaffMember = (id: string): boolean => {
    let deleted = false;
    
    setStaff((prev) => {
      const filtered = prev.filter((staffMember) => {
        if (staffMember.id === id) {
          deleted = true;
          return false;
        }
        return true;
      });
      return filtered;
    });
    
    return deleted;
  };
  
  const getStaffMember = (id: string): Staff | null => {
    return staff.find((staffMember) => staffMember.id === id) || null;
  };
  
  // Query operations
  const getPatientAppointments = (patientId: string): Appointment[] => {
    return appointments.filter((appointment) => appointment.patientId === patientId);
  };
  
  const getDoctorAppointments = (doctorId: string): Appointment[] => {
    return appointments.filter((appointment) => appointment.doctorId === doctorId);
  };
  
  const getPatientMedications = (patientId: string): Medication[] => {
    return medications.filter((medication) => medication.patientId === patientId);
  };
  
  const getPatientLabTests = (patientId: string): LabTest[] => {
    return labTests.filter((labTest) => labTest.patientId === patientId);
  };
  
  const getPatientInvoices = (patientId: string): Invoice[] => {
    return invoices.filter((invoice) => invoice.patientId === patientId);
  };
  
  // Stats operations
  const getAppointmentStats = () => {
    const scheduled = appointments.filter((a) => a.status === 'scheduled').length;
    const completed = appointments.filter((a) => a.status === 'completed').length;
    const cancelled = appointments.filter((a) => a.status === 'cancelled').length;
    const noShow = appointments.filter((a) => a.status === 'no-show').length;
    const total = appointments.length;
    
    return {
      scheduled,
      completed,
      cancelled,
      noShow,
      total
    };
  };
  
  const getInventoryStats = () => {
    const inStock = inventory.filter((i) => i.status === 'in-stock').length;
    const lowStock = inventory.filter((i) => i.status === 'low-stock').length;
    const outOfStock = inventory.filter((i) => i.status === 'out-of-stock').length;
    const total = inventory.length;
    const value = inventory.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
    
    return {
      inStock,
      lowStock,
      outOfStock,
      total,
      value
    };
  };
  
  const contextValue: DatabaseContextType = {
    patients,
    doctors,
    appointments,
    medications,
    labTests,
    invoices,
    inventory,
    staff,
    
    addPatient,
    updatePatient,
    deletePatient,
    getPatient,
    
    addDoctor,
    updateDoctor,
    deleteDoctor,
    getDoctor,
    
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointment,
    
    addMedication,
    updateMedication,
    deleteMedication,
    getMedication,
    
    addLabTest,
    updateLabTest,
    deleteLabTest,
    getLabTest,
    
    addInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoice,
    
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    getInventoryItem,
    
    addStaffMember,
    updateStaffMember,
    deleteStaffMember,
    getStaffMember,
    
    getPatientAppointments,
    getDoctorAppointments,
    getPatientMedications,
    getPatientLabTests,
    getPatientInvoices,
    
    getAppointmentStats,
    getInventoryStats,
  };
  
  return (
    <DatabaseContext.Provider value={contextValue}>
      {children}
    </DatabaseContext.Provider>
  );
};
