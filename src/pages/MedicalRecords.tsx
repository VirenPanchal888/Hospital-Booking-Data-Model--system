
import React, { useState } from 'react';
import { 
  Calendar, 
  ClipboardList, 
  Download, 
  FileText, 
  Filter, 
  MoreHorizontal, 
  PlusCircle, 
  Search, 
  User 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface MedicalRecord {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  recordType: string;
  date: string;
  description: string;
  attachment?: string;
  private?: boolean;
}

// Sample data for medical records
const medicalRecordsData: MedicalRecord[] = [
  {
    id: "MR-2023-001",
    patientName: "Olivia Wilson",
    patientId: "P12345",
    doctorName: "Dr. Jane Smith",
    recordType: "Lab Results",
    date: "2023-03-10",
    description: "Complete blood count results show normal values across all parameters.",
    attachment: "cbc_results.pdf"
  },
  {
    id: "MR-2023-002",
    patientName: "Olivia Wilson",
    patientId: "P12345",
    doctorName: "Dr. Jane Smith",
    recordType: "Prescription",
    date: "2023-03-10",
    description: "Prescribed Lisinopril 10mg once daily for hypertension.",
  },
  {
    id: "MR-2023-003",
    patientName: "James Smith",
    patientId: "P12346",
    doctorName: "Dr. Michael Johnson",
    recordType: "Radiology",
    date: "2023-03-05",
    description: "MRI of the brain shows no significant abnormalities.",
    attachment: "brain_mri.pdf"
  },
  {
    id: "MR-2023-004",
    patientName: "Emma Johnson",
    patientId: "P12347",
    doctorName: "Dr. Sarah Williams",
    recordType: "Vaccination",
    date: "2023-02-20",
    description: "Administered MMR vaccine. No adverse reactions observed.",
  },
  {
    id: "MR-2023-005",
    patientName: "William Brown",
    patientId: "P12348",
    doctorName: "Dr. Robert Brown",
    recordType: "X-Ray",
    date: "2023-03-10",
    description: "X-ray of right wrist shows a non-displaced fracture of the distal radius.",
    attachment: "wrist_xray.pdf",
    private: true
  },
  {
    id: "MR-2023-006",
    patientName: "Sophia Davis",
    patientId: "P12349",
    doctorName: "Dr. Emily Davis",
    recordType: "Consultation",
    date: "2023-03-12",
    description: "Patient presented with mild eczema on both hands. Recommended moisturizing cream and avoiding harsh soaps."
  },
  {
    id: "MR-2023-007",
    patientName: "John Miller",
    patientId: "P12350",
    doctorName: "Dr. James Wilson",
    recordType: "Physical Examination",
    date: "2023-03-15",
    description: "Annual physical examination. All vital signs within normal ranges. Recommended routine blood work."
  },
];

const MedicalRecords = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Filter records based on user role, tab, and search term
  const filteredRecords = medicalRecordsData
    .filter(record => {
      // For patient role, only show their own records
      if (user?.role === 'patient' && record.patientId !== 'P12345') {
        return false;
      }
      
      // For all roles, filter by privacy (doctors and admins can see private records)
      if (record.private && user?.role === 'patient') {
        return false;
      }
      
      // Filter by record type (tab)
      if (activeTab !== 'all' && record.recordType.toLowerCase() !== activeTab) {
        return false;
      }
      
      // Filter by search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          record.patientName.toLowerCase().includes(searchLower) ||
          record.recordType.toLowerCase().includes(searchLower) ||
          record.doctorName.toLowerCase().includes(searchLower) ||
          record.description.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  
  const handleAddRecord = () => {
    toast({
      title: "Add Record",
      description: "Opening new record form"
    });
  };
  
  const handleDownload = (filename: string) => {
    toast({
      title: "Downloading File",
      description: `Downloading ${filename}`
    });
  };
  
  return (
    <div className="animate-slide-in-up">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Medical Records</h1>
          <p className="text-muted-foreground">
            {user?.role === 'patient' 
              ? 'View your medical history and records.'
              : 'Access and manage patient medical records.'}
          </p>
        </div>
        
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search records..."
              className="pl-8 pr-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {(user?.role === 'doctor' || user?.role === 'admin') && (
            <Button className="gap-1" onClick={handleAddRecord}>
              <PlusCircle className="h-4 w-4" />
              <span>Add Record</span>
            </Button>
          )}
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <TabsList>
            <TabsTrigger value="all">All Records</TabsTrigger>
            <TabsTrigger value="lab results">Lab Results</TabsTrigger>
            <TabsTrigger value="prescription">Prescriptions</TabsTrigger>
            <TabsTrigger value="radiology">Radiology</TabsTrigger>
            <TabsTrigger value="consultation">Consultations</TabsTrigger>
          </TabsList>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={() => toast({
              title: "Filter",
              description: "Opening advanced filters"
            })}
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>
        
        <TabsContent value={activeTab}>
          {filteredRecords.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-md border py-10">
              <ClipboardList className="mb-3 h-12 w-12 text-muted-foreground/60" />
              <h3 className="text-lg font-medium">No records found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                No medical records match your current search or filters.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredRecords.map((record) => (
                <Card key={record.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
                  <CardHeader className="border-b bg-muted/30 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{record.recordType}</CardTitle>
                        <CardDescription>
                          {record.date} · {record.id}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white">
                          <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => toast({
                              title: "View Details",
                              description: `Viewing details for record ${record.id}`
                            })}
                          >
                            View Details
                          </DropdownMenuItem>
                          
                          {record.attachment && (
                            <DropdownMenuItem 
                              className="cursor-pointer"
                              onClick={() => handleDownload(record.attachment!)}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                          )}
                          
                          {(user?.role === 'doctor' || user?.role === 'admin') && (
                            <>
                              <DropdownMenuItem 
                                className="cursor-pointer"
                                onClick={() => toast({
                                  title: "Edit Record",
                                  description: `Opening editor for record ${record.id}`
                                })}
                              >
                                Edit Record
                              </DropdownMenuItem>
                              
                              <DropdownMenuSeparator />
                              
                              <DropdownMenuItem 
                                className="cursor-pointer text-red-600"
                                onClick={() => toast({
                                  title: "Delete Record",
                                  description: `Are you sure you want to delete this record?`,
                                  variant: "destructive"
                                })}
                              >
                                Delete Record
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{record.patientName}</div>
                        <div className="text-xs text-muted-foreground">Patient ID: {record.patientId}</div>
                      </div>
                    </div>
                    
                    <div className="mb-3 text-sm text-muted-foreground">
                      <strong>Doctor:</strong> {record.doctorName}
                    </div>
                    
                    <div className="mb-3 rounded-md border bg-muted/30 p-3 text-sm">
                      {record.description}
                    </div>
                    
                    {record.attachment && (
                      <div className="flex items-center justify-between rounded-md border p-2 transition-colors hover:bg-muted/20">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <span className="text-sm">{record.attachment}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7"
                          onClick={() => handleDownload(record.attachment!)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicalRecords;
