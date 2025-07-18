# PowerShell script to start both backend and frontend
Write-Host "Starting Voting App Development Environment..." -ForegroundColor Green

# Get current directory
$currentDir = Get-Location
$clientDir = Join-Path $currentDir "client"

# Check if npm is available
try {
    $npmVersion = npm --version
    Write-Host "npm version: $npmVersion" -ForegroundColor Gray
} catch {
    Write-Host "Error: npm is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js and npm first" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if client directory exists
if (-not (Test-Path $clientDir)) {
    Write-Host "Error: Client directory not found at $clientDir" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Start backend in current directory
Write-Host "Starting Backend Server..." -ForegroundColor Yellow
Start-Process -FilePath "powershell" -ArgumentList "-NoExit", "-Command", "cd '$currentDir'; Write-Host 'Backend Server Starting...' -ForegroundColor Yellow; npm start" -WindowStyle Normal

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start frontend in client directory
Write-Host "Starting Frontend Development Server..." -ForegroundColor Cyan
Start-Process -FilePath "powershell" -ArgumentList "-NoExit", "-Command", "cd '$clientDir'; Write-Host 'Frontend Server Starting...' -ForegroundColor Cyan; npm run dev" -WindowStyle Normal

Write-Host "Both servers should be starting..." -ForegroundColor Green
Write-Host "Backend: http://localhost:5000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Press Enter to exit..." -ForegroundColor White
Read-Host
