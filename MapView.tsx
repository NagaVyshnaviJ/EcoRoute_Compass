import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Coordinates, TransportMode } from '../types';

// Custom icon for markers
const createIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-pin',
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="24" height="24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
};

const startIcon = createIcon('#16a34a'); // Green
const endIcon = createIcon('#dc2626'); // Red

interface MapViewProps {
  startCoordinates: Coordinates;
  endCoordinates: Coordinates;
  routePath?: Coordinates[];
  transportMode: TransportMode;
}

const MapView: React.FC<MapViewProps> = ({
  startCoordinates,
  endCoordinates,
  routePath = [],
  transportMode,
}) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // When coordinates change, fit the map to show both points
    if (mapRef.current) {
      const map = mapRef.current;
      
      const bounds = L.latLngBounds(
        [startCoordinates.lat, startCoordinates.lng],
        [endCoordinates.lat, endCoordinates.lng]
      );
      
      // Add route path points to bounds if available
      if (routePath && routePath.length > 0) {
        routePath.forEach(point => {
          bounds.extend([point.lat, point.lng]);
        });
      }
      
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [startCoordinates, endCoordinates, routePath]);

  const getRouteColor = () => {
    switch (transportMode) {
      case TransportMode.WALKING:
        return '#10b981'; // Green
      case TransportMode.CYCLING:
        return '#3b82f6'; // Blue
      case TransportMode.PUBLIC_TRANSIT:
        return '#f97316'; // Orange
      case TransportMode.CAR:
        return '#ef4444'; // Red
      case TransportMode.TRAIN:
        return '#8b5cf6'; // Purple
      case TransportMode.PLANE:
        return '#64748b'; // Gray
      default:
        return '#3b82f6';
    }
  };

  return (
    <MapContainer
      center={[
        (startCoordinates.lat + endCoordinates.lat) / 2,
        (startCoordinates.lng + endCoordinates.lng) / 2,
      ]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      whenCreated={(map) => {
        mapRef.current = map;
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Start Marker */}
      <Marker position={[startCoordinates.lat, startCoordinates.lng]} icon={startIcon}>
        <Popup>Starting Point</Popup>
      </Marker>
      
      {/* End Marker */}
      <Marker position={[endCoordinates.lat, endCoordinates.lng]} icon={endIcon}>
        <Popup>Destination</Popup>
      </Marker>
      
      {/* Route path */}
      {routePath && routePath.length > 0 && (
        <Polyline
          positions={routePath.map(point => [point.lat, point.lng])}
          color={getRouteColor()}
          weight={5}
          opacity={0.7}
        />
      )}
    </MapContainer>
  );
};

export default MapView;