import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TrainerService } from '../services/trainer.service';
import { CreateTrainerDto, UpdateTrainerDto } from '../dtos/trainer.dto';
import { Trainer } from '../trainers/trainer.entity';

@ApiTags('trainers')
@Controller('trainers')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo treinador' })
  @ApiResponse({ status: 201, description: 'Treinador criado com sucesso', type: Trainer })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body(ValidationPipe) createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    return await this.trainerService.create(createTrainerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os treinadores' })
  @ApiResponse({ status: 200, description: 'Lista de treinadores', type: [Trainer] })
  async findAll(): Promise<Trainer[]> {
    return await this.trainerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar treinador por ID' })
  @ApiParam({ name: 'id', description: 'ID do treinador' })
  @ApiResponse({ status: 200, description: 'Treinador encontrado', type: Trainer })
  @ApiResponse({ status: 404, description: 'Treinador não encontrado' })
  async findOne(@Param('id') id: string): Promise<Trainer> {
    return await this.trainerService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar treinador' })
  @ApiParam({ name: 'id', description: 'ID do treinador' })
  @ApiResponse({ status: 200, description: 'Treinador atualizado', type: Trainer })
  @ApiResponse({ status: 404, description: 'Treinador não encontrado' })
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateTrainerDto: UpdateTrainerDto,
  ): Promise<Trainer> {
    return await this.trainerService.update(id, updateTrainerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar treinador' })
  @ApiParam({ name: 'id', description: 'ID do treinador' })
  @ApiResponse({ status: 200, description: 'Treinador deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Treinador não encontrado' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.trainerService.remove(id);
    return { message: 'Treinador deletado com sucesso' };
  }
}
