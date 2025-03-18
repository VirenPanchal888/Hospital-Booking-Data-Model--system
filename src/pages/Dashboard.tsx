
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
import { AppointmentStatus } from '@/components/dashboard/AppointmentList';
import { UserRole } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

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
  
  // If user is not logged in, show login message
  if (!user) {
    toast({
      title: "Not logged in",
      description: "Please log in to view your dashboard",
      variant: "destructive"
    });
    navigate('/login');
    return null;
  }
  
  const isDoctor = user?.role === 'doctor';
  const isPatient = user?.role === 'patient';
  const isAdmin = user?.role === 'admin';
  
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
  
  // Patient specific data
  const patientAppointments = isPatient ? appointments.slice(0, 3) : appointments;
  
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
  
  // Render appropriate dashboard based on role
  const renderDashboard = () => {
    if (isPatient) {
      return renderPatientDashboard();
    } else if (isDoctor) {
      return renderDoctorDashboard();
    } else {
      return renderAdminDashboard();
    }
  };
  
  // Patient Dashboard
  const renderPatientDashboard = () => {
    return (
      <>
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
          {/* Left Column */}
          <div className="md:col-span-4 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Your Appointments</CardTitle>
                  <CardDescription>Manage your upcoming appointments</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/appointments')}>
                  View all
                </Button>
              </CardHeader>
              <CardContent>
                <AppointmentList 
                  appointments={patientAppointments} 
                  onStatusChange={handleStatusChange}
                  userRole={user?.role}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Your Health Overview</CardTitle>
                <CardDescription>Track your health metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityChart data={activityData} />
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column */}
          <div className="md:col-span-3">
            <Tabs defaultValue="medications">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="medications" className="flex-1">Medications</TabsTrigger>
                <TabsTrigger value="records" className="flex-1">Records</TabsTrigger>
              </TabsList>
              
              <TabsContent value="medications">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Medications</CardTitle>
                    <CardDescription>Current prescriptions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center p-2 rounded-md hover:bg-slate-100 transition-all">
                        <div className="h-2 w-2 bg-green-500 rounded-full mr-3"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Lisinopril (10mg)</p>
                          <p className="text-xs text-muted-foreground">Once daily - Dr. Jane Smith</p>
                        </div>
                        <Button variant="ghost" size="sm">Details</Button>
                      </div>
                      
                      <div className="flex items-center p-2 rounded-md hover:bg-slate-100 transition-all">
                        <div className="h-2 w-2 bg-green-500 rounded-full mr-3"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Atorvastatin (20mg)</p>
                          <p className="text-xs text-muted-foreground">Once daily at bedtime - Dr. Jane Smith</p>
                        </div>
                        <Button variant="ghost" size="sm">Details</Button>
                      </div>
                      
                      <div className="flex items-center p-2 rounded-md hover:bg-slate-100 transition-all">
                        <div className="h-2 w-2 bg-amber-500 rounded-full mr-3"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Metformin (500mg)</p>
                          <p className="text-xs text-muted-foreground">Twice daily with meals - Dr. Michael Chen</p>
                        </div>
                        <Button variant="ghost" size="sm">Details</Button>
                      </div>
                      
                      <div className="flex items-center p-2 rounded-md hover:bg-slate-100 transition-all">
                        <div className="h-2 w-2 bg-red-500 rounded-full mr-3"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Amoxicillin (500mg)</p>
                          <p className="text-xs text-muted-foreground">Three times daily - Dr. Sarah Johnson</p>
                        </div>
                        <Button variant="ghost" size="sm">Details</Button>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <Button variant="outline" className="w-full" onClick={() => navigate('/pharmacy')}>
                        View All Medications
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="records">
                <Card>
                  <CardHeader>
                    <CardTitle>Medical Records</CardTitle>
                    <CardDescription>Your recent health records</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <p className="font-medium">Blood Test Results</p>
                          <p className="text-sm text-muted-foreground">2 weeks ago</p>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <p className="font-medium">Annual Physical</p>
                          <p className="text-sm text-muted-foreground">1 month ago</p>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <p className="font-medium">Vaccination Record</p>
                          <p className="text-sm text-muted-foreground">3 months ago</p>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <Button variant="outline" className="w-full" onClick={() => navigate('/medical-records')}>
                        View All Records
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </>
    );
  };
  
  // Doctor Dashboard
  const renderDoctorDashboard = () => {
    return (
      <>
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
                  <CardTitle>Today's Appointments</CardTitle>
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
                <CardTitle>Patient Activity</CardTitle>
                <CardDescription>Patient visits over the past 30 days</CardDescription>
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
      </>
    );
  };
  
  // Admin Dashboard
  const renderAdminDashboard = () => {
    return (
      <>
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
          {/* Left Column */}
          <div className="md:col-span-4 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Hospital Overview</CardTitle>
                  <CardDescription>Key metrics and performance</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/analytics')}>
                  Detailed View
                </Button>
              </CardHeader>
              <CardContent>
                <ActivityChart data={activityData} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Today's Appointments</CardTitle>
                  <CardDescription>All scheduled appointments</CardDescription>
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
          </div>
          
          {/* Right Column */}
          <div className="md:col-span-3">
            <Tabs defaultValue="staff">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="staff" className="flex-1">Staff</TabsTrigger>
                <TabsTrigger value="patients" className="flex-1">Patients</TabsTrigger>
              </TabsList>
              
              <TabsContent value="staff">
                <Card>
                  <CardHeader>
                    <CardTitle>Staff Overview</CardTitle>
                    <CardDescription>Current staff status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Doctors on duty</span>
                        <span className="font-medium">12/15</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Nurses on duty</span>
                        <span className="font-medium">18/20</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Support staff</span>
                        <span className="font-medium">8/10</span>
                      </div>
                      <div className="h-px bg-border"></div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Staff attendance rate</span>
                        <span className="font-medium text-green-600">92%</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <Button variant="outline" className="w-full" onClick={() => navigate('/doctors')}>
                        Manage Staff
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
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
            </Tabs>
          </div>
        </div>
      </>
    );
  };
  
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
      
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;
