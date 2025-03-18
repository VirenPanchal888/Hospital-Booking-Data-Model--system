
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Phone, Mail, Calendar, Download, Filter } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const StaffDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample staff data
  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', email: 'sarah.johnson@hospital.com', phone: '(555) 123-4567', status: 'Available' },
    { id: 2, name: 'Dr. David Lee', specialty: 'Neurology', email: 'david.lee@hospital.com', phone: '(555) 234-5678', status: 'In Surgery' },
    { id: 3, name: 'Dr. Maria Garcia', specialty: 'Pediatrics', email: 'maria.garcia@hospital.com', phone: '(555) 345-6789', status: 'Available' },
    { id: 4, name: 'Dr. James Wilson', specialty: 'Orthopedics', email: 'james.wilson@hospital.com', phone: '(555) 456-7890', status: 'On Call' },
    { id: 5, name: 'Dr. Lisa Chen', specialty: 'Dermatology', email: 'lisa.chen@hospital.com', phone: '(555) 567-8901', status: 'Available' },
    { id: 6, name: 'Dr. Michael Brown', specialty: 'Internal Medicine', email: 'michael.brown@hospital.com', phone: '(555) 678-9012', status: 'With Patient' },
    { id: 7, name: 'Dr. Emily Davis', specialty: 'Ophthalmology', email: 'emily.davis@hospital.com', phone: '(555) 789-0123', status: 'Available' },
    { id: 8, name: 'Dr. Robert Martinez', specialty: 'Urology', email: 'robert.martinez@hospital.com', phone: '(555) 890-1234', status: 'On Leave' },
  ];
  
  const nurses = [
    { id: 1, name: 'Nurse Johnson', department: 'Cardiology', email: 'nurse.johnson@hospital.com', phone: '(555) 123-4567', status: 'On Duty' },
    { id: 2, name: 'Nurse Wilson', department: 'Emergency', email: 'nurse.wilson@hospital.com', phone: '(555) 234-5678', status: 'On Duty' },
    { id: 3, name: 'Nurse Martinez', department: 'Pediatrics', email: 'nurse.martinez@hospital.com', phone: '(555) 345-6789', status: 'Break' },
    { id: 4, name: 'Nurse Thompson', department: 'Surgery', email: 'nurse.thompson@hospital.com', phone: '(555) 456-7890', status: 'On Duty' },
    { id: 5, name: 'Nurse Davis', department: 'Oncology', email: 'nurse.davis@hospital.com', phone: '(555) 567-8901', status: 'On Duty' },
    { id: 6, name: 'Nurse Brown', department: 'ICU', email: 'nurse.brown@hospital.com', phone: '(555) 678-9012', status: 'Off Duty' },
    { id: 7, name: 'Nurse Taylor', department: 'Neurology', email: 'nurse.taylor@hospital.com', phone: '(555) 789-0123', status: 'On Duty' },
    { id: 8, name: 'Nurse White', department: 'Maternity', email: 'nurse.white@hospital.com', phone: '(555) 890-1234', status: 'On Duty' },
  ];
  
  const staff = [
    { id: 1, name: 'John Smith', role: 'Lab Technician', department: 'Laboratory', email: 'john.smith@hospital.com', phone: '(555) 123-4567', status: 'On Duty' },
    { id: 2, name: 'Jane Doe', role: 'Pharmacist', department: 'Pharmacy', email: 'jane.doe@hospital.com', phone: '(555) 234-5678', status: 'On Duty' },
    { id: 3, name: 'Michael Johnson', role: 'Radiologist', department: 'Radiology', email: 'michael.j@hospital.com', phone: '(555) 345-6789', status: 'Break' },
    { id: 4, name: 'Emily Wilson', role: 'Physical Therapist', department: 'Rehabilitation', email: 'emily.w@hospital.com', phone: '(555) 456-7890', status: 'With Patient' },
    { id: 5, name: 'Robert Brown', role: 'IT Specialist', department: 'IT', email: 'robert.b@hospital.com', phone: '(555) 567-8901', status: 'On Duty' },
    { id: 6, name: 'Sarah Davis', role: 'Administrative Assistant', department: 'Administration', email: 'sarah.d@hospital.com', phone: '(555) 678-9012', status: 'On Duty' },
    { id: 7, name: 'David Lee', role: 'Nutritionist', department: 'Nutrition', email: 'david.l@hospital.com', phone: '(555) 789-0123', status: 'On Duty' },
    { id: 8, name: 'Maria Garcia', role: 'Social Worker', department: 'Social Services', email: 'maria.g@hospital.com', phone: '(555) 890-1234', status: 'Off Duty' },
  ];
  
  // Filter staff based on search term
  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredNurses = nurses.filter(nurse => 
    nurse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nurse.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredStaff = staff.filter(staffMember => 
    staffMember.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staffMember.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staffMember.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get status badge with appropriate color
  const getStatusBadge = (status: string) => {
    let variant: "default" | "destructive" | "outline" | "secondary" = "default";
    
    switch (status.toLowerCase()) {
      case 'available':
      case 'on duty':
        variant = "default";
        break;
      case 'in surgery':
      case 'with patient':
      case 'on call':
        variant = "secondary";
        break;
      case 'break':
        variant = "outline";
        break;
      case 'off duty':
      case 'on leave':
        variant = "destructive";
        break;
    }
    
    return <Badge variant={variant}>{status}</Badge>;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Staff Directory</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Directory
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            View Schedule
          </Button>
        </div>
      </div>
      
      <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
        <Input
          type="search"
          placeholder="Search staff..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs defaultValue="doctors">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="nurses">Nurses</TabsTrigger>
          <TabsTrigger value="staff">Other Staff</TabsTrigger>
        </TabsList>
        
        <TabsContent value="doctors">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Doctors Directory</CardTitle>
                <CardDescription>
                  All doctors working in the hospital
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter by Specialty
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredDoctors.map((doctor) => (
                  <div key={doctor.id} className="flex flex-col items-start space-y-4 rounded-lg border p-4">
                    <div className="flex w-full justify-between">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/placeholder.svg`} alt={doctor.name} />
                        <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {getStatusBadge(doctor.status)}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    </div>
                    <div className="w-full space-y-2">
                      <div className="flex items-center text-sm">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{doctor.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{doctor.phone}</span>
                      </div>
                    </div>
                    <div className="flex w-full justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Doctor Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>View Schedule</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          <DropdownMenuItem>Schedule Meeting</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="nurses">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Nurses Directory</CardTitle>
                <CardDescription>
                  All nurses working in the hospital
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter by Department
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNurses.map((nurse) => (
                    <TableRow key={nurse.id}>
                      <TableCell className="font-medium">{nurse.name}</TableCell>
                      <TableCell>{nurse.department}</TableCell>
                      <TableCell>{nurse.email}</TableCell>
                      <TableCell>{nurse.phone}</TableCell>
                      <TableCell>{getStatusBadge(nurse.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Nurse Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>View Schedule</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                            <DropdownMenuItem>Assign Tasks</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="staff">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Support Staff Directory</CardTitle>
                <CardDescription>
                  All support staff working in the hospital
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter by Role
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.map((staffMember) => (
                    <TableRow key={staffMember.id}>
                      <TableCell className="font-medium">{staffMember.name}</TableCell>
                      <TableCell>{staffMember.role}</TableCell>
                      <TableCell>{staffMember.department}</TableCell>
                      <TableCell>{staffMember.email}</TableCell>
                      <TableCell>{staffMember.phone}</TableCell>
                      <TableCell>{getStatusBadge(staffMember.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffDirectory;
