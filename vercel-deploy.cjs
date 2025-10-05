#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Deploying to Vercel...');

// Check if Vercel CLI is installed
try {
  execSync('vercel --version', { stdio: 'pipe' });
  console.log('✅ Vercel CLI is installed');
} catch (error) {
  console.log('ℹ️  Installing Vercel CLI...');
  try {
    execSync('npm install -g vercel', { stdio: 'inherit' });
    console.log('✅ Vercel CLI installed successfully');
  } catch (installError) {
    console.error('❌ Failed to install Vercel CLI. Please install it manually:');
    console.error('   npm install -g vercel');
    process.exit(1);
  }
}

// Deploy to Vercel
try {
  console.log('🚀 Deploying to Vercel...');
  // Check if we're already logged in
  try {
    execSync('vercel whoami', { stdio: 'pipe' });
    console.log('✅ Already logged in to Vercel');
  } catch (error) {
    console.log('ℹ️  Please log in to Vercel:');
    console.log('   Run: vercel login');
    console.log('   Then run this script again');
    process.exit(1);
  }

  // Deploy
  console.log('📦 Deploying application...');
  execSync('vercel --prod --confirm', { stdio: 'inherit' });
  console.log('✅ Deployment completed successfully!');
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  console.log('\n📋 Manual deployment instructions:');
  console.log('   1. Run: vercel login');
  console.log('   2. Run: vercel --prod');
  process.exit(1);
}

console.log('\n🎉 Deployment process completed!');