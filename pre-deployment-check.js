#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Pre-Deployment Check for Admin Panel');
console.log('========================================');

let checksPassed = 0;
let totalChecks = 0;

function checkFileExists(filePath, description) {
  totalChecks++;
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${description}`);
    checksPassed++;
    return true;
  } else {
    console.log(`❌ ${description} - NOT FOUND`);
    return false;
  }
}

function checkFileContent(filePath, contentChecks, description) {
  totalChecks++;
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    let allChecksPassed = true;
    
    for (const check of contentChecks) {
      if (!content.includes(check)) {
        console.log(`❌ ${description} - Missing: ${check}`);
        allChecksPassed = false;
      }
    }
    
    if (allChecksPassed) {
      console.log(`✅ ${description}`);
      checksPassed++;
    }
    return allChecksPassed;
  } else {
    console.log(`❌ ${description} - FILE NOT FOUND`);
    return false;
  }
}

// Check required files
checkFileExists('package.json', 'Project package.json');
checkFileExists('vite.config.js', 'Vite configuration');
checkFileExists('vercel.json', 'Vercel configuration');

// Check admin components
checkFileExists('src/pages/AdminLogin.jsx', 'Admin login component');
checkFileExists('src/pages/LocalAdminPanel.jsx', 'Admin panel component');
checkFileExists('src/contexts/AuthContext.jsx', 'Authentication context');
checkFileExists('src/components/ProtectedRoute.jsx', 'Protected route component');

// Check Vite config for correct base path
checkFileContent('vite.config.js', ['base: \'/\''], 'Vite base path configuration');

// Check index.html for absolute asset paths
checkFileContent('dist/index.html', ['src="/assets/', 'href="/assets/'], 'Absolute asset paths in build');

// Check App.jsx for admin routes
checkFileContent('src/App.jsx', ['/admin/login', '/admin/dashboard'], 'Admin routes in App');

// Check for AuthProvider
checkFileContent('src/App.jsx', ['<AuthProvider>'], 'AuthProvider in App');

// Check for ProtectedRoute usage
checkFileContent('src/App.jsx', ['ProtectedRoute'], 'ProtectedRoute usage');

// Check AuthContext exports
checkFileContent('src/contexts/AuthContext.jsx', ['useAuth', 'AuthProvider'], 'AuthContext exports');

console.log('\n========================================');
console.log(`Results: ${checksPassed}/${totalChecks} checks passed`);

if (checksPassed === totalChecks) {
  console.log('🎉 All checks passed! Ready for deployment.');
  console.log('\n📋 Next steps:');
  console.log('   1. Run: npm run build');
  console.log('   2. Deploy the dist folder to Vercel');
  console.log('   3. Visit /admin/login on your deployed site');
  console.log('   4. Login with admin/password');
  console.log('   5. Change default credentials for security');
} else {
  console.log('❌ Some checks failed. Please review the issues above.');
  console.log('   Fix the issues before deploying to ensure admin panel works correctly.');
}

console.log('========================================');