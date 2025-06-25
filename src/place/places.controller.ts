import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { PlacesService } from './places.service';
import { Prisma } from '@prisma/client';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { CreatePlaceDto } from './dto/create-place';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UpdatePlaceDto } from './dto/update-place';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
@Controller('places')
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @Post('createPlace')
  @ApiOperation({
    summary: 'Criar um novo local',
    description:
      'Endpoint para criar um novo local com as informações fornecidas.',
  })
  @ApiBody({
    type: CreatePlaceDto,
    description: 'Dados do local a ser criado',
  })
  @ApiResponse({
    status: 201,
    description: 'Local criado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
  })
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  createPlace(@Body() data: CreatePlaceDto) {
    return this.placesService.createPlace(data);
  }

  //--------------------------------------------------------------------------------------------------------------------------//

  @Get('getPlaces')
  @ApiOperation({
    summary: 'Obter todos os locais',
    description: 'Endpoint para obter todos os locais cadastrados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de locais retornada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum local encontrado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
  })
  getAllPlaces() {
    return this.placesService.getAllPlaces();
  }

  //--------------------------------------------------------------------------------------------------------------------------//

  @Get(':type')
  @ApiOperation({
    summary: 'Obter locais por tipo',
    description: 'Endpoint para obter locais filtrados por tipo.',
  })
  @ApiParam({
    name: 'type',
    description: 'Tipo do local a ser filtrado',
    example: 'Restaurante',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de locais filtrados por tipo retornada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum local encontrado com o tipo especificado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
  })
  @ApiOperation({
    summary: 'Obter locais por tipo',
    description: 'Endpoint para obter locais filtrados por tipo.',
  })
  getPlaceByType(@Param('type') type: string) {
    return this.placesService.getPlaceByType(type.toLowerCase());
  }

  //--------------------------------------------------------------------------------------------------------------------------//

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar um local existente',
    description:
      'Endpoint para atualizar as informações de um local existente.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do local a ser atualizado',
    example: '1234567890abcdef12345678',
  })
  @ApiBody({
    type: UpdatePlaceDto,
    description: 'Dados atualizados do local',
  })
  @ApiResponse({
    status: 200,
    description: 'Local atualizado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Local com o ID especificado não encontrado.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  updatePlace(@Param('id') id: string, @Body() data: UpdatePlaceDto) {
    return this.placesService.updatePlace(id, data);
  }

  //--------------------------------------------------------------------------------------------------------------------------//

  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir um local',
    description: 'Endpoint para excluir um local existente pelo ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do local a ser excluído',
    example: '1234567890abcdef12345678',
  })
  @ApiResponse({
    status: 200,
    description: 'Local excluído com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Local com o ID especificado não encontrado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
  })
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  deletePlace(@Param('id') id: string) {
    return this.placesService.deletePlace(id);
  }
}
