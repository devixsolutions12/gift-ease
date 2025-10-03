@echo off
title GiftEase Deployment Links

echo ========================================
echo   GiftEase Deployment - Opening Links
echo ========================================
echo.

echo Opening all necessary websites for deployment...
echo.

REM Open MongoDB Atlas
start "" "https://cloud.mongodb.com/"

REM Open Railway.app
start "" "https://railway.app/"

REM Open Vercel Dashboard
start "" "https://vercel.com/dashboard"

REM Open Google Account Security (for Gmail setup)
start "" "https://myaccount.google.com/security"

echo All necessary websites have been opened in your browser.
echo.
echo Please follow the instructions in AUTOMATED_DEPLOYMENT.md
echo.
echo 1. Set up MongoDB Atlas first
echo 2. Deploy backend to Railway
echo 3. Configure environment variables
echo 4. Update frontend in Vercel
echo.

pause