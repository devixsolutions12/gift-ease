@echo off
title GiftEase Complete Automation Master Script

echo ========================================
echo   GiftEase Complete Automation Setup
echo ========================================
echo.

:menu
echo Please select which part of the setup you want to work on:
echo.
echo 1. MongoDB Atlas Setup (Database)
echo 2. Railway Backend Deployment
echo 3. Vercel Frontend Configuration
echo 4. View All Guides
echo 5. Exit
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto mongodb
if "%choice%"=="2" goto railway
if "%choice%"=="3" goto vercel
if "%choice%"=="4" goto guides
if "%choice%"=="5" goto exit
echo Invalid choice. Please try again.
echo.
goto menu

:mongodb
echo.
echo Opening MongoDB Atlas Setup...
start "" "https://cloud.mongodb.com/"
start "" "file:///c:/Users/mgas8/OneDrive/Desktop/GiftEase/MONGODB_AUTOMATION_GUIDE.md"
echo.
echo Please follow the instructions in MONGODB_AUTOMATION_GUIDE.md
echo.
echo When done, press any key to return to menu...
pause >nul
cls
goto menu

:railway
echo.
echo Opening Railway Backend Setup...
start "" "https://railway.app/"
start "" "file:///c:/Users/mgas8/OneDrive/Desktop/GiftEase/RAILWAY_AUTOMATION_GUIDE.md"
echo.
echo Please follow the instructions in RAILWAY_AUTOMATION_GUIDE.md
echo.
echo When done, press any key to return to menu...
pause >nul
cls
goto menu

:vercel
echo.
echo Opening Vercel Frontend Setup...
start "" "https://vercel.com/dashboard"
start "" "file:///c:/Users/mgas8/OneDrive/Desktop/GiftEase/VERCEL_AUTOMATION_GUIDE.md"
echo.
echo Please follow the instructions in VERCEL_AUTOMATION_GUIDE.md
echo.
echo When done, press any key to return to menu...
pause >nul
cls
goto menu

:guides
echo.
echo Opening all guides...
start "" "file:///c:/Users/mgas8/OneDrive/Desktop/GiftEase/MONGODB_AUTOMATION_GUIDE.md"
start "" "file:///c:/Users/mgas8/OneDrive/Desktop/GiftEase/RAILWAY_AUTOMATION_GUIDE.md"
start "" "file:///c:/Users/mgas8/OneDrive/Desktop/GiftEase/VERCEL_AUTOMATION_GUIDE.md"
start "" "file:///c:/Users/mgas8/OneDrive/Desktop/GiftEase/PERMANENT_DEPLOYMENT_GUIDE.md"
echo.
echo All guides opened. Please review them as needed.
echo.
echo When done, press any key to return to menu...
pause >nul
cls
goto menu

:exit
echo.
echo Thank you for using GiftEase Complete Automation!
echo Your application will be fully functional when all steps are completed.
echo.
echo Final application URL: https://gift-ease-sand.vercel.app/
echo.
pause
exit