import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamPokemon } from '../../trainers/team-pokemon.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamPokemon]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class TeamPokemonsModule {}
