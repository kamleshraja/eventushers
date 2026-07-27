@echo off
echo ========================================================
echo   EVENT USHERS - BUILDING & ZIPPING SITE FOR DEPLOYMENT
echo ========================================================
echo.
echo Step 1: Building production static pages...
call npm run build
echo.
echo Step 2: Creating site.zip file for cPanel upload...
if exist site.zip del /f /q site.zip
tar -a -c -f site.zip -C out .
echo.
echo ========================================================
echo   SUCCESS! 
echo   'site.zip' has been created in your project folder:
echo   c:\Users\USER\Documents\work\eventushers\site.zip
echo ========================================================
echo.
echo Next: Upload site.zip to cPanel File Manager and click Extract!
echo.
pause
