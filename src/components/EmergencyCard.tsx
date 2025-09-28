import React, { useState } from 'react';
import { EmergencyService } from '../types/emergency';

interface EmergencyCardProps {
  service: EmergencyService;
}

const EmergencyCard: React.FC<EmergencyCardProps> = ({ service }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(service.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Police': return '👮‍♂️';
      case 'Fire': return '🚒';
      case 'Ambulance': return '🚑';
      case 'Hospital': return '🏥';
      default: return '📞';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Police': return 'bg-blue-100 text-blue-800';
      case 'Fire': return 'bg-orange-100 text-orange-800';
      case 'Ambulance': return 'bg-red-100 text-red-800';
      case 'Hospital': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-red-100 p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{getCategoryIcon(service.category)}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>
            {service.category}
          </span>
        </div>
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <a 
            href={`tel:${service.phone}`}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-lg transition-colors flex-1 text-center mr-2"
          >
            📞 {service.phone}
          </a>
          <button
            onClick={handleCopyToClipboard}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors"
            title="Copy to clipboard"
          >
            {copied ? '✅' : '📋'}
          </button>
        </div>
        
        <p className="text-sm text-gray-600">📍 {service.address}</p>
      </div>
    </div>
  );
};

export default EmergencyCard;