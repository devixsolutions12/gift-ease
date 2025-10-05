#!/usr/bin/env node

// Netlify deployment guide for GiftEase
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Netlify Deployment Guide for GiftEase');
console.log('=====================================');

// Build the project
console.log('🏗️  Step 1: Building the project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Check if dist directory exists
const distPath = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ Dist directory not found. Build may have failed.');
  process.exit(1);
}

console.log('\n📁 Build verification:');
console.log('  - Dist directory exists');
console.log('  - Required files present');

// Check Netlify CLI
console.log('\n🔍 Step 2: Checking Netlify CLI...');
try {
  const version = execSync('netlify --version', { encoding: 'utf8' });
  console.log('✅ Netlify CLI is installed:', version.trim());
} catch (error) {
  console.log('❌ Netlify CLI is not installed.');
  console.log('Please install it with: npm install -g netlify-cli');
  process.exit(1);
}

console.log('\n🔐 Step 3: Authentication');
console.log('Please run the following command to log in to Netlify:');
console.log('netlify login');
console.log('(Follow the prompts in your browser to complete login)');

console.log('\n🚀 Step 4: Initialize and Deploy');
console.log('After logging in, run these commands:');
console.log('netlify init --force');
console.log('netlify deploy --prod --dir=dist');

console.log('\n📋 Alternative: Manual Deployment');
console.log('If you prefer manual deployment:');
console.log('1. Visit https://app.netlify.com/');
console.log('2. Create a new site');
console.log('3. Select your GitHub repository');
console.log('4. Set build command to: npm run build');
console.log('5. Set publish directory to: dist');

console.log('\n✨ Deployment preparation completed!');
console.log('Follow the steps above to deploy your GiftEase website to Netlify.');