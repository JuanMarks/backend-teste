import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PlacesModule } from './place/places.module';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  
  imports: [UserModule, AuthModule, PrismaModule, PlacesModule,
    ConfigModule.forRoot({ // 2. Adicione a configuração aqui
      isGlobal: true,
    }),
    CloudinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
