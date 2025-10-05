#!/usr/bin/env node

// Simple script to test routes
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Testing GiftEase Routes...');
console.log('============================');

// First, let's build the project to make sure everything is working
console.log('🏗️  Building project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Check if the dist directory exists
const distPath = path.join(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  console.log('📁 Dist directory exists');
  
  // Check if index.html exists
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('📄 index.html exists');
    
    // Read index.html to check for route configuration
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    if (indexContent.includes('admin')) {
      console.log('✅ Admin routes appear to be included in build');
    } else {
      console.log('⚠️  Admin routes may be missing from build');
    }
  } else {
    console.log('❌ index.html is missing');
  }
} else {
  console.log('❌ Dist directory is missing');
}

console.log('\n📋 To test routes locally:');
console.log('1. Run: npm run dev');
console.log('2. Visit: http://localhost:3000/admin/login');
console.log('3. Or visit: http://localhost:3000/routing-test');

console.log('\n📋 To deploy with updated routes:');
console.log('1. Run: npm run build');
console.log('2. Deploy the dist folder to your hosting provider');

console.log('\n✨ Route testing completed!');