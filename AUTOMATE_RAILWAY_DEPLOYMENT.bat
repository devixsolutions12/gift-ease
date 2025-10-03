@echo off
title Railway Deployment Automation

echo ========================================
echo   Railway Deployment Automation
echo ========================================
echo.

echo Opening Railway for deployment...
start "" "https://railway.app/"

echo.
echo Please follow these EXACT steps:
echo.
echo 1. Sign up for Railway (use GitHub if you have one)
echo 2. Click "New Project" then "Deploy from GitHub repo"
echo 3. Select repository: devixsolutions12/gift-ease-backend
echo 4. Click "Deploy Now" and WAIT for completion (2-5 minutes)
echo.
echo AFTER deployment completes:
echo.
echo 5. Click "Settings" tab
echo 6. Click "Variables" section
echo 7. Add these EXACT environment variables:
echo.
echo    Name: NODE_ENV          Value: production
echo    Name: PORT              Value: 8080
echo    Name: MONGODB_URI       Value: (your MongoDB connection string)
echo    Name: JWT_SECRET        Value: super-secret-jwt-key-change-this
echo    Name: EMAIL_USER        Value: your-email@gmail.com
echo    Name: EMAIL_PASS        Value: your-gmail-app-password
echo    Name: FRONTEND_URL      Value: https://gift-ease-sand.vercel.app
echo.
echo 8. COPY your Railway backend URL (at top of page)
echo    (Looks like: https://gift-ease-backend-production.up.railway.app)
echo.
echo When done, run: AUTOMATE_VERCEL_CONFIGURATION.bat
echo.
pause