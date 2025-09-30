import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield, FileText, Users, Heart } from 'lucide-react'

export default function TermsOfService() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="htk-header-luxury sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/')}
                className="htk-btn-luxury p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-3">
                <img src="/htk-logo-new.png" alt="HTK Logo" className="h-12 w-12" />
                <div>
                  <h1 className="htk-text-luxury text-xl font-bold">Terms of Service</h1>
                  <p className="text-gray-400 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <FileText className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
          <h1 className="htk-text-luxury text-4xl md:text-6xl font-bold mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            These terms govern your use of HTK (Handy To Know) platform. 
            By using our services, you agree to these terms.
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="htk-card-luxury p-8 space-y-8">
            
            {/* 1. Introduction */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4 flex items-center">
                <Shield className="h-6 w-6 text-yellow-500 mr-3" />
                1. Introduction
              </h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  Welcome to HTK (Handy To Know), a platform connecting customers with skilled tradespeople. 
                  HTK is operated by the HTK team and is designed to serve the UK trades community.
                </p>
                <p>
                  These Terms of Service ("Terms") govern your access to and use of HTK's website, 
                  mobile applications, and related services (collectively, the "Service").
                </p>
                <p>
                  By accessing or using our Service, you agree to be bound by these Terms. 
                  If you disagree with any part of these terms, you may not access the Service.
                </p>
              </div>
            </div>

            {/* 2. Platform Description */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4">2. Platform Description</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  HTK is a platform that facilitates connections between customers seeking trade services 
                  and qualified tradespeople. We operate on a credit-based system where customers purchase 
                  credits to post jobs, and tradespeople can bid on or accept these jobs.
                </p>
                <p>
                  <strong>Key Features:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Job posting and matching system</li>
                  <li>Credit-based pricing (£1 = 1 credit)</li>
                  <li>Tradesperson verification and rating system</li>
                  <li>Community recognition programs</li>
                  <li>Trade collaboration features</li>
                  <li>Community project funding</li>
                </ul>
              </div>
            </div>

            {/* 3. User Accounts */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4">3. User Accounts</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  To use certain features of HTK, you must create an account. You may create accounts as:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Customer:</strong> To post jobs and hire tradespeople</li>
                  <li><strong>Tradesperson:</strong> To offer services and accept jobs</li>
                </ul>
                <p>
                  You are responsible for maintaining the confidentiality of your account credentials 
                  and for all activities that occur under your account.
                </p>
                <p>
                  You must provide accurate, current, and complete information during registration 
                  and keep your account information updated.
                </p>
              </div>
            </div>

            {/* 4. Credit System and Pricing */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4">4. Credit System and Pricing</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  HTK operates on a credit-based system where £1 equals 1 credit. 
                  Job posting costs range from £3 to £100 depending on job complexity, category, and urgency.
                </p>
                <p>
                  <strong>Pricing Structure:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Small jobs (basic repairs): 3-15 credits</li>
                  <li>Medium jobs (installations): 15-50 credits</li>
                  <li>Large jobs (major projects): 50-100 credits</li>
                </ul>
                <p>
                  <strong>No Commission Policy:</strong> Unlike other platforms, HTK does not take 
                  commission from completed jobs. Tradespeople keep 100% of their earnings from completed work.
                </p>
                <p>
                  Credits are non-refundable except in exceptional circumstances at HTK's sole discretion.
                </p>
              </div>
            </div>

            {/* 5. Community Profit Sharing */}
            <div className="bg-gradient-to-r from-yellow-900/20 to-yellow-700/20 border border-yellow-500/30 rounded-lg p-6">
              <h2 className="htk-text-luxury text-2xl font-bold mb-4 flex items-center">
                <Heart className="h-6 w-6 text-yellow-500 mr-3" />
                5. Community Profit Sharing*
              </h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  HTK is committed to supporting local communities. After reaching £100,000 in total revenue, 
                  50% of net profits will be allocated to community projects and charitable initiatives.
                </p>
                <p>
                  <strong>Community Project Selection:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Projects are proposed and voted on by HTK users (customers and tradespeople)</li>
                  <li>Voting is conducted through the HTK platform</li>
                  <li>Full transparency is maintained through our Community Projects page</li>
                  <li>Quarterly reports detail all community spending</li>
                </ul>
                <p>
                  <strong>Eligible Projects:</strong> Local community improvements, trade education programs, 
                  charity support, environmental initiatives, and other community-beneficial projects.
                </p>
                <p className="text-yellow-400 text-sm">
                  * This commitment begins after HTK reaches £100,000 in total platform revenue.
                </p>
              </div>
            </div>

            {/* 6. User Responsibilities */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4">6. User Responsibilities</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  <strong>All Users Must:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and truthful information</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Respect other users and maintain professional conduct</li>
                  <li>Not misuse the platform or attempt to circumvent our systems</li>
                </ul>
                <p>
                  <strong>Customers Must:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide clear and accurate job descriptions</li>
                  <li>Pay agreed amounts for completed work</li>
                  <li>Provide fair and honest ratings</li>
                </ul>
                <p>
                  <strong>Tradespeople Must:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Possess appropriate qualifications and insurance</li>
                  <li>Complete work to professional standards</li>
                  <li>Maintain professional conduct at all times</li>
                  <li>Comply with all relevant trade regulations</li>
                </ul>
              </div>
            </div>

            {/* 7. Recognition Programs */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4">7. Recognition Programs</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  HTK operates recognition programs including "Tradesperson of the Month" and 
                  "Tradesperson of the Year" based on customer ratings and performance metrics.
                </p>
                <p>
                  <strong>Recognition Criteria:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Time keeping and reliability</li>
                  <li>Job quality and craftsmanship</li>
                  <li>Fair and competitive pricing</li>
                  <li>Communication and professionalism</li>
                  <li>Cleanliness and site management</li>
                </ul>
                <p>
                  Winners receive 50 platform credits, recognition badges, and promotional benefits. 
                  HTK reserves the right to modify recognition programs and criteria.
                </p>
              </div>
            </div>

            {/* 8. Payment Terms */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4">8. Payment Terms</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  All payments are processed securely through Stripe. HTK does not store payment information.
                </p>
                <p>
                  <strong>Credit Purchases:</strong> Credits must be purchased before posting jobs. 
                  Various credit packages are available with bulk purchase discounts.
                </p>
                <p>
                  <strong>Job Payments:</strong> Payment arrangements between customers and tradespeople 
                  for completed work are independent of HTK. We recommend using secure payment methods 
                  and obtaining receipts.
                </p>
                <p>
                  <strong>Refunds:</strong> Credit refunds are handled case-by-case during our beta phase. 
                  Contact support for assistance.
                </p>
              </div>
            </div>

            {/* 9. Limitation of Liability */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4">9. Limitation of Liability</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  HTK is a platform that facilitates connections between users. We do not directly 
                  provide trade services or guarantee the quality of work performed.
                </p>
                <p>
                  <strong>HTK is not liable for:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Quality of work performed by tradespeople</li>
                  <li>Disputes between customers and tradespeople</li>
                  <li>Damages resulting from use of our platform</li>
                  <li>Third-party actions or omissions</li>
                </ul>
                <p>
                  Users engage with each other at their own risk and should verify credentials, 
                  insurance, and qualifications independently.
                </p>
              </div>
            </div>

            {/* 10. Privacy and Data */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4">10. Privacy and Data</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  HTK respects your privacy and handles personal data in accordance with UK data protection laws.
                </p>
                <p>
                  <strong>Data Collection:</strong> We collect information necessary to provide our services, 
                  including contact details, job information, and usage data.
                </p>
                <p>
                  <strong>Data Use:</strong> Your data is used to facilitate connections, improve our services, 
                  and communicate important updates.
                </p>
                <p>
                  <strong>Data Sharing:</strong> We do not sell personal data. Information is shared only 
                  as necessary to provide services (e.g., sharing contact details between matched users).
                </p>
              </div>
            </div>

            {/* 11. Termination */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4">11. Termination</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  HTK reserves the right to suspend or terminate accounts for violations of these Terms, 
                  fraudulent activity, or other reasons at our sole discretion.
                </p>
                <p>
                  Users may delete their accounts at any time by contacting support. 
                  Unused credits may be forfeited upon account deletion.
                </p>
              </div>
            </div>

            {/* 12. Changes to Terms */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4">12. Changes to Terms</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  HTK may update these Terms from time to time. Users will be notified of significant 
                  changes via email or platform notifications.
                </p>
                <p>
                  Continued use of the platform after changes constitutes acceptance of the updated Terms.
                </p>
              </div>
            </div>

            {/* 13. Contact Information */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4">13. Contact Information</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  For questions about these Terms or HTK services, contact us:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Email: handy2knowteam@gmail.com</li>
                  <li>Support Page: Available through the HTK platform</li>
                  <li>Website: www.handy2know.com</li>
                </ul>
              </div>
            </div>

            {/* Effective Date */}
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-400 text-sm">
                These Terms of Service are effective as of {new Date().toLocaleDateString()} and 
                apply to all users of the HTK platform.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                HTK is committed to transparency, fairness, and supporting the UK trades community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-yellow-500/20">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src="/htk-logo-new.png" alt="HTK Logo" className="h-8 w-8" />
            <span className="htk-text-luxury text-lg font-bold">HTK - Handy To Know</span>
          </div>
          <p className="text-gray-400 mb-4">Built by trades, for trades</p>
          <p className="text-gray-500 text-sm">
            Questions about our Terms? Contact our support team for clarification.
          </p>
        </div>
      </footer>
    </div>
  )
}
