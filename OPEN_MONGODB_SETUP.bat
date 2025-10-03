@echo off
title GiftEase MongoDB Setup

echo ========================================
echo   GiftEase MongoDB Atlas Setup
echo ========================================
echo.

echo Opening MongoDB Atlas website...
start "" "https://cloud.mongodb.com/"

echo.
echo Opening MongoDB Automation Guide...
start "" "file:///c:/Users/mgas8/OneDrive/Desktop/GiftEase/MONGODB_AUTOMATION_GUIDE.md"

echo.
echo Instructions:
echo 1. Follow the exact steps in MONGODB_AUTOMATION_GUIDE.md
echo 2. Create account on MongoDB Atlas
echo 3. Set up project and free cluster
echo 4. Create database user with credentials:
echo    Username: gifteaseuser
echo    Password: gifteasepassword123
echo 5. Allow access from anywhere
echo 6. Get connection string and replace ^<password^>
echo.

echo When you're done with MongoDB setup, run:
echo OPEN_RAILWAY_SETUP.bat
echo.

pause