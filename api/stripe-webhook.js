// Netlify Function for Stripe Webhook Processing
// Handles successful payments and updates user credits

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  const sig = event.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`
    };
  }

  // Handle the event
  switch (stripeEvent.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = stripeEvent.data.object;
      await handleSuccessfulPayment(paymentIntent);
      break;
      
    case 'payment_intent.payment_failed':
      const failedPayment = stripeEvent.data.object;
      await handleFailedPayment(failedPayment);
      break;
      
    default:
      console.log(`Unhandled event type ${stripeEvent.type}`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true })
  };
};

async function handleSuccessfulPayment(paymentIntent) {
  try {
    const {
      customer_name,
      customer_email,
      customer_phone,
      package_name,
      package_credits,
      account_destination
    } = paymentIntent.metadata;

    // Verify payment went to your account
    if (account_destination !== 'acct_1S7CKwGFrHVFmHVw') {
      console.error('Payment did not go to correct account!');
      return;
    }

    console.log('✅ SUCCESSFUL PAYMENT TO YOUR ACCOUNT:');
    console.log(`Payment ID: ${paymentIntent.id}`);
    console.log(`Amount: £${(paymentIntent.amount / 100).toFixed(2)}`);
    console.log(`Customer: ${customer_name} (${customer_email})`);
    console.log(`Package: ${package_name} (${package_credits} credits)`);
    console.log(`Account: ${account_destination}`);

    // Here you would typically:
    // 1. Update user credits in your database
    // 2. Send confirmation email to customer
    // 3. Log the transaction
    // 4. Update admin dashboard

    // For now, we'll log the successful payment
    const paymentRecord = {
      id: paymentIntent.id,
      customer: {
        name: customer_name,
        email: customer_email,
        phone: customer_phone
      },
      package: {
        name: package_name,
        credits: parseInt(package_credits)
      },
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      status: 'completed',
      timestamp: new Date().toISOString(),
      stripe_account: account_destination
    };

    // In a real application, you would save this to your database
    console.log('Payment Record:', JSON.stringify(paymentRecord, null, 2));

    // Send confirmation email (you would implement this)
    await sendPaymentConfirmationEmail(paymentRecord);

  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

async function handleFailedPayment(paymentIntent) {
  try {
    const {
      customer_name,
      customer_email,
      package_name
    } = paymentIntent.metadata;

    console.log('❌ FAILED PAYMENT:');
    console.log(`Payment ID: ${paymentIntent.id}`);
    console.log(`Customer: ${customer_name} (${customer_email})`);
    console.log(`Package: ${package_name}`);
    console.log(`Failure Reason: ${paymentIntent.last_payment_error?.message || 'Unknown'}`);

    // Here you would typically:
    // 1. Log the failed payment
    // 2. Send failure notification email
    // 3. Update admin dashboard

  } catch (error) {
    console.error('Error handling failed payment:', error);
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
  
  // Example email content:
  const emailContent = {
    to: paymentRecord.customer.email,
    subject: `HTK Payment Confirmation - ${paymentRecord.package.name}`,
    html: `
      <h2>Payment Successful!</h2>
      <p>Dear ${paymentRecord.customer.name},</p>
      <p>Thank you for your purchase of ${paymentRecord.package.name}.</p>
      <p><strong>Credits Added:</strong> ${paymentRecord.package.credits}</p>
      <p><strong>Amount Paid:</strong> £${paymentRecord.amount.toFixed(2)}</p>
      <p><strong>Payment ID:</strong> ${paymentRecord.id}</p>
      <p>You can now use your credits to access job leads on the HTK platform.</p>
      <p>Best regards,<br>HTK Team</p>
    `
  };
  
  // You would send this email using your preferred email service
  console.log('Email Content:', emailContent);
}
