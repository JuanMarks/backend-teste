import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Nome da categoria',
    example: 'Restaurante',
  })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString()
  name: string;
}