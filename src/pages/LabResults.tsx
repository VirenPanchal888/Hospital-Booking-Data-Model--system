
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from '@/components/ui/separator';
import { Search, Calendar, Download, FileText, Bell, Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

type ResultStatus = 'pending' | 'completed' | 'abnormal' | 'critical';

interface LabTest {
  id: string;
  patientName: string;
  patientId: string;
  testName: string;
  testType: string;
  date: string;
  resultDate: string | null;
  orderedBy: string;
  status: ResultStatus;
  department: string;
  results?: {
    name: string;
    value: string;
    unit: string;
    referenceRange: string;
    flag?: 'normal' | 'low' | 'high' | 'critical';
  }[];
}

const LabResults: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null);
  
  // Mock lab tests data
  const labTests: LabTest[] = [
    {
      id: "LAB-001",
      patientName: "John Doe",
      patientId: "P-12345",
      testName: "Complete Blood Count (CBC)",
      testType: "Hematology",
      date: "2023-06-10",
      resultDate: "2023-06-11",
      orderedBy: "Dr. Jane Smith",
      status: "completed",
      department: "Hematology",
      results: [
        { name: "White Blood Cells (WBC)", value: "7.8", unit: "10^3/μL", referenceRange: "4.5-11.0", flag: "normal" },
        { name: "Red Blood Cells (RBC)", value: "5.2", unit: "10^6/μL", referenceRange: "4.5-5.9", flag: "normal" },
        { name: "Hemoglobin (Hgb)", value: "15.1", unit: "g/dL", referenceRange: "13.5-17.5", flag: "normal" },
        { name: "Hematocrit (Hct)", value: "45", unit: "%", referenceRange: "41-50", flag: "normal" },
        { name: "Platelets", value: "280", unit: "10^3/μL", referenceRange: "150-400", flag: "normal" }
      ]
    },
    {
      id: "LAB-002",
      patientName: "Jane Smith",
      patientId: "P-12346",
      testName: "Comprehensive Metabolic Panel",
      testType: "Chemistry",
      date: "2023-06-15",
      resultDate: "2023-06-16",
      orderedBy: "Dr. Michael Chen",
      status: "abnormal",
      department: "Clinical Chemistry",
      results: [
        { name: "Glucose", value: "110", unit: "mg/dL", referenceRange: "70-99", flag: "high" },
        { name: "BUN", value: "12", unit: "mg/dL", referenceRange: "7-20", flag: "normal" },
        { name: "Creatinine", value: "0.8", unit: "mg/dL", referenceRange: "0.6-1.2", flag: "normal" },
        { name: "Sodium", value: "138", unit: "mmol/L", referenceRange: "136-145", flag: "normal" },
        { name: "Potassium", value: "3.4", unit: "mmol/L", referenceRange: "3.5-5.1", flag: "low" },
        { name: "Chloride", value: "98", unit: "mmol/L", referenceRange: "98-107", flag: "normal" }
      ]
    },
    {
      id: "LAB-003",
      patientName: "Robert Johnson",
      patientId: "P-12347",
      testName: "Lipid Panel",
      testType: "Chemistry",
      date: "2023-06-12",
      resultDate: "2023-06-13",
      orderedBy: "Dr. Sarah Johnson",
      status: "critical",
      department: "Clinical Chemistry",
      results: [
        { name: "Total Cholesterol", value: "280", unit: "mg/dL", referenceRange: "<200", flag: "high" },
        { name: "Triglycerides", value: "300", unit: "mg/dL", referenceRange: "<150", flag: "high" },
        { name: "HDL Cholesterol", value: "30", unit: "mg/dL", referenceRange: ">40", flag: "low" },
        { name: "LDL Cholesterol", value: "190", unit: "mg/dL", referenceRange: "<100", flag: "critical" },
      ]
    },
    {
      id: "LAB-004",
      patientName: "Emily Wilson",
      patientId: "P-12348",
      testName: "Thyroid Function Panel",
      testType: "Endocrinology",
      date: "2023-06-18",
      resultDate: null,
      orderedBy: "Dr. Jane Smith",
      status: "pending",
      department: "Endocrinology"
    },
    {
      id: "LAB-005",
      patientName: "Michael Brown",
      patientId: "P-12349",
      testName: "Urinalysis",
      testType: "Microbiology",
      date: "2023-06-14",
      resultDate: "2023-06-15",
      orderedBy: "Dr. William Davis",
      status: "completed",
      department: "Microbiology",
      results: [
        { name: "Color", value: "Yellow", unit: "", referenceRange: "Yellow", flag: "normal" },
        { name: "Clarity", value: "Clear", unit: "", referenceRange: "Clear", flag: "normal" },
        { name: "pH", value: "6.0", unit: "", referenceRange: "5.0-8.0", flag: "normal" },
        { name: "Specific Gravity", value: "1.020", unit: "", referenceRange: "1.005-1.030", flag: "normal" },
        { name: "Glucose", value: "Negative", unit: "", referenceRange: "Negative", flag: "normal" },
        { name: "Protein", value: "Negative", unit: "", referenceRange: "Negative", flag: "normal" }
      ]
    },
    {
      id: "LAB-006",
      patientName: "Sophia Garcia",
      patientId: "P-12350",
      testName: "COVID-19 PCR Test",
      testType: "Microbiology",
      date: "2023-06-16",
      resultDate: "2023-06-17",
      orderedBy: "Dr. Michael Chen",
      status: "completed",
      department: "Microbiology",
      results: [
        { name: "SARS-CoV-2 RNA", value: "Not Detected", unit: "", referenceRange: "Not Detected", flag: "normal" }
      ]
    }
  ];
  
  // Filter lab tests based on search term and active tab
  const filteredTests = labTests.filter((test) => {
    const matchesSearch = 
      test.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'pending' && test.status === 'pending') ||
      (activeTab === 'completed' && test.status === 'completed') ||
      (activeTab === 'abnormal' && (test.status === 'abnormal' || test.status === 'critical'));
    
    return matchesSearch && matchesTab;
  });
  
  // Status badge component
  const StatusBadge = ({ status }: { status: ResultStatus }) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
      case 'abnormal':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Abnormal</Badge>;
      case 'critical':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Critical</Badge>;
      default:
        return null;
    }
  };
  
  // Value flag component
  const ValueFlag = ({ flag }: { flag?: 'normal' | 'low' | 'high' | 'critical' }) => {
    if (!flag || flag === 'normal') return null;
    
    switch (flag) {
      case 'low':
        return <span className="text-blue-600">↓</span>;
      case 'high':
        return <span className="text-orange-600">↑</span>;
      case 'critical':
        return <span className="text-red-600">⚠️</span>;
      default:
        return null;
    }
  };
  
  // Handle download results
  const handleDownloadResults = () => {
    if (selectedTest) {
      toast({
        title: "Download Started",
        description: `${selectedTest.testName} results are being downloaded.`,
      });
    }
  };
  
  // Handle share results
  const handleShareResults = () => {
    if (selectedTest) {
      toast({
        title: "Share Options",
        description: "A share dialog would open here in a real application.",
      });
    }
  };
  
  // Handle notify patient
  const handleNotifyPatient = () => {
    if (selectedTest) {
      toast({
        title: "Notification Sent",
        description: `${selectedTest.patientName} has been notified about their test results.`,
      });
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Lab Results</h1>
        {user?.role === 'doctor' && (
          <Button onClick={() => navigate('/lab-results/order')}>
            Order New Test
          </Button>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Test Results</CardTitle>
          <CardDescription>View and manage laboratory test results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tests..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="all">All Tests</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="abnormal">Abnormal</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0">
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Test ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Test Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTests.map((test) => (
                        <TableRow key={test.id}>
                          <TableCell className="font-medium">{test.id}</TableCell>
                          <TableCell>
                            <div>
                              <p>{test.patientName}</p>
                              <p className="text-xs text-muted-foreground">{test.patientId}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p>{test.testName}</p>
                              <p className="text-xs text-muted-foreground">{test.testType}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              {new Date(test.date).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={test.status} />
                          </TableCell>
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setSelectedTest(test)}
                                  disabled={test.status === 'pending'}
                                >
                                  {test.status === 'pending' ? 'Pending' : 'View'}
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-3xl">
                                <DialogHeader>
                                  <DialogTitle>{test.testName} Results</DialogTitle>
                                  <DialogDescription>
                                    Test ID: {test.id} | Patient: {test.patientName} ({test.patientId})
                                  </DialogDescription>
                                </DialogHeader>
                                
                                {selectedTest && selectedTest.status !== 'pending' && (
                                  <div className="space-y-6 py-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Ordered By</p>
                                        <p>{selectedTest.orderedBy}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Department</p>
                                        <p>{selectedTest.department}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Test Date</p>
                                        <p>{new Date(selectedTest.date).toLocaleDateString()}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Result Date</p>
                                        <p>{selectedTest.resultDate ? new Date(selectedTest.resultDate).toLocaleDateString() : 'Pending'}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Status</p>
                                        <div className="mt-1">
                                          <StatusBadge status={selectedTest.status} />
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <Separator />
                                    
                                    <div>
                                      <h4 className="font-semibold mb-4">Test Results</h4>
                                      <div className="rounded-md border overflow-hidden">
                                        <Table>
                                          <TableHeader>
                                            <TableRow>
                                              <TableHead>Test</TableHead>
                                              <TableHead>Result</TableHead>
                                              <TableHead>Unit</TableHead>
                                              <TableHead>Reference Range</TableHead>
                                            </TableRow>
                                          </TableHeader>
                                          <TableBody>
                                            {selectedTest.results?.map((result, index) => (
                                              <TableRow key={index}>
                                                <TableCell>{result.name}</TableCell>
                                                <TableCell>
                                                  <span className={`
                                                    ${result.flag === 'low' ? 'text-blue-600' : ''}
                                                    ${result.flag === 'high' ? 'text-orange-600' : ''}
                                                    ${result.flag === 'critical' ? 'text-red-600 font-bold' : ''}
                                                  `}>
                                                    {result.value} <ValueFlag flag={result.flag} />
                                                  </span>
                                                </TableCell>
                                                <TableCell>{result.unit}</TableCell>
                                                <TableCell>{result.referenceRange}</TableCell>
                                              </TableRow>
                                            ))}
                                          </TableBody>
                                        </Table>
                                      </div>
                                    </div>
                                    
                                    {selectedTest.status === 'abnormal' || selectedTest.status === 'critical' ? (
                                      <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
                                        <h4 className="font-semibold text-amber-800">Recommendations</h4>
                                        <p className="text-amber-700 mt-1">
                                          {selectedTest.status === 'critical' 
                                            ? 'Some results are critical. Please consult with your healthcare provider immediately.'
                                            : 'Some results are outside normal ranges. Follow-up may be recommended.'
                                          }
                                        </p>
                                      </div>
                                    ) : null}
                                  </div>
                                )}
                                
                                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                                  <Button 
                                    variant="outline" 
                                    className="flex items-center gap-2"
                                    onClick={handleDownloadResults}
                                  >
                                    <Download className="h-4 w-4" />
                                    Download
                                  </Button>
                                  
                                  {user?.role === 'doctor' && (
                                    <Button 
                                      variant="outline"
                                      className="flex items-center gap-2"
                                      onClick={handleNotifyPatient}
                                    >
                                      <Bell className="h-4 w-4" />
                                      Notify Patient
                                    </Button>
                                  )}
                                  
                                  <Button 
                                    variant="outline"
                                    className="flex items-center gap-2"
                                    onClick={handleShareResults}
                                  >
                                    <Share2 className="h-4 w-4" />
                                    Share
                                  </Button>
                                  
                                  {(selectedTest?.status === 'abnormal' || selectedTest?.status === 'critical') && user?.role === 'doctor' && (
                                    <Button className="flex items-center gap-2">
                                      <FileText className="h-4 w-4" />
                                      Add to Patient Notes
                                    </Button>
                                  )}
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                      
                      {filteredTests.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            No lab tests found.
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

export default LabResults;
