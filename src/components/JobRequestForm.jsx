import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  MapPin, 
  Clock, 
  PoundSterling, 
  Wrench, 
  AlertTriangle, 
  Info,
  Calculator,
  CheckCircle
} from 'lucide-react'
import { 
  calculateJobCredits, 
  getCreditValue, 
  getJobPricingExplanation,
  validateJobForPricing,
  JOB_CATEGORIES,
  URGENCY_LEVELS,
  LOCATION_TYPES,
  COMPLEXITY_LEVELS
} from '../utils/jobPricing'

export default function JobRequestForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    urgency: URGENCY_LEVELS.STANDARD,
    location: '',
    complexity: COMPLEXITY_LEVELS.BASIC,
    address: '',
    postcode: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    preferredStartDate: '',
    additionalRequirements: ''
  })

  const [calculatedCredits, setCalculatedCredits] = useState(0)
  const [pricingExplanation, setPricingExplanation] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState([])

  // Calculate credits whenever relevant form data changes
  useEffect(() => {
    if (formData.category && formData.budget && formData.urgency && formData.location && formData.complexity) {
      const credits = calculateJobCredits(formData)
      const explanation = getJobPricingExplanation(formData)
      setCalculatedCredits(credits)
      setPricingExplanation(explanation)
    }
  }, [formData.category, formData.budget, formData.urgency, formData.location, formData.complexity])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors([])

    // Validate form data
    const validation = validateJobForPricing(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      setIsSubmitting(false)
      return
    }

    // Additional form validation
    const formErrors = []
    if (!formData.title.trim()) formErrors.push('Job title is required')
    if (!formData.description.trim()) formErrors.push('Job description is required')
    if (!formData.address.trim()) formErrors.push('Address is required')
    if (!formData.contactName.trim()) formErrors.push('Contact name is required')
    if (!formData.contactPhone.trim()) formErrors.push('Contact phone is required')

    if (formErrors.length > 0) {
      setErrors(formErrors)
      setIsSubmitting(false)
      return
    }

    try {
      // Submit job request with calculated credits
      const jobData = {
        ...formData,
        credits: calculatedCredits,
        status: 'active',
        postedDate: new Date().toISOString(),
        pricingBreakdown: pricingExplanation
      }

      // Send job data to email via FormSubmit
      const formSubmitData = new FormData()
      formSubmitData.append('_to', 'handy2knowteam@gmail.com')
      formSubmitData.append('_subject', `HTK Job Request - ${formData.title}`)
      formSubmitData.append('_template', 'table')
      formSubmitData.append('_next', `${window.location.origin}/thank-you`)
      
      // Job details
      formSubmitData.append('Job Title', formData.title)
      formSubmitData.append('Description', formData.description)
      formSubmitData.append('Category', formData.category)
      formSubmitData.append('Budget', formData.budget)
      formSubmitData.append('Urgency', formData.urgency)
      formSubmitData.append('Location', formData.location)
      formSubmitData.append('Complexity', formData.complexity)
      formSubmitData.append('Address', formData.address)
      formSubmitData.append('Postcode', formData.postcode)
      formSubmitData.append('Contact Name', formData.contactName)
      formSubmitData.append('Contact Phone', formData.contactPhone)
      formSubmitData.append('Contact Email', formData.contactEmail)
      formSubmitData.append('Preferred Start Date', formData.preferredStartDate)
      formSubmitData.append('Additional Requirements', formData.additionalRequirements)
      formSubmitData.append('Calculated Credits', calculatedCredits)
      formSubmitData.append('Posted Date', new Date().toLocaleString())

      const response = await fetch('https://formsubmit.co/handy2knowteam@gmail.com', {
        method: 'POST',
        body: formSubmitData
      })

      if (response.ok) {
        // Success - redirect to thank you page
        navigate('/thank-you')
      } else {
        throw new Error('Failed to post job')
      }
    } catch (error) {
      console.error('Error posting job:', error)
      setErrors(['Failed to post job. Please try again.'])
    } finally {
      setIsSubmitting(false)
    }
  }

  const categoryOptions = [
    { value: JOB_CATEGORIES.ELECTRICAL, label: 'Electrical', icon: '⚡' },
    { value: JOB_CATEGORIES.PLUMBING, label: 'Plumbing', icon: '🔧' },
    { value: JOB_CATEGORIES.HEATING, label: 'Heating & Gas', icon: '🔥' },
    { value: JOB_CATEGORIES.CARPENTRY, label: 'Carpentry', icon: '🔨' },
    { value: JOB_CATEGORIES.PAINTING, label: 'Painting & Decorating', icon: '🎨' },
    { value: JOB_CATEGORIES.ROOFING, label: 'Roofing', icon: '🏠' },
    { value: JOB_CATEGORIES.LANDSCAPING, label: 'Landscaping', icon: '🌿' },
    { value: JOB_CATEGORIES.GENERAL, label: 'General Maintenance', icon: '🛠️' }
  ]

  const budgetOptions = [
    { value: '0-200', label: '£0 - £200', description: 'Small repairs & maintenance' },
    { value: '200-500', label: '£200 - £500', description: 'Minor installations & fixes' },
    { value: '500-1000', label: '£500 - £1,000', description: 'Medium-scale projects' },
    { value: '1000-2500', label: '£1,000 - £2,500', description: 'Significant improvements' },
    { value: '2500-5000', label: '£2,500 - £5,000', description: 'Major renovations' },
    { value: '5000-10000', label: '£5,000 - £10,000', description: 'Large-scale projects' },
    { value: '10000+', label: '£10,000+', description: 'Premium installations' }
  ]

  const urgencyOptions = [
    { 
      value: URGENCY_LEVELS.STANDARD, 
      label: 'Standard', 
      description: 'Within 1-2 weeks',
      color: 'bg-gray-700 text-gray-300'
    },
    { 
      value: URGENCY_LEVELS.HIGH_PRIORITY, 
      label: 'High Priority', 
      description: 'Within 2-3 days',
      color: 'bg-blue-900 text-blue-300'
    },
    { 
      value: URGENCY_LEVELS.EMERGENCY, 
      label: 'Emergency', 
      description: 'Within 24 hours',
      color: 'bg-red-900 text-red-300'
    },
    { 
      value: URGENCY_LEVELS.PREMIUM, 
      label: 'Premium', 
      description: 'ASAP with premium service',
      color: 'bg-purple-900 text-purple-300'
    }
  ]

  const locationOptions = [
    { value: LOCATION_TYPES.RURAL, label: 'Rural Area', description: 'Countryside, villages' },
    { value: LOCATION_TYPES.SUBURBAN, label: 'Suburban', description: 'Town outskirts, residential areas' },
    { value: LOCATION_TYPES.URBAN, label: 'Urban', description: 'City center, busy areas' },
    { value: LOCATION_TYPES.LONDON, label: 'London', description: 'Greater London area' }
  ]

  const complexityOptions = [
    { 
      value: COMPLEXITY_LEVELS.BASIC, 
      label: 'Basic', 
      description: 'Simple, straightforward work'
    },
    { 
      value: COMPLEXITY_LEVELS.INTERMEDIATE, 
      label: 'Intermediate', 
      description: 'Requires some specialized knowledge'
    },
    { 
      value: COMPLEXITY_LEVELS.ADVANCED, 
      label: 'Advanced', 
      description: 'Complex work requiring expertise'
    },
    { 
      value: COMPLEXITY_LEVELS.SPECIALIST, 
      label: 'Specialist', 
      description: 'Highly specialized or rare skills needed'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="htk-header-luxury border-b border-yellow-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/htk-logo-large.png" 
                alt="HTK Logo" 
                className="htk-logo-luxury"
                style={{ height: '50px', width: 'auto' }}
              />
              <div>
                <h1 className="htk-text-luxury text-xl font-bold">Post a Job</h1>
                <p className="text-gray-400 text-sm">Get quotes from qualified tradespeople</p>
              </div>
            </div>
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Job Details */}
              <Card className="htk-card-luxury">
                <CardHeader>
                  <CardTitle className="htk-text-luxury flex items-center">
                    <Wrench className="mr-2 h-5 w-5" />
                    Job Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="e.g., Kitchen tap replacement, Electrical fault repair..."
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Job Category *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {categoryOptions.map(option => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleInputChange('category', option.value)}
                          className={`p-3 rounded-lg border text-center transition-colors ${
                            formData.category === option.value
                              ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500'
                              : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          <div className="text-2xl mb-1">{option.icon}</div>
                          <div className="text-xs font-medium">{option.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Job Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Please describe the work needed in detail..."
                      rows={4}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Factors */}
              <Card className="htk-card-luxury">
                <CardHeader>
                  <CardTitle className="htk-text-luxury flex items-center">
                    <Calculator className="mr-2 h-5 w-5" />
                    Pricing Information
                  </CardTitle>
                  <p className="text-gray-400 text-sm">
                    This information helps us calculate fair pricing for tradespeople
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      <PoundSterling className="inline mr-1 h-4 w-4" />
                      Budget Range *
                    </label>
                    <div className="grid gap-2">
                      {budgetOptions.map(option => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleInputChange('budget', option.value)}
                          className={`p-3 rounded-lg border text-left transition-colors ${
                            formData.budget === option.value
                              ? 'border-yellow-500 bg-yellow-500/10'
                              : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                          }`}
                        >
                          <div className="font-medium text-white">{option.label}</div>
                          <div className="text-sm text-gray-400">{option.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Urgency */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      <Clock className="inline mr-1 h-4 w-4" />
                      Urgency Level *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {urgencyOptions.map(option => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleInputChange('urgency', option.value)}
                          className={`p-3 rounded-lg border text-center transition-colors ${
                            formData.urgency === option.value
                              ? 'border-yellow-500 bg-yellow-500/10'
                              : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                          }`}
                        >
                          <div className="font-medium text-white">{option.label}</div>
                          <div className="text-xs text-gray-400">{option.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Location Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      <MapPin className="inline mr-1 h-4 w-4" />
                      Location Type *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {locationOptions.map(option => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleInputChange('location', option.value)}
                          className={`p-3 rounded-lg border text-center transition-colors ${
                            formData.location === option.value
                              ? 'border-yellow-500 bg-yellow-500/10'
                              : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                          }`}
                        >
                          <div className="font-medium text-white">{option.label}</div>
                          <div className="text-xs text-gray-400">{option.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Complexity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      <AlertTriangle className="inline mr-1 h-4 w-4" />
                      Job Complexity *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {complexityOptions.map(option => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleInputChange('complexity', option.value)}
                          className={`p-3 rounded-lg border text-center transition-colors ${
                            formData.complexity === option.value
                              ? 'border-yellow-500 bg-yellow-500/10'
                              : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                          }`}
                        >
                          <div className="font-medium text-white">{option.label}</div>
                          <div className="text-xs text-gray-400">{option.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="htk-card-luxury">
                <CardHeader>
                  <CardTitle className="htk-text-luxury">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange('contactName', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Job Address *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Full address where work will be carried out"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Postcode
                      </label>
                      <input
                        type="text"
                        value={formData.postcode}
                        onChange={(e) => handleInputChange('postcode', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Preferred Start Date
                      </label>
                      <input
                        type="date"
                        value={formData.preferredStartDate}
                        onChange={(e) => handleInputChange('preferredStartDate', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Additional Requirements
                    </label>
                    <textarea
                      value={formData.additionalRequirements}
                      onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
                      placeholder="Any specific requirements, access issues, or additional information..."
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Error Display */}
              {errors.length > 0 && (
                <Alert className="border-red-500 bg-red-900/20">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <ul className="list-disc list-inside space-y-1">
                      {errors.map((error, index) => (
                        <li key={index} className="text-red-300">{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting || calculatedCredits === 0}
                  className="htk-btn-luxury px-8 py-3 text-lg"
                >
                  {isSubmitting ? 'Posting Job...' : `Post Job (${calculatedCredits} Credits)`}
                </Button>
              </div>
            </form>
          </div>

          {/* Pricing Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Credit Calculation */}
              {calculatedCredits > 0 && (
                <Card className="htk-card-luxury">
                  <CardHeader>
                    <CardTitle className="htk-text-luxury flex items-center">
                      <Calculator className="mr-2 h-5 w-5" />
                      Job Pricing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold htk-text-luxury mb-2">
                        {calculatedCredits}
                      </div>
                      <div className="text-gray-400">Credits Required</div>
                      <div className="text-sm text-gray-500 mt-1">
                        Value: {getCreditValue(calculatedCredits, 'silver').formattedValue}
                      </div>
                    </div>

                    {pricingExplanation && (
                      <div className="space-y-3">
                        <div className="text-sm font-medium text-yellow-500 border-t border-gray-700 pt-3">
                          Pricing Breakdown:
                        </div>
                        {pricingExplanation.breakdown.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-400">{item.factor}:</span>
                            <span className="text-white">{item.value}</span>
                          </div>
                        ))}
                        <div className="text-xs text-gray-500 mt-3 p-3 bg-gray-800/50 rounded">
                          <Info className="inline mr-1 h-3 w-3" />
                          {pricingExplanation.explanation}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* How It Works */}
              <Card className="htk-card-luxury">
                <CardHeader>
                  <CardTitle className="htk-text-luxury">How It Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-500 text-black text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                    <div className="text-sm text-gray-300">
                      <div className="font-medium text-white">Post Your Job</div>
                      <div>Fill out the details and we'll calculate fair pricing</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-500 text-black text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                    <div className="text-sm text-gray-300">
                      <div className="font-medium text-white">Get Quotes</div>
                      <div>Qualified tradespeople bid on your job</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-500 text-black text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                    <div className="text-sm text-gray-300">
                      <div className="font-medium text-white">Choose & Connect</div>
                      <div>Review profiles and connect directly</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Support */}
              <Card className="htk-card-luxury">
                <CardHeader>
                  <CardTitle className="htk-text-luxury">Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm mb-3">
                    Our team is here to help you get the best results.
                  </p>
                  <Button
                    onClick={() => navigate('/support')}
                    variant="outline"
                    className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                  >
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

