import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ArrowLeft, 
  Users, 
  Heart, 
  Shield, 
  Star,
  Hammer,
  Home,
  Target,
  Award,
  Handshake,
  Building,
  TrendingUp
} from 'lucide-react'

export default function AboutHTK() {
  const navigate = useNavigate()

  const values = [
    {
      icon: Heart,
      title: "Community First",
      description: "We believe in building stronger communities through authentic relationships between trades and customers."
    },
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "Every tradesperson is verified, and our pricing is completely transparent with no hidden fees."
    },
    {
      icon: Handshake,
      title: "Fair for Everyone",
      description: "Built by trades who understand the challenges. Fair pricing and honest connections for all."
    },
    {
      icon: Star,
      title: "Quality Standards",
      description: "We maintain high standards through verification, reviews, and continuous improvement."
    }
  ]

  const stats = [
    { number: '2024', label: 'Founded by Trades' },
    { number: '100%', label: 'Community Focused' },
    { number: '50%', label: 'Profit Sharing After £100k' },
    { number: '24/7', label: 'Platform Support' }
  ]

  const features = [
    {
      icon: Users,
      title: "Verified Tradespeople",
      description: "Every professional goes through our comprehensive verification process"
    },
    {
      icon: Target,
      title: "Smart Job Matching",
      description: "Our algorithm connects the right trades with the right customers"
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Review system and quality standards ensure excellent service"
    },
    {
      icon: Building,
      title: "Local Focus",
      description: "Supporting local trades and strengthening community connections"
    },
    {
      icon: TrendingUp,
      title: "Business Growth",
      description: "Tools and features to help tradespeople grow their businesses"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Safe, secure transactions and data protection for all users"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
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
              <p className="text-gray-400 text-sm">About Us</p>
            </div>
          </div>
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="htk-text-luxury text-4xl md:text-6xl font-bold mb-6">
            About HTK
          </h1>
          <h2 className="text-2xl md:text-3xl text-yellow-500 font-semibold mb-6">
            Handy To Know
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            HTK is more than just a platform - it's a community-first movement built by tradespeople 
            who understand the real challenges of connecting skilled professionals with customers who need their services.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="htk-text-luxury text-3xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                We're on a mission to revolutionize how tradespeople and customers connect. 
                Built by trades, for trades, we understand the frustrations of commission-heavy platforms 
                and the need for genuine, community-focused solutions.
              </p>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                HTK puts community first. After we reach £100,000 in revenue, 50% of profits go back 
                to local communities, supporting the very people who make our platform successful.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate('/register/tradesperson')}
                  className="htk-btn-real-gold"
                >
                  <Hammer className="h-4 w-4 mr-2" />
                  Join as Tradesperson
                </Button>
                <Button
                  onClick={() => navigate('/register/customer')}
                  className="htk-btn-luxury"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Find Tradespeople
                </Button>
              </div>
            </div>
            <div className="htk-card-luxury p-8">
              <h3 className="htk-text-luxury text-xl font-semibold mb-4">
                Community Commitment
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Heart className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">50% profit sharing with local communities after £100k revenue</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">Transparent pricing with no hidden commission fees</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">Built by tradespeople who understand the industry</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">Quality-focused platform with verified professionals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="htk-text-luxury text-3xl font-bold mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-300">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="htk-card-luxury text-center">
                <CardHeader>
                  <value.icon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <CardTitle className="htk-text-luxury text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="htk-text-luxury text-3xl font-bold mb-4">
              HTK by the Numbers
            </h2>
            <p className="text-xl text-gray-300">
              Building something meaningful for the trades community
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="htk-stat-luxury">
                <div className="htk-stat-number">{stat.number}</div>
                <div className="htk-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="htk-text-luxury text-3xl font-bold mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-gray-300">
              Everything you need for successful trade connections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="htk-card-luxury">
                <CardContent className="pt-6">
                  <feature.icon className="h-8 w-8 text-yellow-500 mb-4" />
                  <h3 className="htk-text-luxury text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-6 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="htk-text-luxury text-3xl font-bold mb-6">
              Our Story
            </h2>
          </div>
          
          <Card className="htk-card-luxury">
            <CardContent className="p-8">
              <div className="prose prose-lg text-gray-300 max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                  HTK was born from real frustration. As working tradespeople, we experienced firsthand 
                  the challenges of existing platforms - high commissions, poor customer connections, 
                  and systems that seemed designed to extract value rather than create it.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  We knew there had to be a better way. A platform built by people who actually 
                  understand the trades, who know what it's like to run a small business, and who 
                  believe that technology should serve communities, not exploit them.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  That's why HTK is different. We're not just another tech company trying to 
                  "disrupt" an industry we don't understand. We ARE the industry. We're tradespeople 
                  building tools for tradespeople, with a commitment to giving back to the communities 
                  that make us successful.
                </p>
                
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 mt-8">
                  <h3 className="htk-text-luxury text-xl font-semibold mb-3">
                    Our Commitment to You
                  </h3>
                  <p className="text-gray-300">
                    We promise to always put community first, maintain transparent pricing, 
                    and share our success with the local communities that support us. 
                    When HTK succeeds, everyone succeeds.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="htk-text-luxury text-3xl font-bold mb-6">
            Join the HTK Community
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Be part of a platform that's built by trades, for trades, with community at its heart
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/register/customer')}
              className="htk-btn-luxury px-8 py-3 text-lg"
            >
              <Users className="h-5 w-5 mr-2" />
              Find Tradespeople
            </Button>
            <Button
              onClick={() => navigate('/register/tradesperson')}
              className="htk-btn-real-gold px-8 py-3 text-lg"
            >
              <Hammer className="h-5 w-5 mr-2" />
              Join as Tradesperson
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
          <p className="text-gray-500 text-sm">© 2024 HTK Platform. Community First.</p>
        </div>
      </footer>
    </div>
  )
}
