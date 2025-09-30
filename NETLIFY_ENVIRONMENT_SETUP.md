# Netlify Environment Variables Setup Guide

## 🔧 Required Environment Variables

You need to add these **3 essential variables** to your Netlify dashboard:

### 1. STRIPE_WEBHOOK_SECRET
```
STRIPE_WEBHOOK_SECRET = <the secret you copied from Stripe>
```

### 2. STRIPE_SECRET_KEY  
```
STRIPE_SECRET_KEY = sk_test_your_secret_key_here
```

### 3. VITE_STRIPE_PUBLISHABLE_KEY
```
VITE_STRIPE_PUBLISHABLE_KEY = pk_test_your_publishable_key_here
```

## 📍 Step-by-Step Instructions

### Step 1: Access Your Netlify Dashboard
1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Log in to your account
3. Find your HTK website (handy2know.com)
4. Click on the site name to open it

### Step 2: Navigate to Environment Variables
1. In your site dashboard, click **"Site settings"** (usually in the top navigation)
2. In the left sidebar, click **"Environment variables"**
3. You'll see a page titled "Environment variables"

### Step 3: Add Each Variable
For each of the 3 variables above:

1. Click **"Add variable"** button
2. **Key:** Enter the variable name (e.g., `STRIPE_WEBHOOK_SECRET`)
3. **Value:** Enter the actual value (e.g., your webhook secret)
4. **Scopes:** Leave as "All scopes" (default)
5. Click **"Create variable"**

### Step 4: Add Optional Price ID Variables
If you have created Stripe subscription products, also add:

```
VITE_STRIPE_BRONZE_PRICE_ID = price_your_bronze_price_id
VITE_STRIPE_SILVER_PRICE_ID = price_your_silver_price_id  
VITE_STRIPE_GOLD_PRICE_ID = price_your_gold_price_id
```

### Step 5: Add Platform Configuration
```
HTK_STRIPE_ACCOUNT_ID = acct_1S7CKwGFrHVFmHVw
HTK_DOMAIN = handy2know.com
VITE_APP_URL = https://handy2know.com
VITE_WEBHOOK_URL = https://handy2know.com/.netlify/functions/stripe-webhook
```

## ✅ Verification Checklist

After adding all variables, you should see:

- ✅ STRIPE_WEBHOOK_SECRET
- ✅ STRIPE_SECRET_KEY  
- ✅ VITE_STRIPE_PUBLISHABLE_KEY
- ✅ HTK_STRIPE_ACCOUNT_ID
- ✅ HTK_DOMAIN
- ✅ VITE_APP_URL
- ✅ VITE_WEBHOOK_URL

## 🚀 Deploy After Setup

Once all environment variables are added:

1. Go back to your site's main dashboard
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait for the build to complete
4. Your Stripe integration should now work!

## 🔍 Troubleshooting

### If the site still shows black screens:
1. Check the **"Functions"** tab in Netlify for any errors
2. Verify all environment variables are spelled correctly
3. Make sure there are no extra spaces in the values
4. Redeploy the site after adding variables

### If payments don't work:
1. Check browser console for Stripe errors
2. Verify webhook URL is accessible: `https://handy2know.com/.netlify/functions/stripe-webhook`
3. Test webhook in Stripe dashboard

## 📞 Need Help?

If you get stuck:
1. Double-check all variable names match exactly
2. Ensure no trailing spaces in values
3. Try redeploying after adding variables
4. Check Netlify build logs for any errors

---

**Next Step:** After adding these variables, trigger a new deployment and test the payment system!
