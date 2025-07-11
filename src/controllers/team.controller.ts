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
import { TeamService } from '../services/team.service';
import { CreateTeamDto, UpdateTeamDto } from '../dtos/team.dto';
import { Team } from '../trainers/team.entity';

@ApiTags('teams')
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo time' })
  @ApiResponse({ status: 201, description: 'Time criado com sucesso', type: Team })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Treinador não encontrado' })
  async create(@Body(ValidationPipe) createTeamDto: CreateTeamDto): Promise<Team> {
    return await this.teamService.create(createTeamDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os times' })
  @ApiResponse({ status: 200, description: 'Lista de times', type: [Team] })
  async findAll(): Promise<Team[]> {
    return await this.teamService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar time por ID' })
  @ApiParam({ name: 'id', description: 'ID do time' })
  @ApiResponse({ status: 200, description: 'Time encontrado', type: Team })
  @ApiResponse({ status: 404, description: 'Time não encontrado' })
  async findOne(@Param('id') id: string): Promise<Team> {
    return await this.teamService.findOne(id);
  }

  @Get('trainer/:trainerId')
  @ApiOperation({ summary: 'Listar times de um treinador' })
  @ApiParam({ name: 'trainerId', description: 'ID do treinador' })
  @ApiResponse({ status: 200, description: 'Times do treinador', type: [Team] })
  @ApiResponse({ status: 404, description: 'Treinador não encontrado' })
  async findByTrainer(@Param('trainerId') trainerId: string): Promise<Team[]> {
    return await this.teamService.findByTrainer(trainerId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar time' })
  @ApiParam({ name: 'id', description: 'ID do time' })
  @ApiResponse({ status: 200, description: 'Time atualizado', type: Team })
  @ApiResponse({ status: 404, description: 'Time não encontrado' })
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateTeamDto: UpdateTeamDto,
  ): Promise<Team> {
    return await this.teamService.update(id, updateTeamDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar time' })
  @ApiParam({ name: 'id', description: 'ID do time' })
  @ApiResponse({ status: 200, description: 'Time deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Time não encontrado' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.teamService.remove(id);
    return { message: 'Time deletado com sucesso' };
  }
}
