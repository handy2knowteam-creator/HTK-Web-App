import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Users, Star, Gift, Handshake, Award, TrendingUp, MessageCircle, Calendar, MapPin } from 'lucide-react'

export default function TradeCollaboration() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('find')

  // Mock data for collaboration opportunities
  const collaborationOpportunities = [
    {
      id: 1,
      title: "Kitchen Renovation - Multi-Trade Project",
      location: "Manchester, UK",
      budget: "£8,500",
      tradesNeeded: ["Plumber", "Electrician", "Tiler"],
      leadTrade: "Kitchen Fitter",
      deadline: "2025-05-15",
      description: "Complete kitchen renovation requiring coordinated work from multiple trades",
      rewardCredits: 25,
      status: "Open"
    },
    {
      id: 2,
      title: "Bathroom Suite Installation",
      location: "Birmingham, UK", 
      budget: "£4,200",
      tradesNeeded: ["Electrician", "Tiler"],
      leadTrade: "Plumber",
      deadline: "2025-04-20",
      description: "Full bathroom installation with coordinated plumbing, electrical, and tiling work",
      rewardCredits: 15,
      status: "Open"
    },
    {
      id: 3,
      title: "Home Extension Project",
      location: "Leeds, UK",
      budget: "£15,000",
      tradesNeeded: ["Electrician", "Plumber", "Plasterer"],
      leadTrade: "Builder",
      deadline: "2025-06-30",
      description: "Two-story extension requiring multiple trades working in sequence",
      rewardCredits: 40,
      status: "Open"
    }
  ]

  // Mock data for successful collaborations
  const successfulCollaborations = [
    {
      id: 1,
      project: "Victorian House Restoration",
      trades: ["Builder", "Electrician", "Plumber", "Decorator"],
      completedDate: "March 2025",
      customerRating: 5,
      creditsEarned: 35,
      testimonial: "Amazing teamwork! All trades coordinated perfectly and delivered exceptional results."
    },
    {
      id: 2,
      project: "Commercial Office Fit-out",
      trades: ["Electrician", "Carpenter", "Painter"],
      completedDate: "February 2025",
      customerRating: 5,
      creditsEarned: 28,
      testimonial: "Professional collaboration resulted in project completion ahead of schedule."
    }
  ]

  const rewardTiers = [
    {
      tier: "Bronze Collaborator",
      projects: "1-5 successful collaborations",
      rewards: ["5 bonus credits per project", "Collaboration badge", "Priority matching"],
      icon: "🥉"
    },
    {
      tier: "Silver Collaborator", 
      projects: "6-15 successful collaborations",
      rewards: ["10 bonus credits per project", "Featured in collaboration listings", "Advanced project matching"],
      icon: "🥈"
    },
    {
      tier: "Gold Collaborator",
      projects: "16+ successful collaborations", 
      rewards: ["15 bonus credits per project", "Premium collaboration status", "Direct customer introductions"],
      icon: "🥇"
    }
  ]

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
                  <h1 className="htk-text-luxury text-xl font-bold">Trade Collaboration</h1>
                  <p className="text-gray-400 text-sm">Work Together, Earn Together</p>
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
            Collaborate & Earn Rewards
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Partner with other skilled tradespeople on larger projects. Successful collaborations 
            earn bonus credits and build your reputation in the HTK community.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="htk-card-luxury p-6">
              <Handshake className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <div className="htk-stat-number">247</div>
              <div className="htk-stat-label">Active Collaborations</div>
            </div>
            <div className="htk-card-luxury p-6">
              <Gift className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <div className="htk-stat-number">1,850</div>
              <div className="htk-stat-label">Bonus Credits Earned</div>
            </div>
            <div className="htk-card-luxury p-6">
              <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <div className="htk-stat-label">Average Rating</div>
              <div className="htk-stat-number">4.9/5</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="px-4">
        <div className="container mx-auto">
          <div className="flex justify-center mb-8">
            <div className="htk-card-luxury p-2 flex space-x-2">
              <button
                onClick={() => setActiveTab('find')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'find' 
                    ? 'htk-btn-luxury' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Find Collaborations
              </button>
              <button
                onClick={() => setActiveTab('rewards')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'rewards' 
                    ? 'htk-btn-luxury' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Reward System
              </button>
              <button
                onClick={() => setActiveTab('success')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'success' 
                    ? 'htk-btn-luxury' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Success Stories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Find Collaborations Tab */}
      {activeTab === 'find' && (
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <h2 className="htk-text-luxury text-3xl font-bold mb-8 text-center">
              Available Collaboration Opportunities
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collaborationOpportunities.map((opportunity) => (
                <div key={opportunity.id} className="htk-card-luxury p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
                      {opportunity.status}
                    </span>
                    <span className="htk-text-luxury font-bold">{opportunity.budget}</span>
                  </div>
                  
                  <h3 className="htk-text-luxury text-xl font-semibold mb-3">{opportunity.title}</h3>
                  
                  <div className="flex items-center text-gray-400 mb-3">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{opportunity.location}</span>
                    <Calendar className="h-4 w-4 ml-4 mr-2" />
                    <span className="text-sm">{new Date(opportunity.deadline).toLocaleDateString()}</span>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{opportunity.description}</p>
                  
                  <div className="bg-gray-800 p-3 rounded-lg mb-4">
                    <p className="text-yellow-500 font-semibold mb-2">Lead Trade: {opportunity.leadTrade}</p>
                    <p className="text-gray-400 text-sm mb-2">Trades Needed:</p>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.tradesNeeded.map((trade, index) => (
                        <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                          {trade}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-yellow-500 font-semibold">
                      <Gift className="inline h-4 w-4 mr-1" />
                      +{opportunity.rewardCredits} Bonus Credits
                    </span>
                  </div>
                  
                  <button className="w-full htk-btn-luxury py-3">
                    <MessageCircle className="inline h-4 w-4 mr-2" />
                    Express Interest
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reward System Tab */}
      {activeTab === 'rewards' && (
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <h2 className="htk-text-luxury text-3xl font-bold mb-8 text-center">
              Collaboration Reward Tiers
            </h2>
            <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
              The more you collaborate successfully, the more rewards you earn. Build your reputation 
              and unlock exclusive benefits through our tier system.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {rewardTiers.map((tier, index) => (
                <div key={index} className="htk-card-luxury p-8 text-center">
                  <div className="text-6xl mb-4">{tier.icon}</div>
                  <h3 className="htk-text-luxury text-2xl font-bold mb-3">{tier.tier}</h3>
                  <p className="text-gray-400 mb-6">{tier.projects}</p>
                  
                  <div className="space-y-3">
                    {tier.rewards.map((reward, rewardIndex) => (
                      <div key={rewardIndex} className="flex items-center text-gray-300">
                        <Star className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{reward}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* How Rewards Work */}
            <div className="htk-card-luxury p-8">
              <h3 className="htk-text-luxury text-2xl font-bold mb-6 text-center">How Collaboration Rewards Work</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-yellow-500 font-semibold mb-3">Earning Bonus Credits</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Complete projects with other HTK tradespeople</li>
                    <li>• Maintain high customer satisfaction ratings</li>
                    <li>• Deliver projects on time and within budget</li>
                    <li>• Receive positive feedback from collaboration partners</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-yellow-500 font-semibold mb-3">Using Bonus Credits</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Apply for premium job opportunities</li>
                    <li>• Access advanced platform features</li>
                    <li>• Boost your profile visibility</li>
                    <li>• Credits never expire and stack with regular credits</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Success Stories Tab */}
      {activeTab === 'success' && (
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <h2 className="htk-text-luxury text-3xl font-bold mb-8 text-center">
              Successful Collaborations
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {successfulCollaborations.map((collaboration) => (
                <div key={collaboration.id} className="htk-card-luxury p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="htk-text-luxury text-xl font-semibold">{collaboration.project}</h3>
                    <div className="flex items-center">
                      {[...Array(collaboration.customerRating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4">Completed: {collaboration.completedDate}</p>
                  
                  <div className="bg-gray-800 p-3 rounded-lg mb-4">
                    <p className="text-yellow-500 font-semibold mb-2">Collaborating Trades:</p>
                    <div className="flex flex-wrap gap-2">
                      {collaboration.trades.map((trade, index) => (
                        <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                          {trade}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-300 italic mb-4 border-l-4 border-yellow-500 pl-4">
                    "{collaboration.testimonial}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-500 font-semibold">
                      <Award className="inline h-4 w-4 mr-1" />
                      +{collaboration.creditsEarned} Credits Earned
                    </span>
                    <span className="text-gray-400 text-sm">Customer Review</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-yellow-500/20">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 mb-4">
            Join the HTK collaboration network and grow your business through partnerships.
          </p>
          <button className="htk-btn-luxury px-8 py-3">
            Start Collaborating Today
          </button>
        </div>
      </footer>
    </div>
  )
}
