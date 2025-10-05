#!/usr/bin/env node

// Deployment script with debugging for GiftEase
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Deploying GiftEase with Debugging...');
console.log('=====================================');

// First, let's build the project
console.log('🏗️  Building project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Check the dist directory
const distPath = path.join(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  console.log('📁 Dist directory contents:');
  const files = fs.readdirSync(distPath);
  files.forEach(file => {
    console.log(`  - ${file}`);
  });
  
  // Check if assets directory exists
  const assetsPath = path.join(distPath, 'assets');
  if (fs.existsSync(assetsPath)) {
    console.log('📁 Assets directory contents:');
    const assets = fs.readdirSync(assetsPath);
    assets.forEach(asset => {
      console.log(`  - ${asset}`);
    });
  }
} else {
  console.log('❌ Dist directory is missing');
}

// Check vercel.json configuration
const vercelConfigPath = path.join(process.cwd(), 'vercel.json');
if (fs.existsSync(vercelConfigPath)) {
  console.log('📄 Vercel configuration exists');
  const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
  console.log('  Routes:', vercelConfig.routes.length, 'routes configured');
  
  // Check if the catch-all route exists
  const catchAllRoute = vercelConfig.routes.find(route => route.src === '/(.*)');
  if (catchAllRoute) {
    console.log('✅ Catch-all route configured correctly');
  } else {
    console.log('⚠️  Missing catch-all route for SPA');
  }
} else {
  console.log('⚠️  Vercel configuration missing');
}

console.log('\n📋 Deployment Instructions:');
console.log('1. For Vercel:');
console.log('   - Push to GitHub (deployment should trigger automatically)');
console.log('   - Or run: vercel --prod');

console.log('\n2. For Netlify:');
console.log('   - Visit https://app.netlify.com/drop');
console.log('   - Drag and drop the "dist" folder');

console.log('\n3. For GitHub Pages:');
console.log('   - Push to GitHub');
console.log('   - Enable GitHub Pages in repository settings');

console.log('\n🔧 Debugging Tips:');
console.log('1. After deployment, open browser dev tools (F12)');
console.log('2. Check Console tab for any JavaScript errors');
console.log('3. Check Network tab for 404 errors');
console.log('4. Try accessing /admin/login directly');
console.log('5. Try accessing /admin/debug to check auth status');

console.log('\n✨ Deployment preparation completed!');