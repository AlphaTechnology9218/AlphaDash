# ⚡ Configuração Rápida - Render.com

## 🎯 Configurações Essenciais

### No Dashboard do Render:

#### ⚠️ IMPORTANTE - Root Directory:
**DEIXE VAZIO** (não coloque nada aqui!)

#### 1. Build Command:
```
npm install
```

#### 2. Start Command:
```
node server/index.js
```

⚠️ **NÃO use:** `node src/server/index.js` ou `/opt/render/project/src/server/index.js`

#### 3. Environment Variables:

Adicione estas variáveis:

```
MONGODB_URI=mongodb+srv://alphatechjac_db_user:HBCOb4IsjsMhDphW@cluster0.lkqvngv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

```
JWT_SECRET=alphadash-secret-key-2024-super-seguro
```

```
NODE_ENV=production
```

```
FRONTEND_URL=https://seu-frontend.vercel.app
```
*(Adicione depois que fizer deploy do frontend)*

---

## ✅ Testar

Após o deploy, acesse:
```
https://seu-backend.onrender.com/health
```

Deve retornar: `{"ok":true,"db":"conectado"}`

---

## 🔗 URL da API

Sua API estará em:
```
https://seu-backend.onrender.com/api
```

Use esta URL no frontend como `VITE_API_URL`.

---

## 📝 Checklist

- [ ] Build Command: `npm install`
- [ ] Start Command: `node server/index.js`
- [ ] MONGODB_URI configurada
- [ ] JWT_SECRET configurada
- [ ] NODE_ENV=production
- [ ] Health check funcionando

**Pronto! 🚀**

