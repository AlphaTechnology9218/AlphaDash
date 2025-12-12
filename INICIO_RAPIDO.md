# 🚀 Guia de Início Rápido - AlphaDash

## ✅ Configuração Inicial (Já Feita!)

- ✅ Node.js adicionado ao PATH do usuário
- ✅ Dependências instaladas
- ✅ MongoDB configurado
- ✅ Backend e Frontend prontos

## 🎯 Iniciar o Projeto

### Método 1: Scripts Helper (Mais Fácil)

**Terminal 1 - Frontend:**
```powershell
.\start-dev.ps1
```

**Terminal 2 - Backend:**
```powershell
.\start-backend.ps1
```

### Método 2: Comandos Diretos

**Terminal 1 - Frontend:**
```powershell
npm run dev
```

**Terminal 2 - Backend:**
```powershell
npm run dev:server
```

### Método 3: Ambos Juntos (Requer concurrently)
```powershell
.\start-all.ps1
```

## 🌐 URLs

Após iniciar os servidores:

- **Frontend:** http://localhost:8080
- **Backend API:** http://localhost:3001
- **Health Check:** http://localhost:3001/health

## 📝 Primeiro Uso

1. **Inicie o backend** (Terminal 1)
2. **Inicie o frontend** (Terminal 2)
3. **Acesse** http://localhost:8080
4. **Crie uma conta** em `/signup` ou faça **login** em `/login`
5. **Pronto!** Seus dados serão salvos automaticamente na nuvem (MongoDB)

## 🔧 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `.\start-dev.ps1` | Inicia apenas o frontend (Vite) |
| `.\start-backend.ps1` | Inicia apenas o backend (Express) |
| `.\start-all.ps1` | Inicia ambos simultaneamente |

## ⚠️ Importante

- **Reinicie o terminal** se `node` ou `npm` não forem reconhecidos
- O Node.js foi adicionado ao PATH, mas pode precisar reiniciar o terminal
- Use os scripts helper se não quiser reiniciar

## 🐛 Problemas?

### Node/npm não reconhecido
```powershell
# Verifique se está no PATH
node -v
npm -v

# Se não funcionar, reinicie o terminal ou use:
.\start-dev.ps1
```

### Porta já em uso
- Frontend: Altere a porta em `vite.config.ts` (padrão: 8080)
- Backend: Altere `PORT` no arquivo `.env` (padrão: 3001)

### Erro de conexão MongoDB
- Verifique o arquivo `.env` com a `MONGODB_URI` correta
- Verifique se o IP está liberado no MongoDB Atlas

## 📚 Documentação Completa

- `CLOUD_SETUP.md` - Configuração de armazenamento em nuvem
- `server/README.md` - Documentação da API
- `SOLUCAO_NODE_PATH.md` - Solução de problemas do PATH

