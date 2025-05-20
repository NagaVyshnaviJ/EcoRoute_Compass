import React from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Calendar, MapPin, Leaf, ChevronRight, Car, Train, Bike, UserRound, Trash2 } from 'lucide-react';
import { useRouteContext } from '../context/RouteContext';
import { TransportMode } from '../types';

const HistoryPage: React.FC = () => {
  const { routeHistory } = useRouteContext();
  const navigate = useNavigate();

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

  // Group routes by date
  const groupedHistory = routeHistory.reduce((groups, item) => {
    const date = new Date(item.date).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {} as Record<string, typeof routeHistory>);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <History className="h-6 w-6 text-primary-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Your Route History</h1>
        </div>

        {routeHistory.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <History className="h-8 w-8 text-primary-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Route History Yet</h2>
            <p className="text-gray-600 mb-6">
              Your previously searched and viewed routes will appear here.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Plan Your First Route
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedHistory).map(([date, items]) => (
              <div key={date} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-primary-50 px-4 py-3 border-b border-primary-100 flex items-center">
                  <Calendar className="h-5 w-5 text-primary-500 mr-2" />
                  <h2 className="font-medium text-primary-800">{date}</h2>
                </div>

                <div className="divide-y divide-gray-100">
                  {items.map(({ route }) => (
                    <div 
                      key={route.id} 
                      className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/routes/${route.id}`)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center">
                            <div className="p-2 rounded-full bg-gray-100 mr-3">
                              {getTransportIcon(route.transportMode)}
                            </div>
                            <div>
                              <h3 className="font-medium mb-1 flex items-center">
                                <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                                {route.startName} 
                                <span className="mx-2 text-gray-300">→</span> 
                                <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                                {route.endName}
                              </h3>
                              <div className="flex items-center text-sm text-gray-500">
                                <span className="capitalize">{route.transportMode.replace('_', ' ')}</span>
                                <span className="mx-2">•</span>
                                <span>{route.distance} km</span>
                                <span className="mx-2">•</span>
                                <span>{route.duration} mins</span>
                                <span className="mx-2">•</span>
                                <div className="flex items-center text-primary-600">
                                  <Leaf className="h-4 w-4 mr-1" />
                                  <span>{route.carbonFootprint} kg CO₂</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-center mt-4">
              <button className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear History
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;