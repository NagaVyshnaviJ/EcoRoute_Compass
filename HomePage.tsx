import React from 'react';
import { Leaf, MapPin, TrendingDown, History, Star } from 'lucide-react';
import SearchRouteForm from '../components/SearchRouteForm';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/80 to-secondary-700/80 z-0"></div>
        <div 
          className="absolute inset-0 z-0 opacity-50"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-fade-in">
              Travel Smarter, <span className="text-accent-300">Greener</span>, Together
            </h1>
            <p className="text-xl mb-8 opacity-90 animate-slide-up">
              Discover routes with the lowest carbon footprint and make eco-friendly travel choices with every journey.
            </p>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20 animate-slide-up">
              <SearchRouteForm />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose <span className="text-primary-600">EcoRoute</span>?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<TrendingDown className="h-8 w-8 text-primary-500" />}
              title="Lower Carbon Footprint"
              description="Compare multiple routes and transportation options to find the most eco-friendly way to travel."
            />
            <FeatureCard 
              icon={<MapPin className="h-8 w-8 text-primary-500" />}
              title="Interactive Maps"
              description="Visualize your journey with detailed maps showing your route and environmental impact."
            />
            <FeatureCard 
              icon={<History className="h-8 w-8 text-primary-500" />}
              title="Route History"
              description="Save your frequent routes and track your carbon savings over time."
            />
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Make an Impact
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Together our users have reduced carbon emissions by the equivalent of:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <ImpactCard
              number="25,430"
              label="Trees Saved"
              icon={<Leaf className="h-10 w-10 text-primary-500" />}
            />
            <ImpactCard
              number="142,908"
              label="kg CO₂ Reduced"
              icon={<TrendingDown className="h-10 w-10 text-primary-500" />}
            />
            <ImpactCard
              number="87,625"
              label="Routes Planned"
              icon={<MapPin className="h-10 w-10 text-primary-500" />}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary-700 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="EcoRoute helped me reduce my carbon footprint by 35% on my daily commute by suggesting better public transit options."
              author="Emma T."
              role="Daily Commuter"
            />
            <TestimonialCard
              quote="As a business traveler, I appreciate seeing the environmental impact of my trips. It's made me more conscious of my choices."
              author="Michael K."
              role="Business Traveler"
            />
            <TestimonialCard
              quote="I love being able to see how much CO₂ I've saved over time. Makes me feel like I'm making a difference!"
              author="Sarah J."
              role="Eco-conscious Traveler"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Travel Greener?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start planning your next journey with EcoRoute and make a positive impact on our planet.
          </p>
          <button className="px-8 py-3 bg-white text-primary-600 font-medium rounded-full hover:bg-gray-100 transition-colors shadow-md">
            Plan Your Route Now
          </button>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col items-center text-center">
    <div className="bg-primary-50 p-3 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

interface ImpactCardProps {
  number: string;
  label: string;
  icon: React.ReactNode;
}

const ImpactCard: React.FC<ImpactCardProps> = ({ number, label, icon }) => (
  <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
    <div className="flex justify-center mb-4">
      {icon}
    </div>
    <div className="text-3xl font-bold text-gray-800 mb-2">{number}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role }) => (
  <div className="bg-secondary-800 p-6 rounded-xl shadow-md">
    <div className="mb-4 text-yellow-400">
      <Star className="inline-block" size={20} fill="currentColor" />
      <Star className="inline-block" size={20} fill="currentColor" />
      <Star className="inline-block" size={20} fill="currentColor" />
      <Star className="inline-block" size={20} fill="currentColor" />
      <Star className="inline-block" size={20} fill="currentColor" />
    </div>
    <p className="mb-4 italic">{quote}</p>
    <div>
      <p className="font-semibold">{author}</p>
      <p className="text-secondary-300 text-sm">{role}</p>
    </div>
  </div>
);

export default HomePage;