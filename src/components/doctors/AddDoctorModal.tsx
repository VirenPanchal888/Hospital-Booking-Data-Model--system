
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { UserPlus } from 'lucide-react';

interface DoctorData {
  id: string;
  name: string;
  email: string;
  specialty: string;
  experience: string;
  contactNumber: string;
  avatar?: string;
}

interface AddDoctorModalProps {
  onDoctorAdded: (doctor: DoctorData) => void;
}

const specialties = [
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'Dermatology',
  'Ophthalmology',
  'Gynecology',
  'Psychiatry',
  'Oncology',
  'General Medicine'
];

const AddDoctorModal: React.FC<AddDoctorModalProps> = ({ onDoctorAdded }) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialty: '',
    experience: '',
    contactNumber: ''
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSpecialtyChange = (value: string) => {
    setFormData(prev => ({ ...prev, specialty: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.specialty) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // In a real application, this would be an API call
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a unique ID (in a real app, this would come from the backend)
      const newDoctor: DoctorData = {
        id: `D${Math.floor(Math.random() * 10000)}`,
        ...formData
      };
      
      // Call the callback function to add the doctor to the state
      onDoctorAdded(newDoctor);
      
      // Show success message
      toast({
        title: "Doctor Added Successfully",
        description: `${formData.name} has been added to the system.`
      });
      
      // Reset form and close modal
      setFormData({
        name: '',
        email: '',
        specialty: '',
        experience: '',
        contactNumber: ''
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add doctor. Please try again.",
        variant: "destructive"
      });
      console.error("Error adding doctor:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <UserPlus className="h-4 w-4" />
          <span>Add Doctor</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Doctor</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new doctor to the system.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Dr. Jane Smith"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="doctor@hospital.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="specialty">Specialty *</Label>
            <Select
              value={formData.specialty}
              onValueChange={handleSpecialtyChange}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="experience">Years of Experience</Label>
            <Input
              id="experience"
              name="experience"
              placeholder="e.g., 5 years"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              name="contactNumber"
              placeholder="+1 (555) 123-4567"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Doctor"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDoctorModal;
