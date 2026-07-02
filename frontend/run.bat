@echo off
echo Starting npm install...
npm install > out.txt 2>&1
echo Exit code: %ERRORLEVEL%
type out.txt
pause
