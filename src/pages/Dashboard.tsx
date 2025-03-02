
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import StatsCard from '@/components/dashboard/StatsCard';
import AppointmentList from '@/components/dashboard/AppointmentList';
import RecentPatients from '@/components/dashboard/RecentPatients';
import ActivityChart from '@/components/dashboard/ActivityChart';
import { AppointmentStatus, UserRole } from '@/components/dashboard/AppointmentList';

// Types
interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  type: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isDoctor = user?.role === 'doctor';
  const isPatient = user?.role === 'patient';
  
  // Initialize appointments state
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientName: 'Olivia Wilson',
      date: 'Today',
      time: '09:00 AM',
      status: 'scheduled',
      type: 'General Checkup'
    },
    {
      id: '2',
      patientName: 'Ethan Martinez',
      date: 'Today',
      time: '11:30 AM',
      status: 'scheduled',
      type: 'Follow-up'
    },
    {
      id: '3',
      patientName: 'Sophia Thompson',
      date: 'Yesterday',
      time: '02:15 PM',
      status: 'completed',
      type: 'Specialist Consultation'
    },
    {
      id: '4',
      patientName: 'Liam Johnson',
      date: 'Yesterday',
      time: '04:00 PM',
      status: 'cancelled',
      type: 'Emergency'
    },
    {
      id: '5',
      patientName: 'Emma Davis',
      date: 'Tomorrow',
      time: '10:45 AM',
      status: 'scheduled',
      type: 'Follow-up'
    }
  ]);
  
  const handleStatusChange = (id: string, newStatus: AppointmentStatus) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status: newStatus } : appointment
    ));
  };
  
  // Sample activity data
  const activityData = [
    { name: 'Mon', value: 12 },
    { name: 'Tue', value: 18 },
    { name: 'Wed', value: 15 },
    { name: 'Thu', value: 25 },
    { name: 'Fri', value: 22 },
    { name: 'Sat', value: 14 },
    { name: 'Sun', value: 10 },
  ];
  
  // Sample patients data for RecentPatients component
  const patients = [
    {
      id: '1',
      name: 'Emma Wilson',
      age: 34,
      gender: 'female',
      condition: 'Hypertension',
      lastVisit: '2 days ago'
    },
    {
      id: '2',
      name: 'James Rodriguez',
      age: 28,
      gender: 'male',
      condition: 'Diabetes Type 2',
      lastVisit: '1 week ago'
    },
    {
      id: '3',
      name: 'Olivia Smith',
      age: 45,
      gender: 'female',
      condition: 'Arthritis',
      lastVisit: '3 days ago'
    },
    {
      id: '4',
      name: 'Noah Johnson',
      age: 52,
      gender: 'male',
      condition: 'COPD',
      lastVisit: 'Yesterday'
    },
    {
      id: '5',
      name: 'Ava Brown',
      age: 19,
      gender: 'female',
      condition: 'Asthma',
      lastVisit: '5 days ago'
    }
  ];
  
  // Stats for different user roles
  const doctorStats = [
    { title: 'Total Patients', value: '248', change: '+12%', icon: 'Users' },
    { title: 'Appointments Today', value: '8', change: '+2', icon: 'Calendar' },
    { title: 'Avg. Appointment Time', value: '24m', change: '-2m', icon: 'Clock' },
    { title: 'Satisfaction Rate', value: '94%', change: '+1%', icon: 'ThumbsUp' },
  ];
  
  const patientStats = [
    { title: 'Upcoming Appointments', value: '2', change: '', icon: 'Calendar' },
    { title: 'Test Results Pending', value: '3', change: '', icon: 'FileText' },
    { title: 'Medications', value: '5', change: '+1', icon: 'Pill' },
    { title: 'Next Check-up', value: '12d', change: '', icon: 'CalendarClock' },
  ];
  
  const adminStats = [
    { title: 'Total Patients', value: '1,248', change: '+8%', icon: 'Users' },
    { title: 'Total Staff', value: '32', change: '+2', icon: 'UserCog' },
    { title: 'Today\'s Appointments', value: '42', change: '+5', icon: 'Calendar' },
    { title: 'Revenue This Month', value: '$86K', change: '+12%', icon: 'DollarSign' },
  ];
  
  // Show stats based on user role
  const stats = isDoctor ? doctorStats : isPatient ? patientStats : adminStats;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {isDoctor ? 'Doctor Dashboard' : isPatient ? 'Patient Dashboard' : 'Hospital Dashboard'}
        </h1>
        
        {isDoctor && (
          <Button onClick={() => navigate('/new-appointment')}>
            Schedule Appointment
          </Button>
        )}
        
        {isPatient && (
          <Button onClick={() => navigate('/new-appointment')}>
            Book Appointment
          </Button>
        )}
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatsCard
            key={i}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </div>
      
      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-7">
        {/* Appointments Column */}
        <div className="md:col-span-4 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Appointments</CardTitle>
                <CardDescription>Manage your upcoming appointments</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate('/appointments')}>
                View all
              </Button>
            </CardHeader>
            <CardContent>
              <AppointmentList 
                appointments={appointments} 
                onStatusChange={handleStatusChange}
                userRole={user?.role}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Activity Overview</CardTitle>
              <CardDescription>Your activity over the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityChart data={activityData} />
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column */}
        <div className="md:col-span-3">
          <Tabs defaultValue="patients">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="patients" className="flex-1">Patients</TabsTrigger>
              <TabsTrigger value="tasks" className="flex-1">Tasks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="patients">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Patients</CardTitle>
                  <CardDescription>Latest patient activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentPatients patients={patients} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tasks">
              <Card>
                <CardHeader>
                  <CardTitle>Your Tasks</CardTitle>
                  <CardDescription>Tasks that need your attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center p-2 rounded-md hover:bg-slate-100 transition-all">
                      <div className="h-2 w-2 bg-red-500 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Review lab results for Olivia Wilson</p>
                        <p className="text-xs text-muted-foreground">Due in 2 hours</p>
                      </div>
                      <Button variant="ghost" size="sm">Complete</Button>
                    </div>
                    
                    <div className="flex items-center p-2 rounded-md hover:bg-slate-100 transition-all">
                      <div className="h-2 w-2 bg-amber-500 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Update patient records</p>
                        <p className="text-xs text-muted-foreground">Due tomorrow</p>
                      </div>
                      <Button variant="ghost" size="sm">Complete</Button>
                    </div>
                    
                    <div className="flex items-center p-2 rounded-md hover:bg-slate-100 transition-all">
                      <div className="h-2 w-2 bg-amber-500 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Schedule follow-up with Ethan Martinez</p>
                        <p className="text-xs text-muted-foreground">Due tomorrow</p>
                      </div>
                      <Button variant="ghost" size="sm">Complete</Button>
                    </div>
                    
                    <div className="flex items-center p-2 rounded-md hover:bg-slate-100 transition-all">
                      <div className="h-2 w-2 bg-green-500 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Prepare monthly department report</p>
                        <p className="text-xs text-muted-foreground">Due in 3 days</p>
                      </div>
                      <Button variant="ghost" size="sm">Complete</Button>
                    </div>
                    
                    <div className="flex items-center p-2 rounded-md hover:bg-slate-100 transition-all">
                      <div className="h-2 w-2 bg-green-500 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Review new medical equipment proposals</p>
                        <p className="text-xs text-muted-foreground">Due in 5 days</p>
                      </div>
                      <Button variant="ghost" size="sm">Complete</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
