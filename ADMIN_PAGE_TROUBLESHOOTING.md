# Admin Page Troubleshooting Guide

If you're seeing "Page Not Found" when trying to access the admin page, here are several steps to diagnose and fix the issue:

## 1. Check the URL

Make sure you're using the correct URL:
- Admin Login: `/admin/login`
- Admin Dashboard: `/admin/dashboard`

## 2. Verify Local Development

First, test locally to make sure the routes work:

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Visit these URLs in your browser:
   - http://localhost:3000/admin/login
   - http://localhost:3000/admin/dashboard
   - http://localhost:3000/admin/debug
   - http://localhost:3000/routing-test

## 3. Check Authentication Flow

The admin dashboard is protected and requires authentication:

1. Visit `/admin/login`
2. Use these credentials (for demo purposes):
   - Username: `admin`
   - Password: `password`
3. After successful login, you should be redirected to `/admin/dashboard`

## 4. Debug Authentication

If you're still having issues, visit `/admin/debug` to see authentication status:
- This page shows if you're authenticated
- It shows the admin token status
- It provides buttons to clear authentication and test again

## 5. Common Deployment Issues

### SPA Routing
For SPAs, all routes must be redirected to index.html:
- Vercel: Already configured in vercel.json
- Netlify: Add a `_redirects` file with `/* /index.html 200`
- GitHub Pages: Add a `404.html` that redirects to index.html

### Base Path Issues
If deploying to a subdirectory:
1. Update vite.config.js to set base path
2. Update vercel.json if needed

## 6. Test Routes

Visit `/routing-test` to verify all routes are working:
- This page contains links to all important pages
- Click each link to verify routing works

## 7. Clear Cache and Hard Refresh

Sometimes browser cache can cause issues:
1. Clear browser cache
2. Hard refresh (Ctrl+F5 or Cmd+Shift+R)
3. Try in an incognito/private window

## 8. Check Browser Console

Open browser developer tools (F12):
1. Look for JavaScript errors
2. Check network tab for 404 errors
3. Verify all resources are loading correctly

## 9. Verify Build

Make sure the build includes all routes:
```bash
npm run build
```

Check that the dist folder contains:
- index.html
- JavaScript bundles
- CSS files

## 10. Check Local Storage

The admin authentication uses localStorage:
1. Open browser dev tools
2. Go to Application/Storage tab
3. Check if "adminToken" key exists after login

If you're still experiencing issues after trying these steps, please provide:
1. The exact URL you're trying to access
2. Any error messages in the browser console
3. Screenshots of the issue