import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { ApproveSuggestionDto } from './dto/approve-suggestion.dto';
import { PlacesService } from 'src/place/places.service'; // Importe o PlacesService


@Injectable()
export class SuggestionsService {
  constructor(private prisma: PrismaService, private readonly placesService: PlacesService,) {}

  create(createSuggestionDto: CreateSuggestionDto, userId: string) {
    return this.prisma.suggestion.create({
      data: {
        ...createSuggestionDto,
        userId: userId,
      },
    });
  }

  // Você vai precisar destes no futuro para a página de admin
  findAll() {
    return this.prisma.suggestion.findMany({ 
        where: { status: 'PENDING' },
        include: { user: { select: { name: true, email: true } } } 
    });
  }

  async approve(suggestionId: string, approvalData: ApproveSuggestionDto) {
    const suggestion = await this.prisma.suggestion.findUnique({
      where: { id: suggestionId },
    });
    if (!suggestion || suggestion.status !== 'PENDING') {
      throw new NotFoundException(`Sugestão com ID ${suggestionId} não encontrada ou já processada.`);
    }

    // 1. Cria um novo local usando o PlacesService
    const newPlace = await this.placesService.createPlace({
        name: suggestion.name,
        description: suggestion.description,
        latitude: suggestion.latitude,
        longitude: suggestion.longitude,
        // Dados fornecidos pelo admin no modal
        categoryId: approvalData.categoryId,
        iconURL: approvalData.iconURL,
        // O endereço pode ser deixado em branco ou preenchido posteriormente
        address: { logradouro: '', numero: 0, bairro: '', complemento: '' },
    }, []); // Envia um array vazio para as fotos iniciais

    // 2. Atualiza o status da sugestão para 'APPROVED'
    await this.prisma.suggestion.update({
      where: { id: suggestionId },
      data: { status: 'APPROVED' },
    });

    return newPlace;
  }

  async reject(suggestionId: string) {
    const suggestion = await this.prisma.suggestion.findUnique({
      where: { id: suggestionId },
    });
    if (!suggestion || suggestion.status !== 'PENDING') {
      throw new NotFoundException(`Sugestão com ID ${suggestionId} não encontrada ou já processada.`);
    }

    return this.prisma.suggestion.update({
      where: { id: suggestionId },
      data: { status: 'REJECTED' },
    });
  }
}