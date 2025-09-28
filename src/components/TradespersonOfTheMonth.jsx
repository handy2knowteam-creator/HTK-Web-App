import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Crown, Star, Clock, DollarSign, Hammer, Award, MapPin, Calendar, Trophy, Gift, TrendingUp, Users } from 'lucide-react'

export default function TradespersonOfTheMonth() {
  const navigate = useNavigate()
  const [selectedRegion, setSelectedRegion] = useState('uk')
  const [selectedCategory, setSelectedCategory] = useState('overall')

  // Mock data for current winners
  const currentWinners = {
    uk: {
      overall: {
        name: "James Mitchell",
        trade: "Electrician",
        location: "Manchester, UK",
        avatar: "/tradesperson-1.jpg",
        overallRating: 9.8,
        ratings: {
          timeKeeping: 9.9,
          jobQuality: 9.8,
          pricing: 9.7,
          communication: 9.8,
          cleanliness: 9.9,
          professionalism: 9.8
        },
        completedJobs: 127,
        customerReviews: 89,
        joinedDate: "January 2024",
        specialties: ["Domestic Electrical", "Commercial Wiring", "Smart Home Installation"],
        achievements: ["5-Star Rating Champion", "Customer Favorite", "Quality Excellence"],
        monthlyEarnings: "£8,500",
        testimonial: "James consistently delivers exceptional work with perfect timing. His attention to detail and professional approach makes him stand out among all tradespeople."
      }
    },
    counties: {
      manchester: {
        name: "Sarah Thompson",
        trade: "Plumber", 
        location: "Manchester",
        overallRating: 9.7,
        completedJobs: 89
      },
      birmingham: {
        name: "David Wilson",
        trade: "Carpenter",
        location: "Birmingham", 
        overallRating: 9.6,
        completedJobs: 76
      },
      london: {
        name: "Maria Garcia",
        trade: "Decorator",
        location: "London",
        overallRating: 9.8,
        completedJobs: 134
      }
    }
  }

  // Mock data for yearly winners
  const yearlyWinners = [
    {
      year: 2025,
      name: "Robert Clarke",
      trade: "Builder",
      location: "Leeds, UK",
      overallRating: 9.9,
      achievements: ["UK Tradesperson of the Year", "Excellence in Construction", "Customer Champion"]
    },
    {
      year: 2024,
      name: "Emma Johnson", 
      trade: "Electrician",
      location: "Bristol, UK",
      overallRating: 9.8,
      achievements: ["UK Tradesperson of the Year", "Innovation Award", "Safety Excellence"]
    }
  ]

  const ratingCategories = [
    { key: 'overall', name: 'Overall Excellence', icon: Crown },
    { key: 'timeKeeping', name: 'Time Keeping', icon: Clock },
    { key: 'jobQuality', name: 'Job Quality', icon: Hammer },
    { key: 'pricing', name: 'Fair Pricing', icon: DollarSign },
    { key: 'communication', name: 'Communication', icon: Users },
    { key: 'professionalism', name: 'Professionalism', icon: Award }
  ]

  const regions = [
    { key: 'uk', name: 'UK-Wide' },
    { key: 'counties', name: 'By County' }
  ]

  const counties = [
    'Manchester', 'Birmingham', 'London', 'Leeds', 'Bristol', 'Liverpool', 
    'Sheffield', 'Newcastle', 'Nottingham', 'Cardiff'
  ]

  const currentWinner = selectedRegion === 'uk' 
    ? currentWinners.uk.overall 
    : currentWinners.counties.manchester

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
                  <h1 className="htk-text-luxury text-xl font-bold">Tradesperson of the Month</h1>
                  <p className="text-gray-400 text-sm">Celebrating Excellence in Trades</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Crown className="h-16 w-16 text-yellow-500 mr-4" />
            <h1 className="htk-text-luxury text-4xl md:text-6xl font-bold">
              Excellence Recognition
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Celebrating the UK's finest tradespeople based on real customer ratings. 
            Winners receive 50 credits, exclusive awards, and recognition across the platform.
          </p>
          
          {/* Current Month Display */}
          <div className="bg-gradient-to-r from-yellow-900/20 to-yellow-700/20 border border-yellow-500/30 rounded-lg p-6 mb-8">
            <h2 className="htk-text-luxury text-2xl font-bold mb-2">
              {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })} Winners
            </h2>
            <p className="text-gray-300">
              Based on customer ratings for time keeping, job quality, pricing, communication, and professionalism
            </p>
          </div>
        </div>
      </section>

      {/* Region & Category Selection */}
      <section className="px-4 mb-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
            {/* Region Selection */}
            <div className="htk-card-luxury p-4">
              <h3 className="htk-text-luxury font-semibold mb-3">Select Region</h3>
              <div className="flex gap-2">
                {regions.map((region) => (
                  <button
                    key={region.key}
                    onClick={() => setSelectedRegion(region.key)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedRegion === region.key 
                        ? 'htk-btn-luxury' 
                        : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    {region.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Selection */}
            <div className="htk-card-luxury p-4">
              <h3 className="htk-text-luxury font-semibold mb-3">Select Category</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {ratingCategories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      selectedCategory === category.key 
                        ? 'htk-btn-luxury' 
                        : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    <category.icon className="inline h-4 w-4 mr-1" />
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Winner Showcase */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="htk-card-luxury p-8 text-center">
              {/* Winner Badge */}
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-full font-bold text-lg">
                  <Crown className="inline h-6 w-6 mr-2" />
                  {selectedRegion === 'uk' ? 'UK' : 'County'} Winner - {new Date().toLocaleDateString('en-GB', { month: 'long' })}
                </div>
              </div>

              {/* Winner Profile */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="w-48 h-48 bg-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Hammer className="h-24 w-24 text-yellow-500" />
                  </div>
                  <h2 className="htk-text-luxury text-3xl font-bold mb-2">{currentWinner.name}</h2>
                  <p className="text-yellow-500 text-xl font-semibold mb-2">{currentWinner.trade}</p>
                  <div className="flex items-center justify-center text-gray-400 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    {currentWinner.location}
                  </div>
                  
                  {/* Overall Rating */}
                  <div className="flex items-center justify-center mb-6">
                    <Star className="h-8 w-8 text-yellow-500 fill-current mr-2" />
                    <span className="text-4xl font-bold htk-text-luxury">{currentWinner.overallRating}</span>
                    <span className="text-gray-400 ml-2">/10</span>
                  </div>
                </div>

                <div className="text-left">
                  {/* Detailed Ratings */}
                  {selectedRegion === 'uk' && (
                    <div className="space-y-4 mb-6">
                      <h3 className="htk-text-luxury text-xl font-semibold mb-4">Detailed Ratings</h3>
                      {Object.entries(currentWinner.ratings).map(([key, rating]) => {
                        const category = ratingCategories.find(cat => cat.key === key)
                        return (
                          <div key={key} className="flex items-center justify-between">
                            <div className="flex items-center">
                              {category && <category.icon className="h-4 w-4 text-yellow-500 mr-2" />}
                              <span className="text-gray-300">{category?.name || key}</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-24 bg-gray-700 rounded-full h-2 mr-3">
                                <div 
                                  className="bg-yellow-500 h-2 rounded-full" 
                                  style={{ width: `${(rating / 10) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-yellow-500 font-semibold w-8">{rating}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-800 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold htk-text-luxury">{currentWinner.completedJobs}</div>
                      <div className="text-gray-400 text-sm">Jobs Completed</div>
                    </div>
                    {selectedRegion === 'uk' && (
                      <div className="bg-gray-800 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold htk-text-luxury">{currentWinner.customerReviews}</div>
                        <div className="text-gray-400 text-sm">Customer Reviews</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Winner Rewards */}
              {selectedRegion === 'uk' && (
                <div className="mt-8 p-6 bg-gradient-to-r from-yellow-900/20 to-yellow-700/20 border border-yellow-500/30 rounded-lg">
                  <h3 className="htk-text-luxury text-xl font-semibold mb-4">Monthly Rewards Earned</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-center">
                      <Gift className="h-8 w-8 text-yellow-500 mr-3" />
                      <div>
                        <div className="font-bold">50 Bonus Credits</div>
                        <div className="text-gray-400 text-sm">Platform Credits</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <Award className="h-8 w-8 text-yellow-500 mr-3" />
                      <div>
                        <div className="font-bold">Winner Badge</div>
                        <div className="text-gray-400 text-sm">Profile Recognition</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <TrendingUp className="h-8 w-8 text-yellow-500 mr-3" />
                      <div>
                        <div className="font-bold">Featured Listing</div>
                        <div className="text-gray-400 text-sm">Priority Placement</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Customer Testimonial */}
              {selectedRegion === 'uk' && currentWinner.testimonial && (
                <div className="mt-8 p-6 bg-gray-800 rounded-lg">
                  <h3 className="htk-text-luxury text-lg font-semibold mb-3">Customer Testimonial</h3>
                  <blockquote className="text-gray-300 italic text-lg">
                    "{currentWinner.testimonial}"
                  </blockquote>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* County Winners Grid */}
      {selectedRegion === 'counties' && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="htk-text-luxury text-3xl font-bold mb-8 text-center">County Winners</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(currentWinners.counties).map(([county, winner]) => (
                <div key={county} className="htk-card-luxury p-6 text-center">
                  <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Hammer className="h-12 w-12 text-yellow-500" />
                  </div>
                  <h3 className="htk-text-luxury text-xl font-semibold mb-2">{winner.name}</h3>
                  <p className="text-yellow-500 font-semibold mb-2">{winner.trade}</p>
                  <div className="flex items-center justify-center text-gray-400 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {winner.location}
                  </div>
                  <div className="flex items-center justify-center mb-3">
                    <Star className="h-5 w-5 text-yellow-500 fill-current mr-1" />
                    <span className="font-bold">{winner.overallRating}/10</span>
                  </div>
                  <p className="text-gray-400 text-sm">{winner.completedJobs} jobs completed</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Yearly Winners */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="htk-text-luxury text-3xl font-bold mb-8 text-center">
            <Trophy className="inline h-8 w-8 mr-3" />
            Tradesperson of the Year
          </h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            The ultimate recognition for exceptional tradespeople who consistently deliver outstanding service throughout the year.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {yearlyWinners.map((winner) => (
              <div key={winner.year} className="htk-card-luxury p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="htk-text-luxury text-2xl font-bold">{winner.year} Winner</h3>
                  <Trophy className="h-8 w-8 text-yellow-500" />
                </div>
                
                <div className="text-center mb-6">
                  <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Crown className="h-16 w-16 text-yellow-500" />
                  </div>
                  <h4 className="htk-text-luxury text-xl font-semibold mb-2">{winner.name}</h4>
                  <p className="text-yellow-500 font-semibold mb-2">{winner.trade}</p>
                  <div className="flex items-center justify-center text-gray-400 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    {winner.location}
                  </div>
                  <div className="flex items-center justify-center">
                    <Star className="h-6 w-6 text-yellow-500 fill-current mr-2" />
                    <span className="text-2xl font-bold htk-text-luxury">{winner.overallRating}/10</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h5 className="text-yellow-500 font-semibold">Achievements:</h5>
                  {winner.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center text-gray-300">
                      <Award className="h-4 w-4 text-yellow-500 mr-2" />
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="htk-text-luxury text-3xl font-bold mb-12 text-center">How Winners Are Selected</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="htk-card-luxury p-6 mb-4">
                <Users className="h-12 w-12 text-yellow-500 mx-auto" />
              </div>
              <h3 className="htk-text-luxury text-lg font-semibold mb-2">Customer Ratings</h3>
              <p className="text-gray-300 text-sm">
                Real customers rate tradespeople on time keeping, quality, pricing, communication, and professionalism
              </p>
            </div>
            
            <div className="text-center">
              <div className="htk-card-luxury p-6 mb-4">
                <TrendingUp className="h-12 w-12 text-yellow-500 mx-auto" />
              </div>
              <h3 className="htk-text-luxury text-lg font-semibold mb-2">Automatic Calculation</h3>
              <p className="text-gray-300 text-sm">
                Our system automatically calculates overall scores based on all customer feedback
              </p>
            </div>
            
            <div className="text-center">
              <div className="htk-card-luxury p-6 mb-4">
                <Crown className="h-12 w-12 text-yellow-500 mx-auto" />
              </div>
              <h3 className="htk-text-luxury text-lg font-semibold mb-2">Monthly Selection</h3>
              <p className="text-gray-300 text-sm">
                Highest-rated tradespeople in each region are automatically selected as winners
              </p>
            </div>
            
            <div className="text-center">
              <div className="htk-card-luxury p-6 mb-4">
                <Gift className="h-12 w-12 text-yellow-500 mx-auto" />
              </div>
              <h3 className="htk-text-luxury text-lg font-semibold mb-2">Rewards & Recognition</h3>
              <p className="text-gray-300 text-sm">
                Winners receive 50 credits, badges, featured listings, and exclusive recognition
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-yellow-500/20">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 mb-4">
            Recognition is based on genuine customer feedback and ratings. All winners are selected automatically by our fair rating system.
          </p>
          <button 
            onClick={() => navigate('/register/tradesperson')}
            className="htk-btn-luxury px-8 py-3"
          >
            Join HTK & Compete for Recognition
          </button>
        </div>
      </footer>
    </div>
  )
}
