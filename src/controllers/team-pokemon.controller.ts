import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TeamPokemonService } from '../services/team-pokemon.service';
import { AddPokemonToTeamDto, TeamPokemonResponseDto } from '../dtos/pokemon.dto';

@ApiTags('team-pokemons')
@Controller('teams/:teamId/pokemons')
export class TeamPokemonController {
  constructor(private readonly teamPokemonService: TeamPokemonService) {}

  @Post()
  @ApiOperation({ summary: 'Adicionar Pokémon ao time' })
  @ApiParam({ name: 'teamId', description: 'ID do time' })
  @ApiResponse({ status: 201, description: 'Pokémon adicionado com sucesso', type: TeamPokemonResponseDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou Pokémon já existe no time' })
  @ApiResponse({ status: 404, description: 'Time ou Pokémon não encontrado' })
  async addPokemon(
    @Param('teamId') teamId: string,
    @Body(ValidationPipe) addPokemonDto: AddPokemonToTeamDto,
  ): Promise<TeamPokemonResponseDto> {
    return await this.teamPokemonService.addPokemonToTeam(teamId, addPokemonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar Pokémon do time' })
  @ApiParam({ name: 'teamId', description: 'ID do time' })
  @ApiResponse({ status: 200, description: 'Lista de Pokémon do time', type: [TeamPokemonResponseDto] })
  @ApiResponse({ status: 404, description: 'Time não encontrado' })
  async getTeamPokemons(@Param('teamId') teamId: string): Promise<TeamPokemonResponseDto[]> {
    return await this.teamPokemonService.getTeamPokemons(teamId);
  }

  @Delete(':pokemonId')
  @ApiOperation({ summary: 'Remover Pokémon do time' })
  @ApiParam({ name: 'teamId', description: 'ID do time' })
  @ApiParam({ name: 'pokemonId', description: 'ID da relação TeamPokemon' })
  @ApiResponse({ status: 200, description: 'Pokémon removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Time ou Pokémon não encontrado' })
  async removePokemon(
    @Param('teamId') teamId: string,
    @Param('pokemonId') pokemonId: string,
  ): Promise<{ message: string }> {
    await this.teamPokemonService.removePokemonFromTeam(teamId, pokemonId);
    return { message: 'Pokémon removido do time com sucesso' };
  }
}
