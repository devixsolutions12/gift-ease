#!/usr/bin/env node

// Terminal-based Netlify deployment script for GiftEase
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Terminal-based Netlify Deployment for GiftEase');
console.log('================================================');

// Function to execute command and capture output
function execCommand(command) {
  try {
    console.log(`Executing: ${command}`);
    const output = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    console.log('Output:', output.trim());
    return { success: true, output: output.trim() };
  } catch (error) {
    console.error('Error executing command:', error.message);
    return { success: false, error: error.message, stdout: error.stdout?.toString(), stderr: error.stderr?.toString() };
  }
}

// Build the project
console.log('🏗️  Building the project...');
const buildResult = execCommand('npm run build');
if (!buildResult.success) {
  console.error('❌ Build failed:', buildResult.error);
  process.exit(1);
}
console.log('✅ Build completed successfully!');

// Check if dist directory exists
const distPath = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ Dist directory not found. Build may have failed.');
  process.exit(1);
}

console.log('📁 Dist directory contents:');
const files = fs.readdirSync(distPath);
files.forEach(file => {
  console.log(`  - ${file}`);
});

// Check Netlify CLI status
console.log('\n🔍 Checking Netlify CLI status...');
const statusResult = execCommand('netlify status');
if (!statusResult.success) {
  console.log('⚠️  Not logged in to Netlify. Please login first:');
  console.log('Run: netlify login');
  process.exit(1);
}

// Check if site is linked
console.log('\n🔗 Checking if site is linked...');
const linkResult = execCommand('netlify status --verbose');
if (linkResult.output && linkResult.output.includes('Linked to')) {
  console.log('✅ Site is already linked to Netlify');
} else {
  console.log('⚠️  Site is not linked. Initializing...');
  const initResult = execCommand('netlify init --force');
  if (!initResult.success) {
    console.log('⚠️  Failed to initialize. You may need to create a site manually.');
  }
}

// Deploy to Netlify
console.log('\n🚀 Deploying to Netlify...');
const deployResult = execCommand('netlify deploy --prod --dir=dist');
if (!deployResult.success) {
  console.error('❌ Deployment failed:', deployResult.error);
  if (deployResult.stdout) console.log('STDOUT:', deployResult.stdout);
  if (deployResult.stderr) console.log('STDERR:', deployResult.stderr);
  process.exit(1);
}

console.log('✅ Deployment completed successfully!');

// Extract URL from deployment output
const urlMatch = deployResult.output?.match(/https:\/\/[^\s]+/);
if (urlMatch) {
  console.log('\n🎉 Your GiftEase website is now live at:');
  console.log(urlMatch[0]);
} else {
  console.log('\n🎉 Deployment completed! Check your Netlify dashboard for the live URL.');
}

console.log('\n✨ Terminal deployment process completed!');