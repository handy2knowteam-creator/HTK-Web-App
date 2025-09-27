import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select'
import tempDB from '../utils/tempDatabase'
import { 
  MapPin, 
  Calendar, 
  Clock, 
  PoundSterling, 
  Wrench, 
  Search,
  Filter,
  ArrowLeft,
  Eye,
  Star,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

export default function TradespersonJobBrowsing() {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [budgetFilter, setBudgetFilter] = useState('')
  const [urgencyFilter, setUrgencyFilter] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const categories = [
    'All Categories', 'Plumbing', 'Electrical', 'Carpentry', 'Painting & Decorating',
    'Roofing', 'Landscaping', 'Cleaning', 'Handyman Services',
    'Tiling', 'Plastering', 'Glazing', 'Locksmith',
    'HVAC', 'Flooring', 'Kitchen Installation', 'Bathroom Installation'
  ]

  const budgetRanges = [
    { label: 'All Budgets', value: '' },
    { label: '£0 - £500', value: '0-500' },
    { label: '£500 - £1,000', value: '500-1000' },
    { label: '£1,000 - £2,500', value: '1000-2500' },
    { label: '£2,500 - £5,000', value: '2500-5000' },
    { label: '£5,000+', value: '5000+' }
  ]

  const urgencyLevels = [
    { label: 'All Urgency', value: '' },
    { label: 'Emergency', value: 'emergency' },
    { label: 'Urgent', value: 'high' },
    { label: 'Normal', value: 'normal' },
    { label: 'Standard', value: 'low' }
  ]

  useEffect(() => {
    loadJobs()
  }, [])

  useEffect(() => {
    filterJobs()
  }, [jobs, searchTerm, categoryFilter, locationFilter, budgetFilter, urgencyFilter])

  const loadJobs = () => {
    setIsLoading(true)
    // Get jobs from temporary database
    const allJobs = tempDB.getAllJobRequests()
    
    // Add some sample jobs if none exist
    if (allJobs.length === 0) {
      const sampleJobs = [
        {
          id: 'sample-1',
          title: 'Kitchen Renovation',
          description: 'Complete kitchen renovation including new cabinets, countertops, and appliances. Looking for experienced kitchen fitters.',
          category: 'Kitchen Installation',
          location: 'London',
          budget: 8500,
          urgency: 'normal',
          timeframe: 'Within 2 months',
          estimatedCredits: 12,
          status: 'open',
          createdAt: new Date().toISOString(),
          contactMethod: 'platform'
        },
        {
          id: 'sample-2',
          title: 'Emergency Plumbing Repair',
          description: 'Burst pipe in bathroom causing water damage. Need immediate repair and assessment.',
          category: 'Plumbing',
          location: 'Manchester',
          budget: 350,
          urgency: 'emergency',
          timeframe: 'Immediate',
          estimatedCredits: 4,
          status: 'open',
          createdAt: new Date().toISOString(),
          contactMethod: 'phone'
        },
        {
          id: 'sample-3',
          title: 'Garden Landscaping Project',
          description: 'Transform back garden with new patio, lawn, and flower beds. Medium-sized garden approximately 50sqm.',
          category: 'Landscaping',
          location: 'Birmingham',
          budget: 3200,
          urgency: 'low',
          timeframe: 'Spring 2024',
          estimatedCredits: 8,
          status: 'open',
          createdAt: new Date().toISOString(),
          contactMethod: 'platform'
        }
      ]
      
      sampleJobs.forEach(job => tempDB.createJobRequest(job))
      setJobs([...allJobs, ...sampleJobs])
    } else {
      setJobs(allJobs)
    }
    
    setIsLoading(false)
  }

  const filterJobs = () => {
    let filtered = [...jobs]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (categoryFilter && categoryFilter !== 'All Categories') {
      filtered = filtered.filter(job => job.category === categoryFilter)
    }

    // Location filter
    if (locationFilter) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      )
    }

    // Budget filter
    if (budgetFilter) {
      const [min, max] = budgetFilter.split('-').map(Number)
      filtered = filtered.filter(job => {
        if (budgetFilter === '5000+') return job.budget >= 5000
        return job.budget >= min && job.budget <= max
      })
    }

    // Urgency filter
    if (urgencyFilter) {
      filtered = filtered.filter(job => job.urgency === urgencyFilter)
    }

    setFilteredJobs(filtered)
  }

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'emergency': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'normal': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getUrgencyLabel = (urgency) => {
    switch (urgency) {
      case 'emergency': return 'Emergency'
      case 'high': return 'Urgent'
      case 'normal': return 'Normal'
      case 'low': return 'Standard'
      default: return 'Unknown'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const handleQuoteJob = (jobId) => {
    // In a real app, this would open a quote form
    alert(`Quote functionality for job ${jobId} - Coming Soon!`)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-yellow-500/20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => navigate('/dashboard')}
                variant="outline"
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-yellow-500">Browse Jobs</h1>
                <p className="text-gray-400">Find projects that match your skills</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Available Jobs</p>
              <p className="text-xl font-bold text-yellow-500">
                {filteredJobs.length}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="bg-gray-900 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-yellow-500 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filter Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Select onValueChange={setCategoryFilter}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Input
                  placeholder="Location..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Select onValueChange={setBudgetFilter}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select onValueChange={setUrgencyFilter}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        {isLoading ? (
          <div className="text-center py-12">
            <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-4 animate-spin" />
            <p className="text-gray-400">Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="bg-gray-900 border-gray-700 hover:border-yellow-500/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-2">{job.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(job.createdAt)}
                        </span>
                      </div>
                    </div>
                    <Badge className={`${getUrgencyColor(job.urgency)} text-white`}>
                      {getUrgencyLabel(job.urgency)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 line-clamp-3">{job.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center text-green-400">
                        <PoundSterling className="w-4 h-4 mr-1" />
                        £{job.budget.toLocaleString()}
                      </span>
                      <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                        {job.category}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Quote Cost</p>
                      <p className="text-yellow-500 font-semibold">{job.estimatedCredits} credits</p>
                    </div>
                  </div>

                  {job.timeframe && (
                    <div className="flex items-center text-sm text-gray-400 mb-4">
                      <Clock className="w-4 h-4 mr-1" />
                      {job.timeframe}
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button
                      onClick={() => handleQuoteJob(job.id)}
                      size="sm"
                      className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Quote Job
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

