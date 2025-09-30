import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Briefcase, 
  Users, 
  CreditCard, 
  Star, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Calendar,
  MessageSquare,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import ProfessionalNavigation from './ProfessionalNavigation';

const ProfessionalCustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [credits, setCredits] = useState(150);
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    completedJobs: 0,
    totalSpent: 0
  });

  // Load data on component mount
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Load jobs from localStorage
    const storedJobs = JSON.parse(localStorage.getItem('htk_customer_jobs') || '[]');
    setJobs(storedJobs);

    // Calculate stats
    const totalJobs = storedJobs.length;
    const activeJobs = storedJobs.filter(job => job.status === 'active' || job.status === 'in_progress').length;
    const completedJobs = storedJobs.filter(job => job.status === 'completed').length;
    const totalSpent = storedJobs.reduce((sum, job) => sum + (job.estimatedCost || 0), 0);

    setStats({
      totalJobs,
      activeJobs,
      completedJobs,
      totalSpent
    });

    // Load sample applications
    const sampleApplications = [
      {
        id: 1,
        jobId: 1,
        tradesperson: {
          name: 'John Smith',
          trade: 'Plumber',
          rating: 4.9,
          completedJobs: 127,
          verified: true
        },
        quote: 180,
        message: 'I can complete this tap replacement today. I have 15 years experience and all necessary tools.',
        appliedDate: '2025-09-30',
        status: 'pending'
      },
      {
        id: 2,
        jobId: 1,
        tradesperson: {
          name: 'Mike Johnson',
          trade: 'Plumber',
          rating: 4.7,
          completedJobs: 89,
          verified: true
        },
        quote: 150,
        message: 'Available this week. Quick and professional service guaranteed.',
        appliedDate: '2025-09-30',
        status: 'pending'
      }
    ];
    setApplications(sampleApplications);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-blue-400';
      case 'in_progress': return 'text-orange-400';
      case 'completed': return 'text-green-400';
      case 'cancelled': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <Clock className="w-4 h-4" />;
      case 'in_progress': return <AlertCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
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

  const JobCard = ({ job }) => (
    <div className="htk-card border border-[#333] hover:border-[#B9975B] transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="htk-heading-4 mb-2">{job.title}</h3>
          <div className="flex items-center gap-2">
            {getStatusIcon(job.status)}
            <span className={`text-sm font-medium ${getStatusColor(job.status)}`}>
              {job.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-[#B9975B]">£{job.estimatedCost}</p>
          <p className="htk-body-small text-gray-400">{job.applications || 0} applications</p>
        </div>
      </div>

      <p className="htk-body text-gray-300 mb-4 line-clamp-2">{job.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
        <span>{job.location}</span>
        <span>Posted {formatDate(job.datePosted)}</span>
      </div>

      <div className="flex gap-2">
        <button className="htk-button-secondary flex-1 text-sm py-2">
          <Eye className="w-4 h-4 mr-1" />
          View
        </button>
        <button className="htk-button-secondary flex-1 text-sm py-2">
          <MessageSquare className="w-4 h-4 mr-1" />
          Messages
        </button>
        <button className="htk-button-secondary text-sm py-2 px-3">
          <Edit className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const ApplicationCard = ({ application }) => (
    <div className="htk-card border border-[#333]">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#B9975B] rounded-full flex items-center justify-center text-black font-bold">
            {application.tradesperson.name.charAt(0)}
          </div>
          <div>
            <h4 className="htk-heading-4 mb-1">{application.tradesperson.name}</h4>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#B9975B]">{application.tradesperson.trade}</span>
              {application.tradesperson.verified && (
                <span className="htk-status-badge htk-status-verified">Verified</span>
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-[#B9975B]">£{application.quote}</p>
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            {application.tradesperson.rating} ({application.tradesperson.completedJobs} jobs)
          </div>
        </div>
      </div>

      <p className="htk-body text-gray-300 mb-4">{application.message}</p>

      <div className="flex gap-2">
        <button className="htk-button-primary flex-1">Accept Quote</button>
        <button className="htk-button-secondary flex-1">View Profile</button>
        <button className="htk-button-secondary">
          <MessageSquare className="w-4 h-4" />
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
              <h1 className="htk-heading-1 mb-2">Customer Dashboard</h1>
              <p className="htk-body-large text-gray-300">
                Manage your jobs, track applications, and connect with tradespeople.
              </p>
            </div>
            <div className="flex gap-3 mt-4 lg:mt-0">
              <button 
                onClick={() => window.location.href = '/post-job'}
                className="htk-button-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Post New Job
              </button>
              <button className="htk-button-secondary flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Buy Credits
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={Briefcase}
              title="Total Jobs"
              value={stats.totalJobs}
              subtitle="All time"
            />
            <StatCard
              icon={Clock}
              title="Active Jobs"
              value={stats.activeJobs}
              subtitle="Currently open"
              color="text-blue-400"
            />
            <StatCard
              icon={CheckCircle}
              title="Completed"
              value={stats.completedJobs}
              subtitle="Successfully finished"
              color="text-green-400"
            />
            <StatCard
              icon={CreditCard}
              title="Credits"
              value={credits}
              subtitle="Available balance"
            />
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-1 mb-8 bg-[#111] p-1 rounded-lg">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'jobs', label: 'My Jobs', icon: Briefcase },
              { id: 'applications', label: 'Applications', icon: Users },
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
              {/* Recent Activity */}
              <div>
                <h2 className="htk-heading-3 mb-6">Recent Activity</h2>
                <div className="htk-card">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-[#222] rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="htk-body">Kitchen tap replacement completed</p>
                        <p className="htk-body-small text-gray-400">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[#222] rounded-lg">
                      <Users className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="htk-body">New application received for bathroom renovation</p>
                        <p className="htk-body-small text-gray-400">5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[#222] rounded-lg">
                      <Plus className="w-5 h-5 text-[#B9975B]" />
                      <div>
                        <p className="htk-body">Posted new job: Garden decking installation</p>
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
                    onClick={() => window.location.href = '/post-job'}
                    className="htk-card text-left hover:border-[#B9975B] border border-transparent transition-colors"
                  >
                    <Plus className="w-8 h-8 text-[#B9975B] mb-3" />
                    <h3 className="htk-heading-4 mb-2">Post a Job</h3>
                    <p className="htk-body-small text-gray-400">
                      Find qualified tradespeople for your next project
                    </p>
                  </button>
                  
                  <button className="htk-card text-left hover:border-[#B9975B] border border-transparent transition-colors">
                    <CreditCard className="w-8 h-8 text-[#B9975B] mb-3" />
                    <h3 className="htk-heading-4 mb-2">Buy Credits</h3>
                    <p className="htk-body-small text-gray-400">
                      Top up your account to post more jobs
                    </p>
                  </button>
                  
                  <button className="htk-card text-left hover:border-[#B9975B] border border-transparent transition-colors">
                    <MessageSquare className="w-8 h-8 text-[#B9975B] mb-3" />
                    <h3 className="htk-heading-4 mb-2">Messages</h3>
                    <p className="htk-body-small text-gray-400">
                      Communicate with tradespeople
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'jobs' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="htk-heading-3">My Jobs</h2>
                <button 
                  onClick={() => window.location.href = '/post-job'}
                  className="htk-button-primary flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Post New Job
                </button>
              </div>
              
              {jobs.length > 0 ? (
                <div className="grid lg:grid-cols-2 gap-6">
                  {jobs.map(job => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="htk-card max-w-md mx-auto">
                    <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="htk-heading-3 mb-2">No Jobs Posted Yet</h3>
                    <p className="htk-body text-gray-400 mb-4">
                      Start by posting your first job to connect with qualified tradespeople.
                    </p>
                    <button 
                      onClick={() => window.location.href = '/post-job'}
                      className="htk-button-primary"
                    >
                      Post Your First Job
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'applications' && (
            <div>
              <h2 className="htk-heading-3 mb-6">Job Applications</h2>
              
              {applications.length > 0 ? (
                <div className="space-y-6">
                  {applications.map(application => (
                    <ApplicationCard key={application.id} application={application} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="htk-card max-w-md mx-auto">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="htk-heading-3 mb-2">No Applications Yet</h3>
                    <p className="htk-body text-gray-400 mb-4">
                      Once you post jobs, qualified tradespeople will apply here.
                    </p>
                    <button 
                      onClick={() => window.location.href = '/post-job'}
                      className="htk-button-primary"
                    >
                      Post a Job
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
                  Direct messaging with tradespeople will appear here.
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

export default ProfessionalCustomerDashboard;
