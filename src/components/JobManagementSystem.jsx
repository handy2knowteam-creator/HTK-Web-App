import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Star,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  Camera,
  FileText,
  Award,
  Shield,
  Hammer,
  Phone,
  Mail,
  Send,
  Edit,
  Trash2
} from 'lucide-react'

export default function JobManagementSystem() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('active')
  const [selectedJob, setSelectedJob] = useState(null)
  const [showBidModal, setShowBidModal] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [newBid, setNewBid] = useState({ price: '', message: '', timeline: '' })
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', type: 'customer' })

  // Mock job data with bidding and status tracking
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Kitchen Plumbing Repair",
      description: "Need urgent plumbing repair in kitchen sink. Tap is leaking and needs immediate attention. Looking for someone who can come today or tomorrow.",
      customer: {
        name: "John Smith",
        location: "Manchester, M1 4ET",
        rating: 4.8,
        reviewsCount: 23,
        joinDate: "2023-05-15",
        phone: "+44 7700 900123",
        email: "john.smith@email.com"
      },
      category: "Plumbing",
      budget: "£150-200",
      urgency: "Urgent",
      posted: "2024-09-30T10:30:00Z",
      status: "active", // active, accepted, in_progress, completed, cancelled
      creditsRequired: 8,
      images: ["/job-kitchen-leak-1.jpg", "/job-kitchen-leak-2.jpg"],
      bids: [
        {
          id: 1,
          tradesperson: {
            name: "Mike Thompson",
            trade: "Plumber",
            rating: 4.9,
            reviewsCount: 156,
            location: "Manchester",
            verified: true,
            badges: ["Gas Safe", "5-Star Pro"]
          },
          price: 175,
          message: "I can fix this today. I'm Gas Safe registered and have 15 years experience. I'll bring all necessary parts and can guarantee the work.",
          timeline: "Available today 2-4pm",
          bidDate: "2024-09-30T11:15:00Z",
          status: "pending" // pending, accepted, rejected
        },
        {
          id: 2,
          tradesperson: {
            name: "Sarah Davies",
            trade: "Plumber",
            rating: 4.7,
            reviewsCount: 89,
            location: "Manchester",
            verified: true,
            badges: ["Verified", "Quick Response"]
          },
          price: 160,
          message: "I can help with this repair. I have all the tools and parts needed. Available tomorrow morning.",
          timeline: "Tomorrow 9-11am",
          bidDate: "2024-09-30T12:30:00Z",
          status: "pending"
        },
        {
          id: 3,
          tradesperson: {
            name: "James Wilson",
            trade: "Plumber",
            rating: 4.8,
            reviewsCount: 134,
            location: "Manchester",
            verified: true,
            badges: ["Emergency Service", "24/7"]
          },
          price: 190,
          message: "Emergency plumber available now. I can be there within 2 hours with all parts needed.",
          timeline: "Available now",
          bidDate: "2024-09-30T13:45:00Z",
          status: "pending"
        }
      ],
      acceptedBid: null,
      statusUpdates: [
        {
          id: 1,
          status: "posted",
          message: "Job posted and live",
          timestamp: "2024-09-30T10:30:00Z",
          by: "customer"
        }
      ],
      reviews: []
    },
    {
      id: 2,
      title: "Bathroom Renovation",
      description: "Complete bathroom renovation needed including new tiles, fixtures, and plumbing work. Looking for experienced professional.",
      customer: {
        name: "Emma Johnson",
        location: "Birmingham, B1 2AA",
        rating: 4.6,
        reviewsCount: 12,
        joinDate: "2024-01-20",
        phone: "+44 7700 900456",
        email: "emma.j@email.com"
      },
      category: "Plumbing",
      budget: "£2500-5000",
      urgency: "Standard",
      posted: "2024-09-29T14:20:00Z",
      status: "in_progress",
      creditsRequired: 25,
      images: ["/job-bathroom-before.jpg"],
      bids: [
        {
          id: 4,
          tradesperson: {
            name: "David Brown",
            trade: "Bathroom Specialist",
            rating: 4.9,
            reviewsCount: 203,
            location: "Birmingham",
            verified: true,
            badges: ["Bathroom Expert", "10+ Years"]
          },
          price: 3500,
          message: "I specialize in complete bathroom renovations. I can provide a detailed quote after viewing. Portfolio available.",
          timeline: "2-3 weeks",
          bidDate: "2024-09-29T15:30:00Z",
          status: "accepted"
        }
      ],
      acceptedBid: {
        id: 4,
        tradesperson: {
          name: "David Brown",
          trade: "Bathroom Specialist",
          rating: 4.9,
          reviewsCount: 203,
          location: "Birmingham",
          verified: true,
          badges: ["Bathroom Expert", "10+ Years"]
        },
        price: 3500,
        acceptedDate: "2024-09-29T16:45:00Z"
      },
      statusUpdates: [
        {
          id: 1,
          status: "posted",
          message: "Job posted and live",
          timestamp: "2024-09-29T14:20:00Z",
          by: "customer"
        },
        {
          id: 2,
          status: "bid_accepted",
          message: "Bid accepted from David Brown",
          timestamp: "2024-09-29T16:45:00Z",
          by: "customer"
        },
        {
          id: 3,
          status: "work_started",
          message: "Work has commenced",
          timestamp: "2024-09-30T08:00:00Z",
          by: "tradesperson"
        }
      ],
      reviews: []
    }
  ])

  const getTimeAgo = (timestamp) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-blue-500/20 text-blue-400',
      accepted: 'bg-yellow-500/20 text-yellow-400',
      in_progress: 'bg-orange-500/20 text-orange-400',
      completed: 'bg-green-500/20 text-green-400',
      cancelled: 'bg-red-500/20 text-red-400'
    }
    return colors[status] || 'bg-gray-500/20 text-gray-400'
  }

  const getStatusIcon = (status) => {
    const icons = {
      active: Eye,
      accepted: CheckCircle,
      in_progress: Clock,
      completed: Award,
      cancelled: AlertCircle
    }
    return icons[status] || Eye
  }

  const handleAcceptBid = (jobId, bidId) => {
    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        const acceptedBid = job.bids.find(bid => bid.id === bidId)
        return {
          ...job,
          status: 'accepted',
          acceptedBid: {
            ...acceptedBid,
            acceptedDate: new Date().toISOString()
          },
          bids: job.bids.map(bid => ({
            ...bid,
            status: bid.id === bidId ? 'accepted' : 'rejected'
          })),
          statusUpdates: [
            ...job.statusUpdates,
            {
              id: job.statusUpdates.length + 1,
              status: 'bid_accepted',
              message: `Bid accepted from ${acceptedBid.tradesperson.name}`,
              timestamp: new Date().toISOString(),
              by: 'customer'
            }
          ]
        }
      }
      return job
    }))
  }

  const handleStatusUpdate = (jobId, newStatus, message) => {
    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          status: newStatus,
          statusUpdates: [
            ...job.statusUpdates,
            {
              id: job.statusUpdates.length + 1,
              status: newStatus,
              message: message,
              timestamp: new Date().toISOString(),
              by: 'customer' // or 'tradesperson' depending on who updates
            }
          ]
        }
      }
      return job
    }))
  }

  const handleSubmitReview = () => {
    if (selectedJob) {
      const updatedJobs = jobs.map(job => {
        if (job.id === selectedJob.id) {
          return {
            ...job,
            reviews: [
              ...job.reviews,
              {
                id: job.reviews.length + 1,
                rating: newReview.rating,
                comment: newReview.comment,
                type: newReview.type,
                date: new Date().toISOString(),
                reviewer: newReview.type === 'customer' ? job.customer.name : job.acceptedBid?.tradesperson.name
              }
            ]
          }
        }
        return job
      })
      setJobs(updatedJobs)
      setShowReviewModal(false)
      setNewReview({ rating: 5, comment: '', type: 'customer' })
    }
  }

  const filteredJobs = jobs.filter(job => {
    if (activeTab === 'active') return job.status === 'active'
    if (activeTab === 'in_progress') return ['accepted', 'in_progress'].includes(job.status)
    if (activeTab === 'completed') return job.status === 'completed'
    return true
  })

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
                  <h1 className="text-2xl font-bold text-yellow-400">Job Management</h1>
                  <p className="text-gray-400 text-sm">Track bids, status & reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-gray-800 rounded-lg p-1">
          {[
            { id: 'active', name: 'Active Jobs', count: jobs.filter(j => j.status === 'active').length },
            { id: 'in_progress', name: 'In Progress', count: jobs.filter(j => ['accepted', 'in_progress'].includes(j.status)).length },
            { id: 'completed', name: 'Completed', count: jobs.filter(j => j.status === 'completed').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-2 rounded-md transition-all ${
                activeTab === tab.id
                  ? 'bg-yellow-500 text-black font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.name} ({tab.count})
            </button>
          ))}
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-yellow-400 text-xl">{job.title}</CardTitle>
                      <Badge className={getStatusColor(job.status)}>
                        {React.createElement(getStatusIcon(job.status), { className: "h-3 w-3 mr-1" })}
                        {job.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.customer.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4" />
                        <span>{job.budget}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{getTimeAgo(job.posted)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span className="text-yellow-400 font-semibold">{job.bids.length} bids</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{job.description}</p>
                    
                    {/* Customer Info */}
                    <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-white">{job.customer.name}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-yellow-400">{job.customer.rating}</span>
                            <span className="text-gray-400">({job.customer.reviewsCount} reviews)</span>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">Member since {new Date(job.customer.joinDate).getFullYear()}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          <Mail className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Bids Section */}
                {job.bids.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-yellow-400 mb-4">
                      Bids Received ({job.bids.length})
                    </h3>
                    
                    <div className="space-y-4">
                      {job.bids.map((bid) => (
                        <div key={bid.id} className={`p-4 rounded-lg border ${
                          bid.status === 'accepted' 
                            ? 'bg-green-500/10 border-green-500/30' 
                            : bid.status === 'rejected'
                            ? 'bg-red-500/10 border-red-500/30'
                            : 'bg-gray-800/50 border-gray-700'
                        }`}>
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-3">
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-semibold text-white">{bid.tradesperson.name}</span>
                                  <span className="text-gray-400">•</span>
                                  <span className="text-yellow-400">{bid.tradesperson.trade}</span>
                                  {bid.tradesperson.verified && (
                                    <Badge className="bg-green-500/20 text-green-400">
                                      <Shield className="h-3 w-3 mr-1" />
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                    <span>{bid.tradesperson.rating}</span>
                                    <span>({bid.tradesperson.reviewsCount})</span>
                                  </div>
                                  <span>{bid.tradesperson.location}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-400">£{bid.price}</div>
                              <div className="text-sm text-gray-400">{bid.timeline}</div>
                              {bid.status === 'accepted' && (
                                <Badge className="bg-green-500/20 text-green-400 mt-1">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Accepted
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-gray-300 mb-3">{bid.message}</p>
                          
                          <div className="flex items-center space-x-2">
                            {bid.tradesperson.badges.map((badge, index) => (
                              <Badge key={index} className="bg-blue-500/20 text-blue-400 text-xs">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                          
                          {job.status === 'active' && bid.status === 'pending' && (
                            <div className="flex space-x-2 mt-4">
                              <Button 
                                onClick={() => handleAcceptBid(job.id, bid.id)}
                                className="bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Accept Bid
                              </Button>
                              <Button 
                                variant="outline"
                                className="border-gray-600 text-gray-300"
                              >
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Message
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Status Updates */}
                {job.statusUpdates.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-yellow-400 mb-4">Status Updates</h3>
                    <div className="space-y-3">
                      {job.statusUpdates.map((update) => (
                        <div key={update.id} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-white">{update.message}</p>
                            <p className="text-gray-400 text-sm">{getTimeAgo(update.timestamp)} by {update.by}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex space-x-4">
                  {job.status === 'accepted' && (
                    <Button 
                      onClick={() => handleStatusUpdate(job.id, 'in_progress', 'Work has started')}
                      className="bg-orange-500/20 text-orange-400 border border-orange-500/30"
                    >
                      Mark as Started
                    </Button>
                  )}
                  
                  {job.status === 'in_progress' && (
                    <Button 
                      onClick={() => handleStatusUpdate(job.id, 'completed', 'Work completed successfully')}
                      className="bg-green-500/20 text-green-400 border border-green-500/30"
                    >
                      Mark as Complete
                    </Button>
                  )}
                  
                  {job.status === 'completed' && (
                    <Button 
                      onClick={() => {
                        setSelectedJob(job)
                        setShowReviewModal(true)
                      }}
                      className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Leave Review
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedJob && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 w-full max-w-2xl">
            <CardHeader>
              <CardTitle className="text-yellow-400">Leave a Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-yellow-400 font-semibold mb-2">Rating</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setNewReview({...newReview, rating: star})}
                      className={`text-2xl ${star <= newReview.rating ? 'text-yellow-500' : 'text-gray-600'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-yellow-400 font-semibold mb-2">Review Type</label>
                <select 
                  value={newReview.type}
                  onChange={(e) => setNewReview({...newReview, type: e.target.value})}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                >
                  <option value="customer">Review Tradesperson</option>
                  <option value="tradesperson">Review Customer</option>
                </select>
              </div>
              
              <div>
                <label className="block text-yellow-400 font-semibold mb-2">Comment</label>
                <Textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  placeholder="Share your experience..."
                  rows={4}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              
              <div className="flex space-x-4">
                <Button 
                  onClick={handleSubmitReview}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold"
                >
                  Submit Review
                </Button>
                <Button 
                  onClick={() => setShowReviewModal(false)}
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
