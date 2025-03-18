
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
} from '@/components/ui/pagination';
import { Search, FileDown, FilePlus, CalendarRange, DollarSign } from 'lucide-react';

type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'draft';

interface Invoice {
  id: string;
  patient: string;
  patientId: string;
  date: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
  items: { description: string; quantity: number; rate: number; amount: number }[];
}

const Invoices: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Mock invoices data
  const invoices: Invoice[] = [
    {
      id: "INV-001",
      patient: "John Doe",
      patientId: "P-12345",
      date: "2023-06-10",
      dueDate: "2023-07-10",
      amount: 450.00,
      status: "paid",
      items: [
        { description: "General Consultation", quantity: 1, rate: 150.00, amount: 150.00 },
        { description: "Blood Test", quantity: 1, rate: 200.00, amount: 200.00 },
        { description: "Medication", quantity: 2, rate: 50.00, amount: 100.00 }
      ]
    },
    {
      id: "INV-002",
      patient: "Jane Smith",
      patientId: "P-12346",
      date: "2023-06-15",
      dueDate: "2023-07-15",
      amount: 320.00,
      status: "pending",
      items: [
        { description: "Specialist Consultation", quantity: 1, rate: 250.00, amount: 250.00 },
        { description: "Prescription", quantity: 1, rate: 70.00, amount: 70.00 }
      ]
    },
    {
      id: "INV-003",
      patient: "Robert Johnson",
      patientId: "P-12347",
      date: "2023-05-20",
      dueDate: "2023-06-20",
      amount: 850.00,
      status: "overdue",
      items: [
        { description: "Emergency Room Visit", quantity: 1, rate: 500.00, amount: 500.00 },
        { description: "X-Ray", quantity: 1, rate: 250.00, amount: 250.00 },
        { description: "Medication", quantity: 2, rate: 50.00, amount: 100.00 }
      ]
    },
    {
      id: "INV-004",
      patient: "Emily Wilson",
      patientId: "P-12348",
      date: "2023-06-18",
      dueDate: "2023-07-18",
      amount: 180.00,
      status: "draft",
      items: [
        { description: "Follow-up Consultation", quantity: 1, rate: 100.00, amount: 100.00 },
        { description: "Prescription", quantity: 1, rate: 80.00, amount: 80.00 }
      ]
    },
    {
      id: "INV-005",
      patient: "Michael Brown",
      patientId: "P-12349",
      date: "2023-06-05",
      dueDate: "2023-07-05",
      amount: 520.00,
      status: "paid",
      items: [
        { description: "Physical Therapy Session", quantity: 2, rate: 150.00, amount: 300.00 },
        { description: "Medical Supplies", quantity: 1, rate: 220.00, amount: 220.00 }
      ]
    },
    {
      id: "INV-006",
      patient: "Sophia Garcia",
      patientId: "P-12350",
      date: "2023-06-12",
      dueDate: "2023-07-12",
      amount: 750.00,
      status: "pending",
      items: [
        { description: "Minor Surgery", quantity: 1, rate: 600.00, amount: 600.00 },
        { description: "Follow-up Care", quantity: 1, rate: 150.00, amount: 150.00 }
      ]
    }
  ];
  
  // Filter invoices based on search term and status
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      invoice.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Status badge component
  const StatusBadge = ({ status }: { status: InvoiceStatus }) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Overdue</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Draft</Badge>;
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
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <Button onClick={() => navigate('/invoices/new')} className="flex items-center gap-2">
          <FilePlus className="h-4 w-4" />
          Create New Invoice
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Invoice Management</CardTitle>
          <CardDescription>Manage and view all patient invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices..."
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
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
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
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>
                      <div>
                        <p>{invoice.patient}</p>
                        <p className="text-xs text-muted-foreground">{invoice.patientId}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarRange className="h-4 w-4 text-muted-foreground" />
                        {new Date(invoice.date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarRange className="h-4 w-4 text-muted-foreground" />
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        {formatCurrency(invoice.amount)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={invoice.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate(`/invoices/${invoice.id}`)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredInvoices.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No invoices found.
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

export default Invoices;
