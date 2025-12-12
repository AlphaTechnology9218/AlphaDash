# 🔧 Solução: Erro de Caminho no Render

## ❌ Erro Encontrado

```
Error: Cannot find module '/opt/render/project/src/server/index.js'
```

## ✅ Solução

O Render está procurando o arquivo no caminho errado. Siga estes passos:

### 1. No Dashboard do Render

1. Acesse seu Web Service
2. Vá em **"Settings"**
3. Procure por **"Root Directory"**
4. **⚠️ DEIXE VAZIO** (não coloque `server` ou `src`)

### 2. Verificar Start Command

No campo **"Start Command"**, deve estar:

```
node server/index.js
```

**NÃO use:**
- ❌ `node src/server/index.js`
- ❌ `/opt/render/project/src/server/index.js`
- ❌ `cd server && node index.js`

### 3. Verificar Build Command

Deve estar:

```
npm install
```

### 4. Estrutura do Projeto

O Render espera esta estrutura:

```
projeto/
├── server/
│   └── index.js  ← Render procura aqui
├── package.json
└── ...
```

### 5. Após Corrigir

1. Salve as alterações no Render
2. O Render fará um novo deploy automaticamente
3. Aguarde 2-5 minutos
4. Teste: `https://seu-backend.onrender.com/health`

---

## 📋 Checklist de Configuração

No Render Dashboard, verifique:

- [ ] **Root Directory:** VAZIO (não preenchido)
- [ ] **Build Command:** `npm install`
- [ ] **Start Command:** `node server/index.js`
- [ ] **Environment Variables:** Todas configuradas
- [ ] **Branch:** `main` (ou sua branch principal)

---

## 🔄 Se Ainda Não Funcionar

### Opção 1: Usar render.yaml

Crie um arquivo `render.yaml` na raiz do projeto (já criado):

```yaml
services:
  - type: web
    name: alphadash-api
    env: node
    buildCommand: npm install
    startCommand: node server/index.js
```

O Render detectará automaticamente.

### Opção 2: Verificar Logs

1. No dashboard do Render
2. Aba **"Logs"**
3. Veja o erro completo
4. Verifique se o caminho está correto

---

## ✅ Configuração Correta Final

```
Root Directory: (vazio)
Build Command: npm install
Start Command: node server/index.js
```

**Isso deve resolver o problema! 🚀**



