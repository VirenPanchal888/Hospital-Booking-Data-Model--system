
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export interface ActivityChartProps {
  data?: Array<{
    name: string;
    value: number;
    value2?: number;
    value3?: number;
  }>;
  colors?: {
    primary: string;
    secondary?: string;
    tertiary?: string;
  };
  title?: string;
  showLegend?: boolean;
  legendNames?: {
    value: string;
    value2?: string;
    value3?: string;
  };
}

// Sample data
const defaultData = [
  { name: 'Mon', value: 12 },
  { name: 'Tue', value: 18 },
  { name: 'Wed', value: 15 },
  { name: 'Thu', value: 25 },
  { name: 'Fri', value: 22 },
  { name: 'Sat', value: 14 },
  { name: 'Sun', value: 10 },
];

const defaultColors = {
  primary: '#8884d8',
  secondary: '#82ca9d',
  tertiary: '#ffc658',
};

const defaultLegendNames = {
  value: 'Activities',
  value2: 'Secondary',
  value3: 'Tertiary',
};

const ActivityChart: React.FC<ActivityChartProps> = ({ 
  data = defaultData, 
  colors = defaultColors,
  title,
  showLegend = false,
  legendNames = defaultLegendNames,
}) => {
  const hasSecondaryData = data.some(item => item.value2 !== undefined);
  const hasTertiaryData = data.some(item => item.value3 !== undefined);

  return (
    <div className="w-full h-[300px]">
      {title && <h3 className="text-lg font-medium mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8} />
              <stop offset="95%" stopColor={colors.primary} stopOpacity={0.1} />
            </linearGradient>
            {hasSecondaryData && (
              <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors.secondary} stopOpacity={0.1} />
              </linearGradient>
            )}
            {hasTertiaryData && (
              <linearGradient id="colorValue3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.tertiary} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors.tertiary} stopOpacity={0.1} />
              </linearGradient>
            )}
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {showLegend && <Legend />}
          <Area
            type="monotone"
            dataKey="value"
            name={legendNames.value}
            stroke={colors.primary}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
          {hasSecondaryData && (
            <Area
              type="monotone"
              dataKey="value2"
              name={legendNames.value2}
              stroke={colors.secondary}
              fillOpacity={1}
              fill="url(#colorValue2)"
            />
          )}
          {hasTertiaryData && (
            <Area
              type="monotone"
              dataKey="value3"
              name={legendNames.value3}
              stroke={colors.tertiary}
              fillOpacity={1}
              fill="url(#colorValue3)"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;
