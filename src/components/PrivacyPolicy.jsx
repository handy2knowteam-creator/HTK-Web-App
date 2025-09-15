import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield, Lock, Eye, Database } from 'lucide-react'

export default function PrivacyPolicy() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/htk-logo.png" alt="HTK Logo" className="h-10 w-10" />
              <span className="text-xl font-bold text-yellow-400">HANDY TO KNOW</span>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-8">
            <div className="flex items-center mb-8">
              <Shield className="h-8 w-8 text-yellow-400 mr-4" />
              <h1 className="text-3xl font-bold text-yellow-400">Privacy Policy</h1>
            </div>
            <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  1. Information We Collect
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Personal Information:</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Name, email address, phone number</li>
                      <li>Location and address information</li>
                      <li>Professional qualifications and certifications</li>
                      <li>Payment and billing information</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Usage Information:</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Platform usage patterns and preferences</li>
                      <li>Job postings and communications</li>
                      <li>Reviews and ratings</li>
                      <li>Device and browser information</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  2. How We Use Your Information
                </h2>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Facilitate connections between customers and tradespeople</li>
                  <li>Process payments and manage credit systems</li>
                  <li>Verify professional qualifications and background checks</li>
                  <li>Improve platform functionality and user experience</li>
                  <li>Send important updates and notifications</li>
                  <li>Provide customer support and resolve disputes</li>
                  <li>Ensure platform security and prevent fraud</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  3. Information Sharing
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    We do not sell, trade, or rent your personal information to third parties. We may share information in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>With other users as necessary to facilitate services (e.g., contact information for job completion)</li>
                    <li>With verification services for background checks and professional validation</li>
                    <li>With payment processors for transaction handling</li>
                    <li>When required by law or to protect our legal rights</li>
                    <li>With your explicit consent</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-400 mb-4">4. Data Security</h2>
                <p className="text-gray-300 leading-relaxed">
                  We implement industry-standard security measures to protect your personal information, including encryption, 
                  secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-400 mb-4">5. Your Rights</h2>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Access and review your personal information</li>
                  <li>Request corrections to inaccurate data</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt-out of non-essential communications</li>
                  <li>Export your data in a portable format</li>
                  <li>Withdraw consent for data processing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-400 mb-4">6. Cookies and Tracking</h2>
                <p className="text-gray-300 leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, remember preferences, and analyze platform usage. 
                  You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-400 mb-4">7. Data Retention</h2>
                <p className="text-gray-300 leading-relaxed">
                  We retain personal information for as long as necessary to provide services and comply with legal obligations. 
                  Inactive accounts may be deleted after extended periods of non-use with appropriate notice.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-400 mb-4">8. Children's Privacy</h2>
                <p className="text-gray-300 leading-relaxed">
                  HTK is not intended for users under 18 years of age. We do not knowingly collect personal information from children. 
                  If we become aware of such collection, we will delete the information promptly.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-400 mb-4">9. International Users</h2>
                <p className="text-gray-300 leading-relaxed">
                  HTK operates primarily in the UK and complies with UK data protection laws including GDPR. 
                  International users should be aware that data may be processed in the UK.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-400 mb-4">10. Contact Us</h2>
                <p className="text-gray-300 leading-relaxed">
                  For privacy-related questions or to exercise your rights, contact us at privacy@handytoknow.com or through our support system. 
                  We will respond to requests within 30 days.
                </p>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-700">
              <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-6">
                <h3 className="text-yellow-400 font-semibold mb-2">Your Privacy Matters</h3>
                <p className="text-gray-300">
                  HTK is committed to protecting your privacy and maintaining transparency about our data practices. 
                  We believe in building trust through clear communication and responsible data handling.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

