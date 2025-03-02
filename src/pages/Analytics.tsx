
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for charts
const patientData = [
  { month: 'Jan', count: 65 },
  { month: 'Feb', count: 59 },
  { month: 'Mar', count: 80 },
  { month: 'Apr', count: 81 },
  { month: 'May', count: 56 },
  { month: 'Jun', count: 55 },
  { month: 'Jul', count: 40 },
  { month: 'Aug', count: 70 },
  { month: 'Sep', count: 90 },
  { month: 'Oct', count: 110 },
  { month: 'Nov', count: 100 },
  { month: 'Dec', count: 85 },
];

const revenueData = [
  { month: 'Jan', amount: 12000 },
  { month: 'Feb', amount: 19000 },
  { month: 'Mar', amount: 15000 },
  { month: 'Apr', amount: 21000 },
  { month: 'May', amount: 16000 },
  { month: 'Jun', amount: 17000 },
  { month: 'Jul', amount: 20000 },
  { month: 'Aug', amount: 23000 },
  { month: 'Sep', amount: 29000 },
  { month: 'Oct', amount: 31000 },
  { month: 'Nov', amount: 27000 },
  { month: 'Dec', amount: 30000 },
];

const departmentData = [
  { name: 'Cardiology', value: 400 },
  { name: 'Orthopedics', value: 300 },
  { name: 'Neurology', value: 300 },
  { name: 'Pediatrics', value: 200 },
  { name: 'Oncology', value: 150 },
  { name: 'Dermatology', value: 100 },
];

const appointmentTypeData = [
  { name: 'General Checkup', value: 35 },
  { name: 'Follow-up', value: 25 },
  { name: 'Emergency', value: 15 },
  { name: 'Specialist Consultation', value: 20 },
  { name: 'Procedure', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9F44D3', '#F15F79'];

const Analytics: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  const isAdmin = user?.role === 'admin';
  const isDoctor = user?.role === 'doctor';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
      </div>
      
      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">Patient Analytics</TabsTrigger>
          <TabsTrigger value="appointments">Appointment Analytics</TabsTrigger>
          {isAdmin && <TabsTrigger value="revenue">Revenue</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="overview" className="mt-4 space-y-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Patient Registrations</CardTitle>
                <CardDescription>Monthly patient registrations over the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={patientData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="count" stroke="#0088FE" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Department Distribution</CardTitle>
                <CardDescription>Patient distribution across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {departmentData.map((entry, index) => (
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
            
            {isAdmin && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue over the past year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                        <Legend />
                        <Area type="monotone" dataKey="amount" stroke="#00C49F" fill="#00C49F" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="patients" className="mt-4 space-y-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Patient Age Distribution</CardTitle>
                <CardDescription>Distribution of patients by age group</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { age: '0-10', count: 120 },
                        { age: '11-20', count: 80 },
                        { age: '21-30', count: 150 },
                        { age: '31-40', count: 200 },
                        { age: '41-50', count: 180 },
                        { age: '51-60', count: 160 },
                        { age: '61-70', count: 140 },
                        { age: '71+', count: 90 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#FF8042" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Gender Distribution</CardTitle>
                <CardDescription>Distribution of patients by gender</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Male', value: 540 },
                          { name: 'Female', value: 620 },
                          { name: 'Other', value: 40 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#0088FE" />
                        <Cell fill="#F15F79" />
                        <Cell fill="#9F44D3" />
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
        
        <TabsContent value="appointments" className="mt-4 space-y-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Types</CardTitle>
                <CardDescription>Distribution of appointments by type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={appointmentTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {appointmentTypeData.map((entry, index) => (
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
            
            <Card>
              <CardHeader>
                <CardTitle>Appointment Trends</CardTitle>
                <CardDescription>Monthly appointments over the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: 'Jan', count: 45 },
                        { month: 'Feb', count: 52 },
                        { month: 'Mar', count: 60 },
                        { month: 'Apr', count: 70 },
                        { month: 'May', count: 65 },
                        { month: 'Jun', count: 75 },
                        { month: 'Jul', count: 80 },
                        { month: 'Aug', count: 90 },
                        { month: 'Sep', count: 100 },
                        { month: 'Oct', count: 95 },
                        { month: 'Nov', count: 85 },
                        { month: 'Dec', count: 70 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="count" stroke="#FFBB28" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {isDoctor && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Doctor Workload</CardTitle>
                  <CardDescription>Appointments per doctor this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { doctor: 'Dr. Jane Smith', count: 32 },
                          { doctor: 'Dr. John Doe', count: 28 },
                          { doctor: 'Dr. Emily Chen', count: 35 },
                          { doctor: 'Dr. Michael Brown', count: 30 },
                          { doctor: 'Dr. Sarah Johnson', count: 25 },
                          { doctor: 'Dr. Robert Lee', count: 22 },
                          { doctor: 'Dr. David Miller', count: 29 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="doctor" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#9F44D3" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        {isAdmin && (
          <TabsContent value="revenue" className="mt-4 space-y-6">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription>Revenue by department for the current year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { department: 'Cardiology', amount: 85000 },
                          { department: 'Orthopedics', amount: 72000 },
                          { department: 'Neurology', amount: 68000 },
                          { department: 'Pediatrics', amount: 45000 },
                          { department: 'Oncology', amount: 92000 },
                          { department: 'Dermatology', amount: 38000 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="department" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                        <Legend />
                        <Bar dataKey="amount" fill="#00C49F" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Revenue vs. Expenses</CardTitle>
                  <CardDescription>Monthly comparison for the current year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { month: 'Jan', revenue: 12000, expenses: 8000 },
                          { month: 'Feb', revenue: 19000, expenses: 9000 },
                          { month: 'Mar', revenue: 15000, expenses: 7500 },
                          { month: 'Apr', revenue: 21000, expenses: 12000 },
                          { month: 'May', revenue: 16000, expenses: 8500 },
                          { month: 'Jun', revenue: 17000, expenses: 9000 },
                          { month: 'Jul', revenue: 20000, expenses: 11000 },
                          { month: 'Aug', revenue: 23000, expenses: 12500 },
                          { month: 'Sep', revenue: 29000, expenses: 15000 },
                          { month: 'Oct', revenue: 31000, expenses: 16000 },
                          { month: 'Nov', revenue: 27000, expenses: 14000 },
                          { month: 'Dec', revenue: 30000, expenses: 15500 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, '']} />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#0088FE" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="expenses" stroke="#FF8042" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Profit Margins</CardTitle>
                  <CardDescription>Monthly profit margins for the current year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={[
                          { month: 'Jan', margin: 33 },
                          { month: 'Feb', margin: 52 },
                          { month: 'Mar', margin: 50 },
                          { month: 'Apr', margin: 42 },
                          { month: 'May', margin: 46 },
                          { month: 'Jun', margin: 47 },
                          { month: 'Jul', margin: 45 },
                          { month: 'Aug', margin: 45 },
                          { month: 'Sep', margin: 48 },
                          { month: 'Oct', margin: 48 },
                          { month: 'Nov', margin: 48 },
                          { month: 'Dec', margin: 48 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}%`, 'Profit Margin']} />
                        <Legend />
                        <Area type="monotone" dataKey="margin" stroke="#FFBB28" fill="#FFBB28" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Analytics;
