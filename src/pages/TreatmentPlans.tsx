
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Download, Filter, PlusCircle, Calendar, MoreHorizontal } from 'lucide-react';
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
import { Progress } from '@/components/ui/progress';

const TreatmentPlans = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample treatment plans data
  const activePlans = [
    { id: 1, patient: 'John Doe', condition: 'Diabetes Type 2', startDate: '2023-01-15', endDate: '2023-07-15', progress: 65, doctor: 'Dr. Sarah Johnson', status: 'Active' },
    { id: 2, patient: 'Jane Smith', condition: 'Hypertension', startDate: '2023-02-10', endDate: '2023-08-10', progress: 40, doctor: 'Dr. David Lee', status: 'Active' },
    { id: 3, patient: 'Michael Johnson', condition: 'Chronic Back Pain', startDate: '2023-03-05', endDate: '2023-06-05', progress: 80, doctor: 'Dr. Maria Garcia', status: 'Active' },
    { id: 4, patient: 'Emily Wilson', condition: 'Asthma', startDate: '2023-01-20', endDate: '2023-04-20', progress: 90, doctor: 'Dr. James Wilson', status: 'Active' },
    { id: 5, patient: 'Robert Brown', condition: 'Rheumatoid Arthritis', startDate: '2023-02-25', endDate: '2023-08-25', progress: 35, doctor: 'Dr. Lisa Chen', status: 'Active' },
  ];
  
  const completedPlans = [
    { id: 6, patient: 'Olivia Davis', condition: 'Ankle Fracture', startDate: '2022-09-15', endDate: '2023-03-15', progress: 100, doctor: 'Dr. James Wilson', status: 'Completed' },
    { id: 7, patient: 'William Martinez', condition: 'Pneumonia', startDate: '2022-10-10', endDate: '2022-12-10', progress: 100, doctor: 'Dr. Maria Garcia', status: 'Completed' },
    { id: 8, patient: 'Sophia Anderson', condition: 'Post-Surgery Rehab', startDate: '2022-11-05', endDate: '2023-02-05', progress: 100, doctor: 'Dr. David Lee', status: 'Completed' },
    { id: 9, patient: 'Liam Taylor', condition: 'Depression', startDate: '2022-08-20', endDate: '2023-02-20', progress: 100, doctor: 'Dr. Lisa Chen', status: 'Completed' },
    { id: 10, patient: 'Emma Thomas', condition: 'Migraine Management', startDate: '2022-12-25', endDate: '2023-03-25', progress: 100, doctor: 'Dr. Sarah Johnson', status: 'Completed' },
  ];
  
  // Filter plans based on search term
  const filteredActivePlans = activePlans.filter(plan => 
    plan.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredCompletedPlans = completedPlans.filter(plan => 
    plan.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Treatment plan template for dialog
  const treatmentPlanTemplate = {
    patientName: '',
    condition: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0],
    assignedDoctor: '',
    goals: [
      { id: 1, description: 'Improve mobility', completed: false },
      { id: 2, description: 'Reduce pain levels', completed: false },
      { id: 3, description: 'Improve overall health markers', completed: false }
    ],
    medications: [
      { id: 1, name: '', dosage: '', frequency: '', duration: '' }
    ],
    therapies: [
      { id: 1, type: '', frequency: '', provider: '' }
    ],
    notes: ''
  };
  
  // Function to handle progress bar color based on percentage
  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Treatment Plans</h1>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Treatment Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Treatment Plan</DialogTitle>
                <DialogDescription>
                  Create a comprehensive treatment plan for a patient. All fields are required.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="patientName" className="text-sm font-medium">Patient Name</label>
                    <Input id="patientName" placeholder="Select a patient" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="condition" className="text-sm font-medium">Condition</label>
                    <Input id="condition" placeholder="E.g., Diabetes, Hypertension" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="startDate" className="text-sm font-medium">Start Date</label>
                    <Input id="startDate" type="date" defaultValue={treatmentPlanTemplate.startDate} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="endDate" className="text-sm font-medium">Estimated End Date</label>
                    <Input id="endDate" type="date" defaultValue={treatmentPlanTemplate.endDate} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="assignedDoctor" className="text-sm font-medium">Assigned Doctor</label>
                  <Input id="assignedDoctor" placeholder="Select doctor" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Treatment Goals</label>
                  {treatmentPlanTemplate.goals.map((goal) => (
                    <div key={goal.id} className="flex items-center gap-2">
                      <Input defaultValue={goal.description} placeholder="Goal description" />
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="mt-2">
                    <PlusCircle className="mr-2 h-3 w-3" />
                    Add Goal
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Medications</label>
                  {treatmentPlanTemplate.medications.map((medication) => (
                    <div key={medication.id} className="grid grid-cols-4 gap-2">
                      <Input placeholder="Medication name" />
                      <Input placeholder="Dosage" />
                      <Input placeholder="Frequency" />
                      <Input placeholder="Duration" />
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="mt-2">
                    <PlusCircle className="mr-2 h-3 w-3" />
                    Add Medication
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Additional Notes</label>
                  <Input placeholder="Additional instructions or notes..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {}}>Cancel</Button>
                <Button onClick={() => {}}>Create Plan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
        <Input
          type="search"
          placeholder="Search plans..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs defaultValue="active">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="active">Active Plans</TabsTrigger>
          <TabsTrigger value="completed">Completed Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Treatment Plans</CardTitle>
                <CardDescription>
                  Currently active patient treatment plans
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
                    <TableHead>Condition</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActivePlans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">{plan.patient}</TableCell>
                      <TableCell>{plan.condition}</TableCell>
                      <TableCell>{plan.startDate}</TableCell>
                      <TableCell>{plan.endDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={plan.progress} className={getProgressColor(plan.progress)} />
                          <span className="text-xs font-medium">{plan.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{plan.doctor}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigate(`/treatment-plans/${plan.id}`)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/treatment-plans/${plan.id}/edit`)}>
                              Edit Plan
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/patients/${plan.patient.toLowerCase().replace(' ', '-')}`)}>
                              View Patient
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Update Progress</DropdownMenuItem>
                            <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Print Plan</DropdownMenuItem>
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
        
        <TabsContent value="completed">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Completed Treatment Plans</CardTitle>
                <CardDescription>
                  Successfully completed patient treatment plans
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Date Range
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
                    <TableHead>Condition</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompletedPlans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">{plan.patient}</TableCell>
                      <TableCell>{plan.condition}</TableCell>
                      <TableCell>{plan.startDate}</TableCell>
                      <TableCell>{plan.endDate}</TableCell>
                      <TableCell>{plan.doctor}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigate(`/treatment-plans/${plan.id}`)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/patients/${plan.patient.toLowerCase().replace(' ', '-')}`)}>
                              View Patient
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Create Follow-up</DropdownMenuItem>
                            <DropdownMenuItem>Print Summary</DropdownMenuItem>
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

export default TreatmentPlans;
