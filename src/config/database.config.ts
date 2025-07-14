import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Trainer } from '../trainers/trainer.entity';
import { Team } from '../trainers/team.entity';
import { TeamPokemon } from '../trainers/team-pokemon.entity';

const databaseConfig: TypeOrmModuleOptions = {
  type: (process.env.DB_TYPE as any) || 'sqlite',
  ...(process.env.DB_TYPE === 'postgres' ? {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'pokeapi',
  } : {
    database: process.env.DB_DATABASE || './database.sqlite',
  }),
  entities: [Trainer, Team, TeamPokemon],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
};

export default databaseConfig;
