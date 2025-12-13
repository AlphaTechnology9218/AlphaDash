# 🔗 Configurar Integração com Google Forms

## 📋 Visão Geral

Este guia explica como configurar a integração do AlphaDash com Google Forms para puxar dados automaticamente.

---

## ✅ Passo 1: Criar Service Account no Google Cloud

### 1.1 Acessar Google Cloud Console

1. Acesse: https://console.cloud.google.com
2. Faça login com: `alphatechjac@gmail.com`
3. Crie um novo projeto ou selecione um existente

### 1.2 Habilitar APIs Necessárias

1. Vá em **APIs & Services** → **Library**
2. Procure e habilite:
   - **Google Forms API**
   - **Google Drive API**

### 1.3 Criar Service Account

1. Vá em **APIs & Services** → **Credentials**
2. Clique em **Create Credentials** → **Service Account**
3. Preencha:
   - **Name**: `alphadash-forms-service`
   - **Description**: `Service account para integração com Google Forms`
4. Clique em **Create and Continue**
5. **Role**: Deixe vazio ou selecione "Editor" (opcional)
6. Clique em **Done**

### 1.4 Gerar Chave JSON

1. Clique no Service Account criado
2. Vá na aba **Keys**
3. Clique em **Add Key** → **Create new key**
4. Selecione **JSON**
5. Clique em **Create**
6. O arquivo JSON será baixado automaticamente

---

## ✅ Passo 2: Compartilhar Formulários com Service Account

### 2.1 Obter Email do Service Account

No arquivo JSON baixado, procure por:
```json
{
  "client_email": "alphadash-forms-service@seu-projeto.iam.gserviceaccount.com"
}
```

**Copie este email!**

### 2.2 Opção 1: Compartilhar Pasta Inteira (RECOMENDADO) ⭐

**Esta é a forma mais fácil!** Compartilhe uma pasta do Google Drive e todos os formulários dentro dela serão acessíveis.

1. No Google Drive, crie uma pasta (ex: "Formulários AlphaDash") ou use uma existente
2. Mova todos os formulários que deseja integrar para essa pasta
3. Clique com botão direito na pasta → **Share**
4. Cole o email do Service Account
5. Dê permissão de **Viewer** ou **Editor**
6. Marque **"Notify people"** como desmarcado (não precisa notificar)
7. Clique em **Send**

**✅ Pronto!** Todos os formulários na pasta agora são acessíveis pela Service Account.

### 2.3 Opção 2: Compartilhar Formulários Individuais

Se preferir compartilhar um por um:

1. No Google Drive, encontre o arquivo do formulário
2. Clique com botão direito → **Share**
3. Cole o email do Service Account
4. Dê permissão de **Viewer** ou **Editor**
5. Clique em **Send**

**⚠️ IMPORTANTE**: Se usar esta opção, repita para cada formulário.

---

## ✅ Passo 3: Configurar Variáveis de Ambiente

### 3.1 Extrair Dados do JSON

Abra o arquivo JSON baixado e extraia:

```json
{
  "type": "service_account",
  "project_id": "seu-projeto-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "alphadash-forms-service@seu-projeto.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```

### 3.2 Adicionar no `.env` (Local)

Crie/edite o arquivo `.env` na raiz do projeto:

```env
# Google Forms API
GOOGLE_SERVICE_ACCOUNT_EMAIL=alphadash-forms-service@seu-projeto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=seu-projeto-id
```

**⚠️ IMPORTANTE**: 
- Mantenha as aspas duplas no `GOOGLE_PRIVATE_KEY`
- Mantenha os `\n` na chave privada (serão convertidos automaticamente)

### 3.3 Adicionar no Render (Backend)

1. Acesse: https://dashboard.render.com
2. Vá no seu **Web Service** (backend)
3. Clique em **Environment**
4. Adicione as 3 variáveis:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=alphadash-forms-service@seu-projeto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=seu-projeto-id
```

5. Clique em **Save Changes**
6. Faça **Manual Deploy** → **Deploy latest commit**

---

## ✅ Passo 4: Obter ID do Formulário

### 4.1 Como Encontrar o Form ID

1. Abra seu Google Form
2. Olhe a URL:
   ```
   https://docs.google.com/forms/d/FORM_ID/edit
   ```
3. O `FORM_ID` é a parte entre `/forms/d/` e `/edit`

**Exemplo:**
```
URL: https://docs.google.com/forms/d/1a2b3c4d5e6f7g8h9i0j/edit
FORM_ID: 1a2b3c4d5e6f7g8h9i0j
```

---

## ✅ Passo 5: Testar Integração

### 5.1 Testar Localmente

1. Inicie o backend:
   ```powershell
   .\start-backend.ps1
   ```

2. Faça login no frontend

3. Use a API para listar formulários:
   ```bash
   GET http://localhost:3001/api/forms
   Authorization: Bearer SEU_TOKEN
   ```

4. Sincronizar respostas:
   ```bash
   POST http://localhost:3001/api/forms/FORM_ID/sync
   Authorization: Bearer SEU_TOKEN
   ```

### 5.2 Testar no Render

Após fazer deploy, teste:

```bash
GET https://alphadash-78sf.onrender.com/api/forms
Authorization: Bearer SEU_TOKEN
```

---

## 📚 Endpoints da API

### Listar Formulários
```
GET /api/forms
Authorization: Bearer TOKEN
```

### Buscar Respostas (sem salvar)
```
GET /api/forms/:formId/responses
Authorization: Bearer TOKEN
```

### Sincronizar Respostas (salvar no banco)
```
POST /api/forms/:formId/sync
Authorization: Bearer TOKEN
```

### Listar Respostas Sincronizadas
```
GET /api/forms/responses/all?formId=FORM_ID&limit=50&skip=0
Authorization: Bearer TOKEN
```

### Remover Resposta
```
DELETE /api/forms/responses/:responseId
Authorization: Bearer TOKEN
```

---

## 🔧 Troubleshooting

### Erro: "Permission denied"
- Verifique se compartilhou o formulário com o email do Service Account
- Verifique se as APIs estão habilitadas no Google Cloud

### Erro: "Invalid credentials"
- Verifique se as variáveis de ambiente estão corretas
- Verifique se a chave privada está com `\n` preservados

### Erro: "Form not found"
- Verifique se o Form ID está correto
- Verifique se o formulário foi compartilhado com o Service Account

---

## 📝 Próximos Passos

Após configurar, você pode:
1. Criar uma interface no frontend para sincronizar formulários
2. Configurar sincronização automática (webhook ou cron job)
3. Visualizar dados do Forms no dashboard

