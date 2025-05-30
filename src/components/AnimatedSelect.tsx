import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AnimatedSelectPlaceholder from './AnimatedSelectPlaceholder';

interface AnimatedSelectProps {
  onValueChange: (value: string) => void;
  placeholder?: string;
  children: React.ReactNode;
}

const AnimatedSelect: React.FC<AnimatedSelectProps> = ({ 
  onValueChange, 
  placeholder = "Select Class",
  children 
}) => {
  const [hasValue, setHasValue] = useState(false);

  const handleValueChange = (value: string) => {
    setHasValue(true);
    onValueChange(value);
  };

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue 
          placeholder={
            !hasValue ? (
              <AnimatedSelectPlaceholder text={placeholder} />
            ) : undefined
          } 
        />
      </SelectTrigger>
      <SelectContent>
        {children}
      </SelectContent>
    </Select>
  );
};

export default AnimatedSelect;
