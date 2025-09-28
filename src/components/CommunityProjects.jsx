import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart, Users, MapPin, Calendar, DollarSign, Vote, CheckCircle, Clock, Target, TrendingUp } from 'lucide-react'

export default function CommunityProjects() {
  const navigate = useNavigate()
  const [selectedProject, setSelectedProject] = useState(null)
  const [userVote, setUserVote] = useState(null)

  // Mock data for funded projects
  const fundedProjects = [
    {
      id: 1,
      title: "Manchester Youth Trade Training Center",
      location: "Manchester, UK",
      amount: "£15,000",
      status: "Completed",
      date: "March 2025",
      description: "Built a modern training facility for young people to learn essential trade skills",
      impact: "120 young people trained, 85% found employment",
      image: "/community-project-1.jpg"
    },
    {
      id: 2,
      title: "Birmingham Community Tool Library",
      location: "Birmingham, UK",
      amount: "£8,500",
      status: "In Progress",
      date: "June 2025",
      description: "Creating a community space where residents can borrow professional tools",
      impact: "Expected to serve 500+ families annually",
      image: "/community-project-2.jpg"
    },
    {
      id: 3,
      title: "Leeds Elderly Home Repair Program",
      location: "Leeds, UK",
      amount: "£12,200",
      status: "Completed",
      date: "January 2025",
      description: "Free home repairs and maintenance for elderly residents",
      impact: "45 homes repaired, 67 elderly residents helped",
      image: "/community-project-3.jpg"
    }
  ]

  // Mock data for projects up for voting
  const votingProjects = [
    {
      id: 4,
      title: "Glasgow Green Building Initiative",
      location: "Glasgow, Scotland",
      requestedAmount: "£20,000",
      votes: 1247,
      description: "Teaching sustainable building practices and installing solar panels in community centers",
      proposedBy: "Glasgow Environmental Trust",
      deadline: "2025-04-15"
    },
    {
      id: 5,
      title: "Liverpool Skills Exchange Hub",
      location: "Liverpool, UK",
      requestedAmount: "£18,500",
      votes: 892,
      description: "Creating a space where tradespeople can share knowledge and mentor newcomers",
      proposedBy: "Liverpool Trade Alliance",
      deadline: "2025-04-15"
    },
    {
      id: 6,
      title: "Cardiff Women in Trades Program",
      location: "Cardiff, Wales",
      requestedAmount: "£16,000",
      votes: 1156,
      description: "Supporting women entering traditionally male-dominated trades through training and mentorship",
      proposedBy: "Cardiff Women's Development Centre",
      deadline: "2025-04-15"
    }
  ]

  const totalFunded = fundedProjects.reduce((sum, project) => 
    sum + parseInt(project.amount.replace('£', '').replace(',', '')), 0
  )

  const handleVote = (projectId) => {
    setUserVote(projectId)
    // In real implementation, this would send vote to backend
    console.log(`Voted for project ${projectId}`)
  }

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
                  <h1 className="htk-text-luxury text-xl font-bold">Community Projects</h1>
                  <p className="text-gray-400 text-sm">Transparency & Democratic Funding</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="htk-text-luxury text-4xl md:text-6xl font-bold mb-6">
            Community Impact Dashboard
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            See exactly where your money goes. Vote on projects that matter to your community. 
            Together, we're building stronger communities through democratic funding.*
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="htk-card-luxury p-6">
              <DollarSign className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <div className="htk-stat-number">£{totalFunded.toLocaleString()}</div>
              <div className="htk-stat-label">Total Community Investment</div>
            </div>
            <div className="htk-card-luxury p-6">
              <Target className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <div className="htk-stat-number">{fundedProjects.length}</div>
              <div className="htk-stat-label">Projects Completed</div>
            </div>
            <div className="htk-card-luxury p-6">
              <Users className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <div className="htk-stat-number">2,295</div>
              <div className="htk-stat-label">Community Members Helped</div>
            </div>
          </div>
        </div>
      </section>

      {/* Funded Projects */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="htk-text-luxury text-3xl font-bold mb-8 text-center">
            Projects We've Funded
          </h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Complete transparency on where community funds have been invested and the real impact achieved.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fundedProjects.map((project) => (
              <div key={project.id} className="htk-card-luxury p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    project.status === 'Completed' 
                      ? 'bg-green-900 text-green-300' 
                      : 'bg-yellow-900 text-yellow-300'
                  }`}>
                    {project.status === 'Completed' ? <CheckCircle className="inline h-4 w-4 mr-1" /> : <Clock className="inline h-4 w-4 mr-1" />}
                    {project.status}
                  </span>
                  <span className="htk-text-luxury font-bold text-lg">{project.amount}</span>
                </div>
                
                <h3 className="htk-text-luxury text-xl font-semibold mb-3">{project.title}</h3>
                
                <div className="flex items-center text-gray-400 mb-3">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{project.location}</span>
                  <Calendar className="h-4 w-4 ml-4 mr-2" />
                  <span className="text-sm">{project.date}</span>
                </div>
                
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <div className="bg-gray-800 p-3 rounded-lg">
                  <h4 className="text-yellow-500 font-semibold mb-2">Impact Achieved:</h4>
                  <p className="text-gray-300 text-sm">{project.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voting Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="htk-text-luxury text-3xl font-bold mb-8 text-center">
            Vote on Next Projects
          </h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            HTK customers and tradespeople vote democratically on which community projects receive funding. 
            Your voice matters in building stronger communities.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {votingProjects.map((project) => (
              <div key={project.id} className="htk-card-luxury p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="htk-text-luxury font-bold text-lg">{project.requestedAmount}</span>
                  <span className="text-gray-400 text-sm">
                    <Vote className="inline h-4 w-4 mr-1" />
                    {project.votes} votes
                  </span>
                </div>
                
                <h3 className="htk-text-luxury text-xl font-semibold mb-3">{project.title}</h3>
                
                <div className="flex items-center text-gray-400 mb-3">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{project.location}</span>
                </div>
                
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <div className="bg-gray-800 p-3 rounded-lg mb-4">
                  <p className="text-gray-400 text-sm">
                    <strong>Proposed by:</strong> {project.proposedBy}
                  </p>
                  <p className="text-gray-400 text-sm">
                    <strong>Voting deadline:</strong> {new Date(project.deadline).toLocaleDateString()}
                  </p>
                </div>
                
                <button
                  onClick={() => handleVote(project.id)}
                  disabled={userVote === project.id}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                    userVote === project.id
                      ? 'bg-green-900 text-green-300 cursor-not-allowed'
                      : 'htk-btn-luxury hover:scale-105'
                  }`}
                >
                  {userVote === project.id ? (
                    <>
                      <CheckCircle className="inline h-4 w-4 mr-2" />
                      Vote Submitted
                    </>
                  ) : (
                    <>
                      <Heart className="inline h-4 w-4 mr-2" />
                      Vote for This Project
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="htk-text-luxury text-3xl font-bold mb-12 text-center">
            How Community Funding Works
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="htk-card-luxury p-6 mb-4">
                <TrendingUp className="h-12 w-12 text-yellow-500 mx-auto" />
              </div>
              <h3 className="htk-text-luxury text-lg font-semibold mb-2">Platform Profits</h3>
              <p className="text-gray-300 text-sm">
                After HTK reaches £100,000 in profits, 50% of all subsequent profits go to community projects
              </p>
            </div>
            
            <div className="text-center">
              <div className="htk-card-luxury p-6 mb-4">
                <Vote className="h-12 w-12 text-yellow-500 mx-auto" />
              </div>
              <h3 className="htk-text-luxury text-lg font-semibold mb-2">Democratic Voting</h3>
              <p className="text-gray-300 text-sm">
                All HTK customers and tradespeople vote on which projects receive funding
              </p>
            </div>
            
            <div className="text-center">
              <div className="htk-card-luxury p-6 mb-4">
                <Target className="h-12 w-12 text-yellow-500 mx-auto" />
              </div>
              <h3 className="htk-text-luxury text-lg font-semibold mb-2">Project Funding</h3>
              <p className="text-gray-300 text-sm">
                Winning projects receive full funding and professional project management
              </p>
            </div>
            
            <div className="text-center">
              <div className="htk-card-luxury p-6 mb-4">
                <CheckCircle className="h-12 w-12 text-yellow-500 mx-auto" />
              </div>
              <h3 className="htk-text-luxury text-lg font-semibold mb-2">Full Transparency</h3>
              <p className="text-gray-300 text-sm">
                Complete reporting on spending, progress, and impact achieved
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-yellow-500/20">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 mb-4">
            Community funding is managed transparently with full democratic participation from all HTK users.
          </p>
          <p className="text-gray-500 text-sm">
            * Details of community profit sharing program available in Terms of Service
          </p>
        </div>
      </footer>
    </div>
  )
}
