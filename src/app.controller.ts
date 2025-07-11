import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Página inicial da API' })
  @ApiResponse({ status: 200, description: 'Informações da API' })
  getHello(): object {
    return {
      message: '🚀 Pokémon Teams API está rodando!',
      version: '1.0.0',
      documentation: '/api',
      endpoints: {
        trainers: '/trainers',
        teams: '/teams',
        teamPokemons: '/teams/{teamId}/pokemons'
      },
      swagger: 'http://localhost:3000/api'
    };
  }
}
