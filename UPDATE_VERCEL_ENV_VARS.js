#!/usr/bin/env node

/**
 * Update Vercel Environment Variables for GiftEase
 * This script provides instructions for updating Vercel environment variables
 */

console.log('========================================');
console.log('  Update Vercel Environment Variables');
console.log('========================================');
console.log('');

console.log('To complete your permanent deployment, you need to update your Vercel environment variables.');
console.log('');

console.log('Steps to update Vercel environment variables:');
console.log('');
console.log('1. Go to your Vercel dashboard:');
console.log('   https://vercel.com/dashboard');
console.log('');
console.log('2. Find your "gift-ease" project and click on it');
console.log('');
console.log('3. Click "Settings" in the project dashboard');
console.log('');
console.log('4. Click "Environment Variables" in the left sidebar');
console.log('');
console.log('5. Add these two environment variables:');
console.log('   (Replace the URL with your actual Railway backend URL)');
console.log('');
console.log('   Name: REACT_APP_API_URL');
console.log('   Value: https://your-railway-backend-url.up.railway.app');
console.log('');
console.log('   Name: VITE_API_URL');
console.log('   Value: https://your-railway-backend-url.up.railway.app');
console.log('');
console.log('6. Click "Save" after adding each variable');
console.log('');
console.log('7. Go back to the project dashboard');
console.log('');
console.log('8. Click "Deployments" tab');
console.log('');
console.log('9. Click the "Redeploy" button for the latest deployment');
console.log('');
console.log('10. Wait for redeployment to complete (usually 1-2 minutes)');
console.log('');
console.log('After redeployment, your GiftEase application at');
console.log('https://gift-ease-sand.vercel.app/ should be fully functional!');
console.log('');
console.log('If you encounter any issues:');
console.log('- Check Railway logs for backend errors');
console.log('- Verify all environment variables are set correctly');
console.log('- Ensure your MongoDB connection is working');