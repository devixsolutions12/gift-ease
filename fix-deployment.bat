@echo off
title GiftEase Vercel Deployment Fix

echo ========================================
echo   GiftEase Vercel Deployment Fix Tool
echo ========================================
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo Error: package.json not found.
    echo Please run this script from the project root directory.
    echo.
    pause
    exit /b 1
)

echo Checking prerequisites...
echo.

REM Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Git is not installed or not in PATH.
    echo Please install Git from https://git-scm.com/
    echo.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH.
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo All prerequisites found.
echo.

echo Cleaning and reinstalling dependencies...
echo This may take a few minutes...
echo.

REM Remove node_modules and package-lock.json if they exist
if exist "node_modules" (
    echo Removing node_modules...
    rmdir /s /q node_modules >nul 2>&1
)

if exist "package-lock.json" (
    echo Removing package-lock.json...
    del package-lock.json >nul 2>&1
)

echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo Error: Failed to install dependencies.
    echo Check your internet connection and try again.
    echo.
    pause
    exit /b 1
)

echo.
echo Testing build...
echo.

call npm run build
if %errorlevel% neq 0 (
    echo.
    echo Error: Build failed.
    echo Check the error messages above for details.
    echo You may need to fix code issues before deployment.
    echo.
    pause
    exit /b 1
)

echo.
echo Committing changes...
git add .
git commit -m "Fix Vercel deployment issues" >nul 2>&1

echo.
echo Pushing to GitHub...
echo.

call git push origin main
if %errorlevel% neq 0 (
    echo.
    echo Warning: Failed to push to GitHub.
    echo You may need to push manually or check your Git configuration.
    echo.
)

echo.
echo ========================================
echo   Deployment fix process completed!
echo ========================================
echo.
echo Next steps:
echo 1. Check your Vercel dashboard for the new deployment
echo 2. If it fails again, check the build logs for specific errors
echo 3. Contact Vercel support if needed
echo.
echo For future deployment issues, run this script again.
echo.
pause