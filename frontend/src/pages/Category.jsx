import { useState } from 'react';

const CategoriesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    {
      id: 'all',
      name: 'All Products',
      image: 'https://via.placeholder.com/300x200?text=All+Products'
    },
    {
      id: 'cotton',
      name: 'Cotton Fabrics',
      image: 'https://via.placeholder.com/300x200?text=Cotton+Fabrics'
    },
    {
      id: 'linen',
      name: 'Linen Textiles',
      image: 'https://via.placeholder.com/300x200?text=Linen+Textiles'
    },
    {
      id: 'silk',
      name: 'Silk Collections',
      image: 'https://via.placeholder.com/300x200?text=Silk+Collections'
    },
    {
      id: 'wool',
      name: 'Wool Materials',
      image: 'https://via.placeholder.com/300x200?text=Wool+Materials'
    },
    {
      id: 'synthetic',
      name: 'Synthetic Blends',
      image: 'https://via.placeholder.com/300x200?text=Synthetic+Blends'
    },
    {
      id: 'decorative',
      name: 'Decorative Textiles',
      image: 'https://via.placeholder.com/300x200?text=Decorative+Textiles'
    },
    {
      id: 'eco',
      name: 'Eco-Friendly',
      image: 'https://via.placeholder.com/300x200?text=Eco-Friendly'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-blue-800">Textile Categories</h1>
          <p className="mt-2 text-sm text-blue-600">
            Explore our wide range of premium textile materials
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-4 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-800 border border-blue-200 hover:bg-blue-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-800">
                  {category.name}
                </h3>
                <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                  View Collection
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Banner */}
        <div className="mt-12 bg-blue-700 rounded-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-white">
                Premium Quality Textiles
              </h2>
              <p className="mt-2 text-blue-100">
                Discover our exclusive collection of handpicked fabrics from
                around the world.
              </p>
              <button className="mt-4 px-6 py-2 bg-white text-blue-700 rounded-md hover:bg-blue-50 transition-colors font-medium self-start">
                Explore Now
              </button>
            </div>
            <div className="md:w-1/2 h-64 md:h-auto">
              <img
                src="https://via.placeholder.com/600x400?text=Premium+Textiles"
                alt="Premium Textiles"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-blue-600">
            © 2023 Textile Emporium. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CategoriesPage;