import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ArrowLeft, 
  Users, 
  CreditCard, 
  Star,
  Check,
  Hammer,
  Clock,
  Shield,
  Zap,
  Crown,
  Gift,
  Calculator,
  TrendingUp
} from 'lucide-react'

export default function PricingCredits() {
  const navigate = useNavigate()

  const subscriptionPlans = [
    {
      name: "Free Trial",
      price: "£0",
      period: "7 days",
      credits: "5 credits",
      icon: Gift,
      popular: false,
      features: [
        "5 job credits included",
        "7-day trial period",
        "Basic customer support",
        "Access to all tradespeople",
        "Credits expire after trial"
      ],
      buttonText: "Start Free Trial",
      buttonClass: "htk-btn-luxury"
    },
    {
      name: "Bronze",
      price: "£9.99",
      period: "per month",
      credits: "10 credits",
      icon: Shield,
      popular: false,
      features: [
        "10 credits per month",
        "Credits never expire",
        "Priority customer support",
        "Job posting templates",
        "Basic analytics"
      ],
      buttonText: "Choose Bronze",
      buttonClass: "htk-btn-luxury"
    },
    {
      name: "Silver",
      price: "£49.99",
      period: "per month",
      credits: "70 credits",
      icon: Star,
      popular: true,
      features: [
        "70 credits per month",
        "Credits never expire",
        "Premium customer support",
        "Advanced job matching",
        "Detailed analytics",
        "Priority listing"
      ],
      buttonText: "Choose Silver",
      buttonClass: "htk-btn-real-gold"
    },
    {
      name: "Gold",
      price: "£99.99",
      period: "per month",
      credits: "160 credits",
      icon: Crown,
      popular: false,
      features: [
        "160 credits per month",
        "Credits never expire",
        "VIP customer support",
        "Premium job matching",
        "Advanced analytics",
        "Featured listings",
        "Custom branding"
      ],
      buttonText: "Choose Gold",
      buttonClass: "htk-btn-luxury"
    },
    {
      name: "Enterprise",
      price: "£149.99",
      period: "per month",
      credits: "300 credits",
      icon: TrendingUp,
      popular: false,
      features: [
        "300 credits per month",
        "Credits never expire",
        "Dedicated account manager",
        "Custom integrations",
        "White-label options",
        "API access",
        "Custom reporting"
      ],
      buttonText: "Contact Sales",
      buttonClass: "htk-btn-luxury"
    }
  ]

  const jobPricingExamples = [
    {
      category: "Small Jobs",
      priceRange: "£3-£15",
      examples: [
        "Basic plumbing repair",
        "Small electrical fix",
        "Minor carpentry work",
        "Garden maintenance"
      ]
    },
    {
      category: "Medium Jobs",
      priceRange: "£15-£50",
      examples: [
        "Bathroom renovation",
        "Kitchen installation",
        "Roofing repair",
        "Heating system service"
      ]
    },
    {
      category: "Large Jobs",
      priceRange: "£50-£100",
      examples: [
        "Full house renovation",
        "Commercial electrical work",
        "Large construction project",
        "Complex plumbing installation"
      ]
    }
  ]

  const pricingFactors = [
    {
      icon: Calculator,
      title: "Job Budget",
      description: "Higher budget jobs cost more credits (£0-200 to £10,000+)"
    },
    {
      icon: Zap,
      title: "Urgency Level",
      description: "Emergency and high-priority jobs have higher credit costs"
    },
    {
      icon: Clock,
      title: "Location Type",
      description: "Urban and London jobs may cost more credits than rural"
    },
    {
      icon: Star,
      title: "Complexity",
      description: "Specialist and advanced work requires more credits"
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
              <p className="text-gray-400 text-sm">Pricing & Credits</p>
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
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="htk-text-luxury text-4xl md:text-6xl font-bold mb-6">
            Pricing & Credits
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Transparent, fair pricing with no hidden fees. Choose the plan that works for your needs.
          </p>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="htk-text-luxury text-xl font-semibold mb-2">
              Simple Credit System
            </h3>
            <p className="text-gray-300">
              <strong>£1 = 1 Credit</strong> • Job costs range from £3-£100 based on size and complexity • Credits never expire (except free trial)
            </p>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="htk-text-luxury text-3xl font-bold mb-4">
              Subscription Plans
            </h2>
            <p className="text-xl text-gray-300">
              Choose the plan that fits your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {subscriptionPlans.map((plan, index) => (
              <Card key={index} className={`htk-card-luxury relative ${plan.popular ? 'ring-2 ring-yellow-500' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                      POPULAR
                    </div>
                  </div>
                )}
                <CardHeader className="text-center">
                  <plan.icon className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <CardTitle className="htk-text-luxury text-lg">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-white">{plan.price}</div>
                  <div className="text-gray-400 text-sm">{plan.period}</div>
                  <div className="text-yellow-500 font-semibold">{plan.credits}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2 text-sm">
                        <Check className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => navigate('/register/customer')}
                    className={`w-full ${plan.buttonClass}`}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Card className="htk-card-luxury max-w-md mx-auto">
              <CardContent className="pt-6 text-center">
                <CreditCard className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                <h3 className="htk-text-luxury font-semibold mb-2">Pay As You Go</h3>
                <div className="text-2xl font-bold text-white mb-1">£1 per credit</div>
                <p className="text-gray-300 text-sm mb-4">Perfect for occasional use</p>
                <Button
                  onClick={() => navigate('/register/customer')}
                  variant="outline"
                  className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                >
                  Buy Credits
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Job Pricing Examples */}
      <section className="py-16 px-6 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="htk-text-luxury text-3xl font-bold mb-4">
              Job Pricing Examples
            </h2>
            <p className="text-xl text-gray-300">
              See how our smart pricing works for different types of jobs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {jobPricingExamples.map((category, index) => (
              <Card key={index} className="htk-card-luxury">
                <CardHeader className="text-center">
                  <CardTitle className="htk-text-luxury text-xl">{category.category}</CardTitle>
                  <div className="text-2xl font-bold text-yellow-500">{category.priceRange}</div>
                  <div className="text-gray-400 text-sm">in credits</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">{example}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Factors */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="htk-text-luxury text-3xl font-bold mb-4">
              How Job Pricing Works
            </h2>
            <p className="text-xl text-gray-300">
              Our smart algorithm considers multiple factors to ensure fair pricing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingFactors.map((factor, index) => (
              <Card key={index} className="htk-card-luxury text-center">
                <CardContent className="pt-6">
                  <factor.icon className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
                  <h3 className="htk-text-luxury text-lg font-semibold mb-2">{factor.title}</h3>
                  <p className="text-gray-300 text-sm">{factor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="htk-text-luxury text-3xl font-bold mb-6">
              Why Choose HTK Credits?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="htk-card-luxury">
              <CardContent className="p-6">
                <Shield className="h-8 w-8 text-yellow-500 mb-4" />
                <h3 className="htk-text-luxury text-lg font-semibold mb-3">No Hidden Fees</h3>
                <p className="text-gray-300">
                  What you see is what you pay. No commission fees, no surprise charges, 
                  just transparent credit pricing.
                </p>
              </CardContent>
            </Card>

            <Card className="htk-card-luxury">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 text-yellow-500 mb-4" />
                <h3 className="htk-text-luxury text-lg font-semibold mb-3">Credits Never Expire</h3>
                <p className="text-gray-300">
                  Your purchased credits are always available when you need them. 
                  Only free trial credits have an expiry date.
                </p>
              </CardContent>
            </Card>

            <Card className="htk-card-luxury">
              <CardContent className="p-6">
                <Star className="h-8 w-8 text-yellow-500 mb-4" />
                <h3 className="htk-text-luxury text-lg font-semibold mb-3">Fair Pricing Algorithm</h3>
                <p className="text-gray-300">
                  Our smart pricing ensures you pay the right amount based on job complexity, 
                  urgency, and location factors.
                </p>
              </CardContent>
            </Card>

            <Card className="htk-card-luxury">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-yellow-500 mb-4" />
                <h3 className="htk-text-luxury text-lg font-semibold mb-3">Community First</h3>
                <p className="text-gray-300">
                  50% of profits after £100k go back to local communities. 
                  Your success helps build stronger communities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="htk-text-luxury text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <Card className="htk-card-luxury">
              <CardContent className="p-6">
                <h3 className="htk-text-luxury text-lg font-semibold mb-2">
                  How does the credit system work?
                </h3>
                <p className="text-gray-300">
                  Credits are used to access tradesperson contact details. Each job has a credit cost 
                  based on its budget, urgency, location, and complexity. £1 = 1 credit, and costs 
                  range from £3-£100 per job.
                </p>
              </CardContent>
            </Card>

            <Card className="htk-card-luxury">
              <CardContent className="p-6">
                <h3 className="htk-text-luxury text-lg font-semibold mb-2">
                  Do credits expire?
                </h3>
                <p className="text-gray-300">
                  No! All purchased credits never expire. Only free trial credits expire after 7 days. 
                  Your investment in credits is always protected.
                </p>
              </CardContent>
            </Card>

            <Card className="htk-card-luxury">
              <CardContent className="p-6">
                <h3 className="htk-text-luxury text-lg font-semibold mb-2">
                  Can I change my subscription plan?
                </h3>
                <p className="text-gray-300">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect 
                  at your next billing cycle, and unused credits carry over.
                </p>
              </CardContent>
            </Card>

            <Card className="htk-card-luxury">
              <CardContent className="p-6">
                <h3 className="htk-text-luxury text-lg font-semibold mb-2">
                  What if I don't use all my credits?
                </h3>
                <p className="text-gray-300">
                  Unused credits accumulate in your account and never expire (except free trial credits). 
                  You can use them whenever you need to post jobs or contact tradespeople.
                </p>
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
            Join HTK today and start connecting with verified tradespeople in your area
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/register/customer')}
              className="htk-btn-luxury px-8 py-3 text-lg"
            >
              <Users className="h-5 w-5 mr-2" />
              Start Free Trial
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
          <p className="text-gray-400 mb-4">Fair pricing, transparent credits, community first</p>
          <p className="text-gray-500 text-sm">© 2024 HTK Platform. Built by trades, for trades.</p>
        </div>
      </footer>
    </div>
  )
}
