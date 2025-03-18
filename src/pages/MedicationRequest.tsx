
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, FileSearch, Pill } from 'lucide-react';

const MedicationRequest: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUrgent, setIsUrgent] = useState(false);
  const [requestType, setRequestType] = useState('new');
  const [selectedMedication, setSelectedMedication] = useState('');
  const [quantity, setQuantity] = useState('');
  const [department, setDepartment] = useState('');
  const [requestedBy, setRequestedBy] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMedication || !quantity || !department || !requestedBy) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Request Submitted",
        description: `Your request for ${selectedMedication} has been sent successfully.`,
      });
      
      navigate('/inventory');
    }, 1500);
  };
  
  // Mock medication data
  const medications = [
    { id: "MED-001", name: "Acetaminophen 500mg", available: true },
    { id: "MED-002", name: "Amoxicillin 250mg", available: true },
    { id: "MED-003", name: "Lisinopril 10mg", available: false },
    { id: "MED-004", name: "Insulin Regular", available: true },
    { id: "MED-005", name: "Atorvastatin 20mg", available: true },
    { id: "MED-006", name: "Metformin 500mg", available: true },
    { id: "MED-007", name: "Albuterol Inhaler", available: false },
    { id: "MED-008", name: "Prednisone 5mg", available: true },
    { id: "MED-009", name: "Omeprazole 20mg", available: true },
    { id: "MED-010", name: "Levothyroxine 50mcg", available: true },
  ];
  
  // Mock department data
  const departments = [
    { id: "DEPT-001", name: "Emergency Department" },
    { id: "DEPT-002", name: "Cardiology" },
    { id: "DEPT-003", name: "Pediatrics" },
    { id: "DEPT-004", name: "Oncology" },
    { id: "DEPT-005", name: "General Medicine" },
    { id: "DEPT-006", name: "Surgery" },
    { id: "DEPT-007", name: "Obstetrics & Gynecology" },
    { id: "DEPT-008", name: "Neurology" },
    { id: "DEPT-009", name: "Psychiatry" },
    { id: "DEPT-010", name: "Radiology" },
  ];
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/inventory')}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Medication Request</h1>
        </div>
        <Button variant="outline" onClick={() => navigate('/inventory')} className="flex items-center gap-2">
          <FileSearch className="h-4 w-4" />
          View Inventory
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Request Details</CardTitle>
              <CardDescription>Fill in the details for your medication request</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="medication-select">Select Medication</Label>
                    <Select 
                      value={selectedMedication} 
                      onValueChange={setSelectedMedication}
                    >
                      <SelectTrigger id="medication-select" className="w-full">
                        <SelectValue placeholder="Select a medication" />
                      </SelectTrigger>
                      <SelectContent>
                        {medications.map(med => (
                          <SelectItem 
                            key={med.id} 
                            value={med.name}
                            disabled={!med.available}
                          >
                            {med.name} {!med.available && "(Out of Stock)"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input 
                        id="quantity" 
                        type="number" 
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="request-type">Request Type</Label>
                      <RadioGroup 
                        id="request-type"
                        className="flex mt-2" 
                        defaultValue="new"
                        value={requestType}
                        onValueChange={setRequestType}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="new" id="new" />
                          <Label htmlFor="new">New</Label>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <RadioGroupItem value="refill" id="refill" />
                          <Label htmlFor="refill">Refill</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="department-select">Department</Label>
                    <Select 
                      value={department} 
                      onValueChange={setDepartment}
                    >
                      <SelectTrigger id="department-select" className="w-full">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept.id} value={dept.name}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="requested-by">Requested By</Label>
                    <Input 
                      id="requested-by" 
                      placeholder="Your name"
                      value={requestedBy}
                      onChange={(e) => setRequestedBy(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Add any specific instructions or notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="urgent" 
                      checked={isUrgent}
                      onCheckedChange={(checked) => {
                        setIsUrgent(!!checked);
                      }}
                    />
                    <Label htmlFor="urgent" className="text-red-500 font-medium">
                      This is an urgent request
                    </Label>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate('/inventory')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Request
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Request Guidelines</CardTitle>
              <CardDescription>Important information about medication requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Pill className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold">Processing Time</h4>
                  <p className="text-sm text-muted-foreground">
                    Standard requests are processed within 24-48 hours. Urgent requests are processed within 2-4 hours.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Pill className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold">Authorization</h4>
                  <p className="text-sm text-muted-foreground">
                    All requests must be approved by department heads before fulfillment.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Pill className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold">Controlled Substances</h4>
                  <p className="text-sm text-muted-foreground">
                    Requests for controlled substances require additional verification and documentation.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Pill className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold">Request Status</h4>
                  <p className="text-sm text-muted-foreground">
                    You can check the status of your request in the Inventory Management system.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recently Requested</CardTitle>
              <CardDescription>Popular medications requested this week</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-sm border-b pb-2">
                  <span>Acetaminophen 500mg</span>
                  <span className="text-muted-foreground">24 requests</span>
                </li>
                <li className="flex justify-between items-center text-sm border-b pb-2">
                  <span>Amoxicillin 250mg</span>
                  <span className="text-muted-foreground">18 requests</span>
                </li>
                <li className="flex justify-between items-center text-sm border-b pb-2">
                  <span>Insulin Regular</span>
                  <span className="text-muted-foreground">15 requests</span>
                </li>
                <li className="flex justify-between items-center text-sm border-b pb-2">
                  <span>Metformin 500mg</span>
                  <span className="text-muted-foreground">12 requests</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span>Atorvastatin 20mg</span>
                  <span className="text-muted-foreground">10 requests</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MedicationRequest;
