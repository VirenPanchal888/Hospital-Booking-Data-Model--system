
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Search, Plus, BarChart3, AlertTriangle, PackagePlus, Clipboard } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock' | 'on-order';
type ItemCategory = 'medication' | 'supplies' | 'equipment' | 'lab';

interface InventoryItem {
  id: string;
  name: string;
  category: ItemCategory;
  currentStock: number;
  minimumStock: number;
  unit: string;
  location: string;
  price: number;
  status: StockStatus;
  supplier: string;
  lastRestocked: string;
  expiryDate?: string;
}

const Inventory: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [showAddItemDialog, setShowAddItemDialog] = useState(false);
  const [restockQuantity, setRestockQuantity] = useState(0);
  
  // Mock inventory data
  const inventoryItems: InventoryItem[] = [
    {
      id: "MED-001",
      name: "Acetaminophen 500mg",
      category: "medication",
      currentStock: 250,
      minimumStock: 100,
      unit: "tablet",
      location: "Pharmacy Shelf A1",
      price: 0.15,
      status: "in-stock",
      supplier: "MedSupply Inc",
      lastRestocked: "2023-06-01",
      expiryDate: "2025-06-01"
    },
    {
      id: "MED-002",
      name: "Amoxicillin 250mg",
      category: "medication",
      currentStock: 80,
      minimumStock: 100,
      unit: "capsule",
      location: "Pharmacy Shelf A2",
      price: 0.45,
      status: "low-stock",
      supplier: "PharmGlobal",
      lastRestocked: "2023-05-15",
      expiryDate: "2024-11-15"
    },
    {
      id: "MED-003",
      name: "Lisinopril 10mg",
      category: "medication",
      currentStock: 0,
      minimumStock: 50,
      unit: "tablet",
      location: "Pharmacy Shelf A3",
      price: 0.30,
      status: "out-of-stock",
      supplier: "MedSupply Inc",
      lastRestocked: "2023-04-20",
      expiryDate: "2024-10-20"
    },
    {
      id: "SUP-001",
      name: "Disposable Gloves (Medium)",
      category: "supplies",
      currentStock: 500,
      minimumStock: 200,
      unit: "pair",
      location: "Supply Room B1",
      price: 0.25,
      status: "in-stock",
      supplier: "MedEquip Supplies",
      lastRestocked: "2023-06-05"
    },
    {
      id: "SUP-002",
      name: "Syringes 5ml",
      category: "supplies",
      currentStock: 120,
      minimumStock: 150,
      unit: "piece",
      location: "Supply Room B2",
      price: 0.35,
      status: "low-stock",
      supplier: "MedEquip Supplies",
      lastRestocked: "2023-05-25"
    },
    {
      id: "SUP-003",
      name: "Gauze Bandages",
      category: "supplies",
      currentStock: 30,
      minimumStock: 100,
      unit: "roll",
      location: "Supply Room B3",
      price: 1.20,
      status: "low-stock",
      supplier: "MedEquip Supplies",
      lastRestocked: "2023-05-10"
    },
    {
      id: "EQP-001",
      name: "Digital Thermometer",
      category: "equipment",
      currentStock: 15,
      minimumStock: 10,
      unit: "piece",
      location: "Equipment Room C1",
      price: 25.99,
      status: "in-stock",
      supplier: "MedTech Solutions",
      lastRestocked: "2023-05-20"
    },
    {
      id: "EQP-002",
      name: "Stethoscope",
      category: "equipment",
      currentStock: 8,
      minimumStock: 5,
      unit: "piece",
      location: "Equipment Room C2",
      price: 45.99,
      status: "in-stock",
      supplier: "MedTech Solutions",
      lastRestocked: "2023-04-15"
    },
    {
      id: "LAB-001",
      name: "Blood Collection Tubes",
      category: "lab",
      currentStock: 200,
      minimumStock: 150,
      unit: "box",
      location: "Lab Storage D1",
      price: 15.50,
      status: "in-stock",
      supplier: "LabSupplies Co",
      lastRestocked: "2023-06-10"
    },
    {
      id: "LAB-002",
      name: "Microscope Slides",
      category: "lab",
      currentStock: 50,
      minimumStock: 100,
      unit: "box",
      location: "Lab Storage D2",
      price: 12.99,
      status: "low-stock",
      supplier: "LabSupplies Co",
      lastRestocked: "2023-05-05"
    },
    {
      id: "MED-004",
      name: "Insulin Regular",
      category: "medication",
      currentStock: 40,
      minimumStock: 30,
      unit: "vial",
      location: "Pharmacy Refrigerator",
      price: 25.50,
      status: "on-order",
      supplier: "PharmGlobal",
      lastRestocked: "2023-05-28",
      expiryDate: "2024-05-28"
    }
  ];
  
  // Filter inventory items based on search term and active tab
  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch = 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'low-stock' && (item.status === 'low-stock' || item.status === 'out-of-stock')) ||
      (activeTab === 'medications' && item.category === 'medication') ||
      (activeTab === 'supplies' && item.category === 'supplies') ||
      (activeTab === 'equipment' && item.category === 'equipment');
    
    return matchesSearch && matchesTab;
  });
  
  // Status badge component
  const StatusBadge = ({ status }: { status: StockStatus }) => {
    switch (status) {
      case 'in-stock':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">In Stock</Badge>;
      case 'low-stock':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Low Stock</Badge>;
      case 'out-of-stock':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Out of Stock</Badge>;
      case 'on-order':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">On Order</Badge>;
      default:
        return null;
    }
  };
  
  // Category badge component
  const CategoryBadge = ({ category }: { category: ItemCategory }) => {
    switch (category) {
      case 'medication':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Medication</Badge>;
      case 'supplies':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Supplies</Badge>;
      case 'equipment':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Equipment</Badge>;
      case 'lab':
        return <Badge className="bg-cyan-100 text-cyan-800 hover:bg-cyan-200">Lab</Badge>;
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
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };
  
  // Handle restock item
  const handleRestock = () => {
    if (selectedItem && restockQuantity > 0) {
      toast({
        title: "Item Restocked",
        description: `Added ${restockQuantity} ${selectedItem.unit}(s) of ${selectedItem.name} to inventory.`,
      });
      
      setSelectedItem(null);
      setRestockQuantity(0);
    }
  };
  
  // Handle order item
  const handleOrderItem = () => {
    if (selectedItem) {
      toast({
        title: "Order Placed",
        description: `An order has been placed for ${selectedItem.name}.`,
      });
      
      setSelectedItem(null);
    }
  };
  
  // Handle add new item
  const handleAddItem = () => {
    toast({
      title: "Item Added",
      description: "New item has been added to inventory.",
    });
    
    setShowAddItemDialog(false);
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/inventory/reports')} variant="outline" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Reports
          </Button>
          <Dialog open={showAddItemDialog} onOpenChange={setShowAddItemDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Item</DialogTitle>
                <DialogDescription>
                  Enter details for the new inventory item
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="item-name" className="text-right">
                    Item Name
                  </Label>
                  <Input id="item-name" className="col-span-3" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medication">Medication</SelectItem>
                      <SelectItem value="supplies">Supplies</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="lab">Lab</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    Initial Stock
                  </Label>
                  <Input id="quantity" type="number" className="col-span-3" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="min-stock" className="text-right">
                    Minimum Stock
                  </Label>
                  <Input id="min-stock" type="number" className="col-span-3" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="unit" className="text-right">
                    Unit
                  </Label>
                  <Input id="unit" className="col-span-3" placeholder="e.g., tablet, box, piece" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input id="location" className="col-span-3" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price per Unit
                  </Label>
                  <Input id="price" type="number" step="0.01" className="col-span-3" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="supplier" className="text-right">
                    Supplier
                  </Label>
                  <Input id="supplier" className="col-span-3" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="expiry" className="text-right">
                    Expiry Date
                  </Label>
                  <Input id="expiry" type="date" className="col-span-3" />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddItemDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddItem}>
                  Add Item
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Hospital Inventory</CardTitle>
          <CardDescription>Manage medications, supplies, and equipment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search inventory..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center justify-end">
                <Badge variant="outline" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-yellow-500" />
                  {inventoryItems.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock').length} items need attention
                </Badge>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
                <TabsTrigger value="all">All Items</TabsTrigger>
                <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
                <TabsTrigger value="medications">Medications</TabsTrigger>
                <TabsTrigger value="supplies">Supplies</TabsTrigger>
                <TabsTrigger value="equipment">Equipment</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0">
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Stock</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.id}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>
                            <CategoryBadge category={item.category} />
                          </TableCell>
                          <TableCell className="text-right">
                            {item.currentStock} {item.unit}
                            {item.currentStock < item.minimumStock && (
                              <span className="ml-2 text-yellow-500">
                                <AlertTriangle className="h-4 w-4 inline" />
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                          <TableCell>
                            <StatusBadge status={item.status} />
                          </TableCell>
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setSelectedItem(item)}
                                >
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-lg">
                                <DialogHeader>
                                  <DialogTitle>{item.name}</DialogTitle>
                                  <DialogDescription>
                                    Item ID: {item.id}
                                  </DialogDescription>
                                </DialogHeader>
                                
                                {selectedItem && (
                                  <div className="space-y-6 py-4">
                                    <div className="flex justify-between items-center">
                                      <CategoryBadge category={selectedItem.category} />
                                      <StatusBadge status={selectedItem.status} />
                                    </div>
                                    
                                    <Separator />
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Current Stock</p>
                                        <p>{selectedItem.currentStock} {selectedItem.unit}(s)</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Minimum Stock</p>
                                        <p>{selectedItem.minimumStock} {selectedItem.unit}(s)</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Location</p>
                                        <p>{selectedItem.location}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Price per Unit</p>
                                        <p>{formatCurrency(selectedItem.price)}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Supplier</p>
                                        <p>{selectedItem.supplier}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Last Restocked</p>
                                        <p>{formatDate(selectedItem.lastRestocked)}</p>
                                      </div>
                                      {selectedItem.expiryDate && (
                                        <div>
                                          <p className="text-sm font-medium text-muted-foreground">Expiry Date</p>
                                          <p>{formatDate(selectedItem.expiryDate)}</p>
                                        </div>
                                      )}
                                    </div>
                                    
                                    {(selectedItem.status === 'low-stock' || selectedItem.status === 'out-of-stock') && (
                                      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
                                        <p className="font-medium text-yellow-800 flex items-center gap-2">
                                          <AlertTriangle className="h-4 w-4" />
                                          Low Stock Warning
                                        </p>
                                        <p className="text-yellow-700 mt-1">
                                          Current stock is below the minimum threshold of {selectedItem.minimumStock} {selectedItem.unit}(s).
                                        </p>
                                      </div>
                                    )}
                                    
                                    {selectedItem.category === 'medication' && selectedItem.expiryDate && (
                                      <div className="flex justify-between items-center">
                                        <p className="text-sm text-muted-foreground">
                                          Expires on {formatDate(selectedItem.expiryDate)}
                                        </p>
                                        <div>
                                          {new Date(selectedItem.expiryDate) < new Date(new Date().setMonth(new Date().getMonth() + 3)) && (
                                            <Badge variant="outline" className="bg-red-50 text-red-700">
                                              Expiring Soon
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {(selectedItem.status === 'low-stock' || selectedItem.status === 'out-of-stock') && (
                                      <div className="space-y-4">
                                        <Separator />
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="restock-quantity" className="text-right">
                                            Restock Quantity
                                          </Label>
                                          <Input 
                                            id="restock-quantity" 
                                            type="number" 
                                            className="col-span-3"
                                            value={restockQuantity}
                                            onChange={(e) => setRestockQuantity(parseInt(e.target.value) || 0)}
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                                
                                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                                  {selectedItem?.status === 'low-stock' && (
                                    <>
                                      <Button 
                                        variant="outline" 
                                        className="flex items-center gap-2"
                                        onClick={handleOrderItem}
                                      >
                                        <Clipboard className="h-4 w-4" />
                                        Order More
                                      </Button>
                                      <Button 
                                        className="flex items-center gap-2"
                                        onClick={handleRestock}
                                        disabled={restockQuantity <= 0}
                                      >
                                        <PackagePlus className="h-4 w-4" />
                                        Restock
                                      </Button>
                                    </>
                                  )}
                                  {selectedItem?.status === 'out-of-stock' && (
                                    <Button 
                                      className="flex items-center gap-2"
                                      onClick={handleOrderItem}
                                    >
                                      <Clipboard className="h-4 w-4" />
                                      Place Order
                                    </Button>
                                  )}
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                      
                      {filteredItems.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No inventory items found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const navigate = () => {};

export default Inventory;
