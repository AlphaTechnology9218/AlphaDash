<<<<<<< HEAD
# Configuração de Armazenamento em Nuvem - AlphaDash

## ✅ O que foi implementado

### Backend (Express + MongoDB)
- ✅ Modelos MongoDB: User, Session, TimeRecord, ScoreData
- ✅ Autenticação JWT (signup, login)
- ✅ Rotas protegidas com middleware de autenticação
- ✅ CRUD completo para scores, times e sessions
- ✅ CORS configurado para comunicação com frontend

### Frontend (React + TypeScript)
- ✅ Integração com API via hooks customizados
- ✅ `useCloudScores` - gerencia scores na nuvem
- ✅ `useCloudTimes` - gerencia time records na nuvem
- ✅ `useCloudSessions` - gerencia sessões na nuvem
- ✅ Páginas de Login/Signup conectadas à API
- ✅ Rotas protegidas (requerem autenticação)
- ✅ Logout funcional

## 🚀 Como usar

### 1. Instalar dependências do backend
```powershell
& "C:\Program Files\nodejs\npm.cmd" install
```

### 2. Configurar variáveis de ambiente
O arquivo `.env` já está criado com:
- `MONGODB_URI` - conexão com MongoDB Atlas
- `PORT` - porta do servidor (3001)
- `JWT_SECRET` - chave secreta para tokens JWT

### 3. Iniciar o servidor backend
```powershell
& "C:\Program Files\nodejs\npm.cmd" run dev:server
```

O servidor estará rodando em `http://localhost:3001`

### 4. Iniciar o frontend
Em outro terminal:
```powershell
& "C:\Program Files\nodejs\npm.cmd" run dev
```

### 5. Usar a aplicação
1. Acesse `http://localhost:5173` (ou a porta do Vite)
2. Crie uma conta em `/signup` ou faça login em `/login`
3. Todos os dados (scores, times, sessions) serão salvos automaticamente na nuvem!

## 📡 Endpoints da API

### Autenticação
- `POST /api/auth/signup` - Criar conta
- `POST /api/auth/login` - Fazer login

### Dados (requerem autenticação)
- `GET /api/data/scores` - Obter scores
- `PUT /api/data/scores` - Atualizar scores
- `POST /api/data/scores/reset` - Resetar scores
- `GET /api/data/times` - Obter time records
- `POST /api/data/times` - Criar time record
- `DELETE /api/data/times/:id` - Deletar time record
- `GET /api/data/sessions` - Obter sessões
- `POST /api/data/sessions` - Criar sessão
- `DELETE /api/data/sessions/:id` - Deletar sessão

## 🔒 Segurança

- Senhas são hasheadas com bcrypt antes de salvar
- Tokens JWT expiram em 30 dias
- Rotas de dados protegidas com middleware de autenticação
- CORS configurado para permitir apenas requisições do frontend

## 📝 Notas

- Os dados são salvos automaticamente na nuvem quando você faz login
- Se você não estiver logado, será redirecionado para `/login`
- Todos os dados são vinculados ao usuário logado
- O token JWT é armazenado no localStorage do navegador

## 🐛 Solução de problemas

### Erro de conexão com MongoDB
- Verifique se a `MONGODB_URI` está correta no `.env`
- Verifique se o IP está liberado no MongoDB Atlas

### Erro de autenticação
- Verifique se o token não expirou (faça login novamente)
- Verifique se o `JWT_SECRET` está configurado no `.env`

### Dados não aparecem
- Verifique se está logado
- Verifique se o servidor backend está rodando
- Abra o console do navegador para ver erros

=======
# Configuração de Armazenamento em Nuvem - AlphaDash

## ✅ O que foi implementado

### Backend (Express + MongoDB)
- ✅ Modelos MongoDB: User, Session, TimeRecord, ScoreData
- ✅ Autenticação JWT (signup, login)
- ✅ Rotas protegidas com middleware de autenticação
- ✅ CRUD completo para scores, times e sessions
- ✅ CORS configurado para comunicação com frontend

### Frontend (React + TypeScript)
- ✅ Integração com API via hooks customizados
- ✅ `useCloudScores` - gerencia scores na nuvem
- ✅ `useCloudTimes` - gerencia time records na nuvem
- ✅ `useCloudSessions` - gerencia sessões na nuvem
- ✅ Páginas de Login/Signup conectadas à API
- ✅ Rotas protegidas (requerem autenticação)
- ✅ Logout funcional

## 🚀 Como usar

### 1. Instalar dependências do backend
```powershell
& "C:\Program Files\nodejs\npm.cmd" install
```

### 2. Configurar variáveis de ambiente
O arquivo `.env` já está criado com:
- `MONGODB_URI` - conexão com MongoDB Atlas
- `PORT` - porta do servidor (3001)
- `JWT_SECRET` - chave secreta para tokens JWT

### 3. Iniciar o servidor backend
```powershell
& "C:\Program Files\nodejs\npm.cmd" run dev:server
```

O servidor estará rodando em `http://localhost:3001`

### 4. Iniciar o frontend
Em outro terminal:
```powershell
& "C:\Program Files\nodejs\npm.cmd" run dev
```

### 5. Usar a aplicação
1. Acesse `http://localhost:5173` (ou a porta do Vite)
2. Crie uma conta em `/signup` ou faça login em `/login`
3. Todos os dados (scores, times, sessions) serão salvos automaticamente na nuvem!

## 📡 Endpoints da API

### Autenticação
- `POST /api/auth/signup` - Criar conta
- `POST /api/auth/login` - Fazer login

### Dados (requerem autenticação)
- `GET /api/data/scores` - Obter scores
- `PUT /api/data/scores` - Atualizar scores
- `POST /api/data/scores/reset` - Resetar scores
- `GET /api/data/times` - Obter time records
- `POST /api/data/times` - Criar time record
- `DELETE /api/data/times/:id` - Deletar time record
- `GET /api/data/sessions` - Obter sessões
- `POST /api/data/sessions` - Criar sessão
- `DELETE /api/data/sessions/:id` - Deletar sessão

## 🔒 Segurança

- Senhas são hasheadas com bcrypt antes de salvar
- Tokens JWT expiram em 30 dias
- Rotas de dados protegidas com middleware de autenticação
- CORS configurado para permitir apenas requisições do frontend

## 📝 Notas

- Os dados são salvos automaticamente na nuvem quando você faz login
- Se você não estiver logado, será redirecionado para `/login`
- Todos os dados são vinculados ao usuário logado
- O token JWT é armazenado no localStorage do navegador

## 🐛 Solução de problemas

### Erro de conexão com MongoDB
- Verifique se a `MONGODB_URI` está correta no `.env`
- Verifique se o IP está liberado no MongoDB Atlas

### Erro de autenticação
- Verifique se o token não expirou (faça login novamente)
- Verifique se o `JWT_SECRET` está configurado no `.env`

### Dados não aparecem
- Verifique se está logado
- Verifique se o servidor backend está rodando
- Abra o console do navegador para ver erros

>>>>>>> 8973f19aa724bf4cf9f086bb4279aefa353827aa
