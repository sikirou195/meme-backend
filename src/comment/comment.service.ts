import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(
    dto: CreateCommentDto,
    userId: number,
  ) {
    return this.prisma.comment.create({
      data: {
        content: dto.content,

        memeId: dto.memeId,

        userId,
      },

      include: {
        user: true,
      },
    });
  }

  async findByMeme(memeId: number) {
    return this.prisma.comment.findMany({
      where: {
        memeId,
      },

      include: {
        user: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
