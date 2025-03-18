
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Animation sequence timing
  useEffect(() => {
    // Show content after logo animation (0.8 seconds)
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 800);

    // Auto-hide splash screen after 4.9 seconds
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
      onComplete();
    }, 4900);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(splashTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setShowSplash(false);
    onComplete();
  };

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-start bg-white dark:bg-slate-900 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo Animation Container */}
          <div className="container max-w-4xl mx-auto px-4 py-12 flex flex-col items-center">
            <div className="relative w-full flex justify-center mb-12">
              {/* Logo Parts Animation */}
              <div className="relative h-[180px] w-[300px]">
                {/* Blue Cross */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="absolute"
                >
                  <img
                    src="/lovable-uploads/d2fc04f5-b46b-4f2e-8ac2-e3be7d23ea14.png"
                    alt="Medical Company Logo"
                    className="h-auto w-[300px]"
                  />
                </motion.div>
                
                {/* Text Animation */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.6,
                    ease: "easeOut"
                  }}
                >
                  {/* The logo already has the text, this div is for additional animation timing */}
                </motion.div>
              </div>
            </div>
            
            {/* Content Animation */}
            <AnimatePresence>
              {showContent && (
                <motion.div
                  className="prose prose-slate dark:prose-invert max-w-none"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.2,
                    ease: "easeOut" 
                  }}
                >
                  <h1 className="text-2xl font-bold text-center mb-6">Our Hospital Application System</h1>
                  
                  <p className="text-slate-700 dark:text-slate-300 mb-6">
                    Our Hospital Application System is designed to streamline healthcare operations, enhance patient care, and ensure compliance with medical policies and standards. The system integrates advanced technology, AI-driven automation, and real-time monitoring to create an efficient, secure, and patient-centric healthcare environment.
                  </p>
                  
                  <h2 className="text-xl font-semibold mt-6 text-primary">🔹 Healthcare Policy & Compliance</h2>
                  <p className="text-slate-700 dark:text-slate-300">
                    Our hospital management system aligns with national and international healthcare policies, ensuring that patient data is managed securely, medical records are maintained accurately, and all operations comply with HIPAA (Health Insurance Portability and Accountability Act) and NABH (National Accreditation Board for Hospitals & Healthcare Providers) guidelines. The system ensures confidentiality, integrity, and availability of patient records through end-to-end encryption, role-based access control, and automated compliance tracking.
                  </p>
                  
                  <h2 className="text-xl font-semibold mt-6 text-primary">🔹 Patient Care & Safety</h2>
                  <p className="text-slate-700 dark:text-slate-300">
                    We prioritize patient safety and quality care by enabling automated appointment scheduling, real-time doctor availability, AI-driven diagnostics, and medication tracking. The system integrates electronic health records (EHR), telemedicine support, and emergency management features, ensuring that patients receive the right treatment at the right time. AI-powered health analytics help doctors predict potential health risks, monitor chronic conditions, and provide data-driven medical recommendations.
                  </p>
                  
                  <h2 className="text-xl font-semibold mt-6 text-primary">🔹 Efficient Hospital Operations & Workflow Automation</h2>
                  <p className="text-slate-700 dark:text-slate-300">
                    The system optimizes hospital workflow management, allowing doctors, nurses, and administrative staff to collaborate efficiently. It includes billing automation, insurance claim processing, real-time inventory tracking, and patient discharge management, reducing paperwork and administrative burdens. The system also integrates with pharmacy and laboratory services, ensuring smooth coordination between departments for timely diagnosis and treatment.
                  </p>
                  
                  <h2 className="text-xl font-semibold mt-6 text-primary">🔹 Digital Transformation in Healthcare</h2>
                  <p className="text-slate-700 dark:text-slate-300">
                    Our HMS leverages AI, machine learning, and IoT (Internet of Things) to create a smart healthcare ecosystem. Features like predictive analytics, AI-assisted medical report analysis, and automated reminders for follow-ups ensure proactive patient care. Patients can book appointments online, access medical reports, and receive personalized healthcare suggestions through a user-friendly interface.
                  </p>
                  
                  <h2 className="text-xl font-semibold mt-6 text-primary">🔹 Future of Smart Healthcare</h2>
                  <p className="text-slate-700 dark:text-slate-300">
                    The future of hospital management lies in the integration of blockchain for secure patient data storage, AI-powered robotic assistance for surgeries, and cloud-based healthcare solutions. Our system is designed to be scalable, adaptable, and future-ready, ensuring hospitals can continuously evolve to meet the growing demands of modern healthcare.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex justify-center mt-8">
              <Button 
                onClick={handleSkip} 
                variant="default" 
                className="px-8 py-2 animate-pulse hover:animate-none"
              >
                Skip
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
