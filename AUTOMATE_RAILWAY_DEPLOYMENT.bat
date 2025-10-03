@echo off
title Railway Deployment Automation

echo ========================================
echo   Railway Deployment Automation
echo ========================================
echo.

echo Opening Railway for deployment...
start "" "https://railway.app/"

echo.
echo If you see "No repository found", it's because Railway can't access your GitHub repo.
echo This can happen if:
echo  - The repository is private and Railway lacks permissions
echo  - The repository doesn't exist on GitHub yet
echo  - Railway app doesn't have access to your GitHub repositories
echo.
echo Solutions:
echo 1. Make sure you've granted Railway access to your GitHub account
echo 2. Ensure your repository is public or Railway has permission to access private repos
echo 3. Alternatively, we can deploy manually using the Railway CLI
echo.
echo Please follow these EXACT steps:
echo.
echo 1. Sign up for Railway (use GitHub if you have one)
echo 2. In Railway dashboard, go to "Account Settings" then "GitHub Apps"
echo 3. Install/Configure Railway GitHub App for your account
echo 4. Return to Railway dashboard and click "New Project"
echo 5. Click "Deploy from GitHub repo" 
echo 6. Select repository: devixsolutions12/gift-ease-backend
echo 7. Click "Deploy Now" and WAIT for completion (2-5 minutes)
echo.
echo IF YOU STILL SEE "NO REPOSITORY FOUND":
echo.
echo Alternative Manual Deployment Method:
echo 1. Download Railway CLI from: https://railway.app/cli
echo 2. Open a new terminal/command prompt
echo 3. Navigate to your backend folder:
echo    cd c:\Users\mgas8\OneDrive\Desktop\GiftEase\gift-ease-backend
echo 4. Login to Railway CLI:
echo    railway login
echo 5. Initialize new project:
echo    railway init
echo 6. Deploy:
echo    railway up
echo.
echo AFTER deployment completes:
echo.
echo 5. Click "Settings" tab
echo 6. Click "Variables" section
echo 7. Add these EXACT environment variables:
echo.
echo    Name: NODE_ENV          Value: production
echo    Name: PORT              Value: 8080
echo    Name: MONGODB_URI       Value: (your MongoDB connection string)
echo    Name: JWT_SECRET        Value: super-secret-jwt-key-change-this
echo    Name: EMAIL_USER        Value: your-email@gmail.com
echo    Name: EMAIL_PASS        Value: your-gmail-app-password
echo    Name: FRONTEND_URL      Value: https://gift-ease-sand.vercel.app
echo.
echo 8. COPY your Railway backend URL (at top of page)
echo    (Looks like: https://gift-ease-backend-production.up.railway.app)
echo.
echo When done, run: AUTOMATE_VERCEL_CONFIGURATION.bat
echo.
pause