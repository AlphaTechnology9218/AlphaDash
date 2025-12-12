<<<<<<< HEAD
# Script para iniciar frontend e backend simultaneamente
# Requer: npm install -g concurrently (ou use dois terminais)

$nodePath = "C:\Program Files\nodejs"
if (Test-Path $nodePath) {
    $env:Path = "$nodePath;" + $env:Path
    
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  AlphaDash - Iniciando Servidores" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Frontend: http://localhost:8080" -ForegroundColor Green
    Write-Host "Backend:  http://localhost:3001" -ForegroundColor Green
    Write-Host ""
    Write-Host "Pressione Ctrl+C para parar ambos os servidores" -ForegroundColor Yellow
    Write-Host ""
    
    # Verifica se concurrently está instalado
    $hasConcurrently = npm list -g concurrently 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Instalando concurrently globalmente..." -ForegroundColor Yellow
        npm install -g concurrently
    }
    
    # Inicia ambos os servidores
    concurrently "npm run dev" "npm run dev:server" --names "FRONTEND,BACKEND" --prefix-colors "blue,green"
} else {
    Write-Host "Erro: Node.js não encontrado em $nodePath" -ForegroundColor Red
}

=======
# Script para iniciar frontend e backend simultaneamente
# Requer: npm install -g concurrently (ou use dois terminais)

$nodePath = "C:\Program Files\nodejs"
if (Test-Path $nodePath) {
    $env:Path = "$nodePath;" + $env:Path
    
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  AlphaDash - Iniciando Servidores" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Frontend: http://localhost:8080" -ForegroundColor Green
    Write-Host "Backend:  http://localhost:3001" -ForegroundColor Green
    Write-Host ""
    Write-Host "Pressione Ctrl+C para parar ambos os servidores" -ForegroundColor Yellow
    Write-Host ""
    
    # Verifica se concurrently está instalado
    $hasConcurrently = npm list -g concurrently 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Instalando concurrently globalmente..." -ForegroundColor Yellow
        npm install -g concurrently
    }
    
    # Inicia ambos os servidores
    concurrently "npm run dev" "npm run dev:server" --names "FRONTEND,BACKEND" --prefix-colors "blue,green"
} else {
    Write-Host "Erro: Node.js não encontrado em $nodePath" -ForegroundColor Red
}

>>>>>>> 8973f19aa724bf4cf9f086bb4279aefa353827aa
