import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Star, ShieldCheck, UserCheck } from 'lucide-react';
import Button from '../components/UI/Button';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="absolute inset-0 bg-opacity-50 bg-blue-900">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "url('https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              mixBlendMode: 'overlay'
            }}
          ></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Building Trust Between Tenants and Landlords
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Verified reviews based on real tenancy contracts, creating transparency and accountability in the rental market.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button 
                  size="lg" 
                  variant="primary"
                  className="bg-orange-500 hover:bg-orange-600 border-orange-500 w-full sm:w-auto"
                >
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-white border-white hover:bg-white/10 w-full sm:w-auto"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our simple process ensures verified reviews from both tenants and landlords based on confirmed tenancy contracts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition-transform hover:scale-105">
              <div className="bg-blue-100 text-blue-800 p-3 rounded-full inline-flex items-center justify-center mb-5">
                <Building className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload Contract</h3>
              <p className="text-gray-600">
                Submit your tenancy contract with details of both parties and the property address.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition-transform hover:scale-105">
              <div className="bg-green-100 text-green-800 p-3 rounded-full inline-flex items-center justify-center mb-5">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verification</h3>
              <p className="text-gray-600">
                Our admin team verifies the contract to ensure legitimacy and accuracy.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition-transform hover:scale-105">
              <div className="bg-orange-100 text-orange-800 p-3 rounded-full inline-flex items-center justify-center mb-5">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Leave Reviews</h3>
              <p className="text-gray-600">
                Once verified, both tenants and landlords can leave honest, verified reviews.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-10 lg:mb-0">
              <img 
                src="https://images.pexels.com/photos/7821702/pexels-photo-7821702.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                alt="People shaking hands after signing contract" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose TenantReview?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-blue-100 text-blue-800 p-1 rounded-full">
                      <UserCheck className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-1">Verified Identity</h3>
                    <p className="text-gray-600">
                      All users are verified through government-issued ID, ensuring authenticity of reviews.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-blue-100 text-blue-800 p-1 rounded-full">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-1">Confirmed Contracts</h3>
                    <p className="text-gray-600">
                      Reviews are tied to specific properties and verified tenancy contracts, eliminating fake reviews.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-blue-100 text-blue-800 p-1 rounded-full">
                      <Star className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-1">Two-Way Reviews</h3>
                    <p className="text-gray-600">
                      Both tenants and landlords can review each other, creating a balanced ecosystem of trust.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/register">
                  <Button variant="primary" size="lg">Join Today</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from tenants and landlords who are already using our platform to build trust.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-semibold text-xl">
                    JD
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">John Doe</h4>
                  <p className="text-gray-500">Tenant</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex text-yellow-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
              <p className="text-gray-600">
                "As a tenant, I can now research landlords before signing a lease. The verified reviews gave me confidence in choosing my latest apartment."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-semibold text-xl">
                    MS
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Mary Smith</h4>
                  <p className="text-gray-500">Landlord</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex text-yellow-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
              <p className="text-gray-600">
                "I can now showcase my properties with verified good reviews. My reputation as a fair landlord has helped me find quality tenants faster."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-semibold text-xl">
                    RJ
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Robert Johnson</h4>
                  <p className="text-gray-500">Property Manager</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex text-yellow-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5" />
                </div>
              </div>
              <p className="text-gray-600">
                "Managing multiple properties is easier with this platform. I can assess tenant history and they can see our portfolio of well-maintained properties."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Trust in Your Rental Relationships?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of tenants and landlords creating a more transparent rental market.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button 
                size="lg" 
                variant="primary"
                className="bg-orange-500 hover:bg-orange-600 border-orange-500 w-full sm:w-auto"
              >
                Create Account
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                size="lg" 
                variant="outline"
                className="text-white border-white hover:bg-white/10 w-full sm:w-auto"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;