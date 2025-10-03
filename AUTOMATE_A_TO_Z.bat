@echo off
title GiftEase Complete A-Z Automation

echo ========================================
echo   GiftEase A-Z Automation Setup
echo ========================================
echo.

echo Welcome to the COMPLETE automation of your GiftEase deployment!
echo.
echo This will guide you through all steps from MongoDB to a working website.
echo.

:menu
echo Please select which step you're on:
echo.
echo 1. Complete MongoDB Setup (Network Access ^& Connection String)
echo 2. Deploy Backend to Railway
echo 3. Configure Frontend in Vercel
echo 4. Exit
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto mongodb
if "%choice%"=="2" goto railway
if "%choice%"=="3" goto vercel
if "%choice%"=="4" goto exit
echo Invalid choice. Please try again.
echo.
goto menu

:mongodb
echo.
echo ^>^>^> STEP 1: Completing MongoDB Setup ^<^<^<
echo.
echo Running MongoDB completion script...
echo.
call "c:\Users\mgas8\OneDrive\Desktop\GiftEase\AUTOMATE_MONGODB_COMPLETION.bat"
cls
goto menu

:railway
echo.
echo ^>^>^> STEP 2: Railway Backend Deployment ^<^<^<
echo.
echo Running Railway setup script...
echo.
call "c:\Users\mgas8\OneDrive\Desktop\GiftEase\AUTOMATE_RAILWAY_SETUP.bat"
cls
goto menu

:vercel
echo.
echo ^>^>^> STEP 3: Vercel Frontend Configuration ^<^<^<
echo.
echo Running Vercel setup script...
echo.
call "c:\Users\mgas8\OneDrive\Desktop\GiftEase\AUTOMATE_VERCEL_SETUP.bat"
cls
goto menu

:exit
echo.
echo ========================================
echo   CONGRATULATIONS! 
echo ========================================
echo.
echo Your GiftEase application should now be fully functional at:
echo https://gift-ease-sand.vercel.app/
echo.
echo If you encounter any issues:
echo 1. Check that all environment variables are set correctly
echo 2. Verify your MongoDB connection string
echo 3. Ensure Railway backend is running
echo 4. Confirm Vercel frontend was redeployed
echo.
echo Thank you for using GiftEase A-Z Automation!
echo.
pause
exit