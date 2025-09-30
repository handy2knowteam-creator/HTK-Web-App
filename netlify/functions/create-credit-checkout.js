// Netlify Function for Creating Stripe Credit Top-up Checkout Sessions

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Handle CORS preflight
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

  try {
    const { 
      creditAmount, 
      customerEmail, 
      customerName, 
      customerPhone,
      successUrl, 
      cancelUrl 
    } = JSON.parse(event.body);

    if (!creditAmount || creditAmount < 1) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Credit amount must be at least 1' })
      };
    }

    // Calculate amount in pence (£1 = 1 credit = 100 pence)
    const amountInPence = Math.round(creditAmount * 100);

    // Create Stripe checkout session for one-time payment
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: `HTK Credits Top-up`,
              description: `${creditAmount} credits for HTK platform (£1 = 1 credit)`,
              images: ['https://handy2know.com/htk-logo-premium.png'],
            },
            unit_amount: amountInPence,
          },
          quantity: 1,
        },
      ],
      customer_email: customerEmail,
      metadata: {
        customer_name: customerName || '',
        customer_email: customerEmail || '',
        customer_phone: customerPhone || '',
        package_name: `${creditAmount} Credits Top-up`,
        package_credits: creditAmount.toString(),
        credit_amount: creditAmount.toString(),
        account_destination: process.env.HTK_STRIPE_ACCOUNT_ID || '',
        payment_type: 'credit_topup'
      },
      success_url: successUrl || `${process.env.VITE_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true&credits=${creditAmount}`,
      cancel_url: cancelUrl || `${process.env.VITE_APP_URL}/credits?cancelled=true`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      automatic_tax: {
        enabled: true,
      },
      payment_intent_data: {
        metadata: {
          customer_name: customerName || '',
          customer_email: customerEmail || '',
          customer_phone: customerPhone || '',
          package_name: `${creditAmount} Credits Top-up`,
          package_credits: creditAmount.toString(),
          account_destination: process.env.HTK_STRIPE_ACCOUNT_ID || '',
          payment_type: 'credit_topup'
        }
      }
    });

    console.log('Created credit checkout session:', session.id, `for ${creditAmount} credits`);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sessionId: session.id,
        url: session.url,
        creditAmount: creditAmount,
        totalAmount: creditAmount // £1 = 1 credit
      })
    };

  } catch (error) {
    console.error('Error creating credit checkout session:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: 'Failed to create checkout session',
        details: error.message
      })
    };
  }
};
