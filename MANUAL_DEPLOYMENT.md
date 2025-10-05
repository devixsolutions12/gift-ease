# Manual Vercel Deployment Instructions

## Step 1: Prepare Your Project

1. Make sure you're in the frontend directory:
   ```
   cd gift-ease-frontend
   ```

2. Build the project:
   ```
   npm run build
   ```

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI (if you have access)

1. Install Vercel CLI (if not already installed):
   ```
   npm install -g vercel
   ```

2. Login to Vercel:
   ```
   vercel login
   ```

3. Deploy:
   ```
   vercel --prod
   ```

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your GitHub repository (or upload files manually)
4. Configure the project:
   - Framework: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Click "Deploy"

### Option C: Direct Upload

1. Build your project:
   ```
   npm run build
   ```

2. Go to https://vercel.com/dashboard
3. Click "New Project"
4. Select "Other" as framework
5. Upload the `dist` folder directly

## Step 3: Verify Deployment

After deployment is complete:

1. Visit your deployed URL
2. Navigate to `/admin/login`
3. Use credentials:
   - Username: `admin`
   - Password: `password`

## Troubleshooting

### If you see a blank page:

1. Check browser console for errors
2. Verify asset paths in `dist/index.html` start with `/` (not `./`)
3. Ensure `vite.config.js` has `base: '/'`

### If admin login doesn't work:

1. Check that AuthContext is properly configured
2. Verify ProtectedRoute component is working
3. Check browser console for authentication errors

## Important Notes

- The deployment limit should reset in 14 hours
- Make sure to change the default admin credentials after first login
- The admin panel should work correctly with absolute asset paths