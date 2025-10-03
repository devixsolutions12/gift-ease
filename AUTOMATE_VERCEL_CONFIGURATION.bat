@echo off
title Vercel Configuration Automation

echo ========================================
echo   Vercel Configuration Automation
echo ========================================
echo.

echo Opening Vercel Dashboard...
start "" "https://vercel.com/dashboard"

echo.
echo Please follow these EXACT steps:
echo.
echo 1. Log into your Vercel account
echo 2. Find your "gift-ease" project
echo 3. Click "Settings" then "Environment Variables"
echo 4. Add these EXACT environment variables:
echo.
echo    Key: REACT_APP_API_URL    Value: (your Railway backend URL)
echo    Key: VITE_API_URL         Value: (your Railway backend URL)
echo.
echo    ^^^ BOTH variables should have the SAME URL from Railway ^^^
echo.
echo 5. Go back to project overview
echo 6. Click "Deployments" tab
echo 7. Click the "Redeploy" button
echo 8. Wait for redeployment to complete (1-2 minutes)
echo.
echo 9. Click "Visit" to see your working GiftEase application!
echo.
echo Your application will be at: https://gift-ease-sand.vercel.app/
echo.
echo Congratulations! Your deployment is complete!
echo.
pause