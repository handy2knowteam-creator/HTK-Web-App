// Netlify Function for Stripe Webhook Processing
// Handles successful payments and updates user credits

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const sig = event.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Webhook Error: ${err.message}` })
    };
  }

  console.log('Received Stripe webhook event:', stripeEvent.type);

  // Handle the event
  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        const session = stripeEvent.data.object;
        await handleCheckoutSessionCompleted(session);
        break;
        
      case 'payment_intent.succeeded':
        const paymentIntent = stripeEvent.data.object;
        await handleSuccessfulPayment(paymentIntent);
        break;
        
      case 'payment_intent.payment_failed':
        const failedPayment = stripeEvent.data.object;
        await handleFailedPayment(failedPayment);
        break;
        
      case 'invoice.payment_succeeded':
        const invoice = stripeEvent.data.object;
        await handleSubscriptionPayment(invoice);
        break;
        
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = stripeEvent.data.object;
        await handleSubscriptionChange(subscription);
        break;
        
      case 'customer.subscription.deleted':
        const deletedSubscription = stripeEvent.data.object;
        await handleSubscriptionCancellation(deletedSubscription);
        break;
        
      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
    };
  } catch (error) {
    console.error('Error processing webhook:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

async function handleCheckoutSessionCompleted(session) {
  try {
    console.log('✅ CHECKOUT SESSION COMPLETED:');
    console.log(`Session ID: ${session.id}`);
    console.log(`Customer Email: ${session.customer_details?.email}`);
    console.log(`Amount Total: £${(session.amount_total / 100).toFixed(2)}`);
    console.log(`Payment Status: ${session.payment_status}`);

    // Extract metadata
    const metadata = session.metadata || {};
    console.log('Session Metadata:', metadata);

    // Here you would typically:
    // 1. Update user credits in your database
    // 2. Send confirmation email to customer
    // 3. Log the transaction
    // 4. Update admin dashboard

    const transactionRecord = {
      id: session.id,
      type: 'checkout_session',
      customer: {
        email: session.customer_details?.email,
        name: session.customer_details?.name
      },
      amount: session.amount_total / 100,
      currency: session.currency,
      status: 'completed',
      timestamp: new Date().toISOString(),
      metadata: metadata
    };

    console.log('Transaction Record:', JSON.stringify(transactionRecord, null, 2));

  } catch (error) {
    console.error('Error handling checkout session:', error);
  }
}

async function handleSuccessfulPayment(paymentIntent) {
  try {
    const metadata = paymentIntent.metadata || {};
    
    console.log('✅ SUCCESSFUL PAYMENT:');
    console.log(`Payment ID: ${paymentIntent.id}`);
    console.log(`Amount: £${(paymentIntent.amount / 100).toFixed(2)}`);
    console.log(`Customer: ${metadata.customer_name || 'Unknown'} (${metadata.customer_email || 'Unknown'})`);
    console.log(`Package: ${metadata.package_name || 'Unknown'} (${metadata.package_credits || 'Unknown'} credits)`);

    // Verify payment went to your account
    if (metadata.account_destination && metadata.account_destination !== process.env.HTK_STRIPE_ACCOUNT_ID) {
      console.error('Payment did not go to correct account!');
      return;
    }

    const paymentRecord = {
      id: paymentIntent.id,
      type: 'payment_intent',
      customer: {
        name: metadata.customer_name,
        email: metadata.customer_email,
        phone: metadata.customer_phone
      },
      package: {
        name: metadata.package_name,
        credits: parseInt(metadata.package_credits) || 0
      },
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      status: 'completed',
      timestamp: new Date().toISOString(),
      stripe_account: metadata.account_destination
    };

    console.log('Payment Record:', JSON.stringify(paymentRecord, null, 2));

    // Send confirmation email
    await sendPaymentConfirmationEmail(paymentRecord);

  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

async function handleFailedPayment(paymentIntent) {
  try {
    const metadata = paymentIntent.metadata || {};

    console.log('❌ FAILED PAYMENT:');
    console.log(`Payment ID: ${paymentIntent.id}`);
    console.log(`Customer: ${metadata.customer_name || 'Unknown'} (${metadata.customer_email || 'Unknown'})`);
    console.log(`Package: ${metadata.package_name || 'Unknown'}`);
    console.log(`Failure Reason: ${paymentIntent.last_payment_error?.message || 'Unknown'}`);

    // Log failed payment for admin review
    const failureRecord = {
      id: paymentIntent.id,
      type: 'payment_failure',
      customer: {
        name: metadata.customer_name,
        email: metadata.customer_email
      },
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      failure_reason: paymentIntent.last_payment_error?.message,
      timestamp: new Date().toISOString()
    };

    console.log('Failure Record:', JSON.stringify(failureRecord, null, 2));

  } catch (error) {
    console.error('Error handling failed payment:', error);
  }
}

async function handleSubscriptionPayment(invoice) {
  try {
    console.log('💳 SUBSCRIPTION PAYMENT:');
    console.log(`Invoice ID: ${invoice.id}`);
    console.log(`Customer: ${invoice.customer_email}`);
    console.log(`Amount: £${(invoice.amount_paid / 100).toFixed(2)}`);
    console.log(`Period: ${new Date(invoice.period_start * 1000).toLocaleDateString()} - ${new Date(invoice.period_end * 1000).toLocaleDateString()}`);

    // Handle subscription credit allocation
    const subscriptionRecord = {
      id: invoice.id,
      type: 'subscription_payment',
      customer_email: invoice.customer_email,
      amount: invoice.amount_paid / 100,
      currency: invoice.currency,
      period_start: new Date(invoice.period_start * 1000).toISOString(),
      period_end: new Date(invoice.period_end * 1000).toISOString(),
      timestamp: new Date().toISOString()
    };

    console.log('Subscription Record:', JSON.stringify(subscriptionRecord, null, 2));

  } catch (error) {
    console.error('Error handling subscription payment:', error);
  }
}

async function handleSubscriptionChange(subscription) {
  try {
    console.log('🔄 SUBSCRIPTION CHANGE:');
    console.log(`Subscription ID: ${subscription.id}`);
    console.log(`Status: ${subscription.status}`);
    console.log(`Current Period: ${new Date(subscription.current_period_start * 1000).toLocaleDateString()} - ${new Date(subscription.current_period_end * 1000).toLocaleDateString()}`);

    // Update user subscription status
    const subscriptionUpdate = {
      id: subscription.id,
      type: 'subscription_change',
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      timestamp: new Date().toISOString()
    };

    console.log('Subscription Update:', JSON.stringify(subscriptionUpdate, null, 2));

  } catch (error) {
    console.error('Error handling subscription change:', error);
  }
}

async function handleSubscriptionCancellation(subscription) {
  try {
    console.log('❌ SUBSCRIPTION CANCELLED:');
    console.log(`Subscription ID: ${subscription.id}`);
    console.log(`Cancelled At: ${new Date(subscription.canceled_at * 1000).toISOString()}`);

    // Handle subscription cancellation
    const cancellationRecord = {
      id: subscription.id,
      type: 'subscription_cancellation',
      cancelled_at: new Date(subscription.canceled_at * 1000).toISOString(),
      timestamp: new Date().toISOString()
    };

    console.log('Cancellation Record:', JSON.stringify(cancellationRecord, null, 2));

  } catch (error) {
    console.error('Error handling subscription cancellation:', error);
  }
}

async function sendPaymentConfirmationEmail(paymentRecord) {
  // This is where you would integrate with your email service
  // For example, using SendGrid, Mailgun, or similar
  
  console.log(`📧 Sending confirmation email to ${paymentRecord.customer.email}`);
  
  // Email content would include:
  // - Payment confirmation
  // - Credits added to account
  // - Receipt details
  // - Next steps for using credits
  
  const emailContent = {
    to: paymentRecord.customer.email,
    subject: `HTK Payment Confirmation - ${paymentRecord.package.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #B9975B;">HTK - Handy To Know</h1>
          <h2 style="color: #fff;">Payment Successful!</h2>
        </div>
        
        <div style="background: #111; padding: 20px; border-radius: 10px; border: 2px solid #B9975B;">
          <p>Dear ${paymentRecord.customer.name},</p>
          <p>Thank you for your purchase of <strong style="color: #B9975B;">${paymentRecord.package.name}</strong>.</p>
          
          <div style="margin: 20px 0; padding: 15px; background: #222; border-radius: 5px;">
            <p><strong>Credits Added:</strong> <span style="color: #B9975B;">${paymentRecord.package.credits}</span></p>
            <p><strong>Amount Paid:</strong> <span style="color: #B9975B;">£${paymentRecord.amount.toFixed(2)}</span></p>
            <p><strong>Payment ID:</strong> ${paymentRecord.id}</p>
          </div>
          
          <p>You can now use your credits to access job leads on the HTK platform.</p>
          <p>Visit <a href="https://handy2know.com/dashboard" style="color: #B9975B;">your dashboard</a> to get started.</p>
          
          <p style="margin-top: 30px;">Best regards,<br><strong style="color: #B9975B;">HTK Team</strong></p>
        </div>
      </div>
    `
  };
  
  console.log('Email Content:', emailContent);
  
  // If you have SendGrid configured, you would send the email here
  // await sendGridMail.send(emailContent);
}
