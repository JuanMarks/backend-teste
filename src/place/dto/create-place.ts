import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Max, Min } from 'class-validator';

type Address = {
  logradouro: string;
  numero: number;
  bairro: string;
  complemento: string;
};

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
    example: {
      logradouro: 'Rua Joaquim Tomé',
      numero: 123,
      bairro: 'Flores',
      complemento: 'Ao lado do mercado central',
    },
  })

  @IsNotEmpty({ message: 'O endereço é obrigatório.' })
  @IsString()
  address: Address;

  @ApiProperty({
    description: 'Latitude do local',
    example: -23.55052,
  })
  latitude: number;

  @ApiProperty({
    description: 'Longitude do local',
    example: -46.633308,
  })
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
  @Min(0)
  @Max(5)
  rating: number;
}
