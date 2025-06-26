// src/place/dto/create-place.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Max, Min, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer'; // 1. Importe o 'Type'

// Crie uma classe para o endereço para que possamos validar seus campos
export class AddressDto {
  @ApiProperty({ example: 'Rua Joaquim Tomé' })
  @IsString()
  logradouro: string;

  @ApiProperty({ example: 123 })
  @Type(() => Number) // 2. Transforme a string em número
  @IsNumber()
  numero: number;

  @ApiProperty({ example: 'Flores' })
  @IsString()
  bairro: string;

  @ApiProperty({ example: 'Ao lado do mercado central' })
  @IsString()
  complemento: string;
}

export class CreatePlaceDto {
  @ApiProperty({
    description: 'Nome do local',
    example: 'Real Lanche',
  })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descrição do local',
    example: 'Melhor lanche da cidade',
  })
  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Endereço do local',
    type: AddressDto, // Use a classe AddressDto aqui
  })
  @IsNotEmpty({ message: 'O endereço é obrigatório.' })
  @ValidateNested()     // 3. Valide o objeto aninhado
  @Type(() => AddressDto) // 4. Transforme o objeto aninhado
  address: AddressDto;

  @ApiProperty({
    description: 'Latitude do local',
    example: -23.55052,
  })
  @Type(() => Number) // 5. Transforme a string em número
  @IsNumber()
  latitude: number;

  @ApiProperty({
    description: 'Longitude do local',
    example: -46.633308,
  })
  @Type(() => Number) // 6. Transforme a string em número
  @IsNumber()
  longitude: number;
  
  @ApiProperty({
    description: 'URL do ícone do local',
    example: 'https://example.com/icon.png',
  })
  @IsNotEmpty({ message: 'A URL do ícone é obrigatória.' })
  @IsString()
  iconURL: string;

  @ApiProperty({
    description: 'Tipo do local',
    example: 'Restaurante',
  })
  @IsNotEmpty({ message: 'O tipo é obrigatório.' })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Avaliação do local',
    example: 4.5,
  })
  @IsNotEmpty({ message: 'A avaliação é obrigatória.' })
  @Type(() => Number) // 7. Transforme a string em número
  @Min(0)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'Array de URLs de fotos do local',
    example: [
      'https://example.com/foto1.jpg',
      'https://example.com/foto2.jpg',
    ],
    isArray: true,
    type: String,
    required: false // As fotos são enviadas separadamente, então o DTO não precisa delas
  })
  photos?: string[]; // Torne opcional, pois virá no corpo da requisição
}