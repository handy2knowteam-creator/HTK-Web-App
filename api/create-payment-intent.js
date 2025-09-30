// Netlify Function for Stripe Payment Processing
// This ensures all payments go to your Stripe account: acct_1S7CKwGFrHVFmHVw

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { 
      amount, 
      currency, 
      customer_details, 
      package_details,
      stripe_account 
    } = JSON.parse(event.body);

    // Validate required fields
    if (!amount || !customer_details || !package_details) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Ensure payment goes to your account
    const YOUR_STRIPE_ACCOUNT = 'acct_1S7CKwGFrHVFmHVw';
    
    // Create payment intent with your account as destination
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in pence
      currency: currency || 'gbp',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        customer_name: customer_details.name,
        customer_email: customer_details.email,
        customer_phone: customer_details.phone,
        package_name: package_details.name,
        package_credits: package_details.credits.toString(),
        platform: 'HTK',
        account_destination: YOUR_STRIPE_ACCOUNT
      },
      description: `HTK Credits: ${package_details.name} (${package_details.credits} credits)`,
      receipt_email: customer_details.email,
      // Route payment to your account
      transfer_data: {
        destination: YOUR_STRIPE_ACCOUNT,
      },
      // Application fee (optional - you can take a small fee)
      application_fee_amount: Math.round(amount * 0.029), // 2.9% platform fee
    });

    // Log successful payment intent creation
    console.log(`Payment Intent Created: ${paymentIntent.id} for ${customer_details.email} - ${package_details.name}`);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        client_secret: paymentIntent.client_secret,
        payment_intent_id: paymentIntent.id
      })
    };

  } catch (error) {
    console.error('Payment Intent Error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        error: error.message || 'Payment processing failed' 
      })
    };
  }
};

// Handle CORS preflight requests
exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  return exports.handler(event, context);
};
