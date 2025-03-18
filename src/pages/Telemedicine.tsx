
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Video, Calendar, Users, Settings, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Telemedicine: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock upcoming appointments
  const upcomingAppointments = [
    {
      id: 'tel-001',
      patientName: 'Emma Wilson',
      date: '2023-06-20',
      time: '10:30 AM',
      doctor: 'Dr. Jane Smith',
      status: 'scheduled'
    },
    {
      id: 'tel-002',
      patientName: 'James Rodriguez',
      date: '2023-06-21',
      time: '2:15 PM',
      doctor: 'Dr. Michael Chen',
      status: 'scheduled'
    },
    {
      id: 'tel-003',
      patientName: 'Sophie Brown',
      date: '2023-06-22',
      time: '11:00 AM',
      doctor: 'Dr. Jane Smith',
      status: 'scheduled'
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-3xl font-bold tracking-tight">Telemedicine</h1>
        <Button className="mt-4 sm:mt-0 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Consultation
        </Button>
      </div>
      
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
          <TabsTrigger value="patients">My Patients</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Telemedicine Sessions</CardTitle>
              <CardDescription>Your scheduled virtual consultations</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border hover:bg-accent/5 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <Video className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{appointment.patientName}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {appointment.doctor}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4 sm:mt-0">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">No upcoming appointments</h3>
                  <p className="text-muted-foreground mt-1 mb-4">Schedule a telemedicine consultation</p>
                  <Button onClick={() => navigate('/appointments/new')}>
                    Schedule Now
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Start</CardTitle>
                <CardDescription>Prepare for your consultation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-md border">
                  <h3 className="font-medium mb-1">Check your equipment</h3>
                  <p className="text-sm text-muted-foreground">Ensure your camera and microphone are working</p>
                </div>
                <div className="p-3 rounded-md border">
                  <h3 className="font-medium mb-1">Find a quiet space</h3>
                  <p className="text-sm text-muted-foreground">Minimize background noise during your session</p>
                </div>
                <div className="p-3 rounded-md border">
                  <h3 className="font-medium mb-1">Test your connection</h3>
                  <p className="text-sm text-muted-foreground">Ensure you have a stable internet connection</p>
                </div>
                <Button variant="outline" className="w-full">
                  Run System Test
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Join via Mobile</CardTitle>
                <CardDescription>Use your smartphone or tablet</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-md p-6 mb-4">
                  <div className="aspect-square w-32 h-32 mx-auto border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-md flex items-center justify-center">
                    <span className="text-xl font-bold text-slate-400 dark:text-slate-500">QR</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Scan this QR code with your mobile device to join the consultation</p>
                <Button variant="outline" className="w-full">
                  Send Link to Phone
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Help & Support</CardTitle>
                <CardDescription>Get assistance with telemedicine</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-md border">
                  <h3 className="font-medium mb-1">Technical Support</h3>
                  <p className="text-sm text-muted-foreground">Contact our team for technical issues</p>
                  <Button variant="link" className="p-0 h-auto text-sm">Get Help</Button>
                </div>
                <div className="p-3 rounded-md border">
                  <h3 className="font-medium mb-1">User Guide</h3>
                  <p className="text-sm text-muted-foreground">How to use telemedicine platform</p>
                  <Button variant="link" className="p-0 h-auto text-sm">View Guide</Button>
                </div>
                <div className="p-3 rounded-md border">
                  <h3 className="font-medium mb-1">FAQ</h3>
                  <p className="text-sm text-muted-foreground">Frequently asked questions</p>
                  <Button variant="link" className="p-0 h-auto text-sm">View FAQ</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Past Telemedicine Sessions</CardTitle>
              <CardDescription>History of your virtual consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <Video className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium">No past sessions found</h3>
                <p className="text-muted-foreground text-center mt-1 mb-4">Your completed telemedicine sessions will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="patients" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Telemedicine Patients</CardTitle>
              <CardDescription>Patients available for virtual consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium">No telemedicine patients yet</h3>
                <p className="text-muted-foreground text-center mt-1 mb-4">Your telemedicine patients will appear here</p>
                <Button>Add Patient</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Telemedicine Settings</CardTitle>
              <CardDescription>Configure your virtual consultation preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <Settings className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Settings Coming Soon</h3>
                <p className="text-muted-foreground text-center mt-1 mb-4">This feature is currently under development</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Telemedicine;
