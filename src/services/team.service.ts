import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../trainers/team.entity';
import { Trainer } from '../trainers/trainer.entity';
import { CreateTeamDto, UpdateTeamDto } from '../dtos/team.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(Trainer)
    private readonly trainerRepository: Repository<Trainer>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    // Verifica se o treinador existe
    const trainer = await this.trainerRepository.findOne({
      where: { id: createTeamDto.trainerId },
    });

    if (!trainer) {
      throw new NotFoundException(`Treinador com ID ${createTeamDto.trainerId} não encontrado`);
    }
    
    const team = this.teamRepository.create(createTeamDto);
    return await this.teamRepository.save(team);
  }

  async findAll(): Promise<Team[]> {
    return await this.teamRepository.find({
      relations: ['trainer', 'teamPokemons'],
    });
  }

  async findOne(id: string): Promise<Team> {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: ['trainer', 'teamPokemons'],
    });

    if (!team) {
      throw new NotFoundException(`Time com ID ${id} não encontrado`);
    }

    return team;
  }

  async findByTrainer(trainerId: string): Promise<Team[]> {
    // Verifica se o treinador existe
    const trainer = await this.trainerRepository.findOne({
      where: { id: trainerId },
    });

    if (!trainer) {
      throw new NotFoundException(`Treinador com ID ${trainerId} não encontrado`);
    }
    
    return await this.teamRepository.find({
      where: { trainerId },
      relations: ['trainer', 'teamPokemons'],
    });
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const team = await this.findOne(id);
    Object.assign(team, updateTeamDto);
    return await this.teamRepository.save(team);
  }

  async remove(id: string): Promise<void> {
    const team = await this.findOne(id);
    await this.teamRepository.remove(team);
  }
}
