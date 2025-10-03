@echo off
title GiftEase Vercel Setup

echo ========================================
echo   GiftEase Vercel Frontend Setup
echo ========================================
echo.

echo Opening Vercel dashboard...
start "" "https://vercel.com/dashboard"

echo.
echo Opening Vercel Automation Guide...
start "" "file:///c:/Users/mgas8/OneDrive/Desktop/GiftEase/VERCEL_AUTOMATION_GUIDE.md"

echo.
echo Instructions:
echo 1. Follow the exact steps in VERCEL_AUTOMATION_GUIDE.md
echo 2. Log into your Vercel account
echo 3. Find your "gift-ease" project
echo 4. Add these two environment variables:
echo    - REACT_APP_API_URL = your Railway backend URL
echo    - VITE_API_URL = your Railway backend URL
echo 5. Redeploy your frontend application
echo.

echo When you're done with Vercel setup, your GiftEase
echo application should be fully functional!
echo.

echo Test it at: https://gift-ease-sand.vercel.app/
echo.

pause