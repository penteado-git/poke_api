import { IsString, IsNotEmpty, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({ description: 'Nome do time', example: 'Team Rocket' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'ID do treinador', example: 'uuid-string' })
  @IsUUID()
  @IsNotEmpty()
  trainerId: string;
}

export class UpdateTeamDto {
  @ApiProperty({ description: 'Nome do time', required: false })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name?: string;
}
