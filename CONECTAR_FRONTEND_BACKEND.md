# 🔗 Como Conectar Frontend com Backend

## 📋 Visão Geral

- **Frontend**: Vercel (https://seu-projeto.vercel.app)
- **Backend**: Render (https://alphadash-78sf.onrender.com)
- **API URL**: `https://alphadash-78sf.onrender.com/api`

---

## ✅ Passo 1: Configurar Backend no Render

### 1.1 Variáveis de Ambiente no Render

1. Acesse: https://dashboard.render.com
2. Vá no seu serviço **Web Service** (backend)
3. Clique em **Environment**
4. Adicione/Verifique estas variáveis:

```
MONGODB_URI=mongodb+srv://alphatechjac_db_user:HBCOb4IsjsMhDphW@cluster0.lkqvngv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=3001
JWT_SECRET=alphadash-secret-key-2024-super-seguro
FRONTEND_URL=https://seu-projeto.vercel.app
```

**⚠️ IMPORTANTE**: Substitua `https://seu-projeto.vercel.app` pela URL real do seu frontend no Vercel!

### 1.2 Verificar se Backend está Online

1. Acesse: https://alphadash-78sf.onrender.com/health
2. Deve retornar: `{"ok":true,"db":"conectado"}`

Se retornar erro, aguarde alguns minutos (Render free tier "spins down" após inatividade).

---

## ✅ Passo 2: Configurar Frontend no Vercel

### 2.1 Variáveis de Ambiente no Vercel

1. Acesse: https://vercel.com/dashboard
2. Vá no seu projeto
3. Clique em **Settings** → **Environment Variables**
4. Adicione:

```
Nome: VITE_API_URL
Valor: https://alphadash-78sf.onrender.com/api
Ambientes: Production, Preview, Development
```

### 2.2 Fazer Novo Deploy

Após adicionar a variável:

1. Vá em **Deployments**
2. Clique nos 3 pontos do último deploy
3. **Redeploy** → Selecione "Use existing Build Cache"
4. Aguarde o deploy concluir

---

## ✅ Passo 3: Testar Conexão

### 3.1 Testar Backend Diretamente

Abra no navegador:
```
https://alphadash-78sf.onrender.com/health
```

Deve retornar:
```json
{
  "ok": true,
  "db": "conectado"
}
```

### 3.2 Testar Frontend

1. Acesse sua URL do Vercel
2. Tente fazer **Signup** ou **Login**
3. Verifique o console do navegador (F12) para erros

---

## 🔧 Configuração Local (Desenvolvimento)

### Criar arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3001/api
```

**⚠️ NÃO commite o `.env` no Git!** Ele já está no `.gitignore`.

### Rodar Backend Localmente:

```powershell
.\start-backend.ps1
```

Ou manualmente:
```powershell
$env:Path = "C:\Program Files\nodejs;" + $env:Path
npm run dev:server
```

### Rodar Frontend Localmente:

```powershell
.\start-dev.ps1
```

Ou manualmente:
```powershell
npm run dev
```

---

## 🐛 Troubleshooting

### Erro: "Failed to fetch" ou "Network Error"

**Causa**: Backend não está rodando ou CORS bloqueado

**Solução**:
1. Verifique se o backend está online: https://alphadash-78sf.onrender.com/health
2. Se estiver offline, aguarde 1-2 minutos (Render free tier)
3. Verifique se `FRONTEND_URL` no Render está correto

---

### Erro: "CORS policy" no console

**Causa**: `FRONTEND_URL` no backend não corresponde à URL do frontend

**Solução**:
1. No Render, verifique `FRONTEND_URL`
2. Deve ser exatamente: `https://seu-projeto.vercel.app` (sem `/` no final)
3. Faça **Redeploy** do backend após alterar

---

### Erro: "Cannot GET /" no backend

**Causa**: Normal! O backend não serve HTML, apenas API

**Solução**: Use `/health` ou `/api/auth/login` para testar

---

### Backend retorna "Bad Gateway"

**Causa**: Render free tier "spins down" após 15 minutos de inatividade

**Solução**:
1. Aguarde 1-2 minutos
2. Faça uma requisição: https://alphadash-78sf.onrender.com/health
3. Aguarde o backend "spin up"
4. Tente novamente

---

## 📝 Checklist Final

- [ ] Backend online: https://alphadash-78sf.onrender.com/health
- [ ] Variável `FRONTEND_URL` configurada no Render
- [ ] Variável `VITE_API_URL` configurada no Vercel
- [ ] Novo deploy feito no Vercel após adicionar variável
- [ ] Teste de Signup/Login funcionando
- [ ] Console do navegador sem erros de CORS

---

## 🚀 URLs de Referência

- **Backend Health**: https://alphadash-78sf.onrender.com/health
- **Backend API**: https://alphadash-78sf.onrender.com/api
- **Frontend**: https://seu-projeto.vercel.app (substitua pela sua URL)

---

## 💡 Dica

Para desenvolvimento local, o frontend já está configurado para usar `http://localhost:3001/api` automaticamente se `VITE_API_URL` não estiver definido.

**Pronto! Agora seu frontend está conectado ao backend! 🎉**



