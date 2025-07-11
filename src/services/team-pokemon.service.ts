import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamPokemon } from '../trainers/team-pokemon.entity';
import { Team } from '../trainers/team.entity';
import { PokeApiService } from './pokeapi.service';
import { AddPokemonToTeamDto, TeamPokemonResponseDto } from '../dtos/pokemon.dto';

@Injectable()
export class TeamPokemonService {
  constructor(
    @InjectRepository(TeamPokemon)
    private readonly teamPokemonRepository: Repository<TeamPokemon>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    private readonly pokeApiService: PokeApiService,
  ) {}

  async addPokemonToTeam(teamId: string, addPokemonDto: AddPokemonToTeamDto): Promise<TeamPokemonResponseDto> {
    // Verifica se o time existe
    const team = await this.teamRepository.findOne({
      where: { id: teamId },
    });

    if (!team) {
      throw new NotFoundException(`Time com ID ${teamId} não encontrado`);
    }

    // Valida se o Pokémon existe na PokéAPI
    const pokemonExists = await this.pokeApiService.validatePokemonExists(addPokemonDto.pokemonIdOrName);
    if (!pokemonExists) {
      throw new NotFoundException(`Pokémon '${addPokemonDto.pokemonIdOrName}' não encontrado na PokéAPI`);
    }

    // Verifica se o Pokémon já está no time
    const existingPokemon = await this.teamPokemonRepository.findOne({
      where: {
        teamId,
        pokemonIdOrName: addPokemonDto.pokemonIdOrName.toLowerCase(),
      },
    });

    if (existingPokemon) {
      throw new BadRequestException(`Pokémon '${addPokemonDto.pokemonIdOrName}' já está no time`);
    }

    // Verifica se o time já tem 6 Pokémon (limite máximo)
    const teamPokemonCount = await this.teamPokemonRepository.count({
      where: { teamId },
    });

    if (teamPokemonCount >= 6) {
      throw new BadRequestException('Um time pode ter no máximo 6 Pokémon');
    }

    // Adiciona o Pokémon ao time
    const teamPokemon = this.teamPokemonRepository.create({
      teamId,
      pokemonIdOrName: addPokemonDto.pokemonIdOrName.toLowerCase(),
    });

    const savedTeamPokemon = await this.teamPokemonRepository.save(teamPokemon);

    // Busca os detalhes do Pokémon na PokéAPI
    const pokemonDetails = await this.pokeApiService.getPokemonDetails(addPokemonDto.pokemonIdOrName);

    return {
      id: savedTeamPokemon.id,
      teamId: savedTeamPokemon.teamId,
      pokemonIdOrName: savedTeamPokemon.pokemonIdOrName,
      pokemon: pokemonDetails,
    };
  }

  async removePokemonFromTeam(teamId: string, pokemonId: string): Promise<void> {
    // Verifica se o time existe
    const team = await this.teamRepository.findOne({
      where: { id: teamId },
    });

    if (!team) {
      throw new NotFoundException(`Time com ID ${teamId} não encontrado`);
    }

    const teamPokemon = await this.teamPokemonRepository.findOne({
      where: { id: pokemonId, teamId },
    });

    if (!teamPokemon) {
      throw new NotFoundException(`Pokémon não encontrado no time`);
    }

    await this.teamPokemonRepository.remove(teamPokemon);
  }

  async getTeamPokemons(teamId: string): Promise<TeamPokemonResponseDto[]> {
    // Verifica se o time existe
    const team = await this.teamRepository.findOne({
      where: { id: teamId },
    });

    if (!team) {
      throw new NotFoundException(`Time com ID ${teamId} não encontrado`);
    }

    const teamPokemons = await this.teamPokemonRepository.find({
      where: { teamId },
    });

    // Enriquece com dados da PokéAPI
    const enrichedPokemons = await Promise.all(
      teamPokemons.map(async (teamPokemon) => {
        const pokemonDetails = await this.pokeApiService.getPokemonDetails(teamPokemon.pokemonIdOrName);
        
        return {
          id: teamPokemon.id,
          teamId: teamPokemon.teamId,
          pokemonIdOrName: teamPokemon.pokemonIdOrName,
          pokemon: pokemonDetails,
        };
      })
    );

    return enrichedPokemons;
  }
}
