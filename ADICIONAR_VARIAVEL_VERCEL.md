# 🔧 Como Adicionar Variável de Ambiente no Vercel

## 📋 Método 1: Via Dashboard (Interface Nova)

### Passo a Passo:

1. **Acesse**: https://vercel.com/dashboard
2. **Clique no seu projeto**: `alphadashtbr5`
3. **Settings** (no menu superior)
4. **Environment Variables** (menu lateral esquerdo)
5. **Add New** (botão no topo)
6. Preencha:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://alphadash-78sf.onrender.com/api`
   - **Environment**: Se aparecer opções, marque todas. Se não aparecer, deixe como está.
7. **Save**

---

## 📋 Método 2: Durante o Deploy (Se não aparecer na Settings)

### Opção A: Via CLI do Vercel

```powershell
# 1. Instalar Vercel CLI (se ainda não tiver)
npm install -g vercel

# 2. Login
vercel login

# 3. Adicionar variável
vercel env add VITE_API_URL

# Quando perguntar:
# - Value: https://alphadash-78sf.onrender.com/api
# - Environment: production, preview, development (marque todos)
```

### Opção B: Via arquivo `.env.production`

1. Crie um arquivo `.env.production` na raiz do projeto:

```env
VITE_API_URL=https://alphadash-78sf.onrender.com/api
```

2. Commit e push:

```powershell
git add .env.production
git commit -m "Add production environment variable"
git push origin main
```

**⚠️ ATENÇÃO**: Este arquivo será commitado no Git. Se preferir não commitar, use o Método 1 ou 2A.

---

## 📋 Método 3: Via vercel.json (Não Recomendado)

Você pode adicionar no `vercel.json`, mas variáveis sensíveis não devem ficar no código.

---

## 🔍 Verificar se a Variável Foi Adicionada

### 1. No Dashboard:

1. Vá em **Settings** → **Environment Variables**
2. Deve aparecer `VITE_API_URL` na lista

### 2. Nos Logs do Build:

1. Vá em **Deployments**
2. Clique no deploy mais recente
3. Veja os **Build Logs**
4. Procure por: `VITE_API_URL` ou `https://alphadash-78sf.onrender.com`

### 3. No Código (Runtime):

A variável estará disponível como `import.meta.env.VITE_API_URL`

---

## 🐛 Se Ainda Não Funcionar

### Verificar Interface do Vercel

A interface pode ter mudado. Tente:

1. **Atualizar a página** (F5)
2. **Usar outro navegador**
3. **Verificar se está logado** corretamente

### Adicionar Manualmente via CLI

```powershell
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Listar variáveis atuais
vercel env ls

# Adicionar nova variável
vercel env add VITE_API_URL production
# Quando perguntar o valor, digite: https://alphadash-78sf.onrender.com/api

# Repetir para preview e development
vercel env add VITE_API_URL preview
vercel env add VITE_API_URL development
```

---

## ✅ Após Adicionar a Variável

**IMPORTANTE**: Faça um novo deploy!

1. **Redeploy**:
   - Deployments → 3 pontos → Redeploy

2. **OU novo commit**:
   ```powershell
   git commit --allow-empty -m "trigger: Redeploy com variável de ambiente"
   git push origin main
   ```

---

## 📝 Checklist

- [ ] Variável `VITE_API_URL` adicionada
- [ ] Valor: `https://alphadash-78sf.onrender.com/api`
- [ ] Novo deploy feito
- [ ] Verificado nos logs do build
- [ ] Frontend fazendo requisições para Render (não localhost)

---

## 💡 Dica

Se a interface do Vercel não mostrar as opções de ambiente, **não se preocupe**. A variável será aplicada automaticamente em todos os ambientes (Production, Preview, Development) quando você adicionar via dashboard.

**O importante é adicionar a variável e fazer um novo deploy!**


