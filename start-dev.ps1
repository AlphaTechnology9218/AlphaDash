<<<<<<< HEAD
# Script para iniciar o servidor de desenvolvimento (Frontend)
# Adiciona Node ao PATH e inicia o Vite

$nodePath = "C:\Program Files\nodejs"
if (Test-Path $nodePath) {
    $env:Path = "$nodePath;" + $env:Path
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  AlphaDash - Frontend" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Servidor rodando em: http://localhost:8080" -ForegroundColor Green
    Write-Host ""
    Write-Host "Iniciando servidor de desenvolvimento..." -ForegroundColor Yellow
    npm run dev
} else {
    Write-Host "Erro: Node.js não encontrado em $nodePath" -ForegroundColor Red
    Write-Host "Por favor, instale o Node.js ou ajuste o caminho no script." -ForegroundColor Red
}

=======
# Script para iniciar o servidor de desenvolvimento (Frontend)
# Adiciona Node ao PATH e inicia o Vite

$nodePath = "C:\Program Files\nodejs"
if (Test-Path $nodePath) {
    $env:Path = "$nodePath;" + $env:Path
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  AlphaDash - Frontend" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Servidor rodando em: http://localhost:8080" -ForegroundColor Green
    Write-Host ""
    Write-Host "Iniciando servidor de desenvolvimento..." -ForegroundColor Yellow
    npm run dev
} else {
    Write-Host "Erro: Node.js não encontrado em $nodePath" -ForegroundColor Red
    Write-Host "Por favor, instale o Node.js ou ajuste o caminho no script." -ForegroundColor Red
}

>>>>>>> 8973f19aa724bf4cf9f086bb4279aefa353827aa
