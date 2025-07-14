# 🐳 Configuração do Docker - Pokémon Teams API

### 🚀 Como Executar:

#### Opção 1: Script Helper (Recomendado)
```bash
# Tornar o script executável (já feito)
chmod +x docker-setup.sh

# Iniciar com SQLite
./docker-setup.sh start

# Ou iniciar com PostgreSQL
./docker-setup.sh start-postgres
```

#### Opção 2: Docker Compose Direto
```bash
# Com SQLite
docker-compose up --build -d

# Com PostgreSQL
docker-compose --profile postgres up --build -d
```

### 🔧 Resolução de Problemas de Permissão Docker:

Se você recebeu erro de permissão, execute:

```bash
# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER

# Reiniciar sessão ou executar
newgrp docker

# Testar se funciona
docker run hello-world
```

### 📱 Acessos Após Iniciar:

- **API**: http://localhost:3000
- **Swagger**: http://localhost:3000/api
- **PostgreSQL**: localhost:5432 (se usar postgres)

### 🎯 Características da Dockerização:

✅ **Multi-stage build** otimizado  
✅ **Usuário não-root** para segurança  
✅ **Health checks** configurados  
✅ **Volumes persistentes** para dados  
✅ **Suporte SQLite e PostgreSQL**  
✅ **Configuração por variáveis de ambiente**  
✅ **Scripts helper para facilitar uso**  
✅ **Documentação completa**  

### 🔄 Comandos Úteis:

```bash
# Ver logs
./docker-setup.sh logs

# Parar tudo
./docker-setup.sh stop

# Reiniciar
./docker-setup.sh restart

# Limpeza completa
./docker-setup.sh cleanup

# Ver status
docker-compose ps
```

### 📊 Estrutura Final:

```
poke_api/
├── Dockerfile              # Imagem da aplicação
├── docker-compose.yml      # Orquestração
├── .dockerignore          # Arquivos ignorados
├── .env.docker            # Env vars padrão
├── docker-setup.sh        # Script helper
├── DOCKER.md              # Documentação Docker
├── src/                   # Código fonte
├── package.json          # Dependencies
└── ... outros arquivos
```


**Próximos passos**: Execute `./docker-setup.sh start` e teste sua API dockerizada!
