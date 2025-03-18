
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const PaymentProcessing: React.FC = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<'processing' | 'success'>('processing');
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulate payment processing with progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStage('success');
          return 100;
        }
        return prev + 5;
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, []);
  
  // Animation variants for the progress bar
  const progressVariants = {
    initial: { width: 0 },
    animate: { width: `${progress}%`, transition: { duration: 0.5 } }
  };
  
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {stage === 'processing' ? 'Processing Payment' : 'Payment Successful'}
          </CardTitle>
          <CardDescription>
            {stage === 'processing' 
              ? 'Please wait while we process your payment...'
              : 'Your payment has been processed successfully!'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {stage === 'processing' ? (
            <div className="space-y-4">
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  variants={progressVariants}
                  initial="initial"
                  animate="animate"
                />
              </div>
              
              <div className="text-center text-sm text-muted-foreground">
                <p>Processing payment details...</p>
                <p>This may take a few moments.</p>
              </div>
              
              <div className="flex flex-col space-y-2 text-center">
                <p className="text-muted-foreground text-sm">Transaction ID: TX-928734</p>
                <p className="text-muted-foreground text-sm">Amount: $320.00</p>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              
              <div className="text-center space-y-2">
                <p className="font-medium">Invoice INV-002 has been paid</p>
                <p className="text-muted-foreground">Transaction ID: TX-928734</p>
                <p className="text-muted-foreground">Amount: $320.00</p>
                <p className="text-muted-foreground">Payment Method: Credit Card (****1234)</p>
                <p className="text-muted-foreground">Date: {new Date().toLocaleDateString()}</p>
              </div>
            </motion.div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center">
          {stage === 'success' && (
            <div className="space-x-4">
              <Button onClick={() => navigate('/invoices')}>
                View Invoices
              </Button>
              <Button variant="outline" onClick={() => navigate('/')}>
                Return to Dashboard
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentProcessing;
