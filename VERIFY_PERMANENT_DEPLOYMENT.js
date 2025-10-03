#!/usr/bin/env node

/**
 * Verify Permanent Deployment for GiftEase
 * This script helps verify that your permanent deployment is working
 */

console.log('========================================');
console.log('  Verify Permanent Deployment');
console.log('========================================');
console.log('');

console.log('To verify your permanent deployment is working:');
console.log('');

console.log('1. Visit your GiftEase application:');
console.log('   https://gift-ease-sand.vercel.app/');
console.log('');

console.log('2. Test account functionality:');
console.log('   - Click "Login" in the top right');
console.log('   - Click "Register" to create a new account');
console.log('   - Fill in the registration form');
console.log('   - Click "Register"');
console.log('   - You should see a success message');
console.log('');

console.log('3. Test login functionality:');
console.log('   - After registration, you should be logged in automatically');
console.log('   - Or click "Login" and enter your credentials');
console.log('   - You should be redirected to the homepage');
console.log('');

console.log('4. Test account features:');
console.log('   - Click "Account" in the navigation');
console.log('   - You should see your profile information');
console.log('   - You should be able to view order history');
console.log('   - You should be able to change password');
console.log('');

console.log('5. Test order functionality:');
console.log('   - Browse gift cards');
console.log('   - Add to cart and checkout');
console.log('   - Submit payment information');
console.log('   - View order in "Your Orders"');
console.log('');

console.log('✅ If all these features work, your deployment is successful!');
console.log('');

console.log('❌ If you encounter issues:');
console.log('');
console.log('Common problems and solutions:');
console.log('');
console.log('1. "Unable to connect to server" errors:');
console.log('   - Check Railway backend logs');
console.log('   - Verify environment variables in Railway');
console.log('   - Ensure MongoDB connection string is correct');
console.log('');
console.log('2. Account creation fails:');
console.log('   - Check MongoDB Atlas connection');
console.log('   - Verify JWT_SECRET in Railway');
console.log('   - Check for duplicate email addresses');
console.log('');
console.log('3. Login fails:');
console.log('   - Verify email and password');
console.log('   - Check if account was created successfully');
console.log('   - Ensure backend is running');
console.log('');
console.log('4. Orders not showing:');
console.log('   - Check database connection');
console.log('   - Verify user authentication');
console.log('   - Check Railway logs for errors');
console.log('');
console.log('For detailed troubleshooting, refer to PERMANENT_DEPLOYMENT_GUIDE.md');