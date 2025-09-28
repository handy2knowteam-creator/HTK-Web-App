import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function TermsOfService() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/htk-logo-large.png" alt="HTK Logo" className="h-16 w-16" />
              <span className="text-xl font-bold text-yellow-500">HANDY TO KNOW</span>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
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
            <h1 className="text-3xl font-bold text-yellow-500 mb-8">Terms of Service</h1>
            <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-yellow-500 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-300 leading-relaxed">
                  By accessing and using HTK - Handy To Know ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-500 mb-4">2. Platform Description</h2>
                <p className="text-gray-300 leading-relaxed">
                  HTK is a digital platform that connects customers with skilled tradespeople. We facilitate connections but are not directly involved in the actual transactions between users. 
                  HTK operates on a credit-based system for fair and transparent pricing.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-500 mb-4">3. User Responsibilities</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">For Customers:</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li>Provide accurate job descriptions and requirements</li>
                      <li>Communicate respectfully with tradespeople</li>
                      <li>Pay agreed amounts promptly upon completion</li>
                      <li>Provide honest reviews and feedback</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">For Tradespeople:</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li>Maintain valid licenses and insurance</li>
                      <li>Provide accurate skill and availability information</li>
                      <li>Complete work to professional standards</li>
                      <li>Communicate clearly with customers</li>
                      <li>Honor quoted prices and timelines</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-500 mb-4">4. Credit System</h2>
                <p className="text-gray-300 leading-relaxed">
                  HTK operates on a credit-based system. Tradespeople purchase credits to bid on jobs and access premium features. 
                  Credits are non-refundable but do not expire. Pricing is transparent and clearly displayed.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-500 mb-4">5. Quality Standards</h2>
                <p className="text-gray-300 leading-relaxed">
                  All tradespeople undergo verification processes including background checks and insurance verification. 
                  We maintain high standards for our community and reserve the right to remove users who violate our guidelines.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-500 mb-4">6. Dispute Resolution</h2>
                <p className="text-gray-300 leading-relaxed">
                  HTK provides mediation services for disputes between users. We encourage direct communication first, 
                  but our support team is available to help resolve issues fairly and professionally.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-500 mb-4">7. Privacy and Data</h2>
                <p className="text-gray-300 leading-relaxed">
                  We respect your privacy and handle personal data in accordance with our Privacy Policy and applicable data protection laws. 
                  We do not sell personal information to third parties.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-500 mb-4">8. Limitation of Liability</h2>
                <p className="text-gray-300 leading-relaxed">
                  HTK acts as a platform facilitator. We are not liable for the quality of work performed, 
                  disputes between users, or any damages arising from use of the platform. Users engage with each other at their own risk.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-500 mb-4">9. Community Profit Sharing Program</h2>
                <p className="text-gray-300 leading-relaxed">
                  HTK is committed to supporting local communities. Once the platform achieves £100,000 in cumulative profits, 
                  50% of all subsequent profits will be distributed to communities in the service areas where our platform operates. 
                  This community investment program is designed to support local infrastructure, training programs, and community development initiatives. 
                  Distribution methods and community selection criteria will be determined by HTK management and communicated to users annually.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-500 mb-4">10. Modifications</h2>
                <p className="text-gray-300 leading-relaxed">
                  HTK reserves the right to modify these terms at any time. Users will be notified of significant changes, 
                  and continued use of the platform constitutes acceptance of modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-500 mb-4">11. Contact Information</h2>
                <p className="text-gray-300 leading-relaxed">
                  For questions about these Terms of Service, please contact us at legal@handytoknow.com or through our support system.
                </p>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-700">
              <p className="text-gray-400 text-center">
                By using HTK, you acknowledge that you have read, understood, and agree to these Terms of Service.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

