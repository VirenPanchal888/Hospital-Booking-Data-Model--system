
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Navigation, Clock, Phone, MapPin, Activity, User, Users, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

type AmbulanceStatus = 'en-route' | 'arrived' | 'returning' | 'available' | 'out-of-service';

interface Ambulance {
  id: string;
  vehicleId: string;
  status: AmbulanceStatus;
  location: string;
  coordinates: { lat: number; lng: number };
  dispatchTime?: string;
  eta?: string;
  team: string[];
  patient?: string;
  destination?: string;
}

const AmbulanceTracking: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAmbulance, setSelectedAmbulance] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Mock ambulance data
  const ambulances: Ambulance[] = [
    {
      id: 'amb-001',
      vehicleId: 'AMB-1234',
      status: 'en-route',
      location: '3.2 miles away',
      coordinates: { lat: 40.712776, lng: -74.005974 },
      dispatchTime: '2023-06-18T14:30:00Z',
      eta: '8 minutes',
      team: ['Dr. John Smith', 'Nurse Emma Wilson', 'EMT Robert Johnson'],
      patient: 'Michael Brown',
      destination: 'General Hospital - Emergency Department'
    },
    {
      id: 'amb-002',
      vehicleId: 'AMB-5678',
      status: 'arrived',
      location: 'General Hospital',
      coordinates: { lat: 40.712776, lng: -74.005974 },
      dispatchTime: '2023-06-18T14:15:00Z',
      team: ['Dr. Sarah Johnson', 'Nurse James Rodriguez', 'EMT Olivia Garcia'],
      patient: 'Emily Wilson',
      destination: 'General Hospital - Emergency Department'
    },
    {
      id: 'amb-003',
      vehicleId: 'AMB-9012',
      status: 'returning',
      location: '1.5 miles away',
      coordinates: { lat: 40.712776, lng: -74.005974 },
      dispatchTime: '2023-06-18T13:45:00Z',
      eta: '5 minutes',
      team: ['Dr. Michael Chen', 'Nurse Sophia Garcia', 'EMT William Davis'],
      destination: 'General Hospital - Ambulance Bay'
    },
    {
      id: 'amb-004',
      vehicleId: 'AMB-3456',
      status: 'available',
      location: 'General Hospital - Ambulance Bay',
      coordinates: { lat: 40.712776, lng: -74.005974 },
      team: ['On-call team'],
    },
    {
      id: 'amb-005',
      vehicleId: 'AMB-7890',
      status: 'out-of-service',
      location: 'Maintenance Facility',
      coordinates: { lat: 40.712776, lng: -74.005974 },
      team: ['Maintenance Staff'],
    }
  ];
  
  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Status badge component
  const AmbulanceStatusBadge = ({ status }: { status: AmbulanceStatus }) => {
    switch (status) {
      case 'en-route':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">En Route</Badge>;
      case 'arrived':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Arrived</Badge>;
      case 'returning':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Returning</Badge>;
      case 'available':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Available</Badge>;
      case 'out-of-service':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Out of Service</Badge>;
    }
  };
  
  // Format time function
  const formatTime = (timeString?: string) => {
    if (!timeString) return 'N/A';
    return new Date(timeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Get ambulance by ID
  const getAmbulanceById = (id: string) => {
    return ambulances.find(amb => amb.id === id) || null;
  };
  
  // Get selected ambulance
  const ambulanceDetails = selectedAmbulance 
    ? getAmbulanceById(selectedAmbulance) 
    : ambulances.length > 0 ? ambulances[0] : null;
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Ambulance Tracking</h1>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/ambulance-request')} className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Request Ambulance
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Active Ambulances</CardTitle>
              <CardDescription>Monitor and track ambulance status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ambulances.map((ambulance) => (
                  <div 
                    key={ambulance.id}
                    className={`p-3 rounded-md border cursor-pointer transition-colors ${
                      selectedAmbulance === ambulance.id ? 'border-primary bg-primary/5' : 'hover:bg-accent/5'
                    }`}
                    onClick={() => setSelectedAmbulance(ambulance.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${
                          ambulance.status === 'available' ? 'bg-green-500' :
                          ambulance.status === 'en-route' ? 'bg-blue-500' :
                          ambulance.status === 'arrived' ? 'bg-green-500' :
                          ambulance.status === 'returning' ? 'bg-purple-500' :
                          'bg-gray-500'
                        }`}></div>
                        <h3 className="font-medium">{ambulance.vehicleId}</h3>
                      </div>
                      <AmbulanceStatusBadge status={ambulance.status} />
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{ambulance.location}</span>
                    </div>
                    
                    {ambulance.eta && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Clock className="h-4 w-4" />
                        <span>ETA: {ambulance.eta}</span>
                      </div>
                    )}
                    
                    {ambulance.patient && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <User className="h-4 w-4" />
                        <span>Patient: {ambulance.patient}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <Card className="h-[400px] relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              {!mapLoaded ? (
                <div className="text-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
                  <p>Loading map...</p>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {/* In a real application, this would be a map component */}
                  <div className="flex flex-col items-center">
                    <Navigation className="h-12 w-12 text-primary mb-2" />
                    <p className="text-muted-foreground">Map placeholder - In a real app, an interactive map would be displayed here</p>
                  </div>
                </div>
              )}
              
              {mapLoaded && (
                <>
                  <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-sm p-3 rounded-md">
                    <h3 className="font-medium text-sm">Location</h3>
                    <p className="text-xs text-muted-foreground">General Hospital Area</p>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 z-10">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        Refresh
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        Zoom In
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        Zoom Out
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>
          
          {ambulanceDetails && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>
                      {ambulanceDetails.vehicleId} Details
                    </CardTitle>
                    <CardDescription>
                      Current status and information
                    </CardDescription>
                  </div>
                  <AmbulanceStatusBadge status={ambulanceDetails.status} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Status Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-md">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Current Location</p>
                          <p className="text-sm text-muted-foreground">{ambulanceDetails.location}</p>
                        </div>
                      </div>
                      
                      {ambulanceDetails.dispatchTime && (
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-md">
                            <Clock className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Dispatch Time</p>
                            <p className="text-sm text-muted-foreground">{formatTime(ambulanceDetails.dispatchTime)}</p>
                          </div>
                        </div>
                      )}
                      
                      {ambulanceDetails.eta && (
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-md">
                            <Activity className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Estimated Time of Arrival</p>
                            <p className="text-sm text-muted-foreground">{ambulanceDetails.eta}</p>
                          </div>
                        </div>
                      )}
                      
                      {ambulanceDetails.patient && (
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-md">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Patient</p>
                            <p className="text-sm text-muted-foreground">{ambulanceDetails.patient}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-medium text-muted-foreground">Medical Team</h3>
                      <Badge variant="outline" className="text-xs">
                        {ambulanceDetails.team.length} members
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      {ambulanceDetails.team.map((member, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 rounded-md border">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-medium text-primary">
                              {member.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-medium text-sm">{member}</span>
                        </div>
                      ))}
                    </div>
                    
                    {ambulanceDetails.destination && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Destination</h3>
                        <div className="border rounded-md p-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="font-medium">{ambulanceDetails.destination}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {(ambulanceDetails.status === 'en-route' || ambulanceDetails.status === 'arrived') && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Emergency Contact</h3>
                        <div className="flex items-center justify-between border rounded-md p-3">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-primary" />
                            <span>Emergency Dispatch</span>
                          </div>
                          <Button variant="outline" size="sm" className="text-xs">
                            Call
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AmbulanceTracking;
