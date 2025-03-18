
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { FileDown, FileText, BarChart3, FileSpreadsheet, Calendar, RefreshCw, Filter, Columns, DollarSign, Users, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ReportBuilder: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [department, setDepartment] = useState('');
  const [reportName, setReportName] = useState('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  
  // Data for chart preview
  const chartData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
  ];
  
  const pieData = [
    { name: 'Cardiology', value: 35 },
    { name: 'Neurology', value: 20 },
    { name: 'Pediatrics', value: 15 },
    { name: 'Oncology', value: 18 },
    { name: 'Others', value: 12 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];
  
  // Mock report template data
  const reportTemplates = [
    { id: "TPL-001", name: "Monthly Revenue Report", type: "finance" },
    { id: "TPL-002", name: "Patient Demographics", type: "patients" },
    { id: "TPL-003", name: "Department Performance", type: "performance" },
    { id: "TPL-004", name: "Resource Utilization", type: "resource" },
    { id: "TPL-005", name: "Staff Productivity", type: "staff" },
  ];
  
  // Mock department data
  const departments = [
    { id: "DEPT-001", name: "All Departments" },
    { id: "DEPT-002", name: "Cardiology" },
    { id: "DEPT-003", name: "Neurology" },
    { id: "DEPT-004", name: "Pediatrics" },
    { id: "DEPT-005", name: "Oncology" },
    { id: "DEPT-006", name: "Emergency" },
    { id: "DEPT-007", name: "Surgery" },
    { id: "DEPT-008", name: "Radiology" },
  ];
  
  // Mock column options
  const columnOptions = [
    { id: "COL-001", name: "Date", category: "common" },
    { id: "COL-002", name: "Department", category: "common" },
    { id: "COL-003", name: "Patient Count", category: "patients" },
    { id: "COL-004", name: "Revenue", category: "finance" },
    { id: "COL-005", name: "Expenses", category: "finance" },
    { id: "COL-006", name: "Profit Margin", category: "finance" },
    { id: "COL-007", name: "Average Visit Duration", category: "performance" },
    { id: "COL-008", name: "Staff Count", category: "staff" },
    { id: "COL-009", name: "Bed Utilization", category: "resource" },
    { id: "COL-010", name: "Equipment Usage", category: "resource" },
    { id: "COL-011", name: "Patient Satisfaction", category: "performance" },
    { id: "COL-012", name: "Readmission Rate", category: "performance" },
  ];
  
  // Mock report data
  const reportData = [
    { 
      date: "2023-06-01", 
      department: "Cardiology", 
      patientCount: 45, 
      revenue: "$12,540", 
      expenses: "$8,200", 
      profitMargin: "34.6%", 
      avgVisitDuration: "42 min", 
      staffCount: 12, 
      bedUtilization: "75%", 
      equipmentUsage: "68%", 
      patientSatisfaction: "4.2/5", 
      readmissionRate: "3.2%"
    },
    { 
      date: "2023-06-01", 
      department: "Neurology", 
      patientCount: 32, 
      revenue: "$9,850", 
      expenses: "$6,400", 
      profitMargin: "35.0%", 
      avgVisitDuration: "55 min", 
      staffCount: 9, 
      bedUtilization: "68%", 
      equipmentUsage: "72%", 
      patientSatisfaction: "4.4/5", 
      readmissionRate: "2.8%"
    },
    { 
      date: "2023-06-01", 
      department: "Pediatrics", 
      patientCount: 38, 
      revenue: "$7,920", 
      expenses: "$5,100", 
      profitMargin: "35.6%", 
      avgVisitDuration: "35 min", 
      staffCount: 11, 
      bedUtilization: "62%", 
      equipmentUsage: "58%", 
      patientSatisfaction: "4.6/5", 
      readmissionRate: "1.5%"
    },
    { 
      date: "2023-06-01", 
      department: "Oncology", 
      patientCount: 28, 
      revenue: "$15,750", 
      expenses: "$10,200", 
      profitMargin: "35.2%", 
      avgVisitDuration: "65 min", 
      staffCount: 14, 
      bedUtilization: "82%", 
      equipmentUsage: "76%", 
      patientSatisfaction: "4.3/5", 
      readmissionRate: "4.2%"
    },
    { 
      date: "2023-06-01", 
      department: "Emergency", 
      patientCount: 68, 
      revenue: "$18,920", 
      expenses: "$12,500", 
      profitMargin: "33.9%", 
      avgVisitDuration: "120 min", 
      staffCount: 22, 
      bedUtilization: "88%", 
      equipmentUsage: "92%", 
      patientSatisfaction: "3.9/5", 
      readmissionRate: "5.1%"
    },
  ];
  
  // Handler for column selection
  const handleColumnSelect = (columnId: string) => {
    setSelectedColumns(prev => {
      if (prev.includes(columnId)) {
        return prev.filter(id => id !== columnId);
      } else {
        return [...prev, columnId];
      }
    });
  };
  
  // Get column name by ID
  const getColumnName = (columnId: string) => {
    return columnOptions.find(col => col.id === columnId)?.name || '';
  };
  
  // Load template handler
  const handleLoadTemplate = (templateId: string) => {
    const template = reportTemplates.find(t => t.id === templateId);
    
    if (template) {
      setReportName(`${template.name} - ${new Date().toLocaleDateString()}`);
      setReportType(template.type);
      setDateRange('last-month');
      setDepartment('DEPT-001');
      
      // Set columns based on template type
      let columns: string[] = [];
      
      switch (template.type) {
        case 'finance':
          columns = columnOptions
            .filter(col => col.category === 'common' || col.category === 'finance')
            .map(col => col.id);
          break;
        case 'patients':
          columns = columnOptions
            .filter(col => col.category === 'common' || col.category === 'patients')
            .map(col => col.id);
          break;
        case 'performance':
          columns = columnOptions
            .filter(col => col.category === 'common' || col.category === 'performance')
            .map(col => col.id);
          break;
        case 'resource':
          columns = columnOptions
            .filter(col => col.category === 'common' || col.category === 'resource')
            .map(col => col.id);
          break;
        case 'staff':
          columns = columnOptions
            .filter(col => col.category === 'common' || col.category === 'staff')
            .map(col => col.id);
          break;
        default:
          columns = columnOptions.slice(0, 5).map(col => col.id);
      }
      
      setSelectedColumns(columns);
      
      toast({
        title: "Template Loaded",
        description: `'${template.name}' template has been loaded.`,
      });
    }
  };
  
  // Generate report handler
  const handleGenerateReport = () => {
    if (!reportName || !reportType || !dateRange || !department || selectedColumns.length === 0) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields and select at least one column.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
      
      toast({
        title: "Report Generated",
        description: `'${reportName}' has been generated successfully.`,
      });
    }, 2000);
  };
  
  // Export report handler
  const handleExportReport = (format: 'pdf' | 'excel' | 'csv') => {
    toast({
      title: "Report Exported",
      description: `'${reportName}' has been exported as ${format.toUpperCase()}.`,
    });
  };
  
  // Reset form handler
  const handleResetForm = () => {
    setReportType('');
    setDateRange('');
    setDepartment('');
    setReportName('');
    setSelectedColumns([]);
    setReportGenerated(false);
    
    toast({
      title: "Form Reset",
      description: "Report builder form has been reset.",
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Report Builder</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate('/analytics')}
            className="flex items-center gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            View Analytics
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Configuration</CardTitle>
              <CardDescription>Define the parameters for your custom report</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="report-name">Report Name</Label>
                  <Input 
                    id="report-name" 
                    placeholder="Enter report name"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="report-type">Report Type</Label>
                    <Select value={reportType} onValueChange={setReportType}>
                      <SelectTrigger id="report-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="finance">Financial Report</SelectItem>
                        <SelectItem value="patients">Patient Statistics</SelectItem>
                        <SelectItem value="performance">Performance Metrics</SelectItem>
                        <SelectItem value="resource">Resource Utilization</SelectItem>
                        <SelectItem value="staff">Staff Analysis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="date-range">Date Range</Label>
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger id="date-range">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="this-week">This Week</SelectItem>
                        <SelectItem value="this-month">This Month</SelectItem>
                        <SelectItem value="last-month">Last Month</SelectItem>
                        <SelectItem value="last-quarter">Last Quarter</SelectItem>
                        <SelectItem value="year-to-date">Year to Date</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select value={department} onValueChange={setDepartment}>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label>Select Columns</Label>
                  <ScrollArea className="h-40 rounded-md border mt-2 p-4">
                    <div className="space-y-4">
                      {columnOptions.map((column) => (
                        <div key={column.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={column.id}
                            checked={selectedColumns.includes(column.id)}
                            onCheckedChange={() => handleColumnSelect(column.id)}
                          />
                          <Label
                            htmlFor={column.id}
                            className="text-sm font-normal flex items-center gap-2"
                          >
                            {column.name}
                            <Badge variant="outline" className="text-xs">
                              {column.category}
                            </Badge>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={handleResetForm}
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reset
                  </Button>
                  <Button
                    className="flex items-center gap-2"
                    onClick={handleGenerateReport}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4" />
                        Generate Report
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {reportGenerated && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Report Results</CardTitle>
                  <CardDescription>Generated report based on your parameters</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleExportReport('pdf')}
                  >
                    <FileText className="h-3.5 w-3.5" />
                    PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleExportReport('excel')}
                  >
                    <FileSpreadsheet className="h-3.5 w-3.5" />
                    Excel
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleExportReport('csv')}
                  >
                    <FileDown className="h-3.5 w-3.5" />
                    CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {selectedColumns.map(colId => (
                          <TableHead key={colId}>{getColumnName(colId)}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reportData.map((row, idx) => (
                        <TableRow key={idx}>
                          {selectedColumns.map(colId => {
                            const colName = getColumnName(colId).toLowerCase().replace(/\s+/g, '');
                            const keyName = Object.keys(row).find(key => key.toLowerCase() === colName) || '';
                            return (
                              <TableCell key={`${idx}-${colId}`}>{keyName ? row[keyName as keyof typeof row] : ''}</TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Charts based on report type */}
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold">Data Visualization</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Trend Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                              data={chartData}
                              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Distribution by Department</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {pieData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>Use pre-defined templates for quick reporting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportTemplates.map(template => (
                  <div key={template.id} className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center gap-3">
                      {template.type === 'finance' && <DollarSign className="h-5 w-5 text-green-600" />}
                      {template.type === 'patients' && <Users className="h-5 w-5 text-blue-600" />}
                      {template.type === 'performance' && <Activity className="h-5 w-5 text-purple-600" />}
                      {template.type === 'resource' && <Columns className="h-5 w-5 text-amber-600" />}
                      {template.type === 'staff' && <Users className="h-5 w-5 text-cyan-600" />}
                      <div>
                        <p className="font-medium">{template.name}</p>
                        <p className="text-xs text-muted-foreground">{template.type} report</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleLoadTemplate(template.id)}
                    >
                      Load
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Report Options</CardTitle>
              <CardDescription>Configure additional report settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-charts" />
                  <Label htmlFor="include-charts">Include Charts and Graphs</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-summary" />
                  <Label htmlFor="include-summary">Include Executive Summary</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="compare-previous" />
                  <Label htmlFor="compare-previous">Compare with Previous Period</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="schedule-recurring" />
                  <Label htmlFor="schedule-recurring">Schedule as Recurring Report</Label>
                </div>
                
                <Separator />
                
                <div>
                  <Label htmlFor="report-format">Preferred Export Format</Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger id="report-format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="csv">CSV File</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="report-sharing">Sharing Options</Label>
                  <Select defaultValue="none">
                    <SelectTrigger id="report-sharing">
                      <SelectValue placeholder="Select sharing option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No sharing</SelectItem>
                      <SelectItem value="email">Email Report</SelectItem>
                      <SelectItem value="department">Share with Department</SelectItem>
                      <SelectItem value="all">Share with All Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Your recently generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-md hover:bg-accent/5 transition-colors">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Monthly Revenue Report</p>
                      <p className="text-xs text-muted-foreground">June 15, 2023</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <FileDown className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-2 rounded-md hover:bg-accent/5 transition-colors">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Patient Demographics</p>
                      <p className="text-xs text-muted-foreground">June 10, 2023</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <FileDown className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-2 rounded-md hover:bg-accent/5 transition-colors">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Staff Performance Q2</p>
                      <p className="text-xs text-muted-foreground">June 5, 2023</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <FileDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;
