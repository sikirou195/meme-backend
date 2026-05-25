import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMemeDto } from './dto/create-meme.dto';

@Injectable()
export class MemeService {
  constructor(private prisma: PrismaService) {}

 async create(dto: CreateMemeDto) {
  return this.prisma.meme.create({
    data: {
      imageUrl: dto.imageUrl,
      topText: dto.topText,
      bottomText: dto.bottomText,
      published: false,
      user: {
        connect: {
          id: dto.userId,
        },
      },
    },
  });
}

findByUser(userId: number) {
  return this.prisma.meme.findMany({
    where: { userId },
    orderBy: { id: 'desc' },
  });
}
async publishMeme(id: number, userId: number) {
  return this.prisma.meme.updateMany({
    where: {
      id,
      userId,
    },
    data: {
      published: true,
    },
  });
}

findAll() {
  return this.prisma.meme.findMany({
    where: {
      published: true,
    },

    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },

    orderBy: {
      createdAt: 'desc',
    },
  });
}

  findOne(id: number) {
    return this.prisma.meme.findUnique({
      where: { id },
    });
  }
async likeMeme(id: number) {
  return this.prisma.meme.update({
    where: { id },
    data: {
      likes: {
        increment: 1,
      },
    },
  });
}

async uploadAvatar(
  userId: number,
  filename: string,
) {
  const avatarUrl =
    `https://meme-backend-o55w.onrender.com/uploads/${filename}`;

  return this.prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      avatar: avatarUrl,
    },
  });
}

remove(id: number, userId: number) {
  return this.prisma.meme.deleteMany({
    where: {
      id,
      userId,
    },
  });
}
}