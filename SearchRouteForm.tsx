import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Search } from 'lucide-react';
import { generateMockRoutes } from '../utils/mockData';
import { useRouteContext } from '../context/RouteContext';

const SearchRouteForm: React.FC = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { addRoute } = useRouteContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startLocation || !endLocation) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockRoutes = generateMockRoutes(startLocation, endLocation);
      mockRoutes.forEach(route => addRoute(route));
      setIsLoading(false);
      navigate('/routes');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <div className="flex-1">
          <label htmlFor="start" className="block text-sm font-medium text-gray-900 mb-1">
            Starting Point
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              id="start"
              type="text"
              placeholder="Enter starting location"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white/90 backdrop-blur-sm"
              required
            />
          </div>
        </div>
        
        <div className="flex-1">
          <label htmlFor="end" className="block text-sm font-medium text-gray-900 mb-1">
            Destination
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              id="end"
              type="text"
              placeholder="Enter destination"
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white/90 backdrop-blur-sm"
              required
            />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <div className="flex-1">
          <label htmlFor="date" className="block text-sm font-medium text-gray-900 mb-1">
            Date (Optional)
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white/90 backdrop-blur-sm"
            />
          </div>
        </div>
        
        <div className="flex-1">
          <label htmlFor="time" className="block text-sm font-medium text-gray-900 mb-1">
            Time (Optional)
          </label>
          <input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full pl-3 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white/90 backdrop-blur-sm"
          />
        </div>
      </div>
      
      <button
        type="submit"
        className={`w-full py-3 px-6 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-lg shadow transition-colors flex items-center justify-center ${
          isLoading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
        disabled={isLoading || !startLocation || !endLocation}
      >
        {isLoading ? (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Searching Routes...
          </div>
        ) : (
          <>
            <Search size={20} className="mr-2" />
            Find Routes
          </>
        )}
      </button>
    </form>
  );
};

export default SearchRouteForm;