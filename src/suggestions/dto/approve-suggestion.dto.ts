import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApproveSuggestionDto {
  @ApiProperty({ description: 'ID da categoria para o novo local' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ description: 'URL do ícone para o novo local' })
  @IsString()
  @IsNotEmpty()
  iconURL: string;
}