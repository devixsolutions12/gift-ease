# GiftEase Deployment Guide

## Automated Deployment

To automatically deploy the application to Vercel, run:

```bash
node auto-deploy.cjs
```

This script will:
1. Verify the build (and build if necessary)
2. Install Vercel CLI if not present
3. Check login status and prompt for login if needed
4. Deploy to Vercel production environment

## Manual Deployment

If you prefer to deploy manually:

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Build the application
```bash
npm run build
```

### 4. Deploy
```bash
vercel --prod
```

## Admin Panel Access

After deployment, you can access the admin panel at:
```
https://your-domain.vercel.app/admin/login
```

Use the following credentials for demo purposes:
- **Username**: admin
- **Password**: password

⚠️ **Important**: For security, please change the default admin password after first login!

## Troubleshooting

### Blank Page Issues
If you encounter blank pages, ensure:
1. The `base` property in `vite.config.js` is set to `'/'`
2. The Vercel configuration includes SPA routing rules
3. All asset paths in `dist/index.html` are absolute (starting with `/`)

### Admin Panel Not Working
If the admin panel doesn't work:
1. Check browser console for errors
2. Verify that AuthContext is properly configured
3. Ensure ProtectedRoute is correctly implemented

## Security Notes

For production use:
1. Change the default admin credentials
2. Implement proper JWT token security
3. Add rate limiting for login attempts
4. Use HTTPS for all connections