import React, { createContext, useState, useContext, useEffect } from 'react';
import { Route, RouteHistory, TransportMode } from '../types';

interface RouteContextType {
  routes: Route[];
  routeHistory: RouteHistory[];
  savedRoutes: Route[];
  addRoute: (route: Route) => void;
  addToHistory: (route: Route) => void;
  saveRoute: (route: Route) => void;
  removeFromSaved: (routeId: string) => void;
  getRouteById: (id: string) => Route | undefined;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const useRouteContext = () => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useRouteContext must be used within a RouteProvider');
  }
  return context;
};

interface RouteProviderProps {
  children: React.ReactNode;
}

export const RouteProvider: React.FC<RouteProviderProps> = ({ children }) => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [routeHistory, setRouteHistory] = useState<RouteHistory[]>(() => {
    const saved = localStorage.getItem('routeHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [savedRoutes, setSavedRoutes] = useState<Route[]>(() => {
    const saved = localStorage.getItem('savedRoutes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('routeHistory', JSON.stringify(routeHistory));
  }, [routeHistory]);

  useEffect(() => {
    localStorage.setItem('savedRoutes', JSON.stringify(savedRoutes));
  }, [savedRoutes]);

  const addRoute = (route: Route) => {
    setRoutes((prevRoutes) => [...prevRoutes, route]);
  };

  const addToHistory = (route: Route) => {
    const historyEntry: RouteHistory = {
      route,
      date: new Date().toISOString(),
    };
    setRouteHistory((prev) => [historyEntry, ...prev].slice(0, 20)); // Keep only last 20
  };

  const saveRoute = (route: Route) => {
    setSavedRoutes((prev) => {
      // Check if route already exists
      if (prev.some((r) => r.id === route.id)) {
        return prev;
      }
      return [...prev, route];
    });
  };

  const removeFromSaved = (routeId: string) => {
    setSavedRoutes((prev) => prev.filter((route) => route.id !== routeId));
  };

  const getRouteById = (id: string) => {
    return [...routes, ...savedRoutes].find((route) => route.id === id);
  };

  return (
    <RouteContext.Provider
      value={{
        routes,
        routeHistory,
        savedRoutes,
        addRoute,
        addToHistory,
        saveRoute,
        removeFromSaved,
        getRouteById,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};