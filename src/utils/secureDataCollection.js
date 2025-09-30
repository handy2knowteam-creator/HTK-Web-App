// Secure data collection system for HTK platform
// Captures and stores customer and tradesperson registration data

export const saveCustomerData = (customerData) => {
  try {
    // Get existing customers
    const existingCustomers = JSON.parse(localStorage.getItem('htkCustomers') || '[]');
    
    // Create new customer record
    const newCustomer = {
      id: Date.now(),
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
      location: customerData.location,
      registrationDate: new Date().toISOString().split('T')[0],
      jobsPosted: 0,
      totalSpent: '£0',
      status: 'Active',
      lastLogin: new Date().toISOString().split('T')[0],
      registrationTime: new Date().toISOString(),
      ipAddress: 'Hidden for privacy',
      userAgent: navigator.userAgent.substring(0, 50) + '...',
      referralSource: document.referrer || 'Direct',
      deviceType: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
    };
    
    // Add to existing customers
    existingCustomers.push(newCustomer);
    
    // Save to localStorage
    localStorage.setItem('htkCustomers', JSON.stringify(existingCustomers));
    
    // Send email notification to admin
    sendAdminNotification('customer', newCustomer);
    
    return { success: true, customerId: newCustomer.id };
  } catch (error) {
    console.error('Error saving customer data:', error);
    return { success: false, error: error.message };
  }
};

export const saveTradespersonData = (tradespersonData) => {
  try {
    // Get existing tradespeople
    const existingTradespeople = JSON.parse(localStorage.getItem('htkTradespeople') || '[]');
    
    // Create new tradesperson record
    const newTradesperson = {
      id: Date.now(),
      name: tradespersonData.name,
      email: tradespersonData.email,
      phone: tradespersonData.phone,
      trade: tradespersonData.trade,
      location: tradespersonData.location,
      businessName: tradespersonData.businessName || `${tradespersonData.name} ${tradespersonData.trade}`,
      registrationDate: new Date().toISOString().split('T')[0],
      verified: false,
      rating: 0,
      jobsCompleted: 0,
      totalEarned: '£0',
      status: 'Pending Verification',
      lastLogin: new Date().toISOString().split('T')[0],
      registrationTime: new Date().toISOString(),
      certifications: tradespersonData.certifications || [],
      insurance: tradespersonData.insurance || 'Pending',
      experience: tradespersonData.experience || 'Not specified',
      specialties: tradespersonData.specialties || [],
      ipAddress: 'Hidden for privacy',
      userAgent: navigator.userAgent.substring(0, 50) + '...',
      referralSource: document.referrer || 'Direct',
      deviceType: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
    };
    
    // Add to existing tradespeople
    existingTradespeople.push(newTradesperson);
    
    // Save to localStorage
    localStorage.setItem('htkTradespeople', JSON.stringify(existingTradespeople));
    
    // Send email notification to admin
    sendAdminNotification('tradesperson', newTradesperson);
    
    return { success: true, tradespersonId: newTradesperson.id };
  } catch (error) {
    console.error('Error saving tradesperson data:', error);
    return { success: false, error: error.message };
  }
};

export const saveJobData = (jobData) => {
  try {
    // Get existing jobs
    const existingJobs = JSON.parse(localStorage.getItem('htkJobs') || '[]');
    
    // Create new job record
    const newJob = {
      id: Date.now(),
      title: jobData.title,
      category: jobData.category,
      description: jobData.description,
      location: jobData.location,
      postcode: jobData.postcode,
      budget: jobData.budget,
      timeline: jobData.timeline,
      photos: jobData.photos || [],
      requirements: jobData.requirements || {},
      contact: jobData.contact,
      status: 'Active',
      postedDate: new Date().toISOString().split('T')[0],
      postedTime: new Date().toISOString(),
      bids: [],
      views: 0,
      interested: 0
    };
    
    // Add to existing jobs
    existingJobs.push(newJob);
    
    // Save to localStorage
    localStorage.setItem('htkJobs', JSON.stringify(existingJobs));
    
    // Send email notification to admin
    sendAdminNotification('job', newJob);
    
    return { success: true, jobId: newJob.id };
  } catch (error) {
    console.error('Error saving job data:', error);
    return { success: false, error: error.message };
  }
};

const sendAdminNotification = (type, data) => {
  // In a real application, this would send an email to the admin
  // For now, we'll log it and could integrate with EmailJS or similar service
  
  const notificationData = {
    type: type,
    timestamp: new Date().toISOString(),
    data: data
  };
  
  // Save notification for admin dashboard
  const existingNotifications = JSON.parse(localStorage.getItem('htkAdminNotifications') || '[]');
  existingNotifications.unshift(notificationData); // Add to beginning
  
  // Keep only last 100 notifications
  if (existingNotifications.length > 100) {
    existingNotifications.splice(100);
  }
  
  localStorage.setItem('htkAdminNotifications', JSON.stringify(existingNotifications));
  
  // Log for debugging
  console.log(`New ${type} registration:`, data);
  
  // In production, integrate with email service:
  // sendEmailNotification(type, data);
};

export const getAdminNotifications = () => {
  return JSON.parse(localStorage.getItem('htkAdminNotifications') || '[]');
};

export const getAllCustomers = () => {
  return JSON.parse(localStorage.getItem('htkCustomers') || '[]');
};

export const getAllTradespeople = () => {
  return JSON.parse(localStorage.getItem('htkTradespeople') || '[]');
};

export const getAllJobs = () => {
  return JSON.parse(localStorage.getItem('htkJobs') || '[]');
};

export const updateCustomer = (customerId, updateData) => {
  try {
    const customers = getAllCustomers();
    const customerIndex = customers.findIndex(c => c.id === customerId);
    
    if (customerIndex !== -1) {
      customers[customerIndex] = { ...customers[customerIndex], ...updateData };
      localStorage.setItem('htkCustomers', JSON.stringify(customers));
      return { success: true };
    }
    
    return { success: false, error: 'Customer not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateTradesperson = (tradespersonId, updateData) => {
  try {
    const tradespeople = getAllTradespeople();
    const tradespersonIndex = tradespeople.findIndex(t => t.id === tradespersonId);
    
    if (tradespersonIndex !== -1) {
      tradespeople[tradespersonIndex] = { ...tradespeople[tradespersonIndex], ...updateData };
      localStorage.setItem('htkTradespeople', JSON.stringify(tradespeople));
      return { success: true };
    }
    
    return { success: false, error: 'Tradesperson not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteCustomer = (customerId) => {
  try {
    const customers = getAllCustomers();
    const filteredCustomers = customers.filter(c => c.id !== customerId);
    localStorage.setItem('htkCustomers', JSON.stringify(filteredCustomers));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteTradesperson = (tradespersonId) => {
  try {
    const tradespeople = getAllTradespeople();
    const filteredTradespeople = tradespeople.filter(t => t.id !== tradespersonId);
    localStorage.setItem('htkTradespeople', JSON.stringify(filteredTradespeople));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Security functions
export const logAdminAccess = (action, details = {}) => {
  const accessLog = {
    timestamp: new Date().toISOString(),
    action: action,
    details: details,
    ipAddress: 'Hidden for security',
    userAgent: navigator.userAgent.substring(0, 50) + '...'
  };
  
  const existingLogs = JSON.parse(localStorage.getItem('htkAdminAccessLogs') || '[]');
  existingLogs.unshift(accessLog);
  
  // Keep only last 500 logs
  if (existingLogs.length > 500) {
    existingLogs.splice(500);
  }
  
  localStorage.setItem('htkAdminAccessLogs', JSON.stringify(existingLogs));
};

export const getAdminAccessLogs = () => {
  return JSON.parse(localStorage.getItem('htkAdminAccessLogs') || '[]');
};

export const clearAllData = () => {
  // Emergency function to clear all data (use with caution)
  const confirmation = window.confirm('Are you sure you want to clear ALL data? This cannot be undone.');
  
  if (confirmation) {
    localStorage.removeItem('htkCustomers');
    localStorage.removeItem('htkTradespeople');
    localStorage.removeItem('htkJobs');
    localStorage.removeItem('htkAdminNotifications');
    localStorage.removeItem('htkAdminAccessLogs');
    
    logAdminAccess('DATA_CLEARED', { warning: 'All data was cleared' });
    
    return { success: true, message: 'All data cleared successfully' };
  }
  
  return { success: false, message: 'Data clear cancelled' };
};
