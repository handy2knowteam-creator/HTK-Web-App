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
    const { priceId, quantity = 1, mode = 'subscription', successUrl, cancelUrl } = JSON.parse(event.body);

    // Validate required parameters
    if (!priceId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Price ID is required' })
      };
    }

    if (!successUrl || !cancelUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Success URL and Cancel URL are required' })
      };
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: quantity,
        },
      ],
      mode: mode, // 'subscription' or 'payment'
      success_url: successUrl,
      cancel_url: cancelUrl,
      automatic_tax: { enabled: true },
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        sessionId: session.id,
        url: session.url
      })
    };

  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        error: 'Failed to create checkout session',
        message: error.message
      })
    };
  }
};
