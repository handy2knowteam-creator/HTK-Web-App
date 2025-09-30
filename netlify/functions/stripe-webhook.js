const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const sig = event.headers['stripe-signature'];
  let evt;
  try {
    evt = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook verify failed:', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  try {
    switch (evt.type) {
      case 'checkout.session.completed': {
        const session = evt.data.object;
        console.log('checkout.session.completed', {
          sessionId: session.id,
          email: session.customer_details?.email
        });
        break;
      }
      case 'invoice.payment_succeeded': {
        const invoice = evt.data.object;
        console.log('invoice.payment_succeeded', {
          customer: invoice.customer,
          amountPaid: invoice.amount_paid
        });
        break;
      }
      default:
        console.log('Unhandled event', evt.type);
    }
    return { statusCode: 200, body: 'ok' };
  } catch (e) {
    console.error('Handler error', e);
    return { statusCode: 500, body: 'server error' };
  }
};
