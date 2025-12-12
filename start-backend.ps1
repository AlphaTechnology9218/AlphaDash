# Script para iniciar o servidor backend
# Adiciona Node ao PATH e inicia a API

$nodePath = "C:\Program Files\nodejs"
if (Test-Path $nodePath) {
    $env:Path = "$nodePath;" + $env:Path
    Write-Host "Node.js adicionado ao PATH" -ForegroundColor Green
    Write-Host "Iniciando servidor backend..." -ForegroundColor Yellow
    Write-Host "API rodando em: http://localhost:3001" -ForegroundColor Cyan
    npm run dev:server
} else {
    Write-Host "Erro: Node.js não encontrado em $nodePath" -ForegroundColor Red
    Write-Host "Por favor, instale o Node.js ou ajuste o caminho no script." -ForegroundColor Red
}
