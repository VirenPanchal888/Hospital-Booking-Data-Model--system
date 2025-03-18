
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, Phone, Mail, Award, BookOpen, Users, Stethoscope } from 'lucide-react';

const DoctorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Mock doctor data - in a real app, this would come from an API
  const doctor = {
    id,
    name: 'Dr. Jane Smith',
    specialty: 'Cardiologist',
    qualification: 'MD, FACC',
    experience: '15 years',
    department: 'Cardiology',
    email: 'jane.smith@hospital.com',
    phone: '+1 (555) 234-5678',
    address: '456 Medical Center Dr, Anytown, AN 12345',
    bio: 'Dr. Jane Smith is a board-certified cardiologist with extensive experience in diagnosing and treating cardiovascular diseases. She specializes in preventive cardiology, heart failure management, and interventional procedures.',
    avatar: '',
    availability: [
      { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
      { day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
      { day: 'Friday', hours: '9:00 AM - 1:00 PM' },
    ],
    education: [
      { degree: 'Doctor of Medicine', institution: 'Johns Hopkins University', year: '2005' },
      { degree: 'Cardiology Fellowship', institution: 'Mayo Clinic', year: '2010' },
      { degree: 'Interventional Cardiology Fellowship', institution: 'Cleveland Clinic', year: '2012' },
    ],
    certifications: [
      { name: 'Board Certification in Cardiovascular Disease', year: '2010' },
      { name: 'Fellow of the American College of Cardiology (FACC)', year: '2015' },
    ],
    languages: ['English', 'Spanish'],
    ratings: 4.9,
    reviews: 125
  };
  
  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Doctor Not Found</h2>
          <p className="text-muted-foreground mb-4">The doctor you're looking for does not exist or has been removed.</p>
          <Button onClick={() => navigate('/doctors')}>Back to Doctors</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold tracking-tight">Doctor Profile</h1>
        <Button onClick={() => navigate('/doctors')}>Back to Doctors</Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={doctor.avatar || ''} alt={doctor.name} />
                <AvatarFallback className="text-3xl">{doctor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold">{doctor.name}</h2>
                <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                  <Badge variant="secondary">{doctor.specialty}</Badge>
                  <Badge variant="outline">{doctor.experience} Experience</Badge>
                </div>
              </div>
              
              <Button className="w-full md:w-auto mt-4" onClick={() => navigate('/new-appointment')}>
                Book Appointment
              </Button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="font-semibold text-lg">About</h3>
                <p className="text-muted-foreground mt-1">{doctor.bio}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Qualification</p>
                    <p className="font-medium">{doctor.qualification}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Stethoscope className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Department</p>
                    <p className="font-medium">{doctor.department}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{doctor.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{doctor.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{doctor.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Languages</p>
                    <p className="font-medium">{doctor.languages.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="schedule">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="education">Education & Certifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="schedule" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Availability Schedule</CardTitle>
              <CardDescription>Doctor's working hours and availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {doctor.availability.map((slot, idx) => (
                  <div key={idx} className="flex items-center p-3 rounded-md border">
                    <Calendar className="h-5 w-5 mr-3 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{slot.day}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {slot.hours}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Book</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="education" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>Academic qualifications and training</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {doctor.education.map((edu, idx) => (
                  <div key={idx} className="border-l-2 border-primary pl-4 ml-2 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    <p className="text-sm">{edu.year}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>Professional certifications and memberships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {doctor.certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-start">
                    <BookOpen className="h-5 w-5 mr-3 text-primary mt-1" />
                    <div>
                      <p className="font-medium">{cert.name}</p>
                      <p className="text-sm text-muted-foreground">Received in {cert.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Patient Reviews</CardTitle>
                  <CardDescription>What patients say about this doctor</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{doctor.ratings} <span className="text-xl">/ 5</span></div>
                  <p className="text-sm text-muted-foreground">Based on {doctor.reviews} reviews</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <p className="font-medium">Sarah Johnson</p>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">Dr. Smith is an excellent cardiologist. She took the time to explain my condition and treatment options thoroughly. Very knowledgeable and caring.</p>
                  <p className="text-sm text-muted-foreground mt-2">3 months ago</p>
                </div>
                
                <div className="border p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <p className="font-medium">Michael Brown</p>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">I've been seeing Dr. Smith for over a year now. She's helped me manage my heart condition effectively with minimal medication. Would highly recommend.</p>
                  <p className="text-sm text-muted-foreground mt-2">1 year ago</p>
                </div>
                
                <Button variant="outline" className="w-full">Load More Reviews</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorDetails;
