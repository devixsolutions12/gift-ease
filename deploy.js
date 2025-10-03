#!/usr/bin/env node

/**
 * GiftEase Deployment Script
 * This script helps automate the deployment process to GitHub and Vercel
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

// Check if Git is installed
const checkGit = () => {
  try {
    execSync('git --version', { stdio: 'ignore' });
    success('Git is installed');
    return true;
  } catch (err) {
    error('Git is not installed or not in PATH');
    return false;
  }
};

// Check if Node.js and npm are installed
const checkNodeAndNpm = () => {
  try {
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
    success(`Node.js ${nodeVersion} and npm ${npmVersion} are installed`);
    return true;
  } catch (err) {
    error('Node.js or npm is not installed or not in PATH');
    return false;
  }
};

// Initialize Git repository if not already done
const initGit = () => {
  try {
    // Check if already a Git repository
    execSync('git status', { stdio: 'ignore' });
    info('Git repository already initialized');
    return true;
  } catch (err) {
    // Not a Git repository, initialize it
    try {
      execSync('git init', { stdio: 'ignore' });
      success('Git repository initialized');
      return true;
    } catch (initErr) {
      error('Failed to initialize Git repository');
      return false;
    }
  }
};

// Add all files and commit if needed
const commitChanges = () => {
  try {
    // Check if there are any changes to commit
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    
    if (status.trim() !== '') {
      execSync('git add .', { stdio: 'ignore' });
      execSync('git commit -m "Automated deployment commit"', { stdio: 'ignore' });
      success('Changes committed');
    } else {
      info('No changes to commit');
    }
    return true;
  } catch (err) {
    error('Failed to commit changes');
    return false;
  }
};

// Main deployment function
const deploy = async () => {
  log('🚀 Starting GiftEase Deployment Process', colors.fg.cyan);
  log('=====================================', colors.fg.cyan);
  
  // Check prerequisites
  checkDirectory();
  
  if (!checkGit() || !checkNodeAndNpm()) {
    error('Prerequisites not met. Please install required tools.');
    process.exit(1);
  }
  
  // Initialize Git if needed
  if (!initGit()) {
    process.exit(1);
  }
  
  // Commit any changes
  if (!commitChanges()) {
    process.exit(1);
  }
  
  log('\n📋 Deployment Instructions:', colors.fg.yellow);
  log('1. Create a new repository on GitHub at https://github.com/new', colors.fg.white);
  log('2. Name it "gift-ease" and click "Create repository"', colors.fg.white);
  log('3. Copy the repository URL (looks like https://github.com/YOUR_USERNAME/gift-ease.git)', colors.fg.white);
  log('4. Run the following commands:', colors.fg.white);
  log('   git remote add origin YOUR_REPOSITORY_URL', colors.fg.blue);
  log('   git push -u origin main', colors.fg.blue);
  log('5. Go to https://vercel.com/ and sign in with GitHub', colors.fg.white);
  log('6. Click "New Project" and import your gift-ease repository', colors.fg.white);
  log('7. Configure with these settings:', colors.fg.white);
  log('   - Framework Preset: Vite', colors.fg.blue);
  log('   - Build Command: npm run build', colors.fg.blue);
  log('   - Output Directory: dist', colors.fg.blue);
  log('8. Click "Deploy" and wait for deployment to complete', colors.fg.white);
  
  log('\n✅ Deployment preparation complete!', colors.fg.green);
  log('The project is ready for deployment to GitHub and Vercel.', colors.fg.green);
  log('Follow the instructions above to complete the process.', colors.fg.green);
};

// Run deployment
deploy().catch(err => {
  error(`Deployment failed: ${err.message}`);
  process.exit(1);
});