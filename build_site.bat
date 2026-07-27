@echo off
echo ========================================================
echo   EVENT USHERS - BUILDING UPDATED PRODUCTION SITE
echo ========================================================
echo.
call npm run build
echo.
echo ========================================================
echo   BUILD COMPLETED SUCCESSFULLY!
echo   All output files are saved in the 'out' folder.
echo ========================================================
echo.
pause
