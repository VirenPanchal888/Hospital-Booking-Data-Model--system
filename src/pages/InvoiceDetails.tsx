
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Printer, Download, Send, CreditCard } from 'lucide-react';

type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'draft';

const InvoiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [processingPayment, setProcessingPayment] = useState(false);
  
  // Mock invoice data - in a real app, this would be fetched from an API based on the ID
  const invoice = {
    id: id || 'INV-001',
    number: id || 'INV-001',
    status: 'pending' as InvoiceStatus,
    date: '2023-06-15',
    dueDate: '2023-07-15',
    patient: {
      name: 'Jane Smith',
      id: 'P-12346',
      email: 'jane.smith@example.com',
      address: '123 Main St, Anytown, AN 12345',
      phone: '(555) 123-4567'
    },
    hospital: {
      name: 'General Hospital',
      address: '456 Medical Center Dr, Anytown, AN 12345',
      phone: '(555) 987-6543',
      email: 'billing@generalhospital.com',
      logo: '/placeholder.svg'
    },
    items: [
      {
        description: 'Specialist Consultation',
        quantity: 1,
        rate: 250.00,
        amount: 250.00
      },
      {
        description: 'Blood Test - Complete Blood Count',
        quantity: 1,
        rate: 70.00,
        amount: 70.00
      }
    ],
    subtotal: 320.00,
    tax: 0.00,
    discount: 0.00,
    total: 320.00,
    notes: 'Payment is due within 30 days. Please include your invoice number with your payment.'
  };
  
  if (!invoice) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Invoice Not Found</h2>
          <p className="text-muted-foreground mb-4">The invoice you're looking for does not exist or has been removed.</p>
          <Button onClick={() => navigate('/invoices')}>Back to Invoices</Button>
        </div>
      </div>
    );
  }
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
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
  
  // Handle payment
  const handlePayment = () => {
    setProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessingPayment(false);
      
      toast({
        title: "Payment Successful",
        description: `Payment for invoice ${invoice.number} has been processed successfully.`,
      });
      
      navigate('/payment-processing');
    }, 1500);
  };
  
  // Handle download
  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: `Invoice ${invoice.number} is being downloaded.`,
    });
  };
  
  // Handle send email
  const handleSendEmail = () => {
    toast({
      title: "Email Sent",
      description: `Invoice ${invoice.number} has been sent to ${invoice.patient.email}.`,
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/invoices')}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Invoice Details</h1>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownload}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
            onClick={() => window.print()}
          >
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
            onClick={handleSendEmail}
          >
            <Send className="h-4 w-4" />
            Send Email
          </Button>
          {invoice.status === 'pending' && (
            <Button 
              size="sm"
              className="flex items-center gap-1"
              onClick={handlePayment}
              disabled={processingPayment}
            >
              {processingPayment ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" />
                  Pay Now
                </>
              )}
            </Button>
          )}
        </div>
      </div>
      
      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <img 
              src={invoice.hospital.logo} 
              alt={invoice.hospital.name} 
              className="h-12 mb-4"
            />
            <h3 className="font-bold text-lg">{invoice.hospital.name}</h3>
            <address className="not-italic text-muted-foreground">
              {invoice.hospital.address}<br />
              Phone: {invoice.hospital.phone}<br />
              Email: {invoice.hospital.email}
            </address>
          </div>
          
          <div className="text-right">
            <h2 className="text-3xl font-bold mb-2">INVOICE</h2>
            <div className="mb-2">
              <span className="text-muted-foreground">Invoice Number:</span>
              <span className="font-medium ml-2">{invoice.number}</span>
            </div>
            <div className="mb-2">
              <span className="text-muted-foreground">Date Issued:</span>
              <span className="font-medium ml-2">{formatDate(invoice.date)}</span>
            </div>
            <div className="mb-2">
              <span className="text-muted-foreground">Due Date:</span>
              <span className="font-medium ml-2">{formatDate(invoice.dueDate)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Status:</span>
              <span className="ml-2">
                <StatusBadge status={invoice.status} />
              </span>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div>
            <h3 className="font-bold mb-2">Bill To:</h3>
            <p className="font-medium">{invoice.patient.name}</p>
            <p className="text-muted-foreground">Patient ID: {invoice.patient.id}</p>
            <address className="not-italic text-muted-foreground">
              {invoice.patient.address}<br />
              Phone: {invoice.patient.phone}<br />
              Email: {invoice.patient.email}
            </address>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Description</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Rate</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.description}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">{formatCurrency(item.rate)}</TableCell>
                <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="text-right font-medium">Subtotal</TableCell>
              <TableCell className="text-right font-medium">{formatCurrency(invoice.subtotal)}</TableCell>
            </TableRow>
            {invoice.tax > 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-right font-medium">Tax</TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(invoice.tax)}</TableCell>
              </TableRow>
            )}
            {invoice.discount > 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-right font-medium">Discount</TableCell>
                <TableCell className="text-right font-medium">-{formatCurrency(invoice.discount)}</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell colSpan={3} className="text-right text-lg font-bold">Total</TableCell>
              <TableCell className="text-right text-lg font-bold">{formatCurrency(invoice.total)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        
        {invoice.notes && (
          <div className="mt-8">
            <h3 className="font-bold mb-2">Notes:</h3>
            <p className="text-muted-foreground">{invoice.notes}</p>
          </div>
        )}
        
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">Thank you for choosing {invoice.hospital.name} for your healthcare needs.</p>
        </div>
      </Card>
    </div>
  );
};

export default InvoiceDetails;
