
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate, useParams } from 'react-router-dom';
import { Activity, Heart, Thermometer, Droplet, Clock, ArrowLeft, Bell, AlertCircle } from 'lucide-react';

type VitalStatus = 'normal' | 'warning' | 'critical';

interface VitalReading {
  time: string;
  value: number;
}

interface PatientVital {
  id: string;
  name: string;
  currentValue: number;
  unit: string;
  normalRange: string;
  status: VitalStatus;
  trend: 'up' | 'down' | 'stable';
  readings: VitalReading[];
}

interface Alert {
  id: string;
  time: string;
  vital: string;
  message: string;
  status: VitalStatus;
  acknowledged: boolean;
}

const PatientMonitoring: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [timeRange, setTimeRange] = useState('24h');
  
  // Mock patient data
  const patient = {
    id: id || 'p1',
    name: 'Emma Wilson',
    age: 35,
    room: 'ICU-302',
    admissionDate: '2023-06-15',
    condition: 'Stable',
    doctor: 'Dr. Jane Smith',
    diagnosis: 'Post-surgical recovery - Appendectomy'
  };
  
  // Mock vitals data
  const vitals: PatientVital[] = [
    {
      id: 'v1',
      name: 'Heart Rate',
      currentValue: 82,
      unit: 'bpm',
      normalRange: '60-100',
      status: 'normal',
      trend: 'stable',
      readings: Array(24).fill(0).map((_, i) => ({
        time: `${i}:00`,
        value: 75 + Math.floor(Math.random() * 15) - 5
      }))
    },
    {
      id: 'v2',
      name: 'Blood Pressure',
      currentValue: 138,
      unit: 'mmHg',
      normalRange: '90-140/60-90',
      status: 'warning',
      trend: 'up',
      readings: Array(24).fill(0).map((_, i) => ({
        time: `${i}:00`,
        value: 125 + Math.floor(Math.random() * 20) - 5
      }))
    },
    {
      id: 'v3',
      name: 'Oxygen Saturation',
      currentValue: 97,
      unit: '%',
      normalRange: '95-100',
      status: 'normal',
      trend: 'stable',
      readings: Array(24).fill(0).map((_, i) => ({
        time: `${i}:00`,
        value: 97 + Math.floor(Math.random() * 3) - 1
      }))
    },
    {
      id: 'v4',
      name: 'Temperature',
      currentValue: 37.2,
      unit: '°C',
      normalRange: '36.5-37.5',
      status: 'normal',
      trend: 'stable',
      readings: Array(24).fill(0).map((_, i) => ({
        time: `${i}:00`,
        value: 37 + (Math.random() * 0.8) - 0.4
      }))
    },
    {
      id: 'v5',
      name: 'Respiratory Rate',
      currentValue: 22,
      unit: 'breaths/min',
      normalRange: '12-20',
      status: 'warning',
      trend: 'up',
      readings: Array(24).fill(0).map((_, i) => ({
        time: `${i}:00`,
        value: 18 + Math.floor(Math.random() * 6) - 2
      }))
    },
    {
      id: 'v6',
      name: 'Blood Glucose',
      currentValue: 110,
      unit: 'mg/dL',
      normalRange: '70-140',
      status: 'normal',
      trend: 'down',
      readings: Array(24).fill(0).map((_, i) => ({
        time: `${i}:00`,
        value: 130 - i * 1.5 + Math.floor(Math.random() * 10) - 5
      }))
    }
  ];
  
  // Mock alerts data
  const alerts: Alert[] = [
    {
      id: 'a1',
      time: '14:35',
      vital: 'Blood Pressure',
      message: 'Blood pressure elevated above normal range',
      status: 'warning',
      acknowledged: false
    },
    {
      id: 'a2',
      time: '13:20',
      vital: 'Respiratory Rate',
      message: 'Respiratory rate increased to 22 breaths/min',
      status: 'warning',
      acknowledged: false
    },
    {
      id: 'a3',
      time: '10:15',
      vital: 'Temperature',
      message: 'Temperature spike detected, 38.2°C',
      status: 'warning',
      acknowledged: true
    },
    {
      id: 'a4',
      time: '08:45',
      vital: 'Heart Rate',
      message: 'Heart rate elevated to 112 bpm',
      status: 'warning',
      acknowledged: true
    }
  ];
  
  // Status badge component
  const StatusBadge = ({ status }: { status: VitalStatus }) => {
    switch (status) {
      case 'normal':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Normal</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Warning</Badge>;
      case 'critical':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Critical</Badge>;
      default:
        return null;
    }
  };
  
  // Trend indicator component
  const TrendIndicator = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
    switch (trend) {
      case 'up':
        return <span className="text-red-500">↑</span>;
      case 'down':
        return <span className="text-blue-500">↓</span>;
      case 'stable':
        return <span className="text-green-500">→</span>;
      default:
        return null;
    }
  };
  
  // Icon for vitals
  const getVitalIcon = (vitalName: string) => {
    if (vitalName.includes('Heart')) return <Heart className="h-5 w-5 text-red-500" />;
    if (vitalName.includes('Blood Pressure')) return <Activity className="h-5 w-5 text-blue-500" />;
    if (vitalName.includes('Oxygen')) return <Droplet className="h-5 w-5 text-blue-500" />;
    if (vitalName.includes('Temperature')) return <Thermometer className="h-5 w-5 text-yellow-500" />;
    if (vitalName.includes('Respiratory')) return <Activity className="h-5 w-5 text-green-500" />;
    if (vitalName.includes('Glucose')) return <Droplet className="h-5 w-5 text-purple-500" />;
    return <Activity className="h-5 w-5 text-gray-500" />;
  };
  
  // Handle acknowledge alert
  const handleAcknowledgeAlert = (id: string) => {
    // In a real app, this would update the alert in the database
    console.log('Acknowledging alert:', id);
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/patients/' + id)}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Patient Monitoring</h1>
            <p className="text-muted-foreground">
              {patient.name} • {patient.room} • {patient.diagnosis}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="6h">Last 6 Hours</SelectItem>
              <SelectItem value="12h">Last 12 Hours</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Set Alert
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vitals.map((vital) => (
          <Card key={vital.id} className={`
            border
            ${vital.status === 'warning' ? 'border-yellow-200 dark:border-yellow-900' : ''}
            ${vital.status === 'critical' ? 'border-red-200 dark:border-red-900' : ''}
          `}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {getVitalIcon(vital.name)}
                  <CardTitle className="text-lg">{vital.name}</CardTitle>
                </div>
                <StatusBadge status={vital.status} />
              </div>
              <CardDescription>Normal range: {vital.normalRange} {vital.unit}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{vital.currentValue}</span>
                  <span className="text-sm text-muted-foreground">{vital.unit}</span>
                  <TrendIndicator trend={vital.trend} />
                </div>
              </div>
              <div className="h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vital.readings}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tick={{ fontSize: 10 }} tickFormatter={(value) => value} />
                    <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={
                        vital.status === 'normal' ? '#10b981' : 
                        vital.status === 'warning' ? '#f59e0b' : 
                        '#ef4444'
                      } 
                      dot={false}
                      activeDot={{ r: 4 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Detailed Vital Trends</CardTitle>
            <CardDescription>Comprehensive view of patient vitals over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="time" 
                    allowDuplicatedCategory={false} 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis yAxisId="left" orientation="left" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  
                  <Line 
                    yAxisId="left"
                    name="Heart Rate (bpm)"
                    data={vitals[0].readings} 
                    dataKey="value" 
                    stroke="#ef4444" 
                    dot={false}
                    strokeWidth={2}
                  />
                  <Line 
                    yAxisId="left"
                    name="Respiratory Rate (bpm)"
                    data={vitals[4].readings} 
                    dataKey="value" 
                    stroke="#22c55e" 
                    dot={false}
                    strokeWidth={2}
                  />
                  <Line 
                    yAxisId="right"
                    name="Temperature (°C)"
                    data={vitals[3].readings} 
                    dataKey="value" 
                    stroke="#f59e0b" 
                    dot={false}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex justify-center mt-2 space-x-4">
              <Button variant="outline" size="sm" className="text-xs">
                Export Data
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                Print Chart
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                Compare Previous
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex justify-between items-center">
              <span>Vital Alerts</span>
              <Badge 
                className={alerts.filter(a => !a.acknowledged).length > 0 ? 'bg-yellow-100 text-yellow-800' : ''} 
              >
                {alerts.filter(a => !a.acknowledged).length} unread
              </Badge>
            </CardTitle>
            <CardDescription>Recent alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[380px] pr-4">
              <div className="space-y-4">
                {alerts.length > 0 ? (
                  alerts.map(alert => (
                    <div 
                      key={alert.id}
                      className={`p-3 rounded-lg border ${
                        !alert.acknowledged ? 'bg-yellow-50 border-yellow-200' : ''
                      }`}
                    >
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <AlertCircle className={`h-4 w-4 ${
                            alert.status === 'warning' ? 'text-yellow-500' :
                            alert.status === 'critical' ? 'text-red-500' :
                            'text-green-500'
                          }`} />
                          <span className="font-medium">{alert.vital}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                          <span className="text-xs text-muted-foreground">{alert.time}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm mb-2">{alert.message}</p>
                      
                      {!alert.acknowledged && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs w-full"
                          onClick={() => handleAcknowledgeAlert(alert.id)}
                        >
                          Acknowledge
                        </Button>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No alerts found</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Medical Orders</CardTitle>
            <CardDescription>Current medical orders and treatments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-md border">
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium">IV Fluids</h3>
                  <Badge>Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">0.9% Sodium Chloride at 100mL/hr</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Started: June 15, 2023 10:30 AM</span>
                </div>
              </div>
              
              <div className="p-3 rounded-md border">
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium">Medication</h3>
                  <Badge>Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Ampicillin 500mg IV every 6 hours</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Next dose: Today, 6:30 PM</span>
                </div>
              </div>
              
              <div className="p-3 rounded-md border">
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium">Pain Management</h3>
                  <Badge>Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Acetaminophen 1000mg PO every 6 hours PRN pain</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Last administered: Today, 2:15 PM</span>
                </div>
              </div>
              
              <div className="p-3 rounded-md border">
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium">Lab Tests</h3>
                  <Badge>Ordered</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Complete Blood Count, morning</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Due: Tomorrow, 6:00 AM</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Nurse Notes</CardTitle>
            <CardDescription>Recent observations and assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                <div className="border-l-2 border-primary pl-4 relative">
                  <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-primary"></div>
                  <p className="text-sm text-muted-foreground mb-1">Today, 2:45 PM - Nurse Robert Johnson</p>
                  <p className="text-sm">Patient reports pain level of 3/10. Vital signs stable. Incision site clean with no signs of infection. Patient ambulated in hallway with assistance, tolerated well.</p>
                </div>
                
                <div className="border-l-2 border-muted-foreground pl-4 relative">
                  <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-muted-foreground"></div>
                  <p className="text-sm text-muted-foreground mb-1">Today, 10:15 AM - Nurse Sarah Williams</p>
                  <p className="text-sm">Patient received morning medications. Eating 75% of breakfast. IV site without redness or swelling. Continues to need minimal assistance with ADLs. Lungs clear bilaterally.</p>
                </div>
                
                <div className="border-l-2 border-muted-foreground pl-4 relative">
                  <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-muted-foreground"></div>
                  <p className="text-sm text-muted-foreground mb-1">Yesterday, 8:30 PM - Nurse Emily Garcia</p>
                  <p className="text-sm">Patient resting comfortably. Pain controlled with oral medications. Vital signs within normal limits. Incision site clean and dry. Patient ambulated to bathroom independently.</p>
                </div>
                
                <div className="border-l-2 border-muted-foreground pl-4 relative">
                  <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-muted-foreground"></div>
                  <p className="text-sm text-muted-foreground mb-1">Yesterday, 2:00 PM - Nurse Michael Brown</p>
                  <p className="text-sm">Post-operative assessment completed. Patient alert and oriented x3. Pain reported as 5/10, administered pain medication per orders. IV running at 100mL/hr. Lung sounds clear. Dressing intact.</p>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientMonitoring;
