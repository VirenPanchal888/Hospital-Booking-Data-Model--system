
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from 'next-themes';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, Languages, Moon, PaintBucket, Settings as SettingsIcon, Smartphone, Sun, Volume2 } from 'lucide-react';

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const handleSettingChange = (setting: string, value: boolean | string) => {
    toast({
      title: "Setting updated",
      description: `${setting} has been ${typeof value === 'boolean' ? (value ? 'enabled' : 'disabled') : 'changed to ' + value}`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container max-w-5xl pb-12"
    >
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Settings</h1>
        
        <Tabs defaultValue="appearance">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="sm:w-1/4">
              <TabsList className="flex flex-row sm:flex-col w-full bg-transparent p-0 mb-6">
                <TabsTrigger 
                  value="appearance" 
                  className="justify-start w-full data-[state=active]:bg-accent h-10 px-4"
                >
                  <PaintBucket className="h-4 w-4 mr-2" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="justify-start w-full data-[state=active]:bg-accent h-10 px-4"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger 
                  value="language" 
                  className="justify-start w-full data-[state=active]:bg-accent h-10 px-4"
                >
                  <Languages className="h-4 w-4 mr-2" />
                  Language
                </TabsTrigger>
                <TabsTrigger 
                  value="audio" 
                  className="justify-start w-full data-[state=active]:bg-accent h-10 px-4"
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  Audio
                </TabsTrigger>
                {isAdmin && (
                  <TabsTrigger 
                    value="system" 
                    className="justify-start w-full data-[state=active]:bg-accent h-10 px-4"
                  >
                    <SettingsIcon className="h-4 w-4 mr-2" />
                    System
                  </TabsTrigger>
                )}
              </TabsList>
            </div>
            
            <div className="sm:w-3/4">
              <TabsContent value="appearance" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>
                      Customize how the application looks and feels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Theme</h3>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          variant={theme === 'light' ? 'default' : 'outline'}
                          className="justify-start gap-2 w-full sm:w-1/3"
                          onClick={() => setTheme('light')}
                        >
                          <Sun className="h-4 w-4" />
                          Light
                        </Button>
                        <Button
                          variant={theme === 'dark' ? 'default' : 'outline'}
                          className="justify-start gap-2 w-full sm:w-1/3"
                          onClick={() => setTheme('dark')}
                        >
                          <Moon className="h-4 w-4" />
                          Dark
                        </Button>
                        <Button
                          variant={theme === 'system' ? 'default' : 'outline'}
                          className="justify-start gap-2 w-full sm:w-1/3"
                          onClick={() => setTheme('system')}
                        >
                          <Smartphone className="h-4 w-4" />
                          System
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Layout & Accessibility</h3>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="reduced-motion" className="flex-1">
                          <span className="text-base font-normal">Reduce motion</span>
                          <span className="block text-sm text-muted-foreground">
                            Minimize animations and transitions
                          </span>
                        </Label>
                        <Switch 
                          id="reduced-motion" 
                          onCheckedChange={(checked) => handleSettingChange('Reduced motion', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="larger-text" className="flex-1">
                          <span className="text-base font-normal">Larger text</span>
                          <span className="block text-sm text-muted-foreground">
                            Increase text size for better readability
                          </span>
                        </Label>
                        <Switch 
                          id="larger-text" 
                          onCheckedChange={(checked) => handleSettingChange('Larger text', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="high-contrast" className="flex-1">
                          <span className="text-base font-normal">High contrast</span>
                          <span className="block text-sm text-muted-foreground">
                            Enhance color contrast for better visibility
                          </span>
                        </Label>
                        <Switch 
                          id="high-contrast" 
                          onCheckedChange={(checked) => handleSettingChange('High contrast', checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      Configure how you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Email Notifications</h3>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="appointment-email" className="flex-1">
                          <span className="text-base font-normal">Appointment reminders</span>
                          <span className="block text-sm text-muted-foreground">
                            Receive emails about upcoming appointments
                          </span>
                        </Label>
                        <Switch 
                          id="appointment-email" 
                          defaultChecked
                          onCheckedChange={(checked) => handleSettingChange('Appointment email reminders', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="medical-email" className="flex-1">
                          <span className="text-base font-normal">Medical updates</span>
                          <span className="block text-sm text-muted-foreground">
                            Receive emails about lab results and prescriptions
                          </span>
                        </Label>
                        <Switch 
                          id="medical-email" 
                          defaultChecked
                          onCheckedChange={(checked) => handleSettingChange('Medical update emails', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="system-email" className="flex-1">
                          <span className="text-base font-normal">System updates</span>
                          <span className="block text-sm text-muted-foreground">
                            Receive emails about system changes and maintenance
                          </span>
                        </Label>
                        <Switch 
                          id="system-email" 
                          onCheckedChange={(checked) => handleSettingChange('System update emails', checked)}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">In-App Notifications</h3>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="appointment-app" className="flex-1">
                          <span className="text-base font-normal">Appointment alerts</span>
                          <span className="block text-sm text-muted-foreground">
                            Show notifications for upcoming appointments
                          </span>
                        </Label>
                        <Switch 
                          id="appointment-app" 
                          defaultChecked
                          onCheckedChange={(checked) => handleSettingChange('In-app appointment alerts', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="message-app" className="flex-1">
                          <span className="text-base font-normal">Messages</span>
                          <span className="block text-sm text-muted-foreground">
                            Show notifications for new messages
                          </span>
                        </Label>
                        <Switch 
                          id="message-app" 
                          defaultChecked
                          onCheckedChange={(checked) => handleSettingChange('In-app message notifications', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sound-app" className="flex-1">
                          <span className="text-base font-normal">Notification sounds</span>
                          <span className="block text-sm text-muted-foreground">
                            Play sounds for important notifications
                          </span>
                        </Label>
                        <Switch 
                          id="sound-app" 
                          defaultChecked
                          onCheckedChange={(checked) => handleSettingChange('Notification sounds', checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="language" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Language & Region</CardTitle>
                    <CardDescription>
                      Set your preferred language and regional settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="language">Application Language</Label>
                          <Select 
                            defaultValue="en-US" 
                            onValueChange={(value) => handleSettingChange('Application language', value)}
                          >
                            <SelectTrigger id="language">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en-US">English (US)</SelectItem>
                              <SelectItem value="en-GB">English (UK)</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                              <SelectItem value="fr">French</SelectItem>
                              <SelectItem value="de">German</SelectItem>
                              <SelectItem value="zh">Chinese</SelectItem>
                              <SelectItem value="ja">Japanese</SelectItem>
                              <SelectItem value="ko">Korean</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="date-format">Date Format</Label>
                          <Select 
                            defaultValue="MM/DD/YYYY" 
                            onValueChange={(value) => handleSettingChange('Date format', value)}
                          >
                            <SelectTrigger id="date-format">
                              <SelectValue placeholder="Select date format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="time-format">Time Format</Label>
                          <Select 
                            defaultValue="12" 
                            onValueChange={(value) => handleSettingChange('Time format', value)}
                          >
                            <SelectTrigger id="time-format">
                              <SelectValue placeholder="Select time format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="12">12-hour (AM/PM)</SelectItem>
                              <SelectItem value="24">24-hour</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Timezone</Label>
                          <Select 
                            defaultValue="America/New_York" 
                            onValueChange={(value) => handleSettingChange('Timezone', value)}
                          >
                            <SelectTrigger id="timezone">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                              <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                              <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                              <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                              <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                              <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                              <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="audio" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Audio Settings</CardTitle>
                    <CardDescription>
                      Configure audio settings for the application
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sound-effects" className="flex-1">
                          <span className="text-base font-normal">Sound effects</span>
                          <span className="block text-sm text-muted-foreground">
                            Play sound effects for actions and events
                          </span>
                        </Label>
                        <Switch 
                          id="sound-effects" 
                          defaultChecked
                          onCheckedChange={(checked) => handleSettingChange('Sound effects', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="alert-sounds" className="flex-1">
                          <span className="text-base font-normal">Alert sounds</span>
                          <span className="block text-sm text-muted-foreground">
                            Play sounds for important alerts
                          </span>
                        </Label>
                        <Switch 
                          id="alert-sounds" 
                          defaultChecked
                          onCheckedChange={(checked) => handleSettingChange('Alert sounds', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="call-sounds" className="flex-1">
                          <span className="text-base font-normal">Call sounds</span>
                          <span className="block text-sm text-muted-foreground">
                            Play sounds for telemedicine calls
                          </span>
                        </Label>
                        <Switch 
                          id="call-sounds" 
                          defaultChecked
                          onCheckedChange={(checked) => handleSettingChange('Call sounds', checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {isAdmin && (
                <TabsContent value="system" className="m-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>System Settings</CardTitle>
                      <CardDescription>
                        Administrative system settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Security</h3>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="two-factor" className="flex-1">
                            <span className="text-base font-normal">Force two-factor authentication</span>
                            <span className="block text-sm text-muted-foreground">
                              Require two-factor authentication for all staff accounts
                            </span>
                          </Label>
                          <Switch 
                            id="two-factor" 
                            onCheckedChange={(checked) => handleSettingChange('Force two-factor authentication', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="session-timeout" className="flex-1">
                            <span className="text-base font-normal">Automatic session timeout</span>
                            <span className="block text-sm text-muted-foreground">
                              Automatically log out inactive users after 30 minutes
                            </span>
                          </Label>
                          <Switch 
                            id="session-timeout" 
                            defaultChecked
                            onCheckedChange={(checked) => handleSettingChange('Automatic session timeout', checked)}
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">System Maintenance</h3>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="auto-updates" className="flex-1">
                            <span className="text-base font-normal">Automatic updates</span>
                            <span className="block text-sm text-muted-foreground">
                              Automatically install system updates
                            </span>
                          </Label>
                          <Switch 
                            id="auto-updates" 
                            defaultChecked
                            onCheckedChange={(checked) => handleSettingChange('Automatic updates', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="usage-data" className="flex-1">
                            <span className="text-base font-normal">Share usage data</span>
                            <span className="block text-sm text-muted-foreground">
                              Send anonymous usage data to help improve the system
                            </span>
                          </Label>
                          <Switch 
                            id="usage-data" 
                            defaultChecked
                            onCheckedChange={(checked) => handleSettingChange('Share usage data', checked)}
                          />
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button
                          variant="destructive"
                          onClick={() => {
                            toast({
                              title: "Maintenance mode initiated",
                              description: "The system will enter maintenance mode after all current sessions end.",
                              variant: "destructive"
                            });
                          }}
                        >
                          Enter Maintenance Mode
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </div>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Settings;
