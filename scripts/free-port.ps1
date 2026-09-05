<#
  Find whatever is listening on the given port(s) and kill it.
  Shared by both `make up` and `make down`.
  Looks up the PID via Get-NetTCPConnection (the actual process bound to the
  port), not a wrapper PID — e.g. on Windows `go run` execs a separate temp
  binary, so the wrapper's PID would not be the one holding the port.
#>
param(
    [Parameter(Mandatory = $true)]
    [int[]]$Ports
)

foreach ($port in $Ports) {
    $conns = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
    if (-not $conns) {
        Write-Host "  [port $port] free"
        continue
    }

    $ids = $conns.OwningProcess | Sort-Object -Unique
    foreach ($procId in $ids) {
        $proc = Get-Process -Id $procId -ErrorAction SilentlyContinue
        if ($proc) {
            Write-Host "  [port $port] in use by PID $procId ($($proc.ProcessName)) -> killing"
            Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
        }
    }
}

Start-Sleep -Milliseconds 400
