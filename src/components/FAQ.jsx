import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle, Search, MessageSquare } from 'lucide-react'

export default function FAQ() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [openItems, setOpenItems] = useState({})
  const [selectedCategory, setSelectedCategory] = useState('all')

  const faqCategories = [
    { key: 'all', name: 'All Questions', icon: HelpCircle },
    { key: 'getting-started', name: 'Getting Started', icon: HelpCircle },
    { key: 'pricing', name: 'Pricing & Credits', icon: HelpCircle },
    { key: 'jobs', name: 'Jobs & Bookings', icon: HelpCircle },
    { key: 'payments', name: 'Payments', icon: HelpCircle },
    { key: 'community', name: 'Community', icon: HelpCircle },
    { key: 'technical', name: 'Technical', icon: HelpCircle }
  ]

  const faqData = [
    // Getting Started
    {
      category: 'getting-started',
      question: 'What is HTK and how does it work?',
      answer: 'HTK (Handy To Know) is a platform connecting customers with skilled tradespeople. Built by trades, for trades, we understand the industry challenges. Customers post jobs, tradespeople bid or accept them, and our credit system ensures fair pricing. We\'re currently in beta launch phase.'
    },
    {
      category: 'getting-started',
      question: 'How do I join HTK as a tradesperson?',
      answer: 'Click "Join as Tradesperson" on our homepage, fill out the registration form with your trade details, and verify your credentials. We\'ll review your application and send confirmation to your email. All registrations are currently sent to our team for manual processing during the beta phase.'
    },
    {
      category: 'getting-started',
      question: 'How do I post a job as a customer?',
      answer: 'Register as a customer, then use our job posting form. Describe your job, select the category, set your budget, and our automated pricing system will calculate the credit cost (£3-£100 depending on job size). Your job details will be sent to our team and matched with suitable tradespeople.'
    },
    {
      category: 'getting-started',
      question: 'Is HTK available across the UK?',
      answer: 'Yes! HTK is launching UK-wide. We plan to expand to county-specific recognition and services once we have enough tradespeople in each area. Be among the first to join in your county!'
    },

    // Pricing & Credits
    {
      category: 'pricing',
      question: 'How does the credit system work?',
      answer: 'HTK uses a simple credit system where £1 = 1 credit. Job posting costs range from £3-£100 depending on job size and complexity. This ensures quality job posts and fair compensation for tradespeople. Credits can be purchased in packages with bonus credits for larger purchases.'
    },
    {
      category: 'pricing',
      question: 'Why do I need to pay credits to post a job?',
      answer: 'The credit system ensures serious job posts and prevents spam. It also helps fund platform development and community projects. Unlike other platforms, we don\'t take commission from completed jobs - just the upfront posting fee.'
    },
    {
      category: 'pricing',
      question: 'What credit packages are available?',
      answer: 'We offer various packages: Starter (£25 for 30 credits), Professional (£75 for 100 credits), Business (£200 for 300 credits), and Enterprise (£500 for 850 credits). Larger packages include bonus credits and additional features.'
    },
    {
      category: 'pricing',
      question: 'Do you take commission from completed jobs?',
      answer: 'No! Unlike other platforms, HTK doesn\'t take commission from your earnings. We only charge the upfront job posting fee. This means tradespeople keep 100% of what they earn from completed jobs.'
    },

    // Jobs & Bookings
    {
      category: 'jobs',
      question: 'How are job prices calculated?',
      answer: 'Our automated pricing system considers job category, complexity, urgency, and location. Small repairs might cost 3 credits (£3) while major projects could cost up to 100 credits (£100). The system ensures fair pricing for both customers and tradespeople.'
    },
    {
      category: 'jobs',
      question: 'Can tradespeople work together on jobs?',
      answer: 'Yes! Our trade collaboration system encourages tradespeople to work together. Successful collaborations earn bonus credits for all participants. This builds stronger community connections and allows for more complex projects.'
    },
    {
      category: 'jobs',
      question: 'How do I know if a tradesperson is reliable?',
      answer: 'We\'re implementing a comprehensive rating system tracking time keeping, job quality, pricing, communication, and professionalism. Our "Tradesperson of the Month" recognition highlights the best performers. During beta, we manually verify all tradespeople.'
    },
    {
      category: 'jobs',
      question: 'What happens if I\'m not satisfied with the work?',
      answer: 'Customer satisfaction is our priority. Contact our support team immediately if you\'re not satisfied. We\'ll work with both parties to resolve issues fairly. Our rating system helps ensure quality standards are maintained.'
    },

    // Payments
    {
      category: 'payments',
      question: 'How do I pay for credits?',
      answer: 'All payments are processed securely through Stripe. You can pay with credit/debit cards or bank transfers. We offer various credit packages to suit different needs, from individual customers to large businesses.'
    },
    {
      category: 'payments',
      question: 'Are my payment details secure?',
      answer: 'Absolutely. We use Stripe for all payment processing, which is bank-level security. HTK never stores your payment details - everything is handled securely by Stripe, one of the world\'s most trusted payment processors.'
    },
    {
      category: 'payments',
      question: 'Can I get a refund on unused credits?',
      answer: 'Refund policies are handled case-by-case during our beta phase. Contact our support team if you need assistance with unused credits. We aim to be fair and reasonable with all refund requests.'
    },

    // Community
    {
      category: 'community',
      question: 'How does HTK support local communities?',
      answer: 'After reaching £100,000 in revenue, 50% of profits go directly to local community projects chosen democratically by our users. We believe in giving back to the communities that support us. This is detailed in our Terms of Service.'
    },
    {
      category: 'community',
      question: 'How are community projects chosen?',
      answer: 'Both customers and tradespeople can propose and vote on community projects. We maintain full transparency about how funds are spent through our Community Projects page. Democracy and transparency are core to our values.'
    },
    {
      category: 'community',
      question: 'What is the Tradesperson of the Month program?',
      answer: 'We recognize exceptional tradespeople monthly based on customer ratings. Winners receive 50 credits, platform recognition, and exclusive awards. We\'ll expand to county-level recognition as we grow, with an annual "Tradesperson of the Year" award.'
    },
    {
      category: 'community',
      question: 'Can brands sponsor or partner with HTK?',
      answer: 'Yes! We offer various sponsorship tiers from Bronze (£500/month) to Platinum (£7,500/month). Partners get logo placement, product showcase opportunities, and help fund community projects. Visit our Investment & Partnership page for details.'
    },

    // Technical
    {
      category: 'technical',
      question: 'Is HTK mobile-friendly?',
      answer: 'Yes! HTK is fully responsive and works perfectly on mobile devices. Whether you\'re a tradesperson checking jobs on-site or a customer posting from your phone, the experience is optimized for all devices.'
    },
    {
      category: 'technical',
      question: 'Do you have a mobile app?',
      answer: 'We\'re currently a web-based platform optimized for mobile browsers. A dedicated mobile app is planned for future development as we grow our user base.'
    },
    {
      category: 'technical',
      question: 'How do I contact support?',
      answer: 'You can reach our support team through the Support page, email us directly at handy2knowteam@gmail.com, or use any of our contact forms. All inquiries are sent directly to our team for quick response.'
    },
    {
      category: 'technical',
      question: 'Is HTK really built by tradespeople?',
      answer: 'Yes! HTK was founded by experienced tradespeople who understand the industry challenges firsthand. We\'re not just another tech company - we\'ve worked in the trades and built this platform to solve real problems we\'ve experienced.'
    }
  ]

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const filteredFAQs = faqData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

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
                  <h1 className="htk-text-luxury text-xl font-bold">Frequently Asked Questions</h1>
                  <p className="text-gray-400 text-sm">Get answers to common questions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <HelpCircle className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
          <h1 className="htk-text-luxury text-4xl md:text-6xl font-bold mb-6">
            How Can We Help?
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Find answers to common questions about HTK, our services, and how to get the most out of our platform.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 mb-8">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {faqCategories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center ${
                  selectedCategory === category.key 
                    ? 'htk-btn-luxury' 
                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {filteredFAQs.length === 0 ? (
            <div className="htk-card-luxury p-12 text-center">
              <HelpCircle className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="htk-text-luxury text-xl font-bold mb-2">No results found</h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search terms or browse different categories.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
                className="htk-btn-luxury px-6 py-2"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((item, index) => (
                <div key={index} className="htk-card-luxury overflow-hidden">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/50 transition-all"
                  >
                    <h3 className="htk-text-luxury text-lg font-semibold pr-4">
                      {item.question}
                    </h3>
                    {openItems[index] ? (
                      <ChevronUp className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  {openItems[index] && (
                    <div className="px-6 pb-6 border-t border-gray-700">
                      <p className="text-gray-300 leading-relaxed pt-4">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto text-center">
          <MessageSquare className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
          <h2 className="htk-text-luxury text-3xl font-bold mb-4">
            Still Need Help?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help you get the most out of HTK.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/support')}
              className="htk-btn-luxury px-8 py-3"
            >
              Contact Support
            </button>
            <a 
              href="mailto:handy2knowteam@gmail.com"
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
            >
              Email Us Directly
            </a>
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
            Have a question not covered here? We're always improving our FAQ based on user feedback.
          </p>
        </div>
      </footer>
    </div>
  )
}
