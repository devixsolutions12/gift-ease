@echo off
title Vercel Setup - GiftEase

echo ========================================
echo   Vercel Frontend Configuration
echo ========================================
echo.

echo Opening Vercel Dashboard...
start "" "https://vercel.com/dashboard"

echo.
echo Opening Vercel Guide...
start "" "file:///c:/Users/mgas8/OneDrive/Desktop/GiftEase/VERCEL_AUTOMATION_GUIDE.md"

echo.
echo Please follow these EXACT steps:
echo.
echo 1. Log into your Vercel account
echo 2. Find your "gift-ease" project
echo 3. Click "Settings" then "Environment Variables"
echo 4. Add these EXACT variables:
echo.
echo    Key: REACT_APP_API_URL    Value: (your Railway URL)
echo    Key: VITE_API_URL         Value: (your Railway URL)
echo.
echo    ^^^ Both should be the SAME URL from Railway ^^^
echo.
echo 5. Go back to project overview
echo 6. Click "Deployments" tab
echo 7. Click "Redeploy" button
echo 8. Wait for redeployment to complete
echo.
echo 9. Click "Visit" to test your working application!
echo.
echo Your GiftEase will be at: https://gift-ease-sand.vercel.app/
echo.
echo Congratulations! Your deployment is complete!
echo.
pause