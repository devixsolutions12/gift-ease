#!/usr/bin/env node

/**
 * Immediate Vercel Deployment Script
 * This script deploys the current build to Vercel
 */

const { execSync } = require('child_process');
const fs = require('fs');

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

// Check if Vercel CLI is installed
const checkVercelCLI = () => {
  try {
    const version = execSync('vercel --version', { encoding: 'utf8' });
    success(`Vercel CLI is installed: ${version.split('\n')[0]}`);
    return true;
  } catch (err) {
    error('Vercel CLI is not installed');
    log('Installing Vercel CLI...');
    try {
      execSync('npm install -g vercel', { stdio: 'inherit' });
      success('Vercel CLI installed successfully');
      return true;
    } catch (installErr) {
      error('Failed to install Vercel CLI');
      return false;
    }
  }
};

// Deploy to Vercel
const deployToVercel = async () => {
  log('🚀 Deploying GiftEase to Vercel', colors.fg.cyan);
  log('==================================', colors.fg.cyan);
  
  // Check if Vercel CLI is installed
  if (!checkVercelCLI()) {
    error('Cannot proceed without Vercel CLI');
    process.exit(1);
  }
  
  try {
    // Check if we're already logged in to Vercel
    try {
      execSync('vercel whoami', { stdio: 'ignore' });
      success('Already logged in to Vercel');
    } catch (err) {
      // Not logged in, attempt to login
      log('Please log in to Vercel in your browser when prompted...', colors.fg.yellow);
      execSync('vercel login', { stdio: 'inherit' });
    }
    
    // Deploy the project
    log('Deploying project...', colors.fg.cyan);
    const deployOutput = execSync('vercel deploy --prod --confirm', { 
      stdio: 'pipe',
      encoding: 'utf8'
    });
    
    success('Deployment completed successfully!');
    log('Deployment URL: ' + deployOutput.match(/https:\/\/[^\s]+/)[0], colors.fg.green);
    
  } catch (err) {
    error(`Deployment failed: ${err.message}`);
    if (err.stdout) {
      log(`stdout: ${err.stdout}`, colors.fg.red);
    }
    if (err.stderr) {
      log(`stderr: ${err.stderr}`, colors.fg.red);
    }
    process.exit(1);
  }
};

// Run deployment
deployToVercel().catch(err => {
  error(`Deployment process failed: ${err.message}`);
  process.exit(1);
});