
import React, { useState } from 'react';
import { 
  ChevronDown,
  Download, 
  Filter, 
  MessageSquarePlus, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Trash2, 
  Upload, 
  UserPlus 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// Sample patient data
const patientsData = [
  {
    id: '001',
    name: 'Olivia Wilson',
    dateOfBirth: '1989-05-15',
    gender: 'Female',
    contact: '+1 (555) 123-4567',
    bloodType: 'O+',
    status: 'Active',
    lastVisit: '2023-10-24',
    doctor: 'Dr. Michael Chen',
  },
  {
    id: '002',
    name: 'James Smith',
    dateOfBirth: '1982-08-23',
    gender: 'Male',
    contact: '+1 (555) 234-5678',
    bloodType: 'A-',
    status: 'Active',
    lastVisit: '2023-10-25',
    doctor: 'Dr. Sarah Johnson',
  },
  {
    id: '003',
    name: 'Emma Johnson',
    dateOfBirth: '1996-02-12',
    gender: 'Female',
    contact: '+1 (555) 345-6789',
    bloodType: 'B+',
    status: 'Active',
    lastVisit: '2023-10-20',
    doctor: 'Dr. David Williams',
  },
  {
    id: '004',
    name: 'William Brown',
    dateOfBirth: '1967-11-28',
    gender: 'Male',
    contact: '+1 (555) 456-7890',
    bloodType: 'AB+',
    status: 'Inactive',
    lastVisit: '2023-09-15',
    doctor: 'Dr. Michael Chen',
  },
  {
    id: '005',
    name: 'Sophia Davis',
    dateOfBirth: '1978-07-04',
    gender: 'Female',
    contact: '+1 (555) 567-8901',
    bloodType: 'O-',
    status: 'Active',
    lastVisit: '2023-10-23',
    doctor: 'Dr. Sarah Johnson',
  },
  {
    id: '006',
    name: 'Ethan Martinez',
    dateOfBirth: '1990-12-16',
    gender: 'Male',
    contact: '+1 (555) 678-9012',
    bloodType: 'A+',
    status: 'Active',
    lastVisit: '2023-10-22',
    doctor: 'Dr. David Williams',
  },
  {
    id: '007',
    name: 'Isabella Taylor',
    dateOfBirth: '1985-03-30',
    gender: 'Female',
    contact: '+1 (555) 789-0123',
    bloodType: 'B-',
    status: 'Active',
    lastVisit: '2023-10-18',
    doctor: 'Dr. Michael Chen',
  },
  {
    id: '008',
    name: 'Alexander Anderson',
    dateOfBirth: '1973-09-08',
    gender: 'Male',
    contact: '+1 (555) 890-1234',
    bloodType: 'O+',
    status: 'Inactive',
    lastVisit: '2023-08-05',
    doctor: 'Dr. Sarah Johnson',
  },
];

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
  
  // Filter patients based on search term and filters
  const filteredPatients = patientsData.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || patient.status.toLowerCase() === statusFilter.toLowerCase();
    
    const matchesGender = genderFilter === 'all' || patient.gender.toLowerCase() === genderFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesGender;
  });
  
  // Toggle patient selection
  const togglePatientSelection = (patientId: string) => {
    setSelectedPatients((prev) => 
      prev.includes(patientId)
        ? prev.filter(id => id !== patientId)
        : [...prev, patientId]
    );
  };
  
  // Toggle all patients selection
  const toggleAllPatients = () => {
    if (selectedPatients.length === filteredPatients.length) {
      setSelectedPatients([]);
    } else {
      setSelectedPatients(filteredPatients.map(patient => patient.id));
    }
  };
  
  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };
  
  return (
    <div className="animate-slide-in-up">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Patients</h1>
        <p className="text-muted-foreground">
          Manage patient records, view medical history, and schedule appointments.
        </p>
      </div>
      
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full flex-1 items-center gap-2 sm:max-w-sm">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <div className="p-2">
                <div className="mb-2">
                  <p className="mb-1 text-xs font-medium">Status</p>
                  <Select
                    value={statusFilter}
                    onValueChange={(value) => setStatusFilter(value)}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <p className="mb-1 text-xs font-medium">Gender</p>
                  <Select
                    value={genderFilter}
                    onValueChange={(value) => setGenderFilter(value)}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center gap-2">
          {selectedPatients.length > 0 && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <MessageSquarePlus className="h-4 w-4" />
                <span>Message</span>
              </Button>
              
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                <span>Export</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button size="sm" className="gap-1">
            <UserPlus className="h-4 w-4" />
            <span>Add Patient</span>
          </Button>
        </div>
      </div>
      
      <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b p-3 text-left">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-input"
                      checked={selectedPatients.length === filteredPatients.length && filteredPatients.length > 0}
                      onChange={toggleAllPatients}
                    />
                    <span className="text-xs font-medium text-muted-foreground">PATIENT</span>
                  </div>
                </th>
                <th className="border-b p-3 text-left">
                  <span className="text-xs font-medium text-muted-foreground">BLOOD</span>
                </th>
                <th className="border-b p-3 text-left">
                  <span className="text-xs font-medium text-muted-foreground">AGE/GENDER</span>
                </th>
                <th className="border-b p-3 text-left">
                  <span className="text-xs font-medium text-muted-foreground">CONTACT</span>
                </th>
                <th className="border-b p-3 text-left">
                  <span className="text-xs font-medium text-muted-foreground">STATUS</span>
                </th>
                <th className="border-b p-3 text-left">
                  <span className="text-xs font-medium text-muted-foreground">LAST VISIT</span>
                </th>
                <th className="border-b p-3 text-left">
                  <span className="text-xs font-medium text-muted-foreground">DOCTOR</span>
                </th>
                <th className="border-b p-3 text-right">
                  <span className="text-xs font-medium text-muted-foreground">ACTIONS</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-6 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        <Search className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">No patients found</h3>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your search or filters, or add a new patient.
                      </p>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="mt-2 gap-1"
                        onClick={() => {
                          setSearchTerm('');
                          setStatusFilter('all');
                          setGenderFilter('all');
                        }}
                      >
                        Clear filters
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr key={patient.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-input"
                          checked={selectedPatients.includes(patient.id)}
                          onChange={() => togglePatientSelection(patient.id)}
                        />
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-xs text-muted-foreground">#{patient.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="font-medium">
                        {patient.bloodType}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <p className="text-sm">{calculateAge(patient.dateOfBirth)} years</p>
                      <p className="text-xs text-muted-foreground">{patient.gender}</p>
                    </td>
                    <td className="p-3">
                      <p className="text-sm">{patient.contact}</p>
                    </td>
                    <td className="p-3">
                      <Badge variant={patient.status === 'Active' ? 'outline' : 'secondary'} className={
                        patient.status === 'Active' ? 'bg-green-50 text-green-700 hover:bg-green-50' : 'bg-muted text-muted-foreground hover:bg-muted'
                      }>
                        {patient.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <p className="text-sm">{patient.lastVisit.split('-').reverse().join('/')}</p>
                    </td>
                    <td className="p-3">
                      <p className="text-sm">{patient.doctor}</p>
                    </td>
                    <td className="p-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Details</DropdownMenuItem>
                          <DropdownMenuItem>Schedule Appointment</DropdownMenuItem>
                          <DropdownMenuItem>View Medical Records</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Delete Patient
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between border-t px-4 py-3">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{filteredPatients.length}</strong> of{" "}
            <strong>{patientsData.length}</strong> patients
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patients;
