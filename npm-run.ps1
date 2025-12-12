<<<<<<< HEAD
# Script helper para executar npm no PowerShell
# Uso: .\npm-run.ps1 install
#      .\npm-run.ps1 run dev:server

$npmPath = "C:\Program Files\nodejs\npm.cmd"

if (-not (Test-Path $npmPath)) {
    Write-Error "npm não encontrado em $npmPath"
    exit 1
}

$argsString = $args -join " "
& $npmPath $argsString

=======
# Script helper para executar npm no PowerShell
# Uso: .\npm-run.ps1 install
#      .\npm-run.ps1 run dev:server

$npmPath = "C:\Program Files\nodejs\npm.cmd"

if (-not (Test-Path $npmPath)) {
    Write-Error "npm não encontrado em $npmPath"
    exit 1
}

$argsString = $args -join " "
& $npmPath $argsString

>>>>>>> 8973f19aa724bf4cf9f086bb4279aefa353827aa
