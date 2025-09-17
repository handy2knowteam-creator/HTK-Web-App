// HTK Automated Job Pricing System
// Calculates fair credit cost based on job characteristics

export const JOB_CATEGORIES = {
  ELECTRICAL: 'electrical',
  PLUMBING: 'plumbing',
  CARPENTRY: 'carpentry',
  PAINTING: 'painting',
  ROOFING: 'roofing',
  HEATING: 'heating',
  LANDSCAPING: 'landscaping',
  GENERAL: 'general'
}

export const URGENCY_LEVELS = {
  STANDARD: 'standard',
  HIGH_PRIORITY: 'high_priority',
  EMERGENCY: 'emergency',
  PREMIUM: 'premium'
}

export const LOCATION_TYPES = {
  RURAL: 'rural',
  SUBURBAN: 'suburban',
  URBAN: 'urban',
  LONDON: 'london'
}

export const COMPLEXITY_LEVELS = {
  BASIC: 'basic',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  SPECIALIST: 'specialist'
}

// Base credit costs by job category
const CATEGORY_BASE_CREDITS = {
  [JOB_CATEGORIES.ELECTRICAL]: 2,
  [JOB_CATEGORIES.PLUMBING]: 2,
  [JOB_CATEGORIES.HEATING]: 3,
  [JOB_CATEGORIES.ROOFING]: 3,
  [JOB_CATEGORIES.CARPENTRY]: 2,
  [JOB_CATEGORIES.PAINTING]: 1,
  [JOB_CATEGORIES.LANDSCAPING]: 2,
  [JOB_CATEGORIES.GENERAL]: 1
}

// Budget-based multipliers
const BUDGET_MULTIPLIERS = {
  '0-200': 1.0,
  '200-500': 1.5,
  '500-1000': 2.0,
  '1000-2500': 3.0,
  '2500-5000': 4.5,
  '5000-10000': 6.0,
  '10000+': 8.0
}

// Urgency multipliers
const URGENCY_MULTIPLIERS = {
  [URGENCY_LEVELS.STANDARD]: 1.0,
  [URGENCY_LEVELS.HIGH_PRIORITY]: 1.3,
  [URGENCY_LEVELS.EMERGENCY]: 1.6,
  [URGENCY_LEVELS.PREMIUM]: 2.0
}

// Location multipliers
const LOCATION_MULTIPLIERS = {
  [LOCATION_TYPES.RURAL]: 0.8,
  [LOCATION_TYPES.SUBURBAN]: 1.0,
  [LOCATION_TYPES.URBAN]: 1.2,
  [LOCATION_TYPES.LONDON]: 1.5
}

// Complexity multipliers
const COMPLEXITY_MULTIPLIERS = {
  [COMPLEXITY_LEVELS.BASIC]: 1.0,
  [COMPLEXITY_LEVELS.INTERMEDIATE]: 1.3,
  [COMPLEXITY_LEVELS.ADVANCED]: 1.6,
  [COMPLEXITY_LEVELS.SPECIALIST]: 2.2
}

/**
 * Calculate job credit cost based on job characteristics
 * @param {Object} job - Job details
 * @param {string} job.category - Job category
 * @param {string} job.budget - Budget range
 * @param {string} job.urgency - Urgency level
 * @param {string} job.location - Location type
 * @param {string} job.complexity - Complexity level
 * @returns {number} Credit cost for the job
 */
export function calculateJobCredits(job) {
  const {
    category = JOB_CATEGORIES.GENERAL,
    budget = '0-200',
    urgency = URGENCY_LEVELS.STANDARD,
    location = LOCATION_TYPES.SUBURBAN,
    complexity = COMPLEXITY_LEVELS.BASIC
  } = job

  // Get base credits for category
  const baseCredits = CATEGORY_BASE_CREDITS[category] || 1

  // Get multipliers
  const budgetMultiplier = BUDGET_MULTIPLIERS[budget] || 1.0
  const urgencyMultiplier = URGENCY_MULTIPLIERS[urgency] || 1.0
  const locationMultiplier = LOCATION_MULTIPLIERS[location] || 1.0
  const complexityMultiplier = COMPLEXITY_MULTIPLIERS[complexity] || 1.0

  // Calculate total credits
  const totalCredits = Math.ceil(
    baseCredits * 
    budgetMultiplier * 
    urgencyMultiplier * 
    locationMultiplier * 
    complexityMultiplier
  )

  // Cap between 1 and 20 credits
  return Math.max(1, Math.min(20, totalCredits))
}

/**
 * Get credit value in GBP for different subscription tiers
 * @param {number} credits - Number of credits
 * @param {string} tier - Subscription tier
 * @returns {Object} Credit value information
 */
export function getCreditValue(credits, tier = 'payg') {
  const CREDIT_VALUES = {
    bronze: 0.99,
    silver: 0.71,
    gold: 0.62,
    payg: 1.00
  }

  const creditValue = CREDIT_VALUES[tier] || CREDIT_VALUES.payg
  const totalValue = credits * creditValue

  return {
    credits,
    creditValue,
    totalValue,
    tier,
    formattedValue: `£${totalValue.toFixed(2)}`
  }
}

/**
 * Get job pricing explanation for transparency
 * @param {Object} job - Job details
 * @returns {Object} Pricing breakdown
 */
export function getJobPricingExplanation(job) {
  const credits = calculateJobCredits(job)
  const breakdown = []

  // Base category cost
  const baseCredits = CATEGORY_BASE_CREDITS[job.category] || 1
  breakdown.push({
    factor: 'Base Cost',
    value: `${baseCredits} credits`,
    description: `Standard rate for ${job.category} jobs`
  })

  // Budget impact
  const budgetMultiplier = BUDGET_MULTIPLIERS[job.budget] || 1.0
  if (budgetMultiplier !== 1.0) {
    breakdown.push({
      factor: 'Budget Range',
      value: `×${budgetMultiplier}`,
      description: `Higher budget jobs have more value for trades`
    })
  }

  // Urgency impact
  const urgencyMultiplier = URGENCY_MULTIPLIERS[job.urgency] || 1.0
  if (urgencyMultiplier !== 1.0) {
    breakdown.push({
      factor: 'Urgency Level',
      value: `×${urgencyMultiplier}`,
      description: `${job.urgency} jobs require immediate attention`
    })
  }

  // Location impact
  const locationMultiplier = LOCATION_MULTIPLIERS[job.location] || 1.0
  if (locationMultiplier !== 1.0) {
    breakdown.push({
      factor: 'Location',
      value: `×${locationMultiplier}`,
      description: `${job.location} area pricing adjustment`
    })
  }

  // Complexity impact
  const complexityMultiplier = COMPLEXITY_MULTIPLIERS[job.complexity] || 1.0
  if (complexityMultiplier !== 1.0) {
    breakdown.push({
      factor: 'Complexity',
      value: `×${complexityMultiplier}`,
      description: `${job.complexity} level work requires specialized skills`
    })
  }

  return {
    totalCredits: credits,
    breakdown,
    explanation: `This job is priced at ${credits} credits based on industry-standard factors to ensure fair value for both customers and tradespeople.`
  }
}

/**
 * Validate job data for pricing calculation
 * @param {Object} job - Job details
 * @returns {Object} Validation result
 */
export function validateJobForPricing(job) {
  const errors = []

  if (!job.category || !Object.values(JOB_CATEGORIES).includes(job.category)) {
    errors.push('Valid job category is required')
  }

  if (!job.budget || !BUDGET_MULTIPLIERS[job.budget]) {
    errors.push('Valid budget range is required')
  }

  if (!job.urgency || !Object.values(URGENCY_LEVELS).includes(job.urgency)) {
    errors.push('Valid urgency level is required')
  }

  if (!job.location || !Object.values(LOCATION_TYPES).includes(job.location)) {
    errors.push('Valid location type is required')
  }

  if (!job.complexity || !Object.values(COMPLEXITY_LEVELS).includes(job.complexity)) {
    errors.push('Valid complexity level is required')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Export default pricing function
export default calculateJobCredits

