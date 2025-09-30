import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Users, 
  Hammer, 
  DollarSign, 
  Star, 
  Shield, 
  Settings, 
  Database,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Video,
  Award,
  Mail,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  BarChart3,
  PieChart,
  Globe,
  Lock,
  Unlock,
  RefreshCw
} from 'lucide-react'

export default function AdminDashboardComplete() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState({})
  const [customers, setCustomers] = useState([])
  const [tradespeople, setTradespeople] = useState([])
  const [jobs, setJobs] = useState([])
  const [payments, setPayments] = useState([])
  const [liveStreams, setLiveStreams] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Check admin authentication
    const adminAuth = localStorage.getItem('htkAdminAuth')
    if (!adminAuth) {
      navigate('/admin/login')
      return
    }

    const authData = JSON.parse(adminAuth)
    if (!authData.isAuthenticated) {
      navigate('/admin/login')
      return
    }

    setIsAuthenticated(true)
    loadDashboardData()
  }, [navigate])

  const loadDashboardData = async () => {
    // Load all platform data
    await Promise.all([
      loadStats(),
      loadCustomers(),
      loadTradespeople(),
      loadJobs(),
      loadPayments(),
      loadLiveStreams()
    ])
  }

  const loadStats = async () => {
    // Mock stats - in production, fetch from API
    setStats({
      totalUsers: 1247,
      totalCustomers: 892,
      totalTradespeople: 355,
      activeJobs: 89,
      completedJobs: 1158,
      totalRevenue: 45678.90,
      monthlyGrowth: 23.5,
      liveStreams: 12,
      avgRating: 4.7,
      communityFund: 12450.00,
      profitSharing: 0, // Not reached £100k yet
      domainStatus: {
        'handy2know.com': 'active',
        'handy2know.co.uk': 'active'
      }
    })
  }

  const loadCustomers = async () => {
    // Mock customer data
    setCustomers([
      {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+44 7700 900123',
        location: 'London',
        joinDate: '2024-09-15',
        jobsPosted: 5,
        totalSpent: 450.00,
        status: 'active',
        lastActive: '2024-09-30'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+44 7700 900456',
        location: 'Manchester',
        joinDate: '2024-09-20',
        jobsPosted: 3,
        totalSpent: 780.00,
        status: 'active',
        lastActive: '2024-09-29'
      }
    ])
  }

  const loadTradespeople = async () => {
    // Mock tradesperson data
    setTradespeople([
      {
        id: 1,
        name: 'Mike Thompson',
        email: 'mike.t@email.com',
        phone: '+44 7700 900789',
        trade: 'Plumber',
        location: 'Birmingham',
        joinDate: '2024-09-10',
        jobsCompleted: 23,
        rating: 4.9,
        earnings: 2340.00,
        credits: 45,
        status: 'verified',
        hasVideo: true,
        liveStreams: 5,
        lastActive: '2024-09-30'
      },
      {
        id: 2,
        name: 'Emma Davies',
        email: 'emma.d@email.com',
        phone: '+44 7700 900012',
        trade: 'Electrician',
        location: 'Leeds',
        joinDate: '2024-09-12',
        jobsCompleted: 18,
        rating: 4.8,
        earnings: 1890.00,
        credits: 32,
        status: 'verified',
        hasVideo: false,
        liveStreams: 2,
        lastActive: '2024-09-29'
      }
    ])
  }

  const loadJobs = async () => {
    // Mock job data
    setJobs([
      {
        id: 1,
        title: 'Kitchen Plumbing Repair',
        customer: 'John Smith',
        tradesperson: 'Mike Thompson',
        category: 'Plumbing',
        budget: '£150-200',
        credits: 8,
        status: 'completed',
        posted: '2024-09-25',
        completed: '2024-09-27'
      }
    ])
  }

  const loadPayments = async () => {
    // Mock payment data
    setPayments([
      {
        id: 1,
        user: 'John Smith',
        type: 'Credit Purchase',
        amount: 50.00,
        credits: 50,
        date: '2024-09-25',
        status: 'completed',
        method: 'Stripe'
      }
    ])
  }

  const loadLiveStreams = async () => {
    // Mock live stream data
    setLiveStreams([
      {
        id: 1,
        title: 'DeWalt Tool Demo',
        streamer: 'Mike Thompson',
        viewers: 247,
        duration: '45 min',
        status: 'live',
        revenue: 89.50,
        date: '2024-09-30'
      }
    ])
  }

  const handleLogout = () => {
    localStorage.removeItem('htkAdminAuth')
    navigate('/admin/login')
  }

  const exportData = (dataType) => {
    // Export functionality
    const data = {
      customers,
      tradespeople,
      jobs,
      payments,
      liveStreams
    }[dataType]

    const csv = convertToCSV(data)
    downloadCSV(csv, `htk-${dataType}-${new Date().toISOString().split('T')[0]}.csv`)
  }

  const convertToCSV = (data) => {
    if (!data.length) return ''
    
    const headers = Object.keys(data[0]).join(',')
    const rows = data.map(row => Object.values(row).join(','))
    return [headers, ...rows].join('\n')
  }

  const downloadCSV = (csv, filename) => {
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-yellow-400">Loading...</div>
    </div>
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'customers', name: 'Customers', icon: Users },
    { id: 'tradespeople', name: 'Tradespeople', icon: Hammer },
    { id: 'jobs', name: 'Jobs', icon: Activity },
    { id: 'payments', name: 'Payments', icon: DollarSign },
    { id: 'live', name: 'Live Streams', icon: Video },
    { id: 'awards', name: 'Awards', icon: Award },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'settings', name: 'Settings', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-black border-b border-yellow-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/htk-logo-premium.png" alt="HTK" className="h-12 w-12" />
              <div>
                <h1 className="text-2xl font-bold text-yellow-400">HTK Admin</h1>
                <p className="text-gray-400 text-sm">Platform Management Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <Globe className="h-3 w-3 mr-1" />
                Both Domains Active
              </Badge>
              <Button onClick={handleLogout} variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-yellow-400">Platform Overview</h2>
                
                {/* Key Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Total Users</p>
                          <p className="text-2xl font-bold text-yellow-400">{stats.totalUsers?.toLocaleString()}</p>
                        </div>
                        <Users className="h-8 w-8 text-yellow-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Total Revenue</p>
                          <p className="text-2xl font-bold text-green-400">£{stats.totalRevenue?.toLocaleString()}</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Active Jobs</p>
                          <p className="text-2xl font-bold text-blue-400">{stats.activeJobs}</p>
                        </div>
                        <Activity className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Avg Rating</p>
                          <p className="text-2xl font-bold text-yellow-400">{stats.avgRating}</p>
                        </div>
                        <Star className="h-8 w-8 text-yellow-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Domain Status */}
                <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                  <CardHeader>
                    <CardTitle className="text-yellow-400 flex items-center">
                      <Globe className="h-5 w-5 mr-2" />
                      Domain Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div>
                          <p className="font-semibold text-white">handy2know.com</p>
                          <p className="text-green-400 text-sm">Primary Domain</p>
                        </div>
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div>
                          <p className="font-semibold text-white">handy2know.co.uk</p>
                          <p className="text-green-400 text-sm">Secondary Domain</p>
                        </div>
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Community Fund */}
                <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                  <CardHeader>
                    <CardTitle className="text-yellow-400">Community Profit Sharing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                          <span>Progress to £100,000 milestone</span>
                          <span>£{stats.totalRevenue?.toLocaleString()} / £100,000</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(stats.totalRevenue / 100000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Once we reach £100,000 in profits, 50% of subsequent profits will be distributed to communities in our service areas.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'customers' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold text-yellow-400">Customer Management</h2>
                  <div className="flex space-x-2">
                    <Button onClick={() => exportData('customers')} className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>
                </div>

                <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-yellow-400">All Customers ({customers.length})</CardTitle>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Search customers..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-64 bg-gray-800 border-gray-600"
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left py-3 text-gray-400">Name</th>
                            <th className="text-left py-3 text-gray-400">Email</th>
                            <th className="text-left py-3 text-gray-400">Location</th>
                            <th className="text-left py-3 text-gray-400">Jobs Posted</th>
                            <th className="text-left py-3 text-gray-400">Total Spent</th>
                            <th className="text-left py-3 text-gray-400">Status</th>
                            <th className="text-left py-3 text-gray-400">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customers.map((customer) => (
                            <tr key={customer.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                              <td className="py-3 text-white font-medium">{customer.name}</td>
                              <td className="py-3 text-gray-300">{customer.email}</td>
                              <td className="py-3 text-gray-300">{customer.location}</td>
                              <td className="py-3 text-gray-300">{customer.jobsPosted}</td>
                              <td className="py-3 text-green-400">£{customer.totalSpent}</td>
                              <td className="py-3">
                                <Badge className={customer.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                                  {customer.status}
                                </Badge>
                              </td>
                              <td className="py-3">
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="text-yellow-400 hover:text-yellow-300">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'tradespeople' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold text-yellow-400">Tradesperson Management</h2>
                  <Button onClick={() => exportData('tradespeople')} className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>

                <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                  <CardHeader>
                    <CardTitle className="text-yellow-400">All Tradespeople ({tradespeople.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left py-3 text-gray-400">Name</th>
                            <th className="text-left py-3 text-gray-400">Trade</th>
                            <th className="text-left py-3 text-gray-400">Location</th>
                            <th className="text-left py-3 text-gray-400">Rating</th>
                            <th className="text-left py-3 text-gray-400">Jobs</th>
                            <th className="text-left py-3 text-gray-400">Credits</th>
                            <th className="text-left py-3 text-gray-400">Video</th>
                            <th className="text-left py-3 text-gray-400">Status</th>
                            <th className="text-left py-3 text-gray-400">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tradespeople.map((person) => (
                            <tr key={person.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                              <td className="py-3 text-white font-medium">{person.name}</td>
                              <td className="py-3 text-gray-300">{person.trade}</td>
                              <td className="py-3 text-gray-300">{person.location}</td>
                              <td className="py-3 text-yellow-400 flex items-center">
                                <Star className="h-4 w-4 mr-1 fill-current" />
                                {person.rating}
                              </td>
                              <td className="py-3 text-gray-300">{person.jobsCompleted}</td>
                              <td className="py-3 text-blue-400">{person.credits}</td>
                              <td className="py-3">
                                {person.hasVideo ? (
                                  <Badge className="bg-green-500/20 text-green-400">
                                    <Video className="h-3 w-3 mr-1" />
                                    Yes
                                  </Badge>
                                ) : (
                                  <Badge className="bg-gray-500/20 text-gray-400">No</Badge>
                                )}
                              </td>
                              <td className="py-3">
                                <Badge className={person.status === 'verified' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                                  {person.status}
                                </Badge>
                              </td>
                              <td className="py-3">
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="text-yellow-400 hover:text-yellow-300">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-yellow-400">Security & Domain Management</h2>
                
                <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                  <CardHeader>
                    <CardTitle className="text-yellow-400 flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      SSL & Security Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-white">handy2know.com</p>
                            <p className="text-green-400 text-sm">SSL Certificate Valid</p>
                            <p className="text-gray-400 text-xs">Expires: Dec 2024</p>
                          </div>
                          <Lock className="h-6 w-6 text-green-500" />
                        </div>
                      </div>
                      
                      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-white">handy2know.co.uk</p>
                            <p className="text-green-400 text-sm">SSL Certificate Valid</p>
                            <p className="text-gray-400 text-xs">Expires: Dec 2024</p>
                          </div>
                          <Lock className="h-6 w-6 text-green-500" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <h4 className="text-blue-400 font-semibold mb-2">Security Features Active:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>✅ HTTPS Enforced</li>
                        <li>✅ Content Security Policy</li>
                        <li>✅ XSS Protection</li>
                        <li>✅ CSRF Protection</li>
                        <li>✅ Rate Limiting</li>
                        <li>✅ Admin Session Management</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
