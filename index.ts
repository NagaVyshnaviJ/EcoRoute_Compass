export type Coordinates = {
  lat: number;
  lng: number;
};

export enum TransportMode {
  WALKING = 'walking',
  CYCLING = 'cycling',
  PUBLIC_TRANSIT = 'public_transit',
  CAR = 'car',
  TRAIN = 'train',
  PLANE = 'plane',
}

export interface Route {
  id: string;
  startName: string;
  endName: string;
  startCoordinates: Coordinates;
  endCoordinates: Coordinates;
  distance: number; // in kilometers
  duration: number; // in minutes
  carbonFootprint: number; // in kg of CO2
  transportMode: TransportMode;
  path?: Coordinates[]; // Route path for the map
  date: string;
}

export interface RouteHistory {
  route: Route;
  date: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferredTransportModes: TransportMode[];
  totalCarbonSaved: number;
  routesPlanned: number;
}