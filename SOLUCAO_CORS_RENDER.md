# 🔧 Solução: CORS Error - Backend Render Bloqueando Frontend Vercel

## ❌ Problema

O backend no Render está bloqueando requisições do frontend no Vercel.

**Erro:**
```
Access to fetch at 'https://alphadash-78sf.onrender.com/api/auth/login' from origin 'https://alphadashtbr5-kux01gcci-alphas-projects-010dc701.vercel.app' has been blocked by CORS policy
```

**Causa**: A variável `FRONTEND_URL` no Render não está configurada ou está com a URL errada.

---

## ✅ Solução: Configurar FRONTEND_URL no Render

### Passo 1: Identificar URL do Frontend

Sua URL do frontend é:
```
https://alphadashtbr5-kux01gcci-alphas-projects-010dc701.vercel.app
```

**⚠️ IMPORTANTE**: Esta é uma URL de preview. A URL de produção será diferente (provavelmente `https://alphadashtbr5.vercel.app`).

### Passo 2: Configurar no Render

1. **Acesse**: https://dashboard.render.com
2. **Vá no seu Web Service** (backend)
3. **Clique em Environment** (menu lateral)
4. **Adicione/Atualize** a variável:

```
Nome: FRONTEND_URL
Valor: https://alphadashtbr5.vercel.app
```

**OU** se quiser permitir múltiplas URLs (preview + production), você precisará atualizar o código do backend (veja abaixo).

### Passo 3: Fazer Redeploy

Após adicionar/alterar a variável:

1. Vá em **Manual Deploy** → **Deploy latest commit**
2. Aguarde 2-3 minutos

---

## 🔧 Solução Alternativa: Permitir Múltiplas URLs

Se você quiser permitir tanto preview quanto production, atualize o código do backend:

### Atualizar `server/index.js`

```javascript
const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:5173",
  process.env.FRONTEND_URL,
  // Permitir todas as URLs do Vercel (preview + production)
  /^https:\/\/alphadashtbr5.*\.vercel\.app$/,
].filter(Boolean);
```

Mas a solução mais simples é configurar `FRONTEND_URL` com a URL de produção.

---

## 🔍 Verificar URL de Produção

Para descobrir a URL de produção do Vercel:

1. Acesse: https://vercel.com/dashboard
2. Vá no seu projeto
3. Veja a URL em **Domains** ou no topo da página
4. Geralmente é: `https://alphadashtbr5.vercel.app` (sem o hash do preview)

---

## 📝 Checklist

- [ ] Identificar URL de produção do Vercel
- [ ] Adicionar `FRONTEND_URL` no Render com a URL de produção
- [ ] Fazer redeploy do backend no Render
- [ ] Testar login/signup no frontend
- [ ] Verificar console sem erros de CORS

---

## 🐛 Se Ainda Não Funcionar

### Verificar se Backend Está Online

Teste: https://alphadash-78sf.onrender.com/health

Deve retornar: `{"ok":true,"db":"conectado"}`

### Verificar CORS no Código

O código já está configurado para aceitar `FRONTEND_URL`. Verifique se a variável está correta no Render.

### Permitir Todas as Origens (Temporário - Apenas para Teste)

Se quiser testar rapidamente, pode temporariamente permitir todas as origens no backend:

```javascript
app.use(cors({
  origin: true, // Permite todas as origens (apenas para teste!)
  credentials: true,
}));
```

**⚠️ NÃO use isso em produção!** É apenas para teste.

---

## ✅ Resumo Rápido

1. **Render** → Environment → Adicione `FRONTEND_URL=https://alphadashtbr5.vercel.app`
2. **Redeploy** do backend
3. **Teste** novamente

**O problema é que `FRONTEND_URL` não está configurada ou está com a URL errada no Render!**



