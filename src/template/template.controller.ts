import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { TemplateService } from './template.service';

@Controller('template')
export class TemplateController {
  constructor(
    private readonly templateService: TemplateService,
  ) {}

  @Get()
  findAll() {
    return this.templateService.findAll();
  }

  @Post()
create(@Body() body: CreateTemplateDto) {
  return this.templateService.create(body);
}
}