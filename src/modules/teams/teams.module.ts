import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../../trainers/team.entity';
import { TeamController } from '../../controllers/team.controller';
import { TeamService } from '../../services/team.service';
import { TrainersModule } from '../trainers/trainers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team]),
    TrainersModule,
  ],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TypeOrmModule, TeamService],
})
export class TeamsModule {}
