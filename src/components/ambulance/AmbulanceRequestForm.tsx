
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Ambulance, MapPin, MapPinned, User, Phone, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// Placeholder for map component - in a real implementation, you would use a proper map library
const MapPlaceholder = () => (
  <div className="flex h-96 w-full items-center justify-center rounded-md border border-dashed bg-muted/50">
    <div className="flex flex-col items-center text-center text-muted-foreground">
      <MapPinned className="mb-2 h-12 w-12" />
      <h3 className="text-lg font-medium">Map would be displayed here</h3>
      <p className="max-w-md text-sm">
        In a real implementation, this would be an interactive map powered by Google Maps or another mapping service.
      </p>
    </div>
  </div>
);

// Form schema
const ambulanceRequestSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  contactNumber: z.string().min(10, { message: "Please enter a valid contact number." }),
  address: z.string().min(5, { message: "Please enter a valid address." }),
  city: z.string().min(2, { message: "Please enter a valid city." }),
  emergencyType: z.string({
    required_error: "Please select an emergency type.",
  }),
  additionalDetails: z.string().optional(),
});

type AmbulanceRequestValues = z.infer<typeof ambulanceRequestSchema>;

const emergencyTypes = [
  'Medical Emergency',
  'Accident',
  'Cardiac Emergency',
  'Pregnancy Related',
  'Respiratory Distress',
  'Neurological Emergency',
  'Other'
];

const AmbulanceRequestForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<AmbulanceRequestValues>({
    resolver: zodResolver(ambulanceRequestSchema),
    defaultValues: {
      name: '',
      contactNumber: '',
      address: '',
      city: '',
      emergencyType: '',
      additionalDetails: '',
    },
  });

  const onSubmit = async (values: AmbulanceRequestValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // In a real app, this would be an API call to the ambulance dispatch system
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Ambulance request submitted:', values);
      
      // Show success message
      toast({
        title: "Emergency Request Submitted",
        description: "An ambulance has been dispatched to your location.",
      });
      
      // Set request as submitted
      setRequestSubmitted(true);
    } catch (error) {
      console.error('Error submitting ambulance request:', error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again or call emergency services directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="outline" className="bg-red-50 text-red-700">Emergency</Badge>
            <h2 className="text-lg font-semibold">Request an Ambulance</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Fill in your details and select your location on the map to request emergency medical transportation.
          </p>
        </div>
        
        {requestSubmitted ? (
          <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
            <div className="mb-3 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Ambulance className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="mb-2 text-lg font-medium text-green-800">Ambulance Dispatched</h3>
            <p className="mb-4 text-green-700">
              An ambulance has been dispatched to your location. Please stay on the line and keep your phone nearby.
            </p>
            <div className="mb-4 rounded-md bg-white p-3 text-left">
              <p className="mb-1 text-sm font-medium">Estimated arrival time:</p>
              <p className="text-xl font-semibold text-red-600">10-15 minutes</p>
            </div>
            <Button 
              className="w-full"
              onClick={() => setRequestSubmitted(false)}
            >
              Make Another Request
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Enter your full name" 
                          className="pl-8"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Enter your phone number" 
                          className="pl-8"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      We'll call you to confirm the request.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Enter your street address" 
                          className="pl-8"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your city" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="emergencyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the type of emergency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {emergencyTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="additionalDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Details</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Provide any additional details about the emergency"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="mt-6 flex items-center rounded-md bg-amber-50 p-3 text-amber-800">
                <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                <p className="text-sm">
                  In case of severe emergencies, please also dial emergency services directly.
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="mt-4 w-full gap-2 bg-red-600 text-white hover:bg-red-700" 
                disabled={isSubmitting}
              >
                <Ambulance className="h-4 w-4" />
                {isSubmitting ? "Requesting..." : "Request Ambulance Now"}
              </Button>
            </form>
          </Form>
        )}
      </div>
      
      <div>
        <div className="mb-4">
          <h3 className="text-base font-medium">Select Your Location on Map</h3>
          <p className="text-sm text-muted-foreground">
            Click on the map to pinpoint your exact location for the ambulance.
          </p>
        </div>
        <MapPlaceholder />
      </div>
    </div>
  );
};

export default AmbulanceRequestForm;
