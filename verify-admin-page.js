#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verifying admin page configuration...');

// Check if all required files exist
const requiredFiles = [
  'dist/index.html'
];

const requiredAssetPatterns = [
  'index-.*\\.js',
  'vendor-.*\\.js',
  'index-.*\\.css'
];

let allFilesExist = true;

// Check exact files
for (const file of requiredFiles) {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ Required file exists: ${file}`);
  } else {
    console.error(`❌ Required file missing: ${file}`);
    allFilesExist = false;
  }
}

// Check asset files with patterns
const assetsPath = path.join(__dirname, 'dist', 'assets');
if (fs.existsSync(assetsPath)) {
  const assetFiles = fs.readdirSync(assetsPath);
  
  for (const pattern of requiredAssetPatterns) {
    const regex = new RegExp(pattern);
    const matchingFiles = assetFiles.filter(file => regex.test(file));
    
    if (matchingFiles.length > 0) {
      console.log(`✅ Found matching assets for pattern: ${pattern}`);
      matchingFiles.forEach(file => console.log(`   - ${file}`));
    } else {
      console.error(`❌ No assets found matching pattern: ${pattern}`);
      allFilesExist = false;
    }
  }
} else {
  console.error('❌ Assets directory not found');
  allFilesExist = false;
}

// Check index.html for correct configuration
const indexPath = path.join(__dirname, 'dist', 'index.html');
if (fs.existsSync(indexPath)) {
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Check for absolute paths
  if (indexContent.includes('src="/assets/') && indexContent.includes('href="/assets/')) {
    console.log('✅ Asset paths are correctly configured (absolute paths)');
  } else {
    console.error('❌ Asset paths are not correctly configured');
    allFilesExist = false;
  }
  
  // Check for root div
  if (indexContent.includes('<div id="root"></div>')) {
    console.log('✅ Root div found in index.html');
  } else {
    console.error('❌ Root div not found in index.html');
    allFilesExist = false;
  }
} else {
  console.error('❌ index.html not found');
  allFilesExist = false;
}

// Check Vercel configuration
const vercelConfigPath = path.join(__dirname, 'vercel.json');
if (fs.existsSync(vercelConfigPath)) {
  console.log('✅ Vercel configuration file found');
  
  const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
  
  // Check for SPA routing configuration
  const hasSpaRouting = vercelConfig.routes && vercelConfig.routes.some(route => 
    route.src === '/(.*)' && route.dest === '/index.html'
  );
  
  if (hasSpaRouting) {
    console.log('✅ SPA routing configuration found');
  } else {
    console.warn('⚠️  SPA routing configuration not found - this may cause issues with client-side routing');
  }
} else {
  console.warn('⚠️  Vercel configuration file not found');
}

// Summary
console.log('\n' + '='.repeat(50));
if (allFilesExist) {
  console.log('🎉 All checks passed! Admin page should work correctly.');
  console.log('\n📋 Next steps:');
  console.log('   1. Deploy the dist folder to Vercel');
  console.log('   2. Visit https://your-domain.vercel.app/admin/login');
  console.log('   3. Use credentials: admin / password');
} else {
  console.log('❌ Some checks failed. Please review the errors above.');
}
console.log('='.repeat(50));