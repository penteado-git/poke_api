import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../../trainers/team.entity';
import { Trainer } from '../../trainers/trainer.entity';
import { TeamController } from '../../controllers/team.controller';
import { TeamService } from '../../services/team.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, Trainer]),
  ],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TypeOrmModule, TeamService],
})
export class TeamsModule {}
