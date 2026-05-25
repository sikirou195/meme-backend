import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTemplateDto } from './dto/create-template.dto';


@Injectable()
export class TemplateService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.template.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(data: CreateTemplateDto) {
    return this.prisma.template.create({
      data,
    });
  }
}