import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Place, Prisma, User } from '@prisma/client';
import { NotFoundError } from 'rxjs';
@Injectable()
export class PlacesService {
  constructor(private prisma: PrismaService) {}

  async createPlace(data: Prisma.PlaceCreateInput): Promise<Place> {
    return await this.prisma.place.create({
      data,
    });
  }

  async getAllPlaces(): Promise<Place[]> {
    const foundPlace = await this.prisma.place.findMany();
    if (!foundPlace || foundPlace.length === 0) {
      throw new NotFoundException('Nenhum lugar encontrado');
    }
    return foundPlace;
  }

  async getPlaceByType(type: string): Promise<Place[] | string> {
    const foundPlace = await this.prisma.place.findMany({
      where: { type },
    });
    if (foundPlace && foundPlace.length === 0) {
      throw new NotFoundException(
        `Nenhum lugar encontrado com o tipo: ${type}`,
      );
    }
    return foundPlace;
  }

  async updatePlace(id: string, data: Prisma.PlaceUpdateInput): Promise<Place> {
    const existsPlace = await this.prisma.place.findUnique({
      where: { id },
    });
    if (!existsPlace) {
      throw new NotFoundException(`Lugar com ID ${id} não encontrado`);
    }
    return await this.prisma.place.update({
      where: { id },
      data,
    });
  }

  async deletePlace(id: string): Promise<Place> {
    const existsPlace = await this.prisma.place.findUnique({
      where: { id },
    });
    if (!existsPlace) {
      throw new NotFoundException(`Lugar com ID ${id} não encontrado`);
    }
    return await this.prisma.place.delete({
      where: { id },
    });
  }
}
