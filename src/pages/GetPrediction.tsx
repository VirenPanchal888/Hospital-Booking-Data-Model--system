
import React, { useState } from 'react';
import { Upload, FileText, AlertTriangle, Check, Download, Stethoscope, Brain, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Mock prediction data - in a real app this would come from an API
const mockPrediction = {
  riskLevel: 'Moderate',
  conditions: [
    { name: 'Diabetes Type 2', probability: 0.65, riskLevel: 'High' },
    { name: 'Hypertension', probability: 0.45, riskLevel: 'Moderate' },
    { name: 'Anemia', probability: 0.15, riskLevel: 'Low' },
  ],
  vitals: [
    { name: 'Blood Glucose', value: '126 mg/dL', status: 'high', normalRange: '70-99 mg/dL' },
    { name: 'Blood Pressure', value: '135/85 mmHg', status: 'moderate', normalRange: '120/80 mmHg' },
    { name: 'Cholesterol', value: '190 mg/dL', status: 'normal', normalRange: '<200 mg/dL' },
    { name: 'BMI', value: '27.5', status: 'moderate', normalRange: '18.5-24.9' },
  ],
  recommendations: [
    "Schedule an appointment with an endocrinologist for diabetes management",
    "Reduce sodium intake to help control blood pressure",
    "Consider a Mediterranean diet rich in whole grains and vegetables",
    "Exercise moderately for 30 minutes at least 5 days a week",
    "Monitor blood glucose levels regularly"
  ]
};

interface UploadState {
  file: File | null;
  preview: string | null;
  isUploading: boolean;
  isProcessing: boolean;
  error: string | null;
}

interface PredictionResult {
  riskLevel: 'High' | 'Moderate' | 'Low' | 'Normal';
  conditions: Array<{
    name: string;
    probability: number;
    riskLevel: 'High' | 'Moderate' | 'Low';
  }>;
  vitals: Array<{
    name: string;
    value: string;
    status: 'high' | 'moderate' | 'normal' | 'low';
    normalRange: string;
  }>;
  recommendations: string[];
}

const GetPrediction: React.FC = () => {
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    preview: null,
    isUploading: false,
    isProcessing: false,
    error: null,
  });
  
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>("conditions");
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset any previous errors
    setUploadState(prev => ({ ...prev, error: null }));

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setUploadState(prev => ({
        ...prev,
        error: 'Please upload a valid file (JPEG, PNG, or PDF)'
      }));
      return;
    }

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadState(prev => ({
        ...prev,
        error: 'File too large. Maximum size is 10MB'
      }));
      return;
    }

    // Create preview for images
    let preview = null;
    if (file.type.startsWith('image/')) {
      preview = URL.createObjectURL(file);
    } else if (file.type === 'application/pdf') {
      preview = '/placeholder.svg'; // PDF placeholder
    }

    setUploadState({
      file,
      preview,
      isUploading: false,
      isProcessing: false,
      error: null,
    });
    
    // Reset any previous prediction
    setPrediction(null);
  };

  const processReport = async () => {
    if (!uploadState.file) return;

    setUploadState(prev => ({
      ...prev,
      isUploading: true,
      error: null
    }));

    try {
      // Simulate uploading process
      await new Promise(resolve => setTimeout(resolve, 1500));

      // File uploaded, now processing
      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        isProcessing: true
      }));

      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Set prediction result (in real app, this would come from API)
      setPrediction(mockPrediction);
      
      // Processing complete
      setUploadState(prev => ({
        ...prev,
        isProcessing: false
      }));

      toast({
        title: "Analysis Complete",
        description: "Your medical report has been successfully analyzed",
      });
    } catch (error) {
      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        isProcessing: false,
        error: 'Failed to process the report. Please try again.'
      }));

      toast({
        variant: "destructive",
        title: "Processing Failed",
        description: "There was an error analyzing your report. Please try again.",
      });
    }
  };

  const handleReset = () => {
    if (uploadState.preview && !uploadState.preview.includes('placeholder')) {
      URL.revokeObjectURL(uploadState.preview);
    }
    
    setUploadState({
      file: null,
      preview: null,
      isUploading: false,
      isProcessing: false,
      error: null,
    });
    
    setPrediction(null);
  };

  const downloadReport = () => {
    // In a real app, this would generate a PDF report with the prediction results
    toast({
      title: "Report Downloaded",
      description: "Your health assessment report has been downloaded",
    });
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'text-red-500';
      case 'moderate': return 'text-amber-500';
      case 'low': return 'text-blue-500';
      default: return 'text-green-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high': return 'text-red-500';
      case 'moderate': return 'text-amber-500';
      case 'low': return 'text-blue-500';
      default: return 'text-green-500';
    }
  };

  const renderProgressBar = (probability: number) => {
    const width = Math.round(probability * 100);
    const bgColor = 
      probability > 0.6 ? 'bg-red-500' : 
      probability > 0.3 ? 'bg-amber-500' : 
      'bg-blue-500';

    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
        <div 
          className={`${bgColor} h-2.5 rounded-full transition-all duration-500 ease-out`} 
          style={{ width: `${width}%` }}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Health Prediction</h2>
          <p className="text-muted-foreground mt-1">
            Upload your medical reports for AI-powered health analysis
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Medical Report
            </CardTitle>
            <CardDescription>
              Upload lab tests, medical reports, or prescriptions for AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!uploadState.file ? (
              <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <Input
                  type="file"
                  className="hidden"
                  id="report-upload"
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.pdf"
                />
                <label htmlFor="report-upload" className="cursor-pointer w-full h-full block">
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="h-10 w-10 text-muted-foreground" />
                    <p className="font-medium">Click to upload or drag and drop</p>
                    <p className="text-sm text-muted-foreground">PDF, JPG or PNG (max. 10MB)</p>
                  </div>
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border rounded-lg p-3">
                  <div className="flex-shrink-0">
                    {uploadState.preview && uploadState.preview.includes('placeholder') ? (
                      <FileText className="h-10 w-10 text-primary" />
                    ) : (
                      <div className="relative h-16 w-16 rounded-md overflow-hidden">
                        {uploadState.preview && (
                          <img 
                            src={uploadState.preview} 
                            alt="Report preview" 
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-medium text-sm truncate">{uploadState.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(uploadState.file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleReset}
                    disabled={uploadState.isUploading || uploadState.isProcessing}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {uploadState.error && (
                  <div className="flex items-center gap-2 text-destructive text-sm">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{uploadState.error}</span>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    className="flex-1"
                    onClick={processReport}
                    disabled={!!uploadState.error || uploadState.isUploading || uploadState.isProcessing}
                  >
                    {uploadState.isUploading ? (
                      'Uploading...'
                    ) : uploadState.isProcessing ? (
                      'Processing...'
                    ) : (
                      'Analyze Report'
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    disabled={uploadState.isUploading || uploadState.isProcessing}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className={cn(
          "lg:col-span-2",
          !prediction && "flex flex-col justify-center items-center p-6 bg-muted/30"
        )}>
          {!prediction ? (
            <div className="text-center p-6">
              <Brain className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No Analysis Results Yet</h3>
              <p className="text-muted-foreground">
                Upload a medical report and click "Analyze Report" to get AI-powered health predictions
              </p>
            </div>
          ) : (
            <>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Stethoscope className="h-5 w-5" />
                      Health Assessment Results
                    </CardTitle>
                    <CardDescription>
                      AI-powered analysis of your medical report
                    </CardDescription>
                  </div>
                  <div className={cn(
                    "px-3 py-1 text-sm font-medium rounded-full",
                    prediction.riskLevel === 'High' ? "bg-red-100 text-red-700" :
                    prediction.riskLevel === 'Moderate' ? "bg-amber-100 text-amber-700" :
                    "bg-green-100 text-green-700"
                  )}>
                    {prediction.riskLevel} Risk
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Conditions Section */}
                <div className="border rounded-lg overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleSection('conditions')}
                  >
                    <h3 className="font-medium">Predicted Health Conditions</h3>
                    {expandedSection === 'conditions' ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                  
                  {expandedSection === 'conditions' && (
                    <div className="p-4 border-t bg-muted/30 space-y-4">
                      {prediction.conditions.map((condition, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{condition.name}</span>
                            <span className={getRiskLevelColor(condition.riskLevel)}>
                              {condition.riskLevel} Risk ({Math.round(condition.probability * 100)}%)
                            </span>
                          </div>
                          {renderProgressBar(condition.probability)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Vitals Section */}
                <div className="border rounded-lg overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleSection('vitals')}
                  >
                    <h3 className="font-medium">Health Metrics</h3>
                    {expandedSection === 'vitals' ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                  
                  {expandedSection === 'vitals' && (
                    <div className="p-4 border-t bg-muted/30">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {prediction.vitals.map((vital, index) => (
                          <div key={index} className="border rounded-lg p-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">{vital.name}</span>
                              <span 
                                className={cn(
                                  "text-xs px-2 py-0.5 rounded-full",
                                  vital.status === 'high' ? "bg-red-100 text-red-700" :
                                  vital.status === 'moderate' ? "bg-amber-100 text-amber-700" :
                                  vital.status === 'low' ? "bg-blue-100 text-blue-700" :
                                  "bg-green-100 text-green-700"
                                )}
                              >
                                {vital.status}
                              </span>
                            </div>
                            <div className="mt-1 flex items-end gap-2">
                              <span className="text-2xl font-semibold">{vital.value}</span>
                              <span className="text-xs text-muted-foreground mb-1">
                                Normal: {vital.normalRange}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Recommendations Section */}
                <div className="border rounded-lg overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleSection('recommendations')}
                  >
                    <h3 className="font-medium">Health Recommendations</h3>
                    {expandedSection === 'recommendations' ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                  
                  {expandedSection === 'recommendations' && (
                    <div className="p-4 border-t bg-muted/30">
                      <ul className="space-y-2">
                        {prediction.recommendations.map((recommendation, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={downloadReport}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Health Report
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>

      {/* Disclaimer */}
      <div className="bg-muted rounded-lg p-4 text-sm">
        <p className="font-medium mb-1">Important Health Disclaimer:</p>
        <p className="text-muted-foreground">
          This AI-powered health prediction tool is designed to assist in understanding medical reports 
          and is not a substitute for professional medical advice. Always consult with healthcare 
          professionals for proper diagnosis and treatment plans.
        </p>
      </div>
    </div>
  );
};

export default GetPrediction;
