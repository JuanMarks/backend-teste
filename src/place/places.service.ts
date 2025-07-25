import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Place, Prisma } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreatePlaceDto } from './dto/create-place';
import { UpdatePlaceDto } from './dto/update-place';

@Injectable()
export class PlacesService {
  constructor(private prisma: PrismaService, private cloudinary: CloudinaryService) {}

  async createPlace(
    data: CreatePlaceDto,
    photos: Express.Multer.File | Express.Multer.File[],
  ): Promise<Place> {
    const photoUrls: string[] = [];
    const filesToUpload = Array.isArray(photos) ? photos : (photos ? [photos] : []);

    for (const photo of filesToUpload) {
      try {
        const result = await this.cloudinary.uploadImage(photo);
        if (result && result.secure_url) {
          photoUrls.push(result.secure_url);
        }
      } catch (error) {
        console.error('Erro ao fazer upload da imagem para o Cloudinary:', error);
      }
    }

    const { photos: dtoPhotos, categoryId, ...placeDataWithoutPhotos } = data;

    const placeData: Prisma.PlaceCreateInput = {
      ...placeDataWithoutPhotos,
      address: data.address ? JSON.parse(JSON.stringify(data.address)) : undefined,
      socialLinks: data.socialLinks ? JSON.parse(JSON.stringify(data.socialLinks)) : undefined,
      photos: photoUrls,
      category: {
        connect: {
          id: categoryId,
        },
      },
    };

    return this.prisma.place.create({
      data: placeData,
    });
  }

  async getAllPlaces(): Promise<Place[]> {
    const foundPlace = await this.prisma.place.findMany({ include: { category: true } });
    
    return foundPlace;
  }

  async getPlaceByCategory(categoryId: string): Promise<Place[]> {
    const foundPlace = await this.prisma.place.findMany({
      where: { categoryId },
      include: { category: true },
    });
    if (foundPlace && foundPlace.length === 0) {
      throw new NotFoundException(
        `Nenhum lugar encontrado com a categoria de ID: ${categoryId}`,
      );
    }
    return foundPlace;
  }

  async updatePlace(
    id: string,
    updatePlaceDto: UpdatePlaceDto,
    newPhotos: Express.Multer.File[],
    photosToDelete: string[],
  ): Promise<Place> {
    const existingPlace = await this.prisma.place.findUnique({
      where: { id },
    });
    if (!existingPlace) {
      throw new NotFoundException(`Lugar com ID ${id} não encontrado`);
    }

    if (photosToDelete && photosToDelete.length > 0) {
      await Promise.all(
        photosToDelete.map(url => this.cloudinary.deleteImageByUrl(url).catch(err => console.error(`Falha ao deletar imagem ${url}:`, err)))
      );
    }

    const newPhotoUrls: string[] = [];
    if (newPhotos && newPhotos.length > 0) {
      for (const file of newPhotos) {
        const result = await this.cloudinary.uploadImage(file);
        newPhotoUrls.push(result.secure_url);
      }
    }

    const currentPhotos = (existingPlace.photos as string[]).filter(url => !photosToDelete.includes(url));
    const updatedPhotos = [...currentPhotos, ...newPhotoUrls];
    
    const { address, photosToDelete: dtoPhotosToDelete, categoryId, ...restOfDto } = updatePlaceDto;

    const dataToUpdate: Prisma.PlaceUpdateInput = {
      ...restOfDto,
      address: address ? {
        update: {
          logradouro: address.logradouro,
          numero: address.numero,
          bairro: address.bairro,
          complemento: address.complemento,
        }
      } : undefined,
      socialLinks: updatePlaceDto.socialLinks ? {
        update: {
          tripadvisor: updatePlaceDto.socialLinks.tripadvisor,
          whatsapp: updatePlaceDto.socialLinks.whatsapp,
          instagram: updatePlaceDto.socialLinks.instagram,
          email: updatePlaceDto.socialLinks.email,
          website: updatePlaceDto.socialLinks.website,
        }
      } : undefined,
      photos: updatedPhotos,
      // --- CORREÇÃO APLICADA AQUI ---
      // Se um categoryId for passado no DTO, nós o incluímos para atualizar o campo.
      // Se não, ele será `undefined` e não será incluído no objeto de atualização.
      category: categoryId ? { connect: { id: categoryId } } : undefined,
    };

    return this.prisma.place.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async deletePlace(id: string): Promise<Place> {
    const existsPlace = await this.prisma.place.findUnique({
      where: { id },
    });
    if (!existsPlace) {
      throw new NotFoundException(`Lugar com ID ${id} não encontrado`);
    }
    
    await this.prisma.rating.deleteMany({
        where: { placeId: id },
    });
    
    return await this.prisma.place.delete({
      where: { id },
    });
  }
}