
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, UserPlus, Filter, RefreshCw } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from '@/components/ui/use-toast';

type ShiftType = 'morning' | 'afternoon' | 'night' | 'on-call';
type StaffRole = 'doctor' | 'nurse' | 'receptionist' | 'technician' | 'admin';

interface StaffMember {
  id: string;
  name: string;
  role: StaffRole;
  department: string;
  contactNumber: string;
}

interface Shift {
  id: string;
  staffId: string;
  staffName: string;
  staffRole: StaffRole;
  department: string;
  date: string;
  startTime: string;
  endTime: string;
  type: ShiftType;
  status: 'scheduled' | 'in-progress' | 'completed' | 'pending-approval';
}

const StaffScheduling: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  
  // Mock departments data
  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'cardiology', name: 'Cardiology' },
    { id: 'emergency', name: 'Emergency' },
    { id: 'neurology', name: 'Neurology' },
    { id: 'pediatrics', name: 'Pediatrics' },
    { id: 'oncology', name: 'Oncology' },
    { id: 'surgery', name: 'Surgery' },
  ];
  
  // Mock staff roles
  const roles = [
    { id: 'all', name: 'All Roles' },
    { id: 'doctor', name: 'Doctors' },
    { id: 'nurse', name: 'Nurses' },
    { id: 'receptionist', name: 'Receptionists' },
    { id: 'technician', name: 'Technicians' },
    { id: 'admin', name: 'Administrative Staff' },
  ];
  
  // Mock staff members data
  const staffMembers: StaffMember[] = [
    { id: 'staff-001', name: 'Dr. Jane Smith', role: 'doctor', department: 'cardiology', contactNumber: '+1 (555) 111-2222' },
    { id: 'staff-002', name: 'Dr. Michael Chen', role: 'doctor', department: 'neurology', contactNumber: '+1 (555) 222-3333' },
    { id: 'staff-003', name: 'Dr. Sarah Johnson', role: 'doctor', department: 'pediatrics', contactNumber: '+1 (555) 333-4444' },
    { id: 'staff-004', name: 'Nurse Robert Johnson', role: 'nurse', department: 'cardiology', contactNumber: '+1 (555) 444-5555' },
    { id: 'staff-005', name: 'Nurse Emma Wilson', role: 'nurse', department: 'emergency', contactNumber: '+1 (555) 555-6666' },
    { id: 'staff-006', name: 'Nurse David Thompson', role: 'nurse', department: 'surgery', contactNumber: '+1 (555) 666-7777' },
    { id: 'staff-007', name: 'Rebecca Moore', role: 'receptionist', department: 'administration', contactNumber: '+1 (555) 777-8888' },
    { id: 'staff-008', name: 'James Wilson', role: 'technician', department: 'radiology', contactNumber: '+1 (555) 888-9999' },
    { id: 'staff-009', name: 'Linda Garcia', role: 'admin', department: 'administration', contactNumber: '+1 (555) 999-0000' },
  ];
  
  // Mock shifts data
  const shifts: Shift[] = [
    {
      id: 'shift-001',
      staffId: 'staff-001',
      staffName: 'Dr. Jane Smith',
      staffRole: 'doctor',
      department: 'cardiology',
      date: '2023-06-18',
      startTime: '08:00',
      endTime: '16:00',
      type: 'morning',
      status: 'scheduled'
    },
    {
      id: 'shift-002',
      staffId: 'staff-002',
      staffName: 'Dr. Michael Chen',
      staffRole: 'doctor',
      department: 'neurology',
      date: '2023-06-18',
      startTime: '09:00',
      endTime: '17:00',
      type: 'morning',
      status: 'scheduled'
    },
    {
      id: 'shift-003',
      staffId: 'staff-003',
      staffName: 'Dr. Sarah Johnson',
      staffRole: 'doctor',
      department: 'pediatrics',
      date: '2023-06-18',
      startTime: '08:00',
      endTime: '16:00',
      type: 'morning',
      status: 'scheduled'
    },
    {
      id: 'shift-004',
      staffId: 'staff-004',
      staffName: 'Nurse Robert Johnson',
      staffRole: 'nurse',
      department: 'cardiology',
      date: '2023-06-18',
      startTime: '07:00',
      endTime: '15:00',
      type: 'morning',
      status: 'scheduled'
    },
    {
      id: 'shift-005',
      staffId: 'staff-005',
      staffName: 'Nurse Emma Wilson',
      staffRole: 'nurse',
      department: 'emergency',
      date: '2023-06-18',
      startTime: '15:00',
      endTime: '23:00',
      type: 'afternoon',
      status: 'scheduled'
    },
    {
      id: 'shift-006',
      staffId: 'staff-006',
      staffName: 'Nurse David Thompson',
      staffRole: 'nurse',
      department: 'surgery',
      date: '2023-06-18',
      startTime: '23:00',
      endTime: '07:00',
      type: 'night',
      status: 'scheduled'
    },
    {
      id: 'shift-007',
      staffId: 'staff-007',
      staffName: 'Rebecca Moore',
      staffRole: 'receptionist',
      department: 'administration',
      date: '2023-06-18',
      startTime: '08:00',
      endTime: '16:00',
      type: 'morning',
      status: 'scheduled'
    },
    {
      id: 'shift-008',
      staffId: 'staff-001',
      staffName: 'Dr. Jane Smith',
      staffRole: 'doctor',
      department: 'cardiology',
      date: '2023-06-19',
      startTime: '08:00',
      endTime: '16:00',
      type: 'morning',
      status: 'scheduled'
    },
    {
      id: 'shift-009',
      staffId: 'staff-004',
      staffName: 'Nurse Robert Johnson',
      staffRole: 'nurse',
      department: 'cardiology',
      date: '2023-06-19',
      startTime: '07:00',
      endTime: '15:00',
      type: 'morning',
      status: 'scheduled'
    },
    {
      id: 'shift-010',
      staffId: 'staff-008',
      staffName: 'James Wilson',
      staffRole: 'technician',
      department: 'radiology',
      date: '2023-06-18',
      startTime: '10:00',
      endTime: '18:00',
      type: 'morning',
      status: 'pending-approval'
    }
  ];
  
  // Get week dates
  const getWeekDates = (): { date: string; day: string; }[] => {
    const selectedDateObj = new Date(selectedDate);
    const day = selectedDateObj.getDay();
    const diff = selectedDateObj.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    
    const monday = new Date(selectedDateObj.setDate(diff));
    const weekDates = [];
    
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(monday);
      currentDate.setDate(monday.getDate() + i);
      
      weekDates.push({
        date: currentDate.toISOString().split('T')[0],
        day: currentDate.toLocaleDateString('en-US', { weekday: 'short' })
      });
    }
    
    return weekDates;
  };
  
  const weekDates = getWeekDates();
  
  // Filter shifts based on selections
  const filterShifts = (date: string): Shift[] => {
    return shifts.filter(shift => {
      const matchesDate = shift.date === date;
      const matchesDepartment = selectedDepartment === 'all' || shift.department === selectedDepartment;
      const matchesRole = selectedRole === 'all' || shift.staffRole === selectedRole;
      
      return matchesDate && matchesDepartment && matchesRole;
    });
  };
  
  // Get shifts for a specific staff member on a specific date
  const getStaffShift = (staffId: string, date: string): Shift | undefined => {
    return shifts.find(shift => shift.staffId === staffId && shift.date === date);
  };
  
  // Filter staff based on role and department
  const filteredStaff = staffMembers.filter(staff => {
    const matchesDepartment = selectedDepartment === 'all' || staff.department === selectedDepartment;
    const matchesRole = selectedRole === 'all' || staff.role === selectedRole;
    
    return matchesDepartment && matchesRole;
  });
  
  // Handle approve shift request
  const handleApproveShift = (shiftId: string) => {
    toast({
      title: "Shift Approved",
      description: "The shift request has been approved.",
    });
  };
  
  // Handle reject shift request
  const handleRejectShift = (shiftId: string) => {
    toast({
      title: "Shift Rejected",
      description: "The shift request has been rejected.",
    });
  };
  
  // Function to get shift background color
  const getShiftBackground = (type: ShiftType) => {
    switch (type) {
      case 'morning':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'afternoon':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'night':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'on-call':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Staff Scheduling</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            View Calendar
          </Button>
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add Shift
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <CardTitle>Staff Schedule</CardTitle>
              <CardDescription>Manage staff shifts and schedules</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-3.5 w-3.5" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <RefreshCw className="h-3.5 w-3.5" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-1.5 block">Department</label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
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
              <div className="flex-1">
                <label className="text-sm font-medium mb-1.5 block">Staff Role</label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium mb-1.5 block">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="week">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="week">Week View</TabsTrigger>
              <TabsTrigger value="staff">Staff View</TabsTrigger>
              <TabsTrigger value="requests">Shift Requests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="week" className="space-y-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[150px]">Staff Member</TableHead>
                      {weekDates.map(date => (
                        <TableHead key={date.date} className="min-w-[130px]">
                          <div className="font-medium">{date.day}</div>
                          <div className="text-xs font-normal text-muted-foreground">
                            {new Date(date.date).toLocaleDateString()}
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStaff.map(staff => (
                      <TableRow key={staff.id}>
                        <TableCell className="font-medium">
                          <div>
                            <p>{staff.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">{staff.role}</p>
                          </div>
                        </TableCell>
                        {weekDates.map(date => {
                          const shift = getStaffShift(staff.id, date.date);
                          return (
                            <TableCell key={date.date}>
                              {shift ? (
                                <div className={`p-2 rounded-md border text-xs ${getShiftBackground(shift.type)}`}>
                                  <p className="font-medium capitalize">{shift.type} Shift</p>
                                  <p>{shift.startTime} - {shift.endTime}</p>
                                  {shift.status === 'pending-approval' && (
                                    <Badge variant="outline" className="mt-1 text-amber-500 border-amber-200 bg-amber-50">
                                      Pending
                                    </Badge>
                                  )}
                                </div>
                              ) : (
                                <Button variant="ghost" size="sm" className="text-xs w-full">
                                  + Add Shift
                                </Button>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="staff" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStaff.map(staff => (
                  <Card key={staff.id} className="border">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{staff.name}</CardTitle>
                        <Badge
                          className="capitalize"
                          variant="outline"
                        >
                          {staff.role}
                        </Badge>
                      </div>
                      <CardDescription>Department: {staff.department}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm font-medium">Scheduled Shifts:</p>
                        {shifts.filter(shift => shift.staffId === staff.id).length > 0 ? (
                          shifts
                            .filter(shift => shift.staffId === staff.id)
                            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                            .map(shift => (
                              <div key={shift.id} className={`p-2 rounded-md border text-xs ${getShiftBackground(shift.type)}`}>
                                <div className="flex justify-between mb-1">
                                  <p className="font-medium capitalize">{shift.type} Shift</p>
                                  <p>{new Date(shift.date).toLocaleDateString()}</p>
                                </div>
                                <p className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {shift.startTime} - {shift.endTime}
                                </p>
                              </div>
                            ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No shifts scheduled</p>
                        )}
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm" className="w-full text-xs">
                          View Full Schedule
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="requests" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Shift Requests</CardTitle>
                  <CardDescription>Review and approve shift requests</CardDescription>
                </CardHeader>
                <CardContent>
                  {shifts.filter(shift => shift.status === 'pending-approval').length > 0 ? (
                    <div className="space-y-4">
                      {shifts
                        .filter(shift => shift.status === 'pending-approval')
                        .map(shift => (
                          <div key={shift.id} className="border rounded-md p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <User className="h-5 w-5 text-primary" />
                                  <h3 className="font-medium">{shift.staffName}</h3>
                                </div>
                                <p className="text-sm text-muted-foreground capitalize">{shift.staffRole} - {shift.department}</p>
                                <div className="mt-2 flex items-center gap-2 text-sm">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span>{new Date(shift.date).toLocaleDateString()}</span>
                                  <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                                  <span>{shift.startTime} - {shift.endTime}</span>
                                </div>
                                <Badge className="mt-2 capitalize">{shift.type} Shift</Badge>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                  onClick={() => handleRejectShift(shift.id)}
                                >
                                  Reject
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleApproveShift(shift.id)}
                                >
                                  Approve
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="font-medium">No Pending Shift Requests</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        All shift requests have been processed
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffScheduling;
