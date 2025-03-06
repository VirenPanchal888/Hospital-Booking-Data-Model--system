
import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  items: InvoiceItem[];
}

interface NewInvoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (invoice: Invoice) => void;
}

const NewInvoiceModal: React.FC<NewInvoiceModalProps> = ({
  open,
  onOpenChange,
  onSave,
}) => {
  const { toast } = useToast();
  const [patientName, setPatientName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [status, setStatus] = useState<'paid' | 'pending' | 'overdue'>('pending');
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: `item-${Date.now()}`, name: '', quantity: 1, price: 0 }
  ]);

  const resetForm = () => {
    setPatientName('');
    setPatientId('');
    setStatus('pending');
    setDueDate('');
    setItems([{ id: `item-${Date.now()}`, name: '', quantity: 1, price: 0 }]);
  };

  const addItem = () => {
    setItems([...items, { id: `item-${Date.now()}`, name: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    } else {
      toast({
        title: "Cannot remove item",
        description: "Invoice must have at least one item",
        variant: "destructive"
      });
    }
  };

  const updateItem = (
    id: string, 
    field: 'name' | 'quantity' | 'price', 
    value: string | number
  ) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Calculate total amount
  const totalAmount = items.reduce(
    (sum, item) => sum + item.quantity * item.price, 
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!patientName || !patientId || !dueDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Validate items
    const invalidItems = items.some(item => !item.name || item.quantity < 1 || item.price < 0);
    if (invalidItems) {
      toast({
        title: "Invalid items",
        description: "Please check all items have valid names, quantities and prices",
        variant: "destructive"
      });
      return;
    }

    // Create invoice with today's date
    const newInvoice: Invoice = {
      id: `INV-${Date.now().toString(36).toUpperCase()}`,
      patientName,
      patientId,
      date: new Date().toISOString().split('T')[0],
      dueDate,
      amount: totalAmount,
      status,
      items
    };

    onSave(newInvoice);
    toast({
      title: "Invoice created",
      description: `Invoice ${newInvoice.id} has been created successfully`
    });
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
          <DialogDescription>
            Create a new invoice for patient services
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name</Label>
              <Input
                id="patientName"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter patient name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient ID</Label>
              <Input
                id="patientId"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                placeholder="Enter patient ID"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value: 'paid' | 'pending' | 'overdue') => setStatus(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Invoice Items</h3>
              <Button 
                type="button" 
                onClick={addItem} 
                size="sm" 
                variant="outline"
                className="gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Item
              </Button>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 items-end border-b pb-3">
                  <div className="col-span-5">
                    <Label htmlFor={`item-name-${index}`}>Item Description</Label>
                    <Input
                      id={`item-name-${index}`}
                      value={item.name}
                      onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                      placeholder="Service or item name"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor={`item-quantity-${index}`}>Qty</Label>
                    <Input
                      id={`item-quantity-${index}`}
                      type="number"
                      min="1"
                      step="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                  <div className="col-span-3">
                    <Label htmlFor={`item-price-${index}`}>Price ($)</Label>
                    <Input
                      id={`item-price-${index}`}
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                      required
                    />
                  </div>
                  <div className="col-span-2 flex justify-end pb-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="h-9 w-9 text-destructive hover:text-destructive/90"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove item</span>
                    </Button>
                    <div className="w-4 flex items-center justify-center font-medium">
                      ${(item.quantity * item.price).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Total Amount</div>
                <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Invoice</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewInvoiceModal;
