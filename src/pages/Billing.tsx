
import React, { useState, useEffect } from 'react';
import { 
  ArrowDown, 
  ArrowUp, 
  Calendar, 
  Download, 
  FileDown, 
  FilePlus, 
  Filter, 
  MoreHorizontal, 
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import NewInvoiceModal, { Invoice } from '@/components/billing/NewInvoiceModal';

const getStatusBadge = (status: Invoice['status']) => {
  switch (status) {
    case 'paid':
      return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Paid</Badge>;
    case 'pending':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Pending</Badge>;
    case 'overdue':
      return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">Overdue</Badge>;
    default:
      return null;
  }
};

const Billing = () => {
  const { toast } = useToast();
  const [invoicesData, setInvoicesData] = useState<Invoice[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewInvoiceModalOpen, setIsNewInvoiceModalOpen] = useState(false);
  
  // Load invoices from localStorage on mount
  useEffect(() => {
    const storedInvoices = localStorage.getItem('hms_invoices');
    if (storedInvoices) {
      try {
        const parsedInvoices = JSON.parse(storedInvoices);
        setInvoicesData(parsedInvoices);
      } catch (error) {
        console.error('Error parsing invoices from localStorage:', error);
        // Initialize with empty array if parsing fails
        localStorage.setItem('hms_invoices', JSON.stringify([]));
      }
    } else {
      // Initialize empty array if no invoices exist yet
      localStorage.setItem('hms_invoices', JSON.stringify([]));
    }
  }, []);
  
  // Filter invoices based on tab and search term
  const filteredInvoices = invoicesData
    .filter(invoice => 
      activeTab === 'all' || invoice.status === activeTab
    )
    .filter(invoice => 
      invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  // Calculate summary statistics
  const totalPaid = invoicesData
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  
  const totalPending = invoicesData
    .filter(invoice => invoice.status === 'pending')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  
  const totalOverdue = invoicesData
    .filter(invoice => invoice.status === 'overdue')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  
  // Handle creating a new invoice
  const handleSaveInvoice = (invoice: Invoice) => {
    const updatedInvoices = [...invoicesData, invoice];
    setInvoicesData(updatedInvoices);
    localStorage.setItem('hms_invoices', JSON.stringify(updatedInvoices));
  };

  // Handle changing invoice status
  const handleChangeStatus = (invoiceId: string, newStatus: Invoice['status']) => {
    const updatedInvoices = invoicesData.map(invoice => 
      invoice.id === invoiceId 
        ? { ...invoice, status: newStatus } 
        : invoice
    );
    
    setInvoicesData(updatedInvoices);
    localStorage.setItem('hms_invoices', JSON.stringify(updatedInvoices));
    
    toast({
      title: "Status updated",
      description: `Invoice ${invoiceId} marked as ${newStatus}`,
    });
  };

  // Handle deleting an invoice
  const handleDeleteInvoice = (invoiceId: string) => {
    const updatedInvoices = invoicesData.filter(invoice => invoice.id !== invoiceId);
    setInvoicesData(updatedInvoices);
    localStorage.setItem('hms_invoices', JSON.stringify(updatedInvoices));
    
    toast({
      title: "Invoice deleted",
      description: `Invoice ${invoiceId} has been deleted`,
    });
  };
  
  return (
    <div className="animate-slide-in-up">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Billing</h1>
          <p className="text-muted-foreground">
            Manage invoices and payments.
          </p>
        </div>
        
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search invoices..."
              className="pl-8 pr-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="gap-1" onClick={() => setIsNewInvoiceModalOpen(true)}>
            <FilePlus className="h-4 w-4" />
            <span>New Invoice</span>
          </Button>
        </div>
      </div>
      
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paid</p>
                <h3 className="text-2xl font-semibold">${totalPaid.toFixed(2)}</h3>
              </div>
              <div className="rounded-full bg-green-100 p-2 text-green-600">
                <ArrowUp className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <h3 className="text-2xl font-semibold">${totalPending.toFixed(2)}</h3>
              </div>
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <h3 className="text-2xl font-semibold">${totalOverdue.toFixed(2)}</h3>
              </div>
              <div className="rounded-full bg-red-100 p-2 text-red-600">
                <ArrowDown className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
            <span className="ml-1 rounded-full bg-primary/10 px-1.5 py-0.5 text-xs">3</span>
          </Button>
        </div>
        
        <TabsContent value={activeTab}>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50 text-left text-sm font-medium text-muted-foreground">
                      <th className="whitespace-nowrap px-4 py-3">Invoice ID</th>
                      <th className="whitespace-nowrap px-4 py-3">Patient</th>
                      <th className="whitespace-nowrap px-4 py-3">Issue Date</th>
                      <th className="whitespace-nowrap px-4 py-3">Due Date</th>
                      <th className="whitespace-nowrap px-4 py-3">Amount</th>
                      <th className="whitespace-nowrap px-4 py-3">Status</th>
                      <th className="whitespace-nowrap px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center">
                          <div className="flex flex-col items-center">
                            <FileDown className="mb-2 h-8 w-8 text-muted-foreground/60" />
                            <h3 className="text-base font-medium">No invoices found</h3>
                            <p className="text-sm text-muted-foreground">
                              Try changing your filters or create a new invoice.
                            </p>
                            <Button
                              className="mt-4 gap-1" 
                              onClick={() => setIsNewInvoiceModalOpen(true)}
                            >
                              <FilePlus className="h-4 w-4" />
                              Create Invoice
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredInvoices.map((invoice) => (
                        <tr key={invoice.id} className="border-b text-sm transition-colors hover:bg-muted/40">
                          <td className="whitespace-nowrap px-4 py-3 font-medium">{invoice.id}</td>
                          <td className="whitespace-nowrap px-4 py-3">
                            <div>
                              <div>{invoice.patientName}</div>
                              <div className="text-xs text-muted-foreground">ID: {invoice.patientId}</div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-3">{new Date(invoice.date).toLocaleDateString()}</td>
                          <td className="whitespace-nowrap px-4 py-3">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                          <td className="whitespace-nowrap px-4 py-3 font-medium">${invoice.amount.toFixed(2)}</td>
                          <td className="whitespace-nowrap px-4 py-3">
                            {getStatusBadge(invoice.status)}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                {invoice.status !== 'paid' && (
                                  <DropdownMenuItem onClick={() => handleChangeStatus(invoice.id, 'paid')}>
                                    Mark as Paid
                                  </DropdownMenuItem>
                                )}
                                {invoice.status !== 'pending' && (
                                  <DropdownMenuItem onClick={() => handleChangeStatus(invoice.id, 'pending')}>
                                    Mark as Pending
                                  </DropdownMenuItem>
                                )}
                                {invoice.status !== 'overdue' && (
                                  <DropdownMenuItem onClick={() => handleChangeStatus(invoice.id, 'overdue')}>
                                    Mark as Overdue
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download PDF
                                </DropdownMenuItem>
                                <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={() => handleDeleteInvoice(invoice.id)}
                                >
                                  Delete Invoice
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Showing <strong>{filteredInvoices.length}</strong> of <strong>{invoicesData.length}</strong> invoices
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <NewInvoiceModal
        open={isNewInvoiceModalOpen}
        onOpenChange={setIsNewInvoiceModalOpen}
        onSave={handleSaveInvoice}
      />
    </div>
  );
};

export default Billing;
