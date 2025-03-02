
import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Patient {
  id: string;
  name: string;
  avatar?: string;
  age: number;
  gender: string;
  condition?: string;
  lastVisit: string;
}

interface RecentPatientsProps {
  patients: Patient[];
}

// Sample patients data
const samplePatients: Patient[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    age: 34,
    gender: 'female',
    condition: 'Hypertension',
    lastVisit: '2 days ago'
  },
  {
    id: '2',
    name: 'James Rodriguez',
    age: 28,
    gender: 'male',
    condition: 'Diabetes Type 2',
    lastVisit: '1 week ago'
  },
  {
    id: '3',
    name: 'Olivia Smith',
    age: 45,
    gender: 'female',
    condition: 'Arthritis',
    lastVisit: '3 days ago'
  },
  {
    id: '4',
    name: 'Noah Johnson',
    age: 52,
    gender: 'male',
    condition: 'COPD',
    lastVisit: 'Yesterday'
  },
  {
    id: '5',
    name: 'Ava Brown',
    age: 19,
    gender: 'female',
    condition: 'Asthma',
    lastVisit: '5 days ago'
  }
];

const RecentPatients: React.FC<RecentPatientsProps> = ({ patients = samplePatients }) => {
  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="font-semibold">Recent Patients</h2>
        <Button variant="outline" size="sm">View All</Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50 text-left text-sm font-medium text-muted-foreground">
              <th className="whitespace-nowrap px-4 py-3">Patient</th>
              <th className="whitespace-nowrap px-4 py-3">Age</th>
              <th className="whitespace-nowrap px-4 py-3">Gender</th>
              <th className="whitespace-nowrap px-4 py-3">Condition</th>
              <th className="whitespace-nowrap px-4 py-3">Last Visit</th>
              <th className="whitespace-nowrap px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-b text-sm transition-colors hover:bg-muted/40">
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                      {patient.avatar ? (
                        <img
                          src={patient.avatar}
                          alt={patient.name}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        patient.name.charAt(0) + (patient.name.split(' ')[1]?.charAt(0) || '')
                      )}
                    </div>
                    <span className="font-medium">{patient.name}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3">{patient.age}</td>
                <td className="whitespace-nowrap px-4 py-3 capitalize">{patient.gender}</td>
                <td className="whitespace-nowrap px-4 py-3">{patient.condition || 'N/A'}</td>
                <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{patient.lastVisit}</td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Patient</DropdownMenuItem>
                      <DropdownMenuItem>Schedule Appointment</DropdownMenuItem>
                      <DropdownMenuItem>View Medical History</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPatients;
