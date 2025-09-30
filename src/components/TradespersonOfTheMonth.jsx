import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Crown, Star, Clock, DollarSign, Hammer, Award, MapPin, Calendar, Trophy, Gift, TrendingUp, Users } from 'lucide-react'

export default function TradespersonOfTheMonth() {
  const navigate = useNavigate()
  const [selectedRegion, setSelectedRegion] = useState('uk')
  const [selectedCategory, setSelectedCategory] = useState('overall')

  // Current state - no winners yet as platform is launching
  const currentWinners = {
    uk: {
      overall: null // No winner yet - platform launching
    },
    counties: {} // No county winners yet
  }

  // No yearly winners yet - platform is new
  const yearlyWinners = []

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

      {/* Current Winner Showcase - Empty State */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="htk-card-luxury p-8 text-center">
              {/* Empty State */}
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-gray-600 to-gray-500 text-white px-6 py-3 rounded-full font-bold text-lg">
                  <Crown className="inline h-6 w-6 mr-2" />
                  {selectedRegion === 'uk' ? 'UK' : 'County'} Winner - {new Date().toLocaleDateString('en-GB', { month: 'long' })}
                </div>
              </div>

              {/* Empty State Content */}
              <div className="text-center py-12">
                <div className="w-48 h-48 bg-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Crown className="h-24 w-24 text-gray-500" />
                </div>
                <h2 className="htk-text-luxury text-3xl font-bold mb-4">Your Excellence Could Be Here</h2>
                <p className="text-gray-300 text-xl mb-6">
                  HTK is launching! Be among the first tradespeople to join and compete for recognition.
                </p>
                <div className="bg-gray-800 p-6 rounded-lg mb-6">
                  <h3 className="text-yellow-500 font-semibold mb-3">How to Become Tradesperson of the Month:</h3>
                  <div className="space-y-2 text-gray-300">
                    <p>• Join HTK as a verified tradesperson</p>
                    <p>• Complete jobs with excellent customer service</p>
                    <p>• Maintain high ratings for time keeping, quality, and professionalism</p>
                    <p>• Winners automatically receive 50 credits + recognition</p>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/register/tradesperson')}
                  className="htk-btn-luxury px-8 py-4 text-lg"
                >
                  Join HTK & Compete for Recognition
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* County Winners Grid - Empty State */}
      {selectedRegion === 'counties' && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="htk-text-luxury text-3xl font-bold mb-8 text-center">County Winners</h2>
            <div className="htk-card-luxury p-12 text-center">
              <Crown className="h-24 w-24 text-gray-500 mx-auto mb-6" />
              <h3 className="htk-text-luxury text-2xl font-bold mb-4">County Recognition Coming Soon</h3>
              <p className="text-gray-300 text-lg mb-6">
                Once we have enough tradespeople in each county, we'll start recognizing the best in your local area.
              </p>
              <p className="text-gray-400 mb-8">
                Be among the first to join in your county and compete for local recognition!
              </p>
              <button 
                onClick={() => navigate('/register/tradesperson')}
                className="htk-btn-luxury px-8 py-3"
              >
                Join Your County Competition
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Yearly Winners - Empty State */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="htk-text-luxury text-3xl font-bold mb-8 text-center">
            <Trophy className="inline h-8 w-8 mr-3" />
            Tradesperson of the Year
          </h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            The ultimate recognition for exceptional tradespeople who consistently deliver outstanding service throughout the year.
          </p>
          
          <div className="htk-card-luxury p-12 text-center">
            <Trophy className="h-24 w-24 text-gray-500 mx-auto mb-6" />
            <h3 className="htk-text-luxury text-2xl font-bold mb-4">Annual Recognition Awaits</h3>
            <p className="text-gray-300 text-lg mb-6">
              The first "Tradesperson of the Year" will be crowned in December 2025, based on consistent excellence throughout the year.
            </p>
            <p className="text-gray-400 mb-8">
              Join now and work towards becoming HTK's first annual champion!
            </p>
            <button 
              onClick={() => navigate('/register/tradesperson')}
              className="htk-btn-luxury px-8 py-3"
            >
              Start Your Journey to Excellence
            </button>
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
