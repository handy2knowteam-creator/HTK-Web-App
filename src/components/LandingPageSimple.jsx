import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, Shield, Clock, Users, CheckCircle, ArrowRight, Hammer, Wrench, Home, Phone, User, MapPin, BookOpen, Network } from 'lucide-react'
import NavigationMenu from './NavigationMenu'

export default function LandingPageSimple() {
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="htk-header-luxury sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src="/htk-logo-large.png" 
                alt="HTK Logo" 
                className="htk-logo-luxury"
                style={{ height: '60px', width: 'auto' }}
              />
              <div>
                <h1 className="htk-text-luxury text-2xl font-bold">HTK</h1>
                <p className="text-gray-400 text-sm">Handy To Know</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <NavigationMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="htk-text-luxury text-5xl md:text-7xl font-bold mb-6">
              Built by Trades, for Trades
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              The professional trade platform that puts tradespeople first. Direct connections, 
              authentic relationships, and tools designed by those who understand the trade.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => navigate('/register/customer')}
                className="htk-btn-luxury px-8 py-4 text-lg"
              >
                <Users className="mr-2 h-5 w-5" />
                Find Tradespeople
              </button>
              <button
                onClick={() => navigate('/register/tradesperson')}
                style={{
                  background: 'transparent',
                  border: '2px solid #DAA520',
                  color: '#DAA520',
                  padding: '15px 30px',
                  borderRadius: '10px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#DAA520'
                  e.target.style.color = '#000'
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent'
                  e.target.style.color = '#DAA520'
                }}
              >
                <Wrench className="mr-2 h-5 w-5" style={{ display: 'inline' }} />
                Join as Tradesperson
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="htk-stat-luxury">
                  <div className="htk-stat-number">{stat.number}</div>
                  <div className="htk-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="htk-text-luxury text-4xl font-bold mb-4">
              Why Choose HTK?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We understand the trades because we are the trades. Built with real industry experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="htk-card-luxury p-6 text-center">
                <feature.icon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="htk-text-luxury text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-yellow-500/20">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img 
              src="/htk-logo-large.png" 
              alt="HTK Logo" 
              className="htk-logo-luxury"
              style={{ height: '40px', width: 'auto' }}
            />
            <span className="htk-text-luxury text-xl font-bold">HTK - Handy To Know</span>
          </div>
          <p className="text-gray-400 mb-4">Built by trades, for trades</p>
          <p className="text-gray-500 text-sm">© 2024 HTK Platform. Launching Soon.</p>
        </div>
      </footer>
    </div>
  )
}

