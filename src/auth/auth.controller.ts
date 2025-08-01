import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { GoogleService } from './google-auth.service';
import { GoogleLoginResponseDto } from './dto/login-response.dto';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
    constructor( private readonly authService: AuthService, private googleService: GoogleService) {}

    @Post('register-admin')
    @ApiOperation({ summary: 'Registrar novo administrador' })
    @ApiBody({type: CreateAdminDto})
    @ApiResponse({ status: 201, description: 'Administrador criado com sucesso!' })
    @ApiResponse({
      status: 400,
      description: 'Dados inválidos fornecidos.',
    })
    @ApiResponse({
      status: 500,
      description: 'Erro interno do servidor.',
    })
    registerAdmin(@Body() dto: CreateAdminDto) {
        return this.authService.registerAdmin(dto)
    }

    @Post('login')
    @ApiOperation({ summary: 'Login de qualquer usuário (admin ou turista) '})
    @ApiBody({ type: LoginDto})
    @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
    @ApiResponse({ status: 401, description: 'E-mail ou senha inválidos' })
    @ApiResponse({ status: 500, description: 'Erro interno no servidor' })

    login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }

    @Post('google')
    @ApiBody({type: GoogleLoginResponseDto})
    @ApiOperation({ summary: 'Login com o Google'})
    @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
    @ApiResponse({ status: 500, description: 'Erro interno no servidor' })
    async loginWithGoogle(@Body() body: {idToken: string}){
        const access_token = await this.googleService.verify(body.idToken)
        return {access_token}
    }
}
