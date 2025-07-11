import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PokemonDetailsDto } from '../dtos/pokemon.dto';

@Injectable()
export class PokeApiService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private readonly httpService: HttpService) {}

  async getPokemonDetails(pokemonIdOrName: string): Promise<PokemonDetailsDto> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/pokemon/${pokemonIdOrName.toLowerCase()}`)
      );

      const pokemon = response.data;

      return {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.map(type => type.type.name),
        sprite: pokemon.sprites.front_default || pokemon.sprites.other['official-artwork'].front_default,
        height: pokemon.height,
        weight: pokemon.weight,
      };
    } catch (error) {
      if (error.response?.status === 404) {
        throw new NotFoundException(`Pokémon '${pokemonIdOrName}' não encontrado na PokéAPI`);
      }
      throw error;
    }
  }

  async validatePokemonExists(pokemonIdOrName: string): Promise<boolean> {
    try {
      await this.getPokemonDetails(pokemonIdOrName);
      return true;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return false;
      }
      throw error;
    }
  }
}
