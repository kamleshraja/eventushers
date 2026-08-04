@echo off
echo ========================================================
echo   EVENT USHERS - PM2 PROCESS DETAILS
echo ========================================================
echo.

set VPS_USER=root
set VPS_IP=203.161.33.70

echo [1/2] Showing details for PM2 process 'eventushers-frontend' (port 3005):
ssh %VPS_USER%@%VPS_IP% "pm2 show eventushers-frontend"
echo.

echo [2/2] Showing details for PM2 process 'event-ushers' (port 8080):
ssh %VPS_USER%@%VPS_IP% "pm2 show event-ushers"
echo.

pause
