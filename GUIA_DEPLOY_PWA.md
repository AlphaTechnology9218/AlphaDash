# 🚀 Guia Completo: Deploy Online e Instalação como PWA

## 📋 Índice
1. [Preparar o Projeto para Produção](#1-preparar-o-projeto-para-produção)
2. [Opções de Hospedagem](#2-opções-de-hospedagem)
3. [Deploy do Frontend](#3-deploy-do-frontend)
4. [Deploy do Backend](#4-deploy-do-backend)
5. [Instalar como PWA](#5-instalar-como-pwa)

---

## 1. Preparar o Projeto para Produção

### 1.1. Build do Frontend

```powershell
npm run build
```

Isso cria a pasta `dist/` com os arquivos otimizados para produção.

### 1.2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.production` na raiz:

```env
VITE_API_URL=https://seu-backend.com/api
```

Ou configure diretamente no serviço de hospedagem.

### 1.3. Verificar Build Localmente

```powershell
npm run preview
```

Acesse http://localhost:4173 para testar o build.

---

## 2. Opções de Hospedagem

### 🟢 Opção 1: Vercel (Recomendado - Grátis)

**Vantagens:**
- ✅ Grátis
- ✅ Deploy automático via Git
- ✅ HTTPS automático
- ✅ CDN global
- ✅ Suporta PWA

**Passos:**

1. **Instalar Vercel CLI:**
   ```powershell
   npm install -g vercel
   ```

2. **Fazer login:**
   ```powershell
   vercel login
   ```

3. **Deploy:**
   ```powershell
   vercel
   ```

4. **Configurar variáveis de ambiente:**
   - Acesse: https://vercel.com/dashboard
   - Vá em Settings → Environment Variables
   - Adicione: `VITE_API_URL` com a URL do seu backend

### 🟢 Opção 2: Netlify (Grátis)

**Passos:**

1. **Instalar Netlify CLI:**
   ```powershell
   npm install -g netlify-cli
   ```

2. **Fazer login:**
   ```powershell
   netlify login
   ```

3. **Deploy:**
   ```powershell
   netlify deploy --prod
   ```

4. **Ou arraste a pasta `dist/` para:** https://app.netlify.com/drop

### 🟢 Opção 3: GitHub Pages (Grátis)

**Passos:**

1. **Adicionar script no `package.json`:**
   ```json
   "scripts": {
     "deploy:gh": "npm run build && gh-pages -d dist"
   }
   ```

2. **Instalar gh-pages:**
   ```powershell
   npm install -g gh-pages
   ```

3. **Deploy:**
   ```powershell
   npm run deploy:gh
   ```

### 🟢 Opção 4: Render (Grátis)

1. Acesse: https://render.com
2. Conecte seu repositório GitHub
3. Configure:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
   - **Environment Variables:** `VITE_API_URL`

---

## 3. Deploy do Frontend

### 3.1. Usando Vercel (Exemplo Completo)

```powershell
# 1. Build
npm run build

# 2. Deploy
vercel

# 3. Configurar variáveis
# No dashboard da Vercel, adicione:
# VITE_API_URL=https://seu-backend.vercel.app/api
```

### 3.2. Arquivo `vercel.json` (Opcional)

Crie `vercel.json` na raiz:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/manifest.webmanifest",
      "headers": [
        { "key": "Content-Type", "value": "application/manifest+json" }
      ]
    }
  ]
}
```

---

## 4. Deploy do Backend

### 4.1. Render.com (Recomendado - Grátis)

1. **Acesse:** https://render.com
2. **Crie novo Web Service**
3. **Conecte seu repositório**
4. **Configure:**
   - **Build Command:** `npm install`
   - **Start Command:** `node server/index.js`
   - **Environment Variables:**
     - `MONGODB_URI` (sua string de conexão)
     - `JWT_SECRET` (chave secreta)
     - `PORT` (deixe vazio, Render define automaticamente)

### 4.2. Railway (Alternativa - Grátis)

1. Acesse: https://railway.app
2. New Project → Deploy from GitHub
3. Configure as mesmas variáveis de ambiente

### 4.3. Atualizar URL da API no Frontend

Após deploy do backend, atualize `VITE_API_URL` no frontend:

```env
VITE_API_URL=https://seu-backend.onrender.com/api
```

---

## 5. Instalar como PWA

### 5.1. No Desktop (Chrome/Edge)

1. **Acesse seu site online**
2. **Procure o ícone de instalação** na barra de endereços (ou menu)
3. **Clique em "Instalar"**
4. **Ou acesse:** `/install` no seu site

### 5.2. No Android (Chrome)

1. **Abra o site no Chrome**
2. **Menu (3 pontos)** → **"Adicionar à tela inicial"**
3. **Ou aparecerá um banner:** "Adicionar AlphaDash à tela inicial"

### 5.3. No iOS (Safari)

1. **Abra o site no Safari**
2. **Compartilhar** (ícone de compartilhamento)
3. **"Adicionar à Tela de Início"**
4. **Personalize o nome** e clique em **"Adicionar"**

### 5.4. Verificar Instalação

Após instalar, o app aparecerá como um app nativo:
- ✅ Ícone na tela inicial
- ✅ Abre em modo standalone (sem barra do navegador)
- ✅ Funciona offline (com cache)
- ✅ Atualizações automáticas

---

## 🔧 Configurações Adicionais do PWA

### Melhorar Cache Offline

Edite `vite.config.ts` para adicionar cache da API:

```typescript
workbox: {
  runtimeCaching: [
    // ... cache de fonts existente ...
    {
      urlPattern: /^https:\/\/seu-backend\.com\/api\/.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        networkTimeoutSeconds: 10,
        cacheableResponse: {
          statuses: [0, 200]
        }
      }
    }
  ]
}
```

### Ícones PWA

Certifique-se de ter os ícones em `public/`:
- `pwa-192x192.png`
- `pwa-512x512.png`

---

## 📱 Testar PWA Localmente

### 1. Build e Preview

```powershell
npm run build
npm run preview
```

### 2. Acesse via HTTPS

PWAs precisam de HTTPS (exceto localhost):
- Use: https://localhost:8080 (pode dar aviso de certificado)
- Ou use: https://ngrok.com para criar túnel HTTPS

### 3. Verificar Manifest

Acesse: `http://localhost:4173/manifest.webmanifest`

Deve retornar JSON com informações do PWA.

---

## 🚀 Deploy Rápido (Resumo)

### Frontend (Vercel):
```powershell
npm run build
vercel
```

### Backend (Render):
1. Conecte GitHub
2. Configure variáveis de ambiente
3. Deploy automático

### Instalar PWA:
1. Acesse o site online
2. Clique em "Instalar" ou use `/install`
3. Pronto! 🎉

---

## 🐛 Problemas Comuns

### PWA não instala
- ✅ Verifique se está em HTTPS (ou localhost)
- ✅ Verifique se o manifest está acessível
- ✅ Verifique se os ícones existem

### API não funciona
- ✅ Verifique `VITE_API_URL` nas variáveis de ambiente
- ✅ Verifique CORS no backend
- ✅ Verifique se o backend está online

### Build falha
- ✅ Execute `npm install` antes
- ✅ Verifique erros no terminal
- ✅ Limpe cache: `npm run build -- --force`

---

## 📚 Recursos

- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Workbox Docs](https://developers.google.com/web/tools/workbox)

---

## ✅ Checklist Final

Antes de fazer deploy:

- [ ] Build funciona localmente (`npm run build`)
- [ ] Preview funciona (`npm run preview`)
- [ ] Variáveis de ambiente configuradas
- [ ] Backend deployado e funcionando
- [ ] `VITE_API_URL` aponta para backend correto
- [ ] Ícones PWA existem (`pwa-192x192.png`, `pwa-512x512.png`)
- [ ] Manifest acessível (`/manifest.webmanifest`)
- [ ] Testado em HTTPS (ou localhost)

**Pronto para deploy! 🚀**

