@echo off
echo ========================================================
echo   EVENT USHERS - ACTIVE NGINX CONFIGS
echo ========================================================
echo.

set VPS_USER=root
set VPS_IP=203.161.33.70

echo [1/2] Active configuration files in sites-enabled:
ssh %VPS_USER%@%VPS_IP% "ls -la /etc/nginx/sites-enabled/"
echo.

echo [2/2] Contents of active configuration files:
ssh %VPS_USER%@%VPS_IP% "cat /etc/nginx/sites-enabled/*"
echo.

pause
