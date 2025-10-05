#!/usr/bin/env node

// Script to help deploy GiftEase immediately
import { execSync } from 'child_process';
import { platform } from 'os';

console.log('🚀 Deploying GiftEase Immediately...');
console.log('=====================================');

// Ensure we have the latest build
console.log('🏗️  Building the latest version...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

console.log('\n🌐 Opening Netlify Drop page...');
console.log('Please follow these steps:');
console.log('1. When the browser opens, navigate to https://app.netlify.com/drop');
console.log('2. Drag and drop the "dist" folder from your project');
console.log('3. Netlify will automatically deploy your site');
console.log('4. You\'ll get a live URL immediately');

// Open browser based on OS
const os = platform();
try {
  if (os === 'win32') {
    execSync('start https://app.netlify.com/drop', { stdio: 'ignore' });
  } else if (os === 'darwin') {
    execSync('open https://app.netlify.com/drop', { stdio: 'ignore' });
  } else {
    execSync('xdg-open https://app.netlify.com/drop', { stdio: 'ignore' });
  }
  console.log('✅ Browser opened successfully!');
} catch (error) {
  console.log('⚠️  Could not open browser automatically. Please visit https://app.netlify.com/drop manually');
}

console.log('\n📂 Please locate your "dist" folder at:');
console.log(`   ${process.cwd()}\\dist`);
console.log('\n✨ Your updated GiftEase website will be live within minutes!');