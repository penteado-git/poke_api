// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import { TrainersModule } from './modules/trainers/trainers.module';
import { TeamsModule } from './modules/teams/teams.module';
import { TeamPokemonsModule } from './modules/team-pokemons/team-pokemons.module';
import { PokeapiModule } from './modules/pokeapi/pokeapi.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        TypeOrmModule.forRoot(databaseConfig),
        TrainersModule,
        TeamsModule,
        TeamPokemonsModule,
        PokeapiModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}