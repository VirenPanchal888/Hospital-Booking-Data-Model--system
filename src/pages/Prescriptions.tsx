
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
} from '@/components/ui/pagination';
import { Search, PlusCircle, Calendar, Printer, Pill, RefreshCw, Check, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

type PrescriptionStatus = 'active' | 'completed' | 'expired' | 'cancelled' | 'refill-requested';

interface Prescription {
  id: string;
  patientName: string;
  patientId: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string | null;
  prescribedBy: string;
  status: PrescriptionStatus;
  instructions: string;
  refills: number;
  refillsRemaining: number;
  pharmacy?: string;
}

const Prescriptions: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  
  // Mock prescriptions data
  const prescriptions: Prescription[] = [
    {
      id: "RX-001",
      patientName: "John Doe",
      patientId: "P-12345",
      medication: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      startDate: "2023-06-01",
      endDate: "2023-12-01",
      prescribedBy: "Dr. Jane Smith",
      status: "active",
      instructions: "Take with food in the morning",
      refills: 3,
      refillsRemaining: 2,
      pharmacy: "MedCare Pharmacy"
    },
    {
      id: "RX-002",
      patientName: "Jane Smith",
      patientId: "P-12346",
      medication: "Amoxicillin",
      dosage: "500mg",
      frequency: "Three times daily",
      startDate: "2023-06-10",
      endDate: "2023-06-20",
      prescribedBy: "Dr. Michael Chen",
      status: "completed",
      instructions: "Take until all medication is finished, even if feeling better",
      refills: 0,
      refillsRemaining: 0,
      pharmacy: "City Drugs"
    },
    {
      id: "RX-003",
      patientName: "Robert Johnson",
      patientId: "P-12347",
      medication: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily at bedtime",
      startDate: "2023-05-15",
      endDate: null,
      prescribedBy: "Dr. Sarah Johnson",
      status: "active",
      instructions: "Take at the same time each night",
      refills: 6,
      refillsRemaining: 3,
      pharmacy: "Health Plus Pharmacy"
    },
    {
      id: "RX-004",
      patientName: "Emily Wilson",
      patientId: "P-12348",
      medication: "Prednisone",
      dosage: "10mg",
      frequency: "Twice daily",
      startDate: "2023-06-05",
      endDate: "2023-06-15",
      prescribedBy: "Dr. Jane Smith",
      status: "expired",
      instructions: "Take with food. Taper as directed.",
      refills: 0,
      refillsRemaining: 0,
      pharmacy: "MedCare Pharmacy"
    },
    {
      id: "RX-005",
      patientName: "Michael Brown",
      patientId: "P-12349",
      medication: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily with meals",
      startDate: "2023-04-20",
      endDate: null,
      prescribedBy: "Dr. William Davis",
      status: "refill-requested",
      instructions: "Take with first bite of meal to minimize GI side effects",
      refills: 6,
      refillsRemaining: 0,
      pharmacy: "City Drugs"
    },
    {
      id: "RX-006",
      patientName: "Sophia Garcia",
      patientId: "P-12350",
      medication: "Fluoxetine",
      dosage: "20mg",
      frequency: "Once daily in the morning",
      startDate: "2023-05-01",
      endDate: null,
      prescribedBy: "Dr. Elizabeth Taylor",
      status: "cancelled",
      instructions: "Take with or without food. Notify doctor if side effects occur.",
      refills: 5,
      refillsRemaining: 5,
      pharmacy: "Health Plus Pharmacy"
    }
  ];
  
  // Filter prescriptions based on search term
  const filteredPrescriptions = prescriptions.filter((prescription) => {
    return (
      prescription.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.medication.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  // Status badge component
  const StatusBadge = ({ status }: { status: PrescriptionStatus }) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Completed</Badge>;
      case 'expired':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Expired</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Cancelled</Badge>;
      case 'refill-requested':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Refill Requested</Badge>;
      default:
        return null;
    }
  };
  
  // Handle prescription refill
  const handleRefill = () => {
    if (selectedPrescription) {
      toast({
        title: "Prescription Refilled",
        description: `${selectedPrescription.medication} has been refilled successfully.`,
      });
    }
  };
  
  // Handle cancel prescription
  const handleCancel = () => {
    if (selectedPrescription) {
      toast({
        title: "Prescription Cancelled",
        description: `${selectedPrescription.medication} prescription has been cancelled.`,
      });
    }
  };
  
  // Handle print prescription
  const handlePrint = () => {
    if (selectedPrescription) {
      toast({
        title: "Printing Prescription",
        description: `${selectedPrescription.medication} prescription is being printed.`,
      });
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Prescriptions</h1>
        {user?.role === 'doctor' && (
          <Button onClick={() => navigate('/prescriptions/new')} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            New Prescription
          </Button>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Medication Prescriptions</CardTitle>
          <CardDescription>View and manage patient prescriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search prescriptions..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rx #</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Medication</TableHead>
                    <TableHead>Prescribed</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Refills</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell className="font-medium">{prescription.id}</TableCell>
                      <TableCell>
                        <div>
                          <p>{prescription.patientName}</p>
                          <p className="text-xs text-muted-foreground">{prescription.patientId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Pill className="h-4 w-4 text-primary" />
                          <div>
                            <p>{prescription.medication}</p>
                            <p className="text-xs text-muted-foreground">{prescription.dosage}, {prescription.frequency}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(prescription.startDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={prescription.status} />
                      </TableCell>
                      <TableCell>
                        {prescription.refillsRemaining}/{prescription.refills}
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedPrescription(prescription)}
                            >
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Prescription Details</DialogTitle>
                              <DialogDescription>
                                {prescription.id} - {prescription.medication}
                              </DialogDescription>
                            </DialogHeader>
                            
                            {selectedPrescription && (
                              <div className="space-y-6 py-4">
                                <div className="flex justify-between items-center">
                                  <h3 className="font-bold text-lg">
                                    {selectedPrescription.medication} {selectedPrescription.dosage}
                                  </h3>
                                  <StatusBadge status={selectedPrescription.status} />
                                </div>
                                
                                <Separator />
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Patient</p>
                                    <p>{selectedPrescription.patientName} ({selectedPrescription.patientId})</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Prescribed By</p>
                                    <p>{selectedPrescription.prescribedBy}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Dosage</p>
                                    <p>{selectedPrescription.dosage}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Frequency</p>
                                    <p>{selectedPrescription.frequency}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                                    <p>{new Date(selectedPrescription.startDate).toLocaleDateString()}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">End Date</p>
                                    <p>{selectedPrescription.endDate ? new Date(selectedPrescription.endDate).toLocaleDateString() : 'Ongoing'}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Refills</p>
                                    <p>{selectedPrescription.refillsRemaining} remaining of {selectedPrescription.refills} total</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Pharmacy</p>
                                    <p>{selectedPrescription.pharmacy || 'Not specified'}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Instructions</p>
                                  <p>{selectedPrescription.instructions}</p>
                                </div>
                              </div>
                            )}
                            
                            <DialogFooter className="flex flex-col sm:flex-row gap-2">
                              <Button 
                                variant="outline" 
                                className="flex items-center gap-2"
                                onClick={handlePrint}
                              >
                                <Printer className="h-4 w-4" />
                                Print
                              </Button>
                              
                              {user?.role === 'doctor' && selectedPrescription?.status === 'active' && (
                                <Button 
                                  variant="outline" 
                                  className="flex items-center gap-2 text-red-500"
                                  onClick={handleCancel}
                                >
                                  <X className="h-4 w-4" />
                                  Cancel
                                </Button>
                              )}
                              
                              {user?.role === 'doctor' && selectedPrescription?.status === 'refill-requested' && (
                                <Button 
                                  className="flex items-center gap-2"
                                  onClick={handleRefill}
                                >
                                  <Check className="h-4 w-4" />
                                  Approve Refill
                                </Button>
                              )}
                              
                              {user?.role === 'patient' && selectedPrescription?.status === 'active' && selectedPrescription.refillsRemaining > 0 && (
                                <Button 
                                  className="flex items-center gap-2"
                                  onClick={handleRefill}
                                >
                                  <RefreshCw className="h-4 w-4" />
                                  Request Refill
                                </Button>
                              )}
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredPrescriptions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No prescriptions found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Prescriptions;
