// Feature Status Management System
// Tracks which features are complete, in development, or coming soon

export const FEATURE_STATUS = {
  COMPLETE: 'complete',
  IN_DEVELOPMENT: 'in_development',
  COMING_SOON: 'coming_soon',
  PLANNED: 'planned'
};

export const FEATURE_PRIORITY = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
};

// Master feature list with current status
export const FEATURES = {
  // Core Platform Features
  landing_page: {
    name: 'Landing Page',
    status: FEATURE_STATUS.COMPLETE,
    priority: FEATURE_PRIORITY.HIGH,
    description: 'Main homepage with HTK branding and navigation',
    category: 'core',
    completedDate: '2024-01-21'
  },
  
  user_registration: {
    name: 'User Registration',
    status: FEATURE_STATUS.COMPLETE,
    priority: FEATURE_PRIORITY.HIGH,
    description: 'Customer and tradesperson registration system',
    category: 'auth',
    completedDate: '2024-01-21'
  },
  
  admin_system: {
    name: 'Admin Dashboard',
    status: FEATURE_STATUS.COMPLETE,
    priority: FEATURE_PRIORITY.HIGH,
    description: 'Secure admin system with user management and data export',
    category: 'admin',
    completedDate: '2024-01-21'
  },

  search_system: {
    name: 'Search & Discovery',
    status: FEATURE_STATUS.COMPLETE,
    priority: FEATURE_PRIORITY.HIGH,
    description: 'Advanced search with location filtering and categories',
    category: 'search',
    completedDate: '2024-01-21'
  },

  job_posting: {
    name: 'Job Posting System',
    status: FEATURE_STATUS.COMPLETE,
    priority: FEATURE_PRIORITY.HIGH,
    description: 'Multi-step job posting with photo uploads and requirements',
    category: 'jobs',
    completedDate: '2024-01-21'
  },

  // Payment & Credits
  stripe_integration: {
    name: 'Stripe Payment System',
    status: FEATURE_STATUS.COMPLETE,
    priority: FEATURE_PRIORITY.HIGH,
    description: 'Credit purchasing system with Stripe integration',
    category: 'payment',
    completedDate: '2024-01-21'
  },

  credit_system: {
    name: 'Credit Management',
    status: FEATURE_STATUS.COMPLETE,
    priority: FEATURE_PRIORITY.HIGH,
    description: '£1 = 1 credit system with job pricing',
    category: 'payment',
    completedDate: '2024-01-21'
  },

  // Community Features
  trade_forum: {
    name: 'Trade-to-Trade Forum',
    status: FEATURE_STATUS.COMPLETE,
    priority: FEATURE_PRIORITY.MEDIUM,
    description: 'Community forum with auto-categorization and reputation system',
    category: 'community',
    completedDate: '2024-01-21'
  },

  job_bidding: {
    name: 'Job Bidding System',
    status: FEATURE_STATUS.COMPLETE,
    priority: FEATURE_PRIORITY.HIGH,
    description: 'Real-time bidding with status tracking and reviews',
    category: 'jobs',
    completedDate: '2024-01-21'
  },

  // Advanced Features
  professional_verification: {
    name: 'Professional Verification',
    status: FEATURE_STATUS.COMPLETE,
    priority: FEATURE_PRIORITY.HIGH,
    description: 'Skills badges, document verification, and work proof system',
    category: 'verification',
    completedDate: '2024-01-21'
  },

  group_buying: {
    name: 'Group Buying Power',
    status: FEATURE_STATUS.COMPLETE,
    priority: FEATURE_PRIORITY.MEDIUM,
    description: 'Merchant partnerships and bulk discount system',
    category: 'commerce',
    completedDate: '2024-01-21'
  },

  smart_quotes: {
    name: '60-Second Smart Quotes',
    status: FEATURE_STATUS.COMPLETE,
    priority: FEATURE_PRIORITY.HIGH,
    description: 'AR camera integration with automatic pricing',
    category: 'quotes',
    completedDate: '2024-01-21'
  },

  live_calendar: {
    name: 'Live Calendar Integration',
    status: FEATURE_STATUS.COMPLETE,
    priority: FEATURE_PRIORITY.MEDIUM,
    description: 'Google Calendar sync with weather-aware scheduling',
    category: 'calendar',
    completedDate: '2024-01-21'
  },

  mobile_pwa: {
    name: 'Mobile PWA',
    status: FEATURE_STATUS.COMPLETE,
    priority: FEATURE_PRIORITY.HIGH,
    description: 'Progressive Web App with offline functionality',
    category: 'mobile',
    completedDate: '2024-01-21'
  },

  // Features In Development
  direct_messaging: {
    name: 'Direct Messaging',
    status: FEATURE_STATUS.IN_DEVELOPMENT,
    priority: FEATURE_PRIORITY.HIGH,
    description: 'Secure messaging between customers and tradespeople',
    category: 'messaging',
    expectedDate: 'Next Week'
  },

  quote_management: {
    name: 'Quote Management',
    status: FEATURE_STATUS.IN_DEVELOPMENT,
    priority: FEATURE_PRIORITY.HIGH,
    description: 'Quote creation, sending, and acceptance system',
    category: 'quotes',
    expectedDate: 'Next Week'
  },

  tradesperson_profiles: {
    name: 'Public Tradesperson Profiles',
    status: FEATURE_STATUS.IN_DEVELOPMENT,
    priority: FEATURE_PRIORITY.HIGH,
    description: 'Public directory with portfolios and reviews',
    category: 'profiles',
    expectedDate: 'Coming Soon'
  },

  // Coming Soon Features
  escrow_payments: {
    name: 'Escrow & Instant Pay',
    status: FEATURE_STATUS.COMING_SOON,
    priority: FEATURE_PRIORITY.HIGH,
    description: 'Secure escrow system with milestone payments',
    category: 'payment',
    expectedDate: 'Coming Soon'
  },

  insurance_integration: {
    name: 'Insurance & Warranty',
    status: FEATURE_STATUS.COMING_SOON,
    priority: FEATURE_PRIORITY.MEDIUM,
    description: 'Group insurance rates and warranty packages',
    category: 'insurance',
    expectedDate: 'Coming Soon'
  },

  training_cpd: {
    name: 'Training & CPD Credits',
    status: FEATURE_STATUS.COMING_SOON,
    priority: FEATURE_PRIORITY.MEDIUM,
    description: 'Professional development courses and certifications',
    category: 'education',
    expectedDate: 'Coming Soon'
  },

  apprentice_pool: {
    name: 'Shared Apprentice Pool',
    status: FEATURE_STATUS.COMING_SOON,
    priority: FEATURE_PRIORITY.MEDIUM,
    description: 'Helper network for additional workforce',
    category: 'workforce',
    expectedDate: 'Coming Soon'
  },

  portable_profiles: {
    name: 'Portable Profiles',
    status: FEATURE_STATUS.COMING_SOON,
    priority: FEATURE_PRIORITY.MEDIUM,
    description: 'Export reviews and badges as digital cards',
    category: 'profiles',
    expectedDate: 'Coming Soon'
  },

  social_features: {
    name: 'Social Network Effects',
    status: FEATURE_STATUS.COMING_SOON,
    priority: FEATURE_PRIORITY.MEDIUM,
    description: 'Neighborhood maps, meetups, and mentor matching',
    category: 'social',
    expectedDate: 'Coming Soon'
  },

  business_tools: {
    name: 'Business Management Tools',
    status: FEATURE_STATUS.COMING_SOON,
    priority: FEATURE_PRIORITY.MEDIUM,
    description: 'Expense tracking, invoicing, and accounting integration',
    category: 'business',
    expectedDate: 'Coming Soon'
  },

  // Planned Features
  ai_assistant: {
    name: 'AI Assistant',
    status: FEATURE_STATUS.PLANNED,
    priority: FEATURE_PRIORITY.LOW,
    description: 'Smart AI for job matching and customer support',
    category: 'ai',
    expectedDate: 'Future Release'
  },

  video_consultations: {
    name: 'Video Consultations',
    status: FEATURE_STATUS.PLANNED,
    priority: FEATURE_PRIORITY.LOW,
    description: 'Virtual consultations and remote assessments',
    category: 'video',
    expectedDate: 'Future Release'
  },

  iot_integration: {
    name: 'IoT Integration',
    status: FEATURE_STATUS.PLANNED,
    priority: FEATURE_PRIORITY.LOW,
    description: 'Smart home device integration and monitoring',
    category: 'iot',
    expectedDate: 'Future Release'
  }
};

// Helper functions
export const getFeaturesByStatus = (status) => {
  return Object.entries(FEATURES)
    .filter(([key, feature]) => feature.status === status)
    .reduce((acc, [key, feature]) => {
      acc[key] = feature;
      return acc;
    }, {});
};

export const getFeaturesByCategory = (category) => {
  return Object.entries(FEATURES)
    .filter(([key, feature]) => feature.category === category)
    .reduce((acc, [key, feature]) => {
      acc[key] = feature;
      return acc;
    }, {});
};

export const getFeaturesByPriority = (priority) => {
  return Object.entries(FEATURES)
    .filter(([key, feature]) => feature.priority === priority)
    .reduce((acc, [key, feature]) => {
      acc[key] = feature;
      return acc;
    }, {});
};

export const isFeatureComplete = (featureKey) => {
  return FEATURES[featureKey]?.status === FEATURE_STATUS.COMPLETE;
};

export const isFeatureInDevelopment = (featureKey) => {
  return FEATURES[featureKey]?.status === FEATURE_STATUS.IN_DEVELOPMENT;
};

export const isFeatureComingSoon = (featureKey) => {
  return FEATURES[featureKey]?.status === FEATURE_STATUS.COMING_SOON || 
         FEATURES[featureKey]?.status === FEATURE_STATUS.PLANNED;
};

export const getFeatureProgress = () => {
  const total = Object.keys(FEATURES).length;
  const complete = Object.values(FEATURES).filter(f => f.status === FEATURE_STATUS.COMPLETE).length;
  const inDevelopment = Object.values(FEATURES).filter(f => f.status === FEATURE_STATUS.IN_DEVELOPMENT).length;
  
  return {
    total,
    complete,
    inDevelopment,
    completionPercentage: Math.round((complete / total) * 100),
    developmentPercentage: Math.round(((complete + inDevelopment) / total) * 100)
  };
};

export const updateFeatureStatus = (featureKey, newStatus, additionalData = {}) => {
  if (FEATURES[featureKey]) {
    FEATURES[featureKey] = {
      ...FEATURES[featureKey],
      status: newStatus,
      ...additionalData,
      lastUpdated: new Date().toISOString()
    };
    
    // Save to localStorage for persistence
    localStorage.setItem('htkFeatureStatus', JSON.stringify(FEATURES));
    
    return true;
  }
  return false;
};

// Load saved feature status from localStorage
export const loadFeatureStatus = () => {
  try {
    const saved = localStorage.getItem('htkFeatureStatus');
    if (saved) {
      const savedFeatures = JSON.parse(saved);
      // Merge with default features to ensure new features are included
      Object.keys(savedFeatures).forEach(key => {
        if (FEATURES[key]) {
          FEATURES[key] = { ...FEATURES[key], ...savedFeatures[key] };
        }
      });
    }
  } catch (error) {
    console.error('Error loading feature status:', error);
  }
};

// Initialize feature status on import
loadFeatureStatus();
