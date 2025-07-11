import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrainerDto {
  @ApiProperty({ description: 'Nome do treinador', example: 'Ash Ketchum' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'Cidade de origem', example: 'Pallet Town', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  originCity?: string;
}

export class UpdateTrainerDto {
  @ApiProperty({ description: 'Nome do treinador', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @ApiProperty({ description: 'Cidade de origem', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  originCity?: string;
}
