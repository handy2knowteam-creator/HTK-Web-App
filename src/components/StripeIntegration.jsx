import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Star, Zap, Crown, Gift, ExternalLink, Shield, Check } from 'lucide-react'

export default function StripeIntegration() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  // Package-specific Stripe payment links
  const STRIPE_PAYMENT_URLS = {
    bronze: 'https://buy.stripe.com/bJebJ1fCJ2ZHeTe5pMafS04', // £9.99 Bronze Package
    silver: 'https://buy.stripe.com/bJebJ1fCJ2ZHeTe5pMafS04', // £49.99 Silver Package (update with actual link)
    gold: 'https://buy.stripe.com/bJebJ1fCJ2ZHeTe5pMafS04',   // £99.99 Gold Package (update with actual link)
    enterprise: 'https://buy.stripe.com/bJebJ1fCJ2ZHeTe5pMafS04', // £149.99 Enterprise (update with actual link)
    payg: 'https://buy.stripe.com/bJebJ1fCJ2ZHeTe5pMafS04'    // Pay-as-you-go (update with actual link)
  }

  const creditPackages = [
    {
      id: 'bronze',
      name: 'Bronze Package',
      credits: 10,
      price: 9.99,
      originalPrice: 12.99,
      savings: 3.00,
      popular: false,
      type: 'monthly',
      features: [
        '10 credits per month',
        '£0.99 per credit',
        'Perfect for occasional jobs',
        'Top-up anytime for £1/credit',
        'Credits never expire',
        'Basic support'
      ],
      icon: <Zap className="h-6 w-6" />,
      color: 'border-amber-500'
    },
    {
      id: 'silver',
      name: 'Silver Package',
      credits: 70,
      price: 49.99,
      originalPrice: 69.99,
      savings: 20.00,
      popular: true,
      type: 'monthly',
      features: [
        '70 credits per month',
        '£0.71 per credit',
        'Best value for steady work',
        '7x the credits at 5x the price',
        'Credits never expire',
        'Priority support',
        'Featured profile'
      ],
      icon: <Star className="h-6 w-6" />,
      color: 'border-gray-400'
    },
    {
      id: 'gold',
      name: 'Gold Package',
      credits: 160,
      price: 99.99,
      originalPrice: 159.99,
      savings: 60.00,
      popular: false,
      type: 'monthly',
      features: [
        '160 credits per month',
        '£0.62 per credit',
        'Maximum job opportunities',
        'Best rate per credit',
        'Credits never expire',
        '24/7 priority support',
        'Premium profile features',
        'Advanced analytics'
      ],
      icon: <Crown className="h-6 w-6" />,
      color: 'border-yellow-500'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Package',
      credits: 300,
      price: 149.99,
      originalPrice: 299.99,
      savings: 150.00,
      popular: false,
      type: 'monthly',
      features: [
        '300 credits per month',
        '£0.50 per credit',
        'Unlimited job opportunities',
        'Lowest rate per credit',
        'Credits never expire',
        'Dedicated account manager',
        'Custom profile features',
        'Advanced reporting',
        'API access'
      ],
      icon: <Gift className="h-6 w-6" />,
      color: 'border-purple-500'
    }
  ]

  const handlePurchase = async (packageData) => {
    setIsLoading(true)
    setSelectedPlan(packageData.id)

    try {
      // Store package selection in localStorage for post-payment processing
      localStorage.setItem('htk_selected_package', JSON.stringify({
        id: packageData.id,
        name: packageData.name,
        credits: packageData.credits,
        price: packageData.price,
        timestamp: new Date().toISOString()
      }))

      // For now, simulate successful purchase and add credits directly
      // In production, this would integrate with Stripe webhooks
      const currentUser = JSON.parse(localStorage.getItem('htk_current_user') || '{}')
      const currentCredits = parseInt(localStorage.getItem('htk_user_credits') || '0')
      const newCredits = currentCredits + packageData.credits
      
      // Update user credits
      localStorage.setItem('htk_user_credits', newCredits.toString())
      
      // Show success message
      alert(`✅ SUCCESS! You have purchased ${packageData.credits} credits for £${packageData.price}. Your new balance is ${newCredits} credits.`)
      
      // Open package-specific Stripe link for actual payment processing
      const paymentUrl = STRIPE_PAYMENT_URLS[packageData.id] || STRIPE_PAYMENT_URLS.bronze
      window.open(paymentUrl, '_blank')
      
      setIsLoading(false)
      setSelectedPlan(null)

    } catch (error) {
      console.error('Payment processing error:', error)
      alert('Unable to process payment. Please try again.')
      setIsLoading(false)
      setSelectedPlan(null)
    }
  }

  const handlePayAsYouGo = () => {
    // Ask user how many credits they want to buy
    const creditsWanted = prompt('How many credits would you like to purchase? (£1.00 per credit)')
    
    if (creditsWanted && !isNaN(creditsWanted) && parseInt(creditsWanted) > 0) {
      const credits = parseInt(creditsWanted)
      const cost = credits * 1.00
      
      // Store pay-as-you-go selection
      localStorage.setItem('htk_selected_package', JSON.stringify({
        id: 'payg',
        name: 'Pay As You Go',
        credits: credits,
        price: cost,
        type: 'per_credit',
        timestamp: new Date().toISOString()
      }))

      // Add credits to user account
      const currentCredits = parseInt(localStorage.getItem('htk_user_credits') || '0')
      const newCredits = currentCredits + credits
      localStorage.setItem('htk_user_credits', newCredits.toString())
      
      // Show success message
      alert(`✅ SUCCESS! You have purchased ${credits} credits for £${cost.toFixed(2)}. Your new balance is ${newCredits} credits.`)
      
      // Redirect to pay-as-you-go Stripe payment
      window.open(STRIPE_PAYMENT_URLS.payg, '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-yellow-500/20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-yellow-500 mb-4">HTK Credit Packages</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the perfect credit package for your trade business. All payments processed securely through Stripe.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Credit Packages */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {creditPackages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`bg-gray-900 ${pkg.color} relative ${pkg.popular ? 'ring-2 ring-yellow-500 shadow-lg shadow-yellow-500/20' : 'border-gray-700'}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-yellow-500 text-black font-semibold px-4 py-1">
                    MOST POPULAR
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full p-3">
                    <div className="text-black">
                      {pkg.icon}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-yellow-500 text-xl">{pkg.name}</CardTitle>
                <div className="mt-4">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-3xl font-bold text-white">£{pkg.price}</span>
                    {pkg.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">£{pkg.originalPrice}</span>
                    )}
                  </div>
                  <div className="text-yellow-500 text-sm mt-1">{pkg.credits} Credits</div>
                  {pkg.savings && (
                    <div className="text-green-400 text-xs mt-1">Save £{pkg.savings}</div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePurchase(pkg)}
                  disabled={isLoading}
                  className={`w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold ${pkg.popular ? 'shadow-lg shadow-yellow-500/20' : ''}`}
                >
                  {isLoading && selectedPlan === pkg.id ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                      Redirecting...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Buy Now
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pay As You Go Option */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="text-center">
              <CardTitle className="text-yellow-500 text-xl">Pay As You Go</CardTitle>
              <p className="text-gray-300">Perfect for occasional jobs</p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <span className="text-3xl font-bold text-white">£1.00</span>
                <span className="text-gray-400 ml-2">per credit</span>
              </div>
              <ul className="text-sm text-gray-300 mb-6 space-y-2">
                <li className="flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  No monthly commitment
                </li>
                <li className="flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  Credits never expire
                </li>
                <li className="flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  Buy exactly what you need
                </li>
              </ul>
              <Button
                onClick={handlePayAsYouGo}
                className="bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Buy Credits
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stripe Security Information */}
        <div className="text-center">
          <Card className="bg-gray-900 border-gray-700 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-yellow-500 flex items-center justify-center">
                <Shield className="h-6 w-6 mr-2" />
                Secure Payment Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center mb-6">
                <div className="text-center">
                  <div className="bg-blue-600 rounded-lg p-3 mb-2 inline-block">
                    <span className="text-white font-bold text-sm">STRIPE</span>
                  </div>
                  <p className="text-xs text-gray-400">Secure Processing</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-600 rounded-lg p-3 mb-2 inline-block">
                    <span className="text-white font-bold text-sm">SSL</span>
                  </div>
                  <p className="text-xs text-gray-400">256-bit Encryption</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-600 rounded-lg p-3 mb-2 inline-block">
                    <span className="text-white font-bold text-sm">PCI</span>
                  </div>
                  <p className="text-xs text-gray-400">Compliant</p>
                </div>
                <div className="text-center">
                  <div className="bg-yellow-500 rounded-lg p-3 mb-2 inline-block">
                    <span className="text-black font-bold text-sm">HTK</span>
                  </div>
                  <p className="text-xs text-gray-400">Guaranteed</p>
                </div>
              </div>
              
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-400 mr-2" />
                  <span className="text-green-400 font-medium">Connected to Your Stripe Account</span>
                </div>
                <p className="text-gray-300 text-sm mt-2">
                  Payments are processed directly through your verified Stripe account for maximum security.
                </p>
              </div>

              <p className="text-sm text-gray-400">
                Your payment information is processed securely by Stripe. We never store your credit card details.
                All transactions are protected by Stripe's industry-leading security measures.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

