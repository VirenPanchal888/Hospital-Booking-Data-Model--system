
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Medicine {
  id: string;
  name: string;
  category: string;
  stock: number;
  dosage: string;
  price: number;
  prescription: boolean;
}

// Generate a list of 100 medicines with prescriptions
const generateMedicines = (): Medicine[] => {
  const categories = ['Analgesic', 'Antibiotic', 'Antiviral', 'Antifungal', 'Antihistamine', 'Antidepressant', 'Antipsychotic', 'Antihypertensive', 'Cardiovascular', 'Dermatological'];
  const dosages = ['500mg', '250mg', '100mg', '50mg', '20mg', '10mg', '5mg', '2.5mg', '1mg', '0.5mg'];
  
  return Array.from({ length: 100 }, (_, index) => {
    const id = (index + 1).toString().padStart(3, '0');
    const name = `Medicine-${id}`;
    const category = categories[Math.floor(Math.random() * categories.length)];
    const stock = Math.floor(Math.random() * 100) + 1;
    const dosage = dosages[Math.floor(Math.random() * dosages.length)];
    const price = parseFloat((Math.random() * 100 + 5).toFixed(2));
    const prescription = Math.random() > 0.5;
    
    return {
      id,
      name,
      category,
      stock,
      dosage,
      price,
      prescription
    };
  });
};

const Pharmacy: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [medicines, setMedicines] = useState<Medicine[]>(generateMedicines());
  const [activeTab, setActiveTab] = useState('all');
  const { user } = useAuth();
  
  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.id.includes(searchTerm);
    
    if (activeTab === 'all') {
      return matchesSearch;
    } else if (activeTab === 'prescription') {
      return matchesSearch && medicine.prescription;
    } else {
      return matchesSearch && !medicine.prescription;
    }
  });
  
  const isDoctor = user?.role === 'doctor';
  const isPatient = user?.role === 'patient';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Pharmacy</h1>
        
        {isDoctor && (
          <Button>Order Medications</Button>
        )}
      </div>
      
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search medicines..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Medicines</TabsTrigger>
          <TabsTrigger value="prescription">Prescription Only</TabsTrigger>
          <TabsTrigger value="over-counter">Over-the-Counter</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pharmacy Inventory</CardTitle>
              <CardDescription>
                Browse our complete inventory of medications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Medicine Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Dosage</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Prescription</TableHead>
                      {isDoctor && <TableHead className="text-right">Actions</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMedicines.length > 0 ? (
                      filteredMedicines.map((medicine) => (
                        <TableRow key={medicine.id}>
                          <TableCell>{medicine.id}</TableCell>
                          <TableCell>{medicine.name}</TableCell>
                          <TableCell>{medicine.category}</TableCell>
                          <TableCell>{medicine.dosage}</TableCell>
                          <TableCell>
                            <Badge variant={medicine.stock > 20 ? "outline" : "destructive"}>
                              {medicine.stock}
                            </Badge>
                          </TableCell>
                          <TableCell>${medicine.price.toFixed(2)}</TableCell>
                          <TableCell>
                            {medicine.prescription ? (
                              <Badge>Prescription</Badge>
                            ) : (
                              <Badge variant="outline">OTC</Badge>
                            )}
                          </TableCell>
                          {isDoctor && (
                            <TableCell className="text-right">
                              <Button size="sm" variant="outline">Prescribe</Button>
                            </TableCell>
                          )}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={isDoctor ? 8 : 7} className="text-center">
                          No medicines found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredMedicines.length} of {medicines.length} medications
              </p>
              
              {isPatient && (
                <Button>Request Prescription</Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="prescription" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Prescription-Only Medications</CardTitle>
              <CardDescription>
                These medications require a valid prescription from a doctor
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Same table structure as above, but filtered for prescription medicines */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Medicine Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Dosage</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Price</TableHead>
                      {isDoctor && <TableHead className="text-right">Actions</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMedicines.length > 0 ? (
                      filteredMedicines.map((medicine) => (
                        <TableRow key={medicine.id}>
                          <TableCell>{medicine.id}</TableCell>
                          <TableCell>{medicine.name}</TableCell>
                          <TableCell>{medicine.category}</TableCell>
                          <TableCell>{medicine.dosage}</TableCell>
                          <TableCell>
                            <Badge variant={medicine.stock > 20 ? "outline" : "destructive"}>
                              {medicine.stock}
                            </Badge>
                          </TableCell>
                          <TableCell>${medicine.price.toFixed(2)}</TableCell>
                          {isDoctor && (
                            <TableCell className="text-right">
                              <Button size="sm" variant="outline">Prescribe</Button>
                            </TableCell>
                          )}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={isDoctor ? 7 : 6} className="text-center">
                          No medicines found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="over-counter" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Over-the-Counter Medications</CardTitle>
              <CardDescription>
                These medications are available without a prescription
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Same table structure as above, but filtered for OTC medicines */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Medicine Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Dosage</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMedicines.length > 0 ? (
                      filteredMedicines.map((medicine) => (
                        <TableRow key={medicine.id}>
                          <TableCell>{medicine.id}</TableCell>
                          <TableCell>{medicine.name}</TableCell>
                          <TableCell>{medicine.category}</TableCell>
                          <TableCell>{medicine.dosage}</TableCell>
                          <TableCell>
                            <Badge variant={medicine.stock > 20 ? "outline" : "destructive"}>
                              {medicine.stock}
                            </Badge>
                          </TableCell>
                          <TableCell>${medicine.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">Purchase</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center">
                          No medicines found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Pharmacy;
