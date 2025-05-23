import { FaTshirt, FaShippingFast, FaLeaf, FaAward } from 'react-icons/fa';
import { Search, ShoppingCart, Menu, Heart, User } from 'lucide-react';
import { useNavigate ,Link} from "react-router-dom";
import LogoutButton from '../components/LogoutButton';
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-blue-50">




         <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 mr-4 cursor-pointer md:hidden" />
              <div className="text-2xl font-bold text-indigo-600">TextileHub</div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">

              <Link to="/" className="text-gray-600 hover:text-indigo-600">
  Home
</Link> 
              
              <Link to="/productList" className="text-gray-600 hover:text-indigo-600">
  Shop
</Link> 

 <Link to="/category" className="text-gray-600 hover:text-indigo-600">
      Category
    </Link>
                     <Link to="/contact" className="text-gray-600 hover:text-indigo-600">
                       Contact
                     </Link>
            </div>
            
            <div className="flex items-center space-x-4">
             
              <div className="relative" onClick={()=> navigate("/fav")}>
              <Heart className="h-6 w-6 text-gray-600 cursor-pointer" />
              </div>
              <div className="relative" onClick={()=> navigate("/profile")}>
              <User className="h-6 w-6 text-gray-600 cursor-pointer" />
              </div>
              
              <div className="relative" onClick={() => navigate("/cart")}>
                <ShoppingCart className="h-6 w-6 text-gray-600 cursor-pointer" />
                       </div>
               <div> <LogoutButton /></div>
            </div> 
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r  from-indigo-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Weaving quality and style into every thread since 2010
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Our Story Section */}
        <div className="flex flex-col md:flex-row items-center mb-20">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Who We Are</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2010, Textile Haven began as a small family-run business with a passion for quality fabrics. 
              Today, we've grown into a leading online destination for premium textiles, serving thousands of 
              satisfied customers worldwide.
            </p>
            <p className="text-gray-700 mb-4">
              Our mission is simple: to provide the finest quality fabrics at affordable prices, while maintaining 
              ethical and sustainable practices throughout our supply chain.
            </p>
            <p className="text-gray-700">
              Every product in our collection is carefully selected by our team of textile experts to ensure 
              durability, comfort, and style.
            </p>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Textile production" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-blue-800 mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaTshirt className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Quality Craftsmanship</h3>
              <p className="text-gray-600">
                We source only the finest materials and work with skilled artisans to create exceptional textiles.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaLeaf className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Sustainability</h3>
              <p className="text-gray-600">
                Committed to eco-friendly practices, from organic materials to responsible manufacturing.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaShippingFast className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Customer First</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority, with easy returns and dedicated customer support.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaAward className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Innovation</h3>
              <p className="text-gray-600">
                Constantly exploring new designs and technologies to bring you cutting-edge textiles.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-blue-800 mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Team member" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-1">Sarah Johnson</h3>
                <p className="text-blue-600 mb-3">Founder & CEO</p>
                <p className="text-gray-600">
                  With 20+ years in the textile industry, Sarah leads our vision for quality and innovation.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Team member" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-1">Michael Chen</h3>
                <p className="text-blue-600 mb-3">Head of Design</p>
                <p className="text-gray-600">
                  Michael's creative vision brings our textile patterns to life with modern aesthetics.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Team member" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-1">Priya Patel</h3>
                <p className="text-blue-600 mb-3">Sustainability Director</p>
                <p className="text-gray-600">
                  Priya ensures our materials and processes meet the highest environmental standards.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-700 rounded-lg p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Our Collection?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Discover the perfect fabric for your next project from our carefully curated selection.
          </p>
          <button className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition duration-300">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;