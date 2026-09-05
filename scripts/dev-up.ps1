param(
    [int]$BackendPort = 8080,
    [int]$FrontendPort = 3000
)

$root = Split-Path -Parent $PSScriptRoot
$devDir = Join-Path $root ".dev"
New-Item -ItemType Directory -Force -Path $devDir | Out-Null

Write-Host "==> checking for port conflicts before starting"
& (Join-Path $PSScriptRoot "free-port.ps1") -Ports @($BackendPort, $FrontendPort)

Write-Host "==> starting backend (go run ./cmd/server) on port $BackendPort"
$backendLog = Join-Path $devDir "backend.log"
$env:PORT = "$BackendPort"
$backend = Start-Process -FilePath "go" `
    -ArgumentList "run", "./cmd/server" `
    -WorkingDirectory (Join-Path $root "backend") `
    -RedirectStandardOutput $backendLog `
    -RedirectStandardError (Join-Path $devDir "backend.err.log") `
    -WindowStyle Hidden `
    -PassThru
Remove-Item Env:\PORT -ErrorAction SilentlyContinue
$backend.Id | Out-File -FilePath (Join-Path $devDir "backend.pid") -Encoding ascii

Write-Host "==> starting frontend (npm run dev) on port $FrontendPort"
$frontendLog = Join-Path $devDir "frontend.log"
$frontend = Start-Process -FilePath "cmd.exe" `
    -ArgumentList "/c", "npm run dev -- -p $FrontendPort" `
    -WorkingDirectory (Join-Path $root "frontend") `
    -RedirectStandardOutput $frontendLog `
    -RedirectStandardError (Join-Path $devDir "frontend.err.log") `
    -WindowStyle Hidden `
    -PassThru
$frontend.Id | Out-File -FilePath (Join-Path $devDir "frontend.pid") -Encoding ascii

Start-Sleep -Seconds 1
Write-Host ""
Write-Host "==> started:"
Write-Host "  backend  -> http://localhost:$BackendPort   (log: .dev/backend.log, wrapper PID $($backend.Id))"
Write-Host "  frontend -> http://localhost:$FrontendPort  (log: .dev/frontend.log, wrapper PID $($frontend.Id))"
Write-Host "stop with: make down"
