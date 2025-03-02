
import React from 'react';
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';

interface ActivityData {
  name: string;
  patients: number;
  appointments: number;
}

interface ActivityChartProps {
  data: ActivityData[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="mb-4">
        <h2 className="font-semibold">Hospital Activity</h2>
        <p className="text-sm text-muted-foreground">Patient visits and appointments over time</p>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: 'var(--radius)', 
                backgroundColor: 'hsl(var(--background))', 
                border: '1px solid hsl(var(--border))' 
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="patients" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPatients)" 
            />
            <Area 
              type="monotone" 
              dataKey="appointments" 
              stroke="hsl(var(--muted-foreground))" 
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAppointments)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Patients</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-muted-foreground" />
          <span className="text-xs text-muted-foreground">Appointments</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;
