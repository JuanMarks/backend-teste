import { Controller, Post, Body, Get, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('Avaliações')
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar uma nova avaliação para um local' })
  @ApiResponse({ status: 201, description: 'Avaliação criada com sucesso.'})
  @ApiResponse({ status: 401, description: 'Não autorizado.'})
  @ApiResponse({ status: 404, description: 'Local não encontrado.'})
  @ApiResponse({ status: 409, description: 'Usuário já avaliou este local.'})
  create(@Body() createRatingDto: CreateRatingDto, @Req() req: any) {
    const userId = req.user.userId; // ID do usuário vem do token JWT
    return this.ratingsService.create(createRatingDto, userId);
  }

  @Get('place/:placeId')
  @ApiOperation({ summary: 'Listar todas as avaliações de um local específico' })
  findAllForPlace(@Param('placeId') placeId: string) {
    return this.ratingsService.findAllForPlace(placeId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin') // Somente usuários logados e admins podem deletar
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletar uma avaliação' })
  remove(@Param('id') id: string, @Req() req: any) {
    const { userId, role } = req.user;
    return this.ratingsService.remove(id, userId, role);
  }
}