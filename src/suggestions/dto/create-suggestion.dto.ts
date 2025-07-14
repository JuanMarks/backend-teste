import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSuggestionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}