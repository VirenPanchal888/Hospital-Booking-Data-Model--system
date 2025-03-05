
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, addDays, addMonths, isBefore, isAfter } from 'date-fns';
import { CalendarIcon, Clock, Search, Video, Phone, User, AlertCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import DoctorSearch from '@/components/doctors/DoctorSearch';
import AppointmentTypeSelector, { AppointmentType } from '@/components/appointments/AppointmentTypeSelector';
import VideoPreview from '@/components/appointments/VideoPreview';

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

const consultationTypes: AppointmentType[] = [
  { 
    id: 'video', 
    name: 'Video Consultation', 
    icon: 'video',
    description: 'Meet with your doctor via video call'
  },
  { 
    id: 'phone', 
    name: 'Phone Consultation', 
    icon: 'phone',
    description: 'Talk to your doctor over the phone'
  },
  { 
    id: 'in-person', 
    name: 'In-Person Visit', 
    icon: 'in-person',
    description: 'Visit the doctor at the clinic'
  },
  { 
    id: 'regular', 
    name: 'Regular Appointment', 
    icon: 'regular',
    description: 'Standard appointment at the clinic'
  }
];

const patients = [
  { id: 'patient1', name: 'John Wilson', patientId: 'P12345' },
  { id: 'patient2', name: 'Emma Thompson', patientId: 'P12346' },
  { id: 'patient3', name: 'Michael Johnson', patientId: 'P12347' },
  { id: 'patient4', name: 'Sophia Davis', patientId: 'P12348' },
  { id: 'patient5', name: 'William Taylor', patientId: 'P12349' },
];

const generateTimeSlots = (doctorId: string, selectedDate: Date | undefined) => {
  const defaultSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM'
  ];
  
  if (doctorId === '1' && selectedDate && selectedDate.getDay() === 1) {
    return defaultSlots.filter((_, index) => index % 3 !== 0);
  } else if (doctorId === '3') {
    return [
      '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', 
      '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM'
    ];
  }
  
  return defaultSlots;
};

const NewAppointment: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [insuranceInfo, setInsuranceInfo] = useState('');
  const [insuranceType, setInsuranceType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [consultationType, setConsultationType] = useState('in-person');
  const [showVideoPreview, setShowVideoPreview] = useState(false);
  
  const isDoctorRole = user?.role === 'doctor';
  const isPatientRole = user?.role === 'patient';
  const isAdminRole = user?.role === 'admin';

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      const slots = generateTimeSlots(selectedDoctor, selectedDate);
      setAvailableTimeSlots(slots);
      setSelectedTime('');
    }
  }, [selectedDoctor, selectedDate]);
  
  const isFormValid = () => {
    if (isDoctorRole) {
      return selectedPatient && selectedType && selectedDate && selectedTime && reason && consultationType;
    } else {
      return selectedDoctor && selectedType && selectedDate && selectedTime && reason && consultationType;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: "Appointment Scheduled",
        description: `Your ${consultationTypes.find(t => t.id === consultationType)?.name} has been scheduled for ${selectedDate ? format(selectedDate, 'PPP') : ''} at ${selectedTime}.`,
      });
      
      setIsSubmitting(false);
      navigate('/appointments');
    }, 1000);
  };

  const handleDoctorSelect = (doctor: { id: string; name: string; specialty: string }) => {
    setSelectedDoctor(doctor.id);
  };
  
  const handleConsultationTypeChange = (typeId: string) => {
    setConsultationType(typeId);
    
    // Show video preview if video consultation is selected
    if (typeId === 'video') {
      // Slight delay before showing the preview to allow the UI to update
      setTimeout(() => {
        setShowVideoPreview(true);
      }, 300);
    } else {
      setShowVideoPreview(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
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
            <CardContent className="space-y-5">
              {isDoctorRole ? (
                <div className="space-y-2">
                  <Label htmlFor="patient">Patient</Label>
                  <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                    <SelectTrigger id="patient" className="w-full bg-background transition-all duration-300 border border-input">
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent 
                      className="max-h-[300px] overflow-y-auto border border-border bg-background shadow-lg animate-in fade-in-80 zoom-in-95 duration-500 z-[100]"
                      position="popper"
                      sideOffset={5}
                    >
                      {patients.map(patient => (
                        <SelectItem key={patient.id} value={patient.id} className="transition-all duration-300 hover:translate-x-1 py-2.5">
                          {patient.name} (ID: {patient.patientId})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="doctor">Doctor</Label>
                  <DoctorSearch
                    doctors={doctors}
                    onSelectDoctor={handleDoctorSelect}
                    placeholder="Search for a doctor by name or specialty"
                  />
                  
                  <div className="mt-2">
                    <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                      <SelectTrigger id="doctor" className="w-full bg-background transition-all duration-300 border border-input">
                        <SelectValue placeholder="Or select from the list" />
                      </SelectTrigger>
                      <SelectContent 
                        className="max-h-[300px] overflow-y-auto border border-border bg-background shadow-lg animate-in fade-in-80 zoom-in-95 duration-500 z-[100]"
                        position="popper"
                        sideOffset={5}
                      >
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.id} className="transition-all duration-300 hover:translate-x-1 py-2.5">
                            {doctor.name} ({doctor.specialty})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="type">Appointment Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger id="type" className="w-full bg-background transition-all duration-300 border border-input">
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                  <SelectContent 
                    className="max-h-[300px] overflow-y-auto border border-border bg-background shadow-lg animate-in fade-in-80 zoom-in-95 duration-500 z-[100]"
                    position="popper"
                    sideOffset={5}
                  >
                    {appointmentTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id} className="transition-all duration-300 hover:translate-x-1 py-2.5">
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label>Consultation Method</Label>
                <AppointmentTypeSelector 
                  types={consultationTypes}
                  selectedType={consultationType}
                  onSelect={handleConsultationTypeChange}
                />
                
                {consultationType === 'video' && (
                  <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700 flex items-start gap-2 mt-2">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Video consultation requires camera and microphone access</p>
                      <p className="mt-1">Make sure your device has a working camera and microphone before the appointment.</p>
                      <Button 
                        type="button"
                        variant="outline" 
                        size="sm" 
                        className="mt-2 bg-white hover:bg-white"
                        onClick={() => setShowVideoPreview(true)}
                      >
                        <Video className="h-4 w-4 mr-1" />
                        Test Camera
                      </Button>
                    </div>
                  </div>
                )}
                
                {consultationType === 'phone' && (
                  <div className="bg-amber-50 p-3 rounded-md text-sm text-amber-700 flex items-start gap-2 mt-2">
                    <Phone className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Phone consultation details</p>
                      <p className="mt-1">The doctor will call you at your registered phone number at the scheduled time.</p>
                    </div>
                  </div>
                )}
                
                {showVideoPreview && (
                  <div className="mt-3">
                    <VideoPreview onClose={() => setShowVideoPreview(false)} />
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal transition-all duration-300",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-background shadow-lg animate-in fade-in-80 zoom-in-95 duration-500 z-[100]">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => setSelectedDate(date)}
                        initialFocus
                        disabled={(date) => 
                          isBefore(date, addDays(new Date(), -1)) || 
                          isAfter(date, addMonths(new Date(), 3))
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
                          "w-full justify-start text-left font-normal transition-all duration-300",
                          !selectedTime && "text-muted-foreground"
                        )}
                        disabled={!selectedDoctor || !selectedDate}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {selectedTime || "Select time"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 bg-background shadow-lg animate-in fade-in-80 zoom-in-95 duration-500 z-[100]">
                      <div className="grid gap-1">
                        <Label className="mb-2">Available Slots</Label>
                        {!selectedDoctor || !selectedDate ? (
                          <p className="text-sm text-muted-foreground">
                            Please select a doctor and date first
                          </p>
                        ) : availableTimeSlots.length === 0 ? (
                          <p className="text-sm text-muted-foreground">
                            No available slots for this day
                          </p>
                        ) : (
                          <div className="h-64 overflow-y-auto pr-2">
                            <RadioGroup 
                              value={selectedTime}
                              onValueChange={setSelectedTime}
                            >
                              <div className="grid gap-2">
                                {availableTimeSlots.map((slot) => (
                                  <div key={slot} className="flex items-center transition-all duration-300 hover:bg-muted hover:translate-x-1 rounded-md p-1.5">
                                    <RadioGroupItem value={slot} id={slot} />
                                    <Label htmlFor={slot} className="ml-2">{slot}</Label>
                                  </div>
                                ))}
                              </div>
                            </RadioGroup>
                          </div>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Textarea 
                  id="reason" 
                  placeholder="Please describe your symptoms or reason for the appointment" 
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="min-h-[120px] transition-all duration-300"
                />
              </div>
            </CardContent>
          </Card>
          
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
                  <SelectTrigger id="insuranceType" className="w-full bg-background transition-all duration-300 border border-input">
                    <SelectValue placeholder="Select insurance provider" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] overflow-y-auto border border-border bg-background shadow-lg animate-in fade-in-80 zoom-in-95 duration-500 z-[100]">
                    <SelectItem value="bluecross" className="transition-all duration-300 hover:translate-x-1 py-2.5">Blue Cross Blue Shield</SelectItem>
                    <SelectItem value="aetna" className="transition-all duration-300 hover:translate-x-1 py-2.5">Aetna</SelectItem>
                    <SelectItem value="cigna" className="transition-all duration-300 hover:translate-x-1 py-2.5">Cigna</SelectItem>
                    <SelectItem value="united" className="transition-all duration-300 hover:translate-x-1 py-2.5">United Healthcare</SelectItem>
                    <SelectItem value="medicare" className="transition-all duration-300 hover:translate-x-1 py-2.5">Medicare</SelectItem>
                    <SelectItem value="medicaid" className="transition-all duration-300 hover:translate-x-1 py-2.5">Medicaid</SelectItem>
                    <SelectItem value="none" className="transition-all duration-300 hover:translate-x-1 py-2.5">None/Self-Pay</SelectItem>
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
                  className="transition-all duration-300"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => navigate('/appointments')} 
                className="transition-all duration-300 hover:bg-muted">
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!isFormValid() || isSubmitting}
                className="transition-all duration-300 hover:scale-105 relative"
              >
                {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
                {isSubmitting && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="animate-pulse-soft">Processing...</span>
                  </span>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default NewAppointment;
