@echo off
title Get MongoDB Connection String

echo ========================================
echo   Get MongoDB Connection String
echo ========================================
echo.

echo Please follow these EXACT steps to get your connection string:
echo.
echo 1. In MongoDB Atlas website that just opened:
echo    - Click "Database" in the left sidebar
echo    - Find your cluster
echo    - Click the GREEN "Connect" button
echo.
echo 2. In the connection dialog:
echo    - Click "Connect your application"
echo.
echo 3. Copy the connection string that looks like:
echo    mongodb+srv://gifteaseuser:^<password^@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true^&w=majority
echo.
echo 4. REPLACE ^<password^> with: gifteasepassword123
echo.
echo 5. Your final connection string should look like:
echo    mongodb+srv://gifteaseuser:gifteasepassword123@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true^&w=majority
echo.
echo 6. COPY this complete connection string and SAVE it
echo    (You'll need it for the next step)
echo.
echo When you have your connection string saved, run:
echo AUTOMATE_RAILWAY_DEPLOYMENT.bat
echo.
pause