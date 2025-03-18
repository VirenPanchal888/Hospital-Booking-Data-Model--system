
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDatabase } from '@/contexts/DatabaseContext';
import { Calendar, FileText, Clipboard, Pill, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

const PatientHistory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    getPatient, 
    getPatientAppointments, 
    getPatientMedications, 
    getPatientLabTests 
  } = useDatabase();
  
  const patient = getPatient(id || '');
  const appointments = getPatientAppointments(id || '');
  const medications = getPatientMedications(id || '');
  const labTests = getPatientLabTests(id || '');
  
  if (!patient) {
    return (
      <div className="container py-12">
        <h1 className="text-2xl font-bold">Patient not found</h1>
        <Button className="mt-4" onClick={() => navigate('/patients')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Patients
        </Button>
      </div>
    );
  }
  
  // Format date function
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container pb-12"
    >
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="sm" onClick={() => navigate('/patients/' + id)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Patient
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Medical History: {patient.name}
        </h1>
      </div>
      
      <Tabs defaultValue="timeline" className="space-y-6">
        <TabsList>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Timeline</CardTitle>
              <CardDescription>Chronological history of patient events</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="relative pl-8 border-l-2 border-border">
                  {/* Combine all events and sort by date */}
                  {[
                    ...appointments.map(a => ({
                      type: 'appointment',
                      date: a.date,
                      data: a
                    })),
                    ...medications.map(m => ({
                      type: 'medication',
                      date: m.startDate,
                      data: m
                    })),
                    ...labTests.map(l => ({
                      type: 'labTest',
                      date: l.date,
                      data: l
                    }))
                  ]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((event, index) => (
                      <div 
                        key={`${event.type}-${index}`} 
                        className="mb-8 relative"
                      >
                        <div className="absolute -left-[41px] h-8 w-8 rounded-full bg-background border-2 border-border flex items-center justify-center">
                          {event.type === 'appointment' && <Calendar className="h-4 w-4 text-primary" />}
                          {event.type === 'medication' && <Pill className="h-4 w-4 text-primary" />}
                          {event.type === 'labTest' && <Clipboard className="h-4 w-4 text-primary" />}
                        </div>
                        
                        <div className="pt-1">
                          <h3 className="text-lg font-medium">
                            {event.type === 'appointment' && `Appointment: ${event.data.reason}`}
                            {event.type === 'medication' && `Medication: ${event.data.name} prescribed`}
                            {event.type === 'labTest' && `Lab Test: ${event.data.testName}`}
                          </h3>
                          
                          <p className="text-sm text-muted-foreground mb-2">
                            {formatDate(event.date)}
                          </p>
                          
                          {event.type === 'appointment' && (
                            <Card className="border">
                              <CardContent className="p-4">
                                <p><span className="font-medium">Doctor:</span> {event.data.doctorName}</p>
                                <p><span className="font-medium">Department:</span> {event.data.department}</p>
                                <p><span className="font-medium">Status:</span> {event.data.status}</p>
                                {event.data.notes && (
                                  <div className="mt-2 p-3 bg-background rounded-md">
                                    <p className="font-medium">Notes:</p>
                                    <p className="text-sm">{event.data.notes}</p>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          )}
                          
                          {event.type === 'medication' && (
                            <Card className="border">
                              <CardContent className="p-4">
                                <p><span className="font-medium">Dosage:</span> {event.data.dosage}</p>
                                <p><span className="font-medium">Frequency:</span> {event.data.frequency}</p>
                                <p>
                                  <span className="font-medium">Duration:</span> {formatDate(event.data.startDate)} - 
                                  {event.data.endDate ? formatDate(event.data.endDate) : ' Ongoing'}
                                </p>
                                <p><span className="font-medium">Prescribed by:</span> {event.data.prescribedBy}</p>
                                {event.data.notes && (
                                  <div className="mt-2 p-3 bg-background rounded-md">
                                    <p className="font-medium">Instructions:</p>
                                    <p className="text-sm">{event.data.notes}</p>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          )}
                          
                          {event.type === 'labTest' && (
                            <Card className="border">
                              <CardContent className="p-4">
                                <p><span className="font-medium">Test type:</span> {event.data.testType}</p>
                                <p><span className="font-medium">Ordered by:</span> {event.data.orderedBy}</p>
                                {event.data.result && (
                                  <>
                                    <p>
                                      <span className="font-medium">Results:</span> 
                                      <span className={event.data.result.includes('Abnormal') ? 'text-red-500' : 'text-green-500'}>
                                        {' '}{event.data.result}
                                      </span>
                                    </p>
                                    {event.data.resultDate && (
                                      <p><span className="font-medium">Result date:</span> {formatDate(event.data.resultDate)}</p>
                                    )}
                                  </>
                                )}
                                {event.data.notes && (
                                  <div className="mt-2 p-3 bg-background rounded-md">
                                    <p className="font-medium">Notes:</p>
                                    <p className="text-sm">{event.data.notes}</p>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      </div>
                    ))
                  }
                  
                  {/* Registration Event */}
                  <div className="mb-8 relative">
                    <div className="absolute -left-[41px] h-8 w-8 rounded-full bg-background border-2 border-border flex items-center justify-center">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    
                    <div className="pt-1">
                      <h3 className="text-lg font-medium">Patient Registration</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(patient.registrationDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appointments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Appointments</CardTitle>
              <CardDescription>Complete appointment history</CardDescription>
            </CardHeader>
            <CardContent>
              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((appointment, index) => (
                      <Card key={appointment.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <Calendar className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">{appointment.reason}</h4>
                                <p className="text-sm">
                                  {formatDate(appointment.date)} at {appointment.time}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {appointment.doctorName} • {appointment.department}
                                </p>
                                <p className="text-sm mt-1">
                                  <span className="capitalize px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800">
                                    {appointment.status}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div>
                              {appointment.notes && (
                                <div className="p-3 bg-background rounded-md max-w-xs">
                                  <p className="text-sm font-medium">Notes:</p>
                                  <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No appointment history found.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="medications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Medication History</CardTitle>
              <CardDescription>Complete medication history</CardDescription>
            </CardHeader>
            <CardContent>
              {medications.length > 0 ? (
                <div className="space-y-4">
                  {medications
                    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
                    .map((medication) => (
                      <Card key={medication.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <Pill className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">{medication.name}</h4>
                                <p className="text-sm">{medication.dosage} • {medication.frequency}</p>
                                <p className="text-sm text-muted-foreground">
                                  {formatDate(medication.startDate)} - 
                                  {medication.endDate ? formatDate(medication.endDate) : ' Ongoing'}
                                </p>
                                <p className="text-sm mt-1">
                                  <span className="capitalize px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800">
                                    {medication.status}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="space-y-1 sm:text-right">
                              <p className="text-sm">
                                <span className="text-muted-foreground">Prescribed by:</span> {medication.prescribedBy}
                              </p>
                              {medication.notes && (
                                <p className="text-sm text-muted-foreground">{medication.notes}</p>
                              )}
                              {medication.refills !== undefined && (
                                <p className="text-sm">
                                  <span className="text-muted-foreground">Refills:</span> {medication.refills}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No medication history found.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="lab-results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lab Results</CardTitle>
              <CardDescription>Complete laboratory history</CardDescription>
            </CardHeader>
            <CardContent>
              {labTests.length > 0 ? (
                <div className="space-y-4">
                  {labTests
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((test) => (
                      <Card key={test.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <Clipboard className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">{test.testName}</h4>
                                <p className="text-sm">Type: {test.testType}</p>
                                <p className="text-sm text-muted-foreground">
                                  Ordered on: {formatDate(test.date)}
                                </p>
                                {test.resultDate && (
                                  <p className="text-sm text-muted-foreground">
                                    Results on: {formatDate(test.resultDate)}
                                  </p>
                                )}
                                <p className="text-sm mt-1">
                                  <span className="capitalize px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800">
                                    {test.status}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              {test.result && (
                                <p className={`text-sm font-medium ${test.result.includes('Abnormal') ? 'text-red-500' : 'text-green-500'}`}>
                                  {test.result}
                                </p>
                              )}
                              <p className="text-sm">
                                <span className="text-muted-foreground">Ordered by:</span> {test.orderedBy}
                              </p>
                              {test.notes && (
                                <div className="p-3 bg-background rounded-md max-w-xs">
                                  <p className="text-sm">{test.notes}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No lab results found.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default PatientHistory;
