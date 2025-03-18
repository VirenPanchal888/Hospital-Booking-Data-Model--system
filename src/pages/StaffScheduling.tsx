
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const StaffScheduling: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Staff Scheduling</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Staff Schedule</CardTitle>
          <CardDescription>Manage staff scheduling and shifts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">Staff Scheduling Coming Soon</h3>
              <p className="text-muted-foreground">This feature is under development.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffScheduling;
