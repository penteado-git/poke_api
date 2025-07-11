import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../../trainers/team.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class TeamsModule {}
