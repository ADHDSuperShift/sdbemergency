import React from 'react';

interface TownSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  availableTowns: string[];
  disabled?: boolean;
}

const TownSearch: React.FC<TownSearchProps> = ({ 
  searchTerm, 
  onSearchChange, 
  availableTowns,
  disabled = false 
}) => {
  const filteredTowns = availableTowns.filter(town =>
    town.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <label htmlFor="town-search" className="block text-sm font-medium text-gray-700 mb-2">
        Search Town/City
      </label>
      <div className="relative">
        <input
          id="town-search"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={disabled ? "Select a province first..." : "Type to search towns..."}
          disabled={disabled}
          className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:text-gray-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-400">🔍</span>
        </div>
      </div>
      
      {searchTerm && !disabled && (
        <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {filteredTowns.length > 0 ? (
            filteredTowns.map((town) => (
              <button
                key={town}
                onClick={() => onSearchChange(town)}
                className="w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-700 transition-colors"
              >
                📍 {town}
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500 text-sm">
              No towns found matching "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TownSearch;