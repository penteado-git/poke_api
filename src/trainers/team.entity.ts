// src/modules/teams/entities/team.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Trainer } from './trainer.entity';
import { TeamPokemon } from './team-pokemon.entity';

@Entity('teams')
export class Team {
    @ApiProperty({ description: 'ID único do time', example: 'uuid-string' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Nome do time', example: 'Team Rocket' })
    @Column({ length: 100 })
    name: string; // nomeDoTime

    @ApiProperty({ description: 'ID do treinador', example: 'uuid-string' })
    @Column()
    trainerId: string; // Foreign key para o Trainer

    @ApiProperty({ description: 'Treinador do time', type: () => Trainer })
    @ManyToOne(() => Trainer, trainer => trainer.teams, { onDelete: 'CASCADE' })
    trainer: Trainer; // A propriedade que faz a ligação de volta para o Trainer

    @ApiProperty({ description: 'Pokémon do time', type: () => [TeamPokemon] })
    @OneToMany(() => TeamPokemon, teamPokemon => teamPokemon.team)
    teamPokemons: TeamPokemon[];
}