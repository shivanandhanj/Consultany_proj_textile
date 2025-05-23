import React, { useState, useMemo } from 'react';
import { Filter, Grid, List, Heart, User,ShoppingCart, Star,Menu, Search, ChevronDown, X } from 'lucide-react';
import LogoutButton from '../components/LogoutButton';
import { useNavigate ,Link} from "react-router-dom";
export default function CategoryPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample product data based on your schema
  const products = [
    {
      id: 1,
      name: "Cotton Casual Shirt",
      category: "Men",
      subcategory: "Shirts",
      brand: "StyleCraft",
      description: "Comfortable cotton shirt perfect for casual wear",
      price: 1299,
      discount_price: 999,
      size: ["S", "M", "L", "XL"],
      color_variants: [
        { color: "Blue", images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400"] },
        { color: "White", images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400"] }
      ],
      fabric: "Cotton",
      pattern: "Solid",
      sleeve_length: "Full Sleeve",
      fit: "Regular",
      occasion: "Casual",
      stock: 25,
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      name: "Elegant Floral Dress",
      category: "Women",
      subcategory: "Dresses",
      brand: "FashionHub",
      description: "Beautiful floral dress for special occasions",
      price: 2499,
      discount_price: 1999,
      size: ["XS", "S", "M", "L"],
      color_variants: [
        { color: "Pink", images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400"] },
        { color: "Blue", images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400"] }
      ],
      fabric: "Chiffon",
      pattern: "Floral",
      sleeve_length: "Sleeveless",
      fit: "A-Line",
      occasion: "Party",
      stock: 15,
      rating: 4.8,
      reviews: 89
    },
    {
      id: 3,
      name: "Classic Denim Jeans",
      category: "Men",
      subcategory: "Jeans",
      brand: "DenimCo",
      description: "High-quality denim jeans with perfect fit",
      price: 1899,
      discount_price: 1499,
      size: ["30", "32", "34", "36"],
      color_variants: [
        { color: "Dark Blue", images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=400"] },
        { color: "Black", images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400"] }
      ],
      fabric: "Denim",
      pattern: "Solid",
      sleeve_length: "N/A",
      fit: "Slim",
      occasion: "Casual",
      stock: 30,
      rating: 4.3,
      reviews: 245
    },
    {
      id: 4,
      name: "Silk Blouse",
      category: "Women",
      subcategory: "Tops",
      brand: "LuxeFashion",
      description: "Luxurious silk blouse for professional wear",
      price: 3299,
      discount_price: 2599,
      size: ["XS", "S", "M", "L", "XL"],
      color_variants: [
        { color: "Cream", images: ["https://images.unsplash.com/photo-1564257577817-665133e34c89?w=400"] },
        { color: "Black", images: ["https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=400"] }
      ],
      fabric: "Silk",
      pattern: "Solid",
      sleeve_length: "Three Quarter",
      fit: "Relaxed",
      occasion: "Formal",
      stock: 12,
      rating: 4.7,
      reviews: 67
    },
    {
      id: 5,
      name: "Casual T-Shirt",
      category: "Men",
      subcategory: "T-Shirts",
      brand: "ComfortWear",
      description: "Soft cotton t-shirt for everyday comfort",
      price: 799,
      discount_price: 599,
      size: ["S", "M", "L", "XL", "XXL"],
      color_variants: [
        { color: "White", images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"] },
        { color: "Gray", images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400"] }
      ],
      fabric: "Cotton",
      pattern: "Solid",
      sleeve_length: "Short Sleeve",
      fit: "Regular",
      occasion: "Casual",
      stock: 50,
      rating: 4.2,
      reviews: 312
    },
    {
      id: 6,
      name: "Printed Kurti",
      category: "Women",
      subcategory: "Kurtis",
      brand: "EthnicStyle",
      description: "Traditional printed kurti with modern appeal",
      price: 1599,
      discount_price: 1299,
      size: ["S", "M", "L", "XL"],
      color_variants: [
        { color: "Red", images: ["https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400"] },
        { color: "Green", images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"] }
      ],
      fabric: "Cotton",
      pattern: "Printed",
      sleeve_length: "Three Quarter",
      fit: "A-Line",
      occasion: "Ethnic",
      stock: 20,
      rating: 4.4,
      reviews: 156
    }
  ];

  // Get unique values for filters
  const categories = ['All', ...new Set(products.map(p => p.category))];
  const subcategories = ['All', ...new Set(products.map(p => p.subcategory))];
  const brands = ['All', ...new Set(products.map(p => p.brand))];
  const sizes = ['All', ...new Set(products.flatMap(p => p.size))];
  const colors = ['All', ...new Set(products.flatMap(p => p.color_variants.map(cv => cv.color)))];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSubcategory = selectedSubcategory === 'All' || product.subcategory === selectedSubcategory;
      const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
      const matchesSize = selectedSize === 'All' || product.size.includes(selectedSize);
      const matchesColor = selectedColor === 'All' || product.color_variants.some(cv => cv.color === selectedColor);
      const matchesPrice = product.discount_price >= priceRange[0] && product.discount_price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesSubcategory && matchesBrand && 
             matchesSize && matchesColor && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.discount_price - b.discount_price);
      case 'price-high':
        return filtered.sort((a, b) => b.discount_price - a.discount_price);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return filtered.sort((a, b) => b.id - a.id);
      default:
        return filtered;
    }
  }, [products, searchQuery, selectedCategory, selectedSubcategory, selectedBrand, 
      selectedSize, selectedColor, priceRange, sortBy]);

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden">
      <div className="relative overflow-hidden">
        <img 
          src={product.color_variants[0].images[0]} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200">
          <Heart size={16} className="text-gray-600 hover:text-red-500" />
        </button>
        {product.discount_price < product.price && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
            {Math.round(((product.price - product.discount_price) / product.price) * 100)}% OFF
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-gray-500">{product.brand}</span>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">{product.category}</span>
        </div>
        
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-400">({product.reviews})</span>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-800">₹{product.discount_price}</span>
          {product.discount_price < product.price && (
            <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
          )}
        </div>
        
       <div className="flex items-center gap-2 mb-3">
  <span className="text-xs text-gray-500">Colors:</span>
  <div className="flex gap-1">
    {product.color_variants.slice(0, 3).map((variant, idx) => (
      <button
        key={idx}
        className="w-5 h-5 rounded-full border border-gray-300"
        style={{ backgroundColor: variant.color.toLowerCase() }}
        title={variant.color}
      />
    ))}
    {product.color_variants.length > 3 && (
      <span className="text-xs text-gray-500">+{product.color_variants.length - 3}</span>
    )}
  </div>
</div>

      
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
                   
<Link to="/productlist" className="text-gray-600 hover:text-indigo-600">
  Shop
</Link>   

<Link to="/about" className="text-gray-600 hover:text-indigo-600">
  About
</Link> 
<Link to="/contact" className="text-gray-600 hover:text-indigo-600">
  Contact
</Link> 
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
              <input
  type="text"
  placeholder="Search products..."
  className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
                <Search className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
              </div>
               <div className="relative" onClick={()=> navigate("/fav")}>
                            <Heart className="h-6 w-6 text-gray-600 cursor-pointer" />
                            </div> <User className="h-6 w-6 text-gray-600 cursor-pointer" />
              <div className="relative" onClick={() => navigate("/cart")}>
                <ShoppingCart className="h-6 w-6 text-gray-600 cursor-pointer" />
                {/* <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span> */}
              </div>
              <div><LogoutButton /></div>
            </div> 
          </div>
        </div>
      </header>


      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-64 bg-white rounded-lg shadow-md p-6 h-fit`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-800">Filters</h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="lg:hidden p-1 hover:bg-gray-100 rounded"
              >
                <X size={18} />
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Subcategory Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {subcategories.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
              </label>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>

            {/* Size Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            {/* Color Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {colors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                  >
                    <Filter size={16} />
                    Filters
                  </button>
                  <span className="text-gray-600">{filteredProducts.length} products found</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center bg-gray-100 rounded-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        viewMode === 'grid' ? 'bg-white shadow' : 'hover:bg-gray-200'
                      }`}
                    >
                      <Grid size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        viewMode === 'list' ? 'bg-white shadow' : 'hover:bg-gray-200'
                      }`}
                    >
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}