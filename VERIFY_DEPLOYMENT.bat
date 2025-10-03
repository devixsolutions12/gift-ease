@echo off
title GiftEase Deployment Verification

echo ========================================
echo   GiftEase Deployment Verification
echo ========================================
echo.

echo Checking if all deployment steps are complete...
echo.

echo 1. Checking if frontend is accessible...
ping -n 1 gift-ease-sand.vercel.app >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Frontend is accessible
) else (
    echo ✗ Frontend is not accessible - check Vercel deployment
)

echo.
echo 2. To verify backend deployment:
echo    - Go to your Railway dashboard
echo    - Check if deployment completed successfully
echo    - Verify environment variables are set
echo.

echo 3. To test account creation:
echo    - Visit https://gift-ease-sand.vercel.app/
echo    - Click "Login" then "Register"
echo    - Try to create a new account
echo.

echo 4. If account creation works:
echo    ✓ Deployment is successful!
echo    ✗ If it fails, check backend logs in Railway
echo.

echo Common issues and solutions:
echo - Database connection: Check MONGODB_URI in Railway
echo - CORS errors: Check FRONTEND_URL in Railway
echo - Email issues: Check EMAIL_USER and EMAIL_PASS in Railway
echo.

pause