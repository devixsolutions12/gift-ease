@echo off
title Check GitHub Repository

echo ========================================
echo   Checking GitHub Repository Access
echo ========================================
echo.

echo This script will check if your GitHub repository is accessible.
echo.

echo Opening your GitHub repository in browser...
start "" "https://github.com/devixsolutions12/gift-ease-backend"

echo.
echo Please check:
echo 1. Does the repository page load?
echo 2. Is it public or private?
echo 3. If private, Railway won't be able to access it without proper permissions
echo.
echo Solutions:
echo 1. Make the repository public temporarily for deployment
echo 2. Or grant Railway proper permissions to access private repositories
echo 3. Or use the Railway CLI deployment method instead
echo.
echo Alternative: Run DEPLOY_TO_RAILWAY_USING_CLI.bat for CLI deployment
echo.
pause