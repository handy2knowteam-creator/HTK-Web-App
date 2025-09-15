import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Gift, Users, Clock, Trophy, Ticket, Heart, Building, Hammer } from 'lucide-react'

export default function CommunityProjectsLottery() {
  const [userCredits, setUserCredits] = useState(125)
  const [userTickets, setUserTickets] = useState([])
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 27,
    seconds: 45
  })

  const currentLotteries = [
    {
      id: 'community-center',
      title: 'Community Center Renovation',
      description: 'Help renovate the local community center kitchen and meeting rooms',
      location: 'Manchester, UK',
      value: '£15,000',
      ticketPrice: 10,
      totalTickets: 500,
      soldTickets: 347,
      endDate: '2024-12-20',
      category: 'Public Building',
      trades: ['Plumber', 'Electrician', 'Carpenter', 'Painter'],
      winner: null,
      status: 'active',
      image: '/community-center.jpg',
      organizer: 'Manchester City Council',
      benefits: [
        'Featured on HTK homepage for 1 month',
        'Premium profile badge',
        'Local media coverage',
        'Community recognition certificate'
      ]
    },
    {
      id: 'school-playground',
      title: 'Primary School Playground',
      description: 'Build safe playground equipment and outdoor learning spaces',
      location: 'Birmingham, UK',
      value: '£8,500',
      ticketPrice: 5,
      totalTickets: 300,
      soldTickets: 189,
      endDate: '2024-12-25',
      category: 'Education',
      trades: ['Landscaper', 'Carpenter', 'Safety Inspector'],
      winner: null,
      status: 'active',
      image: '/school-playground.jpg',
      organizer: 'Greenfield Primary School',
      benefits: [
        'School newsletter feature',
        'Parent testimonials',
        'Educational sector networking',
        'Future school project priority'
      ]
    },
    {
      id: 'elderly-home',
      title: 'Elderly Care Home Garden',
      description: 'Create accessible garden spaces and outdoor seating areas',
      location: 'Leeds, UK',
      value: '£6,200',
      ticketPrice: 8,
      totalTickets: 200,
      soldTickets: 156,
      endDate: '2024-12-30',
      category: 'Healthcare',
      trades: ['Landscaper', 'Carpenter', 'Accessibility Specialist'],
      winner: null,
      status: 'active',
      image: '/elderly-garden.jpg',
      organizer: 'Sunshine Care Home',
      benefits: [
        'Healthcare sector recognition',
        'Resident testimonials',
        'Care home network referrals',
        'Compassionate tradesperson badge'
      ]
    }
  ]

  const recentWinners = [
    {
      name: 'David Wilson',
      trade: 'Electrician',
      project: 'Youth Center Lighting',
      location: 'Liverpool',
      value: '£4,500',
      date: '2024-11-15'
    },
    {
      name: 'Sarah Mitchell',
      trade: 'Plumber',
      project: 'Community Kitchen',
      location: 'Glasgow',
      value: '£3,200',
      date: '2024-11-10'
    },
    {
      name: 'James Thompson',
      trade: 'Carpenter',
      project: 'Library Renovation',
      location: 'Cardiff',
      value: '£5,800',
      date: '2024-11-05'
    }
  ]

  const buyTickets = async (lotteryId, quantity) => {
    const lottery = currentLotteries.find(l => l.id === lotteryId)
    const totalCost = lottery.ticketPrice * quantity

    if (userCredits < totalCost) {
      alert('Insufficient credits. Please purchase more credits.')
      return
    }

    try {
      const response = await fetch('https://0vhlizcgy3ye.manus.space/api/lottery/buy-tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          lottery_id: lotteryId,
          quantity: quantity,
          total_cost: totalCost
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setUserCredits(prev => prev - totalCost)
        setUserTickets(prev => [...prev, ...result.tickets])
        alert(`Successfully purchased ${quantity} ticket(s)!`)
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error('Ticket purchase error:', error)
      alert('Failed to purchase tickets. Please try again.')
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Public Building': return <Building className="h-5 w-5" />
      case 'Education': return <Users className="h-5 w-5" />
      case 'Healthcare': return <Heart className="h-5 w-5" />
      default: return <Hammer className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Public Building': return 'bg-blue-500'
      case 'Education': return 'bg-green-500'
      case 'Healthcare': return 'bg-red-500'
      default: return 'bg-htk-gold'
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="htk-header border-b htk-border-gold">
        <div className="htk-container px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="htk-logo-container">
              <img src="/htk-logo.png" alt="HTK Logo" className="h-10 w-10" />
              <span className="htk-logo-text">HANDY TO KNOW</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-htk-gold/20 border border-htk-gold/30 rounded-lg px-4 py-2">
                <span className="text-htk-gold font-semibold">{userCredits} Credits</span>
              </div>
              <Button className="htk-btn-gold">Buy Credits</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="htk-container px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-htk-gold to-htk-gold-dark rounded-full p-4">
              <Gift className="h-12 w-12 text-black" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-htk-gold mb-4">Community Projects Lottery</h1>
          <p className="text-xl htk-text-professional max-w-3xl mx-auto">
            Win amazing community projects while giving back to your local area. 
            Every ticket supports meaningful work that makes a difference.
          </p>
        </div>

        {/* Current Lotteries */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-htk-gold mb-8">Active Community Lotteries</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {currentLotteries.map((lottery) => (
              <Card key={lottery.id} className="htk-card htk-hover-gold">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={`${getCategoryColor(lottery.category)} text-white`}>
                      <div className="flex items-center">
                        {getCategoryIcon(lottery.category)}
                        <span className="ml-1">{lottery.category}</span>
                      </div>
                    </Badge>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-htk-gold">{lottery.value}</div>
                      <div className="text-sm htk-text-muted">Project Value</div>
                    </div>
                  </div>
                  <CardTitle className="text-white text-lg">{lottery.title}</CardTitle>
                  <p className="htk-text-professional text-sm">{lottery.description}</p>
                  <div className="flex items-center text-sm htk-text-muted mt-2">
                    <span>📍 {lottery.location}</span>
                    <span className="mx-2">•</span>
                    <span>by {lottery.organizer}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="htk-text-professional">Tickets Sold</span>
                      <span className="text-htk-gold">{lottery.soldTickets}/{lottery.totalTickets}</span>
                    </div>
                    <Progress 
                      value={(lottery.soldTickets / lottery.totalTickets) * 100} 
                      className="h-2 bg-gray-700"
                    />
                  </div>

                  {/* Trades Needed */}
                  <div>
                    <div className="text-sm htk-text-professional mb-2">Trades Needed:</div>
                    <div className="flex flex-wrap gap-1">
                      {lottery.trades.map((trade) => (
                        <Badge key={trade} variant="outline" className="text-xs border-htk-gold/30 text-htk-gold-light">
                          {trade}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <div className="text-sm htk-text-professional mb-2">Winner Benefits:</div>
                    <ul className="text-xs htk-text-muted space-y-1">
                      {lottery.benefits.slice(0, 2).map((benefit, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1 h-1 bg-htk-gold rounded-full mr-2"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ticket Purchase */}
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm htk-text-professional">Ticket Price:</span>
                      <span className="text-htk-gold font-semibold">{lottery.ticketPrice} Credits</span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => buyTickets(lottery.id, 1)}
                        className="flex-1 htk-btn-gold text-sm"
                      >
                        <Ticket className="h-4 w-4 mr-1" />
                        Buy 1 Ticket
                      </Button>
                      <Button 
                        onClick={() => buyTickets(lottery.id, 5)}
                        variant="outline"
                        className="htk-border-gold text-htk-gold hover:bg-htk-gold hover:text-black text-sm"
                      >
                        Buy 5
                      </Button>
                    </div>
                  </div>

                  {/* Countdown */}
                  <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center text-sm htk-text-muted mb-1">
                      <Clock className="h-4 w-4 mr-1" />
                      Draw in:
                    </div>
                    <div className="text-htk-gold font-mono">
                      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Winners */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-htk-gold mb-8">Recent Community Heroes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recentWinners.map((winner, index) => (
              <Card key={index} className="htk-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-br from-htk-gold to-htk-gold-dark rounded-full p-3 mr-4">
                      <Trophy className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{winner.name}</div>
                      <div className="text-sm text-htk-gold">{winner.trade}</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="htk-text-professional">
                      <strong>Project:</strong> {winner.project}
                    </div>
                    <div className="htk-text-professional">
                      <strong>Location:</strong> {winner.location}
                    </div>
                    <div className="htk-text-professional">
                      <strong>Value:</strong> <span className="text-htk-gold">{winner.value}</span>
                    </div>
                    <div className="htk-text-muted text-xs">
                      Won on {winner.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="htk-card p-8">
          <h2 className="text-2xl font-bold text-htk-gold mb-6 text-center">How Community Lottery Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-htk-gold/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-htk-gold font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Choose Project</h3>
              <p className="text-sm htk-text-muted">Select a community project that matches your trade skills</p>
            </div>
            <div className="text-center">
              <div className="bg-htk-gold/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-htk-gold font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Buy Tickets</h3>
              <p className="text-sm htk-text-muted">Purchase lottery tickets using your HTK credits</p>
            </div>
            <div className="text-center">
              <div className="bg-htk-gold/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-htk-gold font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Wait for Draw</h3>
              <p className="text-sm htk-text-muted">Winners are drawn randomly when lottery closes</p>
            </div>
            <div className="text-center">
              <div className="bg-htk-gold/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-htk-gold font-bold text-xl">4</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Win & Give Back</h3>
              <p className="text-sm htk-text-muted">Complete the project and gain community recognition</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

