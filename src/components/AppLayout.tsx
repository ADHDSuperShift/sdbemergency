import React, { useState, useEffect } from 'react';
import { Province, ProvinceData, EmergencyService } from '../types/emergency';
import ProvinceSelector from './ProvinceSelector';
import TownSearch from './TownSearch';
import EmergencyCard from './EmergencyCard';

const AppLayout: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<Province | ''>('');
  const [provinceData, setProvinceData] = useState<ProvinceData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTown, setSelectedTown] = useState('');
  const [loading, setLoading] = useState(false);

  const loadProvinceData = async (province: Province) => {
    setLoading(true);
    try {
      const response = await fetch(`/data/${province.toLowerCase().replace(/\s+/g, '')}.json`);
      if (response.ok) {
        const data: ProvinceData = await response.json();
        setProvinceData(data);
      } else {
        console.warn(`No data available for ${province}`);
        setProvinceData(null);
      }
    } catch (error) {
      console.error('Error loading province data:', error);
      setProvinceData(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedProvince) {
      loadProvinceData(selectedProvince);
      setSearchTerm('');
      setSelectedTown('');
    } else {
      setProvinceData(null);
      setSearchTerm('');
      setSelectedTown('');
    }
  }, [selectedProvince]);

  const availableTowns = provinceData ? Object.keys(provinceData.towns) : [];
  const selectedTownData = provinceData && selectedTown ? provinceData.towns[selectedTown] : null;

  const handleTownSearch = (term: string) => {
    setSearchTerm(term);
    if (availableTowns.includes(term)) {
      setSelectedTown(term);
    } else {
      setSelectedTown('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="https://d64gsuwffb70l.cloudfront.net/68d8e1bd004fa987682e61f3_1759044065784_da04892c.webp" 
                alt="SA Emergency Logo" 
                className="h-10 w-10 rounded-full"
              />
              <h1 className="text-2xl font-bold text-red-600">SA Emergency Numbers</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-red-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">Emergency Services Directory</h2>
              <p className="text-xl mb-6">Quick access to emergency contacts across South Africa. Select your province and find local emergency services.</p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm">🚨 <strong>National Emergency:</strong> Dial <a href="tel:112" className="underline font-bold">112</a> from any phone</p>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://d64gsuwffb70l.cloudfront.net/68d8e1bd004fa987682e61f3_1759044069084_dc38d856.webp" 
                alt="Emergency Services" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProvinceSelector 
                selectedProvince={selectedProvince}
                onProvinceChange={setSelectedProvince}
              />
              <TownSearch
                searchTerm={searchTerm}
                onSearchChange={handleTownSearch}
                availableTowns={availableTowns}
                disabled={!selectedProvince}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              <p className="mt-2 text-gray-600">Loading emergency services...</p>
            </div>
          )}

          {selectedTownData && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Emergency Services in {selectedTown}, {selectedProvince}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedTownData.services.map((service, index) => (
                  <EmergencyCard key={index} service={service} />
                ))}
              </div>
            </div>
          )}

          {selectedProvince && !selectedTown && !loading && (
            <div className="text-center py-8">
              <p className="text-gray-600">Search for a town in {selectedProvince} to view emergency services.</p>
            </div>
          )}

          {!selectedProvince && (
            <div className="text-center py-8">
              <p className="text-gray-600">Select a province to get started.</p>
            </div>
          )}
        </div>
      </section>

      {/* Disclaimer Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-300 mb-4">
              ⚠️ <strong>Disclaimer:</strong> Verify numbers locally. This app is informational only.
            </p>
            <p className="text-xs text-gray-400">
              Always call 112 for immediate emergency assistance. Local numbers may change without notice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
