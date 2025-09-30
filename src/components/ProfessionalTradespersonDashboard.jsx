import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Briefcase, 
  TrendingUp, 
  Calendar, 
  Star, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  DollarSign,
  Users,
  MessageSquare,
  Settings,
  Award,
  Target,
  BarChart3,
  Eye,
  Send
} from 'lucide-react';
import ProfessionalNavigation from './ProfessionalNavigation';

const ProfessionalTradespersonDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [availableJobs, setAvailableJobs] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [activeJobs, setActiveJobs] = useState([]);
  const [stats, setStats] = useState({
    totalEarnings: 0,
    jobsCompleted: 0,
    averageRating: 0,
    responseRate: 0
  });

  // Load data on component mount
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Sample available jobs
    const sampleJobs = [
      {
        id: 1,
        title: 'Kitchen Tap Replacement',
        category: 'Plumbing',
        description: 'Need to replace a leaking kitchen tap. Simple job, tap already purchased.',
        location: 'Manchester, M1',
        budget: '200',
        urgency: 'standard',
        customer: { name: 'Sarah Johnson', rating: 4.8 },
        postedDate: '2025-09-30',
        applications: 3
      },
      {
        id: 2,
        title: 'Emergency Electrical Fault',
        category: 'Electrical',
        description: 'Power outage in half the house. Need qualified electrician urgently.',
        location: 'London, SW1',
        budget: '500',
        urgency: 'emergency',
        customer: { name: 'Emma Wilson', rating: 4.7 },
        postedDate: '2025-09-30',
        applications: 1
      },
      {
        id: 3,
        title: 'Bathroom Renovation',
        category: 'Plumbing',
        description: 'Complete bathroom renovation including new suite installation.',
        location: 'Birmingham, B2',
        budget: '5000',
        urgency: 'standard',
        customer: { name: 'David Smith', rating: 4.9 },
        postedDate: '2025-09-28',
        applications: 7
      }
    ];
    setAvailableJobs(sampleJobs);

    // Sample applications
    const sampleApplications = [
      {
        id: 1,
        jobId: 1,
        jobTitle: 'Kitchen Tap Replacement',
        customer: 'Sarah Johnson',
        quote: 180,
        status: 'pending',
        appliedDate: '2025-09-30',
        message: 'I can complete this today with 15 years experience.'
      },
      {
        id: 2,
        jobId: 4,
        jobTitle: 'Garden Decking Installation',
        customer: 'Michael Brown',
        quote: 2200,
        status: 'accepted',
        appliedDate: '2025-09-29',
        message: 'Professional decking installation with 5-year warranty.'
      }
    ];
    setMyApplications(sampleApplications);

    // Sample active jobs
    const sampleActiveJobs = [
      {
        id: 1,
        title: 'Garden Decking Installation',
        customer: 'Michael Brown',
        value: 2200,
        status: 'in_progress',
        startDate: '2025-09-29',
        deadline: '2025-10-05',
        progress: 60
      }
    ];
    setActiveJobs(sampleActiveJobs);

    // Sample stats
    setStats({
      totalEarnings: 12450,
      jobsCompleted: 47,
      averageRating: 4.8,
      responseRate: 95
    });
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'emergency': return 'text-red-400';
      case 'urgent': return 'text-orange-400';
      default: return 'text-blue-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-400';
      case 'accepted': return 'text-green-400';
      case 'rejected': return 'text-red-400';
      case 'in_progress': return 'text-blue-400';
      case 'completed': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'text-[#B9975B]' }) => (
    <div className="htk-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="htk-body-small text-gray-400 mb-1">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          {subtitle && <p className="htk-body-small text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
    </div>
  );

  const JobCard = ({ job, showApplyButton = false }) => (
    <div className="htk-card border border-[#333] hover:border-[#B9975B] transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="htk-heading-4 mb-2">{job.title}</h3>
          <div className="flex items-center gap-2 text-sm">
            <span className="htk-status-badge htk-status-verified">{job.category}</span>
            <span className={`font-medium ${getUrgencyColor(job.urgency)}`}>
              {job.urgency?.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-[#B9975B]">£{job.budget}</p>
          <p className="htk-body-small text-gray-400">{job.applications} applications</p>
        </div>
      </div>

      <p className="htk-body text-gray-300 mb-4 line-clamp-2">{job.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
        <span>{job.location}</span>
        <span>Posted {formatDate(job.postedDate)}</span>
      </div>

      <div className="flex items-center gap-2 mb-4 p-3 bg-[#222] rounded-lg">
        <Star className="w-4 h-4 text-yellow-400 fill-current" />
        <span className="text-sm text-gray-300">
          {job.customer.name} • {job.customer.rating} rating
        </span>
      </div>

      <div className="flex gap-2">
        <button className="htk-button-secondary flex-1 text-sm py-2">
          <Eye className="w-4 h-4 mr-1" />
          View Details
        </button>
        {showApplyButton && (
          <button className="htk-button-primary flex-1 text-sm py-2">
            <Send className="w-4 h-4 mr-1" />
            Apply Now
          </button>
        )}
      </div>
    </div>
  );

  const ApplicationCard = ({ application }) => (
    <div className="htk-card border border-[#333]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="htk-heading-4 mb-2">{application.jobTitle}</h3>
          <p className="htk-body text-gray-400">Customer: {application.customer}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-[#B9975B]">£{application.quote}</p>
          <span className={`text-sm font-medium ${getStatusColor(application.status)}`}>
            {application.status.toUpperCase()}
          </span>
        </div>
      </div>

      <p className="htk-body text-gray-300 mb-4">{application.message}</p>

      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>Applied {formatDate(application.appliedDate)}</span>
        <button className="htk-button-secondary text-sm py-1 px-3">
          <MessageSquare className="w-4 h-4 mr-1" />
          Message
        </button>
      </div>
    </div>
  );

  const ActiveJobCard = ({ job }) => (
    <div className="htk-card border border-[#333]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="htk-heading-4 mb-2">{job.title}</h3>
          <p className="htk-body text-gray-400">Customer: {job.customer}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-[#B9975B]">£{job.value}</p>
          <span className={`text-sm font-medium ${getStatusColor(job.status)}`}>
            {job.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Progress</span>
          <span>{job.progress}%</span>
        </div>
        <div className="w-full bg-[#222] rounded-full h-2">
          <div 
            className="bg-[#B9975B] h-2 rounded-full transition-all"
            style={{ width: `${job.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
        <span>Started: {formatDate(job.startDate)}</span>
        <span>Deadline: {formatDate(job.deadline)}</span>
      </div>

      <div className="flex gap-2">
        <button className="htk-button-secondary flex-1 text-sm py-2">
          Update Progress
        </button>
        <button className="htk-button-primary flex-1 text-sm py-2">
          <MessageSquare className="w-4 h-4 mr-1" />
          Contact Customer
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <ProfessionalNavigation />
      
      <div className="htk-container htk-section">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="htk-heading-1 mb-2">Tradesperson Dashboard</h1>
              <p className="htk-body-large text-gray-300">
                Manage your business, find new opportunities, and track your success.
              </p>
            </div>
            <div className="flex gap-3 mt-4 lg:mt-0">
              <button 
                onClick={() => window.location.href = '/jobs'}
                className="htk-button-primary flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Find Jobs
              </button>
              <button className="htk-button-secondary flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={DollarSign}
              title="Total Earnings"
              value={`£${stats.totalEarnings.toLocaleString()}`}
              subtitle="This year"
            />
            <StatCard
              icon={CheckCircle}
              title="Jobs Completed"
              value={stats.jobsCompleted}
              subtitle="All time"
              color="text-green-400"
            />
            <StatCard
              icon={Star}
              title="Average Rating"
              value={stats.averageRating}
              subtitle="From customers"
              color="text-yellow-400"
            />
            <StatCard
              icon={Target}
              title="Response Rate"
              value={`${stats.responseRate}%`}
              subtitle="Last 30 days"
              color="text-blue-400"
            />
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-1 mb-8 bg-[#111] p-1 rounded-lg">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'available', label: 'Available Jobs', icon: Search },
              { id: 'applications', label: 'My Applications', icon: Send },
              { id: 'active', label: 'Active Jobs', icon: Briefcase },
              { id: 'messages', label: 'Messages', icon: MessageSquare }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#B9975B] text-black font-medium'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Performance Chart */}
              <div>
                <h2 className="htk-heading-3 mb-6">Performance Overview</h2>
                <div className="htk-card">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">£2,450</div>
                      <p className="htk-body-small text-gray-400">This Month</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">8</div>
                      <p className="htk-body-small text-gray-400">Jobs This Month</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#B9975B] mb-2">4.8</div>
                      <p className="htk-body-small text-gray-400">Average Rating</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h2 className="htk-heading-3 mb-6">Recent Activity</h2>
                <div className="htk-card">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-[#222] rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="htk-body">Completed kitchen tap replacement</p>
                        <p className="htk-body-small text-gray-400">2 hours ago • £180 earned</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[#222] rounded-lg">
                      <Send className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="htk-body">Applied for bathroom renovation job</p>
                        <p className="htk-body-small text-gray-400">5 hours ago • £5,000 potential</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[#222] rounded-lg">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <div>
                        <p className="htk-body">Received 5-star review from Sarah Johnson</p>
                        <p className="htk-body-small text-gray-400">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="htk-heading-3 mb-6">Quick Actions</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <button 
                    onClick={() => setActiveTab('available')}
                    className="htk-card text-left hover:border-[#B9975B] border border-transparent transition-colors"
                  >
                    <Search className="w-8 h-8 text-[#B9975B] mb-3" />
                    <h3 className="htk-heading-4 mb-2">Find Jobs</h3>
                    <p className="htk-body-small text-gray-400">
                      Browse available jobs in your area
                    </p>
                  </button>
                  
                  <button className="htk-card text-left hover:border-[#B9975B] border border-transparent transition-colors">
                    <Award className="w-8 h-8 text-[#B9975B] mb-3" />
                    <h3 className="htk-heading-4 mb-2">Update Profile</h3>
                    <p className="htk-body-small text-gray-400">
                      Keep your skills and portfolio current
                    </p>
                  </button>
                  
                  <button className="htk-card text-left hover:border-[#B9975B] border border-transparent transition-colors">
                    <MessageSquare className="w-8 h-8 text-[#B9975B] mb-3" />
                    <h3 className="htk-heading-4 mb-2">Messages</h3>
                    <p className="htk-body-small text-gray-400">
                      Communicate with customers
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'available' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="htk-heading-3">Available Jobs</h2>
                <button 
                  onClick={() => window.location.href = '/jobs'}
                  className="htk-button-primary flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Browse All Jobs
                </button>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6">
                {availableJobs.map(job => (
                  <JobCard key={job.id} job={job} showApplyButton={true} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div>
              <h2 className="htk-heading-3 mb-6">My Applications</h2>
              
              {myApplications.length > 0 ? (
                <div className="space-y-6">
                  {myApplications.map(application => (
                    <ApplicationCard key={application.id} application={application} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="htk-card max-w-md mx-auto">
                    <Send className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="htk-heading-3 mb-2">No Applications Yet</h3>
                    <p className="htk-body text-gray-400 mb-4">
                      Start applying for jobs to build your business.
                    </p>
                    <button 
                      onClick={() => setActiveTab('available')}
                      className="htk-button-primary"
                    >
                      Find Jobs
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'active' && (
            <div>
              <h2 className="htk-heading-3 mb-6">Active Jobs</h2>
              
              {activeJobs.length > 0 ? (
                <div className="space-y-6">
                  {activeJobs.map(job => (
                    <ActiveJobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="htk-card max-w-md mx-auto">
                    <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="htk-heading-3 mb-2">No Active Jobs</h3>
                    <p className="htk-body text-gray-400 mb-4">
                      Apply for jobs to start earning and building your reputation.
                    </p>
                    <button 
                      onClick={() => setActiveTab('available')}
                      className="htk-button-primary"
                    >
                      Find Jobs
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="text-center py-12">
              <div className="htk-card max-w-md mx-auto">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="htk-heading-3 mb-2">Messages</h3>
                <p className="htk-body text-gray-400 mb-4">
                  Direct messaging with customers will appear here.
                </p>
                <button className="htk-button-primary">
                  Coming Soon
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTradespersonDashboard;
