# Vercel Deployment Guide

## Prerequisites
- Vercel account (https://vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### 1. Prepare Your Repository
```bash
# Navigate to the Client directory
cd Client

# Install dependencies
npm install

# Test build locally
npm run build
```

### 2. Deploy to Vercel

#### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from Client directory
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? your-ecommerce-app
# - Directory? ./
# - Override settings? No
```

#### Option B: Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your Git repository
4. Set Root Directory to `Client`
5. Framework Preset: Next.js
6. Click "Deploy"

### 3. Environment Variables
Add these in Vercel Dashboard → Project → Settings → Environment Variables:

```
BACKEND_URL=https://your-backend-url.com (optional)
AUTH_KEY=your-production-jwt-key (optional)
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
NEXT_PUBLIC_DOMAIN=your-app.vercel.app
```

### 4. Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

## Current Configuration

### ✅ Ready for Deployment
- **Data Source**: Placeholder data (no backend required)
- **Images**: Optimized with Next.js Image component
- **Styling**: Tailwind CSS (fully compatible)
- **Build**: Optimized for production

### 🔧 Build Settings
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node Version**: 18.x

### 📱 Features Included
- Responsive design
- Product catalog with placeholder data
- Shopping cart functionality
- User authentication UI
- Chat assistant interface
- SEO optimized

## Post-Deployment

### Performance Optimization
- Images are automatically optimized by Vercel
- Static assets are served from CDN
- Automatic HTTPS enabled

### Monitoring
- Check deployment logs in Vercel dashboard
- Monitor performance with Vercel Analytics
- Set up error tracking if needed

## Troubleshooting

### Common Issues
1. **Build Errors**: Check Node.js version compatibility
2. **Image Loading**: Verify image domains in next.config.mjs
3. **Environment Variables**: Ensure all required vars are set
4. **API Calls**: Currently disabled, using placeholder data

### Support
- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs