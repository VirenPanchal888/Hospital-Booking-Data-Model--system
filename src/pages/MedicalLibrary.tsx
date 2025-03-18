
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, BookOpen, FileText, FilePlus2, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

interface MedicalResource {
  id: string;
  title: string;
  category: string;
  description: string;
  author: string;
  publicationDate: string;
  link: string;
  isFavorite: boolean;
}

const MedicalLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [resources, setResources] = useState<MedicalResource[]>([
    {
      id: '1',
      title: 'Understanding Diabetes Type 2',
      category: 'diseases',
      description: 'A comprehensive guide to managing Type 2 Diabetes through lifestyle and medication.',
      author: 'Dr. James Wilson',
      publicationDate: '2023-05-15',
      link: '#',
      isFavorite: false
    },
    {
      id: '2',
      title: 'Advances in Cardiac Surgery',
      category: 'procedures',
      description: 'Latest techniques and technologies in cardiac surgical procedures.',
      author: 'Dr. Emily Chen',
      publicationDate: '2023-08-22',
      link: '#',
      isFavorite: true
    },
    {
      id: '3',
      title: 'Pediatric Care Guidelines',
      category: 'guidelines',
      description: 'Updated guidelines for the care of pediatric patients in hospital settings.',
      author: 'American Pediatric Association',
      publicationDate: '2023-02-10',
      link: '#',
      isFavorite: false
    },
    {
      id: '4',
      title: 'Mental Health in Primary Care',
      category: 'mental-health',
      description: 'Integrating mental health screening and treatment in primary care settings.',
      author: 'Dr. Sarah Johnson',
      publicationDate: '2023-07-03',
      link: '#',
      isFavorite: true
    },
    {
      id: '5',
      title: 'Antibiotic Resistance: A Global Crisis',
      category: 'research',
      description: 'Current research on antibiotic resistance and strategies to combat it.',
      author: 'Dr. Michael Brown',
      publicationDate: '2023-09-18',
      link: '#',
      isFavorite: false
    },
    {
      id: '6',
      title: 'Patient Care After Stroke',
      category: 'recovery',
      description: 'Best practices for rehabilitation and care of stroke patients.',
      author: 'Dr. Patricia Rodriguez',
      publicationDate: '2023-04-29',
      link: '#',
      isFavorite: false
    }
  ]);

  const toggleFavorite = (id: string) => {
    setResources(resources.map(resource => 
      resource.id === id ? { ...resource, isFavorite: !resource.isFavorite } : resource
    ));
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const favoriteResources = resources.filter(resource => resource.isFavorite);

  return (
    <motion.div 
      className="container mx-auto py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Medical Library</h1>
          <p className="text-muted-foreground mt-2">Access medical literature, guidelines, and research papers</p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm">
            <FilePlus2 className="mr-2 h-4 w-4" />
            Upload Resource
          </Button>
          <Button variant="default" size="sm">
            <BookOpen className="mr-2 h-4 w-4" />
            Request Article
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Documents</CardTitle>
            <CardDescription>Total medical documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">247</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent Updates</CardTitle>
            <CardDescription>New in the last month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">32</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Bookmarked</CardTitle>
            <CardDescription>Your saved resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{favoriteResources.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search resources..." 
            className="pl-10" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="diseases">Diseases</SelectItem>
            <SelectItem value="procedures">Procedures</SelectItem>
            <SelectItem value="guidelines">Guidelines</SelectItem>
            <SelectItem value="mental-health">Mental Health</SelectItem>
            <SelectItem value="research">Research</SelectItem>
            <SelectItem value="recovery">Recovery</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources.map(resource => (
                <Card key={resource.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => toggleFavorite(resource.id)}
                        className={resource.isFavorite ? "text-yellow-500" : "text-muted-foreground"}
                      >
                        <Bookmark className="h-5 w-5" />
                      </Button>
                    </div>
                    <CardDescription>{resource.category.charAt(0).toUpperCase() + resource.category.slice(1).replace('-', ' ')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                    <div className="text-xs text-muted-foreground">
                      <p>Author: {resource.author}</p>
                      <p>Published: {new Date(resource.publicationDate).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="link" size="sm" className="px-0">
                      <FileText className="mr-2 h-4 w-4" />
                      View Document
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <BookOpen className="mx-auto h-10 w-10 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No resources found</h3>
              <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="favorites">
          {favoriteResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteResources.map(resource => (
                <Card key={resource.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => toggleFavorite(resource.id)}
                        className="text-yellow-500"
                      >
                        <Bookmark className="h-5 w-5" />
                      </Button>
                    </div>
                    <CardDescription>{resource.category.charAt(0).toUpperCase() + resource.category.slice(1).replace('-', ' ')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                    <div className="text-xs text-muted-foreground">
                      <p>Author: {resource.author}</p>
                      <p>Published: {new Date(resource.publicationDate).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="link" size="sm" className="px-0">
                      <FileText className="mr-2 h-4 w-4" />
                      View Document
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Bookmark className="mx-auto h-10 w-10 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No favorites yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">Bookmark resources to see them here.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recent">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.slice().sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()).slice(0, 6).map(resource => (
              <Card key={resource.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => toggleFavorite(resource.id)}
                      className={resource.isFavorite ? "text-yellow-500" : "text-muted-foreground"}
                    >
                      <Bookmark className="h-5 w-5" />
                    </Button>
                  </div>
                  <CardDescription>{resource.category.charAt(0).toUpperCase() + resource.category.slice(1).replace('-', ' ')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                  <div className="text-xs text-muted-foreground">
                    <p>Author: {resource.author}</p>
                    <p>Published: {new Date(resource.publicationDate).toLocaleDateString()}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="link" size="sm" className="px-0">
                    <FileText className="mr-2 h-4 w-4" />
                    View Document
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default MedicalLibrary;
