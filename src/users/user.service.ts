import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { ConflictException } from '@nestjs/common/exceptions/conflict.exception';

@Injectable()
export class UserServices {
  constructor(private prisma: PrismaService,
    private cloudinary: CloudinaryService,) {}

  async register(data: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      throw new ConflictException('E-mail já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        profileImage: data.profileImage, // pode ser uma URL ou caminho local
      },
      select: {
        id: true,
        name: true,
        email: true,
        // não retorna a senha
      }
    });

    return {
      message: 'Usuário criado com sucesso!',
      user
    };
  }

   // --- GET (Todos os usuários) ---
  async findAll(): Promise<Omit<User, 'password'>[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        profileImage: true,
        createdAt: true,
      },
    });
  }

  // --- GET (Um usuário por ID) ---
  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        profileImage: true,
        createdAt: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return user;
  }

  // --- PUT (Atualizar dados do usuário, incluindo imagem de perfil) ---
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    profileImageFile?: Express.Multer.File,
  ): Promise<Omit<User, 'password'>> {
    let imageUrl = updateUserDto.profileImage;

    if (profileImageFile) {
      const result = await this.cloudinary.uploadImage(profileImageFile);
      imageUrl = result.secure_url;
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        profileImage: imageUrl,
      },
    });
    
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  // --- PATCH (Atualizar a senha) ---
  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    const isPasswordMatching = await bcrypt.compare(
      updatePasswordDto.currentPassword,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('A senha atual está incorreta.');
    }
    
    if (updatePasswordDto.currentPassword === updatePasswordDto.newPassword) {
        throw new BadRequestException('A nova senha não pode ser igual à senha atual.');
    }

    const hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, 10);

    await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
    
    return { message: 'Senha atualizada com sucesso.' };
  }

  // --- DELETE (Remover um usuário) ---
  async remove(id: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    await this.prisma.user.delete({ where: { id } });
    return { message: `Usuário com ID ${id} deletado com sucesso.` };
  }
}
