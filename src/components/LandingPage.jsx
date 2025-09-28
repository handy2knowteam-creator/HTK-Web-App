import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { Star, Shield, Clock, Users, CheckCircle, ArrowRight, Hammer, Wrench, Home, Phone, User, MapPin, BookOpen, Network } from 'lucide-react'
import NavigationMenu from './NavigationMenu'

export default function LandingPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.role) {
      navigate(`/register/${formData.role.toLowerCase()}`)
    }
  }

  const stats = [
    { number: 'NEW', label: 'Platform Launching' },
    { number: 'BETA', label: 'Early Access Available' },
    { number: '2024', label: 'Built for Modern Trades' },
    { number: '24/7', label: 'Platform Support' }
  ]

  const features = [
    {
      icon: Shield,
      title: 'Built by Trades',
      description: 'Created by tradespeople who understand the industry challenges'
    },
    {
      icon: Star,
      title: 'Fair Platform',
      description: 'Transparent pricing and honest connections between trades and customers'
    },
    {
      icon: Clock,
      title: 'Modern Technology',
      description: 'Live streaming, portfolios, and direct customer connection'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Join the founding community of professional tradespeople'
    }
  ]

  const tradeServices = [
    { name: 'Plumbing', icon: Wrench, status: 'Ready' },
    { name: 'Electrical', icon: Hammer, status: 'Ready' },
    { name: 'Carpentry', icon: Home, status: 'Ready' },
    { name: 'Painting', icon: Home, status: 'Ready' },
    { name: 'Roofing', icon: Home, status: 'Ready' },
    { name: 'Heating', icon: Wrench, status: 'Ready' }
  ]

  return (
      <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="htk-header sticky top-0 z-50">
        <div className="htk-container px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="htk-logo-container">
              <img src="/htk-logo-large.png" alt="HTK Logo" className="h-16 w-16" />
              <span className="htk-logo-text">HANDY TO KNOW</span>
              <span className="text-xs htk-text-muted">Built by trades, for trades</span>
            </div>
            <div className="hidden lg:flex items-center space-x-6">
              <Button 
                onClick={() => navigate('/coming-soon')}
                variant="ghost" 
                className="htk-text-professional hover:text-htk-gold"
              >
                How it Works
              </Button>
              <Button 
                onClick={() => navigate('/register/tradesperson')}
                variant="ghost" 
                className="htk-text-professional hover:text-htk-gold"
              >
                For Trades
              </Button>
              <Button 
                onClick={() => navigate('/coming-soon')}
                variant="ghost" 
                className="htk-text-professional hover:text-htk-gold"
              >
                Support
              </Button>
              <Button 
                onClick={() => navigate('/login/customer')}
                variant="outline" 
                className="htk-border-gold text-htk-gold hover:bg-htk-gold hover:text-black"
              >
                Sign In
              </Button>
              <NavigationMenu />
            </div>
            {/* Navigation Menu */}
            <div className="lg:hidden">
              <NavigationMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <Badge className="mb-6 bg-yellow-500/20 text-yellow-500 border-yellow-500/30 animate-pulse">
                🚀 LAUNCHING SOON - Be Among the First!
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-yellow-500 to-white bg-clip-text text-transparent">
                Revolutionary
                <span className="text-yellow-500 block animate-bounce">Trade Platform</span>
                Built by Trades, for Trades
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto font-medium">
                🔥 Join the BETA launch of the most exciting trade platform ever created! 
                <span className="text-yellow-500 font-bold">Direct connections</span>, 
                <span className="text-yellow-500 font-bold">live streaming</span>, and 
                <span className="text-yellow-500 font-bold">authentic relationships</span>. 
                The future of trades starts here! ⚡
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  onClick={() => navigate('/register/customer')}
                  className="bg-yellow-500 hover:bg-yellow-500 text-black font-semibold text-lg px-8 py-3 h-auto"
                >
                  Find a Tradesperson
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  onClick={() => navigate('/register/tradesperson')}
                  variant="outline" 
                  className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black text-lg px-8 py-3 h-auto"
                >
                  Join as a Trade
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                  No upfront fees
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                  Instant quotes
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                  Verified professionals
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/home/ubuntu/upload/search_images/RZZj2HOVST8a.jpg" 
                  alt="Professional tradesperson at work"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-yellow-500/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-semibold">Sarah M. - Electrician</div>
                        <div className="text-gray-300 text-sm">Manchester</div>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-white ml-1">4.9</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-yellow-500 mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tradesperson of the Week Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-yellow-500/10 border border-yellow-500/30 rounded-full px-6 py-2 mb-4">
              <Star className="h-4 w-4 text-yellow-500 mr-2 fill-current" />
              <span className="text-yellow-500 font-semibold text-sm">WEEKLY SPOTLIGHT</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Tradesperson of the Week</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Celebrating excellence in our trades community. The highest-rated professional in your area this week.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500/30 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Photo Section */}
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                      <div className="w-48 h-48 bg-gray-800 rounded-full flex items-center justify-center">
                        <User className="h-24 w-24 text-gray-400" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <div className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                        🏆 WINNER
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-black/80 text-yellow-500 px-3 py-1 rounded-full text-sm font-semibold">
                        +50 Credits Awarded
                      </div>
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="p-8 flex flex-col justify-center">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-yellow-500 mb-2">Michael Thompson</h3>
                      <p className="text-gray-300 text-lg mb-1">Master Electrician</p>
                      <p className="text-gray-400 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        Manchester, UK
                      </p>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-5 w-5 text-yellow-500 fill-current" />
                          ))}
                        </div>
                        <span className="text-yellow-500 font-bold text-lg ml-2">5.0</span>
                        <span className="text-gray-400 ml-2">(47 reviews this week)</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-500">98%</div>
                          <div className="text-gray-400 text-sm">Customer Satisfaction</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-500">23</div>
                          <div className="text-gray-400 text-sm">Jobs Completed</div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-yellow-500 font-semibold mb-2">Latest Customer Review:</h4>
                      <blockquote className="text-gray-300 italic border-l-2 border-yellow-500 pl-4">
                        "Absolutely exceptional work! Michael arrived on time, diagnosed the issue quickly, and completed the electrical installation perfectly. Professional, clean, and great value. Highly recommend!"
                      </blockquote>
                      <p className="text-gray-400 text-sm mt-2">- Sarah M., verified customer</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="bg-yellow-500 hover:bg-yellow-500 text-black font-semibold flex-1">
                        View Profile
                      </Button>
                      <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black flex-1">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Competition Info */}
            <div className="mt-12 text-center">
              <Card className="bg-gray-900 border-gray-700 max-w-2xl mx-auto">
                <CardContent className="p-6">
                  <h4 className="text-yellow-500 font-bold text-lg mb-3">🏆 Weekly Competition</h4>
                  <p className="text-gray-300 mb-4">
                    Every week, we celebrate the tradesperson with the highest customer satisfaction ratings in each area.
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-yellow-500 font-bold">50</div>
                      <div className="text-gray-400 text-xs">Bonus Credits</div>
                    </div>
                    <div>
                      <div className="text-yellow-500 font-bold">Featured</div>
                      <div className="text-gray-400 text-xs">Landing Page</div>
                    </div>
                    <div>
                      <div className="text-yellow-500 font-bold">Premium</div>
                      <div className="text-gray-400 text-xs">Visibility</div>
                    </div>
                  </div>
                  <Button className="mt-4 bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 hover:bg-yellow-500 hover:text-black">
                    Learn More About Competition
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trade Collaboration Section */}
      <section className="py-20 px-6 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-yellow-500/10 border border-yellow-500/30 rounded-full px-6 py-2 mb-4">
              <Users className="h-4 w-4 text-yellow-500 mr-2" />
              <span className="text-yellow-500 font-semibold text-sm">BUILT BY TRADES, FOR TRADES</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Trade Collaboration Network</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Connect, collaborate, and grow together. HTK isn't just a platform - it's a community where tradespeople support each other.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Team Projects */}
            <Card className="bg-gray-900 border-gray-700 hover:border-yellow-500/50 transition-all hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-yellow-500 mb-4">Team Projects</h3>
                <p className="text-gray-400 mb-6">
                  Join forces on larger projects. Electricians, plumbers, builders working together for complex renovations.
                </p>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center justify-between">
                    <span>Active Teams:</span>
                    <span className="text-yellow-500 font-semibold">127</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Projects Completed:</span>
                    <span className="text-yellow-500 font-semibold">1,240+</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skill Sharing */}
            <Card className="bg-gray-900 border-gray-700 hover:border-yellow-500/50 transition-all hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-8 w-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-yellow-500 mb-4">Skill Sharing</h3>
                <p className="text-gray-400 mb-6">
                  Learn from master tradespeople. Share techniques, tips, and best practices with the community.
                </p>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center justify-between">
                    <span>Active Mentors:</span>
                    <span className="text-yellow-500 font-semibold">89</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Skills Shared:</span>
                    <span className="text-yellow-500 font-semibold">450+</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Referral Network */}
            <Card className="bg-gray-900 border-gray-700 hover:border-yellow-500/50 transition-all hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Network className="h-8 w-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-yellow-500 mb-4">Referral Network</h3>
                <p className="text-gray-400 mb-6">
                  Refer jobs to trusted colleagues. Build a network of reliable tradespeople you can count on.
                </p>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center justify-between">
                    <span>Referrals Made:</span>
                    <span className="text-yellow-500 font-semibold">2,340</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Success Rate:</span>
                    <span className="text-yellow-500 font-semibold">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Collaboration Features */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-black mb-4">Why Tradespeople Choose HTK</h3>
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <div className="text-black">
                <div className="text-2xl font-bold">No Fees</div>
                <div className="text-sm">Direct connections</div>
              </div>
              <div className="text-black">
                <div className="text-2xl font-bold">Fair Credits</div>
                <div className="text-sm">Transparent pricing</div>
              </div>
              <div className="text-black">
                <div className="text-2xl font-bold">Real Support</div>
                <div className="text-sm">By trades, for trades</div>
              </div>
              <div className="text-black">
                <div className="text-2xl font-bold">Community</div>
                <div className="text-sm">Collaborate & grow</div>
              </div>
            </div>
            <Button className="bg-black text-yellow-500 hover:bg-gray-900 font-semibold px-8 py-3">
              Join the Trade Community
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose HTK?</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              HTK connects skilled tradespeople with customers who value quality work. 
              Fair pricing, transparent processes, and genuine community support.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-900 border-gray-700 hover:border-yellow-500/50 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-yellow-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-yellow-500 mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Trades Section */}
      <section className="py-20 px-6 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Popular Trade Services</h2>
            <p className="text-xl text-gray-400">Find skilled professionals for any job</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trades.map((trade, index) => (
              <Card key={index} className="bg-gray-900 border-gray-700 hover:border-yellow-500/50 transition-all hover:scale-105 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <trade.icon className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{trade.name}</h3>
                        <p className="text-gray-400 text-sm">Platform ready for {trade.name.toLowerCase()}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-yellow-500 mb-4">Featured Partners</h2>
            <p className="text-gray-300 text-lg">Trusted brands that support the trades community</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Sponsorship Slot 1 */}
            <Card className="bg-gray-900 border-gray-700 hover:border-yellow-500 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-lg">LOGO</span>
                </div>
                <h3 className="text-yellow-500 font-semibold text-lg mb-2">Premium Sponsor</h3>
                <p className="text-gray-400 text-sm mb-4">Your brand could be featured here, reaching thousands of tradespeople and customers daily.</p>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-500 text-xs font-medium">SPONSORSHIP AVAILABLE</p>
                  <p className="text-gray-300 text-xs mt-1">Contact us for partnership opportunities</p>
                </div>
              </CardContent>
            </Card>

            {/* Sponsorship Slot 2 */}
            <Card className="bg-gray-900 border-gray-700 hover:border-yellow-500 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-lg">LOGO</span>
                </div>
                <h3 className="text-yellow-500 font-semibold text-lg mb-2">Trade Partner</h3>
                <p className="text-gray-400 text-sm mb-4">Showcase your tools, materials, or services to our verified tradesperson network.</p>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-500 text-xs font-medium">PARTNERSHIP OPPORTUNITY</p>
                  <p className="text-gray-300 text-xs mt-1">Reach 10,000+ active tradespeople</p>
                </div>
              </CardContent>
            </Card>

            {/* Sponsorship Slot 3 */}
            <Card className="bg-gray-900 border-gray-700 hover:border-yellow-500 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-lg">LOGO</span>
                </div>
                <h3 className="text-yellow-500 font-semibold text-lg mb-2">Industry Leader</h3>
                <p className="text-gray-400 text-sm mb-4">Position your brand as a leader in the trades industry with premium placement.</p>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-500 text-xs font-medium">FEATURED PLACEMENT</p>
                  <p className="text-gray-300 text-xs mt-1">Maximum visibility and engagement</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 border-none max-w-2xl mx-auto">
              <CardContent className="p-6">
                <h3 className="text-black font-bold text-xl mb-2">Interested in Sponsorship?</h3>
                <p className="text-black/80 mb-4">Join leading brands in supporting the trades community while reaching your target audience.</p>
                <Button className="bg-black text-yellow-500 hover:bg-gray-900 font-semibold">
                  Contact Partnership Team
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-yellow-500 to-yellow-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-black mb-6 animate-pulse">🔥 Ready to Make HISTORY? 🔥</h2>
          <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto font-bold">
            🎯 Be part of the REVOLUTION! Join the founding members of the most innovative trade platform ever built! 
            <span className="text-black font-black">Early access = Better opportunities!</span> 🚀
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/register/customer')}
              className="bg-black hover:bg-gray-800 text-yellow-500 text-lg px-8 py-3 h-auto font-bold animate-bounce"
            >
              🎯 I NEED A TRADESPERSON!
            </Button>
            <Button 
              onClick={() => navigate('/register/tradesperson')}
              variant="outline" 
              className="border-black text-black hover:bg-black hover:text-yellow-500 text-lg px-8 py-3 h-auto font-bold animate-bounce"
            >
              ⚡ I'M A TRADESPERSON!
            </Button>
          </div>
        </div>
      </section>

      {/* Get Started Form */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-yellow-500 mb-8 text-center">Get started with HTK</h2>
          
          <Card className="bg-black border-gray-700">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-yellow-500 mb-2 block">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-gray-900 border-gray-600 text-white focus:border-yellow-500"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-yellow-500 mb-2 block">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-gray-900 border-gray-600 text-white focus:border-yellow-500"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="role" className="text-yellow-500 mb-2 block">Role</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                    <SelectTrigger className="bg-gray-900 border-gray-600 text-white focus:border-yellow-500">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-600">
                      <SelectItem value="tradesperson" className="text-white">Trade</SelectItem>
                      <SelectItem value="customer" className="text-white">Customer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-500 text-black font-semibold py-3"
                  disabled={!formData.role}
                >
                  Get Started
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Handy To Know — Contact: 
            <a href="mailto:Cotswold.morganmaintenance@gmail.com" className="text-yellow-500 hover:text-yellow-300 ml-1">
              Cotswold.morganmaintenance@gmail.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

