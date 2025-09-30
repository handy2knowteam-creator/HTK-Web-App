import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, Shield, Clock, Users, CheckCircle, ArrowRight, Hammer, Phone, Mail } from 'lucide-react'

export default function LandingPageWorking() {
  const navigate = useNavigate()

  const stats = [
    { number: '2024', label: 'Platform Launch' },
    { number: 'BETA', label: 'Early Access' },
    { number: '£3-£100', label: 'Fair Job Pricing' },
    { number: '24/7', label: 'Community Support' }
  ]

  const features = [
    {
      icon: Shield,
      title: 'Built by Trades',
      description: 'Created by tradespeople who understand the industry challenges'
    },
    {
      icon: Star,
      title: 'Community First',
      description: 'No commission fees - direct connections that strengthen communities'
    },
    {
      icon: Clock,
      title: 'Modern Platform',
      description: 'Advanced technology with live portfolios and instant communication'
    },
    {
      icon: Users,
      title: 'Profit Sharing',
      description: '50% of profits returned to communities once we reach £100k milestone'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-yellow-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/htk-logo-premium.png" 
                alt="HTK Logo" 
                className="h-12 w-12"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
              <div>
                <h1 className="text-2xl font-bold text-yellow-400">HTK</h1>
                <p className="text-gray-400 text-sm">Handy To Know</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              <button 
                onClick={() => navigate('/how-it-works')}
                className="text-gray-300 hover:text-yellow-400 transition-colors"
              >
                How It Works
              </button>
              <button 
                onClick={() => navigate('/community-hub')}
                className="text-gray-300 hover:text-yellow-400 transition-colors"
              >
                Community
              </button>
              <button 
                onClick={() => navigate('/admin/login')}
                className="text-gray-300 hover:text-yellow-400 transition-colors"
              >
                Admin
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full mb-8">
              <Star className="h-4 w-4 text-yellow-500 mr-2" />
              <span className="text-yellow-400 font-semibold">Premium Trade Platform</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Built by Trades,</span>
              <br />
              <span className="text-yellow-400">for Trades</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              The premium community-first platform connecting skilled professionals with customers. 
              <span className="text-yellow-400 font-semibold"> Zero commission fees.</span> 
              <span className="text-yellow-400 font-semibold"> Fair pricing.</span> 
              <span className="text-yellow-400 font-semibold"> Community profit sharing.</span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button
                onClick={() => navigate('/register/customer')}
                className="px-8 py-4 bg-yellow-500 text-black font-bold text-lg rounded-lg hover:bg-yellow-400 transition-all duration-300 flex items-center justify-center"
              >
                <Users className="mr-3 h-6 w-6" />
                Find Premium Tradespeople
                <ArrowRight className="ml-3 h-5 w-5" />
              </button>
              
              <button
                onClick={() => navigate('/register/tradesperson')}
                className="px-8 py-4 bg-transparent border-2 border-yellow-500 text-yellow-400 font-bold text-lg rounded-lg hover:bg-yellow-500 hover:text-black transition-all duration-300 flex items-center justify-center"
              >
                <Hammer className="mr-3 h-6 w-6" />
                Join as Professional Trade
                <ArrowRight className="ml-3 h-5 w-5" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-gray-900 border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-500/40 transition-all"
                >
                  <div className="text-2xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                  <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-400">
              Premium Platform Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the difference of a platform built by industry professionals who understand your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-900 border border-yellow-500/20 rounded-xl p-8 hover:border-yellow-500/40 hover:scale-105 transition-all duration-300"
              >
                <div className="bg-yellow-500 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-black" />
                </div>
                
                <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-300 text-center leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6 text-yellow-400">
                Why Choose HTK Premium?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Direct connections without middleman fees",
                "Transparent £1 = 1 credit pricing system", 
                "Community profit sharing program",
                "Professional verification process",
                "Mobile-optimized platform",
                "24/7 community support"
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-all"
                >
                  <CheckCircle className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                  <span className="text-gray-200 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-yellow-500/20 bg-gray-900">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <img 
              src="/htk-logo-premium.png" 
              alt="HTK Logo" 
              className="h-12 w-12"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
            <div>
              <span className="text-2xl font-bold text-yellow-400">
                HTK - Handy To Know
              </span>
            </div>
          </div>
          <p className="text-gray-400 mb-4 font-medium">Premium trade platform - Built by trades, for trades</p>
          <p className="text-gray-500 text-sm">© 2024 HTK Platform. Live on handy2know.com</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="mailto:handy2knowteam@gmail.com" className="text-yellow-400 hover:text-yellow-300 flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              handy2knowteam@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
