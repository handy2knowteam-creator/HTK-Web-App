import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Calendar, Pound, Clock, User, Star, ChevronRight } from 'lucide-react';
import ProfessionalNavigation from './ProfessionalNavigation';

const ProfessionalJobBrowsing = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const categories = [
    'Plumbing',
    'Electrical',
    'Carpentry',
    'Painting & Decorating',
    'Roofing',
    'Landscaping',
    'Cleaning',
    'General Handyman',
    'Tiling',
    'Plastering',
    'Glazing',
    'Locksmith',
    'HVAC',
    'Flooring'
  ];

  const budgetRanges = [
    { value: '100', label: 'Under £100' },
    { value: '200', label: '£100 - £200' },
    { value: '500', label: '£200 - £500' },
    { value: '1000', label: '£500 - £1,000' },
    { value: '2500', label: '£1,000 - £2,500' },
    { value: '5000', label: '£2,500 - £5,000' },
    { value: '10000', label: '£5,000 - £10,000' },
    { value: '15000', label: '£10,000+' }
  ];

  const urgencyLevels = [
    { value: 'standard', label: 'Standard', color: 'text-blue-400' },
    { value: 'urgent', label: 'Urgent', color: 'text-orange-400' },
    { value: 'emergency', label: 'Emergency', color: 'text-red-400' }
  ];

  // Sample jobs data
  useEffect(() => {
    const sampleJobs = [
      {
        id: 1,
        title: 'Kitchen Tap Replacement',
        category: 'Plumbing',
        description: 'Need to replace a leaking kitchen tap. Simple job, tap already purchased. Just need installation.',
        location: 'Manchester, M1',
        budget: '200',
        urgency: 'standard',
        timeline: 'This week',
        datePosted: '2025-09-29',
        customer: { name: 'Sarah Johnson', rating: 4.8, jobs: 12 },
        applications: 3
      },
      {
        id: 2,
        title: 'Bathroom Renovation',
        category: 'Plumbing',
        description: 'Complete bathroom renovation including new suite installation, tiling, and plumbing work. Looking for experienced professional.',
        location: 'Birmingham, B2',
        budget: '5000',
        urgency: 'standard',
        timeline: 'Next month',
        datePosted: '2025-09-28',
        customer: { name: 'David Smith', rating: 4.9, jobs: 8 },
        applications: 7
      },
      {
        id: 3,
        title: 'Emergency Electrical Fault',
        category: 'Electrical',
        description: 'Power outage in half the house. Need qualified electrician urgently to diagnose and fix the issue.',
        location: 'London, SW1',
        budget: '500',
        urgency: 'emergency',
        timeline: 'ASAP',
        datePosted: '2025-09-30',
        customer: { name: 'Emma Wilson', rating: 4.7, jobs: 5 },
        applications: 1
      },
      {
        id: 4,
        title: 'Garden Decking Installation',
        category: 'Carpentry',
        description: 'Install new composite decking in back garden. Area is 4m x 3m. Materials to be provided by contractor.',
        location: 'Leeds, LS1',
        budget: '2500',
        urgency: 'standard',
        timeline: 'Within 2 weeks',
        datePosted: '2025-09-27',
        customer: { name: 'Michael Brown', rating: 4.6, jobs: 15 },
        applications: 5
      },
      {
        id: 5,
        title: 'Roof Leak Repair',
        category: 'Roofing',
        description: 'Small leak in roof during recent storms. Need professional assessment and repair. Access available.',
        location: 'Liverpool, L1',
        budget: '1000',
        urgency: 'urgent',
        timeline: 'This week',
        datePosted: '2025-09-29',
        customer: { name: 'Lisa Davis', rating: 4.9, jobs: 3 },
        applications: 2
      }
    ];

    // Load jobs from localStorage and merge with sample data
    const storedJobs = JSON.parse(localStorage.getItem('htk_jobs') || '[]');
    const allJobs = [...sampleJobs, ...storedJobs];
    setJobs(allJobs);
    setFilteredJobs(allJobs);
  }, []);

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }

    if (selectedBudget) {
      filtered = filtered.filter(job => job.budget === selectedBudget);
    }

    if (selectedUrgency) {
      filtered = filtered.filter(job => job.urgency === selectedUrgency);
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, selectedCategory, selectedBudget, selectedUrgency]);

  const getUrgencyStyle = (urgency) => {
    const level = urgencyLevels.find(l => l.value === urgency);
    return level ? level.color : 'text-gray-400';
  };

  const getBudgetLabel = (budget) => {
    const range = budgetRanges.find(r => r.value === budget);
    return range ? range.label : `£${budget}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const handleApplyToJob = (jobId) => {
    // Simulate application
    alert('Application submitted! The customer will be notified and you\'ll receive a response within 24 hours.');
    
    // Update applications count
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, applications: (job.applications || 0) + 1 }
        : job
    ));
  };

  return (
    <div className="min-h-screen bg-black">
      <ProfessionalNavigation />
      
      <div className="htk-container htk-section">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="htk-heading-1">Find Work</h1>
            <p className="htk-body-large text-gray-300">
              Browse quality jobs from verified customers. Professional opportunities, fair pricing.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search jobs by title, description, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="htk-input pl-10"
                />
              </div>
              
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="htk-button-secondary flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="grid md:grid-cols-3 gap-4 p-4 bg-[#111] rounded-lg">
                <div>
                  <label className="htk-label">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="htk-select"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="htk-label">Budget Range</label>
                  <select
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="htk-select"
                  >
                    <option value="">All Budgets</option>
                    {budgetRanges.map(range => (
                      <option key={range.value} value={range.value}>{range.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="htk-label">Urgency</label>
                  <select
                    value={selectedUrgency}
                    onChange={(e) => setSelectedUrgency(e.target.value)}
                    className="htk-select"
                  >
                    <option value="">All Urgency Levels</option>
                    {urgencyLevels.map(level => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="mb-6">
            <p className="htk-body text-gray-400">
              Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>

          {/* Jobs Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredJobs.map(job => (
              <div key={job.id} className="htk-card hover:border-[#B9975B] border border-transparent transition-all">
                {/* Job Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="htk-heading-4 mb-2">{job.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="htk-status-badge htk-status-verified">
                        {job.category}
                      </span>
                      <span className={`font-medium ${getUrgencyStyle(job.urgency)}`}>
                        {urgencyLevels.find(l => l.value === job.urgency)?.label}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#B9975B]">
                      {getBudgetLabel(job.budget)}
                    </div>
                    <div className="text-sm text-gray-400">
                      {job.applications || 0} applications
                    </div>
                  </div>
                </div>

                {/* Job Description */}
                <p className="htk-body text-gray-300 mb-4 line-clamp-3">
                  {job.description}
                </p>

                {/* Job Details */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {job.timeline}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    Posted {formatDate(job.datePosted)}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <User className="w-4 h-4" />
                    {job.customer?.name || 'Customer'}
                  </div>
                </div>

                {/* Customer Rating */}
                {job.customer && (
                  <div className="flex items-center gap-2 mb-4 p-3 bg-[#222] rounded-lg">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-300">
                      {job.customer.rating} rating • {job.customer.jobs} jobs posted
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="htk-button-secondary flex-1"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleApplyToJob(job.id)}
                    className="htk-button-primary flex-1"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="htk-card max-w-md mx-auto">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="htk-heading-3 mb-2">No Jobs Found</h3>
                <p className="htk-body text-gray-400 mb-4">
                  Try adjusting your search criteria or check back later for new opportunities.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('');
                    setSelectedBudget('');
                    setSelectedUrgency('');
                  }}
                  className="htk-button-primary"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="htk-heading-2">{selectedJob.title}</h2>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="htk-heading-4 mb-2">Job Description</h3>
                  <p className="htk-body text-gray-300">{selectedJob.description}</p>
                </div>

                <div>
                  <h3 className="htk-heading-4 mb-2">Requirements</h3>
                  <p className="htk-body text-gray-300">
                    {selectedJob.requirements || 'No specific requirements listed.'}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="htk-label mb-2">Budget</h4>
                    <p className="text-[#B9975B] font-bold text-lg">
                      {getBudgetLabel(selectedJob.budget)}
                    </p>
                  </div>
                  <div>
                    <h4 className="htk-label mb-2">Timeline</h4>
                    <p className="htk-body">{selectedJob.timeline}</p>
                  </div>
                  <div>
                    <h4 className="htk-label mb-2">Location</h4>
                    <p className="htk-body">{selectedJob.location}</p>
                  </div>
                  <div>
                    <h4 className="htk-label mb-2">Urgency</h4>
                    <p className={`font-medium ${getUrgencyStyle(selectedJob.urgency)}`}>
                      {urgencyLevels.find(l => l.value === selectedJob.urgency)?.label}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="htk-button-secondary flex-1"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleApplyToJob(selectedJob.id);
                      setSelectedJob(null);
                    }}
                    className="htk-button-primary flex-1"
                  >
                    Apply for This Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalJobBrowsing;
