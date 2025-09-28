import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Video, 
  Users, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2, 
  Calendar,
  Clock,
  Star,
  Play,
  Pause,
  Volume2,
  Settings,
  Gift,
  ShoppingCart,
  ExternalLink
} from 'lucide-react'

export default function LiveProductDemo() {
  const [isLive, setIsLive] = useState(false)
  const [viewers, setViewers] = useState(247)
  const [likes, setLikes] = useState(89)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  const liveStreams = [
    {
      id: 'live-1',
      title: 'DeWalt 20V MAX Circular Saw - Real Job Demo',
      streamer: 'Mike Thompson',
      trade: 'Carpenter',
      viewers: 342,
      duration: '45 min',
      status: 'live',
      thumbnail: '/demos/dewalt-saw-demo.jpg',
      product: {
        name: 'DeWalt DCS570B 20V MAX Circular Saw',
        price: '£189.99',
        affiliate_link: 'https://partner.screwfix.com/dewalt-dcs570b',
        commission: '8%'
      },
      description: 'Live demonstration cutting through various materials on a real construction site'
    },
    {
      id: 'live-2',
      title: 'Bosch Professional Hammer Drill Test',
      streamer: 'Sarah Wilson',
      trade: 'Electrician',
      viewers: 198,
      duration: '30 min',
      status: 'live',
      thumbnail: '/demos/bosch-drill-demo.jpg',
      product: {
        name: 'Bosch GBH 2-28 F Professional',
        price: '£245.00',
        affiliate_link: 'https://partner.toolstation.com/bosch-gbh-2-28-f',
        commission: '6%'
      },
      description: 'Testing the new Bosch hammer drill on concrete and masonry work'
    }
  ]

  const scheduledStreams = [
    {
      id: 'scheduled-1',
      title: 'Festool Domino Joiner Workshop',
      streamer: 'James Parker',
      trade: 'Joiner',
      scheduledTime: '2024-12-15 14:00',
      duration: '60 min',
      product: {
        name: 'Festool Domino DF 500 Q-Set',
        price: '£899.00'
      },
      description: 'Complete workshop on precision joinery with the Festool Domino system'
    },
    {
      id: 'scheduled-2',
      title: 'Makita Cordless Planer Review',
      streamer: 'David Brown',
      trade: 'Carpenter',
      scheduledTime: '2024-12-16 10:30',
      duration: '45 min',
      product: {
        name: 'Makita DKP180Z 18V Planer',
        price: '£156.99'
      },
      description: 'Hands-on review and demonstration of the new Makita cordless planer'
    }
  ]

  const topProducts = [
    {
      name: 'Milwaukee M18 FUEL Impact Driver',
      price: '£179.99',
      commission: '7%',
      sales: 45,
      rating: 4.8,
      category: 'Power Tools'
    },
    {
      name: 'Stanley FatMax Tape Measure',
      price: '£24.99',
      commission: '12%',
      sales: 89,
      rating: 4.6,
      category: 'Hand Tools'
    },
    {
      name: 'Irwin Blue Groove Wood Bits Set',
      price: '£34.99',
      commission: '15%',
      sales: 67,
      rating: 4.7,
      category: 'Accessories'
    }
  ]

  const addComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        user: 'You',
        text: newComment,
        timestamp: new Date().toLocaleTimeString()
      }
      setComments([...comments, comment])
      setNewComment('')
    }
  }

  const startLiveDemo = () => {
    setIsLive(true)
    // In a real app, this would start the actual live stream
  }

  const stopLiveDemo = () => {
    setIsLive(false)
    // In a real app, this would stop the live stream
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="htk-header border-b htk-border-gold">
        <div className="htk-container px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="htk-logo-container">
              <img src="/htk-logo-large.png" alt="HTK Logo" className="h-16 w-16" />
              <span className="htk-logo-text">HANDY TO KNOW</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="htk-btn-gold">
                <Video className="h-4 w-4 mr-2" />
                Start Live Demo
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="htk-container px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-htk-gold to-htk-gold-dark rounded-full p-4">
              <Video className="h-20 w-20 text-black" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-htk-gold mb-4">Live Product Demonstrations</h1>
          <p className="text-xl htk-text-professional max-w-3xl mx-auto">
            Watch real tradespeople demonstrate tools and products in action. 
            Earn commission by promoting products you believe in.
          </p>
        </div>

        {/* Live Streams */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-htk-gold">Live Now</h2>
            <Badge className="bg-red-500 text-white animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              {liveStreams.length} Live
            </Badge>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {liveStreams.map((stream) => (
              <Card key={stream.id} className="htk-card htk-hover-gold">
                <div className="relative">
                  <div className="aspect-video bg-gray-800 rounded-t-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="h-16 w-16 text-htk-gold mx-auto mb-4" />
                      <p className="text-htk-gold">Live Stream</p>
                    </div>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                    LIVE
                  </Badge>
                  <div className="absolute top-4 right-4 bg-black/70 rounded px-2 py-1 text-sm">
                    <Users className="h-4 w-4 inline mr-1" />
                    {stream.viewers}
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{stream.title}</h3>
                      <div className="flex items-center text-sm htk-text-muted mb-2">
                        <span>{stream.streamer}</span>
                        <span className="mx-2">•</span>
                        <span>{stream.trade}</span>
                        <span className="mx-2">•</span>
                        <span>{stream.duration}</span>
                      </div>
                      <p className="text-sm htk-text-professional">{stream.description}</p>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-htk-gold">Featured Product</h4>
                      <Badge className="bg-green-500 text-white">
                        {stream.product.commission} Commission
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{stream.product.name}</p>
                        <p className="text-htk-gold font-bold">{stream.product.price}</p>
                      </div>
                      <Button size="sm" className="htk-btn-gold">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Get Link
                      </Button>
                    </div>
                  </div>

                  {/* Stream Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-sm htk-text-muted hover:text-htk-gold">
                        <Heart className="h-4 w-4 mr-1" />
                        {likes}
                      </button>
                      <button className="flex items-center text-sm htk-text-muted hover:text-htk-gold">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Chat
                      </button>
                      <button className="flex items-center text-sm htk-text-muted hover:text-htk-gold">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </button>
                    </div>
                    <Button className="htk-btn-gold">
                      <Eye className="h-4 w-4 mr-2" />
                      Watch Live
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Scheduled Streams */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-htk-gold mb-8">Upcoming Demonstrations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {scheduledStreams.map((stream) => (
              <Card key={stream.id} className="htk-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{stream.title}</h3>
                      <div className="flex items-center text-sm htk-text-muted mb-2">
                        <span>{stream.streamer}</span>
                        <span className="mx-2">•</span>
                        <span>{stream.trade}</span>
                      </div>
                      <p className="text-sm htk-text-professional mb-4">{stream.description}</p>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center text-sm htk-text-muted">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(stream.scheduledTime).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm htk-text-muted">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(stream.scheduledTime).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{stream.product.name}</p>
                        <p className="text-htk-gold font-bold">{stream.product.price}</p>
                      </div>
                      <Button size="sm" variant="outline" className="htk-border-gold text-htk-gold hover:bg-htk-gold hover:text-black">
                        Set Reminder
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Top Performing Products */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-htk-gold mb-8">Top Performing Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {topProducts.map((product, index) => (
              <Card key={index} className="htk-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{product.name}</h3>
                      <p className="text-sm text-htk-gold mb-2">{product.category}</p>
                      <div className="flex items-center mb-2">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-white">{product.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm htk-text-muted">Price:</span>
                      <span className="text-htk-gold font-bold">{product.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm htk-text-muted">Commission:</span>
                      <span className="text-green-400 font-semibold">{product.commission}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm htk-text-muted">Sales this month:</span>
                      <span className="text-white">{product.sales}</span>
                    </div>
                    <Button className="w-full htk-btn-gold">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Get Affiliate Link
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Start Your Own Demo */}
        <Card className="htk-card">
          <CardHeader>
            <CardTitle className="text-htk-gold text-center">Start Your Own Product Demo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center htk-text-professional">
              Showcase products you use and love. Earn commission while helping other tradespeople 
              make informed decisions about their tools and equipment.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-htk-gold/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Video className="h-8 w-8 text-htk-gold" />
                </div>
                <h3 className="font-semibold text-white mb-2">Go Live</h3>
                <p className="text-sm htk-text-muted">Stream live demonstrations of products in real work scenarios</p>
              </div>
              <div className="text-center">
                <div className="bg-htk-gold/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-8 w-8 text-htk-gold" />
                </div>
                <h3 className="font-semibold text-white mb-2">Earn Commission</h3>
                <p className="text-sm htk-text-muted">Get paid for every sale generated through your demonstrations</p>
              </div>
              <div className="text-center">
                <div className="bg-htk-gold/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-htk-gold" />
                </div>
                <h3 className="font-semibold text-white mb-2">Build Following</h3>
                <p className="text-sm htk-text-muted">Grow your audience and establish yourself as a trusted expert</p>
              </div>
            </div>

            <div className="text-center">
              <Button className="htk-btn-gold htk-shadow-gold">
                <Video className="h-5 w-5 mr-2" />
                Start Live Demo Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

