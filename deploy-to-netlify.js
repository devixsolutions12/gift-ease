#!/usr/bin/env node

// Simple deployment script for Netlify
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Preparing GiftEase for Netlify deployment...');

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

console.log('\n📋 To deploy to Netlify:');
console.log('1. Visit https://app.netlify.com/drop');
console.log('2. Drag and drop the "dist" folder from your project');
console.log('3. Netlify will automatically deploy your site');
console.log('4. You\'ll get a live URL immediately');

console.log('\n📝 Note: For future updates:');
console.log('- Run "npm run build" to rebuild the project');
console.log('- Then drag the "dist" folder to Netlify again');

console.log('\n🌐 Your updated features will be live immediately after deployment!');