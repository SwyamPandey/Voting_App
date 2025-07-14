@echo off
echo Starting Voting App...
echo.

echo Starting Backend Server...
start /b node server.js

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo Starting Frontend Server...
cd frontend
start npm start

echo.
echo Both servers are starting up...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause
