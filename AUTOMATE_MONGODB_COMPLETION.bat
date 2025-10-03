@echo off
title MongoDB Setup Completion - GiftEase

echo ========================================
echo   MongoDB Setup Completion for GiftEase
echo ========================================
echo.

echo Opening MongoDB Atlas to complete setup...
start "" "https://cloud.mongodb.com/"

echo.
echo Opening MongoDB Completion Guide...
start "" "file:///c:/Users/mgas8/OneDrive/Desktop/GiftEase/MONGODB_COMPLETION_GUIDE.md"

echo.
echo Please follow these EXACT steps:
echo.
echo 1. In MongoDB Atlas, click "Network Access" in left sidebar
echo 2. Click "Add IP Address" button
echo 3. Click "Allow Access from Anywhere" 
echo 4. Click "Confirm" button
echo.
echo 5. Click "Database" in left sidebar
echo 6. Click the green "Connect" button on your cluster
echo 7. Click "Connect your application"
echo 8. COPY the connection string
echo 9. REPLACE ^<password^> with: gifteasepassword123
echo 10. SAVE this connection string for next step
echo.
echo When you have your connection string saved, run:
echo AUTOMATE_RAILWAY_SETUP.bat
echo.
pause