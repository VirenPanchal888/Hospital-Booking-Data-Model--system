
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileIcon, Upload, Plus, FileText, Activity } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const GetPrediction = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
      
      toast({
        title: "Files uploaded successfully",
        description: `${newFiles.length} file(s) have been added`,
      });
    }
  };
  
  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };
  
  const analyzeReports = () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No files to analyze",
        description: "Please upload at least one medical report.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    setProgress(0);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setResult(mockPredictionResult);
            toast({
              title: "Analysis complete",
              description: "Your medical reports have been analyzed successfully.",
            });
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };
  
  // Mocked prediction result
  const mockPredictionResult = {
    riskLevel: "Moderate",
    conditions: [
      { name: "Type 2 Diabetes", probability: 0.72, severity: "Moderate" },
      { name: "Hypertension", probability: 0.63, severity: "Mild" },
      { name: "Hyperlipidemia", probability: 0.58, severity: "Moderate" }
    ],
    metrics: [
      { name: "Blood Glucose", value: "148 mg/dL", normal: "70-99 mg/dL", status: "High" },
      { name: "Blood Pressure", value: "135/88 mmHg", normal: "120/80 mmHg", status: "Elevated" },
      { name: "Cholesterol", value: "215 mg/dL", normal: "<200 mg/dL", status: "High" },
      { name: "HDL", value: "42 mg/dL", normal: ">40 mg/dL", status: "Normal" },
      { name: "LDL", value: "140 mg/dL", normal: "<100 mg/dL", status: "High" }
    ],
    recommendations: [
      "Schedule an appointment with an endocrinologist to discuss diabetes management",
      "Consider dietary changes to reduce cholesterol intake",
      "Implement regular blood glucose monitoring",
      "Increase physical activity to at least 150 minutes per week",
      "Follow-up with primary care physician within 2 weeks"
    ]
  };
  
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">AI Health Prediction</h1>
        <p className="text-muted-foreground">
          Upload medical reports and get AI-powered health predictions and recommendations
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Upload Reports</CardTitle>
            <CardDescription>
              Upload medical reports, lab tests, or prescriptions for AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-primary/20 rounded-lg p-8 hover:bg-primary/5 transition-colors cursor-pointer">
              <input
                type="file"
                id="file-upload"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={handleFileUpload}
              />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center space-y-2">
                  <Upload className="h-10 w-10 text-primary/60" />
                  <span className="text-sm font-medium">
                    Drag & drop files or click to browse
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Supports PDF, JPG, JPEG, PNG (max 10MB)
                  </span>
                </div>
              </Label>
            </div>
            
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Uploaded Files ({uploadedFiles.length})</h3>
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-secondary p-2 rounded-md">
                      <div className="flex items-center space-x-2">
                        <FileIcon className="h-4 w-4" />
                        <span className="text-sm truncate max-w-[180px]">{file.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeFile(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={analyzeReports} 
              className="w-full"
              disabled={isAnalyzing || uploadedFiles.length === 0}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Reports"}
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="md:col-span-2">
          {isAnalyzing ? (
            <CardContent className="flex flex-col items-center justify-center space-y-4 min-h-[400px]">
              <div className="w-40 h-40 relative flex items-center justify-center">
                <svg
                  className="animate-spin absolute"
                  width="160"
                  height="160"
                  viewBox="0 0 160 160"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="80"
                    cy="80"
                    r="74"
                    stroke="currentColor"
                    strokeOpacity="0.1"
                    strokeWidth="12"
                  />
                  <path
                    d="M154 80C154 120.869 120.869 154 80 154"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-2xl font-bold">{progress}%</span>
              </div>
              <div className="w-full max-w-md space-y-2">
                <Progress value={progress} />
                <p className="text-center text-sm text-muted-foreground">
                  {progress < 30
                    ? "Extracting data from medical reports..."
                    : progress < 60
                    ? "Processing medical data..."
                    : progress < 90
                    ? "Running AI predictions..."
                    : "Finalizing health assessment..."}
                </p>
              </div>
            </CardContent>
          ) : result ? (
            <Tabs defaultValue="overview" className="w-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Health Prediction Results</CardTitle>
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="metrics">Health Metrics</TabsTrigger>
                    <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>
              <CardContent>
                <TabsContent value="overview" className="space-y-6 mt-0">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10">
                    <div>
                      <h3 className="font-medium">Overall Health Risk</h3>
                      <p className="text-2xl font-bold text-primary">{result.riskLevel}</p>
                    </div>
                    <Activity className="h-12 w-12 text-primary" />
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Potential Health Conditions</h3>
                    <div className="space-y-3">
                      {result.conditions.map((condition: any, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 rounded-lg border"
                        >
                          <div>
                            <p className="font-medium">{condition.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Severity: {condition.severity}
                            </p>
                          </div>
                          <div className="w-14 h-14 rounded-full border-4 border-primary/20 flex items-center justify-center">
                            <span className="text-lg font-bold">
                              {Math.round(condition.probability * 100)}%
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="metrics" className="mt-0">
                  <div className="space-y-4">
                    <h3 className="font-medium mb-2">Health Metrics Analysis</h3>
                    <div className="grid gap-3">
                      {result.metrics.map((metric: any, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-3 rounded-lg border ${
                            metric.status === "High" 
                              ? "bg-red-50 border-red-200" 
                              : metric.status === "Elevated" 
                              ? "bg-amber-50 border-amber-200" 
                              : "bg-green-50 border-green-200"
                          }`}
                        >
                          <div className="flex justify-between">
                            <p className="font-medium">{metric.name}</p>
                            <p className={`text-sm font-medium ${
                              metric.status === "High" 
                                ? "text-red-600" 
                                : metric.status === "Elevated" 
                                ? "text-amber-600" 
                                : "text-green-600"
                            }`}>
                              {metric.status}
                            </p>
                          </div>
                          <div className="flex justify-between mt-1">
                            <p className="text-lg font-bold">{metric.value}</p>
                            <p className="text-sm text-muted-foreground">
                              Normal: {metric.normal}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="recommendations" className="mt-0">
                  <div className="space-y-4">
                    <h3 className="font-medium mb-2">Health Recommendations</h3>
                    <ul className="space-y-2">
                      {result.recommendations.map((recommendation: string, index: number) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2 p-3 rounded-lg border"
                        >
                          <div className="mt-0.5 min-w-4 text-primary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="9 11 12 14 22 4"></polyline>
                              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                            </svg>
                          </div>
                          <span>{recommendation}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <Button className="w-full mt-4">
                      <FileText className="mr-2 h-4 w-4" />
                      Download Full Report
                    </Button>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 p-8 min-h-[400px] text-center">
              <div className="p-4 rounded-full bg-primary/10 text-primary">
                <Activity className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-medium">AI Health Analysis</h3>
              <p className="text-muted-foreground max-w-md">
                Upload your medical reports and our AI will analyze them to predict potential
                health conditions and provide personalized recommendations.
              </p>
              <Button
                variant="outline"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <Plus className="mr-2 h-4 w-4" />
                Upload Reports
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default GetPrediction;
