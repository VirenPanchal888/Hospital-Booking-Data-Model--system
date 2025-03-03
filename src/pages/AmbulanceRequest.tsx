
import React from 'react';
import { Ambulance } from 'lucide-react';
import AmbulanceRequestForm from '@/components/ambulance/AmbulanceRequestForm';

const AmbulanceRequest = () => {
  return (
    <div className="animate-slide-in-up space-y-6">
      <div className="flex items-center gap-3 transition-transform duration-300 hover:translate-x-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 shadow-sm transition-transform duration-300 hover:scale-105">
          <Ambulance className="h-5 w-5 text-red-600" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Emergency Ambulance</h1>
          <p className="text-muted-foreground">
            Request emergency medical transportation services.
          </p>
        </div>
      </div>
      
      <div className="rounded-xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in">
        <AmbulanceRequestForm />
      </div>
    </div>
  );
};

export default AmbulanceRequest;
