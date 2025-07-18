@echo off
echo Starting Voting App Development Environment...
echo.

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: npm is not installed or not in PATH
    echo Please install Node.js and npm first
    pause
    exit /b 1
)

REM Check if client directory exists
if not exist "client" (
    echo Error: Client directory not found
    pause
    exit /b 1
)

echo Starting Backend Server...
start "Backend Server" cmd /k "echo Backend Server Starting... && npm start"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

echo Starting Frontend Development Server...
start "Frontend Server" cmd /k "cd client && echo Frontend Server Starting... && npm run dev"

echo.
echo Both servers should be starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause >nul
