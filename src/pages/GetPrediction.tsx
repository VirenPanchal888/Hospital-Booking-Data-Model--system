
import React, { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { UploadCloud, FileText, AlertTriangle, Check, Download, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Define specific risk level types to avoid TS error
type RiskLevel = 'High' | 'Moderate' | 'Low' | 'Normal';

interface HealthCondition {
  name: string;
  probability: number;
  riskLevel: RiskLevel;
}

interface VitalSign {
  name: string;
  value: string;
  status: string;
  normalRange: string;
}

interface PredictionResult {
  riskLevel: RiskLevel;
  conditions: HealthCondition[];
  vitals: VitalSign[];
  recommendations: string[];
}

const GetPrediction: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPrediction, setShowPrediction] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Default/empty prediction result with proper typing
  const defaultPrediction: PredictionResult = {
    riskLevel: 'Normal',
    conditions: [],
    vitals: [],
    recommendations: []
  };
  
  const [predictionResult, setPredictionResult] = useState<PredictionResult>(defaultPrediction);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check file type
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(selectedFile.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or image file (JPG, PNG)",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      
      setFile(selectedFile);
      setShowPrediction(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setShowPrediction(false);
  };

  const handleAnalyzeReport = () => {
    if (!file) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
    
    // Simulate API call with delay
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      // Mock prediction result with properly typed risk level
      const mockPrediction: PredictionResult = {
        riskLevel: 'Moderate',
        conditions: [
          { name: "Type 2 Diabetes", probability: 0.72, riskLevel: 'High' },
          { name: "Hypertension", probability: 0.45, riskLevel: 'Moderate' },
          { name: "High Cholesterol", probability: 0.68, riskLevel: 'Moderate' },
          { name: "Iron Deficiency Anemia", probability: 0.28, riskLevel: 'Low' }
        ],
        vitals: [
          { name: "Blood Glucose", value: "162 mg/dL", status: "High", normalRange: "70-120 mg/dL" },
          { name: "Blood Pressure", value: "138/88 mmHg", status: "Elevated", normalRange: "120/80 mmHg" },
          { name: "Total Cholesterol", value: "232 mg/dL", status: "High", normalRange: "<200 mg/dL" },
          { name: "HDL Cholesterol", value: "42 mg/dL", status: "Low", normalRange: ">60 mg/dL" },
          { name: "LDL Cholesterol", value: "148 mg/dL", status: "High", normalRange: "<100 mg/dL" },
          { name: "Triglycerides", value: "180 mg/dL", status: "High", normalRange: "<150 mg/dL" },
          { name: "Hemoglobin", value: "11.8 g/dL", status: "Low Normal", normalRange: "12-15.5 g/dL" }
        ],
        recommendations: [
          "Schedule a follow-up appointment with your primary care physician",
          "Consider consulting with an endocrinologist about diabetes management",
          "Reduce sodium intake to help manage blood pressure",
          "Increase physical activity to at least 150 minutes per week",
          "Consider Mediterranean diet to improve cholesterol levels",
          "Monitor blood glucose levels regularly",
          "Increase iron intake through diet or supplements as recommended by your doctor"
        ]
      };
      
      setPredictionResult(mockPrediction);
      setIsProcessing(false);
      setShowPrediction(true);
      setActiveTab('results');
      
      toast({
        title: "Analysis Complete",
        description: "Your medical report has been analyzed successfully",
      });
    }, 3500);
  };

  const handleDownloadReport = () => {
    // In a real app, this would generate a PDF using a library
    toast({
      title: "Report Downloaded",
      description: "Your analysis report has been downloaded",
    });
  };

  return (
    <div className="container mx-auto max-w-4xl py-6 animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight mb-6">AI Health Prediction</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="upload" className="text-sm md:text-base">Upload Report</TabsTrigger>
          <TabsTrigger value="results" disabled={!showPrediction} className="text-sm md:text-base">
            Prediction Results
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="focus:outline-none">
          <Card>
            <CardHeader>
              <CardTitle>Upload Medical Report</CardTitle>
              <CardDescription>
                Upload a medical report for AI analysis and health predictions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center w-full">
                <Label 
                  htmlFor="report-upload" 
                  className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 ${
                    file ? 'border-green-500 bg-green-50/10' : 'border-gray-300 hover:border-primary/50 hover:bg-muted/20'
                  }`}
                >
                  {file ? (
                    <div className="flex flex-col items-center text-center p-4">
                      <FileText className="h-10 w-10 text-primary mb-2" />
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2 text-red-500 hover:text-red-700 hover:bg-red-50/20"
                        onClick={(e) => {
                          e.preventDefault();
                          clearFile();
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center p-4">
                      <UploadCloud className="h-10 w-10 text-muted-foreground mb-2 animate-pulse-soft" />
                      <p className="font-medium">Click to upload or drag and drop</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        PDF, JPG, or PNG (max 10MB)
                      </p>
                    </div>
                  )}
                </Label>
                <input
                  id="report-upload"
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              
              {file && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <Label>Processing Options</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-2">
                        <input type="checkbox" id="extract-text" className="mt-1" defaultChecked />
                        <div>
                          <Label htmlFor="extract-text" className="cursor-pointer">Text Extraction</Label>
                          <p className="text-xs text-muted-foreground">Extract key medical information from the document</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <input type="checkbox" id="analyze-values" className="mt-1" defaultChecked />
                        <div>
                          <Label htmlFor="analyze-values" className="cursor-pointer">Analyze Test Values</Label>
                          <p className="text-xs text-muted-foreground">Compare lab results with standard medical ranges</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-amber-800 text-sm flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Disclaimer</p>
                      <p className="mt-1">
                        AI predictions are not a replacement for professional medical advice. 
                        Always consult with healthcare professionals for diagnosis and treatment.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {file && (
                <Button 
                  onClick={handleAnalyzeReport} 
                  disabled={isProcessing}
                  className="w-full transition-all duration-200 hover:scale-105"
                >
                  {isProcessing ? (
                    <>
                      <span className="mr-2">Processing Report</span>
                      <Progress value={progress} className="w-20 h-2" />
                    </>
                  ) : (
                    "Analyze Report"
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="results" className="focus:outline-none animate-fade-in">
          {showPrediction && (
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Health Risk Assessment</CardTitle>
                    <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                      <Download className="h-4 w-4 mr-1" /> Download Report
                    </Button>
                  </div>
                  <CardDescription>
                    Based on your uploaded medical report dated {new Date().toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Overall Risk Level */}
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Overall Health Risk</h3>
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                        predictionResult.riskLevel === 'High' ? 'bg-red-100 text-red-600' : 
                        predictionResult.riskLevel === 'Moderate' ? 'bg-amber-100 text-amber-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {predictionResult.riskLevel === 'High' ? (
                          <AlertTriangle className="h-5 w-5" />
                        ) : predictionResult.riskLevel === 'Moderate' ? (
                          <AlertTriangle className="h-5 w-5" />
                        ) : (
                          <Check className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-lg">{predictionResult.riskLevel} Risk</p>
                        <p className="text-sm text-muted-foreground">
                          {predictionResult.riskLevel === 'High' ? 
                            'Immediate medical attention recommended' : 
                            predictionResult.riskLevel === 'Moderate' ? 
                              'Medical consultation recommended' : 
                              'Continue with regular check-ups'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Health Conditions */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">Potential Health Conditions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {predictionResult.conditions.map((condition, index) => (
                        <div key={index} className="border rounded-lg p-3 hover:shadow-sm transition-shadow">
                          <div className="flex justify-between items-center mb-2">
                            <p className="font-medium">{condition.name}</p>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              condition.riskLevel === 'High' ? 'bg-red-100 text-red-700' : 
                              condition.riskLevel === 'Moderate' ? 'bg-amber-100 text-amber-700' : 
                              'bg-green-100 text-green-700'
                            }`}>
                              {condition.riskLevel}
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                            <div 
                              className={`h-2 rounded-full ${
                                condition.probability > 0.66 ? 'bg-red-500' : 
                                condition.probability > 0.33 ? 'bg-amber-500' : 
                                'bg-green-500'
                              }`}
                              style={{ width: `${condition.probability * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-right text-muted-foreground">
                            {Math.round(condition.probability * 100)}% probability
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Vital Signs */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">Vital Signs & Lab Results</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted">
                            <th className="text-left p-2 text-sm font-medium">Measurement</th>
                            <th className="text-left p-2 text-sm font-medium">Value</th>
                            <th className="text-left p-2 text-sm font-medium">Status</th>
                            <th className="text-left p-2 text-sm font-medium">Normal Range</th>
                          </tr>
                        </thead>
                        <tbody>
                          {predictionResult.vitals.map((vital, index) => (
                            <tr key={index} className="border-b hover:bg-muted/50 transition-colors">
                              <td className="p-2 text-sm font-medium">{vital.name}</td>
                              <td className="p-2 text-sm">{vital.value}</td>
                              <td className="p-2 text-sm">
                                <span className={`px-2 py-0.5 rounded-full text-xs ${
                                  vital.status === 'High' || vital.status === 'Elevated' ? 'bg-red-100 text-red-700' : 
                                  vital.status === 'Low' ? 'bg-amber-100 text-amber-700' : 
                                  'bg-green-100 text-green-700'
                                }`}>
                                  {vital.status}
                                </span>
                              </td>
                              <td className="p-2 text-sm text-muted-foreground">{vital.normalRange}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Recommendations */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">Recommendations</h3>
                    <ul className="space-y-2">
                      {predictionResult.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-sm">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GetPrediction;
