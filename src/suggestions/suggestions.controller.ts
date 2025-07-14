import { Controller, Post, Body, UseGuards, Req, Get, Param, Patch } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { SuggestionsService } from './suggestions.service';
import { ApproveSuggestionDto } from './dto/approve-suggestion.dto';

@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly suggestionsService: SuggestionsService) {}

  @UseGuards(JwtAuthGuard) // Apenas usuários logados podem sugerir
  @Post()
  create(@Body() createSuggestionDto: CreateSuggestionDto, @Req() req: any) {
    const userId = req.user.userId;
    return this.suggestionsService.create(createSuggestionDto, userId);
  }

  
  @Get()
  findAll() {
    return this.suggestionsService.findAll();
  }

  
  @Post(':id/approve')
  approve(@Param('id') id: string, @Body() approvalData: ApproveSuggestionDto) {
    return this.suggestionsService.approve(id, approvalData);
  }

  
  @Patch(':id/reject')
  reject(@Param('id') id: string) {
    return this.suggestionsService.reject(id);
  }
}