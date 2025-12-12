# ❓ Por Que "Cannot GET /"?

## 🔍 O Problema

O erro **"Cannot GET /"** acontece quando você tenta acessar uma rota que **não existe** no servidor.

---

## 📋 Rotas do Backend

O backend (`server/index.js`) só tem estas rotas:

### ✅ Rotas que EXISTEM:

1. **`/health`** - Health check
   - Acesse: http://localhost:3001/health
   - Retorna: `{"ok":true,"db":"conectado"}`

2. **`/api/auth/signup`** - Criar conta
   - POST: http://localhost:3001/api/auth/signup

3. **`/api/auth/login`** - Fazer login
   - POST: http://localhost:3001/api/auth/login

4. **`/api/data/*`** - Dados (scores, times, sessions)
   - GET/POST/DELETE: http://localhost:3001/api/data/...

### ❌ Rota que NÃO EXISTE:

- **`/`** (raiz) - ❌ Não existe!
  - Se você acessar: http://localhost:3001/
  - Resultado: **"Cannot GET /"** ❌

---

## 🎯 Por Que Isso Acontece?

### Cenário 1: Acessou o Backend Diretamente

Você abriu no navegador:
```
http://localhost:3001/
```

**Problema:** O backend não tem rota para `/` (raiz)

**Solução:** 
- ✅ Acesse o **frontend**: http://localhost:8080
- ✅ Ou teste: http://localhost:3001/health

### Cenário 2: Backend Não Está Rodando

Você tentou acessar qualquer rota, mas o backend não está ativo.

**Solução:**
```powershell
.\start-backend.ps1
```

### Cenário 3: Rota Incorreta

Você tentou acessar uma rota que não existe.

**Exemplo:**
- ❌ http://localhost:3001/login (não existe)
- ✅ http://localhost:3001/api/auth/login (correto)

---

## ✅ Como Usar Corretamente

### 1. Acesse o FRONTEND (não o backend):

```
✅ http://localhost:8080
```

O frontend é quem você usa no navegador!

### 2. O Frontend se Comunica com o Backend:

```
Frontend (8080)  ──API──>  Backend (3001)
   (você vê)              (trabalha em background)
```

### 3. Fluxo Correto:

1. **Inicie o backend:**
   ```powershell
   .\start-backend.ps1
   ```

2. **Inicie o frontend:**
   ```powershell
   .\start-dev.ps1
   ```

3. **Acesse no navegador:**
   ```
   http://localhost:8080
   ```

4. **O frontend automaticamente:**
   - Faz login → chama `http://localhost:3001/api/auth/login`
   - Busca dados → chama `http://localhost:3001/api/data/scores`
   - Tudo funciona! ✅

---

## 🔧 Adicionar Rota Raiz (Opcional)

Se você quiser que `http://localhost:3001/` funcione, adicione no `server/index.js`:

```javascript
// Adicione antes das outras rotas
app.get("/", (_req, res) => {
  res.json({ 
    message: "AlphaDash API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      auth: "/api/auth",
      data: "/api/data"
    }
  });
});
```

Mas **não é necessário!** O importante é usar o frontend.

---

## 📊 Resumo Visual

### ❌ ERRADO:
```
Navegador → http://localhost:3001/
           ↓
      "Cannot GET /"
```

### ✅ CORRETO:
```
Navegador → http://localhost:8080
           ↓
      Frontend (React)
           ↓
      API Calls → http://localhost:3001/api/...
           ↓
      Backend responde ✅
```

---

## 🎯 Resposta Direta

**"Cannot GET /" aconteceu porque:**

1. ✅ Você tentou acessar `http://localhost:3001/` diretamente
2. ✅ O backend não tem rota para `/` (raiz)
3. ✅ Você deve acessar o **frontend** em `http://localhost:8080`

**Solução:**
- ✅ Acesse: http://localhost:8080 (frontend)
- ✅ Deixe o backend rodando em background (porta 3001)
- ✅ O frontend se comunica com o backend automaticamente

---

## 💡 Dica

**Backend (3001)** = API (não é para abrir no navegador)
**Frontend (8080)** = Interface (é isso que você abre no navegador)

Sempre acesse o **frontend**! 🚀

