# 🐳 Docker Setup - Pokémon Teams API

Este documento explica como executar a API usando Docker e Docker Compose.

## 📋 Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+)

## 🚀 Execução Rápida

### 1. Com SQLite (Recomendado para desenvolvimento)
```bash
# Usando o script helper
./docker-setup.sh start

# Ou usando docker-compose diretamente
docker-compose up --build -d
```

### 2. Com PostgreSQL (Recomendado para produção)
```bash
# Usando o script helper
./docker-setup.sh start-postgres

# Ou usando docker-compose diretamente
docker-compose --profile postgres up --build -d
```

## 📱 Acessos

Após iniciar os containers:

- **API**: http://localhost:3000
- **Swagger**: http://localhost:3000/api
- **PostgreSQL**: localhost:5432 (apenas com perfil postgres)

## 🛠️ Comandos Úteis

### Script Helper
```bash
# Iniciar com SQLite
./docker-setup.sh start

# Iniciar com PostgreSQL
./docker-setup.sh start-postgres

# Parar serviços
./docker-setup.sh stop

# Ver logs
./docker-setup.sh logs

# Reiniciar
./docker-setup.sh restart

# Limpeza completa
./docker-setup.sh cleanup
```

### Docker Compose Direto
```bash
# Construir e iniciar
docker-compose up --build -d

# Parar
docker-compose down

# Ver logs
docker-compose logs -f pokemon-api

# Remover volumes (apaga dados)
docker-compose down -v
```

## 📊 Estrutura dos Containers

### pokemon-api
- **Imagem**: Node.js 18 Alpine
- **Porta**: 3000
- **Volumes**: `/app/data` (para SQLite)
- **Health Check**: Verificação a cada 30s

### postgres (opcional)
- **Imagem**: PostgreSQL 15 Alpine
- **Porta**: 5432
- **Volumes**: Dados persistentes
- **Credenciais**: Ver `docker-compose.yml`

## 🔧 Configuração

### Variáveis de Ambiente

Arquivo `.env.docker` (exemplo):
```env
NODE_ENV=production
PORT=3000

# SQLite (padrão)
DB_TYPE=sqlite
DB_DATABASE=/app/data/database.sqlite

# PostgreSQL (descomente para usar)
# DB_TYPE=postgres
# DB_HOST=postgres
# DB_PORT=5432
# DB_USERNAME=pokemon_user
# DB_PASSWORD=pokemon_password
# DB_DATABASE=pokeapi
```

### Customização

Para usar configurações personalizadas:

1. Copie `.env.docker` para `.env.docker.local`
2. Modifique as variáveis necessárias
3. O Docker Compose usará automaticamente

## 📦 Persistência de Dados

### SQLite
- **Volume**: `pokemon_data`
- **Localização**: `/app/data/database.sqlite`
- **Backup**: `docker cp pokemon-api:/app/data/database.sqlite ./backup.sqlite`

### PostgreSQL
- **Volume**: `postgres_data`
- **Backup**: `docker exec pokemon-postgres pg_dump -U pokemon_user pokeapi > backup.sql`

## 🐛 Troubleshooting

### Porta 3000 ocupada
```bash
# Verificar processos
lsof -i :3000

# Matar processo
kill -9 <PID>

# Ou usar porta diferente
PORT=3001 docker-compose up -d
```

### Problemas de permissão
```bash
# Recriar containers
docker-compose down -v
docker-compose up --build --force-recreate
```

### Ver logs detalhados
```bash
# Logs da aplicação
docker-compose logs -f pokemon-api

# Logs do PostgreSQL
docker-compose logs -f postgres

# Logs de todos os serviços
docker-compose logs -f
```

### Limpeza completa
```bash
# Remove containers, volumes e imagens
./docker-setup.sh cleanup

# Ou manualmente
docker-compose down -v
docker system prune -a
```

## 🔄 Desenvolvimento com Docker

Para desenvolvimento contínuo:

```bash
# Modo watch (recompila automaticamente)
docker-compose up --build

# Executar comandos no container
docker-compose exec pokemon-api npm run lint
docker-compose exec pokemon-api npm test

# Acessar shell do container
docker-compose exec pokemon-api sh
```

## 🌐 Deploy em Produção

Para deploy em produção:

1. Use PostgreSQL em vez de SQLite
2. Configure variáveis de ambiente seguras
3. Use proxy reverso (nginx/traefik)
4. Configure backup automatizado
5. Monitore logs e métricas

Exemplo com nginx:
```nginx
server {
    listen 80;
    server_name api.seudominio.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

🎯 **Dica**: Use o script `./docker-setup.sh` para operações mais simples e `docker-compose` para controle fino!
