# HTK Stripe Integration Setup Guide

## 🔧 Environment Variables Setup

### Step 1: Netlify Environment Variables

Go to your Netlify dashboard and add these environment variables:

**Site Settings → Environment Variables → Add Variable**

```bash
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Stripe Price IDs (create these in your Stripe dashboard)
VITE_STRIPE_BRONZE_PRICE_ID=price_bronze_subscription_id
VITE_STRIPE_SILVER_PRICE_ID=price_silver_subscription_id
VITE_STRIPE_GOLD_PRICE_ID=price_gold_subscription_id

# Platform Configuration
HTK_STRIPE_ACCOUNT_ID=acct_1S7CKwGFrHVFmHVw
HTK_DOMAIN=handy2know.com
VITE_APP_URL=https://handy2know.com
VITE_WEBHOOK_URL=https://handy2know.com/.netlify/functions/stripe-webhook
```

### Step 2: Create Stripe Products & Prices

In your Stripe Dashboard, create these products:

#### Bronze Subscription
- **Name:** HTK Bronze Subscription
- **Price:** £9.99/month
- **Billing:** Recurring monthly
- **Copy the Price ID** → Use as `VITE_STRIPE_BRONZE_PRICE_ID`

#### Silver Subscription  
- **Name:** HTK Silver Subscription
- **Price:** £49.99/month
- **Billing:** Recurring monthly
- **Copy the Price ID** → Use as `VITE_STRIPE_SILVER_PRICE_ID`

#### Gold Subscription
- **Name:** HTK Gold Subscription
- **Price:** £99.99/month
- **Billing:** Recurring monthly
- **Copy the Price ID** → Use as `VITE_STRIPE_GOLD_PRICE_ID`

### Step 3: Configure Stripe Webhook

1. **Go to Stripe Dashboard → Webhooks**
2. **Click "Add endpoint"**
3. **Endpoint URL:** `https://handy2know.com/.netlify/functions/stripe-webhook`
4. **Select events to listen to:**
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `invoice.payment_succeeded`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

5. **Copy the Webhook Signing Secret** → Use as `STRIPE_WEBHOOK_SECRET`

## 🚀 Deployment Process

### Step 1: Update Environment Variables
1. Add all Stripe keys to Netlify environment variables
2. Make sure webhook URL points to your live domain

### Step 2: Deploy Application
```bash
# Build and deploy
npm run build
git add .
git commit -m "Add Stripe integration"
git push origin main
```

### Step 3: Test Webhook
1. Go to Stripe Dashboard → Webhooks
2. Click on your webhook endpoint
3. Click "Send test webhook"
4. Check Netlify Functions logs for successful processing

## 🧪 Testing

### Test Credit Purchase
1. Visit: `https://handy2know.com/credits`
2. Enter credit amount (e.g., 10 credits = £10)
3. Complete test payment with card: `4242 4242 4242 4242`
4. Check webhook logs in Netlify Functions

### Test Subscription
1. Visit: `https://handy2know.com/subscription`
2. Select a subscription tier
3. Complete test payment
4. Verify subscription created in Stripe Dashboard

## 🔍 Troubleshooting

### Black Screen Issues
- **Cause:** Missing environment variables
- **Fix:** Ensure all `VITE_` prefixed variables are set in Netlify
- **Check:** Netlify build logs for missing environment variables

### Webhook Failures
- **Cause:** Incorrect webhook secret or URL
- **Fix:** Verify webhook URL matches deployed function
- **Check:** Stripe webhook logs for delivery attempts

### Payment Failures
- **Cause:** Incorrect Price IDs or missing Stripe keys
- **Fix:** Verify all Price IDs match your Stripe products
- **Check:** Browser console for Stripe errors

## 📊 Monitoring

### Netlify Functions Logs
- Go to Netlify Dashboard → Functions
- Click on `stripe-webhook` function
- View real-time logs

### Stripe Dashboard
- Monitor payments in Stripe Dashboard
- Check webhook delivery status
- Review customer subscriptions

## 🔒 Security Notes

1. **Never commit Stripe keys to git**
2. **Use test keys for development**
3. **Switch to live keys for production**
4. **Webhook secret must match Stripe configuration**
5. **All sensitive data stored in Netlify environment variables**

## 📞 Support

If you encounter issues:
1. Check Netlify build logs
2. Review Stripe webhook logs  
3. Verify all environment variables are set
4. Test with Stripe test cards first

---

**Next Steps:**
1. ✅ Set up environment variables in Netlify
2. ✅ Create Stripe products and copy Price IDs
3. ✅ Configure webhook endpoint
4. ✅ Deploy and test payment flow
