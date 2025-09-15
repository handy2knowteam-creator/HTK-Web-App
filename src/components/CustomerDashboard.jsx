import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { Star, MessageSquare, Calendar, MapPin, User } from 'lucide-react'
import TradespersonProfileCard from './TradespersonProfileCard'

export default function CustomerDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('home')
  const [jobTitle, setJobTitle] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [jobBudget, setJobBudget] = useState('')
  const [jobs, setJobs] = useState([])
  const [tradespeople, setTradespeople] = useState([])
  const [reviews, setReviews] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    jobId: null,
    rating: 0,
    comment: '',
    tradesperson: ''
  })

  useEffect(() => {
    if (user && user.user_type !== 'customer') {
      navigate('/tradesperson/dashboard')
    }
    fetchJobs()
    fetchTradespeople()
    fetchReviews()
  }, [user, navigate])

  const fetchJobs = async () => {
    // Mock data for now, integrate with API later
    setJobs([
      { id: 1, title: 'Fix Leaky Faucet', description: 'Kitchen faucet is dripping constantly.', budget: 150, status: 'pending', tradesperson: null, posted: '2025-09-10' },
      { id: 2, title: 'Paint Living Room', description: 'Need living room painted, approx 15x20ft.', budget: 500, status: 'active', tradesperson: 'Painter Pro', posted: '2025-09-05' },
      { id: 3, title: 'Garden Landscaping', description: 'Redesign front garden with new plants and paving.', budget: 1200, status: 'completed', tradesperson: 'Green Thumb Landscaping', posted: '2025-08-20', completed: '2025-09-01' },
      { id: 4, title: 'Bathroom Renovation', description: 'Complete bathroom renovation including tiles and fixtures.', budget: 2500, status: 'completed', tradesperson: 'John Plumber', posted: '2025-08-15', completed: '2025-08-30' },
    ])
  }

  const fetchTradespeople = async () => {
    // Mock data for now, integrate with API later
    setTradespeople([
      { id: 1, name: 'John Plumber', trade: 'Plumbing', rating: 4.8, jobs_done: 50, location: 'London', description: 'Experienced plumber for all your home needs.' },
      { id: 2, name: 'Sarah Electric', trade: 'Electrician', rating: 4.9, jobs_done: 75, location: 'London', description: 'Certified electrician providing safe and reliable service.' },
      { id: 3, name: 'Mike Builder', trade: 'Builder', rating: 4.5, jobs_done: 30, location: 'Birmingham', description: 'General builder specializing in extensions and renovations.' },
      { id: 4, name: 'Anna Gardener', trade: 'Gardener', rating: 4.7, jobs_done: 40, location: 'Manchester', description: 'Professional gardener for beautiful outdoor spaces.' },
    ])
  }

  const fetchReviews = async () => {
    // Mock reviews data
    setReviews([
      {
        id: 1,
        jobId: 3,
        tradesperson: 'Green Thumb Landscaping',
        rating: 5,
        comment: 'Absolutely fantastic work! The garden looks amazing and they were very professional throughout.',
        date: '2025-09-02',
        project: 'Garden Landscaping'
      },
      {
        id: 2,
        jobId: 4,
        tradesperson: 'John Plumber',
        rating: 4,
        comment: 'Good work overall. Bathroom looks great, though there were some minor delays.',
        date: '2025-09-01',
        project: 'Bathroom Renovation'
      }
    ])
  }

  const handlePostJob = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    // Integrate with API to post job
    console.log('Posting job:', { jobTitle, jobDescription, jobBudget })
    // On success:
    setJobTitle('')
    setJobDescription('')
    setJobBudget('')
    fetchJobs()
    setLoading(false)
    setActiveTab('my-jobs')
  }

  const handleViewTradespersonProfile = (id) => {
    console.log(`Viewing profile for tradesperson ID: ${id}`)
    // Navigate to a detailed tradesperson profile page
    // navigate(`/tradesperson/${id}`)
  }

  const handleContactTradesperson = (id) => {
    console.log(`Contacting tradesperson ID: ${id}`)
    // Navigate to a chat screen with the tradesperson
    // navigate(`/messages/${id}`)
  }

  const renderHome = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-yellow-500 mb-2">
          Welcome, {user?.first_name || 'Customer'}!
        </h2>
        <p className="text-gray-300">What can we help you with today?</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500">Post a New Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePostJob} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            <div>
              <Label htmlFor="jobTitle" className="text-gray-300">Job Title</Label>
              <Input
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="jobDescription" className="text-gray-300">Description</Label>
              <textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="flex h-24 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
                required
              ></textarea>
            </div>
            <div>
              <Label htmlFor="jobBudget" className="text-gray-300">Budget (£)</Label>
              <Input
                id="jobBudget"
                type="number"
                value={jobBudget}
                onChange={(e) => setJobBudget(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" disabled={loading}>
              {loading ? 'Posting...' : 'Post Job'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500">Your Active Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          {jobs.filter(job => job.status !== 'completed').length > 0 ? (
            <div className="space-y-4">
              {jobs.filter(job => job.status !== 'completed').map(job => (
                <div key={job.id} className="border border-gray-700 rounded-lg p-4 bg-gray-900">
                  <h3 className="font-semibold text-white">{job.title}</h3>
                  <p className="text-gray-400 text-sm">Budget: £{job.budget} | Status: {job.status}</p>
                  <p className="text-gray-400 text-sm">Posted: {job.posted}</p>
                  <Button variant="outline" size="sm" className="mt-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No active jobs. Post one to get started!</p>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderMyJobs = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-yellow-500">My Jobs</h2>
      <div className="grid gap-4">
        {jobs.length > 0 ? (
          jobs.map(job => (
            <Card key={job.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
                    <p className="text-gray-400 mb-2">{job.description}</p>
                    <p className="text-gray-400 text-sm">Posted: {job.posted}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-500 mb-2">£{job.budget}</div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      job.status === 'pending' ? 'bg-yellow-600 text-gray-900' :
                      job.status === 'active' ? 'bg-blue-600 text-white' :
                      'bg-green-600 text-white'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900">
                    View Bids
                  </Button>
                  {job.status === 'active' && (
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Mark Complete
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-400">You haven't posted any jobs yet.</p>
        )}
      </div>
    </div>
  )

  const renderFindTradespeople = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-yellow-500">Find Tradespeople</h2>
      <div className="flex gap-2 mb-4">
        <Input placeholder="Search by trade, name, or location..." className="flex-grow bg-gray-700 border-gray-600 text-white" />
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">Search</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tradespeople.length > 0 ? (
          tradespeople.map(tp => (
            <TradespersonProfileCard
              key={tp.id}
              tradesperson={tp}
              onViewProfile={handleViewTradespersonProfile}
              onContact={handleContactTradesperson}
            />
          ))
        ) : (
          <p className="text-gray-400 col-span-full">No tradespeople found.</p>
        )}
      </div>
    </div>
  )

  const renderMessages = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-yellow-500">Messages</h2>
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6 text-center">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-xl font-semibold text-white mb-2">No Messages Yet</h3>
          <p className="text-gray-400">
            When you connect with tradespeople, your conversations will appear here.
          </p>
        </CardContent>
      </Card>
    </div>
  )

  const renderProfile = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500">Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-yellow-500">
              <span className="text-gray-900 font-bold text-2xl">
                {user?.first_name?.[0]}{user?.last_name?.[0]}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-white">{user?.first_name} {user?.last_name}</h3>
            <p className="text-gray-400">Customer</p>
          </div>
          
          <div className="space-y-3">
            <div>
              <Label className="block text-sm font-medium text-gray-300">Email</Label>
              <p className="text-white">{user?.email}</p>
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-300">Phone</Label>
              <p className="text-white">{user?.phone_number || 'Not provided'}</p>
            </div>
          </div>

          <div className="pt-4">
            <Button 
              onClick={logout}
              variant="destructive" 
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center border border-yellow-500">
                <span className="text-gray-900 font-bold text-sm">HTK</span>
              </div>
              <h1 className="text-xl font-bold text-yellow-500">Handy To Know</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">Welcome, {user?.first_name}</span>
              <Button onClick={logout} variant="ghost" className="text-gray-300 hover:bg-gray-700 hover:text-white">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <nav className="bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-700">
              <div className="space-y-2">
                {[
                  { id: 'home', label: 'Dashboard', icon: '🏠' },
                  { id: 'my-jobs', label: 'My Jobs', icon: '🛠️' },
                  { id: 'find-tradespeople', label: 'Find Tradespeople', icon: '🔍' },
                  { id: 'messages', label: 'Messages', icon: '💬' },
                  { id: 'profile', label: 'Profile', icon: '👤' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-yellow-600 text-gray-900 font-medium'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'home' && renderHome()}
            {activeTab === 'my-jobs' && renderMyJobs()}
            {activeTab === 'find-tradespeople' && renderFindTradespeople()}
            {activeTab === 'messages' && renderMessages()}
            {activeTab === 'profile' && renderProfile()}
          </div>
        </div>
      </div>
    </div>
  )
}

