# 🚀 Deploy no Vercel - Passo a Passo

## ✅ Problema Resolvido

O `vercel.json` tinha conflitos de merge. Já foi corrigido e commitado!

---

## 🎯 Deploy no Vercel

### Opção 1: Via Site (Mais Fácil) ⭐

1. **Acesse:** https://vercel.com
2. **"Add New"** → **"Project"**
3. **Conecte GitHub:**
   - Clique em "Import Git Repository"
   - Autorize o Vercel
   - Selecione: `AlphaTechnology9218/AlphaDash`

4. **Configure o Projeto:**
   - **Framework Preset:** Vite (detecta automaticamente)
   - **Root Directory:** (deixe vazio)
   - **Build Command:** `npm run build` (já vem preenchido)
   - **Output Directory:** `dist` (já vem preenchido)
   - **Install Command:** `npm install` (já vem preenchido)

5. **Environment Variables:**
   Clique em "Add" e adicione:
   ```
   Name: VITE_API_URL
   Value: https://alphadash-78sf.onrender.com/api
   ```

6. **Deploy:**
   - Clique em **"Deploy"**
   - Aguarde 2-3 minutos
   - Pronto! 🎉

---

### Opção 2: Via CLI

```powershell
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Build (testar localmente primeiro)
npm run build

# 4. Deploy
vercel --prod
```

Durante o deploy, o Vercel vai perguntar:
- **Set up and deploy?** → Yes
- **Which scope?** → Seu usuário
- **Link to existing project?** → No (primeira vez)
- **Project name?** → `alphadash` (ou o que preferir)
- **Directory?** → (Enter - deixa vazio)
- **Override settings?** → No

---

## ⚙️ Configuração Importante

### Environment Variable

**No Vercel Dashboard:**
1. Settings → Environment Variables
2. Adicione:
   ```
   VITE_API_URL=https://alphadash-78sf.onrender.com/api
   ```
3. **Importante:** Marque para "Production", "Preview" e "Development"

### Após Adicionar Variável

Se já fez deploy, precisa fazer **redeploy**:
1. Vá em "Deployments"
2. Clique nos 3 pontos do último deploy
3. "Redeploy"

---

## ✅ Verificar se Funcionou

Após o deploy:

1. **Acesse sua URL:** `https://seu-app.vercel.app`
2. **Teste:**
   - Criar conta
   - Fazer login
   - Usar o app

3. **Se não funcionar:**
   - Verifique se `VITE_API_URL` está configurada
   - Verifique se o backend no Render está online
   - Veja os logs no Vercel

---

## 🔧 Se Ainda Der Erro

### Erro: "Invalid vercel.json"

✅ **Já corrigido!** O arquivo foi atualizado.

Se ainda aparecer:
1. Delete o `vercel.json` (opcional para Vite)
2. Ou use a versão corrigida que já está no repositório

### Erro: "Build failed"

**Verifique:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js version: 18.x ou 20.x

### Erro: "API não conecta"

**Verifique:**
- `VITE_API_URL` configurada no Vercel
- Backend no Render está online
- CORS configurado no backend

---

## 📋 Checklist Final

Antes de considerar concluído:

- [ ] Projeto importado no Vercel
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] `VITE_API_URL` configurada
- [ ] Deploy concluído com sucesso
- [ ] Site acessível
- [ ] Signup/login funcionando

---

## 🎉 Pronto!

Agora você tem:
- ✅ Backend: `https://alphadash-78sf.onrender.com`
- ✅ Frontend: `https://seu-app.vercel.app`
- ✅ Tudo funcionando! 🚀

---

## 🔄 Atualizações Futuras

O Vercel faz deploy automático quando você faz push no GitHub:

```powershell
git add .
git commit -m "Atualização"
git push origin main
```

O Vercel detecta e faz deploy automaticamente! ✨

