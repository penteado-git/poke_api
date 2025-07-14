import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainer } from '../../trainers/trainer.entity';
import { Team } from '../../trainers/team.entity';
import { TeamPokemon } from '../../trainers/team-pokemon.entity';
import { TrainerController } from 'src/controllers/trainer.controller';
import { TrainerService } from '../../services/trainer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trainer, Team, TeamPokemon]),
  ],
  controllers: [TrainerController],
  providers: [TrainerService],
  exports: [TypeOrmModule, TrainerService],
})
export class TrainersModule {}
