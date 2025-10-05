#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting automated deployment process...');

try {
  // Step 1: Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  execSync('npm run clean', { stdio: 'inherit' });
} catch (error) {
  console.log('ℹ️  No clean script found, continuing...');
}

try {
  // Step 2: Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
} catch (error) {
  console.log('⚠️  Dependencies may already be installed, continuing...');
}

try {
  // Step 3: Build the application
  console.log('🏗️  Building the application...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Step 4: Verify build output
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ Build directory not found!');
  process.exit(1);
}

console.log('📁 Build directory contents:');
const files = fs.readdirSync(distPath);
files.forEach(file => {
  console.log(`  - ${file}`);
});

// Step 5: Check index.html for correct paths
const indexPath = path.join(distPath, 'index.html');
if (fs.existsSync(indexPath)) {
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  if (indexContent.includes('src="/assets/') && indexContent.includes('href="/assets/')) {
    console.log('✅ Asset paths are correctly configured (absolute paths)');
  } else {
    console.warn('⚠️  Asset paths may not be correctly configured');
  }
} else {
  console.error('❌ index.html not found in build directory!');
  process.exit(1);
}

console.log('\n🎉 Build verification completed successfully!');
console.log('\n📋 To deploy to Vercel manually:');
console.log('   1. Install Vercel CLI: npm install -g vercel');
console.log('   2. Run: vercel --prod');
console.log('\n🔗 Or push to your connected GitHub repository to trigger automatic deployment');

console.log('\n✅ Automated deployment preparation completed!');