
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, Calendar, ChartPieIcon, ClipboardCheck, Heart, LucideIcon, Pill, Shield, Stethoscope, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

const Feature: React.FC<FeatureProps> = ({ icon: Icon, title, description, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className={`relative rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md ${className || ''}`}
  >
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="mb-2 text-xl font-semibold">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

const TestimonialCard: React.FC<{ quote: string; author: string; role: string }> = ({ quote, author, role }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="rounded-xl bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md"
  >
    <div className="mb-4 text-4xl text-primary/30">"</div>
    <p className="mb-6 italic text-card-foreground">{quote}</p>
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-primary/20 text-center leading-10 text-primary">
        {author.split(' ').map(name => name[0]).join('')}
      </div>
      <div>
        <p className="font-medium">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  </motion.div>
);

const StatCard: React.FC<{ value: string; label: string; icon: LucideIcon; color: string }> = ({ value, label, icon: Icon, color }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    viewport={{ once: true }}
    className="relative overflow-hidden rounded-xl bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md"
  >
    <div className={`absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full ${color} opacity-20`}></div>
    <Icon className={`mb-4 h-8 w-8 ${color}`} />
    <h3 className="text-3xl font-bold">{value}</h3>
    <p className="text-muted-foreground">{label}</p>
  </motion.div>
);

const Index: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="relative space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent dark:from-blue-950/30"></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 space-y-6 text-center lg:text-left"
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Next-Generation <span className="text-primary">Healthcare</span> Management
              </h1>
              <p className="text-xl text-muted-foreground">
                A comprehensive solution that combines AI technology with healthcare expertise to streamline hospital operations and enhance patient care.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {user ? (
                  <Button asChild size="lg" className="gap-2">
                    <Link to="/dashboard">
                      Go to Dashboard <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild size="lg" className="gap-2">
                      <Link to="/login">
                        Get Started <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link to="/register">Create Account</Link>
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1"
            >
              <div className="relative">
                <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-primary/20 lg:-left-10 lg:-top-10"></div>
                <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-secondary/30 lg:-bottom-10 lg:-right-10"></div>
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img 
                    src="/lovable-uploads/6dda8748-6687-4f1a-9905-e933692928dc.png" 
                    alt="Hospital Management System" 
                    className="w-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Trusted by Healthcare Providers Worldwide
        </motion.h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            value="500+" 
            label="Hospitals" 
            icon={Stethoscope} 
            color="text-blue-500" 
          />
          <StatCard 
            value="10,000+" 
            label="Healthcare Professionals" 
            icon={Users} 
            color="text-green-500" 
          />
          <StatCard 
            value="2M+" 
            label="Patients Served" 
            icon={Heart} 
            color="text-red-500" 
          />
          <StatCard 
            value="99.9%" 
            label="System Uptime" 
            icon={Shield} 
            color="text-purple-500" 
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 max-w-3xl"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Comprehensive Features for Modern Healthcare
          </h2>
          <p className="text-xl text-muted-foreground">
            Our platform combines cutting-edge technology with intuitive design to create
            a seamless experience for all healthcare stakeholders.
          </p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Feature 
            icon={Calendar}
            title="Smart Scheduling"
            description="AI-driven appointment scheduling that optimizes doctor availability and reduces patient wait times."
            className="bg-blue-50 dark:bg-blue-950/30"
          />
          <Feature 
            icon={ClipboardCheck}
            title="Electronic Health Records"
            description="Secure, centralized patient records with instant access for authorized healthcare providers."
            className="bg-green-50 dark:bg-green-950/30"
          />
          <Feature 
            icon={ChartPieIcon}
            title="Advanced Analytics"
            description="Comprehensive dashboards and reports to track hospital performance and patient outcomes."
            className="bg-purple-50 dark:bg-purple-950/30"
          />
          <Feature 
            icon={Pill}
            title="Pharmacy Management"
            description="Streamlined medication management with inventory tracking and digital prescriptions."
            className="bg-amber-50 dark:bg-amber-950/30"
          />
          <Feature 
            icon={Stethoscope}
            title="Telemedicine"
            description="Integrated virtual consultations that extend care beyond hospital walls."
            className="bg-red-50 dark:bg-red-950/30"
          />
          <Feature 
            icon={Shield}
            title="Secure & Compliant"
            description="Enterprise-grade security and compliance with healthcare regulations."
            className="bg-indigo-50 dark:bg-indigo-950/30"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl"
        >
          What Healthcare Professionals Say
        </motion.h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <TestimonialCard 
            quote="This platform has revolutionized our hospital operations. We've seen a 40% reduction in administrative work since implementation."
            author="Dr. Sarah Chen"
            role="Chief Medical Officer"
          />
          <TestimonialCard 
            quote="The AI-assisted diagnosis tools have been invaluable for confirming complex cases and providing additional confidence in our treatment plans."
            author="Dr. James Wilson"
            role="Cardiologist"
          />
          <TestimonialCard 
            quote="As a nurse, the medication management system has made my job significantly easier and reduced potential errors."
            author="Emily Rodriguez"
            role="Head Nurse, ICU"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary/70 p-8 text-white shadow-lg sm:p-12 lg:p-16"
        >
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to Transform Your Healthcare Facility?
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of healthcare providers who have elevated their patient care
              and operational efficiency with our platform.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" variant="secondary" className="gap-2 bg-white text-primary hover:bg-white/90">
                <Link to="/register">
                  Get Started Today <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
