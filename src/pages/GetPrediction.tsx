
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { FileUpIcon, FilePdfIcon, ImageIcon, DownloadIcon, BookIcon, PulseIcon, BarChartIcon, Brain, HeartPulse, ArrowRight, Loader2 } from 'lucide-react';

const GetPrediction: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState({
    diabetesRisk: 65,
    cholesterolLevel: 'Borderline High',
    bloodPressure: '135/85',
    heartDiseaseRisk: 'Moderate',
    bmi: 26.4,
    anemia: 'Negative',
    liverFunction: 'Normal',
    kidneyFunction: 'Normal'
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    
    // Create a preview if it's an image
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else if (selectedFile.type === 'application/pdf') {
      // For PDFs just show an icon
      setFilePreview(null);
    }
    
    toast({
      title: "File uploaded successfully",
      description: `"${selectedFile.name}" is ready for analysis.`,
    });
  };
  
  const analyzeReport = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a medical report first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setShowResults(true);
            setActiveTab('results');
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };
  
  const downloadReport = () => {
    toast({
      title: "Report downloaded",
      description: "Your AI-generated medical analysis has been downloaded.",
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2">AI Medical Report Analysis</h1>
        <p className="text-muted-foreground">
          Upload your medical reports and get AI-powered health predictions and recommendations
        </p>
      </motion.div>
      
      <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="upload" disabled={isAnalyzing}>
            <FileUpIcon className="mr-2 h-4 w-4" />
            Upload Report
          </TabsTrigger>
          <TabsTrigger value="results" disabled={!showResults}>
            <PulseIcon className="mr-2 h-4 w-4" />
            Analysis Results
          </TabsTrigger>
          <TabsTrigger value="recommendations" disabled={!showResults}>
            <HeartPulse className="mr-2 h-4 w-4" />
            Recommendations
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Medical Report</CardTitle>
              <CardDescription>
                Upload your medical report as image, PDF, or scanned document
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-10 text-center">
                <Input
                  type="file"
                  id="report-upload"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
                <Label htmlFor="report-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center gap-4">
                    {filePreview ? (
                      <div className="w-full max-w-md overflow-hidden rounded-lg">
                        <img src={filePreview} alt="Report preview" className="max-w-full h-auto" />
                      </div>
                    ) : file ? (
                      <FilePdfIcon className="h-16 w-16 text-primary" />
                    ) : (
                      <>
                        <FileUpIcon className="h-12 w-12 text-gray-400" />
                        <div className="space-y-2">
                          <p className="text-lg font-medium">Drag and drop or click to upload</p>
                          <p className="text-sm text-muted-foreground">
                            Support for JPG, PNG, and PDF files
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </Label>
              </div>
              
              {file && (
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {file.type.startsWith('image/') ? (
                        <ImageIcon className="h-8 w-8 text-primary" />
                      ) : (
                        <FilePdfIcon className="h-8 w-8 text-primary" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" onClick={() => {
                      setFile(null);
                      setFilePreview(null);
                    }}>
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                onClick={analyzeReport} 
                disabled={!file || isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Report ({uploadProgress}%)
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Analyze Report
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          {isAnalyzing && (
            <Card>
              <CardHeader>
                <CardTitle>Analysis Progress</CardTitle>
                <CardDescription>
                  Our AI is processing your report
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={uploadProgress} className="h-2" />
                
                <div className="space-y-2">
                  {uploadProgress > 20 && (
                    <p className="text-sm flex items-center gap-2">
                      <span className="text-green-500">✓</span> Extracting text from document
                    </p>
                  )}
                  {uploadProgress > 40 && (
                    <p className="text-sm flex items-center gap-2">
                      <span className="text-green-500">✓</span> Identifying medical terms and values
                    </p>
                  )}
                  {uploadProgress > 60 && (
                    <p className="text-sm flex items-center gap-2">
                      <span className="text-green-500">✓</span> Comparing with medical standards
                    </p>
                  )}
                  {uploadProgress > 80 && (
                    <p className="text-sm flex items-center gap-2">
                      <span className="text-green-500">✓</span> Generating health predictions
                    </p>
                  )}
                  {uploadProgress >= 100 && (
                    <p className="text-sm flex items-center gap-2">
                      <span className="text-green-500">✓</span> Creating personalized recommendations
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Health Analysis Results</CardTitle>
              <CardDescription>
                AI-generated analysis of your medical report
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Key Health Metrics</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <Label>Diabetes Risk</Label>
                        <span className="text-amber-500 font-medium">Moderate Risk</span>
                      </div>
                      <Progress value={analysisResults.diabetesRisk} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <Label>Cholesterol</Label>
                        <span className="text-amber-500 font-medium">{analysisResults.cholesterolLevel}</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <Label>Blood Pressure</Label>
                        <span className="text-amber-500 font-medium">{analysisResults.bloodPressure}</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <Label>Heart Disease Risk</Label>
                        <span className="text-amber-500 font-medium">{analysisResults.heartDiseaseRisk}</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Additional Findings</h3>
                  
                  <div className="bg-muted p-4 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">BMI</span>
                      <span className="text-sm font-medium">{analysisResults.bmi} (Overweight)</span>
                    </div>
                    <Separator />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Anemia</span>
                      <span className="text-sm font-medium text-green-500">{analysisResults.anemia}</span>
                    </div>
                    <Separator />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Liver Function</span>
                      <span className="text-sm font-medium text-green-500">{analysisResults.liverFunction}</span>
                    </div>
                    <Separator />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Kidney Function</span>
                      <span className="text-sm font-medium text-green-500">{analysisResults.kidneyFunction}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30">
                    <h4 className="text-sm font-medium text-amber-800 dark:text-amber-400 mb-2">
                      Potential Concerns Detected
                    </h4>
                    <ul className="text-sm space-y-1 text-amber-700 dark:text-amber-300">
                      <li>• Elevated blood glucose levels</li>
                      <li>• Borderline high blood pressure</li>
                      <li>• Higher than optimal cholesterol levels</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={() => setActiveTab('recommendations')}>
              View Recommendations <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Health Recommendations</CardTitle>
              <CardDescription>
                Based on the AI analysis of your medical report
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                    <HeartPulse className="h-5 w-5" />
                    Medical Recommendations
                  </h3>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Schedule follow-up with endocrinologist to address elevated glucose levels</li>
                    <li>Consider a lipid panel test in 3 months to monitor cholesterol levels</li>
                    <li>Regular blood pressure monitoring twice weekly is advised</li>
                    <li>Discuss with your physician about potential medication adjustments</li>
                  </ul>
                </div>
                
                <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/5">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                    <BarChartIcon className="h-5 w-5 text-green-500" />
                    Lifestyle Adjustments
                  </h3>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Reduce daily carbohydrate intake to 150g or less</li>
                    <li>Implement 30 minutes of moderate exercise at least 5 days a week</li>
                    <li>Increase dietary fiber intake to 25-30g daily</li>
                    <li>Reduce sodium intake to under 2,300mg per day</li>
                    <li>Consider the DASH diet to help manage blood pressure</li>
                  </ul>
                </div>
                
                <div className="p-4 rounded-lg border border-blue-500/20 bg-blue-500/5">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                    <BookIcon className="h-5 w-5 text-blue-500" />
                    Educational Resources
                  </h3>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Visit the American Diabetes Association website for pre-diabetes management</li>
                    <li>Download the "Heart Health" app for blood pressure tracking</li>
                    <li>Join our hospital's free webinar on cholesterol management</li>
                    <li>Read "The DASH Diet Action Plan" for dietary guidance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={downloadReport}>
                <DownloadIcon className="mr-2 h-4 w-4" />
                Download Full Report
              </Button>
              
              <Button onClick={() => {
                toast({
                  title: "Appointment Recommended",
                  description: "Based on your results, we recommend booking an appointment with a specialist.",
                });
              }}>
                Book Appointment with Specialist
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GetPrediction;
