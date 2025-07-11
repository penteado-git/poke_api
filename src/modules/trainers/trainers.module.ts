import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainer } from '../../trainers/trainer.entity';
import { Team } from '../../trainers/team.entity';
import { TeamPokemon } from '../../trainers/team-pokemon.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trainer, Team, TeamPokemon]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class TrainersModule {}
