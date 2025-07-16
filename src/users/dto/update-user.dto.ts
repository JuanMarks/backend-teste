import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string; // Supondo que você queira adicionar um nome ao usuário

  @IsUrl()
  @IsOptional()
  profileImage?: string;
}