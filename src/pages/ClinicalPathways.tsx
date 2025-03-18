
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Route, 
  ArrowRight, 
  Clock, 
  FileClock,
  ListChecks,
  Users,
  UserPlus,
  Activity,
  MoreHorizontal,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Pathway {
  id: string;
  name: string;
  description: string;
  target: string;
  department: string;
  steps: number;
  completedSteps: number;
  assignedTeam: string[];
  patients: number;
  lastUpdated: string;
  status: 'active' | 'draft' | 'archived';
}

const ClinicalPathways = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const [pathways, setPathways] = useState<Pathway[]>([
    {
      id: '1',
      name: 'Stroke Management Protocol',
      description: 'Evidence-based clinical pathway for acute stroke management',
      target: 'Stroke patients within 6 hours of symptom onset',
      department: 'Neurology',
      steps: 12,
      completedSteps: 12,
      assignedTeam: ['Dr. James Wilson', 'Dr. Emily Chen', 'Nurse Sarah Johnson'],
      patients: 18,
      lastUpdated: '2023-10-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Diabetes Care Management',
      description: 'Comprehensive pathway for Type 2 Diabetes outpatient management',
      target: 'Type 2 Diabetes patients with HbA1c > 7.5%',
      department: 'Endocrinology',
      steps: 10,
      completedSteps: 8,
      assignedTeam: ['Dr. Michael Brown', 'Nurse Robert Taylor'],
      patients: 32,
      lastUpdated: '2023-09-22',
      status: 'active'
    },
    {
      id: '3',
      name: 'Post-Surgical Cardiac Recovery',
      description: 'Recovery protocol for patients after cardiac surgery',
      target: 'Post-CABG and valve replacement patients',
      department: 'Cardiology',
      steps: 15,
      completedSteps: 15,
      assignedTeam: ['Dr. Patricia Rodriguez', 'Dr. Thomas Lee', 'Nurse Jessica Martinez'],
      patients: 11,
      lastUpdated: '2023-08-05',
      status: 'active'
    },
    {
      id: '4',
      name: 'Pediatric Asthma Management',
      description: 'Management pathway for acute pediatric asthma exacerbations',
      target: 'Pediatric patients with moderate to severe asthma',
      department: 'Pediatrics',
      steps: 8,
      completedSteps: 5,
      assignedTeam: ['Dr. Lisa Cooper', 'Nurse David Johnson'],
      patients: 24,
      lastUpdated: '2023-11-01',
      status: 'active'
    },
    {
      id: '5',
      name: 'Mental Health Crisis Intervention',
      description: 'Protocol for acute mental health crisis management',
      target: 'Patients presenting with acute psychiatric symptoms',
      department: 'Psychiatry',
      steps: 14,
      completedSteps: 7,
      assignedTeam: ['Dr. Sarah Peterson', 'Dr. James Miller', 'Nurse John Adams'],
      patients: 9,
      lastUpdated: '2023-10-28',
      status: 'draft'
    },
    {
      id: '6',
      name: 'Chronic Pain Management',
      description: 'Multidisciplinary approach to chronic non-cancer pain',
      target: 'Patients with chronic pain lasting >3 months',
      department: 'Pain Management',
      steps: 12,
      completedSteps: 12,
      assignedTeam: ['Dr. Maria Garcia', 'Dr. Robert Wilson', 'Nurse Elizabeth Smith'],
      patients: 0,
      lastUpdated: '2023-07-15',
      status: 'archived'
    },
  ]);

  const filteredPathways = pathways.filter(pathway => 
    pathway.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pathway.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pathway.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activePathways = filteredPathways.filter(pathway => pathway.status === 'active');
  const draftPathways = filteredPathways.filter(pathway => pathway.status === 'draft');
  const archivedPathways = filteredPathways.filter(pathway => pathway.status === 'archived');

  const getStatusBadge = (status: 'active' | 'draft' | 'archived') => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'archived':
        return <Badge variant="secondary">Archived</Badge>;
    }
  };

  return (
    <motion.div 
      className="container mx-auto py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clinical Pathways</h1>
          <p className="text-muted-foreground mt-2">Manage standardized care plans and treatment protocols</p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm">
            <ListChecks className="mr-2 h-4 w-4" />
            Manage Pathways
          </Button>
          <Button variant="default" size="sm">
            <Route className="mr-2 h-4 w-4" />
            Create Pathway
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Pathways</CardTitle>
            <CardDescription>Currently in use</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activePathways.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Enrolled Patients</CardTitle>
            <CardDescription>Total patients on pathways</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {pathways.reduce((total, pathway) => total + pathway.patients, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Compliance Rate</CardTitle>
            <CardDescription>Average pathway adherence</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">92%</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search pathways..." 
            className="pl-10" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active ({activePathways.length})</TabsTrigger>
          <TabsTrigger value="draft">Drafts ({draftPathways.length})</TabsTrigger>
          <TabsTrigger value="archived">Archived ({archivedPathways.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          {activePathways.length > 0 ? (
            <div className="space-y-4">
              {activePathways.map(pathway => (
                <Card key={pathway.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center">
                          {pathway.name} {getStatusBadge(pathway.status)}
                        </CardTitle>
                        <CardDescription>{pathway.department}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Edit Pathway</DropdownMenuItem>
                          <DropdownMenuItem>View Patients</DropdownMenuItem>
                          <DropdownMenuItem>Export Protocol</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{pathway.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-medium mb-1">Protocol Completion</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={(pathway.completedSteps / pathway.steps) * 100} className="h-2" />
                          <span className="text-xs font-medium">{Math.round((pathway.completedSteps / pathway.steps) * 100)}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-1">Assigned Team</p>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-xs">{pathway.assignedTeam.length} members</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 mr-1" />
                      <span>{pathway.patients} patients</span>
                    </div>
                    <div className="flex items-center">
                      <FileClock className="h-4 w-4 mr-1" />
                      <span>Updated {new Date(pathway.lastUpdated).toLocaleDateString()}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      View Details
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Route className="mx-auto h-10 w-10 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No active pathways</h3>
              <p className="mt-2 text-sm text-muted-foreground">Create a new pathway or activate a draft.</p>
              <Button variant="outline" className="mt-4">
                <Route className="mr-2 h-4 w-4" />
                Create Pathway
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="draft">
          {draftPathways.length > 0 ? (
            <div className="space-y-4">
              {draftPathways.map(pathway => (
                <Card key={pathway.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center">
                          {pathway.name} {getStatusBadge(pathway.status)}
                        </CardTitle>
                        <CardDescription>{pathway.department}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Edit Pathway</DropdownMenuItem>
                          <DropdownMenuItem>Activate Pathway</DropdownMenuItem>
                          <DropdownMenuItem>Export Protocol</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{pathway.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-medium mb-1">Protocol Completion</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={(pathway.completedSteps / pathway.steps) * 100} className="h-2" />
                          <span className="text-xs font-medium">{Math.round((pathway.completedSteps / pathway.steps) * 100)}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-1">Assigned Team</p>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-xs">{pathway.assignedTeam.length} members</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Draft since {new Date(pathway.lastUpdated).toLocaleDateString()}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Continue Editing
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <FileClock className="mx-auto h-10 w-10 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No draft pathways</h3>
              <p className="mt-2 text-sm text-muted-foreground">Start creating a new pathway.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="archived">
          {archivedPathways.length > 0 ? (
            <div className="space-y-4">
              {archivedPathways.map(pathway => (
                <Card key={pathway.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center">
                          {pathway.name} {getStatusBadge(pathway.status)}
                        </CardTitle>
                        <CardDescription>{pathway.department}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Pathway</DropdownMenuItem>
                          <DropdownMenuItem>Reactivate</DropdownMenuItem>
                          <DropdownMenuItem>Export Protocol</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">Delete Permanently</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{pathway.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-medium mb-1">Protocol Completion</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={(pathway.completedSteps / pathway.steps) * 100} className="h-2" />
                          <span className="text-xs font-medium">{Math.round((pathway.completedSteps / pathway.steps) * 100)}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-1">Previous Usage</p>
                        <div className="flex items-center">
                          <UserPlus className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-xs">Used for {pathway.patients} patients</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Archived on {new Date(pathway.lastUpdated).toLocaleDateString()}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      View Details
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <FileClock className="mx-auto h-10 w-10 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No archived pathways</h3>
              <p className="mt-2 text-sm text-muted-foreground">Archived pathways will appear here.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ClinicalPathways;
