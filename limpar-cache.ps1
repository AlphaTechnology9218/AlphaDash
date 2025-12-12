# Script para limpar cache do Vite e node_modules/.vite

Write-Host "Limpando cache do Vite..." -ForegroundColor Yellow

# Remove cache do Vite
if (Test-Path "node_modules\.vite") {
    Remove-Item -Recurse -Force "node_modules\.vite"
    Write-Host "✓ Cache do Vite removido" -ForegroundColor Green
}

# Remove dist se existir
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "✓ Pasta dist removida" -ForegroundColor Green
}

Write-Host ""
Write-Host "Cache limpo! Reinicie o servidor com: npm run dev" -ForegroundColor Cyan

