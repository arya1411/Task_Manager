import React, { useState, useRef, useEffect } from 'react';
import { LuArrowUpDown, LuCheck, LuChevronDown } from 'react-icons/lu';

const SortDropdown = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-2 
          bg-white dark:bg-dark-surface 
          border border-gray-200 dark:border-dark-border 
          rounded-xl text-sm font-medium
          text-gray-700 dark:text-dark-text
          hover:bg-gray-50 dark:hover:bg-dark-surface-2
          hover:border-gray-300 dark:hover:border-dark-surface-2
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
          ${isOpen ? 'ring-2 ring-primary/20 border-primary' : ''}
        `}
      >
        <LuArrowUpDown size={16} className="text-gray-400 dark:text-dark-text-secondary" />
        <span className="hidden sm:inline max-w-[140px] truncate">
          {selectedOption?.label || 'Sort by'}
        </span>
        <LuChevronDown 
          size={14} 
          className={`text-gray-400 dark:text-dark-text-secondary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border shadow-lg shadow-gray-200/50 dark:shadow-none overflow-hidden">
            {/* Header */}
            <div className="px-3 py-2 border-b border-gray-100 dark:border-dark-border">
              <p className="text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">
                Sort by
              </p>
            </div>
            
            {/* Options */}
            <div className="py-1 max-h-64 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5 text-sm
                    transition-colors duration-150
                    ${value === option.value 
                      ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                      : 'text-gray-700 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-surface-2'
                    }
                  `}
                >
                  <span className={value === option.value ? 'font-medium' : ''}>
                    {option.label}
                  </span>
                  {value === option.value && (
                    <LuCheck size={16} className="text-primary shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
