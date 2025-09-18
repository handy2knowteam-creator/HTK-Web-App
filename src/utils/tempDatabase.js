// Temporary Database System for HTK Platform
// Uses localStorage to collect customer and tradesperson data until backend is ready

class TempDatabase {
  constructor() {
    this.customers = this.loadData('htk_customers') || []
    this.tradespeople = this.loadData('htk_tradespeople') || []
    this.jobRequests = this.loadData('htk_job_requests') || []
    this.subscriptions = this.loadData('htk_subscriptions') || []
  }

  // Load data from localStorage
  loadData(key) {
    try {
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error(`Error loading ${key}:`, error)
      return null
    }
  }

  // Save data to localStorage
  saveData(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data))
      return true
    } catch (error) {
      console.error(`Error saving ${key}:`, error)
      return false
    }
  }

  // Generate unique ID
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Customer Management
  registerCustomer(customerData) {
    const customer = {
      id: this.generateId(),
      type: 'customer',
      ...customerData,
      registeredAt: new Date().toISOString(),
      status: 'active'
    }
    
    this.customers.push(customer)
    this.saveData('htk_customers', this.customers)
    
    console.log('Customer registered:', customer)
    return { success: true, customer }
  }

  // Tradesperson Management
  registerTradesperson(tradespersonData) {
    const tradesperson = {
      id: this.generateId(),
      type: 'tradesperson',
      ...tradespersonData,
      registeredAt: new Date().toISOString(),
      status: 'pending_verification',
      credits: 0,
      subscription: null
    }
    
    this.tradespeople.push(tradesperson)
    this.saveData('htk_tradespeople', this.tradespeople)
    
    console.log('Tradesperson registered:', tradesperson)
    return { success: true, tradesperson }
  }

  // Job Request Management
  createJobRequest(jobData) {
    const jobRequest = {
      id: this.generateId(),
      ...jobData,
      createdAt: new Date().toISOString(),
      status: 'open',
      responses: []
    }
    
    this.jobRequests.push(jobRequest)
    this.saveData('htk_job_requests', this.jobRequests)
    
    console.log('Job request created:', jobRequest)
    return { success: true, jobRequest }
  }

  // Subscription Management
  createSubscription(subscriptionData) {
    const subscription = {
      id: this.generateId(),
      ...subscriptionData,
      createdAt: new Date().toISOString(),
      status: 'active'
    }
    
    this.subscriptions.push(subscription)
    this.saveData('htk_subscriptions', this.subscriptions)
    
    // Update tradesperson credits
    const tradesperson = this.tradespeople.find(t => t.id === subscriptionData.tradespersonId)
    if (tradesperson) {
      tradesperson.credits += subscriptionData.credits
      tradesperson.subscription = subscription.id
      this.saveData('htk_tradespeople', this.tradespeople)
    }
    
    console.log('Subscription created:', subscription)
    return { success: true, subscription }
  }

  // Data Retrieval Methods
  getAllCustomers() {
    return this.customers
  }

  getAllTradespeople() {
    return this.tradespeople
  }

  getAllJobRequests() {
    return this.jobRequests
  }

  getAllSubscriptions() {
    return this.subscriptions
  }

  getCustomerById(id) {
    return this.customers.find(c => c.id === id)
  }

  getTradespersonById(id) {
    return this.tradespeople.find(t => t.id === id)
  }

  // Authentication Simulation
  authenticateUser(email, password) {
    // Check customers
    const customer = this.customers.find(c => c.email === email && c.password === password)
    if (customer) {
      return { success: true, user: customer, userType: 'customer' }
    }

    // Check tradespeople
    const tradesperson = this.tradespeople.find(t => t.email === email && t.password === password)
    if (tradesperson) {
      return { success: true, user: tradesperson, userType: 'tradesperson' }
    }

    return { success: false, message: 'Invalid credentials' }
  }

  // Data Export (for when moving to real database)
  exportAllData() {
    return {
      customers: this.customers,
      tradespeople: this.tradespeople,
      jobRequests: this.jobRequests,
      subscriptions: this.subscriptions,
      exportedAt: new Date().toISOString()
    }
  }

  // Clear all data (for testing)
  clearAllData() {
    localStorage.removeItem('htk_customers')
    localStorage.removeItem('htk_tradespeople')
    localStorage.removeItem('htk_job_requests')
    localStorage.removeItem('htk_subscriptions')
    
    this.customers = []
    this.tradespeople = []
    this.jobRequests = []
    this.subscriptions = []
    
    console.log('All temporary data cleared')
  }

  // Get statistics for admin dashboard
  getStatistics() {
    return {
      totalCustomers: this.customers.length,
      totalTradespeople: this.tradespeople.length,
      totalJobRequests: this.jobRequests.length,
      totalSubscriptions: this.subscriptions.length,
      activeTradespeople: this.tradespeople.filter(t => t.status === 'active').length,
      pendingTradespeople: this.tradespeople.filter(t => t.status === 'pending_verification').length,
      openJobs: this.jobRequests.filter(j => j.status === 'open').length
    }
  }
}

// Create and export singleton instance
const tempDB = new TempDatabase()

export default tempDB

// Export individual methods for convenience
export const {
  registerCustomer,
  registerTradesperson,
  createJobRequest,
  createSubscription,
  authenticateUser,
  getAllCustomers,
  getAllTradespeople,
  getAllJobRequests,
  getAllSubscriptions,
  getStatistics,
  exportAllData,
  clearAllData
} = tempDB

