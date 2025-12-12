# 🔧 Solução: Bad Gateway no Render

## ❌ Erro Encontrado

```
Bad Gateway
This service is currently unavailable.
```

## 🔍 Possíveis Causas

### 1. ⏱️ Serviço "Spinning Down" (Mais Comum)

**Render Free Tier desliga após 15 minutos de inatividade!**

**Sintomas:**
- Primeira requisição demora ~30 segundos
- Depois funciona normalmente
- Após 15 min sem uso, desliga novamente

**Solução:**
- ✅ Aguarde 30-60 segundos e tente novamente
- ✅ Ou use serviço pago (não desliga)
- ✅ Ou use cron job para manter ativo (UptimeRobot)

---

### 2. 🐛 Erro no Código (Serviço Crashando)

**Verificar:**

1. **Acesse o Dashboard do Render:**
   - https://dashboard.render.com
   - Clique no seu serviço
   - Aba **"Logs"**

2. **Procure por erros:**
   - `Error: Cannot find module`
   - `MONGODB_URI não definida`
   - `Port already in use`
   - Qualquer erro em vermelho

**Soluções Comuns:**

#### Erro: "Cannot find module"
```bash
# Verificar Build Command
npm install
```

#### Erro: "MONGODB_URI não definida"
- Verifique se adicionou a variável de ambiente
- Nome correto: `MONGODB_URI` (maiúsculas)

#### Erro: "Port already in use"
- Use `process.env.PORT` no código (não hardcode)
- Render define automaticamente

---

### 3. 🔄 Build em Andamento

**Sintomas:**
- Status mostra "Building" ou "Deploying"
- Bad Gateway durante o build

**Solução:**
- ✅ Aguarde o build completar (2-5 minutos)
- ✅ Verifique o status no dashboard

---

### 4. ⚙️ Configuração Incorreta

**Verificar no Render:**

#### Root Directory:
- ⚠️ Deve estar **VAZIO**

#### Build Command:
```bash
npm install
```

#### Start Command:
```bash
node server/index.js
```

**NÃO use:**
- ❌ `npm run dev`
- ❌ `npm start`
- ❌ `node src/server/index.js`

---

## ✅ Passo a Passo para Resolver

### 1. Verificar Status no Dashboard

1. Acesse: https://dashboard.render.com
2. Clique no seu serviço: `alphadash-78sf`
3. Veja o status:
   - 🟢 **Live** = Funcionando
   - 🟡 **Building** = Aguarde
   - 🔴 **Failed** = Ver logs

### 2. Verificar Logs

1. No dashboard, aba **"Logs"**
2. Procure por:
   - ✅ `API rodando em...` = Funcionando
   - ❌ Qualquer erro = Problema

### 3. Testar Health Check

Aguarde 30-60 segundos e teste:

```
https://alphadash-78sf.onrender.com/health
```

Deve retornar: `{"ok":true,"db":"conectado"}`

---

## 🔧 Soluções Específicas

### Se o Serviço Está "Spinning Down"

**Opção 1: Aguardar (Grátis)**
- Primeira requisição demora ~30s
- Depois funciona normalmente

**Opção 2: Manter Ativo (Grátis)**
- Use: https://uptimerobot.com
- Configure para fazer ping a cada 5 minutos
- Mantém o serviço ativo

**Opção 3: Upgrade (Pago)**
- Render Starter: $7/mês
- Não desliga automaticamente

### Se Há Erro nos Logs

**Copie o erro e verifique:**

#### "Cannot find module 'cors'"
```bash
# Build Command deve ser:
npm install
```

#### "MONGODB_URI não definida"
1. Settings → Environment
2. Adicione: `MONGODB_URI=...`
3. Redeploy

#### "Cannot find module '/opt/render/project/src/server/index.js'"
1. Root Directory: (vazio)
2. Start Command: `node server/index.js`

---

## 🚀 Verificar Configuração Correta

### No Render Dashboard:

#### Settings → Build & Deploy:

```
Root Directory: (VAZIO - não preencha)
Build Command: npm install
Start Command: node server/index.js
```

#### Settings → Environment:

```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=seu-secret
NODE_ENV=production
```

---

## 📊 Checklist de Diagnóstico

- [ ] Status no dashboard: "Live"?
- [ ] Logs mostram "API rodando"?
- [ ] Health check funciona após 30s?
- [ ] Variáveis de ambiente configuradas?
- [ ] Start Command correto: `node server/index.js`?
- [ ] Root Directory vazio?

---

## 🎯 Teste Rápido

### 1. Aguarde 30-60 segundos

### 2. Teste Health Check:

```bash
curl https://alphadash-78sf.onrender.com/health
```

Ou no navegador:
```
https://alphadash-78sf.onrender.com/health
```

### 3. Se ainda não funcionar:

1. Verifique logs no Render
2. Copie o erro
3. Siga as soluções acima

---

## 💡 Dica

**Bad Gateway geralmente é:**
- 80% = Serviço "spinning down" (aguarde 30s)
- 15% = Erro no código (ver logs)
- 5% = Configuração incorreta

**Solução mais rápida:**
1. Aguarde 30-60 segundos
2. Tente novamente
3. Se persistir, verifique logs

---

## 🔄 Redeploy Manual

Se nada funcionar:

1. No dashboard do Render
2. **"Manual Deploy"** → **"Deploy latest commit"**
3. Aguarde build completar
4. Teste novamente

---

**Precisa de mais ajuda?** Envie os logs do Render que eu ajudo a diagnosticar!


