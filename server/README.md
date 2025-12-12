# API backend (Express + MongoDB)

## Variáveis de ambiente
O arquivo `.env` já foi criado na raiz do projeto com:
```
MONGODB_URI=mongodb+srv://alphatechjac_db_user:HBCOb4IsjsMhDphW@cluster0.lkqvngv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=3001
JWT_SECRET=seu-secret-super-seguro-aqui
```
> **Não** commit sua senha. O `.env` está no `.gitignore`.

**Importante:** Altere o `JWT_SECRET` para uma string aleatória e segura em produção!

## Scripts (PowerShell)

### Se npm não funcionar diretamente:
Use o caminho completo ou o script helper:
```powershell
# Opção 1: Caminho completo
& "C:\Program Files\nodejs\npm.cmd" install
& "C:\Program Files\nodejs\npm.cmd" run dev:server

# Opção 2: Script helper
.\npm-run.ps1 install
.\npm-run.ps1 run dev:server
```

### Comandos normais (se npm estiver no PATH):
```powershell
npm install
npm run dev:server
```

## Endpoints
- `GET /health` — retorna status da API e do MongoDB

## Fluxo
1. ✅ `.env` já configurado
2. ✅ Dependências instaladas
3. Execute: `& "C:\Program Files\nodejs\npm.cmd" run dev:server`
4. Teste: Abra `http://localhost:3001/health` no navegador ou use:
   ```powershell
   Invoke-WebRequest -Uri http://localhost:3001/health -UseBasicParsing
   ```

## Solução de problemas

### npm não reconhecido no PowerShell
O Node está instalado em `C:\Program Files\nodejs`, mas pode não estar no PATH. Use:
- Caminho completo: `& "C:\Program Files\nodejs\npm.cmd" <comando>`
- Ou adicione ao PATH do sistema: Configurações → Variáveis de Ambiente → PATH → Adicionar `C:\Program Files\nodejs`

