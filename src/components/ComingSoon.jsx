import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Clock, Bell, Star } from 'lucide-react'

export default function ComingSoon({ feature = "This Feature", description = "We're working hard to bring you this amazing feature." }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="htk-header px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="htk-logo-container">
            <img 
              src="/htk-logo-large.png" 
              alt="HTK Logo" 
              className="htk-logo-premium htk-logo-medium"
            />
            <span className="htk-logo-text">HANDY TO KNOW</span>
          </div>
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="htk-glow-gold rounded-full p-8 bg-gray-900">
                <Clock className="h-16 w-16 text-htk-gold" />
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="bg-htk-gold text-black rounded-full p-2">
                  <Star className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold htk-text-gradient mb-6">
            Coming Soon
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-htk-gold mb-4">
            {feature}
          </h2>
          
          <p className="text-xl htk-text-professional max-w-2xl mx-auto mb-8">
            {description}
          </p>
        </div>

        {/* Feature Preview Card */}
        <Card className="htk-card-premium mb-12">
          <CardHeader>
            <CardTitle className="text-htk-gold text-2xl text-center">
              What's Coming
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-gray-800 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Bell className="h-8 w-8 text-htk-gold" />
                </div>
                <h3 className="font-semibold text-white mb-2">Enhanced Features</h3>
                <p className="htk-text-muted text-sm">
                  Advanced functionality to improve your experience
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-800 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Star className="h-8 w-8 text-htk-gold" />
                </div>
                <h3 className="font-semibold text-white mb-2">Premium Quality</h3>
                <p className="htk-text-muted text-sm">
                  Built by trades, for trades with attention to detail
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-800 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-htk-gold" />
                </div>
                <h3 className="font-semibold text-white mb-2">Coming Soon</h3>
                <p className="htk-text-muted text-sm">
                  We're working around the clock to deliver this
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Stay Updated
            </h3>
            <p className="htk-text-muted mb-6">
              We'll notify you as soon as this feature is ready. In the meantime, explore our other amazing features!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/')}
              className="htk-btn-gold px-8 py-3 text-lg"
            >
              Explore HTK Platform
            </Button>
            
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="border-htk-gold text-htk-gold hover:bg-htk-gold hover:text-black px-8 py-3 text-lg"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </Button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-16 text-center">
          <div className="htk-card bg-gray-900 p-6 rounded-lg">
            <h4 className="text-htk-gold font-semibold mb-4">Development Progress</h4>
            <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
              <div className="bg-gradient-to-r from-htk-gold to-htk-gold-accent h-3 rounded-full" style={{width: '75%'}}></div>
            </div>
            <p className="htk-text-muted text-sm">75% Complete - Almost there!</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="htk-logo-container justify-center mb-4">
            <img 
              src="/htk-logo-large.png" 
              alt="HTK Logo" 
              className="htk-logo-premium htk-logo-small"
            />
            <span className="htk-logo-text text-lg">HANDY TO KNOW</span>
          </div>
          <p className="htk-text-muted">
            © 2024 HTK - Handy To Know. Built by trades, for trades.
          </p>
        </div>
      </footer>
    </div>
  )
}

