
import React from 'react';
import { 
  Activity, 
  CalendarClock, 
  Clock,
  DollarSign, 
  HeartPulse, 
  Plus, 
  Stethoscope, 
  Users 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatsCard from '@/components/dashboard/StatsCard';
import AppointmentList from '@/components/dashboard/AppointmentList';
import RecentPatients from '@/components/dashboard/RecentPatients';
import ActivityChart from '@/components/dashboard/ActivityChart';

const Dashboard = () => {
  // Sample data for dashboard stats
  const stats = [
    {
      title: "Total Patients",
      value: "1,284",
      icon: <Users className="h-5 w-5" />,
      trend: { value: 12.5, isPositive: true },
      description: "Active patient records",
    },
    {
      title: "Total Appointments",
      value: "328",
      icon: <CalendarClock className="h-5 w-5" />,
      trend: { value: 8.2, isPositive: true },
      description: "This month",
    },
    {
      title: "Available Doctors",
      value: "24",
      icon: <Stethoscope className="h-5 w-5" />,
      trend: { value: 2, isPositive: true },
      description: "On duty today",
    },
    {
      title: "Revenue",
      value: "$48,294",
      icon: <DollarSign className="h-5 w-5" />,
      trend: { value: 5.7, isPositive: true },
      description: "This month",
    },
  ];
  
  // Sample data for today's appointments
  const appointments = [
    {
      id: "1",
      patientName: "Olivia Wilson",
      date: "Today",
      time: "09:00 AM",
      status: "scheduled",
      type: "General Checkup",
    },
    {
      id: "2",
      patientName: "James Smith",
      date: "Today",
      time: "10:30 AM",
      status: "completed",
      type: "Follow-up",
    },
    {
      id: "3",
      patientName: "Emma Johnson",
      date: "Today",
      time: "11:45 AM",
      status: "scheduled",
      type: "Consultation",
    },
    {
      id: "4",
      patientName: "William Brown",
      date: "Today",
      time: "01:15 PM",
      status: "no-show",
      type: "Checkup",
    },
    {
      id: "5",
      patientName: "Sophia Davis",
      date: "Today",
      time: "03:00 PM",
      status: "scheduled",
      type: "Cardiology",
    },
  ] as const;
  
  // Sample data for recent patients
  const patients = [
    {
      id: "1",
      name: "Olivia Wilson",
      age: 34,
      gender: "female",
      condition: "Hypertension",
      lastVisit: "Today, 09:00 AM",
    },
    {
      id: "2",
      name: "James Smith",
      age: 42,
      gender: "male",
      condition: "Diabetes Type 2",
      lastVisit: "Today, 10:30 AM",
    },
    {
      id: "3",
      name: "Emma Johnson",
      age: 28,
      gender: "female",
      condition: "Pregnancy",
      lastVisit: "Today, 11:45 AM",
    },
    {
      id: "4",
      name: "William Brown",
      age: 56,
      gender: "male",
      condition: "Arthritis",
      lastVisit: "Yesterday, 02:15 PM",
    },
    {
      id: "5",
      name: "Sophia Davis",
      age: 45,
      gender: "female",
      condition: "Migraine",
      lastVisit: "Yesterday, 04:30 PM",
    },
  ];
  
  // Sample data for activity chart
  const activityData = [
    { name: "Jan", patients: 65, appointments: 35 },
    { name: "Feb", patients: 59, appointments: 42 },
    { name: "Mar", patients: 80, appointments: 68 },
    { name: "Apr", patients: 81, appointments: 64 },
    { name: "May", patients: 56, appointments: 47 },
    { name: "Jun", patients: 55, appointments: 45 },
    { name: "Jul", patients: 40, appointments: 32 },
    { name: "Aug", patients: 70, appointments: 55 },
    { name: "Sep", patients: 90, appointments: 76 },
    { name: "Oct", patients: 110, appointments: 92 },
    { name: "Nov", patients: 95, appointments: 84 },
    { name: "Dec", patients: 85, appointments: 72 },
  ];
  
  return (
    <div className="animate-slide-in-up">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back. Here's an overview of your hospital today.
          </p>
        </div>
        
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button size="sm" variant="outline" className="gap-1">
            <Clock className="h-4 w-4" />
            <span>Activity Log</span>
          </Button>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            <span>New Appointment</span>
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            description={stat.description}
          />
        ))}
      </div>
      
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ActivityChart data={activityData} />
        
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Hospital Status</h2>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="text-sm font-medium text-muted-foreground">Beds Available</div>
              <div className="mt-1 text-2xl font-semibold">24/120</div>
              <div className="mt-1 text-xs text-muted-foreground">20% occupancy rate</div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-[20%] rounded-full bg-primary" />
              </div>
            </div>
            
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="text-sm font-medium text-muted-foreground">Emergency Room</div>
              <div className="mt-1 text-2xl font-semibold">Low Wait</div>
              <div className="mt-1 text-xs text-muted-foreground">Average wait: 12 minutes</div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-[30%] rounded-full bg-green-500" />
              </div>
            </div>
            
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="text-sm font-medium text-muted-foreground">Surgeries Today</div>
              <div className="mt-1 text-2xl font-semibold">8</div>
              <div className="mt-1 text-xs text-muted-foreground">2 emergency, 6 scheduled</div>
              <div className="mt-2 flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-xs">In progress: 1</span>
              </div>
            </div>
            
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="text-sm font-medium text-muted-foreground">Staff on Duty</div>
              <div className="mt-1 text-2xl font-semibold">42</div>
              <div className="mt-1 text-xs text-muted-foreground">Doctors: 12, Nurses: 30</div>
              <div className="mt-2 flex items-center gap-1">
                <Activity className="h-3 w-3 text-primary" />
                <span className="text-xs">Shift change: 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <AppointmentList appointments={appointments} />
        <RecentPatients patients={patients} />
      </div>
    </div>
  );
};

export default Dashboard;
