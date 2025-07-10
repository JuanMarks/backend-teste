import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingsService {
  constructor(private prisma: PrismaService) {}

  // --- Método para calcular e atualizar a média de um local ---
  private async updateAverageRating(placeId: string) {
    const aggregate = await this.prisma.rating.aggregate({
      _avg: {
        value: true,
      },
      where: {
        placeId,
      },
    });

    const averageRating = aggregate._avg.value || 0;

    await this.prisma.place.update({
      where: { id: placeId },
      data: { averageRating },
    });
  }

  async create(createRatingDto: CreateRatingDto, userId: string) {
    const { placeId, value, comment } = createRatingDto;

    // Verifica se o local existe
    const place = await this.prisma.place.findUnique({ where: { id: placeId } });
    if (!place) {
      throw new NotFoundException(`Local com ID ${placeId} não encontrado.`);
    }

    // Verifica se o usuário já avaliou este local
    const existingRating = await this.prisma.rating.findUnique({
      where: {
        userId_placeId: {
          userId,
          placeId,
        },
      },
    });

    if (existingRating) {
      throw new ConflictException('Você já avaliou este local.');
    }

    const rating = await this.prisma.rating.create({
      data: {
        value,
        comment,
        userId,
        placeId,
      },
    });

    // Atualiza a média de avaliação do local após criar a nova avaliação
    await this.updateAverageRating(placeId);

    return rating;
  }

  async findAllForPlace(placeId: string) {
    return this.prisma.rating.findMany({
      where: { placeId },
      include: { user: { select: { name: true } } }, // Inclui o nome do usuário
    });
  }

  async remove(ratingId: string, userId: string, userRole: string) {
    const rating = await this.prisma.rating.findUnique({ where: { id: ratingId } });
    
    if (!rating) {
        throw new NotFoundException(`Avaliação com ID ${ratingId} não encontrada.`);
    }

    // Permite que o próprio usuário ou um admin delete a avaliação
    if (rating.userId !== userId && userRole !== 'admin') {
        throw new UnauthorizedException('Você não tem permissão para deletar esta avaliação.');
    }

    await this.prisma.rating.delete({ where: { id: ratingId } });

    // Atualiza a média do local após deletar a avaliação
    await this.updateAverageRating(rating.placeId);

    return { message: 'Avaliação deletada com sucesso.' };
  }
}