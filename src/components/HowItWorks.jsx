import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Users, Search, Handshake, Star, CheckCircle, ArrowRight } from 'lucide-react'

export default function HowItWorks() {
  const navigate = useNavigate()

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
    }
  ]

  const benefits = [
    {
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
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="htk-header px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="htk-logo-container">
            <img 
              src="/htk-logo-large.png" 
              alt="HTK Logo" 
              className="htk-logo-premium htk-logo-medium"
            />
            <span className="htk-logo-text">HANDY TO KNOW</span>
          </div>
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </header>

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
                </CardContent>
              </Card>
            ))}
          </div>
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
              Join as Tradesperson
            </Button>
          </div>
        </div>
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
        </div>
      </footer>
    </div>
  )
}
