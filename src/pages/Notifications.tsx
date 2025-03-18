
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';
import { AlertCircle, Bell, Calendar, CheckCircle2, Clock, FileText, MessagesSquare, User, X } from 'lucide-react';

// Notification type
interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'message' | 'appointment' | 'system' | 'alert';
  user?: {
    name: string;
    avatar?: string;
  };
}

const Notifications: React.FC = () => {
  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New appointment scheduled',
      message: 'You have a new appointment with Dr. Jane Smith on Friday, June 10 at 2:30 PM.',
      time: '2 hours ago',
      read: false,
      type: 'appointment',
    },
    {
      id: '2',
      title: 'Lab results available',
      message: 'Your recent lab test results are now available. Click to view them.',
      time: '4 hours ago',
      read: false,
      type: 'system',
    },
    {
      id: '3',
      title: 'Message from Dr. Smith',
      message: 'Hello! Just following up on your last visit. How are you feeling?',
      time: '1 day ago',
      read: true,
      type: 'message',
      user: {
        name: 'Dr. Jane Smith',
        avatar: '',
      },
    },
    {
      id: '4',
      title: 'Prescription refill needed',
      message: 'Your prescription for Lisinopril is due for refill in 3 days.',
      time: '2 days ago',
      read: true,
      type: 'alert',
    },
    {
      id: '5',
      title: 'Appointment reminder',
      message: 'Reminder: You have an appointment with Dr. Brown tomorrow at 10:00 AM.',
      time: '2 days ago',
      read: true,
      type: 'appointment',
    },
    {
      id: '6',
      title: 'New message from Nurse Wilson',
      message: 'Please remember to bring your medication list to your next appointment.',
      time: '3 days ago',
      read: true,
      type: 'message',
      user: {
        name: 'Nurse Wilson',
        avatar: '',
      },
    },
    {
      id: '7',
      title: 'System maintenance',
      message: 'The patient portal will be undergoing maintenance on Sunday from 2 AM to 4 AM.',
      time: '4 days ago',
      read: true,
      type: 'system',
    },
  ]);

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
    toast({
      title: "All notifications marked as read",
      description: "You've cleared all unread notifications.",
    });
  };

  // Delete a notification
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    });
  };

  // Get unread notification count
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  // Get notifications by type
  const getFilteredNotifications = (type?: Notification['type']) => {
    if (!type) return notifications;
    return notifications.filter((notification) => notification.type === type);
  };

  // Get icon based on notification type
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return <MessagesSquare className="h-5 w-5 text-blue-500" />;
      case 'appointment':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      case 'system':
        return <FileText className="h-5 w-5 text-green-500" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  // Notification card component
  const NotificationCard: React.FC<{ notification: Notification }> = ({ notification }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <Card className={`mb-3 ${!notification.read ? 'bg-primary/5 dark:bg-primary/10' : ''}`}>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                {notification.user ? (
                  <Avatar>
                    <AvatarImage src={notification.user.avatar || ''} alt={notification.user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {notification.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    {getNotificationIcon(notification.type)}
                  </div>
                )}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <Badge variant="default" className="px-2">New</Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-muted-foreground"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {notification.time}
                  </div>
                  
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as read
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container max-w-5xl pb-12"
    >
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Mark all as read
              </Button>
            )}
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <div className="mb-6 border-b">
            <TabsList className="bg-transparent w-full flex justify-start p-0">
              <TabsTrigger 
                value="all" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary h-10 px-4"
              >
                All
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2">{unreadCount}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="messages" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary h-10 px-4"
              >
                <MessagesSquare className="h-4 w-4 mr-2" />
                Messages
              </TabsTrigger>
              <TabsTrigger 
                value="appointments" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary h-10 px-4"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Appointments
              </TabsTrigger>
              <TabsTrigger 
                value="system" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary h-10 px-4"
              >
                <FileText className="h-4 w-4 mr-2" />
                System
              </TabsTrigger>
              <TabsTrigger 
                value="alerts" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary h-10 px-4"
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Alerts
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="mt-4">
            <TabsContent value="all" className="m-0">
              <ScrollArea className="h-[calc(100vh-220px)]">
                <AnimatePresence>
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <NotificationCard key={notification.id} notification={notification} />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No notifications</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        You don't have any notifications at the moment.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="messages" className="m-0">
              <ScrollArea className="h-[calc(100vh-220px)]">
                <AnimatePresence>
                  {getFilteredNotifications('message').length > 0 ? (
                    getFilteredNotifications('message').map((notification) => (
                      <NotificationCard key={notification.id} notification={notification} />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <MessagesSquare className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No messages</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        You don't have any message notifications at the moment.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="appointments" className="m-0">
              <ScrollArea className="h-[calc(100vh-220px)]">
                <AnimatePresence>
                  {getFilteredNotifications('appointment').length > 0 ? (
                    getFilteredNotifications('appointment').map((notification) => (
                      <NotificationCard key={notification.id} notification={notification} />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No appointment notifications</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        You don't have any appointment notifications at the moment.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="system" className="m-0">
              <ScrollArea className="h-[calc(100vh-220px)]">
                <AnimatePresence>
                  {getFilteredNotifications('system').length > 0 ? (
                    getFilteredNotifications('system').map((notification) => (
                      <NotificationCard key={notification.id} notification={notification} />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No system notifications</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        You don't have any system notifications at the moment.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="alerts" className="m-0">
              <ScrollArea className="h-[calc(100vh-220px)]">
                <AnimatePresence>
                  {getFilteredNotifications('alert').length > 0 ? (
                    getFilteredNotifications('alert').map((notification) => (
                      <NotificationCard key={notification.id} notification={notification} />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No alerts</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        You don't have any alerts at the moment.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Notifications;
