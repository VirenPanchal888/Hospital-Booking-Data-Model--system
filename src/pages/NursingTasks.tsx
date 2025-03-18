
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Clock, PlusCircle, Calendar, CheckCircle2, XCircle } from 'lucide-react';
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
import { useAuth } from '@/contexts/AuthContext';

const NursingTasks = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  
  // Sample nursing tasks data
  const tasks = [
    { id: '1', patient: 'John Doe', room: '101A', task: 'Medication Administration', priority: 'High', time: '08:30 AM', assigned: 'Nurse Johnson' },
    { id: '2', patient: 'Jane Smith', room: '102B', task: 'Vital Signs Check', priority: 'Medium', time: '09:00 AM', assigned: 'Nurse Wilson' },
    { id: '3', patient: 'Michael Johnson', room: '105C', task: 'IV Fluid Change', priority: 'High', time: '09:15 AM', assigned: 'Nurse Martinez' },
    { id: '4', patient: 'Emily Wilson', room: '110A', task: 'Post-Op Assessment', priority: 'High', time: '09:30 AM', assigned: 'Nurse Johnson' },
    { id: '5', patient: 'Robert Brown', room: '108B', task: 'Wound Dressing', priority: 'Medium', time: '10:00 AM', assigned: 'Nurse Wilson' },
    { id: '6', patient: 'Olivia Davis', room: '112C', task: 'Patient Education', priority: 'Low', time: '10:30 AM', assigned: 'Nurse Martinez' },
    { id: '7', patient: 'William Martinez', room: '115A', task: 'Discharge Planning', priority: 'Medium', time: '11:00 AM', assigned: 'Nurse Johnson' },
    { id: '8', patient: 'Sophia Anderson', room: '120B', task: 'Pain Assessment', priority: 'High', time: '11:15 AM', assigned: 'Nurse Wilson' },
  ];
  
  const upcomingProcedures = [
    { id: '1', patient: 'John Doe', room: '101A', procedure: 'Blood Draw', time: '10:30 AM', doctor: 'Dr. Sarah Johnson' },
    { id: '2', patient: 'Jane Smith', room: '102B', procedure: 'ECG', time: '11:00 AM', doctor: 'Dr. David Lee' },
    { id: '3', patient: 'Michael Johnson', room: '105C', procedure: 'CT Scan', time: '01:30 PM', doctor: 'Dr. Maria Garcia' },
    { id: '4', patient: 'Emily Wilson', room: '110A', procedure: 'X-Ray', time: '02:00 PM', doctor: 'Dr. James Wilson' },
    { id: '5', patient: 'Robert Brown', room: '108B', procedure: 'MRI', time: '03:30 PM', doctor: 'Dr. Lisa Chen' },
  ];
  
  // Filter tasks based on search term and current nurse
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.room.toLowerCase().includes(searchTerm.toLowerCase());
    
    // If user role is nurse, only show tasks assigned to them
    const isAssignedToCurrentNurse = user?.role !== 'nurse' || 
      (user?.name && task.assigned.includes(user.name));
    
    return matchesSearch && isAssignedToCurrentNurse;
  });
  
  // Get priority badge with appropriate color
  const getPriorityBadge = (priority: string) => {
    let variant: "default" | "destructive" | "outline" | "secondary" = "default";
    
    switch (priority.toLowerCase()) {
      case 'high':
        variant = "destructive";
        break;
      case 'medium':
        variant = "secondary";
        break;
      case 'low':
        variant = "outline";
        break;
    }
    
    return <Badge variant={variant}>{priority}</Badge>;
  };
  
  // Toggle task completion
  const toggleTaskCompletion = (taskId: string) => {
    setCompletedTasks(prev => {
      if (prev.includes(taskId)) {
        return prev.filter(id => id !== taskId);
      } else {
        return [...prev, taskId];
      }
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Nursing Tasks</h1>
        <div className="flex items-center gap-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>
      
      <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
        <Input
          type="search"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs defaultValue="tasks">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="procedures">Upcoming Procedures</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Today's Nursing Tasks</CardTitle>
                <CardDescription>
                  Tasks that need to be completed for patients
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Clock className="mr-2 h-4 w-4" />
                  Filter by Time
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Schedule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task) => (
                    <TableRow key={task.id} className={completedTasks.includes(task.id) ? "bg-muted/50" : ""}>
                      <TableCell className="font-medium">{task.patient}</TableCell>
                      <TableCell>{task.room}</TableCell>
                      <TableCell>{task.task}</TableCell>
                      <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                      <TableCell>{task.time}</TableCell>
                      <TableCell>{task.assigned}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant={completedTasks.includes(task.id) ? "outline" : "default"} 
                                size="sm"
                                className={completedTasks.includes(task.id) ? "text-green-600" : ""}
                              >
                                {completedTasks.includes(task.id) ? (
                                  <>
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    Completed
                                  </>
                                ) : (
                                  "Update Status"
                                )}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Task Status</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => toggleTaskCompletion(task.id)}>
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Mark as Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setCompletedTasks(prev => prev.filter(id => id !== task.id))}>
                                <XCircle className="mr-2 h-4 w-4" />
                                Mark as Pending
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Reassign Task</DropdownMenuItem>
                              <DropdownMenuItem>Reschedule Task</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="procedures">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Procedures</CardTitle>
                <CardDescription>
                  Procedures that require nursing assistance
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Calendar View
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Procedure</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingProcedures.map((procedure) => (
                    <TableRow key={procedure.id}>
                      <TableCell className="font-medium">{procedure.patient}</TableCell>
                      <TableCell>{procedure.room}</TableCell>
                      <TableCell>{procedure.procedure}</TableCell>
                      <TableCell>{procedure.time}</TableCell>
                      <TableCell>{procedure.doctor}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Procedure Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Patient Chart</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Prep Checklist</DropdownMenuItem>
                            <DropdownMenuItem>Record Vitals</DropdownMenuItem>
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

export default NursingTasks;
