import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Clock, ArrowRight, Car, Train, Bike, UserRound } from 'lucide-react';
import { useRouteContext } from '../context/RouteContext';
import { TransportMode, Route } from '../types';
import MapView from '../components/MapView';
import SearchRouteForm from '../components/SearchRouteForm';

const RoutesPage: React.FC = () => {
  const { routes, addToHistory } = useRouteContext();
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(
    routes.length > 0 ? routes[0].id : null
  );
  const navigate = useNavigate();

  const selectedRoute = routes.find(route => route.id === selectedRouteId);

  // Group routes by transport mode for better organization
  const routesByMode: Record<TransportMode, Route[]> = {
    [TransportMode.WALKING]: [],
    [TransportMode.CYCLING]: [],
    [TransportMode.PUBLIC_TRANSIT]: [],
    [TransportMode.CAR]: [],
    [TransportMode.TRAIN]: [],
    [TransportMode.PLANE]: [],
  };

  routes.forEach(route => {
    routesByMode[route.transportMode].push(route);
  });

  const handleViewDetails = (route: Route) => {
    addToHistory(route);
    navigate(`/routes/${route.id}`);
  };

  const getTransportIcon = (mode: TransportMode) => {
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

  // Function to determine if a route is eco-friendly based on its carbon footprint
  const getEcoFriendlyRating = (route: Route) => {
    if (route.carbonFootprint === 0) return 'carbon-neutral';
    if (route.carbonFootprint < 1) return 'very-low';
    if (route.carbonFootprint < 3) return 'low';
    if (route.carbonFootprint < 8) return 'medium';
    return 'high';
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="bg-primary-50 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Find Your Route</h1>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <SearchRouteForm />
          </div>
        </div>
      </div>

      {routes.length > 0 ? (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-2/5 order-2 lg:order-1">
              <h2 className="text-xl font-semibold mb-4">Route Options</h2>
              <p className="text-gray-600 mb-6">
                From <span className="font-medium">{routes[0]?.startName}</span> to{' '}
                <span className="font-medium">{routes[0]?.endName}</span>
              </p>

              <div className="space-y-4">
                {Object.entries(routesByMode).map(([mode, modeRoutes]) => 
                  modeRoutes.length > 0 && (
                    <RouteOption 
                      key={mode}
                      route={modeRoutes[0]}
                      isSelected={modeRoutes[0].id === selectedRouteId}
                      onSelect={() => setSelectedRouteId(modeRoutes[0].id)}
                      ecoRating={getEcoFriendlyRating(modeRoutes[0])}
                      icon={getTransportIcon(modeRoutes[0].transportMode)}
                      onViewDetails={() => handleViewDetails(modeRoutes[0])}
                    />
                  )
                )}
              </div>
            </div>

            <div className="w-full lg:w-3/5 order-1 lg:order-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {selectedRoute && (
                  <div className="h-[500px]">
                    <MapView 
                      startCoordinates={selectedRoute.startCoordinates}
                      endCoordinates={selectedRoute.endCoordinates}
                      routePath={selectedRoute.path || []}
                      transportMode={selectedRoute.transportMode}
                    />
                  </div>
                )}
              </div>

              {selectedRoute && (
                <div className="bg-white rounded-lg shadow-md mt-4 p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    Route Details: {selectedRoute.transportMode.replace('_', ' ')}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DetailItem 
                      icon={<Clock className="text-gray-600" size={18} />}
                      label="Duration"
                      value={`${selectedRoute.duration} mins`}
                    />
                    <DetailItem 
                      icon={<ArrowRight className="text-gray-600" size={18} />}
                      label="Distance"
                      value={`${selectedRoute.distance} km`}
                    />
                    <DetailItem 
                      icon={<Leaf className="text-primary-500" size={18} />}
                      label="Carbon Footprint"
                      value={`${selectedRoute.carbonFootprint} kg CO₂`}
                    />
                    <DetailItem 
                      icon={getTransportIcon(selectedRoute.transportMode)}
                      label="Transport"
                      value={selectedRoute.transportMode.replace('_', ' ')}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-gray-600">
            Enter your starting point and destination to find eco-friendly routes.
          </p>
        </div>
      )}
    </div>
  );
};

interface RouteOptionProps {
  route: Route;
  isSelected: boolean;
  onSelect: () => void;
  onViewDetails: () => void;
  ecoRating: string;
  icon: React.ReactNode;
}

const RouteOption: React.FC<RouteOptionProps> = ({ 
  route, 
  isSelected, 
  onSelect, 
  onViewDetails,
  ecoRating,
  icon
}) => {
  const getBadgeColor = () => {
    switch (ecoRating) {
      case 'carbon-neutral':
        return 'bg-success-100 text-success-800';
      case 'very-low':
        return 'bg-success-100 text-success-800';
      case 'low':
        return 'bg-primary-100 text-primary-800';
      case 'medium':
        return 'bg-warning-100 text-warning-800';
      case 'high':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEcoLabel = () => {
    switch (ecoRating) {
      case 'carbon-neutral':
        return 'Carbon Neutral';
      case 'very-low':
        return 'Very Low Emissions';
      case 'low':
        return 'Low Emissions';
      case 'medium':
        return 'Moderate Emissions';
      case 'high':
        return 'High Emissions';
      default:
        return '';
    }
  };

  return (
    <div 
      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'border-primary-500 bg-primary-50 shadow-md' 
          : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-full ${isSelected ? 'bg-primary-100' : 'bg-gray-100'}`}>
            {icon}
          </div>
          <h3 className="font-medium capitalize">
            {route.transportMode.replace('_', ' ')}
          </h3>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${getBadgeColor()}`}>
          {getEcoLabel()}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center">
          <p className="text-xs text-gray-500">Distance</p>
          <p className="font-medium">{route.distance} km</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Duration</p>
          <p className="font-medium">{route.duration} mins</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">CO₂</p>
          <p className="font-medium">{route.carbonFootprint} kg</p>
        </div>
      </div>

      <button 
        className="w-full py-2 text-sm text-primary-600 hover:text-primary-700 font-medium border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onViewDetails();
        }}
      >
        View Details
      </button>
    </div>
  );
};

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value }) => (
  <div className="flex flex-col items-center text-center">
    <div className="mb-1">{icon}</div>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default RoutesPage;