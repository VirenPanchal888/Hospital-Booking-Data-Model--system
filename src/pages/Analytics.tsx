
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';

// Sample data
const patientVisitsData = [
  { month: 'Jan', visits: 45 },
  { month: 'Feb', visits: 52 },
  { month: 'Mar', visits: 49 },
  { month: 'Apr', visits: 63 },
  { month: 'May', visits: 58 },
  { month: 'Jun', visits: 64 },
  { month: 'Jul', visits: 72 },
  { month: 'Aug', visits: 68 },
  { month: 'Sep', visits: 75 },
  { month: 'Oct', visits: 82 },
  { month: 'Nov', visits: 87 },
  { month: 'Dec', visits: 76 }
];

const revenueData = [
  { month: 'Jan', revenue: 12000 },
  { month: 'Feb', revenue: 14500 },
  { month: 'Mar', revenue: 13200 },
  { month: 'Apr', revenue: 15800 },
  { month: 'May', revenue: 16700 },
  { month: 'Jun', revenue: 18200 },
  { month: 'Jul', revenue: 19500 },
  { month: 'Aug', revenue: 21000 },
  { month: 'Sep', revenue: 22800 },
  { month: 'Oct', revenue: 24500 },
  { month: 'Nov', revenue: 26000 },
  { month: 'Dec', revenue: 25200 }
];

const diagnosisData = [
  { name: 'Hypertension', value: 28 },
  { name: 'Diabetes', value: 22 },
  { name: 'Respiratory Infections', value: 17 },
  { name: 'Anxiety/Depression', value: 15 },
  { name: 'Back Pain', value: 12 },
  { name: 'Other', value: 6 }
];

const departmentPerformanceData = [
  { department: 'Cardiology', patients: 125, revenue: 28500, satisfaction: 92 },
  { department: 'Orthopedics', patients: 98, revenue: 22000, satisfaction: 88 },
  { department: 'Pediatrics', patients: 112, revenue: 19800, satisfaction: 94 },
  { department: 'Neurology', patients: 76, revenue: 24500, satisfaction: 86 },
  { department: 'Oncology', patients: 68, revenue: 32000, satisfaction: 90 },
  { department: 'General Medicine', patients: 145, revenue: 18500, satisfaction: 89 }
];

const medicationUsageData = [
  { medication: 'Antibiotics', count: 142 },
  { medication: 'Pain Relief', count: 187 },
  { medication: 'Antihypertensives', count: 124 },
  { medication: 'Antidiabetics', count: 98 },
  { medication: 'Antihistamines', count: 65 },
  { medication: 'Other', count: 76 }
];

const patientAppointmentsData = [
  { month: 'Jan', scheduled: 8, completed: 7, cancelled: 1 },
  { month: 'Feb', scheduled: 6, completed: 5, cancelled: 1 },
  { month: 'Mar', scheduled: 9, completed: 8, cancelled: 1 },
  { month: 'Apr', scheduled: 7, completed: 6, cancelled: 1 },
  { month: 'May', scheduled: 8, completed: 7, cancelled: 1 },
  { month: 'Jun', scheduled: 10, completed: 9, cancelled: 1 },
  { month: 'Jul', scheduled: 12, completed: 10, cancelled: 2 },
  { month: 'Aug', scheduled: 9, completed: 8, cancelled: 1 },
  { month: 'Sep', scheduled: 11, completed: 10, cancelled: 1 },
  { month: 'Oct', scheduled: 7, completed: 6, cancelled: 1 },
  { month: 'Nov', scheduled: 8, completed: 7, cancelled: 1 },
  { month: 'Dec', scheduled: 5, completed: 4, cancelled: 1 }
];

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#EC7063'];

const Analytics: React.FC = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('year');
  const isDoctor = user?.role === 'doctor';
  const isPatient = user?.role === 'patient';
  const isAdmin = user?.role === 'admin';
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {isDoctor ? 'Doctor Analytics' : isPatient ? 'Patient Analytics' : 'Hospital Analytics'}
        </h1>
        
        <div className="w-full sm:w-auto">
          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {isAdmin && (
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Visits</CardTitle>
                  <CardDescription>Monthly patient visits over the past year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={patientVisitsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="visits" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Common Diagnoses</CardTitle>
                  <CardDescription>Distribution of diagnoses by percentage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={diagnosisData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {diagnosisData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} patients`, 'Count']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Patients, revenue, and satisfaction by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="patients" fill="#8884d8" name="Patients" />
                      <Bar yAxisId="right" dataKey="satisfaction" fill="#82ca9d" name="Satisfaction %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="financial" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
                <CardDescription>Monthly revenue data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="patients" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Medication Usage</CardTitle>
                  <CardDescription>Most prescribed medications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={medicationUsageData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="medication" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8">
                          {medicationUsageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Patient Demographics</CardTitle>
                  <CardDescription>Age distribution of patients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: '0-18', value: 24 },
                            { name: '19-35', value: 32 },
                            { name: '36-50', value: 18 },
                            { name: '51-65', value: 14 },
                            { name: '65+', value: 12 }
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          <Cell fill="#0088FE" />
                          <Cell fill="#00C49F" />
                          <Cell fill="#FFBB28" />
                          <Cell fill="#FF8042" />
                          <Cell fill="#A569BD" />
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Revenue Comparison</CardTitle>
                <CardDescription>Revenue by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                      <Legend />
                      <Bar dataKey="revenue" fill="#82ca9d">
                        {departmentPerformanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
      
      {isDoctor && (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Patient Appointments</CardTitle>
                <CardDescription>Your appointment schedule over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={patientAppointmentsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="scheduled" stackId="a" fill="#8884d8" name="Scheduled" />
                      <Bar dataKey="completed" stackId="a" fill="#82ca9d" name="Completed" />
                      <Bar dataKey="cancelled" stackId="a" fill="#ff8042" name="Cancelled" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Diagnoses Distribution</CardTitle>
                <CardDescription>Most common diagnoses you've treated</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={diagnosisData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {diagnosisData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Patient Volume Trend</CardTitle>
              <CardDescription>Number of patients seen over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={patientVisitsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="visits" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {isPatient && (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Appointment History</CardTitle>
                <CardDescription>Overview of your medical appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { month: 'Jul', visits: 1 },
                      { month: 'Aug', visits: 2 },
                      { month: 'Sep', visits: 1 },
                      { month: 'Oct', visits: 3 },
                      { month: 'Nov', visits: 1 },
                      { month: 'Dec', visits: 2 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="visits" fill="#8884d8" name="Appointments" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Health Metrics</CardTitle>
                <CardDescription>Tracking your key health indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { month: 'Jul', bp: 120, weight: 70 },
                      { month: 'Aug', bp: 118, weight: 69 },
                      { month: 'Sep', bp: 122, weight: 69 },
                      { month: 'Oct', bp: 125, weight: 71 },
                      { month: 'Nov', bp: 121, weight: 70 },
                      { month: 'Dec', bp: 119, weight: 68 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="bp" stroke="#8884d8" name="Blood Pressure" />
                      <Line yAxisId="right" type="monotone" dataKey="weight" stroke="#82ca9d" name="Weight (kg)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Medication Schedule</CardTitle>
              <CardDescription>Your current medication schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={[
                      { name: 'Morning', medications: 2 },
                      { name: 'Afternoon', medications: 1 },
                      { name: 'Evening', medications: 2 },
                      { name: 'Bedtime', medications: 1 }
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="medications" fill="#8884d8" name="Medications" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Analytics;
