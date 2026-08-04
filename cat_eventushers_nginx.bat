@echo off
echo ========================================================
echo   EVENT USHERS - NGINX CONFIG FOR EVENT USHERS
echo ========================================================
echo.

set VPS_USER=root
set VPS_IP=203.161.33.70

ssh %VPS_USER%@%VPS_IP% "cat /etc/nginx/sites-enabled/eventushers"
echo.

pause
