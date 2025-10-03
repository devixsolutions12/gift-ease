@echo off
title Railway Setup - GiftEase

echo ========================================
echo   Railway Backend Setup for GiftEase
echo ========================================
echo.

echo Opening Railway for backend deployment...
start "" "https://railway.app/"

echo.
echo Opening Railway Guide...
start "" "file:///c:/Users/mgas8/OneDrive/Desktop/GiftEase/RAILWAY_AUTOMATION_GUIDE.md"

echo.
echo If you see "No repository found", run CHECK_GITHUB_REPO.bat to diagnose the issue.
echo.

echo Please follow these EXACT steps:
echo.
echo 1. Sign up for Railway (use GitHub if possible)
echo 2. Click "New Project" then "Deploy from GitHub repo"
echo 3. Select: devixsolutions12/gift-ease-backend
echo 4. Click "Deploy Now" and wait for completion
echo.
echo IF YOU SEE "NO REPOSITORY FOUND":
echo 1. Run CHECK_GITHUB_REPO.bat to check repository access
echo 2. Or run DEPLOY_TO_RAILWAY_USING_CLI.bat for alternative deployment
echo.
echo 5. AFTER deployment completes:
echo    - Click "Settings" tab
echo    - Click "Variables" section
echo    - Add these EXACT variables:
echo.
echo    Name: NODE_ENV          Value: production
echo    Name: PORT              Value: 8080
echo    Name: MONGODB_URI       Value: (your connection string from MongoDB)
echo    Name: JWT_SECRET        Value: super-secret-jwt-key-change-this
echo    Name: EMAIL_USER        Value: your-email@gmail.com
echo    Name: EMAIL_PASS        Value: your-gmail-app-password
echo    Name: FRONTEND_URL      Value: https://gift-ease-sand.vercel.app
echo.
echo 6. COPY your Railway backend URL (looks like):
echo    https://gift-ease-backend-production.up.railway.app
echo.
echo When done, run: AUTOMATE_VERCEL_SETUP.bat
echo.
pause