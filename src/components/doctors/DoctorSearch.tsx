
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Search, User, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { debounce } from 'lodash';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

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
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Optimize filtering with useMemo for instant results
  const getFilteredDoctors = useMemo(() => {
    if (searchTerm.length < 2) return [];
    
    return doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, doctors]);
  
  // Debounce search with increased timeout for better UX
  const debouncedSearch = useCallback(
    debounce(() => {
      setFilteredDoctors(getFilteredDoctors);
    }, 300),
    [getFilteredDoctors]
  );

  useEffect(() => {
    debouncedSearch();
    
    if (searchTerm.length >= 2) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
    
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  // Handle click outside to close dropdown with a delay
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        // Add delay before closing for better UX
        setTimeout(() => {
          setShowDropdown(false);
        }, 150);
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
    
    // Close dropdown with a slight delay
    setTimeout(() => {
      setShowDropdown(false);
    }, 100);
  };

  const clearSearch = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          className="pl-8 pr-10 transition-all duration-300 focus:ring-primary/20 hover:border-primary/30"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => searchTerm.length >= 2 && setShowDropdown(true)}
          autoComplete="off"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-8 w-8 opacity-70 hover:opacity-100"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>

      <AnimatePresence>
        {showDropdown && filteredDoctors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute z-[9999] mt-1 w-full rounded-md border bg-white shadow-lg"
          >
            <ul className="py-1 text-sm max-h-60 overflow-auto">
              {filteredDoctors.map((doctor) => (
                <motion.li
                  key={doctor.id}
                  className="cursor-pointer px-4 py-3 hover:bg-muted transition-colors duration-300 hover:translate-x-1"
                  onClick={() => handleSelectDoctor(doctor)}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                >
                  <div className="flex items-center">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary mr-2">
                      {doctor.name.charAt(0)}
                    </span>
                    <div>
                      <div className="font-medium">{doctor.name}</div>
                      <div className="text-xs text-muted-foreground">{doctor.specialty}</div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {showDropdown && searchTerm.length >= 2 && filteredDoctors.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3 }}
            className="absolute z-[9999] mt-1 w-full rounded-md border bg-white p-4 shadow-lg text-center"
          >
            <User className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No doctors found</p>
            <p className="text-xs text-muted-foreground mt-1">Try a different search term</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoctorSearch;
