
import React from 'react';
import { 
  CalendarDays, 
  Mail, 
  MoreHorizontal, 
  Phone, 
  Search, 
  Stethoscope, 
  UserPlus 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Sample data for doctors
const doctorsData = [
  {
    id: '1',
    name: 'Dr. Jane Smith',
    avatar: '',
    specialty: 'Cardiology',
    patients: 48,
    experience: '12 years',
    availability: 'Mon, Wed, Fri',
    email: 'jane.smith@hospital.com',
    phone: '+1 (555) 123-4567',
    status: 'available',
  },
  {
    id: '2',
    name: 'Dr. Michael Johnson',
    avatar: '',
    specialty: 'Neurology',
    patients: 56,
    experience: '15 years',
    availability: 'Tue, Thu, Sat',
    email: 'michael.johnson@hospital.com',
    phone: '+1 (555) 234-5678',
    status: 'available',
  },
  {
    id: '3',
    name: 'Dr. Sarah Williams',
    avatar: '',
    specialty: 'Pediatrics',
    patients: 72,
    experience: '8 years',
    availability: 'Mon, Tue, Wed, Thu, Fri',
    email: 'sarah.williams@hospital.com',
    phone: '+1 (555) 345-6789',
    status: 'unavailable',
  },
  {
    id: '4',
    name: 'Dr. Robert Brown',
    avatar: '',
    specialty: 'Orthopedics',
    patients: 39,
    experience: '20 years',
    availability: 'Mon, Thu, Fri',
    email: 'robert.brown@hospital.com',
    phone: '+1 (555) 456-7890',
    status: 'available',
  },
  {
    id: '5',
    name: 'Dr. Emily Davis',
    avatar: '',
    specialty: 'Dermatology',
    patients: 64,
    experience: '10 years',
    availability: 'Tue, Wed, Fri',
    email: 'emily.davis@hospital.com',
    phone: '+1 (555) 567-8901',
    status: 'unavailable',
  },
  {
    id: '6',
    name: 'Dr. James Wilson',
    avatar: '',
    specialty: 'General Medicine',
    patients: 91,
    experience: '25 years',
    availability: 'Mon, Tue, Wed, Thu, Fri',
    email: 'james.wilson@hospital.com',
    phone: '+1 (555) 678-9012',
    status: 'available',
  },
];

const Doctors = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredDoctors = doctorsData.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="animate-slide-in-up">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Doctors</h1>
          <p className="text-muted-foreground">
            View and manage all doctors in the hospital.
          </p>
        </div>
        
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search doctors..."
              className="pl-8 pr-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="gap-1">
            <UserPlus className="h-4 w-4" />
            <span>Add Doctor</span>
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden">
            <CardHeader className="border-b bg-muted/30 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {doctor.avatar ? (
                      <img
                        src={doctor.avatar}
                        alt={doctor.name}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      doctor.name.split(' ').map(n => n[0]).join('')
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-base">{doctor.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Stethoscope className="h-3 w-3" />
                      {doctor.specialty}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={doctor.status === 'available' ? 'outline' : 'secondary'}>
                    {doctor.status === 'available' ? 'Available' : 'Unavailable'}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Schedule Appointment</DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-muted-foreground">Patients</div>
                    <div className="font-medium">{doctor.patients}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Experience</div>
                    <div className="font-medium">{doctor.experience}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span>Available: {doctor.availability}</span>
                </div>
                
                <div className="flex flex-col gap-1.5 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{doctor.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{doctor.phone}</span>
                  </div>
                </div>
                
                <Button className="mt-2 w-full" variant="outline">
                  Schedule Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
