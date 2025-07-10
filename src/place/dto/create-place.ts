// src/place/dto/create-place.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class AddressDto {
  @ApiProperty({ example: 'Rua Joaquim Tomé' })
  @IsString()
  logradouro: string;

  @ApiProperty({ example: 123 })
  @Type(() => Number)
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
    type: AddressDto,
  })
  @IsNotEmpty({ message: 'O endereço é obrigatório.' })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ApiProperty({
    description: 'Latitude do local',
    example: -23.55052,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiProperty({
    description: 'Longitude do local',
    example: -46.633308,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiProperty({
    description: 'URL do ícone do local',
    example: 'https://example.com/icon.png',
  })
  @IsNotEmpty({ message: 'A URL do ícone é obrigatória.' })
  @IsString()
  iconURL: string;

  @ApiProperty({
    description: 'ID da Categoria',
    example: 'clx......',
  })
  @IsNotEmpty({ message: 'A categoria é obrigatória.' })
  @IsString()
  categoryId: string;



  @ApiProperty({
    description: 'Array de URLs de fotos do local',
    example: [
      'https://example.com/foto1.jpg',
      'https://example.com/foto2.jpg',
    ],
    isArray: true,
    type: String,
    required: false
  })
  @IsOptional()
  photos?: string[];
}