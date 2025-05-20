import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, ArrowRight, Leaf, Share2,
  Heart, UserRound, Car, Bike, Train
} from 'lucide-react';
import { useRouteContext } from '../context/RouteContext';
import { TransportMode } from '../types';
import MapView from '../components/MapView';

const RouteDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getRouteById, saveRoute, savedRoutes } = useRouteContext();
  const [isSaved, setIsSaved] = useState(
    id ? savedRoutes.some(route => route.id === id) : false
  );
  const navigate = useNavigate();
  
  const route = id ? getRouteById(id) : null;
  
  if (!route) {
    return (
      <div className="pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Route Not Found</h1>
          <p className="text-gray-600 mb-6">
            The route you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Find New Routes
          </button>
        </div>
      </div>
    );
  }
  
  const getTransportIcon = (mode: TransportMode) => {
    switch (mode) {
      case TransportMode.WALKING:
        return <UserRound className="h-6 w-6" />;
      case TransportMode.CYCLING:
        return <Bike className="h-6 w-6" />;
      case TransportMode.PUBLIC_TRANSIT:
      case TransportMode.TRAIN:
        return <Train className="h-6 w-6" />;
      case TransportMode.CAR:
        return <Car className="h-6 w-6" />;
      default:
        return <Car className="h-6 w-6" />;
    }
  };
  
  const handleSaveRoute = () => {
    saveRoute(route);
    setIsSaved(true);
  };
  
  const handleShare = () => {
    // In a real app, this would generate a shareable link or open a share dialog
    if (navigator.share) {
      navigator.share({
        title: `EcoRoute: ${route.startName} to ${route.endName}`,
        text: `Check out this eco-friendly route from ${route.startName} to ${route.endName} (${route.carbonFootprint} kg CO₂)`,
        url: window.location.href,
      });
    } else {
      alert('Sharing link copied to clipboard!');
    }
  };
  
  // Calculate how much CO2 was saved compared to the most carbon-intensive option
  const getEnvironmentalImpact = () => {
    // Assuming a car produces around 0.12 kg CO2 per km
    const carEmissions = route.distance * 0.12;
    const savedEmissions = Math.max(0, carEmissions - route.carbonFootprint);
    
    // Convert to equivalent number of trees
    // A mature tree absorbs about 21 kg of CO2 per year
    // So for a day's worth, it's about 0.057 kg
    const treeDaysEquivalent = Math.round(savedEmissions / 0.057);
    
    return {
      savedEmissions: savedEmissions.toFixed(2),
      treeDaysEquivalent,
    };
  };
  
  const impact = getEnvironmentalImpact();
  
  return (
    <div className="pt-16 min-h-screen">
      <div className="bg-primary-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">Route Details</h1>
              <p className="text-gray-600 mb-4">
                From <span className="font-medium">{route.startName}</span> to{' '}
                <span className="font-medium">{route.endName}</span>
              </p>
            </div>
            
            <div className="flex space-x-3 mb-4 md:mb-0">
              <button
                onClick={handleSaveRoute}
                disabled={isSaved}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isSaved 
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                    : 'bg-white text-primary-600 border border-primary-300 hover:bg-primary-50'
                }`}
              >
                <Heart 
                  className={`h-5 w-5 mr-2 ${isSaved ? 'fill-primary-500' : ''}`} 
                />
                {isSaved ? 'Saved' : 'Save Route'}
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center px-4 py-2 bg-white text-primary-600 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-[400px] mb-6">
              <MapView 
                startCoordinates={route.startCoordinates}
                endCoordinates={route.endCoordinates}
                routePath={route.path || []}
                transportMode={route.transportMode}
              />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                {getTransportIcon(route.transportMode)}
                <span className="ml-2 capitalize">
                  {route.transportMode.replace('_', ' ')} Route
                </span>
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <DetailItem 
                  icon={<Clock className="text-gray-600" size={20} />}
                  label="Duration"
                  value={`${route.duration} mins`}
                />
                <DetailItem 
                  icon={<ArrowRight className="text-gray-600" size={20} />}
                  label="Distance"
                  value={`${route.distance} km`}
                />
                <DetailItem 
                  icon={<Leaf className="text-primary-500" size={20} />}
                  label="Carbon Footprint"
                  value={`${route.carbonFootprint} kg CO₂`}
                />
                {/* You could add more details like estimated cost, etc */}
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-lg font-medium mb-3">Route Instructions</h3>
                <ol className="space-y-3 pl-5 list-decimal text-gray-700">
                  <li>Start at {route.startName}</li>
                  <li>Head east on Main St for 0.5 km</li>
                  <li>Turn right onto Park Ave</li>
                  <li>Continue for 2.3 km</li>
                  <li>Turn left onto River St</li>
                  <li>Arrive at {route.endName}</li>
                </ol>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Environmental Impact</h2>
              
              <div className="bg-success-50 border border-success-100 rounded-lg p-4 mb-4">
                <h3 className="text-success-700 font-medium mb-2 flex items-center">
                  <Leaf className="h-5 w-5 mr-2" />
                  Your Positive Impact
                </h3>
                <p className="text-success-800 mb-2">
                  By choosing this route, you're saving approximately:
                </p>
                <p className="text-2xl font-bold text-success-700 mb-1">
                  {impact.savedEmissions} kg CO₂
                </p>
                <p className="text-sm text-success-600">
                  Equivalent to what {impact.treeDaysEquivalent} trees absorb in a day
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium mb-2">Alternative Options</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Compare with other transportation modes:
                </p>
                
                <div className="space-y-3">
                  <TransportOption 
                    mode={TransportMode.WALKING}
                    duration={90}
                    emissions={0}
                    isSelected={route.transportMode === TransportMode.WALKING}
                  />
                  <TransportOption 
                    mode={TransportMode.CYCLING}
                    duration={35}
                    emissions={0}
                    isSelected={route.transportMode === TransportMode.CYCLING}
                  />
                  <TransportOption 
                    mode={TransportMode.PUBLIC_TRANSIT}
                    duration={30}
                    emissions={0.6}
                    isSelected={route.transportMode === TransportMode.PUBLIC_TRANSIT}
                  />
                  <TransportOption 
                    mode={TransportMode.CAR}
                    duration={20}
                    emissions={2.4}
                    isSelected={route.transportMode === TransportMode.CAR}
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Nearby Amenities</h2>
              <p className="text-gray-600 mb-2">Points of interest along your route:</p>
              
              <ul className="space-y-2">
                <li className="p-2 hover:bg-gray-50 rounded flex justify-between">
                  <span>Green Park</span>
                  <span className="text-gray-500">0.2 km away</span>
                </li>
                <li className="p-2 hover:bg-gray-50 rounded flex justify-between">
                  <span>Bike Repair Shop</span>
                  <span className="text-gray-500">1.3 km away</span>
                </li>
                <li className="p-2 hover:bg-gray-50 rounded flex justify-between">
                  <span>Electric Charging Station</span>
                  <span className="text-gray-500">2.1 km away</span>
                </li>
                <li className="p-2 hover:bg-gray-50 rounded flex justify-between">
                  <span>Bicycle Parking</span>
                  <span className="text-gray-500">0.5 km away</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value }) => (
  <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
    <div className="mb-1">{icon}</div>
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

interface TransportOptionProps {
  mode: TransportMode;
  duration: number;
  emissions: number;
  isSelected: boolean;
}

const TransportOption: React.FC<TransportOptionProps> = ({ 
  mode, 
  duration, 
  emissions,
  isSelected 
}) => {
  const getTransportIcon = () => {
    switch (mode) {
      case TransportMode.WALKING:
        return <UserRound className="h-5 w-5" />;
      case TransportMode.CYCLING:
        return <Bike className="h-5 w-5" />;
      case TransportMode.PUBLIC_TRANSIT:
      case TransportMode.TRAIN:
        return <Train className="h-5 w-5" />;
      case TransportMode.CAR:
        return <Car className="h-5 w-5" />;
      default:
        return <Car className="h-5 w-5" />;
    }
  };
  
  return (
    <div className={`flex items-center p-2 rounded-lg ${
      isSelected ? 'bg-primary-100 border border-primary-200' : 'bg-white border border-gray-200'
    }`}>
      <div className={`p-2 rounded-full ${isSelected ? 'bg-primary-200' : 'bg-gray-100'}`}>
        {getTransportIcon()}
      </div>
      <div className="ml-3 flex-1">
        <span className="font-medium capitalize block">
          {mode.replace('_', ' ')}
        </span>
        <div className="flex justify-between text-sm">
          <span>{duration} mins</span>
          <span className={emissions === 0 ? 'text-success-600' : ''}>
            {emissions} kg CO₂
          </span>
        </div>
      </div>
    </div>
  );
};

export default RouteDetailsPage;