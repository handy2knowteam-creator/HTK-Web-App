import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck, Mail } from 'lucide-react'

export default function PrivacyPolicy() {
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
                  <h1 className="htk-text-luxury text-xl font-bold">Privacy Policy</h1>
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
          <Shield className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
          <h1 className="htk-text-luxury text-4xl md:text-6xl font-bold mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how HTK collects, 
            uses, and protects your personal information.
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="htk-card-luxury p-8 space-y-8">
            
            {/* 1. Introduction */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4 flex items-center">
                <Eye className="h-6 w-6 text-yellow-500 mr-3" />
                1. Introduction
              </h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  HTK (Handy To Know) is committed to protecting your privacy and personal data. 
                  This Privacy Policy explains how we collect, use, store, and protect your information 
                  when you use our platform.
                </p>
                <p>
                  We comply with UK data protection laws, including the Data Protection Act 2018 
                  and UK GDPR. This policy applies to all users of the HTK platform.
                </p>
                <p>
                  By using HTK, you consent to the collection and use of your information 
                  as described in this Privacy Policy.
                </p>
              </div>
            </div>

            {/* 2. Information We Collect */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4 flex items-center">
                <Database className="h-6 w-6 text-yellow-500 mr-3" />
                2. Information We Collect
              </h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  <strong>Personal Information:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name and contact details (email, phone number)</li>
                  <li>Address and location information</li>
                  <li>Trade qualifications and certifications (for tradespeople)</li>
                  <li>Payment information (processed securely by Stripe)</li>
                  <li>Profile photos and business information</li>
                </ul>
                <p>
                  <strong>Job and Service Information:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Job descriptions and requirements</li>
                  <li>Service categories and pricing</li>
                  <li>Ratings and reviews</li>
                  <li>Communication between users</li>
                </ul>
                <p>
                  <strong>Technical Information:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Usage patterns and preferences</li>
                  <li>Cookies and similar technologies</li>
                </ul>
              </div>
            </div>

            {/* 3. How We Use Your Information */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  We use your information to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Provide our services:</strong> Connect customers with tradespeople, process job requests</li>
                  <li><strong>Account management:</strong> Create and maintain user accounts, verify identities</li>
                  <li><strong>Communication:</strong> Send important updates, notifications, and support responses</li>
                  <li><strong>Payment processing:</strong> Handle credit purchases and transactions (via Stripe)</li>
                  <li><strong>Platform improvement:</strong> Analyze usage to enhance user experience</li>
                  <li><strong>Safety and security:</strong> Prevent fraud, abuse, and maintain platform integrity</li>
                  <li><strong>Recognition programs:</strong> Calculate ratings for Tradesperson of the Month awards</li>
                  <li><strong>Community projects:</strong> Facilitate voting and transparency in community initiatives</li>
                </ul>
              </div>
            </div>

            {/* 4. Information Sharing */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4">4. Information Sharing</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  <strong>We share information only when necessary:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Between matched users:</strong> Contact details shared when jobs are accepted</li>
                  <li><strong>Service providers:</strong> Stripe for payments, email services for notifications</li>
                  <li><strong>Legal requirements:</strong> When required by law or to protect rights and safety</li>
                  <li><strong>Business transfers:</strong> In case of merger, acquisition, or asset sale</li>
                </ul>
                <p>
                  <strong>We never:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Sell your personal data to third parties</li>
                  <li>Share information for marketing purposes without consent</li>
                  <li>Provide data to competitors or unrelated businesses</li>
                </ul>
              </div>
            </div>

            {/* 5. Data Security */}
            <div className="bg-gradient-to-r from-blue-900/20 to-blue-700/20 border border-blue-500/30 rounded-lg p-6">
              <h2 className="htk-text-luxury text-2xl font-bold mb-4 flex items-center">
                <Lock className="h-6 w-6 text-yellow-500 mr-3" />
                5. Data Security
              </h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  We implement robust security measures to protect your data:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Encryption:</strong> All data transmitted using SSL/TLS encryption</li>
                  <li><strong>Secure storage:</strong> Data stored on secure, regularly updated servers</li>
                  <li><strong>Access controls:</strong> Limited access to personal data on need-to-know basis</li>
                  <li><strong>Payment security:</strong> All payments processed by Stripe (PCI DSS compliant)</li>
                  <li><strong>Regular audits:</strong> Security practices reviewed and updated regularly</li>
                  <li><strong>Incident response:</strong> Procedures in place for any security breaches</li>
                </ul>
                <p>
                  While we implement strong security measures, no system is 100% secure. 
                  We encourage users to use strong passwords and keep login details confidential.
                </p>
              </div>
            </div>

            {/* 6. Your Rights */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4 flex items-center">
                <UserCheck className="h-6 w-6 text-yellow-500 mr-3" />
                6. Your Rights
              </h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  Under UK data protection law, you have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Access:</strong> Request copies of your personal data</li>
                  <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                  <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                  <li><strong>Portability:</strong> Receive your data in a structured format</li>
                  <li><strong>Restriction:</strong> Limit how we process your data</li>
                  <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
                  <li><strong>Withdraw consent:</strong> Remove consent for data processing</li>
                </ul>
                <p>
                  To exercise these rights, contact us at handy2knowteam@gmail.com. 
                  We will respond within one month of receiving your request.
                </p>
              </div>
            </div>

            {/* 7. Cookies and Tracking */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4">7. Cookies and Tracking</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  HTK uses cookies and similar technologies to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Remember your login status and preferences</li>
                  <li>Analyze website usage and performance</li>
                  <li>Provide personalized user experience</li>
                  <li>Ensure platform security and prevent fraud</li>
                </ul>
                <p>
                  <strong>Types of cookies we use:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Essential cookies:</strong> Required for platform functionality</li>
                  <li><strong>Performance cookies:</strong> Help us understand how users interact with HTK</li>
                  <li><strong>Functional cookies:</strong> Remember your preferences and settings</li>
                </ul>
                <p>
                  You can control cookies through your browser settings, but disabling essential 
                  cookies may affect platform functionality.
                </p>
              </div>
            </div>

            {/* 8. Data Retention */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4">8. Data Retention</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  We retain your data only as long as necessary:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Active accounts:</strong> Data retained while account is active</li>
                  <li><strong>Closed accounts:</strong> Most data deleted within 30 days</li>
                  <li><strong>Legal requirements:</strong> Some data retained for legal/regulatory compliance</li>
                  <li><strong>Financial records:</strong> Transaction data retained for 7 years (UK law)</li>
                  <li><strong>Safety records:</strong> Fraud prevention data retained for 2 years</li>
                </ul>
                <p>
                  You can request account deletion at any time by contacting our support team.
                </p>
              </div>
            </div>

            {/* 9. Third-Party Services */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4">9. Third-Party Services</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  HTK integrates with trusted third-party services:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Stripe:</strong> Payment processing (has own privacy policy)</li>
                  <li><strong>FormSubmit:</strong> Form handling for contact and support</li>
                  <li><strong>Email services:</strong> For notifications and communications</li>
                  <li><strong>Analytics tools:</strong> To understand platform usage (anonymized data)</li>
                </ul>
                <p>
                  These services have their own privacy policies. We recommend reviewing 
                  their policies to understand how they handle your data.
                </p>
              </div>
            </div>

            {/* 10. International Transfers */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4">10. International Transfers</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  HTK primarily operates within the UK. However, some third-party services 
                  may process data outside the UK/EEA.
                </p>
                <p>
                  When data is transferred internationally, we ensure:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Adequate protection through approved mechanisms</li>
                  <li>Compliance with UK data protection standards</li>
                  <li>Contractual safeguards with service providers</li>
                </ul>
              </div>
            </div>

            {/* 11. Children's Privacy */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4">11. Children's Privacy</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  HTK is not intended for use by individuals under 18 years of age. 
                  We do not knowingly collect personal information from children.
                </p>
                <p>
                  If we become aware that we have collected personal information from someone 
                  under 18, we will delete that information promptly.
                </p>
              </div>
            </div>

            {/* 12. Changes to Privacy Policy */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4">12. Changes to Privacy Policy</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Our data practices</li>
                  <li>Legal requirements</li>
                  <li>Platform features and functionality</li>
                </ul>
                <p>
                  We will notify users of significant changes via email or platform notifications. 
                  Continued use of HTK after changes constitutes acceptance of the updated policy.
                </p>
              </div>
            </div>

            {/* 13. Contact Information */}
            <div>
              <h2 className="htk-text-luxury text-2xl font-bold mb-4 flex items-center">
                <Mail className="h-6 w-6 text-yellow-500 mr-3" />
                13. Contact Information
              </h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  For questions about this Privacy Policy or your personal data, contact us:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Email:</strong> handy2knowteam@gmail.com</li>
                  <li><strong>Subject line:</strong> "Privacy Policy Inquiry"</li>
                  <li><strong>Support page:</strong> Available through the HTK platform</li>
                  <li><strong>Website:</strong> www.handy2know.com</li>
                </ul>
                <p>
                  We aim to respond to all privacy-related inquiries within 48 hours.
                </p>
              </div>
            </div>

            {/* Effective Date */}
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-400 text-sm">
                This Privacy Policy is effective as of {new Date().toLocaleDateString()} and 
                applies to all users of the HTK platform.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                HTK is committed to transparency and protecting your privacy while building 
                stronger communities through the trades industry.
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
            Your privacy and data security are our top priorities.
          </p>
        </div>
      </footer>
    </div>
  )
}
