import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/contexts/AuthContext'
import { Star, Upload, Video, Camera, Youtube, MessageSquare, ThumbsUp } from 'lucide-react'
import ComingSoon from './ComingSoon'

// Helper function to extract YouTube video ID
const extractYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}

export default function TradespersonDashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('jobs')
  const [jobs, setJobs] = useState([])
  const [credits, setCredits] = useState(0)
  const [portfolio, setPortfolio] = useState([])
  const [reviews, setReviews] = useState([])
  const [youtubeLink, setYoutubeLink] = useState('')

  useEffect(() => {
    // Fetch available jobs and credits
    fetchJobs()
    fetchCredits()
    fetchPortfolio()
    fetchReviews()
  }, [])

  const fetchJobs = async () => {
    // Mock data for now with variable credit costs
    setJobs([
      {
        id: 1,
        title: 'Kitchen Plumbing Repair',
        description: 'Need urgent plumbing repair in kitchen sink',
        location: 'London, UK',
        budget: '£150-200',
        posted: '2 hours ago',
        customer: 'John Smith',
        credits: 1,
        urgency: 'Standard'
      },
      {
        id: 2,
        title: 'Bathroom Renovation',
        description: 'Complete bathroom renovation needed',
        location: 'Manchester, UK',
        budget: '£2000-3000',
        posted: '1 day ago',
        customer: 'Sarah Johnson',
        credits: 5,
        urgency: 'High Value'
      },
      {
        id: 3,
        title: 'Emergency Electrical Repair',
        description: 'Urgent electrical fault needs immediate attention',
        location: 'Birmingham, UK',
        budget: '£300-500',
        posted: '30 minutes ago',
        customer: 'Mike Wilson',
        credits: 3,
        urgency: 'Emergency'
      },
      {
        id: 4,
        title: 'Garden Landscaping Project',
        description: 'Complete garden redesign and landscaping',
        location: 'Leeds, UK',
        budget: '£5000-8000',
        posted: '3 hours ago',
        customer: 'Emma Davis',
        credits: 8,
        urgency: 'Premium'
      }
    ])
  }

  const fetchCredits = async () => {
    // Mock data for now
    setCredits(25)
  }

  const fetchPortfolio = async () => {
    // Mock portfolio data
    setPortfolio([
      {
        id: 1,
        title: 'Modern Kitchen Installation',
        description: 'Complete kitchen renovation with modern appliances',
        images: ['/api/placeholder/300/200'],
        videos: [],
        date: '2024-01-15',
        category: 'Kitchen'
      },
      {
        id: 2,
        title: 'Bathroom Renovation',
        description: 'Full bathroom remodel with luxury fixtures',
        images: ['/api/placeholder/300/200', '/api/placeholder/300/200'],
        videos: ['/api/placeholder/video'],
        date: '2024-01-10',
        category: 'Bathroom'
      }
    ])
  }

  const fetchReviews = async () => {
    // Mock reviews data
    setReviews([
      {
        id: 1,
        customer: 'Sarah M.',
        rating: 5,
        comment: 'Excellent work! Very professional and completed on time. Highly recommend.',
        date: '2024-01-20',
        project: 'Kitchen Plumbing Repair'
      },
      {
        id: 2,
        customer: 'Mike R.',
        rating: 5,
        comment: 'Outstanding quality work. Clean, efficient, and great communication throughout.',
        date: '2024-01-18',
        project: 'Bathroom Installation'
      },
      {
        id: 3,
        customer: 'Emma L.',
        rating: 4,
        comment: 'Good work overall. Arrived on time and completed the job as promised.',
        date: '2024-01-15',
        project: 'Electrical Repair'
      }
    ])
  }

  const handleBidOnJob = (jobId, creditCost) => {
    if (credits >= creditCost) {
      // Deduct credits and submit bid
      setCredits(credits - creditCost)
      alert(`Bid submitted successfully! ${creditCost} credit${creditCost > 1 ? 's' : ''} deducted.`)
    } else {
      alert(`You need ${creditCost} credit${creditCost > 1 ? 's' : ''} to bid on this job. Please purchase more credits.`)
    }
  }

  const handleFileUpload = (type) => {
    // Handle file upload for portfolio
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = type === 'image' ? 'image/*' : 'video/*'
    input.multiple = true
    input.onchange = (e) => {
      const files = Array.from(e.target.files)
      console.log(`Uploading ${type}s:`, files)
      // Here you would upload to your backend
    }
    input.click()
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/htk-logo-large.png" 
              alt="Handy To Know Logo" 
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-yellow-400">Tradesperson Dashboard</h1>
              <p className="text-gray-400 text-sm">Welcome back, {user?.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-yellow-400 font-bold text-lg">{credits}</div>
              <div className="text-gray-400 text-xs">Credits</div>
            </div>
            <Button
              onClick={() => setActiveTab('buy-credits')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
            >
              Buy Credits
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {['jobs', 'portfolio', 'reviews', 'live-stream', 'buy-credits', 'my-bids', 'messages', 'profile'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-yellow-400 text-yellow-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {activeTab === 'jobs' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-yellow-400">Available Jobs</h2>
              <div className="text-gray-400">
                {jobs.length} jobs available
              </div>
            </div>

            <div className="grid gap-6">
              {jobs.map((job) => (
                <Card key={job.id} className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-yellow-400">{job.title}</CardTitle>
                        <p className="text-gray-400 mt-1">{job.location} • {job.posted}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge 
                            variant="secondary" 
                            className={`${
                              job.urgency === 'Emergency' ? 'bg-red-900 text-red-300' :
                              job.urgency === 'Premium' ? 'bg-purple-900 text-purple-300' :
                              job.urgency === 'High Value' ? 'bg-blue-900 text-blue-300' :
                              'bg-gray-700 text-gray-300'
                            }`}
                          >
                            {job.urgency}
                          </Badge>
                          <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                            {job.credits} Credit{job.credits > 1 ? 's' : ''}
                          </Badge>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-900 text-green-300">
                        {job.budget}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{job.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        Posted by: {job.customer}
                      </div>
                      <Button
                        onClick={() => handleBidOnJob(job.id, job.credits)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                        disabled={credits < job.credits}
                      >
                        Bid on Job ({job.credits} Credit{job.credits > 1 ? 's' : ''})
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-yellow-400">My Portfolio</h2>
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleFileUpload('image')}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Add Photos
                </Button>
                <Button
                  onClick={() => handleFileUpload('video')}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Add Videos
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.map((project) => (
                <Card key={project.id} className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-yellow-400 text-lg">{project.title}</CardTitle>
                    <Badge variant="outline" className="w-fit border-yellow-400 text-yellow-400">
                      {project.category}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.images.length > 0 && (
                        <div className="grid grid-cols-2 gap-2">
                          {project.images.map((image, idx) => (
                            <div key={idx} className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                              <img 
                                src={image} 
                                alt={`${project.title} ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      <p className="text-gray-300 text-sm">{project.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{project.date}</span>
                        <div className="flex space-x-2">
                          <span>{project.images.length} photos</span>
                          <span>{project.videos.length} videos</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-yellow-400">Customer Reviews</h2>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-400">4.8</div>
                <div className="flex items-center">
                  {renderStars(5)}
                  <span className="text-gray-400 text-sm ml-2">({reviews.length} reviews)</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="bg-gray-900 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold text-white">{review.customer}</span>
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p className="text-gray-300">{review.comment}</p>
                      </div>
                      <div className="text-right text-sm text-gray-400">
                        <div>{review.date}</div>
                        <div className="text-yellow-400">{review.project}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <button className="flex items-center space-x-1 hover:text-yellow-400">
                        <ThumbsUp className="h-4 w-4" />
                        <span>Helpful</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-yellow-400">
                        <MessageSquare className="h-4 w-4" />
                        <span>Reply</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'live-stream' && (
          <div>
            <h2 className="text-2xl font-bold htk-text-luxury mb-6">Live Streaming</h2>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="htk-card-luxury">
                <CardHeader>
                  <CardTitle className="htk-text-luxury flex items-center">
                    <Youtube className="h-5 w-5 mr-2" />
                    YouTube Live Stream
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="youtube-link" className="text-gray-300">YouTube Live Stream URL</Label>
                    <Input
                      id="youtube-link"
                      value={youtubeLink}
                      onChange={(e) => setYoutubeLink(e.target.value)}
                      placeholder="https://youtube.com/watch?v=... or https://youtu.be/..."
                      className="bg-black border-gray-600 text-white focus:border-yellow-400"
                    />
                  </div>
                  
                  {youtubeLink && (
                    <div className="space-y-4">
                      <div className="bg-black rounded-lg p-4 border border-gray-700">
                        <h4 className="text-yellow-400 font-semibold mb-2">Stream Preview</h4>
                        <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                          {youtubeLink.includes('youtube.com') || youtubeLink.includes('youtu.be') ? (
                            <iframe
                              width="100%"
                              height="100%"
                              src={`https://www.youtube.com/embed/${extractYouTubeId(youtubeLink)}`}
                              title="YouTube Live Stream"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-lg"
                            ></iframe>
                          ) : (
                            <div className="text-gray-400 text-center">
                              <Youtube className="h-12 w-12 mx-auto mb-2" />
                              <p>Enter a valid YouTube URL to preview</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => {
                            if (youtubeLink) {
                              window.open(youtubeLink, '_blank')
                            }
                          }}
                          className="htk-btn-luxury flex-1"
                        >
                          <Youtube className="h-4 w-4 mr-2" />
                          Open Stream
                        </Button>
                        <Button 
                          onClick={() => {
                            navigator.clipboard.writeText(youtubeLink)
                            alert('Stream link copied to clipboard!')
                          }}
                          variant="outline"
                          className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                        >
                          Copy Link
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    onClick={() => {
                      if (youtubeLink) {
                        alert('Live stream link updated successfully!')
                      } else {
                        alert('Please enter a YouTube live stream URL first.')
                      }
                    }}
                    className="w-full htk-btn-luxury"
                  >
                    <Youtube className="h-4 w-4 mr-2" />
                    {youtubeLink ? 'Update Stream Link' : 'Start Live Stream'}
                  </Button>
                  
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>• Show customers your work in real-time</p>
                    <p>• Build trust through transparency</p>
                    <p>• Answer questions during the project</p>
                    <p>• Showcase your skills to potential customers</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="htk-card-luxury">
                <CardHeader>
                  <CardTitle className="htk-text-luxury">Stream Guidelines & Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="htk-achievement-badge text-xs px-2 py-1">PRO TIP</div>
                      <div>
                        <h4 className="text-white font-medium">Quality Setup</h4>
                        <p className="text-gray-400 text-sm">Use good lighting and stable camera position</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="htk-achievement-badge text-xs px-2 py-1">SAFETY</div>
                      <div>
                        <h4 className="text-white font-medium">Follow Protocols</h4>
                        <p className="text-gray-400 text-sm">Maintain safety standards while streaming</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="htk-achievement-badge text-xs px-2 py-1">ENGAGE</div>
                      <div>
                        <h4 className="text-white font-medium">Interact with Viewers</h4>
                        <p className="text-gray-400 text-sm">Answer questions and explain your process</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="htk-achievement-badge text-xs px-2 py-1">BRAND</div>
                      <div>
                        <h4 className="text-white font-medium">Professional Standards</h4>
                        <p className="text-gray-400 text-sm">Represent HTK and your trade professionally</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-black rounded-lg border border-yellow-400/20">
                    <h4 className="text-yellow-400 font-semibold mb-2">How to Start Streaming</h4>
                    <ol className="text-sm text-gray-300 space-y-1">
                      <li>1. Set up your YouTube live stream</li>
                      <li>2. Copy the stream URL from YouTube</li>
                      <li>3. Paste it in the field above</li>
                      <li>4. Click "Update Stream Link"</li>
                      <li>5. Customers can now watch your work live!</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'my-bids' && (
          <div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">My Bids</h2>
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-8 text-center">
                <p className="text-gray-400">No bids submitted yet.</p>
                <p className="text-gray-500 text-sm mt-2">
                  Start bidding on jobs to see them here.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">Messages</h2>
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-8 text-center">
                <p className="text-gray-400">No messages yet.</p>
                <p className="text-gray-500 text-sm mt-2">
                  Messages from customers will appear here.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'buy-credits' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-yellow-400">Credit Packages</h2>
              <div className="text-gray-400">
                Current balance: {credits} credits
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  name: 'Bronze',
                  price: '£9.99/month',
                  credits: '10 credits',
                  perCredit: '£0.99 per credit',
                  image: '/golden-wrench.png',
                  popular: false,
                  features: ['Occasional jobs covered', 'Top-up anytime for £1/credit']
                },
                {
                  name: 'Silver',
                  price: '£49.99/month',
                  credits: '70 credits',
                  perCredit: '£0.71 per credit',
                  image: '/silver-tools.png',
                  popular: true,
                  features: ['Steady stream of work', 'Best value for regular work']
                },
                {
                  name: 'Gold',
                  price: '£99.99/month',
                  credits: '160 credits',
                  perCredit: '£0.62 per credit',
                  image: '/golden-tools.png',
                  popular: false,
                  features: ['High-volume, maximum value', 'For pros ready to scale fast']
                },
                {
                  name: 'Pay As You Go',
                  price: '£1.00/credit',
                  credits: 'Flexible',
                  perCredit: '£1.00 per credit',
                  image: '/pay-as-you-go.png',
                  popular: false,
                  features: ['No monthly commitment', 'Credits never expire']
                }
              ].map((pkg, index) => (
                <Card key={index} className={`bg-gray-900 border-2 ${pkg.popular ? 'border-yellow-500' : 'border-gray-700'} hover:scale-105 transition-transform duration-200`}>
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-yellow-400 text-black font-bold px-4 py-1">
                        MOST POPULAR
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <img src={pkg.image} alt={pkg.name} className="w-12 h-12 object-contain" />
                    </div>
                    <CardTitle className="text-yellow-400 text-xl">{pkg.name}</CardTitle>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-white">{pkg.price}</div>
                      <div className="text-yellow-400 font-bold">{pkg.credits}</div>
                      <div className="text-gray-400 text-sm">{pkg.perCredit}</div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      onClick={() => alert(`Purchasing ${pkg.name} package`)}
                      className={`w-full font-semibold ${
                        pkg.popular 
                          ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
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
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-400 text-xl">How Credits Work</CardTitle>
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
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">Profile</h2>
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-400">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Name</label>
                  <p className="text-white">{user?.name}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Email</label>
                  <p className="text-white">{user?.email}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Trade</label>
                  <p className="text-white">{user?.trade || 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Location</label>
                  <p className="text-white">{user?.location || 'Not specified'}</p>
                </div>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

