# 🔗 Configurar Integração com Microsoft Forms

## 📋 Visão Geral

Este guia explica como configurar a integração do AlphaDash com Microsoft Forms para puxar dados automaticamente.

---

## ✅ Passo 1: Registrar Aplicativo no Azure AD

### 1.1 Acessar Azure Portal

1. Acesse: https://portal.azure.com
2. Faça login com sua conta Microsoft (ex: `alphatechjac@gmail.com`)
3. Vá em **Azure Active Directory** → **App registrations**

### 1.2 Criar Novo Registro

1. Clique em **New registration**
2. Preencha:
   - **Name**: `AlphaDash Forms Integration`
   - **Supported account types**: Selecione conforme necessário
   - **Redirect URI**: Deixe vazio (não necessário para client credentials)
3. Clique em **Register**

### 1.3 Obter Credenciais

1. Na página do app, vá em **Overview**
2. Copie:
   - **Application (client) ID** → `MICROSOFT_CLIENT_ID`
   - **Directory (tenant) ID** → `MICROSOFT_TENANT_ID`

### 1.4 Criar Client Secret

1. Vá em **Certificates & secrets**
2. Clique em **New client secret**
3. Preencha:
   - **Description**: `AlphaDash Forms Secret`
   - **Expires**: Escolha a validade (recomendado: 24 meses)
4. Clique em **Add**
5. **⚠️ IMPORTANTE**: Copie o **Value** imediatamente (não será mostrado novamente!)
   - Este é o `MICROSOFT_CLIENT_SECRET`

### 1.5 Configurar Permissões da API

1. Vá em **API permissions**
2. Clique em **Add a permission**
3. Selecione **Microsoft Graph**
4. Selecione **Application permissions**
5. Adicione as permissões:
   - `Forms.Read.All` (ler formulários)
   - `Forms.ReadWrite.All` (ler e escrever - se necessário)
6. Clique em **Add permissions**
7. Clique em **Grant admin consent** (necessário para permissões de aplicativo)

---

## ✅ Passo 2: Configurar Variáveis de Ambiente

### 2.1 Adicionar no `.env` (Local)

Crie/edite o arquivo `.env` na raiz do projeto:

```env
# Microsoft Forms API
MICROSOFT_CLIENT_ID=seu-client-id-aqui
MICROSOFT_CLIENT_SECRET=seu-client-secret-aqui
MICROSOFT_TENANT_ID=seu-tenant-id-aqui
```

### 2.2 Adicionar no Render (Backend)

1. Acesse: https://dashboard.render.com
2. Vá no seu **Web Service** (backend)
3. Clique em **Environment**
4. Adicione as 3 variáveis:

```
MICROSOFT_CLIENT_ID=seu-client-id-aqui
MICROSOFT_CLIENT_SECRET=seu-client-secret-aqui
MICROSOFT_TENANT_ID=seu-tenant-id-aqui
```

5. Clique em **Save Changes**
6. Faça **Manual Deploy** → **Deploy latest commit**

---

## ✅ Passo 3: Obter ID do Formulário

### 3.1 Como Encontrar o Form ID

1. Abra seu Microsoft Form
2. Olhe a URL:
   ```
   https://forms.office.com/r/FORM_ID
   ```
3. O `FORM_ID` é a parte após `/r/`

**Exemplo:**
```
URL: https://forms.office.com/r/1a2b3c4d5e6f7g8h9i0j
FORM_ID: 1a2b3c4d5e6f7g8h9i0j
```

**Alternativa:**
- Abra o formulário
- Vá em **Responses** → **Open in Excel**
- O ID pode estar na URL ou no nome do arquivo Excel

---

## ✅ Passo 4: Testar Integração

### 4.1 Testar Localmente

1. Inicie o backend:
   ```powershell
   .\start-backend.ps1
   ```

2. Faça login no frontend

3. Sincronizar respostas do Microsoft Forms:
   ```bash
   POST http://localhost:3001/api/forms/FORM_ID/sync
   Authorization: Bearer SEU_TOKEN
   Content-Type: application/json
   
   {
     "source": "microsoft"
   }
   ```

### 4.2 Testar no Render

Após fazer deploy, teste:

```bash
POST https://alphadash-78sf.onrender.com/api/forms/FORM_ID/sync
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "source": "microsoft"
}
```

---

## 📚 Endpoints da API

### Listar Formulários (Microsoft)
```
GET /api/forms?source=microsoft
Authorization: Bearer TOKEN
```

### Buscar Respostas (Microsoft Forms)
```
GET /api/forms/:formId/responses?source=microsoft
Authorization: Bearer TOKEN
```

### Sincronizar Respostas (Microsoft Forms)
```
POST /api/forms/:formId/sync
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "source": "microsoft"
}
```

### Listar Respostas Sincronizadas (filtrar por Microsoft)
```
GET /api/forms/responses/all?source=microsoft&limit=50&skip=0
Authorization: Bearer TOKEN
```

---

## 🔧 Troubleshooting

### Erro: "Invalid client"
- Verifique se `MICROSOFT_CLIENT_ID` está correto
- Verifique se `MICROSOFT_TENANT_ID` está correto

### Erro: "Invalid client secret"
- Verifique se `MICROSOFT_CLIENT_SECRET` está correto
- Se expirou, crie um novo secret no Azure Portal

### Erro: "Insufficient privileges"
- Verifique se as permissões foram concedidas
- Verifique se fez **Grant admin consent** no Azure Portal

### Erro: "Form not found"
- Verifique se o Form ID está correto
- Verifique se o formulário existe e está acessível

### Limitações da API do Microsoft Forms
- A API do Microsoft Forms é mais limitada que a do Google Forms
- Nem todos os formulários podem ser listados automaticamente
- Pode ser necessário usar o Form ID diretamente

---

## 📝 Notas Importantes

1. **Permissões**: As permissões de aplicativo requerem consentimento do administrador
2. **Secrets**: Os client secrets expiram - configure um lembrete para renovar
3. **Rate Limits**: Microsoft Graph API tem limites de taxa - implemente retry se necessário
4. **Form ID**: Pode ser necessário obter o Form ID manualmente da URL do formulário

---

## 🎯 Próximos Passos

Após configurar, você pode:
1. Sincronizar formulários do Microsoft Forms
2. Ver respostas no histórico junto com Google Forms
3. Filtrar por origem (Google ou Microsoft) no histórico


