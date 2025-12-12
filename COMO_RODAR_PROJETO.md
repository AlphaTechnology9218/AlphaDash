# 🚀 Como Rodar o Projeto Completo

## 📋 Você Precisa de 2 Servidores

1. **Frontend** (React/Vite) - Interface do usuário
2. **Backend** (Express/Node) - API e banco de dados

---

## 🏠 Opção 1: Desenvolvimento Local

### Você precisa de 2 Terminais abertos:

#### Terminal 1 - Backend:
```powershell
.\start-backend.ps1
# ou
npm run dev:server
```

**Rodará em:** http://localhost:3001

#### Terminal 2 - Frontend:
```powershell
.\start-dev.ps1
# ou
npm run dev
```

**Rodará em:** http://localhost:8080

### ✅ Acesse:
- Frontend: http://localhost:8080
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/health

---

## 🌐 Opção 2: Produção Online (Deploy)

### Sim, você precisa fazer deploy em 2 lugares diferentes:

#### 1. Backend → Render.com (Grátis)

**Por quê Render?**
- ✅ Grátis
- ✅ Suporta Node.js
- ✅ Conecta com MongoDB
- ✅ Fácil configuração

**Como fazer:**
1. Acesse: https://render.com
2. Conecte seu GitHub
3. Crie Web Service
4. Configure:
   - Build: `npm install`
   - Start: `node server/index.js`
   - Variáveis: `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV`
5. Deploy automático!

**Resultado:** `https://seu-backend.onrender.com`

#### 2. Frontend → Vercel ou Netlify (Grátis)

**Vercel (Recomendado):**
```powershell
npm install -g vercel
vercel login
vercel --prod
```

**Ou Netlify:**
- Arraste a pasta `dist/` para: https://app.netlify.com/drop

**Resultado:** `https://seu-frontend.vercel.app`

### 🔗 Conectar Frontend ao Backend

No deploy do frontend, adicione variável de ambiente:

```
VITE_API_URL=https://seu-backend.onrender.com/api
```

---

## 🎯 Resumo Visual

### Desenvolvimento Local:
```
┌─────────────┐      ┌─────────────┐
│  Terminal 1 │      │  Terminal 2 │
│   Backend   │      │  Frontend    │
│  :3001      │      │  :8080       │
└─────────────┘      └─────────────┘
```

### Produção Online:
```
┌──────────────┐      ┌──────────────┐
│   Render     │      │   Vercel     │
│   Backend    │◄─────┤  Frontend    │
│  (API)       │      │  (Interface) │
└──────────────┘      └──────────────┘
```

---

## ⚠️ Erro "Cannot GET /"

Este erro acontece quando:

1. **Backend não está rodando** (mais comum)
   - ✅ Solução: Inicie o backend em um terminal

2. **Frontend tentando acessar rota que não existe**
   - ✅ Solução: Acesse http://localhost:8080 (não a raiz do backend)

3. **URL da API incorreta**
   - ✅ Solução: Verifique `VITE_API_URL` no frontend

---

## 🚀 Quick Start - Desenvolvimento

### Passo a Passo:

1. **Terminal 1 - Backend:**
   ```powershell
   cd C:\Users\AlphaFRC9218\Documents\alphadash-eco
   .\start-backend.ps1
   ```
   Aguarde: `API rodando em http://localhost:3001`

2. **Terminal 2 - Frontend:**
   ```powershell
   cd C:\Users\AlphaFRC9218\Documents\alphadash-eco
   .\start-dev.ps1
   ```
   Aguarde: `Local: http://localhost:8080`

3. **Acesse:** http://localhost:8080

---

## 🌐 Quick Start - Produção

### Passo a Passo:

1. **Deploy Backend (Render):**
   - Siga: `CONFIGURAR_RENDER.md`
   - Aguarde URL: `https://seu-backend.onrender.com`

2. **Deploy Frontend (Vercel):**
   ```powershell
   npm run build
   vercel --prod
   ```
   - Configure: `VITE_API_URL=https://seu-backend.onrender.com/api`

3. **Acesse:** Sua URL do Vercel

---

## 📝 Checklist

### Para Desenvolvimento Local:
- [ ] Backend rodando em :3001
- [ ] Frontend rodando em :8080
- [ ] MongoDB conectado (verificar logs do backend)
- [ ] Acessar http://localhost:8080

### Para Produção:
- [ ] Backend deployado no Render
- [ ] Frontend deployado no Vercel/Netlify
- [ ] `VITE_API_URL` configurado no frontend
- [ ] Variáveis de ambiente configuradas
- [ ] Testar signup/login funcionando

---

## 🐛 Problemas Comuns

### "Cannot GET /"
- ✅ Backend não está rodando → Inicie o backend

### "ERR_CONNECTION_REFUSED"
- ✅ Backend não está rodando → Inicie o backend
- ✅ Ou URL da API incorreta → Verifique `VITE_API_URL`

### "MongoDB connection failed"
- ✅ Verifique `MONGODB_URI` no `.env`
- ✅ Verifique se o IP está liberado no MongoDB Atlas

---

## 💡 Dica

**Para desenvolvimento:** Use 2 terminais locais (mais rápido)

**Para produção:** Use Render (backend) + Vercel (frontend) - ambos grátis!

---

**Precisa de ajuda?** Consulte:
- `INICIO_RAPIDO.md` - Guia geral
- `CONFIGURAR_RENDER.md` - Deploy do backend
- `GUIA_DEPLOY_PWA.md` - Deploy completo



