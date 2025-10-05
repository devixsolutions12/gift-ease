#!/usr/bin/env node

// Simple Netlify deployment script for GiftEase
import { execSync } from 'child_process';
import { platform } from 'os';

console.log('🚀 Simple Netlify Deployment for GiftEase');
console.log('=====================================');

// Build the project
console.log('🏗️  Building the project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

console.log('\n📋 To deploy to Netlify:');
console.log('Option 1 - Drag & Drop (Easiest):');
console.log('1. Visit https://app.netlify.com/drop');
console.log('2. Drag and drop the "dist" folder from your project');
console.log('3. Your site will be live in seconds!');

console.log('\nOption 2 - Netlify CLI:');
console.log('1. Install Netlify CLI: npm install -g netlify-cli');
console.log('2. Login to Netlify: netlify login');
console.log('3. Deploy: netlify deploy --prod --dir=dist');

console.log('\nOpening Netlify Drop page...');
try {
  // Open browser based on OS
  const os = platform();
  if (os === 'win32') {
    execSync('start https://app.netlify.com/drop', { stdio: 'ignore' });
  } else if (os === 'darwin') {
    execSync('open https://app.netlify.com/drop', { stdio: 'ignore' });
  } else {
    execSync('xdg-open https://app.netlify.com/drop', { stdio: 'ignore' });
  }
  console.log('✅ Browser opened successfully!');
} catch (error) {
  console.log('⚠️  Could not open browser automatically.');
  console.log('Please visit https://app.netlify.com/drop manually');
}

console.log('\n📂 Your "dist" folder is located at:');
console.log(`   ${process.cwd()}\\dist`);

console.log('\n✨ Deployment instructions completed!');