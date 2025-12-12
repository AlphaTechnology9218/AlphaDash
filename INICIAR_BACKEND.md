# 🚀 Como Iniciar o Backend

## ⚠️ Erro: ERR_CONNECTION_REFUSED

Este erro significa que o servidor backend não está rodando na porta 3001.

## ✅ Solução Rápida

### Opção 1: Usar Script Helper (Recomendado)
```powershell
.\start-backend.ps1
```

### Opção 2: Comando Direto
```powershell
npm run dev:server
```

### Opção 3: Se npm não funcionar
```powershell
$env:Path = "C:\Program Files\nodejs;" + $env:Path
npm run dev:server
```

## 📋 Checklist

Antes de iniciar, verifique:

1. ✅ **Arquivo `.env` existe** na raiz do projeto com:
   ```
   MONGODB_URI=mongodb+srv://...
   PORT=3001
   JWT_SECRET=seu-secret
   ```

2. ✅ **Dependências instaladas:**
   ```powershell
   npm install
   ```

3. ✅ **Porta 3001 livre** (não há outro processo usando)

## 🔍 Verificar se Está Funcionando

Após iniciar, teste no navegador ou PowerShell:

```powershell
Invoke-WebRequest -Uri http://localhost:3001/health -UseBasicParsing
```

Ou acesse no navegador: http://localhost:3001/health

Deve retornar: `{"ok":true,"db":"conectado"}`

## 🐛 Problemas Comuns

### Erro: "Cannot find module"
```powershell
npm install
```

### Erro: "MONGODB_URI não definida"
- Verifique se o arquivo `.env` existe na raiz
- Verifique se tem a linha `MONGODB_URI=...`

### Erro: "Port 3001 already in use"
- Feche outros processos Node.js
- Ou altere a porta no `.env`: `PORT=3002`

### Erro de conexão MongoDB
- Verifique se a `MONGODB_URI` está correta
- Verifique se o IP está liberado no MongoDB Atlas

## 📝 Logs Esperados

Quando iniciar corretamente, você deve ver:

```
API rodando em http://localhost:3001
```

Se houver erros, eles aparecerão no terminal.

## 🔄 Iniciar Frontend e Backend Juntos

**Terminal 1 - Backend:**
```powershell
.\start-backend.ps1
```

**Terminal 2 - Frontend:**
```powershell
.\start-dev.ps1
```

Ou use o script que inicia ambos:
```powershell
.\start-all.ps1
```

