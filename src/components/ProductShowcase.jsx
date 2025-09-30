import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, ShoppingCart, ExternalLink, Filter, Search, Tag, TrendingUp, Award, Users, Heart } from 'lucide-react'

export default function ProductShowcase() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('all')

  // Mock data for featured products
  const featuredProducts = [
    {
      id: 1,
      name: "DeWalt 20V MAX Cordless Drill Kit",
      brand: "DeWalt",
      category: "Power Tools",
      price: "£189.99",
      originalPrice: "£229.99",
      discount: "17%",
      rating: 4.8,
      reviews: 1247,
      image: "/product-dewalt-drill.jpg",
      description: "Professional-grade cordless drill with 2 batteries and charger",
      features: ["20V MAX Battery", "2-Speed Transmission", "LED Light", "Belt Hook"],
      affiliate: true,
      sponsored: true,
      communityShare: "5%",
      htkDiscount: "HTK15"
    },
    {
      id: 2,
      name: "Bosch Professional Laser Level",
      brand: "Bosch",
      category: "Measuring Tools",
      price: "£145.00",
      originalPrice: "£165.00",
      discount: "12%",
      rating: 4.9,
      reviews: 892,
      image: "/product-bosch-laser.jpg",
      description: "Self-leveling cross-line laser for precise measurements",
      features: ["Self-Leveling", "Cross-Line Projection", "Magnetic Mount", "Carrying Case"],
      affiliate: true,
      sponsored: false,
      communityShare: "3%",
      htkDiscount: "HTK10"
    },
    {
      id: 3,
      name: "Makita Cordless Impact Driver Set",
      brand: "Makita",
      category: "Power Tools", 
      price: "£199.99",
      originalPrice: "£249.99",
      discount: "20%",
      rating: 4.7,
      reviews: 1056,
      image: "/product-makita-impact.jpg",
      description: "High-torque impact driver with 2 x 5.0Ah batteries",
      features: ["18V LXT Battery", "Variable Speed", "LED Light", "Belt Clip"],
      affiliate: true,
      sponsored: true,
      communityShare: "6%",
      htkDiscount: "HTK20"
    },
    {
      id: 4,
      name: "Stanley FatMax Tape Measure 8m",
      brand: "Stanley",
      category: "Hand Tools",
      price: "£24.99",
      originalPrice: "£29.99",
      discount: "17%",
      rating: 4.6,
      reviews: 2341,
      image: "/product-stanley-tape.jpg",
      description: "Professional tape measure with BladeArmor coating",
      features: ["8m Length", "BladeArmor Coating", "Tru-Zero Hook", "Belt Clip"],
      affiliate: true,
      sponsored: false,
      communityShare: "2%",
      htkDiscount: "HTK5"
    }
  ]

  // Mock data for brand partners
  const brandPartners = [
    {
      name: "DeWalt",
      logo: "/brand-dewalt.png",
      description: "Professional power tools and accessories",
      partnership: "Premium Partner",
      communityContribution: "£12,500",
      productsCount: 45
    },
    {
      name: "Bosch",
      logo: "/brand-bosch.png", 
      description: "Innovative tools and measuring equipment",
      partnership: "Gold Partner",
      communityContribution: "£8,200",
      productsCount: 32
    },
    {
      name: "Makita",
      logo: "/brand-makita.png",
      description: "Cordless tool technology leaders",
      partnership: "Premium Partner", 
      communityContribution: "£15,000",
      productsCount: 38
    },
    {
      name: "Stanley",
      logo: "/brand-stanley.png",
      description: "Hand tools and storage solutions",
      partnership: "Silver Partner",
      communityContribution: "£5,500",
      productsCount: 67
    }
  ]

  const categories = [
    { key: 'all', name: 'All Products' },
    { key: 'power-tools', name: 'Power Tools' },
    { key: 'hand-tools', name: 'Hand Tools' },
    { key: 'measuring', name: 'Measuring Tools' },
    { key: 'safety', name: 'Safety Equipment' },
    { key: 'storage', name: 'Storage & Organization' }
  ]

  const filteredProducts = featuredProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || 
      product.category.toLowerCase().replace(' ', '-') === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand
    
    return matchesCategory && matchesSearch && matchesBrand
  })

  const totalCommunityContribution = brandPartners.reduce((sum, brand) => 
    sum + parseInt(brand.communityContribution.replace('£', '').replace(',', '')), 0
  )

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="htk-header-luxury sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/')}
                className="htk-btn-luxury p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-3">
                <img src="/htk-logo-new.png" alt="HTK Logo" className="h-12 w-12" />
                <div>
                  <h1 className="htk-text-luxury text-xl font-bold">Product Showcase</h1>
                  <p className="text-gray-400 text-sm">Tools & Equipment for Professionals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="htk-text-luxury text-4xl md:text-6xl font-bold mb-6">
            Professional Tools & Equipment
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Discover the best tools recommended by HTK tradespeople. Every purchase supports 
            our community projects and helps build stronger local communities.
          </p>
          
          {/* Community Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="htk-card-luxury p-6">
              <Heart className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <div className="htk-stat-number">£{totalCommunityContribution.toLocaleString()}</div>
              <div className="htk-stat-label">Community Contributions</div>
            </div>
            <div className="htk-card-luxury p-6">
              <Users className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <div className="htk-stat-number">{brandPartners.length}</div>
              <div className="htk-stat-label">Brand Partners</div>
            </div>
            <div className="htk-card-luxury p-6">
              <ShoppingCart className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <div className="htk-stat-number">{featuredProducts.length}+</div>
              <div className="htk-stat-label">Featured Products</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="px-4 mb-8">
        <div className="container mx-auto">
          <div className="htk-card-luxury p-6">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
              >
                {categories.map((category) => (
                  <option key={category.key} value={category.key}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Brand Filter */}
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
              >
                <option value="all">All Brands</option>
                {brandPartners.map((brand) => (
                  <option key={brand.name} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <h2 className="htk-text-luxury text-3xl font-bold mb-8 text-center">
            Featured Products
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="htk-card-luxury p-6 group hover:scale-105 transition-transform">
                {/* Product Badges */}
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-2">
                    {product.sponsored && (
                      <span className="bg-yellow-900 text-yellow-300 px-2 py-1 rounded text-xs font-semibold">
                        Sponsored
                      </span>
                    )}
                    {product.discount && (
                      <span className="bg-red-900 text-red-300 px-2 py-1 rounded text-xs font-semibold">
                        -{product.discount} OFF
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-500 text-xs">Community Share</div>
                    <div className="font-semibold text-sm">{product.communityShare}</div>
                  </div>
                </div>

                {/* Product Image */}
                <div className="w-full h-48 bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                  <ShoppingCart className="h-16 w-16 text-gray-500" />
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="htk-text-luxury text-lg font-semibold mb-1">{product.name}</h3>
                    <p className="text-gray-400 text-sm">{product.brand}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center">
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-600'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold htk-text-luxury">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-gray-500 line-through ml-2">{product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  {/* HTK Discount Code */}
                  {product.htkDiscount && (
                    <div className="bg-yellow-900/20 border border-yellow-500/30 p-2 rounded">
                      <div className="flex items-center justify-between">
                        <span className="text-yellow-500 text-sm font-semibold">HTK Discount:</span>
                        <code className="bg-gray-800 px-2 py-1 rounded text-xs">{product.htkDiscount}</code>
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  <div className="space-y-1">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-400 text-sm">
                        <Tag className="h-3 w-3 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-4">
                    <button className="w-full htk-btn-luxury py-3 flex items-center justify-center">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      View Product
                    </button>
                    <button className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 rounded-lg flex items-center justify-center text-sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Compare Prices
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Partners */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="htk-text-luxury text-3xl font-bold mb-8 text-center">
            Our Brand Partners
          </h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            We partner with leading tool manufacturers to bring you the best products at competitive prices. 
            Every partnership contributes to our community projects.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandPartners.map((brand) => (
              <div key={brand.name} className="htk-card-luxury p-6 text-center">
                <div className="w-20 h-20 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-10 w-10 text-yellow-500" />
                </div>
                
                <h3 className="htk-text-luxury text-xl font-semibold mb-2">{brand.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{brand.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Partnership:</span>
                    <span className="text-yellow-500 font-semibold">{brand.partnership}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Products:</span>
                    <span className="text-white">{brand.productsCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Community Fund:</span>
                    <span className="text-green-400 font-semibold">{brand.communityContribution}</span>
                  </div>
                </div>
                
                <button className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 rounded-lg text-sm">
                  View Products
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="htk-text-luxury text-3xl font-bold mb-12 text-center">
            How Product Partnerships Work
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="htk-card-luxury p-6 mb-4">
                <Users className="h-12 w-12 text-yellow-500 mx-auto" />
              </div>
              <h3 className="htk-text-luxury text-lg font-semibold mb-2">Tradesperson Recommendations</h3>
              <p className="text-gray-300 text-sm">
                Products are recommended by real HTK tradespeople based on their professional experience
              </p>
            </div>
            
            <div className="text-center">
              <div className="htk-card-luxury p-6 mb-4">
                <TrendingUp className="h-12 w-12 text-yellow-500 mx-auto" />
              </div>
              <h3 className="htk-text-luxury text-lg font-semibold mb-2">Competitive Pricing</h3>
              <p className="text-gray-300 text-sm">
                We negotiate exclusive discounts and HTK member pricing with our brand partners
              </p>
            </div>
            
            <div className="text-center">
              <div className="htk-card-luxury p-6 mb-4">
                <Heart className="h-12 w-12 text-yellow-500 mx-auto" />
              </div>
              <h3 className="htk-text-luxury text-lg font-semibold mb-2">Community Contribution</h3>
              <p className="text-gray-300 text-sm">
                A percentage of every purchase goes directly to local community projects
              </p>
            </div>
            
            <div className="text-center">
              <div className="htk-card-luxury p-6 mb-4">
                <Award className="h-12 w-12 text-yellow-500 mx-auto" />
              </div>
              <h3 className="htk-text-luxury text-lg font-semibold mb-2">Quality Assurance</h3>
              <p className="text-gray-300 text-sm">
                All featured products are tested and approved by professional tradespeople
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className="py-16 px-4 bg-gradient-to-r from-yellow-900/20 to-yellow-700/20 border-y border-yellow-500/30">
        <div className="container mx-auto text-center">
          <h2 className="htk-text-luxury text-3xl font-bold mb-6">
            Interested in Partnership?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our growing network of brand partners and reach thousands of professional tradespeople 
            while contributing to community development.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="htk-card-luxury p-6">
              <h3 className="htk-text-luxury text-lg font-semibold mb-2">Reach Professionals</h3>
              <p className="text-gray-300 text-sm">Connect with verified tradespeople who make purchasing decisions</p>
            </div>
            <div className="htk-card-luxury p-6">
              <h3 className="htk-text-luxury text-lg font-semibold mb-2">Community Impact</h3>
              <p className="text-gray-300 text-sm">Contribute to local community projects and build brand reputation</p>
            </div>
            <div className="htk-card-luxury p-6">
              <h3 className="htk-text-luxury text-lg font-semibold mb-2">Performance Marketing</h3>
              <p className="text-gray-300 text-sm">Pay only for results with our performance-based partnership model</p>
            </div>
          </div>
          
          <button className="htk-btn-luxury px-8 py-4 text-lg">
            Become a Partner
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-yellow-500/20">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 mb-4">
            All product recommendations come from real HTK tradespeople. Prices and availability may vary.
          </p>
          <p className="text-gray-500 text-sm">
            HTK earns commission from affiliate partnerships, which helps fund platform development and community projects.
          </p>
        </div>
      </footer>
    </div>
  )
}
