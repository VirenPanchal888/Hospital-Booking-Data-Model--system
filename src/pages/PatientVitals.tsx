
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PatientVitals = () => {
  const { id } = useParams();
  
  // Sample vital data (would come from API in real app)
  const vitalData = {
    bloodPressure: [
      { date: '2023-01-01', systolic: 120, diastolic: 80 },
      { date: '2023-02-01', systolic: 118, diastolic: 78 },
      { date: '2023-03-01', systolic: 122, diastolic: 82 },
      { date: '2023-04-01', systolic: 125, diastolic: 85 },
      { date: '2023-05-01', systolic: 119, diastolic: 79 },
      { date: '2023-06-01', systolic: 117, diastolic: 77 },
    ],
    heartRate: [
      { date: '2023-01-01', value: 68 },
      { date: '2023-02-01', value: 72 },
      { date: '2023-03-01', value: 70 },
      { date: '2023-04-01', value: 74 },
      { date: '2023-05-01', value: 71 },
      { date: '2023-06-01', value: 69 },
    ],
    temperature: [
      { date: '2023-01-01', value: 98.6 },
      { date: '2023-02-01', value: 98.4 },
      { date: '2023-03-01', value: 99.1 },
      { date: '2023-04-01', value: 98.7 },
      { date: '2023-05-01', value: 98.5 },
      { date: '2023-06-01', value: 98.8 },
    ],
    oxygenSaturation: [
      { date: '2023-01-01', value: 98 },
      { date: '2023-02-01', value: 97 },
      { date: '2023-03-01', value: 99 },
      { date: '2023-04-01', value: 98 },
      { date: '2023-05-01', value: 97 },
      { date: '2023-06-01', value: 98 },
    ],
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Patient Vitals</h1>
        <div className="text-sm text-muted-foreground">
          Patient ID: {id || 'Unknown'}
        </div>
      </div>
      
      <Tabs defaultValue="bloodPressure">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bloodPressure">Blood Pressure</TabsTrigger>
          <TabsTrigger value="heartRate">Heart Rate</TabsTrigger>
          <TabsTrigger value="temperature">Temperature</TabsTrigger>
          <TabsTrigger value="oxygenSaturation">O₂ Saturation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bloodPressure">
          <Card>
            <CardHeader>
              <CardTitle>Blood Pressure History</CardTitle>
              <CardDescription>
                Tracking systolic and diastolic readings over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={vitalData.bloodPressure} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="systolic" stroke="#8884d8" name="Systolic" />
                  <Line type="monotone" dataKey="diastolic" stroke="#82ca9d" name="Diastolic" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="heartRate">
          <Card>
            <CardHeader>
              <CardTitle>Heart Rate History</CardTitle>
              <CardDescription>
                Tracking heart rate over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={vitalData.heartRate} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" name="Heart Rate (BPM)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="temperature">
          <Card>
            <CardHeader>
              <CardTitle>Temperature History</CardTitle>
              <CardDescription>
                Tracking body temperature over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={vitalData.temperature} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#ff7300" name="Temperature (°F)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="oxygenSaturation">
          <Card>
            <CardHeader>
              <CardTitle>Oxygen Saturation History</CardTitle>
              <CardDescription>
                Tracking oxygen saturation levels over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={vitalData.oxygenSaturation} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" name="O₂ Saturation (%)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientVitals;
