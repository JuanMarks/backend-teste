import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Place, Prisma, User } from '@prisma/client';
import { NotFoundError } from 'rxjs';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreatePlaceDto } from './dto/create-place';
import { UpdatePlaceDto } from './dto/update-place';

@Injectable()
export class PlacesService {
  constructor(private prisma: PrismaService, private cloudinary: CloudinaryService,) {}

  async createPlace(
    data: CreatePlaceDto,
    photos: Express.Multer.File | Express.Multer.File[], // Aceita um ou vários arquivos
  ): Promise<Place> {
    const photoUrls: string[] = [];
    const filesToUpload = Array.isArray(photos) ? photos : (photos ? [photos] : []); // Garante que seja sempre um array

    for (const photo of filesToUpload) {
      try {
        const result = await this.cloudinary.uploadImage(photo);
        if (result && result.secure_url) {
          photoUrls.push(result.secure_url);
        }
      } catch (error) {
        console.error('Erro ao fazer upload da imagem para o Cloudinary:', error);
        // Você pode optar por lançar uma exceção aqui ou simplesmente pular o arquivo com erro
      }
    }

    // Remove a propriedade 'photos' do DTO, pois vamos usar as URLs do Cloudinary
    const { photos: dtoPhotos, ...placeDataWithoutPhotos } = data;

    const placeData: Prisma.PlaceCreateInput = {
      ...placeDataWithoutPhotos,
      address: data.address ? JSON.parse(JSON.stringify(data.address)) : undefined,
      photos: photoUrls, // Salva as URLs das fotos do Cloudinary
    };

    return this.prisma.place.create({
      data: placeData,
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

    // --- CORREÇÃO PRINCIPAL AQUI ---
    // 1. Desestruturamos o DTO e separamos 'address' e 'photosToDelete'.
    // A chave 'dtoPhotosToDelete' é criada apenas para descartar a propriedade, ela não é usada.
    const { address, photosToDelete: dtoPhotosToDelete, ...restOfDto } = updatePlaceDto;
    
    // 2. Agora, o objeto 'restOfDto' NÃO contém mais a propriedade 'photosToDelete'.
    const dataToUpdate: Prisma.PlaceUpdateInput = {
      ...restOfDto, // Seguro para espalhar aqui
      rating: Number(restOfDto.rating),
      address: address ? {
        update: {
          logradouro: address.logradouro,
          numero: address.numero,
          bairro: address.bairro,
          complemento: address.complemento,
        }
      } : undefined,
      photos: updatedPhotos,
    };
    // --- FIM DA CORREÇÃO ---

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
    return await this.prisma.place.delete({
      where: { id },
    });
  }
}
