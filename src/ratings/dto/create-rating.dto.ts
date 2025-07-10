import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty({ description: 'A nota da avaliação (de 1 a 5)', example: 5 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  value: number;

  @ApiProperty({
    description: 'Comentário opcional sobre o local',
    example: 'Lugar incrível, com ótimo atendimento!',
    required: false,
  })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({
    description: 'ID do local que está sendo avaliado',
    example: 'clx..._place_id',
  })
  @IsNotEmpty()
  @IsString()
  placeId: string;
}