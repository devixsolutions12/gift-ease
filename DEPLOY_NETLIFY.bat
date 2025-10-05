@echo off
title GiftEase Netlify Deployment

echo ========================================
echo GiftEase Netlify Deployment
echo ========================================
echo.

echo 1. Building the project...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo.
echo ✅ Build completed successfully!

echo.
echo 2. Checking Netlify CLI...
netlify --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Netlify CLI not found. Installing...
    call npm install -g netlify-cli
    if %errorlevel% neq 0 (
        echo ❌ Failed to install Netlify CLI
        echo Please install manually: npm install -g netlify-cli
        pause
        exit /b 1
    )
)

echo.
echo 3. Deploying to Netlify...
echo Make sure you're logged in to Netlify CLI
echo If not, run: netlify login
echo.
echo Then run: netlify deploy --prod --dir=dist
echo.
echo Alternatively, drag and drop the "dist" folder to https://app.netlify.com/drop

echo.
echo 🎉 Deployment preparation completed!
pause