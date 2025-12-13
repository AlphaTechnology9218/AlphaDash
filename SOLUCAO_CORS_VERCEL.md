# 🔧 Solução: CORS Error - Frontend Tentando Acessar localhost

## ❌ Problema

O frontend no Vercel está tentando acessar `http://localhost:3001` em vez da URL do Render.

**Erro:**
```
Access to fetch at 'http://localhost:3001/api/auth/login' from origin 'https://alphadashtbr5-3zpruaas3-alphas-projects-010dc701.vercel.app' has been blocked by CORS policy
```

**Causa**: A variável `VITE_API_URL` não está configurada no Vercel ou o deploy foi feito antes de adicioná-la.

---

## ✅ Solução: Configurar Variável no Vercel

### Passo 1: Acessar Vercel Dashboard

1. Acesse: https://vercel.com/dashboard
2. Vá no seu projeto: `alphadashtbr5`
3. Clique em **Settings** → **Environment Variables**

### Passo 2: Adicionar Variável

Adicione esta variável:

```
Nome: VITE_API_URL
Valor: https://alphadash-78sf.onrender.com/api
Ambientes: ☑ Production ☑ Preview ☑ Development
```

**⚠️ IMPORTANTE**: 
- O valor deve ser `https://alphadash-78sf.onrender.com/api` (com `/api` no final)
- Marque TODOS os ambientes (Production, Preview, Development)

### Passo 3: Fazer Novo Deploy

**CRÍTICO**: Variáveis de ambiente só são aplicadas em NOVOS deploys!

1. Vá em **Deployments**
2. Clique nos **3 pontos** (⋮) do último deploy
3. Selecione **Redeploy**
4. Aguarde 2-3 minutos

**OU** faça um novo commit vazio para forçar deploy:

```powershell
git commit --allow-empty -m "trigger: Forçar deploy com VITE_API_URL"
git push origin main
```

---

## 🔍 Verificar se Funcionou

### 1. Verificar Variável no Build

Após o deploy, verifique os logs do build no Vercel. Deve aparecer:
```
VITE_API_URL=https://alphadash-78sf.onrender.com/api
```

### 2. Testar no Navegador

1. Acesse sua URL do Vercel
2. Abra o **Console** (F12)
3. Vá em **Network**
4. Tente fazer Login
5. Verifique se a requisição vai para:
   - ✅ `https://alphadash-78sf.onrender.com/api/auth/login`
   - ❌ NÃO deve ser `http://localhost:3001/api/auth/login`

### 3. Verificar Código

O código já está correto em `src/lib/api.ts`:

```typescript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
```

Se `VITE_API_URL` estiver configurada, usará ela. Caso contrário, usa `localhost` (apenas para desenvolvimento local).

---

## 🐛 Se Ainda Não Funcionar

### Verificar se Variável Está Aplicada

1. No Vercel, vá em **Deployments**
2. Clique no deploy mais recente
3. Veja os **Build Logs**
4. Procure por `VITE_API_URL`

Se não aparecer, a variável não foi aplicada. Faça um novo deploy.

### Limpar Cache

1. No Vercel, vá em **Settings** → **General**
2. Role até **Clear Build Cache**
3. Clique em **Clear**
4. Faça um novo deploy

### Verificar URL do Backend

Teste se o backend está online:
```
https://alphadash-78sf.onrender.com/health
```

Deve retornar: `{"ok":true,"db":"conectado"}`

---

## 📝 Checklist

- [ ] Variável `VITE_API_URL` adicionada no Vercel
- [ ] Valor: `https://alphadash-78sf.onrender.com/api`
- [ ] Ambientes: Production, Preview, Development (todos marcados)
- [ ] Novo deploy feito após adicionar variável
- [ ] Backend online: https://alphadash-78sf.onrender.com/health
- [ ] Frontend fazendo requisições para Render (não localhost)
- [ ] Console sem erros de CORS

---

## 🚀 Resumo Rápido

1. **Vercel** → Settings → Environment Variables
2. Adicione: `VITE_API_URL = https://alphadash-78sf.onrender.com/api`
3. **Redeploy** (ou novo commit)
4. Teste novamente

**O problema é que a variável não está configurada ou o deploy foi feito antes de adicioná-la!**



