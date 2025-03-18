
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
} from '@/components/ui/pagination';
import { Search, FileDown, FilePlus, CalendarRange, DollarSign } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type ClaimStatus = 'pending' | 'approved' | 'rejected' | 'in-review' | 'paid';

interface InsuranceClaim {
  id: string;
  patient: string;
  patientId: string;
  provider: string;
  policyNumber: string;
  submissionDate: string;
  serviceDate: string;
  amount: number;
  status: ClaimStatus;
  description: string;
}

const InsuranceClaims: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedClaim, setSelectedClaim] = useState<InsuranceClaim | null>(null);
  
  // Mock claims data
  const claims: InsuranceClaim[] = [
    {
      id: "CLM-001",
      patient: "John Doe",
      patientId: "P-12345",
      provider: "Blue Cross Blue Shield",
      policyNumber: "BCBS-9876543",
      submissionDate: "2023-06-15",
      serviceDate: "2023-06-10",
      amount: 450.00,
      status: "approved",
      description: "General consultation and blood tests"
    },
    {
      id: "CLM-002",
      patient: "Jane Smith",
      patientId: "P-12346",
      provider: "Aetna",
      policyNumber: "AET-8765432",
      submissionDate: "2023-06-20",
      serviceDate: "2023-06-15",
      amount: 320.00,
      status: "pending",
      description: "Specialist consultation"
    },
    {
      id: "CLM-003",
      patient: "Robert Johnson",
      patientId: "P-12347",
      provider: "UnitedHealthcare",
      policyNumber: "UHC-7654321",
      submissionDate: "2023-06-01",
      serviceDate: "2023-05-20",
      amount: 850.00,
      status: "rejected",
      description: "Emergency room visit and x-ray"
    },
    {
      id: "CLM-004",
      patient: "Emily Wilson",
      patientId: "P-12348",
      provider: "Cigna",
      policyNumber: "CIG-6543210",
      submissionDate: "2023-06-25",
      serviceDate: "2023-06-18",
      amount: 180.00,
      status: "in-review",
      description: "Follow-up consultation"
    },
    {
      id: "CLM-005",
      patient: "Michael Brown",
      patientId: "P-12349",
      provider: "Humana",
      policyNumber: "HUM-5432109",
      submissionDate: "2023-06-10",
      serviceDate: "2023-06-05",
      amount: 520.00,
      status: "paid",
      description: "Physical therapy sessions"
    },
    {
      id: "CLM-006",
      patient: "Sophia Garcia",
      patientId: "P-12350",
      provider: "Medicare",
      policyNumber: "MED-4321098",
      submissionDate: "2023-06-18",
      serviceDate: "2023-06-12",
      amount: 750.00,
      status: "approved",
      description: "Minor surgery"
    }
  ];
  
  // Filter claims based on search term and status
  const filteredClaims = claims.filter((claim) => {
    const matchesSearch = 
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      claim.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.provider.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Status badge component
  const StatusBadge = ({ status }: { status: ClaimStatus }) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>;
      case 'in-review':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">In Review</Badge>;
      case 'paid':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Paid</Badge>;
      default:
        return null;
    }
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  // Handle resubmit claim
  const handleResubmitClaim = () => {
    if (selectedClaim) {
      toast({
        title: "Claim Resubmitted",
        description: `Claim ${selectedClaim.id} has been resubmitted successfully.`,
      });
    }
  };
  
  // Handle appeal claim
  const handleAppealClaim = () => {
    if (selectedClaim) {
      toast({
        title: "Appeal Submitted",
        description: `An appeal for claim ${selectedClaim.id} has been submitted successfully.`,
      });
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Insurance Claims</h1>
        <Button className="flex items-center gap-2">
          <FilePlus className="h-4 w-4" />
          Submit New Claim
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Claims Management</CardTitle>
          <CardDescription>Track and manage insurance claims</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search claims..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="in-review">In Review</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <FileDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim #</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClaims.map((claim) => (
                  <TableRow key={claim.id}>
                    <TableCell className="font-medium">{claim.id}</TableCell>
                    <TableCell>
                      <div>
                        <p>{claim.patient}</p>
                        <p className="text-xs text-muted-foreground">{claim.patientId}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{claim.provider}</p>
                        <p className="text-xs text-muted-foreground">Policy: {claim.policyNumber}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarRange className="h-4 w-4 text-muted-foreground" />
                        {formatDate(claim.submissionDate)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        {formatCurrency(claim.amount)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={claim.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedClaim(claim)}
                          >
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg">
                          <DialogHeader>
                            <DialogTitle>Claim Details - {claim.id}</DialogTitle>
                            <DialogDescription>
                              View and manage claim information
                            </DialogDescription>
                          </DialogHeader>
                          
                          {selectedClaim && (
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Patient</p>
                                  <p>{selectedClaim.patient} ({selectedClaim.patientId})</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Provider</p>
                                  <p>{selectedClaim.provider}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Policy Number</p>
                                  <p>{selectedClaim.policyNumber}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                                  <div className="mt-1">
                                    <StatusBadge status={selectedClaim.status} />
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Service Date</p>
                                  <p>{formatDate(selectedClaim.serviceDate)}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Submission Date</p>
                                  <p>{formatDate(selectedClaim.submissionDate)}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Amount</p>
                                  <p>{formatCurrency(selectedClaim.amount)}</p>
                                </div>
                              </div>
                              
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Description</p>
                                <p>{selectedClaim.description}</p>
                              </div>
                            </div>
                          )}
                          
                          <DialogFooter className="flex flex-col sm:flex-row gap-2">
                            {selectedClaim?.status === 'rejected' && (
                              <>
                                <Button 
                                  variant="outline" 
                                  onClick={handleResubmitClaim}
                                >
                                  Resubmit Claim
                                </Button>
                                <Button 
                                  onClick={handleAppealClaim}
                                >
                                  Appeal Decision
                                </Button>
                              </>
                            )}
                            {selectedClaim?.status === 'pending' && (
                              <Button 
                                variant="outline"
                                onClick={() => {
                                  toast({
                                    title: "Claim Checked",
                                    description: `Follow-up for claim ${selectedClaim.id} has been scheduled.`,
                                  });
                                }}
                              >
                                Check Status
                              </Button>
                            )}
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredClaims.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No claims found.
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
        </CardContent>
      </Card>
    </div>
  );
};

export default InsuranceClaims;
