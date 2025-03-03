
import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

interface DoctorSearchProps {
  doctors: Doctor[];
  onSelectDoctor: (doctor: Doctor) => void;
  placeholder?: string;
}

const DoctorSearch: React.FC<DoctorSearchProps> = ({
  doctors,
  onSelectDoctor,
  placeholder = "Search for a doctor..."
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.length < 2) {
      setFilteredDoctors([]);
      return;
    }

    const results = doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredDoctors(results);
  }, [searchTerm, doctors]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowDropdown(e.target.value.length >= 2);
  };

  const handleSelectDoctor = (doctor: Doctor) => {
    onSelectDoctor(doctor);
    setSearchTerm('');
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          className="pl-8 pr-4"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => searchTerm.length >= 2 && setShowDropdown(true)}
        />
      </div>

      {showDropdown && filteredDoctors.length > 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-lg">
          <ul className="py-1 text-sm">
            {filteredDoctors.map((doctor) => (
              <li
                key={doctor.id}
                className="cursor-pointer px-3 py-2 hover:bg-muted transition-colors"
                onClick={() => handleSelectDoctor(doctor)}
              >
                <div className="font-medium">{doctor.name}</div>
                <div className="text-xs text-muted-foreground">{doctor.specialty}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showDropdown && searchTerm.length >= 2 && filteredDoctors.length === 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-md border bg-background p-2 shadow-lg text-center text-sm text-muted-foreground">
          No doctors found
        </div>
      )}
    </div>
  );
};

export default DoctorSearch;
