
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
import { CalendarIcon, Clock, Video, Phone, MessageSquare, Check, ChevronRight } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

// Sample data
const appointmentTypes = [
  { id: '1', name: 'General Checkup' },
  { id: '2', name: 'Follow-up' },
  { id: '3', name: 'Specialist Consultation' },
  { id: '4', name: 'Emergency' },
  { id: '5', name: 'Procedure' },
];

const doctors = [
  { id: '1', name: 'Dr. Jane Smith', specialty: 'Cardiology', supportedModes: ['video', 'voice', 'chat', 'in-person'] },
  { id: '2', name: 'Dr. John Doe', specialty: 'Orthopedics', supportedModes: ['in-person', 'voice'] },
  { id: '3', name: 'Dr. Emily Chen', specialty: 'Neurology', supportedModes: ['video', 'voice', 'chat', 'in-person'] },
  { id: '4', name: 'Dr. Michael Brown', specialty: 'Pediatrics', supportedModes: ['in-person'] },
  { id: '5', name: 'Dr. Sarah Johnson', specialty: 'Oncology', supportedModes: ['video', 'chat', 'in-person'] },
  { id: '6', name: 'Dr. Robert Lee', specialty: 'Dermatology', supportedModes: ['video', 'voice', 'in-person'] },
];

const patients = [
  { id: 'patient1', name: 'John Wilson', patientId: 'P12345' },
  { id: 'patient2', name: 'Emma Thompson', patientId: 'P12346' },
  { id: 'patient3', name: 'Michael Johnson', patientId: 'P12347' },
  { id: 'patient4', name: 'Sophia Davis', patientId: 'P12348' },
  { id: 'patient5', name: 'William Taylor', patientId: 'P12349' },
];

// Communication mode icons
const communicationModeIcons = {
  'in-person': <Check className="h-4 w-4" />,
  'video': <Video className="h-4 w-4" />,
  'voice': <Phone className="h-4 w-4" />,
  'chat': <MessageSquare className="h-4 w-4" />
};

// Generate time slots based on doctor availability
const generateTimeSlots = (doctorId: string, selectedDate: Date | undefined, mode: string) => {
  // Default time slots
  const defaultSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM'
  ];
  
  // In a real app, we would check doctor availability based on mode
  const doctor = doctors.find(d => d.id === doctorId);
  if (!doctor) return [];
  
  // Check if doctor supports this mode
  if (!doctor.supportedModes.includes(mode)) return [];
  
  // For virtual modes, offer more slots
  if (mode === 'chat') {
    return [
      ...defaultSlots,
      '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM'
    ];
  } else if (mode === 'video' || mode === 'voice') {
    // For video/voice, simulate some unavailable slots
    return defaultSlots.filter((_, index) => index % 2 !== 0);
  }
  
  // For in-person visits
  if (doctorId === '1' && selectedDate && selectedDate.getDay() === 1) {
    // On Mondays, Dr. Jane Smith has fewer slots available
    return defaultSlots.filter((_, index) => index % 3 !== 0);
  } else if (doctorId === '3') {
    // Dr. Emily Chen has different hours
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
  
  // Form state
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
  const [communicationMode, setCommunicationMode] = useState('in-person');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  
  // Role-based states
  const isDoctorRole = user?.role === 'doctor';
  const isPatientRole = user?.role === 'patient';
  const isAdminRole = user?.role === 'admin';

  // Update doctor based on chosen communication mode
  const filteredDoctors = doctors.filter(doctor => 
    doctor.supportedModes.includes(communicationMode)
  );

  // Update available time slots when doctor, date or mode changes
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      const slots = generateTimeSlots(selectedDoctor, selectedDate, communicationMode);
      setAvailableTimeSlots(slots);
      setSelectedTime(''); // Reset selected time when doctor/date/mode changes
    }
  }, [selectedDoctor, selectedDate, communicationMode]);
  
  // Handle file attachment for chat mode
  const handleFileAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachedFiles(prev => [...prev, ...newFiles]);
      
      toast({
        title: "Files attached",
        description: `${newFiles.length} file(s) attached for your chat consultation.`,
      });
    }
  };
  
  // Check if all required fields are filled
  const isFormValid = () => {
    const commonRequirements = selectedType && selectedDate && selectedTime && reason;
    
    if (isDoctorRole) {
      return selectedPatient && commonRequirements;
    } else {
      return selectedDoctor && commonRequirements;
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
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Appointment Scheduled",
        description: `Your ${communicationMode} appointment has been scheduled for ${selectedDate ? format(selectedDate, 'PPP') : ''} at ${selectedTime}.`,
      });
      
      setIsSubmitting(false);
      navigate('/appointments');
    }, 1000);
  };
  
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold tracking-tight mb-6">Schedule New Appointment</h1>
      </motion.div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Communication Mode</CardTitle>
              <CardDescription>
                Choose how you'd like to consult with the doctor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs 
                defaultValue="in-person" 
                value={communicationMode} 
                onValueChange={setCommunicationMode}
                className="w-full"
              >
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="in-person" className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    In-Person
                  </TabsTrigger>
                  <TabsTrigger value="video" className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Video Call
                  </TabsTrigger>
                  <TabsTrigger value="voice" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Voice Call
                  </TabsTrigger>
                  <TabsTrigger value="chat" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Chat
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="in-person">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-medium mb-2">In-Person Consultation</h3>
                    <p className="text-sm text-muted-foreground">
                      Visit the hospital for a face-to-face appointment with the doctor. 
                      Please arrive 15 minutes before your scheduled time.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="video">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Video Call Consultation</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect with your doctor through a secure video call. You'll need a device with a 
                      camera and microphone. A link will be sent to your email 10 minutes before the appointment.
                    </p>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg text-center">
                        <p className="text-xs font-medium">Recommended for</p>
                        <p className="text-sm mt-1">Follow-up visits, visual examinations</p>
                      </div>
                      <div className="p-3 bg-primary/10 rounded-lg text-center">
                        <p className="text-xs font-medium">Requirements</p>
                        <p className="text-sm mt-1">Camera, microphone, internet</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="voice">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Voice Call Consultation</h3>
                    <p className="text-sm text-muted-foreground">
                      Speak with your doctor over a phone call. You'll receive a call at your registered 
                      phone number at the scheduled time.
                    </p>
                    
                    <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                      <p className="text-xs font-medium mb-1">Ideal for</p>
                      <p className="text-sm">Quick follow-ups, discussing test results, or when video isn't necessary</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="chat">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Chat Consultation</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Text-based consultation with your doctor. Share images or documents related to your condition.
                    </p>
                    
                    <div className="border-2 border-dashed border-border p-3 rounded-lg">
                      <Label htmlFor="file-upload" className="block text-sm font-medium mb-2">
                        Attach files (optional)
                      </Label>
                      <Input 
                        id="file-upload" 
                        type="file" 
                        multiple
                        className="mb-3"
                        onChange={handleFileAttachment}
                      />
                      
                      {attachedFiles.length > 0 && (
                        <div className="mt-2 space-y-2">
                          <p className="text-xs font-medium">Attached files:</p>
                          {attachedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-background p-2 rounded-md">
                              <p className="text-xs truncate">{file.name}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
                                }}
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>
                Fill in the details for your new appointment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Doctor/Patient Selection based on role */}
              {isDoctorRole ? (
                <div className="space-y-2">
                  <Label htmlFor="patient">Patient</Label>
                  <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                    <SelectTrigger id="patient">
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-900">
                      {patients.map(patient => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name} (ID: {patient.patientId})
                        </SelectItem>
                      ))}
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
                    <SelectContent className="bg-white dark:bg-slate-900">
                      {filteredDoctors.length > 0 ? (
                        filteredDoctors.map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.id}>
                            <div className="flex items-center gap-2">
                              <span>{doctor.name}</span>
                              <span className="text-xs text-muted-foreground">({doctor.specialty})</span>
                            </div>
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-center text-sm text-muted-foreground">
                          No doctors available for {communicationMode} consultations
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  
                  {selectedDoctor && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      <p className="text-xs text-muted-foreground w-full">Available consultation modes:</p>
                      {doctors.find(d => d.id === selectedDoctor)?.supportedModes.map(mode => (
                        <div key={mode} className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full text-xs">
                          {communicationModeIcons[mode as keyof typeof communicationModeIcons]}
                          <span>{mode.charAt(0).toUpperCase() + mode.slice(1)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Appointment Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Appointment Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-900">
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
                    <PopoverContent className="w-auto p-0 bg-white dark:bg-slate-900">
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
                          "w-full justify-start text-left font-normal",
                          !selectedTime && "text-muted-foreground"
                        )}
                        disabled={!selectedDoctor || !selectedDate}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {selectedTime || "Select time"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 bg-white dark:bg-slate-900">
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
                                  <div key={slot} className="flex items-center">
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
                  <SelectContent className="bg-white dark:bg-slate-900">
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
              <Button 
                type="submit" 
                disabled={!isFormValid() || isSubmitting}
                className="transition-all duration-200 hover:scale-105"
              >
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
