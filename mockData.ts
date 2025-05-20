import { Route, TransportMode, Coordinates } from '../types';

// Helper functions to generate realistic-ish mock data
function getRandomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 15);
}

function calculateMockCarbonFootprint(distance: number, mode: TransportMode): number {
  // Emissions in kg CO2 per km (approximate values)
  const emissionFactors = {
    [TransportMode.WALKING]: 0,
    [TransportMode.CYCLING]: 0,
    [TransportMode.PUBLIC_TRANSIT]: 0.03,
    [TransportMode.TRAIN]: 0.04,
    [TransportMode.CAR]: 0.12,
    [TransportMode.PLANE]: 0.25,
  };
  
  return parseFloat((distance * emissionFactors[mode]).toFixed(2));
}

function generateMockRoute(
  startName: string,
  endName: string,
  transportMode: TransportMode,
  distanceMultiplier = 1
): Route {
  // Generate coordinates for Hyderabad region
  const hyderabadCenter = { lat: 17.3850, lng: 78.4867 };
  const radius = 0.1; // Roughly 10km radius
  
  const startCoords: Coordinates = {
    lat: hyderabadCenter.lat + getRandomInRange(-radius, radius),
    lng: hyderabadCenter.lng + getRandomInRange(-radius, radius),
  };
  
  const endCoords: Coordinates = {
    lat: hyderabadCenter.lat + getRandomInRange(-radius, radius),
    lng: hyderabadCenter.lng + getRandomInRange(-radius, radius),
  };
  
  // Calculate mock distance based on transport mode
  let distance = getRandomInRange(5, 15) * distanceMultiplier;
  
  // Different transport modes have different distance multipliers
  if (transportMode === TransportMode.WALKING) {
    distance = Math.min(distance, 5); // Walking routes are shorter
  } else if (transportMode === TransportMode.CYCLING) {
    distance = Math.min(distance, 10); // Cycling routes are medium length
  } else if (transportMode === TransportMode.PLANE) {
    distance = getRandomInRange(200, 1000); // Flying is for long distances
  }
  
  // Calculate mock duration based on mode and distance
  let durationPerKm: number;
  switch (transportMode) {
    case TransportMode.WALKING:
      durationPerKm = 12; // 12 minutes per km
      break;
    case TransportMode.CYCLING:
      durationPerKm = 4; // 4 minutes per km
      break;
    case TransportMode.PUBLIC_TRANSIT:
      durationPerKm = 3; // 3 minutes per km
      break;
    case TransportMode.CAR:
      durationPerKm = 1.5; // 1.5 minutes per km
      break;
    case TransportMode.TRAIN:
      durationPerKm = 1.2; // 1.2 minutes per km
      break;
    case TransportMode.PLANE:
      durationPerKm = 0.5; // 0.5 minutes per km (including airport time)
      break;
    default:
      durationPerKm = 2;
  }
  
  const duration = Math.round(distance * durationPerKm);
  const carbonFootprint = calculateMockCarbonFootprint(distance, transportMode);
  
  // Generate a simple route path (just for visual purposes)
  const pathPoints = 5;
  const path: Coordinates[] = [];
  
  for (let i = 0; i <= pathPoints; i++) {
    path.push({
      lat: startCoords.lat + (endCoords.lat - startCoords.lat) * (i / pathPoints),
      lng: startCoords.lng + (endCoords.lng - startCoords.lng) * (i / pathPoints),
    });
  }
  
  return {
    id: generateRandomId(),
    startName,
    endName,
    startCoordinates: startCoords,
    endCoordinates: endCoords,
    distance: parseFloat(distance.toFixed(1)),
    duration,
    carbonFootprint,
    transportMode,
    path,
    date: new Date().toISOString(),
  };
}

export function generateMockRoutes(startLocation: string, endLocation: string): Route[] {
  // Generate a different route for each transport mode
  return [
    generateMockRoute(startLocation, endLocation, TransportMode.WALKING, 0.7),
    generateMockRoute(startLocation, endLocation, TransportMode.CYCLING, 0.8),
    generateMockRoute(startLocation, endLocation, TransportMode.PUBLIC_TRANSIT, 1),
    generateMockRoute(startLocation, endLocation, TransportMode.CAR, 1.2),
    generateMockRoute(startLocation, endLocation, TransportMode.TRAIN, 1.1),
  ].sort((a, b) => a.carbonFootprint - b.carbonFootprint); // Sort by carbon footprint
}