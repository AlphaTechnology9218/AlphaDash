# 🔧 Adicionar Variável via Vercel CLI

## ✅ Vercel CLI Instalado!

Agora você pode adicionar a variável via linha de comando.

---

## 📋 Passo a Passo

### 1. Fazer Login no Vercel

```powershell
vercel login
```

Isso abrirá o navegador para você fazer login.

### 2. Adicionar Variável de Ambiente

Execute estes comandos (um para cada ambiente):

```powershell
# Para Production
vercel env add VITE_API_URL production

# Para Preview  
vercel env add VITE_API_URL preview

# Para Development
vercel env add VITE_API_URL development
```

**Quando perguntar o valor, digite:**
```
https://alphadash-78sf.onrender.com/api
```

### 3. Verificar se Foi Adicionada

```powershell
vercel env ls
```

Deve aparecer `VITE_API_URL` listada.

### 4. Fazer Novo Deploy

```powershell
vercel --prod
```

Ou aguarde o deploy automático após um novo commit.

---

## 🚀 Alternativa Rápida: Via Dashboard

Se preferir usar o dashboard:

1. Acesse: https://vercel.com/dashboard
2. Projeto → Settings → Environment Variables
3. **Add New**
4. Key: `VITE_API_URL`
5. Value: `https://alphadash-78sf.onrender.com/api`
6. **Save** (mesmo sem ver opções de ambiente)

**A variável será aplicada automaticamente em todos os ambientes!**

---

## ✅ Após Adicionar

**IMPORTANTE**: Faça um novo deploy!

- Via CLI: `vercel --prod`
- Via Dashboard: Deployments → Redeploy
- Via Git: Novo commit (deploy automático)

---

**Pronto! A variável será aplicada em todos os ambientes automaticamente!**



