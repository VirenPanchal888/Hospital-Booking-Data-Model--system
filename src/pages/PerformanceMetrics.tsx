
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar,
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Briefcase, 
  Heart, 
  User,
  BarChart2,
  PieChart,
  LineChart,
  Download, 
  ArrowRight, 
  Printer
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart as RechartLine, 
  Line, 
  PieChart as RechartPie, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';

const PerformanceMetrics: React.FC = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('month');
  const [department, setDepartment] = useState('all');
  
  // Department data
  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'cardiology', name: 'Cardiology' },
    { id: 'neurology', name: 'Neurology' },
    { id: 'pediatrics', name: 'Pediatrics' },
    { id: 'oncology', name: 'Oncology' },
    { id: 'emergency', name: 'Emergency' },
    { id: 'surgery', name: 'Surgery' },
    { id: 'radiology', name: 'Radiology' },
  ];
  
  // Sample data for charts
  const patientVolumeData = [
    { name: 'Jan', emergency: 400, outpatient: 240, inpatient: 180 },
    { name: 'Feb', emergency: 380, outpatient: 250, inpatient: 190 },
    { name: 'Mar', emergency: 450, outpatient: 260, inpatient: 200 },
    { name: 'Apr', emergency: 420, outpatient: 270, inpatient: 210 },
    { name: 'May', emergency: 460, outpatient: 280, inpatient: 220 },
    { name: 'Jun', emergency: 480, outpatient: 290, inpatient: 230 },
  ];
  
  const waitTimeData = [
    { name: 'Jan', emergency: 42, outpatient: 18, inpatient: 5 },
    { name: 'Feb', emergency: 45, outpatient: 20, inpatient: 6 },
    { name: 'Mar', emergency: 40, outpatient: 17, inpatient: 5 },
    { name: 'Apr', emergency: 38, outpatient: 16, inpatient: 4 },
    { name: 'May', emergency: 35, outpatient: 15, inpatient: 4 },
    { name: 'Jun', emergency: 32, outpatient: 14, inpatient: 3 },
  ];
  
  const satisfactionData = [
    { name: 'Very Satisfied', value: 45 },
    { name: 'Satisfied', value: 30 },
    { name: 'Neutral', value: 15 },
    { name: 'Dissatisfied', value: 7 },
    { name: 'Very Dissatisfied', value: 3 },
  ];
  
  const qualityMetricsData = [
    { name: 'Jan', readmission: 5.2, infection: 2.1, mortality: 1.5 },
    { name: 'Feb', readmission: 4.8, infection: 2.0, mortality: 1.4 },
    { name: 'Mar', readmission: 4.5, infection: 1.9, mortality: 1.3 },
    { name: 'Apr', readmission: 4.0, infection: 1.8, mortality: 1.2 },
    { name: 'May', readmission: 3.8, infection: 1.7, mortality: 1.1 },
    { name: 'Jun', readmission: 3.5, infection: 1.6, mortality: 1.0 },
  ];
  
  const departmentalPerformanceData = [
    { name: 'Cardiology', score: 92, target: 90 },
    { name: 'Neurology', score: 88, target: 85 },
    { name: 'Pediatrics', score: 95, target: 90 },
    { name: 'Oncology', score: 90, target: 88 },
    { name: 'Emergency', score: 82, target: 85 },
    { name: 'Surgery', score: 89, target: 87 },
    { name: 'Radiology', score: 93, target: 90 },
  ];
  
  const staffPerformanceData = [
    { name: 'Physicians', efficiency: 85, quality: 92, satisfaction: 88 },
    { name: 'Nurses', efficiency: 82, quality: 90, satisfaction: 86 },
    { name: 'Technicians', efficiency: 78, quality: 85, satisfaction: 82 },
    { name: 'Admin Staff', efficiency: 80, quality: 83, satisfaction: 85 },
  ];
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  // Key metrics
  const keyMetrics = [
    { 
      title: 'Patient Volume', 
      value: '1,248', 
      change: '+8.2%', 
      trend: 'up', 
      icon: User,
      description: 'Total patients this month'
    },
    { 
      title: 'Avg. Wait Time', 
      value: '32 min', 
      change: '-12.5%', 
      trend: 'down', 
      icon: Clock,
      description: 'Average wait time in minutes'
    },
    { 
      title: 'Readmission Rate', 
      value: '3.5%', 
      change: '-0.5%', 
      trend: 'down', 
      icon: TrendingDown,
      description: '30-day readmission rate'
    },
    { 
      title: 'Staff Efficiency', 
      value: '87%', 
      change: '+2.1%', 
      trend: 'up', 
      icon: Briefcase,
      description: 'Staff productivity score'
    },
    { 
      title: 'Patient Satisfaction', 
      value: '4.2/5', 
      change: '+0.3', 
      trend: 'up', 
      icon: Heart,
      description: 'Average patient rating'
    },
    { 
      title: 'Quality Score', 
      value: '89/100', 
      change: '+5', 
      trend: 'up', 
      icon: BarChart3,
      description: 'Overall quality rating'
    },
  ];
  
  // Department performance table data
  const departmentTableData = [
    { 
      department: 'Cardiology', 
      patientVolume: 320, 
      waitTime: '25 min', 
      readmissionRate: '3.2%',
      satisfaction: '4.5/5',
      qualityScore: 92,
      efficiency: '89%',
      status: 'above-target'
    },
    { 
      department: 'Neurology', 
      patientVolume: 280, 
      waitTime: '32 min', 
      readmissionRate: '3.8%',
      satisfaction: '4.2/5',
      qualityScore: 88,
      efficiency: '85%',
      status: 'on-target'
    },
    { 
      department: 'Pediatrics', 
      patientVolume: 350, 
      waitTime: '20 min', 
      readmissionRate: '2.5%',
      satisfaction: '4.7/5',
      qualityScore: 95,
      efficiency: '92%',
      status: 'above-target'
    },
    { 
      department: 'Oncology', 
      patientVolume: 210, 
      waitTime: '35 min', 
      readmissionRate: '4.1%',
      satisfaction: '4.3/5',
      qualityScore: 90,
      efficiency: '87%',
      status: 'on-target'
    },
    { 
      department: 'Emergency', 
      patientVolume: 480, 
      waitTime: '45 min', 
      readmissionRate: '5.2%',
      satisfaction: '3.9/5',
      qualityScore: 82,
      efficiency: '80%',
      status: 'below-target'
    },
    { 
      department: 'Surgery', 
      patientVolume: 180, 
      waitTime: '28 min', 
      readmissionRate: '3.9%',
      satisfaction: '4.1/5',
      qualityScore: 89,
      efficiency: '86%',
      status: 'on-target'
    },
    { 
      department: 'Radiology', 
      patientVolume: 320, 
      waitTime: '22 min', 
      readmissionRate: '2.8%',
      satisfaction: '4.4/5',
      qualityScore: 93,
      efficiency: '90%',
      status: 'above-target'
    },
  ];
  
  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case 'above-target':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Above Target</Badge>;
      case 'on-target':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">On Target</Badge>;
      case 'below-target':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Below Target</Badge>;
      default:
        return null;
    }
  };
  
  // Filtered department data based on selection
  const filteredDepartmentData = department === 'all' 
    ? departmentTableData 
    : departmentTableData.filter(dept => dept.department.toLowerCase() === department);
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Performance Metrics</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate('/report-builder')}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1">
          <p className="text-sm font-medium mb-1.5">Time Range</p>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger>
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium mb-1.5">Department</p>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map(dept => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Custom Date Range
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <h2 className="text-3xl font-bold mt-1">{metric.value}</h2>
                </div>
                <div className={`p-2 rounded-full ${metric.trend === 'up' ? 'bg-green-100' : 'bg-blue-100'}`}>
                  <metric.icon className={`h-5 w-5 ${metric.trend === 'up' ? 'text-green-600' : 'text-blue-600'}`} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className={`text-sm ${metric.trend === 'up' && metric.title !== 'Readmission Rate' && metric.title !== 'Avg. Wait Time' ? 'text-green-600' : metric.trend === 'down' && (metric.title === 'Readmission Rate' || metric.title === 'Avg. Wait Time') ? 'text-green-600' : 'text-blue-600'}`}>
                  {metric.change}
                </span>
                {metric.trend === 'up' && metric.title !== 'Readmission Rate' && metric.title !== 'Avg. Wait Time' ? (
                  <TrendingUp className="h-4 w-4 text-green-600 ml-1" />
                ) : metric.trend === 'down' && (metric.title === 'Readmission Rate' || metric.title === 'Avg. Wait Time') ? (
                  <TrendingDown className="h-4 w-4 text-green-600 ml-1" />
                ) : metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-red-600 ml-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-blue-600 ml-1" />
                )}
                <span className="text-xs text-muted-foreground ml-2">vs last {timeRange}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
          <TabsTrigger value="departmental">Departmental</TabsTrigger>
          <TabsTrigger value="staff">Staff Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Patient Volume</span>
                  <BarChart2 className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
                <CardDescription>Patient volume by type over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={patientVolumeData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="emergency" name="Emergency" stackId="a" fill="#FF8042" />
                      <Bar dataKey="outpatient" name="Outpatient" stackId="a" fill="#00C49F" />
                      <Bar dataKey="inpatient" name="Inpatient" stackId="a" fill="#0088FE" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Average Wait Times</span>
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
                <CardDescription>Wait times by department (minutes)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartLine
                      data={waitTimeData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="emergency" name="Emergency" stroke="#FF8042" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="outpatient" name="Outpatient" stroke="#00C49F" />
                      <Line type="monotone" dataKey="inpatient" name="Inpatient" stroke="#0088FE" />
                    </RechartLine>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Patient Satisfaction</span>
                  <Heart className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
                <CardDescription>Patient satisfaction ratings distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartPie>
                      <Pie
                        data={satisfactionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {satisfactionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartPie>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Departmental Performance</CardTitle>
                <CardDescription>Overall performance by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead className="text-right">Volume</TableHead>
                        <TableHead className="text-right">Wait Time</TableHead>
                        <TableHead className="text-right">Satisfaction</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDepartmentData.map((dept, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{dept.department}</TableCell>
                          <TableCell className="text-right">{dept.patientVolume}</TableCell>
                          <TableCell className="text-right">{dept.waitTime}</TableCell>
                          <TableCell className="text-right">{dept.satisfaction}</TableCell>
                          <TableCell>
                            <StatusBadge status={dept.status} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-end mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => navigate('/report-builder')}
                  >
                    View Full Report
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="quality" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics Trend</CardTitle>
                <CardDescription>Key quality indicators over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartLine
                      data={qualityMetricsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="readmission" name="Readmission Rate %" stroke="#FF8042" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="infection" name="Infection Rate %" stroke="#8884D8" />
                      <Line type="monotone" dataKey="mortality" name="Mortality Rate %" stroke="#FF0000" />
                    </RechartLine>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Detailed Quality Metrics</CardTitle>
                <CardDescription>Comprehensive quality indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead className="text-right">Readmission</TableHead>
                        <TableHead className="text-right">Infection</TableHead>
                        <TableHead className="text-right">Mortality</TableHead>
                        <TableHead className="text-right">Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDepartmentData.map((dept, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{dept.department}</TableCell>
                          <TableCell className="text-right">{dept.readmissionRate}</TableCell>
                          <TableCell className="text-right">
                            {(parseFloat(dept.readmissionRate) * 0.4).toFixed(1)}%
                          </TableCell>
                          <TableCell className="text-right">
                            {(parseFloat(dept.readmissionRate) * 0.3).toFixed(1)}%
                          </TableCell>
                          <TableCell className="text-right">{dept.qualityScore}/100</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Departmental Quality Scores vs Targets</CardTitle>
                <CardDescription>Current scores compared to targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={departmentalPerformanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" name="Current Score" fill="#0088FE" />
                      <Bar dataKey="target" name="Target Score" fill="#FFBB28" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="departmental" className="space-y-6 mt-6">
          <p>Departmental metrics content</p>
        </TabsContent>
        
        <TabsContent value="staff" className="space-y-6 mt-6">
          <p>Staff performance content</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceMetrics;
