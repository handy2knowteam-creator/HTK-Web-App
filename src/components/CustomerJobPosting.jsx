import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select'
import { calculateJobCredits } from '../utils/jobPricing'
import tempDB from '../utils/tempDatabase'
import { 
  MapPin, 
  Calendar, 
  Clock, 
  PoundSterling, 
  Wrench, 
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Send
} from 'lucide-react'

export default function CustomerJobPosting() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    budget: '',
    urgency: 'normal',
    timeframe: '',
    requirements: '',
    contactMethod: 'platform'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [estimatedCredits, setEstimatedCredits] = useState(0)

  const categories = [
    'Plumbing', 'Electrical', 'Carpentry', 'Painting & Decorating',
    'Roofing', 'Landscaping', 'Cleaning', 'Handyman Services',
    'Tiling', 'Plastering', 'Glazing', 'Locksmith',
    'HVAC', 'Flooring', 'Kitchen Installation', 'Bathroom Installation'
  ]

  const urgencyOptions = [
    { value: 'low', label: 'Standard (1-2 weeks)', multiplier: 1 },
    { value: 'normal', label: 'Normal (3-7 days)', multiplier: 1.2 },
    { value: 'high', label: 'Urgent (1-2 days)', multiplier: 1.5 },
    { value: 'emergency', label: 'Emergency (Same day)', multiplier: 2 }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const updatedData = { ...formData, [name]: value }
    setFormData(updatedData)
    
    // Calculate estimated credits when budget or urgency changes
    if (name === 'budget' || name === 'urgency') {
      updateEstimatedCredits(updatedData)
    }
  }

  const handleSelectChange = (name, value) => {
    const updatedData = { ...formData, [name]: value }
    setFormData(updatedData)
    
    if (name === 'urgency') {
      updateEstimatedCredits(updatedData)
    }
  }

  const updateEstimatedCredits = (data) => {
    if (data.budget && data.urgency) {
      const credits = calculateJobCredits({
        budget: parseFloat(data.budget),
        urgency: data.urgency,
        location: data.location,
        category: data.category
      })
      setEstimatedCredits(credits)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const jobData = {
        ...formData,
        budget: parseFloat(formData.budget),
        estimatedCredits,
        postedBy: 'customer', // In real app, get from auth context
        status: 'open'
      }

      const result = tempDB.createJobRequest(jobData)
      
      if (result.success) {
        setSubmitSuccess(true)
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000)
      }
    } catch (error) {
      console.error('Error posting job:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Card className="bg-gray-900 border-yellow-500 max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-yellow-500 mb-2">Job Posted Successfully!</h2>
            <p className="text-gray-300 mb-4">
              Your job has been posted and tradespeople will be able to view and quote for it.
            </p>
            <p className="text-sm text-gray-400">
              Redirecting to your dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    )
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
                <h1 className="text-2xl font-bold text-yellow-500">Post a Job</h1>
                <p className="text-gray-400">Find skilled tradespeople for your project</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Estimated Cost</p>
              <p className="text-xl font-bold text-yellow-500">
                {estimatedCredits} credits
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Job Details */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-500 flex items-center">
                <Wrench className="w-5 h-5 mr-2" />
                Job Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title" className="text-gray-300">Job Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Kitchen Renovation, Bathroom Repair"
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-gray-300">Category *</Label>
                  <Select onValueChange={(value) => handleSelectChange('category', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Select job category" />
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
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-300">Job Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your project in detail..."
                  rows={4}
                  className="bg-gray-800 border-gray-600 text-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="requirements" className="text-gray-300">Specific Requirements</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="Any specific requirements, materials, or qualifications needed..."
                  rows={3}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Location & Timing */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-500 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Location & Timing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="location" className="text-gray-300">Location *</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., London, Manchester, Birmingham"
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="timeframe" className="text-gray-300">Preferred Timeframe</Label>
                  <Input
                    id="timeframe"
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleInputChange}
                    placeholder="e.g., Next week, Within a month"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="urgency" className="text-gray-300">Urgency Level *</Label>
                <Select onValueChange={(value) => handleSelectChange('urgency', value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Budget & Contact */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-500 flex items-center">
                <PoundSterling className="w-5 h-5 mr-2" />
                Budget & Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="budget" className="text-gray-300">Budget (£) *</Label>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="e.g., 500, 2000, 5000"
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactMethod" className="text-gray-300">Preferred Contact Method</Label>
                  <Select onValueChange={(value) => handleSelectChange('contactMethod', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Select contact method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="platform">Through HTK Platform</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="any">Any Method</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {estimatedCredits > 0 && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    <span className="text-yellow-500 font-semibold">Estimated Cost</span>
                  </div>
                  <p className="text-gray-300 mt-2">
                    This job will cost approximately <span className="text-yellow-500 font-bold">{estimatedCredits} credits</span> for tradespeople to quote.
                    This ensures you receive quality responses from verified professionals.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8"
            >
              {isSubmitting ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Posting Job...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Post Job
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

