import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PlacesModule } from './place/places.module';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CategoryModule } from './category/category.module';
import { RatingsModule } from './ratings/ratings.module';
import { SuggestionsModule } from './suggestions/suggestions.module'; // 1. Importe o novo módulo

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
    RatingsModule,
    SuggestionsModule, // 2. Adicione o módulo aqui no array de imports
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}