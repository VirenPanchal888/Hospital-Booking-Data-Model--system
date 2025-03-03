
import React from 'react';
import { Calendar, Clock, MoreHorizontal, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';

export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show';
export type UserRole = 'patient' | 'doctor' | 'admin' | undefined;

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  type: string;
}

interface AppointmentListProps {
  appointments: Appointment[];
  title?: string;
  userRole?: UserRole;
  onStatusChange?: (id: string, newStatus: AppointmentStatus) => void;
}

const getStatusBadge = (status: AppointmentStatus) => {
  switch (status) {
    case 'scheduled':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Scheduled</Badge>;
    case 'completed':
      return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Completed</Badge>;
    case 'cancelled':
      return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">Cancelled</Badge>;
    case 'no-show':
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">No Show</Badge>;
    default:
      return null;
  }
};

const AppointmentList: React.FC<AppointmentListProps> = ({ 
  appointments,
  title = "Today's Appointments",
  userRole,
  onStatusChange
}) => {
  const { toast } = useToast();
  
  const handleStatusChange = (id: string, newStatus: AppointmentStatus) => {
    if (onStatusChange) {
      onStatusChange(id, newStatus);
      
      // Show toast notification
      const statusMessages = {
        completed: "Appointment marked as completed",
        cancelled: "Appointment has been cancelled",
        "no-show": "Patient marked as no-show"
      };
      
      toast({
        title: statusMessages[newStatus] || "Appointment status updated",
        description: `Appointment ID: ${id}`,
      });
    }
  };

  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="font-semibold">{title}</h2>
        <Button variant="outline" size="sm">View All</Button>
      </div>
      
      <div className="divide-y">
        {appointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <Calendar className="mb-2 h-10 w-10 text-muted-foreground/60" />
            <h3 className="text-lg font-medium">No appointments</h3>
            <p className="text-sm text-muted-foreground">
              There are no appointments scheduled for today.
            </p>
          </div>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-4 transition-colors hover:bg-muted/40">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{appointment.patientName}</h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {appointment.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {appointment.time}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {getStatusBadge(appointment.status)}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white">
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => toast({
                        title: "Viewing details",
                        description: `Appointment for ${appointment.patientName}`
                      })}
                    >
                      View Details
                    </DropdownMenuItem>
                    
                    {(userRole === 'doctor' || userRole === 'admin') && (
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => toast({
                          title: "Edit appointment",
                          description: "Opening appointment editor"
                        })}
                      >
                        Edit Appointment
                      </DropdownMenuItem>
                    )}
                    
                    {userRole === 'doctor' && appointment.status === 'scheduled' && (
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => handleStatusChange(appointment.id, 'completed')}
                      >
                        Mark as Completed
                      </DropdownMenuItem>
                    )}
                    
                    {userRole === 'doctor' && appointment.status === 'scheduled' && (
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => handleStatusChange(appointment.id, 'no-show')}
                      >
                        Mark as No-Show
                      </DropdownMenuItem>
                    )}
                    
                    {appointment.status === 'scheduled' && (
                      <DropdownMenuItem 
                        className="cursor-pointer text-red-600"
                        onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                      >
                        Cancel
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentList;
