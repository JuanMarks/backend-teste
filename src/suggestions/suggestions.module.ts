import { Module } from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import { SuggestionsController } from './suggestions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PlacesModule } from 'src/place/places.module'; // Importe o PlacesModule

@Module({
  imports: [PrismaModule, PlacesModule], // Adicione PlacesModule aqui
  controllers: [SuggestionsController],
  providers: [SuggestionsService],
})
export class SuggestionsModule {}