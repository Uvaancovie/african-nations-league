# African Nations League Simulator - Install Script
# Run this in PowerShell AS ADMINISTRATOR

Write-Host "Starting installation..." -ForegroundColor Green
Write-Host ""

# Check if node_modules exists and has locks
if (Test-Path "node_modules") {
    Write-Host "Cleaning up node_modules..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
}

if (Test-Path "package-lock.json") {
    Write-Host "Removing package-lock.json..." -ForegroundColor Yellow
    Remove-Item package-lock.json -ErrorAction SilentlyContinue
}

Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install --legacy-peer-deps

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Installation successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "  1. Run: npm run dev" -ForegroundColor White
    Write-Host "  2. Open: http://localhost:3000" -ForegroundColor White
    Write-Host "  3. Check Firebase Realtime Database Console" -ForegroundColor White
    Write-Host ""
    Write-Host "See RTDB_MIGRATION_GUIDE.md for details" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "Installation failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Try these steps:" -ForegroundColor Yellow
    Write-Host "  1. Close ALL VS Code windows" -ForegroundColor White
    Write-Host "  2. Close ALL terminal windows" -ForegroundColor White
    Write-Host "  3. Run PowerShell as Administrator" -ForegroundColor White
    Write-Host "  4. Run this script again" -ForegroundColor White
    Write-Host ""
}
