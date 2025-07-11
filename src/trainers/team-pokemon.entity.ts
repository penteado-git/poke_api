// src/modules/team-pokemons/entities/team-pokemon.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Team } from './team.entity';

@Entity('team_pokemons')
export class TeamPokemon {
    @ApiProperty({ description: 'ID único da relação', example: 'uuid-string' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'ID do time', example: 'uuid-string' })
    @Column()
    teamId: string; // Foreign key para o Team

    @ApiProperty({ description: 'Nome ou ID do Pokémon', example: 'pikachu' })
    @Column()
    pokemonIdOrName: string; // "pikachu" ou 25

    @ApiProperty({ description: 'Time ao qual o Pokémon pertence', type: () => Team })
    @ManyToOne(() => Team, team => team.teamPokemons, { onDelete: 'CASCADE' })
    team: Team;
}