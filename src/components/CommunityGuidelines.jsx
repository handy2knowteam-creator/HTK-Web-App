import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Users, Heart, Shield, Star, MessageCircle, Handshake } from 'lucide-react'

export default function CommunityGuidelines() {
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
            <div className="flex items-center mb-8">
              <Users className="h-8 w-8 text-yellow-500 mr-4" />
              <h1 className="text-3xl font-bold text-yellow-500">Community Guidelines</h1>
            </div>
            <p className="text-gray-400 mb-8">Building a respectful, professional community for all trades</p>

            <div className="space-y-8">
              <section>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-semibold text-yellow-500 mb-4 flex items-center">
                    <Heart className="h-5 w-5 mr-2" />
                    Our Community Values
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    HTK is built by trades, for trades. We believe in mutual respect, professional excellence, 
                    and supporting each other's success. Our community thrives on collaboration, learning, and integrity.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-500 mb-4 flex items-center">
                  <Handshake className="h-5 w-5 mr-2" />
                  1. Professional Conduct
                </h2>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Treat all community members with respect and professionalism</li>
                  <li>Communicate clearly and honestly about your skills and availability</li>
                  <li>Honor your commitments and complete work to agreed standards</li>
                  <li>Respond to messages and inquiries in a timely manner</li>
                  <li>Maintain appropriate professional boundaries</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-500 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  2. Safety and Compliance
                </h2>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Maintain valid licenses, certifications, and insurance</li>
                  <li>Follow all applicable safety regulations and building codes</li>
                  <li>Report safety concerns or violations promptly</li>
                  <li>Use appropriate safety equipment and practices</li>
                  <li>Ensure work sites are safe for all involved</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-500 mb-4 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  3. Communication Standards
                </h2>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Use respectful language in all communications</li>
                  <li>Avoid discriminatory, offensive, or inappropriate content</li>
                  <li>Keep discussions relevant and constructive</li>
                  <li>Respect privacy and confidentiality</li>
                  <li>Report harassment or inappropriate behavior</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-500 mb-4 flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  4. Quality and Excellence
                </h2>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Strive for excellence in all work performed</li>
                  <li>Provide accurate estimates and timelines</li>
                  <li>Use quality materials and proper techniques</li>
                  <li>Stand behind your work with appropriate warranties</li>
                  <li>Continuously improve your skills and knowledge</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-500 mb-4">5. Fair Pricing and Transparency</h2>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Provide fair and competitive pricing</li>
                  <li>Be transparent about costs and potential additional charges</li>
                  <li>Honor quoted prices unless circumstances change significantly</li>
                  <li>Explain pricing clearly to customers</li>
                  <li>Avoid price manipulation or unfair practices</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-500 mb-4">6. Collaboration and Support</h2>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Support fellow tradespeople and share knowledge</li>
                  <li>Collaborate professionally on team projects</li>
                  <li>Provide constructive feedback and mentorship</li>
                  <li>Refer work to qualified colleagues when appropriate</li>
                  <li>Contribute positively to the community</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-500 mb-4">7. Reviews and Feedback</h2>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Provide honest, constructive reviews</li>
                  <li>Base reviews on actual work experience</li>
                  <li>Avoid fake or misleading reviews</li>
                  <li>Respond professionally to feedback</li>
                  <li>Use reviews to improve service quality</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-500 mb-4">8. Platform Integrity</h2>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Use the platform as intended</li>
                  <li>Avoid circumventing platform features or fees</li>
                  <li>Report bugs, issues, or violations</li>
                  <li>Protect your account credentials</li>
                  <li>Respect intellectual property rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-500 mb-4">9. Dispute Resolution</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  When conflicts arise, we encourage:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Direct, respectful communication to resolve issues</li>
                  <li>Seeking mediation through HTK support when needed</li>
                  <li>Providing complete and accurate information</li>
                  <li>Working toward fair and reasonable solutions</li>
                  <li>Learning from conflicts to prevent future issues</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-yellow-500 mb-4">10. Consequences</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Violations of these guidelines may result in:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Warnings and educational guidance</li>
                  <li>Temporary suspension of platform privileges</li>
                  <li>Permanent removal from the platform</li>
                  <li>Loss of credits or earnings</li>
                  <li>Reporting to relevant authorities when appropriate</li>
                </ul>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-700">
              <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-lg p-6">
                <h3 className="text-yellow-500 font-semibold mb-2">Building Excellence Together</h3>
                <p className="text-gray-300 mb-4">
                  These guidelines help us maintain a professional, supportive community where everyone can succeed. 
                  By following these principles, we build trust, reputation, and mutual success.
                </p>
                <p className="text-gray-400 text-sm">
                  Questions about these guidelines? Contact us at community@handytoknow.com
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

