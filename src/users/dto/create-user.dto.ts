import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        example: 'Jonas Fortes',
        description: 'Nome completo do usuário'
    })
    @IsNotEmpty({ message: 'Campo obrigatório!' })
    @IsString()
    @MinLength(8, { message: 'O nome deve conter no mínimo 8 caracteres'})
    name: string

    @ApiProperty({
        example: 'jonasfortes@gmail.com',
        description: 'Email do usuário'
    })
    @IsEmail({}, {message: 'Email inválido!'})
    email: string

    @ApiProperty({
        example: '+5588999999999 | 88999999999',
        description: 'Número do usuário'
    })
    @Matches(/^\+?\d{10,15}$/, {message: 'Telefone deve conter entre 10 e 15 caracteres, e pode incluir o +'})
    phone: string

    @ApiProperty({
        example: 'turista123',
        description: 'Senha de acesso tendo no mínimo 6 caracteres'
    })
    @IsNotEmpty({ message: 'Campo obrigatório '})
    @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres'})
    password: string
}