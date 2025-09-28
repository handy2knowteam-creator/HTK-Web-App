import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MessageSquare, 
  Clock, 
  HelpCircle,
  Send,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react'

export default function SupportPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'normal'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send the form data to a backend
    alert('Thank you for contacting HTK Support! We will get back to you within 24 hours.')
    setFormData({ name: '', email: '', subject: '', message: '', priority: 'normal' })
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-yellow-500/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate('/')}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-yellow-500"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div className="flex items-center space-x-3">
                <img src="/htk-logo-large.png" alt="HTK Logo" className="h-8 w-8" />
                <div>
                  <h1 className="htk-text-luxury font-bold text-lg">HTK Support</h1>
                  <p className="text-gray-400 text-sm">We're here to help</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold htk-text-luxury mb-4">
            How Can We Help You?
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get support for HTK platform, report issues, or ask questions. 
            Our team is ready to assist you with anything you need.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Primary Contact */}
            <Card className="htk-card-luxury">
              <CardHeader>
                <CardTitle className="htk-text-luxury flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Primary Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Mail className="h-5 w-5 text-yellow-500" />
                    <span className="text-yellow-500 font-semibold">Email Support</span>
                  </div>
                  <a 
                    href="mailto:handy2knowteam@gmail.com"
                    className="text-white font-bold text-lg hover:text-yellow-500 transition-colors"
                  >
                    handy2knowteam@gmail.com
                  </a>
                  <p className="text-gray-400 text-sm mt-2">
                    Primary support email for all HTK platform inquiries
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Response Times */}
            <Card className="htk-card-luxury">
              <CardHeader>
                <CardTitle className="htk-text-luxury flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Response Times
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">General Inquiries</span>
                  <span className="text-yellow-500 font-semibold">24 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Technical Issues</span>
                  <span className="text-yellow-500 font-semibold">12 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Urgent Issues</span>
                  <span className="text-yellow-500 font-semibold">4 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Platform Status</span>
                  <span className="text-green-400 font-semibold">Real-time</span>
                </div>
              </CardContent>
            </Card>

            {/* Support Categories */}
            <Card className="htk-card-luxury">
              <CardHeader>
                <CardTitle className="htk-text-luxury flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Support Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  'Account & Registration',
                  'Credit & Billing',
                  'Technical Issues',
                  'Platform Features',
                  'Trade Verification',
                  'Customer Disputes',
                  'Partnership Inquiries',
                  'General Questions'
                ].map((category, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-300 text-sm">{category}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="htk-card-luxury">
              <CardHeader>
                <CardTitle className="htk-text-luxury flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-300">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-black border-gray-600 text-white focus:border-yellow-500"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-black border-gray-600 text-white focus:border-yellow-500"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="subject" className="text-gray-300">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="bg-black border-gray-600 text-white focus:border-yellow-500"
                        placeholder="Brief description of your inquiry"
                      />
                    </div>
                    <div>
                      <Label htmlFor="priority" className="text-gray-300">Priority Level</Label>
                      <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-gray-600 text-white focus:border-yellow-500 rounded-md px-3 py-2"
                      >
                        <option value="low">Low - General Question</option>
                        <option value="normal">Normal - Standard Support</option>
                        <option value="high">High - Technical Issue</option>
                        <option value="urgent">Urgent - Platform Down</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-300">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="bg-black border-gray-600 text-white focus:border-yellow-500"
                      placeholder="Please provide as much detail as possible about your inquiry or issue..."
                    />
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Info className="h-5 w-5 text-blue-400 mt-0.5" />
                      <div>
                        <h4 className="text-blue-400 font-semibold mb-1">Before Submitting</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Check our FAQ section for common questions</li>
                          <li>• Include relevant details like error messages or screenshots</li>
                          <li>• Specify if you're a customer or tradesperson</li>
                          <li>• Mention your browser and device if reporting technical issues</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full htk-btn-luxury text-lg py-3"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="htk-card-luxury mt-6">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-6 w-6 text-red-400 mt-1" />
                  <div>
                    <h4 className="text-red-400 font-semibold mb-2">Emergency or Urgent Issues</h4>
                    <p className="text-gray-300 text-sm mb-3">
                      For platform outages, security concerns, or urgent technical issues that affect your ability to work:
                    </p>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-red-400" />
                        <span className="text-red-400 font-semibold">Emergency Email:</span>
                        <a 
                          href="mailto:handy2knowteam@gmail.com?subject=URGENT%20-%20Platform%20Issue"
                          className="text-white font-bold hover:text-red-400 transition-colors"
                        >
                          handy2knowteam@gmail.com
                        </a>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">
                        Use subject line: "URGENT - [Brief Description]"
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

