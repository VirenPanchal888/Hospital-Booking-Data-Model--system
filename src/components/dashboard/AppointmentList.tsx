
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Clock, Calendar } from 'lucide-react';
import { UserRole } from '@/contexts/AuthContext';

export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'in-progress';

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
  onStatusChange: (id: string, newStatus: AppointmentStatus) => void;
  userRole?: UserRole;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ 
  appointments, 
  onStatusChange,
  userRole = 'patient'
}) => {
  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Scheduled</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">In Progress</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: AppointmentStatus) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <X className="h-4 w-4 text-red-500" />;
      case 'in-progress':
        return <Calendar className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };
  
  // Render action buttons based on user role and appointment status
  const renderActions = (appointment: Appointment) => {
    if (userRole === 'patient') {
      if (appointment.status === 'scheduled') {
        return (
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-500 border-red-200 hover:bg-red-50"
              onClick={() => onStatusChange(appointment.id, 'cancelled')}
            >
              Cancel
            </Button>
          </div>
        );
      }
      return null;
    }
    
    if (userRole === 'doctor' || userRole === 'nurse' || userRole === 'admin') {
      if (appointment.status === 'scheduled') {
        return (
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-yellow-500 border-yellow-200 hover:bg-yellow-50"
              onClick={() => onStatusChange(appointment.id, 'in-progress')}
            >
              Start
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-500 border-red-200 hover:bg-red-50"
              onClick={() => onStatusChange(appointment.id, 'cancelled')}
            >
              Cancel
            </Button>
          </div>
        );
      } else if (appointment.status === 'in-progress') {
        return (
          <Button 
            variant="outline" 
            size="sm" 
            className="text-green-500 border-green-200 hover:bg-green-50"
            onClick={() => onStatusChange(appointment.id, 'completed')}
          >
            Complete
          </Button>
        );
      }
    }
    
    return null;
  };
  
  return (
    <div className="space-y-4">
      {appointments.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No appointments found
        </div>
      ) : (
        appointments.map((appointment) => (
          <div 
            key={appointment.id} 
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(appointment.status)}
              </div>
              <div>
                <div className="font-medium">{appointment.patientName}</div>
                <div className="text-sm text-muted-foreground">
                  {appointment.date} at {appointment.time}
                </div>
                <div className="text-sm text-muted-foreground">
                  {appointment.type}
                </div>
                <div className="mt-2 sm:hidden">
                  {getStatusBadge(appointment.status)}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-4 sm:mt-0">
              <div className="hidden sm:block">
                {getStatusBadge(appointment.status)}
              </div>
              {renderActions(appointment)}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export { AppointmentList };
export default AppointmentList;
