@echo off
title Railway CLI Deployment

echo ========================================
echo   Railway CLI Deployment
echo ========================================
echo.

echo This script will deploy your backend to Railway using the Railway CLI.
echo Make sure you have installed the Railway CLI first!
echo.
echo If you haven't installed Railway CLI yet:
echo 1. Go to https://railway.app/cli
echo 2. Download and install the CLI for Windows
echo 3. Restart your command prompt/terminal
echo.
echo Press any key to continue with deployment...
pause
echo.

echo Changing directory to backend...
cd /d "c:\Users\mgas8\OneDrive\Desktop\GiftEase\gift-ease-backend"
echo Current directory: %cd%
echo.

echo Logging into Railway...
railway login
if %errorlevel% neq 0 (
    echo.
    echo Railway login failed. Make sure you have Railway CLI installed.
    echo Visit https://railway.app/cli to download and install it.
    echo.
    pause
    exit /b
)

echo.
echo Initializing Railway project...
railway init
if %errorlevel% neq 0 (
    echo.
    echo Railway initialization failed.
    echo.
    pause
    exit /b
)

echo.
echo Deploying to Railway...
railway up
if %errorlevel% neq 0 (
    echo.
    echo Railway deployment failed.
    echo Check the error message above.
    echo.
    pause
    exit /b
)

echo.
echo Deployment successful!
echo.
echo Now you need to set environment variables:
echo 1. Go to your Railway project dashboard
echo 2. Click "Settings" tab
echo 3. Click "Variables" section
echo 4. Add these EXACT environment variables:
echo.
echo    Name: NODE_ENV          Value: production
echo    Name: PORT              Value: 8080
echo    Name: MONGODB_URI       Value: (your MongoDB connection string)
echo    Name: JWT_SECRET        Value: super-secret-jwt-key-change-this
echo    Name: EMAIL_USER        Value: your-email@gmail.com
echo    Name: EMAIL_PASS        Value: your-gmail-app-password
echo    Name: FRONTEND_URL      Value: https://gift-ease-sand.vercel.app
echo.
echo After setting environment variables, restart your deployment:
echo 1. In Railway dashboard, click "Deployments" tab
echo 2. Click the "Redeploy" button
echo.
echo Finally, copy your Railway backend URL and run AUTOMATE_VERCEL_CONFIGURATION.bat
echo.
pause