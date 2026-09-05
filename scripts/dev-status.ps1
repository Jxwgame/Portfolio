param(
    [int]$BackendPort = 8080,
    [int]$FrontendPort = 3000
)

function Show-PortStatus([string]$label, [int]$port) {
    $conns = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
    if (-not $conns) {
        Write-Host "$label (port $port) -> stopped"
        return
    }
    foreach ($procId in ($conns.OwningProcess | Sort-Object -Unique)) {
        $proc = Get-Process -Id $procId -ErrorAction SilentlyContinue
        $name = if ($proc) { $proc.ProcessName } else { "?" }
        Write-Host "$label (port $port) -> running, PID $procId ($name)"
    }
}

Show-PortStatus "backend " $BackendPort
Show-PortStatus "frontend" $FrontendPort
