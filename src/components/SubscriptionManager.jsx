import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  CreditCard, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  X, 
  Info,
  Crown,
  Star,
  Zap,
  Gift
} from 'lucide-react'

export default function SubscriptionManager() {
  const [currentSubscription, setCurrentSubscription] = useState(null)
  const [availablePackages, setAvailablePackages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)

  useEffect(() => {
    fetchSubscriptionData()
    fetchAvailablePackages()
  }, [])

  const fetchSubscriptionData = async () => {
    try {
      const response = await fetch('/api/subscription', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('htkToken')}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setCurrentSubscription(data.subscription)
      }
    } catch (error) {
      console.error('Error fetching subscription:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAvailablePackages = async () => {
    const packages = [
      {
        id: 'bronze',
        name: 'Bronze',
        credits: 10,
        price: 9.99,
        interval: 'month',
        popular: false,
        features: [
          '10 credits per month',
          '£0.99 per credit',
          'Basic support',
          'Standard job access',
          '30-day credit validity'
        ],
        icon: <Zap className="h-6 w-6" />,
        color: 'border-amber-500 bg-amber-900/20'
      },
      {
        id: 'silver',
        name: 'Silver',
        credits: 70,
        price: 49.99,
        interval: 'month',
        popular: true,
        features: [
          '70 credits per month',
          '£0.71 per credit',
          'Priority support',
          'All job categories',
          '60-day credit validity',
          'Portfolio showcase'
        ],
        icon: <Star className="h-6 w-6" />,
        color: 'border-gray-400 bg-gray-700/20'
      },
      {
        id: 'gold',
        name: 'Gold',
        credits: 160,
        price: 99.99,
        interval: 'month',
        popular: false,
        features: [
          '160 credits per month',
          '£0.62 per credit',
          '24/7 priority support',
          'Premium job access',
          '90-day credit validity',
          'Featured profile',
          'Advanced analytics'
        ],
        icon: <Crown className="h-6 w-6" />,
        color: 'border-yellow-500 bg-yellow-900/20'
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        credits: 300,
        price: 149.99,
        interval: 'month',
        popular: false,
        features: [
          '300 credits per month',
          '£0.50 per credit',
          'Dedicated account manager',
          'Custom integrations',
          'Unlimited credit validity',
          'White-label options',
          'Advanced reporting'
        ],
        icon: <Gift className="h-6 w-6" />,
        color: 'border-purple-500 bg-purple-900/20'
      }
    ]
    setAvailablePackages(packages)
  }

  const handleUpgrade = async (packageId) => {
    try {
      setIsLoading(true)
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('htkToken')}`
        },
        body: JSON.stringify({
          package_id: packageId,
          success_url: `${window.location.origin}/dashboard?tab=subscription&success=true`,
          cancel_url: `${window.location.origin}/dashboard?tab=subscription&cancelled=true`
        })
      })

      const session = await response.json()

      if (session.url) {
        window.location.href = session.url
      } else {
        throw new Error('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Upgrade error:', error)
      alert('Failed to start upgrade process. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    setIsCancelling(true)
    
    try {
      const response = await fetch('/api/subscription/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('htkToken')}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setCurrentSubscription(data.subscription)
        setShowCancelModal(false)
        alert('Subscription cancelled successfully. You can continue using your credits until the end of your billing period.')
      } else {
        throw new Error('Failed to cancel subscription')
      }
    } catch (error) {
      console.error('Cancellation error:', error)
      alert('Failed to cancel subscription. Please contact support.')
    } finally {
      setIsCancelling(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      {currentSubscription && (
        <Card className="htk-card-luxury">
          <CardHeader>
            <CardTitle className="htk-text-luxury flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Current Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-bold text-white">{currentSubscription.plan_name}</h3>
                  {currentSubscription.status === 'active' && (
                    <Badge className="bg-green-900 text-green-300">Active</Badge>
                  )}
                  {currentSubscription.status === 'cancelled' && (
                    <Badge className="bg-red-900 text-red-300">Cancelled</Badge>
                  )}
                  {currentSubscription.cancel_at_period_end && (
                    <Badge className="bg-orange-900 text-orange-300">Ending Soon</Badge>
                  )}
                </div>
                <p className="text-gray-400">
                  {currentSubscription.credits} credits per month • £{currentSubscription.amount / 100}/month
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold htk-text-luxury">
                  {currentSubscription.credits_remaining}
                </div>
                <div className="text-sm text-gray-400">Credits Left</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-400">Current Period</div>
                  <div className="text-white">
                    {formatDate(currentSubscription.current_period_start)} - {formatDate(currentSubscription.current_period_end)}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-400">Next Billing</div>
                  <div className="text-white">
                    {currentSubscription.cancel_at_period_end 
                      ? 'Subscription ending' 
                      : formatDate(currentSubscription.current_period_end)
                    }
                  </div>
                </div>
              </div>
            </div>

            {currentSubscription.status === 'active' && !currentSubscription.cancel_at_period_end && (
              <div className="flex space-x-3">
                <Button
                  onClick={() => setShowCancelModal(true)}
                  variant="outline"
                  className="border-red-500 text-red-400 hover:bg-red-900/20"
                >
                  Cancel Subscription
                </Button>
                <Button
                  onClick={() => window.open('https://billing.stripe.com/p/login/test_your_portal_link', '_blank')}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Manage Billing
                </Button>
              </div>
            )}

            {currentSubscription.cancel_at_period_end && (
              <Alert className="border-orange-500 bg-orange-900/20">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-orange-300">
                  Your subscription will end on {formatDate(currentSubscription.current_period_end)}. 
                  You can continue using your remaining credits until then.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Available Packages */}
      <div>
        <h2 className="text-2xl font-bold htk-text-luxury mb-6">
          {currentSubscription ? 'Upgrade Your Plan' : 'Choose Your Plan'}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {availablePackages.map((pkg) => (
            <Card key={pkg.id} className={`htk-card-luxury relative ${pkg.color}`}>
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-yellow-400 text-black font-bold px-3 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className="mx-auto mb-2 text-yellow-400">
                  {pkg.icon}
                </div>
                <CardTitle className="htk-text-luxury">{pkg.name}</CardTitle>
                <div className="text-3xl font-bold text-white">
                  £{pkg.price}
                  <span className="text-sm text-gray-400">/{pkg.interval}</span>
                </div>
                <div className="text-sm text-gray-400">
                  {pkg.credits} credits • £{(pkg.price / pkg.credits).toFixed(2)} per credit
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => handleUpgrade(pkg.id)}
                  disabled={currentSubscription?.plan_id === pkg.id}
                  className={`w-full ${
                    pkg.popular 
                      ? 'htk-btn-luxury' 
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  {currentSubscription?.plan_id === pkg.id 
                    ? 'Current Plan' 
                    : currentSubscription 
                      ? 'Upgrade' 
                      : 'Get Started'
                  }
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cancellation Policy */}
      <Card className="htk-card-luxury">
        <CardHeader>
          <CardTitle className="htk-text-luxury flex items-center">
            <Info className="mr-2 h-5 w-5" />
            Cancellation Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-white">Cancel Anytime</div>
              <div className="text-sm text-gray-400">
                You can cancel your subscription at any time from your dashboard
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-white">No Refunds</div>
              <div className="text-sm text-gray-400">
                Monthly payments are non-refundable, but you keep access until your billing period ends
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Calendar className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-white">Keep Your Credits</div>
              <div className="text-sm text-gray-400">
                Unused credits remain available until their expiry date, even after cancellation
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cancellation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="htk-card-luxury max-w-md w-full">
            <CardHeader>
              <CardTitle className="htk-text-luxury flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-red-400" />
                Cancel Subscription
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-300">
                  Are you sure you want to cancel your {currentSubscription?.plan_name} subscription?
                </p>
                
                <Alert className="border-orange-500 bg-orange-900/20">
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-orange-300">
                    <strong>What happens next:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Your subscription will end on {formatDate(currentSubscription?.current_period_end)}</li>
                      <li>You'll keep your {currentSubscription?.credits_remaining} remaining credits</li>
                      <li>No refund for the current billing period</li>
                      <li>You can resubscribe anytime</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <div className="flex space-x-3">
                  <Button
                    onClick={handleCancelSubscription}
                    disabled={isCancelling}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    {isCancelling ? 'Cancelling...' : 'Yes, Cancel'}
                  </Button>
                  <Button
                    onClick={() => setShowCancelModal(false)}
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Keep Subscription
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

