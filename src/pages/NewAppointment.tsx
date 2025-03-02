
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, CalendarDays, ChevronLeft, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from 'date-fns';

// Sample data for doctors
const doctors = [
  { id: '1', name: 'Dr. Jane Smith', specialty: 'Cardiology' },
  { id: '2', name: 'Dr. Michael Johnson', specialty: 'Neurology' },
  { id: '3', name: 'Dr. Sarah Williams', specialty: 'Pediatrics' },
  { id: '4', name: 'Dr. Robert Brown', specialty: 'Orthopedics' },
  { id: '5', name: 'Dr. Emily Davis', specialty: 'Dermatology' },
  { id: '6', name: 'Dr. James Wilson', specialty: 'General Medicine' },
];

// Sample data for appointment types
const appointmentTypes = [
  { id: '1', name: 'General Checkup' },
  { id: '2', name: 'Follow-up Visit' },
  { id: '3', name: 'Consultation' },
  { id: '4', name: 'Vaccination' },
  { id: '5', name: 'Medical Test' },
  { id: '6', name: 'Emergency' },
];

// Sample data for time slots
const timeSlots = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
];

const NewAppointment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [selectedTypeId, setSelectedTypeId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!selectedDoctorId || !selectedTypeId || !selectedDate || !selectedTime) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Appointment scheduled successfully",
      });
      setIsSubmitting(false);
      navigate('/appointments');
    }, 1500);
  };

  return (
    <div className="animate-slide-in-up">
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="mb-2 gap-1 pl-0 text-muted-foreground"
          onClick={() => navigate('/appointments')}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Appointments
        </Button>

        <h1 className="text-2xl font-semibold tracking-tight">New Appointment</h1>
        <p className="text-muted-foreground">
          Schedule a new appointment with a doctor.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="col-span-2">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
                <CardDescription>
                  Fill in the details to schedule your appointment.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="doctor" className="text-sm font-medium">
                      Select Doctor
                    </label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Choose a doctor based on specialty</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select 
                    value={selectedDoctorId} 
                    onValueChange={setSelectedDoctorId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.name} ({doctor.specialty})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="type" className="text-sm font-medium">
                    Appointment Type
                  </label>
                  <Select 
                    value={selectedTypeId}
                    onValueChange={setSelectedTypeId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select appointment type" />
                    </SelectTrigger>
                    <SelectContent>
                      {appointmentTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-medium">
                      Date
                    </label>
                    <div className="relative">
                      <Input
                        id="date"
                        placeholder="Select date"
                        value={selectedDate ? format(selectedDate, 'PPP') : ''}
                        readOnly
                        className="pl-9"
                      />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute left-0 top-0 h-full px-3"
                          >
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="time" className="text-sm font-medium">
                      Time
                    </label>
                    <div className="relative">
                      <Select
                        value={selectedTime}
                        onValueChange={setSelectedTime}
                      >
                        <SelectTrigger className="pl-9">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="notes" className="text-sm font-medium">
                    Notes (Optional)
                  </label>
                  <Textarea
                    id="notes"
                    placeholder="Add any additional information for the doctor"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
              <CardFooter className="justify-between border-t p-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/appointments')}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Appointment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border bg-muted/30 p-3">
                <div className="mb-2 text-sm font-medium">Selected Doctor</div>
                {selectedDoctorId ? (
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {doctors.find(d => d.id === selectedDoctorId)?.name.split(' ').map(n => n[0]).join('') || 'DR'}
                    </div>
                    <div>
                      <div>{doctors.find(d => d.id === selectedDoctorId)?.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {doctors.find(d => d.id === selectedDoctorId)?.specialty}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">No doctor selected</div>
                )}
              </div>

              <div className="rounded-lg border bg-muted/30 p-3">
                <div className="mb-2 text-sm font-medium">Appointment Details</div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'No date selected'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {selectedTime || 'No time selected'}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type: </span>
                    {appointmentTypes.find(t => t.id === selectedTypeId)?.name || 'Not selected'}
                  </div>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>All fields marked are required. Please ensure that you arrive 15 minutes before your scheduled appointment time.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewAppointment;
