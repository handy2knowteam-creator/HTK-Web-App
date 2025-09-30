# HTK Web Application - Automated Deployment

## Your Domains
- **Primary:** handy2know.com
- **Secondary:** handy2know.co.uk

Both domains will point to the same HTK web application.

## Automated Deployment Pipeline

### How It Works
1. **Build Locally** → Build the React application
2. **Push to GitHub** → Automatically commits and pushes changes
3. **GitHub Actions** → Triggers automated build and deployment
4. **Netlify Deployment** → Deploys to both your domains

### Quick Deployment

To deploy your changes instantly:

```bash
# Run the automated deployment script
./deploy.sh
```

This single command will:
- ✅ Build the application
- ✅ Commit all changes to git
- ✅ Push to GitHub repository
- ✅ Trigger Netlify deployment
- ✅ Deploy to both handy2know.com and handy2know.co.uk

### Manual Deployment Steps

If you prefer manual control:

```bash
# 1. Build the application
npm run build

# 2. Add and commit changes
git add .
git commit -m "HTK update - $(date)"

# 3. Push to GitHub (triggers Netlify)
git push origin main
```

### Netlify Configuration

Your `netlify.toml` is configured for:
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **Domain Redirects:** Both domains properly configured
- **SPA Routing:** All routes redirect to index.html

### GitHub Actions Workflow

The `.github/workflows/deploy-to-netlify.yml` file handles:
- Automated building on every push to main
- Node.js 18 environment setup
- Netlify deployment integration

### Required Netlify Settings

In your Netlify dashboard, ensure you have:

1. **Site Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

2. **Domain Settings:**
   - Primary domain: `handy2know.com`
   - Domain alias: `handy2know.co.uk`

3. **Environment Variables** (if using Netlify secrets):
   - `NETLIFY_AUTH_TOKEN` (for GitHub Actions)
   - `NETLIFY_SITE_ID` (for GitHub Actions)

### Deployment Status

After running `./deploy.sh`, you can check:
- **GitHub:** https://github.com/handy2knowteam-creator/HTK-Web-App/actions
- **Netlify:** https://app.netlify.com (your dashboard)

### Typical Deployment Time
- **Build Time:** 1-2 minutes
- **Deployment Time:** 1-2 minutes
- **Total Time:** 2-4 minutes from push to live

### Troubleshooting

If deployment fails:
1. Check GitHub Actions logs
2. Verify Netlify build logs
3. Ensure all dependencies are in package.json
4. Check for build errors locally first

### Support

For deployment issues:
- Check the GitHub repository actions tab
- Review Netlify deployment logs
- Ensure domains are properly configured in Netlify DNS settings
