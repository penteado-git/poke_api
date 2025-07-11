import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddPokemonToTeamDto {
  @ApiProperty({ description: 'Nome ou ID do Pokémon', example: 'pikachu' })
  @IsString()
  @IsNotEmpty()
  pokemonIdOrName: string;
}

export class PokemonDetailsDto {
  @ApiProperty({ description: 'ID do Pokémon', example: 25 })
  id: number;

  @ApiProperty({ description: 'Nome do Pokémon', example: 'pikachu' })
  name: string;

  @ApiProperty({ description: 'Tipos do Pokémon', example: ['electric'] })
  types: string[];

  @ApiProperty({ description: 'URL do sprite', example: 'https://...' })
  sprite: string;

  @ApiProperty({ description: 'Altura em decímetros', example: 4 })
  height: number;

  @ApiProperty({ description: 'Peso em hectogramas', example: 60 })
  weight: number;
}

export class TeamPokemonResponseDto {
  @ApiProperty({ description: 'ID da relação', example: 'uuid-string' })
  id: string;

  @ApiProperty({ description: 'ID do time', example: 'uuid-string' })
  teamId: string;

  @ApiProperty({ description: 'Nome ou ID do Pokémon salvo', example: 'pikachu' })
  pokemonIdOrName: string;

  @ApiProperty({ description: 'Detalhes do Pokémon da PokéAPI', type: PokemonDetailsDto })
  pokemon: PokemonDetailsDto;
}
