# 🌱 AlphaDash - Pontuação Ecológica

Dashboard interativo para acompanhamento de pontuação ecológica com armazenamento em nuvem (MongoDB Atlas).

## 🚀 Início Rápido

**Leia primeiro:** [`INICIO_RAPIDO.md`](./INICIO_RAPIDO.md)

### Iniciar o Projeto

**Terminal 1 - Frontend:**
```powershell
.\start-dev.ps1
# ou
npm run dev
```

**Terminal 2 - Backend:**
```powershell
.\start-backend.ps1
# ou
npm run dev:server
```

Acesse: **http://localhost:8080**

## ✨ Funcionalidades

- ✅ Dashboard de pontuação ecológica
- ✅ Cronômetro integrado
- ✅ Histórico de sessões
- ✅ Análises e gráficos
- ✅ **Armazenamento em nuvem (MongoDB)**
- ✅ **Autenticação de usuários**
- ✅ **Sincronização automática de dados**

## 🛠️ Tecnologias

### Frontend
- React + TypeScript
- Vite
- shadcn-ui
- Tailwind CSS
- React Router
- TanStack Query

### Backend
- Node.js + Express
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs

## 📁 Estrutura do Projeto

```
alphadash-eco/
├── src/              # Código do frontend
│   ├── pages/        # Páginas da aplicação
│   ├── components/   # Componentes React
│   ├── hooks/        # Hooks customizados
│   └── lib/          # Utilitários e API client
├── server/           # Código do backend
│   ├── models/       # Modelos MongoDB
│   ├── routes/       # Rotas da API
│   └── middleware/   # Middlewares (auth, etc)
└── public/           # Arquivos estáticos
```

## 📚 Documentação

- [`INICIO_RAPIDO.md`](./INICIO_RAPIDO.md) - Guia de início rápido
- [`CLOUD_SETUP.md`](./CLOUD_SETUP.md) - Configuração de armazenamento em nuvem
- [`server/README.md`](./server/README.md) - Documentação da API
- [`SOLUCAO_NODE_PATH.md`](./SOLUCAO_NODE_PATH.md) - Solução de problemas

## 🔧 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento (frontend) |
| `npm run dev:server` | Inicia servidor backend (API) |
| `npm run build` | Build de produção |
| `.\start-dev.ps1` | Script helper para frontend |
| `.\start-backend.ps1` | Script helper para backend |
| `.\start-all.ps1` | Inicia ambos simultaneamente |

## 🌐 URLs

- **Frontend:** http://localhost:8080
- **Backend API:** http://localhost:3001
- **Health Check:** http://localhost:3001/health

## 🔐 Autenticação

O projeto usa JWT para autenticação. Crie uma conta em `/signup` ou faça login em `/login`. Todos os dados são vinculados ao usuário logado e salvos automaticamente na nuvem.

## 📝 Variáveis de Ambiente

Crie um arquivo `.env` na raiz (já configurado):

```env
MONGODB_URI=mongodb+srv://...
PORT=3001
JWT_SECRET=seu-secret-super-seguro
```

## 🐛 Problemas Comuns

Consulte [`SOLUCAO_NODE_PATH.md`](./SOLUCAO_NODE_PATH.md) para problemas relacionados ao PATH do Node.js.

## 📄 Licença

Este projeto foi criado com [Lovable](https://lovable.dev).
