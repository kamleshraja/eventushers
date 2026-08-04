@echo off
echo ========================================================
echo   EVENT USHERS - VPS PROCESS & PORT DIAGNOSTICS
echo ========================================================
echo.

set VPS_USER=root
set VPS_IP=203.161.33.70

echo [1/3] Checking PM2 process list:
ssh %VPS_USER%@%VPS_IP% "pm2 list 2>/dev/null || echo 'pm2 not installed or not in PATH'"
echo.

echo [2/3] Checking listening ports (finding port 3005 / 5005 / 8080):
ssh %VPS_USER%@%VPS_IP% "netstat -tuln | grep -E '3005|5005' || ss -tuln | grep -E '3005|5005'"
echo.

echo [3/3] Checking running Node processes and their working directories:
ssh %VPS_USER%@%VPS_IP% "ps aux | grep -i node | grep -v grep"
echo.
ssh %VPS_USER%@%VPS_IP% "pwdx \$(pgrep -f node) 2>/dev/null || echo 'pwdx not available'"
echo.

pause
