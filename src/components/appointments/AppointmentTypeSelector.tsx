
import React from 'react';
import { Check, Video, PhoneCall, User, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface AppointmentType {
  id: string;
  name: string;
  icon: 'video' | 'phone' | 'in-person' | 'regular';
  description: string;
}

interface AppointmentTypeSelectorProps {
  types: AppointmentType[];
  selectedType: string;
  onSelect: (typeId: string) => void;
}

// Animation variants for items
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const AppointmentTypeSelector: React.FC<AppointmentTypeSelectorProps> = ({
  types,
  selectedType,
  onSelect
}) => {
  // Function to render the appropriate icon
  const renderIcon = (iconType: AppointmentType['icon']) => {
    switch (iconType) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'phone':
        return <PhoneCall className="h-5 w-5" />;
      case 'in-person':
        return <User className="h-5 w-5" />;
      case 'regular':
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {types.map((type, index) => (
        <motion.div
          key={type.id}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div
            className={cn(
              "relative flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-all duration-300",
              selectedType === type.id
                ? "border-primary bg-primary/5 hover:bg-primary/10 shadow-sm"
                : "border-border hover:border-primary/40 hover:bg-muted/40"
            )}
            onClick={() => onSelect(type.id)}
          >
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full",
              selectedType === type.id ? "bg-primary text-white" : "bg-muted text-muted-foreground"
            )}>
              {renderIcon(type.icon)}
            </div>
            <div className="flex-1">
              <div className="font-medium">{type.name}</div>
              <div className="text-sm text-muted-foreground">{type.description}</div>
            </div>
            {selectedType === type.id && (
              <motion.div 
                className="absolute top-3 right-3 text-primary"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, type: "spring" }}
              >
                <Check className="h-5 w-5" />
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AppointmentTypeSelector;
