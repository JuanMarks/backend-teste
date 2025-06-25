import { Body, Controller, Post } from "@nestjs/common";
import { UserServices } from "./user.service";
import { ApiBody, ApiOperation, ApiProperty, ApiResponse } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";


@Controller('auth')
export class UserController {
    constructor (private readonly userServices: UserServices) {}

    @Post('register')
    @ApiOperation({ summary: 'Criar um novo usuário' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
    @ApiResponse({
      status: 400,
      description: 'Dados inválidos fornecidos.',
    })
    @ApiResponse({
      status: 500,
      description: 'Erro interno do servidor.',
    })
    register(@Body() data: CreateUserDto) {
        return this.userServices.register(data)
    }
}