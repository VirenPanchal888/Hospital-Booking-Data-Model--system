
import React from 'react';
import { Check, Video, PhoneCall, User, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {types.map((type) => (
        <div
          key={type.id}
          className={cn(
            "relative flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-all duration-300",
            selectedType === type.id
              ? "border-primary bg-primary/5 hover:bg-primary/10"
              : "border-border hover:border-primary/40 hover:bg-muted/40"
          )}
          onClick={() => onSelect(type.id)}
        >
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            selectedType === type.id ? "bg-primary text-white" : "bg-muted text-muted-foreground"
          )}>
            {renderIcon(type.icon)}
          </div>
          <div className="flex-1">
            <div className="font-medium">{type.name}</div>
            <div className="text-xs text-muted-foreground">{type.description}</div>
          </div>
          {selectedType === type.id && (
            <div className="absolute top-3 right-3 text-primary">
              <Check className="h-5 w-5" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AppointmentTypeSelector;
