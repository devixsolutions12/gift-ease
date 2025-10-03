@echo off
echo GiftEase Deployment Script
echo ========================
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo Error: package.json not found. Please run this script from the project root directory.
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
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo All prerequisites are installed.
echo.

echo Initializing Git repository if needed...
git init >nul 2>&1

echo Adding all files to Git...
git add .

echo Committing changes...
git commit -m "Automated deployment commit" >nul 2>&1

echo.
echo Deployment preparation complete!
echo.
echo Next steps:
echo 1. Create a new repository on GitHub at https://github.com/new
echo 2. Name it "gift-ease" and click "Create repository"
echo 3. Copy the repository URL
echo 4. Run these commands:
echo    git remote add origin YOUR_REPOSITORY_URL
echo    git push -u origin main
echo 5. Go to https://vercel.com/ and import your repository
echo.
echo For fully automated deployment, run: npm run deploy
echo.

pause