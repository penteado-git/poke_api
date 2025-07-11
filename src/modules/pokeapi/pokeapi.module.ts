import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PokeApiService } from '../../services/pokeapi.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [PokeApiService],
  exports: [HttpModule, PokeApiService],
})
export class PokeapiModule {}