import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Users, 
  TrendingUp, 
  Gift, 
  Star, 
  Link, 
  DollarSign, 
  Award, 
  Target,
  Building,
  Handshake,
  Crown,
  Zap
} from 'lucide-react'

export default function AffiliatesPartners() {
  const [affiliateStats, setAffiliateStats] = useState({
    totalEarnings: 2847.50,
    thisMonth: 425.30,
    referrals: 23,
    conversionRate: 12.5
  })

  const [referralCode, setReferralCode] = useState('HTK-TRADE-2024')

  const partnerTiers = [
    {
      name: 'Bronze Partner',
      commission: '5%',
      requirements: '5+ referrals',
      benefits: ['Basic partner badge', 'Monthly payouts', 'Email support'],
      color: 'from-amber-600 to-amber-800',
      icon: <Award className="h-6 w-6" />
    },
    {
      name: 'Silver Partner',
      commission: '8%',
      requirements: '15+ referrals',
      benefits: ['Silver partner badge', 'Bi-weekly payouts', 'Priority support', 'Marketing materials'],
      color: 'from-gray-400 to-gray-600',
      icon: <Star className="h-6 w-6" />
    },
    {
      name: 'Gold Partner',
      commission: '12%',
      requirements: '50+ referrals',
      benefits: ['Gold partner badge', 'Weekly payouts', 'Dedicated support', 'Custom landing pages'],
      color: 'from-htk-gold to-htk-gold-dark',
      icon: <Crown className="h-6 w-6" />
    },
    {
      name: 'Platinum Partner',
      commission: '15%',
      requirements: '100+ referrals',
      benefits: ['Platinum badge', 'Daily payouts', 'Account manager', 'Co-marketing opportunities'],
      color: 'from-purple-400 to-purple-600',
      icon: <Zap className="h-6 w-6" />
    }
  ]

  const corporatePartners = [
    {
      name: 'Screwfix',
      type: 'Tool Supplier',
      commission: '3-8%',
      description: 'Trade tools, fixings, and hardware',
      logo: '/partners/screwfix-logo.png',
      benefits: ['Trade discounts', 'Bulk pricing', 'Next-day delivery'],
      category: 'Tools & Hardware'
    },
    {
      name: 'Wickes',
      type: 'Building Supplies',
      commission: '2-6%',
      description: 'Building materials and home improvement',
      logo: '/partners/wickes-logo.png',
      benefits: ['Trade account', 'Project pricing', 'Collection points'],
      category: 'Building Materials'
    },
    {
      name: 'Toolstation',
      type: 'Tool Retailer',
      commission: '4-10%',
      description: 'Professional tools and accessories',
      logo: '/partners/toolstation-logo.png',
      benefits: ['Trade prices', 'Click & collect', 'Bulk orders'],
      category: 'Tools & Equipment'
    },
    {
      name: 'Travis Perkins',
      type: 'Builders Merchant',
      commission: '2-5%',
      description: 'Building supplies and hire services',
      logo: '/partners/travis-perkins-logo.png',
      benefits: ['Trade credit', 'Delivery service', 'Hire equipment'],
      category: 'Building Supplies'
    }
  ]

  const recentReferrals = [
    { name: 'John Smith', trade: 'Electrician', date: '2024-12-10', commission: '£45.00', status: 'Paid' },
    { name: 'Sarah Wilson', trade: 'Plumber', date: '2024-12-08', commission: '£32.50', status: 'Pending' },
    { name: 'Mike Johnson', trade: 'Carpenter', date: '2024-12-05', commission: '£28.75', status: 'Paid' },
    { name: 'Emma Davis', trade: 'Painter', date: '2024-12-03', commission: '£41.20', status: 'Paid' }
  ]

  const generateReferralLink = () => {
    const baseUrl = 'https://handytoknow.com'
    return `${baseUrl}/register?ref=${referralCode}`
  }

  const copyReferralLink = () => {
    navigator.clipboard.writeText(generateReferralLink())
    alert('Referral link copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="htk-header border-b htk-border-gold">
        <div className="htk-container px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="htk-logo-container">
              <img src="/htk-logo-large.png" alt="HTK Logo" className="h-16 w-16" />
              <span className="htk-logo-text">HANDY TO KNOW</span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-htk-gold text-black font-semibold">
                Gold Partner
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="htk-container px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-htk-gold to-htk-gold-dark rounded-full p-4">
              <Handshake className="h-20 w-20 text-black" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-htk-gold mb-4">Affiliates & Partners</h1>
          <p className="text-xl htk-text-professional max-w-3xl mx-auto">
            Earn money by referring tradespeople to HTK and partner with leading trade brands. 
            Build your network while growing your income.
          </p>
        </div>

        <Tabs defaultValue="affiliate" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="affiliate" className="data-[state=active]:bg-htk-gold data-[state=active]:text-black">
              Affiliate Program
            </TabsTrigger>
            <TabsTrigger value="partners" className="data-[state=active]:bg-htk-gold data-[state=active]:text-black">
              Corporate Partners
            </TabsTrigger>
            <TabsTrigger value="earnings" className="data-[state=active]:bg-htk-gold data-[state=active]:text-black">
              Earnings Dashboard
            </TabsTrigger>
          </TabsList>

          {/* Affiliate Program Tab */}
          <TabsContent value="affiliate" className="space-y-8">
            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="htk-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm htk-text-muted">Total Earnings</p>
                      <p className="text-2xl font-bold text-htk-gold">£{affiliateStats.totalEarnings}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-htk-gold" />
                  </div>
                </CardContent>
              </Card>

              <Card className="htk-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm htk-text-muted">This Month</p>
                      <p className="text-2xl font-bold text-green-400">£{affiliateStats.thisMonth}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="htk-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm htk-text-muted">Total Referrals</p>
                      <p className="text-2xl font-bold text-blue-400">{affiliateStats.referrals}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="htk-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm htk-text-muted">Conversion Rate</p>
                      <p className="text-2xl font-bold text-purple-400">{affiliateStats.conversionRate}%</p>
                    </div>
                    <Target className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Partner Tiers */}
            <div>
              <h2 className="text-2xl font-bold text-htk-gold mb-6">Partner Tiers & Benefits</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {partnerTiers.map((tier, index) => (
                  <Card key={index} className="htk-card htk-hover-gold">
                    <CardHeader className="pb-4">
                      <div className={`bg-gradient-to-br ${tier.color} rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
                        <div className="text-white">
                          {tier.icon}
                        </div>
                      </div>
                      <CardTitle className="text-white text-lg">{tier.name}</CardTitle>
                      <div className="text-2xl font-bold text-htk-gold">{tier.commission}</div>
                      <p className="text-sm htk-text-muted">{tier.requirements}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {tier.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center text-sm htk-text-professional">
                            <div className="w-2 h-2 bg-htk-gold rounded-full mr-3 flex-shrink-0"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Referral Tools */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="htk-card">
                <CardHeader>
                  <CardTitle className="text-htk-gold flex items-center">
                    <Link className="h-5 w-5 mr-2" />
                    Your Referral Link
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="referralCode" className="text-htk-gold-light">Referral Code</Label>
                    <Input
                      id="referralCode"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      className="bg-gray-800 border-htk-gold/30 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-htk-gold-light">Generated Link</Label>
                    <div className="flex gap-2">
                      <Input
                        value={generateReferralLink()}
                        readOnly
                        className="bg-gray-800 border-htk-gold/30 text-white"
                      />
                      <Button onClick={copyReferralLink} className="htk-btn-gold">
                        Copy
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm htk-text-muted">
                    Share this link with other tradespeople to earn commission when they join HTK.
                  </p>
                </CardContent>
              </Card>

              <Card className="htk-card">
                <CardHeader>
                  <CardTitle className="text-htk-gold flex items-center">
                    <Gift className="h-5 w-5 mr-2" />
                    Marketing Materials
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="htk-border-gold text-htk-gold hover:bg-htk-gold hover:text-black">
                      Download Banners
                    </Button>
                    <Button variant="outline" className="htk-border-gold text-htk-gold hover:bg-htk-gold hover:text-black">
                      Social Media Kit
                    </Button>
                    <Button variant="outline" className="htk-border-gold text-htk-gold hover:bg-htk-gold hover:text-black">
                      Email Templates
                    </Button>
                    <Button variant="outline" className="htk-border-gold text-htk-gold hover:bg-htk-gold hover:text-black">
                      Flyer Templates
                    </Button>
                  </div>
                  <p className="text-sm htk-text-muted">
                    Professional marketing materials to help you promote HTK effectively.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Corporate Partners Tab */}
          <TabsContent value="partners" className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-htk-gold mb-6">Trade Brand Partners</h2>
              <p className="htk-text-professional mb-8">
                Earn commission by promoting products from leading trade brands. 
                Get exclusive discounts and special offers for your referrals.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {corporatePartners.map((partner, index) => (
                  <Card key={index} className="htk-card htk-hover-gold">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className="bg-white rounded-lg p-3 mr-4">
                            <Building className="h-8 w-8 text-gray-800" />
                          </div>
                          <div>
                            <CardTitle className="text-white">{partner.name}</CardTitle>
                            <p className="text-sm text-htk-gold">{partner.type}</p>
                          </div>
                        </div>
                        <Badge className="bg-green-500 text-white">
                          {partner.commission}
                        </Badge>
                      </div>
                      <p className="htk-text-professional text-sm">{partner.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-htk-gold mb-2">Partner Benefits:</h4>
                        <ul className="space-y-1">
                          {partner.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center text-sm htk-text-professional">
                              <div className="w-2 h-2 bg-htk-gold rounded-full mr-3 flex-shrink-0"></div>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1 htk-btn-gold">
                          Get Partner Link
                        </Button>
                        <Button variant="outline" className="htk-border-gold text-htk-gold hover:bg-htk-gold hover:text-black">
                          View Catalog
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Become a Corporate Partner */}
            <Card className="htk-card">
              <CardHeader>
                <CardTitle className="text-htk-gold text-center">Become a Corporate Partner</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="htk-text-professional">
                  Are you a trade brand looking to partner with HTK? 
                  Join our network and reach thousands of verified tradespeople.
                </p>
                <div className="grid md:grid-cols-3 gap-4 my-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-htk-gold">10,000+</div>
                    <div className="text-sm htk-text-muted">Active Tradespeople</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-htk-gold">£2.5M+</div>
                    <div className="text-sm htk-text-muted">Monthly Transactions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-htk-gold">95%</div>
                    <div className="text-sm htk-text-muted">Partner Satisfaction</div>
                  </div>
                </div>
                <Button className="htk-btn-gold">
                  Apply for Partnership
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Earnings Dashboard Tab */}
          <TabsContent value="earnings" className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-htk-gold mb-6">Recent Referrals</h2>
              <Card className="htk-card">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-800">
                        <tr>
                          <th className="text-left p-4 text-htk-gold">Referral</th>
                          <th className="text-left p-4 text-htk-gold">Trade</th>
                          <th className="text-left p-4 text-htk-gold">Date</th>
                          <th className="text-left p-4 text-htk-gold">Commission</th>
                          <th className="text-left p-4 text-htk-gold">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentReferrals.map((referral, index) => (
                          <tr key={index} className="border-b border-gray-700">
                            <td className="p-4 text-white">{referral.name}</td>
                            <td className="p-4 htk-text-professional">{referral.trade}</td>
                            <td className="p-4 htk-text-professional">{referral.date}</td>
                            <td className="p-4 text-htk-gold font-semibold">{referral.commission}</td>
                            <td className="p-4">
                              <Badge className={referral.status === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'}>
                                {referral.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payout Information */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="htk-card">
                <CardHeader>
                  <CardTitle className="text-htk-gold">Payout Schedule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="htk-text-professional">Next Payout:</span>
                    <span className="text-white">December 15, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="htk-text-professional">Pending Amount:</span>
                    <span className="text-htk-gold font-semibold">£425.30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="htk-text-professional">Payment Method:</span>
                    <span className="text-white">Bank Transfer</span>
                  </div>
                  <Button className="w-full htk-btn-gold">
                    Update Payment Details
                  </Button>
                </CardContent>
              </Card>

              <Card className="htk-card">
                <CardHeader>
                  <CardTitle className="text-htk-gold">Performance Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-htk-gold rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-sm htk-text-professional">
                        Share your referral link on social media for maximum reach
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-htk-gold rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-sm htk-text-professional">
                        Explain the benefits of HTK to potential referrals
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-htk-gold rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-sm htk-text-professional">
                        Use our marketing materials for professional promotion
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-htk-gold rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-sm htk-text-professional">
                        Target tradespeople in your local area first
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

