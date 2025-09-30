import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  MessageSquare, 
  Users, 
  ShoppingCart, 
  Calendar,
  Star,
  Award,
  MapPin,
  Clock,
  ThumbsUp,
  MessageCircle,
  Share2,
  Plus,
  Search,
  Filter,
  TrendingUp,
  Hammer,
  Zap,
  Wrench,
  Home,
  Shield,
  BookOpen,
  Coffee,
  Handshake,
  Target,
  Gift,
  Crown,
  ArrowLeft
} from 'lucide-react'

export default function CommunityHub() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('forum')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTrade, setSelectedTrade] = useState('all')
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general' })
  const [showNewPost, setShowNewPost] = useState(false)

  // Mock data for forum posts
  const forumPosts = [
    {
      id: 1,
      title: "Best supplier for copper pipe in Manchester area?",
      content: "Looking for reliable supplier with good prices for 15mm and 22mm copper. Anyone got recommendations?",
      author: "Mike Thompson",
      trade: "Plumber",
      location: "Manchester",
      category: "plumbing",
      replies: 12,
      likes: 8,
      timeAgo: "2 hours ago",
      badges: ["Verified", "5-Star"],
      isHelpful: true
    },
    {
      id: 2,
      title: "New Part P regulations - what's changed?",
      content: "Just heard there are updates to Part P. Can anyone share what's new for bathroom electrics?",
      author: "Sarah Davies",
      trade: "Electrician",
      location: "Birmingham",
      category: "electrical",
      replies: 24,
      likes: 15,
      timeAgo: "4 hours ago",
      badges: ["NICEIC", "Mentor"],
      isHelpful: true
    },
    {
      id: 3,
      title: "Anyone used the new Festool track saw?",
      content: "Thinking of upgrading from my old circular saw. Worth the investment?",
      author: "James Wilson",
      trade: "Carpenter",
      location: "Leeds",
      category: "carpentry",
      replies: 8,
      likes: 5,
      timeAgo: "6 hours ago",
      badges: ["Verified"],
      isHelpful: false
    }
  ]

  // Mock data for group deals
  const groupDeals = [
    {
      id: 1,
      supplier: "Toolstation",
      deal: "20% off all DeWalt power tools",
      originalPrice: "£189.99",
      groupPrice: "£151.99",
      savings: "£38.00",
      membersNeeded: 50,
      currentMembers: 34,
      timeLeft: "3 days",
      category: "Power Tools",
      description: "Exclusive HTK member pricing on DeWalt 20V MAX range"
    },
    {
      id: 2,
      supplier: "Selco",
      deal: "15% off copper fittings & pipe",
      originalPrice: "£2.50/m",
      groupPrice: "£2.13/m",
      savings: "£0.37/m",
      membersNeeded: 25,
      currentMembers: 18,
      timeLeft: "5 days",
      category: "Plumbing",
      description: "Bulk discount on 15mm & 22mm copper pipe and fittings"
    },
    {
      id: 3,
      supplier: "B&Q TradePoint",
      deal: "25% off Wickes trade paint",
      originalPrice: "£45.99",
      groupPrice: "£34.49",
      savings: "£11.50",
      membersNeeded: 30,
      currentMembers: 28,
      timeLeft: "1 day",
      category: "Decorating",
      description: "Professional trade paint - white and magnolia"
    }
  ]

  // Mock data for apprentice/helper pool
  const helperPool = [
    {
      id: 1,
      name: "Tom Richards",
      trade: "Electrical Apprentice",
      level: "2nd Year",
      location: "Manchester",
      distance: "2.3 miles",
      rating: 4.8,
      dayRate: "£80",
      availability: "Available today",
      skills: ["Basic wiring", "Cable pulling", "Testing"],
      badges: ["Punctual", "Reliable"],
      lastActive: "Online now"
    },
    {
      id: 2,
      name: "Lucy Chen",
      trade: "Plumbing Helper",
      level: "Experienced",
      location: "Birmingham",
      distance: "1.8 miles",
      rating: 4.9,
      dayRate: "£120",
      availability: "Available tomorrow",
      skills: ["Pipe fitting", "Bathroom installs", "Boiler work"],
      badges: ["Fast learner", "Clean worker"],
      lastActive: "2 hours ago"
    }
  ]

  // Mock data for events
  const upcomingEvents = [
    {
      id: 1,
      title: "Manchester Trades Breakfast Club",
      type: "Networking",
      date: "Oct 5, 2024",
      time: "7:30 AM",
      location: "Costa Coffee, Deansgate",
      attendees: 23,
      maxAttendees: 30,
      organizer: "HTK Community",
      description: "Monthly meetup for local trades. Coffee and networking.",
      isSponsored: true
    },
    {
      id: 2,
      title: "EV Charging Installation Workshop",
      type: "Training",
      date: "Oct 12, 2024",
      time: "9:00 AM",
      location: "NICEIC Training Centre",
      attendees: 15,
      maxAttendees: 20,
      organizer: "NICEIC",
      description: "Hands-on training for EV charging point installation",
      isSponsored: false,
      price: "£150 (HTK members: £120)"
    }
  ]

  const tradeCategories = [
    { key: 'all', name: 'All Trades', icon: Users },
    { key: 'plumbing', name: 'Plumbing', icon: Wrench },
    { key: 'electrical', name: 'Electrical', icon: Zap },
    { key: 'carpentry', name: 'Carpentry', icon: Hammer },
    { key: 'decorating', name: 'Decorating', icon: Home },
    { key: 'general', name: 'General', icon: MessageSquare }
  ]

  const tabs = [
    { id: 'forum', name: 'Trade Forum', icon: MessageSquare },
    { id: 'deals', name: 'Group Deals', icon: ShoppingCart },
    { id: 'helpers', name: 'Helper Pool', icon: Users },
    { id: 'events', name: 'Events', icon: Calendar }
  ]

  const handleNewPost = () => {
    // Submit new post
    console.log('New post:', newPost)
    setShowNewPost(false)
    setNewPost({ title: '', content: '', category: 'general' })
  }

  const joinGroupDeal = (dealId) => {
    console.log('Joining group deal:', dealId)
    // Handle group deal joining
  }

  const bookHelper = (helperId) => {
    console.log('Booking helper:', helperId)
    // Handle helper booking
  }

  const rsvpEvent = (eventId) => {
    console.log('RSVP to event:', eventId)
    // Handle event RSVP
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-black border-b border-yellow-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate(-1)}
                variant="ghost"
                className="text-gray-400 hover:text-yellow-400"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <img src="/htk-logo-premium.png" alt="HTK" className="h-10 w-10" />
                <div>
                  <h1 className="text-2xl font-bold text-yellow-400">HTK Community</h1>
                  <p className="text-gray-400 text-sm">Trade Network & Professional Hub</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                <Crown className="h-3 w-3 mr-1" />
                Premium Member
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 space-y-4">
            {/* Navigation Tabs */}
            <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-400 text-lg">Community Hub</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="text-sm">{tab.name}</span>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-400 text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  onClick={() => setShowNewPost(true)}
                  className="w-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ask Question
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Gift className="h-4 w-4 mr-2" />
                  Offer Deal
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Need Help
                </Button>
              </CardContent>
            </Card>

            {/* Trade Categories */}
            {activeTab === 'forum' && (
              <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-400 text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {tradeCategories.map((category) => (
                    <button
                      key={category.key}
                      onClick={() => setSelectedTrade(category.key)}
                      className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-all text-sm ${
                        selectedTrade === category.key
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                      }`}
                    >
                      <category.icon className="h-4 w-4" />
                      <span>{category.name}</span>
                    </button>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={`Search ${activeTab}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <Button variant="outline" className="border-gray-600 text-gray-300">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Forum Tab */}
            {activeTab === 'forum' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-yellow-400">Trade Forum</h2>
                  <Button 
                    onClick={() => setShowNewPost(true)}
                    className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Post
                  </Button>
                </div>

                {forumPosts.map((post) => (
                  <Card key={post.id} className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 hover:border-yellow-500/40 transition-all">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
                          <p className="text-gray-300 mb-4">{post.content}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-yellow-400">{post.author}</span>
                              <span>•</span>
                              <span>{post.trade}</span>
                              <span>•</span>
                              <span>{post.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {post.badges.map((badge, index) => (
                                <Badge key={index} className="bg-green-500/20 text-green-400 text-xs">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {post.isHelpful && (
                          <Badge className="bg-yellow-500/20 text-yellow-400">
                            <Star className="h-3 w-3 mr-1" />
                            Helpful
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-gray-400 hover:text-yellow-400 transition-colors">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.replies}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-400 hover:text-green-400 transition-colors">
                            <Share2 className="h-4 w-4" />
                            <span>Share</span>
                          </button>
                        </div>
                        <span className="text-gray-500 text-sm">{post.timeAgo}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Group Deals Tab */}
            {activeTab === 'deals' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-yellow-400">Group Deals</h2>
                  <Badge className="bg-green-500/20 text-green-400">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Save up to 25%
                  </Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {groupDeals.map((deal) => (
                    <Card key={deal.id} className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-yellow-400">{deal.supplier}</CardTitle>
                            <p className="text-gray-300 mt-1">{deal.deal}</p>
                          </div>
                          <Badge className="bg-blue-500/20 text-blue-400">
                            {deal.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-400 text-sm line-through">{deal.originalPrice}</p>
                              <p className="text-2xl font-bold text-green-400">{deal.groupPrice}</p>
                              <p className="text-green-400 text-sm">Save {deal.savings}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-gray-400 text-sm">Members needed</p>
                              <p className="text-white font-semibold">{deal.currentMembers}/{deal.membersNeeded}</p>
                              <p className="text-yellow-400 text-sm">{deal.timeLeft} left</p>
                            </div>
                          </div>
                          
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full transition-all"
                              style={{ width: `${(deal.currentMembers / deal.membersNeeded) * 100}%` }}
                            ></div>
                          </div>
                          
                          <p className="text-gray-300 text-sm">{deal.description}</p>
                          
                          <Button 
                            onClick={() => joinGroupDeal(deal.id)}
                            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold hover:from-yellow-400 hover:to-yellow-500"
                          >
                            Join Group Deal
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Helper Pool Tab */}
            {activeTab === 'helpers' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-yellow-400">Helper Pool</h2>
                  <Button className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                    <Plus className="h-4 w-4 mr-2" />
                    Offer Help
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {helperPool.map((helper) => (
                    <Card key={helper.id} className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-white">{helper.name}</h3>
                            <p className="text-yellow-400">{helper.trade}</p>
                            <p className="text-gray-400 text-sm">{helper.level}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1 mb-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-white font-semibold">{helper.rating}</span>
                            </div>
                            <p className="text-green-400 font-semibold">{helper.dayRate}/day</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 text-sm text-gray-300">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span>{helper.location} ({helper.distance})</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="h-4 w-4 text-green-400" />
                            <span className="text-green-400">{helper.availability}</span>
                          </div>
                          
                          <div>
                            <p className="text-gray-400 text-sm mb-2">Skills:</p>
                            <div className="flex flex-wrap gap-1">
                              {helper.skills.map((skill, index) => (
                                <Badge key={index} className="bg-blue-500/20 text-blue-400 text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {helper.badges.map((badge, index) => (
                              <Badge key={index} className="bg-green-500/20 text-green-400 text-xs">
                                <Award className="h-3 w-3 mr-1" />
                                {badge}
                              </Badge>
                            ))}
                          </div>
                          
                          <Button 
                            onClick={() => bookHelper(helper.id)}
                            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold hover:from-yellow-400 hover:to-yellow-500"
                          >
                            Book Helper
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-yellow-400">Upcoming Events</h2>
                  <Button className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                </div>

                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <Card key={event.id} className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                              {event.isSponsored && (
                                <Badge className="bg-yellow-500/20 text-yellow-400">
                                  <Crown className="h-3 w-3 mr-1" />
                                  Sponsored
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-300 mb-3">{event.description}</p>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center space-x-2 text-gray-300">
                                <Calendar className="h-4 w-4 text-yellow-400" />
                                <span>{event.date} at {event.time}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-300">
                                <MapPin className="h-4 w-4 text-yellow-400" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-300">
                                <Users className="h-4 w-4 text-yellow-400" />
                                <span>{event.attendees}/{event.maxAttendees} attending</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-300">
                                <Shield className="h-4 w-4 text-yellow-400" />
                                <span>By {event.organizer}</span>
                              </div>
                            </div>
                            
                            {event.price && (
                              <p className="text-green-400 font-semibold mt-2">{event.price}</p>
                            )}
                          </div>
                          
                          <Badge className={`${
                            event.type === 'Training' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                          }`}>
                            {event.type}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                          <div className="w-full bg-gray-700 rounded-full h-2 mr-4">
                            <div 
                              className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full transition-all"
                              style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                            ></div>
                          </div>
                          <Button 
                            onClick={() => rsvpEvent(event.id)}
                            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold hover:from-yellow-400 hover:to-yellow-500"
                          >
                            RSVP
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 w-full max-w-2xl">
            <CardHeader>
              <CardTitle className="text-yellow-400">Ask the Community</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-yellow-400 font-semibold mb-2">Category</label>
                <select 
                  value={newPost.category}
                  onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                >
                  <option value="general">General</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="carpentry">Carpentry</option>
                  <option value="decorating">Decorating</option>
                </select>
              </div>
              
              <div>
                <label className="block text-yellow-400 font-semibold mb-2">Title</label>
                <Input
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  placeholder="What's your question?"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <label className="block text-yellow-400 font-semibold mb-2">Details</label>
                <Textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  placeholder="Provide more details about your question..."
                  rows={4}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              
              <div className="flex space-x-4">
                <Button 
                  onClick={handleNewPost}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold"
                >
                  Post Question
                </Button>
                <Button 
                  onClick={() => setShowNewPost(false)}
                  variant="outline"
                  className="border-gray-600 text-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
