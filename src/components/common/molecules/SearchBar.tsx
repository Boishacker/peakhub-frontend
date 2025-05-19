import React, { useState } from 'react';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const SearchBar = ({
  className = '',
  placeholder = 'Search for courses...',
  onSearch,
  onFocus,
  onBlur
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  const searchIconStyle = {
    position: 'absolute' as const,
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: isFocused ? '#6f0fe0' : '#999',
    transition: 'color 0.2s ease'
  };

  const inputStyle = {
    width: '100%',
    height: '56px',
    paddingLeft: '50px',
    paddingRight: '50px',
    outline: 'none',
    border: `1px solid ${isFocused ? '#6f0fe0' : isHovered ? '#cbd5e1' : '#e2e8f0'}`,
    borderRadius: '9999px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    boxShadow: isFocused ? '0 0 0 4px rgba(111, 15, 224, 0.1)' : 'none'
  };

  const buttonStyle = {
    position: 'absolute' as const,
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: isFocused ? '#6f0fe0' : '#666',
    transition: 'color 0.2s ease, transform 0.2s ease',
    outline: 'none',
    padding: '8px',
    borderRadius: '50%'
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <div style={searchIconStyle}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path 
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input 
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={inputStyle}
          placeholder={placeholder}
          className="search-input"
        />
        <style>
          {`
            .search-input::placeholder {
              color: #94a3b8;
              transition: color 0.2s ease;
            }
            .search-input:focus::placeholder {
              color: #cbd5e1;
            }
            .search-input:focus {
              background-color: #fdfcff;
            }
          `}
        </style>
        
      </div>
    </form>
  );
};

export default SearchBar; 