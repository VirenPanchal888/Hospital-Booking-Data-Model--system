
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Calendar, PlusCircle, Download, Filter } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const MedicalTests = () => {
  const navigate = useNavigate();
  
  // Sample data for available and recent tests
  const availableTests = [
    { id: 'cbc', name: 'Complete Blood Count', category: 'Blood', price: 50, turnaround: '1 day' },
    { id: 'cmp', name: 'Comprehensive Metabolic Panel', category: 'Blood', price: 80, turnaround: '1 day' },
    { id: 'lipid', name: 'Lipid Panel', category: 'Blood', price: 70, turnaround: '1 day' },
    { id: 'a1c', name: 'Hemoglobin A1C', category: 'Blood', price: 65, turnaround: '1 day' },
    { id: 'tsh', name: 'Thyroid Stimulating Hormone', category: 'Blood', price: 75, turnaround: '1 day' },
    { id: 'ecg', name: 'Electrocardiogram', category: 'Cardiac', price: 120, turnaround: 'Immediate' },
    { id: 'xray', name: 'X-Ray', category: 'Imaging', price: 150, turnaround: '1 day' },
    { id: 'ct', name: 'CT Scan', category: 'Imaging', price: 450, turnaround: '1 day' },
    { id: 'mri', name: 'MRI', category: 'Imaging', price: 800, turnaround: '2 days' },
    { id: 'ultrasound', name: 'Ultrasound', category: 'Imaging', price: 300, turnaround: 'Same day' },
  ];
  
  const recentTests = [
    { id: 1, patient: 'John Doe', test: 'Complete Blood Count', date: '2023-04-10', doctor: 'Dr. Sarah Johnson', status: 'Completed' },
    { id: 2, patient: 'Jane Smith', test: 'Lipid Panel', date: '2023-04-09', doctor: 'Dr. David Lee', status: 'Pending' },
    { id: 3, patient: 'Michael Johnson', test: 'X-Ray', date: '2023-04-08', doctor: 'Dr. Maria Garcia', status: 'Completed' },
    { id: 4, patient: 'Emily Wilson', test: 'MRI', date: '2023-04-07', doctor: 'Dr. James Wilson', status: 'In Process' },
    { id: 5, patient: 'Robert Brown', test: 'Electrocardiogram', date: '2023-04-06', doctor: 'Dr. Lisa Chen', status: 'Completed' },
  ];
  
  // Get status badge with appropriate color
  const getStatusBadge = (status: string) => {
    let bgColor = "";
    
    switch (status) {
      case 'Completed':
        bgColor = "bg-green-100 text-green-800";
        break;
      case 'Pending':
        bgColor = "bg-yellow-100 text-yellow-800";
        break;
      case 'In Process':
        bgColor = "bg-blue-100 text-blue-800";
        break;
      default:
        bgColor = "bg-gray-100 text-gray-800";
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor}`}>
        {status}
      </span>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Medical Tests</h1>
        <div className="flex items-center gap-2">
          <Button onClick={() => navigate('/medical-tests/order')}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Order New Test
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="available">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="available">Available Tests</TabsTrigger>
          <TabsTrigger value="recent">Recent Tests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Available Medical Tests</CardTitle>
                  <CardDescription>Browse and order medical tests for patients</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="flex max-w-sm items-center space-x-2 mt-4">
                <Input type="search" placeholder="Search tests..." />
                <Button type="submit" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Turnaround Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availableTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium">{test.name}</TableCell>
                      <TableCell>{test.category}</TableCell>
                      <TableCell>${test.price.toFixed(2)}</TableCell>
                      <TableCell>{test.turnaround}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => navigate(`/medical-tests/order/${test.id}`)}>
                          Order
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Recent Tests</CardTitle>
                  <CardDescription>View recently ordered and completed tests</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Select Date
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
              <div className="flex max-w-sm items-center space-x-2 mt-4">
                <Input type="search" placeholder="Search patient or test..." />
                <Button type="submit" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Test</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Ordering Doctor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium">{test.patient}</TableCell>
                      <TableCell>{test.test}</TableCell>
                      <TableCell>{test.date}</TableCell>
                      <TableCell>{test.doctor}</TableCell>
                      <TableCell>{getStatusBadge(test.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Test Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigate(`/medical-tests/${test.id}`)}>
                              View Results
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/patients/${test.patient.toLowerCase().replace(' ', '-')}`)}>
                              View Patient
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Print Report</DropdownMenuItem>
                            <DropdownMenuItem>Email Results</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicalTests;
