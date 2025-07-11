import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Trainer } from '../trainers/trainer.entity';
import { Team } from '../trainers/team.entity';
import { TeamPokemon } from '../trainers/team-pokemon.entity';

const databaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: process.env.DB_DATABASE || './database.sqlite',
  entities: [Trainer, Team, TeamPokemon],
  synchronize: process.env.NODE_ENV !== 'production', // Only for development
};

export default databaseConfig;
