<<<<<<< HEAD
# Script de deploy rápido
# Uso: .\deploy.ps1 [vercel|netlify|build]

param(
    [Parameter(Position=0)]
    [ValidateSet("vercel", "netlify", "build", "preview")]
    [string]$target = "build"
)

$env:Path = "C:\Program Files\nodejs;" + $env:Path

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AlphaDash - Deploy Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

switch ($target) {
    "build" {
        Write-Host "🔨 Fazendo build do projeto..." -ForegroundColor Yellow
        npm run build
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Build concluído! Pasta 'dist' criada." -ForegroundColor Green
            Write-Host "📁 Para testar localmente: npm run preview" -ForegroundColor Cyan
        }
    }
    
    "preview" {
        Write-Host "🔨 Fazendo build..." -ForegroundColor Yellow
        npm run build
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Build concluído!" -ForegroundColor Green
            Write-Host "🚀 Iniciando preview em http://localhost:4173" -ForegroundColor Cyan
            npm run preview
        }
    }
    
    "vercel" {
        Write-Host "🔨 Fazendo build..." -ForegroundColor Yellow
        npm run build
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "🚀 Fazendo deploy na Vercel..." -ForegroundColor Yellow
            
            # Verifica se vercel CLI está instalado
            $vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
            if (-not $vercelInstalled) {
                Write-Host "📦 Instalando Vercel CLI..." -ForegroundColor Yellow
                npm install -g vercel
            }
            
            vercel --prod
        }
    }
    
    "netlify" {
        Write-Host "🔨 Fazendo build..." -ForegroundColor Yellow
        npm run build
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "🚀 Fazendo deploy na Netlify..." -ForegroundColor Yellow
            
            # Verifica se netlify CLI está instalado
            $netlifyInstalled = Get-Command netlify -ErrorAction SilentlyContinue
            if (-not $netlifyInstalled) {
                Write-Host "📦 Instalando Netlify CLI..." -ForegroundColor Yellow
                npm install -g netlify-cli
            }
            
            netlify deploy --prod
        }
    }
}

Write-Host ""
Write-Host "✨ Concluído!" -ForegroundColor Green

=======
# Script de deploy rápido
# Uso: .\deploy.ps1 [vercel|netlify|build]

param(
    [Parameter(Position=0)]
    [ValidateSet("vercel", "netlify", "build", "preview")]
    [string]$target = "build"
)

$env:Path = "C:\Program Files\nodejs;" + $env:Path

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AlphaDash - Deploy Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

switch ($target) {
    "build" {
        Write-Host "🔨 Fazendo build do projeto..." -ForegroundColor Yellow
        npm run build
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Build concluído! Pasta 'dist' criada." -ForegroundColor Green
            Write-Host "📁 Para testar localmente: npm run preview" -ForegroundColor Cyan
        }
    }
    
    "preview" {
        Write-Host "🔨 Fazendo build..." -ForegroundColor Yellow
        npm run build
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Build concluído!" -ForegroundColor Green
            Write-Host "🚀 Iniciando preview em http://localhost:4173" -ForegroundColor Cyan
            npm run preview
        }
    }
    
    "vercel" {
        Write-Host "🔨 Fazendo build..." -ForegroundColor Yellow
        npm run build
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "🚀 Fazendo deploy na Vercel..." -ForegroundColor Yellow
            
            # Verifica se vercel CLI está instalado
            $vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
            if (-not $vercelInstalled) {
                Write-Host "📦 Instalando Vercel CLI..." -ForegroundColor Yellow
                npm install -g vercel
            }
            
            vercel --prod
        }
    }
    
    "netlify" {
        Write-Host "🔨 Fazendo build..." -ForegroundColor Yellow
        npm run build
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "🚀 Fazendo deploy na Netlify..." -ForegroundColor Yellow
            
            # Verifica se netlify CLI está instalado
            $netlifyInstalled = Get-Command netlify -ErrorAction SilentlyContinue
            if (-not $netlifyInstalled) {
                Write-Host "📦 Instalando Netlify CLI..." -ForegroundColor Yellow
                npm install -g netlify-cli
            }
            
            netlify deploy --prod
        }
    }
}

Write-Host ""
Write-Host "✨ Concluído!" -ForegroundColor Green

>>>>>>> 8973f19aa724bf4cf9f086bb4279aefa353827aa
