# Pokémon Teams API

Uma API RESTful desenvolvida em NestJS para gerenciar Times de Pokémon criados por Treinadores. A API integra com a [PokéAPI](https://pokeapi.co/) para obter detalhes dos Pokémon e persiste dados de Treinadores e Times localmente.

## 🚀 Funcionalidades

### CRUD Completo
- **Treinadores**: Criar, listar, buscar, atualizar e deletar treinadores
- **Times**: Criar, listar, buscar, atualizar e deletar times (1:N com Treinadores)
- **Pokémon nos Times**: Adicionar, remover e listar Pokémon de um time (N:M com PokéAPI)

### Validações e Integrações
- ✅ Validação de existência do Pokémon na PokéAPI antes de adicionar
- ✅ Enriquecimento automático com detalhes da PokéAPI (nome, tipos, sprite, altura, peso)
- ✅ Limite máximo de 6 Pokémon por time
- ✅ Prevenção de Pokémon duplicados no mesmo time

### Arquitetura e Boas Práticas
- 🏗️ **Camadas bem definidas**: Controllers, Services, Repositories (TypeORM)
- 📋 **DTOs**: Validação com class-validator e class-transformer
- 📊 **Banco de Dados**: SQLite (desenvolvimento) / PostgreSQL (produção)
- 📖 **Documentação**: Swagger/OpenAPI completa
- 🔄 **CORS**: Habilitado para frontend

## 🛠️ Tecnologias

- **NestJS** - Framework Node.js
- **TypeORM** - ORM para banco de dados
- **SQLite** - Banco para desenvolvimento
- **Swagger** - Documentação da API
- **Axios** - Cliente HTTP para PokéAPI
- **Class Validator** - Validação de DTOs

## 📋 Pré-requisitos

- Node.js (v18+)
- npm ou yarn

## 🚀 Instalação e Execução

### 1. Clone o repositório
```bash
git clone <repository-url>
cd poke_api
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o ambiente (opcional)
Crie um arquivo `.env` na raiz do projeto:
```env
# Database Configuration
DB_TYPE=sqlite
DB_DATABASE=./database.sqlite

# Para PostgreSQL (produção)
# DB_HOST=localhost
# DB_PORT=5432
# DB_USERNAME=postgres
# DB_PASSWORD=password
# DB_DATABASE=pokeapi

NODE_ENV=development
PORT=3000
```

### 4. Execute a aplicação
```bash
# Desenvolvimento (com hot reload)
npm run start:dev

# Produção
npm run build
npm run start:prod
```

### 5. Acesse a aplicação
- **API**: http://localhost:3000
- **Documentação Swagger**: http://localhost:3000/api

## 📖 Endpoints da API

### Treinadores
- `POST /trainers` - Criar treinador
- `GET /trainers` - Listar todos os treinadores
- `GET /trainers/{id}` - Buscar treinador por ID
- `PATCH /trainers/{id}` - Atualizar treinador
- `DELETE /trainers/{id}` - Deletar treinador

### Times
- `POST /teams` - Criar time
- `GET /teams` - Listar todos os times
- `GET /teams/{id}` - Buscar time por ID
- `GET /teams/trainer/{trainerId}` - Listar times de um treinador
- `PATCH /teams/{id}` - Atualizar time
- `DELETE /teams/{id}` - Deletar time

### Pokémon dos Times
- `POST /teams/{teamId}/pokemons` - Adicionar Pokémon ao time
- `GET /teams/{teamId}/pokemons` - Listar Pokémon do time
- `DELETE /teams/{teamId}/pokemons/{pokemonId}` - Remover Pokémon do time

## 📊 Modelo de Dados

### Entidades

#### Trainer
```typescript
{
  id: string (UUID)
  name: string (max 100 chars)
  originCity?: string (max 100 chars)
  teams: Team[]
}
```

#### Team
```typescript
{
  id: string (UUID)
  name: string (max 100 chars)
  trainerId: string (UUID)
  trainer: Trainer
  teamPokemons: TeamPokemon[]
}
```

#### TeamPokemon
```typescript
{
  id: string (UUID)
  teamId: string (UUID)
  pokemonIdOrName: string
  team: Team
}
```

### Relacionamentos
- **Trainer → Team**: 1:N (Um treinador pode ter vários times)
- **Team → TeamPokemon**: 1:N (Um time pode ter vários Pokémon)
- **TeamPokemon → PokéAPI**: N:1 (Pokémon são consultados via API externa)

## 🎯 Exemplos de Uso

### 1. Criar um Treinador
```bash
curl -X POST http://localhost:3000/trainers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ash Ketchum",
    "originCity": "Pallet Town"
  }'
```

### 2. Criar um Time
```bash
curl -X POST http://localhost:3000/teams \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Equipe Principal",
    "trainerId": "uuid-do-treinador"
  }'
```

### 3. Adicionar Pokémon ao Time
```bash
curl -X POST http://localhost:3000/teams/{teamId}/pokemons \
  -H "Content-Type: application/json" \
  -d '{
    "pokemonIdOrName": "pikachu"
  }'
```

### 4. Listar Pokémon do Time (com detalhes da PokéAPI)
```bash
curl http://localhost:3000/teams/{teamId}/pokemons
```

**Resposta:**
```json
[
  {
    "id": "uuid",
    "teamId": "uuid",
    "pokemonIdOrName": "pikachu",
    "pokemon": {
      "id": 25,
      "name": "pikachu",
      "types": ["electric"],
      "sprite": "https://...",
      "height": 4,
      "weight": 60
    }
  }
]
```

## 🗄️ Banco de Dados

### Desenvolvimento
- **SQLite**: Arquivo local `database.sqlite`
- **Sincronização automática**: TypeORM cria/atualiza tabelas automaticamente

### Produção (Recomendado)
Para produção, configure PostgreSQL no arquivo `.env`

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes end-to-end
npm run test:e2e

# Coverage
npm run test:cov
```

## 📚 Decisões de Design

### 1. **Arquitetura em Camadas**
- **Controllers**: Recebem requisições e chamam services
- **Services**: Contêm lógica de negócio
- **Repositories**: Acesso a dados via TypeORM

### 2. **DTOs para Validação**
- Entrada e saída padronizadas
- Validação automática com decorators
- Transformação de tipos automática

### 3. **Integração com PokéAPI**
- Service dedicado (`PokeApiService`)
- Cache implícito via consultas sob demanda
- Validação antes de persistir

### 4. **Entidade TeamPokemon**
- Permite relacionamento N:M com PokéAPI
- Possibilita futuras expansões (estatísticas, movimentos, etc.)
- Facilita queries e performance

### 5. **SQLite para Desenvolvimento**
- Setup zero-config
- Arquivo local portable
- Fácil debug e inspeção

## 🔧 Scripts Disponíveis

```bash
npm run build          # Compilar para produção
npm run start          # Executar versão compilada
npm run start:dev      # Desenvolvimento com hot reload
npm run start:debug    # Debug mode
npm run start:prod     # Produção
npm run lint           # Linter
npm run test           # Testes unitários
npm run test:e2e       # Testes end-to-end
npm run test:cov       # Coverage dos testes
```

---

**Desenvolvido com ❤️ usando NestJS e TypeScript**
