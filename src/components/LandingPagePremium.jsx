import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, Shield, Clock, Users, CheckCircle, ArrowRight, Hammer, Wrench, Phone, Award, TrendingUp, Heart } from 'lucide-react'
import NavigationMenu from './NavigationMenu'

export default function LandingPagePremium() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const stats = [
    { number: '2024', label: 'Platform Launch', icon: Star },
    { number: 'BETA', label: 'Early Access Available', icon: Users },
    { number: '£3-£100', label: 'Fair Job Pricing', icon: TrendingUp },
    { number: '24/7', label: 'Community Support', icon: Heart }
  ]

  const features = [
    {
      icon: Shield,
      title: 'Built by Trades',
      description: 'Created by tradespeople who understand the real challenges of the industry',
      highlight: 'Authentic Experience'
    },
    {
      icon: Star,
      title: 'Community First',
      description: 'No commission fees - direct connections that strengthen local communities',
      highlight: 'Zero Commission'
    },
    {
      icon: Clock,
      title: 'Modern Platform',
      description: 'Advanced technology with live portfolios and instant communication',
      highlight: 'Latest Technology'
    },
    {
      icon: Users,
      title: 'Profit Sharing',
      description: '50% of profits returned to communities once we reach £100k milestone',
      highlight: 'Community Benefit'
    }
  ]

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Homeowner, Manchester",
      text: "Finally, a platform that puts community first. Found an amazing local electrician through HTK.",
      rating: 5
    },
    {
      name: "James Thompson",
      role: "Plumber, Birmingham", 
      text: "No commission fees means I can offer better prices to my customers. HTK gets it right.",
      rating: 5
    },
    {
      name: "Emma Davies",
      role: "Property Developer, London",
      text: "The quality of tradespeople on HTK is exceptional. Built by trades, for trades really shows.",
      rating: 5
    }
  ]

  const benefits = [
    { icon: CheckCircle, text: "Direct connections without middleman fees" },
    { icon: CheckCircle, text: "Transparent £1 = 1 credit pricing system" },
    { icon: CheckCircle, text: "Community profit sharing program" },
    { icon: CheckCircle, text: "Professional verification process" },
    { icon: CheckCircle, text: "Mobile-optimized platform" },
    { icon: CheckCircle, text: "24/7 community support" }
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-yellow-600/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-black/95 backdrop-blur-md border-b border-yellow-500/20 sticky top-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Premium Logo */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src="/htk-logo-large.png" 
                  alt="HTK Logo" 
                  className="h-16 w-auto filter drop-shadow-lg"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(185, 151, 91, 0.5))' }}
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  HTK
                </h1>
                <p className="text-gray-400 text-sm font-medium">Handy To Know</p>
              </div>
            </div>

            {/* Navigation */}
            <NavigationMenu />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Premium Badge */}
            <div className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-full mb-8">
              <Award className="h-4 w-4 text-yellow-500 mr-2" />
              <span className="text-yellow-400 font-semibold">Premium Trade Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                Built by Trades,
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                for Trades
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              The premium community-first platform connecting skilled professionals with customers. 
              <span className="text-yellow-400 font-semibold"> Zero commission fees.</span> 
              <span className="text-yellow-400 font-semibold"> Fair pricing.</span> 
              <span className="text-yellow-400 font-semibold"> Community profit sharing.</span>
            </p>
            
            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button
                onClick={() => navigate('/register/customer')}
                className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-lg rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  <Users className="mr-3 h-6 w-6" />
                  Find Premium Tradespeople
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              
              <button
                onClick={() => navigate('/register/tradesperson')}
                className="group relative px-8 py-4 bg-transparent border-2 border-yellow-500 text-yellow-400 font-bold text-lg rounded-lg overflow-hidden transition-all duration-300 hover:bg-yellow-500 hover:text-black hover:scale-105"
              >
                <div className="relative flex items-center">
                  <Hammer className="mr-3 h-6 w-6" />
                  Join as Professional Trade
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>

            {/* Premium Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-xl p-6 transition-all duration-500 hover:border-yellow-500/40 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <stat.icon className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                  <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Premium Platform Features
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the difference of a platform built by industry professionals who understand your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-xl p-8 transition-all duration-500 hover:border-yellow-500/40 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10"
              >
                <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded-full">
                  {feature.highlight}
                </div>
                
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-black" />
                </div>
                
                <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-300 text-center leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  Why Choose HTK Premium?
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-900/50 to-transparent rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-300"
                >
                  <benefit.icon className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                  <span className="text-gray-200 font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900/50 to-transparent">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Trusted by Professionals
              </span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-500 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-xl text-gray-200 mb-6 italic">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              
              <div>
                <div className="font-bold text-yellow-400">{testimonials[currentTestimonial].name}</div>
                <div className="text-gray-400">{testimonials[currentTestimonial].role}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="py-12 px-4 border-t border-yellow-500/20 bg-gradient-to-b from-transparent to-gray-900">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <img 
              src="/htk-logo-large.png" 
              alt="HTK Logo" 
              className="h-12 w-auto filter drop-shadow-lg"
            />
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                HTK - Handy To Know
              </span>
            </div>
          </div>
          <p className="text-gray-400 mb-4 font-medium">Premium trade platform - Built by trades, for trades</p>
          <p className="text-gray-500 text-sm">© 2024 HTK Platform. Launching Soon on handy2know.com</p>
        </div>
      </footer>
    </div>
  )
}
