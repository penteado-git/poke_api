import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Team } from './team.entity';

@Entity('trainers')
export class Trainer {
    @ApiProperty({ description: 'ID único do treinador', example: 'uuid-string' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Nome do treinador', example: 'Ash Ketchum' })
    @Column({ length: 100 })
    name: string;

    @ApiProperty({ description: 'Cidade de origem', example: 'Pallet Town', required: false })
    @Column({ length: 100, nullable: true })
    originCity: string;

    @ApiProperty({ description: 'Times do treinador', type: () => [Team] })
    @OneToMany(() => Team, team => team.trainer)
    teams: Team[];
}