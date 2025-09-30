#!/bin/bash

# HTK Deployment Fix Script
# This script resolves common deployment issues

echo "🔧 HTK Deployment Fix Script"
echo "=============================="

# Step 1: Clean node_modules and package-lock
echo "📦 Cleaning dependencies..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

# Step 2: Install dependencies with legacy peer deps
echo "📥 Installing dependencies..."
npm install --legacy-peer-deps

# Step 3: Ensure Stripe is installed
echo "💳 Installing Stripe..."
npm install stripe --legacy-peer-deps

# Step 4: Test build locally
echo "🏗️ Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Step 5: Commit and push changes
    echo "📤 Committing changes..."
    git add .
    git commit -m "Fix deployment issues - add Stripe dependency and resolve conflicts"
    
    echo "🚀 Pushing to GitHub..."
    git push origin main
    
    echo "✅ Deployment fix complete!"
    echo "🌐 Check your Netlify dashboard for the new deployment."
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
