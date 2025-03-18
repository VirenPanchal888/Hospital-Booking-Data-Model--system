
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Ambulance, Phone, MapPin, Clock, Bell, Users, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const EmergencyServices: React.FC = () => {
  const navigate = useNavigate();
  const [alertStatus, setAlertStatus] = useState<'active' | 'cleared'>('active');
  
  // Mock emergency alerts
  const emergencyAlerts = [
    {
      id: 'alert-001',
      type: 'Code Blue',
      location: 'ICU Room 302',
      time: '14:35',
      status: 'active',
      description: 'Cardiac arrest situation',
      assignedTeam: ['Dr. Jane Smith', 'Nurse Robert Johnson', 'Nurse Sarah Williams']
    },
    {
      id: 'alert-002',
      type: 'Code Red',
      location: 'East Wing - Floor 2',
      time: '14:20',
      status: 'cleared',
      description: 'Fire emergency',
      assignedTeam: ['Security Team', 'Facilities Management']
    },
    {
      id: 'alert-003',
      type: 'Trauma Alert',
      location: 'Emergency Department',
      time: '14:15',
      status: 'active',
      description: 'Multiple vehicle accident victims arriving',
      assignedTeam: ['Trauma Team Alpha', 'Dr. Michael Chen', 'Dr. Emily Wilson']
    }
  ];
  
  // Filter alerts by status
  const filteredAlerts = emergencyAlerts.filter(alert => 
    alertStatus === 'active' ? alert.status === 'active' : alert.status === 'cleared'
  );
  
  // Mock available resources
  const resources = {
    emergency: {
      beds: { total: 25, available: 5 },
      trauma: { total: 10, available: 2 },
      icu: { total: 20, available: 3 }
    },
    staff: {
      doctors: { total: 15, available: 8 },
      nurses: { total: 30, available: 12 },
      paramedics: { total: 10, available: 4 }
    },
    vehicles: {
      ambulances: { total: 8, available: 3 },
      helicopters: { total: 2, available: 1 }
    }
  };
  
  // Handle clear alert
  const handleClearAlert = (id: string) => {
    // In a real application, this would update the alert in the database
    console.log('Clearing alert:', id);
  };
  
  // Handle respond to alert
  const handleRespondToAlert = (id: string) => {
    // In a real application, this would mark you as responding and notify the team
    console.log('Responding to alert:', id);
    navigate(`/emergency-services/alert/${id}`);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Emergency Services</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/ambulance-tracking')} className="flex items-center gap-2">
            <Ambulance className="h-4 w-4" />
            Track Ambulances
          </Button>
          <Button onClick={() => navigate('/ambulance-request')} className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Request Ambulance
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-red-200 dark:border-red-800 shadow-md">
          <CardHeader className="bg-red-50 dark:bg-red-900/20 border-b border-red-100 dark:border-red-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <CardTitle>Emergency Alerts</CardTitle>
              </div>
              <Badge variant="destructive" className="text-white">
                {emergencyAlerts.filter(alert => alert.status === 'active').length} Active
              </Badge>
            </div>
            <CardDescription>Critical situations requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs value={alertStatus} onValueChange={(value) => setAlertStatus(value as 'active' | 'cleared')}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="active" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-900 dark:data-[state=active]:bg-red-900/20 dark:data-[state=active]:text-red-300">
                  Active Alerts
                </TabsTrigger>
                <TabsTrigger value="cleared">
                  Cleared Alerts
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value={alertStatus} className="mt-0 space-y-4">
                {filteredAlerts.length > 0 ? (
                  filteredAlerts.map(alert => (
                    <div key={alert.id} className={`border ${alert.status === 'active' ? 'border-red-200 dark:border-red-800' : 'border-gray-200 dark:border-gray-800'} rounded-md overflow-hidden`}>
                      <div className={`flex justify-between items-center p-4 ${alert.status === 'active' ? 'bg-red-50 dark:bg-red-900/10' : 'bg-gray-50 dark:bg-gray-800/10'}`}>
                        <div className="flex items-center gap-3">
                          <div className={`rounded-full p-2 ${alert.status === 'active' ? 'bg-red-100 dark:bg-red-800/30' : 'bg-gray-100 dark:bg-gray-700/30'}`}>
                            <Bell className={`h-5 w-5 ${alert.status === 'active' ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`} />
                          </div>
                          <div>
                            <h3 className="font-medium">{alert.type}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{alert.time}</span>
                              <span>•</span>
                              <MapPin className="h-3 w-3" />
                              <span>{alert.location}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className={alert.status === 'active' ? 'bg-red-100 text-red-800 hover:bg-red-200' : 'bg-green-100 text-green-800 hover:bg-green-200'}>
                          {alert.status === 'active' ? 'Active' : 'Cleared'}
                        </Badge>
                      </div>
                      
                      <div className="p-4">
                        <p className="text-sm mb-3">{alert.description}</p>
                        
                        <div>
                          <p className="text-sm font-medium mb-2 flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            Assigned Team
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {alert.assignedTeam.map((member, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {member}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {alert.status === 'active' && (
                          <div className="flex flex-col sm:flex-row gap-2 mt-4">
                            <Button 
                              variant="default" 
                              className="flex items-center gap-2"
                              onClick={() => handleRespondToAlert(alert.id)}
                            >
                              <Check className="h-4 w-4" />
                              Respond
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex items-center gap-2 border-red-200 hover:bg-red-50 text-red-600 hover:text-red-700"
                              onClick={() => handleClearAlert(alert.id)}
                            >
                              <X className="h-4 w-4" />
                              Clear Alert
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-1">No {alertStatus} alerts</h3>
                    <p className="text-sm text-muted-foreground">
                      {alertStatus === 'active' 
                        ? 'There are currently no active emergency alerts.' 
                        : 'There are no cleared alerts in the system.'}
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t bg-red-50/50 dark:bg-transparent">
            <div className="w-full flex justify-between items-center">
              <Button 
                variant="outline" 
                className="border-red-200 hover:bg-red-50 text-red-600 hover:text-red-700"
              >
                View Alert History
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Create New Alert
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
              <CardDescription>Quick access to critical contacts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-md border">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 p-2 rounded-full">
                    <Phone className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">Emergency Response</p>
                    <p className="text-sm text-muted-foreground">911</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Call
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-md border">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Phone className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Poison Control</p>
                    <p className="text-sm text-muted-foreground">800-222-1222</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Call
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-md border">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Phone className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Hospital Security</p>
                    <p className="text-sm text-muted-foreground">555-123-4567</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Call
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-md border">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Phone className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Crisis Team</p>
                    <p className="text-sm text-muted-foreground">555-789-0123</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Call
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Available Resources</CardTitle>
              <CardDescription>Current status of emergency resources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Emergency Rooms</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Emergency Beds</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={resources.emergency.beds.available <= 5 ? 'text-red-500' : 'text-green-500'}>
                        {resources.emergency.beds.available} / {resources.emergency.beds.total}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Trauma Rooms</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={resources.emergency.trauma.available <= 2 ? 'text-red-500' : 'text-green-500'}>
                        {resources.emergency.trauma.available} / {resources.emergency.trauma.total}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">ICU Beds</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={resources.emergency.icu.available <= 3 ? 'text-red-500' : 'text-green-500'}>
                        {resources.emergency.icu.available} / {resources.emergency.icu.total}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-3">Emergency Staff</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Emergency Doctors</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-blue-500">
                        {resources.staff.doctors.available} / {resources.staff.doctors.total}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Emergency Nurses</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-blue-500">
                        {resources.staff.nurses.available} / {resources.staff.nurses.total}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Paramedics</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-blue-500">
                        {resources.staff.paramedics.available} / {resources.staff.paramedics.total}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-3">Emergency Vehicles</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ambulances</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={resources.vehicles.ambulances.available < 2 ? 'text-red-500' : 'text-green-500'}>
                        {resources.vehicles.ambulances.available} / {resources.vehicles.ambulances.total}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Helicopters</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={resources.vehicles.helicopters.available === 0 ? 'text-red-500' : 'text-green-500'}>
                        {resources.vehicles.helicopters.available} / {resources.vehicles.helicopters.total}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default EmergencyServices;
