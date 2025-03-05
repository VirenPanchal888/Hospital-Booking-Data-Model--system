
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { debounce } from 'lodash';

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
  
  // Optimize filtering with useMemo for instant results
  const getFilteredDoctors = useMemo(() => {
    if (searchTerm.length < 2) return [];
    
    return doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, doctors]);
  
  // Adjust debounce for responsive feel but not too fast
  const debouncedSearch = useCallback(
    debounce(() => {
      setFilteredDoctors(getFilteredDoctors);
    }, 300), // Increased debounce time for better UX
    [getFilteredDoctors]
  );

  useEffect(() => {
    debouncedSearch();
    
    // Show dropdown immediately for better UX
    if (searchTerm.length >= 2) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
    
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        // Use a longer delay to ensure the user has time to interact with the dropdown
        setTimeout(() => {
          setShowDropdown(false);
        }, 300);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectDoctor = (doctor: Doctor) => {
    onSelectDoctor(doctor);
    setSearchTerm('');
    
    // Delay hiding dropdown for better UX
    setTimeout(() => {
      setShowDropdown(false);
    }, 300);
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          className="pl-8 pr-4 transition-all focus:ring-primary/20 hover:border-primary/30"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => searchTerm.length >= 2 && setShowDropdown(true)}
          autoComplete="off" // Prevent browser's native autocomplete
        />
      </div>

      {showDropdown && filteredDoctors.length > 0 && (
        <div className="absolute z-[9999] mt-1 w-full rounded-md border bg-white shadow-lg animate-in fade-in-20 zoom-in-95 duration-300">
          <ul className="py-1 text-sm max-h-60 overflow-auto">
            {filteredDoctors.map((doctor) => (
              <li
                key={doctor.id}
                className="cursor-pointer px-3 py-3 hover:bg-muted transition-colors duration-200 hover:translate-x-1"
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
        <div className="absolute z-[9999] mt-1 w-full rounded-md border bg-white p-2 shadow-lg text-center text-sm text-muted-foreground animate-in fade-in-20 zoom-in-95 duration-300">
          No doctors found
        </div>
      )}
    </div>
  );
};

export default DoctorSearch;
