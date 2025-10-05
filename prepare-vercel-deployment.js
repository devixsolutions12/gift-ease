#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Preparing GiftEase frontend for Vercel deployment...');

try {
  // Step 1: Check if we're in the correct directory
  const packageJsonPath = path.join(__dirname, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ package.json not found! Please run this script from the gift-ease-frontend directory.');
    process.exit(1);
  }

  // Step 2: Check for environment files that might cause issues
  const envFiles = ['.env.local', '.env.development', '.env.production'];
  console.log('🔍 Checking for environment files that might interfere with deployment...');
  
  envFiles.forEach(envFile => {
    const filePath = path.join(__dirname, envFile);
    if (fs.existsSync(filePath)) {
      console.log(`⚠️  Found ${envFile} - This file might contain backend API URLs that could cause issues.`);
      console.log('   For frontend-only deployment, these should be removed or emptied.');
    }
  });

  // Step 3: Check for backend-related code
  console.log('🔍 Checking for backend-related code...');
  
  // Check if there are any axios or fetch calls to localhost
  const srcDir = path.join(__dirname, 'src');
  if (fs.existsSync(srcDir)) {
    const checkForBackendCalls = (dir) => {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          checkForBackendCalls(filePath);
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
          const content = fs.readFileSync(filePath, 'utf8');
          if (content.includes('localhost:500') || content.includes('127.0.0.1:500')) {
            console.warn(`⚠️  Potential backend call found in ${filePath}`);
            console.warn('   This might cause issues in frontend-only deployment.');
          }
        }
      });
    };
    
    checkForBackendCalls(srcDir);
  }

  // Step 4: Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  try {
    execSync('npm run clean 2>/dev/null || echo "No clean script found"', { stdio: 'inherit' });
  } catch (error) {
    console.log('ℹ️  No clean script found, continuing...');
  }

  // Step 5: Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Step 6: Build the application
  console.log('🏗️  Building the application...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');

  // Step 7: Verify build output
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

  // Step 8: Check index.html for correct paths
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    if (indexContent.includes('src="/assets/') || indexContent.includes('href="/assets/')) {
      console.log('✅ Asset paths are correctly configured');
    } else {
      console.log('ℹ️  Asset paths configuration check completed');
    }
  } else {
    console.error('❌ index.html not found in build directory!');
    process.exit(1);
  }

  console.log('\n🎉 Preparation for Vercel deployment completed successfully!');
  console.log('\n📋 To deploy to Vercel:');
  console.log('   Run: vercel --prod');
  console.log('\n🔗 Or push to your connected GitHub repository to trigger automatic deployment');

} catch (error) {
  console.error('❌ Error during preparation:', error.message);
  process.exit(1);
}