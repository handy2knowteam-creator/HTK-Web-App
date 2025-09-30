# HTK Complete Stripe Integration Code Package

## 🚀 Quick Setup Summary

### 1. Environment Variables (Add to Netlify)
```bash
# Required Stripe Keys
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Subscription Price IDs (create in Stripe Dashboard)
VITE_STRIPE_BRONZE_PRICE_ID=price_bronze_subscription_id
VITE_STRIPE_SILVER_PRICE_ID=price_silver_subscription_id
VITE_STRIPE_GOLD_PRICE_ID=price_gold_subscription_id

# Platform Configuration
HTK_STRIPE_ACCOUNT_ID=acct_1S7CKwGFrHVFmHVw
HTK_DOMAIN=handy2know.com
VITE_APP_URL=https://handy2know.com
VITE_WEBHOOK_URL=https://handy2know.com/.netlify/functions/stripe-webhook
```

### 2. Package.json Dependencies
Add to your package.json:
```json
{
  "dependencies": {
    "@stripe/react-stripe-js": "^4.0.2",
    "@stripe/stripe-js": "^7.9.0",
    "stripe": "^7.63.1",
    "date-fns": "^3.6.0"
  }
}
```

### 3. Stripe Webhook Setup
- **URL:** `https://handy2know.com/.netlify/functions/stripe-webhook`
- **Events:** `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`, `invoice.payment_succeeded`, `customer.subscription.*`

## 📁 File Structure

```
netlify/functions/
├── stripe-webhook.js
├── create-subscription-checkout.js
└── create-credit-checkout.js

src/components/
├── StripePaymentIntegrated.jsx
├── SubscriptionManager.jsx (updated)
├── PaymentErrorHandler.jsx
└── PaymentTestSuite.jsx
```

## 🔧 Key Features Implemented

### ✅ Subscription Tiers
- **Bronze:** £9.99/month = 10 credits
- **Silver:** £49.99/month = 70 credits  
- **Gold:** £99.99/month = 160 credits

### ✅ Pay-as-you-go Credits
- **Pricing:** £1 = 1 credit
- **Range:** £3-£100 job leads
- **No expiry** (except free trial)

### ✅ Payment Processing
- Secure Stripe Checkout
- Webhook notifications
- Error handling
- Success confirmations

### ✅ Environment Integration
- All keys from environment variables
- Price IDs configurable
- Webhook endpoint automated

## 🧪 Testing

### Test Cards
- **Success:** `4242 4242 4242 4242`
- **Declined:** `4000 0000 0000 0002`
- **3D Secure:** `4000 0025 0000 3155`

### Test Suite
Access `/test-payments` to run comprehensive tests:
- Environment variables check
- Stripe key validation
- Netlify functions test
- Webhook endpoint verification

## 🚀 Deployment Steps

1. **Add Environment Variables to Netlify**
2. **Create Stripe Products & Copy Price IDs**
3. **Set up Webhook Endpoint**
4. **Deploy Application**
5. **Test Payment Flow**

## 📞 Support

- Black screen issues = Missing environment variables
- Payment failures = Check Stripe keys and Price IDs
- Webhook failures = Verify endpoint URL and secret

---

**Status:** ✅ Complete Stripe Integration Ready for Production
