import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RoutesPage from './pages/RoutesPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import RouteDetailsPage from './pages/RouteDetailsPage';
import { RouteProvider } from './context/RouteContext';

function App() {
  return (
    <RouteProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="routes" element={<RoutesPage />} />
          <Route path="routes/:id" element={<RouteDetailsPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </RouteProvider>
  );
}

export default App;