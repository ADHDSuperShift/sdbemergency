import React from 'react';
import { Province } from '../types/emergency';

interface ProvinceSelectorProps {
  selectedProvince: Province | '';
  onProvinceChange: (province: Province | '') => void;
}

const provinces: Province[] = [
  'Limpopo',
  'Gauteng',
  'Western Cape',
  'Eastern Cape',
  'Northern Cape',
  'Free State',
  'KwaZulu-Natal',
  'Mpumalanga',
  'North West'
];

const ProvinceSelector: React.FC<ProvinceSelectorProps> = ({ 
  selectedProvince, 
  onProvinceChange 
}) => {
  return (
    <div className="w-full">
      <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-2">
        Select Province
      </label>
      <select
        id="province"
        value={selectedProvince}
        onChange={(e) => onProvinceChange(e.target.value as Province | '')}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900"
      >
        <option value="">Choose a province...</option>
        {provinces.map((province) => (
          <option key={province} value={province}>
            {province}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProvinceSelector;