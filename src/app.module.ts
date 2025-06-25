import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PlacesModule } from './place/places.module';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, PlacesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
