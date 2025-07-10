import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PlacesModule } from './place/places.module';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CategoryModule } from './category/category.module';
import { RatingsModule } from './ratings/ratings.module'; // Importe o novo módulo

@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
    PlacesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CloudinaryModule,
    CategoryModule,
    RatingsModule, // Adicione o módulo aqui
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}