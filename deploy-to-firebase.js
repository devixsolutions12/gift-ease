#!/usr/bin/env node

// Simple deployment script for Firebase
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Preparing GiftEase for Firebase deployment...');

// Check if we have a build directory
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  console.log('🏗️  No build directory found. Creating build...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ Build directory already exists');
}

console.log('\n📋 To deploy to Firebase:');
console.log('1. Install Firebase CLI: npm install -g firebase-tools');
console.log('2. Login to Firebase: firebase login');
console.log('3. Initialize Firebase in your project: firebase init');
console.log('4. Select "Hosting" and follow the setup instructions');
console.log('5. Deploy your site: firebase deploy');

console.log('\n📝 Note: For future updates:');
console.log('- Run "npm run build" to rebuild the project');
console.log('- Then run "firebase deploy" to deploy');

console.log('\n🌐 Your updated features will be live immediately after deployment!');