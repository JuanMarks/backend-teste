import { CreatePlaceDto } from './create-place';
import { PartialType } from '@nestjs/swagger';

export class UpdatePlaceDto extends PartialType(CreatePlaceDto) {}
