
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Search, Download, Filter, UserPlus, Trash2, Edit, Eye } from 'lucide-react';

const DatabaseManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Sample data
  const patients = [
    { id: 1, name: 'John Doe', dob: '1985-05-15', gender: 'Male', insurance: 'BlueCross', lastVisit: '2023-04-12' },
    { id: 2, name: 'Jane Smith', dob: '1990-08-22', gender: 'Female', insurance: 'Aetna', lastVisit: '2023-03-28' },
    { id: 3, name: 'Michael Johnson', dob: '1978-11-30', gender: 'Male', insurance: 'Medicare', lastVisit: '2023-04-05' },
    { id: 4, name: 'Emily Wilson', dob: '1992-02-17', gender: 'Female', insurance: 'United', lastVisit: '2023-04-10' },
    { id: 5, name: 'Robert Brown', dob: '1965-07-08', gender: 'Male', insurance: 'Cigna', lastVisit: '2023-03-15' },
  ];
  
  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', department: 'Cardiology', patients: 42, rating: 4.8 },
    { id: 2, name: 'Dr. David Lee', specialty: 'Neurology', department: 'Neurology', patients: 38, rating: 4.7 },
    { id: 3, name: 'Dr. Maria Garcia', specialty: 'Pediatrics', department: 'Pediatrics', patients: 55, rating: 4.9 },
    { id: 4, name: 'Dr. James Wilson', specialty: 'Orthopedics', department: 'Orthopedics', patients: 45, rating: 4.6 },
    { id: 5, name: 'Dr. Lisa Chen', specialty: 'Dermatology', department: 'Dermatology', patients: 50, rating: 4.8 },
  ];
  
  const appointments = [
    { id: 1, patient: 'John Doe', doctor: 'Dr. Sarah Johnson', date: '2023-04-15', time: '09:00 AM', status: 'Confirmed' },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. David Lee', date: '2023-04-16', time: '10:30 AM', status: 'Pending' },
    { id: 3, patient: 'Michael Johnson', doctor: 'Dr. Maria Garcia', date: '2023-04-17', time: '02:00 PM', status: 'Confirmed' },
    { id: 4, patient: 'Emily Wilson', doctor: 'Dr. James Wilson', date: '2023-04-18', time: '11:15 AM', status: 'Canceled' },
    { id: 5, patient: 'Robert Brown', doctor: 'Dr. Lisa Chen', date: '2023-04-19', time: '03:30 PM', status: 'Confirmed' },
  ];
  
  const medications = [
    { id: 1, name: 'Lisinopril', category: 'ACE Inhibitor', stock: 150, prescribed: 85, expiry: '2024-06-15' },
    { id: 2, name: 'Atorvastatin', category: 'Statin', stock: 200, prescribed: 120, expiry: '2024-08-22' },
    { id: 3, name: 'Metformin', category: 'Antidiabetic', stock: 180, prescribed: 95, expiry: '2024-07-10' },
    { id: 4, name: 'Levothyroxine', category: 'Thyroid Hormone', stock: 120, prescribed: 60, expiry: '2024-09-05' },
    { id: 5, name: 'Amoxicillin', category: 'Antibiotic', stock: 100, prescribed: 75, expiry: '2023-12-30' },
  ];
  
  const billing = [
    { id: 1, patient: 'John Doe', date: '2023-04-12', amount: 150.00, insurance: 'BlueCross', status: 'Paid' },
    { id: 2, patient: 'Jane Smith', date: '2023-03-28', amount: 220.50, insurance: 'Aetna', status: 'Pending' },
    { id: 3, patient: 'Michael Johnson', date: '2023-04-05', amount: 350.75, insurance: 'Medicare', status: 'Paid' },
    { id: 4, patient: 'Emily Wilson', date: '2023-04-10', amount: 180.25, insurance: 'United', status: 'Overdue' },
    { id: 5, patient: 'Robert Brown', date: '2023-03-15', amount: 275.00, insurance: 'Cigna', status: 'Paid' },
  ];
  
  // Filtered data based on search term
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.insurance.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredAppointments = appointments.filter(appointment => 
    appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredMedications = medications.filter(medication => 
    medication.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medication.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredBilling = billing.filter(bill => 
    bill.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Renders status badge with different colors based on status
  const renderStatusBadge = (status: string) => {
    let className = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ";
    
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'paid':
        className += "bg-green-100 text-green-800";
        break;
      case 'pending':
        className += "bg-yellow-100 text-yellow-800";
        break;
      case 'canceled':
      case 'overdue':
        className += "bg-red-100 text-red-800";
        break;
      default:
        className += "bg-gray-100 text-gray-800";
    }
    
    return <span className={className}>{status}</span>;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Database Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveFilter('all')}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveFilter('recent')}>Recent</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveFilter('active')}>Active</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveFilter('inactive')}>Inactive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
        <Input
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <Button type="submit" size="icon" className="shrink-0">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
      
      <Tabs defaultValue="patients">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="patients">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Patients Database</CardTitle>
                <CardDescription>
                  Manage and view all patient information
                </CardDescription>
              </div>
              <Button onClick={() => navigate('/patients/add')}>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Patient
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>DOB</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Insurance</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>{patient.id}</TableCell>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.dob}</TableCell>
                      <TableCell>{patient.gender}</TableCell>
                      <TableCell>{patient.insurance}</TableCell>
                      <TableCell>{patient.lastVisit}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigate(`/patients/${patient.id}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/patients/${patient.id}/edit`)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
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
        
        <TabsContent value="doctors">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Doctors Database</CardTitle>
                <CardDescription>
                  Manage and view all doctor information
                </CardDescription>
              </div>
              <Button onClick={() => navigate('/doctors/add')}>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Doctor
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Patients</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDoctors.map((doctor) => (
                    <TableRow key={doctor.id}>
                      <TableCell>{doctor.id}</TableCell>
                      <TableCell>{doctor.name}</TableCell>
                      <TableCell>{doctor.specialty}</TableCell>
                      <TableCell>{doctor.department}</TableCell>
                      <TableCell>{doctor.patients}</TableCell>
                      <TableCell>{doctor.rating}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigate(`/doctors/${doctor.id}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/doctors/${doctor.id}/edit`)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
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
        
        <TabsContent value="appointments">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Appointments Database</CardTitle>
                <CardDescription>
                  Manage and view all appointment information
                </CardDescription>
              </div>
              <Button onClick={() => navigate('/new-appointment')}>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Appointment
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.id}</TableCell>
                      <TableCell>{appointment.patient}</TableCell>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{renderStatusBadge(appointment.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigate(`/appointments/${appointment.id}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/appointments/${appointment.id}/edit`)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
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
        
        <TabsContent value="medications">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Medications Database</CardTitle>
                <CardDescription>
                  Manage and view all medication information
                </CardDescription>
              </div>
              <Button onClick={() => navigate('/pharmacy/add')}>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Medication
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Prescribed</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMedications.map((medication) => (
                    <TableRow key={medication.id}>
                      <TableCell>{medication.id}</TableCell>
                      <TableCell>{medication.name}</TableCell>
                      <TableCell>{medication.category}</TableCell>
                      <TableCell>{medication.stock}</TableCell>
                      <TableCell>{medication.prescribed}</TableCell>
                      <TableCell>{medication.expiry}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigate(`/pharmacy/${medication.id}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/pharmacy/${medication.id}/edit`)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
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
        
        <TabsContent value="billing">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Billing Database</CardTitle>
                <CardDescription>
                  Manage and view all billing information
                </CardDescription>
              </div>
              <Button onClick={() => navigate('/billing/add')}>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Bill
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Insurance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBilling.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell>{bill.id}</TableCell>
                      <TableCell>{bill.patient}</TableCell>
                      <TableCell>{bill.date}</TableCell>
                      <TableCell>${bill.amount.toFixed(2)}</TableCell>
                      <TableCell>{bill.insurance}</TableCell>
                      <TableCell>{renderStatusBadge(bill.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigate(`/billing/${bill.id}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/billing/${bill.id}/edit`)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
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
      </Tabs>
    </div>
  );
};

export default DatabaseManagement;
