import React from 'react';
import { Search, X } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

function SearchBar() {
  const { searchTerm, setSearchTerm } = useDashboard();

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <Search className="search-icon" size={20} style={{ fontWeight: 'bold' }} />
        <input
          type="text"
          placeholder="Search widgets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          style={{ fontWeight: 'bold' }}
        />
        {searchTerm && (
          <button 
            className="clear-search-btn" 
            onClick={handleClear}
            aria-label="Clear search"
            style={{ fontWeight: 'bold' }}
          >
            <X size={16} style={{ fontWeight: 'bold' }} />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;