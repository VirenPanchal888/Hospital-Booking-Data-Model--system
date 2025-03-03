import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronDown,
  Download, 
  Filter, 
  MoreHorizontal, 
  Search, 
  Stethoscope,
  User
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
import { useToast } from '@/components/ui/use-toast';
import AddDoctorModal from '@/components/doctors/AddDoctorModal';
import DoctorSearch from '@/components/doctors/DoctorSearch';
import { useAuth } from '@/contexts/AuthContext';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  patients: number;
  experience: string;
  contactNumber: string;
  email: string;
  avatar?: string;
}

// Initial sample data for doctors
const initialDoctors: Doctor[] = [
  {
    id: 'D1',
    name: 'Dr. Michael Chen',
    specialty: 'Cardiology',
    status: 'Active',
    patients: 48,
    experience: '15 years',
    contactNumber: '+1 (555) 123-4567',
    email: 'dr.chen@hospital.com',
  },
  {
    id: 'D2',
    name: 'Dr. Sarah Johnson',
    specialty: 'Neurology',
    status: 'Active',
    patients: 35,
    experience: '12 years',
    contactNumber: '+1 (555) 234-5678',
    email: 'dr.johnson@hospital.com',
  },
  {
    id: 'D3',
    name: 'Dr. David Williams',
    specialty: 'Pediatrics',
    status: 'On Leave',
    patients: 42,
    experience: '8 years',
    contactNumber: '+1 (555) 345-6789',
    email: 'dr.williams@hospital.com',
  },
  {
    id: 'D4',
    name: 'Dr. Emily Davis',
    specialty: 'Dermatology',
    status: 'Active',
    patients: 28,
    experience: '10 years',
    contactNumber: '+1 (555) 456-7890',
    email: 'dr.davis@hospital.com',
  },
  {
    id: 'D5',
    name: 'Dr. Robert Brown',
    specialty: 'Orthopedics',
    status: 'Active',
    patients: 31,
    experience: '14 years',
    contactNumber: '+1 (555) 567-8901',
    email: 'dr.brown@hospital.com',
  },
  {
    id: 'D6',
    name: 'Dr. Jessica Martinez',
    specialty: 'Gynecology',
    status: 'Inactive',
    patients: 0,
    experience: '7 years',
    contactNumber: '+1 (555) 678-9012',
    email: 'dr.martinez@hospital.com',
  }
];

const Doctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctors);
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();
  const { user } = useAuth();

  const specialties = useMemo(() => 
    Array.from(new Set(doctors.map(doctor => doctor.specialty))),
    [doctors]
  );

  useEffect(() => {
    const filtered = doctors.filter(doctor => {
      const matchesSearch = !searchTerm || 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.id.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesSpecialty = specialtyFilter === 'all' || 
        doctor.specialty === specialtyFilter;
        
      const matchesStatus = statusFilter === 'all' || 
        doctor.status.toLowerCase() === statusFilter.toLowerCase();
        
      return matchesSearch && matchesSpecialty && matchesStatus;
    });
    
    setFilteredDoctors(filtered);
  }, [searchTerm, specialtyFilter, statusFilter, doctors]);

  const handleAddDoctor = (newDoctor: Omit<Doctor, 'status' | 'patients'>) => {
    const doctorToAdd: Doctor = {
      ...newDoctor,
      status: 'Active',
      patients: 0
    };
    
    setDoctors(prevDoctors => [...prevDoctors, doctorToAdd]);
    
    toast({
      title: "Doctor Added",
      description: `${newDoctor.name} has been added to the system.`
    });
  };

  const handleSelectDoctor = (doctor: Pick<Doctor, 'id' | 'name' | 'specialty'>) => {
    const selectedDoctor = doctors.find(d => d.id === doctor.id);
    
    if (selectedDoctor) {
      toast({
        title: "Doctor Selected",
        description: `Selected ${selectedDoctor.name} (${selectedDoctor.specialty})`
      });
      
      console.log("Selected doctor:", selectedDoctor);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSpecialtyFilter('all');
    setStatusFilter('all');
  };

  return (
    <div className="animate-slide-in-up">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Doctors</h1>
        <p className="text-muted-foreground">
          View and manage the medical staff in your hospital.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full flex-1 items-center gap-2 sm:max-w-md">
          <DoctorSearch 
            doctors={doctors} 
            onSelectDoctor={handleSelectDoctor} 
            placeholder="Search for a doctor..."
          />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] bg-background border shadow-md z-50">
              <div className="p-2">
                <div className="mb-2">
                  <p className="mb-1 text-xs font-medium">Specialty</p>
                  <Select
                    value={specialtyFilter}
                    onValueChange={setSpecialtyFilter}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="All Specialties" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-md z-50">
                      <SelectItem value="all">All Specialties</SelectItem>
                      {specialties.map(specialty => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <p className="mb-1 text-xs font-medium">Status</p>
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-md z-50">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="on leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                <span>Export</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background border shadow-md z-50">
              <DropdownMenuItem className="cursor-pointer">
                <Download className="mr-2 h-4 w-4" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Download className="mr-2 h-4 w-4" />
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {user?.role === 'admin' && (
            <AddDoctorModal onDoctorAdded={handleAddDoctor} />
          )}
        </div>
      </div>
      
      <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left text-xs font-medium text-muted-foreground">DOCTOR</th>
                <th className="p-3 text-left text-xs font-medium text-muted-foreground">SPECIALTY</th>
                <th className="p-3 text-left text-xs font-medium text-muted-foreground">STATUS</th>
                <th className="p-3 text-left text-xs font-medium text-muted-foreground">PATIENTS</th>
                <th className="p-3 text-left text-xs font-medium text-muted-foreground">EXPERIENCE</th>
                <th className="p-3 text-left text-xs font-medium text-muted-foreground">CONTACT</th>
                <th className="p-3 text-right text-xs font-medium text-muted-foreground">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        <Search className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">No doctors found</h3>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your search or filters.
                      </p>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="mt-2 gap-1"
                        onClick={clearFilters}
                      >
                        Clear filters
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          {doctor.name.split(' ').pop()?.charAt(0) || 'D'}
                        </div>
                        <div>
                          <p className="font-medium">{doctor.name}</p>
                          <p className="text-xs text-muted-foreground">{doctor.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <Stethoscope className="h-4 w-4 text-muted-foreground" />
                        <span>{doctor.specialty}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant={
                        doctor.status === 'Active' ? 'outline' : 
                        doctor.status === 'On Leave' ? 'secondary' : 
                        'destructive'
                      } className={
                        doctor.status === 'Active' ? 'bg-green-50 text-green-700 hover:bg-green-50' : 
                        doctor.status === 'On Leave' ? 'bg-amber-50 text-amber-700 hover:bg-amber-50' :
                        'bg-red-50 text-red-700 hover:bg-red-50'
                      }>
                        {doctor.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <p className="text-sm font-medium">{doctor.patients}</p>
                    </td>
                    <td className="p-3">
                      <p className="text-sm">{doctor.experience}</p>
                    </td>
                    <td className="p-3">
                      <p className="text-sm">{doctor.contactNumber}</p>
                    </td>
                    <td className="p-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-background border shadow-md z-50">
                          <DropdownMenuItem className="cursor-pointer">View Profile</DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">Schedule Appointment</DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">Send Message</DropdownMenuItem>
                          {user?.role === 'admin' && (
                            <>
                              <DropdownMenuItem className="cursor-pointer">Edit Details</DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer text-red-600">
                                Deactivate Doctor
                              </DropdownMenuItem>
                            </>
                          )}
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
            Showing <strong>{filteredDoctors.length}</strong> of{" "}
            <strong>{doctors.length}</strong> doctors
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
              1
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

export default Doctors;
