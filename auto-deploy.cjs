#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting automatic deployment to Vercel...');

function runCommand(command, options = {}) {
  try {
    console.log(`💻 Running: ${command}`);
    const result = execSync(command, { 
      stdio: options.silent ? 'pipe' : 'inherit',
      cwd: __dirname,
      ...options
    });
    return { success: true, output: result.toString() };
  } catch (error) {
    return { success: false, error: error.message, code: error.status };
  }
}

// Check if we're in the right directory
if (!fs.existsSync(path.join(__dirname, 'package.json'))) {
  console.error('❌ package.json not found. Please run this script from the project root directory.');
  process.exit(1);
}

// Step 1: Verify build
console.log('\n🔍 Verifying build...');
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.log('🏗️  Build directory not found. Building project...');
  const buildResult = runCommand('npm run build');
  if (!buildResult.success) {
    console.error('❌ Build failed:', buildResult.error);
    process.exit(1);
  }
  console.log('✅ Build completed successfully!');
} else {
  console.log('✅ Build directory already exists');
}

// Step 2: Check Vercel CLI
console.log('\n🔍 Checking Vercel CLI...');
const vercelCheck = runCommand('vercel --version', { silent: true });
if (!vercelCheck.success) {
  console.log('📥 Installing Vercel CLI...');
  const installResult = runCommand('npm install -g vercel');
  if (!installResult.success) {
    console.error('❌ Failed to install Vercel CLI:', installResult.error);
    console.log('📋 Please install Vercel CLI manually:');
    console.log('   npm install -g vercel');
    process.exit(1);
  }
  console.log('✅ Vercel CLI installed successfully!');
} else {
  console.log('✅ Vercel CLI is already installed');
}

// Step 3: Check if logged in
console.log('\n🔍 Checking Vercel login status...');
const loginCheck = runCommand('vercel whoami', { silent: true });
if (!loginCheck.success) {
  console.log('🔐 Please log in to Vercel:');
  console.log('   Run: vercel login');
  console.log('   Then run this script again');
  // Try to login automatically (this will open browser)
  const loginResult = runCommand('vercel login');
  if (!loginResult.success) {
    console.log('📋 Manual login required. Please run: vercel login');
    process.exit(1);
  }
} else {
  console.log(`✅ Already logged in as: ${loginCheck.output.trim()}`);
}

// Step 4: Deploy to Vercel
console.log('\n🚀 Deploying to Vercel...');
console.log('   This may take a few minutes...');

const deployResult = runCommand('vercel --prod --confirm --token=$VERCEL_TOKEN', { silent: true });
if (!deployResult.success) {
  // Try without token
  console.log('   Trying deployment without token...');
  const deployResult2 = runCommand('vercel --prod --confirm');
  if (!deployResult2.success) {
    console.error('❌ Deployment failed:', deployResult2.error);
    console.log('\n📋 Manual deployment instructions:');
    console.log('   1. Run: vercel login');
    console.log('   2. Run: vercel --prod');
    process.exit(1);
  }
  console.log('✅ Deployment output:');
  console.log(deployResult2.output);
} else {
  console.log('✅ Deployment output:');
  console.log(deployResult.output);
}

console.log('\n🎉 Deployment completed successfully!');
console.log('\n📋 Next steps:');
console.log('   1. Visit your deployed site');
console.log('   2. Navigate to /admin/login');
console.log('   3. Use credentials: admin / password');
console.log('\n🔐 For security, please change the default admin password after first login!');