import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  Wrench, 
  Phone, 
  Info, 
  FileText, 
  Shield, 
  BookOpen,
  Mail,
  ArrowRight,
  Star,
  Settings,
  HelpCircle,
  Search,
  Plus
} from 'lucide-react'

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const menuSections = [
    {
      title: 'Services',
      icon: Wrench,
      items: [
        { name: 'Find Tradespeople', path: '/register/customer', icon: Users },
        { name: 'Join as Tradesperson', path: '/register/tradesperson', icon: Wrench },
        { name: 'Browse Jobs', path: '/browse-jobs', icon: Search },
        { name: 'Post a Job', path: '/post-job', icon: Plus },
        { name: 'How It Works', path: '/coming-soon', icon: Info },
        { name: 'Pricing & Credits', path: '/coming-soon', icon: Star }
      ]
    },
    {
      title: 'Information',
      icon: BookOpen,
      items: [
        { name: 'About HTK', path: '/coming-soon', icon: Info },
        { name: 'Platform Features', path: '/coming-soon', icon: Settings },
        { name: 'Success Stories', path: '/coming-soon', icon: Star },
        { name: 'FAQ', path: '/coming-soon', icon: HelpCircle }
      ]
    },
    {
      title: 'Customer Support',
      icon: Phone,
      items: [
        { name: 'Contact Support', path: '/support', icon: Phone },
        { name: 'Help Center', path: '/coming-soon', icon: HelpCircle },
        { name: 'Report Issue', path: '/support', icon: Mail },
        { name: 'Live Chat', path: '/coming-soon', icon: Phone }
      ]
    },
    {
      title: 'Trade Support',
      icon: Users,
      items: [
        { name: 'Trade Resources', path: '/coming-soon', icon: BookOpen },
        { name: 'Training & Tips', path: '/coming-soon', icon: Star },
        { name: 'Community Forum', path: '/coming-soon', icon: Users },
        { name: 'Business Tools', path: '/coming-soon', icon: Settings }
      ]
    },
    {
      title: 'Legal & Policies',
      icon: Shield,
      items: [
        { name: 'Terms of Service', path: '/terms', icon: FileText },
        { name: 'Privacy Policy', path: '/privacy', icon: Shield },
        { name: 'Community Guidelines', path: '/community-guidelines', icon: BookOpen },
        { name: 'Cookie Policy', path: '/coming-soon', icon: FileText }
      ]
    }
  ]

  const handleItemClick = (path) => {
    navigate(path)
    setIsOpen(false)
  }

  return (
    <>
      {/* Menu Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="htk-btn-gold relative z-50"
        size="sm"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        <span className="ml-2 hidden sm:inline">Menu</span>
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-screen max-w-6xl bg-black border border-yellow-400/30 rounded-lg shadow-2xl z-50 overflow-hidden">
          <div className="htk-card-luxury border-0 rounded-lg">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/htk-logo-large.png" alt="HTK Logo" className="h-8 w-8" />
                  <div>
                    <h3 className="htk-text-luxury font-bold text-lg">HTK Navigation</h3>
                    <p className="text-gray-400 text-sm">Built by trades, for trades</p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-yellow-400"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Menu Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {menuSections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="space-y-3">
                    {/* Section Header */}
                    <div className="flex items-center space-x-2 pb-2 border-b border-yellow-400/20">
                      <section.icon className="h-4 w-4 text-yellow-400" />
                      <h4 className="htk-text-luxury font-semibold text-sm">{section.title}</h4>
                    </div>

                    {/* Section Items */}
                    <div className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <button
                          key={itemIndex}
                          onClick={() => handleItemClick(item.path)}
                          className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-yellow-400/10 transition-colors group"
                        >
                          <item.icon className="h-4 w-4 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                          <span className="text-gray-300 group-hover:text-white text-sm font-medium transition-colors">
                            {item.name}
                          </span>
                          <ArrowRight className="h-3 w-3 text-gray-500 group-hover:text-yellow-400 ml-auto opacity-0 group-hover:opacity-100 transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions Footer */}
              <div className="mt-8 pt-6 border-t border-yellow-400/20">
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => handleItemClick('/register/customer')}
                    className="htk-btn-luxury flex-1 sm:flex-none"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Find Tradespeople
                  </Button>
                  <Button
                    onClick={() => handleItemClick('/register/tradesperson')}
                    variant="outline"
                    className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black flex-1 sm:flex-none"
                  >
                    <Wrench className="h-4 w-4 mr-2" />
                    Join as Trade
                  </Button>
                  <Button
                    onClick={() => handleItemClick('/support')}
                    variant="ghost"
                    className="text-gray-400 hover:text-yellow-400 flex-1 sm:flex-none"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Get Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

