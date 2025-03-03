
import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Stethoscope, 
  User 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  doctorId: string;
  specialty: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  type: string;
  notes?: string;
}

// Sample data for appointments
const appointmentsData: Appointment[] = [
  {
    id: "1",
    patientName: "Olivia Wilson",
    patientId: "P12345",
    doctorName: "Dr. Jane Smith",
    doctorId: "D1",
    specialty: "Cardiology",
    date: "2023-03-15",
    time: "09:00 AM",
    status: "scheduled",
    type: "General Checkup",
    notes: "Follow-up on previous heart condition",
  },
  {
    id: "2",
    patientName: "James Smith",
    patientId: "P12346",
    doctorName: "Dr. Michael Johnson",
    doctorId: "D2",
    specialty: "Neurology",
    date: "2023-03-15",
    time: "10:30 AM",
    status: "completed",
    type: "Follow-up",
    notes: "Discuss MRI results",
  },
  {
    id: "3",
    patientName: "Emma Johnson",
    patientId: "P12347",
    doctorName: "Dr. Sarah Williams",
    doctorId: "D3",
    specialty: "Pediatrics",
    date: "2023-03-16",
    time: "11:45 AM",
    status: "scheduled",
    type: "Vaccination",
  },
  {
    id: "4",
    patientName: "William Brown",
    patientId: "P12348",
    doctorName: "Dr. Robert Brown",
    doctorId: "D4",
    specialty: "Orthopedics",
    date: "2023-03-16",
    time: "01:15 PM",
    status: "no-show",
    type: "Joint Pain",
  },
  {
    id: "5",
    patientName: "Sophia Davis",
    patientId: "P12349",
    doctorName: "Dr. Emily Davis",
    doctorId: "D5",
    specialty: "Dermatology",
    date: "2023-03-17",
    time: "03:00 PM",
    status: "scheduled",
    type: "Skin Examination",
  },
  {
    id: "6",
    patientName: "John Miller",
    patientId: "P12350",
    doctorName: "Dr. James Wilson",
    doctorId: "D6",
    specialty: "General Medicine",
    date: "2023-03-17",
    time: "04:30 PM",
    status: "cancelled",
    type: "Annual Checkup",
    notes: "Patient requested cancellation",
  },
  {
    id: "7",
    patientName: "Isabella Moore",
    patientId: "P12351",
    doctorName: "Dr. Jane Smith",
    doctorId: "D1",
    specialty: "Cardiology",
    date: "2023-03-18",
    time: "09:30 AM",
    status: "scheduled",
    type: "ECG",
  },
  {
    id: "8",
    patientName: "Lucas Garcia",
    patientId: "P12352",
    doctorName: "Dr. Michael Johnson",
    doctorId: "D2",
    specialty: "Neurology",
    date: "2023-03-18",
    time: "11:00 AM",
    status: "scheduled",
    type: "Neurological Assessment",
  },
];

const getStatusBadge = (status: Appointment['status']) => {
  switch (status) {
    case 'scheduled':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Scheduled</Badge>;
    case 'completed':
      return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Completed</Badge>;
    case 'cancelled':
      return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">Cancelled</Badge>;
    case 'no-show':
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">No Show</Badge>;
    default:
      return null;
  }
};

const Appointments = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments, setAppointments] = useState(appointmentsData);
  
  // Filter appointments based on user role
  const userAppointments = user?.role === 'patient' 
    ? appointments.filter(app => app.patientId === 'P12345') // Hardcoded for demo
    : user?.role === 'doctor'
    ? appointments.filter(app => app.doctorId === 'D1') // Hardcoded for demo
    : appointments;
  
  const filteredAppointments = userAppointments.filter(app => {
    // Filter by status
    if (activeTab !== 'all' && app.status !== activeTab) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        app.patientName.toLowerCase().includes(searchLower) ||
        app.doctorName.toLowerCase().includes(searchLower) ||
        app.type.toLowerCase().includes(searchLower) ||
        app.specialty.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  const handleStatusChange = (id: string, newStatus: Appointment['status']) => {
    setAppointments(prevAppointments => 
      prevAppointments.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
    
    const statusMessages = {
      completed: "Appointment marked as completed",
      cancelled: "Appointment has been cancelled",
      "no-show": "Patient marked as no-show"
    };
    
    toast({
      title: statusMessages[newStatus] || "Appointment status updated",
      description: `Appointment ID: ${id}`,
    });
  };
  
  return (
    <div className="animate-slide-in-up">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">
            {user?.role === 'patient' 
              ? 'Manage your upcoming appointments'
              : user?.role === 'doctor'
              ? 'View and manage your patient appointments'
              : 'Manage and schedule patient appointments'}
          </p>
        </div>
        
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative w-full sm:w-auto">
            <Input
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-8 w-full"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 h-10 w-10"
              onClick={() => setSearchTerm('')}
            >
              {searchTerm ? 'X' : <Filter className="h-4 w-4" />}
            </Button>
          </div>
          <Button 
            className="gap-1"
            onClick={() => navigate('/new-appointment')}
          >
            <Plus className="h-4 w-4" />
            <span>New Appointment</span>
          </Button>
        </div>
      </div>
      
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-sm font-medium">March 15 - 21, 2023</h2>
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="outline" size="sm" className="h-7">Today</Button>
          <Button variant="outline" size="sm" className="h-7">Week</Button>
          <Button variant="outline" size="sm" className="h-7">Month</Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          <TabsTrigger value="no-show">No Show</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="rounded-xl border shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50 text-left text-sm font-medium text-muted-foreground">
                  <th className="whitespace-nowrap px-4 py-3">Patient</th>
                  <th className="whitespace-nowrap px-4 py-3">Doctor</th>
                  <th className="whitespace-nowrap px-4 py-3">Date & Time</th>
                  <th className="whitespace-nowrap px-4 py-3">Type</th>
                  <th className="whitespace-nowrap px-4 py-3">Status</th>
                  <th className="whitespace-nowrap px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center">
                      <div className="flex flex-col items-center">
                        <Calendar className="mb-2 h-8 w-8 text-muted-foreground/60" />
                        <h3 className="text-base font-medium">No appointments found</h3>
                        <p className="text-sm text-muted-foreground">
                          Try changing your filters or create a new appointment.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b text-sm transition-colors hover:bg-muted/40">
                      <td className="whitespace-nowrap px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{appointment.patientName}</div>
                            <div className="text-xs text-muted-foreground">ID: {appointment.patientId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <div className="flex flex-col">
                          <div className="font-medium">{appointment.doctorName}</div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Stethoscope className="h-3 w-3" />
                            {appointment.specialty}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{new Date(appointment.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">{appointment.type}</td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {getStatusBadge(appointment.status)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white">
                            <DropdownMenuItem 
                              className="cursor-pointer"
                              onClick={() => toast({
                                title: "Viewing details",
                                description: `Appointment for ${appointment.patientName}`
                              })}
                            >
                              View Details
                            </DropdownMenuItem>
                            
                            {(user?.role === 'doctor' || user?.role === 'admin') && (
                              <DropdownMenuItem 
                                className="cursor-pointer"
                                onClick={() => toast({
                                  title: "Edit appointment",
                                  description: "Opening appointment editor"
                                })}
                              >
                                Edit Appointment
                              </DropdownMenuItem>
                            )}
                            
                            <DropdownMenuItem 
                              className="cursor-pointer"
                              onClick={() => toast({
                                title: "Reschedule",
                                description: "Opening reschedule form"
                              })}
                            >
                              Reschedule
                            </DropdownMenuItem>
                            
                            {appointment.status === 'scheduled' && (
                              <DropdownMenuItem 
                                className="cursor-pointer text-red-600"
                                onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                              >
                                Cancel
                              </DropdownMenuItem>
                            )}
                            
                            {user?.role === 'doctor' && appointment.status === 'scheduled' && (
                              <DropdownMenuItem 
                                className="cursor-pointer text-green-600"
                                onClick={() => handleStatusChange(appointment.id, 'completed')}
                              >
                                Mark Completed
                              </DropdownMenuItem>
                            )}
                            
                            {user?.role === 'doctor' && appointment.status === 'scheduled' && (
                              <DropdownMenuItem 
                                className="cursor-pointer text-amber-600"
                                onClick={() => handleStatusChange(appointment.id, 'no-show')}
                              >
                                Mark No-Show
                              </DropdownMenuItem>
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Appointments;
