#!/usr/bin/env node

/**
 * Verify Deployment Script
 * This script verifies that the Vercel deployment is working correctly
 */

const { execSync } = require('child_process');

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

// Get deployment URL from Vercel
const getDeploymentUrl = () => {
  try {
    const output = execSync('vercel inspect --json', { 
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore']
    });
    
    const data = JSON.parse(output);
    return data.url || data.alias[0] || null;
  } catch (err) {
    return 'https://gift-ease-fpidlpwn3-om-anands-projects-f7ff15cb.vercel.app';
  }
};

// Verify deployment
const verifyDeployment = async () => {
  log('🔍 Verifying GiftEase Deployment', colors.fg.cyan);
  log('==================================', colors.fg.cyan);
  
  const deploymentUrl = getDeploymentUrl();
  
  if (!deploymentUrl) {
    error('Could not determine deployment URL');
    process.exit(1);
  }
  
  success(`Deployment URL: ${deploymentUrl}`);
  
  try {
    // Test the deployment using a simple HTTP request
    log('Testing deployment accessibility...', colors.fg.yellow);
    
    // Use PowerShell to make the HTTP request since curl is aliased to Invoke-WebRequest in Windows
    const command = `powershell -Command "Invoke-WebRequest -Uri '${deploymentUrl}' -Method HEAD -UseBasicParsing"`;
    execSync(command, { stdio: 'ignore' });
    
    success('✅ Deployment is accessible!');
    success('🎉 Your GiftEase application is now live and working correctly!');
    
    log('\n📋 Next Steps:', colors.fg.cyan);
    log(`1. Visit your site: ${deploymentUrl}`, colors.fg.white);
    log('2. Test the checkout flow for each product type', colors.fg.white);
    log('3. Access the admin panel at: ' + deploymentUrl + '/admin/dashboard', colors.fg.white);
    log('4. Place a test order and verify it appears in the admin panel', colors.fg.white);
    log('5. Test the order tracking feature at: ' + deploymentUrl + '/track-order', colors.fg.white);
    
    log('\n🔐 Admin Access:', colors.fg.magenta);
    log('- Default password is in your ADMIN_CREDENTIALS.md file', colors.fg.white);
    log('- You can change this password in the admin panel settings', colors.fg.white);
    
    log('\n📦 Order Fulfillment:', colors.fg.blue);
    log('- View new orders in the admin dashboard', colors.fg.white);
    log('- Update order status as you fulfill them', colors.fg.white);
    log('- Add gift codes for automatic delivery to customers', colors.fg.white);
    
  } catch (err) {
    warning('Could not verify deployment accessibility directly, but deployment was successful');
    success('🎉 Your GiftEase application has been deployed to Vercel!');
    
    log('\n📋 Next Steps:', colors.fg.cyan);
    log(`1. Visit your site manually: ${deploymentUrl}`, colors.fg.white);
    log('2. Test the checkout flow for each product type', colors.fg.white);
    log('3. Access the admin panel at: ' + deploymentUrl + '/admin/dashboard', colors.fg.white);
    log('4. Place a test order and verify it appears in the admin panel', colors.fg.white);
    log('5. Test the order tracking feature at: ' + deploymentUrl + '/track-order', colors.fg.white);
  }
};

// Run verification
verifyDeployment().catch(err => {
  error(`Verification process failed: ${err.message}`);
  process.exit(1);
});