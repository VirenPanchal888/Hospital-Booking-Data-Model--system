
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';
import { 
  Calendar, 
  FileText, 
  Heart, 
  PlusCircle, 
  Pill, 
  Clipboard, 
  Phone, 
  Mail, 
  Clock, 
  Thermometer, 
  Activity, 
  BarChart, 
  Droplets, 
  AlertTriangle 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock patient data
const patientData = {
  id: '123456',
  name: 'Emma Wilson',
  dateOfBirth: '1988-06-15',
  gender: 'Female',
  bloodType: 'A+',
  contactNumber: '+1 (555) 123-4567',
  email: 'emma.wilson@example.com',
  address: '123 Main St, Anytown, AN 12345',
  emergencyContact: 'John Wilson (Husband): +1 (555) 987-6543',
  insuranceProvider: 'HealthPlus Insurance',
  insurancePolicyNumber: 'HP-987654321',
  allergies: ['Penicillin', 'Peanuts'],
  chronicConditions: ['Hypertension', 'Asthma'],
  primaryPhysician: 'Dr. Jane Smith',
  lastVisit: '2023-04-10',
  nextAppointment: '2023-06-20',
  status: 'Active',
  registrationDate: '2020-01-15'
};

// Mock vital signs data
const vitalSignsData = [
  { name: 'Jan', systolic: 128, diastolic: 82, heartRate: 72, temperature: 98.6 },
  { name: 'Feb', systolic: 125, diastolic: 80, heartRate: 70, temperature: 98.4 },
  { name: 'Mar', systolic: 130, diastolic: 85, heartRate: 75, temperature: 98.9 },
  { name: 'Apr', systolic: 135, diastolic: 88, heartRate: 78, temperature: 99.1 },
  { name: 'May', systolic: 129, diastolic: 84, heartRate: 74, temperature: 98.7 },
  { name: 'Jun', systolic: 127, diastolic: 81, heartRate: 72, temperature: 98.5 },
];

// Mock medication data
const medicationsData = [
  {
    id: '1',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    startDate: '2023-01-15',
    endDate: '2023-07-15',
    prescribedBy: 'Dr. Jane Smith',
    status: 'active',
    notes: 'Take in the morning with water',
  },
  {
    id: '2',
    name: 'Ventolin HFA',
    dosage: '90mcg',
    frequency: 'As needed for asthma symptoms',
    startDate: '2022-11-10',
    endDate: null,
    prescribedBy: 'Dr. Michael Chen',
    status: 'active',
    notes: '1-2 puffs every 4-6 hours as needed',
  },
  {
    id: '3',
    name: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'Once daily at bedtime',
    startDate: '2023-02-20',
    endDate: '2023-08-20',
    prescribedBy: 'Dr. Jane Smith',
    status: 'active',
    notes: 'Take at night',
  },
  {
    id: '4',
    name: 'Amoxicillin',
    dosage: '500mg',
    frequency: 'Three times daily',
    startDate: '2023-03-05',
    endDate: '2023-03-15',
    prescribedBy: 'Dr. Sarah Johnson',
    status: 'completed',
    notes: 'Take with food',
  },
];

// Mock appointment data
const appointmentsData = [
  {
    id: '1',
    date: '2023-06-20',
    time: '10:00 AM',
    doctor: 'Dr. Jane Smith',
    department: 'Cardiology',
    status: 'scheduled',
    reason: 'Regular checkup',
  },
  {
    id: '2',
    date: '2023-04-10',
    time: '2:30 PM',
    doctor: 'Dr. Jane Smith',
    department: 'Cardiology',
    status: 'completed',
    reason: 'Blood pressure review',
    notes: 'Blood pressure elevated, medication adjusted',
  },
  {
    id: '3',
    date: '2023-02-15',
    time: '11:15 AM',
    doctor: 'Dr. Michael Chen',
    department: 'Pulmonology',
    status: 'completed',
    reason: 'Asthma follow-up',
    notes: 'Asthma well controlled, continue current treatment',
  },
  {
    id: '4',
    date: '2023-01-05',
    time: '9:00 AM',
    doctor: 'Dr. Sarah Johnson',
    department: 'General Medicine',
    status: 'completed',
    reason: 'Flu symptoms',
    notes: 'Diagnosed with flu, prescribed antibiotics',
  },
];

// Mock lab results data
const labResultsData = [
  {
    id: '1',
    date: '2023-04-10',
    testName: 'Complete Blood Count (CBC)',
    result: 'Normal',
    orderedBy: 'Dr. Jane Smith',
    status: 'completed',
  },
  {
    id: '2',
    date: '2023-04-10',
    testName: 'Lipid Panel',
    result: 'Abnormal - High cholesterol',
    orderedBy: 'Dr. Jane Smith',
    status: 'completed',
  },
  {
    id: '3',
    date: '2023-02-15',
    testName: 'Lung Function Test',
    result: 'Normal',
    orderedBy: 'Dr. Michael Chen',
    status: 'completed',
  },
  {
    id: '4',
    date: '2023-01-05',
    testName: 'Influenza Test',
    result: 'Positive',
    orderedBy: 'Dr. Sarah Johnson',
    status: 'completed',
  },
];

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Calculate age from date of birth
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };
  
  const handleNewAppointment = () => {
    navigate('/new-appointment', { state: { patientId: id, patientName: patientData.name } });
    toast({
      title: "Creating new appointment",
      description: `Setting up an appointment for ${patientData.name}`,
    });
  };
  
  const handleAddMedication = () => {
    toast({
      title: "Add medication",
      description: "Medication form would open here",
    });
  };
  
  const handleOrderTest = () => {
    toast({
      title: "Order lab test",
      description: "Lab test order form would open here",
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container pb-12"
    >
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">{patientData.name}</h1>
              <Badge variant={patientData.status === 'Active' ? 'default' : 'secondary'}>
                {patientData.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">Patient ID: {patientData.id}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/patient-history/' + id)}>
              <FileText className="mr-2 h-4 w-4" />
              Full History
            </Button>
            <Button variant="outline" size="sm" onClick={handleOrderTest}>
              <Clipboard className="mr-2 h-4 w-4" />
              Order Tests
            </Button>
            <Button variant="outline" size="sm" onClick={handleAddMedication}>
              <Pill className="mr-2 h-4 w-4" />
              Add Medication
            </Button>
            <Button size="sm" onClick={handleNewAppointment}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Patient information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Patient Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      {patientData.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h2 className="text-xl font-semibold">{patientData.name}</h2>
                  <p className="text-muted-foreground">
                    {calculateAge(patientData.dateOfBirth)} years • {patientData.gender}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Contact Number</p>
                      <p className="text-sm text-muted-foreground">{patientData.contactNumber}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{patientData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">{patientData.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Emergency Contact</p>
                      <p className="text-sm text-muted-foreground">{patientData.emergencyContact}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Insurance</p>
                      <p className="text-sm text-muted-foreground">{patientData.insuranceProvider}</p>
                      <p className="text-sm text-muted-foreground">Policy: {patientData.insurancePolicyNumber}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Registration Date</p>
                      <p className="text-sm text-muted-foreground">{new Date(patientData.registrationDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Medical Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Blood Type</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-6 w-6 rounded-full flex items-center justify-center bg-red-100 dark:bg-red-900">
                        <Droplets className="h-3 w-3 text-red-500" />
                      </div>
                      <p>{patientData.bloodType}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Allergies</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {patientData.allergies.map((allergy, index) => (
                        <Badge key={index} variant="destructive">
                          <AlertTriangle className="h-3 w-3 mr-1" /> {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Chronic Conditions</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {patientData.chronicConditions.map((condition, index) => (
                        <Badge key={index} variant="secondary">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm font-medium">Primary Care Physician</p>
                    <p className="text-sm text-muted-foreground">{patientData.primaryPhysician}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Last Visit</p>
                    <p className="text-sm text-muted-foreground">{new Date(patientData.lastVisit).toLocaleDateString()}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Next Appointment</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      <p className="text-sm">{new Date(patientData.nextAppointment).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - Tabs for different information */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 grid grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="vitals">Vitals</TabsTrigger>
                <TabsTrigger value="medications">Medications</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="m-0 space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Summary</CardTitle>
                    <CardDescription>Patient health overview</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium flex items-center">
                          <Heart className="h-5 w-5 mr-2 text-red-500" />
                          Blood Pressure
                        </h3>
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={vitalSignsData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis domain={[70, 150]} />
                              <Tooltip />
                              <Line type="monotone" dataKey="systolic" stroke="#ef4444" name="Systolic" />
                              <Line type="monotone" dataKey="diastolic" stroke="#3b82f6" name="Diastolic" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium flex items-center">
                          <Activity className="h-5 w-5 mr-2 text-blue-500" />
                          Heart Rate
                        </h3>
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={vitalSignsData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis domain={[60, 90]} />
                              <Tooltip />
                              <Area type="monotone" dataKey="heartRate" stroke="#8b5cf6" fill="#8b5cf670" name="Heart Rate" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Recent Medications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[220px]">
                        <div className="space-y-4">
                          {medicationsData.filter(m => m.status === 'active').slice(0, 3).map((medication) => (
                            <div key={medication.id} className="flex items-start gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                <Pill className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">{medication.name} ({medication.dosage})</h4>
                                <p className="text-sm text-muted-foreground">{medication.frequency}</p>
                                <p className="text-xs text-muted-foreground">Prescribed by: {medication.prescribedBy}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      
                      <div className="mt-4 pt-4 border-t">
                        <Button variant="outline" className="w-full" onClick={() => setActiveTab('medications')}>
                          View All Medications
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Recent Lab Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[220px]">
                        <div className="space-y-4">
                          {labResultsData.slice(0, 3).map((result) => (
                            <div key={result.id} className="flex items-start gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                <Clipboard className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">{result.testName}</h4>
                                <p className={`text-sm ${result.result.includes('Abnormal') ? 'text-red-500' : 'text-green-500'}`}>
                                  {result.result}
                                </p>
                                <p className="text-xs text-muted-foreground">{new Date(result.date).toLocaleDateString()}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      
                      <div className="mt-4 pt-4 border-t">
                        <Button variant="outline" className="w-full" onClick={() => navigate('/lab-results')}>
                          View All Lab Results
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="vitals" className="m-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Vital Signs</CardTitle>
                    <CardDescription>Historical record of patient's vital signs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium flex items-center">
                          <Heart className="h-5 w-5 mr-2 text-red-500" />
                          Blood Pressure
                        </h3>
                        <div className="h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={vitalSignsData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis domain={[70, 150]} />
                              <Tooltip />
                              <Line type="monotone" dataKey="systolic" stroke="#ef4444" name="Systolic" strokeWidth={2} />
                              <Line type="monotone" dataKey="diastolic" stroke="#3b82f6" name="Diastolic" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium flex items-center">
                          <Activity className="h-5 w-5 mr-2 text-blue-500" />
                          Heart Rate
                        </h3>
                        <div className="h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={vitalSignsData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis domain={[60, 90]} />
                              <Tooltip />
                              <Area type="monotone" dataKey="heartRate" stroke="#8b5cf6" fill="#8b5cf670" name="Heart Rate" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium flex items-center">
                          <Thermometer className="h-5 w-5 mr-2 text-orange-500" />
                          Temperature
                        </h3>
                        <div className="h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={vitalSignsData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis domain={[97, 100]} />
                              <Tooltip />
                              <Line type="monotone" dataKey="temperature" stroke="#f97316" name="Temperature (°F)" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Current Vitals</CardTitle>
                    <CardDescription>Most recent measurements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="p-4 rounded-lg border bg-background">
                        <p className="text-sm text-muted-foreground">Blood Pressure</p>
                        <div className="flex items-center mt-2">
                          <Heart className="h-5 w-5 mr-2 text-red-500" />
                          <span className="text-2xl font-semibold">
                            {vitalSignsData[vitalSignsData.length - 1].systolic}/
                            {vitalSignsData[vitalSignsData.length - 1].diastolic}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">mmHg</p>
                      </div>
                      
                      <div className="p-4 rounded-lg border bg-background">
                        <p className="text-sm text-muted-foreground">Heart Rate</p>
                        <div className="flex items-center mt-2">
                          <Activity className="h-5 w-5 mr-2 text-blue-500" />
                          <span className="text-2xl font-semibold">
                            {vitalSignsData[vitalSignsData.length - 1].heartRate}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">bpm</p>
                      </div>
                      
                      <div className="p-4 rounded-lg border bg-background">
                        <p className="text-sm text-muted-foreground">Temperature</p>
                        <div className="flex items-center mt-2">
                          <Thermometer className="h-5 w-5 mr-2 text-orange-500" />
                          <span className="text-2xl font-semibold">
                            {vitalSignsData[vitalSignsData.length - 1].temperature}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">°F</p>
                      </div>
                      
                      <div className="p-4 rounded-lg border bg-background">
                        <p className="text-sm text-muted-foreground">Blood Oxygen</p>
                        <div className="flex items-center mt-2">
                          <BarChart className="h-5 w-5 mr-2 text-green-500" />
                          <span className="text-2xl font-semibold">98</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">SpO₂ %</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="medications" className="m-0">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Medications</CardTitle>
                      <CardDescription>Current and past medications</CardDescription>
                    </div>
                    <Button size="sm" onClick={handleAddMedication}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Medication
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">Active Medications</h3>
                        <div className="mt-4 space-y-4">
                          {medicationsData.filter(m => m.status === 'active').map((medication) => (
                            <Card key={medication.id} className="border">
                              <CardContent className="p-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                  <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                      <Pill className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                      <h4 className="font-medium">{medication.name}</h4>
                                      <p className="text-sm">{medication.dosage} • {medication.frequency}</p>
                                      <p className="text-sm text-muted-foreground">
                                        {new Date(medication.startDate).toLocaleDateString()} - 
                                        {medication.endDate ? new Date(medication.endDate).toLocaleDateString() : 'Ongoing'}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="space-y-1 sm:text-right">
                                    <p className="text-sm">
                                      <span className="text-muted-foreground">Prescribed by:</span> {medication.prescribedBy}
                                    </p>
                                    {medication.notes && (
                                      <p className="text-sm text-muted-foreground">{medication.notes}</p>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium">Past Medications</h3>
                        <div className="mt-4 space-y-4">
                          {medicationsData.filter(m => m.status === 'completed').map((medication) => (
                            <Card key={medication.id} className="border">
                              <CardContent className="p-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                  <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                                      <Pill className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                      <h4 className="font-medium">{medication.name}</h4>
                                      <p className="text-sm">{medication.dosage} • {medication.frequency}</p>
                                      <p className="text-sm text-muted-foreground">
                                        {new Date(medication.startDate).toLocaleDateString()} - 
                                        {medication.endDate ? new Date(medication.endDate).toLocaleDateString() : 'Ongoing'}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="space-y-1 sm:text-right">
                                    <p className="text-sm">
                                      <span className="text-muted-foreground">Prescribed by:</span> {medication.prescribedBy}
                                    </p>
                                    {medication.notes && (
                                      <p className="text-sm text-muted-foreground">{medication.notes}</p>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="appointments" className="m-0">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Appointments</CardTitle>
                      <CardDescription>Scheduled and past appointments</CardDescription>
                    </div>
                    <Button size="sm" onClick={handleNewAppointment}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      New Appointment
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">Upcoming Appointments</h3>
                        <div className="mt-4 space-y-4">
                          {appointmentsData.filter(a => a.status === 'scheduled').map((appointment) => (
                            <Card key={appointment.id} className="border">
                              <CardContent className="p-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                  <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                      <Calendar className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                      <h4 className="font-medium">{appointment.reason}</h4>
                                      <p className="text-sm">
                                        {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        {appointment.doctor} • {appointment.department}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm">Reschedule</Button>
                                    <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium">Past Appointments</h3>
                        <div className="mt-4 space-y-4">
                          {appointmentsData.filter(a => a.status === 'completed').map((appointment) => (
                            <Card key={appointment.id} className="border">
                              <CardContent className="p-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                  <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                                      <Calendar className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                      <h4 className="font-medium">{appointment.reason}</h4>
                                      <p className="text-sm">
                                        {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        {appointment.doctor} • {appointment.department}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    {appointment.notes && (
                                      <p className="text-sm text-muted-foreground max-w-xs text-right">
                                        {appointment.notes}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PatientDetails;
