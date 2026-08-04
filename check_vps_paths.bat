@echo off
echo ========================================================
echo   EVENT USHERS - VPS PATH DIAGNOSTICS
echo ========================================================
echo.

set VPS_USER=root
set VPS_IP=203.161.33.70

echo [1/3] Locating all index.html files under /var/www/...
ssh %VPS_USER%@%VPS_IP% "find /var/www -name index.html 2>/dev/null"
echo.

echo [2/3] Checking active Nginx root paths...
ssh %VPS_USER%@%VPS_IP% "grep -rn 'root ' /etc/nginx/ 2>/dev/null"
echo.

echo [3/3] Listing contents of /var/www/eventushers/...
ssh %VPS_USER%@%VPS_IP% "ls -la /var/www/eventushers/ 2>/dev/null"
echo.

pause
