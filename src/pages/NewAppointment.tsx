
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

// Sample data
const appointmentTypes = [
  { id: '1', name: 'General Checkup' },
  { id: '2', name: 'Follow-up' },
  { id: '3', name: 'Specialist Consultation' },
  { id: '4', name: 'Emergency' },
  { id: '5', name: 'Procedure' },
];

const doctors = [
  { id: '1', name: 'Dr. Jane Smith', specialty: 'Cardiology' },
  { id: '2', name: 'Dr. John Doe', specialty: 'Orthopedics' },
  { id: '3', name: 'Dr. Emily Chen', specialty: 'Neurology' },
  { id: '4', name: 'Dr. Michael Brown', specialty: 'Pediatrics' },
  { id: '5', name: 'Dr. Sarah Johnson', specialty: 'Oncology' },
  { id: '6', name: 'Dr. Robert Lee', specialty: 'Dermatology' },
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM'
];

const NewAppointment: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form state
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [insuranceInfo, setInsuranceInfo] = useState('');
  const [insuranceType, setInsuranceType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Check if all required fields are filled
  const isFormValid = selectedDoctor && selectedType && selectedDate && selectedTime && reason;
  
  // For doctor selection, we show different content based on user role
  const isDoctorRole = user?.role === 'doctor';
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Appointment Scheduled",
        description: `Your appointment has been scheduled for ${format(selectedDate!, 'PPP')} at ${selectedTime}.`,
      });
      
      setIsSubmitting(false);
      navigate('/appointments');
    }, 1500);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Schedule New Appointment</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>
                Fill in the details for your new appointment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Doctor Selection */}
              {isDoctorRole ? (
                <div className="space-y-2">
                  <Label htmlFor="patient">Patient</Label>
                  <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                    <SelectTrigger id="patient">
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient1">John Wilson</SelectItem>
                      <SelectItem value="patient2">Emma Thompson</SelectItem>
                      <SelectItem value="patient3">Michael Johnson</SelectItem>
                      <SelectItem value="patient4">Sophia Davis</SelectItem>
                      <SelectItem value="patient5">William Taylor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="doctor">Doctor</Label>
                  <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                    <SelectTrigger id="doctor">
                      <SelectValue placeholder="Select doctor" />
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
              )}
              
              {/* Appointment Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Appointment Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger id="type">
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
              
              {/* Date & Time Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => setSelectedDate(date)}
                        initialFocus
                        disabled={(date) => 
                          date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 3))
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedTime && "text-muted-foreground"
                        )}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {selectedTime || "Select time"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48">
                      <div className="grid gap-1">
                        <Label className="mb-2">Available Slots</Label>
                        <div className="h-64 overflow-y-auto pr-2">
                          <RadioGroup 
                            value={selectedTime}
                            onValueChange={setSelectedTime}
                          >
                            <div className="grid gap-2">
                              {timeSlots.map((slot) => (
                                <div key={slot} className="flex items-center">
                                  <RadioGroupItem value={slot} id={slot} />
                                  <Label htmlFor={slot} className="ml-2">{slot}</Label>
                                </div>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              {/* Reason */}
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Textarea 
                  id="reason" 
                  placeholder="Please describe your symptoms or reason for the appointment" 
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Insurance Information */}
          <Card>
            <CardHeader>
              <CardTitle>Insurance Information</CardTitle>
              <CardDescription>
                Optional: Add your insurance details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="insuranceType">Insurance Provider</Label>
                <Select value={insuranceType} onValueChange={setInsuranceType}>
                  <SelectTrigger id="insuranceType">
                    <SelectValue placeholder="Select insurance provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bluecross">Blue Cross Blue Shield</SelectItem>
                    <SelectItem value="aetna">Aetna</SelectItem>
                    <SelectItem value="cigna">Cigna</SelectItem>
                    <SelectItem value="united">United Healthcare</SelectItem>
                    <SelectItem value="medicare">Medicare</SelectItem>
                    <SelectItem value="medicaid">Medicaid</SelectItem>
                    <SelectItem value="none">None/Self-Pay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="insuranceInfo">Policy Number</Label>
                <Input 
                  id="insuranceInfo" 
                  placeholder="Insurance policy number" 
                  value={insuranceInfo}
                  onChange={(e) => setInsuranceInfo(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => navigate('/appointments')}>
                Cancel
              </Button>
              <Button type="submit" disabled={!isFormValid || isSubmitting}>
                {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default NewAppointment;
