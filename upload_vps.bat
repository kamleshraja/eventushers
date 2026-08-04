@echo off
setlocal
echo ========================================================
echo   EVENT USHERS - DEPLOY TO VPS SERVER
echo ========================================================
echo.

:: --- CONFIGURATION ---
set VPS_USER=root
set VPS_IP=203.161.33.70
set VPS_PATH=/var/www/eventushers/out
:: --------------------

echo Step 1: Building production static site...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed! Aborting deployment.
    pause
    exit /b %errorlevel%
)

echo.
echo Step 2: Creating site.zip...
if exist site.zip del /f /q site.zip
tar -a -c -f site.zip -C out .

echo.
echo Step 3: Uploading site.zip to VPS (%VPS_IP%)...
echo Ensuring target directory exists on VPS...
ssh %VPS_USER%@%VPS_IP% "mkdir -p %VPS_PATH%"
echo Upload target: %VPS_USER%@%VPS_IP%:%VPS_PATH%/
scp site.zip %VPS_USER%@%VPS_IP%:%VPS_PATH%/
if %errorlevel% neq 0 (
    echo [ERROR] SCP upload failed. Please check VPS IP, username, and SSH access.
    pause
    exit /b %errorlevel%
)

echo.
echo Step 4: Extracting files on VPS server...
ssh %VPS_USER%@%VPS_IP% "cd %VPS_PATH% && unzip -o site.zip && rm site.zip && pm2 reload eventushers-frontend"
if %errorlevel% neq 0 (
    echo [WARNING] SSH extract failed. Make sure 'unzip' is installed on VPS.
    pause
    exit /b %errorlevel%
)

echo.
echo ========================================================
echo   SUCCESS! Deployment to VPS completed!
echo ========================================================
echo.
pause
