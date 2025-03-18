
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
                  <span>Department Performance</span>
                  <BarChart2 className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
                <CardDescription>Performance metrics by department</CardDescription>
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
      </Tabs>
    </div>
  );
};

export default PerformanceMetrics;
