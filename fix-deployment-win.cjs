#!/usr/bin/env node

/**
 * GiftEase Vercel Deployment Fix Script (Windows Compatible)
 * This script helps automatically fix common Vercel deployment issues on Windows
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
  }
};

// Utility functions
const log = (message, color = colors.fg.white) => {
  console.log(`${color}${message}${colors.reset}`);
};

const error = (message) => {
  console.error(`${colors.fg.red}Error: ${message}${colors.reset}`);
};

const success = (message) => {
  console.log(`${colors.fg.green}✓ ${message}${colors.reset}`);
};

const warning = (message) => {
  console.warn(`${colors.fg.yellow}⚠ ${message}${colors.reset}`);
};

const info = (message) => {
  console.log(`${colors.fg.cyan}ℹ ${message}${colors.reset}`);
};

// Check if we're in the right directory
const checkDirectory = () => {
  const requiredFiles = ['package.json', 'index.html', 'vite.config.js'];
  const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));
  
  if (missingFiles.length > 0) {
    error(`Missing required files: ${missingFiles.join(', ')}`);
    error('Please run this script from the project root directory');
    process.exit(1);
  }
  
  success('Directory check passed');
};

// Check Node.js version
const checkNodeVersion = () => {
  try {
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
    const versionNumber = nodeVersion.replace('v', '').split('.')[0];
    
    if (parseInt(versionNumber) < 16) {
      warning(`Node.js version ${nodeVersion} may be too old. Recommended: 16.x or higher`);
    } else {
      success(`Node.js ${nodeVersion} is compatible`);
    }
    
    return true;
  } catch (err) {
    error('Node.js is not installed or not in PATH');
    return false;
  }
};

// Clean install dependencies (Windows compatible)
const cleanInstall = () => {
  try {
    info('Cleaning node_modules and package-lock.json...');
    
    // Remove node_modules and package-lock.json if they exist (Windows compatible)
    if (fs.existsSync('node_modules')) {
      info('Removing node_modules...');
      execSync('rmdir /s /q node_modules', { stdio: 'ignore' });
    }
    
    if (fs.existsSync('package-lock.json')) {
      info('Removing package-lock.json...');
      fs.unlinkSync('package-lock.json');
    }
    
    info('Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    
    success('Dependencies installed successfully');
    return true;
  } catch (err) {
    error(`Failed to install dependencies: ${err.message}`);
    return false;
  }
};

// Test local build
const testBuild = () => {
  try {
    info('Testing local build...');
    execSync('npm run build', { stdio: 'inherit' });
    
    success('Build completed successfully');
    return true;
  } catch (err) {
    error(`Build failed: ${err.message}`);
    return false;
  }
};

// Check Git status and commit changes
const commitChanges = () => {
  try {
    // Check if there are any changes to commit
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    
    if (status.trim() !== '') {
      info('Committing changes...');
      execSync('git add .', { stdio: 'ignore' });
      execSync('git commit -m "Fix Vercel deployment issues"', { stdio: 'ignore' });
      success('Changes committed');
    } else {
      info('No changes to commit');
    }
    return true;
  } catch (err) {
    error(`Failed to commit changes: ${err.message}`);
    return false;
  }
};

// Push to GitHub
const pushToGitHub = () => {
  try {
    info('Pushing changes to GitHub...');
    execSync('git push origin main', { stdio: 'inherit' });
    success('Changes pushed to GitHub');
    return true;
  } catch (err) {
    error(`Failed to push to GitHub: ${err.message}`);
    return false;
  }
};

// Main fix function
const fixDeployment = async () => {
  log('🔧 GiftEase Vercel Deployment Fix (Windows)', colors.fg.cyan);
  log('===============================================', colors.fg.cyan);
  
  // Check prerequisites
  checkDirectory();
  
  if (!checkNodeVersion()) {
    process.exit(1);
  }
  
  log('\n🛠️  Fixing deployment issues...', colors.fg.yellow);
  
  // Clean install dependencies
  if (!cleanInstall()) {
    process.exit(1);
  }
  
  // Test build
  if (!testBuild()) {
    error('Build failed. Please check the error messages above.');
    process.exit(1);
  }
  
  // Commit changes
  if (!commitChanges()) {
    process.exit(1);
  }
  
  // Push to GitHub
  log('\n📤 Pushing fixes to GitHub...', colors.fg.yellow);
  if (!pushToGitHub()) {
    warning('Failed to push to GitHub. You may need to push manually.');
  }
  
  log('\n✅ Deployment fix complete!', colors.fg.green);
  log('Vercel should automatically deploy your changes.', colors.fg.green);
  log('If deployment still fails, check the Vercel dashboard for detailed logs.', colors.fg.green);
};

// Run fix
fixDeployment().catch(err => {
  error(`Deployment fix failed: ${err.message}`);
  process.exit(1);
});