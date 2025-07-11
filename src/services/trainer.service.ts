import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trainer } from '../trainers/trainer.entity';
import { CreateTrainerDto, UpdateTrainerDto } from '../dtos/trainer.dto';

@Injectable()
export class TrainerService {
  constructor(
    @InjectRepository(Trainer)
    private readonly trainerRepository: Repository<Trainer>,
  ) {}

  async create(createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    const trainer = this.trainerRepository.create(createTrainerDto);
    return await this.trainerRepository.save(trainer);
  }

  async findAll(): Promise<Trainer[]> {
    return await this.trainerRepository.find({
      relations: ['teams'],
    });
  }

  async findOne(id: string): Promise<Trainer> {
    const trainer = await this.trainerRepository.findOne({
      where: { id },
      relations: ['teams'],
    });

    if (!trainer) {
      throw new NotFoundException(`Treinador com ID ${id} não encontrado`);
    }

    return trainer;
  }

  async update(id: string, updateTrainerDto: UpdateTrainerDto): Promise<Trainer> {
    const trainer = await this.findOne(id);
    Object.assign(trainer, updateTrainerDto);
    return await this.trainerRepository.save(trainer);
  }

  async remove(id: string): Promise<void> {
    const trainer = await this.findOne(id);
    await this.trainerRepository.remove(trainer);
  }
}
