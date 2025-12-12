# 🔗 Configurar Render (Backend) + Vercel (Frontend)

## 📋 Visão Geral

- **Backend**: Render.com → `https://alphadash-78sf.onrender.com`
- **Frontend**: Vercel.com → `https://seu-projeto.vercel.app`
- **Conexão**: Frontend faz requisições para o Backend via API

---

## ✅ Passo 1: Configurar Backend no Render

### 1.1 Acessar Render Dashboard

1. Acesse: https://dashboard.render.com
2. Vá no seu **Web Service** (backend)
3. Clique em **Environment** (no menu lateral)

### 1.2 Adicionar Variáveis de Ambiente

Adicione/Verifique estas variáveis:

```
MONGODB_URI=mongodb+srv://alphatechjac_db_user:HBCOb4IsjsMhDphW@cluster0.lkqvngv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=3001
JWT_SECRET=alphadash-secret-key-2024-super-seguro
FRONTEND_URL=https://seu-projeto.vercel.app
```

**⚠️ IMPORTANTE**: 
- Substitua `https://seu-projeto.vercel.app` pela **URL real** do seu frontend no Vercel
- Se ainda não fez deploy no Vercel, faça primeiro e depois atualize aqui

### 1.3 Verificar Configurações do Serviço

No Render, verifique:

- **Build Command**: `npm install`
- **Start Command**: `node server/index.js`
- **Root Directory**: (deixe vazio)
- **Environment**: `Node`

### 1.4 Fazer Redeploy

Após adicionar/alterar variáveis:

1. Vá em **Manual Deploy** → **Deploy latest commit**
2. Ou aguarde o deploy automático (se conectado ao GitHub)

---

## ✅ Passo 2: Configurar Frontend no Vercel

### 2.1 Acessar Vercel Dashboard

1. Acesse: https://vercel.com/dashboard
2. Vá no seu projeto
3. Clique em **Settings** → **Environment Variables**

### 2.2 Adicionar Variável de Ambiente

Adicione:

```
Nome: VITE_API_URL
Valor: https://alphadash-78sf.onrender.com/api
Ambientes: ☑ Production ☑ Preview ☑ Development
```

### 2.3 Fazer Novo Deploy

Após adicionar a variável:

1. Vá em **Deployments**
2. Clique nos **3 pontos** do último deploy
3. **Redeploy** → Selecione "Use existing Build Cache"
4. Aguarde 2-3 minutos

---

## ✅ Passo 3: Verificar Conexão

### 3.1 Testar Backend

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
2. Abra o **Console do Navegador** (F12)
3. Tente fazer **Signup** ou **Login**
4. Verifique se não há erros de CORS ou conexão

---

## 🔧 Configuração do CORS (Backend)

O backend já está configurado para aceitar requisições do frontend:

```javascript
const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:5173",
  process.env.FRONTEND_URL,  // URL do Vercel
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins.length > 0 ? allowedOrigins : true,
  credentials: true,
}));
```

**Importante**: A variável `FRONTEND_URL` no Render deve corresponder exatamente à URL do Vercel!

---

## 🐛 Troubleshooting

### Erro: "CORS policy" no console

**Causa**: `FRONTEND_URL` no Render não corresponde à URL do Vercel

**Solução**:
1. No Render, verifique `FRONTEND_URL`
2. Deve ser: `https://seu-projeto.vercel.app` (sem `/` no final)
3. Faça **Redeploy** do backend após alterar

---

### Erro: "Failed to fetch" ou "Network Error"

**Causa**: Backend não está rodando ou URL incorreta

**Solução**:
1. Verifique: https://alphadash-78sf.onrender.com/health
2. Se retornar erro, aguarde 1-2 minutos (Render free tier "spins down")
3. Verifique se `VITE_API_URL` no Vercel está correto

---

### Backend retorna "Bad Gateway"

**Causa**: Render free tier "spins down" após 15 minutos de inatividade

**Solução**:
1. Aguarde 1-2 minutos
2. Faça uma requisição: https://alphadash-78sf.onrender.com/health
3. Aguarde o backend "spin up"
4. Tente novamente

---

### Frontend não encontra a API

**Causa**: Variável `VITE_API_URL` não configurada ou deploy antigo

**Solução**:
1. No Vercel, verifique se `VITE_API_URL` está configurada
2. Faça um **novo deploy** após adicionar a variável
3. Variáveis de ambiente só são aplicadas em novos deploys!

---

## 📝 Checklist Completo

### Render (Backend):
- [ ] Web Service criado
- [ ] `MONGODB_URI` configurada
- [ ] `JWT_SECRET` configurada
- [ ] `FRONTEND_URL` configurada (URL do Vercel)
- [ ] `PORT` configurada (3001)
- [ ] Build Command: `npm install`
- [ ] Start Command: `node server/index.js`
- [ ] Backend online: https://alphadash-78sf.onrender.com/health

### Vercel (Frontend):
- [ ] Projeto criado e deployado
- [ ] `VITE_API_URL` configurada: `https://alphadash-78sf.onrender.com/api`
- [ ] Variável aplicada em Production, Preview e Development
- [ ] Novo deploy feito após adicionar variável
- [ ] Frontend acessível e funcionando

### Testes:
- [ ] Backend `/health` retorna `{"ok":true,"db":"conectado"}`
- [ ] Frontend consegue fazer Signup/Login
- [ ] Console do navegador sem erros de CORS
- [ ] Dados sendo salvos no MongoDB

---

## 🚀 URLs de Referência

- **Backend Health**: https://alphadash-78sf.onrender.com/health
- **Backend API**: https://alphadash-78sf.onrender.com/api
- **Backend Root**: https://alphadash-78sf.onrender.com/
- **Frontend**: https://seu-projeto.vercel.app (substitua pela sua URL)

---

## 💡 Dica Importante

**Render Free Tier:**
- Backend "spins down" após 15 minutos de inatividade
- Primeira requisição após inatividade pode demorar 30-60 segundos
- Para produção, considere upgrade ou use outro serviço

**Vercel:**
- Deploy automático a cada push no GitHub
- Variáveis de ambiente precisam de novo deploy para serem aplicadas
- Cache pode ser limpo em Settings → Clear Build Cache

---

## ✅ Resumo Rápido

1. **Render**: Adicione `FRONTEND_URL=https://seu-projeto.vercel.app`
2. **Vercel**: Adicione `VITE_API_URL=https://alphadash-78sf.onrender.com/api`
3. **Redeploy**: Faça redeploy em ambos após adicionar variáveis
4. **Teste**: Verifique `/health` e teste Signup/Login

**Pronto! Frontend e Backend conectados! 🎉**


