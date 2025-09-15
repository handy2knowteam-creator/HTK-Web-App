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
    // Mock data for now
    setJobs([
      {
        id: 1,
        title: 'Kitchen Plumbing Repair',
        description: 'Need urgent plumbing repair in kitchen sink',
        location: 'London, UK',
        budget: '£150-200',
        posted: '2 hours ago',
        customer: 'John Smith'
      },
      {
        id: 2,
        title: 'Bathroom Renovation',
        description: 'Complete bathroom renovation needed',
        location: 'Manchester, UK',
        budget: '£2000-3000',
        posted: '1 day ago',
        customer: 'Sarah Johnson'
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

  const handleBidOnJob = (jobId) => {
    if (credits > 0) {
      // Deduct credit and submit bid
      setCredits(credits - 1)
      alert('Bid submitted successfully!')
    } else {
      alert('You need credits to bid on jobs. Please purchase credits.')
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
              src="/htk-logo.png" 
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
              onClick={() => navigate('/buy-credits')}
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
            {['jobs', 'portfolio', 'reviews', 'live-stream', 'my-bids', 'messages', 'profile'].map((tab) => (
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
                        onClick={() => handleBidOnJob(job.id)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                        disabled={credits === 0}
                      >
                        Bid on Job (1 Credit)
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
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">Live Streaming</h2>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-yellow-400 flex items-center">
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
                      placeholder="https://youtube.com/watch?v=..."
                      className="bg-black border-gray-600 text-white focus:border-yellow-400"
                    />
                  </div>
                  <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                    Start Live Stream
                  </Button>
                  <div className="text-sm text-gray-400">
                    <p>• Show customers your work in real-time</p>
                    <p>• Build trust through transparency</p>
                    <p>• Answer questions during the project</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-yellow-400">Stream Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="text-white font-medium">Real-time Updates</h4>
                        <p className="text-gray-400 text-sm">Keep customers informed of progress</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="text-white font-medium">Build Trust</h4>
                        <p className="text-gray-400 text-sm">Transparency increases customer confidence</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="text-white font-medium">Marketing Tool</h4>
                        <p className="text-gray-400 text-sm">Showcase your skills to potential customers</p>
                      </div>
                    </div>
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

