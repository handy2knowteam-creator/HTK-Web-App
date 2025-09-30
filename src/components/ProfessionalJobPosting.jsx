import React, { useState } from 'react';
import { MapPin, Calendar, Pound, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import ProfessionalNavigation from './ProfessionalNavigation';

const ProfessionalJobPosting = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    budget: '',
    urgency: 'standard',
    timeline: '',
    requirements: '',
    contactMethod: 'platform'
  });

  const [estimatedCost, setEstimatedCost] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const urgencyLevels = [
    { value: 'standard', label: 'Standard (1-2 weeks)', multiplier: 1 },
    { value: 'urgent', label: 'Urgent (Within 1 week)', multiplier: 1.5 },
    { value: 'emergency', label: 'Emergency (24-48 hours)', multiplier: 2 }
  ];

  const calculateEstimatedCost = (budget, urgency) => {
    if (!budget) return 0;
    
    const budgetNum = parseInt(budget);
    let baseCost = 3; // Minimum cost
    
    if (budgetNum <= 200) baseCost = 3;
    else if (budgetNum <= 500) baseCost = 8;
    else if (budgetNum <= 1000) baseCost = 15;
    else if (budgetNum <= 2500) baseCost = 25;
    else if (budgetNum <= 5000) baseCost = 45;
    else if (budgetNum <= 10000) baseCost = 70;
    else baseCost = 100;

    const urgencyMultiplier = urgencyLevels.find(level => level.value === urgency)?.multiplier || 1;
    return Math.round(baseCost * urgencyMultiplier);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'budget' || name === 'urgency') {
      const newBudget = name === 'budget' ? value : formData.budget;
      const newUrgency = name === 'urgency' ? value : formData.urgency;
      setEstimatedCost(calculateEstimatedCost(newBudget, newUrgency));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Save to localStorage for demo
    const jobData = {
      ...formData,
      id: Date.now(),
      estimatedCost,
      datePosted: new Date().toISOString(),
      status: 'active'
    };

    const existingJobs = JSON.parse(localStorage.getItem('htk_jobs') || '[]');
    existingJobs.push(jobData);
    localStorage.setItem('htk_jobs', JSON.stringify(existingJobs));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black">
        <ProfessionalNavigation />
        <div className="htk-container htk-section">
          <div className="max-w-2xl mx-auto text-center">
            <div className="htk-card">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h1 className="htk-heading-2">Job Posted Successfully!</h1>
              <p className="htk-body-large mb-6">
                Your job has been posted and qualified tradespeople will be notified. 
                You'll receive applications through your dashboard.
              </p>
              <div className="bg-[#222] p-4 rounded-lg mb-6">
                <p className="htk-body text-[#B9975B]">
                  <strong>Credit Cost:</strong> £{estimatedCost}
                </p>
                <p className="htk-body-small text-gray-400 mt-2">
                  Credits will be deducted when tradespeople apply for your job.
                </p>
              </div>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => window.location.href = '/dashboard'}
                  className="htk-button-primary"
                >
                  View Dashboard
                </button>
                <button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      title: '',
                      category: '',
                      description: '',
                      location: '',
                      budget: '',
                      urgency: 'standard',
                      timeline: '',
                      requirements: '',
                      contactMethod: 'platform'
                    });
                    setEstimatedCost(0);
                  }}
                  className="htk-button-secondary"
                >
                  Post Another Job
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <ProfessionalNavigation />
      
      <div className="htk-container htk-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="htk-heading-1">Post a Job</h1>
            <p className="htk-body-large text-gray-300">
              Connect with qualified tradespeople in your area. Transparent pricing, professional results.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="htk-form-container">
                <h2 className="htk-heading-3 mb-6">Job Details</h2>

                {/* Job Title */}
                <div className="htk-form-group">
                  <label className="htk-label">Job Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Kitchen tap replacement, Bathroom renovation"
                    className="htk-input"
                    required
                  />
                </div>

                {/* Category */}
                <div className="htk-form-group">
                  <label className="htk-label">Trade Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="htk-select"
                    required
                  >
                    <option value="">Select a trade category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="htk-form-group">
                  <label className="htk-label">Job Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide detailed information about the work required, materials needed, and any specific requirements..."
                    className="htk-input min-h-[120px] resize-vertical"
                    required
                  />
                </div>

                {/* Location */}
                <div className="htk-form-group">
                  <label className="htk-label">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, postcode, or area"
                    className="htk-input"
                    required
                  />
                </div>

                {/* Budget */}
                <div className="htk-form-group">
                  <label className="htk-label">
                    <Pound className="inline w-4 h-4 mr-1" />
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="htk-select"
                    required
                  >
                    <option value="">Select budget range</option>
                    <option value="100">Under £100</option>
                    <option value="200">£100 - £200</option>
                    <option value="500">£200 - £500</option>
                    <option value="1000">£500 - £1,000</option>
                    <option value="2500">£1,000 - £2,500</option>
                    <option value="5000">£2,500 - £5,000</option>
                    <option value="10000">£5,000 - £10,000</option>
                    <option value="15000">£10,000+</option>
                  </select>
                </div>

                {/* Urgency */}
                <div className="htk-form-group">
                  <label className="htk-label">
                    <Clock className="inline w-4 h-4 mr-1" />
                    Urgency Level
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="htk-select"
                  >
                    {urgencyLevels.map(level => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Timeline */}
                <div className="htk-form-group">
                  <label className="htk-label">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Preferred Timeline
                  </label>
                  <input
                    type="text"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    placeholder="e.g., Next week, End of month, Flexible"
                    className="htk-input"
                  />
                </div>

                {/* Requirements */}
                <div className="htk-form-group">
                  <label className="htk-label">Special Requirements</label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    placeholder="Insurance requirements, certifications needed, working hours preferences..."
                    className="htk-input min-h-[80px] resize-vertical"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="htk-button-primary htk-button-large w-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="htk-loading mr-2"></div>
                      Posting Job...
                    </>
                  ) : (
                    `Post Job - £${estimatedCost} Credits`
                  )}
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Cost Estimate */}
              <div className="htk-card">
                <h3 className="htk-heading-4 mb-4">Cost Estimate</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#B9975B] mb-2">
                    £{estimatedCost}
                  </div>
                  <p className="htk-body-small text-gray-400">
                    Credits required for this job
                  </p>
                </div>
                
                {estimatedCost > 0 && (
                  <div className="mt-4 p-3 bg-[#222] rounded-lg">
                    <p className="htk-body-small text-gray-300">
                      <AlertCircle className="inline w-4 h-4 mr-1" />
                      Credits are only charged when qualified tradespeople apply for your job.
                    </p>
                  </div>
                )}
              </div>

              {/* How It Works */}
              <div className="htk-card">
                <h3 className="htk-heading-4 mb-4">How It Works</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#B9975B] text-black rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <p className="htk-body-small">Post your job with detailed requirements</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#B9975B] text-black rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <p className="htk-body-small">Qualified tradespeople apply with quotes</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#B9975B] text-black rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <p className="htk-body-small">Review applications and choose your tradesperson</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#B9975B] text-black rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <p className="htk-body-small">Work completed with professional standards</p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="htk-card">
                <h3 className="htk-heading-4 mb-4">Tips for Better Results</h3>
                <ul className="space-y-2 htk-body-small text-gray-300">
                  <li>• Be specific about materials and requirements</li>
                  <li>• Include photos if helpful</li>
                  <li>• Set realistic budgets and timelines</li>
                  <li>• Mention any access restrictions</li>
                  <li>• Specify insurance requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalJobPosting;
