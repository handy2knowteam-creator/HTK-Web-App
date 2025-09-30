// HTK Data Collection System
// Handles customer and tradesperson registration data with Netlify Forms integration

export const submitCustomerRegistration = async (customerData) => {
  try {
    // Prepare data for submission
    const formData = new FormData()
    
    // Add all customer fields
    formData.append('form-name', 'customer-registration')
    formData.append('name', customerData.name)
    formData.append('email', customerData.email)
    formData.append('phone', customerData.phone)
    formData.append('location', customerData.location)
    formData.append('property_type', customerData.propertyType)
    formData.append('job_types', customerData.jobTypes?.join(', ') || '')
    formData.append('budget_range', customerData.budgetRange)
    formData.append('urgency', customerData.urgency)
    formData.append('source', customerData.source || 'website')
    formData.append('registration_date', new Date().toISOString())
    formData.append('user_type', 'customer')

    // Submit to Netlify Forms
    const netlifyResponse = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })

    // Also submit to FormSubmit for email notifications
    const emailData = {
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
      location: customerData.location,
      property_type: customerData.propertyType,
      job_types: customerData.jobTypes?.join(', ') || '',
      budget_range: customerData.budgetRange,
      urgency: customerData.urgency,
      user_type: 'CUSTOMER REGISTRATION',
      registration_date: new Date().toLocaleString('en-GB'),
      _subject: `HTK - New Customer Registration: ${customerData.name}`,
      _template: 'table'
    }

    const emailResponse = await fetch('https://formsubmit.co/ajax/your-admin-email@handy2know.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(emailData)
    })

    // Store in local storage for admin dashboard
    const existingCustomers = JSON.parse(localStorage.getItem('htkCustomers') || '[]')
    const newCustomer = {
      id: Date.now(),
      ...customerData,
      registrationDate: new Date().toISOString(),
      status: 'active',
      jobsPosted: 0,
      totalSpent: 0
    }
    existingCustomers.push(newCustomer)
    localStorage.setItem('htkCustomers', JSON.stringify(existingCustomers))

    // Send autoresponder email to customer
    await sendCustomerWelcomeEmail(customerData.email, customerData.name)

    return { success: true, message: 'Registration successful' }
  } catch (error) {
    console.error('Customer registration error:', error)
    return { success: false, message: 'Registration failed. Please try again.' }
  }
}

export const submitTradespersonRegistration = async (tradespersonData) => {
  try {
    // Prepare data for submission
    const formData = new FormData()
    
    // Add all tradesperson fields
    formData.append('form-name', 'tradesperson-registration')
    formData.append('name', tradespersonData.name)
    formData.append('email', tradespersonData.email)
    formData.append('phone', tradespersonData.phone)
    formData.append('trade', tradespersonData.trade)
    formData.append('specialties', tradespersonData.specialties?.join(', ') || '')
    formData.append('location', tradespersonData.location)
    formData.append('service_radius', tradespersonData.serviceRadius)
    formData.append('experience_years', tradespersonData.experienceYears)
    formData.append('qualifications', tradespersonData.qualifications)
    formData.append('insurance', tradespersonData.insurance ? 'Yes' : 'No')
    formData.append('business_name', tradespersonData.businessName || '')
    formData.append('website', tradespersonData.website || '')
    formData.append('youtube_channel', tradespersonData.youtubeChannel || '')
    formData.append('source', tradespersonData.source || 'website')
    formData.append('registration_date', new Date().toISOString())
    formData.append('user_type', 'tradesperson')

    // Submit to Netlify Forms
    const netlifyResponse = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })

    // Also submit to FormSubmit for email notifications
    const emailData = {
      name: tradespersonData.name,
      email: tradespersonData.email,
      phone: tradespersonData.phone,
      trade: tradespersonData.trade,
      specialties: tradespersonData.specialties?.join(', ') || '',
      location: tradespersonData.location,
      service_radius: tradespersonData.serviceRadius,
      experience_years: tradespersonData.experienceYears,
      qualifications: tradespersonData.qualifications,
      insurance: tradespersonData.insurance ? 'Yes' : 'No',
      business_name: tradespersonData.businessName || 'N/A',
      website: tradespersonData.website || 'N/A',
      youtube_channel: tradespersonData.youtubeChannel || 'N/A',
      user_type: 'TRADESPERSON REGISTRATION',
      registration_date: new Date().toLocaleString('en-GB'),
      _subject: `HTK - New Tradesperson Registration: ${tradespersonData.name} (${tradespersonData.trade})`,
      _template: 'table'
    }

    const emailResponse = await fetch('https://formsubmit.co/ajax/your-admin-email@handy2know.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(emailData)
    })

    // Store in local storage for admin dashboard
    const existingTradespeople = JSON.parse(localStorage.getItem('htkTradespeople') || '[]')
    const newTradesperson = {
      id: Date.now(),
      ...tradespersonData,
      registrationDate: new Date().toISOString(),
      status: 'pending_verification',
      jobsCompleted: 0,
      rating: 0,
      earnings: 0,
      credits: 10, // Welcome credits
      hasVideo: false,
      liveStreams: 0
    }
    existingTradespeople.push(newTradesperson)
    localStorage.setItem('htkTradespeople', JSON.stringify(existingTradespeople))

    // Send autoresponder email to tradesperson
    await sendTradespersonWelcomeEmail(tradespersonData.email, tradespersonData.name)

    return { success: true, message: 'Registration successful' }
  } catch (error) {
    console.error('Tradesperson registration error:', error)
    return { success: false, message: 'Registration failed. Please try again.' }
  }
}

export const submitJobRequest = async (jobData) => {
  try {
    const formData = new FormData()
    
    // Add job request fields
    formData.append('form-name', 'job-request')
    formData.append('customer_name', jobData.customerName)
    formData.append('customer_email', jobData.customerEmail)
    formData.append('customer_phone', jobData.customerPhone)
    formData.append('job_title', jobData.jobTitle)
    formData.append('job_description', jobData.jobDescription)
    formData.append('job_category', jobData.jobCategory)
    formData.append('location', jobData.location)
    formData.append('budget_range', jobData.budgetRange)
    formData.append('urgency', jobData.urgency)
    formData.append('preferred_start_date', jobData.preferredStartDate)
    formData.append('property_type', jobData.propertyType)
    formData.append('access_requirements', jobData.accessRequirements || '')
    formData.append('additional_notes', jobData.additionalNotes || '')
    formData.append('request_date', new Date().toISOString())

    // Calculate credits required for this job
    const creditsRequired = calculateJobCredits(jobData)
    formData.append('credits_required', creditsRequired.toString())

    // Submit to Netlify Forms
    const netlifyResponse = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })

    // Email notification to admin
    const emailData = {
      customer_name: jobData.customerName,
      customer_email: jobData.customerEmail,
      customer_phone: jobData.customerPhone,
      job_title: jobData.jobTitle,
      job_description: jobData.jobDescription,
      job_category: jobData.jobCategory,
      location: jobData.location,
      budget_range: jobData.budgetRange,
      urgency: jobData.urgency,
      preferred_start_date: jobData.preferredStartDate,
      credits_required: creditsRequired,
      request_date: new Date().toLocaleString('en-GB'),
      _subject: `HTK - New Job Request: ${jobData.jobTitle} (${creditsRequired} credits)`,
      _template: 'table'
    }

    await fetch('https://formsubmit.co/ajax/your-admin-email@handy2know.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(emailData)
    })

    // Store in local storage
    const existingJobs = JSON.parse(localStorage.getItem('htkJobs') || '[]')
    const newJob = {
      id: Date.now(),
      ...jobData,
      creditsRequired,
      requestDate: new Date().toISOString(),
      status: 'active',
      applicants: []
    }
    existingJobs.push(newJob)
    localStorage.setItem('htkJobs', JSON.stringify(existingJobs))

    return { success: true, message: 'Job request submitted successfully', creditsRequired }
  } catch (error) {
    console.error('Job request error:', error)
    return { success: false, message: 'Job request failed. Please try again.' }
  }
}

const sendCustomerWelcomeEmail = async (email, name) => {
  const welcomeData = {
    to: email,
    name: name,
    subject: 'Welcome to HTK - Your Premium Trade Platform',
    message: `Hi ${name},\n\nWelcome to HTK (Handy To Know)!\n\nYou're now part of our community-first platform connecting you with skilled local tradespeople.\n\nWhat's next:\n• Browse verified tradespeople in your area\n• Post job requests with transparent pricing\n• Connect directly without commission fees\n• Support your local community\n\nNeed help? Visit handy2know.com/support\n\nBest regards,\nThe HTK Team`,
    _subject: `HTK Welcome - ${name}`,
    _autoresponse: 'Thank you for joining HTK! We\'ll be in touch soon.'
  }

  try {
    await fetch('https://formsubmit.co/ajax/welcome@handy2know.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(welcomeData)
    })
  } catch (error) {
    console.error('Welcome email error:', error)
  }
}

const sendTradespersonWelcomeEmail = async (email, name) => {
  const welcomeData = {
    to: email,
    name: name,
    subject: 'Welcome to HTK - Start Building Your Community',
    message: `Hi ${name},\n\nWelcome to HTK (Handy To Know)!\n\nYou're now part of our trade-focused community platform.\n\nYour benefits:\n• 10 welcome credits (£10 value)\n• Zero commission fees\n• Direct customer connections\n• Community profit sharing program\n• Video portfolio features\n• Live streaming opportunities\n\nNext steps:\n1. Complete your profile verification\n2. Add your portfolio and videos\n3. Start browsing available jobs\n4. Build your community reputation\n\nLogin at: handy2know.com/login/tradesperson\n\nBest regards,\nThe HTK Team`,
    _subject: `HTK Welcome - ${name} (Tradesperson)`,
    _autoresponse: 'Welcome to the HTK community! Your verification is in progress.'
  }

  try {
    await fetch('https://formsubmit.co/ajax/welcome@handy2know.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(welcomeData)
    })
  } catch (error) {
    console.error('Welcome email error:', error)
  }
}

// Helper function to calculate job credits (imported from existing utility)
const calculateJobCredits = (jobData) => {
  // Basic credit calculation based on job complexity and budget
  const budgetRanges = {
    '0-100': 3,
    '100-300': 5,
    '300-500': 8,
    '500-1000': 12,
    '1000-2500': 18,
    '2500-5000': 25,
    '5000+': 35
  }

  const urgencyMultipliers = {
    'standard': 1,
    'urgent': 1.5,
    'emergency': 2
  }

  const baseCredits = budgetRanges[jobData.budgetRange] || 8
  const urgencyMultiplier = urgencyMultipliers[jobData.urgency] || 1
  
  return Math.min(Math.ceil(baseCredits * urgencyMultiplier), 100) // Cap at 100 credits
}

export { calculateJobCredits }
