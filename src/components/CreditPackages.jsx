import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Star, Crown, Zap } from 'lucide-react'

export default function CreditPackages() {
  const navigate = useNavigate()
  const [selectedPackage, setSelectedPackage] = useState(null)

  const packages = [
    {
      id: 'bronze',
      name: 'Bronze',
      credits: 10,
      price: '£9.99',
      originalPrice: '£12.99',
      savings: '£3.00',
      icon: <img src="/golden-wrench.png" alt="Bronze" className="w-8 h-8" />,
      color: 'bg-amber-900 border-amber-500',
      popular: false,
      type: 'monthly',
      features: [
        '10 credits per month',
        '£0.99 per credit',
        'Occasional jobs covered',
        'Top-up anytime for £1/credit',
        'Credits never expire'
      ]
    },
    {
      id: 'silver',
      name: 'Silver',
      credits: 70,
      price: '£49.99',
      originalPrice: '£69.99',
      savings: '£20.00',
      icon: <img src="/silver-tools.png" alt="Silver" className="w-8 h-8" />,
      color: 'bg-gray-700 border-gray-400',
      popular: true,
      type: 'monthly',
      features: [
        '70 credits per month',
        '£0.71 per credit',
        'Steady stream of work',
        'Best for steady work — 7x the credits of Bronze at just 5x the price',
        'Flexible growth, week after week',
        'Credits never expire'
      ]
    },
    {
      id: 'gold',
      name: 'Gold',
      credits: 160,
      price: '£99.99',
      originalPrice: '£159.99',
      savings: '£60.00',
      icon: <img src="/golden-tools.png" alt="Gold" className="w-8 h-8" />,
      color: 'bg-yellow-900 border-yellow-500',
      popular: false,
      type: 'monthly',
      features: [
        '160 credits per month',
        '£0.62 per credit',
        'High-volume, maximum value',
        'Ultimate value — 16x the credits of Bronze at just 10x the price',
        'For pros ready to scale fast',
        'Credits never expire'
      ]
    },
    {
      id: 'payg',
      name: 'Pay As You Go',
      credits: 'Variable',
      price: '£1.00',
      originalPrice: null,
      savings: null,
      icon: <img src="/pay-as-you-go.png" alt="Pay As You Go" className="w-8 h-8" />,
      color: 'bg-green-900 border-green-500',
      popular: false,
      type: 'payg',
      features: [
        '£1.00 per credit',
        'No monthly commitment',
        'Perfect for occasional work',
        'Credits never expire',
        'Top up anytime',
        'Flexible pricing'
      ]
    }
  ]

  const handlePurchase = (packageData) => {
    setSelectedPackage(packageData)
    // Integrate with Stripe payment
    alert(`Purchasing ${packageData.name} for ${packageData.price}`)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/htk-logo-large.png" 
              alt="HTK Logo" 
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-yellow-500">Credit Packages</h1>
              <p className="text-gray-400 text-sm">Choose the perfect package for your business</p>
            </div>
          </div>
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            ← Back
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-yellow-500 mb-4">
            Choose Your Credit Package
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get the credits you need to bid on jobs and grow your business. 
            All packages include our premium features and dedicated support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`relative bg-gray-900 border-2 ${pkg.color} hover:scale-105 transition-transform duration-200`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-yellow-500 text-black font-bold px-4 py-1">
                    MOST POPULAR
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${pkg.color.split(' ')[0]} text-white`}>
                    {pkg.icon}
                  </div>
                </div>
                <CardTitle className="text-yellow-500 text-xl">{pkg.name}</CardTitle>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-white">
                    {pkg.price}{pkg.type === 'monthly' ? '/month' : pkg.type === 'payg' ? '/credit' : ''}
                  </div>
                  {pkg.originalPrice && (
                    <div className="text-sm text-gray-400 line-through">{pkg.originalPrice}</div>
                  )}
                  {pkg.savings && (
                    <div className="text-green-400 font-semibold">Save {pkg.savings}</div>
                  )}
                </div>
                <div className="text-yellow-500 font-bold text-lg">
                  {pkg.credits === 'Variable' ? 'Flexible Credits' : `${pkg.credits} Credits${pkg.type === 'monthly' ? '/month' : ''}`}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => handlePurchase(pkg)}
                  className={`w-full font-semibold ${
                    pkg.popular 
                      ? 'bg-yellow-500 hover:bg-yellow-500 text-black' 
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  Purchase Package
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Credit Usage Guide */}
        <Card className="bg-gray-900 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-yellow-500 text-xl">How Credits Work</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-gray-700 text-gray-300 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">1</div>
                <h3 className="font-semibold text-white mb-2">Standard Jobs</h3>
                <p className="text-gray-400 text-sm">£50-£500 budget jobs cost 1-2 credits</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-700 text-blue-300 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">3</div>
                <h3 className="font-semibold text-white mb-2">Emergency Jobs</h3>
                <p className="text-gray-400 text-sm">Urgent jobs cost 3-4 credits for priority access</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-700 text-purple-300 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">5</div>
                <h3 className="font-semibold text-white mb-2">High Value Jobs</h3>
                <p className="text-gray-400 text-sm">£2000+ budget jobs cost 5-8 credits</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-700 text-yellow-300 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">8</div>
                <h3 className="font-semibold text-white mb-2">Premium Projects</h3>
                <p className="text-gray-400 text-sm">£5000+ projects cost 8+ credits</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Money Back Guarantee */}
        <Card className="bg-gradient-to-r from-green-900 to-green-800 border-green-500">
          <CardContent className="text-center py-8">
            <h3 className="text-2xl font-bold text-white mb-4">30-Day Money Back Guarantee</h3>
            <p className="text-green-100 text-lg">
              Not satisfied with your credits? Get a full refund within 30 days, no questions asked.
            </p>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 HTK - Handy To Know. Built by trades, for trades.
          </p>
        </div>
      </footer>
    </div>
  )
}

