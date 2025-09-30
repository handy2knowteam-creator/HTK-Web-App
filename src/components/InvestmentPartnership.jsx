import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, TrendingUp, Handshake, Heart, DollarSign, Users, Target, Award, ExternalLink, CreditCard } from 'lucide-react'

export default function InvestmentPartnership() {
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState('investment')

  // Your actual Stripe payment links would go here
  const stripeLinks = {
    investment: {
      small: 'https://buy.stripe.com/your-investment-small-link',
      medium: 'https://buy.stripe.com/your-investment-medium-link', 
      large: 'https://buy.stripe.com/your-investment-large-link',
      custom: 'https://buy.stripe.com/your-investment-custom-link'
    },
    sponsorship: {
      bronze: 'https://buy.stripe.com/your-sponsorship-bronze-link',
      silver: 'https://buy.stripe.com/your-sponsorship-silver-link',
      gold: 'https://buy.stripe.com/your-sponsorship-gold-link',
      platinum: 'https://buy.stripe.com/your-sponsorship-platinum-link'
    },
    donation: {
      small: 'https://buy.stripe.com/your-donation-small-link',
      medium: 'https://buy.stripe.com/your-donation-medium-link',
      large: 'https://buy.stripe.com/your-donation-large-link',
      custom: 'https://buy.stripe.com/your-donation-custom-link'
    }
  }

  const investmentOptions = [
    {
      title: "Seed Investment",
      amount: "£1,000 - £5,000",
      description: "Early supporter investment with platform equity",
      benefits: [
        "Equity stake in HTK platform",
        "Quarterly profit sharing",
        "Advisory board invitation",
        "Platform recognition as founding investor"
      ],
      stripeLink: stripeLinks.investment.small
    },
    {
      title: "Growth Investment", 
      amount: "£5,000 - £25,000",
      description: "Significant investment for platform expansion",
      benefits: [
        "Higher equity percentage",
        "Monthly financial reports",
        "Strategic decision input",
        "Premium investor status",
        "Direct founder access"
      ],
      stripeLink: stripeLinks.investment.medium
    },
    {
      title: "Major Investment",
      amount: "£25,000+",
      description: "Major partnership for rapid scaling",
      benefits: [
        "Substantial equity stake",
        "Board seat consideration",
        "Strategic partnership opportunities",
        "Co-branding possibilities",
        "Priority on future funding rounds"
      ],
      stripeLink: stripeLinks.investment.large
    }
  ]

  const sponsorshipOptions = [
    {
      tier: "Bronze Partner",
      amount: "£500/month",
      description: "Basic brand partnership with HTK community",
      benefits: [
        "Logo on website footer",
        "Monthly newsletter mention",
        "Basic analytics reporting",
        "Community project recognition"
      ],
      stripeLink: stripeLinks.sponsorship.bronze
    },
    {
      tier: "Silver Partner",
      amount: "£1,500/month", 
      description: "Enhanced partnership with featured placement",
      benefits: [
        "Featured logo placement",
        "Product showcase inclusion",
        "Quarterly marketing report",
        "Social media mentions",
        "Community event sponsorship"
      ],
      stripeLink: stripeLinks.sponsorship.silver
    },
    {
      tier: "Gold Partner",
      amount: "£3,500/month",
      description: "Premium partnership with exclusive benefits",
      benefits: [
        "Homepage banner placement",
        "Exclusive product categories",
        "Monthly performance reports",
        "Co-branded content opportunities",
        "Priority customer introductions"
      ],
      stripeLink: stripeLinks.sponsorship.gold
    },
    {
      tier: "Platinum Partner",
      amount: "£7,500/month",
      description: "Exclusive strategic partnership",
      benefits: [
        "Exclusive category sponsorship",
        "Custom integration opportunities",
        "Weekly performance calls",
        "Joint marketing campaigns",
        "Platform co-development input"
      ],
      stripeLink: stripeLinks.sponsorship.platinum
    }
  ]

  const donationOptions = [
    {
      title: "Community Supporter",
      amount: "£25",
      description: "Support local community projects",
      impact: "Helps fund small community initiatives"
    },
    {
      title: "Platform Advocate", 
      amount: "£100",
      description: "Support platform development and community growth",
      impact: "Contributes to platform improvements and community events"
    },
    {
      title: "Community Champion",
      amount: "£500",
      description: "Major support for community development",
      impact: "Funds significant community projects and platform expansion"
    }
  ]

  const handlePayment = (stripeLink) => {
    // In production, this would redirect to your actual Stripe payment link
    window.open(stripeLink, '_blank')
  }

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
                  <h1 className="htk-text-luxury text-xl font-bold">Investment & Partnership</h1>
                  <p className="text-gray-400 text-sm">Support HTK's Growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="htk-text-luxury text-4xl md:text-6xl font-bold mb-6">
            Join HTK's Journey
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Be part of revolutionizing the trades industry. Invest in HTK's future, 
            partner with our growing community, or support our mission to build stronger local communities.
          </p>
          
          {/* Option Selection */}
          <div className="flex justify-center mb-12">
            <div className="htk-card-luxury p-2 flex space-x-2">
              <button
                onClick={() => setSelectedOption('investment')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedOption === 'investment' 
                    ? 'htk-btn-luxury' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <TrendingUp className="inline h-4 w-4 mr-2" />
                Investment
              </button>
              <button
                onClick={() => setSelectedOption('sponsorship')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedOption === 'sponsorship' 
                    ? 'htk-btn-luxury' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Handshake className="inline h-4 w-4 mr-2" />
                Sponsorship
              </button>
              <button
                onClick={() => setSelectedOption('donation')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedOption === 'donation' 
                    ? 'htk-btn-luxury' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Heart className="inline h-4 w-4 mr-2" />
                Donation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Options */}
      {selectedOption === 'investment' && (
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="htk-text-luxury text-3xl font-bold mb-4">Investment Opportunities</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Invest in HTK's mission to revolutionize the trades industry. 
                Early investors receive equity stakes and profit sharing as we grow.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {investmentOptions.map((option, index) => (
                <div key={index} className="htk-card-luxury p-8">
                  <div className="text-center mb-6">
                    <TrendingUp className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                    <h3 className="htk-text-luxury text-2xl font-bold mb-2">{option.title}</h3>
                    <p className="text-yellow-500 text-xl font-semibold mb-3">{option.amount}</p>
                    <p className="text-gray-300">{option.description}</p>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    <h4 className="text-yellow-500 font-semibold">Investment Benefits:</h4>
                    {option.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-start text-gray-300">
                        <Award className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handlePayment(option.stripeLink)}
                    className="w-full htk-btn-luxury py-3 flex items-center justify-center"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Invest Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sponsorship Options */}
      {selectedOption === 'sponsorship' && (
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="htk-text-luxury text-3xl font-bold mb-4">Sponsorship Partnerships</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Partner with HTK to reach thousands of professional tradespeople. 
                All partnerships contribute to community development projects.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sponsorshipOptions.map((option, index) => (
                <div key={index} className="htk-card-luxury p-6">
                  <div className="text-center mb-6">
                    <Handshake className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="htk-text-luxury text-xl font-bold mb-2">{option.tier}</h3>
                    <p className="text-yellow-500 text-lg font-semibold mb-3">{option.amount}</p>
                    <p className="text-gray-300 text-sm">{option.description}</p>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {option.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-start text-gray-300">
                        <Target className="h-3 w-3 text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-xs">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handlePayment(option.stripeLink)}
                    className="w-full htk-btn-luxury py-2 text-sm flex items-center justify-center"
                  >
                    <CreditCard className="h-3 w-3 mr-2" />
                    Become Partner
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Donation Options */}
      {selectedOption === 'donation' && (
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="htk-text-luxury text-3xl font-bold mb-4">Support Our Community</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Your donations directly support community projects and help us build 
                stronger local communities through the trades industry.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {donationOptions.map((option, index) => (
                <div key={index} className="htk-card-luxury p-8 text-center">
                  <Heart className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                  <h3 className="htk-text-luxury text-2xl font-bold mb-2">{option.title}</h3>
                  <p className="text-yellow-500 text-xl font-semibold mb-3">{option.amount}</p>
                  <p className="text-gray-300 mb-4">{option.description}</p>
                  <p className="text-gray-400 text-sm mb-6">{option.impact}</p>
                  
                  <button
                    onClick={() => handlePayment(stripeLinks.donation[index === 0 ? 'small' : index === 1 ? 'medium' : 'large'])}
                    className="w-full htk-btn-luxury py-3 flex items-center justify-center"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Donate Now
                  </button>
                </div>
              ))}
            </div>

            {/* Custom Donation */}
            <div className="htk-card-luxury p-8 text-center">
              <h3 className="htk-text-luxury text-xl font-bold mb-4">Custom Donation Amount</h3>
              <p className="text-gray-300 mb-6">
                Choose your own donation amount to support HTK and our community projects.
              </p>
              <button
                onClick={() => handlePayment(stripeLinks.donation.custom)}
                className="htk-btn-luxury px-8 py-3 flex items-center justify-center mx-auto"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Custom Donation
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Why Support HTK */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="htk-text-luxury text-3xl font-bold mb-12 text-center">
            Why Support HTK?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="htk-card-luxury p-6 mb-4">
                <Users className="h-12 w-12 text-yellow-500 mx-auto" />
              </div>
              <h3 className="htk-text-luxury text-lg font-semibold mb-2">Community First</h3>
              <p className="text-gray-300 text-sm">
                50% of profits after £100k go directly to local community projects
              </p>
            </div>
            
            <div className="text-center">
              <div className="htk-card-luxury p-6 mb-4">
                <TrendingUp className="h-12 w-12 text-yellow-500 mx-auto" />
              </div>
              <h3 className="htk-text-luxury text-lg font-semibold mb-2">Growing Market</h3>
              <p className="text-gray-300 text-sm">
                The UK trades industry is worth billions and growing rapidly
              </p>
            </div>
            
            <div className="text-center">
              <div className="htk-card-luxury p-6 mb-4">
                <Target className="h-12 w-12 text-yellow-500 mx-auto" />
              </div>
              <h3 className="htk-text-luxury text-lg font-semibold mb-2">Clear Mission</h3>
              <p className="text-gray-300 text-sm">
                Built by trades, for trades - authentic platform with real industry knowledge
              </p>
            </div>
            
            <div className="text-center">
              <div className="htk-card-luxury p-6 mb-4">
                <Award className="h-12 w-12 text-yellow-500 mx-auto" />
              </div>
              <h3 className="htk-text-luxury text-lg font-semibold mb-2">Proven Team</h3>
              <p className="text-gray-300 text-sm">
                Founded by experienced tradespeople who understand the industry challenges
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Custom Arrangements */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="htk-text-luxury text-3xl font-bold mb-6">
            Need a Custom Arrangement?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            For larger investments, custom sponsorship packages, or strategic partnerships, 
            get in touch with our team directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/support')}
              className="htk-btn-luxury px-8 py-3"
            >
              Contact Our Team
            </button>
            <a 
              href="mailto:handy2knowteam@gmail.com"
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-all flex items-center justify-center"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Email Directly
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-yellow-500/20">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 mb-4">
            All payments are processed securely through Stripe. Investment terms and partnership agreements will be provided upon completion.
          </p>
          <p className="text-gray-500 text-sm">
            HTK is committed to transparency and community development. Thank you for supporting our mission.
          </p>
        </div>
      </footer>
    </div>
  )
}
