
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Clock, Calendar } from 'lucide-react';

// Define medicine types
interface Medicine {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  prescription: boolean;
  stock: number;
}

// Sample list of medicines (100 items)
const medicineData: Medicine[] = [
  { id: '1', name: 'Acetaminophen', category: 'Pain Relief', description: 'Pain reliever and fever reducer', price: 8.99, prescription: false, stock: 120 },
  { id: '2', name: 'Ibuprofen', category: 'Pain Relief', description: 'Nonsteroidal anti-inflammatory drug', price: 9.49, prescription: false, stock: 85 },
  { id: '3', name: 'Amoxicillin', category: 'Antibiotics', description: 'Treats bacterial infections', price: 15.99, prescription: true, stock: 45 },
  { id: '4', name: 'Lisinopril', category: 'Cardiovascular', description: 'Treats high blood pressure', price: 12.49, prescription: true, stock: 60 },
  { id: '5', name: 'Metformin', category: 'Diabetes', description: 'Controls blood sugar levels', price: 7.99, prescription: true, stock: 92 },
  { id: '6', name: 'Atorvastatin', category: 'Cardiovascular', description: 'Lowers cholesterol', price: 22.99, prescription: true, stock: 55 },
  { id: '7', name: 'Albuterol', category: 'Respiratory', description: 'Bronchodilator for asthma', price: 25.99, prescription: true, stock: 38 },
  { id: '8', name: 'Prednisone', category: 'Anti-inflammatory', description: 'Corticosteroid', price: 11.49, prescription: true, stock: 72 },
  { id: '9', name: 'Omeprazole', category: 'Gastrointestinal', description: 'Treats heartburn and GERD', price: 14.99, prescription: false, stock: 65 },
  { id: '10', name: 'Cetirizine', category: 'Allergy', description: 'Antihistamine', price: 8.99, prescription: false, stock: 110 },
  { id: '11', name: 'Sertraline', category: 'Mental Health', description: 'SSRI antidepressant', price: 18.99, prescription: true, stock: 40 },
  { id: '12', name: 'Levothyroxine', category: 'Hormonal', description: 'Thyroid replacement', price: 12.99, prescription: true, stock: 85 },
  { id: '13', name: 'Simvastatin', category: 'Cardiovascular', description: 'Lowers cholesterol', price: 16.49, prescription: true, stock: 60 },
  { id: '14', name: 'Losartan', category: 'Cardiovascular', description: 'Treats high blood pressure', price: 14.99, prescription: true, stock: 75 },
  { id: '15', name: 'Naproxen', category: 'Pain Relief', description: 'Anti-inflammatory', price: 7.99, prescription: false, stock: 95 },
  // Add more medicines here to reach 100 items
  { id: '16', name: 'Fluoxetine', category: 'Mental Health', description: 'SSRI antidepressant', price: 19.99, prescription: true, stock: 55 },
  { id: '17', name: 'Hydrochlorothiazide', category: 'Cardiovascular', description: 'Diuretic', price: 8.49, prescription: true, stock: 80 },
  { id: '18', name: 'Metoprolol', category: 'Cardiovascular', description: 'Beta blocker', price: 13.99, prescription: true, stock: 65 },
  { id: '19', name: 'Gabapentin', category: 'Neurology', description: 'Anticonvulsant', price: 17.99, prescription: true, stock: 45 },
  { id: '20', name: 'Amlodipine', category: 'Cardiovascular', description: 'Calcium channel blocker', price: 10.99, prescription: true, stock: 70 },
  { id: '21', name: 'Cephalexin', category: 'Antibiotics', description: 'Treats bacterial infections', price: 16.49, prescription: true, stock: 55 },
  { id: '22', name: 'Escitalopram', category: 'Mental Health', description: 'SSRI antidepressant', price: 22.99, prescription: true, stock: 40 },
  { id: '23', name: 'Warfarin', category: 'Cardiovascular', description: 'Anticoagulant', price: 9.99, prescription: true, stock: 60 },
  { id: '24', name: 'Tramadol', category: 'Pain Relief', description: 'Opioid pain medication', price: 13.99, prescription: true, stock: 50 },
  { id: '25', name: 'Montelukast', category: 'Respiratory', description: 'Leukotriene receptor antagonist', price: 21.99, prescription: true, stock: 45 },
  { id: '26', name: 'Pantoprazole', category: 'Gastrointestinal', description: 'Proton pump inhibitor', price: 15.49, prescription: true, stock: 65 },
  { id: '27', name: 'Furosemide', category: 'Cardiovascular', description: 'Diuretic', price: 7.99, prescription: true, stock: 75 },
  { id: '28', name: 'Clonazepam', category: 'Mental Health', description: 'Benzodiazepine', price: 12.99, prescription: true, stock: 40 },
  { id: '29', name: 'Carvedilol', category: 'Cardiovascular', description: 'Alpha/beta blocker', price: 16.99, prescription: true, stock: 55 },
  { id: '30', name: 'Citalopram', category: 'Mental Health', description: 'SSRI antidepressant', price: 18.49, prescription: true, stock: 50 },
  { id: '31', name: 'Venlafaxine', category: 'Mental Health', description: 'SNRI antidepressant', price: 24.99, prescription: true, stock: 35 },
  { id: '32', name: 'Loratadine', category: 'Allergy', description: 'Antihistamine', price: 8.49, prescription: false, stock: 100 },
  { id: '33', name: 'Meloxicam', category: 'Pain Relief', description: 'NSAID', price: 12.99, prescription: true, stock: 60 },
  { id: '34', name: 'Diazepam', category: 'Mental Health', description: 'Benzodiazepine', price: 14.99, prescription: true, stock: 45 },
  { id: '35', name: 'Atenolol', category: 'Cardiovascular', description: 'Beta blocker', price: 9.49, prescription: true, stock: 70 },
  { id: '36', name: 'Duloxetine', category: 'Mental Health', description: 'SNRI antidepressant', price: 26.99, prescription: true, stock: 40 },
  { id: '37', name: 'Ciprofloxacin', category: 'Antibiotics', description: 'Fluoroquinolone antibiotic', price: 18.99, prescription: true, stock: 50 },
  { id: '38', name: 'Ranitidine', category: 'Gastrointestinal', description: 'H2 blocker', price: 10.49, prescription: false, stock: 80 },
  { id: '39', name: 'Fluticasone', category: 'Respiratory', description: 'Corticosteroid inhaler', price: 29.99, prescription: true, stock: 35 },
  { id: '40', name: 'Glipizide', category: 'Diabetes', description: 'Sulfonylurea', price: 11.99, prescription: true, stock: 55 },
  { id: '41', name: 'Trazodone', category: 'Mental Health', description: 'Antidepressant', price: 13.49, prescription: true, stock: 50 },
  { id: '42', name: 'Valacyclovir', category: 'Antiviral', description: 'Treats herpes infections', price: 24.99, prescription: true, stock: 40 },
  { id: '43', name: 'Doxycycline', category: 'Antibiotics', description: 'Tetracycline antibiotic', price: 16.99, prescription: true, stock: 60 },
  { id: '44', name: 'Bupropion', category: 'Mental Health', description: 'Antidepressant', price: 21.49, prescription: true, stock: 45 },
  { id: '45', name: 'Pravastatin', category: 'Cardiovascular', description: 'Statin', price: 18.99, prescription: true, stock: 65 },
  { id: '46', name: 'Tamsulosin', category: 'Urological', description: 'Alpha blocker', price: 19.99, prescription: true, stock: 50 },
  { id: '47', name: 'Famotidine', category: 'Gastrointestinal', description: 'H2 blocker', price: 9.99, prescription: false, stock: 85 },
  { id: '48', name: 'Rosuvastatin', category: 'Cardiovascular', description: 'Statin', price: 25.99, prescription: true, stock: 55 },
  { id: '49', name: 'Propranolol', category: 'Cardiovascular', description: 'Beta blocker', price: 12.49, prescription: true, stock: 60 },
  { id: '50', name: 'Clonidine', category: 'Cardiovascular', description: 'Alpha-2 agonist', price: 10.99, prescription: true, stock: 70 },
  { id: '51', name: 'Methylphenidate', category: 'Mental Health', description: 'CNS stimulant', price: 27.99, prescription: true, stock: 30 },
  { id: '52', name: 'Lamotrigine', category: 'Neurology', description: 'Anticonvulsant', price: 22.49, prescription: true, stock: 45 },
  { id: '53', name: 'Spironolactone', category: 'Cardiovascular', description: 'Potassium-sparing diuretic', price: 15.99, prescription: true, stock: 55 },
  { id: '54', name: 'Amitriptyline', category: 'Mental Health', description: 'Tricyclic antidepressant', price: 11.99, prescription: true, stock: 65 },
  { id: '55', name: 'Valproic Acid', category: 'Neurology', description: 'Anticonvulsant', price: 19.49, prescription: true, stock: 40 },
  { id: '56', name: 'Allopurinol', category: 'Gout', description: 'Xanthine oxidase inhibitor', price: 13.99, prescription: true, stock: 60 },
  { id: '57', name: 'Quetiapine', category: 'Mental Health', description: 'Atypical antipsychotic', price: 28.99, prescription: true, stock: 35 },
  { id: '58', name: 'Hydroxyzine', category: 'Allergy', description: 'Antihistamine', price: 10.49, prescription: true, stock: 70 },
  { id: '59', name: 'Paroxetine', category: 'Mental Health', description: 'SSRI antidepressant', price: 20.99, prescription: true, stock: 45 },
  { id: '60', name: 'Buspirone', category: 'Mental Health', description: 'Anti-anxiety', price: 17.49, prescription: true, stock: 55 },
  { id: '61', name: 'Cyclobenzaprine', category: 'Muscle Relaxant', description: 'Muscle relaxant', price: 12.99, prescription: true, stock: 65 },
  { id: '62', name: 'Fenofibrate', category: 'Cardiovascular', description: 'Lipid-lowering agent', price: 19.99, prescription: true, stock: 50 },
  { id: '63', name: 'Levofloxacin', category: 'Antibiotics', description: 'Fluoroquinolone antibiotic', price: 23.49, prescription: true, stock: 40 },
  { id: '64', name: 'Risperidone', category: 'Mental Health', description: 'Atypical antipsychotic', price: 26.99, prescription: true, stock: 35 },
  { id: '65', name: 'Mirtazapine', category: 'Mental Health', description: 'Tetracyclic antidepressant', price: 21.99, prescription: true, stock: 45 },
  { id: '66', name: 'Topiramate', category: 'Neurology', description: 'Anticonvulsant', price: 24.49, prescription: true, stock: 40 },
  { id: '67', name: 'Doxazosin', category: 'Cardiovascular', description: 'Alpha-1 blocker', price: 16.99, prescription: true, stock: 55 },
  { id: '68', name: 'Tolterodine', category: 'Urological', description: 'Antimuscarinic', price: 22.99, prescription: true, stock: 45 },
  { id: '69', name: 'Oxybutynin', category: 'Urological', description: 'Antimuscarinic', price: 19.49, prescription: true, stock: 50 },
  { id: '70', name: 'Pioglitazone', category: 'Diabetes', description: 'Thiazolidinedione', price: 27.99, prescription: true, stock: 40 },
  { id: '71', name: 'Clindamycin', category: 'Antibiotics', description: 'Lincosamide antibiotic', price: 18.49, prescription: true, stock: 55 },
  { id: '72', name: 'Nitrofurantoin', category: 'Antibiotics', description: 'Urinary antiseptic', price: 15.99, prescription: true, stock: 60 },
  { id: '73', name: 'Olmesartan', category: 'Cardiovascular', description: 'Angiotensin II receptor blocker', price: 23.99, prescription: true, stock: 45 },
  { id: '74', name: 'Valsartan', category: 'Cardiovascular', description: 'Angiotensin II receptor blocker', price: 22.49, prescription: true, stock: 50 },
  { id: '75', name: 'Atomoxetine', category: 'Mental Health', description: 'SNRI for ADHD', price: 29.99, prescription: true, stock: 35 },
  { id: '76', name: 'Terbinafine', category: 'Antifungal', description: 'Treats fungal infections', price: 17.99, prescription: true, stock: 60 },
  { id: '77', name: 'Acyclovir', category: 'Antiviral', description: 'Treats herpes infections', price: 16.49, prescription: true, stock: 65 },
  { id: '78', name: 'Nifedipine', category: 'Cardiovascular', description: 'Calcium channel blocker', price: 14.99, prescription: true, stock: 70 },
  { id: '79', name: 'Ramipril', category: 'Cardiovascular', description: 'ACE inhibitor', price: 13.49, prescription: true, stock: 75 },
  { id: '80', name: 'Gemfibrozil', category: 'Cardiovascular', description: 'Fibrate', price: 18.99, prescription: true, stock: 55 },
  { id: '81', name: 'Benazepril', category: 'Cardiovascular', description: 'ACE inhibitor', price: 15.49, prescription: true, stock: 65 },
  { id: '82', name: 'Glimepiride', category: 'Diabetes', description: 'Sulfonylurea', price: 12.99, prescription: true, stock: 70 },
  { id: '83', name: 'Ketoconazole', category: 'Antifungal', description: 'Treats fungal infections', price: 16.99, prescription: true, stock: 60 },
  { id: '84', name: 'Prazosin', category: 'Cardiovascular', description: 'Alpha-1 blocker', price: 14.49, prescription: true, stock: 65 },
  { id: '85', name: 'Diltiazem', category: 'Cardiovascular', description: 'Calcium channel blocker', price: 17.99, prescription: true, stock: 55 },
  { id: '86', name: 'Promethazine', category: 'Allergy', description: 'Antihistamine', price: 9.99, prescription: true, stock: 75 },
  { id: '87', name: 'Timolol', category: 'Ophthalmology', description: 'Beta blocker eye drops', price: 22.99, prescription: true, stock: 45 },
  { id: '88', name: 'Benzonatate', category: 'Respiratory', description: 'Cough suppressant', price: 13.49, prescription: true, stock: 70 },
  { id: '89', name: 'Dexamethasone', category: 'Anti-inflammatory', description: 'Corticosteroid', price: 15.99, prescription: true, stock: 60 },
  { id: '90', name: 'Methocarbamol', category: 'Muscle Relaxant', description: 'Muscle relaxant', price: 11.99, prescription: true, stock: 75 },
  { id: '91', name: 'Dicyclomine', category: 'Gastrointestinal', description: 'Antispasmodic', price: 14.49, prescription: true, stock: 65 },
  { id: '92', name: 'Methotrexate', category: 'Immunosuppressant', description: 'Treats autoimmune disorders', price: 26.99, prescription: true, stock: 35 },
  { id: '93', name: 'Hydralazine', category: 'Cardiovascular', description: 'Vasodilator', price: 12.99, prescription: true, stock: 60 },
  { id: '94', name: 'Digoxin', category: 'Cardiovascular', description: 'Cardiac glycoside', price: 10.49, prescription: true, stock: 70 },
  { id: '95', name: 'Nabumetone', category: 'Pain Relief', description: 'NSAID', price: 16.99, prescription: true, stock: 55 },
  { id: '96', name: 'Isosorbide', category: 'Cardiovascular', description: 'Nitrate', price: 13.99, prescription: true, stock: 65 },
  { id: '97', name: 'Fexofenadine', category: 'Allergy', description: 'Antihistamine', price: 9.99, prescription: false, stock: 90 },
  { id: '98', name: 'Diphenhydramine', category: 'Allergy', description: 'Antihistamine', price: 7.49, prescription: false, stock: 120 },
  { id: '99', name: 'Bisacodyl', category: 'Gastrointestinal', description: 'Laxative', price: 8.99, prescription: false, stock: 100 },
  { id: '100', name: 'Docusate', category: 'Gastrointestinal', description: 'Stool softener', price: 6.99, prescription: false, stock: 110 },
];

// Define prescription interface
interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'pending';
  doctor: string;
}

// Sample prescriptions for patient view
const samplePrescriptions: Prescription[] = [
  {
    id: '1',
    medicationName: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    startDate: '2023-09-01',
    endDate: '2023-12-01',
    status: 'active',
    doctor: 'Dr. Jane Smith'
  },
  {
    id: '2',
    medicationName: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'Once daily at bedtime',
    startDate: '2023-08-15',
    endDate: '2024-02-15',
    status: 'active',
    doctor: 'Dr. Jane Smith'
  },
  {
    id: '3',
    medicationName: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily with meals',
    startDate: '2023-07-10',
    endDate: '2023-10-10',
    status: 'completed',
    doctor: 'Dr. Michael Chen'
  },
  {
    id: '4',
    medicationName: 'Amoxicillin',
    dosage: '500mg',
    frequency: 'Three times daily',
    startDate: '2023-10-05',
    endDate: '2023-10-15',
    status: 'pending',
    doctor: 'Dr. Sarah Johnson'
  }
];

const Pharmacy: React.FC = () => {
  const { user } = useAuth();
  const isPatient = user?.role === 'patient';
  const isDoctor = user?.role === 'doctor';
  const isAdmin = user?.role === 'admin';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Filter medicines based on search term and category
  const filteredMedicines = medicineData.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        medicine.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || medicine.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories for filter buttons
  const categories = ['all', ...Array.from(new Set(medicineData.map(medicine => medicine.category)))];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pharmacy</h1>
          <p className="text-muted-foreground">
            {isPatient ? 'View medications and your prescriptions' : 
             isDoctor ? 'Manage patient prescriptions and medication inventory' : 
             'Manage pharmacy inventory and orders'}
          </p>
        </div>
      </div>
      
      <Tabs defaultValue={isPatient ? "prescriptions" : "inventory"} className="space-y-4">
        <TabsList>
          {isPatient && <TabsTrigger value="prescriptions">My Prescriptions</TabsTrigger>}
          <TabsTrigger value="inventory">Medication Inventory</TabsTrigger>
          {(isDoctor || isAdmin) && <TabsTrigger value="orders">Orders</TabsTrigger>}
          {isAdmin && <TabsTrigger value="reports">Reports</TabsTrigger>}
        </TabsList>
        
        {/* Patient Prescriptions Tab */}
        {isPatient && (
          <TabsContent value="prescriptions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Prescriptions</CardTitle>
                <CardDescription>Current and past prescriptions assigned by your doctor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {samplePrescriptions.map(prescription => (
                    <div key={prescription.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{prescription.medicationName}</h3>
                          <Badge 
                            variant={prescription.status === 'active' ? 'default' : 
                                   prescription.status === 'completed' ? 'secondary' : 'outline'}
                          >
                            {prescription.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{prescription.dosage}, {prescription.frequency}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {prescription.startDate} to {prescription.endDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Prescribed by {prescription.doctor}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 flex gap-2">
                        <Button variant="outline" size="sm">Refill Request</Button>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
        
        {/* Medication Inventory Tab */}
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle>Medication Inventory</CardTitle>
                  <CardDescription>Browse available medications</CardDescription>
                </div>
                <div className="w-full md:w-auto flex gap-2">
                  <div className="relative w-full md:w-[300px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search medications..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  {isAdmin && <Button>Add Medication</Button>}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="text-sm font-medium mr-2 mt-1">Filter by:</span>
                {categories.map(category => (
                  <Button 
                    key={category} 
                    variant={activeCategory === category ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    className="capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>
              
              <div className="rounded-md border">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {filteredMedicines.slice(0, 12).map((medicine) => (
                    <div key={medicine.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{medicine.name}</h3>
                        {medicine.prescription ? (
                          <Badge variant="outline">Prescription</Badge>
                        ) : (
                          <Badge variant="secondary">OTC</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{medicine.description}</p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="font-medium">${medicine.price.toFixed(2)}</span>
                        {isPatient ? (
                          medicine.prescription ? (
                            <Button variant="outline" size="sm">Request</Button>
                          ) : (
                            <Button variant="outline" size="sm">Add to Cart</Button>
                          )
                        ) : (
                          <div className="text-sm text-muted-foreground">
                            Stock: {medicine.stock}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {filteredMedicines.length > 12 && (
                  <div className="flex justify-center p-4 border-t">
                    <Button variant="outline">Load More</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Orders Tab (Doctor and Admin) */}
        {(isDoctor || isAdmin) && (
          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Medication Orders</CardTitle>
                <CardDescription>Track and manage medication orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="px-4 py-3 border-b flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Filter Orders</span>
                    </div>
                    {isAdmin && <Button size="sm">New Order</Button>}
                  </div>
                  <div className="p-4">
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No recent orders to display</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
        
        {/* Reports Tab (Admin only) */}
        {isAdmin && (
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pharmacy Reports</CardTitle>
                <CardDescription>View analytics and generate reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                    <span className="text-lg font-medium">Inventory Report</span>
                    <span className="text-sm text-muted-foreground">Stock levels and expiry dates</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                    <span className="text-lg font-medium">Sales Report</span>
                    <span className="text-sm text-muted-foreground">Revenue and popular medications</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                    <span className="text-lg font-medium">Prescription Analytics</span>
                    <span className="text-sm text-muted-foreground">Prescription trends and patterns</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                    <span className="text-lg font-medium">Order History</span>
                    <span className="text-sm text-muted-foreground">Past orders and suppliers</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Pharmacy;
