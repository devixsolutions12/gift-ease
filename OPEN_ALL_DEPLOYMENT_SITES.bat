@echo off
title GiftEase Permanent Deployment - All Sites

echo ========================================
echo   GiftEase Permanent Deployment
echo   Opening All Required Websites
echo ========================================
echo.

echo Opening MongoDB Atlas...
start "" "https://cloud.mongodb.com/"

echo Opening Railway.app...
start "" "https://railway.app/"

echo Opening Vercel Dashboard...
start "" "https://vercel.com/dashboard"

echo Opening Google Account Security...
start "" "https://myaccount.google.com/security"

echo.
echo All required websites have been opened.
echo.
echo Please follow the instructions in:
echo PERMANENT_DEPLOYMENT_GUIDE.md
echo.
echo 1. Set up MongoDB Atlas first
echo 2. Deploy backend to Railway
echo 3. Configure environment variables
echo 4. Set up Gmail App Password
echo 5. Update frontend in Vercel
echo 6. Redeploy frontend
echo.

echo The guide has detailed step-by-step instructions.
echo Each step must be completed in order.
echo.

pause