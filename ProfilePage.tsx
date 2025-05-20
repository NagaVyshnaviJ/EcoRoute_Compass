import React, { useState } from 'react';
import { User, Leaf, Award, Calendar, Settings, ChevronRight, LogOut } from 'lucide-react';
import { useRouteContext } from '../context/RouteContext';

const ProfilePage: React.FC = () => {
  const { routeHistory, savedRoutes } = useRouteContext();
  const [activeTab, setActiveTab] = useState<'stats' | 'settings'>('stats');
  
  // Calculate total carbon saved
  // Assume average car emits 0.12 kg CO2 per km
  const totalDistanceTraveled = routeHistory.reduce(
    (total, { route }) => total + route.distance,
    0
  );
  
  const totalCarbonEmitted = routeHistory.reduce(
    (total, { route }) => total + route.carbonFootprint,
    0
  );
  
  const averageCarEmissions = totalDistanceTraveled * 0.12;
  const carbonSaved = Math.max(0, averageCarEmissions - totalCarbonEmitted);
  
  // One tree absorbs about 21 kg CO2 per year
  const treesEquivalent = Math.round(carbonSaved / 21);
  
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-primary-600 to-secondary-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-white/20 p-4 rounded-full mb-4">
              <User className="h-12 w-12" />
            </div>
            <h1 className="text-2xl font-bold">Vyshnavi Jayanthi</h1>
            <p className="text-primary-100">Eco Traveler</p>
          </div>
          
          <div className="flex justify-center space-x-3">
            <button 
              className={`px-4 py-2 rounded-full transition-colors ${
                activeTab === 'stats' 
                  ? 'bg-white text-primary-600 font-medium' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
              onClick={() => setActiveTab('stats')}
            >
              My Stats
            </button>
            <button 
              className={`px-4 py-2 rounded-full transition-colors ${
                activeTab === 'settings' 
                  ? 'bg-white text-primary-600 font-medium' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'stats' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatsCard 
                icon={<Leaf className="h-5 w-5 text-primary-500" />}
                title="Carbon Saved"
                value={`${carbonSaved.toFixed(2)} kg CO₂`}
                subtitle={`Equivalent to ${treesEquivalent} trees for a year`}
              />
              <StatsCard 
                icon={<Calendar className="h-5 w-5 text-primary-500" />}
                title="Routes Planned"
                value={routeHistory.length.toString()}
                subtitle="Keep up the good work!"
              />
              <StatsCard 
                icon={<Award className="h-5 w-5 text-primary-500" />}
                title="Eco Level"
                value="Forest Guardian"
                subtitle="Top 15% of users"
              />
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold">Environmental Impact</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <ImpactItem 
                    title="Trees Saved" 
                    value={treesEquivalent.toString()} 
                    percentage={85} 
                  />
                  <ImpactItem 
                    title="Carbon Reduced" 
                    value={`${carbonSaved.toFixed(2)} kg`} 
                    percentage={72} 
                  />
                  <ImpactItem 
                    title="Green Routes" 
                    value={Math.round(routeHistory.length * 0.6).toString()} 
                    percentage={60} 
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold">Transport Usage</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <TransportUsage mode="Walking" percentage={15} color="bg-success-500" />
                  <TransportUsage mode="Cycling" percentage={25} color="bg-primary-500" />
                  <TransportUsage mode="Public Transit" percentage={40} color="bg-secondary-500" />
                  <TransportUsage mode="Car" percentage={20} color="bg-error-500" />
                </div>
                <p className="text-sm text-gray-500 text-center">
                  60% of your travel uses low carbon transportation methods
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold">Achievements</h2>
              </div>
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <Achievement 
                  title="Green Pioneer" 
                  description="First eco-friendly route" 
                  unlocked={true} 
                />
                <Achievement 
                  title="Carbon Crusher" 
                  description="Save 10kg of CO₂" 
                  unlocked={carbonSaved >= 10} 
                />
                <Achievement 
                  title="Route Master" 
                  description="Plan 10 routes" 
                  unlocked={routeHistory.length >= 10} 
                />
                <Achievement 
                  title="Forest Friend" 
                  description="Save equivalent of 5 trees" 
                  unlocked={treesEquivalent >= 5} 
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold">Account Settings</h2>
              </div>
              <div className="divide-y divide-gray-100">
                <SettingsItem icon={<User />} label="Profile Information" />
                <SettingsItem icon={<Settings />} label="Preferences" />
                <SettingsItem icon={<Leaf />} label="Environmental Goals" />
                <SettingsItem icon={<LogOut />} label="Sign Out" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold">Transport Preferences</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <PreferenceToggle label="Walking" enabled={true} />
                  <PreferenceToggle label="Cycling" enabled={true} />
                  <PreferenceToggle label="Public Transit" enabled={true} />
                  <PreferenceToggle label="Car" enabled={false} />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold">Notifications</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <PreferenceToggle label="Route Suggestions" enabled={true} />
                  <PreferenceToggle label="Carbon Savings Milestones" enabled={true} />
                  <PreferenceToggle label="New Eco Features" enabled={true} />
                  <PreferenceToggle label="Marketing Emails" enabled={false} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, value, subtitle }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center mb-3">
      <div className="bg-primary-50 p-2 rounded-full mr-3">
        {icon}
      </div>
      <h3 className="text-gray-700">{title}</h3>
    </div>
    <p className="text-2xl font-bold mb-1">{value}</p>
    <p className="text-sm text-gray-500">{subtitle}</p>
  </div>
);

interface ImpactItemProps {
  title: string;
  value: string;
  percentage: number;
}

const ImpactItem: React.FC<ImpactItemProps> = ({ title, value, percentage }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-gray-700">{title}</span>
      <span className="text-sm font-medium text-gray-700">{value}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-primary-500 h-2.5 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

interface TransportUsageProps {
  mode: string;
  percentage: number;
  color: string;
}

const TransportUsage: React.FC<TransportUsageProps> = ({ mode, percentage, color }) => (
  <div className="text-center">
    <div className="relative w-16 h-16 mx-auto mb-2">
      <svg viewBox="0 0 36 36" className="w-full h-full">
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="3"
          strokeDasharray="100, 100"
        />
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={color.replace('bg-', '')}
          strokeWidth="3"
          strokeDasharray={`${percentage}, 100`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
        {percentage}%
      </div>
    </div>
    <p className="text-sm">{mode}</p>
  </div>
);

interface AchievementProps {
  title: string;
  description: string;
  unlocked: boolean;
}

const Achievement: React.FC<AchievementProps> = ({ title, description, unlocked }) => (
  <div className={`p-4 rounded-lg text-center ${
    unlocked ? 'bg-primary-50 border border-primary-100' : 'bg-gray-50 border border-gray-100'
  }`}>
    <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
      unlocked ? 'bg-primary-100' : 'bg-gray-200'
    }`}>
      <Award className={`h-6 w-6 ${unlocked ? 'text-primary-600' : 'text-gray-400'}`} />
    </div>
    <h3 className={`font-medium ${unlocked ? 'text-primary-800' : 'text-gray-400'}`}>
      {title}
    </h3>
    <p className={`text-xs ${unlocked ? 'text-primary-600' : 'text-gray-400'}`}>
      {description}
    </p>
  </div>
);

interface SettingsItemProps {
  icon: React.ReactNode;
  label: string;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, label }) => (
  <div className="px-6 py-4 hover:bg-gray-50 flex items-center justify-between cursor-pointer">
    <div className="flex items-center">
      <div className="text-gray-500 mr-3">
        {icon}
      </div>
      <span>{label}</span>
    </div>
    <ChevronRight className="h-5 w-5 text-gray-400" />
  </div>
);

interface PreferenceToggleProps {
  label: string;
  enabled: boolean;
}

const PreferenceToggle: React.FC<PreferenceToggleProps> = ({ label, enabled }) => {
  const [isEnabled, setIsEnabled] = useState(enabled);
  
  return (
    <div className="flex items-center justify-between">
      <span className="font-medium">{label}</span>
      <button
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          isEnabled ? 'bg-primary-500' : 'bg-gray-200'
        }`}
        onClick={() => setIsEnabled(!isEnabled)}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isEnabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default ProfilePage;