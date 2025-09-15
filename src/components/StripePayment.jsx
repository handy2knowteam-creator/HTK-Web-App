import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Star, Zap, Crown, Gift } from 'lucide-react'

export default function StripePayment() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const creditPackages = [
    {
      id: 'starter',
      name: 'Starter Pack',
      credits: 50,
      price: 9.99,
      popular: false,
      features: ['50 Job Applications', 'Basic Profile', 'Email Support'],
      icon: <Zap className="h-6 w-6" />
    },
    {
      id: 'professional',
      name: 'Professional Pack',
      credits: 150,
      price: 24.99,
      popular: true,
      features: ['150 Job Applications', 'Featured Profile', 'Priority Support', 'Portfolio Showcase'],
      icon: <Star className="h-6 w-6" />
    },
    {
      id: 'premium',
      name: 'Premium Pack',
      credits: 300,
      price: 44.99,
      popular: false,
      features: ['300 Job Applications', 'Premium Profile', '24/7 Support', 'Portfolio + Videos', 'Weekly Competition Entry'],
      icon: <Crown className="h-6 w-6" />
    },
    {
      id: 'enterprise',
      name: 'Enterprise Pack',
      credits: 500,
      price: 69.99,
      popular: false,
      features: ['500 Job Applications', 'Enterprise Profile', 'Dedicated Support', 'Full Media Suite', 'Guaranteed Weekly Feature'],
      icon: <Gift className="h-6 w-6" />
    }
  ]

  const handlePurchase = async (packageData) => {
    setIsLoading(true)
    setSelectedPlan(packageData.id)

    try {
      // Create Stripe checkout session
      const response = await fetch('https://0vhlizcgy3ye.manus.space/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          package_id: packageData.id,
          credits: packageData.credits,
          amount: packageData.price * 100, // Convert to cents
          currency: 'gbp'
        })
      })

      const session = await response.json()

      if (session.url) {
        // Redirect to Stripe Checkout
        window.location.href = session.url
      } else {
        throw new Error('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setIsLoading(false)
      setSelectedPlan(null)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="htk-header border-b htk-border-gold">
        <div className="htk-container px-6 py-4">
          <div className="flex items-center justify-center">
            <div className="htk-logo-container">
              <img src="/htk-logo.png" alt="HTK Logo" className="h-10 w-10" />
              <span className="htk-logo-text">HANDY TO KNOW</span>
            </div>
          </div>
        </div>
      </header>

      <div className="htk-container px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-htk-gold mb-4">Choose Your Credit Package</h1>
          <p className="text-xl htk-text-professional max-w-3xl mx-auto">
            Invest in your trade business with HTK credits. Apply for jobs, showcase your work, and grow your customer base.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {creditPackages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`htk-card relative ${pkg.popular ? 'ring-2 ring-htk-gold htk-shadow-gold' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-htk-gold text-black font-semibold px-4 py-1">
                    MOST POPULAR
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-br from-htk-gold to-htk-gold-dark rounded-full p-3">
                    <div className="text-black">
                      {pkg.icon}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-htk-gold text-xl">{pkg.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-white">£{pkg.price}</span>
                  <div className="text-htk-gold-light text-sm mt-1">{pkg.credits} Credits</div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm htk-text-professional">
                      <div className="w-2 h-2 bg-htk-gold rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePurchase(pkg)}
                  disabled={isLoading}
                  className={`w-full htk-btn-gold ${pkg.popular ? 'htk-shadow-gold' : ''}`}
                >
                  {isLoading && selectedPlan === pkg.id ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Purchase Now
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Security */}
        <div className="mt-16 text-center">
          <div className="htk-card max-w-2xl mx-auto p-8">
            <h3 className="text-xl font-semibold text-htk-gold mb-4">Secure Payment Processing</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
              <div className="text-center">
                <div className="bg-blue-600 rounded p-2 mb-2 inline-block">
                  <span className="text-white font-bold text-xs">STRIPE</span>
                </div>
                <p className="text-xs htk-text-muted">Secure Processing</p>
              </div>
              <div className="text-center">
                <div className="bg-green-600 rounded p-2 mb-2 inline-block">
                  <span className="text-white font-bold text-xs">SSL</span>
                </div>
                <p className="text-xs htk-text-muted">256-bit Encryption</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-600 rounded p-2 mb-2 inline-block">
                  <span className="text-white font-bold text-xs">PCI</span>
                </div>
                <p className="text-xs htk-text-muted">Compliant</p>
              </div>
              <div className="text-center">
                <div className="bg-htk-gold rounded p-2 mb-2 inline-block">
                  <span className="text-black font-bold text-xs">HTK</span>
                </div>
                <p className="text-xs htk-text-muted">Guaranteed</p>
              </div>
            </div>
            <p className="text-sm htk-text-muted mt-4">
              Your payment information is processed securely. We do not store credit card details.
            </p>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center bg-green-900/20 border border-green-500/30 rounded-lg px-6 py-3">
            <div className="bg-green-500 rounded-full p-1 mr-3">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-green-400 font-medium">30-Day Money Back Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  )
}

