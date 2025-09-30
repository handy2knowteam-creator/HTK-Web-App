# Netlify Environment Variables Setup

## Required Environment Variables

Create these environment variables in your Netlify dashboard:

### 1. STRIPE_SECRET_KEY
- **Scope:** Functions
- **Secret:** Yes (check the secret checkbox)
- **Deploy contexts:** Same value for all
- **Value:** `sk_test_...` or `sk_live_...` (from Stripe Dashboard → Developers → API Keys)

### 2. STRIPE_PUBLISHABLE_KEY  
- **Scope:** Builds
- **Secret:** No (leave unchecked)
- **Deploy contexts:** Same value for all
- **Value:** `pk_test_...` or `pk_live_...` (from Stripe Dashboard → Developers → API Keys)

### 3. STRIPE_WEBHOOK_SECRET
- **Scope:** Functions  
- **Secret:** Yes (check the secret checkbox)
- **Deploy contexts:** Same value for all
- **Value:** `whsec_...` (from Stripe Dashboard → Webhooks → Your webhook endpoint)

## How to Add in Netlify

1. Go to your site in Netlify dashboard
2. Click **Site settings**
3. Click **Environment variables** in the sidebar
4. Click **Add variable** for each one above
5. Fill in the key name, value, and scope as specified
6. Check "Same value for all deploy contexts"
7. Check "Secret" for the secret keys only

## Netlify Functions Created

- `netlify/functions/create-checkout-session.js` - Creates Stripe checkout sessions
- `netlify/functions/stripe-webhook.js` - Handles Stripe webhook events

## Webhook Endpoint URL

Set this URL in your Stripe Dashboard → Webhooks:
```
https://your-site-name.netlify.app/.netlify/functions/stripe-webhook
```

## Events to Listen For

In Stripe webhook settings, select these events:
- `checkout.session.completed`
- `invoice.payment_succeeded`
