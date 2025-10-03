@echo off
title GiftEase Railway Setup

echo ========================================
echo   GiftEase Railway Backend Setup
echo ========================================
echo.

echo Opening Railway website...
start "" "https://railway.app/"

echo.
echo Opening Railway Automation Guide...
start "" "file:///c:/Users/mgas8/OneDrive/Desktop/GiftEase/RAILWAY_AUTOMATION_GUIDE.md"

echo.
echo Instructions:
echo 1. Follow the exact steps in RAILWAY_AUTOMATION_GUIDE.md
echo 2. Sign up for Railway (GitHub recommended)
echo 3. Deploy devixsolutions12/gift-ease-backend
echo 4. Get your backend URL
echo 5. Configure all 7 environment variables:
echo    - NODE_ENV = production
echo    - PORT = 8080
echo    - MONGODB_URI = your MongoDB connection string
echo    - JWT_SECRET = super-secret-jwt-key-change-this
echo    - EMAIL_USER = your Gmail address
echo    - EMAIL_PASS = your Gmail App Password
echo    - FRONTEND_URL = https://gift-ease-sand.vercel.app
echo.

echo When you're done with Railway setup, run:
echo OPEN_VERCEL_SETUP.bat
echo.

pause