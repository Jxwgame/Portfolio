param(
    [int]$BackendPort = 8080,
    [int]$FrontendPort = 3000
)

$root = Split-Path -Parent $PSScriptRoot
$devDir = Join-Path $root ".dev"

Write-Host "==> stopping anything still listening on these ports"
& (Join-Path $PSScriptRoot "free-port.ps1") -Ports @($BackendPort, $FrontendPort)

# Also stop the wrapper process (go.exe / npm cmd) saved by `make up`, in case
# it is still hanging around after its child (the actual port listener) died.
foreach ($name in @("backend", "frontend")) {
    $pidFile = Join-Path $devDir "$name.pid"
    if (Test-Path $pidFile) {
        $wrapperId = Get-Content $pidFile -ErrorAction SilentlyContinue
        if ($wrapperId) {
            $proc = Get-Process -Id $wrapperId -ErrorAction SilentlyContinue
            if ($proc) {
                Write-Host "  [$name] stopping wrapper PID $wrapperId ($($proc.ProcessName)) too"
                Stop-Process -Id $wrapperId -Force -ErrorAction SilentlyContinue
            }
        }
        Remove-Item $pidFile -Force -ErrorAction SilentlyContinue
    }
}

Write-Host "==> all stopped"
