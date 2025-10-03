# Fully Automated Permanent Deployment for GiftEase
# This script will help automate the entire deployment process

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  GiftEase Permanent Deployment Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if a command exists
function Test-Command {
    param([string]$command)
    try {
        Get-Command $command -ErrorAction Stop
        return $true
    } catch {
        return $false
    }
}

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow

if (-not (Test-Command "git")) {
    Write-Host "❌ Git is not installed. Please install Git from https://git-scm.com/" -ForegroundColor Red
    exit 1
}

if (-not (Test-Command "node")) {
    Write-Host "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Git and Node.js are installed" -ForegroundColor Green
Write-Host ""

# MongoDB Atlas Setup Instructions
Write-Host "Step 1: Setting up MongoDB Atlas" -ForegroundColor Yellow
Write-Host "1. Go to https://cloud.mongodb.com/" -ForegroundColor Gray
Write-Host "2. Create a free account" -ForegroundColor Gray
Write-Host "3. Create project named 'GiftEase'" -ForegroundColor Gray
Write-Host "4. Create free M0 cluster" -ForegroundColor Gray
Write-Host "5. Add database user:" -ForegroundColor Gray
Write-Host "   Username: gifteaseuser" -ForegroundColor Gray
Write-Host "   Password: gifteasepassword123" -ForegroundColor Gray
Write-Host "6. Add network access: 'Allow Access from Anywhere'" -ForegroundColor Gray
Write-Host "7. Get connection string and replace <password> with gifteasepassword123" -ForegroundColor Gray
Write-Host ""

# Get MongoDB connection string from user
Write-Host "Please enter your MongoDB connection string:" -ForegroundColor Yellow
$mongodbUri = Read-Host "MongoDB URI"

if ([string]::IsNullOrEmpty($mongodbUri)) {
    Write-Host "❌ MongoDB URI is required" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 2: Deploying Backend to Railway" -ForegroundColor Yellow
Write-Host "1. Go to https://railway.app/" -ForegroundColor Gray
Write-Host "2. Sign up with GitHub" -ForegroundColor Gray
Write-Host "3. Click 'New Project' → 'Deploy from GitHub repo'" -ForegroundColor Gray
Write-Host "4. Select devixsolutions12/gift-ease-backend" -ForegroundColor Gray
Write-Host "5. Wait for deployment to complete" -ForegroundColor Gray
Write-Host ""

# Wait for user to complete Railway deployment
Write-Host "Have you completed the Railway deployment? (y/n)" -ForegroundColor Yellow
$response = Read-Host "Response"
if ($response -ne "y" -and $response -ne "yes") {
    Write-Host "Please complete the Railway deployment first." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 3: Configure Railway Environment Variables" -ForegroundColor Yellow
Write-Host "In your Railway project settings, add these variables:" -ForegroundColor Gray
Write-Host "NODE_ENV=production" -ForegroundColor Gray
Write-Host "PORT=8080" -ForegroundColor Gray
Write-Host "MONGODB_URI=$mongodbUri" -ForegroundColor Gray
Write-Host "JWT_SECRET=super-secret-jwt-key-change-this" -ForegroundColor Gray
Write-Host "EMAIL_USER=your-email@gmail.com" -ForegroundColor Gray
Write-Host "EMAIL_PASS=your-gmail-app-password" -ForegroundColor Gray
Write-Host "FRONTEND_URL=https://gift-ease-sand.vercel.app" -ForegroundColor Gray
Write-Host ""

# Get Railway backend URL from user
Write-Host "Please enter your Railway backend URL (from Railway dashboard):" -ForegroundColor Yellow
$backendUrl = Read-Host "Backend URL"

if ([string]::IsNullOrEmpty($backendUrl)) {
    Write-Host "❌ Backend URL is required" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 4: Updating Vercel Configuration" -ForegroundColor Yellow
Write-Host "1. Go to https://vercel.com/dashboard" -ForegroundColor Gray
Write-Host "2. Find your 'gift-ease' project" -ForegroundColor Gray
Write-Host "3. Go to Settings → Environment Variables" -ForegroundColor Gray
Write-Host "4. Add these variables:" -ForegroundColor Gray
Write-Host "   REACT_APP_API_URL=$backendUrl" -ForegroundColor Gray
Write-Host "   VITE_API_URL=$backendUrl" -ForegroundColor Gray
Write-Host ""

Write-Host "Step 5: Redeploy Frontend" -ForegroundColor Yellow
Write-Host "1. In Vercel dashboard, click 'Deployments' tab" -ForegroundColor Gray
Write-Host "2. Click 'Redeploy' button for latest deployment" -ForegroundColor Gray
Write-Host "3. Wait for redeployment to complete" -ForegroundColor Gray
Write-Host ""

Write-Host "🎉 Deployment Process Complete!" -ForegroundColor Green
Write-Host "Your GiftEase application should now be fully functional at:" -ForegroundColor Green
Write-Host "https://gift-ease-sand.vercel.app/" -ForegroundColor Cyan
Write-Host ""
Write-Host "If you encounter any issues:" -ForegroundColor Yellow
Write-Host "- Check Railway logs for backend errors" -ForegroundColor Gray
Write-Host "- Verify all environment variables are set correctly" -ForegroundColor Gray
Write-Host "- Ensure MongoDB connection string is correct" -ForegroundColor Gray
Write-Host ""

Write-Host "Press any key to continue..." -ForegroundColor Gray
$host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")