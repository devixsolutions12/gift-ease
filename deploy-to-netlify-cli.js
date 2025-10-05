#!/usr/bin/env node

// Script to deploy GiftEase to Netlify using Netlify CLI
import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Deploying GiftEase to Netlify...');
console.log('================================');

// Check if Netlify CLI is installed
try {
  execSync('netlify --version', { stdio: 'ignore' });
  console.log('✅ Netlify CLI is installed');
} catch (error) {
  console.log('⚠️  Netlify CLI not found. Installing...');
  try {
    execSync('npm install -g netlify-cli', { stdio: 'inherit' });
    console.log('✅ Netlify CLI installed successfully');
  } catch (installError) {
    console.error('❌ Failed to install Netlify CLI:', installError.message);
    console.log('Please install Netlify CLI manually:');
    console.log('npm install -g netlify-cli');
    process.exit(1);
  }
}

// Build the project
console.log('🏗️  Building the project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Check if dist directory exists
if (!fs.existsSync('dist')) {
  console.error('❌ Dist directory not found. Build may have failed.');
  process.exit(1);
}

console.log('\n📋 To deploy to Netlify:');
console.log('1. Run: netlify login (if not already logged in)');
console.log('2. Run: netlify init (to initialize a new site)');
console.log('3. Run: netlify deploy --prod (to deploy)');

console.log('\n🔧 Alternative deployment methods:');
console.log('1. Drag and drop the "dist" folder to https://app.netlify.com/drop');
console.log('2. Use Netlify CLI:');
console.log('   netlify deploy --prod --dir=dist');

console.log('\n✨ Your GiftEase application is ready for Netlify deployment!');