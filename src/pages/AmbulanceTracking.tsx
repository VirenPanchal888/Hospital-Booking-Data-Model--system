
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Ambulance } from 'lucide-react';

const AmbulanceTracking: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Ambulance Tracking</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Ambulance Fleet Tracker</CardTitle>
          <CardDescription>Real-time location and status of ambulances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Ambulance className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">Ambulance Tracking Coming Soon</h3>
              <p className="text-muted-foreground">This feature is under development.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AmbulanceTracking;
