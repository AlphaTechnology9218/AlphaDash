# 🚀 Configurar Backend no Render.com

## 📋 Passo a Passo Completo

### 1. Criar o Web Service

1. Acesse: https://dashboard.render.com
2. Clique em **"New +"** → **"Web Service"**
3. Conecte seu repositório GitHub (ou GitLab/Bitbucket)
4. Selecione o repositório do projeto

---

## ⚙️ Configurações do Web Service

### Informações Básicas

- **Name:** `alphadash-api` (ou o nome que preferir)
- **Region:** Escolha a região mais próxima (ex: `Oregon (US West)`)
- **Branch:** `main` (ou a branch principal)
- **Root Directory:** ⚠️ **DEIXE VAZIO** (não coloque `server` ou `src`)

### Build & Start

#### Build Command:
```bash
npm install
```

#### Start Command:
```bash
node server/index.js
```

⚠️ **IMPORTANTE:** 
- Root Directory deve estar **VAZIO**
- Start Command deve ser: `node server/index.js` (caminho relativo à raiz)

---

## 🔐 Variáveis de Ambiente (Environment Variables)

Clique em **"Environment"** e adicione:

### Obrigatórias:

| Key | Value | Descrição |
|-----|-------|-----------|
| `MONGODB_URI` | `mongodb+srv://alphatechjac_db_user:HBCOb4IsjsMhDphW@cluster0.lkqvngv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0` | String de conexão do MongoDB |
| `JWT_SECRET` | `alphadash-secret-key-2024-super-seguro` | Chave secreta para tokens JWT (use uma chave forte!) |
| `NODE_ENV` | `production` | Ambiente de produção |

### Opcionais:

| Key | Value | Descrição |
|-----|-------|-----------|
| `PORT` | (deixe vazio) | Render define automaticamente (use `process.env.PORT` no código) |

---

## 📝 Verificar Código do Servidor

Certifique-se de que `server/index.js` usa `process.env.PORT`:

```javascript
const port = process.env.PORT || 3001;
```

Isso permite que o Render defina a porta automaticamente.

---

## 🚀 Deploy

1. Clique em **"Create Web Service"**
2. O Render começará a fazer deploy automaticamente
3. Aguarde o build completar (pode levar 2-5 minutos)
4. Quando aparecer **"Live"**, seu backend está online!

---

## 🔗 Obter URL do Backend

Após o deploy:

1. A URL será algo como: `https://alphadash-api.onrender.com`
2. **Importante:** Render adiciona `/` no final, então:
   - URL base: `https://alphadash-api.onrender.com`
   - Health check: `https://alphadash-api.onrender.com/health`
   - API: `https://alphadash-api.onrender.com/api`

---

## 🔧 Configurar Frontend para Usar o Backend

### Opção 1: Variável de Ambiente no Deploy

Se você fez deploy do frontend também:

1. No serviço do frontend (Vercel/Netlify), adicione:
   ```
   VITE_API_URL=https://alphadash-api.onrender.com/api
   ```

### Opção 2: Arquivo .env.production

Crie `.env.production` na raiz:

```env
VITE_API_URL=https://alphadash-api.onrender.com/api
```

Depois faça build:
```powershell
npm run build
```

---

## ✅ Testar o Backend

### 1. Health Check

Acesse no navegador:
```
https://seu-backend.onrender.com/health
```

Deve retornar:
```json
{"ok":true,"db":"conectado"}
```

### 2. Testar API

Use Postman, Insomnia ou curl:

```bash
# Signup
curl -X POST https://seu-backend.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@email.com","password":"123456"}'
```

---

## ⚠️ Importante: Render Free Tier

### Limitações do Plano Grátis:

- ⏱️ **Spins down após 15 minutos de inatividade**
- 🐌 **Primeira requisição pode demorar ~30 segundos** (wake up)
- 📊 **750 horas/mês** (suficiente para desenvolvimento)

### Soluções:

1. **Usar serviço pago** (se precisar de uptime 24/7)
2. **Usar cron job** para manter ativo (ex: UptimeRobot)
3. **Aceitar o delay** na primeira requisição

---

## 🔄 Atualizar Código

Render faz deploy automático quando você faz push no GitHub:

1. Faça alterações no código
2. Commit e push:
   ```bash
   git add .
   git commit -m "Atualização"
   git push
   ```
3. Render detecta e faz deploy automaticamente

---

## 📊 Monitoramento

### Logs

1. No dashboard do Render
2. Clique no seu serviço
3. Aba **"Logs"**
4. Veja logs em tempo real

### Métricas

- **CPU Usage**
- **Memory Usage**
- **Request Count**

---

## 🐛 Problemas Comuns

### Erro: "Cannot find module"

**Solução:**
- Verifique se `package.json` tem todas as dependências
- Verifique se o Build Command está correto: `npm install`

### Erro: "MONGODB_URI não definida"

**Solução:**
- Verifique se adicionou a variável de ambiente no Render
- Verifique se o nome está correto: `MONGODB_URI` (maiúsculas)

### Erro: "Port already in use"

**Solução:**
- Use `process.env.PORT` no código (não hardcode)
- Render define a porta automaticamente

### Backend demora para responder

**Solução:**
- Normal no plano grátis (spin down)
- Primeira requisição pode demorar ~30s
- Use serviço pago ou cron job para manter ativo

### CORS Error no Frontend

**Solução:**
- Verifique se o CORS está configurado no backend
- Adicione a URL do frontend no CORS:

```javascript
// server/index.js
app.use(cors({
  origin: [
    'http://localhost:8080',
    'https://seu-frontend.vercel.app',
    'https://seu-frontend.netlify.app'
  ]
}));
```

---

## 📝 Checklist Final

Antes de considerar concluído:

- [ ] Build Command: `npm install`
- [ ] Start Command: `node server/index.js`
- [ ] Variável `MONGODB_URI` configurada
- [ ] Variável `JWT_SECRET` configurada
- [ ] Variável `NODE_ENV=production` configurada
- [ ] Health check funcionando: `/health`
- [ ] Frontend configurado com `VITE_API_URL`
- [ ] Teste de signup/login funcionando

---

## 🎯 Próximos Passos

1. ✅ Backend configurado no Render
2. 📱 Fazer deploy do frontend (Vercel/Netlify)
3. 🔗 Conectar frontend ao backend
4. 📲 Testar instalação como PWA
5. 🎉 Pronto para uso!

---

## 📚 Recursos

- [Render Docs](https://render.com/docs)
- [Render Environment Variables](https://render.com/docs/environment-variables)
- [Render Free Tier](https://render.com/docs/free)

---

**Precisa de ajuda?** Verifique os logs no dashboard do Render para ver erros específicos.

