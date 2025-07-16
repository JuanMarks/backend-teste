import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserServices } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('auth')
export class UserController {
	constructor(private readonly userServices: UserServices) { }

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

	@Get()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('admin') // Apenas admins podem ver todos os usuários
	@ApiOperation({ summary: 'Listar todos os usuários (apenas admin)' })
	findAll() {
		return this.userServices.findAll();
	}

	@Get('me')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Obter dados do usuário logado' })
	findMe(@Req() req) {
		// O req.user é populado pelo JwtAuthGuard com os dados do token
		return this.userServices.findOne(req.user.userId);
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('admin') // Apenas admins podem buscar um usuário por ID
	@ApiOperation({ summary: 'Obter um usuário por ID (apenas admin)' })
	findOne(@Param('id') id: string) {
		return this.userServices.findOne(id);
	}

	@Put('me')
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('profileImage'))
	@ApiConsumes('multipart/form-data')
	@ApiOperation({ summary: 'Atualizar os dados do usuário logado' })
	@ApiBody({ type: UpdateUserDto })
	update(
		@Req() req,
		@Body() updateUserDto: UpdateUserDto,
		@UploadedFile() file: Express.Multer.File,
	) {
		return this.userServices.update(req.user.userId, updateUserDto, file);
	}

	@Patch('me/password')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Atualizar a senha do usuário logado' })
	updatePassword(@Req() req, @Body() updatePasswordDto: UpdatePasswordDto) {
		return this.userServices.updatePassword(req.user.userId, updatePasswordDto);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('admin') // Apenas admins podem deletar outros usuários
	@ApiOperation({ summary: 'Deletar um usuário por ID (apenas admin)' })
	remove(@Param('id') id: string) {
		return this.userServices.remove(id);
	}

}