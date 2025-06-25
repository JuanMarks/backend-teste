import { Injectable, ConflictException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserServices {
  constructor(private prisma: PrismaService) {}

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
}
