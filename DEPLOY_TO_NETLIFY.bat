@echo off
echo ========================================
echo GiftEase Netlify Deployment Helper
echo ========================================
echo.
echo This script will help you deploy to Netlify
echo.
echo Steps:
echo 1. Opening your dist folder
echo 2. Opening Netlify Drop page
echo 3. Instructions for deployment
echo.
pause
echo.
echo 1. Opening dist folder...
explorer.exe "%cd%\dist"
echo.
echo 2. Opening Netlify Drop page...
start "" "https://app.netlify.com/drop"
echo.
echo ========================================
echo Deployment Instructions:
echo ========================================
echo 1. On the Netlify page, drag and drop the dist folder
echo 2. Wait for deployment to complete (1-2 minutes)
echo 3. You'll get a live URL immediately
echo.
echo Your updated features will be live immediately!
echo.
pause