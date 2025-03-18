
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { Camera, Check, Edit2, Key, Shield, User } from 'lucide-react';

const profileFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  contactNumber: z.string().min(10, { message: 'Phone number must be at least 10 characters.' }),
  address: z.string().optional(),
  department: z.string().optional(),
  specialization: z.string().optional(),
  emergencyContact: z.string().optional(),
});

const passwordFormSchema = z.object({
  currentPassword: z.string().min(1, { message: 'Current password is required.' }),
  newPassword: z.string().min(8, { message: 'New password must be at least 8 characters.' }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;

const UserProfile: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  
  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      contactNumber: user?.contactNumber || '',
      address: user?.address || '',
      department: user?.department || '',
      specialization: user?.specialization || '',
      emergencyContact: user?.emergencyContact || '',
    },
  });
  
  // Password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  
  const onProfileSubmit = async (values: ProfileFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    updateUserProfile(values);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const onPasswordSubmit = async (values: PasswordFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    passwordForm.reset({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
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
        <h1 className="text-3xl font-bold tracking-tight mb-6">Your Profile</h1>
        
        <div className="mb-8">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col">
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Manage your personal details</CardDescription>
                </div>
                
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                    onClick={() => setIsEditingAvatar(!isEditingAvatar)}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {isEditingAvatar && (
                <div className="mb-4 p-4 rounded-lg border bg-background">
                  <div className="flex flex-col space-y-3">
                    <Label htmlFor="avatar">Upload new avatar</Label>
                    <Input id="avatar" type="file" accept="image/*" />
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary" onClick={() => setIsEditingAvatar(false)}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={() => {
                        setIsEditingAvatar(false);
                        toast({
                          title: "Avatar updated",
                          description: "Your profile picture has been updated.",
                        });
                      }}>
                        <Check className="h-4 w-4 mr-1" /> Save
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="text-muted-foreground">User ID</Label>
                    <p className="font-medium">{user?.id || 'Not assigned'}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Role</Label>
                    <p className="font-medium capitalize">{user?.role || 'Not assigned'}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Account created</Label>
                    <p className="font-medium">{user?.dateJoined || 'Unknown'}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Last login</Label>
                    <p className="font-medium">
                      {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Unknown'}
                    </p>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="general" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>General Info</span>
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>Security</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="general" className="space-y-6">
                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <FormField
                            control={profileForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your full name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={profileForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="Your email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={profileForm.control}
                            name="contactNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          {user?.role === 'patient' && (
                            <FormField
                              control={profileForm.control}
                              name="emergencyContact"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Emergency Contact</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Emergency contact" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                          
                          {(user?.role === 'doctor' || user?.role === 'nurse') && (
                            <>
                              <FormField
                                control={profileForm.control}
                                name="department"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Department</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Your department" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={profileForm.control}
                                name="specialization"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Specialization</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Your specialization" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </>
                          )}
                          
                          <FormField
                            control={profileForm.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem className="sm:col-span-2">
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your address" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <Button type="submit" className="w-full sm:w-auto">
                          Update Profile
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                  
                  <TabsContent value="security" className="space-y-6">
                    <Form {...passwordForm}>
                      <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                        <FormField
                          control={passwordForm.control}
                          name="currentPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Your current password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={passwordForm.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Your new password" {...field} />
                              </FormControl>
                              <FormDescription>
                                Password must be at least 8 characters long.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={passwordForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm New Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Confirm your new password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full sm:w-auto">
                          Update Password
                        </Button>
                      </form>
                    </Form>
                    
                    <div className="mt-8 pt-6 border-t">
                      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                        <Key className="h-4 w-4" />
                        Two-Factor Authentication
                      </h3>
                      
                      <Alert>
                        <AlertDescription>
                          Two-factor authentication is not enabled yet. Adding a second layer of security can protect your account from unauthorized access.
                        </AlertDescription>
                      </Alert>
                      
                      <Button className="mt-4" variant="outline">
                        Enable Two-Factor Auth
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
