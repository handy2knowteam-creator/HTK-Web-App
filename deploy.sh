#!/bin/bash

# HTK Automated Deployment Script
# This script builds the app and pushes to GitHub, which triggers Netlify deployment

echo "🚀 Starting HTK automated deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the application
echo "🔨 Building HTK application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi

# Add all changes to git
echo "📝 Adding changes to git..."
git add .

# Commit with timestamp
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
git commit -m "HTK deployment update - $TIMESTAMP

- Updated HTK web application
- Fixed navigation and components  
- Ready for handy2know.com and handy2know.co.uk deployment
- Automated deployment via GitHub Actions -> Netlify"

# Push to GitHub (this will trigger Netlify deployment)
echo "🚀 Pushing to GitHub..."
git push origin master

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 Netlify will automatically deploy to:"
    echo "   - handy2know.com"
    echo "   - handy2know.co.uk"
    echo ""
    echo "⏱️  Deployment usually takes 2-3 minutes."
    echo "📊 Check deployment status at: https://app.netlify.com"
else
    echo "❌ Failed to push to GitHub. Please check your git configuration."
    exit 1
fi

echo "🎉 Deployment process initiated successfully!"
