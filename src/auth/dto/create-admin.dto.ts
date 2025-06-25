import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreateAdminDto {

    @ApiProperty({
        example: 'Amaral Neto',
        description: 'Nome completo do usuário!'
    })
    @IsNotEmpty({ message: 'Campo obrigatório!' })
    @IsString()
    name: string

    @ApiProperty({
        example: 'amaral@gmail.com',
        description: 'Email completo do usuário!'
    })
    @IsEmail({}, { message: 'Email inválido!' })
    email: string


    @ApiProperty({
    example: 'admin123',
    description: 'Senha de acesso (mínimo 6 caracteres).',
  })
    @IsNotEmpty({ message: 'Campo obrigatório!' })
    @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres!' })
    password: string

}