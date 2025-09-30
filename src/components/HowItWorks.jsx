import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
<<<<<<< HEAD
import { ArrowLeft, Users, Search, Handshake, Star, CheckCircle, ArrowRight } from 'lucide-react'
=======
import { 
  ArrowLeft, 
  Users, 
  Search, 
  MessageCircle, 
  CheckCircle, 
  Star,
  Shield,
  Clock,
  Hammer,
  Home,
  CreditCard,
  UserCheck
} from 'lucide-react'
>>>>>>> 09eebd7dd14045f89a42c53f1f88cc44dd6816b0

export default function HowItWorks() {
  const navigate = useNavigate()

<<<<<<< HEAD
  const steps = [
    {
      icon: Users,
      title: "Sign Up",
      description: "Create your account as either a customer looking for trades or a tradesperson offering services",
      details: ["Quick registration process", "Verify your credentials", "Set up your profile"]
    },
    {
      icon: Search,
      title: "Connect",
      description: "Customers post jobs, tradespeople browse opportunities and connect directly",
      details: ["Browse available jobs", "Direct communication", "No middleman interference"]
    },
    {
      icon: Handshake,
      title: "Work Together",
      description: "Build authentic relationships and complete quality work with fair compensation",
      details: ["Transparent pricing", "Quality workmanship", "Community-focused approach"]
    },
    {
      icon: Star,
      title: "Grow Together",
      description: "Build your reputation, grow your business, and strengthen the community",
      details: ["Build your portfolio", "Earn community recognition", "Share in platform success"]
=======
  const customerSteps = [
    {
      icon: UserCheck,
      title: "Sign Up as Customer",
      description: "Create your free account and tell us about your project needs.",
      details: "Quick registration with email verification. No upfront costs."
    },
    {
      icon: Search,
      title: "Post Your Job",
      description: "Describe your project and get an instant credit price estimate.",
      details: "Our smart pricing system calculates fair costs from £3-£100 based on job complexity."
    },
    {
      icon: CreditCard,
      title: "Purchase Credits",
      description: "Buy credits to unlock tradesperson contact details (£1 = 1 credit).",
      details: "Secure payment with Stripe. Credits never expire for paid accounts."
    },
    {
      icon: MessageCircle,
      title: "Connect & Hire",
      description: "Contact verified tradespeople directly and arrange your work.",
      details: "Direct communication with skilled professionals in your area."
    }
  ]

  const tradespersonSteps = [
    {
      icon: Hammer,
      title: "Join as Tradesperson",
      description: "Register your trade skills and get verified by our team.",
      details: "Professional verification process to ensure quality standards."
    },
    {
      icon: Search,
      title: "Browse Available Jobs",
      description: "View job opportunities in your area and specialization.",
      details: "Filter by location, budget, urgency, and trade category."
    },
    {
      icon: Star,
      title: "Build Your Reputation",
      description: "Complete jobs and build your profile with customer reviews.",
      details: "Showcase your work portfolio and earn customer trust."
    },
    {
      icon: CheckCircle,
      title: "Grow Your Business",
      description: "Access premium features and expand your customer base.",
      details: "Subscription plans available for enhanced visibility and tools."
>>>>>>> 09eebd7dd14045f89a42c53f1f88cc44dd6816b0
    }
  ]

  const benefits = [
    {
<<<<<<< HEAD
      title: "For Customers",
      items: [
        "Direct access to verified tradespeople",
        "Transparent pricing with no hidden fees",
        "Quality work from community-focused professionals",
        "Support local trades and strengthen your community"
      ]
    },
    {
      title: "For Tradespeople",
      items: [
        "Direct customer connections without commission fees",
        "Build authentic relationships with your community",
        "Fair credit-based system (£1 = 1 credit)",
        "Share in platform profits once we reach £100k"
      ]
=======
      icon: Shield,
      title: "Verified Professionals",
      description: "All tradespeople go through our verification process"
    },
    {
      icon: Star,
      title: "Fair Pricing",
      description: "Transparent credit system with no hidden fees"
    },
    {
      icon: Clock,
      title: "Quick Connections",
      description: "Connect with local trades within minutes"
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Built by trades, for trades with community profit sharing"
>>>>>>> 09eebd7dd14045f89a42c53f1f88cc44dd6816b0
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
<<<<<<< HEAD
      <header className="htk-header px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="htk-logo-container">
            <img 
              src="/htk-logo-large.png" 
              alt="HTK Logo" 
              className="htk-logo-premium htk-logo-medium"
            />
            <span className="htk-logo-text">HANDY TO KNOW</span>
=======
      <header className="htk-header-luxury px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/htk-logo-large.png" 
              alt="HTK Logo" 
              className="htk-logo-luxury"
              style={{ height: '50px', width: 'auto' }}
            />
            <div>
              <h1 className="htk-text-luxury text-xl font-bold">HTK</h1>
              <p className="text-gray-400 text-sm">How It Works</p>
            </div>
>>>>>>> 09eebd7dd14045f89a42c53f1f88cc44dd6816b0
          </div>
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
<<<<<<< HEAD
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
=======
            className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
>>>>>>> 09eebd7dd14045f89a42c53f1f88cc44dd6816b0
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </header>

<<<<<<< HEAD
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold htk-text-gradient mb-6">
            How HTK Works
          </h1>
          <p className="text-xl htk-text-professional max-w-3xl mx-auto mb-8">
            Built by trades, for trades. Our community-first platform connects skilled professionals 
            with customers through authentic relationships and fair opportunities.
          </p>
        </div>

        {/* Steps Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-htk-gold mb-12">
            Simple Steps to Get Started
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="htk-card-premium relative">
                <CardHeader className="text-center">
                  <div className="bg-htk-gold text-black rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="absolute -top-3 -right-3 bg-htk-gold text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <CardTitle className="text-htk-gold text-xl">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="htk-text-professional mb-4 text-center">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm htk-text-muted">
                        <CheckCircle className="h-4 w-4 text-htk-gold mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
=======
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="htk-text-luxury text-4xl md:text-6xl font-bold mb-6">
            How HTK Works
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Connecting skilled tradespeople with customers through a fair, transparent platform. 
            Built by trades, for trades, with community at the heart.
          </p>
        </div>
      </section>

      {/* For Customers Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="htk-text-luxury text-3xl font-bold mb-4">
              For Customers
            </h2>
            <p className="text-xl text-gray-300">
              Find and hire verified tradespeople in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {customerSteps.map((step, index) => (
              <Card key={index} className="htk-card-luxury">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-yellow-500/10 rounded-full w-16 h-16 flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-yellow-500" />
                  </div>
                  <div className="bg-yellow-500 text-black rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    {index + 1}
                  </div>
                  <CardTitle className="htk-text-luxury text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 mb-3">{step.description}</p>
                  <p className="text-sm text-gray-400">{step.details}</p>
>>>>>>> 09eebd7dd14045f89a42c53f1f88cc44dd6816b0
                </CardContent>
              </Card>
            ))}
          </div>
<<<<<<< HEAD
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-htk-gold mb-12">
            Benefits for Everyone
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="htk-card-premium">
                <CardHeader>
                  <CardTitle className="text-htk-gold text-2xl text-center">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {benefit.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-htk-gold mr-3 flex-shrink-0 mt-0.5" />
                        <span className="htk-text-professional">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Focus */}
        <Card className="htk-card-premium mb-16">
          <CardHeader>
            <CardTitle className="text-htk-gold text-3xl text-center">
              Community First Approach
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-xl htk-text-professional mb-6">
              HTK is more than just a platform - we're building a community where trades and customers 
              work together for mutual success.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-htk-gold font-semibold mb-2">No Commission Fees</h3>
                <p className="htk-text-muted text-sm">
                  Direct connections without platform taking a cut of your hard-earned money
                </p>
              </div>
              <div>
                <h3 className="text-htk-gold font-semibold mb-2">Profit Sharing</h3>
                <p className="htk-text-muted text-sm">
                  Once we reach £100k profit, 50% goes back to communities in our service areas
                </p>
              </div>
              <div>
                <h3 className="text-htk-gold font-semibold mb-2">Fair Pricing</h3>
                <p className="htk-text-muted text-sm">
                  Simple credit system: £1 = 1 credit, job leads from £3-£100 based on value
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl htk-text-muted mb-8">
            Join the community of trades and customers building stronger local connections
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/register/customer')}
              className="htk-btn-gold px-8 py-3 text-lg"
            >
              <Users className="h-5 w-5 mr-2" />
              Find Tradespeople
            </Button>
            
            <Button
              onClick={() => navigate('/register/tradesperson')}
              variant="outline"
              className="border-htk-gold text-htk-gold hover:bg-htk-gold hover:text-black px-8 py-3 text-lg"
            >
              <Star className="h-5 w-5 mr-2" />
=======

          <div className="text-center mt-8">
            <Button
              onClick={() => navigate('/register/customer')}
              className="htk-btn-luxury px-8 py-3 text-lg"
            >
              <Users className="h-5 w-5 mr-2" />
              Get Started as Customer
            </Button>
          </div>
        </div>
      </section>

      {/* For Tradespeople Section */}
      <section className="py-16 px-6 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="htk-text-luxury text-3xl font-bold mb-4">
              For Tradespeople
            </h2>
            <p className="text-xl text-gray-300">
              Grow your business with verified job opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tradespersonSteps.map((step, index) => (
              <Card key={index} className="htk-card-luxury">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-yellow-500/10 rounded-full w-16 h-16 flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-yellow-500" />
                  </div>
                  <div className="bg-yellow-500 text-black rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    {index + 1}
                  </div>
                  <CardTitle className="htk-text-luxury text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 mb-3">{step.description}</p>
                  <p className="text-sm text-gray-400">{step.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              onClick={() => navigate('/register/tradesperson')}
              className="htk-btn-real-gold px-8 py-3 text-lg"
            >
              <Hammer className="h-5 w-5 mr-2" />
>>>>>>> 09eebd7dd14045f89a42c53f1f88cc44dd6816b0
              Join as Tradesperson
            </Button>
          </div>
        </div>
<<<<<<< HEAD
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="htk-logo-container justify-center mb-4">
            <img 
              src="/htk-logo-large.png" 
              alt="HTK Logo" 
              className="htk-logo-premium htk-logo-small"
            />
            <span className="htk-logo-text text-lg">HANDY TO KNOW</span>
          </div>
          <p className="htk-text-muted">
            © 2024 HTK - Handy To Know. Built by trades, for trades.
          </p>
=======
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="htk-text-luxury text-3xl font-bold mb-4">
              Why Choose HTK?
            </h2>
            <p className="text-xl text-gray-300">
              Built by tradespeople who understand the industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="htk-card-luxury text-center">
                <CardContent className="pt-6">
                  <benefit.icon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="htk-text-luxury text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Info Section */}
      <section className="py-16 px-6 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="htk-text-luxury text-3xl font-bold mb-6">
            Fair & Transparent Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="htk-card-luxury">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">£3-£100</div>
                <h3 className="font-semibold text-white mb-2">Job Credits</h3>
                <p className="text-gray-300 text-sm">Smart pricing based on job size and complexity</p>
              </CardContent>
            </Card>
            <Card className="htk-card-luxury">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">£1 = 1</div>
                <h3 className="font-semibold text-white mb-2">Credit Value</h3>
                <p className="text-gray-300 text-sm">Simple, transparent credit system</p>
              </CardContent>
            </Card>
            <Card className="htk-card-luxury">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">Never</div>
                <h3 className="font-semibold text-white mb-2">Credits Expire</h3>
                <p className="text-gray-300 text-sm">Your credits are always available (except free trial)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="htk-text-luxury text-3xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the community-first platform that's changing how trades and customers connect
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/register/customer')}
              className="htk-btn-luxury px-8 py-3 text-lg"
            >
              <Users className="h-5 w-5 mr-2" />
              I Need a Tradesperson
            </Button>
            <Button
              onClick={() => navigate('/register/tradesperson')}
              className="htk-btn-real-gold px-8 py-3 text-lg"
            >
              <Hammer className="h-5 w-5 mr-2" />
              I Am a Tradesperson
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-yellow-500/20">
        <div className="max-w-7xl mx-auto text-center">
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
          <p className="text-gray-500 text-sm">© 2024 HTK Platform. Connecting Communities.</p>
>>>>>>> 09eebd7dd14045f89a42c53f1f88cc44dd6816b0
        </div>
      </footer>
    </div>
  )
}
