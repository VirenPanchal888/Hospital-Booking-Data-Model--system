
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, PlusCircle, Download, Filter, Clock, Calendar } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const PatientReferrals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample referrals data
  const incomingReferrals = [
    { id: 1, patient: 'John Doe', referredBy: 'Dr. William Taylor', specialty: 'Cardiology', priority: 'High', date: '2023-04-10', status: 'Pending' },
    { id: 2, patient: 'Jane Smith', referredBy: 'Dr. Emma White', specialty: 'Neurology', priority: 'Medium', date: '2023-04-09', status: 'Scheduled' },
    { id: 3, patient: 'Michael Johnson', referredBy: 'Dr. Robert Brown', specialty: 'Orthopedics', priority: 'Low', date: '2023-04-08', status: 'Pending' },
    { id: 4, patient: 'Emily Wilson', referredBy: 'Dr. Sarah Davis', specialty: 'Ophthalmology', priority: 'High', date: '2023-04-07', status: 'Completed' },
    { id: 5, patient: 'Robert Brown', referredBy: 'Dr. David Lee', specialty: 'Dermatology', priority: 'Medium', date: '2023-04-06', status: 'Canceled' },
  ];
  
  const outgoingReferrals = [
    { id: 1, patient: 'Olivia Davis', referredTo: 'Dr. Sarah Johnson', specialty: 'Cardiology', priority: 'High', date: '2023-04-10', status: 'Pending' },
    { id: 2, patient: 'William Martinez', referredTo: 'Dr. David Lee', specialty: 'Neurology', priority: 'Medium', date: '2023-04-09', status: 'Accepted' },
    { id: 3, patient: 'Sophia Anderson', referredTo: 'Dr. James Wilson', specialty: 'Orthopedics', priority: 'Low', date: '2023-04-08', status: 'Completed' },
    { id: 4, patient: 'Liam Taylor', referredTo: 'Dr. Maria Garcia', specialty: 'Ophthalmology', priority: 'High', date: '2023-04-07', status: 'Rejected' },
    { id: 5, patient: 'Emma Thomas', referredTo: 'Dr. Lisa Chen', specialty: 'Dermatology', priority: 'Medium', date: '2023-04-06', status: 'Pending' },
  ];
  
  // Filter referrals based on search term
  const filteredIncomingReferrals = incomingReferrals.filter(referral => 
    referral.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    referral.referredBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
    referral.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredOutgoingReferrals = outgoingReferrals.filter(referral => 
    referral.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    referral.referredTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    referral.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get status badge with appropriate color
  const getStatusBadge = (status: string) => {
    let variant: "default" | "destructive" | "outline" | "secondary" = "default";
    
    switch (status.toLowerCase()) {
      case 'pending':
        variant = "secondary";
        break;
      case 'scheduled':
      case 'accepted':
        variant = "default";
        break;
      case 'completed':
        variant = "outline";
        break;
      case 'canceled':
      case 'rejected':
        variant = "destructive";
        break;
    }
    
    return <Badge variant={variant}>{status}</Badge>;
  };
  
  // Get priority badge with appropriate color
  const getPriorityBadge = (priority: string) => {
    let className = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ";
    
    switch (priority.toLowerCase()) {
      case 'high':
        className += "bg-red-100 text-red-800";
        break;
      case 'medium':
        className += "bg-yellow-100 text-yellow-800";
        break;
      case 'low':
        className += "bg-green-100 text-green-800";
        break;
      default:
        className += "bg-gray-100 text-gray-800";
    }
    
    return <span className={className}>{priority}</span>;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Patient Referrals</h1>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Referral
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Referral</DialogTitle>
                <DialogDescription>
                  Create a referral for a patient to see a specialist.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="patient" className="text-sm font-medium">Patient</label>
                    <Select>
                      <SelectTrigger id="patient">
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Doe</SelectItem>
                        <SelectItem value="jane">Jane Smith</SelectItem>
                        <SelectItem value="michael">Michael Johnson</SelectItem>
                        <SelectItem value="emily">Emily Wilson</SelectItem>
                        <SelectItem value="robert">Robert Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="priority" className="text-sm font-medium">Priority</label>
                    <Select>
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="specialty" className="text-sm font-medium">Specialty</label>
                  <Select>
                    <SelectTrigger id="specialty">
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="ophthalmology">Ophthalmology</SelectItem>
                      <SelectItem value="dermatology">Dermatology</SelectItem>
                      <SelectItem value="gastroenterology">Gastroenterology</SelectItem>
                      <SelectItem value="endocrinology">Endocrinology</SelectItem>
                      <SelectItem value="pulmonology">Pulmonology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="doctor" className="text-sm font-medium">Refer To Doctor</label>
                  <Select>
                    <SelectTrigger id="doctor">
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Dr. Sarah Johnson</SelectItem>
                      <SelectItem value="david">Dr. David Lee</SelectItem>
                      <SelectItem value="maria">Dr. Maria Garcia</SelectItem>
                      <SelectItem value="james">Dr. James Wilson</SelectItem>
                      <SelectItem value="lisa">Dr. Lisa Chen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="reason" className="text-sm font-medium">Reason for Referral</label>
                  <Textarea
                    id="reason"
                    placeholder="Describe the reason for referral..."
                    className="h-24 resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-medium">Preferred Date</label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="insurance" className="text-sm font-medium">Insurance Information</label>
                    <Input id="insurance" placeholder="Insurance provider and policy number" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Create Referral</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
        <Input
          type="search"
          placeholder="Search referrals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs defaultValue="incoming">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="incoming">Incoming Referrals</TabsTrigger>
          <TabsTrigger value="outgoing">Outgoing Referrals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="incoming">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Incoming Referrals</CardTitle>
                <CardDescription>
                  Patients referred to your practice
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Referred By</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIncomingReferrals.map((referral) => (
                    <TableRow key={referral.id}>
                      <TableCell className="font-medium">{referral.patient}</TableCell>
                      <TableCell>{referral.referredBy}</TableCell>
                      <TableCell>{referral.specialty}</TableCell>
                      <TableCell>{getPriorityBadge(referral.priority)}</TableCell>
                      <TableCell>{referral.date}</TableCell>
                      <TableCell>{getStatusBadge(referral.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Referral Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Schedule Appointment</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Accept Referral</DropdownMenuItem>
                            <DropdownMenuItem>Reject Referral</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Contact Referring Doctor</DropdownMenuItem>
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
        
        <TabsContent value="outgoing">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Outgoing Referrals</CardTitle>
                <CardDescription>
                  Patients you've referred to specialists
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Clock className="mr-2 h-4 w-4" />
                  Recent
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Date Range
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Referred To</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOutgoingReferrals.map((referral) => (
                    <TableRow key={referral.id}>
                      <TableCell className="font-medium">{referral.patient}</TableCell>
                      <TableCell>{referral.referredTo}</TableCell>
                      <TableCell>{referral.specialty}</TableCell>
                      <TableCell>{getPriorityBadge(referral.priority)}</TableCell>
                      <TableCell>{referral.date}</TableCell>
                      <TableCell>{getStatusBadge(referral.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Referral Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Check Status</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit Referral</DropdownMenuItem>
                            <DropdownMenuItem>Cancel Referral</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Contact Specialist</DropdownMenuItem>
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

export default PatientReferrals;
